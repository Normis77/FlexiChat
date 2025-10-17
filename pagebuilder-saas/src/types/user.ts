/* src/types/user.ts */

export type PlanType = 'free' | 'pro';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: PlanType;
  createdAt: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

/* src/types/project.ts - ACTUALIZADO */

import type { Section } from './block';

export interface ChatConfig {
  enabled: boolean;
  position: 'bottom-right' | 'bottom-left';
  title: string;
  primaryColor: string;
  welcomeMessage: string;
  placeholder: string;
  agentName: string;
  agentAvatar: string;
  buttonText: string;
  autoOpen: boolean;
  autoOpenDelay: number;
}

export interface Project {
  id: string;
  title: string;
  sections: Section[];
  theme: {
    primaryColor: string;
    fontFamily: string;
  };
  chatConfig: ChatConfig;
  createdAt: number;
  updatedAt: number;
}