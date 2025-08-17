import { parse } from 'node-html-parser';

export const runtime = 'edge';

function getMetaTag(doc: any, name: string) {
  const el = doc.querySelector(`meta[name="${name}"]`) || doc.querySelector(`meta[property="og:${name}"]`);
  return el ? el.getAttribute('content') : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'Missing URL parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    const doc = parse(html);

    const metadata = {
      title: doc.querySelector('title')?.text || getMetaTag(doc, 'title'),
      description: getMetaTag(doc, 'description'),
      image: getMetaTag(doc, 'image'),
      icon: doc.querySelector('link[rel="icon"]')?.getAttribute('href') || doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href'),
      provider: getMetaTag(doc, 'site_name'),
    };

    return new Response(JSON.stringify(metadata), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: `Failed to fetch metadata: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}