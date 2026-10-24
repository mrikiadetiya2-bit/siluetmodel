@extends('layouts.app')

@section('title', 'Modeling School — Siluet Model Tala')

@section('content')
<!-- Page Hero Banner -->
<section class="relative overflow-hidden pt-28 sm:pt-32 pb-16" style="background: linear-gradient(135deg, #1a1715 0%, #252018 50%, #1e1b14 100%);">
    <!-- Gold shimmer decoration -->
    <div class="absolute top-0 left-0 right-0 h-px pointer-events-none" style="background: linear-gradient(90deg, transparent, rgba(197,186,168,0.4), rgba(212,185,120,0.5), rgba(197,186,168,0.4), transparent);"></div>
    <div class="absolute inset-0 pointer-events-none opacity-[0.06]" style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\"><circle cx=\"30\" cy=\"30\" r=\"1\" fill=\"%23c5baa8\"/></svg>');"></div>

    <div class="max-w-[1360px] mx-auto px-6 lg:px-14 relative z-10">
        <div class="flex flex-col gap-6">
            <!-- Breadcrumb -->
            <nav class="flex items-center gap-2 text-xs font-sans-luxury text-[#4a4540] uppercase tracking-widest">
                <a href="{{ url('/') }}" class="hover:text-[#c5baa8] transition">Home</a>
                <span class="text-[#2a2520]">/</span>
                <span class="text-[#c5baa8]">Modeling School</span>
            </nav>

            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div>
                    <p class="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#c5a55a] mb-3">Join Our Academy</p>
                    <h1 class="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl text-white leading-none tracking-tight">
                        Modeling
                    </h1>
                    <p class="font-serif-luxury italic text-3xl sm:text-4xl text-[#c5baa8] mt-1">School</p>
                    <p class="font-sans-luxury text-sm text-[#6b6560] max-w-xl leading-relaxed mt-4">
                        Program pelatihan modeling komprehensif yang dirancang untuk membentuk karier profesional — dari teknik runway, komersial, hingga editorial photography.
                    </p>
                </div>

                <!-- CTA Block -->
                <div class="lg:text-right shrink-0">
                    <div class="inline-flex flex-col items-center lg:items-end gap-3">
                        <a href="{{ url('/register') }}" class="glass-cta-btn font-sans-luxury">
                            <span>Daftar Sekarang</span>
                        </a>
                        <p class="text-xs font-sans-luxury text-[#4a4540]">Pendaftaran batch berikutnya terbuka</p>
                    </div>
                </div>
            </div>

            <!-- Course Level Tabs -->
            <div class="flex items-center flex-wrap gap-3 mt-2 pt-6 border-t border-white/10">
                <span class="text-xs font-sans-luxury text-[#6b6560] uppercase tracking-wider mr-2">Program:</span>
                <span class="px-4 py-1.5 rounded-full text-xs font-sans-luxury font-medium border border-[#c5a55a]/40 text-[#c5a55a] bg-[#c5a55a]/10">Basic</span>
                <span class="px-4 py-1.5 rounded-full text-xs font-sans-luxury font-medium border border-white/15 text-[#8e857e] bg-white/5">Advanced Runway</span>
                <span class="px-4 py-1.5 rounded-full text-xs font-sans-luxury font-medium border border-white/15 text-[#8e857e] bg-white/5">Commercial</span>
                <span class="px-4 py-1.5 rounded-full text-xs font-sans-luxury font-medium border border-white/15 text-[#8e857e] bg-white/5">Kids Program</span>
            </div>
        </div>
    </div>
</section>

<!-- React Component Mount Point -->
<div data-react-component="AcademyCourses"></div>
@endsection
