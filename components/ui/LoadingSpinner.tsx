'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-5 w-5', 
  lg: 'h-8 w-8'
};

export function LoadingSpinner({ color = 'text-gray-400', size = 'md' }: LoadingSpinnerProps) {
  return (
    <motion.div
      className={`${sizeClasses[size]} ${color} animate-spin`}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <div className="rounded-full border-2 border-current border-t-transparent" />
    </motion.div>
  );
}

export function LoadingPulse({ color = 'bg-gray-400' }: { color?: string }) {
  return (
    <motion.div
      className={`h-2 w-2 rounded-full ${color}`}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}
