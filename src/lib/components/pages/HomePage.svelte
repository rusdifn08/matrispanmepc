<script lang="ts">
  import HeroSection from '../organisms/hero/HeroSection.svelte';
  import CommodityShowcase from '../organisms/catalog/CommodityShowcase.svelte';
  import USPSection from '../organisms/hero/USPSection.svelte';
  import LiveStatusWidget from '../organisms/live-status/LiveStatusWidget.svelte';

  function scrollToCatalog() {
    const el = document.getElementById('commodities');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<div>
  <!-- Hero Section with Container Ship Banner & Verified Stats -->
  <HeroSection onExploreCatalog={scrollToCatalog} />

  <!-- 4 Core Export Sectors Showcase with Live Search & Filter -->
  <CommodityShowcase />

  <!-- 4 Selling Points (USP) Value Cards Grid -->
  <USPSection />

  <!-- International Timezones & Belawan Port Status Widget -->
  <LiveStatusWidget />
</div>
