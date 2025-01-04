<script lang="ts">
    const learningPaths = [
      {
        title: 'Learning Modules',
        path: '/dashboard/learning/modules',
        icon: '📚',
        description: 'Structured courses in geology and energy',
        items: ['Petroleum Geology', 'Structural Geology', 'Seismic Interpretation']
      },
      {
        title: 'Virtual Labs',
        path: '/dashboard/learning/virtual-labs',
        icon: '🔬',
        description: 'Interactive laboratory simulations',
        items: ['Rock Analysis', 'Well Logging', 'Reservoir Modeling']
      },
      {
        title: 'Field Trips',
        path: '/dashboard/learning/field-trips',
        icon: '🌍',
        description: 'Virtual field experiences',
        items: ['Sedimentary Basins', 'Structural Features', 'Production Sites']
      }
    ];
  </script>
  
  <div class="container mx-auto p-4 space-y-8">
    <header class="space-y-4">
      <h2 class="h2">Learning Center</h2>
      <p>Access comprehensive educational resources for your energy sector career.</p>
    </header>
  
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each learningPaths as path}
        <a href={path.path} class="card p-6 hover:bg-primary-500/10 transition-colors">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-3xl">{path.icon}</span>
            <h3 class="h3">{path.title}</h3>
          </div>
          <p class="text-surface-600-300-token mb-4">{path.description}</p>
          <ul class="list-disc list-inside text-sm space-y-1">
            {#each path.items as item}
              <li>{item}</li>
            {/each}
          </ul>
        </a>
      {/each}
    </div>
  </div>
  
  <style lang="postcss">
    .card {
      @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
    }
  </style>