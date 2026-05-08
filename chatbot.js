/**
 * Farmy — Family Farm Bolivia Chatbot Widget
 * Vanilla JS, embeddable via <script src="chatbot.js">
 */
(function () {
  'use strict';

  const WA_NUMBER   = '59175019023';
  const WA_BASE     = `https://wa.me/${WA_NUMBER}`;
  const INSTAGRAM   = 'https://instagram.com/familyfarm_bolivia';
  const TEAL        = '#1B5E5E';
  const ORANGE      = '#E8820A';
  const GOLD        = '#F0B429';
  const CREAM       = '#FDFAF5';

  /* ── KNOWLEDGE BASE ────────────────────────────────────────── */
  const KB = [
    {
      patterns: ['sin gluten', 'celiaco', 'celíaco', 'gluten'],
      answer: '✅ ¡Sí! Todas nuestras galletas son 100% sin gluten, elaboradas con arroz puro boliviano. Son aptas para personas celíacas. Producidas en instalaciones sin gluten para evitar contaminación cruzada.',
    },
    {
      patterns: ['bebe', 'bebé', 'niño', 'niña', 'aplv', 'proteína de leche', 'alergia'],
      answer: '👶 ¡Sí! Nuestras galletas — especialmente la línea Para Bebés — no contienen proteína de leche de vaca (APLV). Son el primer snack ideal para tu aventurero. De hecho, ¡toda nuestra marca nació gracias a la alergia de nuestro hijo!',
    },
    {
      patterns: ['donde', 'dónde', 'comprar', 'tienda', 'punto de venta', 'macarena', 'greenhouse', 'zucchini'],
      answer: '📍 Nos encontrás en Santa Cruz en tres tiendas: **Macarena**, **Greenhouse** y **Zucchini**. También puedes pedir directo por WhatsApp y te enviamos a domicilio en Santa Cruz.',
      action: { label: 'Pedir por WhatsApp 💬', url: `${WA_BASE}?text=Hola!%20Quiero%20pedir%20galletas%20Family%20Farm%20%F0%9F%8C%BE` },
    },
    {
      patterns: ['envio', 'envío', 'delivery', 'domicilio', 'mando', 'llevan'],
      answer: '🚚 Hacemos envíos en Santa Cruz de la Sierra. Para otras ciudades de Bolivia, escríbenos por WhatsApp y coordinamos. ¡Siempre encontramos la forma!',
      action: { label: 'Consultar envío 💬', url: `${WA_BASE}?text=Hola!%20Quisiera%20consultar%20sobre%20env%C3%ADos%20%F0%9F%8C%BE` },
    },
    {
      patterns: ['precio', 'cuánto', 'cuanto', 'costo', 'vale', 'bs', 'boliviano'],
      answer: '💬 Para precios actualizados, lo mejor es escribirnos directamente por WhatsApp. Los precios pueden variar según la presentación y disponibilidad.',
      action: { label: 'Consultar precios 💬', url: `${WA_BASE}?text=Hola!%20Quisiera%20saber%20los%20precios%20de%20las%20galletas%20%F0%9F%8C%BE` },
    },
    {
      patterns: ['vegana', 'vegano', 'vegan', 'plant'],
      answer: '🌿 ¡Sí! Todas nuestras galletas son 100% veganas. Sin ningún ingrediente de origen animal. Buenas para ti y para el planeta.',
    },
    {
      patterns: ['conservante', 'aditivo', 'artificial', 'químico', 'ingrediente'],
      answer: '🚫 Cero conservantes artificiales, cero colorantes, cero aditivos. La etiqueta dice exactamente lo que hay: arroz, aceite vegetal y sal marina. Sin ingredientes ocultos, nunca.',
    },
    {
      patterns: ['lactosa', 'sin lactosa', 'leche', 'dairy'],
      answer: '🥛 ¡Sin lactosa! No usamos ningún derivado lácteo en nuestras galletas. Son aptas para intolerantes a la lactosa y para bebés con APLV.',
    },
    {
      patterns: ['cenar', 'cena', 'noche', 'rápido', 'rapido', 'fácil', 'facil'],
      answer: '🍳 ¡Perfecta para la cena express! Prueba: Galleta + jamón ahumado + huevo pochado + brotes frescos + tomates secos. Gourmet en 5 minutos, ¡sin culpa!',
      action: { label: 'Ver receta completa →', url: 'recetas.html' },
    },
    {
      patterns: ['desayuno', 'mañana', 'manana', 'breakfast'],
      answer: '🌅 ¡Ideal para el desayuno! Opciones: con palta + tomate cherry + chía (fitness), con mermelada de uchuva @dulcesjessen (dulce) o con queso crema + miel boliviana (gourmet). ¿Cuál se te antoja?',
      action: { label: 'Ver todas las recetas →', url: 'recetas.html' },
    },
    {
      patterns: ['fitness', 'deporte', 'gym', 'proteína', 'proteina', 'saludable', 'sano'],
      answer: '💪 ¡Perfectas para deportistas! Bajas en grasa, sin azúcar añadida, sin conservantes. Con palta y semillas de chía son el pre o post-entreno ideal. Come sin culpa, rinde mejor.',
    },
    {
      patterns: ['historia', 'origen', 'fundadores', 'cómo nació', 'como nacio'],
      answer: '💛 Nuestra historia nació cuando nuestro hijo pequeño fue diagnosticado con alergia a la proteína de la leche de vaca. No encontramos snacks seguros para él, así que los hicimos nosotros. En Santa Cruz, en nuestra cocina, con arroz boliviano y mucho amor.',
      action: { label: 'Leer la historia completa →', url: 'historia.html' },
    },
    {
      patterns: ['instagram', 'redes', 'seguir', 'ig'],
      answer: '📸 Síguenos en Instagram @familyfarm_bolivia para ver recetas, el día a día y ofertas. ¡Te esperamos!',
      action: { label: 'Ver Instagram 📸', url: INSTAGRAM },
    },
    {
      patterns: ['pedir', 'pedido', 'comprar', 'quiero', 'orden'],
      answer: '🌾 ¡Genial! Escríbenos por WhatsApp y con gusto te atendemos. Hacemos pedidos de lunes a sábado.',
      action: { label: 'Pedir ahora 💬', url: `${WA_BASE}?text=Hola!%20Quiero%20hacer%20un%20pedido%20de%20galletas%20Family%20Farm%20%F0%9F%8C%BE` },
    },
    {
      patterns: ['receta', 'combinar', 'topping', 'comer'],
      answer: '🍽️ Tenemos recetas para todos: desayuno, cena gourmet, snacks para bebés, versión fitness y hasta snack andino con charque. ¿Cuál te interesa?',
      action: { label: 'Ver todas las recetas →', url: 'recetas.html' },
    },
    {
      patterns: ['gracias', 'thank', 'excelente', 'genial', 'perfecto'],
      answer: '💛 ¡Gracias a ti! Es un placer ayudarte. Recuerda: si tienes cualquier otra pregunta, aquí estamos. ¡Come sin culpa!',
    },
  ];

  /* ── HELPERS ────────────────────────────────────────────────── */
  function waUrl(msg) {
    return `${WA_BASE}?text=${encodeURIComponent(msg)}`;
  }

  function matchKB(input) {
    const text = input.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    for (const entry of KB) {
      if (entry.patterns.some(p => text.includes(p.normalize('NFD').replace(/[̀-ͯ]/g, '')))) {
        return entry;
      }
    }
    return null;
  }

  /* ── STYLES ─────────────────────────────────────────────────── */
  const CSS = `
    #farmy-widget * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', -apple-system, sans-serif; }
    #farmy-btn {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 60px; height: 60px; border-radius: 50%;
      background: ${TEAL}; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 26px; box-shadow: 0 4px 20px rgba(27,94,94,.35);
      transition: transform .25s ease, box-shadow .25s ease;
      color: white;
    }
    #farmy-btn:hover { transform: scale(1.1); box-shadow: 0 8px 30px rgba(27,94,94,.45); }
    #farmy-btn .farmy-badge {
      position: absolute; top: -4px; right: -4px;
      background: ${ORANGE}; width: 18px; height: 18px;
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 10px; color: white;
      font-weight: 700;
    }
    #farmy-window {
      position: fixed; bottom: 100px; right: 28px; z-index: 9998;
      width: 340px; border-radius: 20px; overflow: hidden;
      box-shadow: 0 12px 48px rgba(27,94,94,.25);
      display: none; flex-direction: column;
      max-height: 520px; background: #fff;
      animation: farmySlideUp .3s ease;
    }
    #farmy-window.open { display: flex; }
    @keyframes farmySlideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    #farmy-header {
      background: ${TEAL}; padding: 16px 20px;
      display: flex; align-items: center; gap: 12px;
    }
    #farmy-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(255,255,255,.15); display: flex;
      align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0;
    }
    #farmy-header-info h4 { color: #fff; font-size: 15px; font-weight: 700; }
    #farmy-header-info p  { color: rgba(255,255,255,.7); font-size: 12px; }
    #farmy-close {
      margin-left: auto; background: none; border: none; cursor: pointer;
      color: rgba(255,255,255,.7); font-size: 20px; padding: 4px;
      transition: color .2s; line-height: 1;
    }
    #farmy-close:hover { color: #fff; }
    #farmy-messages {
      flex: 1; overflow-y: auto; padding: 16px; display: flex;
      flex-direction: column; gap: 12px; background: ${CREAM};
    }
    #farmy-messages::-webkit-scrollbar { width: 4px; }
    #farmy-messages::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
    .farmy-bubble {
      max-width: 86%; padding: 10px 14px; border-radius: 16px;
      font-size: 14px; line-height: 1.55; word-break: break-word;
    }
    .farmy-bubble.bot { background: #fff; color: #131A1A; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
    .farmy-bubble.user { background: ${TEAL}; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
    .farmy-action-btn {
      display: inline-block; margin-top: 8px; background: ${TEAL}; color: #fff;
      padding: 7px 14px; border-radius: 50px; font-size: 13px; font-weight: 600;
      text-decoration: none; transition: background .2s;
    }
    .farmy-action-btn:hover { background: #134848; }
    .farmy-action-btn.orange { background: ${ORANGE}; }
    .farmy-action-btn.orange:hover { background: #c96e06; }
    .farmy-typing { display: flex; align-items: center; gap: 4px; padding: 10px 14px; background: #fff; border-radius: 16px; border-bottom-left-radius: 4px; align-self: flex-start; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
    .farmy-dot { width: 7px; height: 7px; background: #ccc; border-radius: 50%; animation: farmyDot 1.2s infinite; }
    .farmy-dot:nth-child(2) { animation-delay: .2s; }
    .farmy-dot:nth-child(3) { animation-delay: .4s; }
    @keyframes farmyDot { 0%,80%,100%{transform:scale(0.8);opacity:.4} 40%{transform:scale(1.1);opacity:1} }
    #farmy-quick {
      padding: 8px 12px; display: flex; gap: 6px;
      overflow-x: auto; background: #fff; border-top: 1px solid #f0f0f0;
    }
    #farmy-quick::-webkit-scrollbar { display: none; }
    .farmy-quick-btn {
      white-space: nowrap; padding: 6px 14px; border-radius: 50px;
      border: 1.5px solid ${TEAL}; background: #fff; color: ${TEAL};
      font-size: 12px; font-weight: 600; cursor: pointer; transition: all .2s;
    }
    .farmy-quick-btn:hover { background: ${TEAL}; color: #fff; }
    #farmy-input-row {
      display: flex; gap: 8px; padding: 12px 16px;
      background: #fff; border-top: 1px solid #f0f0f0;
      align-items: center;
    }
    #farmy-input {
      flex: 1; padding: 10px 14px; border: 1.5px solid #e0e0e0;
      border-radius: 50px; font-size: 14px; font-family: inherit;
      outline: none; transition: border-color .2s;
    }
    #farmy-input:focus { border-color: ${TEAL}; }
    #farmy-send {
      width: 38px; height: 38px; border-radius: 50%; background: ${TEAL};
      border: none; cursor: pointer; display: flex; align-items: center;
      justify-content: center; font-size: 16px; flex-shrink: 0;
      transition: background .2s, transform .2s;
    }
    #farmy-send:hover { background: #134848; transform: scale(1.05); }
    @media (max-width: 400px) { #farmy-window { width: calc(100vw - 32px); right: 16px; } #farmy-btn { right: 16px; } }
  `;

  const QUICK_REPLIES = ['¿Son sin gluten?', '¿Aptas para bebés?', '¿Dónde comprar?', 'Ver recetas', 'Pedir ahora'];

  /* ── BUILD DOM ──────────────────────────────────────────────── */
  function init() {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Widget wrapper
    const widget = document.createElement('div');
    widget.id = 'farmy-widget';

    // Chat button
    const btn = document.createElement('button');
    btn.id = 'farmy-btn';
    btn.innerHTML = `<span>🌾</span><span class="farmy-badge">1</span>`;
    btn.setAttribute('aria-label', 'Abrir chat con Farmy');

    // Chat window
    const win = document.createElement('div');
    win.id = 'farmy-window';
    win.innerHTML = `
      <div id="farmy-header">
        <div id="farmy-avatar">🌾</div>
        <div id="farmy-header-info">
          <h4>Farmy 🌾</h4>
          <p>Family Farm Bolivia · Responde al instante</p>
        </div>
        <button id="farmy-close" aria-label="Cerrar chat">✕</button>
      </div>
      <div id="farmy-messages"></div>
      <div id="farmy-quick"></div>
      <div id="farmy-input-row">
        <input id="farmy-input" type="text" placeholder="Escribe tu pregunta..." autocomplete="off" />
        <button id="farmy-send" aria-label="Enviar">➤</button>
      </div>
    `;

    widget.appendChild(btn);
    widget.appendChild(win);
    document.body.appendChild(widget);

    // Quick replies
    const quickDiv = win.querySelector('#farmy-quick');
    QUICK_REPLIES.forEach(text => {
      const qb = document.createElement('button');
      qb.className = 'farmy-quick-btn';
      qb.textContent = text;
      qb.addEventListener('click', () => handleUserMessage(text));
      quickDiv.appendChild(qb);
    });

    // Events
    btn.addEventListener('click', toggleChat);
    win.querySelector('#farmy-close').addEventListener('click', closeChat);
    win.querySelector('#farmy-send').addEventListener('click', () => {
      const inp = win.querySelector('#farmy-input');
      if (inp.value.trim()) handleUserMessage(inp.value.trim());
    });
    win.querySelector('#farmy-input').addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const inp = win.querySelector('#farmy-input');
        if (inp.value.trim()) handleUserMessage(inp.value.trim());
      }
    });

    // Welcome message after short delay
    setTimeout(() => {
      addBotMessage('¡Hola! Soy Farmy 🌾 ¿En qué te puedo ayudar hoy?\n\nPuedes preguntarme sobre nuestras galletas, ingredientes, dónde comprar o pedir directamente.', null, true);
    }, 600);
  }

  /* ── CHAT LOGIC ─────────────────────────────────────────────── */
  function toggleChat() {
    const win = document.getElementById('farmy-window');
    const badge = document.querySelector('#farmy-btn .farmy-badge');
    if (win.classList.contains('open')) {
      closeChat();
    } else {
      win.classList.add('open');
      if (badge) badge.style.display = 'none';
      document.getElementById('farmy-input').focus();
      scrollMessages();
    }
  }

  function closeChat() {
    document.getElementById('farmy-window').classList.remove('open');
  }

  function handleUserMessage(text) {
    const inp = document.getElementById('farmy-input');
    inp.value = '';
    addUserMessage(text);
    showTyping();
    setTimeout(() => {
      removeTyping();
      const match = matchKB(text);
      if (match) {
        addBotMessage(match.answer, match.action || null);
      } else {
        addBotMessage(
          'No tengo esa información exacta 😊 Pero puedo conectarte con nuestra familia directamente — ellos te responden al toque.',
          { label: 'Chatear con Family Farm 💬', url: waUrl(`Hola! Tengo una pregunta: ${text}`) }
        );
      }
    }, 900);
  }

  function addUserMessage(text) {
    const msgs = document.getElementById('farmy-messages');
    const b = document.createElement('div');
    b.className = 'farmy-bubble user';
    b.textContent = text;
    msgs.appendChild(b);
    scrollMessages();
  }

  function addBotMessage(text, action, isWelcome = false) {
    const msgs = document.getElementById('farmy-messages');
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.alignItems = 'flex-start';
    wrap.style.gap = '6px';

    const b = document.createElement('div');
    b.className = 'farmy-bubble bot';
    b.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    wrap.appendChild(b);

    if (action) {
      const a = document.createElement('a');
      a.className = 'farmy-action-btn' + (action.url.includes('wa.me') ? ' orange' : '');
      a.href = action.url;
      if (action.url.startsWith('http')) a.target = '_blank';
      a.textContent = action.label;
      wrap.appendChild(a);
    }

    if (isWelcome) {
      const waLink = document.createElement('a');
      waLink.className = 'farmy-action-btn orange';
      waLink.href = waUrl('Hola Family Farm! Quiero hacer un pedido 🌾');
      waLink.target = '_blank';
      waLink.textContent = 'Pedir por WhatsApp 💬';
      wrap.appendChild(waLink);
    }

    msgs.appendChild(wrap);
    scrollMessages();
  }

  function showTyping() {
    const msgs = document.getElementById('farmy-messages');
    const t = document.createElement('div');
    t.className = 'farmy-typing';
    t.id = 'farmy-typing';
    t.innerHTML = '<div class="farmy-dot"></div><div class="farmy-dot"></div><div class="farmy-dot"></div>';
    msgs.appendChild(t);
    scrollMessages();
  }

  function removeTyping() {
    const t = document.getElementById('farmy-typing');
    if (t) t.remove();
  }

  function scrollMessages() {
    const msgs = document.getElementById('farmy-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  /* ── BOOT ───────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
