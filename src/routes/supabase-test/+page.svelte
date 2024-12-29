
<script lang="ts">
  import type { PageData } from './$types';

  interface Country {
    name: string;
  }

  export let data: PageData;
  $: ({ countries } = data);
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Top 5 Countries</h1>
  
  {#if countries.length > 0}
    <ul class="space-y-2">
      {#each countries as country (country.name)}
        <li class="p-3 bg-surface-100-800-token rounded shadow">
          {country.name}
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-center text-surface-500">No countries found</p>  
  {/if}
</div>