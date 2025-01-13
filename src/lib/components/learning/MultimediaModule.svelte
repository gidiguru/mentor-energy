<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import type { 
    ModuleSectionWithMedia,
    MediaContent
  } from '$lib/types/database';

  export let section: ModuleSectionWithMedia;
  
  let activeMediaIndex = 0;
  let audioPlayer: HTMLAudioElement;
  let videoPlayer: HTMLVideoElement;
  let isPlaying = false;
  let progress = 0;
  let mediaLoaded = false;
  
  const ANIMATION_DURATION = 800;
  
  $: activeMedia = section.media_content?.[activeMediaIndex];
  
  onMount(() => {
    mediaLoaded = true;
  });

  function handleMediaProgress(event: Event) {
    const target = event.target as HTMLMediaElement;
    progress = (target.currentTime / target.duration) * 100;
  }

  function handleMediaToggle() {
    if (!activeMedia) return;
    
    if (!isPlaying) {
      if (activeMedia.type === 'audio' && audioPlayer) {
        audioPlayer.play();
      } else if (activeMedia.type === 'video' && videoPlayer) {
        videoPlayer.play();
      }
    } else {
      if (activeMedia.type === 'audio' && audioPlayer) {
        audioPlayer.pause();
      } else if (activeMedia.type === 'video' && videoPlayer) {
        videoPlayer.pause();
      }
    }
    isPlaying = !isPlaying;
  }

  function nextMedia() {
    if (section.media_content && activeMediaIndex < section.media_content.length - 1) {
      activeMediaIndex++;
    }
  }

  function previousMedia() {
    if (activeMediaIndex > 0) {
      activeMediaIndex--;
    }
  }

  function getMediaTitle(media: MediaContent): string {
    return media.title || `${media.type.charAt(0).toUpperCase() + media.type.slice(1)} ${activeMediaIndex + 1}`;
  }
</script>

<div 
  class="multimedia-module w-full mx-auto space-y-6"
  in:fade={{ duration: ANIMATION_DURATION }}
>
  <h2 
    class="h2"
    in:fly={{ y: 20, duration: ANIMATION_DURATION, easing: elasticOut }}
  >
    {section.title}
  </h2>

  {#if mediaLoaded && section.media_content?.length > 0 && activeMedia}
    <div 
      class="media-container relative rounded-lg overflow-hidden bg-surface-100-800-token"
      in:fly={{ y: 20, duration: ANIMATION_DURATION, delay: 400, easing: elasticOut }}
    >
      <!-- Image -->
      {#if activeMedia.type === 'image'}
        <img
          src={activeMedia.url}
          alt={activeMedia.alt || getMediaTitle(activeMedia)}
          class="w-full h-auto object-cover"
          loading="lazy"
        />
      {/if}

      <!-- Video -->
      {#if activeMedia.type === 'video'}
        <div class="relative">
          <video
            bind:this={videoPlayer}
            class="w-full"
            controls
            on:timeupdate={handleMediaProgress}
          >
            <source src={activeMedia.url} type="video/mp4" />
            <!-- Always include a captions track, using provided URL or a fallback -->
            <track 
              kind="captions" 
              src={activeMedia.captions_url || '/empty-captions.vtt'} 
              label="Captions"
              default
            />
            {#if activeMedia.descriptions_url}  
              <track 
                kind="descriptions"
                src={activeMedia.descriptions_url}
                label="Descriptions"
              />
            {/if}
            Your browser does not support the video tag.
          </video>
          
          {#if !activeMedia.captions_url}
            <div class="absolute top-2 right-2 bg-surface-800/90 text-white px-3 py-1 rounded-full text-sm">
              No captions available
            </div>
          {/if}
        </div>
      {/if}

      <!-- Audio -->
      {#if activeMedia.type === 'audio'}
        <div class="audio-player p-4 bg-surface-200-700-token">
          <audio
            bind:this={audioPlayer}
            class="hidden"
            on:timeupdate={handleMediaProgress}
          >
            <source src={activeMedia.url} type="audio/mpeg" />
            {#if activeMedia.captions_url}
              <track 
                kind="captions" 
                src={activeMedia.captions_url} 
                label="Captions"
              />
            {/if}
            Your browser does not support the audio element.
          </audio>

          <div class="flex flex-col gap-2">
            <div class="text-center font-medium">
              {getMediaTitle(activeMedia)}
            </div>
            <div class="flex items-center gap-4">
              <button
                class="btn variant-filled-primary p-2 rounded-full"
                on:click={handleMediaToggle}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {#if isPlaying}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                {/if}
              </button>

              <div class="flex-1 h-2 bg-surface-300-600-token rounded-full overflow-hidden">
                <div 
                  class="h-full bg-primary-500"
                  style="width: {progress}%"
                />
              </div>
            </div>
          </div>
        </div>
      {/if}

      <!-- Media Navigation -->
      {#if section.media_content.length > 1}
        <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {#each section.media_content as media, i}
            <button
              class="w-2 h-2 rounded-full {i === activeMediaIndex ? 'bg-primary-500' : 'bg-surface-500/50'}"
              on:click={() => activeMediaIndex = i}
              aria-label={getMediaTitle(media)}
            />
          {/each}
        </div>

        <button
          class="absolute left-4 top-1/2 -translate-y-1/2 btn variant-filled-surface rounded-full p-2"
          on:click={previousMedia}
          disabled={activeMediaIndex === 0}
          aria-label="Previous media"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        <button
          class="absolute right-4 top-1/2 -translate-y-1/2 btn variant-filled-surface rounded-full p-2"
          on:click={nextMedia}
          disabled={activeMediaIndex === section.media_content.length - 1}
          aria-label="Next media"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      {/if}
    </div>
  {/if}

  <div 
    class="prose max-w-none"
    in:fly={{ y: 20, duration: ANIMATION_DURATION, delay: 200, easing: elasticOut }}
  >
    {@html section.content}
  </div>
</div>

<style lang="postcss">
  .multimedia-module {
    @apply relative;
  }

  .media-container {
    @apply aspect-video;
  }

  .media-container img,
  .media-container video {
    @apply absolute inset-0 w-full h-full object-cover;
  }

  button:disabled {
    @apply opacity-50 cursor-not-allowed;
  }

  :global(.prose) {
    @apply text-surface-900-50-token;
  }
  
  :global(.prose h1),
  :global(.prose h2),
  :global(.prose h3),
  :global(.prose h4) {
    @apply text-surface-900-50-token;
  }
  
  :global(.prose a) {
    @apply text-primary-500;
  }
</style>