'use client';

import { useCallback, useRef, useState } from 'react';
import { streamChat } from '@/services/chat.service';
import type { ChatResponse, Message } from '@/types';

const now = () => new Date().toISOString();

/** Manages the chat transcript and the lifecycle of one streaming request. */
export function useStreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const threadId = useRef(crypto.randomUUID()).current;
  const abortControllerRef = useRef<AbortController | null>(null);
  /** True while the last message is an assistant message still being streamed. */
  const isStreamingRef = useRef(false);

  const addMessage = useCallback((message: Message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const updateLastMessage = useCallback((updater: (msg: Message) => Message) => {
    setMessages(prev => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      next[next.length - 1] = updater(next[next.length - 1]);
      return next;
    });
  }, []);

  /** Finalizes the in-progress streaming message, if there is one. */
  const completeStreamingMessage = useCallback(
    (finalContent?: string, timestamp?: string) => {
      if (!isStreamingRef.current) return;
      isStreamingRef.current = false;
      updateLastMessage(msg => ({
        ...msg,
        type: 'content',
        content: finalContent || msg.content,
        isComplete: true,
        ...(timestamp && { timestamp }),
      }));
    },
    [updateLastMessage],
  );

  const handleChunk = useCallback(
    ({ content, timestamp }: ChatResponse) => {
      if (!content) return;

      if (isStreamingRef.current) {
        updateLastMessage(msg => ({
          ...msg,
          content: (msg.content || '') + content,
          timestamp,
        }));
      } else {
        isStreamingRef.current = true;
        addMessage({
          role: 'assistant',
          type: 'streaming',
          content,
          timestamp,
          isComplete: false,
        });
      }
    },
    [addMessage, updateLastMessage],
  );

  const handleContent = useCallback(
    ({ content, timestamp }: ChatResponse) => {
      if (isStreamingRef.current) {
        completeStreamingMessage(content, timestamp);
      } else {
        addMessage({ role: 'assistant', type: 'content', content, timestamp, isComplete: true });
      }
    },
    [addMessage, completeStreamingMessage],
  );

  const handleError = useCallback(
    ({ error: errorText, timestamp }: ChatResponse) => {
      addMessage({ role: 'assistant', type: 'error', error: errorText, timestamp });
      setError(errorText || 'An error occurred');
      isStreamingRef.current = false;
    },
    [addMessage],
  );

  const handleEvent = useCallback(
    (event: ChatResponse) => {
      switch (event.type) {
        case 'chunk':
          return handleChunk(event);
        case 'content':
          return handleContent(event);
        case 'tool_call':
          return addMessage({
            role: 'assistant',
            type: 'tool_call',
            tool_call: event.tool_call,
            timestamp: event.timestamp,
          });
        case 'tool_result':
          return addMessage({
            role: 'assistant',
            type: 'tool_result',
            urls: event.urls,
            timestamp: event.timestamp,
          });
        case 'error':
          return handleError(event);
        default:
          console.warn('Unknown message type:', (event as ChatResponse).type);
      }
    },
    [addMessage, handleChunk, handleContent, handleError],
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      setIsLoading(true);
      setError(null);
      isStreamingRef.current = false;

      const controller = new AbortController();
      abortControllerRef.current = controller;

      addMessage({ role: 'user', type: 'content', content, timestamp: now(), isComplete: true });

      try {
        const events = streamChat({ message: content, thread_id: threadId }, controller.signal);
        for await (const event of events) {
          handleEvent(event);
        }
      } catch (err) {
        handleError({
          type: 'error',
          error: err instanceof Error ? err.message : 'An error occurred',
          timestamp: now(),
        });
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
        completeStreamingMessage();
      }
    },
    [threadId, addMessage, handleEvent, handleError, completeStreamingMessage],
  );

  const stopGeneration = useCallback(() => {
    if (!abortControllerRef.current) return;

    abortControllerRef.current.abort();
    abortControllerRef.current = null;
    setIsLoading(false);
    completeStreamingMessage();
  }, [completeStreamingMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    isStreamingRef.current = false;
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages, stopGeneration };
}
