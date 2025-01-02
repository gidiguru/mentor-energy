<script lang="ts">
    import { onMount } from 'svelte';
    import { derived, writable } from 'svelte/store';
  
    const currentPath = writable('');
  
    const navItems = [
      { path: '/legal/privacy', label: 'Privacy Policy' },
      { path: '/legal/terms', label: 'Terms of Service' },
      { path: '/legal/cookies', label: 'Cookie Policy' }
    ];
  
    onMount(() => {
      // Set initial path
      currentPath.set(window.location.pathname);
  
      // Update path on navigation
      const observer = new MutationObserver(() => {
        currentPath.set(window.location.pathname);
      });
  
      observer.observe(document.documentElement, {
        subtree: true,
        childList: true
      });
  
      return () => observer.disconnect();
    });
  </script>
  
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col sm:flex-row gap-8">
      <aside class="w-full sm:w-64 space-y-2">
        {#each navItems as item}
          <a 
            href={item.path}
            class="btn w-full {$currentPath === item.path ? 'variant-filled-primary' : 'variant-ghost'}"
          >
            {item.label}
          </a>
        {/each}
      </aside>
  
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>