<script lang="ts">
  import { onMount } from 'svelte';
  import ForsaIknBadge from '../../atoms/icons/ForsaIknBadge.svelte';
  import StatCard from '../../molecules/cards/StatCard.svelte';

  // Parallax states (mouse tracking + scroll tracking)
  let mouseX = 0;
  let mouseY = 0;
  let scrollY = 0;

  function handleMouseMove(e: MouseEvent) {
    const { innerWidth, innerHeight } = window;
    mouseX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
    mouseY = (e.clientY / innerHeight - 0.5) * 2;
  }

  function handleScroll() {
    scrollY = window.scrollY;
  }

  onMount(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<section id="hero" class="relative min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#0B2D24] text-white">
  
  <!-- Parallax High-Resolution Container Ship Hero Background with Faded Top Gradient -->
  <div
    class="absolute inset-0 z-0 transition-transform duration-500 ease-out will-change-transform pointer-events-none"
    style="transform: translate({mouseX * -14}px, {mouseY * -10 + scrollY * 0.3}px) scale(1.08);"
  >
    <img
      src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80"
      alt="Kapal kargo kontainer ekspor PT. MEPC melintasi perairan internasional"
      class="w-full h-full object-cover object-top opacity-55 mix-blend-luminosity filter contrast-105"
      loading="eager"
    />
    <!-- Faded Gradient Overlays: Top slightly visible with smooth cinematic fade to deep emerald below -->
    <div class="absolute inset-0 bg-gradient-to-b from-[#0B2D24]/30 via-[#0B2D24]/75 to-[#0B2D24]"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-[#0B2D24] via-transparent to-[#0B2D24]/20"></div>
    <div class="absolute inset-0 bg-[radial-gradient(#C88A2E_1px,transparent_1px)] [background-size:28px_28px] opacity-15"></div>
  </div>

  <!-- Parallax Floating Glowing Ambient Orbs -->
  <div
    class="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#C88A2E]/20 blur-3xl pointer-events-none transition-transform duration-700 ease-out"
    style="transform: translate({mouseX * 25}px, {mouseY * 20 + scrollY * -0.2}px);"
  ></div>
  <div
    class="absolute bottom-10 -right-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none transition-transform duration-700 ease-out"
    style="transform: translate({mouseX * -30}px, {mouseY * -25 + scrollY * 0.15}px);"
  ></div>

  <!-- Floating Dynamic Live Status Badge with Scroll & Mouse Parallax -->
  <div
    class="hidden md:flex absolute top-28 right-12 z-20 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-transform duration-500 ease-out"
    style="transform: translate({mouseX * 15}px, {mouseY * 12 + scrollY * -0.25}px);"
  >
    <div class="w-8 h-8 rounded-xl bg-[#C88A2E]/25 border border-[#C88A2E] flex items-center justify-center text-[#C88A2E]">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M2 17h20M2 12h20M2 7h20" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </div>
    <div class="text-left text-xs">
      <span class="text-amber-300 font-bold block">Jadwal Pengapalan Rutin</span>
      <span class="text-[10px] text-gray-300">Belawan (IDBLW) Direct Ocean Line</span>
    </div>
  </div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col items-center text-center">
    
    <!-- Strategic Partnership Badge with Hover Flare -->
    <div class="mb-6 transform hover:scale-105 transition-transform duration-300 cursor-default">
      <ForsaIknBadge />
    </div>

    <!-- Bilingual Corporate Tagline -->
    <div class="inline-flex items-center gap-2 mb-4">
      <span class="w-8 h-[2px] bg-[#C88A2E]"></span>
      <span class="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#C88A2E] drop-shadow-sm">
        Purely Indonesian, Perfectly Global
      </span>
      <span class="w-8 h-[2px] bg-[#C88A2E]"></span>
    </div>

    <!-- Main Hero Headline with Golden Glow Accent -->
    <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl font-heading leading-tight mb-6 drop-shadow-md">
      Bringing Indonesia's <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE099] via-[#C88A2E] to-[#E5A84B] underline decoration-[#C88A2E]/40 decoration-wavy decoration-1">Finest Commodities</span> to the World
    </h1>

    <p class="text-sm sm:text-base md:text-lg text-gray-200/90 max-w-2xl mx-auto mb-14 leading-relaxed font-normal">
      Portal perdagangan ekspor B2B resmi <strong class="text-white font-semibold">PT. Matrispan Exim Phoenix Corp</strong>. Menghubungkan rempah nusantara, produk turunan kelapa, hasil laut beku berstandar rantai dingin, dan wastra tenun Sumatera dari Binjai langsung ke pembeli global via Pelabuhan Internasional Belawan.
    </p>

    <!-- Verified Statistics Grid with Interactive Hover & Scroll Elevation -->
    <div
      class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl transition-transform duration-500 ease-out"
      style="transform: translateY({scrollY * -0.06}px);"
    >
      <div class="transform hover:-translate-y-1.5 transition-transform duration-300">
        <StatCard
          value="4 Sektor"
          label="Komoditas Utama"
          subtext="Rempah, Kelapa, Seafood, Tekstil"
          dark={true}
        />
      </div>
      <div class="transform hover:-translate-y-1.5 transition-transform duration-300">
        <StatCard
          value="100%"
          label="Export Grade"
          subtext="Standar Mutu & Fumigasi Ekspor"
          dark={true}
        />
      </div>
      <div class="transform hover:-translate-y-1.5 transition-transform duration-300">
        <StatCard
          value="IDBLW"
          label="Pelabuhan Belawan"
          subtext="Akses Jalur Maritim Selat Malaka"
          dark={true}
        />
      </div>
      <div class="transform hover:-translate-y-1.5 transition-transform duration-300">
        <StatCard
          value="25+"
          label="Negara Tujuan"
          subtext="Eropa, Timur Tengah, Asia & Amerika"
          dark={true}
        />
      </div>
    </div>

  </div>

  <!-- Bottom Smooth Wave Divider -->
  <div class="absolute bottom-0 left-0 right-0 h-8 bg-[#F8F6F0] rounded-t-[32px]"></div>
</section>
