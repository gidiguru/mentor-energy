<script lang="ts">
    import { fade } from 'svelte/transition';
    import type { ModuleSectionWithMedia, PageWithMedia } from '$lib/types/database';
    import LessonContent from './LessonContent.svelte';
    
    export let sections: ModuleSectionWithMedia[];
    export let section: ModuleSectionWithMedia;
    export let onComplete: ((pageId: string) => Promise<void>) | undefined = undefined;
    export let currentPageId: string | undefined = undefined;
    export let onNavigate: (sectionId: string, pageId: string) => void;
  
    $: currentSectionIndex = sections.findIndex(s => s.id === section.id);
    $: currentIndex = section.pages.findIndex(p => p.id === currentPageId);
    $: currentPage = currentIndex >= 0 ? section.pages[currentIndex] : section.pages[0];
    $: hasNextPage = currentIndex < section.pages.length - 1 || currentSectionIndex < sections.length - 1;
    $: hasPrevPage = currentIndex > 0 || currentSectionIndex > 0;
  
    function getNextPage(): { sectionId: string, pageId: string } | undefined {
      if (currentIndex < section.pages.length - 1) {
        return {
          sectionId: section.id,
          pageId: section.pages[currentIndex + 1].id
        };
      }
  
      if (currentSectionIndex < sections.length - 1) {
        const nextSection = sections[currentSectionIndex + 1];
        return nextSection.pages?.[0] ? {
          sectionId: nextSection.id,
          pageId: nextSection.pages[0].id
        } : undefined;
      }
  
      return undefined;
    }
 
    
    function getPreviousPage(): { sectionId: string, pageId: string } | undefined {
      if (currentIndex > 0) {
        return {
          sectionId: section.id,
          pageId: section.pages[currentIndex - 1].id
        };
      }
  
      if (currentSectionIndex > 0) {
        const prevSection = sections[currentSectionIndex - 1];
        const lastPageIndex = prevSection.pages.length - 1;
        return lastPageIndex >= 0 ? {
          sectionId: prevSection.id,
          pageId: prevSection.pages[lastPageIndex].id
        } : undefined;
      }
  
      return undefined;
    }
  
    async function handleNext() {
      const next = getNextPage();
      if (next) {
        if (onComplete && currentPage) {
          await onComplete(currentPage.id);
        }
        onNavigate(next.sectionId, next.pageId);
      }
    }
  
    function handlePrevious() {
  if (!hasPrevPage) return;
  
  if (currentIndex > 0) {
    onNavigate(section.id, section.pages[currentIndex - 1].id);
  } else if (currentSectionIndex > 0) {
    const prevSection = sections[currentSectionIndex - 1];
    const lastIndex = prevSection.pages.length - 1;
    onNavigate(prevSection.id, prevSection.pages[lastIndex].id);
  }
}
  </script>
  
  <div class="module-content w-full mx-auto space-y-6" in:fade={{ duration: 800 }}>
    <div class="text-center mb-4">
      <h2 class="h2">{currentPage.title}</h2>
    </div>
   
    {#if currentPage}
      <LessonContent 
        page={currentPage} 
        onComplete={() => onComplete ? onComplete(currentPage.id) : Promise.resolve()}
      />
    {/if}
   
    <div class="flex items-center">
        <button
        class="btn variant-ghost-primary mr-auto"
        on:click={handlePrevious} 
        disabled={!hasPrevPage}
      >
        Previous
      </button>
      <div class="text-sm mx-4">
        Page {currentIndex + 1} of {section.pages.length}
      </div>
      <button
        class="btn variant-filled-primary ml-auto"
        on:click={handleNext}
        disabled={!getNextPage()}
      >
        Next
      </button>
    </div>
   </div>