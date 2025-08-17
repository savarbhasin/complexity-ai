'use client';

import { useStreamingChat } from '@/hooks/useStreamingChat';
import { EmptyState } from '@/components/ui/EmptyState';
import { ChatContainer } from './ChatContainer';
import { ChatInput } from '@/components/ui/ChatInput';
import { useRef } from 'react';

export function ChatInterface() {
  const { messages, isLoading, sendMessage, stopGeneration } = useStreamingChat();
  const hasMessages = messages.length > 0;

  return (
    <div className="flex md:w-[45rem] w-[95%] flex-col h-dvh text-white">
      {!hasMessages ? (
        <EmptyState onSendMessage={sendMessage} isLoading={isLoading} onStopGeneration={stopGeneration} />
      ) : (
        <div className="flex flex-col h-full w-full">
          <ChatContainer messages={messages} />
          
          {/* Input Area */}
          <div className="p-4 border-t border-gray-800/50">
            <ChatInput 
              onSendMessage={sendMessage}
              isLoading={isLoading}
              placeholder="Ask a new question..."
              onStopGeneration={stopGeneration}
            />
          </div>
        </div>
      )}
    </div>
  );
}
