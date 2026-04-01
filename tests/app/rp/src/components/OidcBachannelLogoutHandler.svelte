<script>
	import { browser } from '$app/environment';
	import {
		OIDC_CONTEXT_CLIENT_PROMISE,
		isAuthenticated,
		userInfo
	} from '@dopry/svelte-oidc';
	import { getContext, onDestroy } from 'svelte';


	let eventSource = null;
	const oidcPromise = getContext(OIDC_CONTEXT_CLIENT_PROMISE)
	$: sid = $userInfo?.sid || $userInfo?.sub;
    $: {
		console.log('OidcBachannelLogoutHandler sid change:', sid, $isAuthenticated, browser);
		// Reactively manage SSE connection when sid or authentication changes
		if (browser && $isAuthenticated && sid) {
			if (eventSource) {
				eventSource.close();
			}
			eventSource = new EventSource(`/api/logout-events?sid=${sid}`);
			eventSource.addEventListener('logout', async (event) => {
				console.log('Backchannel logout event received:', event);
				const oidcClient = await oidcPromise;
				await oidcClient.removeUser();
				console.log('You have been logged out by the OP (backchannel logout).', event);
			});
		} else {
			if (eventSource) {
				eventSource.close();
				eventSource = null;
			}
		}
	}

	onDestroy(() => {
		if (eventSource) {
			eventSource.close();
			eventSource = null;
		}
	});
</script>