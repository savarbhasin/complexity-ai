import React, { useEffect, useRef } from 'react';
import { useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { BookIcon, Globe, Send, StopCircleIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
import MessagesList from './Messages';


export function ChatInterface() {
  const {
    appendMessage,
    visibleMessages,
    isLoading,
    stopGeneration
  } = useCopilotChat();

  const [inputValue, setInputValue] = React.useState("");

  const sendMessage = (content: string) => {
    if (content.trim()) {
      appendMessage(new TextMessage({ content, role: Role.User }));
      setInputValue("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

 

  return (
    <div className="flex md:w-[45rem] w-[95%] flex-col items-center justify-between h-dvh pb-[2rem] md:pb-0  text-white">
      {!visibleMessages || visibleMessages.length === 0 ? (
        <div className="h-full w-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-2xl sm:text-4xl font-serif text-white mb-6">
            Go ahead, ask me anything!
          </h1>
          <div className="w-full max-w-md md:max-w-2xl relative">
            {/* Search box placeholder */}
            <div className="flex flex-col items-center bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-4 mb-4">
                <Globe className="h-5 w-5 text-gray-400" />
                <YoutubeIcon className="h-5 w-5 text-gray-400" />
                <TwitterIcon className="h-5 w-5 text-gray-400" />
                <BookIcon className="h-5 w-5 text-gray-400" />
              </div>
              <form onSubmit={handleSubmit} className="relative w-full">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      sendMessage(inputValue);
                    }
                  }}
                  className="w-full resize-none px-5 min-h-[4rem] md:min-h-[7rem] bg-transparent text-white placeholder-gray-400 outline-none"
                  placeholder="Type your message..."
                />
                {isLoading ? (
                  <button
                    onClick={stopGeneration}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    <StopCircleIcon />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full md:p-3 p-2 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
                  >
                    <Send className="md:h-5 md:w-5 h-3 w-3 text-white" />
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Trending Searches */}
          <div className="flex flex-wrap justify-center gap-2 mt-8 text-sm">
            {['LA Fires', 'L&T Chairperson', 'Mahakumbh 2025', 'PM Modi with Nikhil Kamath on Youtube'].map((term) => (
              <button
                onClick={() => sendMessage(term)}
                key={term}
                className="px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 text-xs sm:text-sm text-gray-500">
            <span>© 2025 All rights reserved.</span>
            <span className="ml-4">@savarbhasin</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full w-full">
          <MessagesList isLoading={isLoading} visibleMessages={visibleMessages}/>
          {/* Input Area */}
          <div className="w-full mx-auto p-4">
            <form onSubmit={handleSubmit} className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    sendMessage(inputValue);
                  }
                }}
                className="w-full resize-none min-h-[6rem] bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3 pr-16 text-white placeholder-gray-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder="Type your message..."
              />
              {isLoading ? (
                <button
                  onClick={stopGeneration}
                  className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full p-2"
                >
                  <StopCircleIcon className="md:h-5 md:w-5 h-3 w-3" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="absolute bottom-4 right-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full p-3 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
                >
                  <Send className="md:h-5 md:w-5 h-3 w-3 text-white" />
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
