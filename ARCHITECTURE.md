# Project Architecture

This document outlines the improved, modular architecture of the complexity.ai chat application.

## 🏗️ Project Structure

```
complexity-ai/
├── app/
│   ├── api/metadata/route.ts   # Edge route: scrapes title/description/image for a URL
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── chat/                   # ChatInterface (layout) + ChatContainer (message list)
│   ├── embeds/                 # URLGrid -> URLCard -> YouTube/Twitter embeds
│   ├── message/                # MessageBubble, ToolExecution, ToolResult
│   └── ui/                     # ChatInput, EmptyState, loading indicators
├── hooks/
│   ├── useStreamingChat.ts     # Transcript state + streaming lifecycle
│   ├── useMessageLoading.ts    # Which tool calls are still running
│   └── useUrlMetadata.ts       # Resolves preview metadata for a URL
├── lib/
│   ├── config.ts               # Environment-driven configuration
│   ├── constants.ts            # Tool display configs (icons, colors, text)
│   └── match.ts                # YouTube / Twitter URL matching
├── services/chat.service.ts    # streamChat(): SSE request -> async stream of events
└── types/index.ts              # Shared TypeScript types
```

## 🎯 Key Improvements

### 1. **Separation of Concerns**
- **Hooks**: Business logic and state management
- **Services**: API calls and data fetching  
- **Components**: UI rendering only
- **Types**: Centralized type definitions

### 2. **Client/Server Optimization**
- Only components that need interactivity use `'use client'`
- Server components for layout and static content
- Hooks properly marked with `'use client'`

### 3. **Modularity**
- Reusable UI components in `/components/ui/`
- Domain-specific components organized by feature
- Custom hooks for shared functionality
- Service layer for API abstraction

### 4. **Type Safety**
- Comprehensive TypeScript interfaces
- API request/response types
- Component prop types
- Tool configuration types

### 5. **Environment Configuration**
- Configurable API endpoints
- Environment-specific settings
- Centralized configuration management

## 🔧 Core Components

### Chat System

**`useChat` Hook**
```typescript
const { messages, isLoading, sendMessage, clearMessages } = useChat();
```
- Manages chat state and API interactions
- Handles streaming responses
- Error handling and loading states

**`ChatInterface`**
- Main chat interface component
- Uses composition pattern with smaller components
- Proper state management through hooks

**`ChatContainer`**
- Message display container
- Auto-scrolling functionality
- Message type routing

### UI Components

**`ChatInput`**
- Reusable input component
- Form handling and validation
- Keyboard shortcuts support

**`EmptyState`**
- Welcome screen with feature icons
- Integrated input for first message
- Responsive design

### Services

**`ChatService`**
- Singleton pattern for API calls
- Stream handling
- Error management
- Response parsing

## 🚀 Usage Examples

### Basic Chat Implementation
```typescript
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage() {
  return <ChatInterface />;
}
```

### Custom Chat with Hooks
```typescript
import { useChat } from '@/hooks/useChat';
import { ChatInput } from '@/components/ui/ChatInput';

export function CustomChat() {
  const { messages, sendMessage, isLoading } = useChat();
  
  return (
    <div>
      {messages.map(message => (
        <div key={message.timestamp}>{message.content}</div>
      ))}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
}
```

## 🔄 Migration Notes

- **Legacy Components**: Old components are preserved as wrappers for backward compatibility
- **Import Paths**: Updated to use the new modular structure
- **Types**: Moved from `/lib/types.ts` to `/types/index.ts`
- **Environment**: API URL now configurable via `.env.local`

## 🏃‍♂️ Development

### Adding New Tools
1. Add tool configuration to `/lib/constants.ts`
2. Update `ToolName` type in `/types/index.ts`
3. Add icon and styling in `TOOL_CONFIGS`

### Creating New Components
1. Use appropriate directory (`/ui/` for reusable, `/chat/` for domain-specific)
2. Import types from `/types`
3. Use `'use client'` only when necessary
4. Follow composition over inheritance pattern

### API Changes
1. Update service methods in `/services/chat.service.ts`
2. Update types in `/types/index.ts`
3. Update configuration in `/lib/config.ts`

This architecture provides a solid foundation for scalability, maintainability, and developer experience.
