<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
  </script>
  
  <div class="container mx-auto p-4">
    <h1 class="h1 mb-4">Supabase Test</h1>
    
    {#if data.error}
      <div class="bg-error-500/20 text-error-500 p-4 rounded">
        Error: {data.error}
      </div>
    {:else if data.testData && data.testData.length > 0}
      <div class="space-y-2">
        <h2 class="h2">Retrieved Test Entries:</h2>
        {#each data.testData as entry}
          <div class="block card card-hover p-4 variant-filled-primary">
            <pre>{JSON.stringify(entry, null, 2)}</pre>
          </div>
        {/each}
      </div>
    {:else}
      <p>No data available</p>
    {/if}
  </div>