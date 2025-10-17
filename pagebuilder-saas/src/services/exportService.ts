/* src/services/exportService.ts */

import type { Project } from '../types/project';

export class ExportService {
  static generateHTML(project: Project): string {
    const sections = project.sections
      .map((sec) =>
        sec.blocks
          .map((block) => this.renderBlockHTML(block))
          .join('\n')
      )
      .join('\n');

    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.title}</title>
  <style>
    ${this.getGlobalCSS(project.theme.primaryColor)}
  </style>
</head>
<body>
  <div class="container">
    ${sections}
  </div>
  ${project.chatConfig.enabled ? this.getChatWidgetHTML(project.chatConfig) : ''}
  
  <script>
    ${project.chatConfig.enabled ? this.getChatWidgetJS() : ''}
  </script>
</body>
</html>`;
  }

  private static renderBlockHTML(block: any): string {
    const style = `padding: ${block.style.padding}px; background-color: ${block.style.backgroundColor}; border-radius: ${block.style.borderRadius}px; border: ${block.style.borderWidth}px solid #e2e8f0;`;
    
    switch (block.type) {
      case 'hero':
        return `
          <section class="block hero" style="${style}">
            <h1>${block.content.title || 'Título Hero'}</h1>
            <p>${block.content.subtitle || 'Subtítulo'}</p>
            <div class="cta-buttons">
              <a href="#contacto" class="btn btn-primary">${block.content.ctaPrimary || 'Comenzar'}</a>
              <a href="#info" class="btn btn-secondary">${block.content.ctaSecondary || 'Ver más'}</a>
            </div>
          </section>`;
      
      case 'banner':
        return `
          <section class="block banner" style="${style}">
            <p>${block.content.text || 'Mensaje del banner'}</p>
          </section>`;
      
      case 'text':
        return `
          <section class="block" style="${style}">
            <h2>${block.content.title || 'Título'}</h2>
            <p>${block.content.body || 'Contenido de texto'}</p>
          </section>`;
      
      case 'two-col':
        return `
          <section class="block two-col" style="${style}">
            <div class="col">
              <h3>${block.content.col1?.title || 'Columna 1'}</h3>
              <p>${block.content.col1?.text || 'Texto columna 1'}</p>
            </div>
            <div class="col">
              <h3>${block.content.col2?.title || 'Columna 2'}</h3>
              <p>${block.content.col2?.text || 'Texto columna 2'}</p>
            </div>
          </section>`;
      
      case 'three-card':
        return `
          <section class="block three-col" style="${style}">
            <div class="card">
              <h4>${block.content.card1?.title || 'Tarjeta 1'}</h4>
              <p>${block.content.card1?.text || 'Descripción'}</p>
            </div>
            <div class="card">
              <h4>${block.content.card2?.title || 'Tarjeta 2'}</h4>
              <p>${block.content.card2?.text || 'Descripción'}</p>
            </div>
            <div class="card">
              <h4>${block.content.card3?.title || 'Tarjeta 3'}</h4>
              <p>${block.content.card3?.text || 'Descripción'}</p>
            </div>
          </section>`;
      
      case 'product':
        return `
          <section class="block product" style="${style}">
            <div class="product-info">
              <h2>${block.content.title || 'Producto'}</h2>
              <p>${block.content.description || 'Descripción del producto'}</p>
              <div class="price">${block.content.price || 'Q 0'}</div>
              <a href="#" class="btn btn-primary">Comprar ahora</a>
            </div>
            <div class="product-gallery">
              <div class="gallery-placeholder"></div>
            </div>
          </section>`;
      
      case 'gallery':
        return `
          <section class="block" style="${style}">
            <h3>${block.content.title || 'Galería'}</h3>
            <div class="gallery">
              ${Array.from({ length: block.content.images || 6 }).map(() => 
                '<div class="gallery-item"></div>'
              ).join('')}
            </div>
          </section>`;
      
      case 'contact':
        return `
          <section class="block" id="contacto" style="${style}">
            <h3>${block.content.title || 'Contacto'}</h3>
            <form class="contact-form">
              <input type="text" placeholder="Nombre" required>
              <input type="email" placeholder="Email" required>
              <textarea placeholder="Mensaje" rows="4" required></textarea>
              <button type="submit" class="btn btn-primary">Enviar mensaje</button>
            </form>
          </section>`;
      
      default:
        return `<section class="block" style="${style}">Bloque ${block.type}</section>`;
    }
  }

  private static getGlobalCSS(accentColor: string): string {
    return `
      :root { --accent: ${accentColor}; --border: #e2e8f0; --ink: #0f172a; --muted: #64748b; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: var(--ink); background: #f8fafc; line-height: 1.6; }
      .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
      .block { padding: 24px; margin: 24px 0; border-radius: 12px; background: #fff; }
      
      /* Hero */
      .hero { background: linear-gradient(120deg, #eef2ff, #e0f2fe) !important; text-align: center; padding: 80px 24px !important; }
      .hero h1 { font-size: clamp(32px, 5vw, 56px); margin-bottom: 16px; font-weight: 700; }
      .hero p { font-size: clamp(16px, 2vw, 20px); color: #475569; margin-bottom: 32px; }
      .cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
      
      /* Banner */
      .banner { background: #f1f5f9 !important; text-align: center; padding: 16px !important; }
      .banner p { font-size: 15px; font-weight: 500; }
      
      /* Typography */
      h2 { font-size: 36px; margin-bottom: 16px; font-weight: 700; }
      h3 { font-size: 28px; margin-bottom: 12px; font-weight: 700; }
      h4 { font-size: 20px; margin-bottom: 8px; font-weight: 600; }
      p { color: var(--muted); line-height: 1.7; }
      
      /* Buttons */
      .btn { display: inline-block; padding: 14px 28px; border-radius: 10px; font-weight: 600; text-decoration: none; transition: all 0.3s; font-size: 16px; }
      .btn-primary { background: var(--accent); color: white; border: 2px solid var(--accent); }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); }
      .btn-secondary { background: white; color: var(--accent); border: 2px solid var(--accent); }
      .btn-secondary:hover { background: var(--accent); color: white; }
      
      /* Two column */
      .two-col { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
      .col { }
      
      /* Three cards */
      .three-col { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
      .card { background: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid var(--border); }
      
      /* Product */
      .product { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; align-items: center; }
      .product-info { }
      .price { font-size: 32px; font-weight: 700; color: var(--accent); margin: 16px 0 24px; }
      .product-gallery, .gallery-placeholder { background: #e2e8f0; border-radius: 12px; aspect-ratio: 1; }
      
      /* Gallery */
      .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
      .gallery-item { background: #e2e8f0; border-radius: 10px; aspect-ratio: 4/3; }
      
      /* Contact form */
      .contact-form { display: flex; flex-direction: column; gap: 16px; max-width: 600px; }
      .contact-form input, .contact-form textarea { padding: 14px; border: 2px solid var(--border); border-radius: 10px; font-size: 15px; font-family: inherit; }
      .contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: var(--accent); }
      .contact-form button { align-self: flex-start; cursor: pointer; border: none; }
      
      /* Responsive */
      @media (max-width: 768px) {
        .product, .two-col { grid-template-columns: 1fr; }
        .cta-buttons { flex-direction: column; }
        .btn { width: 100%; text-align: center; }
      }
    `;
  }

  private static getChatWidgetHTML(config: any): string {
    return `
      <!-- FlexiChat Widget -->
      <div id="flexichat-widget">
        <div id="flexichat-panel" style="display: none;">
          <div class="flexichat-header">
            <span>${config.title}</span>
            <button id="flexichat-close">✕</button>
          </div>
          <div id="flexichat-messages">
            <div class="flexichat-message agent">
              <div class="flexichat-bubble">${config.welcomeMessage}</div>
              <span class="flexichat-time">${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          <form id="flexichat-form">
            <input type="text" id="flexichat-input" placeholder="Escribe un mensaje..." />
            <button type="submit">Enviar</button>
          </form>
        </div>
        <button id="flexichat-toggle">💬</button>
      </div>

      <style>
        #flexichat-widget { position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: -apple-system, sans-serif; }
        #flexichat-panel { width: 380px; height: 520px; background: white; border-radius: 16px; box-shadow: 0 12px 48px rgba(0,0,0,0.2); display: flex; flex-direction: column; overflow: hidden; }
        .flexichat-header { background: ${config.primaryColor}; color: white; padding: 18px; display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 16px; }
        #flexichat-close { background: none; border: none; color: white; font-size: 22px; cursor: pointer; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; }
        #flexichat-close:hover { background: rgba(255,255,255,0.2); }
        #flexichat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; background: #f8fafc; }
        .flexichat-message { display: flex; flex-direction: column; gap: 4px; animation: slideIn 0.3s ease; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .flexichat-message.user { align-items: flex-end; }
        .flexichat-message.agent { align-items: flex-start; }
        .flexichat-bubble { max-width: 75%; padding: 12px 16px; border-radius: 14px; font-size: 14px; line-height: 1.4; word-wrap: break-word; }
        .user .flexichat-bubble { background: ${config.primaryColor}; color: white; border-bottom-right-radius: 4px; }
        .agent .flexichat-bubble { background: white; color: #0f172a; border: 1px solid #e2e8f0; border-bottom-left-radius: 4px; }
        .flexichat-time { font-size: 11px; color: #64748b; padding: 0 8px; }
        #flexichat-form { display: flex; gap: 8px; padding: 14px; border-top: 1px solid #e2e8f0; background: white; }
        #flexichat-input { flex: 1; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; }
        #flexichat-input:focus { outline: none; border-color: ${config.primaryColor}; }
        #flexichat-form button { padding: 10px 18px; background: ${config.primaryColor}; color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 14px; transition: opacity 0.2s; }
        #flexichat-form button:hover { opacity: 0.9; }
        #flexichat-toggle { width: 64px; height: 64px; border-radius: 50%; background: ${config.primaryColor}; color: white; border: none; font-size: 32px; cursor: pointer; box-shadow: 0 8px 24px rgba(0,0,0,0.15); transition: transform 0.2s; }
        #flexichat-toggle:hover { transform: scale(1.1); }
        #flexichat-toggle:active { transform: scale(0.95); }
        @media (max-width: 480px) {
          #flexichat-panel { width: calc(100vw - 40px); height: calc(100vh - 40px); max-height: 600px; }
        }
      </style>
    `;
  }

  private static getChatWidgetJS(): string {
    return `
      // FlexiChat Widget JavaScript
      (function() {
        const widget = document.getElementById('flexichat-widget');
        const panel = document.getElementById('flexichat-panel');
        const toggle = document.getElementById('flexichat-toggle');
        const close = document.getElementById('flexichat-close');
        const form = document.getElementById('flexichat-form');
        const input = document.getElementById('flexichat-input');
        const messages = document.getElementById('flexichat-messages');

        let isOpen = false;

        toggle.addEventListener('click', () => {
          isOpen = !isOpen;
          panel.style.display = isOpen ? 'flex' : 'none';
          toggle.style.display = isOpen ? 'none' : 'flex';
          if (isOpen) {
            input.focus();
            scrollToBottom();
          }
        });

        close.addEventListener('click', () => {
          isOpen = false;
          panel.style.display = 'none';
          toggle.style.display = 'flex';
        });

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const text = input.value.trim();
          if (!text) return;

          // Agregar mensaje del usuario
          addMessage('user', text);
          input.value = '';

          // Simular respuesta del agente
          setTimeout(() => {
            const responses = [
              '¡Gracias por tu mensaje! Un agente te responderá pronto.',
              'Recibido. ¿En qué más puedo ayudarte?',
              'Perfecto, te contactaremos a la brevedad.',
              'Anotado. ¿Necesitas algo más?'
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            addMessage('agent', response);
          }, 1000 + Math.random() * 1000);
        });

        function addMessage(sender, text) {
          const messageDiv = document.createElement('div');
          messageDiv.className = 'flexichat-message ' + sender;
          
          const bubble = document.createElement('div');
          bubble.className = 'flexichat-bubble';
          bubble.textContent = text;
          
          const time = document.createElement('span');
          time.className = 'flexichat-time';
          time.textContent = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
          
          messageDiv.appendChild(bubble);
          messageDiv.appendChild(time);
          messages.appendChild(messageDiv);
          
          scrollToBottom();
        }

        function scrollToBottom() {
          messages.scrollTop = messages.scrollHeight;
        }

        // Notificación de bienvenida después de 3 segundos
        setTimeout(() => {
          if (!isOpen) {
            toggle.style.animation = 'pulse 1s ease infinite';
          }
        }, 3000);
      })();
    `;
  }
}