<script lang="ts">
  import Heading from '../../atoms/typography/Heading.svelte';
  import USPCard from '../../molecules/cards/USPCard.svelte';
</script>

<section id="usp" class="py-20 bg-[#FAF8F4] border-y border-gray-200/80">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <Heading level={2} subtitle="Nilai Jual Utama (USP)" align="center">
        4 Pilar Keunggulan Ekspor PT. MEPC
      </Heading>
      <p class="text-sm text-gray-600 mt-3 leading-relaxed">
        Mengapa ratusan mitra importir dunia dan gabungan kelompok tani nusantara mempercayakan rantai pasok komoditas mereka kepada kami.
      </p>
    </div>

    <!-- 4 Pillars Value Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <USPCard
        title="Wide Product Range"
        subtitle="Diversifikasi Terpadu"
        description="Portofolio terlengkap menghubungkan sektor rempah, produk turunan kelapa terintegrasi, perikanan tangkap beku, hingga wastra tenun songket warisan nusantara."
        metric="50+ SKU"
        metricLabel="Katalog Komoditas"
        icon="range"
      />

      <USPCard
        title="Reliable Supply Chain"
        subtitle="Kepastian Pasokan Rutin"
        description="Jaringan terintegrasi dengan ribuan petani, nelayan, dan pengepul binaan langsung di Sumatera Utara, memastikan pasokan kontainer berkelanjutan tanpa putus."
        metric="50,000 MT"
        metricLabel="Kapasitas Tahunan"
        icon="supply"
      />

      <USPCard
        title="Sustainable Sourcing"
        subtitle="Etika & Kelestarian Alam"
        description="Pemberdayaan ekonomi petani pedesaan dengan harga beli yang adil (Fair Trade), pemanenan berkelanjutan, dan pemrosesan ramah lingkungan tanpa bahan kimia."
        metric="100% Traceable"
        metricLabel="Asal Usul Terverifikasi"
        icon="ethical"
      />

      <USPCard
        title="Global Shipping Expertise"
        subtitle="Logistik Maritim Handal"
        description="Lokasi strategis di Binjai, Sumatera Utara dengan kedekatan langsung ke Pelabuhan Internasional Belawan (Selat Malaka) untuk efisiensi pengapalan FOB & CIF ke seluruh dunia."
        metric="IDBLW Direct"
        metricLabel="Pelabuhan Belawan"
        icon="shipping"
      />
    </div>
  </div>
</section>
