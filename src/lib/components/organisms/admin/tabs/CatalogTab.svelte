<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { productsStore } from '../../../../stores';
  import type { Product } from '../../../../types';

  const dispatch = createEventDispatcher<{
    openProductEdit: Product;
  }>();

  let catalogSearch = '';
  let catalogCategoryFilter = 'ALL';

  $: filteredProducts = $productsStore.filter((p) => {
    const matchCat = catalogCategoryFilter === 'ALL' || p.category === catalogCategoryFilter;
    const matchSearch =
      !catalogSearch ||
      p.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.hs_code.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      p.latin_or_local_name.toLowerCase().includes(catalogSearch.toLowerCase());
    return matchCat && matchSearch;
  });
</script>

<div class="space-y-5 animate-in fade-in duration-200">
  <div class="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
    <div class="relative flex-1">
      <input
        type="text"
        bind:value={catalogSearch}
        placeholder="Cari nama komoditas, HS Code, nama latin..."
        class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none"
      />
      <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
      </svg>
    </div>

    <div class="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
      {#each ['ALL', 'Spices', 'Coconut', 'Seafood', 'Textiles'] as cat}
        <button
          type="button"
          on:click={() => (catalogCategoryFilter = cat)}
          class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors {catalogCategoryFilter === cat ? 'bg-[#0B2D24] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
        >
          {cat === 'ALL' ? 'Semua Kategori' : cat}
        </button>
      {/each}
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filteredProducts as prod}
      <div class="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between gap-4">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <img
              src={prod.image_url}
              alt={prod.name}
              class="w-16 h-16 rounded-2xl object-cover border border-gray-100 flex-shrink-0"
            />
            <div>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-900 border border-amber-200">
                {prod.category}
              </span>
              <h4 class="text-sm font-bold text-gray-900 line-clamp-1 mt-1">
                {prod.name}
              </h4>
              <span class="text-[11px] font-mono text-gray-400 block">HS: {prod.hs_code}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#F8F6F0] text-xs">
            <div>
              <span class="text-gray-400 block text-[10px]">Harga Estimasi FOB</span>
              <strong class="text-emerald-700 text-sm">
                ${new Intl.NumberFormat('en-US').format(prod.price_estimate_usd)} / {prod.unit}
              </strong>
            </div>
            <div>
              <span class="text-gray-400 block text-[10px]">Min. Order (MOQ)</span>
              <strong class="text-gray-800">{prod.min_order_qty} {prod.unit}</strong>
            </div>
          </div>

          <p class="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
            {prod.description}
          </p>
        </div>

        <div class="pt-2 border-t border-gray-100 flex items-center justify-between">
          <span class="text-[11px] text-gray-400">
            {prod.featured ? '★ Produk Unggulan' : 'Katalog Standar'}
          </span>
          <button
            type="button"
            on:click={() => dispatch('openProductEdit', prod)}
            class="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-[#0B2D24] hover:text-white font-bold text-xs text-gray-700 transition-colors"
          >
            Edit Harga & MOQ
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>
