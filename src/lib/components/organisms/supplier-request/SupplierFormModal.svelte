<script lang="ts">
  import { activeModal, supplierActions } from '../../../stores';
  import GoldButton from '../../atoms/buttons/GoldButton.svelte';
  import RegionSelector from '../../molecules/forms/RegionSelector.svelte';
  import SupplierSuccessCard from '../../molecules/modals/SupplierSuccessCard.svelte';

  let supplierName: string = '';
  let groupOrCvName: string = '';
  let locationProvince: string = 'Sumatera Utara';
  let locationRegency: string = 'Kabupaten Dairi';
  let whatsappNumber: string = '';
  let commodityCategory: string = 'Spices';
  let commodityName: string = '';
  let qtyMonthlyCapacity: number = 10;
  let unit: string = 'Ton';
  let moistureOrGrade: string = 'Grade A (Kadar Air < 12%)';
  let offeredPriceIdr: number = 75000;
  let readinessStatus: string = 'Ready Stock';
  let notes: string = '';
  let isSubmitting: boolean = false;
  let successData: { reqCode: string; waUrl: string } | null = null;

  const categoryOptions = [
    { value: 'Spices', label: '1. Spices (Pala, Cengkeh, Lada, Kayu Manis, Kapulaga)' },
    { value: 'Coconut', label: '2. Coconut & Derivatives (Kopra, Cocopeat, Arang Briket)' },
    { value: 'Seafood', label: '3. Seafood Beku (Tuna, Kakap, Udang, Mackerel)' },
    { value: 'Textiles', label: '4. Textiles & Kriya (Kain Tenun Songket / Batik)' },
  ];

  const readinessOptions = [
    { value: 'Ready Stock', label: 'Ready Stock (Siap Angkut di Gudang)' },
    { value: 'Pre-Harvest', label: 'Pre-Harvest (Estimasi Panen 2-4 Minggu)' },
  ];

  function closeModal() {
    activeModal.set(null);
    successData = null;
  }

  async function handleSubmit() {
    if (!supplierName || !groupOrCvName || !whatsappNumber || !commodityName || !offeredPriceIdr || !locationProvince || !locationRegency) {
      alert('Harap lengkapi semua kolom bertanda bintang merah (*)');
      return;
    }

    isSubmitting = true;
    try {
      const res = await supplierActions.submitRequest({
        supplier_name: supplierName,
        group_or_cv_name: groupOrCvName,
        location_regency: locationRegency,
        location_province: locationProvince,
        whatsapp_number: whatsappNumber,
        commodity_category: commodityCategory,
        commodity_name: commodityName,
        qty_monthly_capacity: qtyMonthlyCapacity,
        unit,
        moisture_or_grade: moistureOrGrade,
        offered_price_idr: offeredPriceIdr,
        readiness_status: readinessStatus,
        notes,
      });

      successData = {
        reqCode: res.request.req_code,
        waUrl: res.waUrl,
      };
    } finally {
      isSubmitting = false;
    }
  }

  function fillSampleFarmer() {
    supplierName = 'Bapak Tumpal Sembiring';
    groupOrCvName = 'Kelompok Tani Rempah Dairi Makmur';
    locationProvince = 'Sumatera Utara';
    locationRegency = 'Kabupaten Dairi';
    whatsappNumber = '+62 812-6345-9981';
    commodityCategory = 'Spices';
    commodityName = 'Biji Pala Asalan & ABCD Grade';
    qtyMonthlyCapacity = 20;
    unit = 'Ton';
    moistureOrGrade = 'Kadar Air < 11%, Mutu Super';
    offeredPriceIdr = 95000;
    readinessStatus = 'Ready Stock';
    notes = 'Panen raya melimpah, siap supply rutin setiap bulan ke gudang PT. MEPC di Medan/Binjai.';
  }
</script>

{#if $activeModal === 'supplier'}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md overflow-y-auto">
    <div class="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Top Corporate Header -->
      <div class="bg-[#0B2D24] text-white px-6 py-5 flex items-center justify-between border-b border-[#C88A2E]/40">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[#C88A2E]/20 border border-[#C88A2E]/40 flex items-center justify-center text-[#C88A2E]">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-[#C88A2E] text-white">
                Kemitraan Petani & Pemasok
              </span>
              <span class="text-xs text-amber-200/80 hidden sm:inline">Wilayah Seluruh Indonesia</span>
            </div>
            <h3 class="text-lg font-bold font-heading text-white">
              Form Pengajuan Suplai Komoditas Ekspor
            </h3>
          </div>
        </div>

        <button
          type="button"
          on:click={closeModal}
          class="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
          aria-label="Tutup"
        >
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <!-- Success Screen -->
      {#if successData}
        <SupplierSuccessCard
          reqCode={successData.reqCode}
          waUrl={successData.waUrl}
          {locationProvince}
          {locationRegency}
          on:close={closeModal}
        />
      {:else}
        <!-- Form Section -->
        <div class="p-6 max-h-[78vh] overflow-y-auto space-y-6 text-xs">
          
          <div class="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <span class="text-xs font-bold text-gray-800">Standar Pengadaan PT. MEPC</span>
              <p class="text-[11px] text-gray-500">Khusus kelompok tani, pengepul, koperasi, dan UMKM produsen di seluruh Indonesia.</p>
            </div>
            <button
              type="button"
              on:click={fillSampleFarmer}
              class="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#C88A2E] text-xs font-bold border border-[#C88A2E]/30 transition-colors whitespace-nowrap"
            >
              Isi Data Contoh (Petani Dairi)
            </button>
          </div>

          <!-- SECTION 1: PROFIL MITRA -->
          <div class="bg-gray-50/80 p-4 rounded-2xl border border-gray-200/80 space-y-3">
            <span class="text-[11px] font-black uppercase tracking-wider text-[#0B2D24] block">
              1. Identitas Kontak & Lembaga Mitra Tani
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label for="sup-name" class="font-bold text-gray-700 block mb-1">
                  Nama Lengkap Kontak / Pengurus <span class="text-rose-500">*</span>
                </label>
                <input
                  id="sup-name"
                  type="text"
                  bind:value={supplierName}
                  placeholder="Contoh: Bapak Tumpal Sembiring"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white"
                  required
                />
              </div>

              <div>
                <label for="group-name" class="font-bold text-gray-700 block mb-1">
                  Nama Kelompok Tani / CV / Koperasi <span class="text-rose-500">*</span>
                </label>
                <input
                  id="group-name"
                  type="text"
                  bind:value={groupOrCvName}
                  placeholder="Contoh: Kelompok Tani Rempah Dairi Makmur"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white"
                  required
                />
              </div>

              <div class="sm:col-span-2">
                <label for="wa-number" class="font-bold text-gray-700 block mb-1">
                  Nomor WhatsApp Aktif (Untuk Notifikasi & Negosiasi PO) <span class="text-rose-500">*</span>
                </label>
                <input
                  id="wa-number"
                  type="text"
                  bind:value={whatsappNumber}
                  placeholder="Contoh: 0812-6345-9981"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white"
                  required
                />
              </div>
            </div>
          </div>

          <!-- SECTION 2: LOKASI GEOGRAFIS SELURUH INDONESIA (DROPDOWN CASCADING) -->
          <RegionSelector
            bind:selectedProvince={locationProvince}
            bind:selectedRegency={locationRegency}
          />

          <!-- SECTION 3: SPESIFIKASI KOMODITAS & KAPASITAS PASOKAN -->
          <div class="bg-gray-50/80 p-4 rounded-2xl border border-gray-200/80 space-y-3">
            <span class="text-[11px] font-black uppercase tracking-wider text-[#0B2D24] block">
              3. Rincian Komoditas & Kapasitas Rutin
            </span>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label for="cat-select" class="font-bold text-gray-700 block mb-1">
                  Sektor Komoditas Utama <span class="text-rose-500">*</span>
                </label>
                <select
                  id="cat-select"
                  bind:value={commodityCategory}
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white font-medium text-gray-800"
                >
                  {#each categoryOptions as opt}
                    <option value={opt.value}>{opt.label}</option>
                  {/each}
                </select>
              </div>

              <div>
                <label for="commodity-name" class="font-bold text-gray-700 block mb-1">
                  Nama Komoditas Spesifik <span class="text-rose-500">*</span>
                </label>
                <input
                  id="commodity-name"
                  type="text"
                  bind:value={commodityName}
                  placeholder="Contoh: Biji Pala ABCD, Kopra Putih, Lada Hitam GL 550"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white"
                  required
                />
              </div>

              <div class="flex gap-2 items-end">
                <div class="flex-1">
                  <label for="qty-cap" class="font-bold text-gray-700 block mb-1">
                    Kapasitas Pasokan Rutin <span class="text-rose-500">*</span>
                  </label>
                  <input
                    id="qty-cap"
                    type="number"
                    min="1"
                    bind:value={qtyMonthlyCapacity}
                    class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white font-bold text-gray-900"
                    required
                  />
                </div>
                <div class="w-24">
                  <label for="unit-select" class="font-bold text-gray-700 block mb-1">Satuan</label>
                  <select
                    id="unit-select"
                    bind:value={unit}
                    class="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white font-semibold text-gray-800"
                  >
                    <option value="Ton">Ton/Bulan</option>
                    <option value="Kg">Kg/Bulan</option>
                  </select>
                </div>
              </div>

              <div>
                <label for="grade-moisture" class="font-bold text-gray-700 block mb-1">
                  Kadar Air / Spesifikasi Mutu <span class="text-rose-500">*</span>
                </label>
                <input
                  id="grade-moisture"
                  type="text"
                  bind:value={moistureOrGrade}
                  placeholder="Contoh: Kadar Air < 11%, Mutu Super ABCD"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white"
                  required
                />
              </div>
            </div>
          </div>

          <!-- SECTION 4: PENAWARAN HARGA & STATUS KESIAPAN -->
          <div class="bg-gray-50/80 p-4 rounded-2xl border border-gray-200/80 space-y-3">
            <span class="text-[11px] font-black uppercase tracking-wider text-[#0B2D24] block">
              4. Penawaran Harga (IDR) & Kesiapan Panen
            </span>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label for="price-idr" class="font-bold text-gray-700 block mb-1">
                  Harga Penawaran Mitra (IDR per {unit}) <span class="text-rose-500">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3.5 top-2.5 text-xs font-bold text-gray-500">Rp</span>
                  <input
                    id="price-idr"
                    type="number"
                    bind:value={offeredPriceIdr}
                    class="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white font-bold text-emerald-800"
                    required
                  />
                </div>
                <span class="text-[10px] text-gray-400 mt-0.5 block">
                  Contoh: 95000 (untuk Rp 95.000 / {unit})
                </span>
              </div>

              <div>
                <label for="readiness-select" class="font-bold text-gray-700 block mb-1">
                  Status Kesiapan Stok <span class="text-rose-500">*</span>
                </label>
                <select
                  id="readiness-select"
                  bind:value={readinessStatus}
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] outline-none bg-white font-medium text-gray-800"
                >
                  {#each readinessOptions as opt}
                    <option value={opt.value}>{opt.label}</option>
                  {/each}
                </select>
              </div>

              <div class="sm:col-span-2">
                <label for="notes" class="font-bold text-gray-700 block mb-1">
                  Catatan Lokasi Gudang / Periode Panen / Sampel
                </label>
                <textarea
                  id="notes"
                  bind:value={notes}
                  rows="2"
                  placeholder="Contoh: Barang siap diangkut truk di gudang kami, sampel 1 kg siap dikirimkan ke kantor PT. MEPC di Medan/Binjai..."
                  class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E] bg-white"
                ></textarea>
              </div>
            </div>
          </div>

        </div>

        <!-- Form Footer -->
        <div class="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            on:click={closeModal}
            class="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 min-h-[46px]"
          >
            Batal
          </button>

          <GoldButton
            size="md"
            className="min-h-[46px]"
            disabled={isSubmitting}
            on:click={handleSubmit}
          >
            {#if isSubmitting}
              Memproses Penawaran...
            {:else}
              Kirim Pengajuan Suplai
            {/if}
          </GoldButton>
        </div>
      {/if}

    </div>
  </div>
{/if}
