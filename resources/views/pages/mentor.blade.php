@extends('layouts.app')

@section('title', 'Our Mentors — Siluet Model Tala')

@section('content')
<!-- Page Hero Banner -->
<section class="relative overflow-hidden pt-28 sm:pt-32 pb-16" style="background: linear-gradient(160deg, #f7f4ee 0%, #ede9e0 40%, #e5e0d6 100%);">
    <!-- Decorative circle -->
    <div class="absolute right-0 top-0 w-[700px] h-[700px] pointer-events-none" style="background: radial-gradient(circle at 80% 20%, rgba(197,186,168,0.15) 0%, transparent 60%);"></div>

    <div class="max-w-[1360px] mx-auto px-6 lg:px-14 relative z-10">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div class="flex flex-col gap-4 max-w-2xl">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-2 text-xs font-sans-luxury text-[#8e857e] uppercase tracking-widest">
                    <a href="{{ url('/') }}" class="hover:text-[#171513] transition">Home</a>
                    <span class="text-[#c5baa8]">/</span>
                    <span class="text-[#171513]">Mentor</span>
                </nav>

                <!-- Title -->
                <div>
                    <p class="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#8e857e] mb-3">Learn from the Best</p>
                    <h1 class="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl text-[#171513] leading-none tracking-tight">
                        Our
                    </h1>
                    <p class="font-serif-luxury italic text-3xl sm:text-4xl text-[#a89a84] mt-1">Mentors</p>
                </div>

                <p class="font-sans-luxury text-sm text-[#6b6560] leading-relaxed">
                    Dipandu oleh para profesional berpengalaman dengan rekam jejak di industri fashion nasional dan internasional. Lebih dari sekadar instruktur — mereka adalah pembimbing yang berdedikasi.
                </p>

                <!-- Trust badges -->
                <div class="flex items-center flex-wrap gap-4 mt-2">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-[#171513] flex items-center justify-center">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <span class="text-xs font-sans-luxury text-[#6b6560]">Sertifikasi Internasional</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-[#171513] flex items-center justify-center">
                            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
                            </svg>
                        </div>
                        <span class="text-xs font-sans-luxury text-[#6b6560]">500+ Alumni Berhasil</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- React Component Mount Point -->
<div data-react-component="MentorShowcase"></div>
@endsection
