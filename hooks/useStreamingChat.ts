'use client';

import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatRequest, ChatResponse } from '@/types';
import { chatService } from '@/services/chat.service';

export function useStreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const threadId = useRef(uuidv4()).current;

  // Track current streaming message
  const streamingMessageRef = useRef<Message | null>(null);
  
  // Track abort controller for stopping generation
  const abortControllerRef = useRef<AbortController | null>(null);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const updateLastMessage = useCallback((updater: (msg: Message) => Message) => {
    setMessages(prev => {
      if (prev.length === 0) return prev;
      const newMessages = [...prev];
      newMessages[newMessages.length - 1] = updater(newMessages[newMessages.length - 1]);
      return newMessages;
    });
  }, []);

  const handleStreamingChunk = useCallback((data: ChatResponse) => {
    if (!data.content) return;

    if (!streamingMessageRef.current) {
      // Create new streaming message
      const newMessage: Message = {
        role: 'assistant',
        type: 'streaming',
        content: data.content,
        timestamp: data.timestamp,
        isComplete: false,
      };
      streamingMessageRef.current = newMessage;
      addMessage(newMessage);
    } else {
      // Append to existing streaming message
      updateLastMessage(msg => ({
        ...msg,
        content: (msg.content || '') + data.content,
        timestamp: data.timestamp,
      }));
      streamingMessageRef.current.content = (streamingMessageRef.current.content || '') + data.content;
    }
  }, [addMessage, updateLastMessage]);

  const handleCompleteContent = useCallback((data: ChatResponse) => {
    if (streamingMessageRef.current) {
      // Mark streaming message as complete
      updateLastMessage(msg => ({
        ...msg,
        type: 'content',
        content: data.content || msg.content,
        isComplete: true,
        timestamp: data.timestamp,
      }));
      streamingMessageRef.current = null;
    } else {
      // Add complete message directly
      const completeMessage: Message = {
        role: 'assistant',
        type: 'content',
        content: data.content,
        timestamp: data.timestamp,
        isComplete: true,
      };
      addMessage(completeMessage);
    }
  }, [addMessage, updateLastMessage]);

  const handleToolCall = useCallback((data: ChatResponse) => {
    const toolMessage: Message = {
      role: 'assistant',
      type: 'tool_call',
      tool_call: data.tool_call,
      timestamp: data.timestamp,
    };
    addMessage(toolMessage);
  }, [addMessage]);

  const handleToolResult = useCallback((data: ChatResponse) => {
    const resultMessage: Message = {
      role: 'assistant',
      type: 'tool_result',
      urls: data.urls,
      timestamp: data.timestamp,
    };
    addMessage(resultMessage);
  }, [addMessage]);

  const handleError = useCallback((data: ChatResponse) => {
    const errorMessage: Message = {
      role: 'assistant',
      type: 'error',
      error: data.error,
      timestamp: data.timestamp,
    };
    addMessage(errorMessage);
    setError(data.error || 'An error occurred');
    
    // Clear streaming message on error
    streamingMessageRef.current = null;
  }, [addMessage]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setIsLoading(true);
    setError(null);
    streamingMessageRef.current = null; // Reset streaming state
    
    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();

    // Add user message
    const userMessage: Message = {
      role: 'user',
      type: 'content',
      content,
      timestamp: new Date().toISOString(),
      isComplete: true,
    };
    
    addMessage(userMessage);

    try {
      const request: ChatRequest = {
        message: content,
        thread_id: threadId,
      };

      const stream = await chatService.streamChat(request, abortControllerRef.current?.signal);
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
            switch (data.type) {
              case 'chunk':
                handleStreamingChunk(data);
                break;
              case 'content':
                handleCompleteContent(data);
                break;
              case 'tool_call':
                handleToolCall(data);
                break;
              case 'tool_result':
                handleToolResult(data);
                break;
              case 'error':
                handleError(data);
                break;
              default:
                console.warn('Unknown message type:', data.type);
            }
          }
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      handleError({ 
        type: 'error', 
        error: errorMessage, 
        timestamp: new Date().toISOString() 
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
      // Mark final streaming message as complete if it exists
      if (streamingMessageRef.current) {
        updateLastMessage(msg => ({
          ...msg,
          type: 'content',
          isComplete: true,
        }));
        streamingMessageRef.current = null;
      }
    }
  }, [threadId, addMessage, handleStreamingChunk, handleCompleteContent, handleToolCall, handleToolResult, handleError, updateLastMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    streamingMessageRef.current = null;
  }, []);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      
      // Mark current streaming message as complete if it exists
      if (streamingMessageRef.current) {
        updateLastMessage(msg => ({
          ...msg,
          type: 'content',
          isComplete: true,
        }));
        streamingMessageRef.current = null;
      }
    }
  }, [updateLastMessage]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    stopGeneration,
  };
}
