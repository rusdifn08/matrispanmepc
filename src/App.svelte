<script lang="ts">
  import { onMount } from 'svelte';
  import MainLayout from './lib/components/templates/MainLayout/MainLayout.svelte';
  import HomePage from './lib/components/pages/HomePage.svelte';
  import AdminDashboard from './lib/components/organisms/admin-tables/AdminDashboard.svelte';
  import { isAdminAuthenticated, isAdminLoginModalOpen, authActions } from './lib/stores';

  let currentView: 'home' | 'admin' = 'home';

  function handleNavigate(sectionId: string) {
    if (currentView !== 'home') {
      currentView = 'home';
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function handleViewChange(view: 'home' | 'admin') {
    if (view === 'admin' && !$isAdminAuthenticated) {
      isAdminLoginModalOpen.set(true);
      return;
    }
    currentView = view;
    if (view === 'admin') {
      window.location.hash = '#admin';
    } else {
      if (window.location.hash === '#admin') {
        history.replaceState(null, '', window.location.pathname);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function checkHash() {
    if (window.location.hash === '#admin') {
      if ($isAdminAuthenticated) {
        currentView = 'admin';
      } else {
        isAdminLoginModalOpen.set(true);
      }
    }
  }

  onMount(() => {
    authActions.initAuth().then(() => {
      checkHash();
    });
    window.addEventListener('hashchange', checkHash);
    return () => {
      window.removeEventListener('hashchange', checkHash);
    };
  });
</script>

<MainLayout
  {currentView}
  onViewChange={handleViewChange}
  onNavigate={handleNavigate}
>
  {#if currentView === 'admin' && $isAdminAuthenticated}
    <AdminDashboard onBackToHome={() => handleViewChange('home')} />
  {:else}
    <HomePage />
  {/if}
</MainLayout>
