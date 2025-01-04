<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { AppBar } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { slide } from 'svelte/transition';
    import type { LayoutData } from './$types';
    
    export let data: LayoutData;
    let { supabase, session, user, profile } = data;
    
    const currentPath = writable('');
    let isNavOpen = false;
    let isMobile = false;
    let expandedItem: string | null = null;
 
    const navItems = [
      { path: '/dashboard', label: 'Overview', icon: '🏠' },
      { 
        path: '/dashboard/learning', 
        label: 'Learning', 
        icon: '📚',
        hasSubItems: true,
        subItems: [
          { path: '/dashboard/learning/modules', label: 'Modules', icon: '📖' },
          { path: '/dashboard/learning/virtual-labs', label: 'Virtual Labs', icon: '🔬' },
          { path: '/dashboard/learning/field-trips', label: 'Field Trips', icon: '🌍' }
        ]
      },
      { path: '/dashboard/mentorship', label: 'Mentorship', icon: '👥' },
      { 
        path: '/dashboard/community', 
        label: 'Community', 
        icon: '💬',
        hasSubItems: true,
        subItems: [
          { path: '/dashboard/community/chat', label: 'Chat Room', icon: '💭' },
          { path: '/dashboard/community/challenges', label: 'Challenges', icon: '🎮' }
        ]
      },
      { path: '/dashboard/projects', label: 'Projects', icon: '📋' },
      { path: '/dashboard/certifications', label: 'Certificates', icon: '🏆' },
      { path: '/dashboard/settings', label: 'Settings', icon: '⚙️' }
    ];
 
    onMount(() => {
      currentPath.set(window.location.pathname);
      checkMobile();
      
      window.addEventListener('resize', checkMobile);
      
      const observer = new MutationObserver(() => {
        currentPath.set(window.location.pathname);
      });
 
      observer.observe(document.documentElement, {
        subtree: true,
        childList: true
      });
 
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', checkMobile);
      };
    });
 
    function checkMobile() {
      isMobile = window.innerWidth < 640;
      if (!isMobile) isNavOpen = false;
    }
 
    function toggleNav() {
      isNavOpen = !isNavOpen;
    }
 
    function toggleSubMenu(path: string) {
      expandedItem = expandedItem === path ? null : path;
    }
 
    function handleNavClick(path: string) {
      goto(path);
      isNavOpen = false;
    }
 
    async function handleSignOut() {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        goto('/');
      }
    }
 </script>
 
 <div class="flex h-screen">
    <!-- Desktop Sidebar -->
    {#if !isMobile}
        <aside class="w-64 bg-surface-100-800-token border-r border-surface-500/30 p-4 hidden sm:block">
            <div class="flex flex-col gap-2">
                {#each navItems as item}
                    <div class="w-full">
                        <button 
                            class="btn w-full {$currentPath === item.path ? 'variant-filled-primary' : 'variant-ghost'} justify-start"
                            on:click={() => item.hasSubItems ? toggleSubMenu(item.path) : handleNavClick(item.path)}
                        >
                            <span class="flex items-center gap-3">
                                <span class="text-xl">{item.icon}</span>
                                <span>{item.label}</span>
                                {#if item.hasSubItems}
                                    <span class="ml-auto">{expandedItem === item.path ? '▼' : '▶'}</span>
                                {/if}
                            </span>
                        </button>
 
                        {#if item.hasSubItems && expandedItem === item.path}
                            <div class="bg-surface-200-700-token rounded-b-lg" transition:slide>
                                {#each item.subItems as subItem}
                                    <button 
                                        class="btn w-full pl-8 {$currentPath === subItem.path ? 'variant-filled-primary' : 'variant-ghost'}"
                                        on:click={() => handleNavClick(subItem.path)}
                                    >
                                        <span class="flex items-center gap-3">
                                            <span class="text-xl">{subItem.icon}</span>
                                            <span>{subItem.label}</span>
                                        </span>
                                    </button>
                                {/each}
                            </div>
                        {/if}
                    </div>
                {/each}
                
                <button 
                    class="btn variant-ghost-error mt-auto"
                    on:click={handleSignOut}
                >
                    <span class="flex items-center gap-3">
                        <span class="text-xl">🚪</span>
                        <span>Sign Out</span>
                    </span>
                </button>
            </div>
        </aside>
    {/if}
 
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
        <!-- Mobile Header -->
        {#if isMobile}
            <header class="bg-surface-100-800-token border-b border-surface-500/30 p-4">
                <button 
                    class="btn variant-filled-primary w-full flex items-center gap-2 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    on:click={toggleNav}
                >
                    <span class="text-2xl">📱</span>
                    <span>Menu</span>
                    <span class="ml-auto text-xl">{isNavOpen ? '▼' : '▶'}</span>
                </button>
 
                {#if isNavOpen}
                    <nav 
                        class="absolute z-50 left-4 right-4 mt-3 bg-surface-50-900-token rounded-xl shadow-2xl border-2 border-primary-500"
                        transition:slide={{duration: 200}}
                    >
                        {#each navItems as item}
                            <div class="w-full">
                                <button 
                                    class="btn w-full text-lg {$currentPath === item.path ? 'variant-filled-primary' : 'variant-ghost hover:variant-soft-primary'}"
                                    on:click={() => item.hasSubItems ? toggleSubMenu(item.path) : handleNavClick(item.path)}
                                >
                                    <span class="flex items-center gap-4 py-1">
                                        <span class="text-2xl">{item.icon}</span>
                                        <span>{item.label}</span>
                                        {#if item.hasSubItems}
                                            <span class="ml-auto">{expandedItem === item.path ? '▼' : '▶'}</span>
                                        {/if}
                                    </span>
                                </button>
 
                                {#if item.hasSubItems && expandedItem === item.path}
                                    <div class="bg-surface-200-700-token" transition:slide>
                                        {#each item.subItems as subItem}
                                            <button 
                                                class="btn w-full text-lg pl-12 {$currentPath === subItem.path ? 'variant-filled-primary' : 'variant-ghost hover:variant-soft-primary'}"
                                                on:click={() => handleNavClick(subItem.path)}
                                            >
                                                <span class="flex items-center gap-4 py-1">
                                                    <span class="text-xl">{subItem.icon}</span>
                                                    <span>{subItem.label}</span>
                                                </span>
                                            </button>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        {/each}
                        
                        <button 
                            class="btn w-full text-lg variant-ghost-error hover:variant-filled-error"
                            on:click={handleSignOut}
                        >
                            <span class="flex items-center gap-4 py-1">
                                <span class="text-2xl">🚪</span>
                                <span>Sign Out</span>
                            </span>
                        </button>
                    </nav>
                {/if}
            </header>
        {/if}
 
        <!-- Page Content -->
        <main class="flex-1 p-4 overflow-auto">
            <slot />
        </main>
    </div>
 </div>
 
 <style lang="postcss">
    :global(.app-bar) {
        @apply shadow-none;
    }
    
    .btn {
        @apply p-3 transition-colors duration-200;
    }
 
    nav button {
        @apply border-b border-surface-500/30 last:border-none rounded-none first:rounded-t-lg last:rounded-b-lg;
    }
 </style>