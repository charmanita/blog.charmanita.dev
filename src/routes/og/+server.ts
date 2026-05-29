import type { RequestHandler } from '@sveltejs/kit';
import { ImageResponse } from '@vercel/og';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const title = url.searchParams.get('title') ?? 'blog';
    const desc = url.searchParams.get('desc') ?? '';

    return new ImageResponse(
      {
        type: 'div',
        props: {
          style: {
            background: '#080b0f',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
            gap: '16px',
          },
          children: [
            { type: 'p', props: { style: { color: '#666', fontSize: 28, margin: 0 }, children: 'blog.charmanita.dev' } },
            { type: 'p', props: { style: { color: '#00ff88', fontSize: 60, margin: 0 }, children: title } },
            { type: 'p', props: { style: { color: '#ffffff', fontSize: 28, margin: 0 }, children: desc } },
          ]
        }
      },
      { width: 1200, height: 630 }
    );
  } catch (e) {
    console.error('OG error:', e);
    return new Response(String(e), { status: 500 });
  }
};