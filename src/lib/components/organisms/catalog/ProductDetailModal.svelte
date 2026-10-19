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
  import ExportBadge from '../../atoms/badges/ExportBadge.svelte';
  import GoldButton from '../../atoms/buttons/GoldButton.svelte';

  $: isOpen = $activeModal === 'product_detail' && $selectedModalProduct !== null;
  $: product = $selectedModalProduct?.product;
  let modalQty = 1;

  $: if ($selectedModalProduct) {
    modalQty = Math.max($selectedModalProduct.quantity, product?.min_order_qty || 1);
  }

  function closeModal() {
    activeModal.set(null);
  }

  function increment() {
    modalQty += 1;
  }

  function decrement() {
    if (product && modalQty > product.min_order_qty) {
      modalQty -= 1;
    }
  }

  function handleAddToCart() {
    if (!product) return;
    cartActions.addItem(product, modalQty);
    toastAction.show(`${product.name} (${modalQty} ${product.unit}) berhasil dimasukkan ke keranjang!`, 'success');
    closeModal();
  }

  function handleDirectOrder() {
    if (!product) return;
    cartActions.addItem(product, modalQty);
    closeModal();
    activeModal.set('cart');
  }
</script>

{#if isOpen && product}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    role="dialog"
    aria-modal="true"
    aria-labelledby="product-modal-title"
  >
    <!-- Accessible Backdrop Click to Close -->
    <button
      type="button"
      class="absolute inset-0 w-full h-full cursor-default bg-transparent border-0"
      on:click={closeModal}
      aria-label="Tutup modal"
    ></button>

    <!-- Modal Card Container -->
    <div
      class="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
    >
      <!-- Top Close Button -->
      <button
        type="button"
        on:click={closeModal}
        class="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-md transition-colors"
        aria-label="Tutup Detail Produk"
      >
        <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Scrollable Content -->
      <div class="overflow-y-auto flex-1">
        <!-- Hero Image Banner -->
        <div class="relative h-56 sm:h-72 w-full overflow-hidden bg-gray-900">
          <img
            src={product.image_url}
            alt={product.name}
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <!-- Top Pills -->
          <div class="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-[#0B2D24]/90 text-amber-300 border border-white/20 backdrop-blur-md shadow-sm">
              {product.category}
            </span>
            <span class="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-black/60 text-white backdrop-blur-md border border-white/10">
              HS Code: {product.hs_code}
            </span>
            <ExportBadge text="Verified Export Grade" variant="gold" />
          </div>

          <!-- Bottom Image Title Header -->
          <div class="absolute bottom-4 left-4 right-4">
            <span class="text-xs sm:text-sm text-amber-200 font-serif-title italic block truncate">
              {product.latin_or_local_name}
            </span>
            <h2 id="product-modal-title" class="text-lg sm:text-2xl font-black text-white font-heading">
              {product.name}
            </h2>
          </div>
        </div>

        <!-- Body Details -->
        <div class="p-5 sm:p-6 space-y-5">
          <!-- Pricing & FOB Belawan Strip -->
          <div class="p-4 rounded-2xl bg-[#F8F6F0] border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Estimasi Harga Ekspor (FOB Belawan Port IDBLW)
              </span>
              <div class="flex items-baseline gap-1.5 mt-0.5">
                <span class="text-2xl sm:text-3xl font-black text-[#0B2D24] font-heading">
                  {formatCurrency(product.price_estimate_usd, $currentCurrency, $usdExchangeRate)}
                </span>
                <span class="text-xs sm:text-sm font-semibold text-gray-600">/ {product.unit}</span>
              </div>
              <span class="text-xs text-gray-500 font-mono block mt-0.5">
                {#if $currentCurrency === 'IDR'}
                  ≈ ${new Intl.NumberFormat('en-US').format(product.price_estimate_usd)} USD
                {:else}
                  ≈ {formatCurrency(product.price_estimate_usd, 'IDR', $usdExchangeRate)}
                {/if}
              </span>
            </div>

            <div class="sm:text-right">
              <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Minimum Order (MOQ)</span>
              <span class="text-base font-extrabold text-[#C88A2E]">{product.min_order_qty} {product.unit}</span>
            </div>
          </div>

          <!-- Description -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">Deskripsi & Profil Komoditas</h3>
            <p class="text-sm text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <!-- Technical Specifications Matrix -->
          <div>
            <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Spesifikasi Mutu Ekspor</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {#if product.specs.grade}
                <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span class="text-gray-400 text-[10px] block">Grade Mutu</span>
                  <span class="font-bold text-gray-800 block truncate">{product.specs.grade}</span>
                </div>
              {/if}
              {#if product.specs.moisture}
                <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span class="text-gray-400 text-[10px] block">Kadar Air</span>
                  <span class="font-bold text-gray-800 block truncate">{product.specs.moisture}</span>
                </div>
              {/if}
              {#if product.specs.volatile_oil}
                <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span class="text-gray-400 text-[10px] block">Minyak Atsiri</span>
                  <span class="font-bold text-gray-800 block truncate">{product.specs.volatile_oil}</span>
                </div>
              {/if}
              {#if product.specs.ash_content}
                <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                  <span class="text-gray-400 text-[10px] block">Kadar Abu</span>
                  <span class="font-bold text-gray-800 block truncate">{product.specs.ash_content}</span>
                </div>
              {/if}
              {#if product.specs.packaging}
                <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100 col-span-2">
                  <span class="text-gray-400 text-[10px] block">Standar Kemasan</span>
                  <span class="font-bold text-gray-800 block truncate">{product.specs.packaging}</span>
                </div>
              {/if}
              {#if product.specs.origin}
                <div class="p-2.5 rounded-xl bg-gray-50 border border-gray-100 col-span-2 sm:col-span-3">
                  <span class="text-gray-400 text-[10px] block">Asal Sumber Daya</span>
                  <span class="font-bold text-emerald-800 block truncate">📍 {product.specs.origin}</span>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Action Strip -->
      <div class="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
        <!-- Quantity Stepper without native spin arrows -->
        <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <span class="text-xs font-bold text-gray-600">Jumlah Order:</span>
          <div class="inline-flex items-center bg-white rounded-xl p-1 border border-gray-300 shadow-sm">
            <button
              type="button"
              on:click={decrement}
              class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center font-bold text-sm transition-all active:scale-90"
              aria-label="Kurangi kuantiti"
            >
              -
            </button>
            <span class="w-12 text-center text-sm font-black font-mono text-[#0B2D24]">
              {modalQty}
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
          <span class="text-xs font-semibold text-gray-500">{product.unit}</span>
        </div>

        <!-- Action CTAs -->
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            on:click={handleAddToCart}
            class="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-[#0B2D24] font-bold text-xs border border-gray-300 transition shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
          >
            <svg class="w-4 h-4 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            + Keranjang
          </button>

          <GoldButton size="sm" className="flex-1 sm:flex-initial py-2.5 px-5 text-xs font-bold" on:click={handleDirectOrder}>
            ⚡ Order Sekarang
          </GoldButton>
        </div>
      </div>
    </div>
  </div>
{/if}
