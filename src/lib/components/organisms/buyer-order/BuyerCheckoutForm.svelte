<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cartStore, cartTotalUsd, currentCurrency, usdExchangeRate } from '../../../stores';
  import { formatCurrency } from '../../../utils';
  import InputField from '../../atoms/inputs/InputField.svelte';
  import IncotermsSelector from '../../molecules/forms/IncotermsSelector.svelte';

  export let buyerName: string = '';
  export let companyName: string = '';
  export let email: string = '';
  export let whatsappNumber: string = '';
  export let destinationCountry: string = '';
  export let destinationPort: string = '';
  export let incoterms: string = 'FOB Belawan';
  export let notes: string = '';

  const dispatch = createEventDispatcher<{
    backToCart: void;
  }>();
</script>

<div class="space-y-6">
  <!-- Back to Cart Breadcrumb & Summary Pill -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
    <button
      type="button"
      on:click={() => dispatch('backToCart')}
      class="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2D24] hover:text-[#C88A2E] transition-colors"
    >
      <span>←</span>
      <span>Kembali ke List Keranjang</span>
    </button>
    <div class="text-right">
      <span class="text-xs text-gray-600 block">Total Pesanan ({$cartStore.length} Komoditas):</span>
      <span class="text-sm font-black text-[#0B2D24] font-mono">
        {formatCurrency($cartTotalUsd, $currentCurrency, $usdExchangeRate)}
      </span>
    </div>
  </div>

  <!-- Incoterms Section -->
  <div>
    <h4 class="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
      1. Syarat Pengiriman Internasional (Incoterms 2020)
    </h4>
    <IncotermsSelector bind:value={incoterms} />
  </div>

  <!-- Buyer & Company Details -->
  <div>
    <h4 class="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3">
      2. Data Perusahaan Buyer / Importir
    </h4>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <InputField
        label="Nama Perusahaan Importir"
        placeholder="Contoh: Global Spice GmbH / Al-Baraka Trading"
        bind:value={companyName}
        required={true}
      />
      <InputField
        label="Nama PIC / Buyer"
        placeholder="Contoh: Hans Dietrich / Ahmed Salem"
        bind:value={buyerName}
        required={true}
      />
      <InputField
        label="Negara Tujuan Ekspor"
        placeholder="Contoh: Germany, Netherlands, Saudi Arabia, USA"
        bind:value={destinationCountry}
        required={true}
      />
      <InputField
        label="Pelabuhan Tujuan (Port of Discharge)"
        placeholder="Contoh: Port of Hamburg (DEHAM) / Port of Rotterdam"
        bind:value={destinationPort}
        required={true}
      />
      <InputField
        label="Nomor WhatsApp Internasional"
        placeholder="Contoh: +49 152 9841 2300"
        hint="Format dengan kode negara untuk verifikasi otomatis"
        bind:value={whatsappNumber}
        required={true}
      />
      <InputField
        label="Email Perusahaan"
        type="email"
        placeholder="purchasing@company.com"
        bind:value={email}
      />
    </div>
  </div>

  <!-- Special Specs or Packaging Notes -->
  <div>
    <label for="buyer-notes" class="text-xs font-semibold text-gray-700 block mb-1">
      Catatan Spesifikasi Khusus / Instruksi Fumigasi & Dokumen
    </label>
    <textarea
      id="buyer-notes"
      bind:value={notes}
      rows="2"
      placeholder="Contoh: Permintaan sertifikat Phytosanitary, Certificate of Origin (COO), kemasan khusus vacuum..."
      class="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C88A2E]/50 focus:border-[#C88A2E]"
    ></textarea>
  </div>
</div>
