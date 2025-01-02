import { browser } from '$app/environment';
import { onNavigate } from '$app/navigation';
import { writable } from 'svelte/store';

function createScrollHandler() {
  const { subscribe, set } = writable(0);

  return {
    subscribe,
    scrollToTop: () => {
      if (browser) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto'
        });
      }
    }
  };
}

export const scroll = createScrollHandler();