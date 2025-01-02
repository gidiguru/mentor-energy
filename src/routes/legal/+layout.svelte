<script>
    import { page } from '$app/stores';
  
    const navItems = [
      { path: '/legal/privacy', label: 'Privacy Policy' },
      { path: '/legal/terms', label: 'Terms of Service' },
      { path: '/legal/cookies', label: 'Cookie Policy' }
    ];
  </script>
  
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col sm:flex-row gap-8">
      <!-- Sidebar Navigation -->
      <aside class="w-full sm:w-64 space-y-2">
        {#each navItems as item}
          <a 
            href={item.path}
            class="btn w-full {$page.url.pathname === item.path ? 'variant-filled-primary' : 'variant-ghost'}"
          >
            {item.label}
          </a>
        {/each}
      </aside>
  
      <!-- Main Content -->
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>