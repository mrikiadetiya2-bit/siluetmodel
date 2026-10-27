import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Download } from 'lucide-react';
import { api } from '../../services/api.js';
import { RequestStatus } from '../RequestStatus.jsx';

export default function AdminReports() {
    const [report, setReport] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => { api('/api/admin/reports?per_page=100').then(setReport).catch(reason => setError(reason.message)); }, []);

    return <AdminLayout activeNav="Laporan" breadcrumb="Laporan">
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div><span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a]">ANALITIK & REKAP</span><h1 className="mt-1 font-serif text-3xl">Laporan Pendaftaran & Pembayaran</h1><p className="mt-1 text-sm text-[#78716c]">Ringkasan dihitung dari data relasional.</p></div>
            <a href="/api/admin/reports?per_page=100" className="inline-flex items-center gap-2 rounded-xl bg-[#1c1a17] px-4 py-2.5 text-sm text-white"><Download className="h-4 w-4" />Unduh JSON</a>
        </div>
        <RequestStatus error={error} loading={!report && !error} empty={!error && report?.enrollments?.total === 0}>
            {report && <>
                <div className="grid gap-4 sm:grid-cols-3">
                    <Stat label="Total peserta" value={report.statistics.participants} />
                    <Stat label="Total pendaftaran" value={report.enrollments.total} />
                    <Stat label="Pembayaran pending" value={report.payments.pending} />
                    <Stat label="Pendapatan terverifikasi" value={`Rp ${Number(report.payments.verified_revenue).toLocaleString('id-ID')}`} />
                </div>
                <section className="rounded-2xl border border-[#ede7dd] bg-white p-5"><h2 className="mb-4 text-lg font-semibold">Pendaftaran terbaru</h2><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b text-[#78716c]"><th className="p-3">Peserta</th><th className="p-3">Program</th><th className="p-3">Status</th><th className="p-3">Tagihan</th></tr></thead><tbody>{report.enrollments.data.map(item => <tr className="border-b last:border-0" key={item.id}><td className="p-3">{item.participant?.user?.name || '—'}</td><td className="p-3">{item.program?.title || '—'}</td><td className="p-3">{item.status}</td><td className="p-3">{item.payment?.status || '—'}</td></tr>)}</tbody></table></div></section>
                <section className="rounded-2xl border border-[#ede7dd] bg-white p-5"><h2 className="mb-4 text-lg font-semibold">Pendaftaran per program</h2>{report.by_program.map(item => <p className="border-b py-2 text-sm last:border-0" key={item.program_id}>{item.program?.title || 'Program'} <span className="float-right font-semibold">{item.enrollment_count}</span></p>)}</section>
            </>}
        </RequestStatus>
    </AdminLayout>;
}

function Stat({ label, value }) { return <div className="rounded-2xl border border-[#ede7dd] bg-white p-5"><span className="text-sm text-[#78716c]">{label}</span><p className="mt-2 text-2xl font-semibold">{value}</p></div>; }