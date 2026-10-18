<script lang="ts">
  export let value: string = 'FOB Belawan';

  function select(term: string) {
    value = term;
  }
</script>

<div class="flex flex-col gap-2">
  <span class="text-xs font-semibold text-gray-700">
    Pilihan Incoterms 2020 <span class="text-rose-500">*</span>
  </span>
  <div class="grid grid-cols-2 gap-2">
    <button
      type="button"
      on:click={() => select('FOB Belawan')}
      class="p-3 rounded-xl border text-left transition-all min-h-[50px] {value === 'FOB Belawan' ? 'border-[#C88A2E] bg-[#C88A2E]/10 ring-2 ring-[#C88A2E]/30' : 'border-gray-200 bg-white hover:border-gray-300'}"
    >
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-[#0B2D24]">FOB Belawan</span>
        {#if value === 'FOB Belawan'}
          <span class="w-2 h-2 rounded-full bg-[#C88A2E]"></span>
        {/if}
      </div>
      <span class="text-[10px] text-gray-500 block mt-0.5">Free on Board di Pelabuhan Belawan</span>
    </button>

    <button
      type="button"
      on:click={() => select('CIF')}
      class="p-3 rounded-xl border text-left transition-all min-h-[50px] {value === 'CIF' ? 'border-[#C88A2E] bg-[#C88A2E]/10 ring-2 ring-[#C88A2E]/30' : 'border-gray-200 bg-white hover:border-gray-300'}"
    >
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-[#0B2D24]">CIF</span>
        {#if value === 'CIF'}
          <span class="w-2 h-2 rounded-full bg-[#C88A2E]"></span>
        {/if}
      </div>
      <span class="text-[10px] text-gray-500 block mt-0.5">Cost, Insurance & Freight ke Pelabuhan Tujuan</span>
    </button>
  </div>
</div>
