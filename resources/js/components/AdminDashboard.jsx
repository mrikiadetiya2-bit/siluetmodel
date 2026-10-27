import React, { useState, useMemo, useEffect } from 'react';
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
    Plus,
    MoreVertical,
    ArrowUpRight,
    ArrowRight,
    BookOpen,
    User,
    Wallet,
    BarChart3,
    CheckCircle2,
    Clock,
    X,
    Filter,
    Menu,
    ChevronRight,
    ExternalLink,
    Download,
    Eye,
    Star,
    Trash2,
    Edit3,
    Printer,
    Check,
    Lock,
    ShieldCheck,
    UploadCloud,
    AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
    // Navigation routing map
    const routeToNav = useMemo(() => ({
        '/admin': 'Dashboard',
        '/admin/dashboard': 'Dashboard',
        '/admin/program': 'Program Pelatihan',
        '/admin/peserta': 'Peserta',
        '/admin/mentor': 'Mentor',
        '/admin/jadwal': 'Jadwal Kelas',
        '/admin/pembayaran': 'Pembayaran',
        '/admin/sertifikat': 'Sertifikat',
        '/admin/testimoni': 'Testimoni',
        '/admin/galeri': 'Galeri',
        '/admin/laporan': 'Laporan',
        '/admin/pengaturan': 'Pengaturan',
    }), []);

    const navToRoute = useMemo(() => ({
        'Dashboard': '/admin',
        'Program Pelatihan': '/admin/program',
        'Peserta': '/admin/peserta',
        'Mentor': '/admin/mentor',
        'Jadwal Kelas': '/admin/jadwal',
        'Pembayaran': '/admin/pembayaran',
        'Sertifikat': '/admin/sertifikat',
        'Testimoni': '/admin/testimoni',
        'Galeri': '/admin/galeri',
        'Laporan': '/admin/laporan',
        'Pengaturan': '/admin/pengaturan',
    }), []);

    // Navigation active state
    const [activeNav, setActiveNav] = useState('Dashboard');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    // Sync with browser URL on load & popstate
    useEffect(() => {
        const path = window.location.pathname.replace(/\/$/, '');
        if (routeToNav[path]) {
            setActiveNav(routeToNav[path]);
        }

        const handlePopState = () => {
            const p = window.location.pathname.replace(/\/$/, '');
            if (routeToNav[p]) {
                setActiveNav(routeToNav[p]);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [routeToNav]);

    // Handle sidebar navigation clicks
    const handleNavChange = (id) => {
        setActiveNav(id);
        setMobileSidebarOpen(false);
        const targetRoute = navToRoute[id] || '/admin';
        if (window.location.pathname !== targetRoute) {
            window.history.pushState({}, '', targetRoute);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Global Search query
    const [searchQuery, setSearchQuery] = useState('');

    // Notification toast state
    const [toastMessage, setToastMessage] = useState(null);
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    // Timeframe selector for Dashboard
    const [selectedTimeframe, setSelectedTimeframe] = useState('6 bulan terakhir');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hoveredDataIndex, setHoveredDataIndex] = useState(null);

    // Modal state for "Tambah Program"
    const [isAddProgramOpen, setIsAddProgramOpen] = useState(false);
    const [newProgram, setNewProgram] = useState({
        title: '',
        category: 'Basic Modeling',
        duration: '3 Bulan',
        price: 'Rp 4.500.000',
        quota: '25'
    });

    // Modal for Certificate Preview
    const [selectedCert, setSelectedCert] = useState(null);

    // Modal for Payment Proof Preview
    const [selectedPaymentProof, setSelectedPaymentProof] = useState(null);

    // Sidebar navigation items
    const navItems = [
        { id: 'Dashboard', label: 'Dashboard', icon: Home },
        { id: 'Program Pelatihan', label: 'Program Pelatihan', icon: Briefcase },
        { id: 'Peserta', label: 'Peserta', icon: Users },
        { id: 'Mentor', label: 'Mentor', icon: UserCheck },
        { id: 'Jadwal Kelas', label: 'Jadwal Kelas', icon: Calendar },
        { id: 'Pembayaran', label: 'Pembayaran', icon: CreditCard },
        { id: 'Sertifikat', label: 'Sertifikat', icon: Award },
        { id: 'Testimoni', label: 'Testimoni', icon: MessageSquare },
        { id: 'Galeri', label: 'Galeri', icon: ImageIcon },
        { id: 'Laporan', label: 'Laporan', icon: FileText },
        { id: 'Pengaturan', label: 'Pengaturan', icon: Settings },
    ];

    // ==========================================
    // DATA: PROGRAM PELATIHAN
    // ==========================================
    const [programCategoryFilter, setProgramCategoryFilter] = useState('Semua');
    const [programs, setPrograms] = useState([
        {
            id: 'prog-1',
            title: 'Basic Modeling Intensive',
            category: 'Basic Modeling',
            duration: '12 Sesi (3 Bulan)',
            price: 'Rp 4.500.000',
            enrolled: 24,
            quota: 25,
            mentor: 'Nadia Putri & Valerie L.',
            status: 'Aktif',
            image: '/images/card_basic.jpg',
            description: 'Pelatihan dasar postur tubuh, ekspresi wajah, camera awareness, dan dasar-dasar catwalk untuk pemula.'
        },
        {
            id: 'prog-2',
            title: 'Advanced Editorial & Posing',
            category: 'Advanced Modeling',
            duration: '16 Sesi (4 Bulan)',
            price: 'Rp 6.800.000',
            enrolled: 18,
            quota: 20,
            mentor: 'Aura Clarissa',
            status: 'Aktif',
            image: '/images/card_advanced.jpg',
            description: 'Penguasaan pose editorial majalah mode kelas atas, ekspresi emosional, dan portfolio photoshoot tematik.'
        },
        {
            id: 'prog-3',
            title: 'Professional Runway & Catwalk',
            category: 'Runway & Catwalk',
            duration: '14 Sesi (3.5 Bulan)',
            price: 'Rp 7.500.000',
            enrolled: 15,
            quota: 15,
            mentor: 'Jessica Tania',
            status: 'Penuh',
            image: '/images/card_runway.jpg',
            description: 'Teknik berjalan haute couture, tempo musik panggung, garment handling, dan persiapan audisi fashion week.'
        },
        {
            id: 'prog-4',
            title: 'Commercial TVC & Audition Mastery',
            category: 'Commercial Modeling',
            duration: '10 Sesi (2.5 Bulan)',
            price: 'Rp 5.200.000',
            enrolled: 19,
            quota: 20,
            mentor: 'Citra Anindya',
            status: 'Aktif',
            image: '/images/card_commercial.jpg',
            description: 'Simulasi casting iklan komersial, akting produk, video reel profesional, dan personal branding agensi.'
        },
        {
            id: 'prog-5',
            title: 'Male Posture & Fashion Week Runway',
            category: 'Runway & Catwalk',
            duration: '12 Sesi (3 Bulan)',
            price: 'Rp 4.900.000',
            enrolled: 14,
            quota: 15,
            mentor: 'Dimas Wicaksono',
            status: 'Aktif',
            image: '/images/beige_suit.jpg',
            description: 'Kurikulum postur tegap pria, stride runway maskulin, tailoring presentation, dan streetwear modeling.'
        },
        {
            id: 'prog-6',
            title: 'Kids & Teens Confidence Star',
            category: 'Basic Modeling',
            duration: '8 Sesi (2 Bulan)',
            price: 'Rp 3.800.000',
            enrolled: 12,
            quota: 15,
            mentor: 'Elena Siluet',
            status: 'Aktif',
            image: '/images/hero-model.jpg',
            description: 'Pembentukan rasa percaya diri, etiket anak, senyum natural di depan kamera, dan panggung peragaan busana anak.'
        },
        {
            id: 'prog-7',
            title: 'International Fashion Week Masterclass',
            category: 'Advanced Modeling',
            duration: '8 Sesi Intensif',
            price: 'Rp 9.000.000',
            enrolled: 10,
            quota: 10,
            mentor: 'Aura Clarissa',
            status: 'Penuh',
            image: '/images/blazer_suit.jpg',
            description: 'Pelatihan eksklusif untuk persiapan audisi peragaan busana di Milan, Paris, dan Jakarta Fashion Week.'
        },
        {
            id: 'prog-8',
            title: 'Beauty Pageant & Public Speaking',
            category: 'Commercial Modeling',
            duration: '16 Sesi (4 Bulan)',
            price: 'Rp 8.200.000',
            enrolled: 8,
            quota: 12,
            mentor: 'Nadia Putri',
            status: 'Draft',
            image: '/images/about-portrait.jpg',
            description: 'Kombinasi catwalk gaun malam, teknik menjawab Q&A di panggung, advokasi sosial, dan personal styling.'
        }
    ]);

    // ==========================================
    // DATA: PESERTA
    // ==========================================
    const [pesertaFilterProgram, setPesertaFilterProgram] = useState('Semua');
    const [students, setStudents] = useState([
        {
            id: 'SMT-2026-081',
            name: 'Nadia Putri',
            avatar: '/images/avatar_nadia.jpg',
            program: 'Basic Modeling Intensive',
            email: 'nadiaputri@gmail.com',
            phone: '+62 812-4455-8890',
            attendance: '96%',
            statusPay: 'Lunas',
            statusClass: 'Aktif',
            joinDate: '12 Jan 2026'
        },
        {
            id: 'SMT-2026-082',
            name: 'Alya Maharani',
            avatar: '/images/card_advanced.jpg',
            program: 'Advanced Editorial & Posing',
            email: 'alya.maharani@yahoo.com',
            phone: '+62 813-2211-9004',
            attendance: '92%',
            statusPay: 'Menunggu',
            statusClass: 'Aktif',
            joinDate: '18 Jan 2026'
        },
        {
            id: 'SMT-2026-083',
            name: 'Citra Anindya',
            avatar: '/images/card_runway.jpg',
            program: 'Professional Runway & Catwalk',
            email: 'citra.anindya@gmail.com',
            phone: '+62 857-9900-3344',
            attendance: '100%',
            statusPay: 'Lunas',
            statusClass: 'Aktif',
            joinDate: '02 Feb 2026'
        },
        {
            id: 'SMT-2026-084',
            name: 'Salsabila Rahma',
            avatar: '/images/card_commercial.jpg',
            program: 'Commercial TVC & Audition Mastery',
            email: 'salsabila.r@gmail.com',
            phone: '+62 811-7788-2233',
            attendance: '88%',
            statusPay: 'Diproses',
            statusClass: 'Aktif',
            joinDate: '14 Feb 2026'
        },
        {
            id: 'SMT-2026-085',
            name: 'Kevin Jonathan',
            avatar: '/images/beige_suit.jpg',
            program: 'Male Posture & Fashion Week Runway',
            email: 'kevin.jonathan@outlook.com',
            phone: '+62 819-3322-1100',
            attendance: '95%',
            statusPay: 'Lunas',
            statusClass: 'Aktif',
            joinDate: '20 Feb 2026'
        },
        {
            id: 'SMT-2026-086',
            name: 'Kezia Michelle',
            avatar: '/images/bare_shoulders.jpg',
            program: 'Kids & Teens Confidence Star',
            email: 'kezia.michelle@gmail.com',
            phone: '+62 812-9988-7711',
            attendance: '90%',
            statusPay: 'Lunas',
            statusClass: 'Aktif',
            joinDate: '01 Mar 2026'
        },
        {
            id: 'SMT-2026-087',
            name: 'Amanda Natasha',
            avatar: '/images/testimonial-nadia.jpg',
            program: 'International Fashion Week Masterclass',
            email: 'amanda.natasha@gmail.com',
            phone: '+62 856-1122-3344',
            attendance: '100%',
            statusPay: 'Lunas',
            statusClass: 'Lulus',
            joinDate: '15 Nov 2025'
        },
        {
            id: 'SMT-2026-088',
            name: 'Jessica Tania',
            avatar: '/images/hero-model.jpg',
            program: 'Professional Runway & Catwalk',
            email: 'jessica.tania@gmail.com',
            phone: '+62 878-5544-3322',
            attendance: '98%',
            statusPay: 'Lunas',
            statusClass: 'Lulus',
            joinDate: '10 Okt 2025'
        }
    ]);

    // ==========================================
    // DATA: MENTOR
    // ==========================================
    const mentors = [
        {
            id: 'men-1',
            name: 'Aura Clarissa',
            role: 'Head Fashion Coach & Editorial Director',
            avatar: '/images/hero-model.jpg',
            experience: '7 Tahun di Milan & Paris Fashion Week',
            studentsCount: 88,
            classesCount: 4,
            rating: 5.0,
            specialty: ['Editorial Posing', 'High Fashion', 'Audisi Internasional']
        },
        {
            id: 'men-2',
            name: 'Jessica Tania',
            role: 'Principal Runway & Catwalk Coach',
            avatar: '/images/about_profile.jpg',
            experience: 'Senior Catwalk Trainer Jakarta Fashion Week',
            studentsCount: 76,
            classesCount: 3,
            rating: 4.9,
            specialty: ['Runway Strides', 'Garment Handling', 'Tempo Catwalk']
        },
        {
            id: 'men-3',
            name: 'Valerie Laurent',
            role: 'Commercial Acting & Casting Coach',
            avatar: '/images/card_advanced.jpg',
            experience: 'Brand Ambassador & TVC Model Internasional',
            studentsCount: 65,
            classesCount: 3,
            rating: 4.9,
            specialty: ['Camera Awareness', 'Ekspresi TVC', 'Audisi Casting']
        },
        {
            id: 'men-4',
            name: 'Dimas Wicaksono',
            role: 'Male Division & Posture Instructor',
            avatar: '/images/beige_suit.jpg',
            experience: 'Top Male Model Indonesia Fashion Week',
            studentsCount: 52,
            classesCount: 2,
            rating: 4.8,
            specialty: ['Male Runway', 'Tailored Suit Pose', 'Fitness Modeling']
        },
        {
            id: 'men-5',
            name: 'Nadia Putri',
            role: 'Basic Posture & Pageant Trainer',
            avatar: '/images/avatar_nadia.jpg',
            experience: 'Runner-up Putri Pariwisata & Model Profesional',
            studentsCount: 94,
            classesCount: 4,
            rating: 5.0,
            specialty: ['Basic Walking', 'Public Speaking', 'Pageant Stage']
        },
        {
            id: 'men-6',
            name: 'Elena Siluet',
            role: 'Kids & Teens Development Specialist',
            avatar: '/images/testimonial-nadia.jpg',
            experience: 'Praktisi Psikologi Tumbuh Kembang & Modeling Remaja',
            studentsCount: 48,
            classesCount: 2,
            rating: 4.9,
            specialty: ['Confidence Building', 'Etiket Panggung', 'Kids Fashion']
        }
    ];

    // ==========================================
    // DATA: JADWAL KELAS
    // ==========================================
    const [selectedDay, setSelectedDay] = useState('Sabtu');
    const scheduleByDay = {
        'Senin': [
            { time: '13:00 - 15:30', title: 'Basic Posture & Stride Batch A', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Nadia Putri', enrolled: '22 Siswa', status: 'Selesai' },
            { time: '16:00 - 18:30', title: 'Commercial Facial Expression', studio: 'Studio 2 (Photo & Video Studio)', mentor: 'Valerie Laurent', enrolled: '18 Siswa', status: 'Selesai' },
        ],
        'Rabu': [
            { time: '14:00 - 16:30', title: 'Editorial Posing & Light Angle', studio: 'Studio 2 (Photo & Video Studio)', mentor: 'Aura Clarissa', enrolled: '16 Siswa', status: 'Terjadwal' },
            { time: '17:00 - 19:30', title: 'Male Division Runway Stride', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Dimas Wicaksono', enrolled: '14 Siswa', status: 'Terjadwal' },
        ],
        'Jumat': [
            { time: '13:30 - 16:00', title: 'Kids & Teens Confidence Training', studio: 'Studio 3 (Kids Arena)', mentor: 'Elena Siluet', enrolled: '12 Siswa', status: 'Terjadwal' },
            { time: '16:30 - 19:00', title: 'Casting & Brand Commercial Simulation', studio: 'Studio 2 (Photo & Video Studio)', mentor: 'Citra Anindya', enrolled: '19 Siswa', status: 'Terjadwal' },
        ],
        'Sabtu': [
            { time: '09:00 - 11:30', title: 'Haute Couture Catwalk Masterclass', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Jessica Tania', enrolled: '15 Siswa', status: 'Berlangsung' },
            { time: '12:30 - 15:00', title: 'Basic Modeling Intensive Batch VII', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Nadia Putri', enrolled: '24 Siswa', status: 'Akan Datang' },
            { time: '15:30 - 18:00', title: 'High Fashion Editorial Posing', studio: 'Studio 2 (Photo & Video Studio)', mentor: 'Aura Clarissa', enrolled: '18 Siswa', status: 'Akan Datang' },
            { time: '18:30 - 20:30', title: 'Audisi Persiapan Jakarta Fashion Week', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Jessica & Aura', enrolled: '10 Siswa', status: 'Akan Datang' },
        ],
        'Minggu': [
            { time: '10:00 - 12:30', title: 'Beauty Pageant Stage Presence & Q&A', studio: 'Studio 1 (Catwalk Mirror Hall)', mentor: 'Nadia Putri', enrolled: '12 Siswa', status: 'Terjadwal' },
            { time: '13:30 - 16:00', title: 'TVC Live Audition & Video Portfolio', studio: 'Studio 2 (Photo & Video Studio)', mentor: 'Citra Anindya', enrolled: '16 Siswa', status: 'Terjadwal' },
        ]
    };

    // ==========================================
    // DATA: PEMBAYARAN
    // ==========================================
    const [payments, setPayments] = useState([
        {
            id: 'INV-2026-104',
            name: 'Nadia Putri',
            program: 'Basic Modeling Intensive',
            amount: 'Rp 4.500.000',
            method: 'BCA Transfer',
            date: '22 Okt 2026, 09:42',
            status: 'Lunas',
            proof: '/images/card_basic.jpg',
            account: '8820491029 a/n Nadia Putri'
        },
        {
            id: 'INV-2026-105',
            name: 'Alya Maharani',
            program: 'Advanced Editorial & Posing',
            amount: 'Rp 6.800.000',
            method: 'Mandiri Livin',
            date: '22 Okt 2026, 08:15',
            status: 'Menunggu',
            proof: '/images/card_advanced.jpg',
            account: '1370018892019 a/n Alya Maharani'
        },
        {
            id: 'INV-2026-106',
            name: 'Citra Anindya',
            program: 'Professional Runway & Catwalk',
            amount: 'Rp 7.500.000',
            method: 'QRIS BCA',
            date: '21 Okt 2026, 17:30',
            status: 'Lunas',
            proof: '/images/card_runway.jpg',
            account: 'QRIS Settlement'
        },
        {
            id: 'INV-2026-107',
            name: 'Salsabila Rahma',
            program: 'Commercial TVC & Audition',
            amount: 'Rp 5.200.000',
            method: 'BCA Transfer',
            date: '20 Okt 2026, 14:10',
            status: 'Diproses',
            proof: '/images/card_commercial.jpg',
            account: '882041289901 a/n Salsabila Rahma'
        },
        {
            id: 'INV-2026-108',
            name: 'Kevin Jonathan',
            program: 'Male Posture & Fashion Week Runway',
            amount: 'Rp 4.900.000',
            method: 'BNI Mobile',
            date: '19 Okt 2026, 11:20',
            status: 'Lunas',
            proof: '/images/beige_suit.jpg',
            account: '0981277361 a/n Kevin J.'
        }
    ]);

    // ==========================================
    // DATA: SERTIFIKAT
    // ==========================================
    const [certificates, setCertificates] = useState([
        {
            certNo: 'SMT-CERT-8841',
            studentName: 'Amanda Natasha',
            program: 'International Fashion Week Masterclass',
            graduationDate: '15 Oktober 2026',
            grade: 'Distinction (A+)',
            verified: true,
            director: 'Elena Siluet',
            headCoach: 'Aura Clarissa'
        },
        {
            certNo: 'SMT-CERT-8842',
            studentName: 'Jessica Tania',
            program: 'Professional Runway & Catwalk',
            graduationDate: '10 Oktober 2026',
            grade: 'High Merit (A)',
            verified: true,
            director: 'Elena Siluet',
            headCoach: 'Jessica Tania'
        },
        {
            certNo: 'SMT-CERT-8843',
            studentName: 'Nadia Putri',
            program: 'Basic Modeling Intensive Batch V',
            graduationDate: '01 September 2026',
            grade: 'Distinction (A+)',
            verified: true,
            director: 'Elena Siluet',
            headCoach: 'Aura Clarissa'
        },
        {
            certNo: 'SMT-CERT-8844',
            studentName: 'Rian Prasetya',
            program: 'Male Posture & Catwalk Division',
            graduationDate: '28 Agustus 2026',
            grade: 'Merit (B+)',
            verified: true,
            director: 'Elena Siluet',
            headCoach: 'Dimas Wicaksono'
        }
    ]);

    // ==========================================
    // DATA: TESTIMONI
    // ==========================================
    const [testimonialsList, setTestimonialsList] = useState([
        {
            id: 'testi-1',
            name: 'Nadia Putri',
            role: 'Alumni Basic Modeling 2024',
            avatar: '/images/avatar_nadia.jpg',
            rating: 5,
            quote: 'Pelatihannya sangat profesional dan membantu saya lebih percaya diri. Sekarang saya sudah mendapatkan kesempatan untuk ikut fashion show dan photoshoot komersial.',
            featuredOnHome: true,
            date: '22 Okt 2026'
        },
        {
            id: 'testi-2',
            name: 'Jessica Tania',
            role: 'Alumni Runway & Catwalk 2024',
            avatar: '/images/card_commercial.jpg',
            rating: 5,
            quote: 'Kurikulum runway & catwalk di Siluet Model Tala benar-benar mengubah cara saya berjalan dan postur tubuh. Mentornya sangat sabar dan detail dalam memberi evaluasi.',
            featuredOnHome: true,
            date: '18 Okt 2026'
        },
        {
            id: 'testi-3',
            name: 'Aura Clarissa',
            role: 'Alumni Advanced Modeling 2023',
            avatar: '/images/card_advanced.jpg',
            rating: 5,
            quote: 'Networking yang dibangun Siluet Model Tala sangat membantu karier saya. Setelah lulus, saya langsung terhubung dengan dua agensi fashion ternama di Jakarta.',
            featuredOnHome: true,
            date: '12 Okt 2026'
        },
        {
            id: 'testi-4',
            name: 'Citra Anindya',
            role: 'Alumni Commercial & Audition',
            avatar: '/images/card_runway.jpg',
            rating: 5,
            quote: 'Simulasi casting di kelas TVC membuat saya tidak canggung lagi saat audisi sungguhan. Sangat merekomendasikan akademi ini untuk siapa pun yang ingin serius di modeling.',
            featuredOnHome: false,
            date: '05 Okt 2026'
        }
    ]);

    // ==========================================
    // DATA: GALERI MEDIA
    // ==========================================
    const [galleryFilter, setGalleryFilter] = useState('Semua');
    const galleryItems = [
        { id: 'g-1', title: 'Jakarta Fashion Week Runway 2026', category: 'Fashion Show', image: '/images/card_runway.jpg', date: '20 Okt 2026' },
        { id: 'g-2', title: 'Studio High Fashion Editorial Session', category: 'Photoshoot Studio', image: '/images/hero-model.jpg', date: '18 Okt 2026' },
        { id: 'g-3', title: 'Couture Posing Masterclass with Aura', category: 'Masterclass', image: '/images/card_advanced.jpg', date: '15 Okt 2026' },
        { id: 'g-4', title: 'Backstage Makeup & Hair Preparation', category: 'Backstage', image: '/images/bare_shoulders.jpg', date: '12 Okt 2026' },
        { id: 'g-5', title: 'Commercial TVC Portfolio Day', category: 'Photoshoot Studio', image: '/images/card_commercial.jpg', date: '08 Okt 2026' },
        { id: 'g-6', title: 'Male Division Tailoring Showcase', category: 'Fashion Show', image: '/images/beige_suit.jpg', date: '04 Okt 2026' },
        { id: 'g-7', title: 'Graduation Ceremony Batch IV', category: 'Masterclass', image: '/images/about-portrait.jpg', date: '28 Sep 2026' },
        { id: 'g-8', title: 'Runway Balance & Stride Practice', category: 'Backstage', image: '/images/card_basic.jpg', date: '22 Sep 2026' },
    ];

    // ==========================================
    // DATA: PENGATURAN (SETTINGS)
    // ==========================================
    const [settingsTab, setSettingsTab] = useState('profil');
    const [academySettings, setAcademySettings] = useState({
        name: 'Siluet Model Tala',
        tagline: 'Shape Your Presence — Leading Model Academy',
        email: 'admin@siluetmodeltala.com',
        phone: '+62 (021) 555-0199',
        whatsapp: '+62 812-3456-7890',
        address: 'Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan, 12190',
        bcaAccount: '8820 9182 301 (Siluet Model Tala PT)',
        mandiriAccount: '1370 0192 8840 (Siluet Model Tala PT)'
    });

    // Handle adding a program
    const handleAddProgramSubmit = (e) => {
        e.preventDefault();
        if (!newProgram.title) {
            alert('Mohon masukkan nama program');
            return;
        }
        const created = {
            id: `prog-${Date.now()}`,
            title: newProgram.title,
            category: newProgram.category,
            duration: newProgram.duration,
            price: newProgram.price,
            enrolled: 0,
            quota: parseInt(newProgram.quota) || 20,
            mentor: 'Tim Mentor Siluet',
            status: 'Aktif',
            image: '/images/card_basic.jpg',
            description: 'Program pelatihan baru yang dirancang khusus untuk meningkatkan potensi peserta.'
        };
        setPrograms([created, ...programs]);
        setIsAddProgramOpen(false);
        showToast(`Program "${newProgram.title}" berhasil ditambahkan!`);
        setNewProgram({
            title: '',
            category: 'Basic Modeling',
            duration: '3 Bulan',
            price: 'Rp 4.500.000',
            quota: '25'
        });
    };

    // Calculate spline chart for dashboard
    const chartData = useMemo(() => {
        if (selectedTimeframe === '3 bulan terakhir') {
            return [
                { month: 'Apr', value: 80, x: 80, y: 150 },
                { month: 'Mei', value: 125, x: 260, y: 105 },
                { month: 'Jun', value: 185, x: 440, y: 45 },
            ];
        }
        if (selectedTimeframe === '1 tahun terakhir') {
            return [
                { month: 'Jul', value: 50, x: 40, y: 175 },
                { month: 'Sep', value: 90, x: 140, y: 135 },
                { month: 'Nov', value: 130, x: 240, y: 95 },
                { month: 'Jan', value: 45, x: 340, y: 180 },
                { month: 'Mar', value: 105, x: 440, y: 120 },
                { month: 'Jun', value: 185, x: 540, y: 40 },
            ];
        }
        return [
            { month: 'Jan', value: 45, x: 40, y: 185 },
            { month: 'Feb', value: 72, x: 140, y: 158 },
            { month: 'Mar', value: 105, x: 240, y: 125 },
            { month: 'Apr', value: 80, x: 340, y: 150 },
            { month: 'Mei', value: 125, x: 440, y: 105 },
            { month: 'Jun', value: 185, x: 540, y: 45 },
        ];
    }, [selectedTimeframe]);

    const splinePath = useMemo(() => {
        if (!chartData || chartData.length < 2) return '';
        let d = `M ${chartData[0].x} ${chartData[0].y}`;
        for (let i = 0; i < chartData.length - 1; i++) {
            const p0 = chartData[i];
            const p1 = chartData[i + 1];
            const cp1x = p0.x + (p1.x - p0.x) / 2;
            const cp1y = p0.y;
            const cp2x = p0.x + (p1.x - p0.x) / 2;
            const cp2y = p1.y;
            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
        }
        return d;
    }, [chartData]);

    const areaPath = useMemo(() => {
        if (!splinePath || chartData.length === 0) return '';
        const lastX = chartData[chartData.length - 1].x;
        const firstX = chartData[0].x;
        return `${splinePath} L ${lastX} 210 L ${firstX} 210 Z`;
    }, [splinePath, chartData]);

    const donutCircumference = 389.56;
    const donutData = [
        { label: 'Basic Modeling', percent: 42, color: '#1c1a17' },
        { label: 'Advanced Modeling', percent: 28, color: '#8c7b6d' },
        { label: 'Runway & Catwalk', percent: 18, color: '#c4b4a1' },
        { label: 'Commercial Modeling', percent: 12, color: '#e7ded3' },
    ];

    // Filtered programs
    const filteredPrograms = useMemo(() => {
        return programs.filter(p => {
            const matchCategory = programCategoryFilter === 'Semua' || p.category === programCategoryFilter;
            const matchSearch = !searchQuery.trim() || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchSearch;
        });
    }, [programs, programCategoryFilter, searchQuery]);

    // Filtered students
    const filteredStudents = useMemo(() => {
        return students.filter(s => {
            const matchProgram = pesertaFilterProgram === 'Semua' || s.program.includes(pesertaFilterProgram);
            const matchSearch = !searchQuery.trim() || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
            return matchProgram && matchSearch;
        });
    }, [students, pesertaFilterProgram, searchQuery]);

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
                SIDEBAR NAVIGATION (Fixed Luxury Theme)
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
                                <button
                                    key={item.id}
                                    onClick={() => handleNavChange(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                                        isActive
                                            ? 'bg-[#1c1a17] text-white shadow-xs'
                                            : 'text-[#635c55] hover:text-[#1c1a17] hover:bg-[#ede6dc]/60'
                                    }`}
                                >
                                    <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#7d756d]'}`} />
                                    <span className="truncate">{item.label}</span>
                                </button>
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
                MAIN CONTENT AREA
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
                            <button onClick={() => handleNavChange('Dashboard')} className="text-[#8c827a] hover:text-[#1c1a17] transition">
                                Dashboard
                            </button>
                            <span className="text-[#bbaea1]">/</span>
                            <span className="text-[#1c1a17] font-medium">
                                {activeNav === 'Dashboard' ? 'Overview' : activeNav}
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={`Cari di ${activeNav}...`}
                                className="w-72 lg:w-96 pl-10 pr-16 py-2 bg-white border border-[#ede7dd] rounded-xl text-xs text-[#1c1a17] placeholder:text-[#9e968f] focus:outline-none focus:border-[#1c1a17] transition shadow-xs"
                            />
                            <span className="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono text-[#8c827a] bg-[#f7f5f0] border border-[#e5ded4] rounded-md pointer-events-none">
                                Ctrl K
                            </span>
                        </div>

                        {/* Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={() => showToast('Semua notifikasi sistem terkini telah dibaca.')}
                                className="relative p-2 text-[#635c55] hover:text-[#1c1a17] rounded-xl hover:bg-[#ede6dc]/50 transition"
                                title="Notifikasi"
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-[#d97706] rounded-full ring-2 ring-[#f7f5f0]"></span>
                            </button>
                        </div>

                        {/* User Profile Avatar with dropdown arrow */}
                        <div className="flex items-center gap-2 pl-2 border-l border-[#ede7dd] cursor-pointer group" onClick={() => handleNavChange('Pengaturan')}>
                            <img
                                src="/images/testimonial-nadia.jpg"
                                alt="Admin"
                                className="w-9 h-9 rounded-full object-cover border border-[#ede7dd]"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                                }}
                            />
                            <ChevronDown className="w-3.5 h-3.5 text-[#8c827a] group-hover:text-[#1c1a17] transition" />
                        </div>
                    </div>
                </header>

                {/* Main Dynamic View Area */}
                <main className="p-6 lg:p-10 space-y-7 max-w-[1440px]">
                    {/* ========================================================
                        PAGE 1: DASHBOARD (Identical to reference screenshot)
                       ======================================================== */}
                    {activeNav === 'Dashboard' && (
                        <>
                            {/* Greeting & Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                                        SILUET MODEL TALA
                                    </span>
                                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                                        Selamat pagi, Admin.
                                    </h1>
                                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                                        Berikut ringkasan aktivitas Siluet Model Tala hari ini.
                                    </p>
                                </div>
                            </div>

                            {/* 4 Stat Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                                        <Users className="w-5 h-5 stroke-[1.8]" />
                                    </div>
                                    <span className="text-xs font-medium text-[#78716c] block">Total Peserta</span>
                                    <div className="text-3xl font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">528</div>
                                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                        <span>+12%</span>
                                        <span className="text-[#8c827a] font-normal">dari bulan lalu</span>
                                    </div>
                                    <Users className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                                </div>

                                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                                        <BookOpen className="w-5 h-5 stroke-[1.8]" />
                                    </div>
                                    <span className="text-xs font-medium text-[#78716c] block">Program Aktif</span>
                                    <div className="text-3xl font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">8</div>
                                    <div className="flex items-center gap-1.5 text-xs text-[#78716c]">
                                        <ArrowRight className="w-3.5 h-3.5 text-[#8c827a]" />
                                        <span>2 program baru</span>
                                    </div>
                                    <BookOpen className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                                </div>

                                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                                        <User className="w-5 h-5 stroke-[1.8]" />
                                    </div>
                                    <span className="text-xs font-medium text-[#78716c] block">Mentor Profesional</span>
                                    <div className="text-3xl font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">12</div>
                                    <div className="flex items-center gap-1.5 text-xs text-[#78716c]">
                                        <ArrowRight className="w-3.5 h-3.5 text-[#8c827a]" />
                                        <span>+1 mentor baru</span>
                                    </div>
                                    <User className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                                </div>

                                <div className="bg-white border border-[#ede7dd] rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all hover:shadow-md">
                                    <div className="w-11 h-11 rounded-full bg-[#fbf9f5] border border-[#eee8dd] flex items-center justify-center text-[#1c1a17] mb-3">
                                        <Wallet className="w-5 h-5 stroke-[1.8]" />
                                    </div>
                                    <span className="text-xs font-medium text-[#78716c] block">Pendapatan Bulan Ini</span>
                                    <div className="text-2xl lg:text-[26px] font-semibold text-[#1c1a17] tracking-tight mt-1 mb-2">Rp 24.500.000</div>
                                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                        <span>+8,4%</span>
                                        <span className="text-[#8c827a] font-normal">dari bulan lalu</span>
                                    </div>
                                    <BarChart3 className="absolute -right-3 -bottom-3 w-20 h-20 text-[#ede7dd] opacity-35 pointer-events-none stroke-[1]" />
                                </div>
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                <div className="lg:col-span-7 bg-white border border-[#ede7dd] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-semibold text-lg text-[#1c1a17] tracking-tight">Statistik Pendaftaran</h3>
                                            <p className="text-xs text-[#78716c] mt-0.5">Jumlah pendaftaran peserta dalam {selectedTimeframe}.</p>
                                        </div>
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="border border-[#ede7dd] rounded-xl px-3 py-1.5 text-xs text-[#68625c] bg-[#faf8f5] hover:bg-[#ede7dd]/40 flex items-center gap-2 transition"
                                            >
                                                <span>{selectedTimeframe}</span>
                                                <ChevronDown className="w-3.5 h-3.5 text-[#8c827a]" />
                                            </button>
                                            {isDropdownOpen && (
                                                <div className="absolute right-0 mt-1.5 w-40 bg-white border border-[#ede7dd] rounded-xl shadow-lg py-1.5 z-20 text-xs">
                                                    {['6 bulan terakhir', '3 bulan terakhir', '1 tahun terakhir'].map((tf) => (
                                                        <button
                                                            key={tf}
                                                            onClick={() => {
                                                                setSelectedTimeframe(tf);
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className={`w-full text-left px-3.5 py-1.5 hover:bg-[#f7f5f0] transition ${
                                                                selectedTimeframe === tf ? 'font-semibold text-[#1c1a17] bg-[#f7f5f0]' : 'text-[#68625c]'
                                                            }`}
                                                        >
                                                            {tf}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Line Chart */}
                                    <div className="relative w-full overflow-hidden pt-2">
                                        <svg viewBox="0 0 580 230" className="w-full h-56 select-none overflow-visible">
                                            <defs>
                                                <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#bba994" stopOpacity="0.35" />
                                                    <stop offset="60%" stopColor="#ede7dd" stopOpacity="0.18" />
                                                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                                                </linearGradient>
                                            </defs>
                                            {[
                                                { val: 200, y: 35 },
                                                { val: 150, y: 80 },
                                                { val: 100, y: 125 },
                                                { val: 50, y: 170 },
                                                { val: 0, y: 215 },
                                            ].map((grid) => (
                                                <g key={grid.val}>
                                                    <text x="22" y={grid.y + 3} fill="#8c827a" fontSize="11" fontFamily="sans-serif" textAnchor="end">
                                                        {grid.val}
                                                    </text>
                                                    <line x1="32" y1={grid.y} x2="560" y2={grid.y} stroke="#f0ebe3" strokeDasharray={grid.val === 0 ? 'none' : '3 3'} strokeWidth="1" />
                                                </g>
                                            ))}
                                            <path d={areaPath} fill="url(#areaGrad)" />
                                            <path d={splinePath} fill="none" stroke="#1c1a17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            {chartData.map((pt, idx) => (
                                                <g key={pt.month} className="cursor-pointer group" onMouseEnter={() => setHoveredDataIndex(idx)} onMouseLeave={() => setHoveredDataIndex(null)}>
                                                    {hoveredDataIndex === idx && (
                                                        <circle cx={pt.x} cy={pt.y} r="9" fill="none" stroke="#1c1a17" strokeWidth="1.5" strokeOpacity="0.3" className="animate-ping" />
                                                    )}
                                                    <circle cx={pt.x} cy={pt.y} r={hoveredDataIndex === idx ? '5.5' : '4'} fill="#1c1a17" stroke="#ffffff" strokeWidth="2" className="transition-all duration-200" />
                                                    <text x={pt.x} y="230" fill={hoveredDataIndex === idx ? '#1c1a17' : '#8c827a'} fontSize="11" fontWeight={hoveredDataIndex === idx ? '600' : '400'} fontFamily="sans-serif" textAnchor="middle">
                                                        {pt.month}
                                                    </text>
                                                </g>
                                            ))}
                                        </svg>
                                    </div>
                                </div>

                                {/* Donut Chart */}
                                <div className="lg:col-span-5 bg-white border border-[#ede7dd] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg text-[#1c1a17] tracking-tight">Distribusi Program</h3>
                                        <p className="text-xs text-[#78716c] mt-0.5">Persentase peserta berdasarkan program pelatihan.</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4 my-auto">
                                        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                                                <circle cx="80" cy="80" r="62" fill="transparent" stroke="#1c1a17" strokeWidth="22" strokeDasharray={`${(42 / 100) * donutCircumference} ${donutCircumference}`} strokeDashoffset="0" />
                                                <circle cx="80" cy="80" r="62" fill="transparent" stroke="#8c7b6d" strokeWidth="22" strokeDasharray={`${(28 / 100) * donutCircumference} ${donutCircumference}`} strokeDashoffset={`${-(42 / 100) * donutCircumference}`} />
                                                <circle cx="80" cy="80" r="62" fill="transparent" stroke="#c4b4a1" strokeWidth="22" strokeDasharray={`${(18 / 100) * donutCircumference} ${donutCircumference}`} strokeDashoffset={`${-((42 + 28) / 100) * donutCircumference}`} />
                                                <circle cx="80" cy="80" r="62" fill="transparent" stroke="#e7ded3" strokeWidth="22" strokeDasharray={`${(12 / 100) * donutCircumference} ${donutCircumference}`} strokeDashoffset={`${-((42 + 28 + 18) / 100) * donutCircumference}`} />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                                                <span className="text-2xl font-bold text-[#1c1a17] leading-tight">528</span>
                                                <span className="text-[11px] text-[#8c827a]">Peserta</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3.5 w-full">
                                            {donutData.map((item) => (
                                                <div key={item.label} className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center gap-2.5">
                                                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                                        <span className="text-[#68625c] font-medium">{item.label}</span>
                                                    </div>
                                                    <span className="font-semibold text-[#1c1a17] ml-2">{item.percent}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Row: Table & Activities */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                <div className="lg:col-span-7 bg-white border border-[#ede7dd] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h3 className="font-semibold text-lg text-[#1c1a17] tracking-tight">Pendaftaran Terbaru</h3>
                                            <p className="text-xs text-[#78716c] mt-0.5">Peserta yang baru melakukan pendaftaran.</p>
                                        </div>
                                        <button onClick={() => handleNavChange('Peserta')} className="text-xs font-medium text-[#78716c] hover:text-[#1c1a17] flex items-center gap-1 transition">
                                            <span>Lihat Semua</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-[#f3efe8] text-[11px] font-medium text-[#8c827a]">
                                                    <th className="py-2.5 font-normal">Nama Peserta</th>
                                                    <th className="py-2.5 font-normal">Program</th>
                                                    <th className="py-2.5 font-normal">Tanggal Daftar</th>
                                                    <th className="py-2.5 font-normal">Status</th>
                                                    <th className="py-2.5 font-normal text-right pr-2">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#f5f1eb] text-xs">
                                                {students.slice(0, 4).map((row) => (
                                                    <tr key={row.id} className="hover:bg-[#fbf9f5] transition">
                                                        <td className="py-3.5 pr-3">
                                                            <div className="flex items-center gap-3">
                                                                <img src={row.avatar} alt={row.name} className="w-8 h-8 rounded-full object-cover border border-[#ede7dd]" />
                                                                <span className="font-semibold text-[#1c1a17]">{row.name}</span>
                                                            </div>
                                                        </td>
                                                        <td className="py-3.5 pr-3 text-[#68625c]">{row.program}</td>
                                                        <td className="py-3.5 pr-3 text-[#78716c]">{row.joinDate}</td>
                                                        <td className="py-3.5 pr-3">
                                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                                                                row.statusPay === 'Lunas' ? 'bg-[#eaf5ed] text-[#22723c] border-[#d2ead7]' :
                                                                row.statusPay === 'Menunggu' ? 'bg-[#fef7ea] text-[#b47a16] border-[#fbe5bd]' : 'bg-[#eef4fe] text-[#2b6cb0] border-[#d3e3fd]'
                                                            }`}>
                                                                {row.statusPay}
                                                            </span>
                                                        </td>
                                                        <td className="py-3.5 text-right pr-2">
                                                            <button onClick={() => showToast(`Melihat profil ${row.name}`)} className="p-1 text-[#8c827a] hover:text-[#1c1a17] rounded-lg">
                                                                <MoreVertical className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Activities Feed */}
                                <div className="lg:col-span-5 bg-white border border-[#ede7dd] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold text-lg text-[#1c1a17] tracking-tight">Aktivitas Terbaru</h3>
                                        <button onClick={() => showToast('Membuka log riwayat aktivitas.')} className="text-xs font-medium text-[#78716c] hover:text-[#1c1a17] flex items-center gap-1 transition">
                                            <span>Lihat Semua</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <div className="space-y-4 my-auto">
                                        {[
                                            { icon: User, title: 'Pendaftaran baru', desc: 'Nadia Putri mendaftar program Basic Modeling', time: '2 menit lalu' },
                                            { icon: Wallet, title: 'Pembayaran berhasil', desc: 'Alya Maharani melakukan pembayaran', time: '15 menit lalu' },
                                            { icon: FileText, title: 'Program baru ditambahkan', desc: 'Program Commercial Modeling telah dibuat', time: '1 jam lalu' },
                                            { icon: Calendar, title: 'Jadwal kelas diperbarui', desc: 'Jadwal Runway & Catwalk minggu depan', time: '3 jam lalu' },
                                            { icon: MessageSquare, title: 'Testimoni baru', desc: 'Citra Anindya memberikan testimoni', time: '5 jam lalu' },
                                        ].map((act, i) => {
                                            const Icon = act.icon;
                                            return (
                                                <div key={i} className="flex items-start justify-between gap-3">
                                                    <div className="flex items-start gap-3 min-w-0">
                                                        <div className="w-9 h-9 rounded-full border border-[#ede7dd] flex items-center justify-center bg-[#fbfaf8] text-[#1c1a17] shrink-0 mt-0.5">
                                                            <Icon className="w-4 h-4" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-xs font-bold text-[#1c1a17] leading-tight">{act.title}</h4>
                                                            <p className="text-[11px] text-[#78716c] mt-0.5 leading-snug">{act.desc}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] text-[#9e968f] whitespace-nowrap shrink-0">{act.time}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* ========================================================
                        PAGE 2: PROGRAM PELATIHAN
                       ======================================================== */}
                    {activeNav === 'Program Pelatihan' && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                                        MANAJEMEN KURIKULUM
                                    </span>
                                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                                        Program Pelatihan
                                    </h1>
                                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                                        Kelola paket kurikulum, durasi kelas, biaya pelatihan, dan kuota peserta.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsAddProgramOpen(true)}
                                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                                >
                                    <Plus className="w-4 h-4" />
                                    Tambah Program Baru
                                </button>
                            </div>

                            {/* Top Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <span className="text-xs text-[#78716c] block">Total Program Aktif</span>
                                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">8 Paket Kelas</div>
                                    <span className="text-[11px] text-emerald-600 mt-1 block">4 Reguler • 4 Masterclass</span>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <span className="text-xs text-[#78716c] block">Total Peserta Terdaftar</span>
                                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">528 Siswa</div>
                                    <span className="text-[11px] text-[#78716c] mt-1 block">Rata-rata 92% okupansi kelas</span>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <span className="text-xs text-[#78716c] block">Tingkat Kelulusan Alumni</span>
                                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">96.4%</div>
                                    <span className="text-[11px] text-emerald-600 mt-1 block">Tersertifikasi standar model</span>
                                </div>
                            </div>

                            {/* Category Filter Tabs */}
                            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#ede7dd]">
                                <div className="flex flex-wrap gap-1.5">
                                    {['Semua', 'Basic Modeling', 'Advanced Modeling', 'Runway & Catwalk', 'Commercial Modeling'].map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setProgramCategoryFilter(cat)}
                                            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                                                programCategoryFilter === cat
                                                    ? 'bg-[#1c1a17] text-white shadow-xs'
                                                    : 'text-[#68625c] hover:bg-[#ede7dd]/50'
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                                <span className="text-xs text-[#8c827a] px-2">
                                    Menampilkan {filteredPrograms.length} program
                                </span>
                            </div>

                            {/* Programs Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {filteredPrograms.map((prog) => (
                                    <div key={prog.id} className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group">
                                        <div className="relative h-44 overflow-hidden bg-[#eee8dd]">
                                            <img
                                                src={prog.image}
                                                alt={prog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                            <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-xs ${
                                                prog.status === 'Aktif' ? 'bg-emerald-500/90 text-white border-emerald-400' :
                                                prog.status === 'Penuh' ? 'bg-amber-500/90 text-white border-amber-400' : 'bg-gray-600/90 text-white border-gray-400'
                                            }`}>
                                                {prog.status}
                                            </span>
                                            <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider font-semibold bg-black/60 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                                                {prog.category}
                                            </span>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold text-base text-[#1c1a17] leading-snug">
                                                    {prog.title}
                                                </h3>
                                                <p className="text-xs text-[#78716c] mt-1.5 line-clamp-2 leading-relaxed">
                                                    {prog.description}
                                                </p>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-[#f3efe8] space-y-3">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-[#8c827a]">Durasi:</span>
                                                    <span className="font-medium text-[#1c1a17]">{prog.duration}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-[#8c827a]">Biaya:</span>
                                                    <span className="font-bold text-[#1c1a17]">{prog.price}</span>
                                                </div>
                                                <div>
                                                    <div className="flex justify-between text-[11px] text-[#78716c] mb-1">
                                                        <span>Kuota: {Number(prog.enrolled || 0)}/{Number(prog.quota || 0)} Siswa</span>
                                                        <span>{prog.quota > 0 ? Math.round((Number(prog.enrolled || 0) / Number(prog.quota)) * 100) : 0}%</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-[#f0ebe3] rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-[#1c1a17] rounded-full transition-all"
                                                            style={{ width: `${prog.quota > 0 ? Math.min((Number(prog.enrolled || 0) / Number(prog.quota)) * 100, 100) : 0}%` }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 pt-2">
                                                    <button
                                                        onClick={() => showToast(`Edit program: ${prog.title}`)}
                                                        className="flex-1 py-1.5 text-xs font-medium text-[#1c1a17] bg-[#f7f5f0] hover:bg-[#ede7dd] rounded-xl transition text-center"
                                                    >
                                                        Edit Kelas
                                                    </button>
                                                    <button
                                                        onClick={() => showToast(`Melihat daftar siswa: ${prog.title}`)}
                                                        className="px-3 py-1.5 text-xs text-[#78716c] hover:text-[#1c1a17] hover:bg-[#f7f5f0] rounded-xl border border-[#ede7dd]"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        PAGE 3: PESERTA
                       ======================================================== */}
                    {activeNav === 'Peserta' && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                                        DIREKTORI TALENTA
                                    </span>
                                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                                        Data Peserta
                                    </h1>
                                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                                        Daftar seluruh talenta dan murid aktif Siluet Model Tala.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <button
                                        onClick={() => showToast('Mengekspor data peserta ke file Excel...')}
                                        className="inline-flex items-center gap-2 bg-white border border-[#ede7dd] text-[#1c1a17] px-3.5 py-2 rounded-xl text-xs font-medium shadow-xs hover:bg-[#f7f5f0] transition"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Export CSV
                                    </button>
                                    <button
                                        onClick={() => showToast('Membuka form pendaftaran peserta baru manual.')}
                                        className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-medium shadow-xs transition"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Tambah Peserta
                                    </button>
                                </div>
                            </div>

                            {/* Top Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <span className="text-xs text-[#78716c]">Peserta Aktif</span>
                                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">528 Siswa</div>
                                    <span className="text-[10px] text-emerald-600">+48 siswa bulan ini</span>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <span className="text-xs text-[#78716c]">Rata-rata Kehadiran</span>
                                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">94.8%</div>
                                    <span className="text-[10px] text-emerald-600">Sangat disiplin</span>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <span className="text-xs text-[#78716c]">Pembayaran Lunas</span>
                                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">92.4%</div>
                                    <span className="text-[10px] text-[#78716c]">498 peserta terkonfirmasi</span>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <span className="text-xs text-[#78716c]">Siap Wisuda Kelulusan</span>
                                    <div className="text-2xl font-bold text-[#1c1a17] mt-1">36 Siswa</div>
                                    <span className="text-[10px] text-amber-600">Batch Wisuda Okt 2026</span>
                                </div>
                            </div>

                            {/* Filter bar */}
                            <div className="bg-white p-4 rounded-2xl border border-[#ede7dd] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-medium text-[#78716c]">Filter Program:</span>
                                    <select
                                        value={pesertaFilterProgram}
                                        onChange={(e) => setPesertaFilterProgram(e.target.value)}
                                        className="bg-[#f7f5f0] border border-[#ede7dd] rounded-xl px-3 py-1.5 text-xs text-[#1c1a17] focus:outline-none"
                                    >
                                        <option value="Semua">Semua Program Pelatihan</option>
                                        <option value="Basic Modeling">Basic Modeling</option>
                                        <option value="Advanced Editorial">Advanced Editorial</option>
                                        <option value="Runway & Catwalk">Runway & Catwalk</option>
                                        <option value="Commercial TVC">Commercial TVC</option>
                                    </select>
                                </div>
                                <span className="text-xs text-[#8c827a]">
                                    Menampilkan {filteredStudents.length} talenta
                                </span>
                            </div>

                            {/* Students Table */}
                            <div className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-[#f3efe8] bg-[#faf8f5] text-[11px] font-semibold text-[#8c827a]">
                                                <th className="py-3 px-4">Talenta & ID</th>
                                                <th className="py-3 px-4">Program Diambil</th>
                                                <th className="py-3 px-4">Kontak & Email</th>
                                                <th className="py-3 px-4">Kehadiran</th>
                                                <th className="py-3 px-4">Status Bayar</th>
                                                <th className="py-3 px-4">Status Kelas</th>
                                                <th className="py-3 px-4 text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#f5f1eb] text-xs">
                                            {filteredStudents.map((st) => (
                                                <tr key={st.id} className="hover:bg-[#fbf9f5] transition">
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <img src={st.avatar} alt={st.name} className="w-9 h-9 rounded-full object-cover border border-[#ede7dd]" />
                                                            <div>
                                                                <h4 className="font-semibold text-[#1c1a17]">{st.name}</h4>
                                                                <span className="text-[10px] font-mono text-[#8c827a]">{st.id}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4 text-[#68625c]">{st.program}</td>
                                                    <td className="py-3 px-4">
                                                        <div className="text-[11px] text-[#1c1a17]">{st.email}</div>
                                                        <div className="text-[10px] text-[#8c827a]">{st.phone}</div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-16 h-1.5 bg-[#f0ebe3] rounded-full overflow-hidden">
                                                                <div className="h-full bg-emerald-600 rounded-full" style={{ width: st.attendance }} />
                                                            </div>
                                                            <span className="text-[11px] font-semibold text-[#1c1a17]">{st.attendance}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-medium border ${
                                                            st.statusPay === 'Lunas' ? 'bg-[#eaf5ed] text-[#22723c] border-[#d2ead7]' :
                                                            st.statusPay === 'Menunggu' ? 'bg-[#fef7ea] text-[#b47a16] border-[#fbe5bd]' : 'bg-[#eef4fe] text-[#2b6cb0] border-[#d3e3fd]'
                                                        }`}>
                                                            {st.statusPay}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-medium ${
                                                            st.statusClass === 'Aktif' ? 'bg-[#f7f5f0] text-[#1c1a17]' : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                            {st.statusClass}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4 text-right">
                                                        <button
                                                            onClick={() => showToast(`Detail talenta: ${st.name}`)}
                                                            className="p-1.5 text-[#8c827a] hover:text-[#1c1a17] hover:bg-[#ede7dd]/40 rounded-lg transition"
                                                        >
                                                            <MoreVertical className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        PAGE 4: MENTOR
                       ======================================================== */}
                    {activeNav === 'Mentor' && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                                        INSTRUKTUR INDUSTRI
                                    </span>
                                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                                        Mentor Profesional
                                    </h1>
                                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                                        Direktori instruktur runway, pelatih editorial, dan praktisi fashion berpengalaman.
                                    </p>
                                </div>
                                <button
                                    onClick={() => showToast('Membuka form pendaftaran mentor baru.')}
                                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                                >
                                    <Plus className="w-4 h-4" />
                                    Tambah Mentor Baru
                                </button>
                            </div>

                            {/* Mentors Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mentors.map((m) => (
                                    <div key={m.id} className="bg-white rounded-2xl border border-[#ede7dd] p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-4 mb-4">
                                                <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-2xl object-cover border border-[#ede7dd]" />
                                                <div>
                                                    <h3 className="font-semibold text-base text-[#1c1a17]">{m.name}</h3>
                                                    <span className="text-xs text-[#8c827a] block leading-snug mt-0.5">{m.role}</span>
                                                    <div className="flex items-center gap-1 text-amber-500 text-xs mt-1">
                                                        <Star className="w-3.5 h-3.5 fill-current" />
                                                        <span className="font-bold text-[#1c1a17]">{m.rating}</span>
                                                        <span className="text-[#8c827a] text-[11px]">(Evaluasi Siswa)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-xs text-[#78716c] leading-relaxed mb-4">
                                                {m.experience}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {m.specialty.map((tag) => (
                                                    <span key={tag} className="bg-[#f7f5f0] text-[#59524c] border border-[#ede7dd] px-2.5 py-0.5 rounded-lg text-[10.5px]">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-[#f3efe8] flex items-center justify-between">
                                            <div className="text-xs">
                                                <span className="text-[#8c827a]">Kelas Aktif:</span>
                                                <span className="font-bold text-[#1c1a17] ml-1.5">{m.classesCount} Sesi/Minggu</span>
                                            </div>
                                            <button
                                                onClick={() => showToast(`Melihat jadwal sesi mentor: ${m.name}`)}
                                                className="px-3.5 py-1.5 bg-[#1c1a17] text-white rounded-xl text-xs font-medium hover:bg-black transition"
                                            >
                                                Jadwal Sesi
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        PAGE 5: JADWAL KELAS
                       ======================================================== */}
                    {activeNav === 'Jadwal Kelas' && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                                        TIMETABLE STUDIO
                                    </span>
                                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                                        Jadwal Kelas & Sesi Latihan
                                    </h1>
                                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                                        Kalender sesi catwalk, latihan studio foto, dan evaluasi mingguan.
                                    </p>
                                </div>
                                <button
                                    onClick={() => showToast('Membuka form penambahan jadwal sesi kelas.')}
                                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                                >
                                    <Plus className="w-4 h-4" />
                                    Atur Sesi Baru
                                </button>
                            </div>

                            {/* Day Selector Tabs */}
                            <div className="flex flex-wrap gap-2 bg-white p-3 rounded-2xl border border-[#ede7dd]">
                                {['Senin', 'Rabu', 'Jumat', 'Sabtu', 'Minggu'].map((day) => (
                                    <button
                                        key={day}
                                        onClick={() => setSelectedDay(day)}
                                        className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-2 ${
                                            selectedDay === day
                                                ? 'bg-[#1c1a17] text-white shadow-xs'
                                                : 'text-[#68625c] hover:bg-[#ede7dd]/50'
                                        }`}
                                    >
                                        <span>{day}</span>
                                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                            selectedDay === day ? 'bg-white/20 text-white' : 'bg-[#ede7dd] text-[#68625c]'
                                        }`}>
                                            {scheduleByDay[day]?.length || 0} Sesi
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Schedule Timeline Cards */}
                            <div className="space-y-4">
                                {(scheduleByDay[selectedDay] || []).map((item, idx) => (
                                    <div key={idx} className="bg-white rounded-2xl border border-[#ede7dd] p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-[#faf8f5] border border-[#ede7dd] flex flex-col items-center justify-center shrink-0 text-[#1c1a17]">
                                                <Clock className="w-4 h-4 text-[#8c827a] mb-0.5" />
                                                <span className="text-[10px] font-bold">SESI</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2.5">
                                                    <span className="font-mono text-xs font-bold text-[#1c1a17] bg-[#f7f5f0] px-2 py-0.5 rounded-md border border-[#ede7dd]">
                                                        {item.time}
                                                    </span>
                                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                                        item.status === 'Berlangsung' ? 'bg-emerald-100 text-emerald-800' :
                                                        item.status === 'Selesai' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-base text-[#1c1a17] mt-1.5">{item.title}</h3>
                                                <div className="flex flex-wrap items-center gap-3 text-xs text-[#78716c] mt-1">
                                                    <span>Lokasi: {item.studio}</span>
                                                    <span>•</span>
                                                    <span>Instruktur: <strong className="text-[#1c1a17] font-medium">{item.mentor}</strong></span>
                                                    <span>•</span>
                                                    <span>{item.enrolled}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 self-end sm:self-auto">
                                            <button
                                                onClick={() => showToast(`Cek absensi sesi ${item.title}`)}
                                                className="px-3.5 py-1.5 bg-[#f7f5f0] hover:bg-[#ede7dd] text-[#1c1a17] rounded-xl text-xs font-medium transition"
                                            >
                                                Absensi Murid
                                            </button>
                                            <button
                                                onClick={() => showToast(`Edit jadwal: ${item.title}`)}
                                                className="p-2 border border-[#ede7dd] text-[#78716c] hover:text-[#1c1a17] rounded-xl"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        PAGE 6: PEMBAYARAN
                       ======================================================== */}
                    {activeNav === 'Pembayaran' && (
                        <div className="space-y-6">
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

                            {/* 4 Financial Stat Cards */}
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

                            {/* Payment Table */}
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
                        </div>
                    )}

                    {/* ========================================================
                        PAGE 7: SERTIFIKAT
                       ======================================================== */}
                    {activeNav === 'Sertifikat' && (
                        <div className="space-y-6">
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
                                    onClick={() => showToast('Membuka wizard penerbitan sertifikat kelulusan baru.')}
                                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                                >
                                    <Plus className="w-4 h-4" />
                                    Terbitkan Sertifikat
                                </button>
                            </div>

                            {/* Certificates Table */}
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
                        </div>
                    )}

                    {/* ========================================================
                        PAGE 8: TESTIMONI
                       ======================================================== */}
                    {activeNav === 'Testimoni' && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                                        ULASAN & REPUTASI
                                    </span>
                                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                                        Manajemen Testimoni
                                    </h1>
                                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                                        Moderasi ulasan alumni untuk dipublikasikan pada halaman utama website publik.
                                    </p>
                                </div>
                                <button
                                    onClick={() => showToast('Membuka modal tambah testimoni manual.')}
                                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                                >
                                    <Plus className="w-4 h-4" />
                                    Tambah Ulasan Baru
                                </button>
                            </div>

                            {/* Reviews Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {testimonialsList.map((t) => (
                                    <div key={t.id} className="bg-white rounded-2xl border border-[#ede7dd] p-6 shadow-xs flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-[#ede7dd]" />
                                                    <div>
                                                        <h4 className="font-semibold text-base text-[#1c1a17]">{t.name}</h4>
                                                        <span className="text-xs text-[#8c827a]">{t.role}</span>
                                                    </div>
                                                </div>
                                                <div className="flex text-amber-400">
                                                    {[...Array(t.rating)].map((_, i) => (
                                                        <Star key={i} className="w-4 h-4 fill-current" />
                                                    ))}
                                                </div>
                                            </div>

                                            <blockquote className="text-xs text-[#68625c] italic leading-relaxed bg-[#fbf9f5] p-4 rounded-xl border border-[#ede7dd]/60 mb-4">
                                                "{t.quote}"
                                            </blockquote>
                                        </div>

                                        <div className="pt-3 border-t border-[#f3efe8] flex items-center justify-between text-xs">
                                            <span className="text-[#8c827a]">{t.date}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#68625c]">Tayang di Home:</span>
                                                <button
                                                    onClick={() => {
                                                        setTestimonialsList(testimonialsList.map(x => x.id === t.id ? { ...x, featuredOnHome: !x.featuredOnHome } : x));
                                                        showToast(`Status tayang ${t.name} diperbarui!`);
                                                    }}
                                                    className={`w-9 h-5 flex items-center rounded-full p-0.5 transition cursor-pointer ${
                                                        t.featuredOnHome ? 'bg-[#1c1a17] justify-end' : 'bg-gray-300 justify-start'
                                                    }`}
                                                >
                                                    <span className="w-4 h-4 rounded-full bg-white block shadow-xs" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        PAGE 9: GALERI
                       ======================================================== */}
                    {activeNav === 'Galeri' && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                                        DOKUMENTASI & MEDIA
                                    </span>
                                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                                        Galeri & Dokumentasi
                                    </h1>
                                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                                        Arsip foto runway show, sesi photoshoot studio, masterclass, dan wisuda alumni.
                                    </p>
                                </div>
                                <button
                                    onClick={() => showToast('Membuka upload media foto/album baru.')}
                                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                                >
                                    <UploadCloud className="w-4 h-4" />
                                    Upload Media Foto
                                </button>
                            </div>

                            {/* Gallery Categories */}
                            <div className="flex flex-wrap gap-2 bg-white p-3 rounded-2xl border border-[#ede7dd]">
                                {['Semua', 'Fashion Show', 'Photoshoot Studio', 'Masterclass', 'Backstage'].map((gcat) => (
                                    <button
                                        key={gcat}
                                        onClick={() => setGalleryFilter(gcat)}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                                            galleryFilter === gcat
                                                ? 'bg-[#1c1a17] text-white shadow-xs'
                                                : 'text-[#68625c] hover:bg-[#ede7dd]/50'
                                        }`}
                                    >
                                        {gcat}
                                    </button>
                                ))}
                            </div>

                            {/* Gallery Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {galleryItems
                                    .filter(item => galleryFilter === 'Semua' || item.category === galleryFilter)
                                    .map((g) => (
                                        <div key={g.id} className="bg-white rounded-2xl border border-[#ede7dd] overflow-hidden shadow-xs hover:shadow-md transition group">
                                            <div className="relative h-52 overflow-hidden bg-[#eee8dd]">
                                                <img
                                                    src={g.image}
                                                    alt={g.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                                <span className="absolute top-3 left-3 text-[10px] font-semibold bg-black/60 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                                                    {g.category}
                                                </span>
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-semibold text-xs text-[#1c1a17] line-clamp-1">{g.title}</h4>
                                                <span className="text-[10px] text-[#8c827a] block mt-1">{g.date}</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        PAGE 10: LAPORAN
                       ======================================================== */}
                    {activeNav === 'Laporan' && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                                        ANALITIK & REKAP
                                    </span>
                                    <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                                        Laporan & Analitik Performa
                                    </h1>
                                    <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                                        Analisis performa kelulusan, demografi peserta, dan laporan finansial berkala.
                                    </p>
                                </div>
                                <button
                                    onClick={() => showToast('Mengunduh paket laporan analitik tahunan (PDF)...')}
                                    className="inline-flex items-center gap-2 bg-[#1c1a17] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium shadow-sm transition"
                                >
                                    <Download className="w-4 h-4" />
                                    Ekspor Laporan Lengkap
                                </button>
                            </div>

                            {/* 4 Metric Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
                                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <span className="text-xs text-[#78716c] block">Retensi Peserta</span>
                                    <div className="text-3xl font-bold text-[#1c1a17] mt-1">98.2%</div>
                                    <span className="text-[11px] text-emerald-600 mt-1 block">Tingkat kepuasan tertinggi</span>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <span className="text-xs text-[#78716c] block">Rata-rata Rating Evaluasi</span>
                                    <div className="text-3xl font-bold text-[#1c1a17] mt-1">4.95 / 5.0</div>
                                    <span className="text-[11px] text-[#78716c] mt-1 block">Dari 420 murid alumni</span>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <span className="text-xs text-[#78716c] block">Penyerapan Agensi Mode</span>
                                    <div className="text-3xl font-bold text-[#1c1a17] mt-1">74.6%</div>
                                    <span className="text-[11px] text-emerald-600 mt-1 block">Langsung dikontrak brand</span>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <span className="text-xs text-[#78716c] block">Total Jam Sesi Pelatihan</span>
                                    <div className="text-3xl font-bold text-[#1c1a17] mt-1">1.480 Jam</div>
                                    <span className="text-[11px] text-[#78716c] mt-1 block">Sepanjang tahun 2026</span>
                                </div>
                            </div>

                            {/* Detailed Analytics Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <h3 className="font-semibold text-base text-[#1c1a17] mb-4">Penyaluran Karier Alumni</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Commercial & TVC Brand Ambassador', pct: 42, color: 'bg-[#1c1a17]' },
                                            { label: 'High Fashion Runway & Fashion Week', pct: 36, color: 'bg-[#8c7b6d]' },
                                            { label: 'Beauty Pageant & Duta Pariwisata', pct: 14, color: 'bg-[#c4b4a1]' },
                                            { label: 'Freelance Editorial Influencer', pct: 8, color: 'bg-[#ded7cb]' },
                                        ].map((item, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-[#68625c] font-medium">{item.label}</span>
                                                    <span className="font-bold text-[#1c1a17]">{item.pct}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-[#f0ebe3] rounded-full overflow-hidden">
                                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl border border-[#ede7dd] shadow-xs">
                                    <h3 className="font-semibold text-base text-[#1c1a17] mb-4">Demografi Usia Murid</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Adults (18 - 25 Tahun)', count: '298 Siswa', pct: 56 },
                                            { label: 'Teens (13 - 17 Tahun)', count: '142 Siswa', pct: 27 },
                                            { label: 'Kids (6 - 12 Tahun)', count: '88 Siswa', pct: 17 },
                                        ].map((item, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-[#68625c] font-medium">{item.label}</span>
                                                    <span className="font-bold text-[#1c1a17]">{item.count} ({item.pct}%)</span>
                                                </div>
                                                <div className="w-full h-2 bg-[#f0ebe3] rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#1c1a17] rounded-full" style={{ width: `${item.pct}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        PAGE 11: PENGATURAN
                       ======================================================== */}
                    {activeNav === 'Pengaturan' && (
                        <div className="space-y-6">
                            <div>
                                <span className="text-[10.5px] tracking-[0.28em] uppercase font-semibold text-[#8c827a] block mb-1">
                                    KONFIGURASI SISTEM
                                </span>
                                <h1 className="font-serif text-3xl sm:text-4xl text-[#1c1a17] font-normal tracking-tight">
                                    Pengaturan
                                </h1>
                                <p className="text-xs sm:text-sm text-[#78716c] mt-1">
                                    Konfigurasi identitas akademi, rekening pembayaran resmi, dan keamanan akun administrator.
                                </p>
                            </div>

                            {/* Settings Tabs */}
                            <div className="flex gap-2 bg-white p-2.5 rounded-2xl border border-[#ede7dd] w-fit">
                                {[
                                    { id: 'profil', label: 'Profil Institusi' },
                                    { id: 'rekening', label: 'Rekening Pembayaran' },
                                    { id: 'keamanan', label: 'Keamanan Akun' },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setSettingsTab(tab.id)}
                                        className={`px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                                            settingsTab === tab.id
                                                ? 'bg-[#1c1a17] text-white shadow-xs'
                                                : 'text-[#68625c] hover:bg-[#ede7dd]/50'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab 1: Profil */}
                            {settingsTab === 'profil' && (
                                <div className="bg-white p-6 rounded-2xl border border-[#ede7dd] shadow-xs max-w-2xl space-y-4">
                                    <h3 className="font-semibold text-base text-[#1c1a17] mb-2">Identitas Brand & Akademi</h3>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Nama Brand Akademi</label>
                                        <input
                                            type="text"
                                            value={academySettings.name}
                                            onChange={(e) => setAcademySettings({ ...academySettings, name: e.target.value })}
                                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Tagline</label>
                                        <input
                                            type="text"
                                            value={academySettings.tagline}
                                            onChange={(e) => setAcademySettings({ ...academySettings, tagline: e.target.value })}
                                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Email Resmi</label>
                                            <input
                                                type="email"
                                                value={academySettings.email}
                                                onChange={(e) => setAcademySettings({ ...academySettings, email: e.target.value })}
                                                className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#1c1a17] mb-1">WhatsApp Studio</label>
                                            <input
                                                type="text"
                                                value={academySettings.whatsapp}
                                                onChange={(e) => setAcademySettings({ ...academySettings, whatsapp: e.target.value })}
                                                className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Alamat Studio Utama</label>
                                        <textarea
                                            rows="2"
                                            value={academySettings.address}
                                            onChange={(e) => setAcademySettings({ ...academySettings, address: e.target.value })}
                                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                        />
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            onClick={() => showToast('Perubahan profil akademi berhasil disimpan!')}
                                            className="px-5 py-2.5 bg-[#1c1a17] hover:bg-black text-white rounded-xl text-xs font-medium shadow-xs transition"
                                        >
                                            Simpan Perubahan
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Tab 2: Rekening */}
                            {settingsTab === 'rekening' && (
                                <div className="bg-white p-6 rounded-2xl border border-[#ede7dd] shadow-xs max-w-2xl space-y-4">
                                    <h3 className="font-semibold text-base text-[#1c1a17] mb-2">Instruksi Transfer Pembayaran Siswa</h3>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Rekening Bank Central Asia (BCA)</label>
                                        <input
                                            type="text"
                                            value={academySettings.bcaAccount}
                                            onChange={(e) => setAcademySettings({ ...academySettings, bcaAccount: e.target.value })}
                                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Rekening Bank Mandiri</label>
                                        <input
                                            type="text"
                                            value={academySettings.mandiriAccount}
                                            onChange={(e) => setAcademySettings({ ...academySettings, mandiriAccount: e.target.value })}
                                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                        />
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            onClick={() => showToast('Rekening pembayaran berhasil diperbarui!')}
                                            className="px-5 py-2.5 bg-[#1c1a17] hover:bg-black text-white rounded-xl text-xs font-medium shadow-xs transition"
                                        >
                                            Simpan Rekening
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Tab 3: Keamanan */}
                            {settingsTab === 'keamanan' && (
                                <div className="bg-white p-6 rounded-2xl border border-[#ede7dd] shadow-xs max-w-2xl space-y-4">
                                    <h3 className="font-semibold text-base text-[#1c1a17] mb-2">Keamanan & Password Akun</h3>
                                    <div>
                                        <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Password Saat Ini</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••••••"
                                            className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Password Baru</label>
                                            <input
                                                type="password"
                                                placeholder="Minimal 8 karakter"
                                                className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-[#1c1a17] mb-1">Ulangi Password Baru</label>
                                            <input
                                                type="password"
                                                placeholder="Konfirmasi password baru"
                                                className="w-full bg-[#fbfaf8] border border-[#ede7dd] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            onClick={() => showToast('Password berhasil diperbarui dengan aman!')}
                                            className="px-5 py-2.5 bg-[#1c1a17] hover:bg-black text-white rounded-xl text-xs font-medium shadow-xs transition"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>

            {/* ========================================================
                MODAL: TAMBAH PROGRAM (Interactive)
               ======================================================== */}
            {isAddProgramOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#ede7dd] animate-in fade-in duration-200">
                        <div className="flex items-center justify-between pb-4 border-b border-[#ede7dd]">
                            <div>
                                <h3 className="font-serif text-xl font-normal text-[#1c1a17]">
                                    Tambah Program Baru
                                </h3>
                                <p className="text-xs text-[#78716c]">
                                    Lengkapi informasi program pelatihan baru.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsAddProgramOpen(false)}
                                className="p-1.5 text-[#8c827a] hover:text-[#1c1a17] rounded-lg hover:bg-[#f7f5f0]"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddProgramSubmit} className="mt-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-[#1c1a17] mb-1">
                                    Nama Program
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: International Runway Masterclass"
                                    value={newProgram.title}
                                    onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                                    className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">
                                        Kategori
                                    </label>
                                    <select
                                        value={newProgram.category}
                                        onChange={(e) => setNewProgram({ ...newProgram, category: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                    >
                                        <option value="Basic Modeling">Basic Modeling</option>
                                        <option value="Advanced Modeling">Advanced Modeling</option>
                                        <option value="Runway & Catwalk">Runway & Catwalk</option>
                                        <option value="Commercial Modeling">Commercial Modeling</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">
                                        Durasi
                                    </label>
                                    <input
                                        type="text"
                                        value={newProgram.duration}
                                        onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">
                                        Biaya Pelatihan
                                    </label>
                                    <input
                                        type="text"
                                        value={newProgram.price}
                                        onChange={(e) => setNewProgram({ ...newProgram, price: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-[#1c1a17] mb-1">
                                        Kuota Peserta
                                    </label>
                                    <input
                                        type="number"
                                        value={newProgram.quota}
                                        onChange={(e) => setNewProgram({ ...newProgram, quota: e.target.value })}
                                        className="w-full bg-[#fbfaf8] border border-[#ded7cb] rounded-xl px-3.5 py-2.5 text-xs text-[#1c1a17] focus:outline-none focus:border-[#1c1a17]"
                                    />
                                </div>
                            </div>

                            <div className="pt-3 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddProgramOpen(false)}
                                    className="px-4 py-2 rounded-xl text-xs font-medium text-[#78716c] hover:bg-[#f7f5f0]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-[#1c1a17] hover:bg-black text-white rounded-xl text-xs font-medium shadow-xs transition"
                                >
                                    Simpan Program
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL: PREVIEW SERTIFIKAT (Gold Luxury Design)
               ======================================================== */}
            {selectedCert && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-[#fffdf9] rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-4 border-[#d4af37] relative text-center">
                        <button
                            onClick={() => setSelectedCert(null)}
                            className="absolute top-4 right-4 p-2 text-[#8c827a] hover:text-[#1c1a17] rounded-full hover:bg-[#f7f5f0]"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="border-2 border-[#bfa888] p-8 rounded-2xl relative">
                            <span className="font-serif text-xl tracking-[0.4em] text-[#1c1a17] uppercase block">
                                S I L U E T
                            </span>
                            <span className="text-[9px] tracking-[0.3em] text-[#8c827a] font-semibold block mt-1 uppercase">
                                MODEL TALA ACADEMY
                            </span>

                            <div className="my-6">
                                <span className="font-serif italic text-base text-[#8c827a] block">
                                    Certificate of Professional Achievement
                                </span>
                                <span className="text-xs tracking-widest uppercase text-[#59524c] block mt-1">
                                    DIBERIKAN DENGAN BANGGA KEPADA
                                </span>
                                <h2 className="font-serif text-3xl font-bold text-[#1c1a17] mt-3">
                                    {selectedCert.studentName}
                                </h2>
                                <p className="text-xs text-[#68625c] max-w-md mx-auto mt-3 leading-relaxed">
                                    Telah menyelesaikan seluruh modul pelatihan resmi dan memenuhi standar kelulusan profesional pada program:
                                </p>
                                <h3 className="font-semibold text-sm text-[#1c1a17] mt-1.5 uppercase tracking-wide">
                                    {selectedCert.program}
                                </h3>
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
                                onClick={() => showToast('Mencetak sertifikat resmi ke printer...')}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1c1a17] text-white rounded-xl text-xs font-medium hover:bg-black transition"
                            >
                                <Printer className="w-4 h-4" />
                                Cetak PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================
                MODAL: LIHAT STRUK PEMBAYARAN
               ======================================================== */}
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
        </div>
    );
}
