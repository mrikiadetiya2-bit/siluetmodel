import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Eye, Heart, X, CheckCircle, Sparkles, ArrowRight, Share2, Download } from 'lucide-react';

const femaleModels = [
    {
        id: 'w-1',
        name: 'Aura Clarissa',
        category: 'High Fashion Editorial',
        height: '178 cm',
        bust: '82 cm',
        waist: '60 cm',
        hips: '88 cm',
        shoe: '39 EU',
        eyes: 'Dark Brown',
        hair: 'Brunette',
        experience: '5 Years',
        featured: true,
        image: '/images/hero-model.jpg',
        gallery: [
            '/images/hero-model.jpg',
            '/images/bare_shoulders.jpg',
            '/images/about_profile.jpg'
        ],
        campaigns: ['Harper’s Bazaar Indonesia', 'Jakarta Fashion Week 2025', 'Chanel Beauty Campaign'],
        instagram: '@auraclarissa'
    },
    {
        id: 'w-2',
        name: 'Nadia Putri',
        category: 'Runway & Catwalk',
        height: '179 cm',
        bust: '80 cm',
        waist: '59 cm',
        hips: '87 cm',
        shoe: '40 EU',
        eyes: 'Black',
        hair: 'Raven Black',
        experience: '4 Years',
        featured: true,
        image: '/images/card_runway.jpg',
        gallery: [
            '/images/card_runway.jpg',
            '/images/swimsuit_model.jpg',
            '/images/avatar_nadia.jpg'
        ],
        campaigns: ['Indonesia Fashion Week Opening', 'Sebastian Gunawan Couture', 'Elle Magazine'],
        instagram: '@nadiaputriofficial'
    },
    {
        id: 'w-3',
        name: 'Valerie Laurent',
        category: 'Commercial & Campaign',
        height: '175 cm',
        bust: '84 cm',
        waist: '62 cm',
        hips: '90 cm',
        shoe: '38 EU',
        eyes: 'Hazel',
        hair: 'Chestnut Brown',
        experience: '3 Years',
        featured: false,
        image: '/images/card_commercial.jpg',
        gallery: [
            '/images/card_commercial.jpg',
            '/images/card_basic.jpg'
        ],
        campaigns: ['Wardah Exclusive Look', 'Sephora Southeast Asia', 'Vogue Digital'],
        instagram: '@valerielaurent_'
    },
    {
        id: 'w-4',
        name: 'Sophia Ardelia',
        category: 'New Faces',
        height: '177 cm',
        bust: '81 cm',
        waist: '58 cm',
        hips: '86 cm',
        shoe: '39 EU',
        eyes: 'Brown',
        hair: 'Dark Waves',
        experience: '1 Year',
        featured: true,
        image: '/images/card_advanced.jpg',
        gallery: [
            '/images/card_advanced.jpg',
            '/images/hero_1.jpg'
        ],
        campaigns: ['Siluet Tala New Gen 2025', 'Dewi Fashion Knights'],
        instagram: '@sophia.ardelia'
    },
    {
        id: 'w-5',
        name: 'Karina Danisha',
        category: 'Runway & Catwalk',
        height: '180 cm',
        bust: '83 cm',
        waist: '61 cm',
        hips: '89 cm',
        shoe: '40 EU',
        eyes: 'Almond Black',
        hair: 'Sleek Black',
        experience: '6 Years',
        featured: false,
        image: '/images/about-portrait.jpg',
        gallery: [
            '/images/about-portrait.jpg',
            '/images/blazer_suit.jpg'
        ],
        campaigns: ['Plaza Indonesia Fashion Week', 'Sapto Djojokartiko Runway', 'Prestige Indonesia'],
        instagram: '@karinadanisha'
    },
    {
        id: 'w-6',
        name: 'Eleanor Jasmine',
        category: 'High Fashion Editorial',
        height: '176 cm',
        bust: '82 cm',
        waist: '60 cm',
        hips: '88 cm',
        shoe: '38.5 EU',
        eyes: 'Dark Brown',
        hair: 'Dark Espresso',
        experience: '3 Years',
        featured: false,
        image: '/images/site/card_basic.png',
        gallery: [
            '/images/site/card_basic.png',
            '/images/site/hero_model.png'
        ],
        campaigns: ['Cosmopolitan Beauty Awards', 'Major Agency Scout Choice'],
        instagram: '@eleanor.jasmine'
    }
];

export default function WomenRoster() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedModel, setSelectedModel] = useState(null);
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [savedModels, setSavedModels] = useState([]);
    const [bookingForm, setBookingForm] = useState({ clientName: '', email: '', projectDate: '', notes: '' });

    const categories = ['All', 'Runway & Catwalk', 'High Fashion Editorial', 'Commercial & Campaign', 'New Faces'];

    const filteredModels = useMemo(() => {
        return femaleModels.filter((model) => {
            const matchesCategory = selectedCategory === 'All' || model.category === selectedCategory;
            const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                model.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const toggleSaveModel = (e, modelId) => {
        e.stopPropagation();
        setSavedModels(prev => 
            prev.includes(modelId) ? prev.filter(id => id !== modelId) : [...prev, modelId]
        );
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        setBookingSuccess(true);
        setTimeout(() => {
            setBookingSuccess(false);
            setSelectedModel(null);
            setBookingForm({ clientName: '', email: '', projectDate: '', notes: '' });
        }, 2200);
    };

    return (
        <div className="py-10">
            {/* Control Bar: Filters & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 pb-6 border-b border-[#eee7dc]">
                
                {/* Category Pills */}
                <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                                selectedCategory === cat
                                    ? 'bg-[#171513] text-white shadow-sm'
                                    : 'bg-[#faf8f5] text-[#59524c] hover:bg-[#ede7dd] border border-[#ede7dd]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-[#8e857e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari nama talenta atau gaya..."
                        className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#171513] transition"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-xs"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-xs text-[#8e857e] mb-6">
                <span>Menampilkan <strong className="text-[#171513]">{filteredModels.length}</strong> Talenta Wanita</span>
                <span className="flex items-center gap-1.5 text-[#171513]">
                    <Sparkles className="w-3.5 h-3.5 text-[#bba994]" /> Representasi Resmi Siluet Model Tala
                </span>
            </div>

            {/* Grid of Models */}
            {filteredModels.length === 0 ? (
                <div className="text-center py-20 bg-[#faf8f5] rounded-3xl border border-[#eee7dc]">
                    <p className="text-sm text-[#7d736a] mb-2 font-medium">Tidak ada talenta yang cocok dengan kriteria pencarian.</p>
                    <button 
                        onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                        className="text-xs text-[#171513] underline font-semibold mt-2"
                    >
                        Reset Filter
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredModels.map((model) => (
                        <div
                            key={model.id}
                            onClick={() => {
                                setSelectedModel(model);
                                setActiveGalleryIndex(0);
                            }}
                            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#ede7dd] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                        >
                            {/* Model Portrait Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f0e8]">
                                <img
                                    src={model.image}
                                    alt={model.name}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                />
                                
                                {/* Overlay Top Actions */}
                                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10.5px] font-semibold text-[#171513] border border-white/60 shadow-xs">
                                        {model.category}
                                    </span>
                                    <button
                                        onClick={(e) => toggleSaveModel(e, model.id)}
                                        className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition ${
                                            savedModels.includes(model.id)
                                                ? 'bg-[#171513] text-white'
                                                : 'bg-white/80 text-[#171513] hover:bg-white'
                                        }`}
                                        aria-label="Simpan Talenta"
                                    >
                                        <Heart className={`w-3.5 h-3.5 ${savedModels.includes(model.id) ? 'fill-current' : ''}`} />
                                    </button>
                                </div>

                                {/* Quick Hover View Pill */}
                                <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-[#171513]/80 backdrop-blur-md text-white text-center py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 shadow-sm">
                                        <Eye className="w-3.5 h-3.5" /> Lihat Comp Card Lengkap
                                    </div>
                                </div>
                            </div>

                            {/* Model Identity & Key Stats */}
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-1.5">
                                    <h3 className="font-serif-luxury text-xl font-normal text-[#171513]">
                                        {model.name}
                                    </h3>
                                    <span className="text-xs font-semibold text-[#171513] bg-[#faf8f5] px-2.5 py-1 rounded-md border border-[#eee7dc]">
                                        {model.height}
                                    </span>
                                </div>

                                <p className="text-[11.5px] text-[#8e857e] mb-4">
                                    Pengalaman: {model.experience} &bull; {model.instagram}
                                </p>

                                {/* Vital Stats Grid */}
                                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-[#f2ede6] text-center text-[10.5px]">
                                    <div className="bg-[#faf8f5] py-1.5 rounded-lg border border-[#f0ebe3]">
                                        <div className="text-[#8e857e]">Bust</div>
                                        <div className="font-semibold text-[#171513]">{model.bust}</div>
                                    </div>
                                    <div className="bg-[#faf8f5] py-1.5 rounded-lg border border-[#f0ebe3]">
                                        <div className="text-[#8e857e]">Waist</div>
                                        <div className="font-semibold text-[#171513]">{model.waist}</div>
                                    </div>
                                    <div className="bg-[#faf8f5] py-1.5 rounded-lg border border-[#f0ebe3]">
                                        <div className="text-[#8e857e]">Hips</div>
                                        <div className="font-semibold text-[#171513]">{model.hips}</div>
                                    </div>
                                    <div className="bg-[#faf8f5] py-1.5 rounded-lg border border-[#f0ebe3]">
                                        <div className="text-[#8e857e]">Shoe</div>
                                        <div className="font-semibold text-[#171513]">{model.shoe}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Interactive Model Detail / Comp Card Modal */}
            {selectedModel && (
                <div 
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
                    onClick={() => setSelectedModel(null)}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/60 my-8 relative animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedModel(null)}
                            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-black hover:text-white flex items-center justify-center transition shadow-md"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
                            {/* Left Side: Photo Portfolio Carousel */}
                            <div className="md:col-span-6 bg-[#f7f4ee] p-6 flex flex-col justify-between">
                                <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
                                    <img 
                                        src={selectedModel.gallery[activeGalleryIndex] || selectedModel.image} 
                                        alt={selectedModel.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>

                                {/* Thumbnails */}
                                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                                    {selectedModel.gallery.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveGalleryIndex(idx)}
                                            className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition shrink-0 ${
                                                activeGalleryIndex === idx ? 'border-[#171513]' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Comp Card Specs & Booking Form */}
                            <div className="md:col-span-6 p-7 md:p-9 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-semibold text-[#8e857e] tracking-[0.2em] uppercase">
                                            OFFICIAL COMP CARD
                                        </span>
                                        <span className="text-xs bg-[#f4f0e8] px-2.5 py-0.5 rounded-full font-medium text-[#171513]">
                                            {selectedModel.category}
                                        </span>
                                    </div>

                                    <h2 className="font-serif-luxury text-3xl font-normal text-[#171513] mb-1">
                                        {selectedModel.name}
                                    </h2>
                                    <p className="text-xs text-[#8e857e] mb-6 flex items-center gap-2">
                                        <span>Tinggi: {selectedModel.height}</span>
                                        <span>&bull;</span>
                                        <span>Mata: {selectedModel.eyes}</span>
                                        <span>&bull;</span>
                                        <span>Rambut: {selectedModel.hair}</span>
                                    </p>

                                    {/* Detailed Specifications */}
                                    <div className="grid grid-cols-3 gap-2.5 mb-6 text-center text-xs">
                                        <div className="bg-[#faf8f5] p-2.5 rounded-xl border border-[#eee7dc]">
                                            <div className="text-[#8e857e] text-[10.5px]">Bust</div>
                                            <div className="font-semibold text-[#171513]">{selectedModel.bust}</div>
                                        </div>
                                        <div className="bg-[#faf8f5] p-2.5 rounded-xl border border-[#eee7dc]">
                                            <div className="text-[#8e857e] text-[10.5px]">Waist</div>
                                            <div className="font-semibold text-[#171513]">{selectedModel.waist}</div>
                                        </div>
                                        <div className="bg-[#faf8f5] p-2.5 rounded-xl border border-[#eee7dc]">
                                            <div className="text-[#8e857e] text-[10.5px]">Hips</div>
                                            <div className="font-semibold text-[#171513]">{selectedModel.hips}</div>
                                        </div>
                                    </div>

                                    {/* Past Notable Campaigns */}
                                    <div className="mb-6">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171513] mb-2">
                                            Pengalaman & Kampanye Utama
                                        </h4>
                                        <ul className="space-y-1.5 text-xs text-[#6e6761]">
                                            {selectedModel.campaigns.map((camp, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#bba994]"></span>
                                                    <span>{camp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Booking Drawer Trigger or Form */}
                                <div>
                                    {bookingSuccess ? (
                                        <div className="bg-[#eef8f1] border border-[#c4e8cf] rounded-2xl p-4 text-center">
                                            <CheckCircle className="w-6 h-6 text-[#248a47] mx-auto mb-1.5" />
                                            <p className="text-xs font-semibold text-[#196332]">Permintaan Booking Berhasil Dikirim!</p>
                                            <p className="text-[11px] text-[#4f7f5e]">Tim casting Siluet Model Tala akan segera menghubungi Anda dalam 1x24 jam.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleBookingSubmit} className="space-y-3 pt-3 border-t border-[#f0ebe3]">
                                            <div className="grid grid-cols-2 gap-2.5">
                                                <input
                                                    type="text"
                                                    required
                                                    value={bookingForm.clientName}
                                                    onChange={(e) => setBookingForm({...bookingForm, clientName: e.target.value})}
                                                    placeholder="Nama Brand / Agensi"
                                                    className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#171513]"
                                                />
                                                <input
                                                    type="email"
                                                    required
                                                    value={bookingForm.email}
                                                    onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                                                    placeholder="Email Kontak"
                                                    className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#171513]"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-[#171513] hover:bg-[#2c2824] text-white py-3 rounded-xl text-xs font-medium transition flex items-center justify-center gap-2 shadow-sm"
                                            >
                                                <span>Kirim Permintaan Booking {selectedModel.name}</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
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
