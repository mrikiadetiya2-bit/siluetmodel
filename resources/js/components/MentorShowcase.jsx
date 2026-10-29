import React, { useState } from 'react';
import { Award, Star, Calendar, MessageSquare, X, CheckCircle, ArrowRight, Share2 } from 'lucide-react';

export default function MentorShowcase() {
    const [mentorList, setMentorList] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [consultName, setConsultName] = useState('');
    const [consultPhone, setConsultPhone] = useState('');

    React.useEffect(() => {
        fetch('/api/public/mentors')
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                if (Array.isArray(data)) {
                    const mapped = data.map(m => ({
                        id: `db-${m.id}`,
                        name: m.name,
                        role: m.title || 'Instruktur Model',
                        experience: 'Mentor Siluet Tala',
                        specialty: Array.isArray(m.specialties) ? m.specialties.join(', ') : (m.specialties || 'Catwalk & Posing'),
                        image: m.photo_path ? (m.photo_path.startsWith('http') || m.photo_path.startsWith('/') ? m.photo_path : `/storage/${m.photo_path}`) : '/images/hero_3.jpg',
                        bio: m.bio || 'Instruktur modeling profesional Siluet Model Tala.',
                        achievements: ['Instruktur Resmi Siluet Model Tala'],
                        instagram: '@siluetmodeltala',
                    }));
                    setMentorList(mapped);
                }
            })
            .catch(() => {});
    }, []);

    const handleConsultation = async (e) => {
        e.preventDefault();
        try {
            await fetch('/api/public/records/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    data: {
                        type: 'consultation',
                        mentorName: selectedMentor?.name,
                        name: consultName,
                        phone: consultPhone,
                        submittedAt: new Date().toISOString(),
                    }
                })
            });
        } catch (err) {}
        setBookingSuccess(true);
        setTimeout(() => {
            setBookingSuccess(false);
            setSelectedMentor(null);
            setConsultName('');
            setConsultPhone('');
        }, 2500);
    };

    return (
        <div className="py-10">
            {/* Grid of Mentors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {mentorList.map((mentor) => (
                    <div
                        key={mentor.id}
                        onClick={() => setSelectedMentor(mentor)}
                        className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#ede7dd] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f0e8]">
                            <img
                                src={mentor.image}
                                alt={mentor.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10.5px] font-semibold text-[#171513] border border-white/60">
                                {mentor.experience}
                            </div>
                        </div>

                        <div className="p-6">
                            <span className="text-[11px] font-semibold text-[#bba994] uppercase tracking-wider block mb-1">
                                {mentor.role}
                            </span>
                            <h3 className="font-serif-luxury text-xl text-[#171513] mb-2 group-hover:text-[#bba994] transition">
                                {mentor.name}
                            </h3>
                            <p className="text-xs text-[#6e6761] line-clamp-2 mb-4 leading-relaxed">
                                {mentor.specialty}
                            </p>

                            <div className="pt-3 border-t border-[#f2ede6] flex items-center justify-between text-xs font-semibold text-[#171513]">
                                <span>Lihat Profil & Prestasi</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {mentorList.length === 0 && (
                <p className="mb-16 text-center text-sm text-[#6e6761]">
                    Belum ada data mentor yang tersedia.
                </p>
            )}

            {/* Mentor Detail Modal */}
            {selectedMentor && (
                <div 
                    className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
                    onClick={() => setSelectedMentor(null)}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/60 my-8 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedMentor(null)}
                            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-black hover:text-white flex items-center justify-center transition shadow-md"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
                            <div className="md:col-span-5 bg-[#f7f4ee] relative min-h-[300px]">
                                <img src={selectedMentor.image} alt={selectedMentor.name} className="w-full h-full object-cover object-top" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white md:hidden">
                                    <h3 className="font-serif-luxury text-2xl">{selectedMentor.name}</h3>
                                    <p className="text-xs text-white/80">{selectedMentor.role}</p>
                                </div>
                            </div>

                            <div className="md:col-span-7 p-8 flex flex-col justify-between">
                                <div>
                                    <span className="text-[11px] font-semibold text-[#8e857e] tracking-widest uppercase block mb-1">
                                        PROFIL MENTOR AKADEMI
                                    </span>
                                    <h2 className="font-serif-luxury text-2xl lg:text-3xl font-normal text-[#171513] mb-1">
                                        {selectedMentor.name}
                                    </h2>
                                    <p className="text-xs text-[#bba994] font-medium mb-4">
                                        {selectedMentor.role} &bull; {selectedMentor.experience}
                                    </p>

                                    <p className="text-xs text-[#59524c] leading-relaxed mb-6">
                                        {selectedMentor.bio}
                                    </p>

                                    <div className="mb-6">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171513] mb-2.5 flex items-center gap-2">
                                            <Award className="w-4 h-4 text-[#bba994]" /> Penghargaan & Jejak Karir
                                        </h4>
                                        <ul className="space-y-1.5 text-xs text-[#6e6761]">
                                            {selectedMentor.achievements.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <Star className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#f0ebe3]">
                                    {bookingSuccess ? (
                                        <div className="bg-[#eef8f1] border border-[#c4e8cf] rounded-2xl p-4 text-center">
                                            <CheckCircle className="w-6 h-6 text-[#248a47] mx-auto mb-1" />
                                            <p className="text-xs font-semibold text-[#196332]">Permintaan Sesi Terkirim!</p>
                                            <p className="text-[11px] text-[#4f7f5e]">Admin Siluet Tala akan mengonfirmasi jadwal masterclass bersama {selectedMentor.name}.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleConsultation} className="space-y-2.5">
                                            <h5 className="text-[11.5px] font-semibold text-[#171513]">Ajukan Sesi Privat / Masterclass</h5>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    required
                                                    value={consultName}
                                                    onChange={(e) => setConsultName(e.target.value)}
                                                    placeholder="Nama Anda"
                                                    className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#171513]"
                                                />
                                                <input
                                                    type="tel"
                                                    required
                                                    value={consultPhone}
                                                    onChange={(e) => setConsultPhone(e.target.value)}
                                                    placeholder="No. WhatsApp"
                                                    className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#171513]"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-[#171513] hover:bg-[#2c2824] text-white py-2.5 rounded-xl text-xs font-medium transition shadow-sm"
                                            >
                                                Jadwalkan Konsultasi dengan {selectedMentor.name}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
