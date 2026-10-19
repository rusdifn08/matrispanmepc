<script lang="ts">
  import {
    ordersStore,
    supplierRequestsStore,
    invoicesStore,
    usdExchangeRate,
    toastAction,
  } from '../../../stores';
  import {
    MEPC_OFFICIAL_EMAIL,
    MEPC_ADMIN_DISPLAY_PHONE,
    exportElementToPdf,
    printElementIsolated,
  } from '../../../utils';
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
  let isGeneratingPdf = false;

  async function handleDownloadPdf() {
    if (isGeneratingPdf) return;
    isGeneratingPdf = true;
    toastAction.show('Menyusun file PDF resolusi tinggi (jsPDF + html2canvas)...', 'info');
    try {
      const filename = `MEPC_Laporan_${activeReportType.toUpperCase()}_${new Date().toISOString().slice(0, 10)}`;
      const ok = await exportElementToPdf('admin-report-printable-area', {
        filename,
        orientation: orientation,
        title: 'Laporan Resmi PT. MEPC',
      });
      if (ok) {
        toastAction.show('File PDF resmi berhasil diunduh ke perangkat!', 'success');
      } else {
        toastAction.show('Membuka dialog cetak...', 'warning');
        handlePrint();
      }
    } catch (e) {
      console.error('PDF export error:', e);
      handlePrint();
    } finally {
      isGeneratingPdf = false;
    }
  }

  function handlePrint() {
    printElementIsolated('admin-report-printable-area', 'Laporan Resmi PT. MEPC', orientation);
  }

  const currentDateFormatted = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const docNumber = `MEPC/REP-${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

  $: filteredOrders = $ordersStore.filter((o) => (statusFilter === 'ALL' ? true : o.status === statusFilter));
  $: filteredSuppliers = $supplierRequestsStore.filter((s) => (statusFilter === 'ALL' ? true : s.status === statusFilter));
  $: filteredInvoices = $invoicesStore;

  $: totalOrdersValueUSD = filteredOrders.reduce((sum, o) => sum + o.total_amount, 0);
  $: totalOrdersVolumeMT = filteredOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, it) => s + (it.unit === 'MT' ? it.quantity : 0), 0),
    0
  );
  $: totalSuppliersCapacityMT = filteredSuppliers.reduce(
    (sum, s) => sum + (s.unit === 'MT' ? s.qty_monthly_capacity : s.qty_monthly_capacity / 1000),
    0
  );
  $: totalInvoicesValueUSD = filteredInvoices.reduce((sum, inv) => sum + inv.payload.total_amount, 0);
</script>

{#if isOpen}
  <!-- Backdrop: Click outside to close, reduced opacity (bg-black/50) with blur -->
  <div
    id="admin-report-modal-root"
    on:click={(e) => { if (e.target === e.currentTarget) onClose(); }}
    on:keydown={(e) => { if (e.key === 'Escape') onClose(); }}
    class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 backdrop-blur-sm overflow-y-auto print:static print:inset-auto print:p-0 print:m-0 print:bg-white print:overflow-visible print:block"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
  >
    <!-- Modal Card Container -->
    <div
      id="admin-report-card-container"
      class="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh] print:static print:m-0 print:p-0 print:w-full print:max-w-none print:shadow-none print:border-none print:rounded-none print:overflow-visible print:max-h-none print:block"
    >
      
      <!-- TOP ACTION & CONFIG BAR (No-Print) -->
      <div class="no-print bg-[#0B2D24] text-white px-5 sm:px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C88A2E]/40 flex-shrink-0">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded text-[10px] font-black bg-[#C88A2E] text-white uppercase tracking-wider">
              EXECUTIVE REPORT GENERATOR
            </span>
            <span class="text-xs text-amber-200 font-medium hidden md:inline">
              Format Standar A4
            </span>
          </div>
          <h2 class="text-sm sm:text-base font-bold text-white mt-0.5">
            Pusat Dokumen Laporan Eksekutif & Ekspor PDF
          </h2>
        </div>

        <!-- Controls: Tabs, Orientation, PDF, Print & Close -->
        <div class="flex items-center flex-wrap gap-2 text-xs">
          <div class="flex items-center bg-[#051410] rounded-xl p-1 border border-emerald-500/30">
            <button
              type="button"
              on:click={() => (activeReportType = 'orders')}
              class="px-2.5 py-1.5 rounded-lg font-bold transition {activeReportType === 'orders' ? 'bg-[#C88A2E] text-white shadow-sm' : 'text-gray-300 hover:text-white'}"
            >
              Pesanan
            </button>
            <button
              type="button"
              on:click={() => (activeReportType = 'suppliers')}
              class="px-2.5 py-1.5 rounded-lg font-bold transition {activeReportType === 'suppliers' ? 'bg-[#C88A2E] text-white shadow-sm' : 'text-gray-300 hover:text-white'}"
            >
              Petani
            </button>
            <button
              type="button"
              on:click={() => (activeReportType = 'balance')}
              class="px-2.5 py-1.5 rounded-lg font-bold transition {activeReportType === 'balance' ? 'bg-[#C88A2E] text-white shadow-sm' : 'text-gray-300 hover:text-white'}"
            >
              Invoice
            </button>
          </div>

          <button
            type="button"
            on:click={() => (orientation = orientation === 'landscape' ? 'portrait' : 'landscape')}
            class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono flex items-center gap-1.5"
            title="Ganti orientasi kertas A4"
          >
            <span>{orientation === 'landscape' ? '↔ Landscape' : '↕ Portrait'}</span>
          </button>

          <!-- PDF Button: Icon + "PDF" -->
          <button
            type="button"
            on:click={handleDownloadPdf}
            disabled={isGeneratingPdf}
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition disabled:opacity-50"
            title="Download file PDF"
          >
            {#if isGeneratingPdf}
              <svg class="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>PDF...</span>
            {:else}
              <svg class="w-4 h-4 text-emerald-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <span>PDF</span>
            {/if}
          </button>

          <!-- Print Button: Icon + "Print" -->
          <button
            type="button"
            on:click={handlePrint}
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition"
            title="Cetak Dokumen"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>
            </svg>
            <span>Print</span>
          </button>

          <!-- Red Close Button -->
          <button
            type="button"
            on:click={onClose}
            class="p-1.5 text-rose-300 bg-rose-600/25 hover:bg-rose-600 hover:text-white rounded-xl border border-rose-500/50 transition shadow-sm"
            title="Tutup (ESC / Klik Luar)"
            aria-label="Tutup"
          >
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- FILTER SUBBAR (No-Print) -->
      <div class="no-print bg-gray-50 border-b border-gray-200 px-6 py-2 flex items-center justify-between text-xs text-gray-600">
        <div class="flex items-center gap-2">
          <span class="font-bold text-gray-700">Filter Status:</span>
          <select
            bind:value={statusFilter}
            class="px-2 py-1 rounded-lg border border-gray-300 bg-white font-medium text-xs focus:ring-1 focus:ring-[#C88A2E]"
          >
            <option value="ALL">Semua Status</option>
            <option value="APPROVED">Disetujui (Approved)</option>
            <option value="PENDING">Menunggu Review</option>
            <option value="CONTACTED">Dalam Komunikasi</option>
            <option value="REJECTED">Ditolak / Arsip</option>
          </select>
        </div>
        <div class="text-[11px] text-gray-500 font-mono hidden sm:block">
          Standar Kertas A4 • Klik luar area untuk menutup
        </div>
      </div>

      <!-- PRINTABLE REPORT CONTENT (A4 Structure) -->
      <div id="admin-report-printable-area" class="p-6 sm:p-10 overflow-y-auto bg-white text-gray-900 font-sans print:p-0 print:m-0">
        
        <!-- Corporate Letterhead Header: Clean separated layout, NO overlapping text -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-5 border-b-2 border-[#0B2D24] gap-4">
          <div class="flex items-center gap-3.5">
            <img
              src="/logo.webp"
              alt="Logo PT. MEPC"
              class="w-14 h-14 object-contain flex-shrink-0 rounded-full border border-[#C88A2E]/40 p-1 bg-amber-50/30"
              loading="eager"
            />
            <div>
              <h1 class="text-base sm:text-lg font-black text-[#0B2D24] uppercase tracking-wide leading-tight">
                PT. MATRISPAN EXIM PHOENIX CORP
              </h1>
              <p class="text-[11px] text-gray-600 leading-snug mt-1">
                Jl. Ir. H. Juanda No. 21 LK. II, Kota Binjai, Sumatera Utara 20714, Indonesia<br />
                Hub Ekspor: Pelabuhan Belawan (IDBLW) | Email: {MEPC_OFFICIAL_EMAIL} | Telp: {MEPC_ADMIN_DISPLAY_PHONE}
              </p>
            </div>
          </div>

          <div class="text-left sm:text-right flex flex-col items-start sm:items-end flex-shrink-0">
            <span class="px-2.5 py-1 rounded bg-[#0B2D24] text-white text-[10px] font-black uppercase tracking-wider mb-1">
              LAPORAN RESMI INTERNAL
            </span>
            <div class="text-xs font-mono font-bold text-gray-800">
              No: {docNumber}
            </div>
            <div class="text-[11px] text-gray-500">
              Tanggal: {currentDateFormatted}
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
    @page { size: A4 landscape; margin: 8mm 10mm; }
    :global(html), :global(body), :global(#app) {
      background: #ffffff !important; color: #000000 !important;
      margin: 0 !important; padding: 0 !important; width: 100% !important;
      height: auto !important; overflow: visible !important;
      -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
    }
    :global(main), :global(aside), :global(nav), :global(header), :global(footer), :global(.no-print) {
      display: none !important;
    }
    :global(.lg\:pl-72) { padding-left: 0 !important; }
    #admin-report-modal-root {
      position: static !important; inset: auto !important; width: 100% !important;
      height: auto !important; background: #ffffff !important; padding: 0 !important;
      margin: 0 !important; overflow: visible !important; display: block !important;
    }
    #admin-report-card-container {
      position: static !important; max-width: 100% !important; width: 100% !important;
      margin: 0 !important; box-shadow: none !important; border: none !important;
      border-radius: 0 !important; padding: 0 !important; background: #ffffff !important;
      max-height: none !important; height: auto !important; overflow: visible !important;
      display: block !important;
    }
    #admin-report-printable-area {
      position: static !important; width: 100% !important; margin: 0 !important;
      padding: 0 !important; box-sizing: border-box !important; color: #111827 !important;
      background: #ffffff !important; overflow: visible !important; display: block !important;
    }
    #admin-report-printable-area * {
      -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
    }
    :global(table) { page-break-inside: auto; }
    :global(tr) { page-break-inside: avoid; page-break-after: auto; }
    :global(thead) { display: table-header-group; }
  }
</style>
