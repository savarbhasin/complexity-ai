import { BookIcon, Globe, YoutubeIcon, TwitterIcon } from 'lucide-react';
import { ChatInput } from './ChatInput';

interface EmptyStateProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  onStopGeneration?: () => void;
}

export function EmptyState({ onSendMessage, isLoading, onStopGeneration }: EmptyStateProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl sm:text-4xl font-serif text-white mb-6">
        Go ahead, ask me anything!
      </h1>
      
      <div className="w-full max-w-md md:max-w-2xl">
        <div className="flex items-center justify-center gap-6 mb-6">
          <Globe className="h-5 w-5 text-gray-500" />
          <YoutubeIcon className="h-5 w-5 text-gray-500" />
          <TwitterIcon className="h-5 w-5 text-gray-500" />
          <BookIcon className="h-5 w-5 text-gray-500" />
        </div>
        
        <ChatInput 
          onSendMessage={onSendMessage}
          isLoading={isLoading}
          placeholder="Search for anything..."
          onStopGeneration={onStopGeneration}
        />
      </div>

      <div className="absolute bottom-4 text-xs sm:text-sm text-gray-500">
        <span>© 2025 All rights reserved.</span>
        <span className="ml-4">@savarbhasin</span>
      </div>
    </div>
  );
}
