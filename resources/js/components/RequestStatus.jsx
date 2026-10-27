import React from 'react';

export function RequestStatus({ loading, error, empty, children }) {
    if (loading) return <p role="status" className="py-8 text-center text-sm text-[#78716c]">Memuat data…</p>;
    if (error) return <p role="alert" className="py-4 text-sm text-red-700">{error}</p>;
    if (empty) return <p className="py-8 text-center text-sm text-[#78716c]">Belum ada data.</p>;
    return children || null;
}

export function Notification({ message, type = 'error' }) {
    if (!message) return null;
    return <div role={type === 'error' ? 'alert' : 'status'} className={`rounded-xl px-4 py-3 text-sm ${type === 'error' ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-800'}`}>{message}</div>;
}