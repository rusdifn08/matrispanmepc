<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let currentMenu: 'overview' | 'sales_analytics' | 'orders' | 'suppliers' | 'messages' | 'invoices' | 'catalog' | 'settings' = 'overview';
  export let pendingOrdersCount: number = 0;
  export let unreadMessagesCount: number = 0;
  export let pendingSuppliersCount: number = 0;

  const dispatch = createEventDispatcher<{
    changeMenu: typeof currentMenu;
    toggleSidebar: void;
  }>();

  function selectMenu(menu: typeof currentMenu) {
    dispatch('changeMenu', menu);
  }
</script>

<!-- Mobile-Only Fixed Bottom Admin Navbar (< 1024px) -->
<nav
  class="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#071F19]/95 backdrop-blur-lg border-t border-[#C88A2E]/30 shadow-2xl px-2 py-1 select-none no-print"
  aria-label="Navigasi Bawah Admin Portal"
>
  <div class="grid grid-cols-5 items-center justify-around gap-1 max-w-lg mx-auto">
    <!-- 1. Ringkasan Eksekutif -->
    <button
      type="button"
      on:click={() => selectMenu('overview')}
      class="flex flex-col items-center justify-center min-h-[48px] py-1 transition-all active:scale-95 {currentMenu === 'overview' ? 'text-[#C88A2E]' : 'text-gray-400 hover:text-gray-200'}"
    >
      <div class="relative">
        <svg class="w-5 h-5 mb-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
        </svg>
      </div>
      <span class="text-[9px] font-bold tracking-tight">Ringkasan</span>
    </button>

    <!-- 2. Pesanan Masuk (Orders) -->
    <button
      type="button"
      on:click={() => selectMenu('orders')}
      class="relative flex flex-col items-center justify-center min-h-[48px] py-1 transition-all active:scale-95 {currentMenu === 'orders' ? 'text-[#C88A2E]' : 'text-gray-400 hover:text-gray-200'}"
    >
      <div class="relative">
        <svg class="w-5 h-5 mb-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>
        </svg>
        {#if pendingOrdersCount > 0}
          <span class="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center shadow-sm">
            {pendingOrdersCount}
          </span>
        {/if}
      </div>
      <span class="text-[9px] font-bold tracking-tight">Pesanan</span>
    </button>

    <!-- 3. Mitra & Suplai Petani (Suppliers) -->
    <button
      type="button"
      on:click={() => selectMenu('suppliers')}
      class="relative flex flex-col items-center justify-center min-h-[48px] py-1 transition-all active:scale-95 {currentMenu === 'suppliers' ? 'text-[#C88A2E]' : 'text-gray-400 hover:text-gray-200'}"
    >
      <div class="relative">
        <svg class="w-5 h-5 mb-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
        </svg>
        {#if pendingSuppliersCount > 0}
          <span class="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center shadow-sm">
            {pendingSuppliersCount}
          </span>
        {/if}
      </div>
      <span class="text-[9px] font-bold tracking-tight">Mitra</span>
    </button>

    <!-- 4. Pesan & WA (Messages) -->
    <button
      type="button"
      on:click={() => selectMenu('messages')}
      class="relative flex flex-col items-center justify-center min-h-[48px] py-1 transition-all active:scale-95 {currentMenu === 'messages' ? 'text-[#C88A2E]' : 'text-gray-400 hover:text-gray-200'}"
    >
      <div class="relative">
        <svg class="w-5 h-5 mb-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
        </svg>
        {#if unreadMessagesCount > 0}
          <span class="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-sm">
            {unreadMessagesCount}
          </span>
        {/if}
      </div>
      <span class="text-[9px] font-bold tracking-tight">Pesan</span>
    </button>

    <!-- 5. Buka Menu Sidebar Lengkap (Sales, Invoices, Catalog, Settings) -->
    <button
      type="button"
      on:click={() => dispatch('toggleSidebar')}
      class="flex flex-col items-center justify-center min-h-[48px] py-1 transition-all active:scale-95 text-gray-400 hover:text-[#C88A2E]"
      title="Buka seluruh menu sidebar"
    >
      <div class="p-1 rounded-lg bg-white/10 text-amber-300 mb-0.5">
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
      </div>
      <span class="text-[9px] font-bold tracking-tight text-amber-200/90">Sidebar</span>
    </button>
  </div>
</nav>
