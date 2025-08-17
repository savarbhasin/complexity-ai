'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  onStopGeneration?: () => void;
}

export function ChatInput({ 
  onSendMessage, 
  isLoading = false, 
  placeholder = "Type your message...",
  className = "",
  onStopGeneration
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    onSendMessage(inputValue.trim());
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleStop = () => {
    if (onStopGeneration) {
      onStopGeneration();
    }
  };


  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="relative flex flex-col bg-gray-900/60 border border-gray-700/50 rounded-2xl 
      px-5 py-4 focus-within:border-gray-600 transition-colors min-h-[8rem]">
        {/* Input */}
        <input
          ref={inputRef}
          autoFocus={true}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-white placeholder-gray-500 outline-none 
          text-base font-normal py-2"
          placeholder={placeholder}
        />

        {/* Send/Stop Button - Bottom Right */}
        <div className="absolute bottom-3 right-3 flex items-center">
          {isLoading ? (
            <button
              type="button"
              onClick={handleStop}
              className="p-3 bg-red-500 hover:bg-red-600 rounded-xl transition-colors"
            >
              <Square className="h-3 w-3 text-white fill-white" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
