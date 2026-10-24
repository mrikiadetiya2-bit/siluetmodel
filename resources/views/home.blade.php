@extends('layouts.app')

@section('title', 'Siluet Model Tala - Shape Your Presence')

@section('content')
<style>
        /* Home Hero and Carousel Custom Utilities */

        /* Subtle luxury shadow */
        .luxury-card {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .luxury-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.07);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #f7f4ee;
        }
        ::-webkit-scrollbar-thumb {
            background: #c5baa8;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #a89a84;
        }

        /* ===================================================
           LIQUID GLASS NAVIGATION BAR (Apple visionOS Inspired)
           =================================================== */

        /* Smooth slide-down & fade entrance animation */
        @keyframes liquidNavEntrance {
            0% {
                opacity: 0;
                transform: translateY(-24px) scale(0.97);
                filter: blur(8px);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
                filter: blur(0);
            }
        }

        .liquid-glass-wrapper {
            animation: liquidNavEntrance 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            will-change: transform, opacity;
        }

        /* The Main Liquid Glass Capsule */
        .liquid-glass-nav {
            position: relative;
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.68) 0%,
                rgba(255, 255, 255, 0.46) 50%,
                rgba(252, 248, 242, 0.60) 100%
            );
            -webkit-backdrop-filter: blur(26px) saturate(190%) contrast(102%);
            backdrop-filter: blur(26px) saturate(190%) contrast(102%);
            border: 1px solid rgba(255, 255, 255, 0.75);
            box-shadow: 
                0 20px 42px -15px rgba(23, 21, 19, 0.08),
                0 6px 16px -4px rgba(23, 21, 19, 0.04),
                0 1px 2px 0 rgba(23, 21, 19, 0.02),
                inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.95),
                inset 0 -1px 2px 0 rgba(214, 201, 185, 0.25);
            border-radius: 9999px;
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Top Specular Glare / Refraction Pseudo-element */
        .liquid-glass-nav::before {
            content: '';
            position: absolute;
            top: 0;
            left: 6%;
            right: 6%;
            height: 48%;
            background: radial-gradient(
                ellipse at 50% 0%,
                rgba(255, 255, 255, 0.82) 0%,
                rgba(255, 255, 255, 0.25) 50%,
                rgba(255, 255, 255, 0) 100%
            );
            border-radius: 9999px 9999px 0 0;
            pointer-events: none;
            z-index: 1;
            opacity: 0.95;
            transition: opacity 0.35s ease;
        }

        /* Subtle Bottom Rim Light */
        .liquid-glass-nav::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 15%;
            right: 15%;
            height: 1px;
            background: linear-gradient(
                90deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(214, 201, 185, 0.55) 50%,
                rgba(255, 255, 255, 0) 100%
            );
            pointer-events: none;
            z-index: 1;
        }

        /* Scrolled Glass Material Elevation */
        .liquid-glass-nav.is-scrolled {
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.85) 0%,
                rgba(255, 255, 255, 0.72) 50%,
                rgba(250, 246, 240, 0.82) 100%
            );
            -webkit-backdrop-filter: blur(30px) saturate(200%) contrast(104%);
            backdrop-filter: blur(30px) saturate(200%) contrast(104%);
            border-color: rgba(255, 255, 255, 0.92);
            box-shadow: 
                0 24px 48px -12px rgba(23, 21, 19, 0.12),
                0 8px 20px -4px rgba(23, 21, 19, 0.06),
                0 1px 3px 0 rgba(23, 21, 19, 0.03),
                inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 1),
                inset 0 -1.5px 2px 0 rgba(214, 201, 185, 0.32);
        }

        /* Navigation Menu Pill Item */
        .nav-pill-item {
            position: relative;
            padding: 0.42rem 0.92rem;
            font-size: 0.875rem; /* ~14px */
            font-weight: 500;
            color: #4a4540;
            border-radius: 9999px;
            transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 2;
            letter-spacing: 0.01em;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
        }

        .nav-pill-item:hover {
            color: #171513;
            background: rgba(255, 255, 255, 0.65);
            box-shadow: 
                0 4px 12px -2px rgba(23, 21, 19, 0.05),
                inset 0 1px 1px 0 rgba(255, 255, 255, 0.9);
            transform: translateY(-1px);
        }

        .nav-pill-item.active {
            color: #171513;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.85);
            box-shadow: 
                0 4px 14px -3px rgba(23, 21, 19, 0.08),
                inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.95);
        }

        /* Tactile Glass Action Button (Search & Mobile Toggle) */
        .glass-icon-btn {
            width: 2.35rem;
            height: 2.35rem;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #171513;
            background: rgba(255, 255, 255, 0.42);
            border: 1px solid rgba(255, 255, 255, 0.68);
            box-shadow: 0 2px 6px -1px rgba(23, 21, 19, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.85);
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            z-index: 2;
            cursor: pointer;
        }

        .glass-icon-btn:hover {
            background: rgba(255, 255, 255, 0.9);
            border-color: rgba(255, 255, 255, 1);
            box-shadow: 0 4px 12px -2px rgba(23, 21, 19, 0.08), inset 0 1px 1px rgba(255, 255, 255, 1);
            transform: translateY(-1px) scale(1.03);
            color: #000000;
        }

        .glass-icon-btn:active {
            transform: translateY(0) scale(0.97);
        }

        /* Luxury Register CTA Button with Light Sweep Effect */
        .glass-cta-btn {
            background: #171513;
            color: #ffffff !important;
            border-radius: 9999px;
            padding: 0.52rem 1.35rem;
            font-size: 0.8125rem; /* 13px */
            font-weight: 500;
            letter-spacing: 0.03em;
            position: relative;
            overflow: hidden;
            z-index: 2;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 
                0 4px 14px 0 rgba(23, 21, 19, 0.2),
                0 1px 3px 0 rgba(23, 21, 19, 0.1),
                inset 0 1px 1px 0 rgba(255, 255, 255, 0.25);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .glass-cta-btn:hover {
            background: #2b2723;
            box-shadow: 
                0 6px 20px 0 rgba(23, 21, 19, 0.3),
                0 2px 5px 0 rgba(23, 21, 19, 0.15),
                inset 0 1px 1px 0 rgba(255, 255, 255, 0.4);
            transform: translateY(-1px) scale(1.02);
        }

        .glass-cta-btn:active {
            transform: translateY(0) scale(0.98);
        }

        .glass-cta-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 60%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.22),
                transparent
            );
            transform: skewX(-20deg);
            transition: left 0.65s ease;
        }

        .glass-cta-btn:hover::before {
            left: 140%;
        }

        /* Mobile Liquid Glass Dropdown Panel */
        .mobile-liquid-panel {
            background: linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.90) 0%,
                rgba(255, 255, 255, 0.78) 50%,
                rgba(250, 246, 240, 0.88) 100%
            );
            -webkit-backdrop-filter: blur(28px) saturate(190%) contrast(103%);
            backdrop-filter: blur(28px) saturate(190%) contrast(103%);
            border: 1px solid rgba(255, 255, 255, 0.85);
            border-radius: 1.75rem;
            box-shadow: 
                0 24px 50px -10px rgba(23, 21, 19, 0.14),
                0 10px 20px -5px rgba(23, 21, 19, 0.05),
                inset 0 1.5px 1.5px 0 rgba(255, 255, 255, 0.95),
                inset 0 -1px 2px 0 rgba(214, 201, 185, 0.25);
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Fallback for browsers without backdrop-filter support */
        @supports not ((-webkit-backdrop-filter: blur(20px)) or (backdrop-filter: blur(20px))) {
            .liquid-glass-nav {
                background: rgba(255, 255, 255, 0.96) !important;
            }
            .mobile-liquid-panel {
                background: rgba(255, 255, 255, 0.98) !important;
            }
        }

        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
            .liquid-glass-wrapper {
                animation: none !important;
            }
            .liquid-glass-nav,
            .nav-pill-item,
            .glass-icon-btn,
            .glass-cta-btn,
            .mobile-liquid-panel {
                transition-duration: 0.01ms !important;
            }
            .glass-cta-btn::before {
                display: none !important;
            }
        }
    </style>


    <!-- ================= HERO SECTION ================= -->
    <section id="beranda" class="relative bg-[#f7f4ee] overflow-hidden pt-24 sm:pt-28 lg:pt-32">
        <div class="max-w-[1360px] mx-auto px-6 lg:px-14">
            <div class="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[620px] items-stretch">
                
                <!-- Left Hero Content -->
                <div class="lg:col-span-6 pt-12 pb-12 lg:pt-16 lg:pb-16 flex flex-col justify-between z-10">
                    <div>
                        <!-- Eyebrow -->
                        <span class="text-[11.5px] uppercase tracking-[0.28em] text-[#8e857e] font-sans-luxury font-medium block mb-5">
                            M O R E &nbsp; T H A N &nbsp; A &nbsp; M O D E L
                        </span>

                        <!-- Main Headline -->
                        <h1 class="font-serif-luxury text-5xl sm:text-6xl lg:text-[72px] font-normal text-[#171513] leading-[1.08] tracking-tight mb-6">
                            Shape Your<br>
                            Presence
                        </h1>

                        <!-- Subtitle -->
                        <p class="text-[#6e6761] text-[15px] sm:text-[16px] leading-[1.7] max-w-[450px] mb-8 font-sans-luxury">
                            Siluet Model Tala adalah tempat untuk mengembangkan bakat, kepercayaan diri, dan profesionalisme di dunia modeling.
                        </p>

                        <!-- CTA Buttons -->
                        <div class="flex flex-wrap items-center gap-3.5 mb-14">
                            <a href="#program" class="inline-flex items-center gap-2.5 bg-[#171513] hover:bg-[#2c2824] text-white px-6 py-3 rounded-[6px] text-[13.5px] font-medium font-sans-luxury transition group shadow-sm">
                                <span>Lihat Program</span>
                                <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                            </a>
                            <a href="#tentang" class="inline-flex items-center bg-[#f7f4ee] hover:bg-white border border-[#ded8cf] text-[#171513] px-6 py-3 rounded-[6px] text-[13.5px] font-medium font-sans-luxury transition shadow-sm">
                                Tentang Kami
                            </a>
                        </div>
                    </div>

                    <!-- Hero Stats -->
                    <div class="grid grid-cols-3 gap-6 pt-6 border-t border-[#ede7dd]/80 max-w-[480px]">
                        <div>
                            <div class="font-serif-luxury text-3xl sm:text-4xl text-[#171513] font-normal tracking-tight">500+</div>
                            <div class="text-[12px] text-[#8e857e] font-sans-luxury mt-0.5">Alumni Sukses</div>
                        </div>
                        <div>
                            <div class="font-serif-luxury text-3xl sm:text-4xl text-[#171513] font-normal tracking-tight">20+</div>
                            <div class="text-[12px] text-[#8e857e] font-sans-luxury mt-0.5">Program Pelatihan</div>
                        </div>
                        <div>
                            <div class="font-serif-luxury text-3xl sm:text-4xl text-[#171513] font-normal tracking-tight">95%</div>
                            <div class="text-[12px] text-[#8e857e] font-sans-luxury mt-0.5">Kepuasan Peserta</div>
                        </div>
                    </div>
                </div>

                <!-- Right Hero Imagery -->
                <div class="lg:col-span-6 relative flex items-end justify-center lg:justify-end overflow-hidden select-none">
                    
                    <!-- Full Composition Image -->
                    <div class="relative w-full h-full flex items-end justify-center lg:justify-end">
                        <img 
                            src="{{ asset('images/site/hero_right_full.png') }}" 
                            alt="Siluet Model Tala" 
                            class="w-full max-w-[620px] h-auto max-h-[580px] lg:max-h-[620px] object-contain object-bottom"
                        />

                        <!-- Interactive Carousel Overlay on bottom right -->
                        <div class="absolute bottom-6 right-2 sm:right-6 flex items-center space-x-4 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50">
                            <!-- Indicator -->
                            <div class="text-[12px] font-sans-luxury text-[#544e47] tracking-wider" id="hero-slide-num">
                                <span id="current-slide">01</span> &nbsp;/&nbsp; 03
                            </div>

                            <!-- Buttons -->
                            <div class="flex items-center space-x-2">
                                <button type="button" id="hero-prev" class="w-8 h-8 rounded-full border border-[#d8d2c9] bg-white hover:bg-[#f7f4ee] flex items-center justify-center text-[#171513] transition active:scale-95 shadow-2xs" aria-label="Previous Slide">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                </button>
                                <button type="button" id="hero-next" class="w-8 h-8 rounded-full border border-[#d8d2c9] bg-white hover:bg-[#f7f4ee] flex items-center justify-center text-[#171513] transition active:scale-95 shadow-2xs" aria-label="Next Slide">
                                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </section>


    <!-- ================= PROGRAM UNGGULAN SECTION ================= -->
    <section id="program" class="py-20 lg:py-24 bg-[#ffffff]">
        <div class="max-w-[1360px] mx-auto px-6 lg:px-14">
            
            <!-- Section Header -->
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <span class="text-[11px] uppercase tracking-[0.25em] text-[#8e857e] font-sans-luxury font-medium block mb-3">
                        P R O G R A M &nbsp; U N G G U L A N
                    </span>
                    <h2 class="font-serif-luxury text-3xl sm:text-4xl text-[#171513] font-normal leading-tight">
                        Pilihan Pelatihan<br>
                        untuk Karier Modeling Anda
                    </h2>
                </div>
                <div class="flex flex-col md:items-end text-left md:text-right gap-3">
                    <p class="text-[#6e6761] text-[13.5px] leading-relaxed max-w-[420px] font-sans-luxury">
                        Program kami dirancang oleh para profesional industri fashion untuk membekali Anda dengan keterampilan yang relevan dan aplikatif.
                    </p>
                    <a href="#semua-program" class="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#171513] hover:opacity-75 transition font-sans-luxury underline underline-offset-4 decoration-[#171513]/40 hover:decoration-[#171513]">
                        <span>Lihat Semua Program</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- Program Cards Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <!-- Card 1: Basic Modeling -->
                <div class="luxury-card bg-[#ffffff] rounded-2xl border border-[#ede7dd] p-4 flex flex-col justify-between group">
                    <div>
                        <!-- Image Container -->
                        <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f5f2eb] mb-4">
                            <img 
                                src="{{ asset('images/site/card_basic.png') }}" 
                                alt="Basic Modeling" 
                                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <!-- Card Header -->
                        <h3 class="font-sans-luxury text-[17px] font-semibold text-[#171513] mb-1.5">
                            Basic Modeling
                        </h3>
                        <p class="text-[#756f68] text-[12.5px] leading-relaxed mb-4 font-sans-luxury">
                            Untuk pemula yang ingin membangun dasar dunia modeling.
                        </p>

                        <!-- Features -->
                        <div class="space-y-2 mb-5 font-sans-luxury text-[12px] text-[#635c55]">
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/>
                                </svg>
                                <span>8 Sesi</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                                <span>Pemula</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                <span>Sertifikat</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card Footer -->
                    <div class="pt-3 border-t border-[#f2ede6] flex items-center justify-between">
                        <span class="font-sans-luxury text-[15.5px] font-semibold text-[#171513]">
                            Rp 2.500.000
                        </span>
                        <a href="#daftar" class="w-8 h-8 rounded-full bg-[#c2b29f] hover:bg-[#aa9781] text-white flex items-center justify-center transition group-hover:rotate-45" aria-label="Pilih Basic Modeling">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Card 2: Advanced Modeling -->
                <div class="luxury-card bg-[#ffffff] rounded-2xl border border-[#ede7dd] p-4 flex flex-col justify-between group">
                    <div>
                        <!-- Image Container -->
                        <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f5f2eb] mb-4">
                            <img 
                                src="{{ asset('images/site/card_advanced.png') }}" 
                                alt="Advanced Modeling" 
                                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <!-- Card Header -->
                        <h3 class="font-sans-luxury text-[17px] font-semibold text-[#171513] mb-1.5">
                            Advanced Modeling
                        </h3>
                        <p class="text-[#756f68] text-[12.5px] leading-relaxed mb-4 font-sans-luxury">
                            Tingkatkan kemampuan pose, catwalk, dan personal branding.
                        </p>

                        <!-- Features -->
                        <div class="space-y-2 mb-5 font-sans-luxury text-[12px] text-[#635c55]">
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/>
                                </svg>
                                <span>12 Sesi</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                                <span>Menengah</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                <span>Sertifikat</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card Footer -->
                    <div class="pt-3 border-t border-[#f2ede6] flex items-center justify-between">
                        <span class="font-sans-luxury text-[15.5px] font-semibold text-[#171513]">
                            Rp 3.500.000
                        </span>
                        <a href="#daftar" class="w-8 h-8 rounded-full bg-[#c2b29f] hover:bg-[#aa9781] text-white flex items-center justify-center transition group-hover:rotate-45" aria-label="Pilih Advanced Modeling">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Card 3: Runway & Catwalk -->
                <div class="luxury-card bg-[#ffffff] rounded-2xl border border-[#ede7dd] p-4 flex flex-col justify-between group">
                    <div>
                        <!-- Image Container -->
                        <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f5f2eb] mb-4">
                            <img 
                                src="{{ asset('images/site/card_runway.png') }}" 
                                alt="Runway & Catwalk" 
                                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <!-- Card Header -->
                        <h3 class="font-sans-luxury text-[17px] font-semibold text-[#171513] mb-1.5">
                            Runway & Catwalk
                        </h3>
                        <p class="text-[#756f68] text-[12.5px] leading-relaxed mb-4 font-sans-luxury">
                            Latihan teknik berjalan di runway bersama mentor berpengalaman.
                        </p>

                        <!-- Features -->
                        <div class="space-y-2 mb-5 font-sans-luxury text-[12px] text-[#635c55]">
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/>
                                </svg>
                                <span>10 Sesi</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                                <span>Menengah</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                <span>Sertifikat</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card Footer -->
                    <div class="pt-3 border-t border-[#f2ede6] flex items-center justify-between">
                        <span class="font-sans-luxury text-[15.5px] font-semibold text-[#171513]">
                            Rp 3.000.000
                        </span>
                        <a href="#daftar" class="w-8 h-8 rounded-full bg-[#c2b29f] hover:bg-[#aa9781] text-white flex items-center justify-center transition group-hover:rotate-45" aria-label="Pilih Runway & Catwalk">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Card 4: Commercial Modeling -->
                <div class="luxury-card bg-[#ffffff] rounded-2xl border border-[#ede7dd] p-4 flex flex-col justify-between group">
                    <div>
                        <!-- Image Container -->
                        <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f5f2eb] mb-4">
                            <img 
                                src="{{ asset('images/site/card_commercial.png') }}" 
                                alt="Commercial Modeling" 
                                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <!-- Card Header -->
                        <h3 class="font-sans-luxury text-[17px] font-semibold text-[#171513] mb-1.5">
                            Commercial Modeling
                        </h3>
                        <p class="text-[#756f68] text-[12.5px] leading-relaxed mb-4 font-sans-luxury">
                            Persiapan untuk photoshoot, iklan, dan media komersial.
                        </p>

                        <!-- Features -->
                        <div class="space-y-2 mb-5 font-sans-luxury text-[12px] text-[#635c55]">
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/>
                                </svg>
                                <span>10 Sesi</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                                <span>Menengah</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                </svg>
                                <span>Sertifikat</span>
                            </div>
                        </div>
                    </div>

                    <!-- Card Footer -->
                    <div class="pt-3 border-t border-[#f2ede6] flex items-center justify-between">
                        <span class="font-sans-luxury text-[15.5px] font-semibold text-[#171513]">
                            Rp 3.000.000
                        </span>
                        <a href="#daftar" class="w-8 h-8 rounded-full bg-[#c2b29f] hover:bg-[#aa9781] text-white flex items-center justify-center transition group-hover:rotate-45" aria-label="Pilih Commercial Modeling">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                        </a>
                    </div>
                </div>

            </div>

        </div>
    </section>


    <!-- ================= VALUE PROPOSITION BAR ================= -->
    <section class="border-y border-[#ede7dd] bg-[#faf8f5]/60 py-12">
        <div class="max-w-[1360px] mx-auto px-6 lg:px-14">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y sm:divide-y-0 sm:divide-x divide-[#ede7dd]">
                
                <!-- Feature 1 -->
                <div class="flex items-start space-x-4 pt-4 sm:pt-0 sm:px-4 first:pl-0">
                    <div class="shrink-0 text-[#171513] mt-1">
                        <!-- Diamond Icon -->
                        <svg class="w-8 h-8 stroke-[1.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 3h12l4 6-10 12L2 9l4-6z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2 9h20M12 21L8 9M12 21l4-12M6 3l2 6M18 3l-2 6"/>
                        </svg>
                    </div>
                    <div>
                        <h4 class="font-sans-luxury text-[15px] font-semibold text-[#171513] mb-1">
                            Mentor Profesional
                        </h4>
                        <p class="font-sans-luxury text-[12.5px] text-[#706962] leading-snug">
                            Dibimbing oleh praktisi industri fashion.
                        </p>
                    </div>
                </div>

                <!-- Feature 2 -->
                <div class="flex items-start space-x-4 pt-6 sm:pt-0 sm:px-4">
                    <div class="shrink-0 text-[#171513] mt-1">
                        <!-- Star Icon -->
                        <svg class="w-8 h-8 stroke-[1.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                        </svg>
                    </div>
                    <div>
                        <h4 class="font-sans-luxury text-[15px] font-semibold text-[#171513] mb-1">
                            Kurikulum Terstruktur
                        </h4>
                        <p class="font-sans-luxury text-[12.5px] text-[#706962] leading-snug">
                            Materi lengkap dari dasar hingga level profesional.
                        </p>
                    </div>
                </div>

                <!-- Feature 3 -->
                <div class="flex items-start space-x-4 pt-6 sm:pt-0 sm:px-4">
                    <div class="shrink-0 text-[#171513] mt-1">
                        <!-- People / Network Icon -->
                        <svg class="w-8 h-8 stroke-[1.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                    <div>
                        <h4 class="font-sans-luxury text-[15px] font-semibold text-[#171513] mb-1">
                            Networking Luas
                        </h4>
                        <p class="font-sans-luxury text-[12.5px] text-[#706962] leading-snug">
                            Kesempatan terhubung dengan agensi dan brand.
                        </p>
                    </div>
                </div>

                <!-- Feature 4 -->
                <div class="flex items-start space-x-4 pt-6 sm:pt-0 sm:px-4">
                    <div class="shrink-0 text-[#171513] mt-1">
                        <!-- Briefcase / Diploma Icon -->
                        <svg class="w-8 h-8 stroke-[1.4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <div>
                        <h4 class="font-sans-luxury text-[15px] font-semibold text-[#171513] mb-1">
                            Sertifikat Resmi
                        </h4>
                        <p class="font-sans-luxury text-[12.5px] text-[#706962] leading-snug">
                            Dapatkan sertifikat sebagai bukti kompetensi.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- ================= SPLIT SECTION: TENTANG SILUET MODEL TALA & TESTIMONI ================= -->
    <section id="tentang" class="py-20 lg:py-24 bg-[#ffffff]">
        <div class="max-w-[1360px] mx-auto px-6 lg:px-14">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                <!-- Left: Tentang Siluet Model Tala (Col 7) -->
                <div class="lg:col-span-7">
                    <span class="text-[11px] uppercase tracking-[0.25em] text-[#8e857e] font-sans-luxury font-medium block mb-3">
                        T E N T A N G &nbsp; S I L U E T &nbsp; M O D E L &nbsp; T A L A
                    </span>
                    <h2 class="font-serif-luxury text-3xl sm:text-4xl text-[#171513] font-normal leading-tight mb-5">
                        Membangun Generasi<br>
                        Model yang Berkelas
                    </h2>
                    <p class="text-[#68625c] text-[13.5px] lg:text-[14px] leading-relaxed max-w-[480px] mb-7 font-sans-luxury">
                        Siluet Model Tala percaya bahwa setiap individu memiliki potensi untuk tampil percaya diri dan berkarier di dunia modeling. Kami hadir dengan program pelatihan berkualitas, mentor berpengalaman, dan lingkungan yang mendukung perkembangan Anda.
                    </p>
                    
                    <a href="#tentang-detail" class="inline-flex items-center gap-2.5 bg-[#171513] hover:bg-[#2c2824] text-white px-6 py-3 rounded-[6px] text-[13px] font-medium font-sans-luxury transition group mb-10 shadow-sm">
                        <span>Lebih Mengenal Kami</span>
                        <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </a>

                    <!-- About Image Composition -->
                    <div class="w-full max-w-[540px]">
                        <img 
                            src="{{ asset('images/site/about_composite.png') }}" 
                            alt="Tentang Siluet Model Tala" 
                            class="w-full h-auto object-contain rounded-xl shadow-xs"
                        />
                    </div>
                </div>

                <!-- Right: Testimoni (Col 5) -->
                <div class="lg:col-span-5 pt-4 lg:pt-0">
                    
                    <!-- Header with Arrows -->
                    <div class="flex items-center justify-between mb-8">
                        <div>
                            <span class="text-[11px] uppercase tracking-[0.25em] text-[#8e857e] font-sans-luxury font-medium block mb-2">
                                T E S T I M O N I
                            </span>
                            <h3 class="font-serif-luxury text-2xl sm:text-3xl text-[#171513] font-normal">
                                Apa Kata Mereka?
                            </h3>
                        </div>

                        <!-- Testimonial Slider Controls -->
                        <div class="flex items-center space-x-2">
                            <button type="button" id="testi-prev" class="w-8 h-8 rounded-full border border-[#d8d2c9] bg-white hover:bg-[#f7f4ee] flex items-center justify-center text-[#171513] transition active:scale-95 shadow-2xs" aria-label="Previous Testimonial">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
                                </svg>
                            </button>
                            <button type="button" id="testi-next" class="w-8 h-8 rounded-full border border-[#d8d2c9] bg-white hover:bg-[#f7f4ee] flex items-center justify-center text-[#171513] transition active:scale-95 shadow-2xs" aria-label="Next Testimonial">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Testimonial Card -->
                    <div class="bg-[#faf8f5] rounded-2xl p-7 border border-[#ede7dd] relative transition-all duration-300" id="testi-card">
                        
                        <!-- Top Quote Mark -->
                        <div class="text-[#e2dacb] font-serif-luxury text-5xl leading-none -mb-3 select-none">
                            “
                        </div>

                        <!-- Quote Text -->
                        <p class="text-[#4e4842] text-[13.5px] sm:text-[14px] leading-relaxed mb-6 font-sans-luxury" id="testi-quote">
                            Pelatihannya sangat profesional dan membantu saya lebih percaya diri. Sekarang saya sudah mendapatkan kesempatan untuk ikut fashion show dan photoshoot komersial.
                        </p>

                        <!-- Author & Rating Row -->
                        <div class="flex items-center justify-between pt-4 border-t border-[#eee7dc]">
                            <!-- Author Profile -->
                            <div class="flex items-center space-x-3.5">
                                <img 
                                    src="{{ asset('images/site/avatar_nadia.png') }}" 
                                    alt="Nadia Putri" 
                                    class="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-2xs"
                                    id="testi-avatar"
                                />
                                <div>
                                    <h4 class="font-sans-luxury text-[13.5px] font-bold text-[#171513]" id="testi-name">
                                        Nadia Putri
                                    </h4>
                                    <p class="font-sans-luxury text-[11px] text-[#8e857e]" id="testi-role">
                                        Alumni Basic Modeling 2024
                                    </p>
                                </div>
                            </div>

                            <!-- Star Rating -->
                            <div class="flex items-center space-x-0.5 text-[#d49e4e]" aria-label="5 out of 5 stars">
                                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </section>


@endsection

@push('scripts')
<script>
        // Hero Slide Indicator interactive
        let currentSlide = 1;
        const totalSlides = 3;
        const slideEl = document.getElementById('current-slide');
        const prevHeroBtn = document.getElementById('hero-prev');
        const nextHeroBtn = document.getElementById('hero-next');

        if (prevHeroBtn && nextHeroBtn && slideEl) {
            prevHeroBtn.addEventListener('click', () => {
                currentSlide = currentSlide > 1 ? currentSlide - 1 : totalSlides;
                slideEl.textContent = currentSlide < 10 ? '0' + currentSlide : currentSlide;
            });
            nextHeroBtn.addEventListener('click', () => {
                currentSlide = currentSlide < totalSlides ? currentSlide + 1 : 1;
                slideEl.textContent = currentSlide < 10 ? '0' + currentSlide : currentSlide;
            });
        }

        // Testimonial Carousel Data
        const testimonials = [
            {
                quote: "Pelatihannya sangat profesional dan membantu saya lebih percaya diri. Sekarang saya sudah mendapatkan kesempatan untuk ikut fashion show dan photoshoot komersial.",
                name: "Nadia Putri",
                role: "Alumni Basic Modeling 2024",
                avatar: "{{ asset('images/site/avatar_nadia.png') }}"
            },
            {
                quote: "Kurikulum runway & catwalk di Siluet Model Tala benar-benar mengubah cara saya berjalan dan postur tubuh. Mentornya sangat sabar dan detail dalam memberi evaluasi.",
                name: "Jessica Tania",
                role: "Alumni Runway & Catwalk 2024",
                avatar: "{{ asset('images/site/card_commercial.png') }}"
            },
            {
                quote: "Networking yang dibangun Siluet Model Tala sangat membantu karier saya. Setelah lulus, saya langsung terhubung dengan dua agensi fashion ternama di Jakarta.",
                name: "Aura Clarissa",
                role: "Alumni Advanced Modeling 2023",
                avatar: "{{ asset('images/site/card_advanced.png') }}"
            }
        ];

        let currentTestiIndex = 0;
        const testiQuote = document.getElementById('testi-quote');
        const testiName = document.getElementById('testi-name');
        const testiRole = document.getElementById('testi-role');
        const testiAvatar = document.getElementById('testi-avatar');
        const testiPrev = document.getElementById('testi-prev');
        const testiNext = document.getElementById('testi-next');

        function updateTestimonial(idx) {
            if (!testiQuote) return;
            const item = testimonials[idx];
            testiQuote.style.opacity = '0';
            setTimeout(() => {
                testiQuote.textContent = item.quote;
                testiName.textContent = item.name;
                testiRole.textContent = item.role;
                testiAvatar.src = item.avatar;
                testiQuote.style.opacity = '1';
            }, 180);
        }

        if (testiPrev && testiNext) {
            testiPrev.addEventListener('click', () => {
                currentTestiIndex = (currentTestiIndex - 1 + testimonials.length) % testimonials.length;
                updateTestimonial(currentTestiIndex);
            });
            testiNext.addEventListener('click', () => {
                currentTestiIndex = (currentTestiIndex + 1) % testimonials.length;
                updateTestimonial(currentTestiIndex);
            });
    </script>
@endpush

