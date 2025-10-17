/*src/types/chat.ts */
export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  visitorId: string;
  messages: ChatMessage[];
  startedAt: number;
  status: 'active' | 'closed';
}

export interface ChatConfig {
  enabled: boolean;
  position: 'bottom-right' | 'bottom-left';
  title: string;
  primaryColor: string;
  welcomeMessage: string;
}