<script lang="ts">
  import { getDrawerStore } from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';

  const drawerStore = getDrawerStore();
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/mentors', label: 'Find Mentors' },
    { href: '/resources', label: 'Resources' },
    { href: '/profile', label: 'Profile' }
  ];
</script>

{#if $drawerStore.open}
  <button 
    type="button"
    class="fixed inset-0 bg-black/50 z-40"
    aria-label="Close menu"
    on:click={() => drawerStore.close()}
    on:keydown={(e) => e.key === 'Escape' && drawerStore.close()}
  />
  <div 
    class="fixed right-0 top-0 h-full w-80 bg-surface-100-800-token z-50 p-4"
    role="dialog"
    aria-label="Navigation menu"
  >
    <nav class="list-nav">
      <ul>
        {#each navItems as item}
          <li>
            <a 
              href={item.href} 
              class="btn btn-lg w-full {$page.url.pathname === item.href ? 'variant-filled-primary' : 'variant-ghost-surface'}"
              on:click={() => drawerStore.close()}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
{/if}
