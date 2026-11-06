import { motion } from 'framer-motion';
import Markdown from 'react-markdown';
import type { Message } from '@/types';

export const MessageBubble = ({ message }: { message: Message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex mb-6"
    >
      <div className={`font-serif max-w-none ${isAssistant ? 'text-white' : 'text-emerald-300 ml-auto'}`}>
        {isAssistant ? (
          <Markdown className="markdown font-serif leading-relaxed">
            {message.content || ''}
          </Markdown>
        ) : (
          message.content
        )}
      </div>
    </motion.div>
  );
};
