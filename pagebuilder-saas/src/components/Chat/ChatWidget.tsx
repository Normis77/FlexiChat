/*/src/components/Chat/ChatWidget.tsx*/


import React, { useState, useEffect, useRef } from 'react';
import { useChatStore } from '../../stores/chatStore';
import { ChatService } from '../../services/chatService';
//import { Input } from '../Common/Input';
import { Button } from '../Common/Button';
import { ChatMessage } from './ChatMessage';
import styles from './ChatWidget.module.css';
import { v4 as uuid } from 'uuid';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { currentSessionId, addMessage, getSession, createSession } =
    useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentSessionId) {
      createSession(`visitor_${uuid()}`);
    }
  }, [currentSessionId, createSession]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSessionId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentSessionId) return;

    const userMessage = {
      id: uuid(),
      sender: 'user' as const,
      content: input,
      timestamp: Date.now(),
    };

    addMessage(currentSessionId, userMessage);
    setInput('');

    const agentResponse = await ChatService.generateResponse(input);
    addMessage(currentSessionId, agentResponse);
  };

  const session = currentSessionId ? getSession(currentSessionId) : null;

  return (
    <div className={styles.widget}>
      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.title}>Soporte en vivo</span>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className={styles.messages}>
            {session?.messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className={styles.form}>
            <input
              type="text"
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
            />
            <Button variant="primary" size="sm" type="submit">
              Enviar
            </Button>
          </form>
        </div>
      )}

      <button
        className={styles.toggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>
    </div>
  );
};