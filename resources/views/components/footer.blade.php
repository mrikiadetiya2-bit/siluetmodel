<!-- ================= FOOTER ================= -->
<footer class="bg-[#171513] text-[#a59f97] pt-16 pb-12 font-sans-luxury border-t border-[#262320]">
    <div class="max-w-[1360px] mx-auto px-6 lg:px-14">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2a2622]">
            
            <!-- Col 1 -->
            <div class="space-y-4">
                <div class="flex flex-col">
                    <span class="font-serif-luxury text-2xl tracking-[0.28em] font-medium text-white uppercase leading-none">
                        SILUET
                    </span>
                    <span class="text-[8px] tracking-[0.32em] text-[#8e857e] uppercase mt-1 font-semibold">
                        MODEL TALA
                    </span>
                </div>
                <p class="text-xs text-[#8c857e] leading-relaxed max-w-xs">
                    Akademi modeling terkemuka untuk mencetak talenta profesional, berkarakter, dan berdaya saing internasional.
                </p>
                <div class="flex items-center space-x-3 pt-2 text-[#8e857e]">
                    <a href="https://instagram.com" target="_blank" class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition text-xs" aria-label="Instagram">IG</a>
                    <a href="https://tiktok.com" target="_blank" class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition text-xs" aria-label="TikTok">TT</a>
                    <a href="https://youtube.com" target="_blank" class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:text-white hover:border-white/30 transition text-xs" aria-label="YouTube">YT</a>
                </div>
            </div>

            <!-- Col 2 -->
            <div>
                <h5 class="text-white text-xs font-semibold uppercase tracking-wider mb-4">Divisi Model</h5>
                <ul class="space-y-2 text-xs">
                    <li><a href="{{ url('/women') }}" class="hover:text-white transition">Women Talents</a></li>
                    <li><a href="{{ url('/men') }}" class="hover:text-white transition">Men Talents</a></li>
                    <li><a href="{{ url('/kids') }}" class="hover:text-white transition">Kids & Teens</a></li>
                    <li><a href="{{ url('/highlights') }}" class="hover:text-white transition">Runway Highlights</a></li>
                </ul>
            </div>

            <!-- Col 3 -->
            <div>
                <h5 class="text-white text-xs font-semibold uppercase tracking-wider mb-4">Akademi & Info</h5>
                <ul class="space-y-2 text-xs">
                    <li><a href="{{ url('/') }}" class="hover:text-white transition">Beranda (Home)</a></li>
                    <li><a href="{{ url('/modeling-school') }}" class="hover:text-white transition">Modeling School</a></li>
                    <li><a href="{{ url('/mentor') }}" class="hover:text-white transition">Mentor Kami</a></li>
                    <li><a href="{{ url('/about') }}" class="hover:text-white transition">About Us</a></li>
                    <li><a href="{{ url('/contact') }}" class="hover:text-white transition">Contact & Booking</a></li>
                </ul>
            </div>

            <!-- Col 4 -->
            <div>
                <h5 class="text-white text-xs font-semibold uppercase tracking-wider mb-4">Kontak Studio</h5>
                <ul class="space-y-2.5 text-xs text-[#8c857e]">
                    <li class="flex items-start gap-2">
                        <span>Jakarta Selatan & Tanah Laut, Indonesia</span>
                    </li>
                    <li>
                        <a href="mailto:info@siluetmodeltala.com" class="hover:text-white transition">info@siluetmodeltala.com</a>
                    </li>
                    <li>
                        <a href="tel:+6281234567890" class="hover:text-white transition">+62 (021) 555-0199 / +62 812-3456-7890</a>
                    </li>
                    <li class="pt-2">
                        <a href="{{ url('/register') }}" class="inline-block bg-white/10 hover:bg-white text-white hover:text-black text-[11px] px-3.5 py-1.5 rounded-full transition">
                            Audisi Talent Baru &rarr;
                        </a>
                    </li>
                </ul>
            </div>

        </div>

        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6e6861]">
            <p>&copy; {{ date('Y') }} Siluet Model Tala. All rights reserved.</p>
            <div class="flex space-x-6 mt-4 sm:mt-0">
                <a href="{{ url('/about') }}" class="hover:text-white transition">Kebijakan Privasi</a>
                <a href="{{ url('/contact') }}" class="hover:text-white transition">Syarat & Ketentuan</a>
            </div>
        </div>
    </div>
</footer>
