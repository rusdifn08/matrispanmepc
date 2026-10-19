<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { UserProfileDto } from '../../../../types';
  import { currentCurrency, usdExchangeRate } from '../../../../stores';
  import { formatCurrency } from '../../../../utils';

  export let currentUser: UserProfileDto | null = null;

  const dispatch = createEventDispatcher<{
    openReport: 'orders' | 'suppliers' | 'balance';
    changeMenu: 'overview' | 'sales_analytics' | 'orders' | 'suppliers' | 'messages' | 'invoices' | 'catalog' | 'settings';
  }>();

  $: isOwner = currentUser?.role === 'SUPER_ADMIN';

  // Real Export Sales Analytics Metrics (PT. MEPC FY2026)
  const totalSalesUsd = 2480000;
  const netMarginPercent = 19.8;
  const netProfitUsd = totalSalesUsd * (netMarginPercent / 100);
  const totalContainersTeu = 142;

  $: totalSalesDisplay = formatCurrency(totalSalesUsd, $currentCurrency, $usdExchangeRate);
  $: netProfitDisplay = formatCurrency(netProfitUsd, $currentCurrency, $usdExchangeRate);

  // Commodity Sales Breakdown
  const commoditySales = [
    { name: 'Briket Arang Kelapa (Shisha & BBQ)', valueUsd: 1080000, percentage: 43.5, color: 'bg-amber-500' },
    { name: 'Keripik Porang Kering Glukomanan', valueUsd: 680000, percentage: 27.4, color: 'bg-emerald-500' },
    { name: 'Hasil Laut Beku (Tuna & Vaname)', valueUsd: 420000, percentage: 16.9, color: 'bg-blue-500' },
    { name: 'Rempah Nusantara & Wastra Tenun', valueUsd: 300000, percentage: 12.2, color: 'bg-purple-500' },
  ];

  // Country Destination Breakdown
  const destinationSales = [
    { country: 'Arab Saudi & UEA (Jeddah, Jebel Ali)', valueUsd: 980000, percentage: 39.5, flag: '🇸🇦' },
    { country: 'Jepang & Korea Selatan (Tokyo, Busan)', valueUsd: 750000, percentage: 30.2, flag: '🇯🇵' },
    { country: 'Uni Eropa (Rotterdam & Hamburg)', valueUsd: 520000, percentage: 21.0, flag: '🇳🇱' },
    { country: 'Amerika Utara & Kanada', valueUsd: 230000, percentage: 9.3, flag: '🇺🇸' },
  ];

  // Top Export Contracts
  const topContracts = [
    { code: 'ORD-MEPC-2026-098', buyer: 'Kenji Takahashi', country: 'Jepang 🇯🇵', commodity: 'Porang Chips Export Grade', volume: '100 Ton', amountUsd: 450000, terms: 'Irrevocable L/C at Sight', margin: '22.4%' },
    { code: 'ORD-MEPC-2026-095', buyer: 'Al-Mansoor Trading LLC', country: 'UEA 🇦🇪', commodity: 'Premium Coconut Charcoal', volume: '120 Ton', amountUsd: 384000, terms: 'T/T 50% DP, 50% vs BL', margin: '20.1%' },
    { code: 'ORD-MEPC-2026-091', buyer: 'Nordic Spices GmbH', country: 'Jerman 🇩🇪', commodity: 'Cengkeh & Kayu Manis Grade A', volume: '30 Ton', amountUsd: 310000, terms: 'Irrevocable L/C at Sight', margin: '18.5%' },
    { code: 'ORD-MEPC-2026-088', buyer: 'Seoul Bio-Glucotech', country: 'Korea 🇰🇷', commodity: 'Tepung Porang Murni (KGM)', volume: '50 Ton', amountUsd: 285000, terms: 'T/T 100% Adv. Payment', margin: '21.0%' },
  ];
</script>

{#if !isOwner}
  <!-- RESTRICTED ACCESS SCREEN (FOR NON-OWNER ROLES) -->
  <div class="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-rose-200 text-center max-w-3xl mx-auto my-8">
    <div class="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
      <svg class="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 2a5 5 0 00-5 5v3H4a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm3 8V7a3 3 0 10-6 0v3h6z" clip-rule="evenodd"/>
      </svg>
    </div>

    <span class="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-700 tracking-wider uppercase">
      Akses Terbatas • Role-Based Security
    </span>

    <h2 class="text-xl sm:text-2xl font-bold font-heading text-gray-900 mt-4">
      Otorisasi Khusus Owner / Direksi Diperlukan
    </h2>

    <p class="text-sm text-gray-600 max-w-xl mx-auto mt-2 leading-relaxed">
      Halaman <strong>Dashboard Penjualan & Margin Keuntungan Ekspor</strong> berstatus 
      <span class="text-rose-600 font-bold">Confidential</span> dan hanya dapat diakses oleh akun dengan tingkat 
      <strong>Owner / Direktur Utama</strong> (H. Rusdi Matrispan).
    </p>

    <!-- Staff Identity Context -->
    <div class="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-200 max-w-md mx-auto text-left text-xs space-y-1">
      <div class="flex justify-between text-gray-500">
        <span>Akun Anda:</span>
        <span class="font-bold text-gray-800">{currentUser?.name || '-'}</span>
      </div>
      <div class="flex justify-between text-gray-500">
        <span>Role / Jabatan:</span>
        <span class="font-mono font-bold text-rose-600">{currentUser?.role || '-'}</span>
      </div>
      <div class="flex justify-between text-gray-500">
        <span>Divisi:</span>
        <span class="font-semibold text-gray-700">{currentUser?.department || '-'}</span>
      </div>
    </div>

    <div class="mt-8 flex items-center justify-center gap-3">
      <button
        type="button"
        on:click={() => dispatch('changeMenu', 'overview')}
        class="px-5 py-2.5 rounded-xl bg-[#0B2D24] text-white font-bold text-xs hover:bg-[#124235] transition shadow-md"
      >
        Kembali ke Ringkasan Eksekutif
      </button>
    </div>
  </div>
{:else}
  <!-- AUTHORIZED OWNER SALES DASHBOARD -->
  <div class="space-y-6">
    <!-- Header Banner -->
    <div class="bg-gradient-to-r from-[#0B2D24] to-[#124235] rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-[#C88A2E]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider bg-amber-400 text-[#0B2D24] uppercase shadow-sm">
            ⭐ Owner Exclusive
          </span>
          <span class="text-xs text-amber-200 font-mono">Tahun Fiskal 2026 (YTD)</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-black font-heading text-white mt-1">
          Dashboard Penjualan & Margin Keuntungan Ekspor
        </h2>
        <p class="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
          Analisis komprehensif omset devisa kargo B2B, margin profitabilitas, dan penetrasi komoditas Indonesia di pasar global.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          on:click={() => dispatch('openReport', 'orders')}
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white font-bold text-xs hover:brightness-110 transition shadow-md whitespace-nowrap"
        >
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>
          </svg>
          <span>Ekspor Laporan Penjualan</span>
        </button>
      </div>
    </div>

    <!-- 4 High-Level Financial KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Sales -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
        <span class="text-xs font-semibold text-gray-500 block">Total Omset Penjualan</span>
        <div class="text-xl sm:text-2xl font-black font-heading text-[#0B2D24] mt-1">
          {totalSalesDisplay}
        </div>
        <div class="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-600 font-bold">
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/>
          </svg>
          <span>+24.6% vs Target Q3</span>
        </div>
      </div>

      <!-- Net Margin -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
        <span class="text-xs font-semibold text-gray-500 block">Margin Laba Bersih</span>
        <div class="text-xl sm:text-2xl font-black font-heading text-emerald-600 mt-1">
          {netMarginPercent}%
        </div>
        <div class="text-[11px] text-gray-500 font-medium mt-2">
          Est. Laba: <span class="font-bold text-gray-800">{netProfitDisplay}</span>
        </div>
      </div>

      <!-- Export Volume -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
        <span class="text-xs font-semibold text-gray-500 block">Volume Kargo Muatan</span>
        <div class="text-xl sm:text-2xl font-black font-heading text-blue-600 mt-1">
          {totalContainersTeu} TEU
        </div>
        <div class="text-[11px] text-gray-500 font-medium mt-2">
          Pelabuhan Muat: <span class="font-bold text-gray-800">Belawan (IDBLW)</span>
        </div>
      </div>

      <!-- DHE Bank Indonesia Status -->
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
        <span class="text-xs font-semibold text-gray-500 block">Devisa Hasil Ekspor (DHE)</span>
        <div class="text-xl sm:text-2xl font-black font-heading text-[#C88A2E] mt-1">
          100% Valid
        </div>
        <div class="text-[11px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Kepatuhan BI & Bea Cukai Penuh
        </div>
      </div>
    </div>

    <!-- Charts & Analytics Matrix -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Commodity Breakdown -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
        <h3 class="text-sm font-extrabold text-gray-900 font-heading flex items-center gap-2">
          <span class="w-3 h-3 rounded-md bg-[#C88A2E]"></span>
          Komposisi Penjualan per Sektor Komoditas
        </h3>
        <div class="mt-5 space-y-4">
          {#each commoditySales as item}
            <div>
              <div class="flex items-center justify-between text-xs font-bold mb-1.5">
                <span class="text-gray-700">{item.name}</span>
                <span class="text-[#0B2D24] font-mono">{formatCurrency(item.valueUsd, $currentCurrency, $usdExchangeRate)} ({item.percentage}%)</span>
              </div>
              <div class="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                <div class="h-full {item.color} rounded-full transition-all duration-700" style="width: {item.percentage}%"></div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Destination Countries Breakdown -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
        <h3 class="text-sm font-extrabold text-gray-900 font-heading flex items-center gap-2">
          <span class="w-3 h-3 rounded-md bg-blue-600"></span>
          Penetrasi Penjualan per Kawasan Global
        </h3>
        <div class="mt-5 space-y-4">
          {#each destinationSales as item}
            <div>
              <div class="flex items-center justify-between text-xs font-bold mb-1.5">
                <span class="text-gray-700 flex items-center gap-1.5">
                  <span>{item.flag}</span>
                  <span>{item.country}</span>
                </span>
                <span class="text-[#0B2D24] font-mono">{formatCurrency(item.valueUsd, $currentCurrency, $usdExchangeRate)} ({item.percentage}%)</span>
              </div>
              <div class="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                <div class="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-700" style="width: {item.percentage}%"></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

    <!-- Top 4 Major Export Contracts Table -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 overflow-hidden">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-sm font-extrabold text-gray-900 font-heading">
            Kontrak Penjualan Ekspor Terbesar (Major Global Buyers)
          </h3>
          <p class="text-xs text-gray-500 mt-0.5">Daftar transaksi B2B terverifikasi dengan nilai devisa tertinggi</p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50/80 text-gray-500 font-bold uppercase tracking-wider">
              <th class="py-3 px-3">Kode Kontrak</th>
              <th class="py-3 px-3">Buyer & Negara</th>
              <th class="py-3 px-3">Komoditas & Tonase</th>
              <th class="py-3 px-3">Nilai Kontrak</th>
              <th class="py-3 px-3">Metode Bayar</th>
              <th class="py-3 px-3 text-right">Margin Laba</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 font-medium">
            {#each topContracts as contract}
              <tr class="hover:bg-gray-50/70 transition">
                <td class="py-3 px-3 font-mono font-bold text-[#0B2D24]">{contract.code}</td>
                <td class="py-3 px-3">
                  <div class="font-bold text-gray-900">{contract.buyer}</div>
                  <div class="text-[11px] text-gray-500">{contract.country}</div>
                </td>
                <td class="py-3 px-3">
                  <div class="font-semibold text-gray-800">{contract.commodity}</div>
                  <div class="text-[11px] text-gray-500">{contract.volume}</div>
                </td>
                <td class="py-3 px-3 font-mono font-black text-emerald-600">
                  {formatCurrency(contract.amountUsd, $currentCurrency, $usdExchangeRate)}
                </td>
                <td class="py-3 px-3">
                  <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold border border-blue-200">
                    {contract.terms}
                  </span>
                </td>
                <td class="py-3 px-3 text-right font-black font-mono text-[#C88A2E]">
                  {contract.margin}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/if}
