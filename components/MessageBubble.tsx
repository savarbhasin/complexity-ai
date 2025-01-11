import React from 'react';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';


export const MessageBubble = ({ message }: any) => {
  const isAssistant = message.role === 'assistant';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex mb-4`}
    >
      <div 
        className={`font-serif ${
          !isAssistant ? 'text-emerald-300 md:text-2xl text-[1.25rem]  ml-auto' : ''
        }`}
      >
        {isAssistant ? (
          <Markdown className="markdown font-serif md:text-[1.25rem] text-[0.9rem] text-white">{message.content}</Markdown>
        ) : (
         message.content
        )}
      </div>
    </motion.div>
  );
};