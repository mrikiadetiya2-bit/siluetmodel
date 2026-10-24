import React, { useState } from 'react';
import { Compass, Sparkles, Target, Globe, Shield, CheckCircle, ChevronRight } from 'lucide-react';

const milestones = [
    {
        year: '2014',
        title: 'Lahirnya Gagasan Siluet Model Tala',
        desc: 'Didirikan dengan cita-cita mulia menghadirkan wadah edukasi modeling berstandar internasional yang menjunjung tinggi etika dan kepercayaan diri otentik.'
    },
    {
        year: '2018',
        title: 'Akreditasi & Kolaborasi Fashion Week',
        desc: 'Menjadi mitra resmi kurasi model untuk Jakarta Fashion Week dan peragaan busana desainer terkemuka Indonesia.'
    },
    {
        year: '2022',
        title: 'Ekspansi Divisi Komersial & Kids',
        desc: 'Membuka program khusus talenta cilik serta menjalin kemitraan dengan 40+ rumah produksi iklan nasional.'
    },
    {
        year: '2026',
        title: 'Pusat Talenta Mode Terintegrasi',
        desc: 'Melahirkan lebih dari 500 alumni yang kini aktif berkarier di industri fashion lokal maupun panggung mode mancanegara.'
    }
];

const pillars = [
    {
        id: 'p1',
        title: 'Presisi Catwalk & Bahasa Tubuh',
        short: 'Teknik berjalan, irama langkah, dan postur tegap yang mencuri perhatian panggung.',
        detail: 'Kami melatih setiap siswa menemukan titik keseimbangan alami, ritme langkah berkarakter, dan kemampuan menguasai gaun terberat sekalipun dengan keanggunan tanpa usaha.'
    },
    {
        id: 'p2',
        title: 'Integritas & Etika Profesional',
        short: 'Sikap kerja tepat waktu, santun, dan siap berkolaborasi dengan kru desainer.',
        detail: 'Dunia mode menghargai talenta yang berdisiplin tinggi. Kami menanamkan nilai-nilai ketepatan waktu, etika ruang ganti, dan komunikasi konstruktif kepada seluruh talenta.'
    },
    {
        id: 'p3',
        title: 'Karakter Otentik & Inklusivitas',
        short: 'Menghargai keunikan garis wajah, warna kulit, dan kepribadian tiap individu.',
        detail: 'Kecantikan sejati tidak seragam. Siluet Model Tala merayakan keragaman karakter wajah, siluet tubuh, dan pesona natural yang membuat seorang model unik dan tak tergantikan.'
    },
    {
        id: 'p4',
        title: 'Jaringan Agensi & Pasar Global',
        short: 'Akses langsung ke jaringan agensi internasional, fotografer, dan rumah mode.',
        detail: 'Bekerja sama dengan pemandu bakat di Jakarta, Singapura, hingga Eropa untuk membuka pintu audisi terbuka bagi para lulusan terbaik akademi.'
    }
];

export default function AboutInteractive() {
    const [activePillar, setActivePillar] = useState(pillars[0]);
    const [activeMilestoneYear, setActiveMilestoneYear] = useState('2026');

    return (
        <div className="py-8">
            {/* 4 Core Pillars Interactive Tabs */}
            <div className="mb-20">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#8e857e] font-semibold block mb-2">
                        FILOSOFI & PILAR KAMI
                    </span>
                    <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#171513]">
                        Empat Landasan Utama Siluet Model Tala
                    </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left Selector List */}
                    <div className="lg:col-span-5 space-y-3">
                        {pillars.map((pillar) => (
                            <div
                                key={pillar.id}
                                onClick={() => setActivePillar(pillar)}
                                className={`p-5 rounded-2xl cursor-pointer border transition-all ${
                                    activePillar.id === pillar.id
                                        ? 'bg-[#171513] text-white border-[#171513] shadow-lg translate-x-1.5'
                                        : 'bg-white text-[#171513] hover:bg-[#faf8f5] border-[#ede7dd]'
                                }`}
                            >
                                <h4 className="font-serif-luxury text-lg mb-1">{pillar.title}</h4>
                                <p className={`text-xs leading-relaxed ${activePillar.id === pillar.id ? 'text-white/80' : 'text-[#706962]'}`}>
                                    {pillar.short}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right Expanded Detail Card */}
                    <div className="lg:col-span-7 bg-[#faf8f5] rounded-3xl p-8 lg:p-12 border border-[#ede7dd] flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-[#bba994] block mb-2">
                                PENDALAMAN NILAI AKADEMI
                            </span>
                            <h3 className="font-serif-luxury text-2xl lg:text-3xl text-[#171513] mb-4">
                                {activePillar.title}
                            </h3>
                            <p className="text-sm text-[#59524c] leading-relaxed mb-6 font-sans-luxury">
                                {activePillar.detail}
                            </p>
                        </div>

                        <div className="pt-6 border-t border-[#ede7dd] flex items-center justify-between">
                            <span className="text-xs text-[#8e857e]">Prinsip dasar kurikulum pengajaran kami</span>
                            <a href="/modeling-school" className="text-xs font-semibold text-[#171513] hover:underline flex items-center gap-1">
                                Pelajari Program Terkait <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Timeline */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 border border-[#ede7dd] shadow-sm mb-16">
                <div className="text-center max-w-xl mx-auto mb-10">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#8e857e] font-semibold block mb-2">
                        JEJAK PERJALANAN
                    </span>
                    <h3 className="font-serif-luxury text-3xl text-[#171513]">
                        Satu Dekade Mencetak Talenta Berkelas
                    </h3>
                </div>

                {/* Timeline Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {milestones.map((m) => (
                        <button
                            key={m.year}
                            onClick={() => setActiveMilestoneYear(m.year)}
                            className={`p-4 rounded-2xl border text-center transition-all ${
                                activeMilestoneYear === m.year
                                    ? 'bg-[#171513] text-white border-[#171513] shadow-md'
                                    : 'bg-[#faf8f5] text-[#59524c] border-[#ede7dd] hover:bg-[#ede7dd]'
                            }`}
                        >
                            <span className="font-serif-luxury text-2xl font-bold block mb-1">{m.year}</span>
                            <span className="text-[11px] font-medium line-clamp-1">{m.title}</span>
                        </button>
                    ))}
                </div>

                {/* Selected Milestone Box */}
                {(() => {
                    const activeM = milestones.find((m) => m.year === activeMilestoneYear);
                    return (
                        <div className="bg-[#faf8f5] rounded-2xl p-6 lg:p-8 border border-[#eee7dc] text-center max-w-2xl mx-auto">
                            <span className="text-xs font-semibold text-[#bba994] uppercase tracking-wider block mb-1">
                                Tahun {activeM.year}
                            </span>
                            <h4 className="font-serif-luxury text-xl text-[#171513] mb-3">{activeM.title}</h4>
                            <p className="text-xs text-[#6e6761] leading-relaxed max-w-lg mx-auto">
                                {activeM.desc}
                            </p>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
}
