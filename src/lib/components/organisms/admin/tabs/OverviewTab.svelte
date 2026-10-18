<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import {
    ordersStore,
    supplierRequestsStore,
    invoicesStore,
    messagesStore,
    pendingOrdersCount,
    pendingSuppliersCount,
    unreadMessagesCount,
  } from '../../../../stores';
  import type { BuyerOrder } from '../../../../types';
  import { formatDate, getWhatsAppChatUrl } from '../../../../utils';
  import StatusBadge from '../../../atoms/badges/StatusBadge.svelte';
  import { BACKEND_URL } from '../../../../api/client';

  export let backendTelemetry: any = null;

  const dispatch = createEventDispatcher<{
    changeMenu: 'overview' | 'orders' | 'suppliers' | 'messages' | 'invoices' | 'catalog' | 'settings';
    openReport: 'orders' | 'suppliers' | 'balance';
    openOrderDetail: BuyerOrder;
    approveOrder: string;
  }>();

  $: totalExportApprovedUSD = $ordersStore
    .filter((o) => o.status === 'APPROVED')
    .reduce((s, o) => s + o.total_amount, 0);
</script>

<div class="space-y-6 animate-in fade-in duration-200">
  <!-- KPI METRICS GRID -->
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
    <!-- Total Export Value USD -->
    <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm col-span-2 sm:col-span-1">
      <span class="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
        Nilai Ekspor Disetujui
      </span>
      <div class="text-xl sm:text-2xl font-black text-[#0B2D24] font-heading">
        ${new Intl.NumberFormat('en-US').format(totalExportApprovedUSD)}
      </div>
      <span class="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
        <svg class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 8.586 14.586 5H12z" clip-rule="evenodd"/>
        </svg>
        <span>Valuta Kuat USD</span>
      </span>
    </div>

    <!-- Active Buyer Orders -->
    <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm">
      <span class="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
        Pesanan Masuk
      </span>
      <div class="text-xl sm:text-2xl font-black text-[#0B2D24] font-heading flex items-center justify-between">
        <span>{$ordersStore.length}</span>
        {#if $pendingOrdersCount > 0}
          <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            {$pendingOrdersCount} Baru
          </span>
        {/if}
      </div>
      <button
        type="button"
        on:click={() => dispatch('changeMenu', 'orders')}
        class="text-[11px] text-[#C88A2E] font-bold hover:underline mt-1 block"
      >
        Lihat Semua Pesanan &rarr;
      </button>
    </div>

    <!-- Incoming Messages & Inquiries -->
    <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm">
      <span class="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
        Pusat Pesan & WA
      </span>
      <div class="text-xl sm:text-2xl font-black text-[#0B2D24] font-heading flex items-center justify-between">
        <span>{$messagesStore.length}</span>
        {#if $unreadMessagesCount > 0}
          <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            {$unreadMessagesCount} Unread
          </span>
        {/if}
      </div>
      <button
        type="button"
        on:click={() => dispatch('changeMenu', 'messages')}
        class="text-[11px] text-teal-600 font-bold hover:underline mt-1 block"
      >
        Buka Kotak Masuk &rarr;
      </button>
    </div>

    <!-- Supplier Queue -->
    <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm">
      <span class="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
        Mitra Tani & Suplai
      </span>
      <div class="text-xl sm:text-2xl font-black text-[#0B2D24] font-heading flex items-center justify-between">
        <span>{$supplierRequestsStore.length}</span>
        {#if $pendingSuppliersCount > 0}
          <span class="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            {$pendingSuppliersCount} Review
          </span>
        {/if}
      </div>
      <button
        type="button"
        on:click={() => dispatch('changeMenu', 'suppliers')}
        class="text-[11px] text-blue-600 font-bold hover:underline mt-1 block"
      >
        Daftar Penawaran &rarr;
      </button>
    </div>

    <!-- Proforma Invoices Issued -->
    <div class="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-sm col-span-2 sm:col-span-1">
      <span class="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
        Invoice Terbit
      </span>
      <div class="text-xl sm:text-2xl font-black text-[#0B2D24] font-heading">
        {$invoicesStore.length}
      </div>
      <button
        type="button"
        on:click={() => dispatch('changeMenu', 'invoices')}
        class="text-[11px] text-indigo-600 font-bold hover:underline mt-1 block"
      >
        Arsip Dokumen Resmi &rarr;
      </button>
    </div>
  </div>

  <!-- TWO COLUMN OVERVIEW: RECENT ORDERS & LIVE OPERATIONS -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Left 2 Cols: Incoming Orders Awaiting Action -->
    <div class="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div>
          <h3 class="text-base font-bold text-[#0B2D24] font-heading">
            Pesanan Masuk Membutuhkan Tindakan (Pending)
          </h3>
          <p class="text-xs text-gray-500">
            Tinjau pesanan buyer, sepakati harga, lalu terbitkan Proforma Invoice dengan tombol OKE.
          </p>
        </div>
        <button
          type="button"
          on:click={() => dispatch('changeMenu', 'orders')}
          class="text-xs font-bold text-[#C88A2E] hover:underline whitespace-nowrap"
        >
          Lihat Semua ({$ordersStore.length})
        </button>
      </div>

      <div class="space-y-3">
        {#each $ordersStore.slice(0, 3) as order}
          <div class="p-4 rounded-2xl border border-gray-100 bg-[#FBFBFA] hover:border-[#C88A2E]/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold text-gray-800">
                  {order.order_code}
                </span>
                <StatusBadge status={order.status} />
                <span class="text-[11px] text-gray-400">
                  {formatDate(order.created_at)}
                </span>
              </div>
              <div class="text-sm font-bold text-[#0B2D24] mt-1">
                {order.company_name} — <span class="text-gray-600 font-normal">{order.buyer_name} ({order.destination_country})</span>
              </div>
              <div class="text-xs text-gray-500 mt-0.5">
                {order.items.length} Komoditas • Incoterms: <strong class="text-gray-700">{order.incoterms}</strong> • Port: {order.destination_port}
              </div>
            </div>

            <div class="flex items-center gap-2 self-end sm:self-center">
              <div class="text-right mr-2 hidden sm:block">
                <div class="text-xs text-gray-400">Total</div>
                <div class="text-sm font-black text-[#0B2D24]">
                  ${new Intl.NumberFormat('en-US').format(order.total_amount)}
                </div>
              </div>

              <!-- Direct WA Button -->
              <a
                href={getWhatsAppChatUrl(order.whatsapp_number, `Halo Mr./Ms. ${order.buyer_name} (${order.company_name}), ini Tim Ekspor PT. MATRISPAN EXIM PHOENIX CORP terkait order ${order.order_code}.`)}
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                title="Hubungi Buyer via WhatsApp"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
              </a>

              <!-- Detail Modal -->
              <button
                type="button"
                on:click={() => dispatch('openOrderDetail', order)}
                class="px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Detail
              </button>

              <!-- Approve (OKE) Button if not yet approved -->
              {#if order.status !== 'APPROVED'}
                <button
                  type="button"
                  on:click={() => dispatch('approveOrder', order.id)}
                  class="px-3.5 py-1.5 rounded-xl bg-[#0B2D24] text-white hover:bg-[#124235] text-xs font-bold shadow-sm flex items-center gap-1"
                >
                  <svg class="w-3.5 h-3.5 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>OKE & Invoice</span>
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Right 1 Col: Belawan Port Radar & System Status -->
    <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
      <div>
        <h3 class="text-base font-bold text-[#0B2D24] font-heading flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          Pelabuhan Belawan Radar
        </h3>
        <p class="text-xs text-gray-500 mt-0.5">
          Terminal Petikemas Internasional (IDBLW)
        </p>
      </div>

      <div class="p-4 rounded-2xl bg-gradient-to-br from-[#0B2D24] to-[#0F3E52] text-white space-y-3">
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-300">Status Dermaga:</span>
          <span class="font-bold text-emerald-400">OPERASIONAL (LANCAR)</span>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-300">Draft Kedalaman:</span>
          <span class="font-mono text-amber-200">-12.0 mLWS (Post-Panamax OK)</span>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-300">Cold Chain Reefer Plugs:</span>
          <span class="font-bold text-teal-300">540 Plugs Siap Pakai</span>
        </div>
        <div class="flex items-center justify-between text-xs">
          <span class="text-gray-300">Jam Operasi:</span>
          <span class="text-gray-200">24 Jam / 7 Hari Berkelanjutan</span>
        </div>
      </div>

      <!-- Fast Actions -->
      <div class="space-y-2 pt-2 border-t border-gray-100">
        <span class="text-xs font-bold text-gray-700 block">Pintasan Cepat:</span>
        <button
          type="button"
          on:click={() => dispatch('changeMenu', 'messages')}
          class="w-full text-left px-3.5 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-bold flex items-center justify-between transition-colors"
        >
          <span>Lihat Pesan Masuk ({$unreadMessagesCount} Belum Dibaca)</span>
          <span>&rarr;</span>
        </button>
        <button
          type="button"
          on:click={() => dispatch('changeMenu', 'catalog')}
          class="w-full text-left px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold flex items-center justify-between transition-colors"
        >
          <span>Ubah Harga Komoditas FOB</span>
          <span>&rarr;</span>
        </button>
      </div>

      <!-- Executive PDF Reports Quick Generator -->
      <div class="space-y-2 pt-2 border-t border-gray-100">
        <span class="text-xs font-bold text-gray-700 flex items-center justify-between">
          <span>Ekspor Laporan PDF (A4):</span>
          <span class="text-[10px] font-mono text-[#C88A2E]">Official</span>
        </span>
        <div class="grid grid-cols-1 gap-1.5 text-xs">
          <button
            type="button"
            on:click={() => dispatch('openReport', 'orders')}
            class="w-full text-left px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#0B2D24] font-bold flex items-center justify-between transition-colors border border-amber-200"
          >
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
              </svg>
              <span>Laporan Penjualan Ekspor</span>
            </span>
            <span class="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded font-mono">PDF</span>
          </button>
          <button
            type="button"
            on:click={() => dispatch('openReport', 'suppliers')}
            class="w-full text-left px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold flex items-center justify-between transition-colors border border-emerald-200"
          >
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
              </svg>
              <span>Rekap Suplai Petani</span>
            </span>
            <span class="text-[10px] bg-emerald-200 px-1.5 py-0.5 rounded font-mono">PDF</span>
          </button>
          <button
            type="button"
            on:click={() => dispatch('openReport', 'balance')}
            class="w-full text-left px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold flex items-center justify-between transition-colors border border-blue-200"
          >
            <span class="flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
              </svg>
              <span>Neraca Invoice Eksekutif</span>
            </span>
            <span class="text-[10px] bg-blue-200 px-1.5 py-0.5 rounded font-mono">PDF</span>
          </button>
        </div>
      </div>

      <!-- Tokio Axum Backend Live Monitoring Card -->
      <div class="space-y-2 pt-2 border-t border-gray-100">
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-gray-700 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Rust Axum Telemetry</span>
          </span>
          <a
            href="{BACKEND_URL}/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[11px] text-[#C88A2E] font-bold hover:underline"
          >
            Buka Monitor &rarr;
          </a>
        </div>
        <div class="p-3 bg-[#0B2D24] text-white rounded-2xl border border-emerald-500/30 font-mono text-[11px] space-y-1.5">
          <div class="flex justify-between">
            <span class="text-gray-300">Rata-rata Latency:</span>
            <span class="text-emerald-400 font-bold">{backendTelemetry ? `${backendTelemetry.avg_latency_ms.toFixed(2)} ms` : '< 1 ms'}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-300">Total API Requests:</span>
            <span class="text-white font-bold">{backendTelemetry ? backendTelemetry.total_requests : '3+'} hits</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-300">HTTP Success Rate:</span>
            <span class="text-emerald-300 font-bold">{backendTelemetry ? `${backendTelemetry.success_rate_percent.toFixed(1)}%` : '100%'}</span>
          </div>
          <div class="flex justify-between text-[10px] text-gray-400 pt-1 border-t border-emerald-800/60">
            <span>Tokio Worker Cores:</span>
            <span class="text-amber-300">{backendTelemetry ? `${backendTelemetry.active_workers} Cores` : 'Multi-core'}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
