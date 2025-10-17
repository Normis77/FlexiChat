/* src/components/Editor/BlockEditor.tsx - ARREGLADO COMPLETAMENTE */

import React, { useRef, useState } from 'react';
import type { Block } from '../../types/block';
import styles from './BlockEditor.module.css';

interface BlockEditorProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<Block>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMove: (direction: 'up' | 'down') => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

// Imágenes de stock gratuitas
const STOCK_IMAGES = [
 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
  'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800',
];
export const BlockEditor: React.FC<BlockEditorProps> = ({
  block,
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onDuplicate,
  onMove,
  canMoveUp,
  canMoveDown,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showImageGallery, setShowImageGallery] = useState(false);

  const handleContentChange = (key: string, value: any) => {
    onUpdate({ content: { ...block.content, [key]: value } });
  };

  const handleNestedChange = (parentKey: string, childKey: string, value: string) => {
    const currentParent = block.content[parentKey] || {};
    onUpdate({
      content: {
        ...block.content,
        [parentKey]: { ...currentParent, [childKey]: value }
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        handleContentChange('imageUrl', imageUrl);
        setShowImageGallery(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrl = (url: string) => {
    handleContentChange('imageUrl', url);
    setShowImageGallery(false);
  };

  const handleStockImageSelect = (url: string) => {
    handleContentChange('imageUrl', url);
    setShowImageGallery(false);
  };

  // CRÍTICO: Prevenir propagación en todos los inputs para que sean editables
  const stopPropagation = (e: React.MouseEvent | React.FocusEvent) => {
    e.stopPropagation();
  };

  const renderContent = () => {
    switch (block.type) {
      case 'hero':
        return (
          <div className={styles.hero}>
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => handleContentChange('title', e.target.value)}
              onClick={stopPropagation}
              onFocus={stopPropagation}
              placeholder="Título principal"
              className={styles.heroTitle}
              style={{ color: block.style.textColor }}
            />
            <input
              type="text"
              value={block.content.subtitle || ''}
              onChange={(e) => handleContentChange('subtitle', e.target.value)}
              onClick={stopPropagation}
              onFocus={stopPropagation}
              placeholder="Subtítulo"
              className={styles.heroSubtitle}
            />
            <div className={styles.heroButtons}>
              <input
                type="text"
                value={block.content.ctaPrimary || 'CTA Principal'}
                onChange={(e) => handleContentChange('ctaPrimary', e.target.value)}
                onClick={stopPropagation}
                onFocus={stopPropagation}
                className={styles.btnInput}
                style={{ background: block.style.textColor, color: block.style.backgroundColor }}
              />
              <input
                type="text"
                value={block.content.ctaSecondary || 'CTA Secundario'}
                onChange={(e) => handleContentChange('ctaSecondary', e.target.value)}
                onClick={stopPropagation}
                onFocus={stopPropagation}
                className={styles.btnInput}
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className={styles.imageBlock} onClick={stopPropagation}>
            {block.content.imageUrl ? (
              <div className={styles.imagePreview}>
                <img src={block.content.imageUrl} alt="Preview" />
                <div className={styles.imageActions}>
                  <button
                    className={styles.changeImageBtn}
                    onClick={(e) => { e.stopPropagation(); setShowImageGallery(true); }}
                  >
                    📁 Cambiar imagen
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.imageUpload}>
                <div className={styles.uploadOptions}>
                  <div className={styles.uploadOption} onClick={() => fileInputRef.current?.click()}>
                    <div className={styles.uploadIcon}>📁</div>
                    <p>Subir desde tu computadora</p>
                  </div>
                  
                  <div className={styles.uploadDivider}>o</div>
                  
                  <div className={styles.uploadOption} onClick={() => setShowImageGallery(true)}>
                    <div className={styles.uploadIcon}>🖼️</div>
                    <p>Elegir de galería gratuita</p>
                  </div>

                  <div className={styles.uploadDivider}>o</div>
                  
                  <div className={styles.urlOption}>
                    <input
                      type="url"
                      placeholder="Pega la URL de una imagen (ej: https://...)"
                      className={styles.urlInput}
                      onClick={stopPropagation}
                      onBlur={(e) => e.target.value && handleImageUrl(e.target.value)}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          handleImageUrl(input.value);
                        }
                      }}
                    />
                    <p className={styles.urlHint}>🌐 URL de imagen online</p>
                  </div>
                </div>
              </div>
            )}

            {/* Galería de imágenes de stock */}
            {showImageGallery && (
              <div className={styles.imageGalleryModal} onClick={() => setShowImageGallery(false)}>
                <div className={styles.galleryContent} onClick={stopPropagation}>
                  <div className={styles.galleryHeader}>
                    <h3>🖼️ Galería de imágenes gratuitas</h3>
                    <button onClick={() => setShowImageGallery(false)}>✕</button>
                  </div>
                  <div className={styles.stockImageGrid}>
                    {STOCK_IMAGES.map((url, i) => (
                      <div
                        key={i}
                        className={styles.stockImageItem}
                        onClick={() => handleStockImageSelect(url)}
                      >
                        <img src={url} alt={`Stock ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                  <p className={styles.galleryNote}>
                    💡 Imágenes de Unsplash - Libres para uso comercial
                  </p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            
            {block.content.imageUrl && (
              <input
                type="text"
                value={block.content.caption || ''}
                onChange={(e) => handleContentChange('caption', e.target.value)}
                onClick={stopPropagation}
                onFocus={stopPropagation}
                placeholder="Descripción de la imagen (opcional)"
                className={styles.captionInput}
              />
            )}
          </div>
        );

      case 'text':
        return (
          <div onClick={stopPropagation}>
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => handleContentChange('title', e.target.value)}
              onClick={stopPropagation}
              onFocus={stopPropagation}
              placeholder="Título"
              className={styles.titleInput}
              style={{ color: block.style.textColor }}
            />
            <textarea
              value={block.content.body || ''}
              onChange={(e) => handleContentChange('body', e.target.value)}
              onClick={stopPropagation}
              onFocus={stopPropagation}
              placeholder="Escribe tu contenido aquí..."
              className={styles.textArea}
              style={{ color: block.style.textColor }}
              rows={4}
            />
          </div>
        );

      case 'banner':
        return (
          <div className={styles.banner} onClick={stopPropagation}>
            <input
              type="text"
              value={block.content.text || ''}
              onChange={(e) => handleContentChange('text', e.target.value)}
              onClick={stopPropagation}
              onFocus={stopPropagation}
              placeholder="Texto del banner"
              className={styles.bannerInput}
              style={{ textAlign: block.style.textAlign }}
            />
          </div>
        );

      case 'two-col':
        return (
          <div className={styles.twoCol} onClick={stopPropagation}>
            <div className={styles.col}>
              <input
                type="text"
                value={block.content.col1?.title || ''}
                onChange={(e) => handleNestedChange('col1', 'title', e.target.value)}
                onClick={stopPropagation}
                onFocus={stopPropagation}
                placeholder="Título columna 1"
                className={styles.colTitle}
              />
              <textarea
                value={block.content.col1?.text || ''}
                onChange={(e) => handleNestedChange('col1', 'text', e.target.value)}
                onClick={stopPropagation}
                onFocus={stopPropagation}
                placeholder="Texto..."
                className={styles.colText}
                rows={3}
              />
            </div>
            <div className={styles.col}>
              <input
                type="text"
                value={block.content.col2?.title || ''}
                onChange={(e) => handleNestedChange('col2', 'title', e.target.value)}
                onClick={stopPropagation}
                onFocus={stopPropagation}
                placeholder="Título columna 2"
                className={styles.colTitle}
              />
              <textarea
                value={block.content.col2?.text || ''}
                onChange={(e) => handleNestedChange('col2', 'text', e.target.value)}
                onClick={stopPropagation}
                onFocus={stopPropagation}
                placeholder="Texto..."
                className={styles.colText}
                rows={3}
              />
            </div>
          </div>
        );

      case 'three-card':
        return (
          <div className={styles.threeCard} onClick={stopPropagation}>
            {['card1', 'card2', 'card3'].map((key, idx) => (
              <div key={key} className={styles.card}>
                <input
                  type="text"
                  value={block.content[key]?.title || ''}
                  onChange={(e) => handleNestedChange(key, 'title', e.target.value)}
                  onClick={stopPropagation}
                  onFocus={stopPropagation}
                  placeholder={`Título ${idx + 1}`}
                  className={styles.cardTitle}
                />
                <textarea
                  value={block.content[key]?.text || ''}
                  onChange={(e) => handleNestedChange(key, 'text', e.target.value)}
                  onClick={stopPropagation}
                  onFocus={stopPropagation}
                  placeholder="Descripción..."
                  className={styles.cardText}
                  rows={2}
                />
              </div>
            ))}
          </div>
        );

      case 'product':
        return (
          <div className={styles.product} onClick={stopPropagation}>
            <div className={styles.productInfo}>
              <input
                type="text"
                value={block.content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                onClick={stopPropagation}
                onFocus={stopPropagation}
                placeholder="Nombre del producto"
                className={styles.productTitle}
              />
              <textarea
                value={block.content.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                onClick={stopPropagation}
                onFocus={stopPropagation}
                placeholder="Descripción del producto"
                className={styles.productDesc}
                rows={2}
              />
              <input
                type="text"
                value={block.content.price || ''}
                onChange={(e) => handleContentChange('price', e.target.value)}
                onClick={stopPropagation}
                onFocus={stopPropagation}
                placeholder="Q 0.00"
                className={styles.priceInput}
              />
            </div>
            <div className={styles.productImagePlaceholder}>
              <span>🖼️</span>
              <p>Imagen del producto</p>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div onClick={stopPropagation}>
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => handleContentChange('title', e.target.value)}
              onClick={stopPropagation}
              onFocus={stopPropagation}
              placeholder="Título de galería"
              className={styles.titleInput}
            />
            <div className={styles.galleryGrid}>
              {Array.from({ length: block.content.images || 6 }).map((_, i) => (
                <div key={i} className={styles.galleryItem}>
                  <span>🖼️</span>
                </div>
              ))}
            </div>
            <div className={styles.galleryControl}>
              <label>Número de imágenes:</label>
              <input
                type="range"
                min="3"
                max="12"
                value={block.content.images || 6}
                onChange={(e) => handleContentChange('images', Number(e.target.value))}
                onClick={stopPropagation}
                className={styles.slider}
              />
              <span>{block.content.images || 6}</span>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className={styles.contactForm} onClick={stopPropagation}>
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => handleContentChange('title', e.target.value)}
              onClick={stopPropagation}
              onFocus={stopPropagation}
              placeholder="Título del formulario"
              className={styles.formTitle}
            />
            <div className={styles.formPreview}>
              <input type="text" placeholder="Nombre" disabled className={styles.formField} />
              <input type="email" placeholder="Email" disabled className={styles.formField} />
              <textarea placeholder="Mensaje" disabled className={styles.formField} rows={3} />
              <button disabled className={styles.formButton}>Enviar</button>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className={styles.chatPreview} onClick={stopPropagation}>
            <div className={styles.chatPanel}>
              <div className={styles.chatHeader} style={{ background: block.content.primaryColor || '#2563eb' }}>
                <input
                  type="text"
                  value={block.content.title || ''}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  onClick={stopPropagation}
                  onFocus={stopPropagation}
                  placeholder="Título del chat"
                  className={styles.chatTitleInput}
                />
              </div>
              <div className={styles.chatBody}>
                <div className={styles.chatMessage}>
                  <input
                    type="text"
                    value={block.content.agentAvatar || '👤'}
                    onChange={(e) => handleContentChange('agentAvatar', e.target.value)}
                    onClick={stopPropagation}
                    onFocus={stopPropagation}
                    placeholder="👤"
                    className={styles.avatarInput}
                    maxLength={2}
                  />
                  <input
                    type="text"
                    value={block.content.welcomeMessage || ''}
                    onChange={(e) => handleContentChange('welcomeMessage', e.target.value)}
                    onClick={stopPropagation}
                    onFocus={stopPropagation}
                    placeholder="Mensaje de bienvenida"
                    className={styles.chatMessageInput}
                  />
                </div>
              </div>
              <div className={styles.chatFooter}>
                <input
                  type="text"
                  value={block.content.placeholder || ''}
                  onChange={(e) => handleContentChange('placeholder', e.target.value)}
                  onClick={stopPropagation}
                  onFocus={stopPropagation}
                  placeholder="Placeholder..."
                  className={styles.chatPlaceholderInput}
                />
              </div>
            </div>
            <p className={styles.chatHint}>💡 Personaliza el chat desde el Inspector (pestaña Chat)</p>
          </div>
        );

      default:
        return <div className={styles.placeholder}>Bloque: {block.type}</div>;
    }
  };

  return (
    <div
      className={`${styles.blockWrapper} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
      style={{
        backgroundColor: block.style.backgroundColor,
        padding: `${block.style.padding}px`,
        borderRadius: `${block.style.borderRadius}px`,
        border: `${block.style.borderWidth}px solid ${block.style.borderColor}`,
      }}
    >
      {isSelected && (
        <div className={styles.toolbar} onClick={stopPropagation}>
          <span className={styles.blockType}>{block.type.toUpperCase()}</span>
          <div className={styles.actions}>
            <button
              onClick={(e) => { e.stopPropagation(); onMove('up'); }}
              disabled={!canMoveUp}
              title="Mover arriba"
            >
              ↑
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onMove('down'); }}
              disabled={!canMoveDown}
              title="Mover abajo"
            >
              ↓
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
              title="Duplicar"
            >
              📋
            </button>
            <button
              onClick={(e) => { 
                e.stopPropagation(); 
                if (window.confirm('¿Eliminar este bloque?')) onDelete(); 
              }}
              title="Eliminar"
              className={styles.deleteBtn}
            >
              🗑️
            </button>
          </div>
        </div>
      )}
      {renderContent()}
    </div>
  );
};