/* ============================================================
   chatbot.js — Demo visual del asistente IA LAB
   Eliminar este archivo y sus referencias en los HTML para
   revertir completamente esta funcionalidad.
   ============================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* Ruta a la imagen de la mascota.                                      */
  /* Ajustar según la profundidad de la página que lo carga.             */
  /* El script detecta si está en /verticales/ o en la raíz.             */
  /* ------------------------------------------------------------------ */
  const BASE = (function () {
    const path = window.location.pathname;
    return path.includes('/verticales/') ? '../' : '';
  })();

  const MASCOT_SRC = BASE + 'imagenes/NeoCabezaPng.png';

  /* ------------------------------------------------------------------ */
  /* Respuestas hardcodeadas (reemplazar por llamada a API cuando        */
  /* el backend RAG esté listo).                                         */
  /* ------------------------------------------------------------------ */
  const QUICK_REPLIES = [
    '¿Qué es IA LAB?',
    'Membresías',
    'Próximos eventos',
    'Verticales',
  ];

  const CANNED_RESPONSES = {
    '¿Qué es IA LAB?':
      'IA LAB es un laboratorio de innovación aplicada en inteligencia artificial. Reunimos profesionales de distintas disciplinas para explorar, aprender y desarrollar soluciones reales con tecnología IA.\n\nNuestro foco está en la aplicación práctica: talleres, proyectos y comunidad activa.',
    'membresías':
      'Contamos con dos modalidades de membresía:\n\n• <strong>Estándar</strong> — acceso a talleres, red de contactos y eventos mensuales.\n• <strong>Premium</strong> — todo lo anterior más mentoría personalizada y acceso prioritario a proyectos.\n\n¿Querés conocer los detalles de cada plan?',
    'próximos eventos':
      'Próximamente tenemos:\n\n• <strong>Workshop de Prompt Engineering</strong> — 20 de junio\n• <strong>Demo Day: Proyectos IA</strong> — 5 de julio\n• <strong>Panel: IA en el mundo legal</strong> — 18 de julio\n\nTodos los eventos se anuncian en nuestra sección de Eventos.',
    'verticales':
      'IA LAB trabaja en múltiples verticales profesionales:\n\nEnergía · Salud · Derecho · Marketing · Arquitectura · RRHH · Coaching · Economía · Seguridad · Real Estate · RRII\n\nCada vertical tiene su propio grupo de trabajo y casos de uso específicos.',
  };

  const FALLBACK_RESPONSE =
    'Gracias por tu mensaje. En esta demo muestro respuestas de ejemplo.\n\nPronto estaré conectado a una inteligencia artificial para responder tus consultas en tiempo real. 🚀';

  /* ------------------------------------------------------------------ */
  /* API pública — reemplazar el cuerpo de esta función cuando el        */
  /* backend RAG esté disponible.                                        */
  /* ------------------------------------------------------------------ */
  async function sendMessage(message) {
    // Futuro: return await fetch('/api/chat', { method:'POST', body: JSON.stringify({ message }) }).then(r=>r.json());
    await delay(950 + Math.random() * 400);
    const key = message.toLowerCase().trim();
    for (const [k, v] of Object.entries(CANNED_RESPONSES)) {
      if (key.includes(k)) return v;
    }
    return FALLBACK_RESPONSE;
  }

  /* ------------------------------------------------------------------ */
  /* Utilidades                                                           */
  /* ------------------------------------------------------------------ */
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function el(tag, cls, html) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function mascotHTML(cls) {
    return `<div class="${cls}">
      <img src="${MASCOT_SRC}" alt="Mascota IA LAB" onerror="this.parentNode.innerHTML='<span class=\\'cb-mascot-fallback\\'>🤖</span>'">
    </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Construcción del DOM                                                 */
  /* ------------------------------------------------------------------ */
  function buildUI() {
    // Launcher (mascota + globo)
    const launcher = el('div', 'cb-launcher');
    launcher.setAttribute('role', 'button');
    launcher.setAttribute('aria-label', 'Abrir asistente IA LAB');
    launcher.innerHTML = `
      <div class="cb-bubble" id="cb-bubble">¿Cómo puedo ayudarte?</div>
      ${mascotHTML('cb-mascot-img-wrap')}
    `;

    // Ventana del chat
    const win = el('div', 'cb-window');
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Neo');
    win.innerHTML = `
      <div class="cb-header">
        ${mascotHTML('cb-header-mascot')}
        <div class="cb-header-info">
          <div class="cb-header-title">Neo</div>
          <div class="cb-header-status">En línea</div>
        </div>
        <button class="cb-close-btn" id="cb-close-btn" aria-label="Cerrar chat">✕</button>
      </div>
      <div class="cb-messages" id="cb-messages"></div>
      <div class="cb-quick-replies" id="cb-quick-replies"></div>
      <div class="cb-input-area">
        <input
          class="cb-input"
          id="cb-input"
          type="text"
          placeholder="Escribí tu consulta…"
          maxlength="400"
          autocomplete="off"
        />
        <button class="cb-send-btn" id="cb-send-btn" aria-label="Enviar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(win);

    return { launcher, win };
  }

  /* ------------------------------------------------------------------ */
  /* Lógica de mensajes                                                   */
  /* ------------------------------------------------------------------ */
  function appendBotMessage(container, html) {
    const row = el('div', 'cb-msg-bot');
    row.innerHTML = `
      ${mascotHTML('cb-msg-avatar')}
      <div class="cb-msg-bubble">${html}</div>
    `;
    container.appendChild(row);
    scrollToBottom(container);
  }

  function appendUserMessage(container, text) {
    const row = el('div', 'cb-msg-user');
    row.innerHTML = `<div class="cb-msg-bubble">${escapeHtml(text)}</div>`;
    container.appendChild(row);
    scrollToBottom(container);
  }

  function showTyping(container) {
    const row = el('div', 'cb-typing', `
      ${mascotHTML('cb-msg-avatar')}
      <div class="cb-msg-bubble">
        <span class="cb-typing-dot"></span>
        <span class="cb-typing-dot"></span>
        <span class="cb-typing-dot"></span>
      </div>
    `);
    row.id = 'cb-typing-indicator';
    container.appendChild(row);
    scrollToBottom(container);
    return row;
  }

  function scrollToBottom(container) {
    container.scrollTop = container.scrollHeight;
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatResponse(text) {
    // Convertir saltos de línea y negritas básicas
    return text
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/<strong>(.*?)<\/strong>/g, '<strong>$1</strong>');
  }

  /* ------------------------------------------------------------------ */
  /* Mensaje de bienvenida y quick replies                               */
  /* ------------------------------------------------------------------ */
  function showWelcome(msgContainer, quickContainer) {
    const welcome = `¡Hola! Soy Neo, el asistente de IA LAB.<br><br>
      Puedo ayudarte con información sobre el laboratorio, eventos, membresías y nuestras verticales.<br><br>
      En el futuro estaré conectado a una inteligencia artificial para responder tus consultas.`;
    appendBotMessage(msgContainer, `<p style="margin:0">${welcome}</p>`);
    renderQuickReplies(quickContainer);
  }

  function renderQuickReplies(container) {
    container.innerHTML = '';
    QUICK_REPLIES.forEach(label => {
      const btn = el('button', 'cb-quick-btn', label);
      btn.addEventListener('click', () => handleQuickReply(label));
      container.appendChild(btn);
    });
    container.style.display = 'flex';
  }

  /* ------------------------------------------------------------------ */
  /* Envío de mensajes                                                    */
  /* ------------------------------------------------------------------ */
  let sending = false;

  async function handleSend(text, msgContainer, quickContainer) {
    text = text.trim();
    if (!text || sending) return;
    sending = true;

    quickContainer.style.display = 'none';
    appendUserMessage(msgContainer, text);

    const typingRow = showTyping(msgContainer);
    let responseText;
    try {
      responseText = await sendMessage(text);
    } catch {
      responseText = 'Ocurrió un error. Por favor intentá de nuevo.';
    }
    typingRow.remove();
    appendBotMessage(msgContainer, `<p style="margin:0">${formatResponse(responseText)}</p>`);
    sending = false;
  }

  function handleQuickReply(label) {
    const input = document.getElementById('cb-input');
    if (input) input.value = '';
    const msgContainer = document.getElementById('cb-messages');
    const quickContainer = document.getElementById('cb-quick-replies');
    handleSend(label, msgContainer, quickContainer);
  }

  /* ------------------------------------------------------------------ */
  /* Init                                                                 */
  /* ------------------------------------------------------------------ */
  function init() {
    const { launcher, win } = buildUI();

    const bubble      = document.getElementById('cb-bubble');
    const closeBtn    = document.getElementById('cb-close-btn');
    const input       = document.getElementById('cb-input');
    const sendBtn     = document.getElementById('cb-send-btn');
    const msgContainer   = document.getElementById('cb-messages');
    const quickContainer = document.getElementById('cb-quick-replies');

    let isOpen = false;

    function openChat() {
      if (isOpen) return;
      isOpen = true;
      bubble.classList.add('hidden');
      win.classList.add('open');
      if (msgContainer.children.length === 0) {
        showWelcome(msgContainer, quickContainer);
      }
      setTimeout(() => input.focus(), 280);
    }

    function closeChat() {
      isOpen = false;
      win.classList.remove('open');
      setTimeout(() => {
        if (!isOpen) bubble.classList.remove('hidden');
      }, 300);
    }

    launcher.addEventListener('click', openChat);

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeChat();
    });

    sendBtn.addEventListener('click', () => {
      handleSend(input.value, msgContainer, quickContainer);
      input.value = '';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend(input.value, msgContainer, quickContainer);
        input.value = '';
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeChat();
    });

    // Ocultar durante el video intro (solo index.html)
    const videoIntro = document.getElementById('video-intro');
    if (videoIntro) {
      launcher.style.opacity = '0';
      launcher.style.pointerEvents = 'none';
      const obs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) {
          launcher.style.opacity = '';
          launcher.style.pointerEvents = '';
          obs.disconnect();
        }
      }, { threshold: 0.2 });
      obs.observe(videoIntro);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
