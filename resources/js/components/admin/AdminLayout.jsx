import React, { useState } from 'react';
import {
    Home,
    Briefcase,
    Users,
    UserCheck,
    Calendar,
    CreditCard,
    Award,
    MessageSquare,
    Image as ImageIcon,
    FileText,
    Settings,
    LogOut,
    Search,
    Bell,
    ChevronDown,
    X,
    Menu,
    ExternalLink,
    CheckCircle2
} from 'lucide-react';

export default function AdminLayout({ activeNav = 'Dashboard', breadcrumb = 'Overview', children, onSearch }) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const [toastMessage, setToastMessage] = useState(null);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const navItems = [
        { id: 'Dashboard', label: 'Dashboard', href: '/admin', icon: Home },
        { id: 'Program Pelatihan', label: 'Program Pelatihan', href: '/admin/program', icon: Briefcase },
        { id: 'Peserta', label: 'Peserta', href: '/admin/peserta', icon: Users },
        { id: 'Mentor', label: 'Mentor', href: '/admin/mentor', icon: UserCheck },
        { id: 'Jadwal Kelas', label: 'Jadwal Kelas', href: '/admin/jadwal', icon: Calendar },
        { id: 'Pembayaran', label: 'Pembayaran', href: '/admin/pembayaran', icon: CreditCard },
        { id: 'Sertifikat', label: 'Sertifikat', href: '/admin/sertifikat', icon: Award },
        { id: 'Testimoni', label: 'Testimoni', href: '/admin/testimoni', icon: MessageSquare },
        { id: 'Galeri', label: 'Galeri', href: '/admin/galeri', icon: ImageIcon },
        { id: 'Laporan', label: 'Laporan', href: '/admin/laporan', icon: FileText },
        { id: 'Pengaturan', label: 'Pengaturan', href: '/admin/pengaturan', icon: Settings },
    ];

    const handleSearchChange = (e) => {
        setSearchVal(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    return (
        <div className="min-h-screen bg-[#f7f5f0] text-[#1c1a17] flex font-sans antialiased selection:bg-[#ded7cb] selection:text-[#171513]">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 bg-[#1c1a17] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-sm animate-bounce">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* ========================================================
                SIDEBAR NAVIGATION (Exact match to reference image)
               ======================================================== */}
            <aside
                className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#f6f4ee] border-r border-[#ede7dd] z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 ${
                    mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                {/* Brand Header */}
                <div>
                    <div className="px-6 pt-7 pb-6 flex items-center justify-between">
                        <a href="/" className="block group">
                            <span className="font-serif text-[22px] tracking-[0.38em] font-medium text-[#1c1a17] block leading-none transition group-hover:opacity-80">
                                S I L U E T
                            </span>
                            <span className="text-[9.5px] tracking-[0.32em] text-[#8c827a] font-semibold block mt-2 uppercase">
                                MODEL TALA
                            </span>
                        </a>
                        <button
                            className="lg:hidden p-1 text-[#8c827a] hover:text-[#1c1a17]"
                            onClick={() => setMobileSidebarOpen(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Menu List */}
                    <nav className="px-3 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)] scrollbar-none">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = activeNav === item.id;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                                        isActive
                                            ? 'bg-[#1c1a17] text-white shadow-xs'
                                            : 'text-[#635c55] hover:text-[#1c1a17] hover:bg-[#ede6dc]/60'
                                    }`}
                                >
                                    <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#7d756d]'}`} />
                                    <span className="truncate">{item.label}</span>
                                </a>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Admin Profile Card */}
                <div className="p-4 border-t border-[#ede7dd]/60">
                    <div className="bg-white rounded-2xl p-3 border border-[#ede7dd] shadow-xs flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                            <img
                                src="/images/testimonial-nadia.jpg"
                                alt="Admin Siluet"
                                className="w-10 h-10 rounded-full object-cover border border-[#ede7dd] shrink-0"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                                }}
                            />
                            <div className="truncate">
                                <h4 className="text-xs font-bold text-[#1c1a17] leading-tight truncate">
                                    Admin Siluet
                                </h4>
                                <span className="text-[11px] text-[#8c827a] block truncate">
                                    Administrator
                                </span>
                            </div>
                        </div>
                        <a
                            href="/"
                            title="Ke Website Publik"
                            className="text-[#8c827a] hover:text-[#1c1a17] p-2 rounded-xl hover:bg-[#f7f5f0] transition shrink-0"
                        >
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </aside>

            {/* ========================================================
                MAIN CONTENT CONTAINER
               ======================================================== */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header Bar */}
                <header className="h-18 px-6 lg:px-10 bg-[#f7f5f0]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between border-b border-[#ede7dd]/80">
                    {/* Left: Mobile hamburger & Breadcrumbs */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileSidebarOpen(true)}
                            className="lg:hidden p-2 text-[#1c1a17] hover:bg-[#ede6dc]/60 rounded-xl"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2 text-xs">
                            <a href="/admin" className="text-[#8c827a] hover:text-[#1c1a17] transition">
                                Dashboard
                            </a>
                            <span className="text-[#bbaea1]">/</span>
                            <span className="text-[#1c1a17] font-medium">
                                {breadcrumb}
                            </span>
                        </div>
                    </div>

                    {/* Right: Search, Notification Bell, User Avatar */}
                    <div className="flex items-center gap-4">
                        {/* Search Input Box */}
                        <div className="relative hidden md:flex items-center">
                            <Search className="w-4 h-4 text-[#8c827a] absolute left-3.5 pointer-events-none" />
                            <input
                                type="text"
                                value={searchVal}
                                onChange={handleSearchChange}
                                placeholder="Cari peserta, program, atau data lainnya..."
                                className="w-72 lg:w-96 pl-10 pr-16 py-2 bg-white border border-[#ede7dd] rounded-xl text-xs text-[#1c1a17] placeholder:text-[#9e968f] focus:outline-none focus:border-[#1c1a17] transition shadow-xs"
                            />
                            <span className="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono text-[#8c827a] bg-[#f7f5f0] border border-[#e5ded4] rounded-md pointer-events-none">
                                Ctrl K
                            </span>
                        </div>

                        {/* Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={() => showToast('Tidak ada notifikasi sistem baru yang belum dibaca.')}
                                className="relative p-2 text-[#635c55] hover:text-[#1c1a17] rounded-xl hover:bg-[#ede6dc]/50 transition"
                                title="Notifikasi"
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-[#d97706] rounded-full ring-2 ring-[#f7f5f0]"></span>
                            </button>
                        </div>

                        {/* User Profile Avatar with dropdown arrow */}
                        <a href="/admin/pengaturan" className="flex items-center gap-2 pl-2 border-l border-[#ede7dd] cursor-pointer group">
                            <img
                                src="/images/testimonial-nadia.jpg"
                                alt="Admin"
                                className="w-9 h-9 rounded-full object-cover border border-[#ede7dd]"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                                }}
                            />
                            <ChevronDown className="w-3.5 h-3.5 text-[#8c827a] group-hover:text-[#1c1a17] transition" />
                        </a>
                    </div>
                </header>

                {/* Page Specific Body Content */}
                <main className="p-6 lg:p-10 space-y-7 max-w-[1440px]">
                    {children}
                </main>
            </div>
        </div>
    );
}
