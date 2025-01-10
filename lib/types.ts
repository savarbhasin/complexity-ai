export type AgentState = {
    messages_format: Message[];    
}

export type Message = {
    role: string;
    content: string;
    urls?: string[];
    tool_name: string;
}