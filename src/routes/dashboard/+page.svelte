
<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;

  $: ({ profile, stats } = data);
</script>

<div class="space-y-8">
  <!-- Welcome Section -->
  <header class="space-y-4">
    <h1 class="h1">Welcome back, {profile?.first_name || 'User'}</h1>
    <p class="text-surface-600-300-token">
      Your learning progress: {stats.progressPercentage}%
    </p>
  </header>

  <!-- Dashboard Content -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Progress Overview -->
    <div class="card p-4">
      <h2 class="h3 mb-4">Your Progress</h2>
      <div class="space-y-2">
        <div>Completed Modules: {stats.completedModules}</div>
        <div>Total Modules: {stats.totalModules}</div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card p-4">
      <h2 class="h3 mb-4">Recent Activity</h2>
      <!-- Add recent activity content -->
    </div>

    <!-- Quick Actions -->
    <div class="card p-4">
      <h2 class="h3 mb-4">Quick Actions</h2>
      <div class="grid gap-2">
        <a href="/dashboard/learning" class="btn variant-filled-primary">
          Continue Learning
        </a>
        <a href="/dashboard/mentorship" class="btn variant-filled-secondary">
          Book Mentorship Session
        </a>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .card {
    @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
  }
</style>