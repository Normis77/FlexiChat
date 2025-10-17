/* src/components/Auth/PricingPlans.tsx */

import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../Common/Button';
import styles from './PricingPlans.module.css';

export const PricingPlans: React.FC = () => {
  const { selectPlan, user } = useAuthStore();
  const [processing, setProcessing] = useState(false);

  const handleSelectPlan = (plan: 'free' | 'basico' | 'profesional' | 'empresarial' | 'personalizado') => {
    if (plan === 'free') {
      selectPlan('free');
      localStorage.setItem('flexichat-plan-chosen', 'true');
    } else {
      setProcessing(true);
      // Simular proceso de pago
      setTimeout(() => {
        selectPlan('pro'); // Por ahora todos los de pago se marcan como 'pro'
        localStorage.setItem('flexichat-plan-chosen', 'true');
        localStorage.setItem('flexichat-plan-type', plan);
        setProcessing(false);
        alert(`¡Pago procesado! Bienvenido al plan ${plan.toUpperCase()} 🎉`);
      }, 2000);
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
          Soluciones flexibles para cada etapa de tu negocio
        </p>

        <div className={styles.plansGrid}>
          {/* Plan BÁSICO */}
          <div className={styles.plan}>
            <div className={styles.planHeader}>
              <h3>Básico</h3>
              <div className={styles.price}>
                <span className={styles.currency}>Q</span>
                <span className={styles.amount}>99</span>
                <span className={styles.period}>/mes</span>
              </div>
              <p className={styles.planDescription}>
                Ideal para emprendedores o pequeños negocios que inician su presencia digital
              </p>
            </div>

            <ul className={styles.features}>
              <li>
                <span className={styles.check}>✓</span>
                Chat en vivo para una página web
              </li>
              <li>
                <span className={styles.check}>✓</span>
                1 agente o administrador
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Personalización de colores y logotipo
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Hasta 100 conversaciones por 7 días
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Notificaciones por correo electrónico
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Incluye todo lo del plan Básico
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Hasta 5 agentes o usuarios
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Panel administrativo completo
              </li>
            </ul>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleSelectPlan('basico')}
              disabled={processing}
            >
              Comenzar con Básico
            </Button>
          </div>

          {/* Plan PROFESIONAL */}
          <div className={`${styles.plan} ${styles.planPro}`}>
            <div className={styles.badge}>Más Popular</div>
            
            <div className={styles.planHeader}>
              <h3>Profesional</h3>
              <div className={styles.price}>
                <span className={styles.currency}>Q</span>
                <span className={styles.amount}>249</span>
                <span className={styles.period}>/mes</span>
              </div>
              <p className={styles.planDescription}>
                Pymes con atención constante y varios empleados
              </p>
            </div>

            <ul className={styles.features}>
              <li>
                <span className={styles.check}>✓</span>
                Todo lo del plan Básico
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Hasta 5 agentes o usuarios
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Panel administrativo completo
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Historial de conversaciones ilimitado
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Integración con WhatsApp o Facebook
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Soporte prioritario por correo
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Incluye todo lo del plan Profesional
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Agentes ilimitados
              </li>
            </ul>

            <Button
              variant="primary"
              size="lg"
              onClick={() => handleSelectPlan('profesional')}
              disabled={processing}
            >
              {processing ? 'Procesando...' : 'Elegir Profesional'}
            </Button>
          </div>

          {/* Plan EMPRESARIAL */}
          <div className={styles.plan}>
            <div className={styles.planHeader}>
              <h3>Empresarial</h3>
              <div className={styles.price}>
                <span className={styles.currency}>Q</span>
                <span className={styles.amount}>499</span>
                <span className={styles.period}>/mes</span>
              </div>
              <p className={styles.planDescription}>
                Empresas con alto volumen de clientes o soporte permanente en línea
              </p>
            </div>

            <ul className={styles.features}>
              <li>
                <span className={styles.check}>✓</span>
                Todo lo del plan Profesional
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Agentes ilimitados
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Analítica avanzada de clientes
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Chatbot automatizado para preguntas frecuentes
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Integración con CRM o tiendas e-commerce
              </li>
              <li>
                <span className={styles.check}>✓</span>
                Soporte técnico 24/7
              </li>
            </ul>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleSelectPlan('empresarial')}
              disabled={processing}
            >
              Elegir Empresarial
            </Button>
          </div>

          {/* Plan PERSONALIZADO */}
          <div className={styles.plan}>
            <div className={styles.planSpecial}>
              <div className={styles.planHeader}>
                <h3>Personalizado (Premium)</h3>
                <div className={styles.price}>
                  <span className={styles.customPrice}>Desde Q800+</span>
                </div>
                <p className={styles.planDescription}>
                  Grandes empresas o instituciones con necesidades específicas
                </p>
              </div>

              <ul className={styles.features}>
                <li>
                  <span className={styles.check}>✓</span>
                  Soluciones a medida
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  Integración con APIs, CRM o inteligencia artificial
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  Soporte técnico y branding personalizado
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  Capacitación al personal y soporte dedicado
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  Análisis predictivo y reportes personalizados
                </li>
                <li>
                  <span className={styles.check}>✓</span>
                  SLA garantizado y prioridad máxima
                </li>
              </ul>

              <Button
                variant="primary"
                size="lg"
                onClick={() => alert('Por favor contáctanos en ventas@flexichat.com para un plan personalizado')}
              >
                Contactar Ventas
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.faq}>
          <h3>¿Preguntas frecuentes?</h3>
          <div className={styles.faqItem}>
            <strong>¿Puedo cambiar de plan después?</strong>
            <p>Sí, puedes actualizar o cambiar tu plan en cualquier momento desde tu perfil.</p>
          </div>
          <div className={styles.faqItem}>
            <strong>¿Todos los planes incluyen soporte?</strong>
            <p>Sí, todos los planes incluyen soporte. La diferencia está en el nivel de prioridad y disponibilidad.</p>
          </div>
          <div className={styles.faqItem}>
            <strong>¿Qué formas de pago aceptan?</strong>
            <p>Aceptamos tarjetas de crédito/débito y transferencias bancarias.</p>
          </div>
        </div>
      </div>
    </div>
  );
};