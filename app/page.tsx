'use client'
import ChatInterface from "@/components/ChatInterface";
import CopilotTools from "@/components/tools";
import { AgentState } from "@/lib/types";
import { useCoAgent, useCopilotMessagesContext } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";

export default function Home() {


  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      
      {/* <CopilotChat className="w-[600px] h-[600px] text-purple-400"/> */}
      {/* <URLGrid urls={state.web_urls as string[]}></URLGrid> */}
      
      <ChatInterface/>
        {/* <CopilotTools></CopilotTools> */}

    </div>
  );
}
