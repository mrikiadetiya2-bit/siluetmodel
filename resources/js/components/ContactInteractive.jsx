import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, Clock, Sparkles } from 'lucide-react';

export default function ContactInteractive() {
    const [formType, setFormType] = useState('booking'); // 'booking' | 'audition'
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        companyOrAge: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', companyOrAge: '', message: '' });
        }, 4000);
    };

    return (
        <div className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left: Contact Info & Studio Details */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-[#faf8f5] rounded-3xl p-8 border border-[#ede7dd]">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8e857e] font-semibold block mb-2">
                            STUDIO & KANTOR PUSAT
                        </span>
                        <h3 className="font-serif-luxury text-2xl text-[#171513] mb-6">
                            Siluet Model Tala Academy
                        </h3>

                        <div className="space-y-4 text-xs text-[#59524c]">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-[#bba994] shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-[#171513] block mb-0.5">Studio Utama:</strong>
                                    <span>Jl. Senopati Fashion District No. 88, Kebayoran Baru, Jakarta Selatan</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-[#bba994] shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-[#171513] block mb-0.5">Telepon & WhatsApp Resmi:</strong>
                                    <span>+62 (021) 555-0199 / +62 812-3456-7890</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-[#bba994] shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-[#171513] block mb-0.5">Email Korespondensi:</strong>
                                    <span>info@siluetmodeltala.com &bull; casting@siluetmodeltala.com</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="w-4 h-4 text-[#bba994] shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-[#171513] block mb-0.5">Jam Operasional:</strong>
                                    <span>Senin &ndash; Sabtu: 09.00 &ndash; 18.00 WIB (Kunjungan dengan perjanjian)</span>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp Quick Connect Button */}
                        <div className="mt-8 pt-6 border-t border-[#ede7dd]">
                            <a
                                href="https://wa.me/6281234567890?text=Halo%20Siluet%20Model%20Tala,%20saya%20ingin%20berkonsultasi"
                                target="_blank"
                                rel="noreferrer"
                                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-5 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition shadow-sm"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>Hubungi via WhatsApp Direct</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right: Dual Interactive Form */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-8 lg:p-10 border border-[#ede7dd] shadow-lg">
                    {/* Tab Switcher */}
                    <div className="flex items-center gap-2 mb-8 p-1.5 bg-[#faf8f5] rounded-2xl border border-[#ded8cf]">
                        <button
                            type="button"
                            onClick={() => setFormType('booking')}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition ${
                                formType === 'booking'
                                    ? 'bg-[#171513] text-white shadow-xs'
                                    : 'text-[#59524c] hover:text-[#171513]'
                            }`}
                        >
                            Booking Talent & Kampanye
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormType('audition')}
                            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition ${
                                formType === 'audition'
                                    ? 'bg-[#171513] text-white shadow-xs'
                                    : 'text-[#59524c] hover:text-[#171513]'
                            }`}
                        >
                            Daftar Audisi Calon Model
                        </button>
                    </div>

                    {submitted ? (
                        <div className="py-16 text-center">
                            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-3" />
                            <h4 className="font-serif-luxury text-2xl text-[#171513] mb-2">Pesan Anda Berhasil Terkirim!</h4>
                            <p className="text-xs text-[#6e6761] max-w-md mx-auto leading-relaxed">
                                Terima kasih telah menghubungi Siluet Model Tala. Tim representasi kami akan merespons melalui email / WhatsApp dalam kurun waktu 1x24 jam kerja.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-[11px] font-semibold text-[#8e857e] uppercase tracking-wider block mb-1">
                                    {formType === 'booking' ? 'Nama Brand / Agensi / Perwakilan' : 'Nama Lengkap Calon Model'} *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    placeholder={formType === 'booking' ? 'Contoh: PT. Mode Kreatif Nusantara' : 'Contoh: Nadia Safira'}
                                    className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#171513]"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[11px] font-semibold text-[#8e857e] uppercase tracking-wider block mb-1">
                                        Email Kontak *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        placeholder="nama@email.com"
                                        className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#171513]"
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-semibold text-[#8e857e] uppercase tracking-wider block mb-1">
                                        Nomor WhatsApp *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        placeholder="0812xxxxxxx"
                                        className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#171513]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] font-semibold text-[#8e857e] uppercase tracking-wider block mb-1">
                                    {formType === 'booking' ? 'Jenis Proyek (Runway / Photoshoot / TVC)' : 'Usia & Tinggi Badan (cm)'} *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.companyOrAge}
                                    onChange={(e) => setFormData({...formData, companyOrAge: e.target.value})}
                                    placeholder={formType === 'booking' ? 'Contoh: Photoshoot Katalog Autumn 2026' : 'Contoh: Usia 19 Tahun, Tinggi 177 cm'}
                                    className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#171513]"
                                />
                            </div>

                            <div>
                                <label className="text-[11px] font-semibold text-[#8e857e] uppercase tracking-wider block mb-1">
                                    Catatan / Pesan Tambahan *
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    placeholder={formType === 'booking' ? 'Jelaskan kriteria talenta yang dicari, tanggal acara, atau budget estimasi...' : 'Ceritakan minat modeling Anda atau tautan akun media sosial / Instagram...'}
                                    className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#171513]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#171513] hover:bg-[#2c2824] text-white py-3.5 rounded-xl text-xs font-semibold transition shadow-md flex items-center justify-center gap-2 mt-2"
                            >
                                <Send className="w-3.5 h-3.5" />
                                <span>{formType === 'booking' ? 'Kirim Penawaran Booking' : 'Kirim Pendaftaran Audisi'}</span>
                            </button>
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
}
