import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Plus, Star, CheckCircle2, XCircle, Trash2, Edit3, X } from 'lucide-react';
import { api, apiErrorMessage } from '../../services/api.js';

function Toast({ message, type = 'success' }) {
    if (!message) return null;
    return (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce ${type === 'error' ? 'bg-red-700 text-white' : 'bg-[#1c1a17] text-white'}`}>
            {type === 'error' ? <XCircle className="w-5 h-5 text-red-300" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            <span>{message}</span>
        </div>
    );
}

const emptyForm = { name: '', quote: '', role: '', rating: 5, avatar: '', date: '', featuredOnHome: false };

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [toast, setToast] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const load = async () => {
        try {
            const records = await api('/api/admin/records/testimonial');
            setTestimonials(records.map(r => ({ id: r.id, ...r.data, featuredOnHome: r.status === 'Aktif' })));
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const openAdd = () => {
        setEditingItem(null);
        setForm({ ...emptyForm, date: new Date().toLocaleDateString('id-ID') });
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditingItem(item);
        setForm({
            name: item.name || '',
            quote: item.quote || '',
            role: item.role || '',
            rating: item.rating || 5,
            avatar: item.avatar || '',
            date: item.date || '',
            featuredOnHome: item.featuredOnHome || false,
        });
        setModalOpen(true);
    };

    const closeModal = () => { setModalOpen(false); setEditingItem(null); setForm(emptyForm); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const status = form.featuredOnHome ? 'Aktif' : 'Draft';
        try {
            if (editingItem) {
                await api(`/api/admin/records/${editingItem.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ data: form, status }),
                });
                showToast('Testimoni berhasil diperbarui!');
            } else {
                await api('/api/admin/records/testimonial', {
                    method: 'POST',
                    body: JSON.stringify({ data: form, status }),
                });
                showToast('Testimoni berhasil ditambahkan!');
            }
            closeModal();
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const toggleFeatured = async (t) => {
        const newFeatured = !t.featuredOnHome;
        try {
            await api(`/api/admin/records/${t.id}`, {
                method: 'PUT',
                body: JSON.stringify({ data: { ...t, featuredOnHome: newFeatured }, status: newFeatured ? 'Aktif' : 'Draft' }),
            });
            showToast(`Status tayang ${t.name} diperbarui!`);
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        }
    };

    const deleteItem = async (t) => {
        if (!window.confirm(`Hapus testimoni dari ${t.name}?`)) return;
        try {
            await api(`/api/admin/records/${t.id}`, { method: 'DELETE' });
            showToast('Testimoni dihapus.');
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        }
    };

    return (
        <AdminLayout activeNav="Testimoni" breadcrumb="Testimoni">
            <Toast message={toast?.msg} type={toast?.type} />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">ULASAN & REPUTASI</span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">Manajemen Testimoni</h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">Moderasi ulasan alumni untuk dipublikasikan pada halaman utama website publik.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-[#8c827a]">{testimonials.filter(t => t.featuredOnHome).length} tayang di Home</span>
                    <button onClick={openAdd}
                        className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition">
                        <Plus className="w-4 h-4" />Tambah Ulasan
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="p-10 text-center text-sm text-[#78716c]">Memuat testimoni...</div>
            ) : testimonials.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#ede7dd] p-10 text-center text-sm text-[#78716c]">Belum ada testimoni.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {testimonials.map((t) => (
                        <div key={t.id} className={`bg-white rounded-2xl border p-6 shadow-xs flex flex-col justify-between transition ${t.featuredOnHome ? 'border-[#ede7dd]' : 'border-gray-200 opacity-80'}`}>
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {t.avatar ? (
                                            <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-[#ede7dd]"
                                                onError={e => e.target.style.display = 'none'} />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-[#f0ebe3] border border-[#ede7dd] flex items-center justify-center font-serif text-xl text-[#8c827a]">
                                                {t.name?.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-semibold text-base text-[#1c1a17]">{t.name}</h4>
                                            <span className="text-xs text-[#8c827a]">{t.role}</span>
                                        </div>
                                    </div>
                                    <div className="flex text-amber-400">
                                        {[...Array(Math.max(0, Math.min(5, t.rating || 5)))].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <blockquote className="text-xs text-[#68625c] italic leading-relaxed bg-[#fbf9f5] p-4 rounded-xl border border-[#ede7dd]/60 mb-4">
                                    "{t.quote}"
                                </blockquote>
                            </div>
                            <div className="pt-3 border-t border-[#f3efe8] flex items-center justify-between text-xs">
                                <span className="text-[#8c827a]">{t.date}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#68625c]">Tayang di Home:</span>
                                    <button onClick={() => toggleFeatured(t)}
                                        className={`w-9 h-5 flex items-center rounded-full p-0.5 transition cursor-pointer ${t.featuredOnHome ? 'bg-[#1c1a17] justify-end' : 'bg-gray-300 justify-start'}`}>
                                        <span className="w-4 h-4 rounded-full bg-white block shadow-xs" />
                                    </button>
                                    <button onClick={() => openEdit(t)}
                                        className="p-1.5 text-[#78716c] hover:text-[#1c1a17] hover:bg-[#f7f5f0] rounded-lg transition">
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => deleteItem(t)}
                                        className="p-1.5 text-[#78716c] hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#ede7dd] max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[#ede7dd]">
                            <h3 className="font-serif text-xl font-normal text-[#1c1a17]">
                                {editingItem ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
                            </h3>
                            <button onClick={closeModal} className="p-1.5 text-[#8c827a] hover:text-[#1c1a17]"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Nama Alumni *</label>
                                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Program / Jabatan</label>
                                    <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                                        placeholder="Alumni Basic Modeling" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Isi Testimoni *</label>
                                <textarea required rows={3} value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none resize-none"
                                    placeholder="Testimoni alumni..." />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Rating (1-5)</label>
                                    <input type="number" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Tanggal</label>
                                    <input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                                        placeholder="25 Oktober 2026" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">URL Foto Avatar</label>
                                <input value={form.avatar} onChange={e => setForm({ ...form, avatar: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                                    placeholder="https://... (opsional)" />
                            </div>
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="featured" checked={form.featuredOnHome} onChange={e => setForm({ ...form, featuredOnHome: e.target.checked })}
                                    className="w-4 h-4" />
                                <label htmlFor="featured" className="text-xs font-semibold text-[#1c1a17]">Tampilkan di halaman utama (Home)</label>
                            </div>
                            <div className="pt-3 flex items-center justify-end gap-3">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-xs font-medium text-[#78716c]">Batal</button>
                                <button type="submit" disabled={submitting}
                                    className="px-5 py-2 bg-[#1c1a17] text-white rounded-xl text-xs font-medium disabled:opacity-50">
                                    {submitting ? 'Menyimpan...' : 'Simpan Testimoni'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
