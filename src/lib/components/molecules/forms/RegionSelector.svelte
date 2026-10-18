<script lang="ts">
  import { getAllProvinces, getCitiesByProvince } from '../../../data/indonesiaRegions';

  export let selectedProvince: string = 'Sumatera Utara';
  export let selectedRegency: string = 'Kabupaten Dairi';

  let provinceSearchQuery: string = '';
  let citySearchQuery: string = '';

  const allProvinces = getAllProvinces();

  $: filteredProvinces = allProvinces.filter((p) =>
    p.toLowerCase().includes(provinceSearchQuery.toLowerCase())
  );

  $: availableCities = getCitiesByProvince(selectedProvince);

  $: filteredCities = availableCities.filter((c) =>
    c.toLowerCase().includes(citySearchQuery.toLowerCase())
  );

  function handleProvinceSelect(prov: string) {
    selectedProvince = prov;
    provinceSearchQuery = '';
    const cities = getCitiesByProvince(prov);
    selectedRegency = cities.length > 0 ? cities[0] : '';
    citySearchQuery = '';
  }
</script>

<div class="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80 space-y-3">
  <div class="flex items-center justify-between">
    <span class="text-[11px] font-black uppercase tracking-wider text-[#0B2D24] block">
      2. Lokasi Geografis Kebun / Gudang (38 Provinsi Indonesia)
    </span>
    <span class="text-[10px] text-amber-800 font-semibold bg-amber-100 px-2 py-0.5 rounded">
      Dropdown Terintegrasi
    </span>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <!-- PROVINSI DROPDOWN WITH LIVE SEARCH -->
    <div>
      <label for="prov-select" class="font-bold text-gray-800 block mb-1">
        Provinsi Asal Kebun/Gudang <span class="text-rose-500">*</span>
      </label>
      
      <!-- Search filter for province -->
      <div class="relative mb-1.5">
        <input
          type="text"
          bind:value={provinceSearchQuery}
          placeholder="Ketik untuk cari provinsi..."
          class="w-full pl-8 pr-3 py-1.5 text-[11px] rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C88A2E] bg-white"
        />
        <svg class="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
        </svg>
      </div>

      <select
        id="prov-select"
        bind:value={selectedProvince}
        on:change={(e) => handleProvinceSelect(e.currentTarget.value)}
        class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white font-semibold text-gray-800"
      >
        {#each filteredProvinces as prov}
          <option value={prov}>{prov}</option>
        {/each}
      </select>
      <span class="text-[10px] text-gray-500 mt-1 block">
        Provinsi terpilih: <strong class="text-[#0B2D24]">{selectedProvince}</strong>
      </span>
    </div>

    <!-- KABUPATEN / KOTA DROPDOWN (AUTO-FILTERED PER PROVINCE) -->
    <div>
      <label for="city-select" class="font-bold text-gray-800 block mb-1">
        Kabupaten / Kota Lokasi Kebun <span class="text-rose-500">*</span>
      </label>

      <!-- Search filter for city -->
      <div class="relative mb-1.5">
        <input
          type="text"
          bind:value={citySearchQuery}
          placeholder="Ketik untuk cari kab/kota..."
          class="w-full pl-8 pr-3 py-1.5 text-[11px] rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#C88A2E] bg-white"
        />
        <svg class="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
        </svg>
      </div>

      <select
        id="city-select"
        bind:value={selectedRegency}
        class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white font-semibold text-gray-800"
      >
        {#each filteredCities as city}
          <option value={city}>{city}</option>
        {/each}
      </select>
      <span class="text-[10px] text-gray-500 mt-1 block">
        Kabupaten/Kota terpilih: <strong class="text-[#0B2D24]">{selectedRegency}</strong>
      </span>
    </div>
  </div>
</div>
