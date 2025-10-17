/*/src/services/blockTemplates.ts*/

import type { Block } from '../types/block';

export const BLOCK_TEMPLATES: Record<string, Partial<Block>> = {
  hero: {
    type: 'hero',
    content: {
      title: 'Atención remota moderna',
      subtitle: 'Comunicación privada y segura',
    },
    style: {
      padding: 48,
      borderRadius: 16,
      backgroundColor: '#eef2ff',
      borderWidth: 0,
    },
  },
  text: {
    type: 'text',
    content: {
      title: 'Título de sección',
      body: 'Texto descriptivo',
    },
  },
  contact: {
    type: 'contact',
    content: {
      title: 'Contáctanos',
      fields: ['nombre', 'email', 'mensaje'],
    },
  },
};