<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled: boolean = false;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let className: string = '';

  const sizeClasses = {
    sm: 'px-3.5 py-2 text-xs min-h-[40px]',
    md: 'px-5 py-2.5 text-sm min-h-[48px]',
    lg: 'px-7 py-3.5 text-base min-h-[52px]',
  };
</script>

<button
  {type}
  {disabled}
  on:click
  class="inline-flex items-center justify-center font-bold rounded-xl bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white hover:from-[#d5983e] hover:to-[#be8028] active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg shadow-[#C88A2E]/25 border border-[#dfa44c]/50 disabled:opacity-50 disabled:pointer-events-none {sizeClasses[size]} {className}"
>
  <slot />
</button>
