/* src/components/Editor/Inspector.tsx - MEJORADO CON GESTIÓN DE CONTENIDO */

import React, { useState, useRef } from 'react';
import { useEditorStore } from '../../stores/editorStore';
import { Input } from '../Common/Input';
import { ChatConfigurator } from './ChatConfigurator';
import styles from './Inspector.module.css';

type Tab = 'block' | 'theme' | 'chat';

export const Inspector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('block');
  const { 
    getSelectedBlock, 
    updateBlock, 
    selectedBlockId, 
    selectedSectionId, 
    project, 
    updateTheme 
  } = useEditorStore();

  const block = getSelectedBlock();

  const handleStyleChange = (key: string, value: any) => {
    if (block && selectedBlockId && selectedSectionId) {
      updateBlock(selectedSectionId, selectedBlockId, {
        style: { ...block.style, [key]: value },
      });
    }
  };

  const handleContentChange = (key: string, value: any) => {
    if (block && selectedBlockId && selectedSectionId) {
      updateBlock(selectedSectionId, selectedBlockId, {
        content: { ...block.content, [key]: value },
      });
    }
  };

  return (
    <aside className={styles.inspector}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'block' ? styles.active : ''}`}
          onClick={() => setActiveTab('block')}
        >
          🎨 Bloque
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'theme' ? styles.active : ''}`}
          onClick={() => setActiveTab('theme')}
        >
          🎭 Tema
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'chat' ? styles.active : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          💬 Chat
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'block' && (
          <>
            {!block || !selectedBlockId || !selectedSectionId ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>👆</div>
                <h3>Selecciona un bloque</h3>
                <p>Haz clic en cualquier bloque del canvas para editarlo aquí</p>
              </div>
            ) : (
              <div className={styles.form}>
                <div className={styles.section}>
                  <h4>📦 Tipo de bloque</h4>
                  <div className={styles.blockType}>{block.type.toUpperCase()}</div>
                  <p className={styles.sectionDesc}>
                    {getBlockDescription(block.type)}
                  </p>
                </div>

                {/* Contenido específico por tipo de bloque */}
                {renderBlockContent(block, handleContentChange)}

                <div className={styles.section}>
                  <h4>🎨 Colores</h4>
                  
                  <div className={styles.colorControl}>
                    <label>Fondo</label>
                    <div className={styles.colorInputGroup}>
                      <input
                        type="color"
                        value={block.style.backgroundColor}
                        onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                        className={styles.colorPicker}
                      />
                      <input
                        type="text"
                        value={block.style.backgroundColor}
                        onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                        className={styles.colorText}
                      />
                    </div>
                  </div>

                  <div className={styles.colorControl}>
                    <label>Texto</label>
                    <div className={styles.colorInputGroup}>
                      <input
                        type="color"
                        value={block.style.textColor}
                        onChange={(e) => handleStyleChange('textColor', e.target.value)}
                        className={styles.colorPicker}
                      />
                      <input
                        type="text"
                        value={block.style.textColor}
                        onChange={(e) => handleStyleChange('textColor', e.target.value)}
                        className={styles.colorText}
                      />
                    </div>
                  </div>

                  <div className={styles.colorControl}>
                    <label>Borde</label>
                    <div className={styles.colorInputGroup}>
                      <input
                        type="color"
                        value={block.style.borderColor}
                        onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                        className={styles.colorPicker}
                      />
                      <input
                        type="text"
                        value={block.style.borderColor}
                        onChange={(e) => handleStyleChange('borderColor', e.target.value)}
                        className={styles.colorText}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.section}>
                  <h4>📐 Espaciado</h4>
                  
                  <div className={styles.sliderControl}>
                    <label>
                      <span>Relleno</span>
                      <span className={styles.sliderValue}>{block.style.padding}px</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="80"
                      value={block.style.padding}
                      onChange={(e) => handleStyleChange('padding', Number(e.target.value))}
                      className={styles.slider}
                    />
                  </div>
                </div>

                <div className={styles.section}>
                  <h4>🔲 Bordes</h4>
                  
                  <div className={styles.sliderControl}>
                    <label>
                      <span>Radio</span>
                      <span className={styles.sliderValue}>{block.style.borderRadius}px</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={block.style.borderRadius}
                      onChange={(e) => handleStyleChange('borderRadius', Number(e.target.value))}
                      className={styles.slider}
                    />
                  </div>

                  <div className={styles.sliderControl}>
                    <label>
                      <span>Ancho</span>
                      <span className={styles.sliderValue}>{block.style.borderWidth}px</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      value={block.style.borderWidth}
                      onChange={(e) => handleStyleChange('borderWidth', Number(e.target.value))}
                      className={styles.slider}
                    />
                  </div>
                </div>

                <div className={styles.section}>
                  <h4>📝 Alineación de texto</h4>
                  <div className={styles.alignButtons}>
                    {(['left', 'center', 'right'] as const).map((align) => (
                      <button
                        key={align}
                        className={`${styles.alignBtn} ${block.style.textAlign === align ? styles.active : ''}`}
                        onClick={() => handleStyleChange('textAlign', align)}
                      >
                        {align === 'left' && '◀'}
                        {align === 'center' && '▬'}
                        {align === 'right' && '▶'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'theme' && (
          <div className={styles.form}>
            <div className={styles.section}>
              <h4>🎨 Tema global</h4>
              <p className={styles.sectionDesc}>Estos colores se aplicarán a toda tu página</p>
              
              <div className={styles.colorControl}>
                <label>Color primario</label>
                <div className={styles.colorInputGroup}>
                  <input
                    type="color"
                    value={project.theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className={styles.colorPicker}
                  />
                  <input
                    type="text"
                    value={project.theme.primaryColor}
                    onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                    className={styles.colorText}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Fuente</label>
                <select
                  value={project.theme.fontFamily}
                  onChange={(e) => updateTheme({ fontFamily: e.target.value })}
                  className={styles.select}
                >
                  <option value="system-ui, -apple-system, sans-serif">Sistema (por defecto)</option>
                  <option value="Georgia, serif">Georgia (Serif)</option>
                  <option value="'Courier New', monospace">Courier (Monospace)</option>
                  <option value="'Comic Sans MS', cursive">Comic Sans</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                </select>
              </div>
            </div>

            <div className={styles.section}>
              <h4>💡 Vista previa</h4>
              <div className={styles.themePreview}>
                <div 
                  className={styles.previewSwatch}
                  style={{ background: project.theme.primaryColor }}
                />
                <div className={styles.previewText} style={{ fontFamily: project.theme.fontFamily }}>
                  <h3>Título de ejemplo</h3>
                  <p>Este es un texto de ejemplo con la fuente seleccionada.</p>
                  <button style={{ background: project.theme.primaryColor }}>Botón</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && <ChatConfigurator />}
      </div>
    </aside>
  );
};

// Helper para descripciones de bloques
function getBlockDescription(type: string): string {
  const descriptions: Record<string, string> = {
    hero: 'Sección destacada con título, subtítulo y botones de acción',
    banner: 'Mensaje breve y destacado en la parte superior',
    text: 'Bloque de texto con título y cuerpo',
    image: 'Imagen con descripción opcional',
    'two-col': 'Dos columnas de contenido lado a lado',
    'three-card': 'Tres tarjetas informativas',
    product: 'Presentación de producto con precio',
    gallery: 'Galería de imágenes',
    contact: 'Formulario de contacto',
    chat: 'Widget de chat personalizable',
  };
  return descriptions[type] || 'Bloque personalizado';
}

// Helper para contenido específico de cada bloque
function renderBlockContent(block: any, handleContentChange: (key: string, value: any) => void) {
  switch (block.type) {
    case 'image':
      return (
        <div className={styles.section}>
          <h4>🖼️ Configuración de imagen</h4>
          <p className={styles.sectionDesc}>
            Puedes subir una imagen o usar una URL. Haz clic en el bloque para cambiar la imagen.
          </p>
          {block.content.imageUrl && (
            <div className={styles.imageInfo}>
              <p className={styles.infoLabel}>✅ Imagen configurada</p>
              <button 
                className={styles.clearBtn}
                onClick={() => handleContentChange('imageUrl', '')}
              >
                Limpiar imagen
              </button>
            </div>
          )}
        </div>
      );

    case 'chat':
      return (
        <div className={styles.section}>
          <h4>💬 Chat</h4>
          <p className={styles.sectionDesc}>
            Ve a la pestaña "Chat" arriba para configurar completamente tu widget de chat.
          </p>
        </div>
      );

    case 'gallery':
      return (
        <div className={styles.section}>
          <h4>🖼️ Galería</h4>
          <div className={styles.inputGroup}>
            <label>Número de imágenes: {block.content.images || 6}</label>
            <input
              type="range"
              min="3"
              max="12"
              value={block.content.images || 6}
              onChange={(e) => handleContentChange('images', Number(e.target.value))}
              className={styles.slider}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}