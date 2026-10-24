import React, { useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Download, Eye, Check, X, CheckCircle, CheckCircle2 } from 'lucide-react';

export default function AdminPayments() {
    const [selectedPaymentProof, setSelectedPaymentProof] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const [payments, setPayments] = useState([
        { id: 'INV-2026-104', name: 'Nadia Putri', program: 'Basic Modeling Intensive', amount: 'Rp 4.500.000', method: 'BCA Transfer', date: '22 Okt 2026, 09:42', status: 'Lunas', account: '8820491029 a/n Nadia Putri' },
        { id: 'INV-2026-105', name: 'Alya Maharani', program: 'Advanced Editorial & Posing', amount: 'Rp 6.800.000', method: 'Mandiri Livin', date: '22 Okt 2026, 08:15', status: 'Menunggu', account: '1370018892019 a/n Alya Maharani' },
        { id: 'INV-2026-106', name: 'Citra Anindya', program: 'Professional Runway & Catwalk', amount: 'Rp 7.500.000', method: 'QRIS BCA', date: '21 Okt 2026, 17:30', status: 'Lunas', account: 'QRIS Settlement' },
        { id: 'INV-2026-107', name: 'Salsabila Rahma', program: 'Commercial TVC & Audition', amount: 'Rp 5.200.000', method: 'BCA Transfer', date: '20 Okt 2026, 14:10', status: 'Diproses', account: '882041289901 a/n Salsabila Rahma' },
        { id: 'INV-2026-108', name: 'Kevin Jonathan', program: 'Male Posture & Catwalk', amount: 'Rp 4.900.000', method: 'BNI Mobile', date: '19 Okt 2026, 11:20', status: 'Lunas', account: '0981277361 a/n Kevin J.' }
    ]);

    return (
        <AdminLayout activeNav="Pembayaran" breadcrumb="Pembayaran">
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                        TRANSAKSI & INVOICE
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                        Pembayaran & Keuangan
                    </h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                        Verifikasi bukti transfer pendaftaran, status tagihan invoice, dan riwayat pemasukan.
                    </p>
                </div>
                <button
                    onClick={() => showToast('Mengekspor laporan keuangan bulanan...')}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                >
                    <Download className="w-4 h-4" />
                    Download Laporan Keuangan
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Total Omzet Bulan Ini</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">Rp 24.500.000</div>
                    <span className="text-[10px] text-emerald-600">↗ +8,4% dibanding September</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Menunggu Verifikasi</span>
                    <div className="text-2xl font-bold text-amber-600 mt-1">3 Invoice</div>
                    <span className="text-[10px] text-[#78716c]">Total Rp 11.200.000</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Transaksi Berhasil</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">42 Siswa</div>
                    <span className="text-[10px] text-emerald-600">Terverifikasi otomatis</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Rekening Utama</span>
                    <div className="text-sm font-bold text-[#1c1a17] mt-1">BCA 8820 9182 301</div>
                    <span className="text-[10px] text-[#8c827a]">PT Siluet Model Tala</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs">
                <div className="p-4 border-b border-[#f3efe8] flex items-center justify-between">
                    <h3 className="font-semibold text-base text-[#1c1a17]">Daftar Tagihan & Bukti Transfer</h3>
                    <span className="text-xs text-[#8c827a]">{payments.length} transaksi tercatat</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#f3efe8] bg-[#faf8f5] text-[11px] font-semibold text-[#8c827a]">
                                <th className="py-3 px-4">Kode Invoice</th>
                                <th className="py-3 px-4">Nama Peserta</th>
                                <th className="py-3 px-4">Program</th>
                                <th className="py-3 px-4">Metode & Rekening</th>
                                <th className="py-3 px-4">Nominal</th>
                                <th className="py-3 px-4">Bukti Transfer</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f5f1eb] text-xs">
                            {payments.map((p) => (
                                <tr key={p.id} className="hover:bg-[#fbf9f5] transition">
                                    <td className="py-3 px-4 font-mono font-bold text-[#1c1a17]">{p.id}</td>
                                    <td className="py-3 px-4 font-semibold text-[#1c1a17]">{p.name}</td>
                                    <td className="py-3 px-4 text-[#68625c]">{p.program}</td>
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-[#1c1a17]">{p.method}</div>
                                        <div className="text-[10px] text-[#8c827a]">{p.account}</div>
                                    </td>
                                    <td className="py-3 px-4 font-bold text-[#1c1a17]">{p.amount}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => setSelectedPaymentProof(p)}
                                            className="text-xs text-[#78716c] hover:text-[#1c1a17] flex items-center gap-1 border border-[#ede7dd] px-2.5 py-1 rounded-lg bg-[#faf8f5]"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span>Struk</span>
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-medium border ${
                                            p.status === 'Lunas' ? 'bg-[#eaf5ed] text-[#22723c] border-[#d2ead7]' :
                                            p.status === 'Menunggu' ? 'bg-[#fef7ea] text-[#b47a16] border-[#fbe5bd]' : 'bg-[#eef4fe] text-[#2b6cb0] border-[#d3e3fd]'
                                        }`}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        {p.status === 'Menunggu' ? (
                                            <button
                                                onClick={() => {
                                                    setPayments(payments.map(x => x.id === p.id ? { ...x, status: 'Lunas' } : x));
                                                    showToast(`Pembayaran ${p.id} berhasil diverifikasi!`);
                                                }}
                                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition"
                                            >
                                                Verifikasi
                                            </button>
                                        ) : (
                                            <span className="text-[11px] text-emerald-600 font-semibold flex items-center justify-end gap-1">
                                                <Check className="w-3.5 h-3.5" /> Terverifikasi
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedPaymentProof && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#ede7dd] relative">
                        <div className="flex items-center justify-between pb-3 border-b border-[#ede7dd]">
                            <div>
                                <h3 className="font-semibold text-base text-[#1c1a17]">
                                    Bukti Transfer: {selectedPaymentProof.id}
                                </h3>
                                <span className="text-xs text-[#8c827a]">{selectedPaymentProof.name}</span>
                            </div>
                            <button onClick={() => setSelectedPaymentProof(null)} className="p-1.5 text-[#8c827a] hover:text-[#1c1a17] rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="my-4 rounded-xl overflow-hidden border border-[#ede7dd] bg-[#faf8f5] p-4 text-center">
                            <div className="h-56 bg-white rounded-lg border border-[#ede7dd] flex flex-col items-center justify-center p-4">
                                <CheckCircle className="w-12 h-12 text-emerald-500 mb-2" />
                                <span className="text-xs font-bold text-[#1c1a17]">TRANSFER BERHASIL</span>
                                <span className="text-xl font-bold text-[#1c1a17] mt-1">{selectedPaymentProof.amount}</span>
                                <span className="text-xs text-[#78716c] mt-1">{selectedPaymentProof.method}</span>
                                <span className="text-[11px] font-mono text-[#8c827a] mt-1">{selectedPaymentProof.account}</span>
                                <span className="text-[10px] text-[#9e968f] mt-2">{selectedPaymentProof.date}</span>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setSelectedPaymentProof(null)}
                                className="px-4 py-2 text-xs font-medium text-[#78716c] hover:bg-[#f7f5f0] rounded-xl"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
