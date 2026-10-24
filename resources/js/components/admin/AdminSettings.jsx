import React, { useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { CheckCircle2 } from 'lucide-react';

export default function AdminSettings() {
    const [settingsTab, setSettingsTab] = useState('profil');
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const [academySettings, setAcademySettings] = useState({
        name: 'Siluet Model Tala',
        tagline: 'Shape Your Presence — Leading Model Academy',
        email: 'admin@siluetmodeltala.com',
        phone: '+62 (021) 555-0199',
        whatsapp: '+62 812-3456-7890',
        address: 'Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan, 12190',
        bcaAccount: '8820 9182 301 (Siluet Model Tala PT)',
        mandiriAccount: '1370 0192 8840 (Siluet Model Tala PT)'
    });

    return (
        <AdminLayout activeNav="Pengaturan" breadcrumb="Pengaturan">
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div>
                <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                    KONFIGURASI SISTEM
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                    Pengaturan
                </h1>
                <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                    Konfigurasi identitas akademi, rekening pembayaran resmi, dan keamanan akun administrator.
                </p>
            </div>

            <div className="flex gap-2 bg-white p-2.5 rounded-2xl border border-[#ede7dd] w-fit">
                {[
                    { id: 'profil', label: 'Profil Institusi' },
                    { id: 'rekening', label: 'Rekening Pembayaran' },
                    { id: 'keamanan', label: 'Keamanan Akun' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSettingsTab(tab.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                            settingsTab === tab.id
                                ? 'bg-[#1c1a17] text-white shadow-xs'
                                : 'text-[#68625c] hover:bg-[#ede7dd]/50'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {settingsTab === 'profil' && (
                <div className="bg-white p-6 rounded-2xl border border-[#ede7dd] shadow-xs max-w-2xl space-y-4">
                    <h3 className="font-semibold text-base text-[#1c1a17] mb-2">Identitas Brand & Akademi</h3>
                    <div>
                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Nama Brand Akademi</label>
                        <input
                            type="text"
                            value={academySettings.name}
                            onChange={(e) => setAcademySettings({ ...academySettings, name: e.target.value })}
                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Tagline</label>
                        <input
                            type="text"
                            value={academySettings.tagline}
                            onChange={(e) => setAcademySettings({ ...academySettings, tagline: e.target.value })}
                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Email Resmi</label>
                            <input
                                type="email"
                                value={academySettings.email}
                                onChange={(e) => setAcademySettings({ ...academySettings, email: e.target.value })}
                                className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#1c1a17] mb-1">WhatsApp Studio</label>
                            <input
                                type="text"
                                value={academySettings.whatsapp}
                                onChange={(e) => setAcademySettings({ ...academySettings, whatsapp: e.target.value })}
                                className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Alamat Studio Utama</label>
                        <textarea
                            rows="2"
                            value={academySettings.address}
                            onChange={(e) => setAcademySettings({ ...academySettings, address: e.target.value })}
                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            onClick={() => showToast('Perubahan profil akademi berhasil disimpan!')}
                            className="px-5 py-2.5 bg-[#1c1a17] hover:bg-black text-white rounded-xl text-xs font-medium shadow-xs transition"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            )}

            {settingsTab === 'rekening' && (
                <div className="bg-white p-6 rounded-2xl border border-[#ede7dd] shadow-xs max-w-2xl space-y-4">
                    <h3 className="font-semibold text-base text-[#1c1a17] mb-2">Instruksi Transfer Pembayaran Siswa</h3>
                    <div>
                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Rekening Bank Central Asia (BCA)</label>
                        <input
                            type="text"
                            value={academySettings.bcaAccount}
                            onChange={(e) => setAcademySettings({ ...academySettings, bcaAccount: e.target.value })}
                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Rekening Bank Mandiri</label>
                        <input
                            type="text"
                            value={academySettings.mandiriAccount}
                            onChange={(e) => setAcademySettings({ ...academySettings, mandiriAccount: e.target.value })}
                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            onClick={() => showToast('Rekening pembayaran berhasil diperbarui!')}
                            className="px-5 py-2.5 bg-[#1c1a17] hover:bg-black text-white rounded-xl text-xs font-medium shadow-xs transition"
                        >
                            Simpan Rekening
                        </button>
                    </div>
                </div>
            )}

            {settingsTab === 'keamanan' && (
                <div className="bg-white p-6 rounded-2xl border border-[#ede7dd] shadow-xs max-w-2xl space-y-4">
                    <h3 className="font-semibold text-base text-[#1c1a17] mb-2">Keamanan & Password Akun</h3>
                    <div>
                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Password Saat Ini</label>
                        <input
                            type="password"
                            placeholder="••••••••••••"
                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Password Baru</label>
                            <input
                                type="password"
                                placeholder="Minimal 8 karakter"
                                className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Ulangi Password Baru</label>
                            <input
                                type="password"
                                placeholder="Konfirmasi password baru"
                                className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                            />
                        </div>
                    </div>
                    <div className="pt-2">
                        <button
                            onClick={() => showToast('Password berhasil diperbarui dengan aman!')}
                            className="px-5 py-2.5 bg-[#1c1a17] hover:bg-black text-white rounded-xl text-xs font-medium shadow-xs transition"
                        >
                            Update Password
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
