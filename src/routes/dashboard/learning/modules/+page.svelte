<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import type { Database } from '$lib/types/database';

  type BaseModule = Database['public']['Tables']['learning_modules']['Row'];
  
  interface Module extends BaseModule {
      progress?: number;
  }
  
  export let data;
  let { supabase, session } = data;
  
  let modules: Module[] = [];
  let loading = true;
  let error: string | null = null;

  async function fetchModules() {
      try {
          const { data: moduleData, error: fetchError } = await supabase
              .from('learning_modules')
              .select(`
                  id,
                  module_id,
                  title,
                  description,
                  duration,
                  discipline,
                  difficulty_level,
                  learning_objectives,
                  resources
              `);

          if (fetchError) throw fetchError;

          // Also fetch progress for current user if logged in
          if (session?.user?.id) {
              const { data: progressData, error: progressError } = await supabase
                  .from('module_progress')
                  .select('module_id, progress')
                  .eq('user_id', session.user.id);

              if (progressError) throw progressError;

              // Merge progress data with modules
              modules = moduleData.map(module => ({
                  ...module,
                  progress: progressData?.find(p => p.module_id === module.id)?.progress || 0
              }));
          } else {
              modules = moduleData.map(module => ({
                  ...module,
                  progress: 0
              }));
          }
      } catch (err) {
          console.error('Error fetching modules:', err);
          error = 'Failed to load learning modules';
      } finally {
          loading = false;
      }
  }

  onMount(() => {
      fetchModules();
  });
</script>

<div class="container mx-auto p-4 space-y-8">
  <header class="space-y-4">
      <h2 class="h2">Learning Modules</h2>
      <p class="text-surface-600-300-token">
          Interactive modules to build your geological expertise.
      </p>
  </header>

  {#if loading}
      <div class="flex justify-center p-8">
          <div class="spinner" />
      </div>
  {:else if error}
      <div class="alert variant-filled-error">
          {error}
      </div>
  {:else if modules.length === 0}
      <div class="text-center p-8">
          <p>No learning modules available yet.</p>
      </div>
  {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each modules as module}
              <a 
                  href="/dashboard/learning/modules/{module.module_id}" 
                  class="card p-6 hover:bg-primary-500/10 transition-colors"
              >
                  <div class="flex justify-between items-start mb-4">
                      <h3 class="h3">{module.title}</h3>
                      {#if module.duration}
                          <span class="badge variant-filled-surface">
                              {module.duration}
                          </span>
                      {/if}
                  </div>
                  {#if module.description}
                      <p class="text-surface-600-300-token mb-4">
                          {module.description}
                      </p>
                  {/if}
                  {#if module.difficulty_level}
                      <div class="mb-4">
                          <span class="badge variant-soft">
                              {module.difficulty_level}
                          </span>
                      </div>
                  {/if}
                  <div class="space-y-2">
                      <div class="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                      </div>
                      <div class="progress-bar bg-surface-200-700-token">
                          <div 
                              class="progress-bar-fill bg-primary-500" 
                              style="width: {module.progress}%"
                          />
                      </div>
                  </div>
              </a>
          {/each}
      </div>
  {/if}
</div>

<style lang="postcss">
  .card {
      @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
  }
  
  .progress-bar {
      @apply h-2 rounded-full overflow-hidden;
  }
  
  .progress-bar-fill {
      @apply h-full transition-all duration-300;
  }

  .spinner {
      @apply w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin;
  }
</style>