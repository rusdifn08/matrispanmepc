<script lang="ts">
  import type { Product } from '../../../types';
  import {
    currentCurrency,
    usdExchangeRate,
    activeModal,
    selectedModalProduct,
  } from '../../../stores';
  import { formatCurrency } from '../../../utils';
  import GoldButton from '../../atoms/buttons/GoldButton.svelte';
  import ExportBadge from '../../atoms/badges/ExportBadge.svelte';
  import SpicesIcon from '../../atoms/icons/SpicesIcon.svelte';
  import CoconutIcon from '../../atoms/icons/CoconutIcon.svelte';
  import SeafoodIcon from '../../atoms/icons/SeafoodIcon.svelte';
  import TextilesIcon from '../../atoms/icons/TextilesIcon.svelte';

  export let product: Product;

  let orderQuantity: number = product.min_order_qty;

  function decrement(e: MouseEvent) {
    e.stopPropagation();
    if (orderQuantity > product.min_order_qty) {
      orderQuantity -= 1;
    }
  }

  function increment(e: MouseEvent) {
    e.stopPropagation();
    orderQuantity += 1;
  }

  function handleCardClick() {
    selectedModalProduct.set({ product, quantity: orderQuantity });
    activeModal.set('product_detail');
  }

  function handleOrderClick(e: MouseEvent) {
    e.stopPropagation();
    selectedModalProduct.set({ product, quantity: orderQuantity });
    activeModal.set('order_choice');
  }
</script>

<div
  on:click={handleCardClick}
  class="group relative flex flex-col bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/80 hover:border-[#C88A2E]/60 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
  role="button"
  tabindex="0"
  on:keydown={(e) => { if (e.key === 'Enter') handleCardClick(); }}
  aria-label="Lihat detail {product.name}"
>
  <!-- Product Image Container with Category Badge & Hover Overlay -->
  <div class="relative h-32 sm:h-56 w-full overflow-hidden bg-gray-100">
    <img
      src={product.image_url}
      alt={product.name}
      loading="lazy"
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-85 group-hover:opacity-75 transition-opacity"></div>
    
    <!-- Category & HS Code Pills -->
    <div class="absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-1 sm:gap-1.5 flex-wrap">
      <span class="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded sm:rounded-md text-[9px] sm:text-[11px] font-bold bg-[#0B2D24]/90 text-white backdrop-blur-md border border-white/20 shadow-sm">
        {#if product.category === 'Spices'}
          <SpicesIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
        {:else if product.category === 'Coconut'}
          <CoconutIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
        {:else if product.category === 'Seafood'}
          <SeafoodIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
        {:else}
          <TextilesIcon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
        {/if}
        {product.category}
      </span>
      <span class="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-black/60 text-amber-200 backdrop-blur-md border border-white/10">
        HS: {product.hs_code}
      </span>
    </div>

    <!-- Export Grade Badge -->
    <div class="absolute top-2 sm:top-3 right-2 sm:right-3">
      <span class="hidden sm:inline-block">
        <ExportBadge text="Export Grade" variant="gold" />
      </span>
      <span class="sm:hidden px-1.5 py-0.5 rounded text-[8px] font-bold bg-amber-500 text-white shadow-sm">
        ★ Grade A
      </span>
    </div>

    <!-- Product Subtitle / Latin Name -->
    <div class="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
      <span class="text-[9px] sm:text-xs text-amber-200/90 font-serif-title italic block truncate">
        {product.latin_or_local_name}
      </span>
      <h3 class="text-white font-bold text-xs sm:text-base line-clamp-1 font-heading group-hover:text-amber-300 transition-colors">
        {product.name}
      </h3>
    </div>
  </div>

  <!-- Body Content -->
  <div class="flex flex-col flex-1 p-2.5 sm:p-5 justify-between gap-2.5 sm:gap-4">
    <p class="hidden sm:block text-xs text-gray-600 line-clamp-2 leading-relaxed">
      {product.description}
    </p>

    <!-- Specs Matrix Pills -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-[9px] sm:text-[11px] bg-[#F8F6F0] p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-gray-100">
      {#if product.specs.grade}
        <div>
          <span class="text-gray-400 block text-[8px] sm:text-[10px]">Grade / Mutu</span>
          <span class="font-semibold text-gray-800 truncate block text-[10px] sm:text-xs">{product.specs.grade}</span>
        </div>
      {/if}
      {#if product.specs.moisture}
        <div class="hidden sm:block">
          <span class="text-gray-400 block text-[10px]">Kadar Air</span>
          <span class="font-semibold text-gray-800 truncate block">{product.specs.moisture}</span>
        </div>
      {/if}
      {#if product.specs.packaging}
        <div class="col-span-1 sm:col-span-2">
          <span class="text-gray-400 block text-[8px] sm:text-[10px]">Kemasan Ekspor</span>
          <span class="font-semibold text-gray-800 truncate block text-[9px] sm:text-xs">{product.specs.packaging}</span>
        </div>
      {/if}
    </div>

    <!-- Price Estimate & Order Control -->
    <div class="pt-2 sm:pt-3 border-t border-gray-100 flex flex-col gap-2 sm:gap-3">
      <div class="flex items-baseline justify-between gap-1">
        <div>
          <span class="text-[9px] sm:text-[11px] text-gray-500 block truncate">FOB Belawan</span>
          <div class="flex items-baseline gap-0.5 sm:gap-1">
            <span class="text-xs sm:text-lg font-black text-[#0B2D24] font-heading">
              {formatCurrency(product.price_estimate_usd, $currentCurrency, $usdExchangeRate)}
            </span>
            <span class="text-[9px] sm:text-xs text-gray-500">/{product.unit}</span>
          </div>
          {#if $currentCurrency === 'IDR'}
            <span class="hidden sm:block text-[10px] text-gray-400 font-mono">
              ≈ ${new Intl.NumberFormat('en-US').format(product.price_estimate_usd)} USD
            </span>
          {:else}
            <span class="hidden sm:block text-[10px] text-gray-400 font-mono">
              ≈ {formatCurrency(product.price_estimate_usd, 'IDR', $usdExchangeRate)}
            </span>
          {/if}
        </div>
        <div class="text-right flex-shrink-0">
          <span class="text-[8px] sm:text-[10px] text-gray-400 block">Min. Order</span>
          <span class="text-[10px] sm:text-xs font-bold text-gray-700">{product.min_order_qty} {product.unit}</span>
        </div>
      </div>

      <!-- Quantity Stepper with Professional - and + Buttons (no native spin arrows) -->
      <div class="flex items-center gap-1.5 sm:gap-2" role="presentation" on:click|stopPropagation on:keydown|stopPropagation>
        <div class="inline-flex items-center bg-gray-100 rounded-lg sm:rounded-xl p-0.5 border border-gray-300 shadow-inner flex-shrink-0">
          <button
            type="button"
            on:click={decrement}
            class="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-white hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs transition-all active:scale-90 shadow-sm"
            aria-label="Kurangi kuantiti"
          >
            -
          </button>
          <span class="w-7 sm:w-10 text-center text-[10px] sm:text-xs font-black font-mono text-[#0B2D24] select-none">
            {orderQuantity}
          </span>
          <button
            type="button"
            on:click={increment}
            class="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-white hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs transition-all active:scale-90 shadow-sm"
            aria-label="Tambah kuantiti"
          >
            +
          </button>
        </div>

        <GoldButton size="sm" className="flex-1 py-1.5 sm:py-2 px-2 text-xs" on:click={handleOrderClick}>
          <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-0.5 sm:mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
          <span class="hidden sm:inline">Order Sekarang</span>
          <span class="sm:hidden font-bold">Order</span>
        </GoldButton>
      </div>
    </div>
  </div>
</div>
