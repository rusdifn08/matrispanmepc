<script lang="ts">
  export let size: 'sm' | 'md' = 'md';
</script>

<div class="inline-flex items-center gap-2 {size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'} rounded-full bg-[#0B2D24]/80 border border-[#C88A2E]/50 backdrop-blur-sm text-white shadow-sm">
  <!-- Eagle / Garuda / Golden Emblem -->
  <svg class="{size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-[#C88A2E] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
  <span class="font-semibold tracking-wide">
    Mitra Strategis <span class="text-[#C88A2E]">FORSA IKN</span>
  </span>
  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
</div>
