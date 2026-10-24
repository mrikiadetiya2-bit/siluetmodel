@extends('layouts.app')

@section('title', 'Kids & Teens Talents — Siluet Model Tala')

@section('content')
<!-- Page Hero Banner -->
<section class="relative overflow-hidden pt-28 sm:pt-32 pb-16" style="background: linear-gradient(135deg, #fdf8f0 0%, #f7f4ee 60%, #ede8df 100%);">
    <!-- Decorative Shapes -->
    <div class="absolute top-16 right-10 w-24 h-24 rounded-full opacity-20 pointer-events-none" style="background: #f4b87a;"></div>
    <div class="absolute bottom-8 left-20 w-16 h-16 rounded-full opacity-15 pointer-events-none" style="background: #e8a56e;"></div>
    <div class="absolute top-40 left-1/2 w-8 h-8 rounded-full opacity-10 pointer-events-none" style="background: #c5baa8;"></div>

    <div class="max-w-[1360px] mx-auto px-6 lg:px-14 relative z-10">
        <div class="flex flex-col items-start gap-4">
            <!-- Breadcrumb -->
            <nav class="flex items-center gap-2 text-xs font-sans-luxury text-[#8e857e] uppercase tracking-widest">
                <a href="{{ url('/') }}" class="hover:text-[#171513] transition">Home</a>
                <span class="text-[#c5baa8]">/</span>
                <span class="text-[#171513]">Kids & Teens</span>
            </nav>

            <!-- Title -->
            <div>
                <p class="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#8e857e] mb-3">Nurturing Future Talents</p>
                <h1 class="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl text-[#171513] leading-none tracking-tight">
                    Kids
                </h1>
                <p class="font-serif-luxury italic text-2xl sm:text-3xl text-[#a89a84] mt-2">& Teens Division</p>
            </div>

            <p class="font-sans-luxury text-sm text-[#6b6560] max-w-xl leading-relaxed mt-2">
                Program khusus untuk bakat muda usia 4–17 tahun dengan pendekatan aman, edukatif, dan menyenangkan bersama mentor berpengalaman.
            </p>

            <!-- Age Groups Quick Nav -->
            <div class="flex items-center flex-wrap gap-3 mt-4 pt-4 border-t border-[#ddd8ce] w-full">
                <span class="text-xs font-sans-luxury text-[#8e857e] uppercase tracking-wider mr-2">Age Groups:</span>
                <span class="px-4 py-1.5 rounded-full text-xs font-sans-luxury font-medium border border-[#c5baa8] text-[#8e857e] bg-white/60">Toddler (4–6)</span>
                <span class="px-4 py-1.5 rounded-full text-xs font-sans-luxury font-medium border border-[#c5baa8] text-[#8e857e] bg-white/60">Kids (7–12)</span>
                <span class="px-4 py-1.5 rounded-full text-xs font-sans-luxury font-medium border border-[#c5baa8] text-[#8e857e] bg-white/60">Teens (13–17)</span>
            </div>
        </div>
    </div>
</section>

<!-- React Component Mount Point -->
<div data-react-component="KidsRoster"></div>
@endsection
