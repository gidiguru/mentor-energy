<script lang="ts">
  import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';
  import { getDrawerStore } from '@skeletonlabs/skeleton';
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';
  
  export let isDarkMode: boolean;
  export let supabase: any;
  export let session: any;
  
  let profile: any = null;
  const drawerStore = getDrawerStore();
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/mentors', label: 'Find Mentors' },
    { href: '/resources', label: 'Resources' }
  ];

  onMount(async () => {
    if (session?.user) {
      const { data, error } = await supabase
        .from('users')
        .select('first_name, profile_picture')
        .eq('id', session.user.id)
        .single();
      
      if (!error) {
        profile = data;
      }
    }
  });

  function defaultProfileIcon() {
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653Zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438ZM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0Z" clip-rule="evenodd" />
      </svg>
    `)}`;
  }

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

    <div class="flex items-center gap-4">
      {#if session}
        <div class="flex items-center gap-2">
          <a href="/profile" class="flex items-center gap-2 hover:text-primary-500 transition-colors">
            {#if profile?.profile_picture}
              <img 
                src={profile.profile_picture} 
                alt="Profile" 
                class="w-8 h-8 rounded-full object-cover border-2 border-surface-500"
              />
            {:else}
              <div class="w-8 h-8 rounded-full bg-surface-300-600-token border-2 border-surface-500">
                <img 
                  src={defaultProfileIcon()} 
                  alt="Default Profile" 
                  class="w-full h-full"
                />
              </div>
            {/if}
            <span class="hidden md:inline">{profile?.first_name || 'Profile'}</span>
          </a>
        </div>
      {/if}

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
    </div>
  </svelte:fragment>
</AppBar>