/* src/components/Editor/TemplateSelector.tsx - ACTUALIZADO */

import React from 'react';
import { useEditorStore } from '../../stores/editorStore';
import { Button } from '../Common/Button';
import styles from './TemplateSelector.module.css';
import { v4 as uuid } from 'uuid';
import type { Project } from '../../types/user';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  blocks: Array<{ type: string; content: any }>;
}

const TEMPLATES: Template[] = [
  {
    id: 'restaurant',
    name: 'Restaurante',
    description: 'Menú, galería de platos y reservas',
    icon: '🍽️',
    color: '#dc2626',
    blocks: [
      { type: 'hero', content: { title: 'Restaurante Gourmet', subtitle: 'Experiencia culinaria única', ctaPrimary: 'Ver Menú', ctaSecondary: 'Reservar' } },
      { type: 'text', content: { title: 'Nuestra Historia', body: 'Más de 20 años deleitando paladares con los mejores ingredientes locales.' } },
      { type: 'three-card', content: { 
        card1: { title: 'Desayunos', text: 'Comienza tu día con energía' },
        card2: { title: 'Almuerzos', text: 'Platos ejecutivos diarios' },
        card3: { title: 'Cenas', text: 'Ambiente romántico' }
      }},
      { type: 'gallery', content: { title: 'Nuestros Platillos', images: 6 } },
      { type: 'contact', content: { title: 'Reservas' } }
    ]
  },
  {
    id: 'clinic',
    name: 'Consultorio Médico',
    description: 'Servicios médicos y citas en línea',
    icon: '🏥',
    color: '#059669',
    blocks: [
      { type: 'banner', content: { text: '✨ Consultas en línea disponibles - Agenda ahora' } },
      { 
        type: 'hero', 
        content: { 
          title: 'Sanatorio', 
          subtitle: 'Liderando la innovación para alcanzar tu salud', 
          ctaPrimary: 'Haz tu consulta', 
          ctaSecondary: 'Servicios' 
        } 
      },
      { 
        type: 'banner', 
        content: { 
          text: 'Nuestro compromiso: tu bienestar — atención integral, personalizada y de alta calidad.' 
        } 
      },
      { 
        type: 'text', 
        content: { 
          title: 'Servicios principales', 
          body: 'Explora nuestras especialidades' 
        } 
      },
      { type: 'three-card', content: { 
        card1: { title: 'Cardiología', text: 'Diagnóstico y tratamiento del corazón' },
        card2: { title: 'Neurología', text: 'Sistema nervioso y cerebro' },
        card3: { title: 'Pediatría', text: 'Cuidado integral para niños' }
      }},
      { type: 'three-card', content: { 
        card1: { title: 'Traumatología', text: 'Huesos y articulaciones' },
        card2: { title: 'Laboratorio', text: 'Análisis clínicos confiables' },
        card3: { title: 'Imagenología', text: 'Rayos X, TAC, RM y más' }
      }},
      { type: 'contact', content: { title: 'Contacto' } }
    ]
  },
  {
    id: 'hotel',
    name: 'Hotel',
    description: 'Reservas y servicios turísticos',
    icon: '🏨',
    color: '#2563eb',
    blocks: [
      { type: 'hero', content: { title: 'Hotel Boutique Paradise', subtitle: 'Tu escape perfecto te espera', ctaPrimary: 'Reservar Ahora', ctaSecondary: 'Ver Habitaciones' } },
      { type: 'two-col', content: { 
        col1: { title: 'Habitaciones de Lujo', text: 'Comodidad y elegancia en cada detalle. WiFi gratuito, TV por cable y más.' },
        col2: { title: 'Servicios Premium', text: 'Desayuno incluido, piscina, spa, gimnasio y restaurante gourmet.' }
      }},
      { type: 'gallery', content: { title: 'Nuestras Instalaciones', images: 6 } },
      { type: 'three-card', content: { 
        card1: { title: 'Habitación Estándar', text: 'Desde Q450/noche' },
        card2: { title: 'Suite Ejecutiva', text: 'Desde Q750/noche' },
        card3: { title: 'Suite Premium', text: 'Desde Q1,200/noche' }
      }},
      { type: 'contact', content: { title: 'Reservaciones' } }
    ]
  },
  {
    id: 'ecommerce',
    name: 'Tienda Online',
    description: 'Productos y catálogo digital',
    icon: '🛍️',
    color: '#7c3aed',
    blocks: [
      { type: 'hero', content: { title: 'Tu Tienda Favorita', subtitle: 'Productos de calidad al mejor precio', ctaPrimary: 'Ver Catálogo', ctaSecondary: 'Ofertas' } },
      { type: 'banner', content: { text: '🎉 Envío GRATIS en compras mayores a Q200' } },
      { type: 'three-card', content: { 
        card1: { title: 'Ropa', text: 'Las últimas tendencias' },
        card2: { title: 'Accesorios', text: 'Complementa tu estilo' },
        card3: { title: 'Calzado', text: 'Comodidad y diseño' }
      }},
      { type: 'product', content: { title: 'Producto Destacado', description: 'Alta calidad y diseño único', price: 'Q299' } },
      { type: 'gallery', content: { title: 'Catálogo', images: 6 } },
      { type: 'contact', content: { title: 'Contáctanos' } }
    ]
  }
];

interface TemplateSelectorProps {
  onClose: () => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onClose }) => {
  const { project, replaceProject } = useEditorStore();

  const applyTemplate = (template: Template) => {
    // Crear sección con todos los bloques
    const newSection = {
      id: uuid(),
      blocks: template.blocks.map((blockTemplate: any) => ({
        id: uuid(),
        type: blockTemplate.type,
        content: blockTemplate.content,
        style: {
          padding: 24,
          borderRadius: 12,
          backgroundColor: blockTemplate.type === 'hero' ? '#eef2ff' : '#ffffff',
          borderWidth: 1,
          borderColor: '#e2e8f0',
          textColor: '#0f172a',
          textAlign: 'left' as const
        }
      }))
    };

    // Crear proyecto completo nuevo
    const newProject: Project = {
      ...project,
      id: uuid(),
      title: template.name,
      sections: [newSection],
      theme: { 
        ...project.theme, 
        primaryColor: template.color 
      },
      chatConfig: {
        ...project.chatConfig,
        primaryColor: template.color,
        title: `Chat ${template.name}`,
        welcomeMessage: `¡Hola! ¿Cómo podemos ayudarte con ${template.name}?`
      },
      updatedAt: Date.now()
    };

    // Aplicar con replaceProject
    replaceProject(newProject);
    
    onClose();
    
    // Forzar recarga después de cerrar el modal
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>📚 Plantillas Profesionales</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <p className={styles.description}>
          Comienza con una plantilla diseñada profesionalmente y personalízala a tu gusto
        </p>

        <div className={styles.templates}>
          {TEMPLATES.map((template) => (
            <div key={template.id} className={styles.template}>
              <div className={styles.templateIcon} style={{ background: template.color }}>
                {template.icon}
              </div>
              <div className={styles.templateInfo}>
                <h3>{template.name}</h3>
                <p>{template.description}</p>
                <div className={styles.blocks}>
                  {template.blocks.length} bloques incluidos
                </div>
              </div>
              <Button
                variant="primary"
                size="md"
                onClick={() => applyTemplate(template)}
              >
                Usar plantilla
              </Button>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.footerIcon}>💡</div>
          <div>
            <strong>Todas las plantillas son 100% personalizables</strong>
            <p>Puedes editar textos, colores, imágenes y añadir más bloques después de aplicar la plantilla.</p>
          </div>
        </div>
      </div>
    </div>
  );
};