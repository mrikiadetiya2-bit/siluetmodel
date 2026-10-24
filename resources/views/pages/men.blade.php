@extends('layouts.app')

@section('title', 'Men Talents — Siluet Model Tala')

@section('content')
<!-- Page Hero Banner -->
<section class="relative overflow-hidden pt-28 sm:pt-32 pb-16" style="background: linear-gradient(135deg, #171513 0%, #1e1b18 50%, #2a2520 100%);">
    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5 pointer-events-none" style="background: radial-gradient(circle, #c5baa8 0%, transparent 70%); transform: translate(30%, -30%);"></div>
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.15) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.15) 50px);"></div>

    <div class="max-w-[1360px] mx-auto px-6 lg:px-14 relative z-10">
        <div class="flex flex-col items-start gap-4">
            <!-- Breadcrumb -->
            <nav class="flex items-center gap-2 text-xs font-sans-luxury text-[#6b6560] uppercase tracking-widest">
                <a href="{{ url('/') }}" class="hover:text-[#c5baa8] transition">Home</a>
                <span class="text-[#3a3530]">/</span>
                <span class="text-[#c5baa8]">Men</span>
            </nav>

            <!-- Title -->
            <div>
                <p class="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#6b6560] mb-3">Our Talents</p>
                <h1 class="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl text-white leading-none tracking-tight">
                    Men
                </h1>
                <p class="font-serif-luxury italic text-2xl sm:text-3xl text-[#8e857e] mt-2">Division</p>
            </div>

            <p class="font-sans-luxury text-sm text-[#8e857e] max-w-xl leading-relaxed mt-2">
                Talent pria pilihan dengan penampilan maskulin yang kuat, profesional, dan memenuhi standar agensi fashion kelas dunia.
            </p>

            <!-- Stats Bar -->
            <div class="flex items-center gap-8 mt-4 pt-4 border-t border-white/10 w-full">
                <div>
                    <p class="font-serif-luxury text-3xl text-white">32+</p>
                    <p class="text-xs font-sans-luxury text-[#6b6560] uppercase tracking-wider mt-0.5">Active Talents</p>
                </div>
                <div class="w-px h-10 bg-white/10"></div>
                <div>
                    <p class="font-serif-luxury text-3xl text-white">85+</p>
                    <p class="text-xs font-sans-luxury text-[#6b6560] uppercase tracking-wider mt-0.5">Projects Done</p>
                </div>
                <div class="w-px h-10 bg-white/10"></div>
                <div>
                    <p class="font-serif-luxury text-3xl text-white">10+</p>
                    <p class="text-xs font-sans-luxury text-[#6b6560] uppercase tracking-wider mt-0.5">Brands Served</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- React Component Mount Point -->
<div data-react-component="MenRoster"></div>
@endsection
