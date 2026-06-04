
export default {
async fetch(request: { method: string; }, env: Env) {
        // Verification it's a POST from Cloudflare
        if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

        // Fetch latest RSS post
        const rss = await fetch('https://blog.charmanita.dev/rss.xml');
        const text = await rss.text();

        // Parse the first item
        const titleMatch = text.match(/<item>[\s\S]*?<title>(.*?)<\/title>/);
        const linkMatch = text.match(/<item>[\s\S]*?<link>(.*?)<\/link>/);
        const descMatch = text.match(/<item>[\s\S]*?<description>(.*?)<\/description>/);
    
        if (!titleMatch || !linkMatch) return new Response('Could not parse RSS', { status: 500 });

        const title = titleMatch[1];
        const link = linkMatch[1];
        const description = descMatch ? descMatch[1] : '';

        // Send campaign via Brevo
        const res = await fetch('https://api.brevo.com/v3/emailCampaigns', {
            method: 'POST',
            headers: {
                'api-key': env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `Blog post: ${title}`,
                subject: title,
                sender: { name: 'noreply', email: 'noreply@charmanita.dev' },
                type: 'classic',
                htmlContent: `
                    <h1>${title}</h1>
                    <p>${description}</p>
                    <a href="${link}">Read more</a>
                    <hr>
                    <p style="font-size: 12px; color: #888;">
                        This is a no-reply email. To unsubscribe, reply with "unsubscribe" in the subject line.
                    </p>
                    <a href="{{ unsubscribe }}" style="font-size: 12px; color: #888;">Unsubscribe</a>
                `,
                recipients: { listIds: [Number(env.BREVO_LIST_ID)] },
                scheduledAt: new Date(Date.now() + 60000).toISOString() // send in 1 min
            })
        });

        if (!res.ok) {
            const body = await res.json();
            console.log(body);
            return new Response('Failed to create campaign', { status: 500 });
        }

        return new Response('Campaign scheduled', { status: 200 });
    }
}

interface Env {
    BREVO_API_KEY: string;
    BREVO_LIST_ID: string;
}