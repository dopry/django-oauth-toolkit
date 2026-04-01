// OIDC Backchannel Logout Endpoint for SvelteKit RP
// Receives POST requests from the OP with a logout_token (JWT)

import { validateLogoutToken } from '../validateLogoutToken.js';
import { sendLogoutEvent } from '../sseClients.js';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
	Accept: '*'
};

/**
 * POST /api/backchannel-logout
 * Receives a logout_token from the OP and invalidates the user session.
 */
export async function POST({ request, locals }) {
	const headers = {
		'Content-Type': 'application/json',
		...corsHeaders
	};
	try {
		let logout_token;
		let data;
		const contentType = request.headers.get('content-type') || '';
		if (contentType.includes('application/json')) {
			data = await request.json();
			logout_token = data.logout_token;
		} else if (contentType.includes('application/x-www-form-urlencoded')) {
			const form = await request.formData();
			logout_token = form.get('logout_token');
			data = { logout_token };
		} else {
			return new Response(JSON.stringify({ error: 'Unsupported content type' }), {
				status: 415,
				headers
			});
		}
		console.log('Received backchannel logout request', { data });
		if (!logout_token) {
			return new Response(JSON.stringify({ error: 'Missing logout_token' }), {
				status: 400,
				headers
			});
		}

		// Validate the logout_token (JWT) according to OIDC spec
		let payload;
		try {
			payload = await validateLogoutToken(logout_token);
		} catch (e) {
			console.log('Logout token validation error', e);
			return new Response(
				JSON.stringify({ error: 'Invalid logout_token', details: e.message }),
				{
					status: 400,
					headers
				}
			);
		}

		// Notify frontend via SSE if sid is present
		try {
			if (payload.sid) {
				console.log('Sending logout event for sid', payload.sid);
				sendLogoutEvent(payload.sub, {
					sub: payload.sub,
					sid: payload.sid,
					event: 'logout'
				});
			}
			// Notify frontend via SSE if sub is present
			// dot doesn't support sid claim currently, so use sub claim for testing
			if (payload.sub) {
				console.log('Sending logout event for sub', payload.sub);
				sendLogoutEvent(payload.sub, {
					sub: payload.sub,
					sid: payload.sid,
					event: 'logout'
				});
			}
		} catch (e) {
			console.log('Error sending logout sse events to frontend', e);
		}
		console.log('Processed backchannel logout for', { sub: payload.sub, sid: payload.sid });
		return new Response(
			JSON.stringify({ status: 'logout processed', sub: payload?.sub, sid: payload?.sid }),
			{
				status: 200,
				headers
			}
		);
	} catch (err) {
		console.log('Error processing backchannel logout request', err);
		return new Response(JSON.stringify({ error: 'Invalid request', details: err.message }), {
			status: 400,
			headers
		});
	}
}

// Handle preflight OPTIONS requests for CORS
export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: corsHeaders
	});
}
