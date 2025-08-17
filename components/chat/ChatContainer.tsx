'use client';

import { useRef, useLayoutEffect } from 'react';
import { Message } from '@/types';
import { MessageBubble } from '@/components/message/MessageBubble';
import { ToolExecution } from '@/components/message/ToolExecution';
import dynamic from 'next/dynamic';
import { useMessageLoading } from '@/hooks/useMessageLoading';

const ToolResult = dynamic(() => import('@/components/message/ToolResult').then(mod => mod.ToolResult), {
  ssr: false,
});

interface ChatContainerProps {
  messages: Message[];
}

export function ChatContainer({ messages }: ChatContainerProps) {
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const loadingToolCalls = useMessageLoading(messages);

  // This effect ensures that when a new user message is added, the container
  // scrolls to position that message at the very top of the visible area.
  useLayoutEffect(() => {
    // Find the index of the last message that is from the user.
    const lastUserMessageIndex = messages.findLastIndex(
      (msg) => msg.role === 'user'
    );

    if (lastUserMessageIndex !== -1) {
      // Find the corresponding DOM element by its ID.
      const messageId = `message-${lastUserMessageIndex}`;
      const element = document.getElementById(messageId);

      if (element) {
        // Scroll the element into view, aligning its top with the container's top.
        // 'auto' makes the scroll instant. Use 'smooth' for a scrolling animation.
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
    // We only want this effect to run when the list of messages changes.
  }, [messages]);

  return (
    <div
      ref={messageContainerRef}
      className="relative flex-1 w-full max-w-4xl mx-auto py-6 px-4 overflow-y-auto no-scrollbar"
    >
      {messages.map((message, index) => {
        // Each message needs a wrapper with a unique ID to be targetable by the scroll effect.
        const messageContent = () => {
          switch (message.type) {
            case 'tool_call':
              return (
                <ToolExecution
                  message={message}
                  isLoading={loadingToolCalls.has(index)}
                />
              );
            case 'content':
            case 'streaming':
              return <MessageBubble message={message} />;
            case 'tool_result':
              return <ToolResult urls={message.urls || []} />;
            case 'error':
              return <MessageBubble message={message} />;
            default:
              return null;
          }
        };

        return (
          <div key={index} id={`message-${index}`}>
            {messageContent()}
          </div>
        );
      })}
    </div>
  );
}