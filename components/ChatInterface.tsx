// import React from 'react';
// import { AgentState } from "@/lib/types";
// import { useCoAgent, useCopilotChat } from "@copilotkit/react-core";
// import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
// import { Send, StopCircle, Settings } from "lucide-react";
// import CopilotTools from './tools';
// import URLGrid from './URLGrid';

// export function ChatInterface() {
//   const {
//     appendMessage,
//     visibleMessages,
//     isLoading,
//     stopGeneration
//   } = useCopilotChat();
  
//   const { state } = useCoAgent<AgentState>({
//     name: 'complexity_ai',
//     initialState: {
//       messages_format: []
//     }
//   });
  
//   const messages = state.messages_format;
//   const [inputValue, setInputValue] = React.useState("");

//   const sendMessage = (content: string) => {
//     if (content.trim()) {
//       appendMessage(new TextMessage({ content, role: Role.User }));
//       setInputValue("");
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     sendMessage(inputValue);
//   };

//   return (
//     <div className="">
     
      
//       {
//         visibleMessages ? visibleMessages.map((message, index) => {
//           if(message.isTextMessage()){
//               if(message.role === Role.User){
//                   return (
//                       <div className='' key={index}>User: {message.content}</div>
//                   )
//               } else if(message.role === Role.Tool){
//                   return (
//                       <div key={index}>Tool: {message.content}</div>
//                   )
//               } else if(message.role === Role.Assistant){
//                   return (
//                       <div key={index}>Assistant: {message.content}</div>
//                   )
//               }
//           } else if(message.isActionExecutionMessage()){
//                 return (
//                     <div key={index}>ActionExecutionMessage: {message.name}</div>
//                 )
//           } else if(message.isResultMessage()){
//                 return (
//                     <div key={index}>ResultMessage: <URLGrid urls={JSON.parse(message.result).urls}/></div>
//                 )
//           }
//         }) : <div>No visibleMessages</div>
//       }
//       <form onSubmit={handleSubmit}>
//         <input onChange={(e)=>setInputValue(e.target.value)} type="text" placeholder="Type your message..." />
//         <button type="submit">Submit</button>
//       </form>
//       <CopilotTools/>

//     </div>
        
    
//     );
// }

// export default ChatInterface;

import React from 'react';
import { AgentState } from "@/lib/types";
import { useCoAgent, useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { Send, StopCircle } from 'lucide-react';
import { MessageBubble, ToolResult } from './MessageBubble';
import { ToolExecution } from './ToolExecution';


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
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {visibleMessages ? (
          visibleMessages.map((message, index) => {
            if (message.isTextMessage()) {
              return <MessageBubble key={index} message={message} />;
            }
            if (message.isActionExecutionMessage()) {
              return <ToolExecution key={index} message={message} isLoading={isLoading} />;
            }
            if (message.isResultMessage()) {
              return <ToolResult key={index} result={message.result} />;
            }
            return null;
          })
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Start a conversation...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl px-6 py-4 pr-24 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-3 hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
          >
            <Send className="h-5 w-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInterface;