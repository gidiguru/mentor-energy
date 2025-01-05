<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  let { module, progress, moduleId } = data;

  $: completionPercentage = progress?.completion_percentage || 0;
  $: objectives = typeof module?.learning_objectives === 'string' 
    ? module.learning_objectives.split('\n') 
    : Array.isArray(module?.learning_objectives) 
      ? module.learning_objectives 
      : [];
</script>

<div class="space-y-6">
  {#if module}
    <header class="space-y-4">
      <a href="/dashboard/learning/modules" class="btn btn-sm variant-ghost">
        ← Back to Modules
      </a>
      <h1 class="h1">{module.title}</h1>
      <p class="text-lg">{module.description}</p>
      
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
            <span>{module.duration || 'N/A'} </span>
          </div>
          <div class="flex justify-between">
            <span>Level</span>
            <span class="capitalize">{module.difficulty_level || 'N/A'}</span>
          </div>
          {#if module.prerequisites}
            <div>
              <span class="font-semibold">Prerequisites:</span>
              <p>{module.prerequisites}</p>
            </div>
          {/if}
        </div>
      </div>

      <!-- Learning Objectives -->
      {#if objectives.length > 0}
        <div class="card p-6 space-y-4">
          <h2 class="h2">Learning Objectives</h2>
          <ul class="list-disc list-inside space-y-2">
            {#each objectives as objective}
              <li>{objective}</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>

    <!-- Continue/Start Button -->
    <div class="flex justify-center">
      <button 
        class="btn variant-filled-primary"
        on:click={() => {
          // TODO: Implement lesson navigation
          console.log('Starting/Continuing module:', moduleId);
        }}
      >
        {progress ? 'Continue Module' : 'Start Module'}
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