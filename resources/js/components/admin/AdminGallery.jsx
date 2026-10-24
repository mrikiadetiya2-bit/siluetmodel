import React, { useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

export default function AdminGallery() {
    const [galleryFilter, setGalleryFilter] = useState('Semua');
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const galleryItems = [
        { id: 'g-1', title: 'Jakarta Fashion Week Runway 2026', category: 'Fashion Show', image: '/images/card_runway.jpg', date: '20 Okt 2026' },
        { id: 'g-2', title: 'Studio High Fashion Editorial Session', category: 'Photoshoot Studio', image: '/images/hero-model.jpg', date: '18 Okt 2026' },
        { id: 'g-3', title: 'Couture Posing Masterclass with Aura', category: 'Masterclass', image: '/images/card_advanced.jpg', date: '15 Okt 2026' },
        { id: 'g-4', title: 'Backstage Makeup & Hair Preparation', category: 'Backstage', image: '/images/bare_shoulders.jpg', date: '12 Okt 2026' },
        { id: 'g-5', title: 'Commercial TVC Portfolio Day', category: 'Photoshoot Studio', image: '/images/card_commercial.jpg', date: '08 Okt 2026' },
        { id: 'g-6', title: 'Male Division Tailoring Showcase', category: 'Fashion Show', image: '/images/beige_suit.jpg', date: '04 Okt 2026' },
        { id: 'g-7', title: 'Graduation Ceremony Batch IV', category: 'Masterclass', image: '/images/about-portrait.jpg', date: '28 Sep 2026' },
        { id: 'g-8', title: 'Runway Balance & Stride Practice', category: 'Backstage', image: '/images/card_basic.jpg', date: '22 Sep 2026' },
    ];

    return (
        <AdminLayout activeNav="Galeri" breadcrumb="Galeri">
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                        DOKUMENTASI & MEDIA
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                        Galeri & Dokumentasi
                    </h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                        Arsip foto runway show, sesi photoshoot studio, masterclass, dan wisuda alumni.
                    </p>
                </div>
                <button
                    onClick={() => showToast('Membuka upload media foto/album baru.')}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                >
                    <UploadCloud className="w-4 h-4" />
                    Upload Media Foto
                </button>
            </div>

            <div className="flex flex-wrap gap-2 bg-white p-3 rounded-2xl border border-[#ede7dd]">
                {['Semua', 'Fashion Show', 'Photoshoot Studio', 'Masterclass', 'Backstage'].map((gcat) => (
                    <button
                        key={gcat}
                        onClick={() => setGalleryFilter(gcat)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                            galleryFilter === gcat
                                ? 'bg-[#1c1a17] text-white shadow-xs'
                                : 'text-[#68625c] hover:bg-[#ede7dd]/50'
                        }`}
                    >
                        {gcat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {galleryItems
                    .filter(item => galleryFilter === 'Semua' || item.category === galleryFilter)
                    .map((g) => (
                        <div key={g.id} className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs hover:shadow-md transition group">
                            <div className="relative h-52 overflow-hidden bg-[#eee8dd]">
                                <img
                                    src={g.image}
                                    alt={g.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                                <span className="absolute top-3 left-3 text-[10px] font-semibold bg-black/60 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                                    {g.category}
                                </span>
                            </div>
                            <div className="p-4">
                                <h4 className="font-semibold text-xs text-[#1c1a17] line-clamp-1">{g.title}</h4>
                                <span className="text-[10px] text-[#8c827a] block mt-1">{g.date}</span>
                            </div>
                        </div>
                    ))}
            </div>
        </AdminLayout>
    );
}
