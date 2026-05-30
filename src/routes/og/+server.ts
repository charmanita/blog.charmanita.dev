import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch, request }) => {
  const title = url.searchParams.get('title') ?? 'blog';
  const desc = url.searchParams.get('desc') ?? '';

  console.log('OG request from:', request.headers.get('user-agent'));

  try {
    const image = await fetch(
      `https://mcapi.charmanita.dev/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(desc)}`,
      { signal: AbortSignal.timeout(5000) }
    );
    console.log('upstream status:', image.status);
    if (!image.ok) throw new Error('upstream failed');
    return new Response(await image.arrayBuffer(), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (e) {
    console.error('OG proxy error:', e);
    return new Response(String(e), { status: 500 });
  }
};