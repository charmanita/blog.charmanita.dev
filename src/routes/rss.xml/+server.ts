import type { RequestHandler } from '@sveltejs/kit';
import { getPosts } from '$lib/posts';

export const GET: RequestHandler = async () => {
    const posts = await getPosts();

    const items = posts.map(post => `
  <item>
    <title> New Post: ${post.title}</title>
    <link>https://blog.charmanita.dev/${post.slug}</link>
    <guid>https://blog.charmanita.dev/${post.slug}</guid>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <description>${post.description}</description>
  </item>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>charmanita.dev</title>
    <link>https://blog.charmanita.dev</link>
    <description>Blog description</description>
    <atom:link href="https://blog.charmanita.dev/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=3600'
        }
    });
};