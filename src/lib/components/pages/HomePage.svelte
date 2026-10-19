<script lang="ts">
  import HeroSection from '../organisms/hero/HeroSection.svelte';
  import CommodityShowcase from '../organisms/catalog/CommodityShowcase.svelte';
  import USPSection from '../organisms/hero/USPSection.svelte';
  import LiveStatusWidget from '../organisms/live-status/LiveStatusWidget.svelte';
</script>

<div>
  <!-- Hero Section with Container Ship Banner & Verified Stats -->
  <HeroSection />

  <!-- 4 Core Export Sectors Showcase with Live Search & Filter -->
  <CommodityShowcase />

  <!-- 4 Selling Points (USP) Value Cards Grid -->
  <USPSection />

  <!-- International Timezones & Belawan Port Status Widget -->
  <LiveStatusWidget />
</div>
