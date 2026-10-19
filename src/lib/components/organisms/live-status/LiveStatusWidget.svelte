<script lang="ts">
  import { onMount } from 'svelte';

  let currentTimeWib: string = '';
  let currentTimeUtc: string = '';
  let currentTimeEst: string = '';
  let currentTimeCet: string = '';
  let isOpenNow: boolean = false;

  function updateClocks() {
    const now = new Date();
    
    // WIB (UTC+7)
    currentTimeWib = new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);

    // UTC
    currentTimeUtc = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);

    // EST (New York)
    currentTimeEst = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);

    // CET (Frankfurt/Paris)
    currentTimeCet = new Intl.DateTimeFormat('de-DE', {
      timeZone: 'Europe/Berlin',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now);

    // Operational check: 07:00 - 17:00 WIB, Monday to Saturday
    const day = now.getDay(); // 0 is Sunday
    const wibHours = parseInt(currentTimeWib.split(':')[0], 10);
    isOpenNow = day !== 0 && wibHours >= 7 && wibHours < 17;
  }

  onMount(() => {
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  });
</script>

<div id="belawan" class="bg-[#0B2D24] text-white py-12 border-t border-[#C88A2E]/30 w-full overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div class="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
      
      <!-- Headquarter & Belawan Proximity Info -->
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-[#C88A2E]/20 border border-[#C88A2E]/40 flex items-center justify-center flex-shrink-0">
          <svg class="w-7 h-7 text-[#C88A2E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 17h20M2 12h20M2 7h20" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-[#C88A2E] uppercase tracking-wider">Akses Logistik Maritim Ekspor</span>
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Pelabuhan Belawan Aktif
            </span>
          </div>
          <h4 class="text-lg font-bold font-heading text-white mt-0.5">
            Sumatera Utara Global Gateway (IDBLW)
          </h4>
          <p class="text-xs text-gray-300 mt-1 max-w-lg leading-relaxed">
            Berada di Binjai, terhubung langsung ke Pelabuhan Internasional Belawan melalui jalan tol trans-Sumatera. Efisiensi bongkar muat kontainer ke jalur perdagangan maritim Selat Malaka.
          </p>
        </div>
      </div>

      <!-- Timezone Clocks & Live Service Indicator -->
      <div class="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
          <!-- WIB Local Clock -->
          <div class="bg-black/30 px-3.5 py-2.5 rounded-xl border border-white/10 text-center">
            <span class="text-[10px] text-gray-400 uppercase tracking-wider block">WIB (Sumatera)</span>
            <span class="text-sm font-mono font-bold text-amber-300">{currentTimeWib || '07:00:00'}</span>
          </div>

          <!-- UTC Clock -->
          <div class="bg-black/30 px-3.5 py-2.5 rounded-xl border border-white/10 text-center">
            <span class="text-[10px] text-gray-400 uppercase tracking-wider block">UTC</span>
            <span class="text-sm font-mono font-bold text-gray-200">{currentTimeUtc || '00:00:00'}</span>
          </div>

          <!-- CET Frankfurt -->
          <div class="bg-black/30 px-3.5 py-2.5 rounded-xl border border-white/10 text-center">
            <span class="text-[10px] text-gray-400 uppercase tracking-wider block">CET (Eropa)</span>
            <span class="text-sm font-mono font-bold text-gray-200">{currentTimeCet || '01:00:00'}</span>
          </div>

          <!-- EST New York -->
          <div class="bg-black/30 px-3.5 py-2.5 rounded-xl border border-white/10 text-center">
            <span class="text-[10px] text-gray-400 uppercase tracking-wider block">EST (USA)</span>
            <span class="text-sm font-mono font-bold text-gray-200">{currentTimeEst || '19:00:00'}</span>
          </div>
        </div>

        <!-- Operational Status Indicator Pill -->
        <div class="flex flex-col items-center sm:items-end flex-shrink-0">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full {isOpenNow ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'} text-xs font-bold">
            <span class="w-2 h-2 rounded-full {isOpenNow ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse"></span>
            <span>{isOpenNow ? 'Trading Floor Buka (07:00 - 17:00)' : 'Layanan Antrean 24/7 Aktif'}</span>
          </div>
          <span class="text-[10px] text-gray-400 mt-1">Dukungan Transaksi Multi-Zona Waktu</span>
        </div>

      </div>

    </div>
  </div>
</div>
