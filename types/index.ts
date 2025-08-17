export interface Metadata {
  title?: string;
  description?: string;
  image?: string;
  icon?: string;
  provider?: string;
  type?: string;
  videoId?: string;
  tweetId?: string;
}

export interface Message {
  role: "user" | "assistant";
  type: "tool_call" | "error" | "content" | "tool_result" | "streaming";
  tool_call?: string;
  timestamp?: string;
  urls?: string[];
  content?: string;
  error?: string;
  isComplete?: boolean; // For streaming messages
}

export interface ChatResponse {
  type: 'chunk' | 'content' | 'tool_call' | 'tool_result' | 'error';
  content?: string;
  tool_call?: string;
  urls?: string[];
  error?: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  thread_id: string;
}

export type MessageType = Message['type'];
export type StreamingMessageType = 'chunk' | 'content' | 'tool_call' | 'tool_result' | 'error';
export type MessageRole = Message['role'];

export interface ToolConfig {
  icon: any;
  loadingText: string;
  doneText: string;
  color: string;
  bgColor: string;
  borderColor: string;
  loadingBgColor: string;
}

export type ToolName = 
  | 'webscrape' 
  | 'summarize_youtube_video' 
  | 'arxiv_search' 
  | 'get_twitter_posts'
  | 'search_on_any_website'
  | 'retrieve_web_content'
  | 'get_youtube_videos'
  | 'default';
