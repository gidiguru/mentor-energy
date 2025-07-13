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

<div class="p-4">
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
