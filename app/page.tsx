'use client'
import ChatInterface from "@/components/ChatInterface";

export default function Home() {


  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-black">
      
      {/* <CopilotChat className="w-[600px] h-[600px] text-purple-400"/> */}
      {/* <URLGrid urls={state.web_urls as string[]}></URLGrid> */}
      
      <ChatInterface/>
        {/* <CopilotTools></CopilotTools> */}

    </div>
  );
}
