import { 
  Globe, 
  Youtube, 
  FileText, 
  Twitter, 
  Search,
  Binary,
  SearchIcon,
  YoutubeIcon,
} from 'lucide-react';
import { ToolConfig, ToolName } from '@/types';

export const TOOL_CONFIGS: Record<ToolName, ToolConfig> = {
  webscrape: {
    icon: Globe,
    loadingText: 'Scraping webpage...',
    doneText: 'Webpage scraped',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    loadingBgColor: 'bg-blue-400/5'
  },
  summarize_youtube_video: {
    icon: Youtube,
    loadingText: 'Analyzing video...',
    doneText: 'Video analyzed',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/20',
    loadingBgColor: 'bg-red-400/5'
  },
  arxiv_search: {
    icon: FileText,
    loadingText: 'Searching papers...',
    doneText: 'Papers found',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/20',
    loadingBgColor: 'bg-emerald-400/5'
  },
  get_twitter_posts: {
    icon: Twitter,
    loadingText: 'Fetching tweets...',
    doneText: 'Tweets retrieved',
    color: 'text-sky-400',
    bgColor: 'bg-sky-400/10',
    borderColor: 'border-sky-400/20',
    loadingBgColor: 'bg-sky-400/5'
  },
  search_on_any_website: {
    icon: Search,
    loadingText: 'Searching site...',
    doneText: 'Search complete',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20',
    loadingBgColor: 'bg-purple-400/5'
  },
  retrieve_web_content: {
    icon: SearchIcon,
    loadingText: 'Searching the internet...',
    doneText: 'Search complete',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/20',
    loadingBgColor: 'bg-orange-400/5'
  },
  get_youtube_videos: {
    icon: YoutubeIcon,
    loadingText: 'Finding videos..',
    doneText: 'Videos found',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20',
    loadingBgColor: 'bg-yellow-400/5'
  },
  default: {
    icon: Binary,
    loadingText: 'Processing...',
    doneText: 'Complete',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/20',
    loadingBgColor: 'bg-gray-400/5'
  }
};
