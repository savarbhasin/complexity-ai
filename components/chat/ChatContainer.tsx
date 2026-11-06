'use client';

import dynamic from 'next/dynamic';
import { MessageBubble } from '@/components/message/MessageBubble';
import { ToolExecution } from '@/components/message/ToolExecution';
import { useMessageLoading } from '@/hooks/useMessageLoading';
import type { Message } from '@/types';

const ToolResult = dynamic(
  () => import('@/components/message/ToolResult').then(mod => mod.ToolResult),
  { ssr: false },
);

interface ChatContainerProps {
  messages: Message[];
}

export function ChatContainer({ messages }: ChatContainerProps) {
  const loadingToolCalls = useMessageLoading(messages);

  const renderMessage = (message: Message, index: number) => {
    switch (message.type) {
      case 'tool_call':
        return <ToolExecution message={message} isLoading={loadingToolCalls.has(index)} />;
      case 'tool_result':
        return <ToolResult urls={message.urls || []} />;
      case 'content':
      case 'streaming':
      case 'error':
        return <MessageBubble message={message} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex-1 w-full max-w-4xl mx-auto py-6 px-4 overflow-y-auto no-scrollbar">
      {messages.map((message, index) => (
        <div key={index} id={`message-${index}`}>
          {renderMessage(message, index)}
        </div>
      ))}
    </div>
  );
}
