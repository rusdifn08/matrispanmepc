<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { invoicesStore } from '../../../../stores';
  import { formatDate } from '../../../../utils';
  import type { UserProfileDto } from '../../../../types';

  export let currentUser: UserProfileDto | null = null;

  const dispatch = createEventDispatcher<{
    openReport: 'balance';
    viewInvoice: any;
    changeMenu: 'overview' | 'sales_analytics' | 'orders' | 'suppliers' | 'messages' | 'invoices' | 'catalog' | 'settings';
  }>();

  $: isAuthorized = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'FINANCE_OFFICER';
</script>

{#if !isAuthorized}
  <!-- RESTRICTED ACCESS SCREEN (FOR NON-AUTHORIZED ROLES) -->
  <div class="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-rose-200 text-center max-w-2xl mx-auto my-8">
    <div class="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
      <svg class="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 2a5 5 0 00-5 5v3H4a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm3 8V7a3 3 0 10-6 0v3h6z" clip-rule="evenodd"/>
      </svg>
    </div>

    <span class="px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-700 tracking-wider uppercase">
      Akses Terbatas • Modul Keuangan
    </span>

    <h2 class="text-xl sm:text-2xl font-bold font-heading text-gray-900 mt-4">
      Otorisasi Keuangan & Devisa Diperlukan
    </h2>

    <p class="text-sm text-gray-600 max-w-lg mx-auto mt-2 leading-relaxed">
      Dokumen <strong>Proforma Invoice & Neraca Keuangan</strong> hanya dapat diakses oleh 
      <strong>Owner / Direktur Utama</strong> atau <strong>Divisi Keuangan PT. MEPC</strong>.
    </p>

    <div class="mt-6">
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
<div class="space-y-5 animate-in fade-in duration-200">
  <div class="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h3 class="text-base font-bold text-[#0B2D24] font-heading">
        Arsip Dokumen Proforma Invoice Ekspor Resmi
      </h3>
      <p class="text-xs text-gray-500 mt-0.5">
        Standar format komersial internasional dilengkapi stempel resmi, instruksi Bank Mandiri USD, dan QR verification code.
      </p>
    </div>
    <div class="flex items-center gap-2">
      <span class="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold self-start sm:self-center">
        Total {$invoicesStore.length} Invoice Diterbitkan
      </span>
      <button
        type="button"
        on:click={() => dispatch('openReport', 'balance')}
        class="px-3.5 py-1.5 rounded-xl bg-[#0B2D24] text-white hover:bg-[#124235] text-xs font-bold flex items-center gap-1.5 shadow-sm"
        title="Cetak Laporan Neraca Invoicing (A4 PDF)"
      >
        <svg class="w-3.5 h-3.5 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>
        </svg>
        <span>Ekspor Neraca (PDF)</span>
      </button>
    </div>
  </div>

  <div class="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs border-collapse">
        <thead>
          <tr class="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
            <th class="py-3.5 px-4">No. Invoice & Tanggal</th>
            <th class="py-3.5 px-4">Referensi Order</th>
            <th class="py-3.5 px-4">Penerima (Buyer / Konsinyasi)</th>
            <th class="py-3.5 px-4">Pelabuhan Bongkar</th>
            <th class="py-3.5 px-4">Total Amount (USD)</th>
            <th class="py-3.5 px-4">Status Dokumen</th>
            <th class="py-3.5 px-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          {#each $invoicesStore as inv}
            <tr class="hover:bg-blue-50/20 transition-colors">
              <td class="py-4 px-4 align-top">
                <span class="font-mono font-bold text-gray-900 block">{inv.invoice_number}</span>
                <span class="text-[11px] text-gray-400">{formatDate(inv.issued_at)}</span>
              </td>

              <td class="py-4 px-4 align-top">
                <span class="font-mono font-semibold text-gray-700">{inv.ref_code}</span>
              </td>

              <td class="py-4 px-4 align-top">
                <strong class="text-gray-900 block">{inv.payload.recipient_company}</strong>
                <span class="text-gray-500 text-[11px]">{inv.payload.recipient_name} ({inv.payload.destination_country})</span>
              </td>

              <td class="py-4 px-4 align-top">
                <span class="text-gray-800 block">{inv.payload.destination_port}</span>
                <span class="text-[10px] text-gray-400">Loading: Belawan Port (IDBLW)</span>
              </td>

              <td class="py-4 px-4 align-top">
                <span class="font-black text-emerald-800 text-sm block">
                  ${new Intl.NumberFormat('en-US').format(inv.total_amount)}
                </span>
                <span class="text-[10px] text-gray-400">USD</span>
              </td>

              <td class="py-4 px-4 align-top">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  <svg class="w-3 h-3 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Sah & Diterbitkan
                </span>
              </td>

              <td class="py-4 px-4 align-top text-right">
                <button
                  type="button"
                  on:click={() => dispatch('viewInvoice', inv)}
                  class="px-3 py-1.5 rounded-xl bg-[#0B2D24] text-white hover:bg-[#124235] text-xs font-bold shadow-sm"
                >
                  Buka & Cetak PDF
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
{/if}
