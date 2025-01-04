<script lang="ts">
    import { page } from '$app/stores';
  
    const modules = [
      {
        id: 'intro-petro-geology',
        title: 'Introduction to Petroleum Geology',
        description: 'Learn the fundamentals of petroleum geology and hydrocarbon formation.',
        duration: '45 mins',
        progress: 0
      },
      {
        id: 'structural-geology',
        title: 'Structural Geology Basics',
        description: 'Understanding geological structures and their formation.',
        duration: '60 mins',
        progress: 0
      },
      {
        id: 'seismic-interpretation',
        title: 'Seismic Interpretation',
        description: 'Basic principles of seismic data interpretation.',
        duration: '90 mins',
        progress: 0
      }
    ];
  </script>
  
  <div class="container mx-auto p-4 space-y-8">
    <header class="space-y-4">
      <h2 class="h2">Learning Modules</h2>
      <p class="text-surface-600-300-token">
        Interactive modules to build your geological expertise.
      </p>
    </header>
  
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each modules as module}
        <a 
          href="/dashboard/learning/modules/{module.id}" 
          class="card p-6 hover:bg-primary-500/10 transition-colors"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="h3">{module.title}</h3>
            <span class="badge variant-filled-surface">{module.duration}</span>
          </div>
          <p class="text-surface-600-300-token mb-4">{module.description}</p>
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
  </style>