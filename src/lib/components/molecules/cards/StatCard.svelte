<script lang="ts">
  export let value: string;
  export let label: string;
  export let subtext: string = '';
  export let dark: boolean = false;
</script>

<div class="flex flex-col p-4 rounded-xl {dark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-100 shadow-sm'}">
  <div class="text-2xl sm:text-3xl font-extrabold text-[#C88A2E] font-heading mb-1">
    {value}
  </div>
  <div class="text-xs font-bold {dark ? 'text-gray-200' : 'text-gray-800'}">
    {label}
  </div>
  {#if subtext}
    <div class="text-[10px] {dark ? 'text-gray-400' : 'text-gray-500'} mt-0.5">
      {subtext}
    </div>
  {/if}
</div>
