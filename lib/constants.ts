import {
  Binary,
  FileText,
  Globe,
  Search,
  SearchIcon,
  Twitter,
  Youtube,
  YoutubeIcon,
} from 'lucide-react';
import type { ToolConfig, ToolName } from '@/types';

/**
 * Tailwind only generates classes it can find as complete literal strings,
 * so each color keeps its full class names here instead of being templated.
 */
const COLOR_THEMES = {
  gray: {
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/20',
    loadingBgColor: 'bg-gray-400/5',
  },
  blue: {
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    loadingBgColor: 'bg-blue-400/5',
  },
  red: {
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/20',
    loadingBgColor: 'bg-red-400/5',
  },
  emerald: {
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/20',
    loadingBgColor: 'bg-emerald-400/5',
  },
  sky: {
    color: 'text-sky-400',
    bgColor: 'bg-sky-400/10',
    borderColor: 'border-sky-400/20',
    loadingBgColor: 'bg-sky-400/5',
  },
  purple: {
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20',
    loadingBgColor: 'bg-purple-400/5',
  },
  orange: {
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/20',
    loadingBgColor: 'bg-orange-400/5',
  },
  yellow: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20',
    loadingBgColor: 'bg-yellow-400/5',
  },
} as const;

type ToolDefinition = Pick<ToolConfig, 'icon' | 'loadingText' | 'doneText'> & {
  theme: keyof typeof COLOR_THEMES;
};

const defineTool = ({ theme, ...rest }: ToolDefinition): ToolConfig => ({
  ...rest,
  ...COLOR_THEMES[theme],
});

export const TOOL_CONFIGS: Record<ToolName, ToolConfig> = {
  webscrape: defineTool({
    icon: Globe,
    loadingText: 'Scraping webpage...',
    doneText: 'Webpage scraped',
    theme: 'blue',
  }),
  summarize_youtube_video: defineTool({
    icon: Youtube,
    loadingText: 'Analyzing video...',
    doneText: 'Video analyzed',
    theme: 'red',
  }),
  arxiv_search: defineTool({
    icon: FileText,
    loadingText: 'Searching papers...',
    doneText: 'Papers found',
    theme: 'emerald',
  }),
  get_twitter_posts: defineTool({
    icon: Twitter,
    loadingText: 'Fetching tweets...',
    doneText: 'Tweets retrieved',
    theme: 'sky',
  }),
  search_on_any_website: defineTool({
    icon: Search,
    loadingText: 'Searching site...',
    doneText: 'Search complete',
    theme: 'purple',
  }),
  retrieve_web_content: defineTool({
    icon: SearchIcon,
    loadingText: 'Searching the internet...',
    doneText: 'Search complete',
    theme: 'orange',
  }),
  get_youtube_videos: defineTool({
    icon: YoutubeIcon,
    loadingText: 'Finding videos..',
    doneText: 'Videos found',
    theme: 'yellow',
  }),
  default: defineTool({
    icon: Binary,
    loadingText: 'Processing...',
    doneText: 'Complete',
    theme: 'gray',
  }),
};

/** Looks up the display config for a tool, falling back to the default. */
export const getToolConfig = (toolName?: string): ToolConfig =>
  TOOL_CONFIGS[toolName as ToolName] ?? TOOL_CONFIGS.default;
