/*src/types/project.ts */

import type { Section } from './block';
import type { ChatConfig } from './chat';

export interface Project {
  id: string;
  title: string;
  sections: Section[];
  theme: {
    primaryColor: string;
  };
  chatConfig: ChatConfig;
  createdAt: number;
  updatedAt: number;
}