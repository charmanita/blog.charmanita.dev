import type { RequestHandler } from '@sveltejs/kit';
import satori from 'satori';
import { initWasm, Resvg } from '@resvg/resvg-wasm';
import { readFileSync } from 'node:fs';
import { resolve} from 'node:path';

const fontData = readFileSync(resolve('src/lib/IBMPlexMono-Regular.ttf'));
let wasmInitialized = false;

export const GET: RequestHandler = async ({ url, fetch }) => {
  try {
    if (!wasmInitialized) {
    try {
        const wasmRes = await fetch('/resvg.wasm');
        console.log('wasm status:', wasmRes.status, wasmRes.headers.get('content-type'));
        const wasm = await wasmRes.arrayBuffer();
        await initWasm(wasm);
    } catch {
        // already initialized, ignore
    }
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
              style: { color: '#666', fontSize: 28, fontFamily: 'IBM Plex Mono', margin: 0 },
              children: 'blog.charmanita.dev'
            }
          },
          {
            type: 'p',
            props: {
              style: { color: '#00ff88', fontSize: 60, fontFamily: 'IBM Plex Mono', margin: 0 },
              children: title
            }
          },
          {
            type: 'p',
            props: {
              style: { color: '#ffffff', fontSize: 28, fontFamily: 'IBM Plex Mono', margin: 0 },
              children: desc
            }
          }
        ]
      }
    },
    { width: 1200, height: 630, fonts: [
        {
            name: 'IBM Plex Mono',
            data: fontData,
            weight: 400,
            style: 'normal'
        }
    ] }
  );

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  return new Response(Buffer.from(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=604800'
    }
  });
} catch (e) {
    console.error(e);
    return new Response(String(e), { status: 500 });
}
};