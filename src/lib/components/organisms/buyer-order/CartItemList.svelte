<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cartStore, cartTotalUsd, currentCurrency, usdExchangeRate } from '../../../stores';
  import { formatCurrency } from '../../../utils';

  const dispatch = createEventDispatcher<{
    exploreCatalog: void;
  }>();

  function updateQuantity(productId: string, delta: number) {
    cartStore.update((items) =>
      items.map((i) => {
        if (i.product.id === productId) {
          const min = i.product.min_order_qty || 1;
          const newQty = Math.max(min, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      })
    );
  }

  function removeItem(productId: string) {
    cartStore.update((items) => items.filter((i) => i.product.id !== productId));
  }
</script>

{#if $cartStore.length === 0}
  <!-- Clean Empty State without Dummy / Preset Buttons -->
  <div class="p-8 sm:p-12 bg-gray-50 rounded-3xl border border-dashed border-gray-300 text-center flex flex-col items-center">
    <div class="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 shadow-inner">
      <svg class="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
      </svg>
    </div>
    <h4 class="text-sm font-bold text-gray-800">Keranjang belanja ekspor Anda masih kosong</h4>
    <p class="text-xs text-gray-500 max-w-sm mt-1 mb-5">
      Silakan pilih komoditas dari 4 sektor unggulan kami dan tentukan kuantiti pemesanan untuk memulai.
    </p>
    <button
      type="button"
      on:click={() => dispatch('exploreCatalog')}
      class="px-5 py-2.5 rounded-xl bg-[#0B2D24] text-white hover:bg-[#124235] text-xs font-bold transition shadow-md flex items-center gap-2"
    >
      <span>Jelajahi Katalog Komoditas</span>
      <span>→</span>
    </button>
  </div>
{:else}
  <!-- Items List -->
  <div class="space-y-3">
    {#each $cartStore as item (item.product.id)}
      <div class="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#F8F6F0] border border-gray-200 gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <img
            src={item.product.image_url}
            alt={item.product.name}
            class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover flex-shrink-0 border border-gray-200"
          />
          <div class="min-w-0">
            <h5 class="text-xs sm:text-sm font-bold text-gray-900 truncate">{item.product.name}</h5>
            <span class="text-[10px] text-gray-500 font-mono block">HS: {item.product.hs_code}</span>
            <span class="text-[10px] text-[#C88A2E] font-semibold">
              {formatCurrency(item.product.price_estimate_usd, $currentCurrency, $usdExchangeRate)} / {item.unit}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <!-- Mini Stepper [-] [qty] [+] -->
          <div class="inline-flex items-center bg-white rounded-lg p-0.5 border border-gray-300 shadow-sm">
            <button
              type="button"
              on:click={() => updateQuantity(item.product.id, -1)}
              class="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs active:scale-90"
              aria-label="Kurangi kuantiti"
            >
              -
            </button>
            <span class="w-8 sm:w-10 text-center text-xs font-black font-mono text-[#0B2D24]">
              {item.quantity}
            </span>
            <button
              type="button"
              on:click={() => updateQuantity(item.product.id, 1)}
              class="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs active:scale-90"
              aria-label="Tambah kuantiti"
            >
              +
            </button>
          </div>

          <!-- Total Per Item -->
          <div class="text-right min-w-[70px] sm:min-w-[90px]">
            <span class="text-xs sm:text-sm font-black font-mono text-[#0B2D24] block">
              {formatCurrency(item.quantity * item.product.price_estimate_usd, $currentCurrency, $usdExchangeRate)}
            </span>
            <span class="text-[10px] text-gray-400">{item.quantity} {item.unit}</span>
          </div>

          <!-- Remove Item Button -->
          <button
            type="button"
            on:click={() => removeItem(item.product.id)}
            class="text-gray-400 hover:text-rose-500 p-1.5 rounded-lg hover:bg-rose-50 transition"
            aria-label="Hapus item"
            title="Hapus dari keranjang"
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    {/each}

    <!-- Subtotal Summary Box -->
    <div class="flex justify-between items-center p-4 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm mt-4">
      <div>
        <span class="text-xs font-bold text-amber-900 block">Total Estimasi Nilai Kargo:</span>
        {#if $currentCurrency === 'IDR'}
          <span class="text-[10px] text-gray-500 font-mono">
            ≈ ${new Intl.NumberFormat('en-US').format($cartTotalUsd)} USD
          </span>
        {:else}
          <span class="text-[10px] text-gray-500 font-mono">
            ≈ {formatCurrency($cartTotalUsd, 'IDR', $usdExchangeRate)}
          </span>
        {/if}
      </div>
      <span class="text-lg sm:text-xl font-black text-[#0B2D24] font-heading font-mono">
        {formatCurrency($cartTotalUsd, $currentCurrency, $usdExchangeRate)}
      </span>
    </div>
  </div>
{/if}
