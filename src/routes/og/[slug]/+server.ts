import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, fetch }) => {
  const posts = import.meta.glob('/src/posts/*.md', { eager: true });
  
  const postFile = posts[`/src/posts/${params.slug}.md`] as any;
  const title = postFile?.metadata?.title ?? 'blog';
  const desc = postFile?.metadata?.description ?? '';

  try {
    const image = await fetch(
      `https://mcapi.charmanita.dev/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(desc)}`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!image.ok) throw new Error('upstream failed');
    return new Response(await image.arrayBuffer(), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (e) {
    return new Response(String(e), { status: 500 });
  }
};