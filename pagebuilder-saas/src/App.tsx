/* src/App.tsx */

import React, { useState } from 'react';
import { useAuthStore } from './stores/authStore';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { PricingPlans } from './components/Auth/PricingPlans';
import { PageBuilder } from './components/Editor/PageBuilder';
import { ChatWidget } from './components/Chat/ChatWidget';
import './App.css';

type AuthView = 'login' | 'register';

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const [authView, setAuthView] = useState<AuthView>('login');

  // Si no está autenticado, mostrar login/register
  if (!isAuthenticated) {
    return authView === 'login' ? (
      <Login onSwitchToRegister={() => setAuthView('register')} />
    ) : (
      <Register onSwitchToLogin={() => setAuthView('login')} />
    );
  }

  // Si está autenticado pero no ha elegido plan, mostrar pricing
  if (!user?.plan || user.plan === 'free') {
    // Permitir que usuarios gratis también accedan al builder después de elegir
    const hasChosenPlan = localStorage.getItem('flexichat-plan-chosen');
    
    if (!hasChosenPlan) {
      return <PricingPlans />;
    }
  }

  // Usuario autenticado con plan elegido - mostrar el builder
  return (
    <div className="app">
      <PageBuilder />
      <ChatWidget />
    </div>
  );
}

export default App;