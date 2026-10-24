@extends('layouts.app')

@section('title', 'About Us — Siluet Model Tala')

@section('content')
<!-- Page Hero Banner -->
<section class="relative overflow-hidden pt-28 sm:pt-32 pb-20" style="background: linear-gradient(135deg, #171513 0%, #1e1b18 60%, #2a2520 100%);">
    <!-- Large decorative text -->
    <div class="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <p class="font-serif-luxury text-[22vw] text-white/[0.03] tracking-tight leading-none whitespace-nowrap">SILUET</p>
    </div>

    <!-- Gold line top -->
    <div class="absolute top-0 left-0 right-0 h-px pointer-events-none" style="background: linear-gradient(90deg, transparent, rgba(197,165,90,0.5), transparent);"></div>

    <div class="max-w-[1360px] mx-auto px-6 lg:px-14 relative z-10">
        <div class="flex flex-col gap-8">
            <!-- Breadcrumb -->
            <nav class="flex items-center gap-2 text-xs font-sans-luxury text-[#4a4540] uppercase tracking-widest">
                <a href="{{ url('/') }}" class="hover:text-[#c5baa8] transition">Home</a>
                <span class="text-[#2a2520]">/</span>
                <span class="text-[#c5baa8]">About Us</span>
            </nav>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <!-- Left: Title -->
                <div>
                    <p class="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#c5a55a] mb-4">Since 2014</p>
                    <h1 class="font-serif-luxury text-5xl sm:text-6xl lg:text-[5.5rem] text-white leading-none tracking-tight">
                        Our<br><em class="not-italic text-[#c5baa8]">Story</em>
                    </h1>
                    <div class="mt-6 space-y-4">
                        <p class="font-sans-luxury text-sm text-[#8e857e] leading-relaxed">
                            Siluet Model Tala didirikan pada tahun 2014 dengan satu visi: melahirkan model profesional Indonesia yang mampu bersaing di kancah internasional.
                        </p>
                        <p class="font-sans-luxury text-sm text-[#6b6560] leading-relaxed">
                            Selama lebih dari satu dekade, kami telah membimbing ratusan talent menemukan potensi terbaik mereka dan membangun karier yang bermakna di industri fashion.
                        </p>
                    </div>
                </div>

                <!-- Right: Milestones -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-5 rounded-2xl border border-white/10 bg-white/5">
                        <p class="font-serif-luxury text-4xl text-white">12+</p>
                        <p class="text-xs font-sans-luxury text-[#6b6560] uppercase tracking-wider mt-2">Years of Excellence</p>
                    </div>
                    <div class="p-5 rounded-2xl border border-white/10 bg-white/5">
                        <p class="font-serif-luxury text-4xl text-white">500+</p>
                        <p class="text-xs font-sans-luxury text-[#6b6560] uppercase tracking-wider mt-2">Alumni Worldwide</p>
                    </div>
                    <div class="p-5 rounded-2xl border border-white/10 bg-white/5">
                        <p class="font-serif-luxury text-4xl text-white">80+</p>
                        <p class="text-xs font-sans-luxury text-[#6b6560] uppercase tracking-wider mt-2">Active Talents</p>
                    </div>
                    <div class="p-5 rounded-2xl border border-[#c5a55a]/30 bg-[#c5a55a]/10">
                        <p class="font-serif-luxury text-4xl text-[#c5a55a]">25+</p>
                        <p class="text-xs font-sans-luxury text-[#6b6560] uppercase tracking-wider mt-2">Brand Partners</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- React Component Mount Point -->
<div data-react-component="AboutInteractive"></div>
@endsection
