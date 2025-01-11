import { useEffect, useRef } from "react";
import { MessageBubble } from "./MessageBubble";
import { ToolExecution } from "./ToolExecution";
import { ToolResult } from "./ToolResult";

const Messages = ({visibleMessages, isLoading}:{
    visibleMessages: any;
    isLoading: boolean;
}) =>{
    const messageContainerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const container = messageContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, [visibleMessages]);
    return (
        <div ref={messageContainerRef} className="flex-1 w-full max-w-4xl mx-auto py-6 px-4 overflow-y-auto no-scrollbar space-y-4">
            {
                visibleMessages?.map((message:any, index:number) => {
                    if (message.isActionExecutionMessage()) {
                        return <ToolExecution key={index} message={message} isLoading={isLoading} />;
                    }
                    
                    if (message.isTextMessage()) {
                        console.log('received message', message);
                        return <MessageBubble key={index} message={message} />;
                    }
                    if (message.isResultMessage() ) {
                        console.log('result rcvd message');
                        return <ToolResult key={index} result={message.result} />;
                    }
                    return null;
                    }
                )}
        </div>

    )
}

export default Messages;
