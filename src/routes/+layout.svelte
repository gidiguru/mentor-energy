<script lang="ts">
    import { AppShell, AppBar, Drawer } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import { storePopup, initializeStores, getDrawerStore } from '@skeletonlabs/skeleton';
    import '../app.postcss';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    initializeStores();
    
    const isDarkMode = writable(false);
    const drawerStore = getDrawerStore();
    
    const navItems = [
      { href: '/', label: 'Home' },
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/mentors', label: 'Find Mentors' },
      { href: '/resources', label: 'Resources' },
      { href: '/profile', label: 'Profile' }
    ];
    
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
    
    function toggleDrawer(): void {
      drawerStore.set({
        id: 'mobile-nav',
        position: 'right', 
        width: 'w-80',
        padding: 'p-4',
        open: true
      });
    }
    
    function closeDrawer(): void {
      drawerStore.set({
        id: 'mobile-nav',
        open: false
      });
    }
    </script>
    
      <!-- Header -->
    <AppShell slotSidebarLeft="hidden">
      <svelte:fragment slot="header">
        <AppBar>
          <svelte:fragment slot="lead">
            <a href="/" class="flex items-center space-x-2">
                <img 
                src={$isDarkMode ? '/logos/mentorenergy_Main_Logo2.svg' : '/logos/mentorenergy_Black_Logo2.svg'}
                alt="mentor.energy logo" 
                class="hidden md:block h-10 md:h-12pwd w-auto" 
              />
              <img 
                src="/logos/mentorenergy_Logo_Symbol2.svg"
                alt="mentor.energy logo" 
                class="block md:hidden h-10 w-auto" 
              />
            </a>
          </svelte:fragment>
          
          <svelte:fragment slot="trail">
            <nav class="hidden md:flex space-x-6">
              {#each navItems as item}
                <a 
                  href={item.href} 
                  class="text-lg font-medium hover:text-primary-500 transition-colors {$page.url.pathname === item.href ? 'text-primary-500' : ''}"
                >
                  {item.label}
                </a>
              {/each}
            </nav>
    
            <div class="flex items-center space-x-4">
              <LightSwitch />
              <button 
                type="button"
                class="btn variant-ghost-surface md:hidden"
                on:click={toggleDrawer}
              >
                <span class="text-2xl">☰</span>
              </button>
              <a href="/login" class="btn variant-filled-primary">Sign In</a>
            </div>
          </svelte:fragment>
        </AppBar>
      </svelte:fragment>
    
      <svelte:fragment slot="sidebarLeft">
    <div class="hidden" />
  </svelte:fragment>

  <!-- Main content -->
  <slot />

  <!-- Footer -->
  <svelte:fragment slot="footer">
    <footer class="p-4">
      <p class="text-center">&copy; {new Date().getFullYear()} mentor.energy</p>
    </footer>
  </svelte:fragment>

  <!-- Drawer -->
  <Drawer position="right" width="w-full sm:w-80" class="h-fit" >
    <nav class="list-nav p-4">
      <ul>
        {#each navItems as item}
          <li>
            <a 
              href={item.href} 
              class="btn btn-lg w-full {$page.url.pathname === item.href ? 'variant-filled-primary' : 'variant-ghost-surface'}"
              on:click={closeDrawer}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </Drawer>
</AppShell>