@extends('layouts.app')

@section('title', 'Women Talents — Siluet Model Tala')

@section('content')
<!-- Page Hero Banner -->
<section class="relative overflow-hidden pt-28 sm:pt-32 pb-16" style="background: linear-gradient(135deg, #f7f4ee 0%, #faf8f5 50%, #ede9e0 100%);">
    <!-- Decorative Elements -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style="background: radial-gradient(circle, #c5baa8 0%, transparent 70%); transform: translate(30%, -30%);"></div>
    <div class="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-8 pointer-events-none" style="background: radial-gradient(circle, #a89a84 0%, transparent 70%); transform: translate(-30%, 30%);"></div>

    <div class="max-w-[1360px] mx-auto px-6 lg:px-14 relative z-10">
        <div class="flex flex-col items-start gap-4">
            <!-- Breadcrumb -->
            <nav class="flex items-center gap-2 text-xs font-sans-luxury text-[#8e857e] uppercase tracking-widest">
                <a href="{{ url('/') }}" class="hover:text-[#171513] transition">Home</a>
                <span class="text-[#c5baa8]">/</span>
                <span class="text-[#171513]">Women</span>
            </nav>

            <!-- Title -->
            <div>
                <p class="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#8e857e] mb-3">Our Talents</p>
                <h1 class="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl text-[#171513] leading-none tracking-tight">
                    Women
                </h1>
                <p class="font-serif-luxury italic text-2xl sm:text-3xl text-[#8e857e] mt-2">Division</p>
            </div>

            <p class="font-sans-luxury text-sm text-[#6b6560] max-w-xl leading-relaxed mt-2">
                Koleksi talent wanita terbaik kami — profesional, berkarakter, dan siap tampil di berbagai panggung fashion internasional.
            </p>

            <!-- Stats Bar -->
            <div class="flex items-center gap-8 mt-4 pt-4 border-t border-[#ddd8ce] w-full">
                <div>
                    <p class="font-serif-luxury text-3xl text-[#171513]">48+</p>
                    <p class="text-xs font-sans-luxury text-[#8e857e] uppercase tracking-wider mt-0.5">Active Talents</p>
                </div>
                <div class="w-px h-10 bg-[#ddd8ce]"></div>
                <div>
                    <p class="font-serif-luxury text-3xl text-[#171513]">120+</p>
                    <p class="text-xs font-sans-luxury text-[#8e857e] uppercase tracking-wider mt-0.5">Projects Done</p>
                </div>
                <div class="w-px h-10 bg-[#ddd8ce]"></div>
                <div>
                    <p class="font-serif-luxury text-3xl text-[#171513]">15+</p>
                    <p class="text-xs font-sans-luxury text-[#8e857e] uppercase tracking-wider mt-0.5">Brands Served</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- React Component Mount Point -->
<div data-react-component="WomenRoster"></div>
<div data-react-component="HighlightsGallery" data-props='{"audience":"Women"}'></div>
@endsection
