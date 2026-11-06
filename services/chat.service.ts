import { config } from '@/lib/config';
import type { ChatRequest, ChatResponse } from '@/types';

const SSE_DATA_PREFIX = 'data: ';

/** Parses one SSE line (`data: {...}`) into a chat event, or `null` if it isn't one. */
export function parseStreamLine(line: string): ChatResponse | null {
  if (!line.startsWith(SSE_DATA_PREFIX)) return null;

  try {
    return JSON.parse(line.slice(SSE_DATA_PREFIX.length)) as ChatResponse;
  } catch (error) {
    console.warn('Failed to parse SSE data:', line, error);
    return null;
  }
}

/** Opens the streaming chat endpoint and returns the raw response body. */
async function openChatStream(
  request: ChatRequest,
  signal?: AbortSignal,
): Promise<ReadableStream<Uint8Array>> {
  const response = await fetch(`${config.api.baseUrl}/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  if (!response.body) {
    throw new Error('No stream received');
  }

  return response.body;
}

/**
 * Sends a chat request and yields each server-sent event as it arrives.
 * Lines split across network chunks are buffered until complete.
 */
export async function* streamChat(
  request: ChatRequest,
  signal?: AbortSignal,
): AsyncGenerator<ChatResponse> {
  const reader = (await openChatStream(request, signal)).getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      const event = parseStreamLine(line);
      if (event) yield event;
    }
  }

  const trailing = parseStreamLine(buffer);
  if (trailing) yield trailing;
}
