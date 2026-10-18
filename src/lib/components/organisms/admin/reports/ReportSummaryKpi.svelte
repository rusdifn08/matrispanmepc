<script lang="ts">
  import { formatCurrency } from '../../../../utils';

  export let activeReportType: 'orders' | 'suppliers' | 'balance' = 'orders';
  export let ordersCount = 0;
  export let ordersValueUSD = 0;
  export let ordersVolumeMT = 0;
  export let suppliersCount = 0;
  export let suppliersCapacityMT = 0;
  export let suppliersReadyCount = 0;
  export let invoicesCount = 0;
  export let invoicesValueUSD = 0;
  export let usdExchangeRate = 16250;
</script>

<div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-gray-200 text-xs">
  {#if activeReportType === 'orders'}
    <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Total Transaksi Order</span>
      <span class="text-lg font-mono font-black text-[#0B2D24]">{ordersCount} Pesanan</span>
    </div>
    <div class="p-3 bg-amber-50 rounded-xl border border-amber-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Total Nilai Ekspor (USD)</span>
      <span class="text-lg font-mono font-black text-[#C88A2E]">{formatCurrency(ordersValueUSD, 'USD')}</span>
    </div>
    <div class="p-3 bg-blue-50 rounded-xl border border-blue-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Total Nilai Ekspor (IDR)</span>
      <span class="text-sm font-mono font-bold text-blue-900 mt-1 block">
        {formatCurrency(ordersValueUSD * usdExchangeRate, 'IDR')}
      </span>
    </div>
    <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Total Volume Komoditas</span>
      <span class="text-lg font-mono font-black text-gray-800">{ordersVolumeMT.toLocaleString('id-ID')} MT</span>
    </div>
  {:else if activeReportType === 'suppliers'}
    <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Total Mitra Terdaftar</span>
      <span class="text-lg font-mono font-black text-[#0B2D24]">{suppliersCount} Mitra</span>
    </div>
    <div class="p-3 bg-amber-50 rounded-xl border border-amber-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Estimasi Suplai / Bulan</span>
      <span class="text-lg font-mono font-black text-[#C88A2E]">{suppliersCapacityMT.toLocaleString('id-ID')} MT</span>
    </div>
    <div class="p-3 bg-blue-50 rounded-xl border border-blue-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Cakupan Wilayah</span>
      <span class="text-sm font-bold text-blue-900 mt-1 block">Seluruh 38 Provinsi RI</span>
    </div>
    <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Status Siap Panen</span>
      <span class="text-lg font-mono font-black text-emerald-700">
        {suppliersReadyCount} Mitra
      </span>
    </div>
  {:else}
    <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Total Invoice Terbit</span>
      <span class="text-lg font-mono font-black text-[#0B2D24]">{invoicesCount} Dokumen</span>
    </div>
    <div class="p-3 bg-amber-50 rounded-xl border border-amber-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Total Tagihan Kargo</span>
      <span class="text-lg font-mono font-black text-[#C88A2E]">{formatCurrency(invoicesValueUSD, 'USD')}</span>
    </div>
    <div class="p-3 bg-blue-50 rounded-xl border border-blue-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Estimasi Rupiah (IDR)</span>
      <span class="text-sm font-mono font-bold text-blue-900 mt-1 block">
        {formatCurrency(invoicesValueUSD * usdExchangeRate, 'IDR')}
      </span>
    </div>
    <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">
      <span class="text-gray-600 block text-[10px] uppercase font-bold">Pelabuhan Muat Resmi</span>
      <span class="text-sm font-bold text-gray-800 mt-1 block">Pelabuhan Belawan (IDBLW)</span>
    </div>
  {/if}
</div>
