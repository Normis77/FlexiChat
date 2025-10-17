/* src/components/Help/UserManual.tsx */

import React from 'react';
import { Button } from '../Common/Button';
import styles from './UserManual.module.css';

interface Props {
  onClose: () => void;
}

export const UserManual: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h1>📖 Manual de Usuario - FlexiChat</h1>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.content}>
          {/* Introducción */}
          <section className={styles.section}>
            <h2>🎯 Bienvenido a FlexiChat</h2>
            <p>
              FlexiChat es una plataforma que te permite crear páginas web profesionales 
              con un sistema de chat integrado. Perfecto para negocios que necesitan 
              comunicación directa con sus clientes.
            </p>
          </section>

          {/* Primeros Pasos */}
          <section className={styles.section}>
            <h2>🚀 Primeros Pasos</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <div>
                  <h3>Registro e Inicio de Sesión</h3>
                  <p>Crea tu cuenta con email y contraseña. Una vez registrado, elige tu plan.</p>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <div>
                  <h3>Selecciona tu Plan</h3>
                  <p>Elige entre nuestros 4 planes según tus necesidades: Básico, Profesional, Empresarial o Personalizado.</p>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <div>
                  <h3>Crea tu Primera Página</h3>
                  <p>Usa el editor visual para diseñar tu página arrastrando y soltando bloques.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Editor de Páginas */}
          <section className={styles.section}>
            <h2>🎨 Editor de Páginas</h2>
            <div className={styles.feature}>
              <h3>Panel Izquierdo - Bloques</h3>
              <ul>
                <li><strong>Hero:</strong> Sección principal con título y llamada a la acción</li>
                <li><strong>Servicios:</strong> Muestra tus servicios en tarjetas</li>
                <li><strong>Galería:</strong> Exhibe imágenes de tu trabajo</li>
                <li><strong>Testimonios:</strong> Opiniones de clientes</li>
                <li><strong>Contacto:</strong> Formulario e información de contacto</li>
                <li><strong>FAQ:</strong> Preguntas frecuentes</li>
              </ul>
              <p className={styles.tip}>💡 <strong>Tip:</strong> Arrastra los bloques desde el panel izquierdo hacia el centro para agregarlos a tu página.</p>
            </div>

            <div className={styles.feature}>
              <h3>Panel Central - Canvas</h3>
              <p>Aquí verás tu página en construcción. Puedes:</p>
              <ul>
                <li>Reordenar bloques arrastrándolos</li>
                <li>Hacer clic en cualquier bloque para seleccionarlo</li>
                <li>Ver una vista previa en tiempo real</li>
              </ul>
            </div>

            <div className={styles.feature}>
              <h3>Panel Derecho - Inspector</h3>
              <p>Cuando seleccionas un bloque, aquí puedes:</p>
              <ul>
                <li>Editar textos y títulos</li>
                <li>Cambiar colores y estilos</li>
                <li>Agregar imágenes y enlaces</li>
                <li>Eliminar bloques</li>
              </ul>
            </div>
          </section>

          {/* Plantillas */}
          <section className={styles.section}>
            <h2>📚 Plantillas Prediseñadas</h2>
            <p>Ahorra tiempo usando nuestras plantillas profesionales:</p>
            <div className={styles.templates}>
              <div className={styles.template}>
                <h4>🏥 Consultorio Médico</h4>
                <p>Ideal para doctores, dentistas y clínicas</p>
              </div>
              <div className={styles.template}>
                <h4>🍴 Restaurante</h4>
                <p>Perfecta para restaurantes y cafeterías</p>
              </div>
              <div className={styles.template}>
                <h4>🏨 Hotel</h4>
                <p>Diseñada para hoteles y hospedajes</p>
              </div>
              <div className={styles.template}>
                <h4>🛍️ E-commerce</h4>
                <p>Para tiendas en línea y catálogos</p>
              </div>
            </div>
            <p className={styles.tip}>💡 <strong>Tip:</strong> Haz clic en "Plantillas" en la barra superior para ver todas las opciones.</p>
          </section>

          {/* Chat Integrado */}
          <section className={styles.section}>
            <h2>💬 Sistema de Chat</h2>
            <div className={styles.feature}>
              <h3>Características del Chat</h3>
              <ul>
                <li><strong>Automático:</strong> Se integra automáticamente en tu página</li>
                <li><strong>Personalizable:</strong> Ajusta colores y mensajes de bienvenida</li>
                <li><strong>Notificaciones:</strong> Recibe alertas de nuevos mensajes</li>
                <li><strong>Historial:</strong> Guarda conversaciones anteriores</li>
              </ul>
            </div>

            <div className={styles.feature}>
              <h3>Cómo usar el chat</h3>
              <ol>
                <li>El chat aparece en la esquina inferior derecha</li>
                <li>Los visitantes pueden iniciar conversaciones</li>
                <li>Recibirás notificaciones de nuevos mensajes</li>
                <li>Puedes responder desde el panel de administración</li>
              </ol>
            </div>
          </section>

          {/* Publicación */}
          <section className={styles.section}>
            <h2>🚀 Publicar tu Página</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <div>
                  <h3>Guardar Proyecto</h3>
                  <p>Haz clic en "💾 Guardar" para asegurar tus cambios</p>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <div>
                  <h3>Vista Previa</h3>
                  <p>Usa "👁️ Vista previa" para ver cómo se verá tu página</p>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <div>
                  <h3>Exportar o Publicar</h3>
                  <p>
                    <strong>Exportar HTML:</strong> Descarga tu página para subirla a tu servidor<br/>
                    <strong>Publicar:</strong> Obtén un enlace directo a tu página
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Atajos */}
          <section className={styles.section}>
            <h2>⌨️ Atajos Útiles</h2>
            <div className={styles.shortcuts}>
              <div className={styles.shortcut}>
                <kbd>Ctrl</kbd> + <kbd>S</kbd>
                <span>Guardar proyecto</span>
              </div>
              <div className={styles.shortcut}>
                <kbd>Ctrl</kbd> + <kbd>Z</kbd>
                <span>Deshacer</span>
              </div>
              <div className={styles.shortcut}>
                <kbd>Delete</kbd>
                <span>Eliminar bloque seleccionado</span>
              </div>
            </div>
          </section>

          {/* Consejos */}
          <section className={styles.section}>
            <h2>💡 Consejos y Mejores Prácticas</h2>
            <div className={styles.tips}>
              <div className={styles.tipCard}>
                <h4>📱 Diseño Responsivo</h4>
                <p>Tu página se adapta automáticamente a móviles y tablets</p>
              </div>
              <div className={styles.tipCard}>
                <h4>🎨 Consistencia Visual</h4>
                <p>Mantén colores y estilos consistentes en toda tu página</p>
              </div>
              <div className={styles.tipCard}>
                <h4>📝 Contenido Claro</h4>
                <p>Usa títulos descriptivos y textos concisos</p>
              </div>
              <div className={styles.tipCard}>
                <h4>🖼️ Imágenes Optimizadas</h4>
                <p>Usa imágenes de buena calidad pero optimizadas para web</p>
              </div>
            </div>
          </section>

          {/* Soporte */}
          <section className={styles.section}>
            <h2>🆘 ¿Necesitas Ayuda?</h2>
            <div className={styles.support}>
              <div className={styles.supportCard}>
                <h3>📧 Soporte por Email</h3>
                <p>soporte@flexichat.com</p>
                <p className={styles.muted}>Respuesta en 24-48 horas</p>
              </div>
              <div className={styles.supportCard}>
                <h3>💬 Chat en Vivo</h3>
                <p>Usa el chat en la esquina inferior</p>
                <p className={styles.muted}>Lun-Vie 9:00-18:00</p>
              </div>
              <div className={styles.supportCard}>
                <h3>📞 Teléfono</h3>
                <p>+502 1234-5678</p>
                <p className={styles.muted}>Para planes Empresarial y Personalizado</p>
              </div>
            </div>
          </section>

          {/* Footer del Manual */}
          <div className={styles.footer}>
            <p>© 2024 FlexiChat - Manual de Usuario v1.0</p>
            <Button variant="primary" size="lg" onClick={onClose}>
              Cerrar Manual
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};