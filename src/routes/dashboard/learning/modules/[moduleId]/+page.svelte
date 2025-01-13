<script lang="ts">
  import { goto } from '$app/navigation';
  import type { PageData } from './$types';


  export let data: PageData;
  
  // Destructure with type safety
  $: module = data.module;
  $: progress = data.progress;
  $: moduleId = data.moduleId;

  // Parse learning objectives safely


  // Calculate completion percentage
  $: completionPercentage = progress?.progress || 0;
</script>

<div class="space-y-6">
  {#if module}
    <header class="space-y-4">
      <a href="/dashboard/learning/modules" class="btn btn-sm variant-ghost">
        ← Back to Modules
      </a>
      <h1 class="h1">{module.title}</h1>
      <p class="text-lg">{module.description || 'No description available'}</p>
      
      <!-- Progress Bar -->
      <div class="space-y-2">
        <div class="flex justify-between">
          <span>Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div class="h-2 bg-surface-500/30 rounded-full overflow-hidden">
          <div 
            class="h-full bg-primary-500 transition-all duration-300"
            style="width: {completionPercentage}%"
          />
        </div>
      </div>
    </header>

    <div class="grid md:grid-cols-2 gap-6">
      <!-- Module Info -->
      <div class="card p-6 space-y-4">
        <h2 class="h2">Module Details</h2>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Duration</span>
            <span>{module.duration || 'N/A'}</span>
          </div>
          <div class="flex justify-between">
            <span>Level</span>
            <span class="capitalize">{module.difficulty_level || 'N/A'}</span>
          </div>
          <div class="flex justify-between">
            <span>Discipline</span>
            <span class="capitalize">{module.discipline || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Continue/Start Button -->
    <div class="flex justify-center">
      <button 
        class="btn variant-filled-primary"
        on:click={() => {
          // Use the module_id for navigation
          goto(`/dashboard/learning/modules/${module.module_id}/content`);
        }}
      >
        {progress?.progress && progress.progress > 0 ? 'Continue Module' : 'Start Module'}
      </button>
    </div>
  {:else}
    <div class="alert variant-filled-error">
      Module not found
    </div>
  {/if}
</div>

<style lang="postcss">
  .card {
    @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
  }
</style>