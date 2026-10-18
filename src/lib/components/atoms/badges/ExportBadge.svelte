<script lang="ts">
  export let text: string = '100% Export Grade';
  export let variant: 'gold' | 'emerald' = 'gold';
</script>

{#if variant === 'gold'}
  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#C88A2E]/15 text-[#C88A2E] border border-[#C88A2E]/30">
    <svg class="w-3.5 h-3.5 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>
    {text}
  </span>
{:else}
  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#0B2D24]/10 text-[#0B2D24] border border-[#0B2D24]/20">
    <svg class="w-3.5 h-3.5 text-[#0B2D24]" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
    </svg>
    {text}
  </span>
{/if}
