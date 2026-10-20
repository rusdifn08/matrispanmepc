<script lang="ts">
  import PhoenixLogo from '../../atoms/icons/PhoenixLogo.svelte';
  import WhatsAppButton from '../../atoms/buttons/WhatsAppButton.svelte';
  import { MEPC_ADMIN_DISPLAY_PHONE, MEPC_OFFICIAL_EMAIL, MEPC_HEADQUARTERS } from '../../../utils';
  import { isAdminAuthenticated, isAdminLoginModalOpen } from '../../../stores';

  export let onOpenAdmin: () => void = () => {};

  function handleAdminAccess() {
    if ($isAdminAuthenticated) {
      onOpenAdmin();
    } else {
      isAdminLoginModalOpen.set(true);
    }
  }
</script>

<footer class="bg-[#071f19] text-white pt-16 pb-28 md:pb-16 border-t border-[#C88A2E]/30 w-full overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
      
      <!-- Column 1: Brand & Strategic Profile -->
      <div class="space-y-4">
        <PhoenixLogo size="md" variant="light" />
        <p class="text-xs text-gray-300 leading-relaxed">
          PT. Matrispan Exim Phoenix Corp (PT. MEPC) adalah Global Export Trading House yang menghubungkan produk unggulan pertanian, perkebunan, dan maritim Indonesia langsung ke pasar internasional.
        </p>
      </div>

      <!-- Column 2: 4 Core Export Sectors -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold text-[#C88A2E] uppercase tracking-wider font-heading">
          4 Sektor Komoditas Ekspor
        </h4>
        <ul class="text-xs text-gray-300 space-y-2">
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C88A2E]"></span>
            <span>Spices (Pala, Cengkeh, Lada, Kayu Manis)</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C88A2E]"></span>
            <span>Coconut & Derivatives (Kopra, Cocopeat, Briket)</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C88A2E]"></span>
            <span>Seafood Beku (Yellowfin Tuna, Red Snapper)</span>
          </li>
          <li class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C88A2E]"></span>
            <span>Textiles & Kriya (Tenun Songket, Batik Katun)</span>
          </li>
        </ul>
      </div>

      <!-- Column 3: Logistics & Working Hours -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold text-[#C88A2E] uppercase tracking-wider font-heading">
          Logistik & Jam Operasional
        </h4>
        <div class="text-xs text-gray-300 space-y-2 leading-relaxed">
          <div>
            <strong class="text-white block">Pelabuhan Muat (Port of Loading):</strong>
            Pelabuhan Internasional Belawan (IDBLW), Sumatera Utara
          </div>
          <div>
            <strong class="text-white block">Jam Operasional Kantor:</strong>
            Mulai Pukul 07.00 – 17.00 WIB (Senin – Sabtu)
          </div>
          <div>
            <strong class="text-white block">Inquiry Internasional:</strong>
            Layanan formulir web & antrean WhatsApp 24 Jam
          </div>
        </div>
      </div>

      <!-- Column 4: Official Headquarters & WhatsApp Button -->
      <div class="space-y-3">
        <h4 class="text-xs font-bold text-[#C88A2E] uppercase tracking-wider font-heading">
          Kantor Pusat & Kontak Resmi
        </h4>
        <p class="text-xs text-gray-300 leading-relaxed">
          {MEPC_HEADQUARTERS}
        </p>
        <div class="text-xs text-gray-300 space-y-1">
          <div>Telp / WhatsApp: <strong class="text-white">{MEPC_ADMIN_DISPLAY_PHONE}</strong></div>
          <div>Email: <strong class="text-white">{MEPC_OFFICIAL_EMAIL}</strong></div>
        </div>

        <div class="pt-2">
          <WhatsAppButton
            size="sm"
            label="WhatsApp Resmi PT. MEPC"
            message="Halo PT. MEPC (matrispanmepc.com), saya ingin menghubungi kantor pusat di Binjai mengenai penawaran ekspor."
            className="w-full"
          />
        </div>
      </div>

    </div>

    <!-- Bottom Copyright & Legal Notice -->
    <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
      <div>
        &copy; 2026 PT. MATRISPAN EXIM PHOENIX CORP (PT. MEPC). All rights reserved.
      </div>
      <div class="flex items-center gap-4 text-[11px] flex-wrap justify-center">
        <span>Export-Import Trading House</span>
        <span>•</span>
        <span>Sumatera Utara, Indonesia</span>
        <span>•</span>
        <button
          type="button"
          on:click={handleAdminAccess}
          class="inline-flex items-center gap-1 text-gray-500 hover:text-amber-300 transition-colors focus:outline-none"
          title="Akses Khusus Staff Internal PT. MEPC"
        >
          <svg class="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
          </svg>
          <span>Portal Internal Staff</span>
        </button>
      </div>
    </div>
  </div>
</footer>
