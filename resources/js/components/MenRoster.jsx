import React, { useState, useMemo, useEffect } from 'react';
import { Search, Eye, Heart, X, CheckCircle, Sparkles, ArrowRight, UserCheck } from 'lucide-react';

const maleModels = [
    {
        id: 'm-1',
        name: 'Adrian Pratama',
        category: 'Runway & Catwalk',
        height: '186 cm',
        chest: '98 cm',
        waist: '78 cm',
        suit: '48R EU',
        shoe: '43 EU',
        eyes: 'Dark Brown',
        hair: 'Black Modern Fade',
        experience: '4 Years',
        featured: true,
        image: '/images/blazer_suit.jpg',
        gallery: [
            '/images/blazer_suit.jpg',
            '/images/about_suit.jpg',
            '/images/hero_3.jpg'
        ],
        campaigns: ['Jakarta Fashion Week Men’s Look', 'Wong Hang Distinguished Suiting', 'GQ Indonesia Showcase'],
        instagram: '@adrianpratama.model'
    },
    {
        id: 'm-2',
        name: 'Damon Setiawan',
        category: 'High Fashion Editorial',
        height: '188 cm',
        chest: '96 cm',
        waist: '76 cm',
        suit: '48L EU',
        shoe: '44 EU',
        eyes: 'Almond Black',
        hair: 'Messy Textured',
        experience: '5 Years',
        featured: true,
        image: '/images/black_jacket.jpg',
        gallery: [
            '/images/black_jacket.jpg',
            '/images/runway-catwalk.jpg'
        ],
        campaigns: ['Plaza Indonesia Men’s Fashion Week', 'August Man Cover Feature', 'Dior Homme SEA Scout'],
        instagram: '@damonsetiawan'
    },
    {
        id: 'm-3',
        name: 'Rian Mahendra',
        category: 'Commercial & Lifestyle',
        height: '183 cm',
        chest: '100 cm',
        waist: '80 cm',
        suit: '50R EU',
        shoe: '42.5 EU',
        eyes: 'Brown',
        hair: 'Classic Side-Part',
        experience: '3 Years',
        featured: false,
        image: '/images/beige_suit.jpg',
        gallery: [
            '/images/beige_suit.jpg',
            '/images/about_profile.jpg'
        ],
        campaigns: ['BCA Priority Campaign', 'Toyota Executive Commercial', 'Uniqlo Fall/Winter Lookbook'],
        instagram: '@rianmahendra_official'
    },
    {
        id: 'm-4',
        name: 'Kevin Jonathan',
        category: 'Fitness & Athleisure',
        height: '185 cm',
        chest: '102 cm',
        waist: '78 cm',
        suit: '50R EU',
        shoe: '43 EU',
        eyes: 'Dark Brown',
        hair: 'Taper Cut',
        experience: '2 Years',
        featured: true,
        image: '/images/hero_2.jpg',
        gallery: [
            '/images/hero_2.jpg',
            '/images/hero_4.jpg'
        ],
        campaigns: ['Under Armour Indonesia', 'Men’s Health Fitness Ambassador'],
        instagram: '@kevin.jonathan'
    }
];

export default function MenRoster() {
    const [models, setModels] = useState([]);
    const [loadingModels, setLoadingModels] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedModel, setSelectedModel] = useState(null);
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [savedModels, setSavedModels] = useState([]);
    const [bookingForm, setBookingForm] = useState({ clientName: '', email: '', projectDate: '', notes: '' });

    const categories = ['All', 'Runway & Catwalk', 'High Fashion Editorial', 'Commercial & Lifestyle', 'Fitness & Athleisure'];

    useEffect(() => {
        fetch('/api/public/records/gallery').then(res => res.ok ? res.json() : []).then(records => {
            setModels(records.filter(r => r.data?.audience === 'Man').map(r => ({ id: r.id, ...r.data, image: r.data.image || r.data.images?.[0], gallery: r.data.images || [r.data.image], campaigns: r.data.campaigns || [] })));
        }).catch(() => setModels([])).finally(() => setLoadingModels(false));
    }, []);

    const filteredModels = useMemo(() => {
        return models.filter((model) => {
            const matchesCategory = selectedCategory === 'All' || model.category === selectedCategory;
            const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                model.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [models, selectedCategory, searchQuery]);

    const toggleSaveModel = (e, modelId) => {
        e.stopPropagation();
        setSavedModels(prev => 
            prev.includes(modelId) ? prev.filter(id => id !== modelId) : [...prev, modelId]
        );
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('/api/public/records/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    data: {
                        ...bookingForm,
                        talentId: selectedModel?.id,
                        talentName: selectedModel?.name,
                        division: 'Men',
                        submittedAt: new Date().toISOString(),
                    }
                })
            });
        } catch (err) {}
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
                        placeholder="Cari talenta pria..."
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
                <span>Menampilkan <strong className="text-[#171513]">{filteredModels.length}</strong> Talenta Pria</span>
                <span className="flex items-center gap-1.5 text-[#171513]">
                    <UserCheck className="w-3.5 h-3.5 text-[#bba994]" /> Standar Internasional Roster
                </span>
            </div>

            {/* Grid of Male Models */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
                {filteredModels.map((model) => (
                    <div
                        key={model.id}
                        onClick={() => {
                            setSelectedModel(model);
                            setActiveGalleryIndex(0);
                        }}
                        className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#ede7dd] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                    >
                        {/* Portrait */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f0e8]">
                            <img
                                src={model.image}
                                alt={model.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            
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
                                >
                                    <Heart className={`w-3.5 h-3.5 ${savedModels.includes(model.id) ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-[#171513]/80 backdrop-blur-md text-white text-center py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 shadow-sm">
                                    <Eye className="w-3.5 h-3.5" /> Lihat Comp Card
                                </div>
                            </div>
                        </div>

                        {/* Model Info */}
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-1.5">
                                <h3 className="font-serif-luxury text-lg font-normal text-[#171513]">
                                    {model.name}
                                </h3>
                                <span className="text-xs font-semibold text-[#171513] bg-[#faf8f5] px-2 py-0.5 rounded-md border border-[#eee7dc]">
                                    {model.height}
                                </span>
                            </div>

                            <p className="text-[11.5px] text-[#8e857e] mb-3">
                                Suit: {model.suit} &bull; Shoes: {model.shoe}
                            </p>

                            <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-[#f2ede6] text-center text-[10.5px]">
                                <div className="bg-[#faf8f5] py-1 rounded-lg border border-[#f0ebe3]">
                                    <div className="text-[#8e857e]">Chest</div>
                                    <div className="font-semibold text-[#171513]">{model.chest}</div>
                                </div>
                                <div className="bg-[#faf8f5] py-1 rounded-lg border border-[#f0ebe3]">
                                    <div className="text-[#8e857e]">Waist</div>
                                    <div className="font-semibold text-[#171513]">{model.waist}</div>
                                </div>
                                <div className="bg-[#faf8f5] py-1 rounded-lg border border-[#f0ebe3]">
                                    <div className="text-[#8e857e]">Eyes</div>
                                    <div className="font-semibold text-[#171513]">{model.eyes}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Detail */}
            {selectedModel && (
                <div 
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
                    onClick={() => setSelectedModel(null)}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/60 my-8 relative animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedModel(null)}
                            className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-black hover:text-white flex items-center justify-center transition shadow-md"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[560px]">
                            <div className="md:col-span-6 bg-[#f7f4ee] p-6 flex flex-col justify-between">
                                <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
                                    <img 
                                        src={selectedModel.gallery[activeGalleryIndex] || selectedModel.image} 
                                        alt={selectedModel.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
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

                            <div className="md:col-span-6 p-7 md:p-9 flex flex-col justify-between">
                                <div>
                                    <span className="text-[11px] font-semibold text-[#8e857e] tracking-[0.2em] uppercase block mb-1">
                                        MALE TALENT SPECIFICATION
                                    </span>
                                    <h2 className="font-serif-luxury text-3xl font-normal text-[#171513] mb-1">
                                        {selectedModel.name}
                                    </h2>
                                    <p className="text-xs text-[#8e857e] mb-6">
                                        {[selectedModel.category, selectedModel.age && `Umur ${selectedModel.age} tahun`].filter(Boolean).join(' • ')}
                                    </p>

                                    <div className="grid grid-cols-3 gap-2.5 mb-6 text-center text-xs">
                                        <div className="bg-[#faf8f5] p-2.5 rounded-xl border border-[#eee7dc]">
                                            <div className="text-[#8e857e] text-[10.5px]">Height</div>
                                            <div className="font-semibold text-[#171513]">{selectedModel.height}</div>
                                        </div>
                                        <div className="bg-[#faf8f5] p-2.5 rounded-xl border border-[#eee7dc]">
                                            <div className="text-[#8e857e] text-[10.5px]">Suit Size</div>
                                            <div className="font-semibold text-[#171513]">{selectedModel.suit}</div>
                                        </div>
                                        <div className="bg-[#faf8f5] p-2.5 rounded-xl border border-[#eee7dc]">
                                            <div className="text-[#8e857e] text-[10.5px]">Shoe Size</div>
                                            <div className="font-semibold text-[#171513]">{selectedModel.shoe}</div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#171513] mb-2">
                                            Portofolio Runway & Kampanye
                                        </h4>
                                        <ul className="space-y-1.5 text-xs text-[#6e6761]">
                                            {(selectedModel.campaigns || []).map((camp, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#bba994]"></span>
                                                    <span>{camp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    {bookingSuccess ? (
                                        <div className="bg-[#eef8f1] border border-[#c4e8cf] rounded-2xl p-4 text-center">
                                            <CheckCircle className="w-6 h-6 text-[#248a47] mx-auto mb-1.5" />
                                            <p className="text-xs font-semibold text-[#196332]">Permintaan Booking Berhasil Dikirim!</p>
                                            <p className="text-[11px] text-[#4f7f5e]">Tim casting Siluet Model Tala akan segera menghubungi Anda.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleBookingSubmit} className="space-y-3 pt-3 border-t border-[#f0ebe3]">
                                            <div className="grid grid-cols-2 gap-2.5">
                                                <input
                                                    type="text"
                                                    required
                                                    value={bookingForm.clientName}
                                                    onChange={(e) => setBookingForm({...bookingForm, clientName: e.target.value})}
                                                    placeholder="Nama Brand / Acara"
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
                                                <span>Booking {selectedModel.name} Sekarang</span>
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
