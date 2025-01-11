import React, { useEffect, useState } from 'react';
import { Globe, Clock, Video, Twitter } from 'lucide-react';
import { TwitterEmbed } from './TwitterEmbed';
import { YouTubeEmbed } from './YoutubeEmbed';
import { getTweetId, getYouTubeVideoId } from '@/lib/match';







const URLCard = ({ url }: { url: string }) => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        // Check for YouTube or Twitter URLs first
        const youtubeId = getYouTubeVideoId(url);
        const tweetId = getTweetId(url);
        
        if (youtubeId) {
          setMetadata({ type: 'youtube', videoId: youtubeId });
          setLoading(false);
          return;
        }
        
        if (tweetId) {
          setMetadata({ type: 'twitter', tweetId: tweetId });
          setLoading(false);
          return;
        }

        // For other URLs, fetch metadata as usual
        const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
        if (!response.ok) throw new Error('Failed to fetch metadata');
        const data = await response.json();
        setMetadata({ ...data, type: 'default' });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  if (loading) {
    return (
      <div className="w-full md:w-48 h-[200px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg border border-gray-700 m-2 animate-pulse">
        <div className="h-24 bg-gray-700 rounded-t-xl" />
        <div className="p-2">
          <div className="h-2 bg-gray-700 rounded mb-1" />
          <div className="h-2 bg-gray-700 rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (metadata?.type === 'youtube' && metadata.videoId) {
    return <YouTubeEmbed videoId={metadata.videoId} />;
  }

  if (metadata?.type === 'twitter' && metadata.tweetId) {
    return <TwitterEmbed tweetId={metadata.tweetId} />;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-0.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
    >
      <div className="w-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-700 m-2 ml-0">
        <div className="relative">
          {metadata?.image ? (
            <img
              src={metadata.image}
              alt={metadata.title || 'Website preview'}
              className="w-full h-24 object-cover"
              onError={(e) => {
                e.currentTarget.src = '/api/placeholder/400/320';
              }}
            />
          ) : (
            <div className="w-full h-24 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              {metadata?.icon ? (
                <img
                  src={metadata.icon}
                  alt="Site icon"
                  className="w-6 h-6"
                  onError={(e) => {
                    e.currentTarget.remove();
                  }}
                />
              ) : (
                <Globe className="w-6 h-6 text-gray-500" />
              )}
            </div>
          )}

          <div className="absolute top-1 left-1 bg-gray-800/90 backdrop-blur-sm rounded-full px-1 py-0.5 flex items-center gap-1">
            <Globe className="w-2 h-2 text-gray-400" />
            <span className="text-xs font-medium text-gray-300">
              {new URL(url).hostname}
            </span>
          </div>
        </div>

        <div className="p-2">
          <div className="mb-1">
            <h3 className="text-xs font-semibold text-gray-200 mb-0.5 line-clamp-1">
              {metadata?.title || url}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-1">
              {metadata?.description || 'No description available'}
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-gray-700">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              {metadata?.provider ? (
                <span>{metadata.provider}</span>
              ) : (
                <>
                  <Clock className="w-2 h-2" />
                  <span>Added recently</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

const URLGrid = ({ urls }: { urls: string[] }) => {
  if (!urls || urls.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-2">
      <div className="flex rounded-xl overflow-x-scroll max-w-full no-scrollbar">
        {urls.map((url, index) => (
          <URLCard key={index} url={url} />
        ))}
      </div>
    </div>
  );
};

export default URLGrid;