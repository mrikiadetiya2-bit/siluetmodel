import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Plus, Eye, X, CheckCircle2 } from 'lucide-react';

export default function AdminPrograms() {
    const [programCategoryFilter, setProgramCategoryFilter] = useState('Semua');
    const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const [programs, setPrograms] = useState([
        {
            id: 'prog-1',
            title: 'Basic Modeling Intensive',
            category: 'Basic Modeling',
            duration: '12 Sesi (3 Bulan)',
            price: 'Rp 4.500.000',
            enrolled: 24,
            quota: 25,
            mentor: 'Nadia Putri & Valerie L.',
            status: 'Aktif',
            image: '/images/card_basic.jpg',
            description: 'Pelatihan dasar postur tubuh, ekspresi wajah, camera awareness, dan dasar-dasar catwalk untuk pemula.'
        },
        {
            id: 'prog-2',
            title: 'Advanced Editorial & Posing',
            category: 'Advanced Modeling',
            duration: '16 Sesi (4 Bulan)',
            price: 'Rp 6.800.000',
            enrolled: 18,
            quota: 20,
            mentor: 'Aura Clarissa',
            status: 'Aktif',
            image: '/images/card_advanced.jpg',
            description: 'Penguasaan pose editorial majalah mode kelas atas, ekspresi emosional, dan portfolio photoshoot tematik.'
        },
        {
            id: 'prog-3',
            title: 'Professional Runway & Catwalk',
            category: 'Runway & Catwalk',
            duration: '14 Sesi (3.5 Bulan)',
            price: 'Rp 7.500.000',
            enrolled: 15,
            quota: 15,
            mentor: 'Jessica Tania',
            status: 'Penuh',
            image: '/images/card_runway.jpg',
            description: 'Teknik berjalan haute couture, tempo musik panggung, garment handling, dan persiapan audisi fashion week.'
        },
        {
            id: 'prog-4',
            title: 'Commercial TVC & Audition Mastery',
            category: 'Commercial Modeling',
            duration: '10 Sesi (2.5 Bulan)',
            price: 'Rp 5.200.000',
            enrolled: 19,
            quota: 20,
            mentor: 'Citra Anindya',
            status: 'Aktif',
            image: '/images/card_commercial.jpg',
            description: 'Simulasi casting iklan komersial, akting produk, video reel profesional, dan personal branding agensi.'
        },
        {
            id: 'prog-5',
            title: 'Male Posture & Fashion Week Runway',
            category: 'Runway & Catwalk',
            duration: '12 Sesi (3 Bulan)',
            price: 'Rp 4.900.000',
            enrolled: 14,
            quota: 15,
            mentor: 'Dimas Wicaksono',
            status: 'Aktif',
            image: '/images/beige_suit.jpg',
            description: 'Kurikulum postur tegap pria, stride runway maskulin, tailoring presentation, dan streetwear modeling.'
        },
        {
            id: 'prog-6',
            title: 'Kids & Teens Confidence Star',
            category: 'Basic Modeling',
            duration: '8 Sesi (2 Bulan)',
            price: 'Rp 3.800.000',
            enrolled: 12,
            quota: 15,
            mentor: 'Elena Siluet',
            status: 'Aktif',
            image: '/images/hero-model.jpg',
            description: 'Pembentukan rasa percaya diri, etiket anak, senyum natural di depan kamera, dan panggung peragaan busana anak.'
        },
        {
            id: 'prog-7',
            title: 'International Fashion Week Masterclass',
            category: 'Advanced Modeling',
            duration: '8 Sesi Intensif',
            price: 'Rp 9.000.000',
            enrolled: 10,
            quota: 10,
            mentor: 'Aura Clarissa',
            status: 'Penuh',
            image: '/images/blazer_suit.jpg',
            description: 'Pelatihan eksklusif untuk persiapan audisi peragaan busana di Milan, Paris, dan Jakarta Fashion Week.'
        },
        {
            id: 'prog-8',
            title: 'Beauty Pageant & Public Speaking',
            category: 'Commercial Modeling',
            duration: '16 Sesi (4 Bulan)',
            price: 'Rp 8.200.000',
            enrolled: 8,
            quota: 12,
            mentor: 'Nadia Putri',
            status: 'Draft',
            image: '/images/about-portrait.jpg',
            description: 'Kombinasi catwalk gaun malam, teknik menjawab Q&A di panggung, advokasi sosial, dan personal styling.'
        }
    ]);

    const [newProgram, setNewProgram] = useState({
        title: '',
        category: 'Basic Modeling',
        duration: '3 Bulan',
        price: 'Rp 4.500.000',
        quota: '25'
    });

    const handleAddProgramSubmit = (e) => {
        e.preventDefault();
        const created = {
            id: `prog-${Date.now()}`,
            title: newProgram.title,
            category: newProgram.category,
            duration: newProgram.duration,
            price: newProgram.price,
            enrolled: 0,
            quota: parseInt(newProgram.quota) || 20,
            mentor: 'Tim Mentor Siluet',
            status: 'Aktif',
            image: '/images/card_basic.jpg',
            description: 'Program pelatihan baru yang dirancang khusus untuk meningkatkan potensi peserta.'
        };
        setPrograms([created, ...programs]);
        setIsAddProgramOpen(false);
        showToast(`Program "${newProgram.title}" berhasil ditambahkan!`);
        setNewProgram({ title: '', category: 'Basic Modeling', duration: '3 Bulan', price: 'Rp 4.500.000', quota: '25' });
    };

    const filteredPrograms = useMemo(() => {
        if (programCategoryFilter === 'Semua') return programs;
        return programs.filter(p => p.category === programCategoryFilter);
    }, [programs, programCategoryFilter]);

    return (
        <AdminLayout activeNav="Program Pelatihan" breadcrumb="Program Pelatihan">
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
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">8 Paket Kelas</div>
                    <span className="text-[11px] text-emerald-600 mt-1 block">4 Reguler • 4 Masterclass</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c] block">Total Peserta Terdaftar</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">528 Siswa</div>
                    <span className="text-[11px] text-[#78716c] mt-1 block">Rata-rata 92% okupansi kelas</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c] block">Tingkat Kelulusan Alumni</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">96.4%</div>
                    <span className="text-[11px] text-emerald-600 mt-1 block">Tersertifikasi standar model</span>
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
                                src={prog.image}
                                alt={prog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
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
                                    <span className="font-bold text-[#1c1a17]">{prog.price}</span>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[11px] text-[#78716c] mb-1">
                                        <span>Kuota: {prog.enrolled}/{prog.quota} Siswa</span>
                                        <span>{Math.round((prog.enrolled / prog.quota) * 100)}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#f0ebe3] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#1c1a17] rounded-full transition-all"
                                            style={{ width: `${(prog.enrolled / prog.quota) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <button
                                        onClick={() => showToast(`Edit program: ${prog.title}`)}
                                        className="flex-1 py-1.5 text-xs font-medium text-[#1c1a17] bg-[#f7f5f0] hover:bg-[#ede7dd] rounded-xl transition text-center"
                                    >
                                        Edit Kelas
                                    </button>
                                    <button
                                        onClick={() => showToast(`Melihat daftar siswa: ${prog.title}`)}
                                        className="px-3 py-1.5 text-xs text-[#78716c] hover:text-[#1c1a17] hover:bg-[#f7f5f0] rounded-xl border border-[#ede7dd]"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Tambah Program */}
            {isAddProgramOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#ede7dd]">
                        <div className="flex items-center justify-between pb-4 border-b border-[#ede7dd]">
                            <h3 className="font-serif text-xl font-normal text-[#1c1a17]">Tambah Program Baru</h3>
                            <button onClick={() => setIsAddProgramOpen(false)} className="p-1.5 text-[#8c827a] hover:text-[#1c1a17]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddProgramSubmit} className="mt-5 space-y-4">
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
                            <div className="pt-3 flex items-center justify-end gap-3">
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
        </AdminLayout>
    );
}
