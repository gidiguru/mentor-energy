<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import type { PageWithMedia } from '$lib/types/database';

    export let page: PageWithMedia;
    export let onComplete = async () => { /* default empty async function */ };

    let mediaContent: any[] = [];
    let loading = true;
    let error: string | null = null;
    let allMediaViewed = false;

    $: content = page.content || '';

    // Add a reactive statement to update media content when page changes
    $: {
        if (page && page.media_content) {
            mediaContent = page.media_content
                .sort((a, b) => a.sequence - b.sequence)
                .map(media => ({
                    ...media,
                    viewed: false
                }));
            
            loading = false;
            allMediaViewed = false;
        }
    }

    function renderMediaContent(media: any) {
        const mediaElement = document.createElement('div');
        
        switch (media.type) {
            case 'video':
                const video = document.createElement('video');
                video.src = media.url;
                video.controls = true;
                video.className = 'w-full';
                video.addEventListener('ended', () => markMediaViewed(media.id));
                mediaElement.appendChild(video);
                break;
            case 'image':
                const img = document.createElement('img');
                img.src = media.url;
                img.alt = media.alt || 'Media content';
                img.className = 'w-full object-cover';
                img.addEventListener('load', () => markMediaViewed(media.id));
                mediaElement.appendChild(img);
                break;
            case 'audio':
                const audio = document.createElement('audio');
                audio.src = media.url;
                audio.controls = true;
                audio.className = 'w-full';
                audio.addEventListener('ended', () => markMediaViewed(media.id));
                mediaElement.appendChild(audio);
                break;
        }

        return mediaElement.innerHTML;
    }

    function markMediaViewed(mediaId: string) {
        const mediaItem = mediaContent.find(m => m.id === mediaId);
        if (mediaItem) {
            mediaItem.viewed = true;
        }

        // Check if all media have been viewed
        allMediaViewed = mediaContent.every(m => m.viewed);
    }

    async function handleLessonComplete() {
        if (allMediaViewed) {
            await onComplete();
        } else {
            alert('Please view all media content before completing the lesson.');
        }
    }
</script>

{#if loading}
    <div class="text-center p-4">Loading lesson content...</div>
{:else if error}
    <div class="text-error-500 p-4">{error}</div>
{:else}
    <div class="space-y-6">
        <div class="space-y-4">
            {#each mediaContent as media}
                <div class="media-item">
                    {@html renderMediaContent(media)}
                    {#if media.title}
                        <p class="text-sm text-center mt-2">{media.title}</p>
                    {/if}
                </div>
            {/each}

            <button 
                class="btn {allMediaViewed ? 'variant-filled-primary' : 'variant-soft'}"
                on:click={handleLessonComplete}
                disabled={!allMediaViewed}
            >
                {allMediaViewed ? 'Mark Lesson Complete' : 'View All Media First'}
            </button>
        </div>

        {#if content}
            <div class="prose dark:prose-invert max-w-none mt-8">
                {@html content}
            </div>
        {/if}
    </div>
{/if}

<style lang="postcss">
    .media-item {
        @apply mb-4 rounded-lg overflow-hidden;
    }
</style>