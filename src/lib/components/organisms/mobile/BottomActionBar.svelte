<script lang="ts">
  import { cartCount, activeModal } from '../../../stores';
  import { MEPC_ADMIN_WA } from '../../../utils';

  export let onNavigate: (sectionId: string) => void = () => {};

  function openCart() {
    activeModal.set('cart');
  }

  function openSupplier() {
    activeModal.set('supplier');
  }
</script>

<!-- Mobile-First Bottom Sticky Action Bar (< 768px, Touch Target >= 48px) -->
<nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B2D24] border-t border-[#C88A2E]/30 shadow-2xl px-2 py-1.5 backdrop-blur-lg no-print">
  <div class="grid grid-cols-4 items-center justify-around gap-1">
    
    <!-- Home / Beranda -->
    <button
      type="button"
      on:click={() => onNavigate('hero')}
      class="flex flex-col items-center justify-center min-h-[48px] py-1 text-gray-300 hover:text-[#C88A2E] active:scale-95 transition-all"
    >
      <svg class="w-5 h-5 mb-0.5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
      </svg>
      <span class="text-[10px] font-bold">Beranda</span>
    </button>

    <!-- Katalog Komoditas -->
    <button
      type="button"
      on:click={() => onNavigate('commodities')}
      class="flex flex-col items-center justify-center min-h-[48px] py-1 text-gray-300 hover:text-[#C88A2E] active:scale-95 transition-all"
    >
      <svg class="w-5 h-5 mb-0.5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
      </svg>
      <span class="text-[10px] font-bold">Katalog</span>
    </button>

    <!-- Keranjang Order Buyer with Live Badge -->
    <button
      type="button"
      on:click={openCart}
      class="relative flex flex-col items-center justify-center min-h-[48px] py-1 text-amber-300 hover:text-white active:scale-95 transition-all"
    >
      <div class="relative">
        <svg class="w-5 h-5 mb-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
        </svg>
        {#if $cartCount > 0}
          <span class="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#C88A2E] text-white text-[9px] font-black flex items-center justify-center">
            {$cartCount}
          </span>
        {/if}
      </div>
      <span class="text-[10px] font-bold">Order ({$cartCount})</span>
    </button>

    <!-- Ajukan Suplai Petani / Mitra -->
    <button
      type="button"
      on:click={openSupplier}
      class="flex flex-col items-center justify-center min-h-[48px] py-1 text-emerald-400 hover:text-white active:scale-95 transition-all"
    >
      <svg class="w-5 h-5 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
      <span class="text-[10px] font-bold">Ajukan Suplai</span>
    </button>

  </div>
</nav>
