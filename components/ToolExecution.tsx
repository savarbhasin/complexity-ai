import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Youtube, 
  FileText, 
  Twitter, 
  Search,
  Loader2,
  CheckCircle2,
  Binary,
  Newspaper,
  SearchIcon,
  YoutubeIcon,
} from 'lucide-react';

type ToolMessage = {
  name: keyof typeof toolConfigs;
};

type ToolExecutionProps = {
  message: ToolMessage;
  isLoading: boolean;
};

const toolConfigs = {
  webscrape: {
    icon: Globe,
    loadingText: 'Scraping webpage...',
    doneText: 'Webpage scraped',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20',
    loadingBg: 'bg-blue-400/5'
  },
  summarize_youtube_video: {
    icon: Youtube,
    loadingText: 'Analyzing video...',
    doneText: 'Video analyzed',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/20',
    loadingBg: 'bg-red-400/5'
  },
  arxiv_search: {
    icon: FileText,
    loadingText: 'Searching papers...',
    doneText: 'Papers found',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/20',
    loadingBg: 'bg-emerald-400/5'
  },
  get_twitter_posts: {
    icon: Twitter,
    loadingText: 'Fetching tweets...',
    doneText: 'Tweets retrieved',
    color: 'text-sky-400',
    bgColor: 'bg-sky-400/10',
    borderColor: 'border-sky-400/20',
    loadingBg: 'bg-sky-400/5'
  },
  search_on_any_website: {
    icon: Search,
    loadingText: 'Searching site...',
    doneText: 'Search complete',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/20',
    loadingBg: 'bg-purple-400/5'
  },
  retrieve_web_content: {
    icon: SearchIcon,
    loadingText: 'Searching the internet...',
    doneText: 'Search complete',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/20',
    loadingBg: 'bg-orange-400/5'
  },
  get_youtube_videos: {
    icon: YoutubeIcon,
    loadingText: 'Finding videos..',
    doneText: 'Videos found',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    borderColor: 'border-yellow-400/20',
  },
  default: {
    icon: Binary,
    loadingText: 'Processing...',
    doneText: 'Complete',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    borderColor: 'border-gray-400/20',
    loadingBg: 'bg-gray-400/5'
  }
};

const LoadingSpinner = ({ color }: { color: string }) => (
  <motion.div 
    className={`flex items-center justify-center ${color}`}
    animate={{ rotate: 360 }}
    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
  >
    <Loader2 className="h-5 w-5" />
  </motion.div>
);

const LoadingPulse = ({ color }: { color: string }) => (
  <motion.div
    className={`h-2 w-2 rounded-full ${color}`}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [1, 0.5, 1]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

export const ToolExecution = ({ message, isLoading }: any) => {
    //@ts-ignore
  const config = toolConfigs[message.name] || toolConfigs.default;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-lg border ${config.borderColor} ${config.bgColor}`}
    >
      {/* Background loading bar */}
      {isLoading && (
        <motion.div
          className={`absolute bottom-0 left-0 h-[2px] ${config.loadingBg}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="flex items-center p-4 space-x-4">
        {/* Icon with platform-specific animation */}
        <motion.div
          animate={isLoading ? {
            scale: [1, 1.1, 1],
            rotate: message.name === 'webscrape' ? [0, 360] : 0
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={`p-2 rounded-lg ${config.bgColor}`}
        >
          <Icon className={`h-6 w-6 ${config.color}`} />
        </motion.div>

        {/* Text content */}
        <div className="flex-1">
          <motion.span 
            className={`text-sm font-medium ${config.color}`}
            animate={isLoading ? { opacity: [1, 0.7, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isLoading ? config.loadingText : config.doneText}
          </motion.span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <>
              <LoadingPulse color={config.color} />
              <LoadingPulse color={config.color} />
              <LoadingPulse color={config.color} />
            </>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={config.color}
            >
              <CheckCircle2 className="h-5 w-5" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Particle effects for specific tools */}
      {isLoading && message.name === 'arxiv_search' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent" />
        </motion.div>
      )}
    </motion.div>
  );
};