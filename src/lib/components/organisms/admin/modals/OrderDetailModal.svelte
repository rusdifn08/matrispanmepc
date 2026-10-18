<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { BuyerOrder } from '../../../../types';
  import { getWhatsAppChatUrl } from '../../../../utils';

  export let order: BuyerOrder | null = null;
  export let isOpen: boolean = false;

  const dispatch = createEventDispatcher<{
    close: void;
    savePrice: number;
    approve: string;
  }>();

  let adjustedOrderPrice = 0;

  $: if (order) {
    adjustedOrderPrice = order.total_amount;
  }

  function handleSavePrice() {
    if (adjustedOrderPrice > 0) {
      dispatch('savePrice', adjustedOrderPrice);
    }
  }
</script>

{#if isOpen && order}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
    <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="bg-[#0B2D24] text-white p-5 flex items-center justify-between">
        <div>
          <span class="text-xs font-mono text-amber-200">DETAIL & PENYESUAIAN HARGA</span>
          <h3 class="text-base font-bold font-heading">{order.order_code}</h3>
        </div>
        <button
          type="button"
          on:click={() => dispatch('close')}
          class="text-gray-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 overflow-y-auto space-y-4 text-xs">
        <div class="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#F8F6F0]">
          <div>
            <span class="text-gray-400 block text-[10px]">Perusahaan Buyer:</span>
            <strong class="text-gray-900 text-sm">{order.company_name}</strong>
            <div class="text-gray-600">{order.buyer_name} ({order.email})</div>
            <div class="text-gray-600">WhatsApp: {order.whatsapp_number}</div>
          </div>
          <div>
            <span class="text-gray-400 block text-[10px]">Destinasi Pengiriman:</span>
            <strong class="text-gray-900 text-sm">{order.destination_country}</strong>
            <div class="text-gray-600">Pelabuhan: {order.destination_port}</div>
            <div class="text-blue-700 font-bold">Incoterms: {order.incoterms}</div>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-gray-800 mb-2">Daftar Komoditas Dipesan:</h4>
          <div class="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100">
            {#each order.items as item}
              <div class="p-3 flex items-center justify-between">
                <div>
                  <strong class="text-gray-900 block">{item.product_name}</strong>
                  <span class="text-gray-400 text-[11px]">HS Code: {item.hs_code}</span>
                  {#if item.packaging_notes}
                    <div class="text-amber-800 text-[11px]">Kemasan: {item.packaging_notes}</div>
                  {/if}
                </div>
                <div class="text-right">
                  <div class="font-bold text-gray-900">{item.quantity} {item.unit}</div>
                  <div class="text-gray-500">${item.unit_price_usd} / {item.unit}</div>
                  <div class="font-bold text-emerald-700">${new Intl.NumberFormat('en-US').format(item.subtotal_usd)}</div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        {#if order.notes}
          <div class="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
            <span class="font-bold block mb-0.5">Catatan Khusus Buyer:</span>
            "{order.notes}"
          </div>
        {/if}

        <!-- Price Adjustment Tool -->
        <div class="p-4 rounded-2xl border border-gray-200 bg-gray-50 space-y-2">
          <label for="adj-price" class="font-bold text-gray-700 block">
            Penyesuaian Nilai Total Final (USD)
          </label>
          <div class="flex items-center gap-3">
            <div class="relative flex-1">
              <span class="absolute left-3 top-2.5 text-gray-500 font-bold">$</span>
              <input
                id="adj-price"
                type="number"
                bind:value={adjustedOrderPrice}
                class="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]"
              />
            </div>
            <button
              type="button"
              on:click={handleSavePrice}
              class="px-4 py-2 rounded-xl bg-gray-800 hover:bg-black text-white font-bold text-xs"
            >
              Simpan Total
            </button>
          </div>
          <p class="text-[11px] text-gray-500">
            Gunakan kolom ini jika telah dinegosiasikan diskon volume kargo atau penambahan biaya freight CIF pelabuhan tujuan.
          </p>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <a
          href={getWhatsAppChatUrl(order.whatsapp_number, `Halo Mr./Ms. ${order.buyer_name} (${order.company_name}), ini Tim Ekspor PT. MATRISPAN EXIM PHOENIX CORP terkait order ${order.order_code}.`)}
          target="_blank"
          rel="noopener noreferrer"
          class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
        >
          Buka WhatsApp
        </a>

        <div class="flex items-center gap-2">
          {#if order.status !== 'APPROVED'}
            <button
              type="button"
              on:click={() => dispatch('approve', order.id)}
              class="px-4 py-2 rounded-xl bg-[#0B2D24] hover:bg-[#124235] text-white font-bold text-xs shadow-md"
            >
              Setujui & Terbitkan Proforma Invoice (OKE)
            </button>
          {/if}
          <button
            type="button"
            on:click={() => dispatch('close')}
            class="px-3 py-2 rounded-xl bg-gray-200 text-gray-700 font-bold text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
