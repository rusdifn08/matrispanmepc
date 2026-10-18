<script lang="ts">
  import {
    ordersStore,
    supplierRequestsStore,
    invoicesStore,
    usdExchangeRate,
  } from '../../../stores';
  import {
    MEPC_OFFICIAL_EMAIL,
    MEPC_ADMIN_DISPLAY_PHONE,
  } from '../../../utils';
  import PhoenixLogo from '../../atoms/icons/PhoenixLogo.svelte';
  import ReportOrdersTable from '../admin/reports/ReportOrdersTable.svelte';
  import ReportSuppliersTable from '../admin/reports/ReportSuppliersTable.svelte';
  import ReportInvoicesTable from '../admin/reports/ReportInvoicesTable.svelte';
  import ReportSummaryKpi from '../admin/reports/ReportSummaryKpi.svelte';
  import ReportSignatureBlock from '../admin/reports/ReportSignatureBlock.svelte';

  export let isOpen = false;
  export let initialType: 'orders' | 'suppliers' | 'balance' = 'orders';
  export let onClose: () => void = () => {};

  let activeReportType: 'orders' | 'suppliers' | 'balance' = initialType;
  $: if (initialType) activeReportType = initialType;

  let orientation: 'landscape' | 'portrait' = 'landscape';
  let statusFilter = 'ALL';

  function handlePrint() {
    window.print();
  }

  const currentDateFormatted = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const docNumber = `MEPC/REP-${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

  // Filtered datasets
  $: filteredOrders = $ordersStore.filter((o) => {
    if (statusFilter === 'ALL') return true;
    return o.status === statusFilter;
  });

  $: filteredSuppliers = $supplierRequestsStore.filter((s) => {
    if (statusFilter === 'ALL') return true;
    return s.status === statusFilter;
  });

  $: filteredInvoices = $invoicesStore;

  // Summaries
  $: totalOrdersValueUSD = filteredOrders.reduce((sum, o) => sum + o.total_amount, 0);
  $: totalOrdersVolumeMT = filteredOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, it) => s + (it.unit === 'MT' ? it.quantity : 0), 0),
    0
  );

  $: totalSuppliersCapacityMT = filteredSuppliers.reduce(
    (sum, s) => sum + (s.unit === 'MT' ? s.qty_monthly_capacity : s.qty_monthly_capacity / 1000),
    0
  );

  $: totalInvoicesValueUSD = filteredInvoices.reduce(
    (sum, inv) => sum + inv.payload.total_amount,
    0
  );
</script>

{#if isOpen}
  <div id="admin-report-modal-root" class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
    <div id="admin-report-card-container" class="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]">
      
      <!-- TOP ACTION & CONFIG BAR (No-Print) -->
      <div class="no-print bg-[#0B2D24] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C88A2E]/40 flex-shrink-0">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded text-[10px] font-black bg-[#C88A2E] text-white uppercase tracking-wider">
              EXECUTIVE REPORT GENERATOR
            </span>
            <span class="text-xs text-amber-200 font-medium hidden md:inline">
              Dokumen Resmi Format Cetak Standar A4
            </span>
          </div>
          <h2 class="text-base font-bold text-white mt-1">
            Pusat Dokumen Laporan Eksekutif & Ekspor PDF
          </h2>
        </div>

        <!-- Controls: Tabs, Orientation, Print & Close -->
        <div class="flex items-center flex-wrap gap-2 text-xs">
          <div class="flex items-center bg-[#051410] rounded-xl p-1 border border-emerald-500/30">
            <button
              type="button"
              on:click={() => (activeReportType = 'orders')}
              class="px-2.5 py-1.5 rounded-lg font-bold transition {activeReportType === 'orders' ? 'bg-[#C88A2E] text-white shadow-sm' : 'text-gray-300 hover:text-white'}"
            >
              Pesanan Buyer
            </button>
            <button
              type="button"
              on:click={() => (activeReportType = 'suppliers')}
              class="px-2.5 py-1.5 rounded-lg font-bold transition {activeReportType === 'suppliers' ? 'bg-[#C88A2E] text-white shadow-sm' : 'text-gray-300 hover:text-white'}"
            >
              Mitra Petani
            </button>
            <button
              type="button"
              on:click={() => (activeReportType = 'balance')}
              class="px-2.5 py-1.5 rounded-lg font-bold transition {activeReportType === 'balance' ? 'bg-[#C88A2E] text-white shadow-sm' : 'text-gray-300 hover:text-white'}"
            >
              Neraca Invoice
            </button>
          </div>

          <button
            type="button"
            on:click={() => (orientation = orientation === 'landscape' ? 'portrait' : 'landscape')}
            class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono flex items-center gap-1.5"
            title="Ganti orientasi kertas cetak A4"
          >
            <span>{orientation === 'landscape' ? '↔ Landscape' : '↕ Portrait'}</span>
          </button>

          <button
            type="button"
            on:click={handlePrint}
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white font-bold shadow-md hover:brightness-110 transition"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>
            </svg>
            <span>Cetak / PDF (A4)</span>
          </button>

          <button
            type="button"
            on:click={onClose}
            class="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10"
            aria-label="Tutup"
          >
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- FILTER SUBBAR (No-Print) -->
      <div class="no-print bg-gray-50 border-b border-gray-200 px-6 py-2.5 flex items-center justify-between text-xs text-gray-600">
        <div class="flex items-center gap-3">
          <span class="font-bold text-gray-700">Filter Status:</span>
          <select
            bind:value={statusFilter}
            class="px-2.5 py-1 rounded-lg border border-gray-300 bg-white font-medium text-xs focus:ring-1 focus:ring-[#C88A2E]"
          >
            <option value="ALL">Semua Status</option>
            <option value="APPROVED">Disetujui (Approved)</option>
            <option value="PENDING">Menunggu Review (Pending)</option>
            <option value="CONTACTED">Dalam Komunikasi</option>
            <option value="REJECTED">Ditolak / Arsip</option>
          </select>
        </div>
        <div class="text-[11px] text-gray-500 font-mono">
          Tips: Pada dialog print browser, pilih <strong>Save as PDF</strong> dan margin <strong>Default/None</strong>.
        </div>
      </div>

      <!-- PRINTABLE REPORT CONTENT (A4 Structure) -->
      <div id="admin-report-printable-area" class="p-6 sm:p-10 overflow-y-auto bg-white text-gray-900 font-sans print:p-0 print:m-0">
        
        <!-- Corporate Letterhead Header -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-[#0B2D24] gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 flex-shrink-0">
              <PhoenixLogo size="md" variant="dark" />
            </div>
            <div>
              <h1 class="text-sm sm:text-base font-extrabold text-[#0B2D24] uppercase tracking-wide">
                PT. MATRISPAN EXIM PHOENIX CORP
              </h1>
              <p class="text-[11px] text-gray-600 leading-relaxed">
                Jl. Ir. H. Juanda No. 21 LK. II, Kota Binjai, Sumatera Utara 20714, Indonesia<br />
                Hub Ekspor: Pelabuhan Belawan (IDBLW) | Email: {MEPC_OFFICIAL_EMAIL} | Telp: {MEPC_ADMIN_DISPLAY_PHONE}
              </p>
            </div>
          </div>

          <div class="text-left sm:text-right flex flex-col items-start sm:items-end">
            <span class="px-3 py-1 rounded bg-[#0B2D24] text-white text-[10px] font-black uppercase tracking-wider mb-1">
              LAPORAN RESMI INTERNAL
            </span>
            <div class="text-xs font-mono font-bold text-gray-800">
              No: {docNumber}
            </div>
            <div class="text-[11px] text-gray-500">
              Tanggal Cetak: {currentDateFormatted}
            </div>
          </div>
        </div>

        <!-- Document Title Banner -->
        <div class="py-4 text-center border-b border-gray-200">
          <h2 class="text-base sm:text-lg font-black text-[#0B2D24] tracking-tight uppercase">
            {#if activeReportType === 'orders'}
              REKAPITULASI PESANAN BUYER & PENJUALAN EKSPOR KOMODITAS
            {:else if activeReportType === 'suppliers'}
              REKAPITULASI KAPASITAS & JARINGAN SUPLAI PETANI MITRA NASIONAL
            {:else}
              LAPORAN NERACA FINANSIAL & DOKUMEN PROFORMA INVOICE
            {/if}
          </h2>
          <p class="text-xs text-gray-500 mt-0.5">
            Periode Operasional Tahun {new Date().getFullYear()} — Hub Ekspor Pelabuhan Belawan, Sumatera Utara
          </p>
        </div>

        <!-- KPI SUMMARY CARDS -->
        <ReportSummaryKpi
          {activeReportType}
          ordersCount={filteredOrders.length}
          ordersValueUSD={totalOrdersValueUSD}
          ordersVolumeMT={totalOrdersVolumeMT}
          suppliersCount={filteredSuppliers.length}
          suppliersCapacityMT={totalSuppliersCapacityMT}
          suppliersReadyCount={filteredSuppliers.filter((s) => s.readiness_status === 'Ready Stock').length}
          invoicesCount={filteredInvoices.length}
          invoicesValueUSD={totalInvoicesValueUSD}
          usdExchangeRate={$usdExchangeRate}
        />

        <!-- MAIN DATA TABLE -->
        <div class="py-4">
          {#if activeReportType === 'orders'}
            <ReportOrdersTable orders={filteredOrders} />
          {:else if activeReportType === 'suppliers'}
            <ReportSuppliersTable suppliers={filteredSuppliers} />
          {:else}
            <ReportInvoicesTable invoices={filteredInvoices} />
          {/if}
        </div>

        <!-- OFFICIAL SIGNATURE & DIGITAL SEAL FOOTER -->
        <ReportSignatureBlock {currentDateFormatted} />

      </div>

    </div>
  </div>
{/if}

<style>
  @media print {
    @page {
      size: A4 landscape;
      margin: 8mm 10mm 8mm 10mm;
    }

    :global(body) {
      background: #ffffff !important;
      color: #000000 !important;
      margin: 0 !important;
      padding: 0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    :global(body > *:not(#admin-report-modal-root)),
    :global(nav),
    :global(header),
    :global(footer),
    :global(.no-print) {
      display: none !important;
    }

    #admin-report-modal-root {
      position: absolute !important;
      left: 0 !important;
      top: 0 !important;
      width: 100% !important;
      background: transparent !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: visible !important;
      display: block !important;
      z-index: 99999 !important;
    }

    #admin-report-card-container {
      max-width: 100% !important;
      width: 100% !important;
      margin: 0 !important;
      box-shadow: none !important;
      border: none !important;
      border-radius: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      max-height: none !important;
      overflow: visible !important;
    }

    #admin-report-printable-area {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      color: #111827 !important;
      background: #ffffff !important;
      overflow: visible !important;
    }

    #admin-report-printable-area * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    :global(table) {
      page-break-inside: auto;
    }

    :global(tr) {
      page-break-inside: avoid;
      page-break-after: auto;
    }

    :global(thead) {
      display: table-header-group;
    }
  }
</style>
