<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let currentMenu: 'overview' | 'orders' | 'suppliers' | 'messages' | 'invoices' | 'catalog' | 'settings' = 'overview';
  export let pendingOrdersCount: number = 0;
  export let unreadMessagesCount: number = 0;
  export let pendingSuppliersCount: number = 0;
  export let invoicesCount: number = 0;

  const dispatch = createEventDispatcher<{
    changeMenu: 'overview' | 'orders' | 'suppliers' | 'messages' | 'invoices' | 'catalog' | 'settings';
  }>();

  function selectMenu(menu: typeof currentMenu) {
    dispatch('changeMenu', menu);
  }
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
  <nav class="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-gray-200">
    <!-- 1. Overview -->
    <button
      type="button"
      on:click={() => selectMenu('overview')}
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all {currentMenu === 'overview' ? 'bg-[#0B2D24] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <svg class="w-4 h-4 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
      </svg>
      <span>Ringkasan Eksekutif</span>
    </button>

    <!-- 2. Pesanan Masuk (Buyer Orders) -->
    <button
      type="button"
      on:click={() => selectMenu('orders')}
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all relative {currentMenu === 'orders' ? 'bg-[#0B2D24] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <svg class="w-4 h-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>
      </svg>
      <span>Pesanan Masuk (Buyer)</span>
      {#if pendingOrdersCount > 0}
        <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white animate-pulse">
          {pendingOrdersCount} Baru
        </span>
      {/if}
    </button>

    <!-- 3. Pusat Pesan (Messages & WhatsApp) -->
    <button
      type="button"
      on:click={() => selectMenu('messages')}
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all relative {currentMenu === 'messages' ? 'bg-[#0B2D24] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <svg class="w-4 h-4 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
      </svg>
      <span>Pusat Pesan & Inquiries</span>
      {#if unreadMessagesCount > 0}
        <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white">
          {unreadMessagesCount}
        </span>
      {/if}
    </button>

    <!-- 4. Pengajuan Suplai (Petani / Mitra) -->
    <button
      type="button"
      on:click={() => selectMenu('suppliers')}
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all {currentMenu === 'suppliers' ? 'bg-[#0B2D24] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <svg class="w-4 h-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
      </svg>
      <span>Mitra & Suplai Petani</span>
      {#if pendingSuppliersCount > 0}
        <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white">
          {pendingSuppliersCount}
        </span>
      {/if}
    </button>

    <!-- 5. Dokumen & Invoices -->
    <button
      type="button"
      on:click={() => selectMenu('invoices')}
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all {currentMenu === 'invoices' ? 'bg-[#0B2D24] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <svg class="w-4 h-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
      </svg>
      <span>Proforma Invoices ({invoicesCount})</span>
    </button>

    <!-- 6. Katalog & Harga FOB -->
    <button
      type="button"
      on:click={() => selectMenu('catalog')}
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all {currentMenu === 'catalog' ? 'bg-[#0B2D24] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <svg class="w-4 h-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
      </svg>
      <span>Katalog & Harga FOB</span>
    </button>

    <!-- 7. Sistem & Pengaturan -->
    <button
      type="button"
      on:click={() => selectMenu('settings')}
      class="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all {currentMenu === 'settings' ? 'bg-[#0B2D24] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <svg class="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
      </svg>
      <span>Pengaturan Sistem</span>
    </button>
  </nav>
</div>
