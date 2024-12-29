<script lang="ts">
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';
  </script>
  
  <div class="min-h-screen flex flex-col">
    <h2 class="h2 text-center mb-6">Sign In to Your Account</h2>
    <main class="flex-1" in:fade={{ duration: 150 }}>
      <slot />
    </main>
  </div>
  