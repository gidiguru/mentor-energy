<script lang="ts">
  import { onMount } from 'svelte';
  import type { 
    LearningModule,
    ModuleSectionWithMedia,
    ModuleProgress 
  } from '$lib/types/database';
  import ModuleNavigator from '$lib/components/learning/ModuleNavigator.svelte';
  import ModuleContent from '$lib/components/learning/ModuleContent.svelte';

  export let data: {
    module: LearningModule;
    moduleContent: ModuleSectionWithMedia[];
    progress: ModuleProgress;
    supabase: any;
    session: any;
  };

  let currentSectionId: string | undefined = undefined;
  let currentPageId: string | undefined = undefined;
  let loading = true;
  let error: string | null = null;

  $: currentSection = currentSectionId ? 
    data.moduleContent.find(s => s.id === currentSectionId) : undefined;
  $: currentPage = currentSection && currentPageId ? 
    currentSection.pages.find(p => p.id === currentPageId) : undefined;


  onMount(async () => {
    try {
      if (!data.session?.user?.id) {
        error = 'No active session';
        loading = false;
        return;
      }

    // Add null checks and fallbacks
    const moduleContent = data.moduleContent || [];

    if (moduleContent.length === 0) {
      error = 'No module content found';
      loading = false;
      return;
    }
    
    
          // Log module and progress data for debugging
    console.log('Module Data:', data.module);
    console.log('Module Progress:', data.progress);
      
      currentSectionId = data.progress?.current_section_id || 
        data.moduleContent[0]?.id;
      
      if (currentSectionId) {
        const section = data.moduleContent.find(s => s.id === currentSectionId);
        currentPageId = data.progress?.sections[currentSectionId]?.current_page_id || 
          section?.pages[0]?.id;
      }
      
      loading = false;
    } catch (err) {
      console.error('Module initialization error:', err);
      error = 'Failed to load module content';
      loading = false;
    }
  });

  async function handlePageComplete() {
 const userId = data.session?.user?.id;
 if (!userId || !currentSectionId || !currentPageId) return;

 try {
   await data.supabase
     .from('page_progress')
     .upsert({
       user_id: userId,
       module_id: data.module.id,
       section_id: currentSectionId,
       page_id: currentPageId,
       completed: true,
       last_completed_at: new Date().toISOString()
     });

   // Update section progress
   const section = data.moduleContent.find(s => s.id === currentSectionId);
   if (section && currentSectionId) { // Add currentSectionId check
     const progressSection = data.progress.sections[currentSectionId];
     const completedPages = section.pages.filter(p => 
       progressSection?.pages[p.id]?.completed
     ).length;
     
     const overallProgress = Math.round(
       (completedPages / section.pages.length) * 100
     );

     await data.supabase
       .from('section_progress')
       .update({ 
         overall_progress: overallProgress,
         current_page_id: currentPageId
       })
       .eq('section_id', currentSectionId)
       .eq('user_id', userId);
   }
 } catch (err) {
    console.error('Detailed Module Initialization Error:', {
      error: err,
      module: data.module,
      progress: data.progress
    });
    error = `Failed to load module: ${err instanceof Error ? err.message : 'Unknown error'}`;
  } finally {
    loading = false;
  }
}


  function handleNavigate(sectionId: string, pageId: string) {
    currentSectionId = sectionId;
    currentPageId = pageId;
  }
</script>

{#if loading}
  <div class="container mx-auto p-4">
    <p>Loading module...</p>
  </div>
{:else if error}
  <div class="container mx-auto p-4">
    <p class="text-error-500">{error}</p>
  </div>
{:else}
  <div class="container mx-auto px-4 py-8 space-y-6">
    <div class="card variant-soft p-4">
      <h1 class="h2">{data.module.title}</h1>
      {#if data.module.description}
        <p class="text-sm mt-2">{data.module.description}</p>
      {/if}
    </div>

    <div class="card variant-soft p-4">
      <ModuleNavigator 
        sections={data.moduleContent}
        progress={data.progress}
        currentSectionId={currentSectionId}
        currentPageId={currentPageId}
        onNavigate={handleNavigate}
      />
    </div>

    {#if currentSection && currentPage}
    <div class="card variant-soft p-4 min-h-[400px]">
      <ModuleContent 
      sections={data.moduleContent}
      section={currentSection}
      onComplete={handlePageComplete}
      {currentPageId}
      onNavigate={handleNavigate}
    />
      </div>
    {/if}
  </div>
{/if}

<style lang="postcss">
  .card {
    @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
  }
</style>