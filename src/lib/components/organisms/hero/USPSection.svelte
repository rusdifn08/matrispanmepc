<script lang="ts">
  import Heading from '../../atoms/typography/Heading.svelte';
  import USPCard from '../../molecules/cards/USPCard.svelte';
</script>

<section id="usp" class="py-20 bg-[#FAF8F4] border-y border-gray-200/80 relative overflow-hidden">
  <!-- Subtle Background Pattern Accent -->
  <div class="absolute inset-0 bg-[radial-gradient(#C88A2E_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="text-center max-w-3xl mx-auto mb-14">
      <Heading level={2} subtitle="Nilai Jual Utama (USP)" align="center">
        4 Pilar Keunggulan Ekspor PT. MEPC
      </Heading>
      <p class="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
        Mengapa ratusan mitra importir dunia dan gabungan kelompok tani nusantara mempercayakan rantai pasok komoditas mereka kepada kami.
      </p>
    </div>

    <!-- 4 Pillars Value Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
      <USPCard
        pillarNumber="01"
        title="Wide Product Range"
        subtitle="Diversifikasi Terpadu"
        description="Portofolio terlengkap menghubungkan sektor rempah, produk turunan kelapa terintegrasi, perikanan tangkap beku, hingga wastra tenun songket nusantara."
        metric="50+ SKU"
        metricLabel="Katalog Komoditas"
        icon="range"
        highlights={['Multi-Sektor Unggulan', 'Standar Mutu ASTM/ISO', 'Katalog B2B Terpadu']}
      />

      <USPCard
        pillarNumber="02"
        title="Reliable Supply Chain"
        subtitle="Kepastian Pasokan Rutin"
        description="Jaringan terintegrasi dengan ribuan petani, nelayan, dan pengepul binaan langsung di Sumatera Utara, memastikan pasokan kontainer berkelanjutan tanpa putus."
        metric="50,000 MT"
        metricLabel="Kapasitas Tahunan"
        icon="supply"
        highlights={['Kapasitas 50k MT/Th', 'Gudang Binjai Hub', 'Kontrak Pasokan Rutin']}
      />

      <USPCard
        pillarNumber="03"
        title="Sustainable Sourcing"
        subtitle="Etika & Kelestarian Alam"
        description="Pemberdayaan ekonomi petani pedesaan dengan harga beli adil (Fair Trade), pemanenan berkelanjutan, dan pemrosesan alami tanpa bahan kimia berbahaya."
        metric="100% Traceable"
        metricLabel="Asal Usul Terverifikasi"
        icon="ethical"
        highlights={['Fair Trade Certified', 'Zero Harmful Chemicals', 'Pelacakan Asal Usul']}
      />

      <USPCard
        pillarNumber="04"
        title="Global Shipping Expertise"
        subtitle="Logistik Maritim Handal"
        description="Lokasi strategis di Binjai dengan kedekatan langsung ke Pelabuhan Internasional Belawan (Selat Malaka) untuk efisiensi pengapalan FOB & CIF ke seluruh dunia."
        metric="IDBLW Direct"
        metricLabel="Pelabuhan Belawan"
        icon="shipping"
        highlights={['Direct Pelabuhan Belawan', 'Jalur Selat Malaka', 'Dokumen COO & Phytosanitary']}
      />
    </div>
  </div>
</section>
