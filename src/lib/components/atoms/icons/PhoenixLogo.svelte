<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let variant: 'dark' | 'light' = 'light';

  const sizeClasses = {
    sm: 'h-9 w-9',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
  };

  const textClasses = {
    dark: 'text-[#0B2D24]',
    light: 'text-white',
  };
</script>

<div class="flex items-center gap-3 whitespace-nowrap select-none">
  <!-- Official MEPC Logo from public/logo.webp -->
  <img
    src="/logo.webp"
    alt="PT. MATRISPAN EXIM PHOENIX CORP Logo"
    class="{sizeClasses[size]} object-contain flex-shrink-0 drop-shadow-md rounded-full bg-white/10 p-0.5 border border-[#C88A2E]/40"
    loading="eager"
  />

  <div class="flex flex-col leading-none">
    <div class="flex items-center gap-1.5">
      <span class="font-extrabold tracking-wider {textClasses[variant]} font-heading {size === 'lg' ? 'text-xl' : size === 'md' ? 'text-base' : 'text-sm'}">
        MATRISPAN
      </span>
      <span class="text-[#C88A2E] font-bold text-[10px] px-1.5 py-0.5 rounded bg-[#C88A2E]/20 border border-[#C88A2E]/40 tracking-wider">
        MEPC
      </span>
    </div>
    <span class="text-[9px] tracking-widest uppercase font-semibold mt-1 {variant === 'light' ? 'text-gray-300' : 'text-gray-500'}">
      Exim Phoenix Corp
    </span>
  </div>
</div>
