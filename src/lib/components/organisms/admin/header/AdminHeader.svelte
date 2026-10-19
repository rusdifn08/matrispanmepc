<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { UserProfileDto } from '../../../../types';
  import { BACKEND_URL } from '../../../../api/client';

  export let backendTelemetry: any = null;
  export let isSyncing: boolean = false;
  export let currentUser: UserProfileDto | null = null;

  const dispatch = createEventDispatcher<{
    sync: void;
    openReport: void;
    testChime: void;
    backToHome: void;
    logout: void;
    toggleSidebar: void;
  }>();
</script>

<header class="bg-[#0B2D24] text-white border-b border-[#C88A2E]/30 sticky top-0 z-30 shadow-lg">
  <div class="w-full px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
    <!-- Left: Logo & Portal Title with Mobile Sidebar Toggle -->
    <div class="flex items-center gap-3">
      <!-- Mobile Sidebar Hamburger Toggle -->
      <button
        type="button"
        on:click={() => dispatch('toggleSidebar')}
        class="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 mr-1 flex items-center justify-center"
        aria-label="Buka menu navigasi admin"
        title="Buka Menu Navigasi"
      >
        <svg class="w-5 h-5 text-amber-300" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
      </button>

      <div class="w-10 h-10 rounded-xl bg-white/10 border border-[#C88A2E]/50 flex items-center justify-center p-1.5 shadow-inner flex-shrink-0">
        <img src="/logo.webp" alt="PT. MEPC Logo" class="w-full h-full object-contain" />
      </div>
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider bg-[#C88A2E] text-white uppercase shadow-sm">
            Staff Portal
          </span>
          <span class="text-xs text-amber-200/90 font-medium hidden sm:inline">
            PT. MATRISPAN EXIM PHOENIX CORP
          </span>
        </div>
        <h1 class="text-base sm:text-lg font-bold font-heading text-white flex items-center gap-2">
          B2B Export Administration & Operations
        </h1>
      </div>
    </div>

    <!-- Right: Live Port & Backend Status, Quick Tools -->
    <div class="flex items-center flex-wrap gap-2 text-xs">
      <!-- Live Backend Status Pill -->
      <div
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[11px]"
        title="Backend Axum Live Polling ({BACKEND_URL})"
      >
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>{BACKEND_URL.includes('onrender.com') ? 'Render Axum Online' : 'Axum 8080 Online'}</span>
        <button
          type="button"
          on:click={() => dispatch('sync')}
          class="ml-1 text-emerald-200 hover:text-white p-0.5 rounded hover:bg-emerald-800/50"
          title="Klik untuk paksa sinkronisasi sekarang"
        >
          <svg class="w-3.5 h-3.5 {isSyncing ? 'animate-spin' : ''}" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <!-- Axum Telemetry Shortcut Pill -->
      <a
        href="{BACKEND_URL}/dashboard"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] transition shadow-sm"
        title="Buka Rust Axum Server Performance Dashboard ({BACKEND_URL}/dashboard)"
      >
        <span class="text-amber-400 font-bold">⚡ {backendTelemetry ? `${backendTelemetry.avg_latency_ms.toFixed(1)}ms` : '<1ms'}</span>
        <span class="px-1.5 py-0.2 rounded bg-emerald-700 text-white text-[9px] font-sans font-bold">Axum UI</span>
      </a>

      <!-- Cetak Laporan PDF Button -->
      <button
        type="button"
        on:click={() => dispatch('openReport')}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#C88A2E] to-[#B07521] hover:brightness-110 text-white font-bold transition shadow-md"
        title="Buka Generator Laporan Resmi PDF (A4)"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>
        </svg>
        <span>Cetak Laporan PDF</span>
      </button>

      <!-- Belawan Live Status -->
      <div class="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950/70 border border-blue-500/30 text-blue-300 font-mono text-[11px]">
        <span>⚓ Belawan: Normal</span>
      </div>

      <!-- Audio Chime Tester -->
      <button
        type="button"
        on:click={() => dispatch('testChime')}
        class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-amber-200 transition-colors"
        title="Tes suara lonceng notifikasi order"
      >
        <svg class="w-3.5 h-3.5 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
        </svg>
        <span class="hidden sm:inline">Chime</span>
      </button>

      <!-- Authenticated Staff Identity Badge -->
      {#if currentUser}
        <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white">
          <div class="w-7 h-7 rounded-lg bg-[#C88A2E] text-white font-bold flex items-center justify-center text-xs">
            {currentUser.name.charAt(0)}
          </div>
          <div class="text-left text-[11px] leading-tight">
            <div class="font-bold text-white flex items-center gap-1.5">
              <span>{currentUser.name}</span>
              <span class="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono text-[9px]">
                {currentUser.nik}
              </span>
            </div>
            <div class="text-amber-200/80 text-[10px]">
              {currentUser.role} • {currentUser.department.split('&')[0]}
            </div>
          </div>
        </div>
      {/if}

      <!-- Back to Public Site -->
      <button
        type="button"
        on:click={() => dispatch('backToHome')}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-medium transition-colors"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
        </svg>
        <span class="hidden sm:inline">Web Publik</span>
      </button>

      <!-- Admin Logout -->
      <button
        type="button"
        on:click={() => dispatch('logout')}
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 border border-rose-500/50 text-white font-medium transition-colors"
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
