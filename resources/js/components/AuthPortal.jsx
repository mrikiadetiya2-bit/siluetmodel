import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Phone, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function AuthPortal({ initialMode = 'login' }) {
    const [mode, setMode] = useState(initialMode); // 'login' | 'register'
    const [role, setRole] = useState('student'); // 'student' | 'model' | 'client'
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        remember: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === 'login') {
            setSuccessMessage('Selamat datang kembali di Portal Siluet Model Tala!');
        } else {
            setSuccessMessage('Pendaftaran akun berhasil! Silakan verifikasi tautan di email Anda.');
        }
        setTimeout(() => {
            setSuccessMessage('');
        }, 3500);
    };

    return (
        <div className="py-12 max-w-xl mx-auto">
            {/* VisionOS Floating Glass Card */}
            <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 border border-white/80 shadow-2xl relative overflow-hidden">
                
                {/* Glow subtle highlight */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#bba994] to-transparent"></div>

                {/* Mode Tabs */}
                <div className="flex items-center gap-2 mb-8 p-1.5 bg-[#faf8f5] rounded-2xl border border-[#ede7dd]">
                    <button
                        type="button"
                        onClick={() => { setMode('login'); setSuccessMessage(''); }}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition ${
                            mode === 'login'
                                ? 'bg-[#171513] text-white shadow-xs'
                                : 'text-[#59524c] hover:text-[#171513]'
                        }`}
                    >
                        Member Login
                    </button>
                    <button
                        type="button"
                        onClick={() => { setMode('register'); setSuccessMessage(''); }}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition ${
                            mode === 'register'
                                ? 'bg-[#171513] text-white shadow-xs'
                                : 'text-[#59524c] hover:text-[#171513]'
                        }`}
                    >
                        Join Academy (Daftar)
                    </button>
                </div>

                {/* Role Toggle for Registration */}
                {mode === 'register' && (
                    <div className="mb-6">
                        <label className="text-[11px] font-semibold text-[#8e857e] uppercase tracking-wider block mb-2">
                            Pilih Kategori Keanggotaan:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => setRole('student')}
                                className={`py-2 px-2 rounded-xl text-[11px] font-medium border text-center transition ${
                                    role === 'student'
                                        ? 'bg-[#171513] text-white border-[#171513]'
                                        : 'bg-[#faf8f5] text-[#59524c] border-[#ded8cf]'
                                }`}
                            >
                                Siswa Baru
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('model')}
                                className={`py-2 px-2 rounded-xl text-[11px] font-medium border text-center transition ${
                                    role === 'model'
                                        ? 'bg-[#171513] text-white border-[#171513]'
                                        : 'bg-[#faf8f5] text-[#59524c] border-[#ded8cf]'
                                }`}
                            >
                                Calon Model
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('client')}
                                className={`py-2 px-2 rounded-xl text-[11px] font-medium border text-center transition ${
                                    role === 'client'
                                        ? 'bg-[#171513] text-white border-[#171513]'
                                        : 'bg-[#faf8f5] text-[#59524c] border-[#ded8cf]'
                                }`}
                            >
                                Klien / Brand
                            </button>
                        </div>
                    </div>
                )}

                {/* Success Alert */}
                {successMessage ? (
                    <div className="bg-[#eef8f1] border border-[#c4e8cf] rounded-2xl p-5 text-center mb-6">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                        <h4 className="font-serif-luxury text-lg text-[#196332] font-semibold">{successMessage}</h4>
                        <p className="text-xs text-[#4f7f5e] mt-1">Anda dialihkan ke dashboard akun...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === 'register' && (
                            <div>
                                <label className="text-[11px] font-semibold text-[#8e857e] uppercase tracking-wider block mb-1">
                                    Nama Lengkap *
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-[#8e857e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="Nama Lengkap Sesuai ID"
                                        className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#171513]"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="text-[11px] font-semibold text-[#8e857e] uppercase tracking-wider block mb-1">
                                Alamat Email *
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-[#8e857e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder="nama@email.com"
                                    className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#171513]"
                                />
                            </div>
                        </div>

                        {mode === 'register' && (
                            <div>
                                <label className="text-[11px] font-semibold text-[#8e857e] uppercase tracking-wider block mb-1">
                                    Nomor WhatsApp Aktif *
                                </label>
                                <div className="relative">
                                    <Phone className="w-4 h-4 text-[#8e857e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        placeholder="0812xxxxxxxx"
                                        className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#171513]"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-[11px] font-semibold text-[#8e857e] uppercase tracking-wider">
                                    Kata Sandi (Password) *
                                </label>
                                {mode === 'login' && (
                                    <a href="#forgot" className="text-[11px] text-[#8e857e] hover:text-[#171513]">
                                        Lupa Password?
                                    </a>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-[#8e857e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    placeholder="Minimal 8 karakter"
                                    className="w-full bg-[#faf8f5] border border-[#ded8cf] rounded-xl pl-10 pr-10 py-2.5 text-xs focus:outline-none focus:border-[#171513]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8e857e] hover:text-[#171513]"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#171513] hover:bg-[#2b2723] text-white py-3.5 rounded-xl text-xs font-semibold transition shadow-md flex items-center justify-center gap-2 mt-4"
                        >
                            <span>{mode === 'login' ? 'Masuk ke Akun Saya' : 'Daftarkan Akun Baru'}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>
                )}

                <div className="mt-8 pt-6 border-t border-[#f0ebe3] text-center text-xs text-[#8e857e]">
                    <div className="flex items-center justify-center gap-1.5 text-emerald-700 mb-2 font-medium">
                        <ShieldCheck className="w-4 h-4" /> Data pribadi Anda dienkripsi secara aman
                    </div>
                    <p>
                        Dengan melanjutkan, Anda menyetujui <a href="/about" className="text-[#171513] underline">Ketentuan Layanan</a> & <a href="/about" className="text-[#171513] underline">Kebijakan Privasi</a> Siluet Model Tala.
                    </p>
                </div>

            </div>
        </div>
    );
}
