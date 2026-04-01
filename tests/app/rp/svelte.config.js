import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// build to run in containerized node.js environment
		adapter: adapter(),
		// added for backchannel logout testing, the idp does a 
		// form POST to the api/backchannel-logout endpoint
		// which freaks out CSRF protection unless we disable it here
		csrf: { 
			trustedOrigins: [ 'http://localhost:8000' ]
		}
	}
};

export default config;
