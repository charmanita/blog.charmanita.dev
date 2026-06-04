import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { BREVO_API_KEY, BREVO_LIST_ID } from '$env/static/private';
export const POST: RequestHandler = async ({ request }) => {
    const { email } = await request.json();

    if (!email) return json({ error: 'Email required' }, { status: 400 });

    const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
            'api-key': BREVO_API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            listIds: [Number(BREVO_LIST_ID)],
            updateEnabled: true
        })
    });
    const body = res.ok ? null : await res.json();
    if (!res.ok) {
        console.log(body);
        return json({ error: 'Failed to subscribe' }, { status: 500 });
    }
    return json({ success: true });
};