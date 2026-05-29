import type { RequestHandler } from '@sveltejs/kit';
import satori from 'satori';
import { initWasm, Resvg } from '@resvg/resvg-wasm';

let wasmInitialized = false;

export const GET: RequestHandler = async ({ url, fetch }) => {
  if (!wasmInitialized) {
    const wasm = await fetch('/resvg.wasm').then(r => r.arrayBuffer());
    await initWasm(wasm);
    wasmInitialized = true;
  }

  const title = url.searchParams.get('title') ?? 'blog';
  const desc = url.searchParams.get('desc') ?? '';

  const svg = await satori(
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
          {
            type: 'p',
            props: {
              style: { color: '#666', fontSize: 28, fontFamily: 'monospace', margin: 0 },
              children: 'blog.charmanita.dev'
            }
          },
          {
            type: 'p',
            props: {
              style: { color: '#00ff88', fontSize: 60, fontFamily: 'monospace', margin: 0 },
              children: title
            }
          },
          {
            type: 'p',
            props: {
              style: { color: '#ffffff', fontSize: 28, fontFamily: 'monospace', margin: 0 },
              children: desc
            }
          }
        ]
      }
    },
    { width: 1200, height: 630, fonts: [] }
  );

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  return new Response(Buffer.from(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=604800'
    }
  });
};