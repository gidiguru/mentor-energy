<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
  
    let currentPath: string;
  
    // Watch for path changes
    $: if ($page.url.pathname !== currentPath) {
      currentPath = $page.url.pathname;
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    }
  
    // Handle initial load
    onMount(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    });
  </script>