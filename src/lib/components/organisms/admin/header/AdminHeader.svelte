<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { UserProfileDto } from '../../../../types';

  export let isSyncing: boolean = false;
  export let currentUser: UserProfileDto | null = null;

  const dispatch = createEventDispatcher<{
    sync: void;
    openReport: void;
    backToHome: void;
    logout: void;
    toggleSidebar: void;
  }>();
</script>

<header class="bg-[#0B2D24] text-white border-b border-[#C88A2E]/30 fixed top-0 left-0 right-0 lg:left-72 z-30 shadow-md h-16 no-print">
  <div class="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
    <!-- Left: Mobile Sidebar Toggle & Executive Title (Single Line) -->
    <div class="flex items-center gap-3 min-w-0">
      <!-- Mobile Sidebar Hamburger Toggle -->
      <button
        type="button"
        on:click={() => dispatch('toggleSidebar')}
        class="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 flex-shrink-0 flex items-center justify-center transition-colors active:scale-95"
        aria-label="Buka menu navigasi admin"
        title="Buka Menu Navigasi"
      >
        <svg class="w-5 h-5 text-amber-300" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Portal Title -->
      <div class="flex items-center gap-2.5 truncate">
        <span class="px-2 py-0.5 rounded text-[10px] font-black tracking-wider bg-[#C88A2E] text-white uppercase shadow-sm flex-shrink-0">
          Executive
        </span>
        <h1 class="text-sm sm:text-base font-bold font-heading text-white truncate tracking-wide">
          B2B Export Administration & Operations
        </h1>
      </div>
    </div>

    <!-- Right: Single-Row Executive Action Tools -->
    <div class="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
      <!-- Force Synchronize Button -->
      <button
        type="button"
        on:click={() => dispatch('sync')}
        class="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 text-xs font-semibold transition-colors active:scale-95"
        title="Sinkronisasi data backend Axum & NeonDB"
      >
        <svg class="w-4 h-4 {isSyncing ? 'animate-spin' : ''}" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
        </svg>
        <span class="hidden md:inline">Sinkronisasi</span>
      </button>

      <!-- Cetak Laporan PDF -->
      <button
        type="button"
        on:click={() => dispatch('openReport')}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#C88A2E] to-[#B07521] hover:brightness-110 text-white font-bold text-xs transition shadow-md active:scale-95"
        title="Buka Generator Laporan Resmi PDF (A4)"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>
        </svg>
        <span class="hidden sm:inline">Cetak Laporan PDF</span>
      </button>

      <!-- Authenticated Staff Identity Capsule -->
      {#if currentUser}
        <div class="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/10 border border-white/20 text-white">
          <div class="w-6 h-6 rounded-lg bg-[#C88A2E] text-white font-black flex items-center justify-center text-xs shadow-inner">
            {currentUser.name ? currentUser.name.charAt(0) : 'A'}
          </div>
          <div class="text-left text-[11px] leading-tight">
            <div class="font-bold text-white flex items-center gap-1">
              <span class="truncate max-w-[120px]">{currentUser.name}</span>
              <span class="px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono text-[9px]">
                {currentUser.nik}
              </span>
            </div>
          </div>
        </div>
      {/if}

      <!-- Back to Public Site -->
      <button
        type="button"
        on:click={() => dispatch('backToHome')}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-gray-200 hover:text-white text-xs font-semibold transition-colors active:scale-95"
        title="Kembali ke Web Publik"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
        <span class="hidden sm:inline">Web Publik</span>
      </button>

      <!-- Logout Button -->
      <button
        type="button"
        on:click={() => dispatch('logout')}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 border border-rose-500/50 text-white text-xs font-semibold transition-colors active:scale-95"
        title="Keluar dari sesi admin"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/>
        </svg>
        <span class="hidden sm:inline">Logout</span>
      </button>
    </div>
  </div>
</header>
