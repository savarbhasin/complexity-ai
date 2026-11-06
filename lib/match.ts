const YOUTUBE_URL_PATTERN =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed|shorts|watch))\??(?:.*v=)?|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const TWEET_URL_PATTERN =
  /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;

/** Returns the YouTube video id for a YouTube URL, or `null` if it isn't one. */
export const getYouTubeVideoId = (url: string): string | null =>
  url.match(YOUTUBE_URL_PATTERN)?.[1] ?? null;

/** Returns the tweet id for a Twitter/X status URL, or `null` if it isn't one. */
export const getTweetId = (url: string): string | null =>
  url.match(TWEET_URL_PATTERN)?.[1] ?? null;
