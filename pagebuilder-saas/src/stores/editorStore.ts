/* src/stores/editorStore.ts - CORREGIDO CON REPLACE PROJECT */

import { create } from 'zustand';
import type { Block, Section } from '../types/block';
import type { BlockType } from '../types/block';
import type { Project, ChatConfig } from '../types/user';
import { v4 as uuid } from 'uuid';

interface EditorState {
  project: Project;
  selectedBlockId: string | null;
  selectedSectionId: string | null;

  // Project actions
  updateProjectTitle: (title: string) => void;
  updateTheme: (theme: Partial<Project['theme']>) => void;
  updateChatConfig: (config: Partial<ChatConfig>) => void;
  replaceProject: (project: Project) => void; // NUEVO

  // Section actions
  addSection: () => void;
  deleteSection: (sectionId: string) => void;

  // Block actions
  addBlock: (sectionId: string, type: BlockType) => void;
  updateBlock: (sectionId: string, blockId: string, updates: Partial<Block>) => void;
  deleteBlock: (sectionId: string, blockId: string) => void;
  duplicateBlock: (sectionId: string, blockId: string) => void;
  moveBlock: (sectionId: string, blockId: string, direction: 'up' | 'down') => void;
  
  // Selection
  selectBlock: (blockId: string | null, sectionId: string | null) => void;
  getSelectedBlock: () => Block | null;

  // Persistence
  saveProject: () => void;
  loadProject: () => void;
}

const DEFAULT_PROJECT: Project = {
  id: uuid(),
  title: 'Mi Proyecto',
  sections: [],
  theme: {
    primaryColor: '#2563eb',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  chatConfig: {
    enabled: true,
    position: 'bottom-right',
    title: 'Chat en vivo',
    primaryColor: '#2563eb',
    welcomeMessage: '¡Hola! ¿En qué puedo ayudarte?',
    placeholder: 'Escribe tu mensaje...',
    agentName: 'Agente',
    agentAvatar: '👤',
    buttonText: '💬',
    autoOpen: false,
    autoOpenDelay: 3000,
  },
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const useEditorStore = create<EditorState>((set, get) => ({
  project: DEFAULT_PROJECT,
  selectedBlockId: null,
  selectedSectionId: null,

  updateProjectTitle: (title) => set((state) => ({
    project: { ...state.project, title, updatedAt: Date.now() }
  })),

  updateTheme: (theme) => set((state) => ({
    project: { 
      ...state.project, 
      theme: { ...state.project.theme, ...theme },
      updatedAt: Date.now()
    }
  })),

  updateChatConfig: (config) => set((state) => ({
    project: {
      ...state.project,
      chatConfig: { ...state.project.chatConfig, ...config },
      updatedAt: Date.now()
    }
  })),

  // NUEVO: Reemplazar proyecto completo (para plantillas)

  replaceProject: (project) => {
    const updatedProject = { ...project, updatedAt: Date.now() };
    set({ 
      project: updatedProject,
      selectedBlockId: null,
      selectedSectionId: null
    });
    // Guardar automáticamente
    localStorage.setItem('flexichat-project', JSON.stringify(updatedProject));
  },

  addSection: () => set((state) => ({
    project: {
      ...state.project,
      sections: [...state.project.sections, { id: uuid(), blocks: [] }],
      updatedAt: Date.now()
    }
  })),

  deleteSection: (sectionId) => set((state) => ({
    project: {
      ...state.project,
      sections: state.project.sections.filter(s => s.id !== sectionId),
      updatedAt: Date.now()
    }
  })),

  addBlock: (sectionId, type) => set((state) => ({
    project: {
      ...state.project,
      sections: state.project.sections.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              blocks: [
                ...sec.blocks,
                {
                  id: uuid(),
                  type: type as BlockType,
                  content: getDefaultContent(type), // NUEVO
                  style: {
                    padding: 24,
                    borderRadius: 12,
                    backgroundColor: type === 'hero' ? '#eef2ff' : '#ffffff',
                    borderWidth: 1,
                    borderColor: '#e2e8f0',
                    textColor: '#0f172a',
                    textAlign: 'left',
                  },
                } as Block,
              ],
            }
          : sec
      ),
      updatedAt: Date.now()
    }
  })),

  updateBlock: (sectionId, blockId, updates) => set((state) => ({
    project: {
      ...state.project,
      sections: state.project.sections.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              blocks: sec.blocks.map((block) =>
                block.id === blockId ? { ...block, ...updates } : block
              ),
            }
          : sec
      ),
      updatedAt: Date.now()
    }
  })),

  deleteBlock: (sectionId, blockId) => set((state) => ({
    project: {
      ...state.project,
      sections: state.project.sections.map((sec) =>
        sec.id === sectionId
          ? { ...sec, blocks: sec.blocks.filter((b) => b.id !== blockId) }
          : sec
      ),
      updatedAt: Date.now()
    }
  })),

  duplicateBlock: (sectionId, blockId) => set((state) => ({
    project: {
      ...state.project,
      sections: state.project.sections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        const blockIndex = sec.blocks.findIndex((b) => b.id === blockId);
        if (blockIndex === -1) return sec;
        const blockToDuplicate = sec.blocks[blockIndex];
        const newBlock = { ...blockToDuplicate, id: uuid() };
        const newBlocks = [...sec.blocks];
        newBlocks.splice(blockIndex + 1, 0, newBlock);
        return { ...sec, blocks: newBlocks };
      }),
      updatedAt: Date.now()
    }
  })),

  moveBlock: (sectionId, blockId, direction) => set((state) => ({
    project: {
      ...state.project,
      sections: state.project.sections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        const blockIndex = sec.blocks.findIndex((b) => b.id === blockId);
        if (blockIndex === -1) return sec;
        
        const targetIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;
        if (targetIndex < 0 || targetIndex >= sec.blocks.length) return sec;
        
        const newBlocks = [...sec.blocks];
        [newBlocks[blockIndex], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[blockIndex]];
        return { ...sec, blocks: newBlocks };
      }),
      updatedAt: Date.now()
    }
  })),

  selectBlock: (blockId, sectionId) => set({
    selectedBlockId: blockId,
    selectedSectionId: sectionId,
  }),

  getSelectedBlock: () => {
    const state = get();
    if (!state.selectedBlockId || !state.selectedSectionId) return null;
    const section = state.project.sections.find((s) => s.id === state.selectedSectionId);
    if (!section) return null;
    return section.blocks.find((b) => b.id === state.selectedBlockId) || null;
  },

  saveProject: () => {
    const state = get();
    localStorage.setItem('flexichat-project', JSON.stringify(state.project));
  },

  loadProject: () => {
    const saved = localStorage.getItem('flexichat-project');
    if (saved) {
      try {
        const project = JSON.parse(saved);
        set({ project });
      } catch (e) {
        console.error('Error loading project:', e);
      }
    }
  },
}));

// Helper para contenido por defecto
function getDefaultContent(type: BlockType): Record<string, any> {
  switch (type) {
    case 'hero':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo descriptivo',
        ctaPrimary: 'Comenzar',
        ctaSecondary: 'Ver más'
      };
    case 'banner':
      return { text: 'Mensaje importante aquí' };
    case 'text':
      return {
        title: 'Título de sección',
        body: 'Escribe tu contenido aquí...'
      };
    case 'two-col':
      return {
        col1: { title: 'Columna 1', text: 'Contenido...' },
        col2: { title: 'Columna 2', text: 'Contenido...' }
      };
    case 'three-card':
      return {
        card1: { title: 'Tarjeta 1', text: 'Descripción' },
        card2: { title: 'Tarjeta 2', text: 'Descripción' },
        card3: { title: 'Tarjeta 3', text: 'Descripción' }
      };
    case 'product':
      return {
        title: 'Producto',
        description: 'Descripción del producto',
        price: 'Q 0'
      };
    case 'gallery':
      return { title: 'Galería', images: 6 };
    case 'contact':
      return { title: 'Contáctanos' };
    case 'image':
      return { imageUrl: '', caption: '' };
    case 'chat':
      return {
        title: 'Chat en vivo',
        welcomeMessage: '¡Hola! ¿En qué puedo ayudarte?',
        primaryColor: '#2563eb',
        agentAvatar: '👤',
        placeholder: 'Escribe un mensaje...'
      };
    default:
      return {};
  }
}

