<script lang="ts">
    import { onMount } from 'svelte';
    import { progressBar } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';
    
    export let data: PageData;
  
    let currentStep = 0;
    let userAnswers: Record<number, string> = {};
    let showFeedback = false;
    let isCorrect = false;
    let progress = 0;
  
    // Sample module content - in production this would come from the server
    const content = [
      {
        type: 'text',
        content: 'Welcome to the Introduction to Petroleum Geology module.'
      },
      {
        type: 'mcq',
        question: 'Which of the following is NOT a type of hydrocarbon trap?',
        options: [
          'Structural trap',
          'Stratigraphic trap',
          'Crystalline trap',
          'Combination trap'
        ],
        correctAnswer: 'Crystalline trap',
        correctFeedback: 'Correct! Crystalline trap is not a real type of hydrocarbon trap.',
        incorrectFeedback: 'That\'s not correct. Review the types of hydrocarbon traps.'
      },
      {
        type: 'mcq',
        question: 'What is the primary source rock for most petroleum deposits?',
        options: [
          'Sandstone',
          'Shale',
          'Limestone',
          'Granite'
        ],
        correctAnswer: 'Shale',
        correctFeedback: 'Correct! Shale is the most common source rock.',
        incorrectFeedback: 'Not quite. Consider the organic content of different rocks.'
      }
    ];
  
    $: progress = (currentStep / content.length) * 100;
  
    function handleAnswer(answer: string) {
      userAnswers[currentStep] = answer;
      showFeedback = true;
      isCorrect = answer === content[currentStep].correctAnswer;
    }
  
    function handleNext() {
      showFeedback = false;
      if (currentStep < content.length - 1) {
        currentStep++;
      } else {
        handleComplete();
      }
    }
  
    function handleRetry() {
      showFeedback = false;
    }
  
    async function handleComplete() {
      try {
        const response = await fetch('/api/learning/complete-module', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            moduleId: data.moduleId,
            answers: userAnswers
          })
        });
  
        if (!response.ok) throw new Error('Failed to save progress');
  
        // Show completion message and redirect
        alert('Module completed successfully!');
        window.location.href = '/dashboard/learning-modules';
      } catch (error) {
        console.error('Error completing module:', error);
        alert('Failed to save progress. Please try again.');
      }
    }
  </script>
  
  <div class="container mx-auto p-4">
    <div class="card p-6 max-w-3xl mx-auto">
      <header class="mb-6">
        <a 
          href="/dashboard/learning/modules" 
          class="btn btn-sm variant-ghost mb-4"
        >
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
          <span class="text-sm whitespace-nowrap">
            {currentStep + 1} of {content.length}
          </span>
        </div>
      </header>
  
      <div class="space-y-6">
        {#if content[currentStep].type === 'text'}
          <div class="prose dark:prose-invert max-w-none">
            <p>{content[currentStep].content}</p>
          </div>
          <button 
            class="btn variant-filled-primary" 
            on:click={handleNext}
          >
            Continue
          </button>
        {:else if content[currentStep].type === 'mcq'}
          <div class="space-y-4">
            <h3 class="h3">{content[currentStep].question}</h3>
            <div class="grid gap-3">
              {#each content[currentStep].options as option}
                <button
                  class="btn {userAnswers[currentStep] === option ? 
                    'variant-filled-primary' : 'variant-ghost'} 
                    text-left p-4"
                  on:click={() => handleAnswer(option)}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              {/each}
            </div>
          </div>
        {/if}
  
        {#if showFeedback}
          <div class="card p-4 {isCorrect ? 
            'variant-glass-success' : 
            'variant-glass-error'}">
            <p class="font-medium">
              {isCorrect ? 
                content[currentStep].correctFeedback : 
                content[currentStep].incorrectFeedback}
            </p>
            <div class="mt-4">
              {#if isCorrect}
                <button 
                  class="btn variant-filled-primary"
                  on:click={handleNext}
                >
                  {currentStep === content.length - 1 ? 'Complete' : 'Next'}
                </button>
              {:else}
                <button 
                  class="btn variant-ghost"
                  on:click={handleRetry}
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