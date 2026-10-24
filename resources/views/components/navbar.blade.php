<!-- ================= NAVBAR (Premium Liquid Glass) ================= -->
<header id="main-navbar" class="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-4 sm:pt-5 lg:pt-6 px-3 sm:px-6 lg:px-8 transition-all duration-300">
    <div class="liquid-glass-wrapper pointer-events-auto max-w-[1440px] w-[94%] sm:w-[92%] mx-auto relative">
        <div id="liquid-nav" class="liquid-glass-nav px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
            
            <!-- 1. Left: Logo / Brand Wordmark -->
            <a href="{{ url('/') }}" class="flex flex-col items-center justify-center group cursor-pointer text-center relative z-10 shrink-0 select-none">
                <span class="font-serif-luxury text-[20px] sm:text-[23px] lg:text-[25px] tracking-[0.28em] font-medium text-[#171513] uppercase leading-none transition group-hover:opacity-80">
                    SILUET
                </span>
                <span class="text-[7.5px] sm:text-[8px] tracking-[0.34em] text-[#8e857e] font-sans-luxury uppercase mt-0.5 sm:mt-1 font-semibold">
                    MODEL TALA
                </span>
            </a>

            <!-- 2. Middle: Desktop Nav Links -->
            <nav class="hidden md:flex items-center space-x-0.5 lg:space-x-1 font-sans-luxury relative z-10 bg-black/[0.025] p-1 rounded-full border border-black/[0.03]">
                <a href="{{ url('/women') }}" class="nav-pill-item {{ request()->is('women*') ? 'active' : '' }}" data-nav-target="women">Women</a>
                <a href="{{ url('/men') }}" class="nav-pill-item {{ request()->is('men*') ? 'active' : '' }}" data-nav-target="men">Men</a>
                <a href="{{ url('/kids') }}" class="nav-pill-item {{ request()->is('kids*') ? 'active' : '' }}" data-nav-target="kids">Kids</a>
                <a href="{{ url('/') }}" class="nav-pill-item {{ (request()->is('/') || request()->is('home*')) ? 'active' : '' }}" data-nav-target="beranda">Home</a>
                <a href="{{ url('/highlights') }}" class="nav-pill-item {{ request()->is('highlights*') ? 'active' : '' }}" data-nav-target="highlights">Highlights</a>
                <a href="{{ url('/modeling-school') }}" class="nav-pill-item {{ (request()->is('modeling*') || request()->is('program*')) ? 'active' : '' }}" data-nav-target="modeling">Modeling School</a>
                <a href="{{ url('/mentor') }}" class="nav-pill-item {{ request()->is('mentor*') ? 'active' : '' }}" data-nav-target="mentor">Mentor</a>
                <a href="{{ url('/about') }}" class="nav-pill-item {{ request()->is('about*') ? 'active' : '' }}" data-nav-target="aboutus">About Us</a>
                <a href="{{ url('/contact') }}" class="nav-pill-item {{ request()->is('contact*') ? 'active' : '' }}" data-nav-target="contact">Contact</a>
            </nav>

            <!-- 3. Right: Actions -->
            <div class="flex items-center space-x-2 sm:space-x-3 relative z-10 shrink-0">
                <!-- Search Icon Button -->
                <button type="button" id="search-btn" class="glass-icon-btn focus:outline-none" aria-label="Cari di Siluet Model Tala">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"/>
                    </svg>
                </button>

                <!-- Masuk (Desktop) -->
                <a href="{{ url('/login') }}" class="hidden sm:inline-flex items-center justify-center text-[13.5px] font-medium font-sans-luxury text-[#171513] hover:text-[#6e6761] px-3.5 py-1.5 rounded-full hover:bg-white/50 transition duration-200 {{ request()->is('login*') ? 'bg-white/70 font-semibold' : '' }}">
                    Member Login
                </a>

                <!-- Daftar Sekarang -->
                <a href="{{ url('/register') }}" class="glass-cta-btn font-sans-luxury text-center">
                    <span>Join Academy</span>
                </a>

                <!-- Mobile Hamburger Toggle -->
                <button type="button" id="mobile-toggle" class="md:hidden glass-icon-btn focus:outline-none" aria-label="Buka Menu" aria-expanded="false">
                    <svg id="hamburger-icon" class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"/>
                    </svg>
                    <svg id="close-icon" class="w-5 h-5 hidden transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

        </div>

        <!-- Mobile Liquid Glass Dropdown Menu -->
        <div id="mobile-menu" class="hidden md:hidden mt-2.5 mobile-liquid-panel p-5 font-sans-luxury transform transition-all duration-300 opacity-0 -translate-y-3">
            <nav class="flex flex-col space-y-1.5 pb-4 border-b border-[#171513]/10">
                <a href="{{ url('/women') }}" class="mobile-nav-link flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium {{ request()->is('women*') ? 'text-[#171513] bg-white/70 font-semibold shadow-xs' : 'text-[#59524c] hover:text-[#171513] hover:bg-white/40' }} transition">
                    <span>Women</span>
                </a>
                <a href="{{ url('/men') }}" class="mobile-nav-link flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium {{ request()->is('men*') ? 'text-[#171513] bg-white/70 font-semibold shadow-xs' : 'text-[#59524c] hover:text-[#171513] hover:bg-white/40' }} transition">
                    <span>Men</span>
                </a>
                <a href="{{ url('/kids') }}" class="mobile-nav-link flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium {{ request()->is('kids*') ? 'text-[#171513] bg-white/70 font-semibold shadow-xs' : 'text-[#59524c] hover:text-[#171513] hover:bg-white/40' }} transition">
                    <span>Kids</span>
                </a>
                <a href="{{ url('/') }}" class="mobile-nav-link flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium {{ (request()->is('/') || request()->is('home*')) ? 'text-[#171513] bg-white/70 font-semibold shadow-xs' : 'text-[#59524c] hover:text-[#171513] hover:bg-white/40' }} transition">
                    <span>Home</span>
                    @if(request()->is('/') || request()->is('home*'))
                    <span class="w-1.5 h-1.5 rounded-full bg-[#171513]"></span>
                    @endif
                </a>
                <a href="{{ url('/highlights') }}" class="mobile-nav-link flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium {{ request()->is('highlights*') ? 'text-[#171513] bg-white/70 font-semibold shadow-xs' : 'text-[#59524c] hover:text-[#171513] hover:bg-white/40' }} transition">
                    <span>Highlights</span>
                </a>
                <a href="{{ url('/modeling-school') }}" class="mobile-nav-link flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium {{ (request()->is('modeling*') || request()->is('program*')) ? 'text-[#171513] bg-white/70 font-semibold shadow-xs' : 'text-[#59524c] hover:text-[#171513] hover:bg-white/40' }} transition">
                    <span>Modeling School</span>
                </a>
                <a href="{{ url('/mentor') }}" class="mobile-nav-link flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium {{ request()->is('mentor*') ? 'text-[#171513] bg-white/70 font-semibold shadow-xs' : 'text-[#59524c] hover:text-[#171513] hover:bg-white/40' }} transition">
                    <span>Mentor</span>
                </a>
                <a href="{{ url('/about') }}" class="mobile-nav-link flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium {{ request()->is('about*') ? 'text-[#171513] bg-white/70 font-semibold shadow-xs' : 'text-[#59524c] hover:text-[#171513] hover:bg-white/40' }} transition">
                    <span>About Us</span>
                </a>
                <a href="{{ url('/contact') }}" class="mobile-nav-link flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium {{ request()->is('contact*') ? 'text-[#171513] bg-white/70 font-semibold shadow-xs' : 'text-[#59524c] hover:text-[#171513] hover:bg-white/40' }} transition">
                    <span>Contact</span>
                </a>
            </nav>
            <div class="pt-4 flex items-center justify-between gap-3">
                <a href="{{ url('/login') }}" class="mobile-nav-link flex-1 text-center text-sm font-medium text-[#171513] py-2.5 px-4 rounded-xl border border-white/60 bg-white/50 hover:bg-white/80 transition shadow-xs">
                    Member Login
                </a>
                <a href="{{ url('/register') }}" class="mobile-nav-link flex-1 text-center text-sm font-medium text-white py-2.5 px-4 rounded-xl bg-[#171513] hover:bg-[#2b2723] transition shadow-md">
                    Join Academy
                </a>
            </div>
        </div>
    </div>
</header>
