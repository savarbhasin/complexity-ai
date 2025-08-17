import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Message } from '@/types';
import { TOOL_CONFIGS } from '@/lib/constants';
import { LoadingPulse } from '@/components/ui/LoadingSpinner';

export const ToolExecution = ({ message, isLoading }: { message: Message, isLoading: boolean   }) => {
  const config = TOOL_CONFIGS[message.tool_call as keyof typeof TOOL_CONFIGS] || TOOL_CONFIGS.default;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-lg border ${config.borderColor} ${config.bgColor}`}
    >
      {/* Background loading bar */}
      {isLoading && (
        <motion.div
          className={`absolute bottom-0 left-0 h-[2px] ${config.loadingBgColor}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="flex items-center p-4 space-x-4">
        {/* Icon with platform-specific animation */}
        <motion.div
          animate={isLoading ? {
            scale: [1, 1.1, 1],
            rotate: message.tool_call === 'webscrape' ? [0, 360] : 0
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={`p-2 rounded-lg ${config.bgColor} ${config.loadingBgColor}`}
        >
          <Icon className={`h-6 w-6 ${config.color}`} />
        </motion.div>

        {/* Text content */}
        <div className="flex-1">
          <motion.span 
            className={`text-sm font-medium ${config.color}`}
            animate={isLoading ? { opacity: [1, 0.7, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isLoading ? config.loadingText : config.doneText}
          </motion.span>
        </div>

        {/* Status indicator */}
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <>
              <LoadingPulse color={config.color} />
              <LoadingPulse color={config.color} />
              <LoadingPulse color={config.color} />
            </>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={config.color}
            >
              <CheckCircle2 className="h-5 w-5" />
            </motion.div>
          )}
        </div>
      </div>

      {/* Particle effects for specific tools */}
      {isLoading && message.tool_call === 'arxiv_search' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent" />
        </motion.div>
      )}
    </motion.div>
  );
};