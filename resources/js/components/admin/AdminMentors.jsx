import React, { useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Plus, Star, CheckCircle2 } from 'lucide-react';

export default function AdminMentors() {
    const [toastMessage, setToastMessage] = useState(null);
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const mentors = [
        { id: 'men-1', name: 'Aura Clarissa', role: 'Head Fashion Coach & Editorial Director', avatar: '/images/hero-model.jpg', experience: '7 Tahun di Milan & Paris Fashion Week', studentsCount: 88, classesCount: 4, rating: 5.0, specialty: ['Editorial Posing', 'High Fashion', 'Audisi Internasional'] },
        { id: 'men-2', name: 'Jessica Tania', role: 'Principal Runway & Catwalk Coach', avatar: '/images/about_profile.jpg', experience: 'Senior Catwalk Trainer Jakarta Fashion Week', studentsCount: 76, classesCount: 3, rating: 4.9, specialty: ['Runway Strides', 'Garment Handling', 'Tempo Catwalk'] },
        { id: 'men-3', name: 'Valerie Laurent', role: 'Commercial Acting & Casting Coach', avatar: '/images/card_advanced.jpg', experience: 'Brand Ambassador & TVC Model Internasional', studentsCount: 65, classesCount: 3, rating: 4.9, specialty: ['Camera Awareness', 'Ekspresi TVC', 'Audisi Casting'] },
        { id: 'men-4', name: 'Dimas Wicaksono', role: 'Male Division & Posture Instructor', avatar: '/images/beige_suit.jpg', experience: 'Top Male Model Indonesia Fashion Week', studentsCount: 52, classesCount: 2, rating: 4.8, specialty: ['Male Runway', 'Tailored Suit Pose', 'Fitness Modeling'] },
        { id: 'men-5', name: 'Nadia Putri', role: 'Basic Posture & Pageant Trainer', avatar: '/images/avatar_nadia.jpg', experience: 'Runner-up Putri Pariwisata & Model Profesional', studentsCount: 94, classesCount: 4, rating: 5.0, specialty: ['Basic Walking', 'Public Speaking', 'Pageant Stage'] },
        { id: 'men-6', name: 'Elena Siluet', role: 'Kids & Teens Development Specialist', avatar: '/images/testimonial-nadia.jpg', experience: 'Praktisi Psikologi Tumbuh Kembang & Modeling Remaja', studentsCount: 48, classesCount: 2, rating: 4.9, specialty: ['Confidence Building', 'Etiket Panggung', 'Kids Fashion'] }
    ];

    return (
        <AdminLayout activeNav="Mentor" breadcrumb="Mentor">
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                        INSTRUKTUR INDUSTRI
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                        Mentor Profesional
                    </h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                        Direktori instruktur runway, pelatih editorial, dan praktisi fashion berpengalaman.
                    </p>
                </div>
                <button
                    onClick={() => showToast('Membuka formulir pendaftaran mentor baru.')}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Mentor Baru
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((m) => (
                    <div key={m.id} className="bg-white rounded-2xl border border-[#ede7dd] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-2xl object-cover border border-[#ede7dd]" />
                                <div>
                                    <h3 className="font-semibold text-base text-[#1c1a17]">{m.name}</h3>
                                    <span className="text-xs text-[#8c827a] block leading-snug mt-0.5">{m.role}</span>
                                    <div className="flex items-center gap-1 text-amber-500 text-xs mt-1">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <span className="font-bold text-[#1c1a17]">{m.rating}</span>
                                        <span className="text-[#8c827a] text-[11px]">(Evaluasi Siswa)</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-[#78716c] leading-relaxed mb-4">{m.experience}</p>

                            <div className="flex flex-wrap gap-1.5 mb-5">
                                {m.specialty.map((tag) => (
                                    <span key={tag} className="bg-[#f7f5f0] text-[#59524c] border border-[#ede7dd] px-2.5 py-0.5 rounded-lg text-[10.5px]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#f3efe8] flex items-center justify-between">
                            <div className="text-xs">
                                <span className="text-[#8c827a]">Kelas Aktif:</span>
                                <span className="font-bold text-[#1c1a17] ml-1.5">{m.classesCount} Sesi/Minggu</span>
                            </div>
                            <button
                                onClick={() => showToast(`Jadwal sesi mentor: ${m.name}`)}
                                className="px-3.5 py-1.5 bg-[#1c1a17] text-white rounded-xl text-xs font-medium hover:bg-black transition"
                            >
                                Jadwal Sesi
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
