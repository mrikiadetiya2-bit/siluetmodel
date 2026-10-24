import React, { useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Download, CheckCircle2 } from 'lucide-react';

export default function AdminReports() {
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    return (
        <AdminLayout activeNav="Laporan" breadcrumb="Laporan">
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                        ANALITIK & REKAP
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                        Laporan & Analitik Performa
                    </h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                        Analisis performa kelulusan, demografi peserta, dan laporan finansial berkala.
                    </p>
                </div>
                <button
                    onClick={() => showToast('Mengunduh laporan performa PDF...')}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                >
                    <Download className="w-4 h-4" />
                    Ekspor Laporan Lengkap
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c] block">Retensi Peserta</span>
                    <div className="text-3xl font-bold text-[#1c1a17] mt-1">98.2%</div>
                    <span className="text-[11px] text-emerald-600 mt-1 block">Tingkat kepuasan tertinggi</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c] block">Rata-rata Rating Evaluasi</span>
                    <div className="text-3xl font-bold text-[#1c1a17] mt-1">4.95 / 5.0</div>
                    <span className="text-[11px] text-[#78716c] mt-1 block">Dari 420 murid alumni</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c] block">Penyerapan Agensi Mode</span>
                    <div className="text-3xl font-bold text-[#1c1a17] mt-1">74.6%</div>
                    <span className="text-[11px] text-emerald-600 mt-1 block">Langsung dikontrak brand</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c] block">Total Jam Sesi Pelatihan</span>
                    <div className="text-3xl font-bold text-[#1c1a17] mt-1">1.480 Jam</div>
                    <span className="text-[11px] text-[#78716c] mt-1 block">Sepanjang tahun 2026</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <h3 className="font-semibold text-base text-[#1c1a17] mb-4">Penyaluran Karier Alumni</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Commercial & TVC Brand Ambassador', pct: 42, color: 'bg-[#1c1a17]' },
                            { label: 'High Fashion Runway & Fashion Week', pct: 36, color: 'bg-[#8c7b6d]' },
                            { label: 'Beauty Pageant & Duta Pariwisata', pct: 14, color: 'bg-[#c4b4a1]' },
                            { label: 'Freelance Editorial Influencer', pct: 8, color: 'bg-[#ded7cb]' },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#68625c] font-medium">{item.label}</span>
                                    <span className="font-bold text-[#1c1a17]">{item.pct}%</span>
                                </div>
                                <div className="w-full h-2 bg-[#f0ebe3] rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <h3 className="font-semibold text-base text-[#1c1a17] mb-4">Demografi Usia Murid</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Adults (18 - 25 Tahun)', count: '298 Siswa', pct: 56 },
                            { label: 'Teens (13 - 17 Tahun)', count: '142 Siswa', pct: 27 },
                            { label: 'Kids (6 - 12 Tahun)', count: '88 Siswa', pct: 17 },
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-[#68625c] font-medium">{item.label}</span>
                                    <span className="font-bold text-[#1c1a17]">{item.count} ({item.pct}%)</span>
                                </div>
                                <div className="w-full h-2 bg-[#f0ebe3] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#1c1a17] rounded-full" style={{ width: `${item.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
