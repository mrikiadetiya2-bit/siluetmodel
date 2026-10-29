import React, { useState, useMemo } from 'react';
import { Eye, X, Play, Award, Film, Sparkles, ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';

export default function HighlightsGallery({ audience = null }) {
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

    React.useEffect(() => {
        fetch('/api/public/records/gallery')
            .then(res => res.ok ? res.json() : [])
            .then(data => {
                if (Array.isArray(data)) {
                    const mapped = data.filter(d => !audience || d.data?.audience === audience).map(d => {
                        const dateStr = d.data?.date ? String(d.data.date) : '';
                        const yearMatch = dateStr.match(/\b(20\d\d|19\d\d)\b/);
                        const year = yearMatch ? yearMatch[1] : (dateStr ? dateStr.slice(0, 4) : '2025');

                        return {
                            id: `db-${d.id}`,
                            title: d.data?.title || 'Galeri Siluet Tala',
                            category: d.data?.category || 'Fashion Shows',
                            year,
                            designer: d.data?.designer || 'Siluet Model Tala',
                            models: d.data?.models || 'Alumni & Talent',
                            image: d.data?.image || d.data?.images?.[0] || '/images/card_runway.jpg',
                            description: d.data?.description || d.data?.title || '',
                        };
                    });
                    setItems(mapped);
                }
            })
            .catch(() => {});
    }, [audience]);

    const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            return selectedCategory === 'All' || item.category === selectedCategory;
        });
    }, [items, selectedCategory]);

    const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

    const nextLightbox = () => {
        setActiveLightboxIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    };

    const prevLightbox = () => {
        setActiveLightboxIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    };

    React.useEffect(() => {
        if (activeLightboxIndex === null) return;
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setActiveLightboxIndex(null);
            if (e.key === 'ArrowRight') nextLightbox();
            if (e.key === 'ArrowLeft') prevLightbox();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeLightboxIndex, filteredItems.length]);

    return (
        <div className="py-10">
            {/* Stats Metric Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-[#faf8f5] p-5 rounded-2xl border border-[#ede7dd] text-center">
                    <div className="font-serif-luxury text-3xl font-normal text-[#171513]">120+</div>
                    <div className="text-xs text-[#8e857e] mt-1 font-medium">Runway Shows</div>
                </div>
                <div className="bg-[#faf8f5] p-5 rounded-2xl border border-[#ede7dd] text-center">
                    <div className="font-serif-luxury text-3xl font-normal text-[#171513]">45+</div>
                    <div className="text-xs text-[#8e857e] mt-1 font-medium">Magazine Covers</div>
                </div>
                <div className="bg-[#faf8f5] p-5 rounded-2xl border border-[#ede7dd] text-center">
                    <div className="font-serif-luxury text-3xl font-normal text-[#171513]">80+</div>
                    <div className="text-xs text-[#8e857e] mt-1 font-medium">Brand Kampanye</div>
                </div>
                <div className="bg-[#faf8f5] p-5 rounded-2xl border border-[#ede7dd] text-center">
                    <div className="font-serif-luxury text-3xl font-normal text-[#171513]">14</div>
                    <div className="text-xs text-[#8e857e] mt-1 font-medium">Penghargaan Mode</div>
                </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                            selectedCategory === cat
                                ? 'bg-[#171513] text-white shadow-sm'
                                : 'bg-[#faf8f5] text-[#59524c] hover:bg-[#ede7dd] border border-[#ede7dd]'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => setActiveLightboxIndex(index)}
                        className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#ede7dd] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    >
                        <div className="relative aspect-[16/11] overflow-hidden bg-[#f4f0e8]">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10.5px] font-semibold text-[#171513] border border-white/60">
                                {item.category}
                            </div>
                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <Eye className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center gap-2 text-xs text-[#8e857e] mb-2 font-medium">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{item.year}</span>
                                <span>&bull;</span>
                                <span>{item.designer}</span>
                            </div>
                            <h3 className="font-serif-luxury text-xl font-normal text-[#171513] mb-2 group-hover:text-[#bba994] transition">
                                {item.title}
                            </h3>
                            <p className="text-xs text-[#6e6761] leading-relaxed line-clamp-2">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Interactive Lightbox Slider */}
            {activeItem && (
                <div 
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 lg:p-8"
                    onClick={() => setActiveLightboxIndex(null)}
                >
                    <button
                        onClick={() => setActiveLightboxIndex(null)}
                        className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div 
                        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row md:h-[500px] lg:h-[520px] max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full md:w-3/5 h-64 sm:h-80 md:h-full bg-[#f4f0e8] relative overflow-hidden shrink-0">
                            <img 
                                src={activeItem.image} 
                                alt={activeItem.title} 
                                className="w-full h-full object-cover object-center" 
                            />
                        </div>
                        <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white">
                            <div>
                                <span className="text-[11px] font-semibold text-[#8e857e] tracking-widest uppercase block mb-1">
                                    {activeItem.category} &bull; {activeItem.year}
                                </span>
                                <h3 className="font-serif-luxury text-2xl text-[#171513] mb-4">
                                    {activeItem.title}
                                </h3>
                                <p className="text-xs text-[#6e6761] leading-relaxed mb-6">
                                    {activeItem.description}
                                </p>

                                <div className="space-y-3 pt-4 border-t border-[#f0ebe3] text-xs">
                                    <div>
                                        <span className="text-[#8e857e] block text-[11px]">Koleksi / Desainer:</span>
                                        <span className="font-semibold text-[#171513]">{activeItem.designer}</span>
                                    </div>
                                    <div>
                                        <span className="text-[#8e857e] block text-[11px]">Talenta / Model:</span>
                                        <span className="font-semibold text-[#171513]">{activeItem.models}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-[#f0ebe3] mt-4 md:mt-0">
                                <a 
                                    href="/contact"
                                    className="w-full bg-[#171513] text-white py-3 rounded-xl text-xs font-medium hover:bg-[#2b2723] transition flex items-center justify-center gap-2"
                                >
                                    <span>Konsultasi Proyek Serupa</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
