<script lang="ts">
  import { AppShell } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup, initializeStores } from '@skeletonlabs/skeleton';
  import '../app.postcss';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import MobileNav from '$lib/components/MobileNav.svelte';

  initializeStores();
  
  const isDarkMode = writable(false);
  
  onMount(() => {
    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
    
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
  });
</script>

<AppShell>
  <!-- Header -->
  <svelte:fragment slot="header">
    <Header isDarkMode={$isDarkMode} />
  </svelte:fragment>

  <!-- Main Section -->
  <slot />

  <!-- Footer -->
  <Footer>
    <div class="container mx-auto">
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <!-- Your grid content -->
      </div>
    </div>
  </Footer>
</AppShell>

<!-- Mobile Navigation -->
<MobileNav />