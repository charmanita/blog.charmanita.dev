import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const title = url.searchParams.get('title') ?? 'blog';
  const desc = url.searchParams.get('desc') ?? '';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#080b0f"/>
    <text x="60" y="260" font-family="monospace" font-size="28" fill="#666666">blog.charmanita.dev</text>
    <text x="60" y="340" font-family="monospace" font-size="60" fill="#00ff88">${title}</text>
    <text x="60" y="400" font-family="monospace" font-size="28" fill="#ffffff">${desc}</text>
  </svg>`;

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' }
  });
};