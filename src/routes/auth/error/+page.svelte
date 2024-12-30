<!-- src/routes/auth/error/+page.svelte -->
<script lang="ts">
    import { goto } from '$app/navigation';
  
    function handleRetry() {
      goto('/auth');
    }

    function createAccount() {
      goto('/signup');
    }
  </script>
  
  <div class="flex flex-col items-center justify-center min-h-[50vh] p-4">
    <div class="card p-8 max-w-md w-full text-center space-y-6">
      <div class="text-4xl mb-4">😕</div>
      <h1 class="h2">Authentication Error</h1>
      
      <p class="text-lg">
        This could either be because you do not have an account or you haven't confirmed it yet.
      </p>
      
      <ul class="list-disc text-left pl-6 space-y-2">
        <li>Plesae signup to create an account</li>
        <li> If you already have, please check your email and confirm access</li>
      </ul>
  
      <div class="pt-4">
        <button class="btn variant-filled-primary" on:click={handleRetry}>
          Try Again
        </button>
      </div>

      <div class="pt-4">
        <button class="btn variant-filled-primary" on:click={createAccount}>
          Or Create a New Account
        </button>
      </div>
  
      <p class="text-sm">
        If you continue to experience issues, please contact 
        <a href="mailto:support@mentor.energy" class="text-primary-500 hover:underline">
          support@mentor.energy
        </a>
      </p>
    </div>
  </div>
  
  <style lang="postcss">
    .card {
      @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
    }
  </style>