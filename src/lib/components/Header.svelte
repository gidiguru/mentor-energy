<script lang="ts">
    import { AppShell, AppBar } from '@skeletonlabs/skeleton';
    import { LightSwitch } from '@skeletonlabs/skeleton';
    import type { drawerStore } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import NavMenu from '$lib/components/NavMenu.svelte';
    
    const navItems = [
      { href: '/', label: 'Home' },
      { href: '/dashboard', label: 'Dashboard' },
      { href: '/mentors', label: 'Find Mentors' },
      { href: '/resources', label: 'Resources' },
      { href: '/profile', label: 'Profile' }
    ];
  
    function drawerOpen(): void {
      drawerStore.open({
        id: 'nav-drawer',
        position: 'right',
        width: 'w-[280px]',
        padding: 'p-4',
        component: NavMenu
      });
    }
  </script>
  
  <NavMenu />
  
  <AppShell>
    <svelte:fragment slot="header">
      <AppBar>
        <svelte:fragment slot="lead">
          <a href="/" class="font-bold text-xl">mentor.energy</a>
        </svelte:fragment>
        
        <svelte:fragment slot="trail">
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex space-x-6">
            {#each navItems as item}
              <a 
                href={item.href} 
                class="font-medium hover:text-primary-500 {$page.url.pathname === item.href ? 'text-primary-500' : ''}"
              >
                {item.label}
              </a>
            {/each}
          </nav>
  
          <div class="flex items-center space-x-4">
            <LightSwitch />
            <button 
              class="btn btn-sm variant-ghost md:hidden"
              on:click={drawerOpen}
            >
              ☰
            </button>
            <a href="/login" class="btn variant-filled-primary">Sign In</a>
          </div>
        </svelte:fragment>
      </AppBar>
    </svelte:fragment>
  
    <slot />
  
    <svelte:fragment slot="footer">
      <div class="p-4 text-center">
        <p>&copy; {new Date().getFullYear()} mentor.energy</p>
      </div>
    </svelte:fragment>
  </AppShell>