<script lang="ts">
  import { productsStore } from '../../../stores';
  import type { ProductCategory } from '../../../types';
  import ProductCard from '../../molecules/cards/ProductCard.svelte';
  import Heading from '../../atoms/typography/Heading.svelte';
  import SpicesIcon from '../../atoms/icons/SpicesIcon.svelte';
  import CoconutIcon from '../../atoms/icons/CoconutIcon.svelte';
  import SeafoodIcon from '../../atoms/icons/SeafoodIcon.svelte';
  import TextilesIcon from '../../atoms/icons/TextilesIcon.svelte';

  let selectedCategory: 'ALL' | ProductCategory = 'ALL';
  let searchQuery: string = '';

  const categories = [
    { id: 'ALL', name: 'Semua Komoditas', short: 'Semua' },
    { id: 'Spices', name: '1. Spices (Rempah)', short: 'Rempah' },
    { id: 'Coconut', name: '2. Coconut & Derivatives', short: 'Kelapa' },
    { id: 'Seafood', name: '3. Seafood (Hasil Laut Beku)', short: 'Seafood' },
    { id: 'Textiles', name: '4. Textiles (Tekstil & Kriya)', short: 'Tekstil' },
  ];

  $: filteredProducts = $productsStore.filter((p) => {
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hs_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.latin_or_local_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });
</script>

<section id="commodities" class="py-16 sm:py-20 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 overflow-hidden">
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-12">
    <div>
      <Heading level={2} subtitle="Portofolio Komoditas Ekspor">
        4 Sektor Unggulan Indonesia
      </Heading>
      <p class="text-xs sm:text-sm text-gray-600 mt-2 max-w-xl">
        Seluruh produk dikurasi langsung dari petani, nelayan, dan pengrajin lokal Sumatera Utara dan kepulauan Nusantara dengan standar kualitas ekspor global.
      </p>
    </div>

    <!-- Live Search Input -->
    <div class="relative w-full md:w-72">
      <input
        type="text"
        placeholder="Cari komoditas / HS Code..."
        bind:value={searchQuery}
        class="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] transition-all"
      />
      <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
      </svg>
    </div>
  </div>

  <!-- Mobile Category Filter: Dropdown Selector + Icon-Only Quick Tap Strip -->
  <div class="block md:hidden mb-6 space-y-3">
    <!-- Dropdown Selector (No Text Cutoff) -->
    <div class="relative">
      <label for="mobile-sector-select" class="sr-only">Pilih Sektor Komoditas</label>
      <div class="relative">
        <select
          id="mobile-sector-select"
          bind:value={selectedCategory}
          class="w-full px-4 py-3 rounded-2xl bg-[#0B2D24] text-white font-bold text-xs border border-[#C88A2E]/50 focus:outline-none focus:ring-2 focus:ring-[#C88A2E] appearance-none pr-10 shadow-md"
        >
          <option value="ALL">Semua Komoditas ({$productsStore.length})</option>
          <option value="Spices">1. Spices (Rempah)</option>
          <option value="Coconut">2. Coconut & Derivatives</option>
          <option value="Seafood">3. Seafood (Hasil Laut Beku)</option>
          <option value="Textiles">4. Textiles (Tekstil & Kriya)</option>
        </select>
        <div class="absolute right-3.5 top-3.5 pointer-events-none text-[#C88A2E]">
          <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Quick Icon-Only Tap Strip (Only icons, no overflowing text) -->
    <div class="flex items-center justify-between gap-1.5 px-1 py-1">
      <button
        type="button"
        on:click={() => (selectedCategory = 'ALL')}
        class="flex-1 py-2.5 rounded-xl flex items-center justify-center transition-all {selectedCategory === 'ALL' ? 'bg-[#0B2D24] text-amber-300 ring-2 ring-[#C88A2E] shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}"
        title="Semua Komoditas"
        aria-label="Semua Komoditas"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>

      <button
        type="button"
        on:click={() => (selectedCategory = 'Spices')}
        class="flex-1 py-2.5 rounded-xl flex items-center justify-center transition-all {selectedCategory === 'Spices' ? 'bg-[#0B2D24] text-amber-300 ring-2 ring-[#C88A2E] shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}"
        title="1. Spices (Rempah)"
        aria-label="1. Spices (Rempah)"
      >
        <SpicesIcon className="w-4 h-4" />
      </button>

      <button
        type="button"
        on:click={() => (selectedCategory = 'Coconut')}
        class="flex-1 py-2.5 rounded-xl flex items-center justify-center transition-all {selectedCategory === 'Coconut' ? 'bg-[#0B2D24] text-amber-300 ring-2 ring-[#C88A2E] shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}"
        title="2. Coconut & Derivatives"
        aria-label="2. Coconut & Derivatives"
      >
        <CoconutIcon className="w-4 h-4" />
      </button>

      <button
        type="button"
        on:click={() => (selectedCategory = 'Seafood')}
        class="flex-1 py-2.5 rounded-xl flex items-center justify-center transition-all {selectedCategory === 'Seafood' ? 'bg-[#0B2D24] text-amber-300 ring-2 ring-[#C88A2E] shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}"
        title="3. Seafood (Hasil Laut Beku)"
        aria-label="3. Seafood (Hasil Laut Beku)"
      >
        <SeafoodIcon className="w-4 h-4" />
      </button>

      <button
        type="button"
        on:click={() => (selectedCategory = 'Textiles')}
        class="flex-1 py-2.5 rounded-xl flex items-center justify-center transition-all {selectedCategory === 'Textiles' ? 'bg-[#0B2D24] text-amber-300 ring-2 ring-[#C88A2E] shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}"
        title="4. Textiles (Tekstil & Kriya)"
        aria-label="4. Textiles (Tekstil & Kriya)"
      >
        <TextilesIcon className="w-4 h-4" />
      </button>
    </div>
  </div>

  <!-- Desktop Category Filter Tabs with Custom SVG Icons -->
  <div class="hidden md:flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
    <button
      type="button"
      on:click={() => (selectedCategory = 'ALL')}
      class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 {selectedCategory === 'ALL' ? 'bg-[#0B2D24] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <span>Semua Komoditas</span>
      <span class="px-2 py-0.5 rounded-full text-[10px] {selectedCategory === 'ALL' ? 'bg-[#C88A2E] text-white' : 'bg-gray-200 text-gray-700'}">
        {$productsStore.length}
      </span>
    </button>

    <button
      type="button"
      on:click={() => (selectedCategory = 'Spices')}
      class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 {selectedCategory === 'Spices' ? 'bg-[#0B2D24] text-white shadow-md ring-2 ring-[#C88A2E]/50' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <SpicesIcon className="w-4 h-4" />
      <span>1. Spices (Rempah)</span>
    </button>

    <button
      type="button"
      on:click={() => (selectedCategory = 'Coconut')}
      class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 {selectedCategory === 'Coconut' ? 'bg-[#0B2D24] text-white shadow-md ring-2 ring-[#C88A2E]/50' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <CoconutIcon className="w-4 h-4" />
      <span>2. Coconut & Derivatives</span>
    </button>

    <button
      type="button"
      on:click={() => (selectedCategory = 'Seafood')}
      class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 {selectedCategory === 'Seafood' ? 'bg-[#0B2D24] text-white shadow-md ring-2 ring-[#C88A2E]/50' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <SeafoodIcon className="w-4 h-4" />
      <span>3. Seafood (Hasil Laut Beku)</span>
    </button>

    <button
      type="button"
      on:click={() => (selectedCategory = 'Textiles')}
      class="px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 {selectedCategory === 'Textiles' ? 'bg-[#0B2D24] text-white shadow-md ring-2 ring-[#C88A2E]/50' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}"
    >
      <TextilesIcon className="w-4 h-4" />
      <span>4. Textiles (Tekstil & Kriya)</span>
    </button>
  </div>

  <!-- Products Grid: 2 Columns on Mobile / 3 Columns on Large Desktop -->
  {#if filteredProducts.length > 0}
    <div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
      {#each filteredProducts as product (product.id)}
        <ProductCard {product} />
      {/each}
    </div>
  {:else}
    <div class="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
      <p class="text-gray-500 text-sm">Tidak ada komoditas yang cocok dengan pencarian "{searchQuery}".</p>
      <button
        on:click={() => { searchQuery = ''; selectedCategory = 'ALL'; }}
        class="mt-3 text-xs font-bold text-[#C88A2E] hover:underline"
      >
        Reset Filter
      </button>
    </div>
  {/if}
</section>
