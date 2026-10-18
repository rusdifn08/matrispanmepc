<script lang="ts">
  export let pillarNumber: string = '01';
  export let title: string;
  export let subtitle: string;
  export let description: string;
  export let metric: string;
  export let metricLabel: string;
  export let icon: 'range' | 'supply' | 'ethical' | 'shipping' = 'range';
  export let highlights: string[] = [];

  // Dedicated luxury color themes for each pillar
  const themeMap = {
    range: {
      gradientBar: 'from-amber-400 via-amber-500 to-[#C88A2E]',
      iconBg: 'bg-amber-500/10 border-amber-500/25',
      badgeBg: 'bg-gradient-to-r from-amber-500/10 to-amber-600/5 text-amber-900 border-amber-200/80',
      metricColor: 'text-[#C88A2E]',
      hoverBorder: 'hover:border-amber-400/70',
      hoverShadow: 'hover:shadow-amber-500/10',
      accentDot: 'bg-amber-500',
      tagBg: 'bg-amber-50 text-amber-800 border-amber-200/60'
    },
    supply: {
      gradientBar: 'from-emerald-400 via-emerald-600 to-[#0B2D24]',
      iconBg: 'bg-emerald-500/10 border-emerald-500/25',
      badgeBg: 'bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 text-emerald-950 border-emerald-200/80',
      metricColor: 'text-emerald-700',
      hoverBorder: 'hover:border-emerald-400/70',
      hoverShadow: 'hover:shadow-emerald-500/10',
      accentDot: 'bg-emerald-500',
      tagBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/60'
    },
    ethical: {
      gradientBar: 'from-teal-400 via-teal-600 to-[#0D9488]',
      iconBg: 'bg-teal-500/10 border-teal-500/25',
      badgeBg: 'bg-gradient-to-r from-teal-500/10 to-teal-600/5 text-teal-950 border-teal-200/80',
      metricColor: 'text-teal-700',
      hoverBorder: 'hover:border-teal-400/70',
      hoverShadow: 'hover:shadow-teal-500/10',
      accentDot: 'bg-teal-500',
      tagBg: 'bg-teal-50 text-teal-800 border-teal-200/60'
    },
    shipping: {
      gradientBar: 'from-sky-400 via-blue-600 to-[#0F3E52]',
      iconBg: 'bg-sky-500/10 border-sky-500/25',
      badgeBg: 'bg-gradient-to-r from-sky-500/10 to-sky-600/5 text-sky-950 border-sky-200/80',
      metricColor: 'text-sky-800',
      hoverBorder: 'hover:border-sky-400/70',
      hoverShadow: 'hover:shadow-sky-500/10',
      accentDot: 'bg-sky-500',
      tagBg: 'bg-sky-50 text-sky-800 border-sky-200/60'
    }
  };

  $: currentTheme = themeMap[icon] || themeMap.range;
</script>

<div
  class="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden {currentTheme.hoverBorder} {currentTheme.hoverShadow}"
>
  <!-- Top Vibrant Brand Gradient Accent Bar -->
  <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r {currentTheme.gradientBar}"></div>

  <!-- Background Pillar Watermark Number -->
  <span class="absolute -right-2 -bottom-4 text-7xl sm:text-8xl font-black font-heading text-gray-100/60 select-none pointer-events-none group-hover:text-gray-200/80 transition-colors">
    {pillarNumber}
  </span>

  <div>
    <!-- Header: Custom Multi-layer Icon + Metric Pill -->
    <div class="flex items-start justify-between gap-3 mb-5">
      <div class="w-14 h-14 rounded-2xl p-2.5 flex items-center justify-center border shadow-inner transition-transform duration-300 group-hover:scale-105 {currentTheme.iconBg}">
        {#if icon === 'range'}
          <svg class="w-full h-full transition-transform duration-300 group-hover:rotate-3" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="goldBox1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FCD34D" />
                <stop offset="100%" stop-color="#D97706" />
              </linearGradient>
              <linearGradient id="goldBox2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#F59E0B" />
                <stop offset="100%" stop-color="#B45309" />
              </linearGradient>
            </defs>
            <rect x="6" y="6" width="16" height="16" rx="4" fill="url(#goldBox1)" />
            <rect x="26" y="6" width="16" height="16" rx="4" fill="url(#goldBox2)" />
            <rect x="6" y="26" width="16" height="16" rx="4" fill="url(#goldBox2)" />
            <rect x="26" y="26" width="16" height="16" rx="4" fill="url(#goldBox1)" />
            <path d="M14 10C12 12 11 15 14 18C17 15 16 12 14 10Z" fill="#FFF" fill-opacity="0.9" />
            <circle cx="34" cy="14" r="4" stroke="#FFF" stroke-width="2" stroke-dasharray="2 1" />
            <path d="M10 34C13 32 15 36 18 34" stroke="#FFF" stroke-width="2" stroke-linecap="round" />
            <path d="M31 34H37M34 31V37" stroke="#FFF" stroke-width="2" stroke-linecap="round" />
            <circle cx="24" cy="24" r="5" fill="#0B2D24" stroke="#FDE68A" stroke-width="2" />
            <path d="M24 21L25 23.5L27.5 24L25 24.5L24 27L23 24.5L20.5 24L23 23.5L24 21Z" fill="#FBBF24" />
          </svg>
        {:else if icon === 'supply'}
          <svg class="w-full h-full transition-transform duration-300 group-hover:rotate-3" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="emGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#34D399" />
                <stop offset="100%" stop-color="#059669" />
              </linearGradient>
              <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0B2D24" />
                <stop offset="100%" stop-color="#047857" />
              </linearGradient>
            </defs>
            <path d="M24 16V32M14 20L24 24L34 20M14 28L24 24L34 28" stroke="#10B981" stroke-width="2" stroke-dasharray="3 2" />
            <rect x="18" y="18" width="12" height="12" rx="3" fill="url(#hubGrad)" stroke="#6EE7B7" stroke-width="2" />
            <path d="M22 24L24 26L27 22" stroke="#34D399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="12" cy="18" r="5" fill="url(#emGrad)" stroke="#D1FAE5" stroke-width="2" />
            <circle cx="36" cy="18" r="5" fill="url(#emGrad)" stroke="#D1FAE5" stroke-width="2" />
            <circle cx="12" cy="30" r="5" fill="url(#emGrad)" stroke="#D1FAE5" stroke-width="2" />
            <circle cx="36" cy="30" r="5" fill="url(#emGrad)" stroke="#D1FAE5" stroke-width="2" />
            <path d="M21 9L24 6L27 9" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        {:else if icon === 'ethical'}
          <svg class="w-full h-full transition-transform duration-300 group-hover:rotate-3" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#2DD4BF" />
                <stop offset="100%" stop-color="#0D9488" />
              </linearGradient>
              <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#A7F3D0" />
                <stop offset="100%" stop-color="#10B981" />
              </linearGradient>
            </defs>
            <path d="M24 5L38 10V22C38 31.5 32 39.5 24 43C16 39.5 10 31.5 10 22V10L24 5Z" fill="url(#tealGrad)" fill-opacity="0.15" stroke="url(#tealGrad)" stroke-width="2" />
            <path d="M19 14A10 10 0 0 1 31 16M29 32A10 10 0 0 1 17 30" stroke="#0D9488" stroke-width="2" stroke-linecap="round" />
            <path d="M24 33C24 24 33 21 33 21C33 21 33 30 24 33Z" fill="url(#tealGrad)" />
            <path d="M24 33C24 26 17 23 17 23C17 23 17 31 24 33Z" fill="url(#leafGrad)" />
            <path d="M24 33V23" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        {:else}
          <svg class="w-full h-full transition-transform duration-300 group-hover:rotate-3" viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#38BDF8" />
                <stop offset="100%" stop-color="#0284C7" />
              </linearGradient>
              <linearGradient id="hullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0F3E52" />
                <stop offset="100%" stop-color="#0369A1" />
              </linearGradient>
            </defs>
            <circle cx="24" cy="18" r="14" stroke="#BAE6FD" stroke-width="1.5" stroke-dasharray="2 2" />
            <path d="M14 18H34M24 8V28" stroke="#E0F2FE" stroke-width="1" />
            <path d="M7 32L11 38H37L41 32H7Z" fill="url(#hullGrad)" stroke="#0284C7" stroke-width="1.5" />
            <rect x="13" y="24" width="6" height="7" rx="1" fill="#F59E0B" />
            <rect x="21" y="24" width="6" height="7" rx="1" fill="#10B981" />
            <rect x="29" y="24" width="6" height="7" rx="1" fill="#0284C7" />
            <rect x="17" y="17" width="6" height="6" rx="1" fill="#D97706" />
            <rect x="25" y="17" width="6" height="6" rx="1" fill="#047857" />
            <path d="M4 41C8 39 12 43 16 41C20 39 24 43 28 41C32 39 36 43 40 41C44 39 46 41 48 41" stroke="url(#oceanGrad)" stroke-width="2.5" stroke-linecap="round" />
          </svg>
        {/if}
      </div>

      <!-- Capacity Metric Pill Badge -->
      <div class="px-3 py-1.5 rounded-xl border {currentTheme.badgeBg} text-right">
        <span class="text-sm sm:text-base font-black font-heading block {currentTheme.metricColor}">
          {metric}
        </span>
        <span class="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">
          {metricLabel}
        </span>
      </div>
    </div>

    <!-- Subtitle Badge with Status Dot -->
    <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 border {currentTheme.tagBg}">
      <span class="w-1.5 h-1.5 rounded-full {currentTheme.accentDot}"></span>
      {subtitle}
    </div>

    <!-- Title -->
    <h3 class="text-lg sm:text-xl font-extrabold text-[#0B2D24] font-heading mb-2.5 group-hover:text-[#C88A2E] transition-colors">
      {title}
    </h3>

    <!-- Description -->
    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
      {description}
    </p>
  </div>

  <!-- Highlights Bullet Tags -->
  {#if highlights && highlights.length > 0}
    <div class="pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
      {#each highlights as item}
        <span class="inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-200/60">
          <svg class="w-2.5 h-2.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          {item}
        </span>
      {/each}
    </div>
  {/if}
</div>
