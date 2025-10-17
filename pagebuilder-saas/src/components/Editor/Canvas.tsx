/* src/components/Editor/Canvas.tsx - DRAG & DROP FUNCIONANDO 100% */

import React, { useState } from 'react';
import { useEditorStore } from '../../stores/editorStore';
import { BlockEditor } from './BlockEditor';
import type { BlockType } from '../../types/block';
import styles from './Canvas.module.css';

export const Canvas: React.FC = () => {
  const { 
    project, 
    selectBlock, 
    selectedBlockId, 
    selectedSectionId,
    deleteBlock,
    duplicateBlock,
    moveBlock,
    updateBlock,
    addBlock
  } = useEditorStore();
  
  const [dragOverSectionId, setDragOverSectionId] = useState<string | null>(null);

  // CRÍTICO: Permitir el drop
  const handleDragOver = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault(); // NECESARIO para permitir drop
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverSectionId(sectionId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Solo quitar si realmente salimos del área
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      setDragOverSectionId(null);
    }
  };

  // ARREGLADO: Crear bloque cuando se suelta
  const handleDrop = (e: React.DragEvent, sectionId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSectionId(null);
    
    const blockType = e.dataTransfer.getData('blockType') as BlockType;
    
    if (blockType) {
      console.log('✅ Dropped block type:', blockType, 'in section:', sectionId);
      addBlock(sectionId, blockType);
    } else {
      console.warn('⚠️ No blockType data found in drop event');
    }
  };

  return (
    <main className={styles.canvas}>
      <div className={styles.canvasHeader}>
        <h2>📄 Lienzo</h2>
        <span className={styles.hint}>
          {dragOverSectionId ? '⬇️ Suelta aquí' : 'Arrastra bloques o haz clic para editar'}
        </span>
      </div>
      
      <div className={styles.content}>
        {project.sections.map((section) => {
          const sectionBlocks = section.blocks;
          const isDragOver = dragOverSectionId === section.id;
          
          return (
            <div
              key={section.id}
              className={`${styles.section} ${isDragOver ? styles.dragOver : ''}`}
              onDragOver={(e) => handleDragOver(e, section.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, section.id)}
            >
              {sectionBlocks.length === 0 ? (
                <div className={styles.empty}>
                  <div className={styles.emptyIcon}>📦</div>
                  <p>Arrastra bloques aquí desde la paleta</p>
                  <span>o haz clic en un bloque de la izquierda</span>
                </div>
              ) : (
                sectionBlocks.map((block, index) => (
                  <BlockEditor
                    key={block.id}
                    block={block}
                    isSelected={selectedBlockId === block.id}
                    onSelect={() => selectBlock(block.id, section.id)}
                    onUpdate={(updates) => updateBlock(section.id, block.id, updates)}
                    onDelete={() => deleteBlock(section.id, block.id)}
                    onDuplicate={() => duplicateBlock(section.id, block.id)}
                    onMove={(direction) => moveBlock(section.id, block.id, direction)}
                    canMoveUp={index > 0}
                    canMoveDown={index < sectionBlocks.length - 1}
                  />
                ))
              )}
            </div>
          );
        })}

        {project.sections.length === 0 && (
          <div className={styles.noSections}>
            <div className={styles.emptyIcon}>📭</div>
            <p>No hay secciones disponibles</p>
            <span>Espera un momento...</span>
          </div>
        )}
      </div>
    </main>
  );
};