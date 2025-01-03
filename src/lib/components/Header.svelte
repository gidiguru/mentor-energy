<script lang="ts">
  import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import { getDrawerStore } from '@skeletonlabs/skeleton';
  import { invalidateAll } from '$app/navigation';
  
  export let isDarkMode: boolean;
  export let supabase: any;
  export let session: any;
  
  const drawerStore = getDrawerStore();
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/mentors', label: 'Find Mentors' },
    { href: '/resources', label: 'Resources' },
    { href: '/profile', label: 'Profile' }
  ];

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      await invalidateAll();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  function toggleDrawer(): void {
    drawerStore.set({
      id: 'mobile-nav',
      position: 'right',
      width: 'w-80',
      padding: 'p-4',
      open: true,
      bgBackdrop: 'bg-black/50'
    });
  }
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <a href="/" class="flex items-center space-x-2">
      <img 
        src={isDarkMode ? '/logos/mentorenergy_Main_Logo2.svg' : '/logos/mentorenergy_Black_Logo2.svg'}
        alt="mentor.energy logo" 
        class="hidden md:block h-10 md:h-12 w-auto" 
      />
      <img 
        src={isDarkMode ? "/logos/mentorenergy_Logo_Symbol2_dark.svg": "/logos/mentorenergy_Logo_Symbol2.svg" }
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
      {#if session}
        <button class="btn variant-filled-error" on:click={signOut}>Sign Out</button>
      {:else}
        <a href="/auth" class="btn variant-filled-primary">Sign In</a>
      {/if}
    </div>
  </svelte:fragment>
</AppBar>