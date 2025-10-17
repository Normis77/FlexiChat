/* src/components/Auth/Login.tsx */

import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Input } from '../Common/Input';
import { Button } from '../Common/Button';
import styles from './Auth.module.css';

interface LoginProps {
  onSwitchToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const success = login(email, password);
    if (!success) {
      setError('La contraseña debe tener al menos 6 caracteres');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>FC</div>
          <h1>FlexiChat</h1>
        </div>
        
        <h2>Iniciar sesión</h2>
        <p className={styles.subtitle}>
          Accede a tu constructor de páginas con chat integrado
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="email"
            label="Correo electrónico"
            placeholder="tu@email.com"
            value={email}
            onChange={setEmail}
          />
          
          <Input
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
          />

          {error && <div className={styles.error}>{error}</div>}

          <Button type="submit" variant="primary" size="lg">
            Iniciar sesión
          </Button>
        </form>

        <div className={styles.divider}>
          <span>o</span>
        </div>

        <p className={styles.switchText}>
          ¿No tienes cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className={styles.switchLink}
          >
            Regístrate gratis
          </button>
        </p>
      </div>
    </div>
  );
};