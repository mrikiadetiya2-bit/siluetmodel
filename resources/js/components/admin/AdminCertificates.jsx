import React, { useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Plus, Eye, ShieldCheck, Printer, X, Award, CheckCircle2 } from 'lucide-react';

export default function AdminCertificates() {
    const [selectedCert, setSelectedCert] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const certificates = [
        { certNo: 'SMT-CERT-8841', studentName: 'Amanda Natasha', program: 'International Fashion Week Masterclass', graduationDate: '15 Oktober 2026', grade: 'Distinction (A+)', verified: true, director: 'Elena Siluet', headCoach: 'Aura Clarissa' },
        { certNo: 'SMT-CERT-8842', studentName: 'Jessica Tania', program: 'Professional Runway & Catwalk', graduationDate: '10 Oktober 2026', grade: 'High Merit (A)', verified: true, director: 'Elena Siluet', headCoach: 'Jessica Tania' },
        { certNo: 'SMT-CERT-8843', studentName: 'Nadia Putri', program: 'Basic Modeling Intensive Batch V', graduationDate: '01 September 2026', grade: 'Distinction (A+)', verified: true, director: 'Elena Siluet', headCoach: 'Aura Clarissa' },
        { certNo: 'SMT-CERT-8844', studentName: 'Rian Prasetya', program: 'Male Posture & Catwalk Division', graduationDate: '28 Agustus 2026', grade: 'Merit (B+)', verified: true, director: 'Elena Siluet', headCoach: 'Dimas Wicaksono' }
    ];

    return (
        <AdminLayout activeNav="Sertifikat" breadcrumb="Sertifikat">
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                        KOMPETENSI & KELULUSAN
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                        Penerbitan Sertifikat
                    </h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                        Kelola kelulusan siswa dan terbitkan sertifikat kompetensi resmi ber-QR Code.
                    </p>
                </div>
                <button
                    onClick={() => showToast('Membuka wizard penerbitan sertifikat baru.')}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                >
                    <Plus className="w-4 h-4" />
                    Terbitkan Sertifikat
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs">
                <div className="p-4 border-b border-[#f3efe8] flex items-center justify-between">
                    <h3 className="font-semibold text-base text-[#1c1a17]">Arsip Sertifikat Terbit</h3>
                    <span className="text-xs text-[#8c827a]">Total {certificates.length} sertifikat resmi</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#f3efe8] bg-[#faf8f5] text-[11px] font-semibold text-[#8c827a]">
                                <th className="py-3 px-4">Nomor Sertifikat</th>
                                <th className="py-3 px-4">Nama Lulusan</th>
                                <th className="py-3 px-4">Program Selesai</th>
                                <th className="py-3 px-4">Predikat Nilai</th>
                                <th className="py-3 px-4">Tanggal Kelulusan</th>
                                <th className="py-3 px-4">QR Verifikasi</th>
                                <th className="py-3 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f5f1eb] text-xs">
                            {certificates.map((cert) => (
                                <tr key={cert.certNo} className="hover:bg-[#fbf9f5] transition">
                                    <td className="py-3.5 px-4 font-mono font-bold text-[#1c1a17]">{cert.certNo}</td>
                                    <td className="py-3.5 px-4 font-semibold text-[#1c1a17]">{cert.studentName}</td>
                                    <td className="py-3.5 px-4 text-[#68625c]">{cert.program}</td>
                                    <td className="py-3.5 px-4">
                                        <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md font-bold text-[11px]">
                                            {cert.grade}
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-[#78716c]">{cert.graduationDate}</td>
                                    <td className="py-3.5 px-4">
                                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                                            <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi
                                        </span>
                                    </td>
                                    <td className="py-3.5 px-4 text-right">
                                        <button
                                            onClick={() => setSelectedCert(cert)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1a17] text-white rounded-xl text-xs font-medium hover:bg-black transition"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span>Preview & Cetak</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Certificate Preview */}
            {selectedCert && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-[#fffdf9] rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-4 border-[#d4af37] relative text-center">
                        <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 p-2 text-[#8c827a] hover:text-[#1c1a17] rounded-full">
                            <X className="w-5 h-5" />
                        </button>
                        <div className="border-2 border-[#bfa888] p-8 rounded-2xl relative">
                            <span className="font-serif text-xl tracking-[0.4em] text-[#1c1a17] uppercase block">S I L U E T</span>
                            <span className="text-[9px] tracking-[0.3em] text-[#8c827a] font-semibold block mt-1 uppercase">MODEL TALA ACADEMY</span>
                            <div className="my-6">
                                <span className="font-serif italic text-base text-[#8c827a] block">Certificate of Professional Achievement</span>
                                <span className="text-xs tracking-widest uppercase text-[#59524c] block mt-1">DIBERIKAN DENGAN BANGGA KEPADA</span>
                                <h2 className="font-serif text-3xl font-bold text-[#1c1a17] mt-3">{selectedCert.studentName}</h2>
                                <p className="text-xs text-[#68625c] max-w-md mx-auto mt-3 leading-relaxed">
                                    Telah menyelesaikan seluruh modul pelatihan resmi dan memenuhi standar kelulusan profesional pada program:
                                </p>
                                <h3 className="font-semibold text-sm text-[#1c1a17] mt-1.5 uppercase tracking-wide">{selectedCert.program}</h3>
                                <div className="mt-2 text-xs font-semibold text-amber-800 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-200">
                                    Predikat: {selectedCert.grade}
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-[#ede7dd] flex items-center justify-between text-xs text-[#68625c]">
                                <div>
                                    <div className="font-script text-2xl text-[#1c1a17] leading-none mb-1">Elena Siluet</div>
                                    <span className="text-[10px] uppercase tracking-wider block">Founder & Director</span>
                                </div>
                                <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] flex flex-col items-center justify-center p-1 bg-amber-50/50">
                                    <Award className="w-6 h-6 text-[#d4af37]" />
                                    <span className="text-[8px] font-bold text-amber-900 mt-0.5">OFFICIAL</span>
                                </div>
                                <div>
                                    <div className="font-script text-2xl text-[#1c1a17] leading-none mb-1">{selectedCert.headCoach}</div>
                                    <span className="text-[10px] uppercase tracking-wider block">Head Coach</span>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between text-[10px] font-mono text-[#8c827a] pt-3 border-t border-[#f3efe8]">
                                <span>No: {selectedCert.certNo}</span>
                                <span>Tanggal: {selectedCert.graduationDate}</span>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                onClick={() => showToast('Mencetak sertifikat resmi...')}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1c1a17] text-white rounded-xl text-xs font-medium hover:bg-black transition"
                            >
                                <Printer className="w-4 h-4" />
                                Cetak PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
