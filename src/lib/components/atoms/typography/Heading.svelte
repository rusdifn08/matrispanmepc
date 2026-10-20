<script lang="ts">
  export let level: 1 | 2 | 3 | 4 = 2;
  export let subtitle: string = '';
  export let align: 'left' | 'center' | 'right' = 'left';
  export let dark: boolean = false;
</script>

<div class="flex flex-col gap-2 {align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left'}">
  {#if subtitle}
    <div class="inline-flex items-center">
      <span class="text-xs font-bold uppercase tracking-widest text-[#C88A2E]">
        {subtitle}
      </span>
    </div>
  {/if}

  {#if level === 1}
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight {dark ? 'text-white' : 'text-[#0B2D24]'} font-heading">
      <slot />
    </h1>
  {:else if level === 2}
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight {dark ? 'text-white' : 'text-[#0B2D24]'} font-heading">
      <slot />
    </h2>
  {:else if level === 3}
    <h3 class="text-xl sm:text-2xl font-bold {dark ? 'text-white' : 'text-[#0B2D24]'} font-heading">
      <slot />
    </h3>
  {:else}
    <h4 class="text-lg font-bold {dark ? 'text-white' : 'text-[#0B2D24]'} font-heading">
      <slot />
    </h4>
  {/if}
</div>
