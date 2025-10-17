/*/src/stores/chatStore.ts*/

import { create } from 'zustand';
import type { ChatMessage, ChatSession } from '../types/chat';
import { v4 as uuid } from 'uuid';

interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;

  createSession: (visitorId: string) => void;
  addMessage: (sessionId: string, message: ChatMessage) => void;
  getSession: (sessionId: string) => ChatSession | undefined;
}

export const useChatStore = create<ChatState>((set, get) => ({
  sessions: [],
  currentSessionId: null,

  createSession: (visitorId) => {
    const sessionId = `session_${uuid()}`;
    set((state) => ({
      sessions: [
        ...state.sessions,
        {
          id: sessionId,
          visitorId,
          messages: [
            {
              id: uuid(),
              sender: 'agent',
              content: '¡Hola! ¿Cómo podemos ayudarte?',
              timestamp: Date.now(),
            },
          ],
          startedAt: Date.now(),
          status: 'active',
        },
      ],
      currentSessionId: sessionId,
    }));
  },

  addMessage: (sessionId, message) =>
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.id === sessionId
          ? { ...session, messages: [...session.messages, message] }
          : session
      ),
    })),

  getSession: (sessionId) => {
    return get().sessions.find((s) => s.id === sessionId);
  },
}));