/* src/components/Editor/BlockPalette.tsx - DRAG FUNCIONANDO */

import { useEditorStore } from '../../stores/editorStore';
import type { BlockType } from '../../types/block';
import { Button } from '../Common/Button';
import styles from './BlockPalette.module.css';

const BLOCK_TYPES: Array<{ id: BlockType; label: string; icon: string; category: string }> = [
  { id: 'hero', label: 'Hero', icon: '⭐', category: 'Contenido' },
  { id: 'banner', label: 'Banner', icon: '📢', category: 'Contenido' },
  { id: 'text', label: 'Texto', icon: '📝', category: 'Contenido' },
  { id: 'image', label: 'Imagen', icon: '📷', category: 'Media' },
  { id: 'gallery', label: 'Galería', icon: '🖼️', category: 'Media' },
  { id: 'two-col', label: 'Dos columnas', icon: '📊', category: 'Layout' },
  { id: 'three-card', label: 'Tres tarjetas', icon: '🎴', category: 'Layout' },
  { id: 'product', label: 'Producto', icon: '🛍️', category: 'E-commerce' },
  { id: 'contact', label: 'Contacto', icon: '📞', category: 'Formularios' },
  { id: 'chat', label: 'Chat Widget', icon: '💬', category: 'Interactivo' },
];

interface BlockPaletteProps {
  sectionId: string;
}

export const BlockPalette: React.FC<BlockPaletteProps> = ({ sectionId }) => {
  const { addBlock } = useEditorStore();

  // CRÍTICO: Configurar el drag correctamente
  const handleDragStart = (e: React.DragEvent, type: BlockType) => {
    console.log('🎯 Drag started:', type);
    
    // Establecer el tipo de bloque en el dataTransfer
    e.dataTransfer.setData('blockType', type);
    e.dataTransfer.effectAllowed = 'copy';
    
    // Estilo visual durante el drag
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '0.5';
    
    // Crear imagen de drag personalizada
    e.dataTransfer.setDragImage(target, 50, 25);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = '1';
  };

  // Click directo también funciona
  const handleClick = (type: BlockType) => {
    console.log('👆 Click to add:', type);
    addBlock(sectionId, type);
  };

  // Agrupar bloques por categoría
  const categories = [...new Set(BLOCK_TYPES.map(b => b.category))];

  return (
    <aside className={styles.palette}>
      <div className={styles.header}>
        <h3>🧱 Bloques</h3>
        <p className={styles.subtitle}>Arrastra o haz clic</p>
      </div>
      
      <div className={styles.blocksContainer}>
        {categories.map(category => (
          <div key={category} className={styles.category}>
            <div className={styles.categoryTitle}>{category}</div>
            <div className={styles.blocks}>
              {BLOCK_TYPES.filter(b => b.category === category).map((block) => (
                <div
                  key={block.id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, block.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleClick(block.id)}
                  className={styles.block}
                  title={`Agregar ${block.label}`}
                >
                  <span className={styles.icon}>{block.icon}</span>
                  <span className={styles.label}>{block.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tip}>
        <div className={styles.tipIcon}>💡</div>
        <div className={styles.tipText}>
          <strong>Tip:</strong> Arrastra bloques al canvas o haz clic para añadir
        </div>
      </div>
    </aside>
  );
};