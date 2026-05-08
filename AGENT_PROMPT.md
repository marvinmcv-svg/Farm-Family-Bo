# 🌾 Family Farm Bolivia — Agent Handoff Prompt

> Pasa este archivo completo a tu agente de código para que tenga todo el contexto necesario para continuar el desarrollo del sitio web.

---

## 🧠 Contexto de Marca (Nunca cambiar)

**Nombre:** Family Farm Bolivia  
**Producto:** Galletas de arroz artesanales  
**Instagram:** @familyfarm_bolivia  
**WhatsApp:** +591 75019023  
**Puntos de venta:** Macarena · Greenhouse · Zucchini (Santa Cruz, Bolivia)  
**Tagline:** "Come sin culpa."  
**Idioma del sitio:** Español (Bolivia)

**Historia de origen (ancla emocional — NUNCA omitir):**
La marca nació cuando los fundadores descubrieron que su hijo pequeño tenía alergia a la proteína de la leche de vaca (APLV). Buscaron opciones saludables, veganas y sin ingredientes ocultos para él. Así nació Family Farm: en una cocina familiar en Santa Cruz, con amor, no en una fábrica.

**Atributos del producto:**
- Sin gluten · Sin lactosa · Veganas · Sin conservantes artificiales
- Sin ingredientes ocultos · Aptas para bebés (sin proteína de leche)
- Versátiles: snack, base gourmet, desayuno, merienda de bebés

**Colaboraciones locales:** @dulcesjessen (mermelada de uchuva)

---

## 🎨 Sistema de Diseño

### Colores
```
--teal:        #1B5E5E   /* Verde Familia — primario */
--teal-mid:    #2A7E7E   /* Teal Campo — secundario */
--teal-light:  #E4F4F4   /* Bruma Verde — fondos, badges */
--orange:      #E8820A   /* Naranja Cosecha — CTA, WhatsApp */
--orange-soft: #FFA63C   /* Flama Cálida — acento naranja */
--gold:        #F0B429   /* Oro Uchuva — highlights, estrellas */
--cream:       #FDFAF5   /* Fondo principal */
--dark:        #131A1A   /* Texto principal, footer */
--gray:        #5A6A6A   /* Texto secundario */
```

### Tipografías (Google Fonts)
```
Playfair Display — títulos, headlines, quotes
DM Sans         — cuerpo, UI, labels
Bebas Neue      — números grandes, displays, taglines
```
**Import URL:**
```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap
```

### Espaciado y Grid
- Sistema base: 8px
- Max-width contenedor: `1120px`, padding lateral: `24px`
- Border-radius: botones `50px`, cards `20px`, base `12px`
- Breakpoints: mobile `< 768px`, tablet `768–1024px`, desktop `> 1024px`

### CSS Variables base (copiar en cualquier página nueva)
```css
:root {
  --teal: #1B5E5E; --teal-mid: #2A7E7E; --teal-light: #E4F4F4;
  --orange: #E8820A; --orange-soft: #FFA63C; --gold: #F0B429;
  --cream: #FDFAF5; --dark: #131A1A; --gray: #5A6A6A;
  --shadow: 0 4px 24px rgba(27,94,94,.12);
  --transition: 0.3s ease;
}
```

---

## 📁 Estructura del Repositorio

```
Farm-Family-Bo/
├── index.html          # Homepage completa
├── historia.html       # Nuestra Historia / About Us
├── producto.html       # Página de producto individual
├── recetas.html        # Página de recetas + quiz
├── chatbot.js          # Widget Farmy chatbot (vanilla JS)
├── design-system.html  # Sistema de diseño — referencia visual
└── AGENT_PROMPT.md     # Este archivo
```

**Repositorio:** `marvinmcv-svg/Farm-Family-Bo`  
**Rama principal:** `main`

---

## 📄 Descripción de cada archivo

### `index.html` — Homepage
Secciones implementadas:
1. **Navbar** fija con logo, links, botón "Pedir Ahora 💬" (naranja), menú hamburguesa móvil
2. **Hero** — headline, subtítulo, tagline "Come sin culpa.", badges de atributos, 2 CTAs, imagen decorativa con float badges
3. **Historia de Origen** — sección teal oscuro con la historia del niño + pull quote
4. **Productos** — 3 cards: Original, Para Bebés, Edición Gourmet
5. **Por qué Family Farm** — 6 tarjetas con íconos de atributos
6. **Dónde Encontrarnos** — lista de 3 tiendas + iframe de Google Maps (Santa Cruz)
7. **Recetas Destacadas** — 3 recipe cards con link a recetas.html
8. **Testimonios** — 3 tarjetas con nombre, rol, estrellas y reseña
9. **CTA Band** — banda naranja con botón a WhatsApp
10. **Footer** — 4 columnas: brand, páginas, dónde comprar, contacto
11. **Botón flotante WhatsApp** (bottom-left, verde #25D366)
12. **Chatbot Farmy** embebido via `<script src="chatbot.js">`

### `historia.html` — Nuestra Historia
Secciones:
1. Hero emocional oscuro (gradiente teal) con headline sobre el aventurero
2. Historia completa narrada en primera persona (6 párrafos + pull quote)
3. Línea de tiempo visual (5 hitos: primer lote → hoy 241 familias)
4. Valores de la marca (6 tarjetas con íconos)
5. "Por qué nos importa" — conexión entre la historia del niño y la misión
6. Carta del Fundador — formato carta con firma estilizada
7. Dónde estamos — 3 tiendas en cards
8. CTA final a WhatsApp

### `producto.html` — Galleta Original (Página de Producto)
Secciones:
1. Breadcrumb
2. Product hero grid: galería con 4 thumbnails + info de producto
3. Badges de atributos (sin gluten, sin lactosa, vegana, etc.)
4. Precio placeholder (`Bs. —`) con nota de consultar por WhatsApp
5. Selector de cantidad
6. 3 CTAs: WhatsApp (verde), Agregar al Carrito, Ver Historia
7. Tabla de ingredientes + tabla nutricional (valores de muestra)
8. Sección toppings — 4 tarjetas de cómo comerla
9. Reseñas con rating 4.9/5 (87 reseñas) + 4 tarjetas
10. FAQ con accordion (5 preguntas)
11. "También te puede gustar" — 2 productos relacionados

### `recetas.html` — La Mesa de la Familia
Secciones:
1. Hero con grid de tiles de comida
2. Barra de filtros sticky por categoría (Todas / Desayuno / Cena / Bebés / Gourmet / Dulce / Salado)
3. Grid de 6 recetas (filtrado por JS):
   - Galleta + Mermelada de Uchuva (con @dulcesjessen)
   - Cena Gourmet en 5 Minutos
   - Primer Snack del Aventurero (bebés)
   - Desayuno Fitness con Palta
   - Queso Crema, Miel y Nueces
   - Snack Andino con Charque
4. Quiz interactivo de 3 pasos → resultado personalizado → CTA a WhatsApp
5. Formulario de colaboración para marcas locales
6. Sección UGC con hashtag #familyfarmbolivia

### `chatbot.js` — Widget Farmy
- **Clase:** IIFE vanilla JS, sin dependencias
- **Activación:** automático al cargar la página via `<script src="chatbot.js">`
- **Posición:** bottom-right (opuesto al botón de WhatsApp que va bottom-left)
- **Knowledge base:** 15+ intenciones (sin gluten, bebés, precios, envíos, recetas, historia, pedidos, etc.)
- **Fallback:** cualquier pregunta sin match redirige a WhatsApp con el texto del usuario prellenado
- **Quick replies:** 5 botones de respuesta rápida
- **Animación:** typing dots antes de cada respuesta
- **Nombre del bot:** Farmy 🌾

### `design-system.html` — Referencia Visual
11 secciones documentadas:
1. Paleta de colores (8 swatches con uso)
2. Escala tipográfica completa (Display → Caption)
3. Botones (6 variantes + 3 tamaños)
4. Cards (producto, receta, testimonio)
5. Badges y pills (6 variantes)
6. Formularios (inputs, select, textarea, checkbox, error state)
7. Alertas (success, error, info, warning)
8. Sistema de espaciado 8px
9. Iconografía aprobada (12 emojis con contexto de uso)
10. Patrones de diseño (hero, footer)
11. Voz y tono (✅ correcto vs ❌ evitar + ejemplos de WhatsApp)

---

## 🔗 Links y Variables Globales

| Variable | Valor |
|---|---|
| WhatsApp | `+591 75019023` |
| URL WhatsApp | `https://wa.me/59175019023` |
| Instagram | `@familyfarm_bolivia` |
| URL Instagram | `https://instagram.com/familyfarm_bolivia` |
| Puntos de venta | Macarena · Greenhouse · Zucchini |
| Ciudad | Santa Cruz de la Sierra, Bolivia |
| Precio Galleta Original | **[COMPLETAR en Bs.]** |
| Precio Galleta Bebés | **[COMPLETAR en Bs.]** |
| Horario de pedidos | **[COMPLETAR — ej: Lun–Sáb 8am–6pm]** |
| Email de contacto | **[COMPLETAR]** |
| Nombre del fundador | **[COMPLETAR — para la carta en historia.html]** |
| Dominio | **[COMPLETAR — ej: familyfarmbolivia.com]** |

---

## 🛠️ Patrones de Código Comunes

### Navbar (copiar en cada página nueva)
```html
<nav id="navbar">
  <div class="nav-inner">
    <a href="index.html" class="logo">
      <div class="logo-circle">
        <span class="lc-top">FAMILY</span>
        <span class="lc-mid">FARM</span>
        <span class="lc-bot">BOL.</span>
      </div>
      <div class="logo-text">Family Farm <small>Bolivia</small></div>
    </a>
    <ul class="nav-links" id="nav-links">
      <li><a href="index.html">Inicio</a></li>
      <li><a href="historia.html">Nuestra Historia</a></li>
      <li><a href="producto.html">Productos</a></li>
      <li><a href="recetas.html">Recetas</a></li>
      <li><a href="https://wa.me/59175019023?text=Hola%20Family%20Farm!" target="_blank" class="btn-wa-nav">Pedir Ahora 💬</a></li>
    </ul>
    <div class="hamburger" id="hamburger"><span></span><span></span><span></span></div>
  </div>
</nav>
```

### Botón flotante WhatsApp (bottom-left, en todas las páginas)
```html
<a href="https://wa.me/59175019023?text=Hola%20Family%20Farm!%20%F0%9F%8C%BE"
   target="_blank" class="float-wa" title="Pedir por WhatsApp">💬</a>
```

### Script de scroll + navbar (copiar en cada página)
```html
<script src="chatbot.js" defer></script>
<script>
  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

  // Scroll animations
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  // Navbar shadow on scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(27,94,94,.15)' : 'none';
  });
</script>
```

### Link de WhatsApp con mensaje prellenado
```
Pedido general:     https://wa.me/59175019023?text=Hola!%20Quiero%20hacer%20un%20pedido%20%F0%9F%8C%BE
Galleta original:   https://wa.me/59175019023?text=Hola!%20Quiero%20pedir%20la%20Galleta%20Original%20%F0%9F%8C%BE
Galleta bebés:      https://wa.me/59175019023?text=Hola!%20Me%20interesa%20la%20Galleta%20para%20Beb%C3%A9s%20%F0%9F%91%B6
Consultar precio:   https://wa.me/59175019023?text=Hola!%20Quisiera%20saber%20los%20precios%20%F0%9F%8C%BE
Primer pedido:      https://wa.me/59175019023?text=Hola%20Family%20Farm!%20Quiero%20hacer%20mi%20primer%20pedido%20%F0%9F%8C%BE
```

---

## ✅ Tareas Pendientes

### Alta prioridad
- [ ] Reemplazar todas las imágenes placeholder (emojis) con fotos reales del producto
- [ ] Completar las variables `[COMPLETAR]` de la tabla de arriba (precios, email, horario, fundador)
- [ ] Actualizar el iframe de Google Maps en `index.html` con coordenadas reales de los 3 puntos de venta
- [ ] Agregar las direcciones exactas de Macarena, Greenhouse y Zucchini

### Media prioridad
- [ ] Conectar el formulario de colaboración en `recetas.html` a un backend real o servicio (Formspree, EmailJS, etc.)
- [ ] Implementar carrito de compras real o integrar con plataforma e-commerce (Shopify / WooCommerce)
- [ ] Agregar Google Analytics o similar para tracking
- [ ] Optimizar imágenes con lazy loading cuando se tengan fotos reales
- [ ] Registrar y apuntar dominio (ej: familyfarmbolivia.com)

### Baja prioridad
- [ ] Implementar Prompt 6 (Guía de contenido Instagram — 30 días) — no es una página web
- [ ] Agregar página 404 personalizada con la historia de la marca
- [ ] Añadir Open Graph / meta tags para compartir en redes sociales
- [ ] Implementar modo oscuro opcional
- [ ] Agregar PWA manifest para instalar como app

---

## 🚀 Instrucciones para el Agente

Cuando trabajes en este proyecto:

1. **Mantén siempre** los colores `#1B5E5E` (teal) y `#E8820A` (naranja) como primarios
2. **Nunca elimines** la historia del niño con alergia — es el corazón de la marca
3. **El botón de WhatsApp** debe estar siempre visible (flotante bottom-left + en navbar + en CTAs)
4. **El chatbot Farmy** (`chatbot.js`) debe incluirse en todas las páginas via `<script src="chatbot.js">`
5. **Todo el texto** debe estar en español boliviano, con tono cálido y auténtico
6. **Mobile-first**: diseña primero para móvil, luego escala a desktop
7. **Sin dependencias de build**: todo es HTML/CSS/JS vanilla. No usar npm, webpack, etc.
8. **Al agregar una página nueva**, copiar la estructura de navbar + footer + float-wa + scripts de scroll del archivo más cercano
9. **Al modificar una sección**, entregar solo el bloque HTML/CSS modificado listo para reemplazar

---

## 📐 Voz y Tono — Reglas Rápidas

| ✅ Usar | ❌ Evitar |
|---|---|
| "Come sin culpa." | "Producto funcional bajo en calorías" |
| "Hecho con amor en Santa Cruz" | "Cumple estándares internacionales" |
| "Sin ingredientes ocultos. Nunca." | "Aditivos naturales certificados" |
| "Tu bebé merece lo mejor" | "Alimento para lactantes" |
| "Escríbenos al WhatsApp 💬" | "Contáctenos para mayor información" |
| Nombres bolivianos reales | Nombres genéricos |
| Emojis con moderación | Párrafos de marketing corporativo |

---

*Family Farm Bolivia · "Come sin culpa." · Santa Cruz, Bolivia*  
*@familyfarm_bolivia · wa.me/59175019023*
