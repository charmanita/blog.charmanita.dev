import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
  const title = url.searchParams.get('title') ?? 'blog';
  const desc = url.searchParams.get('desc') ?? '';

  try {
    const image = await fetch(
      `https://mcapi.charmanita.dev/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(desc)}`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!image.ok) throw new Error('upstream failed');
    return new Response(await image.arrayBuffer(), {
      headers: { 'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800',
        'Content-Length': image.headers.get('content-length') ?? '',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch {
    // fallback to static image
    const fallback = await fetch('/images/og.png');
    return new Response(await fallback.arrayBuffer(), {
      headers: { 'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800',
        'Access-Control-Allow-Origin': '*'
       }
    });
  }
};