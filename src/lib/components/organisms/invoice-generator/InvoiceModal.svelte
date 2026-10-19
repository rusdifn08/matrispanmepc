<script lang="ts">
  import { activeModal, activeInvoice, toastAction } from '../../../stores';
  import {
    formatCurrency,
    MEPC_OFFICIAL_EMAIL,
    MEPC_ADMIN_DISPLAY_PHONE,
    exportElementToPdf,
    printElementIsolated,
  } from '../../../utils';
  import PhoenixLogo from '../../atoms/icons/PhoenixLogo.svelte';

  let isGeneratingPdf = false;

  function closeModal() {
    activeModal.set(null);
  }

  async function handleDownloadPdf() {
    if (isGeneratingPdf || !$activeInvoice) return;
    isGeneratingPdf = true;
    toastAction.show('Menyusun file PDF Proforma Invoice resmi (jsPDF + html2canvas)...', 'info');
    try {
      const invNumber = $activeInvoice.invoice_number || 'INV-MEPC';
      const ok = await exportElementToPdf('invoice-printable-area', {
        filename: `Invoice_${invNumber}`,
        orientation: 'portrait',
        title: `Proforma Invoice - ${invNumber}`,
      });
      if (ok) {
        toastAction.show('File Proforma Invoice PDF berhasil diunduh!', 'success');
      } else {
        toastAction.show('Membuka dialog cetak bersih...', 'warning');
        handlePrint();
      }
    } catch (e) {
      console.error('Invoice PDF error:', e);
      handlePrint();
    } finally {
      isGeneratingPdf = false;
    }
  }

  function handlePrint() {
    const invNumber = $activeInvoice?.invoice_number || 'Proforma Invoice';
    printElementIsolated('invoice-printable-area', `Invoice ${invNumber}`, 'portrait');
  }
</script>

{#if $activeModal === 'invoice' && $activeInvoice}
  <div id="invoice-modal-root" class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto print:static print:inset-auto print:p-0 print:m-0 print:bg-white print:overflow-visible print:block">
    <div id="invoice-card-container" class="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden my-4 sm:my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh] print:static print:m-0 print:p-0 print:w-full print:max-w-none print:shadow-none print:border-none print:rounded-none print:overflow-visible print:max-h-none print:block">
      
      <!-- Top Action Bar (No-Print) -->
      <div class="no-print bg-[#0B2D24] text-white px-6 py-4 flex items-center justify-between border-b border-[#C88A2E]/40 flex-shrink-0">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-md text-xs font-bold bg-[#C88A2E] text-white">
            OFFICIAL DOCUMENT
          </span>
          <span class="text-xs text-gray-200 hidden sm:inline">
            Dokumen Resmi Proforma Invoice Terverifikasi PT. MEPC
          </span>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Download Invoice PDF (jsPDF + html2canvas) -->
          <button
            type="button"
            on:click={handleDownloadPdf}
            disabled={isGeneratingPdf}
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition disabled:opacity-50"
            title="Download file Proforma Invoice PDF langsung ke perangkat"
          >
            {#if isGeneratingPdf}
              <svg class="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Membuat PDF...</span>
            {:else}
              <svg class="w-4 h-4 text-emerald-200" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              <span>Download PDF</span>
            {/if}
          </button>

          <!-- Clean Isolated Print Button -->
          <button
            type="button"
            on:click={handlePrint}
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#C88A2E] to-[#B07521] text-white font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition"
            title="Buka dialog cetak printer A4 bebas background"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>
            </svg>
            <span class="hidden sm:inline">Cetak Dokumen</span>
          </button>

          <button
            type="button"
            on:click={closeModal}
            class="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10"
            aria-label="Tutup"
          >
            <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Printable Invoice Paper (A4 Structured Layout) -->
      <div id="invoice-printable-area" class="p-6 sm:p-10 overflow-y-auto bg-white text-gray-900 font-sans print:p-0 print:m-0">
        
        <!-- Corporate Letterhead Header -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b-2 border-[#0B2D24] gap-4">
          <div>
            <PhoenixLogo size="lg" variant="dark" />
            <h2 class="text-sm font-extrabold text-[#0B2D24] mt-2 uppercase tracking-wide">
              PT. MATRISPAN EXIM PHOENIX CORP
            </h2>
            <p class="text-[11px] text-gray-600 max-w-md leading-relaxed">
              Jl. Ir. H. Juanda No. 21 LK. II, Kota Binjai, Sumatera Utara 20714, Indonesia<br />
              Email: {MEPC_OFFICIAL_EMAIL} | Telp/WA: {MEPC_ADMIN_DISPLAY_PHONE}
            </p>
          </div>

          <div class="text-left sm:text-right flex flex-col items-start sm:items-end">
            <span class="px-3 py-1 rounded bg-[#0B2D24] text-white text-xs font-bold uppercase tracking-wider mb-1">
              {$activeInvoice.payload.title}
            </span>
            <span class="text-xs font-bold text-[#C88A2E]">
              {$activeInvoice.payload.status}
            </span>
            <div class="text-sm font-mono font-extrabold text-[#0B2D24] mt-1">
              {$activeInvoice.invoice_number}
            </div>
            <span class="text-[11px] text-gray-500">
              Ref Order: #{$activeInvoice.ref_code}
            </span>
          </div>
        </div>

        <!-- Meta Info Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-gray-200 text-xs">
          <!-- Recipient -->
          <div class="space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Diterbitkan Untuk:</span>
            <h4 class="text-sm font-bold text-gray-900">{$activeInvoice.payload.recipient_company}</h4>
            <p class="text-gray-600">
              Attn: {$activeInvoice.payload.recipient_name}<br />
              Email: {$activeInvoice.payload.recipient_email || '-'}<br />
              WhatsApp: {$activeInvoice.payload.recipient_phone}<br />
              Negara: {$activeInvoice.payload.destination_country}
            </p>
          </div>

          <!-- Shipping & Loading Logistics -->
          <div class="space-y-1 sm:text-right">
            <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">Parameter Logistik:</span>
            <p class="text-gray-700">
              <strong>Pelabuhan Muat:</strong> {$activeInvoice.payload.port_of_loading}<br />
              <strong>Pelabuhan Tujuan:</strong> {$activeInvoice.payload.destination_port}<br />
              <strong>Incoterms:</strong> <span class="font-bold text-[#C88A2E]">{$activeInvoice.payload.incoterms}</span><br />
              <strong>Tanggal Terbit:</strong> {$activeInvoice.payload.issued_date}<br />
              <strong>Jatuh Tempo:</strong> {$activeInvoice.payload.due_date}
            </p>
          </div>
        </div>

        <!-- Line Items Table -->
        <div class="py-6">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="bg-[#0B2D24] text-white">
                <th class="py-2.5 px-3 rounded-l-lg font-bold">No</th>
                <th class="py-2.5 px-3 font-bold">Deskripsi Komoditas</th>
                <th class="py-2.5 px-3 font-bold font-mono">HS Code</th>
                <th class="py-2.5 px-3 font-bold text-center">Kuantitas</th>
                <th class="py-2.5 px-3 font-bold text-right">Harga Satuan (USD)</th>
                <th class="py-2.5 px-3 font-bold text-right rounded-r-lg">Subtotal (USD)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {#each $activeInvoice.payload.items as item, index}
                <tr class="hover:bg-gray-50">
                  <td class="py-3 px-3 font-mono text-gray-500">{index + 1}</td>
                  <td class="py-3 px-3 font-semibold text-gray-900">{item.description}</td>
                  <td class="py-3 px-3 font-mono text-gray-600">{item.hs_code}</td>
                  <td class="py-3 px-3 text-center font-bold text-gray-800">{item.quantity} {item.unit}</td>
                  <td class="py-3 px-3 text-right font-mono">{formatCurrency(item.unit_price, 'USD')}</td>
                  <td class="py-3 px-3 text-right font-mono font-bold text-[#0B2D24]">
                    {formatCurrency(item.subtotal, 'USD')}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>

          <!-- Financial Calculation Breakdown -->
          <div class="flex flex-col sm:flex-row justify-between items-start pt-6 gap-6">
            <div class="max-w-md text-xs text-gray-600">
              <span class="font-bold text-gray-800 block mb-1">Ketentuan Pembayaran (Payment Terms):</span>
              <p class="leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-200">
                {$activeInvoice.payload.payment_terms}
              </p>
            </div>

            <div class="w-full sm:w-72 space-y-2 text-xs">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal Kargo:</span>
                <span class="font-mono font-bold">{formatCurrency($activeInvoice.payload.subtotal, 'USD')}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Biaya Asuransi / Freight ({$activeInvoice.payload.incoterms}):</span>
                <span class="font-mono font-bold">{formatCurrency($activeInvoice.payload.shipping_and_insurance_fee, 'USD')}</span>
              </div>
              <div class="flex justify-between text-sm font-extrabold text-[#0B2D24] pt-2 border-t-2 border-[#0B2D24]">
                <span>Total Tagihan:</span>
                <span class="text-[#C88A2E]">{formatCurrency($activeInvoice.payload.total_amount, 'USD')}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bank Instructions & Official MEPC Stamp Validation -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t-2 border-gray-200">
          
          <!-- Corporate Bank Account Details -->
          <div class="p-4 rounded-2xl bg-[#F8F6F0] border border-[#C88A2E]/30 text-xs">
            <span class="font-bold text-[#0B2D24] uppercase tracking-wider block mb-2">
              Instruksi Transfer Bank Korporat Resmi:
            </span>
            <div class="space-y-1 text-gray-700">
              <div>Bank: <strong class="text-gray-900">{$activeInvoice.payload.bank_instructions.bank_name}</strong></div>
              <div>Nama Rekening: <strong>{$activeInvoice.payload.bank_instructions.account_name}</strong></div>
              <div>Nomor Rekening: <strong class="font-mono text-emerald-800 font-bold">{$activeInvoice.payload.bank_instructions.account_number}</strong></div>
              <div>SWIFT Code: <strong class="font-mono">{$activeInvoice.payload.bank_instructions.swift_code}</strong></div>
              <div>Cabang: {$activeInvoice.payload.bank_instructions.branch}</div>
            </div>
          </div>

          <!-- Digital Verification, QR Code & Official Stamp -->
          <div class="flex flex-col sm:items-end justify-between text-xs">
            <div class="flex items-center gap-3 mb-4">
              <!-- Digital QR Code Vector Representation -->
              <div class="w-16 h-16 bg-white p-1 rounded-lg border border-gray-300 shadow-sm flex items-center justify-center">
                <svg class="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  <line x1="17" y1="7" x2="17.01" y2="7"></line>
                  <line x1="7" y1="17" x2="7.01" y2="17"></line>
                  <line x1="17" y1="17" x2="17.01" y2="17"></line>
                </svg>
              </div>
              <div class="text-[10px] text-gray-500">
                <span class="font-bold text-gray-800 block">Otorisasi Digital MEPC</span>
                Terverifikasi secara kriptografis melalui sistem matrispanmepc.com
              </div>
            </div>

            <!-- Signature & Stamp Seal -->
            <div class="text-center sm:text-right">
              <span class="text-[11px] text-gray-500 block mb-2">Disahkan Oleh / Authorized by:</span>
              
              <!-- Red/Gold Official Seal SVG -->
              <div class="inline-flex items-center gap-2 p-2 rounded-xl bg-amber-50 border border-[#C88A2E]/50">
                <svg class="w-8 h-8 text-[#C88A2E]" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="2" stroke-dasharray="3 2" />
                  <path d="M16 24L22 30L34 18" stroke="#16A34A" stroke-width="3" stroke-linecap="round" />
                </svg>
                <div class="text-left">
                  <span class="text-[10px] font-extrabold text-[#0B2D24] uppercase block">CAP RESMI PT. MEPC</span>
                  <span class="text-[9px] text-[#C88A2E] font-bold">APPROVED & VERIFIED</span>
                </div>
              </div>

              <div class="font-bold text-xs text-gray-900 mt-2">
                {$activeInvoice.payload.authorized_signatory}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>
{/if}

<style>
  @media print {
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }

    :global(html),
    :global(body),
    :global(#app) {
      background: #ffffff !important;
      color: #000000 !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      max-width: none !important;
      min-height: 0 !important;
      height: auto !important;
      overflow: visible !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* Hide background elements, layout navbar, sidebar, header, footer, etc. */
    :global(main),
    :global(aside),
    :global(nav),
    :global(header),
    :global(footer),
    :global(.no-print) {
      display: none !important;
    }

    :global(.lg\:pl-72) {
      padding-left: 0 !important;
    }

    #invoice-modal-root {
      position: static !important;
      inset: auto !important;
      width: 100% !important;
      min-height: 0 !important;
      height: auto !important;
      background: #ffffff !important;
      padding: 0 !important;
      margin: 0 !important;
      overflow: visible !important;
      display: block !important;
      z-index: auto !important;
    }

    #invoice-card-container {
      position: static !important;
      max-width: 190mm !important;
      width: 100% !important;
      margin: 0 auto !important;
      box-shadow: none !important;
      border: none !important;
      border-radius: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
      max-height: none !important;
      height: auto !important;
      overflow: visible !important;
      display: block !important;
    }

    #invoice-printable-area {
      position: static !important;
      width: 100% !important;
      max-width: 190mm !important;
      margin: 0 auto !important;
      padding: 0 !important;
      box-sizing: border-box !important;
      color: #111827 !important;
      background: #ffffff !important;
      overflow: visible !important;
      display: block !important;
    }

    #invoice-printable-area * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    table {
      page-break-inside: auto;
    }

    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }

    thead {
      display: table-header-group;
    }
  }
</style>
