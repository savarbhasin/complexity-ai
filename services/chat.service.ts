import { config } from '@/lib/config';
import { ChatRequest, ChatResponse } from '@/types';

export class ChatService {
  private static instance: ChatService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = config.api.baseUrl;
  }

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  async streamChat(request: ChatRequest, signal?: AbortSignal): Promise<ReadableStream<Uint8Array> | null> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.body;
    } catch (error) {
      console.error('Chat service error:', error);
      throw error;
    }
  }

  parseStreamChunk(line: string): ChatResponse | null {
    if (line.startsWith('data: ')) {
      try {
        return JSON.parse(line.slice(6)) as ChatResponse;
      } catch (error) {
        console.warn('Failed to parse SSE data:', line, error);
        return null;
      }
    }
    return null;
  }
}

export const chatService = ChatService.getInstance();
