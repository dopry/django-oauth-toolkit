// SSE endpoint for logout events
import { addClient, removeClient } from '../sseClients.js';




export async function GET({ url }) {
    console.log('SSE /api/logout-events GET called with url:', url.toString());
    // Get sid from query param (e.g., /api/logout-events?sid=123)
    const sid = url.searchParams.get('sid');
    if (!sid) {
        return new Response('Missing sid', { status: 400 });
    }

    const stream = new ReadableStream({
        start(controller) {
            const encoder = new TextEncoder();
            // Create a fake response object for our in-memory store
            const res = {
                write: (data) => {
                    try {
                        controller.enqueue(encoder.encode(data));
                    } catch (err) {
                        // Remove client if writing fails
                        removeClient(sid, res);
                        throw err;
                    }
                },
                close: () => controller.close()
            };
            addClient(sid, res);
            // Remove client on stream close
            controller.signal?.addEventListener('abort', () => {
                removeClient(sid, res);
            });
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    });
}
