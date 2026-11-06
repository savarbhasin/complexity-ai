'use client';

import { useMemo } from 'react';
import type { Message } from '@/types';

/**
 * Returns the indexes of tool calls that are still running, i.e. that have
 * not yet been followed by a tool result.
 */
export function useMessageLoading(messages: Message[]): Set<number> {
  return useMemo(() => {
    const loading = new Set<number>();
    let lastToolCallIndex = -1;

    messages.forEach((message, index) => {
      if (message.type === 'tool_call') {
        loading.add(index);
        lastToolCallIndex = index;
      } else if (message.type === 'tool_result' && lastToolCallIndex !== -1) {
        loading.delete(lastToolCallIndex);
        lastToolCallIndex = -1;
      }
    });

    return loading;
  }, [messages]);
}
