import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],
	
	vitePlugin: {
		inspector: true,
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ status, path, referrer, message }) => {
			  // Skip 404s instead of failing the build
			  if (status === 404) {
				console.warn(`Warning: Route ${path} not found (referred from ${referrer}). Skipping prerender.`);
				return;
			  }
			  // Otherwise fail the build
			  throw new Error(message);
			}
		  }
	}
};
export default config;