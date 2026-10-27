import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { authService } from '../../services/authService.js';
import { programService } from '../../services/programService.js';
import { apiErrorMessage } from '../../services/api.js';
import {
    Users,
    BookOpen,
    User,
    Wallet,
    BarChart3,
    ArrowUpRight,
    ArrowRight,
    Plus,
    X,
    CheckCircle2
} from 'lucide-react';

export default function AdminOverview() {
    const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [dashboard, setDashboard] = useState(null);
    const [reports, setReports] = useState(null);
    const [requestError, setRequestError] = useState('');

    React.useEffect(() => {
        Promise.all([authService.dashboard(), fetch('/api/admin/reports?per_page=5', { headers: { Accept: 'application/json' } }).then(response => { if (!response.ok) throw new Error('Gagal memuat laporan dashboard.'); return response.json(); })])
            .then(([summary, report]) => { setDashboard(summary); setReports(report); })
            .catch(error => setRequestError(apiErrorMessage(error)));
    }, []);

    const [newProgram, setNewProgram] = useState({
        title: '',
        category: 'Basic Modeling',
        duration: '3 Bulan',
        price: 'Rp 4.500.000',
        quota: '25'
    });

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const handleAddProgramSubmit = async (e) => {
        e.preventDefault();
        try {
            await programService.create({ ...newProgram, price: Number(String(newProgram.price).replace(/[^0-9]/g, '')), quota: Number(newProgram.quota), status: 'Aktif' });
        } catch (error) { setRequestError(apiErrorMessage(error)); return; }
        setIsAddProgramOpen(false);
        showToast(`Program "${newProgram.title}" berhasil ditambahkan!`);
        setNewProgram({
            title: '',
            category: 'Basic Modeling',
            duration: '3 Bulan',
            price: 'Rp 4.500.000',
            quota: '25'
        });
    };

    const donutData = (reports?.by_program || []).map(item => ({ label: item.program?.title || 'Program', value: Number(item.enrollment_count), color: '#1c1a17' }));
    const recentRegistrations = reports?.enrollments?.data || [];
    const recentActivities = recentRegistrations.map(enrollment => ({
        icon: Users,
        title: enrollment.participant?.user?.name || 'Peserta baru',
        desc: `Mendaftar ${enrollment.program?.title || 'program'}`,
        time: enrollment.enrolled_at ? new Date(enrollment.enrolled_at).toLocaleDateString('id-ID') : '—',
    }));

    return (
        <AdminLayout activeNav="Dashboard" breadcrumb="Overview">
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}
            {requestError && <p role="alert" className="text-sm text-red-700">{requestError}</p>}

            {/* Header Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                        SILUET MODEL TALA
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                        Selamat pagi, Admin.
                    </h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                        Berikut ringkasan aktivitas Siluet Model Tala hari ini.
                    </p>
                </div>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                        <Users className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-medium text-[#78716c] block">Total Peserta</span>
                    <div className="text-3xl font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">{dashboard?.statistics?.participants ?? '—'}</div>
                    <Users className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                </div>

                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                        <BookOpen className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-medium text-[#78716c] block">Program Aktif</span>
                    <div className="text-3xl font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">{dashboard?.statistics?.activePrograms ?? '—'}</div>
                    <BookOpen className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                </div>

                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                        <User className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-medium text-[#78716c] block">Total Pendaftaran</span>
                    <div className="text-3xl font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">{dashboard?.statistics?.enrollments ?? '—'}</div>
                    <User className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                </div>

                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                        <Wallet className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-medium text-[#78716c] block">Pembayaran Menunggu</span>
                    <div className="text-2xl lg:text-[26px] font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">{dashboard?.statistics?.pendingPayments ?? '—'}</div>
                    <BarChart3 className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white border border-[#ede7dd] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-lg text-[#1c1a17] tracking-tight">Statistik Pendaftaran</h3>
                            <p className="text-xs text-[#78716c] mt-0.5">Ringkasan tren tersedia setelah laporan berbasis periode dikonfigurasi.</p>
                        </div>
                        <span className="text-xs text-[#78716c]">Belum tersedia</span>
                    </div>

                    <div className="flex h-56 items-center justify-center text-sm text-[#78716c]">Belum ada data tren per periode.</div>
                </div>

                <div className="lg:col-span-5 bg-white border border-[#ede7dd] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-lg text-[#1c1a17] tracking-tight">Distribusi Program</h3>
                        <p className="text-xs text-[#78716c] mt-0.5">Distribusi peserta per program belum tersedia dari backend.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4 my-auto">
                        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                                <circle cx="80" cy="80" r="62" fill="transparent" stroke="#ede7dd" strokeWidth="22" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                                <span className="text-2xl font-bold text-[#1c1a17] leading-tight">{dashboard?.statistics?.participants ?? '—'}</span>
                                <span className="text-[11px] text-[#8c827a]">Peserta</span>
                            </div>
                        </div>
                        <div className="space-y-3.5 w-full">
                            {donutData.map((item) => (
                                <div key={item.label} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                        <span className="text-[#68625c] font-medium">{item.label}</span>
                                    </div>
                                    <span className="font-semibold text-[#1c1a17] ml-2">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="hidden lg:col-span-7 bg-white border border-[#ede7dd] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-lg text-[#1c1a17] tracking-tight">Pendaftaran Terbaru</h3>
                            <p className="text-xs text-[#78716c] mt-0.5">Peserta yang baru melakukan pendaftaran.</p>
                        </div>
                        <a href="/admin/peserta" className="text-xs font-medium text-[#78716c] hover:text-[#1c1a17] flex items-center gap-1 transition">
                            <span>Lihat Semua</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#f3efe8] text-[11px] font-medium text-[#8c827a]">
                                    <th className="py-2.5 font-normal">Nama Peserta</th>
                                    <th className="py-2.5 font-normal">Program</th>
                                    <th className="py-2.5 font-normal">Tanggal Daftar</th>
                                    <th className="py-2.5 font-normal">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f5f1eb] text-xs">
                                {recentRegistrations.map((row) => (
                                    <tr key={row.id} className="hover:bg-[#fbf9f5] transition">
                                        <td className="py-3.5 pr-3">
                                            <div className="flex items-center gap-3">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#ede7dd] bg-[#fbfaf8]">{(row.participant?.user?.name || 'P').slice(0, 1)}</span>
                                                <span className="font-semibold text-[#1c1a17]">{row.participant?.user?.name || '—'}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 pr-3 text-[#68625c]">{row.program?.title || '—'}</td>
                                        <td className="py-3.5 pr-3 text-[#78716c]">{row.enrolled_at ? new Date(row.enrolled_at).toLocaleDateString('id-ID') : '—'}</td>
                                        <td className="py-3.5 pr-3">
                                            <span className="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium">
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-[#ede7dd] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg text-[#1c1a17] tracking-tight">Aktivitas Terbaru</h3>
                        <a href="/admin/laporan" className="text-xs font-medium text-[#78716c] hover:text-[#1c1a17] flex items-center gap-1 transition">
                            <span>Lihat Semua</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                    <div className="space-y-4 my-auto">
                        {recentActivities.map((act, i) => {
                            const Icon = act.icon;
                            return (
                                <div key={i} className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-full border border-[#ede7dd] flex items-center justify-center bg-[#fbfaf8] text-[#1c1a17] shrink-0 mt-0.5">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-[#1c1a17] leading-tight">{act.title}</h4>
                                            <p className="text-[11px] text-[#78716c] mt-0.5 leading-snug">{act.desc}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-[#9e968f] whitespace-nowrap shrink-0">{act.time}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
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
