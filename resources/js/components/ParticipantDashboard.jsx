import React, { useEffect, useState } from 'react';
import { authService } from '../services/authService.js';
import { api, apiErrorMessage } from '../services/api.js';
import { RequestStatus } from './RequestStatus.jsx';
import { Award, BookOpen, CheckCircle2, Clock, XCircle, LogOut, CreditCard, ChevronRight } from 'lucide-react';

const statusEnroll = {
    confirmed: { label: 'Terdaftar', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    pending: { label: 'Menunggu Konfirmasi', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    cancelled: { label: 'Dibatalkan', cls: 'bg-red-50 text-red-700 border-red-200' },
    completed: { label: 'Selesai', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
};

const statusPayment = {
    paid: { label: 'Lunas', cls: 'text-emerald-600', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    pending: { label: 'Menunggu Pembayaran', cls: 'text-amber-600', icon: <Clock className="w-3.5 h-3.5" /> },
    rejected: { label: 'Ditolak', cls: 'text-red-600', icon: <XCircle className="w-3.5 h-3.5" /> },
};

export default function ParticipantDashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    const load = () => {
        setLoading(true);
        authService.dashboard()
            .then(setData)
            .catch(r => setError(apiErrorMessage(r)))
            .finally(() => setLoading(false));
    };

    useEffect(() => { load(); }, []);

    const handleLogout = async () => {
        setLoggingOut(true);
        try {
            await api('/api/logout', { method: 'POST' });
        } catch (_) {}
        window.location.assign('/');
    };

    const money = v => `Rp ${Number(v || 0).toLocaleString('id-ID')}`;

    return (
        <main className="min-h-screen bg-[#f7f5f0] text-[#1c1a17]">
            {/* Top navbar */}
            <nav className="bg-white border-b border-[#ede7dd] sticky top-0 z-20">
                <div className="mx-auto max-w-5xl px-5 py-3.5 flex items-center justify-between">
                    <a href="/" className="font-serif text-lg tracking-tight text-[#1c1a17]">Siluet Model Tala</a>
                    <button onClick={handleLogout} disabled={loggingOut}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#78716c] hover:text-[#1c1a17] transition disabled:opacity-50">
                        <LogOut className="w-3.5 h-3.5" />
                        {loggingOut ? 'Keluar...' : 'Keluar'}
                    </button>
                </div>
            </nav>

            <div className="mx-auto max-w-5xl px-5 py-10 sm:px-10">
                {/* Header */}
                <div className="mb-8">
                    <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#8c827a]">PORTAL PESERTA</span>
                    <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-normal text-[#1c1a17] tracking-tight">Pendaftaran Saya</h1>
                    <p className="mt-1 text-sm text-[#78716c]">Pantau status pendaftaran dan pembayaran program Anda.</p>
                </div>

                <RequestStatus loading={loading} error={error} empty={!loading && !error && !data?.enrollments?.length}>
                    {data && <>
                        {/* Stats grid */}
                        <div className="grid gap-4 sm:grid-cols-3 mb-8">
                            {[
                                { label: 'Total Pendaftaran', value: data.statistics?.enrollments ?? 0, icon: <BookOpen className="w-5 h-5 text-[#bba994]" /> },
                                { label: 'Pembayaran Lunas', value: data.statistics?.successfulPayments ?? 0, icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
                                { label: 'Menunggu Pembayaran', value: data.statistics?.pendingPayments ?? 0, icon: <Clock className="w-5 h-5 text-amber-500" /> },
                            ].map(({ label, value, icon }) => (
                                <div key={label} className="rounded-2xl border border-[#ede7dd] bg-white p-5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#faf8f5] flex items-center justify-center">{icon}</div>
                                    <div>
                                        <span className="text-xs text-[#78716c]">{label}</span>
                                        <p className="text-2xl font-semibold text-[#1c1a17] mt-0.5">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Enrollment cards */}
                        <h2 className="font-serif text-xl font-normal mb-4 text-[#1c1a17]">Riwayat Program</h2>
                        <div className="space-y-4">
                            {data.enrollments.map(enrollment => {
                                const es = statusEnroll[enrollment.status] || { label: enrollment.status, cls: 'bg-gray-50 text-gray-700 border-gray-200' };
                                const ps = enrollment.payment ? (statusPayment[enrollment.payment.status] || { label: enrollment.payment.status, cls: 'text-gray-500', icon: null }) : null;
                                return (
                                    <article key={enrollment.id} className="rounded-2xl border border-[#ede7dd] bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                                    <h3 className="font-semibold text-base text-[#1c1a17]">
                                                        {enrollment.program?.title || 'Program'}
                                                    </h3>
                                                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${es.cls}`}>
                                                        {es.label}
                                                    </span>
                                                </div>
                                                {enrollment.program?.category && (
                                                    <p className="text-xs text-[#8c827a]">{enrollment.program.category} · {enrollment.program.duration}</p>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                {enrollment.enrolled_at && (
                                                    <span className="text-[10px] text-[#8c827a]">
                                                        Daftar: {new Date(enrollment.enrolled_at).toLocaleDateString('id-ID')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Payment info */}
                                        {enrollment.payment && (
                                            <div className="mt-4 pt-4 border-t border-[#f3efe8] flex flex-wrap items-center justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <CreditCard className="w-4 h-4 text-[#bba994]" />
                                                    <div>
                                                        <span className="text-[10px] text-[#8c827a] block">Invoice: {enrollment.payment.invoice}</span>
                                                        <span className="font-semibold text-sm text-[#1c1a17]">{money(enrollment.payment.amount)}</span>
                                                    </div>
                                                </div>
                                                <div className={`flex items-center gap-1.5 text-xs font-medium ${ps?.cls}`}>
                                                    {ps?.icon}
                                                    {ps?.label}
                                                    {enrollment.payment.status === 'paid' && enrollment.payment.paid_at && (
                                                        <span className="text-[#8c827a] font-normal ml-1">
                                                            pada {new Date(enrollment.payment.paid_at).toLocaleDateString('id-ID')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Pending payment instruction */}
                                        {enrollment.payment?.status === 'pending' && (
                                            <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3.5 text-xs text-amber-800">
                                                <strong className="block mb-1">Instruksi Pembayaran</strong>
                                                Transfer sesuai nominal ke rekening akademi, lalu konfirmasi ke admin via WhatsApp dengan menyertakan bukti transfer dan nomor invoice.
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    </>}
                </RequestStatus>

                {/* CTA link */}
                <div className="mt-10 pt-8 border-t border-[#ede7dd] flex flex-wrap gap-3">
                    <a href="/modeling-school"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#1c1a17] px-5 py-3 text-xs font-medium text-white hover:bg-black transition">
                        <BookOpen className="w-3.5 h-3.5" />Lihat Program Lain
                    </a>
                    <a href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-white border border-[#ede7dd] px-5 py-3 text-xs font-medium text-[#1c1a17] hover:bg-[#f7f5f0] transition">
                        <ChevronRight className="w-3.5 h-3.5" />Ke Beranda
                    </a>
                </div>
            </div>
        </main>
    );
}