<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from '../$types';
    import { LearningModule, type ModuleContent } from '$lib/modules/LearningModules';
    
    interface ModulePageData extends PageData {
      moduleId?: string;
    }
  
    export let data: ModulePageData;
  
    const module = LearningModule();
    let content = module.getCurrentContent();
    let progress = 0;
  
    $: {
      content = module.getCurrentContent();
      //progress = ((module.currentStep + 1) / module.totalSteps) * 100;
    }
  </script>
  
  <div class="container mx-auto p-4">
    <div class="card p-6 max-w-3xl mx-auto">
      <header class="mb-6">
        <a href="/dashboard/learning/modules" class="btn btn-sm variant-ghost mb-4">
          ← Back to Modules
        </a>
        <h2 class="h2">Introduction to Petroleum Geology</h2>
        <div class="flex items-center gap-2 mt-2">
          <div class="progress-bar w-full h-2 rounded-full bg-surface-200-700-token">
            <div 
              class="h-full bg-primary-500 rounded-full transition-all" 
              style="width: {progress}%"
            />
          </div>
          <!--<span class="text-sm whitespace-nowrap">
           {module.currentStep + 1} of {module.totalSteps}
          </span>--> 
        </div>
      </header>
  
      <div class="space-y-6">
        {#if content.type === 'text'}
          <div class="prose dark:prose-invert max-w-none">
            <p>{content.content}</p>
          </div>
          <button 
            class="btn variant-filled-primary" 
            on:click={module.handleNext}
          >
            Continue
          </button>
        {:else}
          <div class="space-y-4">
            <h3 class="h3">{content.question}</h3>
            <div class="grid gap-3">
              {#each content.options as option}
                <button
                  class="btn {module.userAnswers[content.id] === option ? 
                    'variant-filled-primary' : 'variant-ghost'} 
                    text-left p-4"
                  on:click={() => module.handleAnswer(content.id, option)}
                  disabled={module.showFeedback}
                >
                  {option}
                </button>
              {/each}
            </div>
          </div>
        {/if}
  
        {#if module.showFeedback && content.type === 'mcq'}
          <div class="card p-4 {module.isCorrect ? 
            'variant-glass-success' : 
            'variant-glass-error'}">
            <p class="font-medium">
              {module.isCorrect ? content.correctFeedback : content.incorrectFeedback}
            </p>
            <div class="mt-4">
              {#if module.isCorrect}
                <button 
                  class="btn variant-filled-primary"
                  on:click={module.handleNext}
                >
                  {module.isLastStep() ? 'Complete' : 'Next'}
                </button>
              {:else}
                <button 
                  class="btn variant-ghost"
                >
                  Try Again
                </button>
              {/if}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <style lang="postcss">
    .card {
      @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
    }
  </style>