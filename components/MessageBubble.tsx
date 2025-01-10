// ToolExecution.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const ToolExecution = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center space-x-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700"
    >
      <Loader2 className="h-4 w-4 text-emerald-500 animate-spin" />
      <span className="text-gray-300 text-sm">
        Executing: <span className="text-emerald-400 font-medium">{message.name}</span>
      </span>
    </motion.div>
  );
};

// ToolResult.tsx
export const ToolResult = ({ result }) => {
  const resultData = JSON.parse(result);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
    >
      {resultData.urls ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {resultData.urls.map((url:string, idx:number) => (
            <div 
              key={idx}
              className="p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <h3 className="text-emerald-400 font-medium mb-2 truncate">{url.title || 'URL Result'}</h3>
              <p className="text-gray-400 text-sm truncate">{url.url}</p>
            </div>
          ))}
        </div>
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
export const MessageBubble = ({ message }: {message: {role: 'User' | 'Assistant', content:string }}) => {
  const isUser = message.role === 'User';
  const isAssistant = message.role === 'Assistant';
  
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
        <div className="text-white">{message.content}</div>
      </div>
    </motion.div>
  );
};