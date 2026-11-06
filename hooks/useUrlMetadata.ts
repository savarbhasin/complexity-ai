'use client';

import { useEffect, useState } from 'react';
import { getTweetId, getYouTubeVideoId } from '@/lib/match';
import type { Metadata } from '@/types';

/** Resolves display metadata for a URL: YouTube/Twitter ids locally, everything else via the API. */
async function resolveMetadata(url: string): Promise<Metadata> {
  const videoId = getYouTubeVideoId(url);
  if (videoId) return { type: 'youtube', videoId };

  const tweetId = getTweetId(url);
  if (tweetId) return { type: 'twitter', tweetId };

  const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
  if (!response.ok) throw new Error('Failed to fetch metadata');
  return { ...(await response.json()), type: 'default' };
}

export function useUrlMetadata(url: string) {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    resolveMetadata(url)
      .then(data => !cancelled && setMetadata(data))
      .catch(err => !cancelled && setError(err instanceof Error ? err.message : String(err)))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { metadata, loading, error };
}
