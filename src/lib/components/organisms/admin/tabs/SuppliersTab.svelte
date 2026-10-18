<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { supplierRequestsStore } from '../../../../stores';
  import { formatDate, getWhatsAppChatUrl } from '../../../../utils';
  import StatusBadge from '../../../atoms/badges/StatusBadge.svelte';

  const dispatch = createEventDispatcher<{
    openReport: 'suppliers';
    approveSupplier: string;
    rejectSupplier: string;
  }>();

  let supplierSearch = '';
  let supplierCategoryFilter = 'ALL';
  let supplierStatusFilter: 'ALL' | 'PENDING' | 'CONTACTED' | 'APPROVED' | 'REJECTED' = 'ALL';

  $: filteredSuppliers = $supplierRequestsStore.filter((s) => {
    const matchStatus = supplierStatusFilter === 'ALL' || s.status === supplierStatusFilter;
    const matchCat = supplierCategoryFilter === 'ALL' || s.commodity_category === supplierCategoryFilter;
    const matchSearch =
      !supplierSearch ||
      s.req_code.toLowerCase().includes(supplierSearch.toLowerCase()) ||
      s.supplier_name.toLowerCase().includes(supplierSearch.toLowerCase()) ||
      s.group_or_cv_name.toLowerCase().includes(supplierSearch.toLowerCase()) ||
      s.commodity_name.toLowerCase().includes(supplierSearch.toLowerCase()) ||
      s.location_regency.toLowerCase().includes(supplierSearch.toLowerCase());
    return matchStatus && matchCat && matchSearch;
  });
</script>

<div class="space-y-5 animate-in fade-in duration-200">
  <!-- Control Bar -->
  <div class="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
    <div class="relative flex-1">
      <input
        type="text"
        bind:value={supplierSearch}
        placeholder="Cari nama kelompok tani, komoditas, kabupaten/wilayah..."
        class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none"
      />
      <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
      </svg>
    </div>

    <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
      {#each ['ALL', 'Spices', 'Coconut', 'Seafood', 'Textiles'] as cat}
        <button
          type="button"
          on:click={() => (supplierCategoryFilter = cat)}
          class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors {supplierCategoryFilter === cat ? 'bg-[#0B2D24] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
        >
          {cat === 'ALL' ? 'Semua Sektor' : cat}
        </button>
      {/each}
    </div>

    <!-- Ekspor PDF Suplai Petani Button -->
    <button
      type="button"
      on:click={() => dispatch('openReport', 'suppliers')}
      class="px-3.5 py-2 rounded-xl bg-[#0B2D24] text-white hover:bg-[#124235] text-xs font-bold flex items-center gap-1.5 whitespace-nowrap shadow-sm"
      title="Cetak Rekapitulasi Suplai Petani & Mitra (A4 PDF)"
    >
      <svg class="w-4 h-4 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>
      </svg>
      <span>Ekspor PDF Suplai</span>
    </button>
  </div>

  <!-- Supplier Cards -->
  {#if filteredSuppliers.length === 0}
    <div class="bg-white rounded-3xl p-12 text-center border border-gray-200">
      <p class="text-sm text-gray-500">Tidak ada pengajuan suplai yang sesuai kriteria.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each filteredSuppliers as sup}
        <div class="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <div class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                  {sup.req_code}
                </span>
                <StatusBadge status={sup.status} />
              </div>
              <span class="text-[11px] text-gray-400">
                {formatDate(sup.created_at)}
              </span>
            </div>

            <h4 class="text-base font-bold text-[#0B2D24]">
              {sup.commodity_name}
            </h4>
            <p class="text-xs text-gray-500 font-medium">
              Kategori: {sup.commodity_category} • Mutu: {sup.moisture_or_grade}
            </p>

            <div class="grid grid-cols-2 gap-2 mt-3 p-3 rounded-2xl bg-[#F8F6F0] text-xs">
              <div>
                <span class="text-gray-400 block text-[10px]">Kapasitas Rutin</span>
                <strong class="text-gray-900">{sup.qty_monthly_capacity} {sup.unit}/Bulan</strong>
              </div>
              <div>
                <span class="text-gray-400 block text-[10px]">Harga Pengajuan</span>
                <strong class="text-emerald-700">IDR {new Intl.NumberFormat('id-ID').format(sup.offered_price_idr)}/{sup.unit}</strong>
              </div>
              <div>
                <span class="text-gray-400 block text-[10px]">Kesiapan</span>
                <strong class="text-gray-800">{sup.readiness_status}</strong>
              </div>
              <div>
                <span class="text-gray-400 block text-[10px]">Lokasi Kebun/Gudang</span>
                <strong class="text-gray-800">{sup.location_regency}, {sup.location_province}</strong>
              </div>
            </div>

            {#if sup.notes}
              <p class="text-xs text-gray-500 italic mt-2.5">
                "{sup.notes}"
              </p>
            {/if}
          </div>

          <div class="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
            <div class="text-xs">
              <span class="font-bold text-gray-800 block">{sup.group_or_cv_name}</span>
              <span class="text-gray-500 text-[11px]">{sup.supplier_name} • {sup.whatsapp_number}</span>
            </div>

            <div class="flex items-center gap-1.5">
              <!-- WhatsApp -->
              <a
                href={getWhatsAppChatUrl(sup.whatsapp_number, `Halo Bapak/Ibu ${sup.supplier_name} (${sup.group_or_cv_name}), ini Tim Ekspor & Pengadaan PT. MATRISPAN EXIM PHOENIX CORP mengenai penawaran ${sup.commodity_name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                class="px-2.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs"
                title="Negosiasi Suplai via WhatsApp"
              >
                Chat WA
              </a>

              <!-- Approve OKE -->
              {#if sup.status !== 'APPROVED'}
                <button
                  type="button"
                  on:click={() => dispatch('approveSupplier', sup.id)}
                  class="px-3 py-1.5 rounded-xl bg-[#0B2D24] text-white hover:bg-[#124235] font-bold text-xs shadow-sm"
                >
                  OKE (Setujui)
                </button>
              {/if}

              <!-- Reject -->
              {#if sup.status !== 'REJECTED' && sup.status !== 'APPROVED'}
                <button
                  type="button"
                  on:click={() => dispatch('rejectSupplier', sup.id)}
                  class="px-2 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs"
                >
                  Tolak
                </button>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
