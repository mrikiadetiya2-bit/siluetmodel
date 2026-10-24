<!-- Search Modal -->
<div id="search-modal" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs hidden items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#ede7dd]">
        <div class="flex items-center justify-between mb-4">
            <h3 class="font-sans-luxury text-base font-semibold text-[#171513]">Cari di Siluet Model Tala</h3>
            <button type="button" id="close-search" class="text-gray-400 hover:text-black">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
        </div>
        <div class="relative">
            <input type="text" id="site-search-input" placeholder="Cari talenta, program, mentor, atau divisi..." class="w-full bg-[#f7f4ee] border border-[#ded8cf] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#171513]">
        </div>
        <div class="mt-4 flex flex-wrap gap-2 text-xs text-[#6e6761]">
            <span class="py-1">Populer:</span>
            <a href="{{ url('/women') }}" class="px-2.5 py-1 bg-[#f4f0e8] rounded-md hover:bg-[#e8e2d7] text-[#171513]">Women</a>
            <a href="{{ url('/men') }}" class="px-2.5 py-1 bg-[#f4f0e8] rounded-md hover:bg-[#e8e2d7] text-[#171513]">Men</a>
            <a href="{{ url('/kids') }}" class="px-2.5 py-1 bg-[#f4f0e8] rounded-md hover:bg-[#e8e2d7] text-[#171513]">Kids</a>
            <a href="{{ url('/modeling-school') }}" class="px-2.5 py-1 bg-[#f4f0e8] rounded-md hover:bg-[#e8e2d7] text-[#171513]">Modeling School</a>
            <a href="{{ url('/mentor') }}" class="px-2.5 py-1 bg-[#f4f0e8] rounded-md hover:bg-[#e8e2d7] text-[#171513]">Mentor</a>
        </div>
    </div>
</div>
