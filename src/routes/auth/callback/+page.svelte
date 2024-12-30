<script lang="ts">
    import { onMount } from 'svelte';
    
    onMount(() => {
      console.log('Processing authentication...');
    });
  </script>
  
  <div class="container mx-auto p-8 text-center">
    <h2 class="h2 mb-4">Processing Your Sign In</h2>
    <p class="text-lg mb-8">Please wait while we complete your authentication...</p>
    <div class="flex justify-center">
      <div class="spinner" />
    </div>
  </div>
  
  <style>
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #ddd;
      border-top: 4px solid #666;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  