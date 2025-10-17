/* src/components/Editor/PageBuilder.tsx */

import React, { useEffect, useState } from 'react';
import { useEditorStore } from '../../stores/editorStore';
import { useAuthStore } from '../../stores/authStore';
import { ExportService } from '../../services/exportService';
import { Button } from '../Common/Button';
import { BlockPalette } from './BlockPalette';
import { Canvas } from './Canvas';
import { Inspector } from './Inspector';
import { TemplateSelector } from './TemplateSelector';
import styles from './PageBuilder.module.css';

export const PageBuilder: React.FC = () => {
  const { project, addSection, saveProject, updateProjectTitle, loadProject } = useEditorStore();
  const { user, logout } = useAuthStore();
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');

  // Cargar proyecto al montar
  useEffect(() => {
    loadProject();
  }, [loadProject]);

  useEffect(() => {
    if (project.sections.length === 0) {
      addSection();
    }
  }, [project.sections.length, addSection]);

 

  const handleExport = () => {
    const html = ExportService.generateHTML(project);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s/g, '-')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePublish = () => {
    setShowPublishModal(true);
  };

  const handleConfirmPublish = () => {
    if (projectUrl.trim()) {
      setPublishedUrl(projectUrl);
      alert(`✅ ¡Página publicada exitosamente!\n\nTu página está disponible en:\n${projectUrl}\n\nEl chat FlexiChat está integrado y funcionando.`);
      setShowPublishModal(false);
      setProjectUrl('');
    }
  };

  const handleSave = () => {
    saveProject();
    alert('✅ Proyecto guardado');
  };

  const handlePreview = () => {
    const html = ExportService.generateHTML(project);
    const preview = window.open();
    if (preview) {
      preview.document.write(html);
      preview.document.close();
    }
  };

  return (
    <div className={styles.builder}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div className={styles.logo}>FC</div>
          <div>
            <input
              type="text"
              value={project.title}
              onChange={(e) => updateProjectTitle(e.target.value)}
              className={styles.titleInput}
              placeholder="Nombre del proyecto"
            />
            <p>Constructor de páginas con chat integrado</p>
          </div>
        </div>

        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user?.name}</div>
            <div className={styles.userPlan}>
              Plan: <span className={user?.plan === 'pro' ? styles.proBadge : styles.freeBadge}>
                {user?.plan?.toUpperCase()}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <Button variant="secondary" size="md" onClick={() => setShowTemplates(true)}>
              📚 Plantillas
            </Button>
            <Button variant="secondary" size="md" onClick={handlePreview}>
              👁️ Vista previa
            </Button>
            <Button variant="secondary" size="md" onClick={handleSave}>
              💾 Guardar
            </Button>
            <Button variant="secondary" size="md" onClick={handleExport}>
              ⬇️ Exportar HTML
            </Button>
            <Button variant="primary" size="md" onClick={handlePublish}>
              🚀 Publicar
            </Button>
            <Button variant="ghost" size="md" onClick={logout}>
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className={styles.workspace}>
        {project.sections.length > 0 && (
          <>
            <BlockPalette sectionId={project.sections[0].id} />
            <Canvas />
            <Inspector />
          </>
        )}
      </div>

      {/* Modal de plantillas */}
      {showTemplates && (
        <TemplateSelector onClose={() => setShowTemplates(false)} />
      )}

      {/* Modal de publicación */}
      {showPublishModal && (
        <div className={styles.modalOverlay} onClick={() => setShowPublishModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>🚀 Publicar tu página</h2>
            <p className={styles.modalDescription}>
              Ingresa la URL de tu página web. FlexiChat integrará automáticamente el chat en tu sitio.
            </p>
            
            <div className={styles.urlInputWrapper}>
              <label>URL de tu página</label>
              <input
                type="url"
                className={styles.urlInput}
                placeholder="https://tusitio.com o https://consultorio-medico.vercel.app"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
              />
              <small className={styles.urlHint}>
                💡 Ejemplo: La página del consultorio que ya diseñaste
              </small>
            </div>

            {publishedUrl && (
              <div className={styles.successMessage}>
                ✅ Última publicación: <a href={publishedUrl} target="_blank" rel="noopener noreferrer">{publishedUrl}</a>
              </div>
            )}

            <div className={styles.modalActions}>
              <Button variant="secondary" onClick={() => setShowPublishModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleConfirmPublish}>
                Confirmar y publicar
              </Button>
            </div>

            <div className={styles.featuresInfo}>
              <h3>✨ Qué incluye tu publicación:</h3>
              <ul>
                <li>🎨 Diseño personalizado con tus bloques</li>
                <li>💬 Chat FlexiChat integrado (tipo WhatsApp)</li>
                <li>📱 Totalmente responsive</li>
                <li>⚡ Carga ultra rápida</li>
                {user?.plan === 'pro' && (
                  <>
                    <li>🌐 Dominio personalizado</li>
                    <li>📊 Analytics avanzados</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};