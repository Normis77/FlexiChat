/* src/components/Auth/PricingPlans.tsx */

import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../Common/Button';
import styles from './PricingPlans.module.css';

export const PricingPlans: React.FC = () => {
  const { selectPlan, user } = useAuthStore();
  const [processing, setProcessing] = useState(false);

  const handleSelectPlan = (plan: 'free' | 'pro') => {
    if (plan === 'pro') {
      setProcessing(true);
      // Simular proceso de pago
      setTimeout(() => {
        selectPlan('pro');
        localStorage.setItem('flexichat-plan-chosen', 'true');
        setProcessing(false);
        alert('¡Pago procesado! Bienvenido al plan PRO 🎉');
      }, 2000);
    } else {
      selectPlan('free');
      localStorage.setItem('flexichat-plan-chosen', 'true');
    }
  };

  return (
    <div className={styles.pricingContainer}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>FC</div>
          <h1>FlexiChat</h1>
        </div>
        <p className={styles.greeting}>¡Bienvenido, {user?.name}!</p>
      </div>

      <div className={styles.content}>
        <h2>Elige tu plan</h2>
        <p className={styles.subtitle}>
          Comienza gratis o desbloquea todas las funcionalidades con PRO
        </p>

        <div className={styles.plans}>
          {/* Plan FREE */}
          <div className={styles.plan}>
            <div className={styles.planHeader}>
              <h3>Gratis</h3>
              <div className={styles.price}>
                <span className={styles.currency}>Q</span>
                <span className={styles.amount}>0</span>
                <span className={styles.period}>/mes</span>
              </div>
            </div>

            <ul className={styles.features}>
              <li>
                <span className={styles.check}>✓</span>
                1 página personalizada
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Chat integrado básico
              </li>
              <li>
                <span className={styles.check}>✓</span>
                5 bloques prediseñados
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Exportar HTML
              </li>
              <li>
                <span className={styles.cross}>✗</span>
                Sin dominio personalizado
              </li>
              <li>
                <span className={styles.cross}>✗</span>
                Marca "Powered by FlexiChat"
              </li>
            </ul>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleSelectPlan('free')}
            >
              Comenzar gratis
            </Button>
          </div>

          {/* Plan PRO */}
          <div className={`${styles.plan} ${styles.planPro}`}>
            <div className={styles.badge}>Recomendado</div>
            
            <div className={styles.planHeader}>
              <h3>PRO</h3>
              <div className={styles.price}>
                <span className={styles.currency}>Q</span>
                <span className={styles.amount}>99</span>
                <span className={styles.period}>/mes</span>
              </div>
            </div>

            <ul className={styles.features}>
              <li>
                <span className={styles.check}>✓</span>
                Páginas ilimitadas
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Chat avanzado con notificaciones
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Todos los bloques y plantillas
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Dominio personalizado
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Sin marca de FlexiChat
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Analíticas avanzadas
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Soporte prioritario
              </li>
            </ul>

            <Button
              variant="primary"
              size="lg"
              onClick={() => handleSelectPlan('pro')}
              disabled={processing}
            >
              {processing ? 'Procesando pago...' : 'Comenzar con PRO'}
            </Button>
          </div>
        </div>

        <div className={styles.faq}>
          <h3>¿Preguntas frecuentes?</h3>
          <div className={styles.faqItem}>
            <strong>¿Puedo cambiar de plan después?</strong>
            <p>Sí, puedes actualizar o degradar tu plan en cualquier momento desde tu perfil.</p>
          </div>
          <div className={styles.faqItem}>
            <strong>¿El plan gratis tiene límite de tiempo?</strong>
            <p>No, puedes usar el plan gratis todo el tiempo que necesites sin restricciones de tiempo.</p>
          </div>
        </div>
      </div>
    </div>
  );
};