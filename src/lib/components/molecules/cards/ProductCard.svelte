<script lang="ts">
  import type { Product } from '../../../types';
  import { cartActions, currentCurrency, usdExchangeRate } from '../../../stores';
  import { formatCurrency } from '../../../utils';
  import GoldButton from '../../atoms/buttons/GoldButton.svelte';
  import ExportBadge from '../../atoms/badges/ExportBadge.svelte';
  import SpicesIcon from '../../atoms/icons/SpicesIcon.svelte';
  import CoconutIcon from '../../atoms/icons/CoconutIcon.svelte';
  import SeafoodIcon from '../../atoms/icons/SeafoodIcon.svelte';
  import TextilesIcon from '../../atoms/icons/TextilesIcon.svelte';

  export let product: Product;

  let orderQuantity: number = product.min_order_qty;

  function handleAddToCart() {
    cartActions.addItem(product, orderQuantity);
  }
</script>

<div class="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-[#C88A2E]/50 shadow-sm hover:shadow-xl transition-all duration-300">
  <!-- Product Image Container with Category Badge & Hover Overlay -->
  <div class="relative h-56 w-full overflow-hidden bg-gray-100">
    <img
      src={product.image_url}
      alt={product.name}
      loading="lazy"
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
    
    <!-- Category & HS Code Pills -->
    <div class="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0B2D24]/90 text-white backdrop-blur-md border border-white/20">
        {#if product.category === 'Spices'}
          <SpicesIcon className="w-3.5 h-3.5" />
        {:else if product.category === 'Coconut'}
          <CoconutIcon className="w-3.5 h-3.5" />
        {:else if product.category === 'Seafood'}
          <SeafoodIcon className="w-3.5 h-3.5" />
        {:else}
          <TextilesIcon className="w-3.5 h-3.5" />
        {/if}
        {product.category}
      </span>
      <span class="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-black/60 text-amber-200 backdrop-blur-md border border-white/10">
        HS: {product.hs_code}
      </span>
    </div>

    <!-- Export Grade Badge -->
    <div class="absolute top-3 right-3">
      <ExportBadge text="Export Grade" variant="gold" />
    </div>

    <!-- Product Subtitle / Latin Name -->
    <div class="absolute bottom-3 left-3 right-3">
      <span class="text-xs text-amber-200/90 font-serif-title italic block truncate">
        {product.latin_or_local_name}
      </span>
      <h3 class="text-white font-bold text-base line-clamp-1 font-heading group-hover:text-amber-300 transition-colors">
        {product.name}
      </h3>
    </div>
  </div>

  <!-- Body Content -->
  <div class="flex flex-col flex-1 p-5 justify-between gap-4">
    <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed">
      {product.description}
    </p>

    <!-- Specs Matrix Pills -->
    <div class="grid grid-cols-2 gap-2 text-[11px] bg-[#F8F6F0] p-2.5 rounded-xl border border-gray-100">
      {#if product.specs.grade}
        <div>
          <span class="text-gray-400 block text-[10px]">Grade / Mutu</span>
          <span class="font-semibold text-gray-800 truncate block">{product.specs.grade}</span>
        </div>
      {/if}
      {#if product.specs.moisture}
        <div>
          <span class="text-gray-400 block text-[10px]">Kadar Air</span>
          <span class="font-semibold text-gray-800 truncate block">{product.specs.moisture}</span>
        </div>
      {/if}
      {#if product.specs.packaging}
        <div class="col-span-2">
          <span class="text-gray-400 block text-[10px]">Kemasan Ekspor</span>
          <span class="font-semibold text-gray-800 truncate block">{product.specs.packaging}</span>
        </div>
      {/if}
    </div>

    <!-- Price Estimate & Order Control -->
    <div class="pt-3 border-t border-gray-100 flex flex-col gap-3">
      <div class="flex items-baseline justify-between">
        <div>
          <span class="text-[11px] text-gray-500 block">Estimasi FOB Belawan</span>
          <div class="flex items-baseline gap-1">
            <span class="text-lg font-extrabold text-[#0B2D24] font-heading">
              {formatCurrency(product.price_estimate_usd, $currentCurrency, $usdExchangeRate)}
            </span>
            <span class="text-xs text-gray-500">/ {product.unit}</span>
          </div>
          {#if $currentCurrency === 'IDR'}
            <span class="text-[10px] text-gray-400 font-mono block">
              ≈ ${new Intl.NumberFormat('en-US').format(product.price_estimate_usd)} USD
            </span>
          {:else}
            <span class="text-[10px] text-gray-400 font-mono block">
              ≈ {formatCurrency(product.price_estimate_usd, 'IDR', $usdExchangeRate)}
            </span>
          {/if}
        </div>
        <div class="text-right">
          <span class="text-[10px] text-gray-400 block">Min. Order</span>
          <span class="text-xs font-bold text-gray-700">{product.min_order_qty} {product.unit}</span>
        </div>
      </div>

      <!-- Quantity input + Add to Cart Button -->
      <div class="flex items-center gap-2">
        <div class="w-24 flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
          <input
            type="number"
            min={product.min_order_qty}
            step="1"
            bind:value={orderQuantity}
            class="w-full text-center py-2 text-xs font-semibold focus:outline-none"
            aria-label="Order Quantity"
          />
          <span class="pr-2 text-[10px] text-gray-400 font-medium">{product.unit}</span>
        </div>

        <GoldButton size="sm" className="flex-1 py-2" on:click={handleAddToCart}>
          <svg class="w-4 h-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
          Order Sekarang
        </GoldButton>
      </div>
    </div>
  </div>
</div>
