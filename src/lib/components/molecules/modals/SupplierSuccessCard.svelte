<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let reqCode: string = '';
  export let waUrl: string = '';
  export let locationProvince: string = '';
  export let locationRegency: string = '';

  const dispatch = createEventDispatcher<{ close: void }>();
</script>

<div class="p-8 text-center flex flex-col items-center">
  <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
    <svg class="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
    </svg>
  </div>

  <span class="text-xs font-bold text-[#C88A2E] uppercase tracking-wider">Pengajuan Suplai Tercatat</span>
  <h4 class="text-2xl font-extrabold text-[#0B2D24] font-heading mt-1 mb-2">
    #{reqCode}
  </h4>
  <p class="text-xs text-gray-600 max-w-md mx-auto leading-relaxed mb-6">
    Terima kasih Bapak/Ibu Mitra dari <strong>{locationRegency}, {locationProvince}</strong>. Pengajuan Anda telah masuk ke dashboard internal PT. MEPC. Tim pengadaan logistik kami akan segera memverifikasi mutu dan menghubungi via WhatsApp.
  </p>

  <div class="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#16A34A] text-white font-bold text-sm hover:bg-[#15803d] shadow-md shadow-emerald-500/25 transition-all"
    >
      <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.4 8.87 7.65C8.65 7.89 8.02 8.48 8.02 9.7C8.02 10.92 8.91 12.1 9.03 12.26C9.15 12.42 10.74 14.88 13.18 15.93C15.21 16.81 15.62 16.63 16.07 16.59C16.52 16.55 17.52 16 17.73 15.42C17.93 14.84 17.93 14.34 17.87 14.24C17.81 14.14 17.65 14.08 17.4 13.95C17.16 13.83 15.96 13.24 15.73 13.16C15.51 13.08 15.35 13.03 15.19 13.28C15.02 13.52 14.55 14.08 14.41 14.24C14.27 14.41 14.12 14.43 13.88 14.31C13.63 14.18 12.85 13.93 11.92 13.1C11.2 12.45 10.71 11.66 10.57 11.41C10.43 11.17 10.55 11.03 10.68 10.91C10.79 10.8 10.93 10.62 11.05 10.47C11.18 10.33 11.22 10.22 11.3 10.06C11.38 9.9 11.34 9.75 11.28 9.63C11.22 9.5 10.73 8.3 10.53 7.8C10.33 7.32 10.13 7.39 9.97 7.38C9.83 7.38 9.68 7.34 9.53 7.34Z"/>
      </svg>
      Konfirmasi via WhatsApp Admin
    </a>

    <button
      type="button"
      on:click={() => dispatch('close')}
      class="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
    >
      Tutup
    </button>
  </div>
</div>
