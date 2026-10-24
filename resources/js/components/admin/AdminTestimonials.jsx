import React, { useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Plus, Star, CheckCircle2 } from 'lucide-react';

export default function AdminTestimonials() {
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const [testimonialsList, setTestimonialsList] = useState([
        { id: 'testi-1', name: 'Nadia Putri', role: 'Alumni Basic Modeling 2024', avatar: '/images/avatar_nadia.jpg', rating: 5, quote: 'Pelatihannya sangat profesional dan membantu saya lebih percaya diri. Sekarang saya sudah mendapatkan kesempatan untuk ikut fashion show dan photoshoot komersial.', featuredOnHome: true, date: '22 Okt 2026' },
        { id: 'testi-2', name: 'Jessica Tania', role: 'Alumni Runway & Catwalk 2024', avatar: '/images/card_commercial.jpg', rating: 5, quote: 'Kurikulum runway & catwalk di Siluet Model Tala benar-benar mengubah cara saya berjalan dan postur tubuh. Mentornya sangat sabar dan detail dalam memberi evaluasi.', featuredOnHome: true, date: '18 Okt 2026' },
        { id: 'testi-3', name: 'Aura Clarissa', role: 'Alumni Advanced Modeling 2023', avatar: '/images/card_advanced.jpg', rating: 5, quote: 'Networking yang dibangun Siluet Model Tala sangat membantu karier saya. Setelah lulus, saya langsung terhubung dengan dua agensi fashion ternama di Jakarta.', featuredOnHome: true, date: '12 Okt 2026' },
        { id: 'testi-4', name: 'Citra Anindya', role: 'Alumni Commercial & Audition', avatar: '/images/card_runway.jpg', rating: 5, quote: 'Simulasi casting di kelas TVC membuat saya tidak canggung lagi saat audisi sungguhan. Sangat merekomendasikan akademi ini untuk siapa pun yang ingin serius di modeling.', featuredOnHome: false, date: '05 Okt 2026' }
    ]);

    return (
        <AdminLayout activeNav="Testimoni" breadcrumb="Testimoni">
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                        ULASAN & REPUTASI
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                        Manajemen Testimoni
                    </h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                        Moderasi ulasan alumni untuk dipublikasikan pada halaman utama website publik.
                    </p>
                </div>
                <button
                    onClick={() => showToast('Membuka modal tambah testimoni baru.')}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Ulasan Baru
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonialsList.map((t) => (
                    <div key={t.id} className="bg-white rounded-2xl border border-[#ede7dd] p-6 shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-[#ede7dd]" />
                                    <div>
                                        <h4 className="font-semibold text-base text-[#1c1a17]">{t.name}</h4>
                                        <span className="text-xs text-[#8c827a]">{t.role}</span>
                                    </div>
                                </div>
                                <div className="flex text-amber-400">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                            </div>

                            <blockquote className="text-xs text-[#68625c] italic leading-relaxed bg-[#fbf9f5] p-4 rounded-xl border border-[#ede7dd]/60 mb-4">
                                "{t.quote}"
                            </blockquote>
                        </div>

                        <div className="pt-3 border-t border-[#f3efe8] flex items-center justify-between text-xs">
                            <span className="text-[#8c827a]">{t.date}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-[#68625c]">Tayang di Home:</span>
                                <button
                                    onClick={() => {
                                        setTestimonialsList(testimonialsList.map(x => x.id === t.id ? { ...x, featuredOnHome: !x.featuredOnHome } : x));
                                        showToast(`Status tayang ${t.name} diperbarui!`);
                                    }}
                                    className={`w-9 h-5 flex items-center rounded-full p-0.5 transition cursor-pointer ${
                                        t.featuredOnHome ? 'bg-[#1c1a17] justify-end' : 'bg-gray-300 justify-start'
                                    }`}
                                >
                                    <span className="w-4 h-4 rounded-full bg-white block shadow-xs" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
