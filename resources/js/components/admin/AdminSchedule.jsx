import React, { useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Plus, Clock, Edit3, CheckCircle2 } from 'lucide-react';

export default function AdminSchedule() {
    const [selectedDay, setSelectedDay] = useState('Sabtu');
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const scheduleByDay = {
        'Senin': [
            { time: '13:00 - 15:30', title: 'Basic Posture & Stride Batch A', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Nadia Putri', enrolled: '22 Siswa', status: 'Selesai' },
            { time: '16:00 - 18:30', title: 'Commercial Facial Expression', studio: 'Studio 2 (Photo & Video Studio)', mentor: 'Valerie Laurent', enrolled: '18 Siswa', status: 'Selesai' },
        ],
        'Rabu': [
            { time: '14:00 - 16:30', title: 'Editorial Posing & Light Angle', studio: 'Studio 2 (Photo & Video Studio)', mentor: 'Aura Clarissa', enrolled: '16 Siswa', status: 'Terjadwal' },
            { time: '17:00 - 19:30', title: 'Male Division Runway Stride', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Dimas Wicaksono', enrolled: '14 Siswa', status: 'Terjadwal' },
        ],
        'Jumat': [
            { time: '13:30 - 16:00', title: 'Kids & Teens Confidence Training', studio: 'Studio 3 (Kids Arena)', mentor: 'Elena Siluet', enrolled: '12 Siswa', status: 'Terjadwal' },
            { time: '16:30 - 19:00', title: 'Casting & Brand Commercial Simulation', studio: 'Studio 2 (Photo & Video Studio)', mentor: 'Citra Anindya', enrolled: '19 Siswa', status: 'Terjadwal' },
        ],
        'Sabtu': [
            { time: '09:00 - 11:30', title: 'Haute Couture Catwalk Masterclass', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Jessica Tania', enrolled: '15 Siswa', status: 'Berlangsung' },
            { time: '12:30 - 15:00', title: 'Basic Modeling Intensive Batch VII', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Nadia Putri', enrolled: '24 Siswa', status: 'Akan Datang' },
            { time: '15:30 - 18:00', title: 'High Fashion Editorial Posing', studio: 'Studio 2 (Photo & Video Studio)', mentor: 'Aura Clarissa', enrolled: '18 Siswa', status: 'Akan Datang' },
            { time: '18:30 - 20:30', title: 'Audisi Persiapan Jakarta Fashion Week', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Jessica & Aura', enrolled: '10 Siswa', status: 'Akan Datang' },
        ],
        'Minggu': [
            { time: '10:00 - 12:30', title: 'Beauty Pageant Stage Presence & Q&A', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Nadia Putri', enrolled: '12 Siswa', status: 'Terjadwal' },
            { time: '13:30 - 16:00', title: 'TVC Live Audition & Video Portfolio', studio: 'Studio 2 (Photo & Video Studio)', mentor: 'Citra Anindya', enrolled: '16 Siswa', status: 'Terjadwal' },
        ]
    };

    return (
        <AdminLayout activeNav="Jadwal Kelas" breadcrumb="Jadwal Kelas">
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                        TIMETABLE STUDIO
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                        Jadwal Kelas & Sesi Latihan
                    </h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                        Kalender sesi catwalk, latihan studio foto, dan evaluasi mingguan.
                    </p>
                </div>
                <button
                    onClick={() => showToast('Membuka formulir jadwal sesi baru.')}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                >
                    <Plus className="w-4 h-4" />
                    Atur Sesi Baru
                </button>
            </div>

            <div className="flex flex-wrap gap-2 bg-white p-3 rounded-2xl border border-[#ede7dd]">
                {['Senin', 'Rabu', 'Jumat', 'Sabtu', 'Minggu'].map((day) => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
                            selectedDay === day
                                ? 'bg-[#1c1a17] text-white shadow-xs'
                                : 'text-[#68625c] hover:bg-[#ede7dd]/50'
                        }`}
                    >
                        <span>{day}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            selectedDay === day ? 'bg-white/20 text-white' : 'bg-[#ede7dd] text-[#68625c]'
                        }`}>
                            {scheduleByDay[day]?.length || 0} Sesi
                        </span>
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {(scheduleByDay[selectedDay] || []).map((item, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-[#ede7dd] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] border border-[#ede7dd] flex flex-col items-center justify-center shrink-0 text-[#1c1a17]">
                                <Clock className="w-4 h-4 text-[#8c827a] mb-0.5" />
                                <span className="text-[10px] font-bold">SESI</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2.5">
                                    <span className="font-mono text-xs font-bold text-[#1c1a17] bg-[#f7f5f0] px-2 py-0.5 rounded-md border border-[#ede7dd]">
                                        {item.time}
                                    </span>
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                        item.status === 'Berlangsung' ? 'bg-emerald-100 text-emerald-800' :
                                        item.status === 'Selesai' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                        {item.status}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-base text-[#1c1a17] mt-1.5">{item.title}</h3>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-[#78716c] mt-1">
                                    <span>Lokasi: {item.studio}</span>
                                    <span>•</span>
                                    <span>Instruktur: <strong className="text-[#1c1a17] font-medium">{item.mentor}</strong></span>
                                    <span>•</span>
                                    <span>{item.enrolled}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                                onClick={() => showToast(`Cek absensi siswa sesi: ${item.title}`)}
                                className="px-3.5 py-1.5 bg-[#f7f5f0] hover:bg-[#ede7dd] text-[#1c1a17] rounded-xl text-xs font-medium transition"
                            >
                                Absensi Murid
                            </button>
                            <button
                                onClick={() => showToast(`Edit sesi: ${item.title}`)}
                                className="p-2 border border-[#ede7dd] text-[#78716c] hover:text-[#1c1a17] rounded-xl"
                            >
                                <Edit3 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
