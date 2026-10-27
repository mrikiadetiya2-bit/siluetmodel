import React, { useState, useMemo, useEffect } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Download, CheckCircle2, XCircle, ChevronDown, Search, User, X } from 'lucide-react';
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

const enrollStatusLabel = {
    pending: { label: 'Menunggu', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    confirmed: { label: 'Terkonfirmasi', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    cancelled: { label: 'Dibatalkan', cls: 'bg-red-50 text-red-700 border-red-200' },
    completed: { label: 'Selesai', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
};

const payStatusLabel = {
    pending: { label: 'Belum Lunas', cls: 'text-amber-600' },
    paid: { label: 'Lunas', cls: 'text-emerald-600' },
    rejected: { label: 'Ditolak', cls: 'text-red-600' },
};

export default function AdminStudents() {
    const [searchVal, setSearchVal] = useState('');
    const [toast, setToast] = useState(null);
    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [loading, setLoading] = useState(true);
    const [expandedStudent, setExpandedStudent] = useState(null);
    const [updatingEnrollment, setUpdatingEnrollment] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [filterProgram, setFilterProgram] = useState('Semua');

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const load = async () => {
        try {
            const [studentsData, programData] = await Promise.all([
                api('/api/admin/students?per_page=100'),
                api('/api/admin/programs'),
            ]);
            setTotalStudents(studentsData.total);
            setStudents(studentsData.data.map(student => ({
                rawId: student.id,
                id: `SMT-${student.id}`,
                name: student.user?.name || 'Peserta',
                email: student.user?.email || '',
                phone: student.phone || '—',
                enrollments: student.enrollments || [],
                joinDate: student.created_at,
            })));
            setPrograms(programData.data || []);
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const updateEnrollmentStatus = async (enrollmentId, newStatus) => {
        setUpdatingEnrollment(enrollmentId);
        try {
            await api(`/api/admin/enrollments/${enrollmentId}/status`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus }),
            });
            showToast('Status pendaftaran diperbarui!');
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setUpdatingEnrollment(null);
        }
    };

    const filteredStudents = useMemo(() => {
        return students.filter(s => {
            const matchProgram = filterProgram === 'Semua' ||
                s.enrollments.some(e => e.program?.title?.includes(filterProgram));
            const term = searchVal.trim().toLowerCase();
            const matchSearch = !term ||
                s.name.toLowerCase().includes(term) ||
                s.email.toLowerCase().includes(term) ||
                s.id.toLowerCase().includes(term);
            return matchProgram && matchSearch;
        });
    }, [students, filterProgram, searchVal]);

    const paidCount = students.reduce((n, s) => n + s.enrollments.filter(e => e.payment?.status === 'paid').length, 0);
    const confirmedCount = students.reduce((n, s) => n + s.enrollments.filter(e => e.status === 'confirmed').length, 0);

    return (
        <AdminLayout activeNav="Peserta" breadcrumb="Peserta">
            <Toast message={toast?.msg} type={toast?.type} />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">DIREKTORI TALENTA</span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">Data Peserta</h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">Daftar seluruh talenta dan murid aktif Siluet Model Tala.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Total Peserta</span>
                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">{totalStudents}</div>
                    <span className="text-[10px] text-[#78716c]">Terdaftar</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Pembayaran Lunas</span>
                    <div className="text-2xl font-bold text-emerald-600 mt-1">{paidCount}</div>
                    <span className="text-[10px] text-[#78716c]">Transaksi terkonfirmasi</span>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                    <span className="text-xs text-[#78716c]">Pendaftaran Aktif</span>
                    <div className="text-2xl font-bold text-blue-600 mt-1">{confirmedCount}</div>
                    <span className="text-[10px] text-[#78716c]">Status confirmed</span>
                </div>
            </div>

            {/* Filter & Search */}
            <div className="bg-white p-3 rounded-2xl border border-[#ede7dd] flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[180px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8c827a]" />
                    <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
                        placeholder="Cari nama, email, atau ID..."
                        className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#ede7dd] rounded-xl bg-[#faf8f5] focus:outline-none" />
                </div>
                <select value={filterProgram} onChange={e => setFilterProgram(e.target.value)}
                    className="bg-[#f7f5f0] border border-[#ede7dd] rounded-xl px-3 py-1.5 text-xs text-[#1c1a17] focus:outline-none">
                    <option value="Semua">Semua Program</option>
                    {programs.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                </select>
                <span className="text-xs text-[#8c827a] ml-auto">{filteredStudents.length} peserta</span>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs">
                {loading ? (
                    <div className="p-10 text-center text-sm text-[#78716c]">Memuat data peserta...</div>
                ) : !filteredStudents.length ? (
                    <div className="p-10 text-center text-sm text-[#78716c]">Tidak ada peserta yang cocok.</div>
                ) : (
                    <div className="divide-y divide-[#f5f1eb]">
                        {filteredStudents.map((st) => (
                            <div key={st.id}>
                                {/* Row */}
                                <div className="flex flex-wrap items-center gap-3 px-4 py-3.5 hover:bg-[#fbf9f5] transition cursor-pointer"
                                    onClick={() => setExpandedStudent(expandedStudent === st.id ? null : st.id)}>
                                    <div className="w-9 h-9 rounded-full bg-[#f7f5f0] border border-[#ede7dd] flex items-center justify-center font-semibold text-sm text-[#1c1a17] shrink-0">
                                        {st.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="block font-semibold text-xs text-[#1c1a17] truncate">{st.name}</span>
                                        <span className="text-[10px] text-[#8c827a]">{st.id} · {st.email}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 items-center">
                                        {st.enrollments.slice(0, 2).map(e => {
                                            const es = enrollStatusLabel[e.status] || { label: e.status, cls: 'bg-gray-50 text-gray-600 border-gray-200' };
                                            return (
                                                <span key={e.id} className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${es.cls}`}>
                                                    {e.program?.title || 'Program'}
                                                </span>
                                            );
                                        })}
                                        {st.enrollments.length > 2 && (
                                            <span className="text-[10px] text-[#8c827a]">+{st.enrollments.length - 2} lagi</span>
                                        )}
                                        {!st.enrollments.length && (
                                            <span className="text-[10px] text-[#8c827a]">Belum mendaftar</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[#8c827a]">
                                        <span className="text-[10px]">{st.joinDate ? new Date(st.joinDate).toLocaleDateString('id-ID') : '—'}</span>
                                        <ChevronDown className={`w-3.5 h-3.5 transition ${expandedStudent === st.id ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>

                                {/* Expanded enrollments detail */}
                                {expandedStudent === st.id && (
                                    <div className="bg-[#faf8f5] border-t border-[#f3efe8] px-4 py-4">
                                        <h4 className="text-xs font-semibold text-[#1c1a17] mb-3 flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5" />Detail Pendaftaran — {st.name}
                                        </h4>
                                        {!st.enrollments.length ? (
                                            <p className="text-xs text-[#78716c]">Peserta belum pernah mendaftar program.</p>
                                        ) : (
                                            <div className="space-y-2.5">
                                                {st.enrollments.map(enrollment => {
                                                    const es = enrollStatusLabel[enrollment.status] || { label: enrollment.status, cls: 'bg-gray-50 text-gray-600 border-gray-200' };
                                                    const ps = payStatusLabel[enrollment.payment?.status] || { label: enrollment.payment?.status || '—', cls: 'text-gray-500' };
                                                    return (
                                                        <div key={enrollment.id} className="bg-white rounded-xl border border-[#ede7dd] p-3.5 flex flex-wrap items-center justify-between gap-3">
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <span className="font-medium text-xs text-[#1c1a17]">{enrollment.program?.title || 'Program'}</span>
                                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${es.cls}`}>{es.label}</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 mt-1 text-[10px] text-[#8c827a]">
                                                                    <span>Invoice: {enrollment.payment?.invoice || '—'}</span>
                                                                    <span className={`font-medium ${ps.cls}`}>{ps.label}</span>
                                                                    {enrollment.payment?.amount && (
                                                                        <span>Rp {Number(enrollment.payment.amount).toLocaleString('id-ID')}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {/* Status update */}
                                                            <select
                                                                value={enrollment.status}
                                                                onChange={e => updateEnrollmentStatus(enrollment.id, e.target.value)}
                                                                disabled={updatingEnrollment === enrollment.id}
                                                                className="text-[10px] border border-[#ede7dd] bg-white rounded-lg px-2 py-1 focus:outline-none disabled:opacity-50 cursor-pointer"
                                                            >
                                                                <option value="pending">Menunggu</option>
                                                                <option value="confirmed">Terkonfirmasi</option>
                                                                <option value="completed">Selesai</option>
                                                                <option value="cancelled">Dibatalkan</option>
                                                            </select>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        <div className="mt-3 text-[10px] text-[#8c827a] flex items-center gap-2">
                                            <span>📞 {st.phone}</span>
                                            <span>·</span>
                                            <span>✉️ {st.email}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
