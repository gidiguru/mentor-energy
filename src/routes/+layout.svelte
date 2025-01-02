<script lang="ts">
  import { AppShell } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup, initializeStores } from '@skeletonlabs/skeleton';
  import { invalidate, afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import type { SupabaseClient, Session } from '@supabase/supabase-js';
  import { browser } from '$app/environment';
  import { navigating } from '$app/stores';
  import '../app.postcss';

  // Components
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import MobileNav from '$lib/components/MobileNav.svelte';
  import { Toast } from '@skeletonlabs/skeleton';

  // Props & Derived Values
  interface LayoutData {
    session: Session | null;
    supabase: SupabaseClient;
  }

  export let data: LayoutData;

  // Initialize stores
  initializeStores();
  const isDarkMode: Writable<boolean> = writable(false);

  // Handle auth state changes
  function setupAuthStateListener(supabase: SupabaseClient, currentSession: Session | null) {
    const { data: authData } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== currentSession?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => authData.subscription.unsubscribe();
  }

  // Handle dark mode changes
  function setupDarkModeObserver() {
    const darkModeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          isDarkMode.set(document.documentElement.classList.contains('dark'));
        }
      });
    });

    darkModeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    isDarkMode.set(document.documentElement.classList.contains('dark'));
    return () => darkModeObserver.disconnect();
  }

  // Initialize floating UI
  function setupFloatingUI() {
    storePopup.set({ 
      computePosition, 
      autoUpdate, 
      flip, 
      shift, 
      offset, 
      arrow 
    });
  }

    // Scroll to Top
    function forceScrollToTop() {
    console.log('Force scroll to top called');
    
    // Multiple methods to ensure scrolling
    if (browser) {
      // Method 1: window.scrollTo
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });

      // Method 2: document.body scroll
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      // Method 3: Scroll container if exists
      const mainContainer = document.querySelector('main') || document.body;
      mainContainer.scrollTop = 0;

      console.log('Scroll attempts made');
      console.log('Window scroll position:', window.scrollY);
      console.log('Document body scroll position:', document.body.scrollTop);
      console.log('Document element scroll position:', document.documentElement.scrollTop);
    }
  }

    // Multiple triggers for scroll reset
    $: if (browser && $navigating === null) {
    forceScrollToTop();
  }

  onMount(() => {
    // Additional mount-time scroll reset
    forceScrollToTop();

    // Add event listener as a fallback
    const handleNavigation = () => {
      forceScrollToTop();
    };

    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  });
  
  onMount(() => {
    const unsubscribeAuth = setupAuthStateListener(data.supabase, data.session);
    const unsubscribeDarkMode = setupDarkModeObserver();
    setupFloatingUI();

    return () => {
      unsubscribeAuth();
      unsubscribeDarkMode();
    };
  });
  
  
</script>

<Toast />
<AppShell>
  <svelte:fragment slot="header">
    <Header 
      isDarkMode={$isDarkMode}
      supabase={data.supabase} 
      session={data.session} 
    />
  </svelte:fragment>

  <div class="min-h-screen">
    <slot />
  </div>

  <Footer>
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <!-- Footer content -->
      </div>
    </div>
  </Footer>
</AppShell>

<MobileNav />