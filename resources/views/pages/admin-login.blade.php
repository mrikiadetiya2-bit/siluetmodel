@extends('layouts.app')

@section('title', 'Login Administrator — Siluet Model Tala')

@section('content')
<section class="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 relative overflow-hidden"
    style="background: linear-gradient(135deg, #171513 0%, #1e1b18 50%, #2a2520 100%);">
    <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(ellipse 60% 80% at 20% 50%, rgba(197,186,168,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 80% 50%, rgba(197,165,90,0.04) 0%, transparent 60%);"></div>
    <div data-react-component="AuthPortal" data-props='{"initialMode":"login","adminOnly":true}' class="w-full max-w-md z-10"></div>
</section>
@endsection