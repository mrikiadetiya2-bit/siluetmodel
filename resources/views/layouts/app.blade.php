<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Siluet Model Tala - Shape Your Presence')</title>

    <!-- Google Fonts Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])

    @stack('styles')
</head>
<body class="bg-[#ffffff] text-[#1a1816] antialiased selection:bg-[#ded7cb] selection:text-[#171513] min-h-screen flex flex-col justify-between">

    <!-- Premium Liquid Glass Navigation Bar -->
    @include('components.navbar')

    <!-- Main Page Content -->
    <main class="flex-grow">
        @yield('content')
    </main>

    <!-- Search Modal -->
    @include('components.search-modal')

    <!-- Luxury Footer -->
    @include('components.footer')

    <!-- Global Interactive Navigation & Modal Scripts -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Navbar Scroll Dynamic
            const liquidNav = document.getElementById('liquid-nav');
            function handleNavScroll() {
                if (!liquidNav) return;
                if (window.scrollY > 24) {
                    liquidNav.classList.add('is-scrolled');
                    liquidNav.classList.remove('py-2.5', 'sm:py-3');
                    liquidNav.classList.add('py-2', 'sm:py-2.5');
                } else {
                    liquidNav.classList.remove('is-scrolled');
                    liquidNav.classList.remove('py-2', 'sm:py-2.5');
                    liquidNav.classList.add('py-2.5', 'sm:py-3');
                }
            }
            window.addEventListener('scroll', handleNavScroll, { passive: true });
            handleNavScroll();

            // Mobile Menu Toggle
            const mobileToggle = document.getElementById('mobile-toggle');
            const mobileMenu = document.getElementById('mobile-menu');
            const hamburgerIcon = document.getElementById('hamburger-icon');
            const closeIcon = document.getElementById('close-icon');

            if (mobileToggle && mobileMenu) {
                let isMenuOpen = false;
                function toggleMobileMenu(open) {
                    isMenuOpen = typeof open === 'boolean' ? open : !isMenuOpen;
                    mobileToggle.setAttribute('aria-expanded', isMenuOpen ? 'true' : 'false');
                    if (isMenuOpen) {
                        mobileMenu.classList.remove('hidden');
                        void mobileMenu.offsetWidth;
                        mobileMenu.classList.remove('opacity-0', '-translate-y-3');
                        mobileMenu.classList.add('opacity-100', 'translate-y-0');
                        if (hamburgerIcon) hamburgerIcon.classList.add('hidden');
                        if (closeIcon) closeIcon.classList.remove('hidden');
                    } else {
                        mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                        mobileMenu.classList.add('opacity-0', '-translate-y-3');
                        if (hamburgerIcon) hamburgerIcon.classList.remove('hidden');
                        if (closeIcon) closeIcon.classList.add('hidden');
                        setTimeout(() => {
                            if (!isMenuOpen) mobileMenu.classList.add('hidden');
                        }, 300);
                    }
                }

                mobileToggle.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleMobileMenu();
                });

                document.querySelectorAll('.mobile-nav-link').forEach(link => {
                    link.addEventListener('click', () => toggleMobileMenu(false));
                });

                document.addEventListener('click', (e) => {
                    if (isMenuOpen && !mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                        toggleMobileMenu(false);
                    }
                });
            }

            // Search Modal
            const searchBtn = document.getElementById('search-btn');
            const searchModal = document.getElementById('search-modal');
            const closeSearch = document.getElementById('close-search');
            if (searchBtn && searchModal && closeSearch) {
                searchBtn.addEventListener('click', () => {
                    searchModal.classList.remove('hidden');
                    searchModal.classList.add('flex');
                    const input = document.getElementById('site-search-input');
                    if (input) setTimeout(() => input.focus(), 50);
                });
                closeSearch.addEventListener('click', () => {
                    searchModal.classList.add('hidden');
                    searchModal.classList.remove('flex');
                });
                searchModal.addEventListener('click', (e) => {
                    if (e.target === searchModal) {
                        searchModal.classList.add('hidden');
                        searchModal.classList.remove('flex');
                    }
                });
            }
        });
    </script>

    @stack('scripts')
</body>
</html>
