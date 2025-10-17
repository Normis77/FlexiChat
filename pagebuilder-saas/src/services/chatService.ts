/*/src/services/chatService.ts*/

import type { ChatMessage } from '../types/chat';
import { v4 as uuid } from 'uuid';

export class ChatService {
  static async generateResponse(userMessage: string): Promise<ChatMessage> {
    const responses: Record<string, string[]> = {
      precio: ['Nuestros planes van desde $9 hasta $99/mes.'],
      demo: ['Claro, puedo mostrarte una demo. ¿Prefieres video o chat?'],
      ayuda: ['¿En qué específicamente necesitas ayuda?'],
    };

    const key = Object.keys(responses).find((k) =>
      userMessage.toLowerCase().includes(k)
    );

    const options = key
      ? responses[key]
      : [
          'Gracias por tu mensaje. ¿Hay algo específico?',
          'Entendido. ¿Necesitas más información?',
        ];

    const content = options[Math.floor(Math.random() * options.length)];

    return new Promise((resolve) => {
      setTimeout(
        () => {
          resolve({
            id: uuid(),
            sender: 'agent',
            content,
            timestamp: Date.now(),
          });
        },
        1000 + Math.random() * 1000
      );
    });
  }
}