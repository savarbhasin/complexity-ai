'use client';

import { motion } from 'framer-motion';

interface StreamingIndicatorProps {
  className?: string;
}

export function StreamingIndicator({ className = '' }: StreamingIndicatorProps) {
  return (
    <motion.div
      className={`inline-flex items-center space-x-1 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1 h-1 bg-emerald-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

export function TypingCursor({ className = '' }: { className?: string }) {
  return (
    <motion.span
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.2, repeat: Infinity }}
      className={`inline-block w-0.5 h-5 bg-emerald-400 ${className}`}
    />
  );
}
