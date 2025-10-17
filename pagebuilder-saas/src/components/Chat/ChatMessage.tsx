/*/src/components/Chat/ChatMessage.tsx*/


import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../types/chat';
import styles from './ChatMessage.module.css';

interface Props {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<Props> = ({ message }) => {
  return (
    <div
      className={`${styles.message} ${
        message.sender === 'user' ? styles.user : styles.agent
      }`}
    >
      <div className={styles.bubble}>{message.content}</div>
      <span className={styles.time}>
        {new Date(message.timestamp).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </div>
  );
};