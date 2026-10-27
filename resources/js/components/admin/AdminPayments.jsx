import React, { useEffect, useState, useMemo } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Download, CheckCircle2, XCircle, Clock, AlertCircle, Search, Filter } from 'lucide-react';
import { api, apiErrorMessage } from '../../services/api.js';

function Toast({ message, type = 'success' }) {
    if (!message) return null;
    return (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce ${type === 'error' ? 'bg-red-700 text-white' : 'bg-[#1c1a17] text-white'}`}>
            {type === 'error' ? <XCircle className="w-5 h-5 text-red-300" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            <span>{message}</span>
        </div>
    );
}

const statusBadge = (status) => {
    const map = {
        paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        pending: 'bg-amber-50 text-amber-700 border-amber-200',
        rejected: 'bg-red-50 text-red-700 border-red-200',
    };
    const label = { paid: 'Lunas', pending: 'Menunggu', rejected: 'Ditolak' };
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${map[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
            {status === 'paid' && <CheckCircle2 className="w-3 h-3" />}
            {status === 'pending' && <Clock className="w-3 h-3" />}
            {status === 'rejected' && <XCircle className="w-3 h-3" />}
            {label[status] || status}
        </span>
    );
};

export default function AdminPayments() {
    const [payments, setPayments] = useState([]);
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [filterStatus, setFilterStatus] = useState('semua');
    const [search, setSearch] = useState('');
    const [processing, setProcessing] = useState(null);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const load = async () => {
        try {
            const [paymentsData, reportData] = await Promise.all([
                api('/api/admin/payments?per_page=100'),
                api('/api/admin/reports?per_page=1'),
            ]);
            setPayments(paymentsData.data || []);
            setReport(reportData);
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const confirm = async (payment) => {
        if (processing) return;
        setProcessing(payment.id);
        try {
            await api(`/api/admin/payments/${payment.id}/confirm`, { method: 'PATCH' });
            showToast(`Pembayaran invoice ${payment.invoice} berhasil dikonfirmasi!`);
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setProcessing(null);
        }
    };

    const reject = async (payment) => {
        if (processing) return;
        if (!window.confirm(`Tolak pembayaran dari ${payment.enrollment?.participant?.user?.name || 'peserta'}? Tindakan ini juga akan membatalkan pendaftaran.`)) return;
        setProcessing(payment.id);
        try {
            await api(`/api/admin/payments/${payment.id}/reject`, { method: 'PATCH' });
            showToast(`Pembayaran invoice ${payment.invoice} ditolak.`);
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setProcessing(null);
        }
    };

    const filtered = useMemo(() => {
        return payments.filter(p => {
            const matchStatus = filterStatus === 'semua' || p.status === filterStatus;
            const term = search.toLowerCase();
            const matchSearch = !term || (
                (p.invoice || '').toLowerCase().includes(term) ||
                (p.enrollment?.participant?.user?.name || '').toLowerCase().includes(term) ||
                (p.enrollment?.program?.title || '').toLowerCase().includes(term)
            );
            return matchStatus && matchSearch;
        });
    }, [payments, filterStatus, search]);

    const money = v => `Rp ${Number(v || 0).toLocaleString('id-ID')}`;

    return (
        <AdminLayout activeNav="Pembayaran" breadcrumb="Pembayaran">
            <Toast message={toast?.msg} type={toast?.type} />

            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <span className="text-[10px] tracking-[0.28em] uppercase font-semibold text-[#8c827a]">TRANSAKSI & INVOICE</span>
                    <h1 className="mt-1 font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">Pembayaran & Keuangan</h1>
                    <p className="mt-1 text-sm text-[#78716c]">Konfirmasi atau tolak pembayaran peserta secara manual.</p>
                </div>
                <a href="/api/admin/reports?per_page=100" className="inline-flex items-center gap-2 rounded-xl bg-[#1c1a17] px-4 py-2.5 text-sm text-white hover:bg-black transition">
                    <Download className="h-4 w-4" />Unduh JSON
                </a>
            </div>

            {/* Stats */}
            {report && (
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Pembayaran Pending', value: report.payments.pending, color: 'text-amber-600' },
                        { label: 'Transaksi Lunas', value: report.payments.paid_count, color: 'text-emerald-600' },
                        { label: 'Pendapatan Terverifikasi', value: money(report.payments.verified_revenue), color: 'text-[#1c1a17]' },
                    ].map(({ label, value, color }) => (
                        <div key={label} className="rounded-2xl border border-[#ede7dd] bg-white p-5">
                            <span className="text-sm text-[#78716c]">{label}</span>
                            <p className={`mt-2 text-2xl font-semibold ${color}`}>{value}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Filter & Search */}
            <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border border-[#ede7dd]">
                <div className="flex gap-1.5">
                    {[{ v: 'semua', l: 'Semua' }, { v: 'pending', l: 'Pending' }, { v: 'paid', l: 'Lunas' }, { v: 'rejected', l: 'Ditolak' }].map(({ v, l }) => (
                        <button key={v} onClick={() => setFilterStatus(v)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${filterStatus === v ? 'bg-[#1c1a17] text-white' : 'text-[#68625c] hover:bg-[#ede7dd]/50'}`}>
                            {l}
                        </button>
                    ))}
                </div>
                <div className="flex-1 min-w-[200px] relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8c827a]" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, invoice, program..."
                        className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#ede7dd] rounded-xl bg-[#faf8f5] focus:outline-none" />
                </div>
                <span className="text-xs text-[#8c827a] ml-auto">{filtered.length} transaksi</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#ede7dd] bg-white shadow-xs">
                {loading ? (
                    <div className="p-10 text-center text-sm text-[#78716c]">Memuat data pembayaran...</div>
                ) : filtered.length === 0 ? (
                    <div className="p-10 text-center text-sm text-[#78716c]">Tidak ada pembayaran yang cocok.</div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b bg-[#faf8f5] text-[11px] font-semibold text-[#8c827a]">
                                <th className="p-3 px-4">Invoice</th>
                                <th className="p-3 px-4">Peserta</th>
                                <th className="p-3 px-4">Program</th>
                                <th className="p-3 px-4">Tanggal</th>
                                <th className="p-3 px-4">Nominal</th>
                                <th className="p-3 px-4">Status</th>
                                <th className="p-3 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f5f1eb]">
                            {filtered.map(payment => (
                                <tr key={payment.id} className="hover:bg-[#fbf9f5] transition">
                                    <td className="p-3 px-4 font-mono text-xs text-[#1c1a17] font-bold">{payment.invoice || '—'}</td>
                                    <td className="p-3 px-4 font-medium text-[#1c1a17]">{payment.enrollment?.participant?.user?.name || '—'}</td>
                                    <td className="p-3 px-4 text-[#68625c]">{payment.enrollment?.program?.title || '—'}</td>
                                    <td className="p-3 px-4 text-[#68625c] text-xs">{payment.created_at ? new Date(payment.created_at).toLocaleDateString('id-ID') : '—'}</td>
                                    <td className="p-3 px-4 font-semibold text-[#1c1a17]">{money(payment.amount)}</td>
                                    <td className="p-3 px-4">{statusBadge(payment.status)}</td>
                                    <td className="p-3 px-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {payment.status === 'pending' && (
                                                <>
                                                    <button
                                                        disabled={processing === payment.id}
                                                        onClick={() => confirm(payment)}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition disabled:opacity-50"
                                                    >
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        Konfirmasi
                                                    </button>
                                                    <button
                                                        disabled={processing === payment.id}
                                                        onClick={() => reject(payment)}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs font-medium transition disabled:opacity-50"
                                                    >
                                                        <XCircle className="w-3.5 h-3.5" />
                                                        Tolak
                                                    </button>
                                                </>
                                            )}
                                            {payment.status === 'paid' && (
                                                <span className="text-xs text-emerald-600 font-medium">
                                                    Lunas {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('id-ID') : ''}
                                                </span>
                                            )}
                                            {payment.status === 'rejected' && (
                                                <span className="text-xs text-red-600 font-medium">Ditolak</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
}