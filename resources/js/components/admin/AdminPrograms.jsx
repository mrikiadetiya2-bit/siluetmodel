import React, { useState, useMemo, useEffect } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Plus, Trash2, X, CheckCircle2 } from 'lucide-react';
import { programService } from '../../services/programService.js';
import { api, apiErrorMessage } from '../../services/api.js';

export default function AdminPrograms() {
    const [programCategoryFilter, setProgramCategoryFilter] = useState('Semua');
    const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
    const [editingProgram, setEditingProgram] = useState(null);
    const [deletingProgram, setDeletingProgram] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const showToast = (msg) => { setToastMessage(msg); setTimeout(() => setToastMessage(null), 3500); };
    const [programs, setPrograms] = useState([]);
    const [search, setSearch] = useState('');
    const [requestError, setRequestError] = useState('');
    const imageSrc = (image) => image ? (image.startsWith('http') ? image : `${window.location.origin}${image.startsWith('/') ? '' : '/'}${image}`) : '';

    const [newProgram, setNewProgram] = useState({
        title: '',
        category: 'Basic Modeling',
        duration: '3 Bulan',
        price: 'Rp 4.500.000',
        quota: '25'
    });
    const [newProgramImage, setNewProgramImage] = useState(null);
    const [mentors, setMentors] = useState([]);
    const [newSchedule, setNewSchedule] = useState({ mentor_id: '', class_day: 'Saturday', first_class_date: '', class_start_time: '09:00', class_end_time: '10:00', meeting_count: '12', location: '' });
    const [editingProgramImage, setEditingProgramImage] = useState(null);
    const getNextClassDate = (day, requestedDate = '') => {
        const date = requestedDate ? new Date(`${requestedDate}T00:00:00`) : new Date();
        date.setHours(0, 0, 0, 0);
        const dayIndex = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(day);
        const daysUntil = (dayIndex - date.getDay() + 7) % 7;
        date.setDate(date.getDate() + daysUntil);
        if (date <= new Date(new Date().setHours(0, 0, 0, 0))) date.setDate(date.getDate() + 7);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };
    const effectiveFirstClassDate = getNextClassDate(newSchedule.class_day, newSchedule.first_class_date);

    useEffect(() => {
        programService.list().then(setPrograms).catch(error => setRequestError(apiErrorMessage(error)));
        api('/api/admin/mentors').then(result => setMentors((result.data || []).filter(mentor => mentor.active))).catch(error => setRequestError(apiErrorMessage(error)));
    }, []);

    const handleAddProgramSubmit = async (e) => {
        e.preventDefault();
        const created = new FormData();
        created.append('title', newProgram.title);
        created.append('category', newProgram.category);
        created.append('duration', newProgram.duration);
        created.append('price', Number(String(newProgram.price).replace(/[^0-9]/g, '')));
        created.append('quota', parseInt(newProgram.quota) || 20);
        created.append('status', 'Aktif');
        Object.entries({ ...newSchedule, first_class_date: effectiveFirstClassDate }).forEach(([key, value]) => created.append(key, value));
        created.append('description', newProgram.description || '');
        (newProgram.perks || '').split('\n').map(item => item.trim()).filter(Boolean).forEach((item, index) => created.append(`perks[${index}]`, item));
        if (!newProgramImage) {
            setRequestError('Gambar kelas wajib diunggah.');
            return;
        }
        if (!newSchedule.mentor_id) { setRequestError('Pilih mentor aktif untuk program ini.'); return; }
        created.append('image', newProgramImage);
        try {
            const saved = await programService.create(created);
            setPrograms(current => [saved, ...current]);
        } catch (error) { setRequestError(apiErrorMessage(error)); return; }
        setIsAddProgramOpen(false);
        showToast(`Program "${newProgram.title}" berhasil ditambahkan!`);
        setNewProgramImage(null);
        setNewSchedule({ mentor_id: '', class_day: 'Saturday', first_class_date: '', class_start_time: '09:00', class_end_time: '10:00', meeting_count: '12', location: '' });
        setNewProgram({ title: '', category: 'Basic Modeling', duration: '3 Bulan', price: 'Rp 4.500.000', quota: '25' });
    };

    const handleEditProgramSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        Object.entries({ ...editingProgram, price: Number(String(editingProgram.price).replace(/[^0-9]/g, '')), quota: Number(editingProgram.quota) }).forEach(([key, value]) => {
            if (key === 'id' || key === 'image' || key === 'enrolled' || value === null || value === undefined) return;
            if (Array.isArray(value)) {
                value.forEach((item, index) => payload.append(`${key}[${index}]`, String(item)));
            } else {
                payload.append(key, String(value));
            }
        });
        if (editingProgramImage) payload.append('image', editingProgramImage);
        try {
            const saved = await programService.update(editingProgram.id, payload);
            setPrograms(rows => rows.map(row => row.id === saved.id ? saved : row));
            setEditingProgram(null);
            setEditingProgramImage(null);
            showToast(`Program "${saved.title}" berhasil diperbarui.`);
        } catch (error) { setRequestError(apiErrorMessage(error)); }
    };

    const handleDeleteProgram = async () => {
        if (!deletingProgram) return;
        try {
            const result = await programService.remove(deletingProgram.id);
            if (result.program) {
                setPrograms(rows => rows.map(row => row.id === result.program.id ? result.program : row));
                showToast('Program dinonaktifkan karena memiliki riwayat pendaftaran.');
            } else {
                setPrograms(rows => rows.filter(row => row.id !== deletingProgram.id));
                showToast('Program berhasil dihapus.');
            }
            setDeletingProgram(null);
        } catch (error) {
            setRequestError(apiErrorMessage(error));
            showToast(apiErrorMessage(error));
            setDeletingProgram(null);
        }
    };

    const filteredPrograms = useMemo(() => {
        return programs.filter(p => (programCategoryFilter === 'Semua' || p.category === programCategoryFilter) && (!search || `${p.title} ${p.category}`.toLowerCase().includes(search.toLowerCase())));
    }, [programs, programCategoryFilter, search]);

    return (
        <AdminLayout activeNav="Program Pelatihan" breadcrumb="Program Pelatihan">
            <input aria-label="Cari program" value={search} onChange={event => setSearch(event.target.value)} placeholder="Cari program…" className="w-full rounded-xl border border-[#ede7dd] bg-white px-4 py-3 text-sm" />
            {requestError && <p role="alert" className="text-sm text-red-700">{requestError}</p>}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                        MANAJEMEN KURIKULUM
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                        Program Pelatihan
                    </h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                        Kelola paket kurikulum, durasi kelas, biaya pelatihan, dan kuota peserta.
                    </p>
                </div>
                <button
                    onClick={() => setIsAddProgramOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Program Baru
                </button>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c] block">Total Program Aktif</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">{programs.filter(program => program.status === 'Aktif').length} Paket Kelas</div>
                    <span className="text-[11px] text-emerald-600 mt-1 block">Status dari database</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c] block">Total Peserta Terdaftar</span>
                        <div className="text-2xl font-bold text-[#1c1a17] mt-1">{programs.reduce((total, program) => total + Number(program.enrolled || 0), 0)} Siswa</div>
                    <span className="text-[11px] text-[#78716c] mt-1 block">Pendaftaran tersimpan</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c] block">Tingkat Kelulusan Alumni</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">96.4%</div>
                    <span className="text-[11px] text-[#78716c] mt-1 block">Belum tersedia dari backend</span>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#ede7dd]">
                <div className="flex flex-wrap gap-1.5">
                    {['Semua', 'Basic Modeling', 'Advanced Modeling', 'Runway & Catwalk', 'Commercial Modeling'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setProgramCategoryFilter(cat)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                                programCategoryFilter === cat
                                    ? 'bg-[#1c1a17] text-white shadow-xs'
                                    : 'text-[#68625c] hover:bg-[#ede7dd]/50'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <span className="text-xs text-[#8c827a] px-2">
                    Menampilkan {filteredPrograms.length} program
                </span>
            </div>

            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPrograms.map((prog) => (
                    <div key={prog.id} className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group">
                        <div className="relative h-44 overflow-hidden bg-[#eee8dd]">
                            <img
                                src={imageSrc(prog.image)}
                                onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
                                alt={prog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                            />
                            <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-xs ${
                                prog.status === 'Aktif' ? 'bg-emerald-500/90 text-white border-emerald-400' :
                                prog.status === 'Penuh' ? 'bg-amber-500/90 text-white border-amber-400' : 'bg-gray-600/90 text-white border-gray-400'
                            }`}>
                                {prog.status}
                            </span>
                            <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider font-semibold bg-black/60 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                                {prog.category}
                            </span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold text-base text-[#1c1a17] leading-snug">
                                    {prog.title}
                                </h3>
                                <p className="text-xs text-[#78716c] mt-1.5 line-clamp-2 leading-relaxed">
                                    {prog.description}
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-[#f3efe8] space-y-3">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-[#8c827a]">Durasi:</span>
                                    <span className="font-medium text-[#1c1a17]">{prog.duration}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-[#8c827a]">Biaya:</span>
                                    <span className="font-bold text-[#1c1a17]">Rp {Number(prog.price).toLocaleString('id-ID')}</span>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] text-[#78716c] mb-1">
                                        <span>Kuota: {Number(prog.enrolled || 0)}/{Number(prog.quota || 0)} Siswa</span>
                                        <span>{prog.quota > 0 ? Math.round((Number(prog.enrolled || 0) / Number(prog.quota)) * 100) : 0}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#f0ebe3] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#1c1a17] rounded-full transition-all"
                                            style={{ width: `${prog.quota > 0 ? Math.min((Number(prog.enrolled || 0) / Number(prog.quota)) * 100, 100) : 0}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <button
                                        onClick={() => setEditingProgram({ ...prog, enrolled: prog.enrolled || 0, mentor: prog.mentor || '', description: prog.description || '', image: prog.image || '', syllabus: prog.syllabus || [], perks: prog.perks || [] })}
                                        className="flex-1 py-1.5 text-xs font-medium text-[#1c1a17] bg-[#f7f5f0] hover:bg-[#ede7dd] rounded-xl transition text-center"
                                    >
                                        Edit Kelas
                                    </button>
                                    <button
                                        onClick={() => setDeletingProgram(prog)}
                                        className="px-3 py-1.5 text-xs text-[#78716c] hover:text-[#1c1a17] hover:bg-[#f7f5f0] rounded-xl border border-[#ede7dd]"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                                        <span className="sr-only">Hapus program</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Tambah Program */}
            {isAddProgramOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start sm:items-center justify-center overflow-y-auto p-3 sm:p-5">
                    <div role="dialog" aria-modal="true" aria-labelledby="add-program-title" className="bg-white rounded-2xl max-w-xl w-full max-h-[calc(100vh-1.5rem)] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100vh-2.5rem)] sm:max-h-[calc(100dvh-2.5rem)] flex flex-col shadow-2xl border border-[#ede7dd]">
                        <div className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-6 border-b border-[#ede7dd]">
                            <h3 id="add-program-title" className="font-serif text-xl font-normal text-[#1c1a17]">Tambah Program Baru</h3>
                            <button onClick={() => setIsAddProgramOpen(false)} className="p-1.5 text-[#8c827a] hover:text-[#1c1a17]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddProgramSubmit} className="overflow-y-auto overscroll-contain px-5 py-4 sm:px-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Nama Program</label>
                                <input
                                    type="text"
                                    required
                                    value={newProgram.title}
                                    onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Kategori</label>
                                    <select
                                        value={newProgram.category}
                                        onChange={(e) => setNewProgram({ ...newProgram, category: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none"
                                    >
                                        <option value="Basic Modeling">Basic Modeling</option>
                                        <option value="Advanced Modeling">Advanced Modeling</option>
                                        <option value="Runway & Catwalk">Runway & Catwalk</option>
                                        <option value="Commercial Modeling">Commercial Modeling</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Durasi</label>
                                    <input
                                        type="text"
                                        value={newProgram.duration}
                                        onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Biaya Pelatihan</label>
                                    <input
                                        type="text"
                                        value={newProgram.price}
                                        onChange={(e) => setNewProgram({ ...newProgram, price: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Kuota</label>
                                    <input
                                        type="number"
                                        value={newProgram.quota}
                                        onChange={(e) => setNewProgram({ ...newProgram, quota: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none"
                                    />
                                </div>
                            </div>
                            <label className="block text-xs font-semibold text-[#1c1a17]">Deskripsi
                                <textarea value={newProgram.description || ''} onChange={e => setNewProgram({ ...newProgram, description: e.target.value })} className="mt-1 w-full rounded-xl border border-[#ded7cb] px-3 py-2" />
                            </label>
                            <label className="block text-xs font-semibold text-[#1c1a17]">Benefit
                                <textarea rows="3" placeholder="Satu benefit per baris" value={newProgram.perks || ''} onChange={e => setNewProgram({ ...newProgram, perks: e.target.value })} className="mt-1 w-full rounded-xl border border-[#ded7cb] px-3 py-2" />
                            </label>
                            <div className="rounded-xl border border-[#ded7cb] bg-[#fbfaf8] p-3 space-y-3">
                                <h4 className="text-xs font-bold text-[#1c1a17]">Jadwal Pertemuan Mingguan</h4>
                                <label className="block text-xs font-semibold">Mentor
                                    <select required value={newSchedule.mentor_id} onChange={e => setNewSchedule({ ...newSchedule, mentor_id: e.target.value })} className="mt-1 w-full rounded-xl border border-[#ded7cb] px-3 py-2">
                                        <option value="">Pilih mentor</option>{mentors.map(mentor => <option key={mentor.id} value={mentor.id}>{mentor.name}</option>)}
                                    </select>
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="text-xs font-semibold">Hari
                                        <select value={newSchedule.class_day} onChange={e => setNewSchedule({ ...newSchedule, class_day: e.target.value })} className="mt-1 w-full rounded-xl border border-[#ded7cb] px-3 py-2">
                                            {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day, index) => <option key={day} value={day}>{['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'][index]}</option>)}
                                        </select>
                                    </label>
                                    <label className="text-xs font-semibold">Pertemuan pertama
                                        <input type="date" min={new Date().toISOString().slice(0, 10)} value={newSchedule.first_class_date || effectiveFirstClassDate} onChange={e => setNewSchedule({ ...newSchedule, first_class_date: e.target.value })} className="mt-1 w-full rounded-xl border border-[#ded7cb] px-3 py-2" />
                                    </label>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="text-xs font-semibold">Jam mulai<input required type="time" value={newSchedule.class_start_time} onChange={e => setNewSchedule({ ...newSchedule, class_start_time: e.target.value })} className="mt-1 w-full rounded-xl border border-[#ded7cb] px-3 py-2" /></label>
                                    <label className="text-xs font-semibold">Jam selesai<input required type="time" value={newSchedule.class_end_time} onChange={e => setNewSchedule({ ...newSchedule, class_end_time: e.target.value })} className="mt-1 w-full rounded-xl border border-[#ded7cb] px-3 py-2" /></label>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="text-xs font-semibold">Jumlah pertemuan<input required type="number" min="1" max="100" value={newSchedule.meeting_count} onChange={e => setNewSchedule({ ...newSchedule, meeting_count: e.target.value })} className="mt-1 w-full rounded-xl border border-[#ded7cb] px-3 py-2" /></label>
                                    <label className="text-xs font-semibold">Lokasi<input required type="text" value={newSchedule.location} onChange={e => setNewSchedule({ ...newSchedule, location: e.target.value })} className="mt-1 w-full rounded-xl border border-[#ded7cb] px-3 py-2" /></label>
                                </div>
                                <p className="text-[11px] text-[#78716c]">Pertemuan pertama: {new Date(`${effectiveFirstClassDate}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}. Jika tanggal yang dipilih terlewat, jadwal otomatis maju ke minggu berikutnya pada hari yang sama. Pertemuan selanjutnya dibuat setiap minggu.</p>
                            </div>
                            <label className="block text-xs font-semibold text-[#1c1a17]">Unggah gambar kelas
                                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => setNewProgramImage(e.target.files?.[0] || null)} className="mt-1 w-full rounded-xl border border-[#ded7cb] px-3 py-2" />
                                <span className="mt-1 block text-[11px] font-normal text-[#78716c]">JPG, PNG, atau WebP. Maksimal 5 MB.</span>
                            </label>
                            <div className="sticky bottom-0 -mx-5 sm:-mx-6 px-5 sm:px-6 py-3 bg-white/95 backdrop-blur border-t border-[#ede7dd] flex items-center justify-end gap-3">
                                <button type="button" onClick={() => setIsAddProgramOpen(false)} className="px-4 py-2 text-xs font-medium text-[#78716c]">
                                    Batal
                                </button>
                                <button type="submit" className="px-5 py-2 bg-[#1c1a17] text-white rounded-xl text-xs font-medium">
                                    Simpan Program
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {editingProgram && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onMouseDown={event => { if (event.target === event.currentTarget) setEditingProgram(null); }}>
                    <div role="dialog" aria-modal="true" aria-labelledby="edit-program-title" className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-[#ede7dd]">
                        <div className="flex items-center justify-between pb-4 border-b border-[#ede7dd]">
                            <div><h3 id="edit-program-title" className="font-serif text-xl text-[#1c1a17]">Edit Program</h3><p className="text-xs text-[#78716c] mt-1">Ubah seluruh informasi kelas.</p></div>
                            <button type="button" onClick={() => setEditingProgram(null)} aria-label="Tutup" className="p-1.5 text-[#8c827a]"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleEditProgramSubmit} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                ['title', 'Nama program', 'text'], ['duration', 'Durasi', 'text'],
                                ['price', 'Biaya (Rp)', 'number'], ['quota', 'Kuota', 'number'], ['mentor', 'Mentor', 'text'],
                            ].map(([key, label, type]) => <label key={key} className="text-xs font-semibold text-[#1c1a17]">{label}<input required={['title','category','duration','price','quota'].includes(key)} type={type} min={type === 'number' ? 0 : undefined} value={editingProgram[key] ?? ''} onChange={event => setEditingProgram(current => ({ ...current, [key]: event.target.value }))} className="mt-1 w-full rounded-xl border border-[#ded7cb] bg-[#fbfaf8] px-3.5 py-2.5 text-sm font-normal" /></label>)}
                            <label className="text-xs font-semibold text-[#1c1a17]">Kategori<select required value={editingProgram.category ?? ''} onChange={event => setEditingProgram(current => ({ ...current, category: event.target.value }))} className="mt-1 w-full rounded-xl border border-[#ded7cb] bg-[#fbfaf8] px-3.5 py-2.5 text-sm font-normal">{[...new Set(['Basic Modeling', 'Advanced Modeling', 'Runway & Catwalk', 'Commercial Modeling', editingProgram.category].filter(Boolean))].map(category => <option key={category} value={category}>{category}</option>)}</select></label>
                            <label className="text-xs font-semibold text-[#1c1a17] sm:col-span-2">Unggah gambar kelas<input type="file" accept="image/jpeg,image/png,image/webp" onChange={event => setEditingProgramImage(event.target.files?.[0] || null)} className="mt-1 w-full rounded-xl border border-[#ded7cb] bg-[#fbfaf8] px-3.5 py-2.5 text-sm font-normal" /><span className="mt-1 block font-normal text-[#78716c]">{editingProgramImage?.name || 'Pilih gambar baru untuk mengganti gambar saat ini. JPG, PNG, atau WebP; maksimal 5 MB.'}</span></label>
                            <label className="text-xs font-semibold text-[#1c1a17]">Status<select value={editingProgram.status} onChange={event => setEditingProgram(current => ({ ...current, status: event.target.value }))} className="mt-1 w-full rounded-xl border border-[#ded7cb] bg-[#fbfaf8] px-3.5 py-2.5 text-sm font-normal">{['Aktif','Penuh','Draft','Nonaktif'].map(status => <option key={status}>{status}</option>)}</select></label>
                            <label className="text-xs font-semibold text-[#1c1a17] sm:col-span-2">Deskripsi<textarea rows="3" value={editingProgram.description} onChange={event => setEditingProgram(current => ({ ...current, description: event.target.value }))} className="mt-1 w-full rounded-xl border border-[#ded7cb] bg-[#fbfaf8] px-3.5 py-2.5 text-sm font-normal" /></label>
                            <label className="text-xs font-semibold text-[#1c1a17] sm:col-span-2">Benefit<textarea rows="3" placeholder="Satu benefit per baris" value={(editingProgram.perks || []).join('\n')} onChange={event => setEditingProgram(current => ({ ...current, perks: event.target.value.split('\n') }))} className="mt-1 w-full rounded-xl border border-[#ded7cb] bg-[#fbfaf8] px-3.5 py-2.5 text-sm font-normal" /></label>
                            <div className="sm:col-span-2 flex justify-end gap-3 border-t border-[#ede7dd] pt-4"><button type="button" onClick={() => setEditingProgram(null)} className="px-4 py-2 text-sm text-[#78716c]">Batal</button><button type="submit" className="rounded-xl bg-[#1c1a17] px-5 py-2.5 text-sm text-white">Simpan Perubahan</button></div>
                        </form>
                    </div>
                </div>
            )}
            {deletingProgram && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onMouseDown={event => { if (event.target === event.currentTarget) setDeletingProgram(null); }}>
                    <div role="alertdialog" aria-modal="true" aria-labelledby="delete-program-title" aria-describedby="delete-program-description" className="w-full max-w-md rounded-2xl border border-[#ede7dd] bg-white p-6 shadow-2xl">
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-700"><Trash2 className="h-5 w-5" /></div>
                        <h3 id="delete-program-title" className="font-serif text-xl text-[#1c1a17]">Hapus program?</h3>
                        <p id="delete-program-description" className="mt-2 text-sm leading-6 text-[#78716c]">Setujui untuk menghapus <strong className="text-[#1c1a17]">{deletingProgram.title}</strong>. Jika program memiliki riwayat pendaftaran, program akan dinonaktifkan, bukan dihapus.</p>
                        <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setDeletingProgram(null)} className="rounded-xl border border-[#ded7cb] px-4 py-2.5 text-sm font-medium text-[#5f574f] hover:bg-[#f7f5f0]">Batalkan</button><button type="button" onClick={handleDeleteProgram} className="rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800">Setujui</button></div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
