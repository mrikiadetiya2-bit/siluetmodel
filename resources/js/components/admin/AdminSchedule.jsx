import React, { useEffect, useMemo, useState } from 'react';
import AdminLayout from './AdminLayout.jsx';
import { Plus, Trash2, Edit3, CheckCircle2, XCircle, Users, Calendar, MapPin, X } from 'lucide-react';
import { api, apiErrorMessage } from '../../services/api.js';

const emptyForm = { program_id: '', mentor_id: '', starts_at: '', ends_at: '', location: '', capacity: 20, status: 'scheduled' };

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
        scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
        completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        cancelled: 'bg-red-50 text-red-700 border-red-200',
    };
    const label = { scheduled: 'Terjadwal', completed: 'Selesai', cancelled: 'Dibatalkan' };
    return (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${map[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
            {label[status] || status}
        </span>
    );
};

export default function AdminSchedule() {
    const [schedules, setSchedules] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [selected, setSelected] = useState(null);
    const [attendances, setAttendances] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [toast, setToast] = useState(null);
    const [busy, setBusy] = useState(false);
    const [loading, setLoading] = useState(true);
    const [programFilter, setProgramFilter] = useState('');
    const [mentorFilter, setMentorFilter] = useState('');

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const load = async () => {
        try {
            const [scheduleData, programData, mentorData] = await Promise.all([
                api('/api/admin/schedules'),
                api('/api/admin/programs'),
                api('/api/admin/mentors'),
            ]);
            setSchedules(scheduleData.data || []);
            setPrograms(programData.data || []);
            setMentors((mentorData.data || []).filter(m => m.active));
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const filteredSchedules = useMemo(() => schedules.filter(schedule =>
        (!programFilter || String(schedule.program_id) === programFilter)
        && (!mentorFilter || String(schedule.mentor_id) === mentorFilter)
    ), [schedules, programFilter, mentorFilter]);

    const openAdd = () => {
        setForm(emptyForm);
        setEditing(null);
        setShowForm(true);
    };

    const openEdit = (schedule) => {
        setEditing(schedule.id);
        setForm({
            program_id: schedule.program_id,
            mentor_id: schedule.mentor_id,
            starts_at: schedule.starts_at?.slice(0, 16).replace(' ', 'T') || '',
            ends_at: schedule.ends_at?.slice(0, 16).replace(' ', 'T') || '',
            location: schedule.location || '',
            capacity: schedule.capacity || 20,
            status: schedule.status || 'scheduled',
        });
        setShowForm(true);
    };

    const save = async (e) => {
        e.preventDefault();
        setBusy(true);
        const payload = {
            ...form,
            capacity: Number(form.capacity),
            starts_at: `${form.starts_at.replace('T', ' ')}:00`,
            ends_at: `${form.ends_at.replace('T', ' ')}:00`,
        };
        try {
            if (editing) {
                await api(`/api/admin/schedules/${editing}`, { method: 'PUT', body: JSON.stringify(payload) });
                showToast('Jadwal berhasil diperbarui!');
            } else {
                await api('/api/admin/schedules', { method: 'POST', body: JSON.stringify(payload) });
                showToast('Jadwal baru berhasil ditambahkan!');
            }
            setShowForm(false);
            setEditing(null);
            setForm(emptyForm);
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        } finally {
            setBusy(false);
        }
    };

    const deleteSchedule = async (schedule) => {
        if (!window.confirm(`Hapus jadwal ${schedule.program?.title || ''} pada ${schedule.starts_at}?`)) return;
        try {
            const res = await api(`/api/admin/schedules/${schedule.id}`, { method: 'DELETE' });
            showToast(res.message || 'Jadwal dihapus.');
            await load();
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
        }
    };

    const openAttendance = async (schedule) => {
        setSelected(selected === schedule.id ? null : schedule.id);
        if (selected === schedule.id) return;
        try {
            const result = await api(`/api/schedules/${schedule.id}/attendance`);
            setAttendances(result.data || []);
        } catch (e) {
            showToast(apiErrorMessage(e), 'error');
            setAttendances([]);
        }
    };

    const fmt = (dt) => dt ? new Date(dt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '—';

    return (
        <AdminLayout activeNav="Jadwal Kelas" breadcrumb="Jadwal Kelas">
            <Toast message={toast?.msg} type={toast?.type} />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">MANAJEMEN KELAS</span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">Jadwal Kelas & Kehadiran</h1>
                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">Atur jadwal kelas, mentor, dan pantau kehadiran peserta.</p>
                </div>
                <button onClick={openAdd}
                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition self-start sm:self-auto">
                    <Plus className="w-4 h-4" />Tambah Jadwal
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd]">
                    <span className="text-xs text-[#78716c]">Total Jadwal</span>
                    <div className="text-2xl font-bold mt-1">{schedules.length}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd]">
                    <span className="text-xs text-[#78716c]">Terjadwal</span>
                    <div className="text-2xl font-bold text-blue-600 mt-1">{schedules.filter(s => s.status === 'scheduled').length}</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd]">
                    <span className="text-xs text-[#78716c]">Selesai</span>
                    <div className="text-2xl font-bold text-emerald-600 mt-1">{schedules.filter(s => s.status === 'completed').length}</div>
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#ede7dd] max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[#ede7dd]">
                            <h3 className="font-serif text-xl font-normal text-[#1c1a17]">{editing ? 'Edit Jadwal' : 'Tambah Jadwal Baru'}</h3>
                            <button onClick={() => { setShowForm(false); setEditing(null); }} className="p-1.5 text-[#8c827a] hover:text-[#1c1a17]">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={save} className="mt-5 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Program *</label>
                                    <select required value={form.program_id} onChange={e => setForm({ ...form, program_id: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none">
                                        <option value="">Pilih program</option>
                                        {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Mentor Aktif *</label>
                                    <select required value={form.mentor_id} onChange={e => setForm({ ...form, mentor_id: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none">
                                        <option value="">Pilih mentor</option>
                                        {mentors.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Mulai *</label>
                                    <input required type="datetime-local" value={form.starts_at} onChange={e => setForm({ ...form, starts_at: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Selesai *</label>
                                    <input required type="datetime-local" value={form.ends_at} onChange={e => setForm({ ...form, ends_at: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Lokasi *</label>
                                <input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none"
                                    placeholder="Studio A, Gedung X Lt.2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Kapasitas *</label>
                                    <input required type="number" min="1" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none" />
                                </div>
                                {editing && (
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Status</label>
                                        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                                            className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none">
                                            <option value="scheduled">Terjadwal</option>
                                            <option value="completed">Selesai</option>
                                            <option value="cancelled">Dibatalkan</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                            <div className="pt-3 flex items-center justify-end gap-3">
                                <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="px-4 py-2 text-xs font-medium text-[#78716c]">Batal</button>
                                <button type="submit" disabled={busy}
                                    className="px-5 py-2 bg-[#1c1a17] text-white rounded-xl text-xs font-medium disabled:opacity-50">
                                    {busy ? 'Menyimpan...' : (editing ? 'Simpan Perubahan' : 'Tambah Jadwal')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Schedule List */}
            <div className="bg-white rounded-2xl border border-[#ede7dd] p-4 flex flex-col sm:flex-row gap-3">
                <label className="flex-1">
                    <span className="block text-xs font-semibold text-[#68625c] mb-1.5">Filter program</span>
                    <select value={programFilter} onChange={e => setProgramFilter(e.target.value)}
                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none">
                        <option value="">Semua program</option>
                        {programs.map(program => <option key={program.id} value={program.id}>{program.title}</option>)}
                    </select>
                </label>
                <label className="flex-1">
                    <span className="block text-xs font-semibold text-[#68625c] mb-1.5">Filter mentor</span>
                    <select value={mentorFilter} onChange={e => setMentorFilter(e.target.value)}
                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none">
                        <option value="">Semua mentor</option>
                        {mentors.map(mentor => <option key={mentor.id} value={mentor.id}>{mentor.name}</option>)}
                    </select>
                </label>
                {(programFilter || mentorFilter) && (
                    <button type="button" onClick={() => { setProgramFilter(''); setMentorFilter(''); }}
                        className="self-end px-3 py-2.5 text-xs font-medium text-[#78716c] hover:text-[#1c1a17]">
                        Hapus filter
                    </button>
                )}
            </div>
            {loading ? (
                <div className="p-10 text-center text-sm text-[#78716c]">Memuat data jadwal...</div>
            ) : schedules.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#ede7dd] p-10 text-center text-sm text-[#78716c]">Belum ada jadwal tersimpan.</div>
            ) : filteredSchedules.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#ede7dd] p-10 text-center text-sm text-[#78716c]">Tidak ada jadwal yang cocok dengan filter.</div>
            ) : (
                <div className="space-y-4">
                    {filteredSchedules.map(schedule => (
                        <div key={schedule.id} className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs">
                            <div className="p-5 flex flex-wrap items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        {statusBadge(schedule.status)}
                                        <h3 className="font-semibold text-[#1c1a17] text-sm">{schedule.program?.title || 'Program'}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-xs text-[#68625c] mt-2">
                                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{fmt(schedule.starts_at)} – {fmt(schedule.ends_at)}</span>
                                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{schedule.location}</span>
                                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{schedule.attendances_count || 0}/{schedule.capacity} hadir</span>
                                        <span className="font-medium text-[#1c1a17]">{schedule.mentor?.name || 'Mentor'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => openAttendance(schedule)}
                                        className="px-3 py-1.5 bg-[#f7f5f0] hover:bg-[#ede7dd] text-[#1c1a17] rounded-xl text-xs font-medium transition">
                                        Kehadiran
                                    </button>
                                    <button onClick={() => openEdit(schedule)}
                                        className="p-1.5 text-[#78716c] hover:text-[#1c1a17] hover:bg-[#f7f5f0] rounded-lg transition">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => deleteSchedule(schedule)}
                                        className="p-1.5 text-[#78716c] hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {selected === schedule.id && (
                                <div className="border-t border-[#f3efe8] p-5 bg-[#faf8f5]">
                                    <h4 className="text-xs font-semibold text-[#1c1a17] mb-3">Riwayat Kehadiran</h4>
                                    {attendances.length === 0 ? (
                                        <p className="text-xs text-[#78716c]">Belum ada catatan kehadiran untuk jadwal ini.</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {attendances.map(record => (
                                                <div key={record.id} className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-[#ede7dd]">
                                                    <span className="font-medium text-[#1c1a17]">{record.participant?.user?.name || `Peserta #${record.participant_id}`}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${record.status === 'hadir' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                                            {record.status}
                                                        </span>
                                                        <span className="text-[#8c827a]">{record.marked_at}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}