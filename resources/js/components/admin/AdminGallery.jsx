import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { UploadCloud, CheckCircle2, XCircle, Edit3, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { api, apiErrorMessage } from '../../services/api.js';

const CATEGORIES = ['Fashion Show', 'Photoshoot Studio', 'Masterclass', 'Backstage', 'Wisuda Alumni'];

function Toast({ message, type = 'success' }) {
    if (!message) return null;
    return (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce ${type === 'error' ? 'bg-red-700 text-white' : 'bg-[#1c1a17] text-white'}`}>
            {type === 'error' ? <XCircle className="w-5 h-5 text-red-300" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            <span>{message}</span>
        </div>
    );
}

const emptyForm = { title: '', image: '', category: CATEGORIES[0], date: '' };

export default function AdminGallery() {
    const [galleryFilter, setGalleryFilter] = useState('Semua');
    const [galleryItems, setGalleryItems] = useState([]);
    const [toast, setToast] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // null = add new, object = edit
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const load = async () => {
        try {
            const records = await api('/api/admin/records/gallery');
            setGalleryItems(records.map(r => ({ id: r.id, ...r.data, status: r.status })));
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
        setForm({ title: item.title || '', image: item.image || '', category: item.category || CATEGORIES[0], date: item.date || '' });
        setModalOpen(true);
    };

    const closeModal = () => { setModalOpen(false); setEditingItem(null); setForm(emptyForm); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingItem) {
                await api(`/api/admin/records/${editingItem.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ data: form }),
                });
                showToast('Media berhasil diperbarui!');
            } else {
                await api('/api/admin/records/gallery', {
                    method: 'POST',
                    body: JSON.stringify({ data: form, status: 'Aktif' }),
                });
                showToast('Media berhasil ditambahkan!');
            }
            closeModal();
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const deleteItem = async (item) => {
        if (!window.confirm(`Hapus "${item.title}" dari galeri?`)) return;
        try {
            await api(`/api/admin/records/${item.id}`, { method: 'DELETE' });
            showToast('Media berhasil dihapus.');
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        }
    };

    const filtered = galleryItems.filter(item => galleryFilter === 'Semua' || item.category === galleryFilter);

    return (
        <AdminLayout activeNav="Galeri" breadcrumb="Galeri">
            <Toast message={toast?.msg} type={toast?.type} />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">DOKUMENTASI & MEDIA</span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">Galeri & Dokumentasi</h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">Arsip foto runway show, sesi photoshoot studio, masterclass, dan wisuda alumni.</p>
                </div>
                <button onClick={openAdd}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition">
                    <UploadCloud className="w-4 h-4" />Tambah Media
                </button>
            </div>

            <div className="flex flex-wrap gap-2 bg-white p-3 rounded-2xl border border-[#ede7dd]">
                {['Semua', ...CATEGORIES].map((cat) => (
                    <button key={cat} onClick={() => setGalleryFilter(cat)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${galleryFilter === cat ? 'bg-[#1c1a17] text-white shadow-xs' : 'text-[#68625c] hover:bg-[#ede7dd]/50'}`}>
                        {cat}
                    </button>
                ))}
                <span className="ml-auto text-xs text-[#8c827a] self-center">{filtered.length} media</span>
            </div>

            {loading ? (
                <div className="p-10 text-center text-sm text-[#78716c]">Memuat galeri...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {filtered.map((g) => (
                        <div key={g.id} className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs hover:shadow-md transition group">
                            <div className="relative h-52 overflow-hidden bg-[#eee8dd]">
                                {g.image ? (
                                    <img src={g.image} alt={g.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        onError={e => { e.target.style.display = 'none'; }} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#bba994]">
                                        <ImageIcon className="w-12 h-12" />
                                    </div>
                                )}
                                <span className="absolute top-3 left-3 text-[10px] font-semibold bg-black/60 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                                    {g.category}
                                </span>
                                {/* Hover Actions */}
                                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
                                    <button onClick={() => openEdit(g)}
                                        className="p-1.5 bg-white/90 hover:bg-white rounded-lg text-[#1c1a17] shadow-sm">
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={() => deleteItem(g)}
                                        className="p-1.5 bg-white/90 hover:bg-red-50 rounded-lg text-red-600 shadow-sm">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h4 className="font-semibold text-xs text-[#1c1a17] line-clamp-1">{g.title}</h4>
                                <span className="text-[10px] text-[#8c827a] block mt-1">{g.date}</span>
                            </div>
                        </div>
                    ))}
                    {!filtered.length && (
                        <div className="col-span-full bg-white rounded-2xl border border-[#ede7dd] p-10 text-center text-sm text-[#78716c]">
                            {galleryFilter === 'Semua' ? 'Belum ada media tersimpan.' : `Tidak ada media kategori "${galleryFilter}".`}
                        </div>
                    )}
                </div>
            )}

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#ede7dd]">
                        <div className="flex items-center justify-between pb-4 border-b border-[#ede7dd]">
                            <h3 className="font-serif text-xl font-normal text-[#1c1a17]">
                                {editingItem ? 'Edit Media' : 'Tambah Media Baru'}
                            </h3>
                            <button onClick={closeModal} className="p-1.5 text-[#8c827a] hover:text-[#1c1a17]"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Judul *</label>
                                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                                    placeholder="Judul foto / album" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">URL Gambar *</label>
                                <input required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                                    placeholder="https://... atau /images/..." />
                                {form.image && (
                                    <img src={form.image} alt="preview" className="mt-2 h-24 w-full object-cover rounded-lg border border-[#ede7dd]"
                                        onError={e => e.target.style.display = 'none'} />
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Kategori</label>
                                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none">
                                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Tanggal</label>
                                    <input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none"
                                        placeholder="25 Oktober 2026" />
                                </div>
                            </div>
                            <div className="pt-3 flex items-center justify-end gap-3">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-xs font-medium text-[#78716c]">Batal</button>
                                <button type="submit" disabled={submitting}
                                    className="px-5 py-2 bg-[#1c1a17] text-white rounded-xl text-xs font-medium disabled:opacity-50">
                                    {submitting ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
