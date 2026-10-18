<script lang="ts">
  export let label: string = '';
  export let value: string = '';
  export let options: { value: string; label: string }[] = [];
  export let required: boolean = false;
  export let id: string = `select-${Math.random().toString(36).substring(2, 7)}`;
</script>

<div class="flex flex-col gap-1.5 w-full">
  {#if label}
    <label for={id} class="text-xs font-semibold text-gray-700 flex items-center justify-between">
      <span>{label}</span>
      {#if required}
        <span class="text-rose-500 font-bold">*</span>
      {/if}
    </label>
  {/if}

  <select
    {id}
    bind:value
    {required}
    class="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] transition-all min-h-[46px]"
    on:change
  >
    {#each options as opt}
      <option value={opt.value}>{opt.label}</option>
    {/each}
  </select>
</div>
