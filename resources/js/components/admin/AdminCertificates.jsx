import React, { useEffect, useState, useMemo } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Eye, ShieldCheck, X, Award, CheckCircle2, XCircle, Plus, Printer } from 'lucide-react';
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

export default function AdminCertificates() {
    const [certificates, setCertificates] = useState([]);
    const [eligibles, setEligibles] = useState([]);
    const [selectedCert, setSelectedCert] = useState(null);
    const [issueModal, setIssueModal] = useState(null); // enrollment to issue cert for
    const [certForm, setCertForm] = useState({ grade: 'Sangat Memuaskan', notes: '' });
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [issuing, setIssuing] = useState(false);

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const load = async () => {
        try {
            const [certRecords, studentData] = await Promise.all([
                api('/api/admin/records/certificate').catch(() => []),
                api('/api/admin/students?per_page=200'),
            ]);

            // Map certificate portal records
            setCertificates((certRecords || []).map(r => ({ id: r.id, ...r.data })));

            // Find eligible: enrollments with status confirmed or completed AND payment paid
            const eligible = [];
            for (const student of (studentData.data || [])) {
                for (const enrollment of (student.enrollments || [])) {
                    if (['confirmed', 'completed'].includes(enrollment.status) && enrollment.payment?.status === 'paid') {
                        eligible.push({
                            enrollmentId: enrollment.id,
                            studentName: student.user?.name || 'Peserta',
                            studentEmail: student.user?.email || '',
                            program: enrollment.program?.title || 'Program',
                            enrolledAt: enrollment.enrolled_at,
                            participantId: student.id,
                        });
                    }
                }
            }
            setEligibles(eligible);
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const openIssue = (eligible) => {
        setIssueModal(eligible);
        setCertForm({ grade: 'Sangat Memuaskan', notes: '' });
    };

    const issueCertificate = async () => {
        setIssuing(true);
        const certNo = `SMT-${new Date().getFullYear()}-${String(issueModal.enrollmentId).padStart(4, '0')}`;
        const today = new Date().toLocaleDateString('id-ID', { dateStyle: 'long' });
        try {
            await api('/api/admin/records/certificate', {
                method: 'POST',
                body: JSON.stringify({
                    data: {
                        certNo,
                        studentName: issueModal.studentName,
                        studentEmail: issueModal.studentEmail,
                        program: issueModal.program,
                        grade: certForm.grade,
                        notes: certForm.notes,
                        graduationDate: today,
                        enrollmentId: issueModal.enrollmentId,
                    },
                    status: 'Aktif',
                }),
            });
            showToast(`Sertifikat ${certNo} berhasil diterbitkan!`);
            setIssueModal(null);
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setIssuing(false);
        }
    };

    const revoke = async (cert) => {
        if (!window.confirm(`Cabut sertifikat ${cert.certNo}? Tindakan ini tidak bisa diundur.`)) return;
        try {
            await api(`/api/admin/records/${cert.id}`, { method: 'DELETE' });
            showToast('Sertifikat dicabut.');
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        }
    };

    // Track which enrollments already have a cert
    const certedEnrollments = useMemo(() => new Set(certificates.map(c => c.enrollmentId)), [certificates]);

    return (
        <AdminLayout activeNav="Sertifikat" breadcrumb="Sertifikat">
            <Toast message={toast?.msg} type={toast?.type} />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">KOMPETENSI & KELULUSAN</span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">Penerbitan Sertifikat</h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">Terbitkan sertifikat untuk peserta yang telah menyelesaikan program dan melunasi pembayaran.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8c827a]">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-xl">{certificates.length} sertifikat terbit</span>
                    <span className="bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1.5 rounded-xl">{eligibles.filter(e => !certedEnrollments.has(e.enrollmentId)).length} menunggu terbit</span>
                </div>
            </div>

            {/* Eligible for certificate */}
            {!loading && eligibles.filter(e => !certedEnrollments.has(e.enrollmentId)).length > 0 && (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
                    <h3 className="font-semibold text-sm text-amber-900 mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4" />Peserta Siap Sertifikasi ({eligibles.filter(e => !certedEnrollments.has(e.enrollmentId)).length})
                    </h3>
                    <div className="space-y-2.5">
                        {eligibles.filter(e => !certedEnrollments.has(e.enrollmentId)).map(e => (
                            <div key={e.enrollmentId} className="bg-white rounded-xl p-3.5 border border-amber-100 flex items-center justify-between gap-3">
                                <div>
                                    <span className="font-semibold text-sm text-[#1c1a17]">{e.studentName}</span>
                                    <span className="text-xs text-[#78716c] block">{e.program}</span>
                                </div>
                                <button onClick={() => openIssue(e)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1a17] text-white rounded-xl text-xs font-medium hover:bg-black transition">
                                    <Plus className="w-3.5 h-3.5" />Terbitkan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certificates Table */}
            <div className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs">
                <div className="p-4 border-b border-[#f3efe8] flex items-center justify-between">
                    <h3 className="font-semibold text-base text-[#1c1a17]">Arsip Sertifikat Terbit</h3>
                    <span className="text-xs text-[#8c827a]">{certificates.length} sertifikat</span>
                </div>
                {loading ? (
                    <p className="p-8 text-center text-sm text-[#78716c]">Memuat sertifikat...</p>
                ) : !certificates.length ? (
                    <p className="p-8 text-center text-sm text-[#78716c]">Belum ada sertifikat diterbitkan. Terbitkan untuk peserta yang sudah memenuhi syarat di atas.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#f3efe8] bg-[#faf8f5] text-[11px] font-semibold text-[#8c827a]">
                                    <th className="py-3 px-4">Nomor Sertifikat</th>
                                    <th className="py-3 px-4">Nama Lulusan</th>
                                    <th className="py-3 px-4">Program Selesai</th>
                                    <th className="py-3 px-4">Predikat</th>
                                    <th className="py-3 px-4">Tanggal Kelulusan</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f5f1eb] text-xs">
                                {certificates.map((cert) => (
                                    <tr key={cert.id} className="hover:bg-[#fbf9f5] transition">
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
                                                <ShieldCheck className="w-3.5 h-3.5" />Terverifikasi
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button onClick={() => setSelectedCert(cert)}
                                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#f7f5f0] hover:bg-[#ede7dd] text-[#1c1a17] rounded-lg text-xs font-medium transition">
                                                    <Eye className="w-3 h-3" />Preview
                                                </button>
                                                <button onClick={() => revoke(cert)}
                                                    className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium transition">
                                                    Cabut
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Issue Modal */}
            {issueModal && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#ede7dd]">
                        <div className="flex items-center justify-between pb-4 border-b border-[#ede7dd]">
                            <h3 className="font-serif text-xl font-normal text-[#1c1a17]">Terbitkan Sertifikat</h3>
                            <button onClick={() => setIssueModal(null)} className="p-1.5 text-[#8c827a] hover:text-[#1c1a17]"><X className="w-5 h-5" /></button>
                        </div>
                        <div className="mt-4 space-y-3">
                            <div className="bg-[#faf8f5] rounded-xl p-3.5 text-xs space-y-1">
                                <p><span className="text-[#8c827a]">Peserta:</span> <strong>{issueModal.studentName}</strong></p>
                                <p><span className="text-[#8c827a]">Program:</span> <strong>{issueModal.program}</strong></p>
                                <p><span className="text-[#8c827a]">No. Sertifikat:</span> <strong>SMT-{new Date().getFullYear()}-{String(issueModal.enrollmentId).padStart(4, '0')}</strong></p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Predikat Kelulusan</label>
                                <select value={certForm.grade} onChange={e => setCertForm({ ...certForm, grade: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none">
                                    <option>Dengan Pujian (Cum Laude)</option>
                                    <option>Sangat Memuaskan</option>
                                    <option>Memuaskan</option>
                                    <option>Baik</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Catatan (Opsional)</label>
                                <textarea rows={2} value={certForm.notes} onChange={e => setCertForm({ ...certForm, notes: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none resize-none"
                                    placeholder="Catatan kelulusan..." />
                            </div>
                            <div className="pt-2 flex items-center justify-end gap-3">
                                <button onClick={() => setIssueModal(null)} className="px-4 py-2 text-xs text-[#78716c]">Batal</button>
                                <button onClick={issueCertificate} disabled={issuing}
                                    className="px-5 py-2 bg-[#1c1a17] text-white rounded-xl text-xs font-medium disabled:opacity-50">
                                    {issuing ? 'Menerbitkan...' : 'Terbitkan Sekarang'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {selectedCert && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full p-10 shadow-2xl text-center border-4 border-[#d4af37]/20 relative">
                        <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 p-1.5 text-[#8c827a] hover:text-[#1c1a17]">
                            <X className="w-5 h-5" />
                        </button>
                        <Award className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
                        <p className="text-xs uppercase tracking-widest text-[#8c827a] mb-2">Siluet Model Tala Academy</p>
                        <h2 className="font-serif text-3xl font-normal text-[#1c1a17] mb-1">Sertifikat Kompetensi</h2>
                        <p className="text-xs text-[#8c827a] mb-6">No: {selectedCert.certNo}</p>
                        <p className="text-sm text-[#68625c] mb-2">Dengan bangga diberikan kepada</p>
                        <h3 className="font-serif text-4xl font-normal text-[#1c1a17] mb-2">{selectedCert.studentName}</h3>
                        <p className="text-sm text-[#68625c] mb-1">yang telah menyelesaikan program</p>
                        <p className="font-semibold text-base text-[#1c1a17] mb-1">{selectedCert.program}</p>
                        <span className="inline-block bg-amber-50 text-amber-900 border border-amber-200 px-4 py-1 rounded-full text-sm font-semibold mb-6">{selectedCert.grade}</span>
                        <p className="text-xs text-[#8c827a]">Diterbitkan: {selectedCert.graduationDate}</p>
                        {selectedCert.notes && <p className="text-xs text-[#8c827a] mt-1 italic">{selectedCert.notes}</p>}
                        <div className="mt-6 pt-4 border-t border-[#ede7dd]">
                            <button onClick={() => window.print()}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1c1a17] text-white rounded-xl text-xs font-medium hover:bg-black transition">
                                <Printer className="w-3.5 h-3.5" />Cetak Sertifikat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
