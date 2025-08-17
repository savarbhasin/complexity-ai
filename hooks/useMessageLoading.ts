'use client';

import { useState, useEffect } from 'react';
import { Message } from '@/types';

export function useMessageLoading(messages: Message[]) {
  const [loadingToolCalls, setLoadingToolCalls] = useState<Set<number>>(new Set());

  useEffect(() => {
    const newLoadingSet = new Set<number>();
    let lastToolCallIndex = -1;

    messages.forEach((message, index) => {
      if (message.type === 'tool_call') {
        newLoadingSet.add(index);
        lastToolCallIndex = index;
      } else if (message.type === 'tool_result' && lastToolCallIndex !== -1) {
        // Mark the most recent tool call as completed
        newLoadingSet.delete(lastToolCallIndex);
        lastToolCallIndex = -1;
      }
    });

    setLoadingToolCalls(newLoadingSet);
  }, [messages]);

  return loadingToolCalls;
}
