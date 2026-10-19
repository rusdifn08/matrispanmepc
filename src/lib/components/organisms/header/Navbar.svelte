<script lang="ts">
  import { onMount } from 'svelte';
  import PhoenixLogo from '../../atoms/icons/PhoenixLogo.svelte';
  import GoldButton from '../../atoms/buttons/GoldButton.svelte';
  import { cartCount, activeModal, currentCurrency, activeSection } from '../../../stores';

  export let onNavigate: (sectionId: string) => void = () => {};
  export let currentView: 'home' | 'admin' = 'home';
  export let onViewChange: (view: 'home' | 'admin') => void = () => {};

  let mobileMenuOpen = false;

  // Active section tracking
  let currentActiveSection = 'hero';
  $: currentActiveSection = $activeSection;

  function scrollTo(id: string) {
    mobileMenuOpen = false;
    activeSection.set(id);
    if (currentView !== 'home') {
      onViewChange('home');
      setTimeout(() => onNavigate(id), 120);
    } else {
      onNavigate(id);
    }
  }

  function openCart() {
    activeModal.set('cart');
  }

  function openSupplier() {
    activeModal.set('supplier');
  }

  function toggleCurrency() {
    currentCurrency.update((c) => (c === 'USD' ? 'IDR' : 'USD'));
  }

  onMount(() => {
    // Scroll spy using IntersectionObserver
    const sectionIds = ['hero', 'commodities', 'usp', 'belawan'];
    const sections: HTMLElement[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) sections.push(el);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.set(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    // Fallback scroll listener
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            activeSection.set(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<header class="sticky top-0 z-40 w-full glassmorphism transition-all duration-300 border-b border-[#C88A2E]/25 shadow-lg shadow-black/10">
  <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
    <div class="flex items-center justify-between h-20 gap-4">
      
      <!-- Brand Logo with public/logo.webp -->
      <a
        href="#hero"
        on:click|preventDefault={() => scrollTo('hero')}
        class="flex-shrink-0 focus:outline-none hover:opacity-95 transition-opacity"
      >
        <PhoenixLogo size="md" variant="light" />
      </a>

      <!-- Desktop Navigation Menu (Active Section Tracking & Single Line) -->
      <nav class="hidden xl:flex items-center gap-7 whitespace-nowrap">
        <!-- 1. Beranda -->
        <button
          type="button"
          on:click={() => scrollTo('hero')}
          class="text-sm font-semibold tracking-wide transition-all py-2 relative {currentActiveSection === 'hero' && currentView === 'home' ? 'text-[#C88A2E] font-bold' : 'text-gray-200 hover:text-[#C88A2E]'}"
        >
          Beranda
          {#if currentActiveSection === 'hero' && currentView === 'home'}
            <span class="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C88A2E] rounded-full shadow-[0_0_8px_#C88A2E]"></span>
          {/if}
        </button>

        <!-- 2. Katalog Komoditas -->
        <button
          type="button"
          on:click={() => scrollTo('commodities')}
          class="text-sm font-semibold tracking-wide transition-all py-2 relative {currentActiveSection === 'commodities' && currentView === 'home' ? 'text-[#C88A2E] font-bold' : 'text-gray-200 hover:text-[#C88A2E]'}"
        >
          Katalog Komoditas
          {#if currentActiveSection === 'commodities' && currentView === 'home'}
            <span class="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C88A2E] rounded-full shadow-[0_0_8px_#C88A2E]"></span>
          {/if}
        </button>

        <!-- 3. Keunggulan Ekspor -->
        <button
          type="button"
          on:click={() => scrollTo('usp')}
          class="text-sm font-semibold tracking-wide transition-all py-2 relative {currentActiveSection === 'usp' && currentView === 'home' ? 'text-[#C88A2E] font-bold' : 'text-gray-200 hover:text-[#C88A2E]'}"
        >
          Keunggulan Ekspor
          {#if currentActiveSection === 'usp' && currentView === 'home'}
            <span class="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C88A2E] rounded-full shadow-[0_0_8px_#C88A2E]"></span>
          {/if}
        </button>

        <!-- 4. Akses Belawan (IDBLW) -->
        <button
          type="button"
          on:click={() => scrollTo('belawan')}
          class="text-sm font-semibold tracking-wide transition-all py-2 relative flex items-center gap-1.5 {currentActiveSection === 'belawan' && currentView === 'home' ? 'text-[#C88A2E] font-bold' : 'text-gray-200 hover:text-[#C88A2E]'}"
        >
          <span>Akses Belawan (IDBLW)</span>
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {#if currentActiveSection === 'belawan' && currentView === 'home'}
            <span class="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#C88A2E] rounded-full shadow-[0_0_8px_#C88A2E]"></span>
          {/if}
        </button>

        <!-- 5. Portal Suplai Petani -->
        <button
          type="button"
          on:click={openSupplier}
          class="text-sm font-semibold tracking-wide text-amber-300 hover:text-amber-200 transition-colors py-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-300/30"
        >
          <svg class="w-4 h-4 text-[#C88A2E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span>Portal Suplai Petani</span>
        </button>
      </nav>

      <!-- Unified Header Right Actions (Clean, Non-Duplicating at any Zoom level) -->
      <div class="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
        <!-- Single Currency Icon Button Toggle ($ <-> Rp) -->
        <button
          type="button"
          on:click={toggleCurrency}
          class="w-10 h-10 sm:w-10 sm:h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all active:scale-90 shadow-sm flex items-center justify-center group flex-shrink-0"
          title="Mata uang saat ini: {$currentCurrency}. Klik untuk beralih ke {$currentCurrency === 'USD' ? 'Rupiah (Rp)' : 'Dollar ($)'}"
          aria-label="Ganti Mata Uang"
        >
          {#if $currentCurrency === 'USD'}
            <span class="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#C88A2E] to-amber-400 text-white font-black font-mono text-sm flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              $
            </span>
          {:else}
            <span class="w-7 h-7 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black font-mono text-xs flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              Rp
            </span>
          {/if}
        </button>

        <!-- Cart Icon Button with Badge Counter -->
        <button
          type="button"
          on:click={openCart}
          class="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all active:scale-95 shadow-sm min-h-[42px] flex items-center justify-center"
          aria-label="Keranjang Order"
          title="Buka Keranjang Order"
        >
          <svg class="w-5 h-5 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
          {#if $cartCount > 0}
            <span class="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-[#C88A2E] text-white text-[10px] font-black flex items-center justify-center shadow-md animate-pulse">
              {$cartCount}
            </span>
          {/if}
        </button>

        <!-- Mobile / Zoomed Hamburger Button (hidden on large desktop) -->
        <button
          type="button"
          on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
          class="xl:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 focus:outline-none transition-colors min-h-[42px] flex items-center justify-center"
          aria-label="Menu Navigasi"
        >
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            {#if mobileMenuOpen}
              <path d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>

    </div>
  </div>

  <!-- Mobile Collapsible Menu -->
  {#if mobileMenuOpen}
    <div class="xl:hidden bg-[#071f19] border-t border-white/10 px-4 pt-3 pb-6 space-y-2.5 animate-in fade-in duration-200">
      <button
        type="button"
        on:click={() => scrollTo('hero')}
        class="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors {currentActiveSection === 'hero' ? 'text-[#C88A2E] bg-white/5 font-bold' : 'text-gray-200 hover:text-[#C88A2E]'}"
      >
        Beranda
      </button>
      <button
        type="button"
        on:click={() => scrollTo('commodities')}
        class="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors {currentActiveSection === 'commodities' ? 'text-[#C88A2E] bg-white/5 font-bold' : 'text-gray-200 hover:text-[#C88A2E]'}"
      >
        Katalog Komoditas
      </button>
      <button
        type="button"
        on:click={() => scrollTo('usp')}
        class="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors {currentActiveSection === 'usp' ? 'text-[#C88A2E] bg-white/5 font-bold' : 'text-gray-200 hover:text-[#C88A2E]'}"
      >
        Keunggulan Ekspor
      </button>
      <button
        type="button"
        on:click={() => scrollTo('belawan')}
        class="w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors {currentActiveSection === 'belawan' ? 'text-[#C88A2E] bg-white/5 font-bold' : 'text-gray-200 hover:text-[#C88A2E]'}"
      >
        Akses Pelabuhan Belawan
      </button>
      <button
        type="button"
        on:click={() => { mobileMenuOpen = false; openSupplier(); }}
        class="w-full text-left py-2.5 px-3 rounded-lg text-sm font-bold text-amber-300 hover:bg-white/5 flex items-center justify-between"
      >
        <span>Portal Suplai Petani</span>
        <span class="text-xs text-amber-400">&rarr;</span>
      </button>

      <div class="pt-2 border-t border-white/10 flex flex-col gap-2">
        <button
          type="button"
          on:click={() => { mobileMenuOpen = false; openCart(); }}
          class="w-full py-3 rounded-xl bg-white/10 text-white text-xs font-bold flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4 text-[#C88A2E]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </svg>
          Keranjang Order ({$cartCount} Item)
        </button>

        <GoldButton size="sm" className="w-full py-3 text-xs" on:click={() => { mobileMenuOpen = false; openSupplier(); }}>
          Ajukan Suplai Komoditas
        </GoldButton>
      </div>
    </div>
  {/if}
</header>
