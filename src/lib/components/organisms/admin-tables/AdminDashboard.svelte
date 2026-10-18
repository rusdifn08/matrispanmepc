<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import {
    invoicesStore,
    adminDashboardMenu,
    pendingOrdersCount,
    pendingSuppliersCount,
    unreadMessagesCount,
    orderActions,
    supplierActions,
    messageActions,
    catalogActions,
    activeInvoice,
    activeModal,
    currentUser,
    authActions,
    syncBackendData,
    toastAction,
  } from '../../../stores';
  import type { BuyerOrder, AdminMessage, Product } from '../../../types';
  import { playNotificationChime } from '../../../utils';

  import AdminHeader from '../admin/header/AdminHeader.svelte';
  import AdminNavStrip from '../admin/navigation/AdminNavStrip.svelte';
  import OverviewTab from '../admin/tabs/OverviewTab.svelte';
  import OrdersTab from '../admin/tabs/OrdersTab.svelte';
  import MessagesTab from '../admin/tabs/MessagesTab.svelte';
  import SuppliersTab from '../admin/tabs/SuppliersTab.svelte';
  import InvoicesTab from '../admin/tabs/InvoicesTab.svelte';
  import CatalogTab from '../admin/tabs/CatalogTab.svelte';
  import SettingsTab from '../admin/tabs/SettingsTab.svelte';

  import OrderDetailModal from '../admin/modals/OrderDetailModal.svelte';
  import MessageReplyModal from '../admin/modals/MessageReplyModal.svelte';
  import ProductEditModal from '../admin/modals/ProductEditModal.svelte';
  import AdminReportModal from './AdminReportModal.svelte';

  export let onBackToHome: () => void = () => {};

  // Active Menu: 'overview' | 'orders' | 'suppliers' | 'messages' | 'invoices' | 'catalog' | 'settings'
  let currentMenu: 'overview' | 'orders' | 'suppliers' | 'messages' | 'invoices' | 'catalog' | 'settings' = 'overview';
  $: currentMenu = $adminDashboardMenu;

  function setMenu(menu: typeof currentMenu) {
    adminDashboardMenu.set(menu);
  }

  // Report Modal State
  let isReportModalOpen = false;
  let reportModalType: 'orders' | 'suppliers' | 'balance' = 'orders';

  function openReportModal(type: 'orders' | 'suppliers' | 'balance' = 'orders') {
    reportModalType = type;
    isReportModalOpen = true;
  }

  // Live Backend Telemetry State
  let backendTelemetry: any = null;
  async function fetchBackendTelemetry() {
    try {
      const res = await fetch('http://127.0.0.1:8080/api/metrics');
      if (res.ok) {
        backendTelemetry = await res.json();
      }
    } catch (e) {
      // Backend may be starting or offline
    }
  }

  // Polling state
  let isSyncing = false;
  let pollInterval: any = null;
  let lastSyncTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  async function triggerSync(showToast = false) {
    isSyncing = true;
    await Promise.all([syncBackendData(), fetchBackendTelemetry()]);
    lastSyncTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    isSyncing = false;
    if (showToast) {
      toastAction.show('Sinkronisasi data backend Axum selesai!', 'success');
    }
  }

  onMount(() => {
    triggerSync();
    fetchBackendTelemetry();
    authActions.loadSecurityData();
    pollInterval = setInterval(() => {
      triggerSync();
    }, 8000);
  });

  onDestroy(() => {
    if (pollInterval) clearInterval(pollInterval);
  });

  // Modal States
  let selectedOrder: BuyerOrder | null = null;
  let isOrderModalOpen = false;

  let selectedMessage: AdminMessage | null = null;
  let isMessageModalOpen = false;

  let editingProduct: Product | null = null;
  let isProductModalOpen = false;

  function handleOpenOrderDetail(order: BuyerOrder) {
    selectedOrder = order;
    isOrderModalOpen = true;
  }

  function handleSaveAdjustedPrice(e: CustomEvent<number>) {
    if (selectedOrder && e.detail > 0) {
      orderActions.updateOrderPrice(selectedOrder.id, e.detail);
      selectedOrder.total_amount = e.detail;
      isOrderModalOpen = false;
    }
  }

  function handleOpenMessageDetail(msg: AdminMessage) {
    selectedMessage = msg;
    isMessageModalOpen = true;
    if (msg.status === 'UNREAD') {
      messageActions.markRead(msg.id);
    }
  }

  function handleSendReply(e: CustomEvent<{ id: string; replyText: string }>) {
    messageActions.replyMessage(e.detail.id, e.detail.replyText);
    isMessageModalOpen = false;
  }

  function handleOpenProductEdit(p: Product) {
    editingProduct = p;
    isProductModalOpen = true;
  }

  function handleSaveProductEdit(e: CustomEvent<{ id: string; price: number; moq: number }>) {
    catalogActions.updateProductPrice(e.detail.id, e.detail.price, e.detail.moq);
    isProductModalOpen = false;
  }

  function testChime() {
    playNotificationChime();
    toastAction.show('Lonceng notifikasi pesanan berbunyi normal!', 'info');
  }

  function handleViewInvoice(inv: any) {
    activeInvoice.set(inv);
    activeModal.set('invoice');
  }
</script>

<div class="min-h-screen bg-[#F4F6F8] pb-16">
  <!-- TOP EXECUTIVE BANNER -->
  <AdminHeader
    {backendTelemetry}
    {isSyncing}
    currentUser={$currentUser}
    on:sync={() => triggerSync(true)}
    on:openReport={() => openReportModal('orders')}
    on:testChime={testChime}
    on:backToHome={onBackToHome}
    on:logout={() => {
      authActions.logout();
      onBackToHome();
    }}
  />

  <!-- MAIN NAVIGATION TABS -->
  <AdminNavStrip
    {currentMenu}
    pendingOrdersCount={$pendingOrdersCount}
    unreadMessagesCount={$unreadMessagesCount}
    pendingSuppliersCount={$pendingSuppliersCount}
    invoicesCount={$invoicesStore.length}
    on:changeMenu={(e) => setMenu(e.detail)}
  />

  <!-- CONTENT CONTAINER -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
    {#if currentMenu === 'overview'}
      <OverviewTab
        {backendTelemetry}
        on:changeMenu={(e) => setMenu(e.detail)}
        on:openReport={(e) => openReportModal(e.detail)}
        on:openOrderDetail={(e) => handleOpenOrderDetail(e.detail)}
        on:approveOrder={(e) => orderActions.approveOrder(e.detail)}
      />
    {:else if currentMenu === 'orders'}
      <OrdersTab
        on:openOrderDetail={(e) => handleOpenOrderDetail(e.detail)}
        on:openReport={(e) => openReportModal(e.detail)}
        on:approveOrder={(e) => orderActions.approveOrder(e.detail)}
        on:rejectOrder={(e) => {
          if (confirm('Konfirmasi tolak pesanan ini?')) {
            orderActions.rejectOrder(e.detail);
          }
        }}
      />
    {:else if currentMenu === 'messages'}
      <MessagesTab
        on:openMessageDetail={(e) => handleOpenMessageDetail(e.detail)}
      />
    {:else if currentMenu === 'suppliers'}
      <SuppliersTab
        on:openReport={(e) => openReportModal(e.detail)}
        on:approveSupplier={(e) => supplierActions.approveRequest(e.detail)}
        on:rejectSupplier={(e) => {
          if (confirm('Konfirmasi tolak/arsip pengajuan mitra ini?')) {
            supplierActions.rejectRequest(e.detail);
          }
        }}
      />
    {:else if currentMenu === 'invoices'}
      <InvoicesTab
        on:openReport={(e) => openReportModal(e.detail)}
        on:viewInvoice={(e) => handleViewInvoice(e.detail)}
      />
    {:else if currentMenu === 'catalog'}
      <CatalogTab
        on:openProductEdit={(e) => handleOpenProductEdit(e.detail)}
      />
    {:else if currentMenu === 'settings'}
      <SettingsTab
        {lastSyncTime}
        on:sync={() => triggerSync(true)}
        on:testChime={testChime}
      />
    {/if}
  </main>
</div>

<!-- MODALS -->
<OrderDetailModal
  order={selectedOrder}
  isOpen={isOrderModalOpen}
  on:close={() => (isOrderModalOpen = false)}
  on:savePrice={handleSaveAdjustedPrice}
  on:approve={(e) => {
    orderActions.approveOrder(e.detail);
    isOrderModalOpen = false;
  }}
/>

<MessageReplyModal
  message={selectedMessage}
  isOpen={isMessageModalOpen}
  on:close={() => (isMessageModalOpen = false)}
  on:reply={handleSendReply}
/>

<ProductEditModal
  product={editingProduct}
  isOpen={isProductModalOpen}
  on:close={() => (isProductModalOpen = false)}
  on:save={handleSaveProductEdit}
/>

<AdminReportModal
  isOpen={isReportModalOpen}
  initialType={reportModalType}
  onClose={() => (isReportModalOpen = false)}
/>
