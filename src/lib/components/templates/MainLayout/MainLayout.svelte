<script lang="ts">
  import Navbar from '../../organisms/header/Navbar.svelte';
  import Footer from '../../organisms/footer/Footer.svelte';
  import BottomActionBar from '../../organisms/mobile/BottomActionBar.svelte';
  import NotificationToast from '../../molecules/notifications/NotificationToast.svelte';
  import BuyerOrderModal from '../../organisms/buyer-order/BuyerOrderModal.svelte';
  import SupplierFormModal from '../../organisms/supplier-request/SupplierFormModal.svelte';
  import InvoiceModal from '../../organisms/invoice-generator/InvoiceModal.svelte';
  import AdminLoginModal from '../../organisms/admin-tables/AdminLoginModal.svelte';
  import FloatingWhatsApp from '../../molecules/buttons/FloatingWhatsApp.svelte';
  import ProductDetailModal from '../../organisms/catalog/ProductDetailModal.svelte';
  import OrderChoiceModal from '../../organisms/catalog/OrderChoiceModal.svelte';

  export let currentView: 'home' | 'admin' = 'home';
  export let onViewChange: (view: 'home' | 'admin') => void = () => {};
  export let onNavigate: (sectionId: string) => void = () => {};
</script>

<div class="min-h-screen flex flex-col bg-[#F8F6F0] text-gray-900 selection:bg-[#C88A2E] selection:text-white w-full max-w-full overflow-x-hidden relative">
  {#if currentView !== 'admin'}
    <!-- Sticky Glassmorphism Header -->
    <Navbar {currentView} {onViewChange} {onNavigate} />
  {/if}

  <!-- Main Dynamic Page Body -->
  <main class="flex-1 w-full max-w-full overflow-x-hidden">
    <slot />
  </main>

  {#if currentView !== 'admin'}
    <!-- Corporate Footer with Discreet Admin Access -->
    <Footer onOpenAdmin={() => onViewChange('admin')} />

    <!-- Mobile Bottom Sticky Action Bar (< 768px) -->
    <BottomActionBar {onNavigate} />

    <!-- Professional Floating WhatsApp Hotline Button -->
    <FloatingWhatsApp />
  {/if}

  <!-- Global Modals & Notifications -->
  <NotificationToast />
  <BuyerOrderModal />
  <SupplierFormModal />
  <InvoiceModal />
  <ProductDetailModal />
  <OrderChoiceModal />
  <AdminLoginModal onSuccess={() => onViewChange('admin')} />
</div>
