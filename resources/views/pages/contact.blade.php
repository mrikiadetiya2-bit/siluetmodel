@extends('layouts.app')

@section('title', 'Contact Us — Siluet Model Tala')

@section('content')
<!-- Page Hero Banner -->
<section class="relative overflow-hidden pt-28 sm:pt-32 pb-16" style="background: linear-gradient(135deg, #f7f4ee 0%, #faf8f5 50%, #ede9e0 100%);">
    <!-- Decorative element -->
    <div class="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none hidden lg:block" style="background: linear-gradient(to left, rgba(197,186,168,0.08) 0%, transparent 100%);"></div>

    <div class="max-w-[1360px] mx-auto px-6 lg:px-14 relative z-10">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div class="flex flex-col gap-4 max-w-2xl">
                <!-- Breadcrumb -->
                <nav class="flex items-center gap-2 text-xs font-sans-luxury text-[#8e857e] uppercase tracking-widest">
                    <a href="{{ url('/') }}" class="hover:text-[#171513] transition">Home</a>
                    <span class="text-[#c5baa8]">/</span>
                    <span class="text-[#171513]">Contact</span>
                </nav>

                <!-- Title -->
                <div>
                    <p class="text-xs font-sans-luxury uppercase tracking-[0.35em] text-[#8e857e] mb-3">Get in Touch</p>
                    <h1 class="font-serif-luxury text-5xl sm:text-6xl lg:text-7xl text-[#171513] leading-none tracking-tight">
                        Contact
                    </h1>
                    <p class="font-serif-luxury italic text-2xl sm:text-3xl text-[#a89a84] mt-2">Us</p>
                </div>

                <p class="font-sans-luxury text-sm text-[#6b6560] max-w-xl leading-relaxed">
                    Hubungi kami untuk informasi booking talent, pendaftaran akademi, kerjasama brand, atau sekadar bertanya. Tim kami siap membantu Anda.
                </p>
            </div>

            <!-- Contact Quick Info -->
            <div class="flex flex-col gap-3 shrink-0 lg:pb-2">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-[#171513] flex items-center justify-center shrink-0">
                        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs font-sans-luxury text-[#8e857e] uppercase tracking-wider">WhatsApp</p>
                        <p class="font-sans-luxury text-sm font-medium text-[#171513]">+62 812-3456-7890</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-[#171513] flex items-center justify-center shrink-0">
                        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs font-sans-luxury text-[#8e857e] uppercase tracking-wider">Email</p>
                        <p class="font-sans-luxury text-sm font-medium text-[#171513]">hello@siluetmodeltala.com</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-[#171513] flex items-center justify-center shrink-0">
                        <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                        </svg>
                    </div>
                    <div>
                        <p class="text-xs font-sans-luxury text-[#8e857e] uppercase tracking-wider">Studio</p>
                        <p class="font-sans-luxury text-sm font-medium text-[#171513]">Makassar, Sulawesi Selatan</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- React Component Mount Point -->
<div data-react-component="ContactInteractive"></div>
@endsection
