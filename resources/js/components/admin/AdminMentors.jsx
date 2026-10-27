import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Plus, Edit3, Trash2, UserX, CheckCircle2, XCircle, X, Star, Phone, Award } from 'lucide-react';
import { api, apiErrorMessage } from '../../services/api.js';

const emptyForm = { name: '', title: '', bio: '', specialties: '' };

function Toast({ message, type = 'success' }) {
    if (!message) return null;
    return (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce ${type === 'error' ? 'bg-red-700 text-white' : 'bg-[#1c1a17] text-white'}`}>
            {type === 'error' ? <XCircle className="w-5 h-5 text-red-300" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            <span>{message}</span>
        </div>
    );
}

export default function AdminMentors() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [editing, setEditing] = useState(null); // null = tutup, {id, ...} = edit, 'new' = tambah baru
    const [form, setForm] = useState(emptyForm);
    const [photoFile, setPhotoFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [photoPreview, setPhotoPreview] = useState('');
    const [deleting, setDeleting] = useState(null);
    const [deletingSubmitting, setDeletingSubmitting] = useState(false);

    useEffect(() => {
        if (!photoFile) {
            setPhotoPreview('');
            return;
        }
        const previewUrl = URL.createObjectURL(photoFile);
        setPhotoPreview(previewUrl);
        return () => URL.revokeObjectURL(previewUrl);
    }, [photoFile]);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const load = async () => {
        try {
            const data = await api('/api/admin/mentors');
            setItems(data.data || []);
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const openAdd = () => {
        setForm(emptyForm);
        setPhotoFile(null);
        setEditing('new');
    };

    const openEdit = (mentor) => {
        setForm({
            name: mentor.name || '',
            title: mentor.title || '',
            bio: mentor.bio || '',
            specialties: (mentor.specialties || []).join(', '),
        });
        setPhotoFile(null);
        setEditing(mentor);
    };

    const closeModal = () => { setEditing(null); setForm(emptyForm); setPhotoFile(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = new FormData();
            payload.append('name', form.name);
            payload.append('title', form.title);
            payload.append('bio', form.bio);
            const specs = form.specialties.split(',').map(s => s.trim()).filter(Boolean);
            specs.forEach(s => payload.append('specialties[]', s));
            if (photoFile) payload.append('photo', photoFile);

            if (editing === 'new') {
                await api('/api/admin/mentors', { method: 'POST', body: payload });
                showToast('Mentor berhasil ditambahkan!');
            } else {
                await api(`/api/admin/mentors/${editing.id}`, {
                    method: 'POST',
                    headers: { 'X-HTTP-Method-Override': 'PUT' },
                    body: payload,
                });
                showToast('Profil mentor berhasil diperbarui!');
            }
            closeModal();
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const deactivate = async (mentor) => {
        if (!window.confirm(`Nonaktifkan mentor ${mentor.name}?`)) return;
        try {
            await api(`/api/admin/mentors/${mentor.id}/deactivate`, { method: 'PATCH' });
            showToast(`${mentor.name} dinonaktifkan.`);
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        }
    };

    const deleteMentor = async (mentor) => {
        if (!deleting || deletingSubmitting) return;
        setDeletingSubmitting(true);
        try {
            await api(`/api/admin/mentors/${deleting.id}`, { method: 'DELETE' });
            showToast(`${deleting.name} berhasil dihapus.`);
            setDeleting(null);
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setDeletingSubmitting(false);
        }
    };

    const reactivate = async (mentor) => {
        try {
            await api(`/api/admin/mentors/${mentor.id}/activate`, { method: 'PATCH' });
            showToast(`${mentor.name} diaktifkan kembali.`);
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        }
    };

    return (
        <AdminLayout activeNav="Mentor" breadcrumb="Mentor">
            <Toast message={toast?.msg} type={toast?.type} />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">DIREKTORI INSTRUKTUR</span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">Manajemen Mentor</h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">Tambah, edit, dan kelola data seluruh instruktur akademi.</p>
                </div>
                <button onClick={openAdd}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition self-start sm:self-auto">
                    <Plus className="w-4 h-4" />Tambah Mentor Baru
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Total Mentor</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">{items.length}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Mentor Aktif</span>
                    <div className="text-2xl font-bold text-emerald-600 mt-1">{items.filter(m => m.active).length}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Total Jadwal</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">{items.reduce((n, m) => n + (m.schedules_count || 0), 0)}</div>
                </div>
            </div>

            {/* Mentor Grid */}
            {loading ? (
                <div className="p-10 text-center text-sm text-[#78716c]">Memuat data mentor...</div>
            ) : items.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#ede7dd] p-10 text-center text-sm text-[#78716c]">
                    Belum ada mentor. Tambahkan mentor pertama.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map(mentor => (
                        <div key={mentor.id} className={`bg-white rounded-2xl border overflow-hidden shadow-xs hover:shadow-md transition flex flex-col ${mentor.active ? 'border-[#ede7dd]' : 'border-gray-200 opacity-75'}`}>
                            {/* Photo */}
                            <div className="relative h-44 bg-[#f0ebe3] overflow-hidden">
                                {mentor.photo_path ? (
                                    <img src={`/storage/${mentor.photo_path}`} alt={mentor.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#bba994]">
                                        <div className="w-20 h-20 rounded-full bg-[#ede7dd] flex items-center justify-center text-3xl font-serif text-[#8c827a]">
                                            {mentor.name?.charAt(0)}
                                        </div>
                                    </div>
                                )}
                                <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-xs ${mentor.active ? 'bg-emerald-500/90 text-white border-emerald-400' : 'bg-gray-500/90 text-white border-gray-400'}`}>
                                    {mentor.active ? 'Aktif' : 'Nonaktif'}
                                </span>
                            </div>

                            {/* Info */}
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="font-semibold text-base text-[#1c1a17]">{mentor.name}</h3>
                                <p className="text-xs text-[#78716c] mt-0.5">{mentor.title || 'Instruktur'}</p>
                                {(mentor.specialties || []).length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {mentor.specialties.slice(0, 3).map((s, i) => (
                                            <span key={i} className="text-[10px] bg-[#f7f5f0] text-[#68625c] border border-[#ede7dd] px-2 py-0.5 rounded-full">{s}</span>
                                        ))}
                                    </div>
                                )}
                                {mentor.bio && (
                                    <p className="text-[11px] text-[#8c827a] mt-2 line-clamp-2 leading-relaxed">{mentor.bio}</p>
                                )}
                                <p className="text-[10px] text-[#8c827a] mt-2">{mentor.schedules_count || 0} jadwal kelas</p>

                                {/* Actions */}
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#f3efe8]">
                                    <button onClick={() => openEdit(mentor)}
                                        className="flex-1 py-1.5 text-xs font-medium text-[#1c1a17] bg-[#f7f5f0] hover:bg-[#ede7dd] rounded-xl transition flex items-center justify-center gap-1.5">
                                        <Edit3 className="w-3.5 h-3.5" />Edit Profil
                                    </button>
                                    {mentor.active ? (
                                        <button onClick={() => deactivate(mentor)}
                                            className="p-1.5 text-[#78716c] hover:text-amber-600 hover:bg-amber-50 rounded-lg transition" title="Nonaktifkan">
                                            <UserX className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button onClick={() => reactivate(mentor)}
                                            className="p-1.5 text-[#78716c] hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition" title="Aktifkan kembali">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button onClick={() => setDeleting(mentor)}
                                        className="p-1.5 text-[#78716c] hover:text-red-600 hover:bg-red-50 rounded-lg transition" title="Hapus permanen">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Form Add/Edit */}
            {editing !== null && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#ede7dd] max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[#ede7dd]">
                            <h3 className="font-serif text-xl font-normal text-[#1c1a17]">
                                {editing === 'new' ? 'Tambah Mentor Baru' : `Edit: ${editing.name}`}
                            </h3>
                            <button onClick={closeModal} className="p-1.5 text-[#8c827a] hover:text-[#1c1a17]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Nama Lengkap *</label>
                                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                    placeholder="Nama mentor" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Jabatan / Spesialisasi</label>
                                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none"
                                    placeholder="Contoh: Senior Runway Coach" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Bio</label>
                                <textarea rows={3} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none resize-none"
                                    placeholder="Deskripsi singkat mentor..." />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Spesialisasi (pisahkan dengan koma)</label>
                                <input value={form.specialties} onChange={e => setForm({ ...form, specialties: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none"
                                    placeholder="Runway, Catwalk, Editorial" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Foto Profil</label>
                                <div className="flex items-center gap-4 rounded-xl border border-[#ded7cb] bg-[#fbfaf8] p-3">
                                    {(photoFile || (editing !== 'new' && editing.photo_path)) && (
                                        <img
                                            src={photoPreview || editing.photo_path}
                                            alt="Pratinjau foto profil"
                                            className="h-16 w-16 shrink-0 rounded-lg border border-[#ded7cb] object-cover"
                                        />
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <label className="inline-flex cursor-pointer items-center rounded-lg bg-[#1c1a17] px-3 py-2 text-xs font-medium text-white hover:bg-black">
                                            Pilih foto
                                            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => setPhotoFile(e.target.files[0] || null)} className="sr-only" />
                                        </label>
                                        <p className="mt-2 truncate text-xs text-[#68625c]">{photoFile?.name || (editing !== 'new' && editing.photo_path ? 'Foto saat ini' : 'Belum ada file dipilih')}</p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-[#8c827a] mt-1">Format JPG/PNG/WebP. Maks 5 MB. {editing !== 'new' && editing.photo_path && 'Biarkan kosong untuk tetap menggunakan foto saat ini.'}</p>
                            </div>
                            <div className="pt-3 flex items-center justify-end gap-3">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-xs font-medium text-[#78716c]">Batal</button>
                                <button type="submit" disabled={submitting}
                                    className="px-5 py-2 bg-[#1c1a17] text-white rounded-xl text-xs font-medium disabled:opacity-50">
                                    {submitting ? 'Menyimpan...' : 'Simpan Mentor'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleting && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
                    <div role="alertdialog" aria-modal="true" aria-labelledby="delete-mentor-title" aria-describedby="delete-mentor-description" className="w-full max-w-md rounded-2xl border border-[#ede7dd] bg-white p-6 shadow-2xl">
                        <h3 id="delete-mentor-title" className="font-serif text-xl text-[#1c1a17]">Hapus mentor?</h3>
                        <p id="delete-mentor-description" className="mt-2 text-sm leading-6 text-[#78716c]">Setujui untuk menghapus <strong className="text-[#1c1a17]">{deleting.name}</strong> secara permanen. Tindakan ini tidak dapat dibatalkan.</p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button type="button" disabled={deletingSubmitting} onClick={() => setDeleting(null)} className="rounded-xl border border-[#ded7cb] px-4 py-2.5 text-sm font-medium text-[#5f574f] hover:bg-[#f7f5f0] disabled:opacity-50">Batalkan</button>
                            <button type="button" disabled={deletingSubmitting} onClick={deleteMentor} className="rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50">{deletingSubmitting ? 'Menghapus...' : 'Setujui'}</button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}