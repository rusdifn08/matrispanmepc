<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ordersStore } from '../../../../stores';
  import type { BuyerOrder } from '../../../../types';
  import { formatDate, getWhatsAppChatUrl } from '../../../../utils';
  import StatusBadge from '../../../atoms/badges/StatusBadge.svelte';

  const dispatch = createEventDispatcher<{
    openOrderDetail: BuyerOrder;
    openReport: 'orders';
    approveOrder: string;
    rejectOrder: string;
  }>();

  let orderSearch = '';
  let orderStatusFilter: 'ALL' | 'PENDING' | 'CONTACTED' | 'APPROVED' | 'REJECTED' = 'ALL';

  $: filteredOrders = $ordersStore.filter((o) => {
    const matchStatus = orderStatusFilter === 'ALL' || o.status === orderStatusFilter;
    const matchSearch =
      !orderSearch ||
      o.order_code.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.company_name.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.buyer_name.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.destination_country.toLowerCase().includes(orderSearch.toLowerCase());
    return matchStatus && matchSearch;
  });
</script>

<div class="space-y-5 animate-in fade-in duration-200">
  <!-- Control Bar: Search & Status Filters -->
  <div class="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
    <!-- Search box -->
    <div class="relative flex-1">
      <input
        type="text"
        bind:value={orderSearch}
        placeholder="Cari kode order, nama buyer, perusahaan, negara tujuan..."
        class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none"
      />
      <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
      </svg>
    </div>

    <!-- Status Filter Tabs -->
    <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
      {#each ['ALL', 'PENDING', 'CONTACTED', 'APPROVED', 'REJECTED'] as st}
        <button
          type="button"
          on:click={() => (orderStatusFilter = st as any)}
          class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors {orderStatusFilter === st ? 'bg-[#0B2D24] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
        >
          {st === 'ALL' ? 'Semua' : st}
        </button>
      {/each}
    </div>

    <!-- Ekspor PDF Pesanan Button -->
    <button
      type="button"
      on:click={() => dispatch('openReport', 'orders')}
      class="px-3.5 py-2 rounded-xl bg-[#0B2D24] text-white hover:bg-[#124235] text-xs font-bold flex items-center gap-1.5 whitespace-nowrap shadow-sm"
      title="Cetak Rekapitulasi Seluruh Pesanan Buyer (A4 PDF)"
    >
      <svg class="w-4 h-4 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd"/>
      </svg>
      <span>Ekspor PDF Pesanan</span>
    </button>
  </div>

  <!-- Orders Table / Card List -->
  {#if filteredOrders.length === 0}
    <div class="bg-white rounded-3xl p-12 text-center border border-gray-200">
      <p class="text-sm text-gray-500">Tidak ada pesanan yang sesuai dengan filter atau kata kunci pencarian.</p>
    </div>
  {:else}
    <div class="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="bg-gray-50/80 border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
              <th class="py-3.5 px-4">No. Order & Tanggal</th>
              <th class="py-3.5 px-4">Buyer & Perusahaan</th>
              <th class="py-3.5 px-4">Destinasi & Incoterms</th>
              <th class="py-3.5 px-4">Komoditas & Volume</th>
              <th class="py-3.5 px-4">Total Nilai</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4 text-right">Tindakan Admin</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            {#each filteredOrders as order}
              <tr class="hover:bg-amber-50/20 transition-colors">
                <td class="py-4 px-4 align-top">
                  <span class="font-mono font-bold text-gray-900 block">{order.order_code}</span>
                  <span class="text-[11px] text-gray-400">{formatDate(order.created_at)}</span>
                </td>

                <td class="py-4 px-4 align-top">
                  <span class="font-bold text-[#0B2D24] block">{order.company_name}</span>
                  <span class="text-gray-600">{order.buyer_name}</span>
                  <span class="text-gray-400 block text-[11px]">{order.email}</span>
                </td>

                <td class="py-4 px-4 align-top">
                  <span class="font-semibold text-gray-800 block">{order.destination_country}</span>
                  <span class="text-gray-500 text-[11px]">{order.destination_port}</span>
                  <span class="inline-block mt-0.5 px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                    {order.incoterms}
                  </span>
                </td>

                <td class="py-4 px-4 align-top">
                  {#each order.items as item}
                    <div class="text-[11px] text-gray-700">
                      • {item.product_name} ({item.quantity} {item.unit})
                    </div>
                  {/each}
                </td>

                <td class="py-4 px-4 align-top">
                  <span class="font-black text-[#0B2D24] text-sm block">
                    ${new Intl.NumberFormat('en-US').format(order.total_amount)}
                  </span>
                  <span class="text-[10px] text-gray-400 uppercase">{order.currency}</span>
                </td>

                <td class="py-4 px-4 align-top">
                  <StatusBadge status={order.status} />
                </td>

                <td class="py-4 px-4 align-top text-right space-x-1">
                  <!-- Direct WA Chat -->
                  <a
                    href={getWhatsAppChatUrl(order.whatsapp_number, `Halo Mr./Ms. ${order.buyer_name} (${order.company_name}), ini Tim Ekspor PT. MATRISPAN EXIM PHOENIX CORP terkait order ${order.order_code}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors align-middle"
                    title="Hubungi Buyer via WhatsApp"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                    </svg>
                  </a>

                  <!-- Detail Button -->
                  <button
                    type="button"
                    on:click={() => dispatch('openOrderDetail', order)}
                    class="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 text-xs transition-colors"
                  >
                    Detail
                  </button>

                  <!-- Approve (OKE) Button -->
                  {#if order.status !== 'APPROVED'}
                    <button
                      type="button"
                      on:click={() => dispatch('approveOrder', order.id)}
                      class="px-3 py-1.5 rounded-xl bg-[#0B2D24] text-white hover:bg-[#124235] font-bold text-xs shadow-sm transition-colors"
                      title="Setujui dan otomatis terbitkan Proforma Invoice"
                    >
                      OKE & Invoice
                    </button>
                  {/if}

                  <!-- Reject button if not already rejected -->
                  {#if order.status !== 'REJECTED' && order.status !== 'APPROVED'}
                    <button
                      type="button"
                      on:click={() => dispatch('rejectOrder', order.id)}
                      class="px-2 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs"
                      title="Tolak pesanan"
                    >
                      Tolak
                    </button>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
</div>
