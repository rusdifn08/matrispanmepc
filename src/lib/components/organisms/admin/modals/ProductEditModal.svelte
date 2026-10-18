<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Product } from '../../../../types';

  export let product: Product | null = null;
  export let isOpen: boolean = false;

  const dispatch = createEventDispatcher<{
    close: void;
    save: { id: string; price: number; moq: number };
  }>();

  let editProductPrice = 0;
  let editProductMoq = 0;

  $: if (product) {
    editProductPrice = product.price_estimate_usd;
    editProductMoq = product.min_order_qty;
  }

  function handleSave() {
    if (product && editProductPrice > 0) {
      dispatch('save', {
        id: product.id,
        price: editProductPrice,
        moq: editProductMoq,
      });
    }
  }
</script>

{#if isOpen && product}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
    <div class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
      <div class="bg-[#0B2D24] text-white p-5 flex items-center justify-between">
        <div>
          <span class="text-xs font-mono text-amber-200">PEMBARUAN HARGA & STOK</span>
          <h3 class="text-base font-bold font-heading line-clamp-1">{product.name}</h3>
        </div>
        <button
          type="button"
          on:click={() => dispatch('close')}
          class="text-gray-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      <div class="p-6 space-y-4 text-xs">
        <div>
          <label for="edit-price" class="font-bold text-gray-700 block mb-1">
            Harga Estimasi FOB Belawan (USD per {product.unit})
          </label>
          <div class="relative">
            <span class="absolute left-3 top-2.5 text-gray-500 font-bold">$</span>
            <input
              id="edit-price"
              type="number"
              bind:value={editProductPrice}
              class="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]"
            />
          </div>
        </div>

        <div>
          <label for="edit-moq" class="font-bold text-gray-700 block mb-1">
            Minimum Pemesanan (MOQ dalam {product.unit})
          </label>
          <input
            id="edit-moq"
            type="number"
            bind:value={editProductMoq}
            class="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]"
          />
        </div>

        <p class="text-[11px] text-gray-400">
          Perubahan harga akan langsung tersinkronisasi ke katalog publik dan backend Rust Axum.
        </p>
      </div>

      <div class="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-2">
        <button
          type="button"
          on:click={() => dispatch('close')}
          class="px-3.5 py-2 rounded-xl bg-gray-200 text-gray-700 font-bold text-xs"
        >
          Batal
        </button>
        <button
          type="button"
          on:click={handleSave}
          class="px-4 py-2 rounded-xl bg-[#0B2D24] text-white font-bold text-xs hover:bg-[#124235]"
        >
          Simpan Perubahan
        </button>
      </div>
    </div>
  </div>
{/if}
