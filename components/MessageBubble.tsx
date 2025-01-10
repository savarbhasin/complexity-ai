// ToolExecution.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import URLGrid from './URLGrid';



// ToolResult.tsx
export const ToolResult = ({ result }: {result:string}) => {
  const resultData = JSON.parse(result);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
    >
      {resultData.urls ? (
        <URLGrid urls={resultData.urls} />
      ) : (
        <div className="p-4">
          <pre className="text-gray-300 text-sm overflow-x-auto">
            {JSON.stringify(resultData, null, 2)}
          </pre>
        </div>
      )}
    </motion.div>
  );
};

// MessageBubble.tsx
export const MessageBubble = ({ message }: {message:{role:string, content:string}}) => {
    const isUser = message.role == 'User';
    const isAssistant = message.role =='Assistant';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div 
          className={`
            max-w-3xl rounded-2xl px-6 py-4 
            ${isUser 
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 ml-12' 
              : 'bg-gradient-to-r from-gray-800 to-gray-900 mr-12'
            }
          `}
        >
          <div className="text-white">
            {isAssistant ? (
              <Markdown className="markdown">{message.content}</Markdown>
            ) : (
              message.content
            )}
          </div>
        </div>
      </motion.div>
    );
  };