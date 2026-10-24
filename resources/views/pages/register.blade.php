@extends('layouts.app')

@section('title', 'Join Academy — Siluet Model Tala')

@section('content')
<!-- Full-height Auth Page -->
<section class="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 relative overflow-hidden"
    style="background: linear-gradient(135deg, #171513 0%, #1e1b18 50%, #2a2520 100%);">

    <!-- Background patterns -->
    <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 60% 80% at 20% 50%, rgba(197,186,168,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 80% 50%, rgba(197,165,90,0.04) 0%, transparent 60%);"></div>
    <div class="absolute inset-0 opacity-[0.025] pointer-events-none" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.2) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.2) 60px);"></div>

    <!-- React Component Mount Point -->
    <div data-react-component="AuthPortal" data-props='{"initialMode":"register"}' class="w-full max-w-md z-10"></div>
</section>
@endsection
