import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout.jsx';
import {
    Users,
    BookOpen,
    User,
    Wallet,
    BarChart3,
    ArrowUpRight,
    ArrowRight,
    ChevronDown,
    Plus,
    MoreVertical,
    FileText,
    Calendar,
    MessageSquare,
    X,
    CheckCircle2
} from 'lucide-react';

export default function AdminOverview() {
    const [selectedTimeframe, setSelectedTimeframe] = useState('6 bulan terakhir');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hoveredDataIndex, setHoveredDataIndex] = useState(null);
    const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

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

    const handleAddProgramSubmit = (e) => {
        e.preventDefault();
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

    const chartData = useMemo(() => {
        if (selectedTimeframe === '3 bulan terakhir') {
            return [
                { month: 'Apr', value: 80, x: 80, y: 150 },
                { month: 'Mei', value: 125, x: 260, y: 105 },
                { month: 'Jun', value: 185, x: 440, y: 45 },
            ];
        }
        if (selectedTimeframe === '1 tahun terakhir') {
            return [
                { month: 'Jul', value: 50, x: 40, y: 175 },
                { month: 'Sep', value: 90, x: 140, y: 135 },
                { month: 'Nov', value: 130, x: 240, y: 95 },
                { month: 'Jan', value: 45, x: 340, y: 180 },
                { month: 'Mar', value: 105, x: 440, y: 120 },
                { month: 'Jun', value: 185, x: 540, y: 40 },
            ];
        }
        return [
            { month: 'Jan', value: 45, x: 40, y: 185 },
            { month: 'Feb', value: 72, x: 140, y: 158 },
            { month: 'Mar', value: 105, x: 240, y: 125 },
            { month: 'Apr', value: 80, x: 340, y: 150 },
            { month: 'Mei', value: 125, x: 440, y: 105 },
            { month: 'Jun', value: 185, x: 540, y: 45 },
        ];
    }, [selectedTimeframe]);

    const splinePath = useMemo(() => {
        if (!chartData || chartData.length < 2) return '';
        let d = `M ${chartData[0].x} ${chartData[0].y}`;
        for (let i = 0; i < chartData.length - 1; i++) {
            const p0 = chartData[i];
            const p1 = chartData[i + 1];
            const cp1x = p0.x + (p1.x - p0.x) / 2;
            const cp1y = p0.y;
            const cp2x = p0.x + (p1.x - p0.x) / 2;
            const cp2y = p1.y;
            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
        }
        return d;
    }, [chartData]);

    const areaPath = useMemo(() => {
        if (!splinePath || chartData.length === 0) return '';
        const lastX = chartData[chartData.length - 1].x;
        const firstX = chartData[0].x;
        return `${splinePath} L ${lastX} 210 L ${firstX} 210 Z`;
    }, [splinePath, chartData]);

    const donutCircumference = 389.56;
    const donutData = [
        { label: 'Basic Modeling', percent: 42, color: '#1c1a17' },
        { label: 'Advanced Modeling', percent: 28, color: '#8c7b6d' },
        { label: 'Runway & Catwalk', percent: 18, color: '#c4b4a1' },
        { label: 'Commercial Modeling', percent: 12, color: '#e7ded3' },
    ];

    const recentRegistrations = [
        { id: 1, name: 'Nadia Putri', program: 'Basic Modeling', date: '22 Okt 2026', status: 'Lunas', color: 'bg-[#eaf5ed] text-[#22723c] border-[#d2ead7]', avatar: '/images/avatar_nadia.jpg' },
        { id: 2, name: 'Alya Maharani', program: 'Advanced Modeling', date: '22 Okt 2026', status: 'Menunggu', color: 'bg-[#fef7ea] text-[#b47a16] border-[#fbe5bd]', avatar: '/images/card_advanced.jpg' },
        { id: 3, name: 'Citra Anindya', program: 'Runway & Catwalk', date: '21 Okt 2026', status: 'Lunas', color: 'bg-[#eaf5ed] text-[#22723c] border-[#d2ead7]', avatar: '/images/card_runway.jpg' },
        { id: 4, name: 'Salsabila Rahma', program: 'Commercial Modeling', date: '20 Okt 2026', status: 'Diproses', color: 'bg-[#eef4fe] text-[#2b6cb0] border-[#d3e3fd]', avatar: '/images/card_commercial.jpg' },
    ];

    const recentActivities = [
        { icon: User, title: 'Pendaftaran baru', desc: 'Nadia Putri mendaftar program Basic Modeling', time: '2 menit lalu' },
        { icon: Wallet, title: 'Pembayaran berhasil', desc: 'Alya Maharani melakukan pembayaran', time: '15 menit lalu' },
        { icon: FileText, title: 'Program baru ditambahkan', desc: 'Program Commercial Modeling telah dibuat', time: '1 jam lalu' },
        { icon: Calendar, title: 'Jadwal kelas diperbarui', desc: 'Jadwal Runway & Catwalk minggu depan', time: '3 jam lalu' },
        { icon: MessageSquare, title: 'Testimoni baru', desc: 'Citra Anindya memberikan testimoni', time: '5 jam lalu' },
    ];

    return (
        <AdminLayout activeNav="Dashboard" breadcrumb="Overview">
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

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
                <button
                    onClick={() => setIsAddProgramOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition self-start sm:self-auto cursor-pointer active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Program
                </button>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                        <Users className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-medium text-[#78716c] block">Total Peserta</span>
                    <div className="text-3xl font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">528</div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>+12%</span>
                        <span className="text-[#8c827a] font-normal">dari bulan lalu</span>
                    </div>
                    <Users className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                </div>

                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                        <BookOpen className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-medium text-[#78716c] block">Program Aktif</span>
                    <div className="text-3xl font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">8</div>
                    <div className="flex items-center gap-1.5 text-xs text-[#78716c]">
                        <ArrowRight className="w-3.5 h-3.5 text-[#8c827a]" />
                        <span>2 program baru</span>
                    </div>
                    <BookOpen className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                </div>

                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                        <User className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-medium text-[#78716c] block">Mentor Profesional</span>
                    <div className="text-3xl font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">12</div>
                    <div className="flex items-center gap-1.5 text-xs text-[#78716c]">
                        <ArrowRight className="w-3.5 h-3.5 text-[#8c827a]" />
                        <span>+1 mentor baru</span>
                    </div>
                    <User className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                </div>

                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                        <Wallet className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-medium text-[#78716c] block">Pendapatan Bulan Ini</span>
                    <div className="text-2xl lg:text-[26px] font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">Rp 24.500.000</div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>+8,4%</span>
                        <span className="text-[#8c827a] font-normal">dari bulan lalu</span>
                    </div>
                    <BarChart3 className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white border border-[#ede7dd] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="font-semibold text-lg text-[#1c1a17] tracking-tight">Statistik Pendaftaran</h3>
                            <p className="text-xs text-[#78716c] mt-0.5">Jumlah pendaftaran peserta dalam {selectedTimeframe}.</p>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="border border-[#ede7dd] rounded-xl px-3 py-1.5 text-xs text-[#68625c] bg-[#faf8f5] hover:bg-[#ede7dd]/40 flex items-center gap-2 transition"
                            >
                                <span>{selectedTimeframe}</span>
                                <ChevronDown className="w-3.5 h-3.5 text-[#8c827a]" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-1.5 w-40 bg-white border border-[#ede7dd] rounded-xl shadow-lg py-1.5 z-20 text-xs">
                                    {['6 bulan terakhir', '3 bulan terakhir', '1 tahun terakhir'].map((tf) => (
                                        <button
                                            key={tf}
                                            onClick={() => {
                                                setSelectedTimeframe(tf);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-3.5 py-1.5 hover:bg-[#f7f5f0] transition ${
                                                selectedTimeframe === tf ? 'font-semibold text-[#1c1a17] bg-[#f7f5f0]' : 'text-[#68625c]'
                                            }`}
                                        >
                                            {tf}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative w-full overflow-hidden pt-2">
                        <svg viewBox="0 0 580 230" className="w-full h-56 select-none overflow-visible">
                            <defs>
                                <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#bba994" stopOpacity="0.35" />
                                    <stop offset="60%" stopColor="#ede7dd" stopOpacity="0.18" />
                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>
                            {[
                                { val: 200, y: 35 },
                                { val: 150, y: 80 },
                                { val: 100, y: 125 },
                                { val: 50, y: 170 },
                                { val: 0, y: 215 },
                            ].map((grid) => (
                                <g key={grid.val}>
                                    <text x="22" y={grid.y + 3} fill="#8c827a" fontSize="11" fontFamily="sans-serif" textAnchor="end">
                                        {grid.val}
                                    </text>
                                    <line x1="32" y1={grid.y} x2="560" y2={grid.y} stroke="#f0ebe3" strokeDasharray={grid.val === 0 ? 'none' : '3 3'} strokeWidth="1" />
                                </g>
                            ))}
                            <path d={areaPath} fill="url(#areaGrad)" />
                            <path d={splinePath} fill="none" stroke="#1c1a17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            {chartData.map((pt, idx) => (
                                <g key={pt.month} className="cursor-pointer group" onMouseEnter={() => setHoveredDataIndex(idx)} onMouseLeave={() => setHoveredDataIndex(null)}>
                                    {hoveredDataIndex === idx && (
                                        <circle cx={pt.x} cy={pt.y} r="9" fill="none" stroke="#1c1a17" strokeWidth="1.5" strokeOpacity="0.3" className="animate-ping" />
                                    )}
                                    <circle cx={pt.x} cy={pt.y} r={hoveredDataIndex === idx ? '5.5' : '4'} fill="#1c1a17" stroke="#ffffff" strokeWidth="2" className="transition-all duration-200" />
                                    <text x={pt.x} y="230" fill={hoveredDataIndex === idx ? '#1c1a17' : '#8c827a'} fontSize="11" fontWeight={hoveredDataIndex === idx ? '600' : '400'} fontFamily="sans-serif" textAnchor="middle">
                                        {pt.month}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-[#ede7dd] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                    <div>
                        <h3 className="font-semibold text-lg text-[#1c1a17] tracking-tight">Distribusi Program</h3>
                        <p className="text-xs text-[#78716c] mt-0.5">Persentase peserta berdasarkan program pelatihan.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4 my-auto">
                        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                                <circle cx="80" cy="80" r="62" fill="transparent" stroke="#1c1a17" strokeWidth="22" strokeDasharray={`${(42 / 100) * donutCircumference} ${donutCircumference}`} strokeDashoffset="0" />
                                <circle cx="80" cy="80" r="62" fill="transparent" stroke="#8c7b6d" strokeWidth="22" strokeDasharray={`${(28 / 100) * donutCircumference} ${donutCircumference}`} strokeDashoffset={`${-(42 / 100) * donutCircumference}`} />
                                <circle cx="80" cy="80" r="62" fill="transparent" stroke="#c4b4a1" strokeWidth="22" strokeDasharray={`${(18 / 100) * donutCircumference} ${donutCircumference}`} strokeDashoffset={`${-((42 + 28) / 100) * donutCircumference}`} />
                                <circle cx="80" cy="80" r="62" fill="transparent" stroke="#e7ded3" strokeWidth="22" strokeDasharray={`${(12 / 100) * donutCircumference} ${donutCircumference}`} strokeDashoffset={`${-((42 + 28 + 18) / 100) * donutCircumference}`} />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                                <span className="text-2xl font-bold text-[#1c1a17] leading-tight">528</span>
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
                                    <span className="font-semibold text-[#1c1a17] ml-2">{item.percent}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white border border-[#ede7dd] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
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
                                    <th className="py-2.5 font-normal text-right pr-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f5f1eb] text-xs">
                                {recentRegistrations.map((row) => (
                                    <tr key={row.id} className="hover:bg-[#fbf9f5] transition">
                                        <td className="py-3.5 pr-3">
                                            <div className="flex items-center gap-3">
                                                <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full object-cover border border-[#ede7dd]" />
                                                <span className="font-semibold text-[#1c1a17]">{row.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 pr-3 text-[#68625c]">{row.program}</td>
                                        <td className="py-3.5 pr-3 text-[#78716c]">{row.date}</td>
                                        <td className="py-3.5 pr-3">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${row.color}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-3.5 text-right pr-2">
                                            <button onClick={() => showToast(`Pilihan aksi untuk ${row.name}`)} className="p-1 text-[#8c827a] hover:text-[#1c1a17] rounded-lg">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
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
