// Utility for OIDC logout token validation using jose
import { createRemoteJWKSet, jwtVerify } from 'jose';

// Set your OP's JWKS endpoint here
const JWKS_URI = 'http://localhost:8000/o/.well-known/jwks.json'; // Adjust as needed

const JWKS = createRemoteJWKSet(new URL(JWKS_URI));

export async function validateLogoutToken(token) {
    try {
        // Accept only ID Token or Logout Token types
        const { payload } = await jwtVerify(token, JWKS, {
            algorithms: ['RS256'],
            // audience, issuer, etc. can be checked here if needed
        });
        // OIDC Backchannel Logout Token must have events.logout
        if (!payload.events || !payload.events['http://schemas.openid.net/event/backchannel-logout']) {
            throw new Error('Missing backchannel-logout event');
        }
        // sub or sid must be present
        if (!payload.sub && !payload.sid) {
            throw new Error('Logout token missing sub and sid');
        }
        return payload;
    } catch (e) {
        throw new Error('Logout token validation failed: ' + e.message);
    }
}
