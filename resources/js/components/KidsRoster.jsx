import React, { useState, useMemo } from 'react';
import { Search, Heart, X, CheckCircle, ShieldCheck, Smile, HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';

const kidsTalents = [
    {
        id: 'k-1',
        name: 'Mikaela Salsabila',
        age: '8 Tahun',
        category: 'Kids (6-10 Years)',
        height: '128 cm',
        skills: ['Catwalk Kids', 'TV Commercial', 'Fashion Show'],
        experience: '2 Years',
        image: '/images/hero_1.jpg',
        campaigns: ['Kidz Station Festive Look', 'Mothercare Fashion Show', 'Junior Vogue Lookbook'],
        quote: 'Ceria, berani di panggung, dan sangat mudah diarahkan sutradara.'
    },
    {
        id: 'k-2',
        name: 'Kenzo Alvaro',
        age: '9 Tahun',
        category: 'Kids (6-10 Years)',
        height: '132 cm',
        skills: ['Kids Runway', 'Activewear', 'Print Ad'],
        experience: '1.5 Years',
        image: '/images/hero_4.jpg',
        campaigns: ['Gingersnaps Catalog', 'Dettol Health Campaign', 'Jakarta Kids Fashion Week'],
        quote: 'Sangat ekspresif dengan energi positif dan postur tegap.'
    },
    {
        id: 'k-3',
        name: 'Alya Kirana',
        age: '13 Tahun',
        category: 'Teens (11-15 Years)',
        height: '162 cm',
        skills: ['Teen Runway', 'Editorial Modest', 'Youth Commercial'],
        experience: '3 Years',
        image: '/images/card_basic.jpg',
        campaigns: ['Rabbani Youth Ambassador', 'Teen Fashion Week Jakarta', 'Wardah Young Faces'],
        quote: 'Potensi runway internasional dengan pembawaan anggun dan percaya diri.'
    },
    {
        id: 'k-4',
        name: 'Celine Amanda',
        age: '4 Tahun',
        category: 'Toddler (3-5 Years)',
        height: '102 cm',
        skills: ['Toddler Commercial', 'Baby Brand Shoot'],
        experience: '1 Year',
        image: '/images/hero_model.jpg',
        campaigns: ['Pampers Premium Look', 'My Baby Commercial'],
        quote: 'Sangat menggemaskan, natural di depan kamera studio.'
    }
];

export default function KidsRoster() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedKid, setSelectedKid] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [expandedFaq, setExpandedFaq] = useState(null);

    const categories = ['All', 'Toddler (3-5 Years)', 'Kids (6-10 Years)', 'Teens (11-15 Years)'];

    const filteredKids = useMemo(() => {
        return kidsTalents.filter((kid) => {
            const matchesCategory = selectedCategory === 'All' || kid.category === selectedCategory;
            const matchesSearch = kid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                kid.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const faqs = [
        {
            q: 'Bagaimana komitmen jam kerja & keamanan anak saat pemotretan?',
            a: 'Siluet Model Tala memberlakukan standar perlindungan anak ketat (Child Safety Protocol). Maksimal jam kerja 3-4 jam untuk balita dan 5 jam untuk anak, selalu didampingi orang tua & pendamping profesional bersertifikat.'
        },
        {
            q: 'Apakah anak harus memiliki pengalaman modeling sebelumnya?',
            a: 'Tidak harus. Kami memiliki program kelas Kids Modeling School yang mengajarkan postur, ekspresi, dan etika panggung dengan metode fun & bermain tanpa tekanan.'
        },
        {
            q: 'Bagaimana cara mendaftarkan anak saya untuk audisi talent?',
            a: 'Anda dapat menekan tombol Join Academy / Audisi di navbar atau menghubungi admin casting kami dengan mengirimkan 2 foto natural (close-up & full body) tanpa riasan tebal.'
        }
    ];

    return (
        <div className="py-10">
            {/* Safe Nurturing Banner */}
            <div className="bg-[#faf8f5] border border-[#ede7dd] rounded-2xl p-5 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#171513] text-white flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-xs text-[#171513] uppercase tracking-wider">Perlindungan Talenta Anak & Remaja</h4>
                        <p className="text-xs text-[#6e6761]">Seluruh proyek komersial dan pelatihan anak diawasi ketat demi kenyamanan, keselamatan, dan kebahagiaan mereka.</p>
                    </div>
                </div>
                <a href="#parent-faq" className="text-xs font-semibold text-[#171513] underline shrink-0 hover:opacity-75">
                    Panduan Orang Tua &rarr;
                </a>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 pb-6 border-b border-[#eee7dc]">
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

                <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-[#8e857e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari talenta cilik..."
                        className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-[#171513] transition"
                    />
                </div>
            </div>

            {/* Grid of Kids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-16">
                {filteredKids.map((kid) => (
                    <div
                        key={kid.id}
                        onClick={() => setSelectedKid(kid)}
                        className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#ede7dd] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f0e8]">
                            <img
                                src={kid.image}
                                alt={kid.name}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10.5px] font-semibold text-[#171513] border border-white/60 shadow-xs">
                                {kid.age}
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="font-serif-luxury text-lg font-normal text-[#171513] mb-1">
                                {kid.name}
                            </h3>
                            <p className="text-[11.5px] text-[#8e857e] mb-3">
                                Tinggi: {kid.height} &bull; {kid.category}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#f2ede6]">
                                {kid.skills.map((skill, idx) => (
                                    <span key={idx} className="bg-[#faf8f5] text-[#59524c] px-2 py-0.5 rounded text-[10px] border border-[#eee7dc]">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Parent Guide & FAQ Accordion Section */}
            <div id="parent-faq" className="bg-[#faf8f5] rounded-3xl p-8 lg:p-12 border border-[#eee7dc] max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#8e857e] font-semibold block mb-2">
                        PANDUAN ORANG TUA
                    </span>
                    <h3 className="font-serif-luxury text-2xl lg:text-3xl text-[#171513]">
                        Pertanyaan Umum Seputar Modeling Anak
                    </h3>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, idx) => (
                        <div 
                            key={idx}
                            onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                            className="bg-white rounded-2xl p-5 border border-[#ede7dd] cursor-pointer transition"
                        >
                            <div className="flex items-center justify-between font-medium text-sm text-[#171513]">
                                <span>{faq.q}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                            </div>
                            {expandedFaq === idx && (
                                <p className="mt-3 text-xs text-[#6e6761] leading-relaxed border-t border-[#f2ede6] pt-3">
                                    {faq.a}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Detail */}
            {selectedKid && (
                <div 
                    className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
                    onClick={() => setSelectedKid(null)}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-white/60 p-7 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedKid(null)}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center transition"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                            <img src={selectedKid.image} alt={selectedKid.name} className="w-full h-full object-cover object-top" />
                        </div>

                        <span className="text-[11px] font-semibold text-[#8e857e] tracking-widest uppercase block mb-1">
                            {selectedKid.category}
                        </span>
                        <h2 className="font-serif-luxury text-2xl text-[#171513] mb-1">{selectedKid.name}</h2>
                        <p className="text-xs text-[#8e857e] mb-4">Usia: {selectedKid.age} &bull; Tinggi: {selectedKid.height}</p>

                        <div className="bg-[#faf8f5] p-3.5 rounded-xl border border-[#ede7dd] text-xs text-[#59524c] italic mb-5">
                            "{selectedKid.quote}"
                        </div>

                        <div className="mb-6">
                            <h4 className="text-xs font-semibold uppercase text-[#171513] mb-2">Kampanye Terkini:</h4>
                            <ul className="text-xs text-[#6e6761] space-y-1">
                                {selectedKid.campaigns.map((c, i) => (
                                    <li key={i}>&bull; {c}</li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={async () => {
                                try {
                                    await fetch('/api/public/records/booking', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                                        body: JSON.stringify({
                                            data: {
                                                talentId: selectedKid?.id,
                                                talentName: selectedKid?.name,
                                                division: 'Kids',
                                                submittedAt: new Date().toISOString(),
                                            }
                                        })
                                    });
                                } catch (err) {}
                                setBookingSuccess(true);
                                setTimeout(() => {
                                    setBookingSuccess(false);
                                    setSelectedKid(null);
                                }, 2000);
                            }}
                            className="w-full bg-[#171513] text-white py-3 rounded-xl text-xs font-medium hover:bg-[#2b2723] transition flex items-center justify-center gap-2"
                        >
                            {bookingSuccess ? (
                                <span className="flex items-center gap-1.5 text-emerald-300">
                                    <CheckCircle className="w-4 h-4" /> Permintaan Terkirim!
                                </span>
                            ) : (
                                <span>Ajukan Booking untuk {selectedKid.name}</span>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
