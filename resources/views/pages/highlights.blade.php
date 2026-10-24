@extends('layouts.app')

@section('title', 'Highlights & Portfolio — Siluet Model Tala')

@section('content')
<!-- Page Hero Banner -->
<section class="relative overflow-hidden pt-28 sm:pt-32 pb-16" style="background: #0e0c0a;">
    <!-- Animated gradient overlay -->
    <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(197,186,168,0.12) 0%, transparent 70%);"></div>

    <!-- Horizontal lines decoration -->
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.3) 40px);"></div>

    <div class="max-w-[1360px] mx-auto px-6 lg:px-14 relative z-10">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div class="flex flex-col gap-4">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-2 text-xs font-sans-luxury text-[#4a4540] uppercase tracking-widest">
                    <a href="{{ url('/') }}" class="hover:text-[#c5baa8] transition">Home</a>
                    <span class="text-[#2a2520]">/</span>
                    <span class="text-[#c5baa8]">Highlights</span>
                </nav>

                <!-- Title -->
                <div>
                    <p class="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#6b6560] mb-3">Fashion Weeks & Editorials</p>
                    <h1 class="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl text-white leading-none tracking-tight">
                        Highlights
                    </h1>
                    <p class="font-serif-luxury italic text-2xl sm:text-3xl text-[#8e857e] mt-2">& Portfolio</p>
                </div>

                <p class="font-sans-luxury text-sm text-[#6b6560] max-w-xl leading-relaxed">
                    Karya terbaik dan momen bersejarah talent kami di berbagai panggung fashion bergengsi — dari runway Jakarta Fashion Week hingga editorial majalah nasional.
                </p>
            </div>

            <!-- Quick Stats -->
            <div class="flex items-center gap-6 lg:gap-10 shrink-0">
                <div class="text-center">
                    <p class="font-serif-luxury text-4xl text-white">200+</p>
                    <p class="text-xs font-sans-luxury text-[#6b6560] uppercase tracking-wider mt-1">Editorial Shoots</p>
                </div>
                <div class="w-px h-12 bg-white/10"></div>
                <div class="text-center">
                    <p class="font-serif-luxury text-4xl text-white">45+</p>
                    <p class="text-xs font-sans-luxury text-[#6b6560] uppercase tracking-wider mt-1">Fashion Shows</p>
                </div>
                <div class="w-px h-12 bg-white/10"></div>
                <div class="text-center">
                    <p class="font-serif-luxury text-4xl text-white">8+</p>
                    <p class="text-xs font-sans-luxury text-[#6b6560] uppercase tracking-wider mt-1">Magazine Covers</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- React Component Mount Point -->
<div data-react-component="HighlightsGallery"></div>
@endsection
