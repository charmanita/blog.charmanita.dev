import type { RequestHandler } from '@sveltejs/kit';
import { ImageResponse } from '@vercel/og';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const title = url.searchParams.get('title') ?? 'blog';
    const desc = url.searchParams.get('desc') ?? '';

    const fontData = await fetch(
      'https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2'
    ).then(r => r.arrayBuffer());

    console.log('fontData size:', fontData.byteLength);

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
            { type: 'p', props: { style: { color: '#666', fontSize: 28, margin: 0, fontFamily: 'IBM Plex Mono' }, children: 'blog.charmanita.dev' } },
            { type: 'p', props: { style: { color: '#00ff88', fontSize: 60, margin: 0, fontFamily: 'IBM Plex Mono' }, children: title } },
            { type: 'p', props: { style: { color: '#ffffff', fontSize: 28, margin: 0, fontFamily: 'IBM Plex Mono' }, children: desc } },
          ]
        }
      },
      { width: 1200, height: 630, fonts: [{ name: 'IBM Plex Mono', data: fontData, weight: 400, style: 'normal' }] }
    );
  } catch (e) {
    console.error('OG error:', e);
    return new Response(String(e), { status: 500 });
  }
};