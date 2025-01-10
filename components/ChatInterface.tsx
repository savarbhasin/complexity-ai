import React from 'react';
import { AgentState } from "@/lib/types";
import { useCoAgent, useCopilotChat } from "@copilotkit/react-core";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { Send, StopCircle, Settings } from "lucide-react";
import CopilotTools from './tools';
import URLGrid from './URLGrid';

export function ChatInterface() {
  const {
    appendMessage,
    visibleMessages,
    isLoading,
    stopGeneration
  } = useCopilotChat();
  
  const { state } = useCoAgent<AgentState>({
    name: 'complexity_ai',
    initialState: {
      messages_format: []
    }
  });
  
  const messages = state.messages_format;
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
    <div className="">
     
      
      {
        visibleMessages ? visibleMessages.map((message, index) => {
          if(message.isTextMessage()){
              if(message.role === Role.User){
                  return (
                      <div className='' key={index}>User: {message.content}</div>
                  )
              } else if(message.role === Role.Tool){
                  return (
                      <div key={index}>Tool: {message.content}</div>
                  )
              } else if(message.role === Role.Assistant){
                  return (
                      <div key={index}>Assistant: {message.content}</div>
                  )
              }
          } else if(message.isActionExecutionMessage()){
                return (
                    <div key={index}>ActionExecutionMessage: {message.name}</div>
                )
          } else if(message.isResultMessage()){
                return (
                    <div key={index}>ResultMessage: <URLGrid urls={JSON.parse(message.result).urls}/></div>
                )
          }
        }) : <div>No visibleMessages</div>
      }
      <form onSubmit={handleSubmit}>
        <input onChange={(e)=>setInputValue(e.target.value)} type="text" placeholder="Type your message..." />
        <button type="submit">Submit</button>
      </form>
      <CopilotTools/>

    </div>
        
    
    );
}

export default ChatInterface;