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

        @media (min-width: 1536px) {
            .nav-pill-item {
                padding-inline: 0.58rem;
                font-size: 0.8125rem;
                white-space: nowrap;
            }
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
    <section id="beranda" class="relative bg-[#f7f4ee] overflow-hidden pt-28 sm:pt-32 pb-16 lg:pb-20">

        <!-- Subtle ambient radial light -->
        <div class="absolute -top-32 right-10 w-[700px] h-[700px] rounded-full pointer-events-none blur-3xl opacity-60" style="background:radial-gradient(ellipse at center, rgba(234,222,204,0.7) 0%, transparent 70%);"></div>

        <div class="max-w-[1380px] mx-auto px-6 lg:px-14 relative z-10">
            
            <!-- TOP HERO ROW -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[480px] lg:min-h-[540px]">

                <!-- Left Content Column -->
                <div class="lg:col-span-5 flex flex-col justify-center z-10 pr-0 lg:pr-4">

                    <!-- Eyebrow with dash line -->
                    <div class="flex items-center gap-3 mb-6">
                        <span class="w-8 h-[1.5px] bg-[#8e857e]/60"></span>
                        <span class="text-[11px] uppercase tracking-[0.28em] text-[#8e857e] font-sans-luxury font-semibold">MORE THAN A MODEL</span>
                    </div>

                    <!-- Main Headline -->
                    <h1 class="font-serif-luxury text-5xl sm:text-6xl lg:text-[76px] font-normal text-[#171513] leading-[1.05] tracking-tight mb-6">
                        Shape Your<br>
                        Presence
                    </h1>

                    <!-- Subtitle -->
                    <p class="text-[#6e6761] text-[15px] sm:text-[16px] leading-[1.7] max-w-[430px] mb-8 font-sans-luxury">
                        Siluet Model Tala adalah tempat untuk mengembangkan bakat, kepercayaan diri, dan profesionalisme di dunia modeling.
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-wrap items-center gap-3.5 mb-12">
                        <a href="#program" class="inline-flex items-center gap-2.5 bg-[#171513] hover:bg-[#2c2824] text-white px-7 py-3.5 rounded-full text-[13px] font-medium font-sans-luxury transition-all duration-300 shadow-lg shadow-black/10 hover:-translate-y-0.5 group">
                            <span>Lihat Program</span>
                            <svg class="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                        <a href="#tentang" class="inline-flex items-center bg-transparent hover:bg-white/70 border border-[#d8d0c2] text-[#171513] px-7 py-3.5 rounded-full text-[13px] font-medium font-sans-luxury transition-all duration-300 hover:-translate-y-0.5 shadow-sm">
                            Tentang Kami
                        </a>
                    </div>

                    <!-- Hero Stats -->
                    <div class="grid grid-cols-3 gap-6 pt-6 border-t border-[#ede7dd]/90 max-w-[450px]">
                        <div>
                            <div class="font-serif-luxury text-3xl sm:text-4xl text-[#171513] font-normal tracking-tight">500+</div>
                            <div class="text-[10.5px] text-[#8e857e] font-sans-luxury uppercase tracking-wider mt-1">Alumni Sukses</div>
                        </div>
                        <div>
                            <div class="font-serif-luxury text-3xl sm:text-4xl text-[#171513] font-normal tracking-tight">20+</div>
                            <div class="text-[10.5px] text-[#8e857e] font-sans-luxury uppercase tracking-wider mt-1">Program Pelatihan</div>
                        </div>
                        <div>
                            <div class="font-serif-luxury text-3xl sm:text-4xl text-[#171513] font-normal tracking-tight">95%</div>
                            <div class="text-[10.5px] text-[#8e857e] font-sans-luxury uppercase tracking-wider mt-1">Kepuasan Peserta</div>
                        </div>
                    </div>

                </div>

                <!-- Right Imagery Column: Arch + Model + Slide Nav -->
                <div class="lg:col-span-7 relative flex items-end justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] select-none">
                    
                    <!-- Outer Architectural Arch -->
                    <div class="absolute bottom-0 w-[380px] sm:w-[460px] lg:w-[500px] h-[430px] sm:h-[490px] lg:h-[540px] rounded-t-full bg-gradient-to-b from-[#eadecc]/60 via-[#eee7db]/35 to-transparent border-t border-x border-[#e4d8c6]/70 pointer-events-none"></div>

                    <!-- Inner Decorative Arch -->
                    <div class="absolute bottom-0 w-[330px] sm:w-[410px] lg:w-[450px] h-[390px] sm:h-[450px] lg:h-[490px] rounded-t-full border-t border-x border-[#ded2c0]/45 pointer-events-none"></div>

                    <!-- Central Model Cutout Carousel -->
                    <div class="hero-carousel-container relative w-full h-[460px] sm:h-[520px] lg:h-[580px] flex items-end justify-center z-10">

                        <!-- Slide 1: Nadia (Blue Hijab & White Cape) -->
                        <div class="hero-slide absolute bottom-0 flex justify-center items-end transition-opacity duration-700 ease-in-out opacity-100 z-10" data-slide="1">
                            <img 
                                src="{{ asset('images/site/cutout_nadia.png') }}" 
                                alt="Siluet Model Tala - Nadia Putri" 
                                class="h-[430px] sm:h-[490px] lg:h-[550px] w-auto max-w-full object-contain object-bottom drop-shadow-md"
                            />
                        </div>

                        <!-- Slide 2: Marwa (Black Blazer) -->
                        <div class="hero-slide absolute bottom-0 flex justify-center items-end transition-opacity duration-700 ease-in-out opacity-0 z-0 pointer-events-none" data-slide="2">
                            <img 
                                src="{{ asset('images/site/cutout_marwa.png') }}" 
                                alt="Siluet Model Tala - Marwa" 
                                class="h-[420px] sm:h-[480px] lg:h-[540px] w-auto max-w-full object-contain object-bottom drop-shadow-md"
                            />
                        </div>

                        <!-- Slide 3: Aura (Black Turtleneck) -->
                        <div class="hero-slide absolute bottom-0 flex justify-center items-end transition-opacity duration-700 ease-in-out opacity-0 z-0 pointer-events-none" data-slide="3">
                            <img 
                                src="{{ asset('images/site/cutout_aura.png') }}" 
                                alt="Siluet Model Tala - Aura Clarissa" 
                                class="h-[420px] sm:h-[480px] lg:h-[530px] w-auto max-w-full object-contain object-bottom drop-shadow-md"
                            />
                        </div>

                    </div>

                </div>

            </div>

            <!-- BOTTOM TWO FEATURE CARDS -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12 sm:mt-16 z-20 relative">

                <!-- Card 1: NEW FACES -->
                <div class="group bg-[#ece5d8]/85 hover:bg-[#eae2d5] transition-all duration-300 backdrop-blur-md rounded-[28px] border border-white/60 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[230px] sm:min-h-[250px] shadow-sm">
                    
                    <!-- Large Faint Watermark Text -->
                    <div class="absolute left-6 bottom-4 select-none pointer-events-none font-serif-luxury text-4xl sm:text-5xl font-light text-[#ded6c7]/70 leading-none tracking-tight">
                        NEW<br>FACES
                    </div>

                    <!-- Top Content -->
                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2.5">
                            <span class="w-5 h-px bg-[#8e857e]/70"></span>
                            <span class="text-[10px] uppercase tracking-[0.25em] text-[#8e857e] font-sans-luxury font-semibold">NEW FACES</span>
                        </div>
                        <p class="text-[#6e6761] text-[13px] sm:text-[14px] leading-relaxed max-w-[210px] sm:max-w-[240px] font-sans-luxury">
                            Temukan talenta baru dengan potensi luar biasa.
                        </p>
                    </div>

                    <!-- Bottom Action Link -->
                    <div class="relative z-10 pt-8 sm:pt-10">
                        <a href="#highlights" class="inline-flex items-center gap-3 group/link">
                            <span class="w-8 h-8 rounded-full bg-[#171513] group-hover/link:bg-[#2c2824] text-white flex items-center justify-center transition shadow-sm">
                                <svg class="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                            </span>
                            <span class="text-[12.5px] font-medium text-[#171513] group-hover/link:opacity-75 transition font-sans-luxury">
                                Lihat Selengkapnya
                            </span>
                        </a>
                    </div>

                    <!-- Model Cutout: Aura Clarissa -->
                    <img 
                        src="{{ asset('images/site/cutout_aura.png') }}" 
                        alt="New Faces - Aura Clarissa" 
                        class="absolute right-0 sm:right-2 bottom-0 h-[92%] sm:h-[105%] max-w-[48%] object-contain object-bottom pointer-events-none select-none z-10 drop-shadow-sm"
                    />
                </div>

                <!-- Card 2: MODEL PORTFOLIO -->
                <div class="group bg-[#ece5d8]/85 hover:bg-[#eae2d5] transition-all duration-300 backdrop-blur-md rounded-[28px] border border-white/60 p-6 sm:p-8 pr-28 sm:pr-32 relative overflow-hidden flex flex-col justify-between min-h-[230px] sm:min-h-[250px] shadow-sm">

                    <!-- Top Content -->
                    <div class="relative z-10">
                        <div class="flex items-center gap-2 mb-2.5">
                            <span class="w-5 h-px bg-[#8e857e]/70"></span>
                            <span class="text-[10px] uppercase tracking-[0.25em] text-[#8e857e] font-sans-luxury font-semibold">MODEL PORTFOLIO</span>
                        </div>
                        <p class="text-[#6e6761] text-[13px] sm:text-[14px] leading-relaxed max-w-[210px] sm:max-w-[240px] font-sans-luxury">
                            Eksplorasi karya dan perjalanan para model Siluet Model Tala.
                        </p>
                    </div>

                    <!-- Bottom Action Link -->
                    <div class="relative z-10 pt-8 sm:pt-10">
                        <a href="#highlights" class="inline-flex items-center gap-3 group/link">
                            <span class="w-8 h-8 rounded-full bg-[#ded6c7] group-hover/link:bg-[#171513] text-[#171513] group-hover/link:text-white flex items-center justify-center transition shadow-2xs">
                                <svg class="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                                </svg>
                            </span>
                            <span class="text-[12.5px] font-medium text-[#171513] group-hover/link:opacity-75 transition font-sans-luxury">
                                Explore Models ↗
                            </span>
                        </a>
                    </div>

                    <!-- Model Cutout: Marwa -->
                    <img 
                        src="{{ asset('images/site/cutout_marwa.png') }}" 
                        alt="Model Portfolio - Marwa" 
                        class="absolute right-[88px] sm:right-[108px] lg:right-[120px] bottom-0 h-[100%] sm:h-[110%] max-w-[46%] object-contain object-bottom pointer-events-none select-none z-10 drop-shadow-sm"
                    />

                    <!-- Far Right Vertical Strip -->
                    <div class="absolute right-0 top-0 bottom-0 w-24 sm:w-28 border-l border-[#ded6c7]/80 bg-[#e4dcce]/50 flex flex-col justify-between items-center py-4 px-2 select-none z-20">
                        <!-- Background Silhouette Overlay -->
                        <img 
                            src="{{ asset('images/site/hero_slide_3.png') }}" 
                            alt="" 
                            class="absolute inset-0 w-full h-full object-cover object-center opacity-15 grayscale pointer-events-none"
                        />

                        <!-- Top Keywords List -->
                        <div class="relative z-10 space-y-1 text-center pt-1">
                            <div class="text-[8.5px] uppercase tracking-[0.2em] text-[#7d756d] font-sans-luxury font-semibold">TALENT</div>
                            <div class="text-[8.5px] uppercase tracking-[0.2em] text-[#7d756d] font-sans-luxury font-semibold">DISCIPLINE</div>
                            <div class="text-[8.5px] uppercase tracking-[0.2em] text-[#7d756d] font-sans-luxury font-semibold">CONFIDENCE</div>
                            <div class="text-[8.5px] uppercase tracking-[0.2em] text-[#7d756d] font-sans-luxury font-semibold">OPPORTUNITY</div>
                            <div class="w-6 h-px bg-[#8e857e]/50 mx-auto !my-2"></div>
                        </div>

                        <!-- Bottom Brand Mark -->
                        <div class="relative z-10 text-center pb-1">
                            <div class="font-serif-luxury text-[11px] font-bold tracking-widest text-[#171513] uppercase leading-none">
                                SILUET
                            </div>
                            <div class="text-[7.5px] font-sans-luxury tracking-[0.25em] text-[#8e857e] font-medium uppercase mt-0.5">
                                MODEL TALA
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </section>


    <!-- ================= VIRTUAL RUNWAY & LOOKBOOK (TRY THE LOOK - SEAMLESS STAGE) ================= -->
    @php
        $defaultRunwayModels = [
            [
                'id' => 1,
                'name' => 'M. Fajar Shadiq',
                'role' => 'Putera Kebudayaan Kalsel 2024',
                'category' => 'Pageant & Runway',
                'lookTitle' => 'Sasirangan Heritage Blazer with Formal Inner',
                'lookDesc' => 'Blazer batik sasirangan modern tosca laut dipadu kemeja hitam formal dan selendang resmi Putera Kebudayaan Kalsel 2024.',
                'designer' => 'Siluet Etnik',
                'height' => '180 cm',
                'bookingText' => 'Konsultasi Booking Putera Kebudayaan',
                'image' => asset('images/lineup/model_putera.png'),
            ],
            [
                'id' => 2,
                'name' => 'Marwa Al-Zahra',
                'role' => 'Professional Runway & Commercial Model',
                'category' => 'Smart Casual & Runway',
                'lookTitle' => 'Modern Tailored Cape Blazer with Belt Accent',
                'lookDesc' => 'Busana elegan serba putih aksen jubah modern dipadu hijab navy kontras dan ikat pinggang ramping emas.',
                'designer' => 'Siluet Signature',
                'height' => '174 cm',
                'bookingText' => 'Konsultasi Booking Model Runway',
                'image' => asset('images/lineup/model_marwa_full.png'),
            ],
            [
                'id' => 3,
                'name' => 'Siti Nur Azizah',
                'role' => 'Wakil IV Galuh Kalimantan Selatan',
                'category' => 'Traditional Pageant',
                'lookTitle' => 'Busana Adat Sasirangan Galuh Banjar',
                'lookDesc' => 'Kebaya adat Banjar bertabur manik emas dengan kerudung selendang fuchsia bordir keemasan dan rok marun beludru.',
                'designer' => 'Giri Wangi & Siluet',
                'height' => '168 cm',
                'bookingText' => 'Konsultasi Booking Galuh Banjar',
                'image' => asset('images/lineup/model_galuh.png'),
            ],
            [
                'id' => 4,
                'name' => 'Rian Pratama',
                'role' => 'Male Editorial & Fashion Week Alumni',
                'category' => 'Menswear & Commercial',
                'lookTitle' => 'Midnight Black Tailored Two-Piece Suit',
                'lookDesc' => 'Setelan jas pria modern fitted dengan kemeja putih klasik berkancing terbuka dan sepatu pantofel kulit mengkilap.',
                'designer' => 'Siluet Menswear',
                'height' => '182 cm',
                'bookingText' => 'Konsultasi Booking Male Model',
                'image' => asset('images/lineup/model_suit.png'),
            ],
            [
                'id' => 5,
                'name' => 'Callysta Aurelia',
                'role' => 'Kids & Teen Modeling Prodigy',
                'category' => 'Kids Modeling School',
                'lookTitle' => 'Pastel Street Chic & Pleated Skirt',
                'lookDesc' => 'Jaket denim pastel pink dengan turtleneck rajut beige dan rok lipit ivory, dipadukan high-socks dan chunky heels youthful.',
                'designer' => 'Siluet Kids Wardrobe',
                'height' => '152 cm',
                'bookingText' => 'Konsultasi Booking Kids Model',
                'image' => asset('images/lineup/model_kids.png'),
            ],
        ];

        $activeRunwayList = [];
        if (isset($runwayModels) && $runwayModels->isNotEmpty()) {
            foreach ($runwayModels as $idx => $record) {
                $d = $record->data ?? [];
                $img = $d['image'] ?? null;
                if ($img && !str_starts_with($img, 'http') && !str_starts_with($img, '/')) {
                    $img = '/' . $img;
                }
                $activeRunwayList[] = [
                    'id' => $record->id,
                    'name' => $d['name'] ?? 'Model Siluet',
                    'role' => $d['role'] ?? 'Model Siluet Tala',
                    'category' => $d['category'] ?? 'Runway',
                    'lookTitle' => $d['lookTitle'] ?? 'Koleksi Busana Siluet',
                    'lookDesc' => $d['lookDesc'] ?? '',
                    'designer' => $d['designer'] ?? 'Siluet Signature',
                    'height' => $d['height'] ?? '-',
                    'bookingText' => $d['bookingText'] ?? 'Konsultasi Booking Model',
                    'image' => $img ? asset($img) : asset('images/lineup/model_putera.png'),
                ];
            }
        }

        $finalRunwayModels = !empty($activeRunwayList) ? $activeRunwayList : $defaultRunwayModels;
    @endphp
    <section id="virtual-runway" class="py-16 lg:py-24 bg-[#f7f4ee] relative overflow-hidden select-none border-t border-[#ede7dd]">

        <!-- Ambient floor glow (seamless runway lighting) -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 w-[1100px] h-[260px] rounded-full pointer-events-none blur-3xl opacity-60" style="background:radial-gradient(ellipse at center, rgba(230,220,205,0.7) 0%, transparent 70%);"></div>

        <!-- Section Header -->
        <div class="max-w-[1400px] mx-auto px-6 lg:px-14 relative z-10 mb-2 sm:mb-4">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div class="flex items-center gap-3 mb-2.5">
                        <span class="w-8 h-[1.5px] bg-[#8e857e]/60"></span>
                        <span class="text-[10.5px] uppercase tracking-[0.28em] text-[#8e857e] font-sans-luxury font-semibold">
                            INTERACTIVE RUNWAY &amp; LOOKBOOK
                        </span>
                    </div>
                    <h2 class="font-serif-luxury text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#171513] leading-tight">
                        Try the Look &amp; Talents
                    </h2>
                </div>
                <div class="max-w-[420px]">
                    <p class="text-[#6e6761] text-[13px] sm:text-[13.5px] leading-relaxed font-sans-luxury">
                        Geser barisan model di panggung <em>virtual runway</em> untuk mengeksplorasi karakter talenta dan koleksi busana Siluet Model Tala.
                    </p>
                </div>
            </div>
        </div>

        <!-- SEAMLESS RUNWAY CANVAS (NO RECTANGLE BOX - DIRECT ON PAGE BACKGROUND) -->
        <div class="relative w-full z-10 min-h-[500px] sm:min-h-[560px] lg:min-h-[600px] flex items-center overflow-hidden" id="runway-container">

            <!-- Horizontal Gliding Viewport -->
            <div class="runway-viewport w-full h-[470px] sm:h-[530px] lg:h-[570px] flex items-end overflow-hidden cursor-grab active:cursor-grabbing relative" id="runway-viewport">
                
                <!-- Floor Horizon Guide Line (seamless & subtle) -->
                <div class="absolute bottom-6 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#dcd3c5]/50 to-transparent pointer-events-none"></div>

                <!-- Slider Track (Translates smoothly via transform3d with inertia) -->
                <div class="runway-slider flex items-end will-change-transform py-4" id="runway-slider" style="transition: transform 0.55s cubic-bezier(0.2, 0.95, 0.35, 1);">
                    @foreach ($finalRunwayModels as $idx => $m)
                    <div class="runway-item group relative flex-shrink-0 flex flex-col items-center justify-end cursor-pointer select-none transition-all duration-300" data-index="{{ $idx }}" style="width:260px; margin: 0 16px;">
                        <div class="relative flex flex-col items-center">
                            <img 
                                src="{{ $m['image'] }}" 
                                alt="{{ $m['name'] }} - {{ $m['role'] }}" 
                                class="model-img h-[390px] sm:h-[460px] lg:h-[500px] w-auto max-w-none object-contain object-bottom pointer-events-none select-none transition-all duration-300 drop-shadow-md"
                            />
                            <!-- Contact Floor Shadow -->
                            <div class="floor-shadow w-36 sm:w-44 h-4 rounded-full bg-black/25 blur-md mt-[-8px] transition-all duration-300 pointer-events-none"></div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>

            <!-- FLOATING TRANSLUCENT COMPACT PROFILE CARD (RIGHT SIDE) -->
            <div class="hidden md:block absolute right-6 lg:right-14 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
                <div class="bg-white/65 hover:bg-white/80 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-white/85 shadow-lg shadow-black/[0.04] w-[270px] sm:w-[290px] lg:w-[310px] transition-all duration-300">
                    
                    <!-- Card Top Header -->
                    <div class="flex items-center justify-between mb-2.5">
                        <span class="text-[9.5px] uppercase tracking-[0.25em] text-[#8e857e] font-sans-luxury font-bold">
                            IN THIS LOOK
                        </span>
                        <span id="panel-category-badge" class="px-2 py-0.5 rounded-full bg-[#ede5d8]/80 text-[#6e6357] text-[9.5px] font-sans-luxury font-semibold uppercase tracking-wider">
                            {{ $finalRunwayModels[0]['category'] }}
                        </span>
                    </div>

                    <!-- Talent Name & Role -->
                    <h3 id="panel-talent-name" class="font-serif-luxury text-xl sm:text-2xl font-normal text-[#171513] leading-snug mb-0.5 transition-opacity duration-200">
                        {{ $finalRunwayModels[0]['name'] }}
                    </h3>
                    <p id="panel-talent-role" class="text-[11px] font-sans-luxury text-[#8e857e] font-medium mb-3 transition-opacity duration-200 line-clamp-1">
                        {{ $finalRunwayModels[0]['role'] }}
                    </p>

                    <!-- Look Details Box -->
                    <div class="p-2.5 rounded-xl bg-white/60 border border-[#eee6da]/80 mb-3 space-y-1">
                        <span class="text-[9px] uppercase tracking-wider text-[#9c9388] font-sans-luxury font-semibold block">
                            Koleksi / Busana
                        </span>
                        <p id="panel-look-title" class="text-[11.5px] font-semibold text-[#171513] font-sans-luxury leading-tight transition-opacity duration-200">
                            {{ $finalRunwayModels[0]['lookTitle'] }}
                        </p>
                        <p id="panel-look-desc" class="text-[10.5px] text-[#6e6761] leading-relaxed font-sans-luxury transition-opacity duration-200 line-clamp-2">
                            {{ $finalRunwayModels[0]['lookDesc'] }}
                        </p>
                    </div>

                    <!-- Attribute Chips -->
                    <div class="grid grid-cols-2 gap-2 mb-3.5 text-[10.5px] font-sans-luxury">
                        <div class="px-2.5 py-1.5 rounded-lg bg-white/60 border border-[#eee6da]/80">
                            <span class="text-[8.5px] uppercase text-[#9c9388] block">Desainer</span>
                            <span id="panel-designer" class="font-semibold text-[#171513] truncate block">{{ $finalRunwayModels[0]['designer'] }}</span>
                        </div>
                        <div class="px-2.5 py-1.5 rounded-lg bg-white/60 border border-[#eee6da]/80">
                            <span class="text-[8.5px] uppercase text-[#9c9388] block">Postur</span>
                            <span id="panel-height" class="font-semibold text-[#171513] block">{{ $finalRunwayModels[0]['height'] }}</span>
                        </div>
                    </div>

                    <!-- Action Button -->
                    <a href="#kontak" id="panel-booking-btn" class="w-full inline-flex items-center justify-center gap-2 bg-[#171513] hover:bg-[#2c2824] text-white py-2.5 px-4 rounded-full text-[11.5px] font-medium font-sans-luxury transition-all duration-300 shadow-sm active:scale-98">
                        <span id="panel-booking-text">{{ $finalRunwayModels[0]['bookingText'] ?? 'Konsultasi Booking' }}</span>
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </a>

                </div>
            </div>

            <!-- FLOATING MINIMALIST BOTTOM NAVIGATION -->
            <div class="absolute bottom-3 left-6 sm:left-14 z-30 flex items-center gap-3">
                <div class="flex items-center gap-2 bg-white/75 backdrop-blur-md rounded-full px-3 py-1 border border-white/80 shadow-xs">
                    <span class="text-[11px] font-sans-luxury font-semibold text-[#171513]">
                        <span id="runway-current-num">01</span><span class="text-[#c5baa8] font-normal"> / {{ sprintf('%02d', count($finalRunwayModels)) }}</span>
                    </span>
                    <button type="button" id="runway-prev-btn" aria-label="Previous Look"
                        class="w-6 h-6 rounded-full bg-white hover:bg-[#171513] hover:text-white flex items-center justify-center text-[#171513] transition-all border border-[#d8d2c9] active:scale-90 shadow-2xs cursor-pointer">
                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
                    </button>
                    <button type="button" id="runway-next-btn" aria-label="Next Look"
                        class="w-6 h-6 rounded-full bg-[#171513] text-white hover:bg-black flex items-center justify-center transition-all active:scale-90 shadow-2xs cursor-pointer">
                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </button>
                </div>
                <span class="text-[10px] text-[#9e9488] font-sans-luxury hidden sm:inline tracking-wider uppercase">
                    ← Geser model untuk melihat look →
                </span>
            </div>

        </div>

        <!-- Mobile Floating Profile Box (Below Runway on Small Screens) -->
        <div class="block md:hidden px-6 mt-4 relative z-20">
            <div class="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white/85 shadow-sm max-w-sm mx-auto">
                <div class="flex items-center justify-between mb-1.5">
                    <span id="panel-category-badge-mobile" class="px-2 py-0.5 rounded-full bg-[#ede5d8]/80 text-[#6e6357] text-[9px] font-sans-luxury font-semibold uppercase">
                        {{ $finalRunwayModels[0]['category'] }}
                    </span>
                    <span class="text-[10px] text-[#8e857e]" id="panel-height-mobile">{{ $finalRunwayModels[0]['height'] }}</span>
                </div>
                <h3 id="panel-talent-name-mobile" class="font-serif-luxury text-lg text-[#171513] leading-snug mb-0.5">
                    {{ $finalRunwayModels[0]['name'] }}
                </h3>
                <p id="panel-look-title-mobile" class="text-[11px] text-[#6e6761] mb-3 font-sans-luxury line-clamp-1">
                    {{ $finalRunwayModels[0]['lookTitle'] }}
                </p>
                <a href="#kontak" class="w-full inline-flex items-center justify-center gap-1.5 bg-[#171513] text-white py-2 px-3 rounded-full text-[11px] font-medium font-sans-luxury">
                    <span id="panel-booking-text-mobile">{{ $finalRunwayModels[0]['bookingText'] ?? 'Konsultasi Booking' }}</span>
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </a>
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
                @if(isset($programs) && $programs->count() > 0)
                    @foreach($programs as $prog)
                    <div class="luxury-card bg-[#ffffff] rounded-2xl border border-[#ede7dd] p-4 flex flex-col justify-between group">
                        <div>
                            <!-- Image Container -->
                            <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#f5f2eb] mb-4">
                                <img 
                                    src="{{ $prog->image ? asset($prog->image) : asset('images/site/card_basic.png') }}" 
                                    alt="{{ $prog->title }}" 
                                    class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <!-- Card Header -->
                            <h3 class="font-sans-luxury text-[17px] font-semibold text-[#171513] mb-1.5">
                                {{ $prog->title }}
                            </h3>
                            <p class="text-[#756f68] text-[12.5px] leading-relaxed mb-4 font-sans-luxury">
                                {{ $prog->description ?: 'Program pelatihan modeling terpadu bersama Siluet Model Tala.' }}
                            </p>

                            <!-- Features -->
                            <div class="space-y-2 mb-5 font-sans-luxury text-[12px] text-[#635c55]">
                                <div class="flex items-center gap-2">
                                    <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/>
                                    </svg>
                                    <span>{{ $prog->duration ?: '10 Sesi' }}</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <svg class="w-3.5 h-3.5 text-[#8c8279]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m8-10a4 4 0 11-8 0 4 4 0 018 0z"/>
                                    </svg>
                                    <span>{{ $prog->category }}</span>
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
                                Rp {{ number_format($prog->price, 0, ',', '.') }}
                            </span>
                            <a href="{{ url('/modeling-school') }}" class="w-8 h-8 rounded-full bg-[#c2b29f] hover:bg-[#aa9781] text-white flex items-center justify-center transition group-hover:rotate-45" aria-label="Pilih {{ $prog->title }}">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    @endforeach
                @else
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
                @endif

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
                    <div class="relative w-full max-w-[540px] aspect-[16/9.5] rounded-3xl overflow-hidden shadow-xl border border-[#ede7dd] bg-[#f4f0e8] select-none group">
                        
                        <!-- Photos Layout Grid -->
                        <div class="absolute inset-0 flex">
                            <!-- Left Photo: Marwa in Black Blazer -->
                            <div class="w-[60%] h-full relative overflow-hidden bg-[#ded8cf]">
                                <img 
                                    src="{{ asset('images/site/hero_slide_3.png') }}" 
                                    alt="Siluet Model Tala Talent" 
                                    class="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                                />
                                <div class="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none"></div>
                            </div>

                            <!-- Right Photo: Talent in White Outfit -->
                            <div class="w-[40%] h-full relative overflow-hidden border-l border-white/50 bg-[#e6e0d5]">
                                <img 
                                    src="{{ asset('images/site/hero_slide_1.png') }}" 
                                    alt="Siluet Model Tala Talent" 
                                    class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                />
                                <div class="absolute inset-0 bg-black/5 pointer-events-none"></div>
                            </div>
                        </div>

                        <!-- Accent Bar behind Badge -->
                        <div class="absolute bottom-[4.8rem] sm:bottom-[5.5rem] left-5 sm:left-7 w-12 sm:w-16 h-2 rounded-full bg-[#c5baa8]/80 z-10"></div>

                        <!-- Floating Badge Card: 20+ Tahun Pengalaman -->
                        <div class="absolute bottom-4 sm:bottom-6 left-6 sm:left-9 z-20 bg-white/95 backdrop-blur-md px-5 py-4 sm:px-6 sm:py-5 rounded-2xl border border-white/90 shadow-xl max-w-[170px] sm:max-w-[200px]">
                            <div class="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#171513] leading-none mb-1.5 tracking-tight">
                                20+
                            </div>
                            <div class="text-[11px] sm:text-[12px] font-sans-luxury text-[#78716c] font-medium uppercase tracking-wider leading-snug">
                                Tahun<br>Pengalaman
                            </div>
                        </div>

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
        // Hero Slide Indicator interactive & switcher
        let currentSlide = 1;
        const totalSlides = 3;
        const heroSlides = document.querySelectorAll('.hero-slide');
        const heroDotBtns = document.querySelectorAll('.hero-dot-btn');

        function setHeroSlide(index) {
            currentSlide = index;
            // Update slides
            heroSlides.forEach((slide) => {
                const slideNum = parseInt(slide.getAttribute('data-slide'), 10);
                if (slideNum === currentSlide) {
                    slide.classList.remove('opacity-0', 'pointer-events-none', 'z-0');
                    slide.classList.add('opacity-100', 'z-10');
                } else {
                    slide.classList.remove('opacity-100', 'z-10');
                    slide.classList.add('opacity-0', 'pointer-events-none', 'z-0');
                }
            });

            // Update vertical dots
            heroDotBtns.forEach((btn) => {
                const btnSlide = parseInt(btn.getAttribute('data-slide'), 10);
                const numEl = btn.querySelector('.hero-dot-num');
                const dotEl = btn.querySelector('.hero-dot-circle');
                if (btnSlide === currentSlide) {
                    if (numEl) {
                        numEl.classList.remove('text-[#a89f95]', 'font-medium');
                        numEl.classList.add('text-[#171513]', 'font-bold');
                    }
                    if (dotEl) {
                        dotEl.classList.remove('bg-transparent');
                        dotEl.classList.add('bg-[#171513]');
                    }
                } else {
                    if (numEl) {
                        numEl.classList.remove('text-[#171513]', 'font-bold');
                        numEl.classList.add('text-[#a89f95]', 'font-medium');
                    }
                    if (dotEl) {
                        dotEl.classList.remove('bg-[#171513]');
                        dotEl.classList.add('bg-transparent');
                    }
                }
            });
        }

        // Click handlers on vertical dots
        heroDotBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const targetSlide = parseInt(btn.getAttribute('data-slide'), 10);
                setHeroSlide(targetSlide);
                resetAutoSlide();
            });
        });

        let autoSlideTimer = setInterval(() => {
            const next = currentSlide < totalSlides ? currentSlide + 1 : 1;
            setHeroSlide(next);
        }, 5500);

        function resetAutoSlide() {
            clearInterval(autoSlideTimer);
            autoSlideTimer = setInterval(() => {
                const next = currentSlide < totalSlides ? currentSlide + 1 : 1;
                setHeroSlide(next);
            }, 5500);
        }

        const heroContainer = document.querySelector('.hero-carousel-container');
        if (heroContainer) {
            heroContainer.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
            heroContainer.addEventListener('mouseleave', resetAutoSlide);
        }

        // Testimonial Carousel Data
        @php
            $defaultTestimonials = [
                [
                    'quote' => 'Pelatihannya sangat profesional dan membantu saya lebih percaya diri. Sekarang saya sudah mendapatkan kesempatan untuk ikut fashion show dan photoshoot komersial.',
                    'name' => 'Nadia Putri',
                    'role' => 'Alumni Basic Modeling 2024',
                    'avatar' => asset('images/site/avatar_nadia.png')
                ],
                [
                    'quote' => 'Kurikulum runway & catwalk di Siluet Model Tala benar-benar mengubah cara saya berjalan dan postur tubuh. Mentornya sangat sabar dan detail dalam memberi evaluasi.',
                    'name' => 'Jessica Tania',
                    'role' => 'Alumni Runway & Catwalk 2024',
                    'avatar' => asset('images/site/card_commercial.png')
                ],
                [
                    'quote' => 'Networking yang dibangun Siluet Model Tala sangat membantu karier saya. Setelah lulus, saya langsung terhubung dengan dua agensi fashion ternama di Jakarta.',
                    'name' => 'Aura Clarissa',
                    'role' => 'Alumni Advanced Modeling 2023',
                    'avatar' => asset('images/site/card_advanced.png')
                ]
            ];
            $formattedTestimonials = [];
            if (isset($testimonials) && $testimonials->count() > 0) {
                foreach ($testimonials as $t) {
                    $formattedTestimonials[] = [
                        'quote' => $t->data['quote'] ?? 'Pelatihan modeling yang sangat luar biasa di Siluet Model Tala.',
                        'name' => $t->data['name'] ?? 'Alumni',
                        'role' => $t->data['role'] ?? 'Alumni Siluet Tala',
                        'avatar' => !empty($t->data['avatar']) ? $t->data['avatar'] : asset('images/site/avatar_nadia.png'),
                    ];
                }
            }
            $finalTestimonials = !empty($formattedTestimonials) ? $formattedTestimonials : $defaultTestimonials;
        @endphp
        const testimonials = @json($finalTestimonials);

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
        }

        // ===================================================
        // VIRTUAL RUNWAY & LOOKBOOK CONTROLLER (KINETIC SLIDER)
        // ===================================================
        const runwayModels = @json($finalRunwayModels);

        let activeRunwayIndex = 0;
        let currentTranslateX = 0;
        let isDraggingRunway = false;
        let dragStartX = 0;
        let dragStartTranslate = 0;
        let hasMovedDrag = false;

        const runwayViewport = document.getElementById('runway-viewport');
        const runwaySlider = document.getElementById('runway-slider');
        const runwayItems = document.querySelectorAll('.runway-item');
        const runwayCurrentNum = document.getElementById('runway-current-num');
        const runwayPrevBtn = document.getElementById('runway-prev-btn');
        const runwayNextBtn = document.getElementById('runway-next-btn');

        // Desktop Panel Elements
        const panelCategoryBadge = document.getElementById('panel-category-badge');
        const panelTalentName = document.getElementById('panel-talent-name');
        const panelTalentRole = document.getElementById('panel-talent-role');
        const panelLookTitle = document.getElementById('panel-look-title');
        const panelLookDesc = document.getElementById('panel-look-desc');
        const panelDesigner = document.getElementById('panel-designer');
        const panelHeight = document.getElementById('panel-height');
        const panelBookingBtn = document.getElementById('panel-booking-btn');
        const panelBookingText = document.getElementById('panel-booking-text');

        // Mobile Panel Elements
        const panelCategoryBadgeMobile = document.getElementById('panel-category-badge-mobile');
        const panelTalentNameMobile = document.getElementById('panel-talent-name-mobile');
        const panelLookTitleMobile = document.getElementById('panel-look-title-mobile');
        const panelHeightMobile = document.getElementById('panel-height-mobile');
        const panelBookingTextMobile = document.getElementById('panel-booking-text-mobile');

        // Calculate visual depth effects for all models dynamically based on position
        function updateModelDepthEffects(translateX) {
            if (!runwayViewport || runwayItems.length === 0) return;
            const viewportWidth = runwayViewport.offsetWidth;
            const centerX = viewportWidth / 2;

            runwayItems.forEach((item, idx) => {
                const itemLeft = item.offsetLeft;
                const itemWidth = item.offsetWidth;
                const modelCenterOnScreen = translateX + itemLeft + (itemWidth / 2);
                const distFromCenter = Math.abs(modelCenterOnScreen - centerX);
                const normFactor = Math.min(distFromCenter / 360, 1);

                // Smooth interpolation
                const scale = 1.07 - (normFactor * 0.22);
                const blur = normFactor * 5.5;
                const opacity = 1 - (normFactor * 0.65);
                const shadow = item.querySelector('.floor-shadow');

                item.style.transform = `scale(${scale.toFixed(3)})`;
                item.style.filter = `blur(${blur.toFixed(1)}px)`;
                item.style.opacity = opacity.toFixed(2);
                item.style.zIndex = distFromCenter < (itemWidth / 2) ? '30' : (20 - Math.min(Math.floor(distFromCenter / 80), 15));

                if (shadow) {
                    const shadowScale = 1.1 - (normFactor * 0.35);
                    const shadowOpacity = 1 - (normFactor * 0.7);
                    shadow.style.transform = `scale(${shadowScale.toFixed(2)})`;
                    shadow.style.opacity = shadowOpacity.toFixed(2);
                }
            });
        }

        // Animate slider to target index with smooth physics
        function snapToRunwayIndex(index, animated = true) {
            activeRunwayIndex = Math.max(0, Math.min(index, runwayModels.length - 1));

            if (!runwayViewport || !runwaySlider || runwayItems.length === 0) return;

            const viewportWidth = runwayViewport.offsetWidth;
            const centerX = viewportWidth / 2;
            const targetItem = runwayItems[activeRunwayIndex];
            const targetOffsetLeft = targetItem.offsetLeft;
            const targetWidth = targetItem.offsetWidth;

            currentTranslateX = centerX - (targetOffsetLeft + targetWidth / 2);

            if (animated) {
                runwaySlider.style.transition = 'transform 0.52s cubic-bezier(0.18, 0.9, 0.32, 1)';
            } else {
                runwaySlider.style.transition = 'none';
            }

            runwaySlider.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
            updateModelDepthEffects(currentTranslateX);

            // Update Counter
            if (runwayCurrentNum) {
                runwayCurrentNum.textContent = (activeRunwayIndex + 1) < 10 ? '0' + (activeRunwayIndex + 1) : String(activeRunwayIndex + 1);
            }

            // Update Profile Panel Info with subtle fade
            const data = runwayModels[activeRunwayIndex];
            const desktopFadeEls = [panelTalentName, panelTalentRole, panelLookTitle, panelLookDesc, panelDesigner, panelHeight, panelCategoryBadge];
            
            desktopFadeEls.forEach(el => {
                if (el) el.style.opacity = '0';
            });

            setTimeout(() => {
                if (panelTalentName) panelTalentName.textContent = data.name;
                if (panelTalentRole) panelTalentRole.textContent = data.role;
                if (panelCategoryBadge) panelCategoryBadge.textContent = data.category;
                if (panelLookTitle) panelLookTitle.textContent = data.lookTitle;
                if (panelLookDesc) panelLookDesc.textContent = data.lookDesc;
                if (panelDesigner) panelDesigner.textContent = data.designer;
                if (panelHeight) panelHeight.textContent = data.height;
                if (panelBookingText) panelBookingText.textContent = data.bookingText || 'Konsultasi Booking';

                // Mobile
                if (panelTalentNameMobile) panelTalentNameMobile.textContent = data.name;
                if (panelCategoryBadgeMobile) panelCategoryBadgeMobile.textContent = data.category;
                if (panelLookTitleMobile) panelLookTitleMobile.textContent = data.lookTitle;
                if (panelHeightMobile) panelHeightMobile.textContent = data.height;
                if (panelBookingTextMobile) panelBookingTextMobile.textContent = data.bookingText || 'Konsultasi Booking';

                desktopFadeEls.forEach(el => {
                    if (el) el.style.opacity = '1';
                });
            }, 140);
        }

        // Attach Click on individual model items
        runwayItems.forEach((item) => {
            item.addEventListener('click', (e) => {
                if (hasMovedDrag) return;
                const idx = parseInt(item.getAttribute('data-index'), 10);
                snapToRunwayIndex(idx, true);
            });
        });

        // Navigation arrow buttons
        if (runwayPrevBtn) {
            runwayPrevBtn.addEventListener('click', () => {
                const prev = activeRunwayIndex > 0 ? activeRunwayIndex - 1 : runwayModels.length - 1;
                snapToRunwayIndex(prev, true);
            });
        }

        if (runwayNextBtn) {
            runwayNextBtn.addEventListener('click', () => {
                const next = activeRunwayIndex < runwayModels.length - 1 ? activeRunwayIndex + 1 : 0;
                snapToRunwayIndex(next, true);
            });
        }

        // Continuous Kinetic Mouse & Touch Dragging
        if (runwayViewport) {
            // MOUSE EVENTS
            runwayViewport.addEventListener('mousedown', (e) => {
                isDraggingRunway = true;
                hasMovedDrag = false;
                dragStartX = e.clientX;
                dragStartTranslate = currentTranslateX;
                runwaySlider.style.transition = 'none';
            });

            window.addEventListener('mousemove', (e) => {
                if (!isDraggingRunway) return;
                const deltaX = e.clientX - dragStartX;
                if (Math.abs(deltaX) > 4) {
                    hasMovedDrag = true;
                }
                currentTranslateX = dragStartTranslate + deltaX;
                runwaySlider.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
                updateModelDepthEffects(currentTranslateX);
            });

            window.addEventListener('mouseup', (e) => {
                if (!isDraggingRunway) return;
                isDraggingRunway = false;

                // Find closest model to center
                const viewportWidth = runwayViewport.offsetWidth;
                const centerX = viewportWidth / 2;
                let closestIdx = activeRunwayIndex;
                let minDistance = Infinity;

                runwayItems.forEach((item, idx) => {
                    const itemLeft = item.offsetLeft;
                    const itemWidth = item.offsetWidth;
                    const modelCenter = currentTranslateX + itemLeft + (itemWidth / 2);
                    const dist = Math.abs(modelCenter - centerX);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestIdx = idx;
                    }
                });

                snapToRunwayIndex(closestIdx, true);
            });

            // TOUCH EVENTS (Mobile / Tablet)
            runwayViewport.addEventListener('touchstart', (e) => {
                if (e.touches.length !== 1) return;
                isDraggingRunway = true;
                hasMovedDrag = false;
                dragStartX = e.touches[0].clientX;
                dragStartTranslate = currentTranslateX;
                runwaySlider.style.transition = 'none';
            }, { passive: true });

            runwayViewport.addEventListener('touchmove', (e) => {
                if (!isDraggingRunway || e.touches.length !== 1) return;
                const deltaX = e.touches[0].clientX - dragStartX;
                if (Math.abs(deltaX) > 4) {
                    hasMovedDrag = true;
                }
                currentTranslateX = dragStartTranslate + deltaX;
                runwaySlider.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`;
                updateModelDepthEffects(currentTranslateX);
            }, { passive: true });

            runwayViewport.addEventListener('touchend', () => {
                if (!isDraggingRunway) return;
                isDraggingRunway = false;

                const viewportWidth = runwayViewport.offsetWidth;
                const centerX = viewportWidth / 2;
                let closestIdx = activeRunwayIndex;
                let minDistance = Infinity;

                runwayItems.forEach((item, idx) => {
                    const itemLeft = item.offsetLeft;
                    const itemWidth = item.offsetWidth;
                    const modelCenter = currentTranslateX + itemLeft + (itemWidth / 2);
                    const dist = Math.abs(modelCenter - centerX);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestIdx = idx;
                    }
                });

                snapToRunwayIndex(closestIdx, true);
            });
        }

        // Window resize adjustment
        window.addEventListener('resize', () => {
            snapToRunwayIndex(activeRunwayIndex, false);
        });

        // Initialize Runway after load
        setTimeout(() => {
            snapToRunwayIndex(0, false);
        }, 150);
    </script>
@endpush

