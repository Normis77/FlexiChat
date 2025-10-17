/* src/components/Auth/Register.tsx */

import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Input } from '../Common/Input';
import { Button } from '../Common/Button';
import styles from './Auth.module.css';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const success = register(email, password, name);
    if (!success) {
      setError('Verifica que el email sea válido y la contraseña tenga al menos 6 caracteres');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>FC</div>
          <h1>FlexiChat</h1>
        </div>
        
        <h2>Crear cuenta</h2>
        <p className={styles.subtitle}>
          Comienza a crear páginas con chat integrado en minutos
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            label="Nombre completo"
            placeholder="Tu nombre"
            value={name}
            onChange={setName}
          />

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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={setPassword}
          />

          {error && <div className={styles.error}>{error}</div>}

          <Button type="submit" variant="primary" size="lg">
            Crear cuenta gratis
          </Button>
        </form>

        <div className={styles.divider}>
          <span>o</span>
        </div>

        <p className={styles.switchText}>
          ¿Ya tienes cuenta?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className={styles.switchLink}
          >
            Inicia sesión
          </button>
        </p>

        <p className={styles.terms}>
          Al crear una cuenta, aceptas nuestros términos de servicio y política de privacidad
        </p>
      </div>
    </div>
  );
};