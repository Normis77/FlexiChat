/* src/components/Editor/ChatConfigurator.tsx - NUEVO */

import React from 'react';
import { useEditorStore } from '../../stores/editorStore';
import { Input } from '../Common/Input';
import styles from './ChatConfigurator.module.css';


export const ChatConfigurator: React.FC = () => {
  const { project, updateChatConfig } = useEditorStore();
  const { chatConfig } = project;

  return (
    <div className={styles.configurator}>
      <div className={styles.header}>
        <h3>⚙️ Configuración del Chat</h3>
        <p className={styles.subtitle}>
          Personaliza el chat que aparecerá en tu página publicada
        </p>
      </div>

      <div className={styles.section}>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={chatConfig.enabled}
            onChange={(e) => updateChatConfig({ enabled: e.target.checked })}
          />
          <span className={styles.toggleSlider}></span>
          <span className={styles.toggleLabel}>Chat habilitado</span>
        </label>
      </div>

      {chatConfig.enabled && (
        <>
          <div className={styles.section}>
            <h4>Apariencia</h4>
            
            <Input
              label="Título del chat"
              type="text"
              value={chatConfig.title}
              onChange={(value) => updateChatConfig({ title: value })}
              placeholder="Chat en vivo"
            />

            <div className={styles.inputGroup}>
              <label>Color principal</label>
              <div className={styles.colorPicker}>
                <input
                  type="color"
                  value={chatConfig.primaryColor}
                  onChange={(e) => updateChatConfig({ primaryColor: e.target.value })}
                />
                <input
                  type="text"
                  value={chatConfig.primaryColor}
                  onChange={(e) => updateChatConfig({ primaryColor: e.target.value })}
                  className={styles.colorInput}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Posición</label>
              <select
                value={chatConfig.position}
                onChange={(e) => updateChatConfig({ position: e.target.value as 'bottom-right' | 'bottom-left' })}
                className={styles.select}
              >
                <option value="bottom-right">Abajo derecha</option>
                <option value="bottom-left">Abajo izquierda</option>
              </select>
            </div>

            <Input
              label="Texto del botón (emoji)"
              type="text"
              value={chatConfig.buttonText}
              onChange={(value) => updateChatConfig({ buttonText: value })}
              placeholder="💬"
            />
          </div>

          <div className={styles.section}>
            <h4>Mensajes</h4>
            
            <Input
              label="Mensaje de bienvenida"
              type="text"
              value={chatConfig.welcomeMessage}
              onChange={(value) => updateChatConfig({ welcomeMessage: value })}
              placeholder="¡Hola! ¿En qué puedo ayudarte?"
            />

            <Input
              label="Placeholder del input"
              type="text"
              value={chatConfig.placeholder}
              onChange={(value) => updateChatConfig({ placeholder: value })}
              placeholder="Escribe tu mensaje..."
            />

            <Input
              label="Nombre del agente"
              type="text"
              value={chatConfig.agentName}
              onChange={(value) => updateChatConfig({ agentName: value })}
              placeholder="Agente"
            />

            <Input
              label="Avatar del agente (emoji)"
              type="text"
              value={chatConfig.agentAvatar}
              onChange={(value) => updateChatConfig({ agentAvatar: value })}
              placeholder="👤"
            />
          </div>

          <div className={styles.section}>
            <h4>Comportamiento</h4>
            
            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={chatConfig.autoOpen}
                onChange={(e) => updateChatConfig({ autoOpen: e.target.checked })}
              />
              <span className={styles.toggleSlider}></span>
              <span className={styles.toggleLabel}>Abrir automáticamente</span>
            </label>

            {chatConfig.autoOpen && (
              <div className={styles.inputGroup}>
                <label>Retardo (segundos)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={chatConfig.autoOpenDelay / 1000}
                  onChange={(e) => updateChatConfig({ autoOpenDelay: Number(e.target.value) * 1000 })}
                  className={styles.slider}
                />
                <span className={styles.sliderValue}>{chatConfig.autoOpenDelay / 1000}s</span>
              </div>
            )}
          </div>

          <div className={styles.preview}>
            <h4>Vista previa</h4>
            <div className={styles.chatPreview}>
              <div 
                className={styles.chatButton}
                style={{ background: chatConfig.primaryColor }}
              >
                {chatConfig.buttonText}
              </div>
              <div className={styles.chatPanel}>
                <div 
                  className={styles.chatHeader}
                  style={{ background: chatConfig.primaryColor }}
                >
                  {chatConfig.title}
                </div>
                <div className={styles.chatMessages}>
                  <div className={styles.message}>
                    <span className={styles.avatar}>{chatConfig.agentAvatar}</span>
                    <div className={styles.bubble}>{chatConfig.welcomeMessage}</div>
                  </div>
                </div>
                <div className={styles.chatInput}>
                  <input type="text" placeholder={chatConfig.placeholder} disabled />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.infoIcon}>💡</div>
            <div>
              <strong>El chat será completamente funcional</strong>
              <p>Cuando publiques tu página, el chat estará integrado y funcionando. Los mensajes se pueden conectar a tu email, WhatsApp o sistema de tickets.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};