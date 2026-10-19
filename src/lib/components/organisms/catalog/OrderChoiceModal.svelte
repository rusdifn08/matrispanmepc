<script lang="ts">
  import {
    activeModal,
    selectedModalProduct,
    cartActions,
    currentCurrency,
    usdExchangeRate,
    toastAction,
  } from '../../../stores';
  import { formatCurrency } from '../../../utils';
  import GoldButton from '../../atoms/buttons/GoldButton.svelte';

  $: isOpen = $activeModal === 'order_choice' && $selectedModalProduct !== null;
  $: product = $selectedModalProduct?.product;
  let orderQty = 1;

  $: if ($selectedModalProduct) {
    orderQty = Math.max($selectedModalProduct.quantity, product?.min_order_qty || 1);
  }

  $: subtotalUsd = (product?.price_estimate_usd || 0) * orderQty;

  function closeModal() {
    activeModal.set(null);
  }

  function increment() {
    orderQty += 1;
  }

  function decrement() {
    if (product && orderQty > product.min_order_qty) {
      orderQty -= 1;
    }
  }

  function handleAddToCart() {
    if (!product) return;
    cartActions.addItem(product, orderQty);
    toastAction.show(`✓ ${orderQty} ${product.unit} ${product.name} telah masuk ke Keranjang Order!`, 'success');
    closeModal();
  }

  function handleProceedCheckout() {
    if (!product) return;
    cartActions.addItem(product, orderQty);
    closeModal();
    // Open full buyer checkout flow
    activeModal.set('cart');
  }
</script>

{#if isOpen && product}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    role="dialog"
    aria-modal="true"
    aria-labelledby="order-choice-title"
  >
    <!-- Accessible Backdrop Click to Close -->
    <button
      type="button"
      class="absolute inset-0 w-full h-full cursor-default bg-transparent border-0"
      on:click={closeModal}
      aria-label="Tutup modal"
    ></button>

    <!-- Modal Card Box -->
    <div
      class="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
    >
      <!-- Header -->
      <div class="p-5 bg-[#0B2D24] text-white flex items-center justify-between border-b border-[#C88A2E]/30">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
          </div>
          <div>
            <h3 id="order-choice-title" class="text-sm font-bold font-heading text-white">
              Pilihan Pemesanan Komoditas
            </h3>
            <span class="text-[10px] text-amber-200/80 block">PT. Matrispan Exim Phoenix Corp</span>
          </div>
        </div>

        <button
          type="button"
          on:click={closeModal}
          class="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Tutup Modal"
        >
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <!-- Product Summary Box -->
      <div class="p-5 space-y-4">
        <div class="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50 border border-gray-200">
          <img
            src={product.image_url}
            alt={product.name}
            class="w-16 h-16 rounded-xl object-cover border border-gray-200 flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <span class="text-[10px] font-bold uppercase text-[#C88A2E] tracking-wider block">
              {product.category} • HS {product.hs_code}
            </span>
            <h4 class="text-xs sm:text-sm font-bold text-gray-900 truncate">
              {product.name}
            </h4>
            <span class="text-[11px] text-[#0B2D24] font-black font-heading block mt-0.5">
              {formatCurrency(product.price_estimate_usd, $currentCurrency, $usdExchangeRate)} / {product.unit}
            </span>
          </div>
        </div>

        <!-- Stepper: Professional small + and - buttons without up/down spin arrows -->
        <div class="p-3.5 rounded-2xl bg-[#F8F6F0] border border-gray-200 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-gray-700">Tentukan Jumlah Order:</span>
            <span class="text-[10px] text-gray-400">Min: {product.min_order_qty} {product.unit}</span>
          </div>

          <div class="flex items-center justify-between gap-3">
            <div class="inline-flex items-center bg-white rounded-xl p-1 border border-gray-300 shadow-sm">
              <button
                type="button"
                on:click={decrement}
                class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center font-bold text-sm transition-all active:scale-90"
                aria-label="Kurangi kuantiti"
              >
                -
              </button>
              <span class="w-14 text-center text-sm font-black font-mono text-[#0B2D24]">
                {orderQty}
              </span>
              <button
                type="button"
                on:click={increment}
                class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center font-bold text-sm transition-all active:scale-90"
                aria-label="Tambah kuantiti"
              >
                +
              </button>
            </div>
            <span class="text-xs font-semibold text-gray-600">{product.unit}</span>

            <!-- Subtotal -->
            <div class="text-right flex-1">
              <span class="text-[10px] text-gray-400 uppercase tracking-wider block">Estimasi Subtotal</span>
              <span class="text-sm font-black text-[#0B2D24] font-heading block">
                {formatCurrency(subtotalUsd, $currentCurrency, $usdExchangeRate)}
              </span>
            </div>
          </div>
        </div>

        <!-- Choice CTAs -->
        <div class="space-y-2.5 pt-2">
          <!-- Choice 1: Add to Cart -->
          <button
            type="button"
            on:click={handleAddToCart}
            class="w-full py-3 px-4 rounded-xl bg-white hover:bg-gray-50 text-[#0B2D24] font-bold text-xs border-2 border-gray-300 hover:border-[#C88A2E] transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            <span>Masukkan ke Keranjang (Belanja Lagi)</span>
          </button>

          <!-- Choice 2: Direct Order Checkout -->
          <GoldButton
            size="md"
            className="w-full py-3 text-xs font-bold shadow-md flex items-center justify-center gap-2"
            on:click={handleProceedCheckout}
          >
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>⚡ Langsung Order Sekarang (Checkout)</span>
          </GoldButton>
        </div>
      </div>
    </div>
  </div>
{/if}
