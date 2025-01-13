<script lang="ts">
  import { slide } from 'svelte/transition';
  import type { SectionContent, ModuleProgress } from '$lib/types/database';
  
  export let sections: SectionContent[];
  export let progress: ModuleProgress;
  export let currentSectionId: string | undefined = undefined;
  export let currentPageId: string | undefined = undefined;
  export let onNavigate: (sectionId: string, pageId: string) => void;
  
  let showSections = false;
  
  $: currentSection = sections.find(s => s.id === currentSectionId);
  $: currentPage = currentSection?.pages?.find(p => p.id === currentPageId);
  $: currentSectionIndex = sections.findIndex(s => s.id === currentSectionId);
  $: currentPageIndex = currentSection?.pages?.findIndex(p => p.id === currentPageId) ?? -1;
  $: hasNextPage = currentSection && 
    ((currentPageIndex < (currentSection.pages?.length ?? 0) - 1) || 
     currentSectionIndex < sections.length - 1);

  $: hasPrevPage = currentPageIndex > 0 || currentSectionIndex > 0;

  function getNextPage(): { sectionId: string, pageId: string } | undefined {
    if (!currentSection || !currentPage) return undefined;
    
    // Check if there's a next page in current section
    if (currentPageIndex < (currentSection.pages?.length || 0) - 1) {
      return {
        sectionId: currentSection.id,
        pageId: currentSection.pages?.[currentPageIndex + 1].id
      };
    }
    
    // Check if there's a next section
    if (currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];
      if (nextSection.pages && nextSection.pages.length > 0) {
        return {
          sectionId: nextSection.id,
          pageId: nextSection.pages[0].id
        };
      }
    }
    
    return undefined;
  }

  function getPreviousPage(): { sectionId: string, pageId: string } | undefined {
  if (!currentSection || currentPageIndex < 0) return undefined;

  if (currentPageIndex > 0) {
    return {
      sectionId: currentSection.id,
      pageId: currentSection.pages[currentPageIndex - 1].id
    };
  }

  if (currentSectionIndex > 0) {
    const prevSection = sections[currentSectionIndex - 1];
    const lastPageIndex = prevSection.pages.length - 1;
    return {
      sectionId: prevSection.id,
      pageId: prevSection.pages[lastPageIndex].id
    };
  }

  return undefined;
}

  function handleNext() {
    const next = getNextPage();
    if (next) onNavigate(next.sectionId, next.pageId);
  }


  function handlePrevious() {
    if (!hasPrevPage || !currentSection) return;

    if (currentPageIndex > 0) {
      onNavigate(currentSection.id, currentSection.pages[currentPageIndex - 1].id);
    } else if (currentSectionIndex > 0) {
      const prevSection = sections[currentSectionIndex - 1];
      const lastIndex = prevSection.pages.length - 1;
      onNavigate(prevSection.id, prevSection.pages[lastIndex].id);
    }
  }

  function getSectionProgress(section: SectionContent): number {
    const sectionProgress = progress.sections[section.id];
    if (!sectionProgress) return 0;
    
    const completedPages = Object.values(sectionProgress.pages)
      .filter(p => p.completed).length;
    return Math.round((completedPages / section.pages.length) * 100);
  }

  function getPageStatus(sectionId: string, pageId: string): string {
    const sectionProgress = progress.sections[sectionId];
    const pageProgress = sectionProgress?.pages[pageId];
    if (!pageProgress) return '○';
    if (pageProgress.completed) return '●';
    if (pageProgress.viewed) return '◐';
    return '○';
  }
</script>

<div class="space-y-4">
  <div class="flex justify-between items-center">
    <div class="text-sm">
      {#if currentSection && currentPage}
        Section {currentSectionIndex + 1}.{currentPageIndex + 1} of {sections.length}
      {/if}
    </div>
    <div class="flex gap-2">

      <button
      class="btn variant-ghost-primary"
      on:click={handlePrevious}
      disabled={!hasPrevPage || !currentSection}
    >
      Previous
    </button>
      <button
        class="btn variant-filled-primary"
        on:click={handleNext}
        disabled={!getNextPage()}
      >
        Next
      </button>
      <button
        class="btn variant-soft"
        on:click={() => showSections = !showSections}
      >
        {showSections ? 'Hide Sections' : 'Show Sections'}
      </button>
    </div>
  </div>

  {#if showSections}
    <div class="grid gap-4" transition:slide>
      {#each sections as section (section.id)}
        <div class="card variant-soft p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="h3">{section.title}</h3>
            <div class="text-sm">
              {getSectionProgress(section)}%
            </div>
          </div>
          
          <div class="space-y-2 pl-4">
            {#each section.pages as page (page.id)}
              <button
                class="w-full text-left p-2 rounded-lg transition-colors
                  {page.id === currentPageId
                    ? 'bg-primary-500 text-white'
                    : 'hover:bg-surface-300-600-token'}"
                on:click={() => {
                  onNavigate(section.id, page.id);
                  showSections = false;
                }}
              >
                <div class="flex items-center gap-2">
                  <span class="text-sm">
                    {getPageStatus(section.id, page.id)}
                  </span>
                  <span>{page.title}</span>
                  {#if page.page_type !== 'lesson'}
                    <span class="text-xs bg-surface-500/20 px-2 py-1 rounded">
                      {page.page_type}
                    </span>
                  {/if}
                </div>
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>