import React, { useState } from 'react';
import { Check, Calendar, Clock, Award, Users, BookOpen, Sparkles, ChevronRight, Calculator, CheckCircle2 } from 'lucide-react';

const courses = [
    {
        id: 'basic',
        name: 'Basic Modeling',
        tagline: 'Fondasi Utama Menembus Dunia Fashion & Editorial',
        duration: '8 Minggu (16 Sesi)',
        level: 'Pemula (No Experience Required)',
        price: 2500000,
        image: '/images/card_basic.jpg',
        syllabus: [
            'Basic Posture, Body Alignment, & Center of Gravity',
            'Catwalk Rhythm & High Heel Balancing Masterclass',
            'Facial Expression & Angle Recognition for Camera',
            'Wardrobe Basics, Castings Audition Etiquette, & Ethics'
        ],
        perks: [
            'Sesi Photoshoot Portofolio Studio Resmi',
            'Sertifikat Kompetensi Siluet Model Tala',
            'Rekomendasi Audisi Brand Lokal',
            'Akses Sesi Q&A Mentor Praktisi'
        ]
    },
    {
        id: 'advanced',
        name: 'Advanced Runway & Catwalk',
        tagline: 'Kuasai Panggung Runway Nasional & Internasional',
        duration: '10 Minggu (20 Sesi)',
        level: 'Menengah / Alumni Basic',
        price: 3500000,
        image: '/images/card_advanced.jpg',
        syllabus: [
            'High Fashion Haute Couture Pace & Turns',
            'Choreography, Group Strut, & Finale Formations',
            'Handling Heavy Gowns, Capes, & Avant-Garde Outfits',
            'Fast-Change Backstage Simulation & Emergency Fixes'
        ],
        perks: [
            'Kesempatan Tampil di Graduation Runway Show',
            'Digital Comp Card Standar Agensi Milan/Paris',
            'Direct Audition Invitation untuk Fashion Week',
            'Video Runway 4K untuk Portofolio'
        ]
    },
    {
        id: 'commercial',
        name: 'Commercial & TVC Modeling',
        tagline: 'Bintang Iklan Komersial, Brand Ambassador, & Social Media',
        duration: '6 Minggu (12 Sesi)',
        level: 'Semua Tingkat',
        price: 3000000,
        image: '/images/card_commercial.jpg',
        syllabus: [
            'Acting on Camera, Micro-Expressions, & Monologues',
            'Product Placement, Food/Drink & Cosmetic Posing',
            'Voice Over Basics & Casting Screen Test Technique',
            'Personal Branding on Instagram & TikTok for Models'
        ],
        perks: [
            'Headshot & Commercial Beauty Reel 4K',
            'Database Submission ke 20+ Production House',
            'Bimbingan Kontrak & Negosiasi Fee Agensi',
            'Mentoring Langsung dari Bintang Iklan Nasional'
        ]
    },
    {
        id: 'kids',
        name: 'Kids & Teens Academy',
        tagline: 'Tumbuhkan Percaya Diri, Karakter, & Bakat Sejak Dini',
        duration: '6 Minggu (12 Sesi)',
        level: 'Usia 4 - 15 Tahun',
        price: 2200000,
        image: '/images/hero_1.jpg',
        syllabus: [
            'Fun Posture Play & Rhythmic Movement',
            'Natural Smile & Confidence in Front of Camera',
            'Public Speaking & Self-Introduction Skills',
            'Fashion Show Mini Showcase'
        ],
        perks: [
            'Buku Panduan Perlindungan Anak & Orang Tua',
            'Foto Studio Portofolio Anak Natural',
            'Sertifikat Kelulusan & Medali Kehormatan',
            'Dukungan Casting Brand Anak'
        ]
    }
];

export default function AcademyCourses() {
    const [selectedCourse, setSelectedCourse] = useState(courses[0]);
    const [classType, setClassType] = useState('regular'); // regular / private
    const [scheduleDay, setScheduleDay] = useState('weekend'); // weekend / weekday
    const [registeredSuccess, setRegisteredSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '' });

    // Calculate dynamic tuition
    const basePrice = selectedCourse.price;
    const privateMultiplier = classType === 'private' ? 1.6 : 1.0;
    const finalPrice = Math.round(basePrice * privateMultiplier);

    const handleRegister = (e) => {
        e.preventDefault();
        setRegisteredSuccess(true);
        setTimeout(() => {
            setRegisteredSuccess(false);
            setFormData({ name: '', phone: '', email: '', city: '' });
        }, 3000);
    };

    return (
        <div className="py-10">
            {/* Top Course Switcher Tabs */}
            <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 gap-3 mb-12">
                {courses.map((course) => (
                    <button
                        key={course.id}
                        onClick={() => setSelectedCourse(course)}
                        className={`px-5 py-3 rounded-2xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2 ${
                            selectedCourse.id === course.id
                                ? 'bg-[#171513] text-white shadow-md'
                                : 'bg-[#faf8f5] text-[#59524c] hover:bg-[#ede7dd] border border-[#ede7dd]'
                        }`}
                    >
                        <span>{course.name}</span>
                    </button>
                ))}
            </div>

            {/* Course Showcase Card */}
            <div className="bg-white rounded-3xl border border-[#ede7dd] overflow-hidden shadow-xl mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    
                    {/* Visual Cover */}
                    <div className="lg:col-span-5 relative bg-[#f4f0e8] min-h-[380px] overflow-hidden">
                        <img 
                            src={selectedCourse.image} 
                            alt={selectedCourse.name} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-1">
                                {selectedCourse.level}
                            </span>
                            <h2 className="font-serif-luxury text-3xl font-normal leading-tight mb-2">
                                {selectedCourse.name}
                            </h2>
                            <p className="text-xs text-white/80 leading-relaxed">
                                {selectedCourse.tagline}
                            </p>
                        </div>
                    </div>

                    {/* Details & Syllabus */}
                    <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between">
                        <div>
                            {/* Key Metadata */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-xs">
                                <div className="bg-[#faf8f5] p-3 rounded-xl border border-[#eee7dc]">
                                    <div className="text-[#8e857e] flex items-center gap-1.5 mb-1 text-[11px]">
                                        <Clock className="w-3.5 h-3.5" /> Durasi
                                    </div>
                                    <div className="font-semibold text-[#171513]">{selectedCourse.duration}</div>
                                </div>
                                <div className="bg-[#faf8f5] p-3 rounded-xl border border-[#eee7dc]">
                                    <div className="text-[#8e857e] flex items-center gap-1.5 mb-1 text-[11px]">
                                        <Award className="w-3.5 h-3.5" /> Sertifikat
                                    </div>
                                    <div className="font-semibold text-[#171513]">Resmi Terakreditasi</div>
                                </div>
                                <div className="bg-[#faf8f5] p-3 rounded-xl border border-[#eee7dc] col-span-2 sm:col-span-1">
                                    <div className="text-[#8e857e] flex items-center gap-1.5 mb-1 text-[11px]">
                                        <Users className="w-3.5 h-3.5" /> Rasio Kelas
                                    </div>
                                    <div className="font-semibold text-[#171513]">Maks 8 Siswa/Kelas</div>
                                </div>
                            </div>

                            {/* Syllabus List */}
                            <div className="mb-8">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171513] mb-3 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-[#bba994]" /> Materi Kurikulum Inti
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#59524c]">
                                    {selectedCourse.syllabus.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2 bg-[#faf8f5] p-2.5 rounded-xl border border-[#f0ebe3]">
                                            <span className="w-5 h-5 rounded-full bg-[#171513] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                                                {idx + 1}
                                            </span>
                                            <span className="leading-snug">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Perks Included */}
                            <div className="mb-8">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171513] mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-[#bba994]" /> Fasilitas & Benefit Siswa
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#6e6761]">
                                    {selectedCourse.perks.map((perk, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                            <span>{perk}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA bottom anchor */}
                        <div className="pt-6 border-t border-[#eee7dc] flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <span className="text-[11px] text-[#8e857e] block">Investasi Pendidikan:</span>
                                <span className="font-serif-luxury text-2xl font-normal text-[#171513]">
                                    Rp {selectedCourse.price.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <a 
                                href="#tuition-calculator"
                                className="bg-[#171513] hover:bg-[#2c2824] text-white px-7 py-3 rounded-full text-xs font-medium transition shadow-md flex items-center gap-2"
                            >
                                <span>Kalkulator & Pendaftaran</span>
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Interactive Tuition Calculator & Fast Registration Form */}
            <div id="tuition-calculator" className="bg-[#faf8f5] rounded-3xl p-8 lg:p-12 border border-[#ede7dd] max-w-4xl mx-auto shadow-sm">
                <div className="text-center mb-10">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#8e857e] font-semibold block mb-2">
                        SIMULATOR BIAYA & PENDAFTARAN
                    </span>
                    <h3 className="font-serif-luxury text-3xl text-[#171513]">
                        Daftar Program {selectedCourse.name}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
                    {/* Calculator Controls */}
                    <div className="bg-white p-6 rounded-2xl border border-[#eee7dc] space-y-5">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171513] flex items-center gap-2">
                            <Calculator className="w-4 h-4 text-[#bba994]" /> Pilihan Sesi Belajar
                        </h4>

                        <div>
                            <label className="text-xs text-[#8e857e] block mb-2">Format Kelas:</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setClassType('regular')}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition ${
                                        classType === 'regular'
                                            ? 'bg-[#171513] text-white border-[#171513]'
                                            : 'bg-[#faf8f5] text-[#59524c] border-[#ded8cf]'
                                    }`}
                                >
                                    Reguler (Maks 8 Siswa)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setClassType('private')}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition ${
                                        classType === 'private'
                                            ? 'bg-[#171513] text-white border-[#171513]'
                                            : 'bg-[#faf8f5] text-[#59524c] border-[#ded8cf]'
                                    }`}
                                >
                                    VIP Private 1-on-1
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-[#8e857e] block mb-2">Jadwal Kelas:</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setScheduleDay('weekend')}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition ${
                                        scheduleDay === 'weekend'
                                            ? 'bg-[#171513] text-white border-[#171513]'
                                            : 'bg-[#faf8f5] text-[#59524c] border-[#ded8cf]'
                                    }`}
                                >
                                    Weekend (Sabtu-Minggu)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setScheduleDay('weekday')}
                                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition ${
                                        scheduleDay === 'weekday'
                                            ? 'bg-[#171513] text-white border-[#171513]'
                                            : 'bg-[#faf8f5] text-[#59524c] border-[#ded8cf]'
                                    }`}
                                >
                                    Weekday (Selasa-Kamis)
                                </button>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#f0ebe3] flex items-center justify-between">
                            <div>
                                <span className="text-[11px] text-[#8e857e] block">Total Biaya Program:</span>
                                <span className="font-serif-luxury text-2xl font-bold text-[#171513]">
                                    Rp {finalPrice.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
                                Bisa Cicilan 2x
                            </span>
                        </div>
                    </div>

                    {/* Registration Form */}
                    <div className="bg-white p-6 rounded-2xl border border-[#eee7dc]">
                        {registeredSuccess ? (
                            <div className="py-12 text-center">
                                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                                <h4 className="font-serif-luxury text-xl text-[#171513] mb-1">Pendaftaran Berhasil Diterima!</h4>
                                <p className="text-xs text-[#6e6761] leading-relaxed">
                                    Admin akademik Siluet Model Tala akan mengirimkan formulir kelengkapan jadwal & nomor rekening via WhatsApp dalam 1 jam.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleRegister} className="space-y-3.5">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171513] mb-2">
                                    Formulir Pendaftaran Calon Siswa
                                </h4>

                                <div>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="Nama Lengkap Calon Siswa"
                                        className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#171513]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2.5">
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        placeholder="No. WhatsApp Aktif"
                                        className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#171513]"
                                    />
                                    <input
                                        type="text"
                                        required
                                        value={formData.city}
                                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                                        placeholder="Kota Domisili"
                                        className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#171513]"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        placeholder="Alamat Email"
                                        className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#171513]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#171513] hover:bg-[#2c2824] text-white py-3.5 rounded-xl text-xs font-medium transition shadow-md flex items-center justify-center gap-2 mt-2"
                                >
                                    <span>Konfirmasi Pendaftaran Sekarang</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <p className="text-[10px] text-center text-[#8e857e]">
                                    Tanpa biaya pendaftaran tambahan. Pembayaran dikonfirmasi setelah sesi konsultasi awal.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
