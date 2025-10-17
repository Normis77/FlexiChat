/* src/stores/authStore.ts */

import { create } from 'zustand';
import type { User, PlanType } from '../types/user';
import { v4 as uuid } from 'uuid';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  selectPlan: (plan: PlanType) => void;
}

// Nota: Si necesitas persistencia, instala: npm install zustand
// Y descomenta las líneas con persist
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: (email, password) => {
    // Simulación de login
    if (password.length >= 6) {
      const user: User = {
        id: uuid(),
        email,
        name: email.split('@')[0],
        plan: 'free',
        createdAt: Date.now(),
      };
      set({ user, isAuthenticated: true });
      // Guardar en localStorage manualmente
      localStorage.setItem('flexichat-auth', JSON.stringify({ user, isAuthenticated: true }));
      return true;
    }
    return false;
  },

  register: (email, password, name) => {
    // Simulación de registro
    if (email.includes('@') && password.length >= 6 && name.length >= 2) {
      const user: User = {
        id: uuid(),
        email,
        name,
        plan: 'free',
        createdAt: Date.now(),
      };
      set({ user, isAuthenticated: true });
      // Guardar en localStorage manualmente
      localStorage.setItem('flexichat-auth', JSON.stringify({ user, isAuthenticated: true }));
      return true;
    }
    return false;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('flexichat-auth');
    localStorage.removeItem('flexichat-plan-chosen');
  },

  selectPlan: (plan) => {
    const user = get().user;
    if (user) {
      const updatedUser = { ...user, plan };
      set({ user: updatedUser });
      // Actualizar en localStorage
      localStorage.setItem('flexichat-auth', JSON.stringify({ user: updatedUser, isAuthenticated: true }));
    }
  },
}));

// Restaurar estado desde localStorage al cargar la app
const savedAuth = localStorage.getItem('flexichat-auth');
if (savedAuth) {
  try {
    const parsed = JSON.parse(savedAuth);
    useAuthStore.setState(parsed);
  } catch (e) {
    console.error('Error al restaurar auth:', e);
  }
}