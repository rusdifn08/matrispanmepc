<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { UserProfileDto } from '../../../../types';

  export let currentMenu: 'overview' | 'sales_analytics' | 'orders' | 'suppliers' | 'messages' | 'invoices' | 'catalog' | 'settings' = 'overview';
  export let pendingOrdersCount: number = 0;
  export let unreadMessagesCount: number = 0;
  export let pendingSuppliersCount: number = 0;
  export let invoicesCount: number = 0;
  export let currentUser: UserProfileDto | null = null;
  export let isOpenMobile: boolean = false;

  const dispatch = createEventDispatcher<{
    changeMenu: typeof currentMenu;
    closeMobile: void;
    openReport: void;
    backToHome: void;
    logout: void;
  }>();

  $: isOwner = currentUser?.role === 'SUPER_ADMIN';
  $: canAccessFinance = isOwner || currentUser?.role === 'FINANCE_OFFICER';

  $: adminDisplayName = (currentUser?.name && !currentUser.name.includes('H. Rusdi'))
    ? currentUser.name
    : 'Rusdi Fadli Nuryuda';
  $: avatarInitial = adminDisplayName.charAt(0) || 'R';

  function getRoleLabel(role?: string): string {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'Owner & Direktur Utama';
      case 'EXPORT_MANAGER':
        return 'Manajer Operasional Ekspor';
      case 'LOGISTICS_OFFICER':
        return 'Logistik & Muatan Belawan';
      case 'SOURCING_OFFICER':
        return 'Sourcing & Mitra Petani';
      case 'FINANCE_OFFICER':
        return 'Keuangan & Devisa Kargo';
      default:
        return 'Staff Operasional Ekspor';
    }
  }

  function handleSelect(menu: typeof currentMenu) {
    dispatch('changeMenu', menu);
    dispatch('closeMobile');
  }
</script>

<!-- Mobile Overlay Backdrop -->
{#if isOpenMobile}
  <button
    type="button"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden cursor-default border-0 p-0"
    on:click={() => dispatch('closeMobile')}
    aria-label="Tutup menu sidebar"
  ></button>
{/if}

<!-- Enterprise Admin Sidebar (Fixed Position) -->
<aside
  class="fixed top-0 left-0 bottom-0 z-40 w-72 h-screen bg-[#071F19] text-gray-200 border-r border-[#C88A2E]/25 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out {isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}"
  aria-label="Sidebar Navigasi Admin PT. MEPC"
>
  <!-- Top Section: Brand & User Identity -->
  <div class="p-5 border-b border-[#C88A2E]/20 bg-gradient-to-b from-[#0B2D24] to-[#071F19]">
    <!-- Brand Header -->
    <div class="flex items-center justify-between mb-5">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-white/10 border border-[#C88A2E]/60 flex items-center justify-center p-1.5 shadow-inner">
          <img src="/logo.webp" alt="PT. MEPC Logo" class="w-full h-full object-contain" />
        </div>
        <div>
          <span class="px-2 py-0.5 rounded text-[9px] font-black tracking-widest bg-[#C88A2E] text-white uppercase shadow-sm">
            Admin Portal
          </span>
          <h2 class="text-sm font-extrabold text-white font-heading tracking-wide mt-0.5">
            PT. MEPC B2B EXPORT
          </h2>
        </div>
      </div>

      <!-- Close button on mobile -->
      <button
        type="button"
        on:click={() => dispatch('closeMobile')}
        class="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
        aria-label="Tutup sidebar"
      >
        <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>
    </div>

    <!-- User Profile Card -->
    <div class="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C88A2E] to-amber-400 text-white font-extrabold flex items-center justify-center text-sm shadow-md flex-shrink-0">
          {avatarInitial}
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-1.5">
            <h3 class="text-xs font-bold text-white truncate" title={adminDisplayName}>
              {adminDisplayName}
            </h3>
            <span class="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[9px] font-black font-mono border border-amber-400/30">
              OWNER
            </span>
          </div>
          <p class="text-[11px] font-semibold text-[#D4AF37] truncate mt-0.5">
            PT. MATRISPAN EXIM PHOENIX CORP
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation Links Area (Scrollable) -->
  <nav class="flex-1 overflow-y-auto px-3.5 py-4 space-y-5 scrollbar-thin scrollbar-thumb-emerald-800 scrollbar-track-transparent">
    <!-- Group 1: Eksekutif & Strategis -->
    <div>
      <span class="px-3 text-[10px] font-black uppercase tracking-wider text-amber-400/70 select-none">
        Eksekutif & Strategis
      </span>
      <div class="mt-1.5 space-y-1">
        <!-- 1. Ringkasan Eksekutif -->
        <button
          type="button"
          on:click={() => handleSelect('overview')}
          class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all {currentMenu === 'overview' ? 'bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
        >
          <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
          </svg>
          <span class="flex-1 text-left">Ringkasan Eksekutif</span>
        </button>

        <!-- 2. Dashboard Penjualan (Owner Only) -->
        <button
          type="button"
          on:click={() => handleSelect('sales_analytics')}
          class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative {currentMenu === 'sales_analytics' ? 'bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
        >
          <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
          </svg>
          <span class="flex-1 text-left">Dashboard Penjualan</span>
          {#if isOwner}
            <span class="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-500/30 text-emerald-300 border border-emerald-400/30">
              OWNER
            </span>
          {:else}
            <span class="px-1.5 py-0.2 rounded text-[9px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
              🔒 Terbatas
            </span>
          {/if}
        </button>
      </div>
    </div>

    <!-- Group 2: Operasional Ekspor -->
    <div>
      <span class="px-3 text-[10px] font-black uppercase tracking-wider text-amber-400/70 select-none">
        Operasional Ekspor
      </span>
      <div class="mt-1.5 space-y-1">
        <!-- 3. Pesanan Masuk (Buyer Orders) -->
        <button
          type="button"
          on:click={() => handleSelect('orders')}
          class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative {currentMenu === 'orders' ? 'bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
        >
          <svg class="w-4 h-4 text-emerald-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>
          </svg>
          <span class="flex-1 text-left">Pesanan Masuk</span>
          {#if pendingOrdersCount > 0}
            <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white animate-pulse">
              {pendingOrdersCount}
            </span>
          {/if}
        </button>

        <!-- 4. Mitra Suplai Petani -->
        <button
          type="button"
          on:click={() => handleSelect('suppliers')}
          class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative {currentMenu === 'suppliers' ? 'bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
        >
          <svg class="w-4 h-4 text-amber-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
          </svg>
          <span class="flex-1 text-left">Mitra Suplai Petani</span>
          {#if pendingSuppliersCount > 0}
            <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white">
              {pendingSuppliersCount}
            </span>
          {/if}
        </button>

        <!-- 5. Pusat Pesan & Inquiries -->
        <button
          type="button"
          on:click={() => handleSelect('messages')}
          class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative {currentMenu === 'messages' ? 'bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
        >
          <svg class="w-4 h-4 text-teal-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
          </svg>
          <span class="flex-1 text-left">Pusat Pesan & Chat</span>
          {#if unreadMessagesCount > 0}
            <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white">
              {unreadMessagesCount}
            </span>
          {/if}
        </button>

        <!-- 6. Katalog & Harga FOB -->
        <button
          type="button"
          on:click={() => handleSelect('catalog')}
          class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all {currentMenu === 'catalog' ? 'bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
        >
          <svg class="w-4 h-4 text-indigo-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
          </svg>
          <span class="flex-1 text-left">Katalog Komoditas</span>
        </button>
      </div>
    </div>

    <!-- Group 3: Keuangan & Dokumen -->
    <div>
      <span class="px-3 text-[10px] font-black uppercase tracking-wider text-amber-400/70 select-none">
        Keuangan & Dokumen
      </span>
      <div class="mt-1.5 space-y-1">
        <!-- 7. Invoices & Keuangan -->
        <button
          type="button"
          on:click={() => handleSelect('invoices')}
          class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all relative {currentMenu === 'invoices' ? 'bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
        >
          <svg class="w-4 h-4 text-blue-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
          </svg>
          <span class="flex-1 text-left">Proforma Invoices</span>
          {#if canAccessFinance}
            <span class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">
              {invoicesCount}
            </span>
          {:else}
            <span class="px-1.5 py-0.2 rounded text-[9px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
              🔒 Terbatas
            </span>
          {/if}
        </button>

        <!-- Cetak Laporan PDF Trigger -->
        <button
          type="button"
          on:click={() => {
            dispatch('openReport');
            dispatch('closeMobile');
          }}
          class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-amber-300 hover:bg-amber-400/10 transition-colors"
        >
          <svg class="w-4 h-4 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>
          </svg>
          <span class="flex-1 text-left">Cetak Laporan Resmi</span>
        </button>
      </div>
    </div>

    <!-- Group 4: Sistem & Audit -->
    <div>
      <span class="px-3 text-[10px] font-black uppercase tracking-wider text-amber-400/70 select-none">
        Sistem & Audit
      </span>
      <div class="mt-1.5 space-y-1">
        <!-- 8. Pengaturan & Telemetri -->
        <button
          type="button"
          on:click={() => handleSelect('settings')}
          class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all {currentMenu === 'settings' ? 'bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'}"
        >
          <svg class="w-4 h-4 text-purple-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>
          <span class="flex-1 text-left">Pengaturan & Audit</span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Bottom Section: Actions -->
  <div class="p-4 border-t border-[#C88A2E]/20 bg-[#061813] space-y-2">
    <!-- Back to Public Site -->
    <button
      type="button"
      on:click={() => dispatch('backToHome')}
      class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors border border-white/10"
    >
      <svg class="w-4 h-4 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
      </svg>
      <span>Kembali ke Web Publik</span>
    </button>

    <!-- Logout -->
    <button
      type="button"
      on:click={() => dispatch('logout')}
      class="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-900/30 hover:bg-rose-900/50 text-rose-300 hover:text-white text-xs font-semibold transition-colors border border-rose-500/30"
    >
      <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
      </svg>
      <span>Keluar (Logout)</span>
    </button>
  </div>
</aside>
