'use client';

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatRequest } from '@/types';
import { chatService } from '@/services/chat.service';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const threadId = uuidv4();

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    setError(null);

    // Add user message
    const userMessage: Message = {
      role: 'user',
      type: 'content',
      content,
      timestamp: new Date().toISOString(),
    };
    
    addMessage(userMessage);

    try {
      const request: ChatRequest = {
        message: content,
        thread_id: threadId,
      };

      const stream = await chatService.streamChat(request);
      if (!stream) throw new Error('No stream received');

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          const data = chatService.parseStreamChunk(line);
          if (data) {
            const assistantMessage: Message = {
              role: 'assistant',
              type: data.type,
              content: data.content,
              tool_call: data.tool_call,
              urls: data.urls,
              error: data.error,
              timestamp: data.timestamp,
            };
            addMessage(assistantMessage);
          }
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      const errorMsg: Message = {
        role: 'assistant',
        type: 'error',
        error: errorMessage,
        timestamp: new Date().toISOString(),
      };
      addMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [threadId, addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}
