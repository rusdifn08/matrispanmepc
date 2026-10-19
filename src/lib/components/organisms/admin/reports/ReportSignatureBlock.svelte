<script lang="ts">
  export let currentDateFormatted: string = '19 Oktober 2026';
</script>

<div class="mt-8 pt-6 border-t-2 border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
  <!-- Left: Verification note & QR code -->
  <div class="flex items-center gap-3">
    <div class="w-14 h-14 bg-white p-1 rounded-lg border border-gray-300 shadow-sm flex items-center justify-center flex-shrink-0">
      <svg class="w-12 h-12 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
    <div class="text-[10px] text-gray-500 leading-tight">
      <strong class="text-gray-900 block text-[11px]">Validasi Kriptografis PT. MEPC</strong>
      Dokumen ini dihasilkan secara otomatis dari sistem ERP ekspor matrispanmepc.com dan sah secara hukum tanpa tanda tangan basah.
    </div>
  </div>

  <!-- Right: Authorized Signatory Block -->
  <div class="text-left sm:text-right flex flex-col items-start sm:items-end">
    <div class="text-xs font-medium text-gray-700 mb-1">
      Binjai, Sumatera Utara, {currentDateFormatted || '19 Oktober 2026'}
    </div>

    <!-- Corporate Stamp Badge -->
    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50/90 border border-[#C88A2E]/60 my-1 shadow-sm">
      <svg class="w-7 h-7 text-[#C88A2E]" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="2" stroke-dasharray="3 2" />
        <path d="M16 24L22 30L34 18" stroke="#16A34A" stroke-width="3" stroke-linecap="round" />
      </svg>
      <div class="text-left">
        <span class="text-[10px] font-black text-[#0B2D24] uppercase block leading-none">CAP RESMI PT. MEPC</span>
        <span class="text-[9px] text-[#C88A2E] font-extrabold leading-none mt-0.5">VERIFIED & AUDITED</span>
      </div>
    </div>

    <div class="text-xs font-extrabold text-[#0B2D24] mt-2 leading-tight">
      Direksi & Manajemen Operasional Ekspor
    </div>
    <div class="text-[10px] font-bold text-gray-600 mt-0.5">
      PT. MATRISPAN EXIM PHOENIX CORP
    </div>
  </div>
</div>
