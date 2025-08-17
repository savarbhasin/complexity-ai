# Project Architecture

This document outlines the improved, modular architecture of the complexity.ai chat application.

## 🏗️ Project Structure

```
complexity-ai/
├── app/                     # Next.js App Router
│   ├── api/                 # API routes
│   ├── layout.tsx          # Root layout (server component)
│   └── page.tsx            # Home page (server component)
├── components/
│   ├── chat/               # Chat-specific components
│   │   ├── ChatContainer.tsx    # Message display container
│   │   └── ChatInterface.tsx    # Main chat interface
│   ├── embeds/             # URL embed components
│   │   ├── TwitterEmbed.tsx
│   │   ├── URLGrid.tsx
│   │   └── YoutubeEmbed.tsx
│   ├── message/            # Message-specific components  
│   │   ├── MessageBubble.tsx
│   │   ├── ToolExecution.tsx
│   │   └── ToolResult.tsx
│   ├── ui/                 # Reusable UI components
│   │   ├── ChatInput.tsx
│   │   ├── EmptyState.tsx
│   │   └── LoadingSpinner.tsx
│   ├── ChatInterface.tsx   # Legacy wrapper (backward compatibility)
│   └── Messages.tsx        # Legacy wrapper (backward compatibility)
├── hooks/                  # Custom React hooks
│   ├── useChat.ts          # Chat functionality hook
│   └── useMessageLoading.ts # Message loading state hook
├── lib/                    # Utilities and configuration
│   ├── config.ts           # Application configuration
│   ├── constants.ts        # Tool configurations and constants
│   └── match.ts            # URL matching utilities
├── services/               # Business logic and API calls
│   └── chat.service.ts     # Chat API service
├── types/                  # TypeScript type definitions
│   └── index.ts            # All type definitions
└── .env.local             # Environment variables
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
