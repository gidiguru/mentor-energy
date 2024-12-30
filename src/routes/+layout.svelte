<script lang="ts">
  import { AppShell } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup, initializeStores } from '@skeletonlabs/skeleton';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import type { SupabaseClient, Session } from '@supabase/supabase-js';
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
    <Header isDarkMode={$isDarkMode}
    supabase={data.supabase} 
    session={data.session} />
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