import React from 'react';
import styles from './LandingPage.module.css';

interface Props {
  onGetStarted: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<Props> = ({ onGetStarted, onLogin }) => {
  return (
    <div className={styles.landing}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>💬</div>
            <span className={styles.logoText}>FlexiChat</span>
          </div>
          <nav className={styles.nav}>
            <a href="#features">Características</a>
            <a href="#pricing">Precios</a>
            <a href="#about">Nosotros</a>
            <button className={styles.loginBtn} onClick={onLogin}>
              Iniciar Sesión
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Crea tu página web con
              <span className={styles.gradient}> chat integrado</span>
            </h1>
            <p className={styles.heroSubtitle}>
              FlexiChat te permite diseñar páginas profesionales con un sistema de chat 
              tipo WhatsApp incluido. Perfecto para consultorios, hoteles, restaurantes y más.
            </p>
            <div className={styles.heroCta}>
              <button className={styles.ctaPrimary} onClick={onGetStarted}>
                Comenzar Gratis
              </button>
              <button className={styles.ctaSecondary}>
                Ver Demo 🎥
              </button>
            </div>
            <p className={styles.heroNote}>
              ✨ No se requiere tarjeta de crédito • Plan gratuito disponible
            </p>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.mockup}>
              <div className={styles.mockupScreen}>
                <div className={styles.mockupHeader}>Tu Consultorio</div>
                <div className={styles.mockupContent}>
                  <div className={styles.mockupBlock}>Hero</div>
                  <div className={styles.mockupBlock}>Servicios</div>
                  <div className={styles.mockupBlock}>Contacto</div>
                </div>
                <div className={styles.chatBubble}>
                  💬
                  <span className={styles.chatBadge}>3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>¿Por qué FlexiChat?</h2>
          <p className={styles.sectionSubtitle}>
            Todo lo que necesitas para conectar con tus clientes
          </p>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎨</div>
              <h3>Editor Visual</h3>
              <p>Arrastra y suelta bloques para crear tu página sin código</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3>Chat Integrado</h3>
              <p>Sistema de mensajería en tiempo real tipo WhatsApp</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3>100% Responsive</h3>
              <p>Tu página se ve perfecta en móviles, tablets y desktop</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Súper Rápido</h3>
              <p>Carga instantánea y rendimiento optimizado</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>Seguro</h3>
              <p>Comunicación privada y encriptada con tus clientes</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3>Plantillas Pro</h3>
              <p>Diseños predefinidos para consultorios, hoteles y más</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className={styles.useCases}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Perfecto para tu negocio</h2>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseEmoji}>🏥</div>
              <h3>Consultorios Médicos</h3>
              <p>Consultas en línea con chat privado doctor-paciente</p>
            </div>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseEmoji}>🏨</div>
              <h3>Hoteles</h3>
              <p>Reservas y atención al cliente en tiempo real</p>
            </div>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseEmoji}>🍽️</div>
              <h3>Restaurantes</h3>
              <p>Pedidos y consultas directas con el chef</p>
            </div>
            <div className={styles.useCaseCard}>
              <div className={styles.useCaseEmoji}>💼</div>
              <h3>Freelancers</h3>
              <p>Portfolio con canal directo de comunicación</p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className={styles.examples}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>🎨 Ejemplos Reales</h2>
          <p className={styles.sectionSubtitle}>
            Páginas creadas con FlexiChat en producción
          </p>
          <div className={styles.exampleGrid}>
            <div className={styles.exampleCard}>
              <div className={styles.exampleImage}>
                <div className={styles.browser}>
                  <div className={styles.browserHeader}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={styles.browserContent} style={{ background: '#f0fdf4' }}>
                    <div className={styles.mockHeader}>Sanatorio</div>
                    <div className={styles.mockBody}>
                      <div style={{ background: '#dcfce7', height: '40px', borderRadius: '8px', marginBottom: '8px' }}></div>
                      <div style={{ background: '#bbf7d0', height: '60px', borderRadius: '8px', marginBottom: '8px' }}></div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                        <div style={{ background: '#86efac', height: '40px', borderRadius: '8px' }}></div>
                        <div style={{ background: '#86efac', height: '40px', borderRadius: '8px' }}></div>
                        <div style={{ background: '#86efac', height: '40px', borderRadius: '8px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.exampleInfo}>
                <h3>🏥 Consultorio Médico</h3>
                <p>Sistema completo de citas con chat integrado para consultas</p>
                <a 
                  href="http://peregrinoprueba.s3-website.us-east-2.amazonaws.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.exampleLink}
                >
                  Ver demo en vivo →
                </a>
              </div>
            </div>

            <div className={styles.exampleCard}>
              <div className={styles.exampleImage}>
                <div className={styles.browser}>
                  <div className={styles.browserHeader}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className={styles.browserContent} style={{ background: '#fef2f2' }}>
                    <div className={styles.mockHeader}>Restaurante</div>
                    <div className={styles.mockBody}>
                      <div style={{ background: '#fecaca', height: '60px', borderRadius: '8px', marginBottom: '8px' }}></div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        <div style={{ background: '#fca5a5', height: '50px', borderRadius: '8px' }}></div>
                        <div style={{ background: '#fca5a5', height: '50px', borderRadius: '8px' }}></div>
                        <div style={{ background: '#fca5a5', height: '50px', borderRadius: '8px' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.exampleInfo}>
                <h3>🍽️ Restaurante Gourmet</h3>
                <p>Menú digital, reservas y pedidos online con WhatsApp integrado</p>
                <button 
                  className={styles.exampleLink}
                  onClick={onGetStarted}
                >
                  Crear mi restaurante →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a cientos de negocios que ya usan FlexiChat</p>
          <button className={styles.ctaPrimary} onClick={onGetStarted}>
            Crear mi página gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.logo}>
                <div className={styles.logoIcon}>💬</div>
                <span className={styles.logoText}>FlexiChat</span>
              </div>
              <p>Crea páginas profesionales con chat integrado</p>
            </div>
            <div className={styles.footerLinks}>
              <div>
                <h4>Producto</h4>
                <a href="#features">Características</a>
                <a href="#pricing">Precios</a>
                <a href="#">Plantillas</a>
              </div>
              <div>
                <h4>Soporte</h4>
                <a href="#">Documentación</a>
                <a href="#">Ayuda</a>
                <a href="#">Contacto</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© 2025 FlexiChat. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};