import { parse, type HTMLElement } from 'node-html-parser';
import type { Metadata } from '@/types';

export const runtime = 'edge';

const BROWSER_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/** Reads `<meta name="x">`, falling back to `<meta property="og:x">`. */
function getMetaTag(doc: HTMLElement, name: string): string | null {
  const el =
    doc.querySelector(`meta[name="${name}"]`) ||
    doc.querySelector(`meta[property="og:${name}"]`);
  return el?.getAttribute('content') ?? null;
}

function extractMetadata(html: string): Metadata {
  const doc = parse(html);

  return {
    title: doc.querySelector('title')?.text || getMetaTag(doc, 'title') || undefined,
    description: getMetaTag(doc, 'description') ?? undefined,
    image: getMetaTag(doc, 'image') ?? undefined,
    icon:
      doc.querySelector('link[rel="icon"]')?.getAttribute('href') ||
      doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') ||
      undefined,
    provider: getMetaTag(doc, 'site_name') ?? undefined,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get('url');

  if (!url) {
    return jsonResponse({ error: 'Missing URL parameter' }, 400);
  }

  try {
    const response = await fetch(url, { headers: { 'User-Agent': BROWSER_USER_AGENT } });
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    return jsonResponse(extractMetadata(await response.text()));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return jsonResponse({ error: `Failed to fetch metadata: ${message}` }, 500);
  }
}
