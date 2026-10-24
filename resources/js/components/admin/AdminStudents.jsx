import React, { useState, useMemo } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Download, Plus, MoreVertical, CheckCircle2 } from 'lucide-react';

export default function AdminStudents() {
    const [pesertaFilterProgram, setPesertaFilterProgram] = useState('Semua');
    const [searchVal, setSearchVal] = useState('');
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const students = [
        { id: 'SMT-2026-081', name: 'Nadia Putri', avatar: '/images/avatar_nadia.jpg', program: 'Basic Modeling Intensive', email: 'nadiaputri@gmail.com', phone: '+62 812-4455-8890', attendance: '96%', statusPay: 'Lunas', statusClass: 'Aktif', joinDate: '12 Jan 2026' },
        { id: 'SMT-2026-082', name: 'Alya Maharani', avatar: '/images/card_advanced.jpg', program: 'Advanced Editorial & Posing', email: 'alya.maharani@yahoo.com', phone: '+62 813-2211-9004', attendance: '92%', statusPay: 'Menunggu', statusClass: 'Aktif', joinDate: '18 Jan 2026' },
        { id: 'SMT-2026-083', name: 'Citra Anindya', avatar: '/images/card_runway.jpg', program: 'Professional Runway & Catwalk', email: 'citra.anindya@gmail.com', phone: '+62 857-9900-3344', attendance: '100%', statusPay: 'Lunas', statusClass: 'Aktif', joinDate: '02 Feb 2026' },
        { id: 'SMT-2026-084', name: 'Salsabila Rahma', avatar: '/images/card_commercial.jpg', program: 'Commercial TVC & Audition', email: 'salsabila.r@gmail.com', phone: '+62 811-7788-2233', attendance: '88%', statusPay: 'Diproses', statusClass: 'Aktif', joinDate: '14 Feb 2026' },
        { id: 'SMT-2026-085', name: 'Kevin Jonathan', avatar: '/images/beige_suit.jpg', program: 'Male Posture & Catwalk', email: 'kevin.jonathan@outlook.com', phone: '+62 819-3322-1100', attendance: '95%', statusPay: 'Lunas', statusClass: 'Aktif', joinDate: '20 Feb 2026' },
        { id: 'SMT-2026-086', name: 'Kezia Michelle', avatar: '/images/bare_shoulders.jpg', program: 'Kids & Teens Confidence Star', email: 'kezia.michelle@gmail.com', phone: '+62 812-9988-7711', attendance: '90%', statusPay: 'Lunas', statusClass: 'Aktif', joinDate: '01 Mar 2026' },
        { id: 'SMT-2026-087', name: 'Amanda Natasha', avatar: '/images/testimonial-nadia.jpg', program: 'Fashion Week Masterclass', email: 'amanda.natasha@gmail.com', phone: '+62 856-1122-3344', attendance: '100%', statusPay: 'Lunas', statusClass: 'Lulus', joinDate: '15 Nov 2025' },
        { id: 'SMT-2026-088', name: 'Jessica Tania', avatar: '/images/hero-model.jpg', program: 'Professional Runway & Catwalk', email: 'jessica.tania@gmail.com', phone: '+62 878-5544-3322', attendance: '98%', statusPay: 'Lunas', statusClass: 'Lulus', joinDate: '10 Okt 2025' }
    ];

    const filteredStudents = useMemo(() => {
        return students.filter(s => {
            const matchProgram = pesertaFilterProgram === 'Semua' || s.program.includes(pesertaFilterProgram);
            const matchSearch = !searchVal.trim() || s.name.toLowerCase().includes(searchVal.toLowerCase()) || s.email.toLowerCase().includes(searchVal.toLowerCase()) || s.id.toLowerCase().includes(searchVal.toLowerCase());
            return matchProgram && matchSearch;
        });
    }, [students, pesertaFilterProgram, searchVal]);

    return (
        <AdminLayout activeNav="Peserta" breadcrumb="Peserta" onSearch={setSearchVal}>
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                        DIREKTORI TALENTA
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                        Data Peserta
                    </h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                        Daftar seluruh talenta dan murid aktif Siluet Model Tala.
                    </p>
                </div>
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={() => showToast('Mengekspor data peserta ke CSV...')}
                        className="inline-flex items-center gap-2 bg-white border border-[#ede7dd] text-[#1c1a17] px-3.5 py-2 rounded-xl text-xs font-medium shadow-xs hover:bg-[#f7f5f0] transition"
                    >
                        <Download className="w-3.5 h-3.5" />
                        Export CSV
                    </button>
                    <button
                        onClick={() => showToast('Membuka formulir tambah peserta manual.')}
                        className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-medium shadow-xs transition"
                    >
                        <Plus className="w-4 h-4" />
                        Tambah Peserta
                    </button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Peserta Aktif</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">528 Siswa</div>
                    <span className="text-[10px] text-emerald-600">+48 siswa bulan ini</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Rata-rata Kehadiran</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">94.8%</div>
                    <span className="text-[10px] text-emerald-600">Sangat disiplin</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Pembayaran Lunas</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">92.4%</div>
                    <span className="text-[10px] text-[#78716c]">498 peserta terkonfirmasi</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Siap Wisuda Kelulusan</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">36 Siswa</div>
                    <span className="text-[10px] text-amber-600">Batch Wisuda Okt 2026</span>
                </div>
            </div>

            {/* Filter bar */}
            <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#78716c]">Filter Program:</span>
                    <select
                        value={pesertaFilterProgram}
                        onChange={(e) => setPesertaFilterProgram(e.target.value)}
                        className="bg-[#f7f5f0] border border-[#ede7dd] rounded-xl px-3 py-1.5 text-xs text-[#1c1a17] focus:outline-none"
                    >
                        <option value="Semua">Semua Program Pelatihan</option>
                        <option value="Basic Modeling">Basic Modeling</option>
                        <option value="Advanced Editorial">Advanced Editorial</option>
                        <option value="Runway & Catwalk">Runway & Catwalk</option>
                        <option value="Commercial TVC">Commercial TVC</option>
                    </select>
                </div>
                <span className="text-xs text-[#8c827a]">
                    Menampilkan {filteredStudents.length} talenta
                </span>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#f3efe8] bg-[#faf8f5] text-[11px] font-semibold text-[#8c827a]">
                                <th className="py-3 px-4">Talenta & ID</th>
                                <th className="py-3 px-4">Program Diambil</th>
                                <th className="py-3 px-4">Kontak & Email</th>
                                <th className="py-3 px-4">Kehadiran</th>
                                <th className="py-3 px-4">Status Bayar</th>
                                <th className="py-3 px-4">Status Kelas</th>
                                <th className="py-3 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f5f1eb] text-xs">
                            {filteredStudents.map((st) => (
                                <tr key={st.id} className="hover:bg-[#fbf9f5] transition">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <img src={st.avatar} alt={st.name} className="w-9 h-9 rounded-full object-cover border border-[#ede7dd]" />
                                            <div>
                                                <h4 className="font-semibold text-[#1c1a17]">{st.name}</h4>
                                                <span className="text-[10px] font-mono text-[#8c827a]">{st.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-[#68625c]">{st.program}</td>
                                    <td className="py-3 px-4">
                                        <div className="text-[11px] text-[#1c1a17]">{st.email}</div>
                                        <div className="text-[10px] text-[#8c827a]">{st.phone}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-[#f0ebe3] rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-600 rounded-full" style={{ width: st.attendance }} />
                                            </div>
                                            <span className="text-[11px] font-semibold text-[#1c1a17]">{st.attendance}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-medium border ${
                                            st.statusPay === 'Lunas' ? 'bg-[#eaf5ed] text-[#22723c] border-[#d2ead7]' :
                                            st.statusPay === 'Menunggu' ? 'bg-[#fef7ea] text-[#b47a16] border-[#fbe5bd]' : 'bg-[#eef4fe] text-[#2b6cb0] border-[#d3e3fd]'
                                        }`}>
                                            {st.statusPay}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-medium ${
                                            st.statusClass === 'Aktif' ? 'bg-[#f7f5f0] text-[#1c1a17]' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {st.statusClass}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <button
                                            onClick={() => showToast(`Detail talenta: ${st.name}`)}
                                            className="p-1.5 text-[#8c827a] hover:text-[#1c1a17] hover:bg-[#ede7dd]/40 rounded-lg transition"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
