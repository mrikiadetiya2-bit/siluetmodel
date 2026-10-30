import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import {
    Plus,
    CheckCircle2,
    XCircle,
    Trash2,
    Edit3,
    X,
    Sparkles,
    Eye,
    EyeOff,
    UploadCloud,
    Search,
    Filter,
    Layers,
    User,
    Check
} from 'lucide-react';
import { api, apiErrorMessage } from '../../services/api.js';

function Toast({ message, type = 'success' }) {
    if (!message) return null;
    return (
        <div
            className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce ${
                type === 'error' ? 'bg-red-700 text-white' : 'bg-[#1c1a17] text-white'
            }`}
        >
            {type === 'error' ? <XCircle className="w-5 h-5 text-red-300" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            <span>{message}</span>
        </div>
    );
}

const CATEGORIES = [
    'Pageant & Runway',
    'Smart Casual & Runway',
    'Traditional Pageant',
    'Menswear & Commercial',
    'Kids Modeling School',
    'Haute Couture',
    'Editorial Fashion',
];

const emptyForm = {
    name: '',
    role: '',
    category: CATEGORIES[0],
    lookTitle: '',
    lookDesc: '',
    designer: 'Siluet Signature',
    height: '175 cm',
    bookingText: 'Konsultasi Booking Model',
    image: null,
    currentImage: '',
    status: 'Aktif',
};

export default function AdminRunway() {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    // Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Semua');
    const [statusFilter, setStatusFilter] = useState('Semua');

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const load = async () => {
        try {
            setLoading(true);
            const records = await api('/api/admin/records/runway');
            setModels(records.map(r => ({
                id: r.id,
                ...r.data,
                status: r.status || 'Aktif',
            })));
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const openAdd = () => {
        setEditingItem(null);
        setForm(emptyForm);
        setImagePreview(null);
        setModalOpen(true);
    };

    const openEdit = (item) => {
        setEditingItem(item);
        setForm({
            name: item.name || '',
            role: item.role || '',
            category: item.category || CATEGORIES[0],
            lookTitle: item.lookTitle || '',
            lookDesc: item.lookDesc || '',
            designer: item.designer || '',
            height: item.height || '',
            bookingText: item.bookingText || 'Konsultasi Booking Model',
            image: null,
            currentImage: item.image || '',
            status: item.status || 'Aktif',
        });
        setImagePreview(item.image || null);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingItem(null);
        setForm(emptyForm);
        setImagePreview(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.role || !form.lookTitle) {
            showToast('Nama, Peran, dan Judul Busana wajib diisi.', 'error');
            return;
        }

        if (!editingItem && !form.image && !form.currentImage) {
            showToast('Pilih foto model (PNG cut-out disarankan).', 'error');
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('data[name]', form.name);
            formData.append('data[role]', form.role);
            formData.append('data[category]', form.category);
            formData.append('data[lookTitle]', form.lookTitle);
            formData.append('data[lookDesc]', form.lookDesc || '');
            formData.append('data[designer]', form.designer || '');
            formData.append('data[height]', form.height || '');
            formData.append('data[bookingText]', form.bookingText || 'Konsultasi Booking Model');
            formData.append('status', form.status);

            if (form.image) {
                formData.append('image', form.image);
            } else if (form.currentImage) {
                formData.append('data[image]', form.currentImage);
            }

            if (editingItem) {
                formData.append('_method', 'PUT');
                await api(`/api/admin/records/${editingItem.id}`, {
                    method: 'POST',
                    body: formData,
                });
                showToast('Model Virtual Runway berhasil diperbarui!');
            } else {
                await api('/api/admin/records/runway', {
                    method: 'POST',
                    body: formData,
                });
                showToast('Model Virtual Runway berhasil ditambahkan!');
            }

            closeModal();
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const toggleStatus = async (item) => {
        const newStatus = item.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
        try {
            await api(`/api/admin/records/${item.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    data: {
                        name: item.name,
                        role: item.role,
                        category: item.category,
                        lookTitle: item.lookTitle,
                        lookDesc: item.lookDesc,
                        designer: item.designer,
                        height: item.height,
                        bookingText: item.bookingText,
                        image: item.image,
                    },
                    status: newStatus,
                }),
            });
            showToast(`Status model diubah menjadi ${newStatus}`);
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        }
    };

    const confirmDelete = (item) => {
        setSelectedDelete(item);
        setDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedDelete) return;
        try {
            await api(`/api/admin/records/${selectedDelete.id}`, {
                method: 'DELETE',
            });
            showToast('Model berhasil dihapus dari Virtual Runway');
            setDeleteModalOpen(false);
            setSelectedDelete(null);
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        }
    };

    // Filtered models
    const filteredModels = models.filter((m) => {
        const matchesSearch =
            (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (m.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (m.lookTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (m.designer || '').toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCat = categoryFilter === 'Semua' || m.category === categoryFilter;
        const matchesStatus = statusFilter === 'Semua' || m.status === statusFilter;

        return matchesSearch && matchesCat && matchesStatus;
    });

    const activeCount = models.filter(m => m.status === 'Aktif').length;
    const uniqueCategories = Array.from(new Set(models.map(m => m.category).filter(Boolean)));

    return (
        <AdminLayout activeNav="Virtual Runway" breadcrumb="Virtual Runway & Lookbook">
            <Toast message={toast?.msg} type={toast?.type} />

            <div className="space-y-6">
                {/* Header Banner */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ede7dd] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="p-1.5 rounded-lg bg-[#f4eee4] text-[#8c827a]">
                                <Sparkles className="w-4 h-4 text-[#1c1a17]" />
                            </span>
                            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8c827a]">
                                BERANDA &amp; LOOKBOOK MANAGEMENT
                            </span>
                        </div>
                        <h1 className="font-serif text-2xl sm:text-3xl text-[#1c1a17] font-normal">
                            Virtual Runway Model
                        </h1>
                        <p className="text-xs sm:text-sm text-[#7d756d] mt-1 max-w-2xl leading-relaxed">
                            Kelola model panggung virtual yang tampil di slider kinetic halaman utama. Unggah foto cut-out transparan untuk efek spotlight studio terbaik.
                        </p>
                    </div>

                    <button
                        onClick={openAdd}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#1c1a17] hover:bg-[#2c2824] text-white text-xs font-semibold tracking-wide transition shadow-sm active:scale-98 shrink-0 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Model Baru</span>
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl p-5 border border-[#ede7dd] shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-medium text-[#8c827a] block uppercase tracking-wider">
                                Total Model
                            </span>
                            <span className="text-2xl font-serif text-[#1c1a17] mt-1 block">
                                {models.length}
                            </span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#f7f5f0] flex items-center justify-center text-[#1c1a17]">
                            <User className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-[#ede7dd] shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-medium text-[#8c827a] block uppercase tracking-wider">
                                Model Aktif di Runway
                            </span>
                            <span className="text-2xl font-serif text-emerald-700 mt-1 block">
                                {activeCount} <span className="text-xs font-sans text-[#8c827a] font-normal">/ {models.length} tampil</span>
                            </span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                            <Eye className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-[#ede7dd] shadow-xs flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-medium text-[#8c827a] block uppercase tracking-wider">
                                Variasi Kategori
                            </span>
                            <span className="text-2xl font-serif text-[#1c1a17] mt-1 block">
                                {uniqueCategories.length} <span className="text-xs font-sans text-[#8c827a] font-normal">Kategori</span>
                            </span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#f7f5f0] flex items-center justify-center text-[#1c1a17]">
                            <Layers className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white rounded-2xl p-4 border border-[#ede7dd] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-[#8c827a] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari nama model, look, gelar, atau desainer..."
                            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-[#ede7dd] focus:outline-none focus:border-[#1c1a17] bg-[#faf8f5]"
                        />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Category Dropdown */}
                        <div className="relative">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="px-3 py-2 text-xs rounded-xl border border-[#ede7dd] bg-[#faf8f5] text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                            >
                                <option value="Semua">Semua Kategori</option>
                                {CATEGORIES.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Dropdown */}
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 text-xs rounded-xl border border-[#ede7dd] bg-[#faf8f5] text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                            >
                                <option value="Semua">Semua Status</option>
                                <option value="Aktif">Aktif Saja</option>
                                <option value="Nonaktif">Nonaktif Saja</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Model Grid Cards */}
                {loading ? (
                    <div className="bg-white rounded-3xl p-12 text-center text-[#8c827a] border border-[#ede7dd]">
                        <div className="w-8 h-8 border-2 border-[#1c1a17] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-xs font-medium">Memuat data Virtual Runway...</p>
                    </div>
                ) : filteredModels.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center text-[#8c827a] border border-[#ede7dd]">
                        <Sparkles className="w-10 h-10 text-[#c5baa8] mx-auto mb-3 stroke-1" />
                        <h3 className="font-serif text-lg text-[#1c1a17] mb-1">Belum Ada Model Runway</h3>
                        <p className="text-xs text-[#7d756d] max-w-sm mx-auto mb-4">
                            {searchTerm || categoryFilter !== 'Semua' || statusFilter !== 'Semua'
                                ? 'Tidak ada model yang cocok dengan kriteria filter saat ini.'
                                : 'Mulai tambahkan model panggung pertama Anda untuk tampil di panggung beranda.'}
                        </p>
                        <button
                            onClick={openAdd}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1c1a17] text-white text-xs font-semibold"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Tambah Model Baru</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredModels.map((item) => (
                            <div
                                key={item.id}
                                className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-2xs hover:shadow-md ${
                                    item.status === 'Aktif'
                                        ? 'border-[#ede7dd] hover:border-[#1c1a17]/40'
                                        : 'border-zinc-200 opacity-60 bg-zinc-50/50'
                                }`}
                            >
                                {/* Card Body */}
                                <div>
                                    {/* Image Display Area with transparent background pattern */}
                                    <div className="relative h-64 bg-gradient-to-b from-[#f2ece2] to-[#e6ded1] flex items-end justify-center overflow-hidden p-4">
                                        {/* Status Badge */}
                                        <div className="absolute top-3.5 left-3.5 z-10">
                                            <span
                                                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 shadow-2xs ${
                                                    item.status === 'Aktif'
                                                        ? 'bg-emerald-600 text-white'
                                                        : 'bg-zinc-600 text-white'
                                                }`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'Aktif' ? 'bg-white' : 'bg-zinc-300'}`}></span>
                                                {item.status}
                                            </span>
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute top-3.5 right-3.5 z-10">
                                            <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-[#6e6357] text-[10px] font-semibold tracking-wide border border-white/80 shadow-2xs">
                                                {item.category}
                                            </span>
                                        </div>

                                        {/* Model Image Cutout */}
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-[230px] w-auto max-w-full object-contain object-bottom drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.src = '/images/lineup/model_putera.png';
                                            }}
                                        />

                                        {/* Subtle Floor Shadow */}
                                        <div className="absolute bottom-1 w-32 h-3 rounded-full bg-black/25 blur-xs pointer-events-none"></div>
                                    </div>

                                    {/* Info Content */}
                                    <div className="p-5 space-y-3">
                                        <div>
                                            <h3 className="font-serif text-lg text-[#1c1a17] font-medium leading-snug group-hover:text-black">
                                                {item.name}
                                            </h3>
                                            <p className="text-xs text-[#8c827a] font-medium line-clamp-1 mt-0.5">
                                                {item.role}
                                            </p>
                                        </div>

                                        {/* Look info box */}
                                        <div className="p-3 rounded-2xl bg-[#faf8f5] border border-[#ede7dd] space-y-1">
                                            <span className="text-[9.5px] uppercase tracking-wider font-semibold text-[#8c827a] block">
                                                Look &amp; Busana
                                            </span>
                                            <p className="text-xs font-semibold text-[#1c1a17] leading-tight line-clamp-1">
                                                {item.lookTitle}
                                            </p>
                                            {item.lookDesc && (
                                                <p className="text-[11px] text-[#7d756d] line-clamp-2 leading-relaxed">
                                                    {item.lookDesc}
                                                </p>
                                            )}
                                        </div>

                                        {/* Meta Attributes */}
                                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                                            <div className="px-2.5 py-1.5 rounded-xl bg-[#faf8f5] border border-[#ede7dd]">
                                                <span className="text-[9px] uppercase tracking-wider text-[#8c827a] block">Desainer</span>
                                                <span className="font-medium text-[#1c1a17] truncate block">{item.designer || '-'}</span>
                                            </div>
                                            <div className="px-2.5 py-1.5 rounded-xl bg-[#faf8f5] border border-[#ede7dd]">
                                                <span className="text-[9px] uppercase tracking-wider text-[#8c827a] block">Postur</span>
                                                <span className="font-medium text-[#1c1a17] block">{item.height || '-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer Actions */}
                                <div className="px-5 pb-5 pt-1 border-t border-[#ede7dd]/60 flex items-center justify-between gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => toggleStatus(item)}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                                            item.status === 'Aktif'
                                                ? 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                                                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                        }`}
                                        title={item.status === 'Aktif' ? 'Sembunyikan dari Runway' : 'Tampilkan di Runway'}
                                    >
                                        {item.status === 'Aktif' ? (
                                            <>
                                                <EyeOff className="w-3.5 h-3.5" />
                                                <span>Nonaktifkan</span>
                                            </>
                                        ) : (
                                            <>
                                                <Eye className="w-3.5 h-3.5" />
                                                <span>Aktifkan</span>
                                            </>
                                        )}
                                    </button>

                                    <div className="flex items-center gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => openEdit(item)}
                                            className="p-2 rounded-xl text-[#635c55] hover:text-[#1c1a17] hover:bg-[#ede6dc]/60 transition cursor-pointer"
                                            title="Edit Model"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => confirmDelete(item)}
                                            className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition cursor-pointer"
                                            title="Hapus Model"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ================= ADD / EDIT MODAL ================= */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
                    <div className="bg-white rounded-3xl w-full max-w-2xl border border-[#ede7dd] shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-[#ede7dd] flex items-center justify-between bg-[#faf8f5]">
                            <div>
                                <h2 className="font-serif text-xl text-[#1c1a17]">
                                    {editingItem ? 'Edit Model Virtual Runway' : 'Tambah Model Virtual Runway'}
                                </h2>
                                <p className="text-xs text-[#8c827a] mt-0.5">
                                    Sesuaikan detail profil, look busana, dan foto model untuk panggung <em>virtual runway</em>.
                                </p>
                            </div>
                            <button
                                onClick={closeModal}
                                className="p-1.5 rounded-xl text-[#8c827a] hover:text-[#1c1a17] hover:bg-[#ede7dd]/50 transition cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
                            {/* Grid 2 Column for Basics */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1.5">
                                        Nama Model <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="Contoh: M. Fajar Shadiq"
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ede7dd] focus:outline-none focus:border-[#1c1a17] bg-[#faf8f5]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1.5">
                                        Gelar / Peran / Role <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.role}
                                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                                        placeholder="Contoh: Putera Kebudayaan Kalsel 2024"
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ede7dd] focus:outline-none focus:border-[#1c1a17] bg-[#faf8f5]"
                                    />
                                </div>
                            </div>

                            {/* Category & Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1.5">
                                        Kategori Look <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ede7dd] focus:outline-none focus:border-[#1c1a17] bg-[#faf8f5]"
                                    >
                                        {CATEGORIES.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1.5">
                                        Status Tampil
                                    </label>
                                    <select
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ede7dd] focus:outline-none focus:border-[#1c1a17] bg-[#faf8f5]"
                                    >
                                        <option value="Aktif">Aktif (Tampil di Home)</option>
                                        <option value="Nonaktif">Nonaktif (Disembunyikan)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Look Title */}
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1.5">
                                    Judul Busana / Look Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.lookTitle}
                                    onChange={(e) => setForm({ ...form, lookTitle: e.target.value })}
                                    placeholder="Contoh: Sasirangan Heritage Blazer with Formal Inner"
                                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ede7dd] focus:outline-none focus:border-[#1c1a17] bg-[#faf8f5]"
                                />
                            </div>

                            {/* Look Description */}
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1.5">
                                    Deskripsi Koleksi / Busana
                                </label>
                                <textarea
                                    rows="2"
                                    value={form.lookDesc}
                                    onChange={(e) => setForm({ ...form, lookDesc: e.target.value })}
                                    placeholder="Deskripsikan busana, warna, bahan, atau aksen unik..."
                                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ede7dd] focus:outline-none focus:border-[#1c1a17] bg-[#faf8f5]"
                                />
                            </div>

                            {/* Designer & Height */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1.5">
                                        Desainer / Wardrobe
                                    </label>
                                    <input
                                        type="text"
                                        value={form.designer}
                                        onChange={(e) => setForm({ ...form, designer: e.target.value })}
                                        placeholder="Contoh: Siluet Etnik / Siluet Signature"
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ede7dd] focus:outline-none focus:border-[#1c1a17] bg-[#faf8f5]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1.5">
                                        Tinggi / Postur
                                    </label>
                                    <input
                                        type="text"
                                        value={form.height}
                                        onChange={(e) => setForm({ ...form, height: e.target.value })}
                                        placeholder="Contoh: 180 cm"
                                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ede7dd] focus:outline-none focus:border-[#1c1a17] bg-[#faf8f5]"
                                    />
                                </div>
                            </div>

                            {/* Booking Button Text */}
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1.5">
                                    Teks Tombol Aksi (Booking Link)
                                </label>
                                <input
                                    type="text"
                                    value={form.bookingText}
                                    onChange={(e) => setForm({ ...form, bookingText: e.target.value })}
                                    placeholder="Contoh: Konsultasi Booking Model"
                                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#ede7dd] focus:outline-none focus:border-[#1c1a17] bg-[#faf8f5]"
                                />
                            </div>

                            {/* Image Upload Area */}
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1.5">
                                    Foto Model Cut-out (PNG Transparan Disarankan) {!editingItem && <span className="text-red-500">*</span>}
                                </label>
                                
                                <div className="border-2 border-dashed border-[#ede7dd] rounded-2xl p-4 bg-[#faf8f5] hover:border-[#1c1a17] transition-all flex flex-col items-center justify-center text-center">
                                    {imagePreview ? (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="relative h-44 bg-gradient-to-b from-[#efe9df] to-[#ded5c5] rounded-xl p-2 flex items-center justify-center border border-[#ede7dd]">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="h-full w-auto max-w-full object-contain object-bottom drop-shadow-md"
                                                />
                                            </div>
                                            <label className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-white border border-[#ede7dd] text-xs font-medium text-[#1c1a17] hover:bg-zinc-50 shadow-2xs">
                                                Ganti Foto
                                                <input
                                                    type="file"
                                                    accept="image/png,image/webp,image/jpeg,image/jpg"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer w-full py-6 flex flex-col items-center">
                                            <UploadCloud className="w-8 h-8 text-[#8c827a] mb-2" />
                                            <span className="text-xs font-semibold text-[#1c1a17]">
                                                Klik untuk unggah foto model
                                            </span>
                                            <span className="text-[11px] text-[#8c827a] mt-1 max-w-md">
                                                Format PNG transparan atau WebP tanpa latar belakang (latar belakang bersih). Maksimal 5MB.
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/png,image/webp,image/jpeg,image/jpg"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div className="pt-4 border-t border-[#ede7dd] flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2.5 rounded-xl border border-[#ede7dd] text-xs font-medium text-[#7d756d] hover:bg-[#ede7dd]/40 transition cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2.5 rounded-xl bg-[#1c1a17] hover:bg-[#2c2824] text-white text-xs font-semibold tracking-wide transition shadow-sm active:scale-98 disabled:opacity-50 cursor-pointer"
                                >
                                    {submitting ? 'Menyimpan...' : editingItem ? 'Perbarui Model' : 'Simpan Model'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ================= DELETE CONFIRMATION MODAL ================= */}
            {deleteModalOpen && selectedDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-3xl w-full max-w-md border border-[#ede7dd] shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                            <Trash2 className="w-6 h-6" />
                        </div>

                        <div className="text-center">
                            <h3 className="font-serif text-lg text-[#1c1a17]">
                                Hapus Model Runway?
                            </h3>
                            <p className="text-xs text-[#7d756d] mt-1 leading-relaxed">
                                Anda yakin ingin menghapus <strong>{selectedDelete.name}</strong> ({selectedDelete.lookTitle}) dari Virtual Runway? Data yang dihapus tidak dapat dipulihkan.
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => {
                                    setDeleteModalOpen(false);
                                    setSelectedDelete(null);
                                }}
                                className="px-4 py-2.5 rounded-xl border border-[#ede7dd] text-xs font-medium text-[#7d756d] hover:bg-[#ede7dd]/40 transition cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold tracking-wide transition shadow-sm active:scale-98 cursor-pointer"
                            >
                                Hapus Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

