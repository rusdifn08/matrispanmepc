<script lang="ts">
  export let title: string;
  export let subtitle: string;
  export let description: string;
  export let metric: string;
  export let metricLabel: string;
  export let icon: 'range' | 'supply' | 'ethical' | 'shipping' = 'range';
</script>

<div class="group relative flex flex-col p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-[#C88A2E] shadow-sm hover:shadow-xl transition-all duration-300">
  <div class="flex items-start justify-between mb-4">
    <div class="w-12 h-12 rounded-xl bg-[#0B2D24]/10 group-hover:bg-[#C88A2E]/15 flex items-center justify-center transition-colors">
      {#if icon === 'range'}
        <svg class="w-6 h-6 text-[#0B2D24] group-hover:text-[#C88A2E] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      {:else if icon === 'supply'}
        <svg class="w-6 h-6 text-[#0B2D24] group-hover:text-[#C88A2E] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      {:else if icon === 'ethical'}
        <svg class="w-6 h-6 text-[#0B2D24] group-hover:text-[#C88A2E] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      {:else}
        <svg class="w-6 h-6 text-[#0B2D24] group-hover:text-[#C88A2E] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M2 17h20M2 12h20M2 7h20" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      {/if}
    </div>

    <!-- Capacity Metric Pill -->
    <div class="text-right">
      <span class="text-base font-extrabold text-[#C88A2E] font-heading block">{metric}</span>
      <span class="text-[10px] text-gray-400 uppercase tracking-wider">{metricLabel}</span>
    </div>
  </div>

  <span class="text-[11px] font-bold uppercase tracking-wider text-[#C88A2E] mb-1">{subtitle}</span>
  <h3 class="text-lg font-bold text-[#0B2D24] font-heading mb-2 group-hover:text-[#C88A2E] transition-colors">
    {title}
  </h3>
  <p class="text-xs text-gray-600 leading-relaxed">
    {description}
  </p>
</div>
