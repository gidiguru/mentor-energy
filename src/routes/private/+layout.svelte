<script lang="ts">
  import { page } from '$app/stores';
  import type { PageData } from './$types';
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  
  export let data: PageData;
  $: ({ supabase } = data);
  
  let isLoggingOut = false;
  let error: string | null = null;
  
  async function logout() {
    isLoggingOut = true;
    error = null;
    
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
    } catch (e) {
      error = e instanceof Error ? e.message : 'An error occurred';
      console.error(e);
    } finally {
      isLoggingOut = false;
    }
    goto('/');
  }
  </script>
  
  <header class="bg-surface-100-800-token shadow-lg">
    <div class="container mx-auto px-4">
      <nav class="flex justify-between items-center h-16">
        <div class="flex items-center gap-4">
          <a 
            href="/" 
            class="btn variant-filled-primary"
            class:active={$page.url.pathname === '/'}
          >
            Home
          </a>
        </div>
        
        <button 
          on:click={logout}
          class="btn variant-filled-error"
          disabled={isLoggingOut}
        >
          {#if isLoggingOut}
            <div class="spinner-border" />
            Logging out...
          {:else}
            Logout
          {/if}
        </button>
      </nav>
    </div>
  </header>
  
  {#if error}
    <div 
      class="alert variant-filled-error"
      transition:fade
    >
      {error}
    </div>
  {/if}
  
  <main class="container mx-auto px-4 py-6">
    <slot />
  </main>
  
  <style lang="postcss">
    .active {
      @apply text-primary-500;
    }
  
    a {
      @apply no-underline;
    }
  
    .spinner-border {
      @apply w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2;
    }
  </style>