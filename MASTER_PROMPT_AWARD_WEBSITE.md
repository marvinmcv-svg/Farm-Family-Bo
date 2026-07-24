# 🏆 Master Prompt — Award-Winning Animated Brand Website

> Hand this entire file to your coding agent. It is a complete, self-contained
> specification for building a cinematic, scroll-driven, Awwwards-caliber
> marketing website from scratch — the same architecture and quality bar used
> to build the Family Farm Bolivia site.
>
> **How to use:** Replace everything in `{{ CURLY_BRACES }}` with your brand's
> details, then give the whole document to the agent as a single prompt. Keep
> the "Non-Negotiable Quality Bar," "Animation Engine," and "Build Rules"
> sections verbatim — they are what produce the quality.

---

## 0. Role & Mission (paste as-is)

You are a senior creative front-end engineer and motion designer. You build
cinematic, scroll-driven marketing sites that win Awwwards / FWA / CSS Design
Awards. You care about typography, restraint, choreography, and performance in
equal measure. You do not ship generic "Bootstrap-looking" pages.

Your mission: build a multi-page website for the brand described below that
feels like a premium editorial experience — not a template. Every scroll should
reveal something with intention. Motion should feel physical and expensive, never
gratuitous. The result must run at 60fps, degrade gracefully, and work perfectly
on mobile.

---

## 1. The Brand (fill this in)

- **Name:** {{ BRAND_NAME }}
- **One-line essence:** {{ e.g. "Artisan rice crackers, made with love in Santa Cruz, Bolivia" }}
- **Tagline / rallying cry:** {{ e.g. "Come sin culpa." — a short, ownable phrase }}
- **Story in one paragraph:** {{ the emotional origin — why this brand exists }}
- **Primary audience:** {{ who buys this, their emotional driver }}
- **Tone of voice:** {{ e.g. warm, honest, family-first, a little playful }}
- **Language:** {{ e.g. Spanish (es) }}
- **Key products / offerings:** {{ list 3–6 }}
- **Proof / credibility:** {{ testimonials, press, where it's sold, certifications }}
- **Primary conversion action:** {{ e.g. "Order via WhatsApp at wa.me/NNN" — the ONE thing every page drives toward }}
- **Real assets available:** {{ list your photos + videos, or say "provide named placeholders" }}
- **Social:** {{ Instagram handle, etc. }}

---

## 2. Non-Negotiable Quality Bar

These are the rules that separate an award site from a template. Do not skip any.

1. **Typography does the heavy lifting.** Use a 3-font system: a high-contrast
   **serif display** for headlines (e.g. Playfair Display), a clean **sans** for
   body (e.g. DM Sans), and a **condensed grotesk** for oversized kinetic/label
   type (e.g. Bebas Neue). Headlines should be large and confident —
   `clamp(36px, 5vw, 58px)` and bigger for hero moments. Oversized "kinetic"
   words can go `clamp(72px, 11vw, 190px)`.

2. **A disciplined color system, not a rainbow.** Define ~6 tokens as CSS custom
   properties and never deviate: one deep brand anchor color, one warm accent,
   one gold/highlight, a cream/off-white background, a near-black ink, and a
   muted gray. Dark sections (near-black / deep brand) between light sections
   create cinematic rhythm.

3. **Whitespace is a feature.** Generous section padding (`80px 0` desktop),
   max content width ~1120px, never edge-to-edge text.

4. **Every element enters with intention.** Nothing just "appears." Content
   reveals on scroll with staggered, eased motion. Section titles reveal
   character-by-character.

5. **60fps or it doesn't ship.** Only animate `transform` and `opacity`. Use
   `will-change` sparingly on animated elements. Never animate `width`,
   `height`, `top`, `left`, or `box-shadow` in scroll loops.

6. **Progressive enhancement is mandatory.** If JS fails, libraries are blocked,
   or the user has `prefers-reduced-motion: reduce`, the site must still be fully
   readable and usable with simple CSS fallbacks. The fancy layer is additive.

7. **Mobile is not an afterthought.** Pinned/horizontal scroll effects that don't
   work with touch must fall back to native swipe or vertical stacking. No
   horizontal page overflow ever (`document.scrollWidth <= innerWidth`).

8. **Self-host everything.** No CDN dependencies for critical libraries — vendor
   them locally so the site works offline and in restricted networks. (Google
   Fonts via `<link>` is the one acceptable exception.)

---

## 3. Tech Stack (exact)

- **Vanilla HTML + CSS + JS.** No framework, no build step, no npm at runtime.
  Every page is a standalone `.html` file with an inline `<style>` in `<head>`.
  Static hosting anywhere (Vercel, Railway, Netlify, S3).
- **Animation engine:** [GSAP 3.12.5](https://gsap.com) + **ScrollTrigger**
  plugin + [Lenis 1.1.x](https://github.com/darkroomengineering/lenis) for smooth
  scrolling. Download the minified builds into a local `/vendor` folder and load
  them with `<script defer>`. Do **not** hotlink a CDN.
- **Fonts:** Google Fonts via `<link>` (preconnect + display=swap).
- **Images/video:** local `/images` folder, named semantically
  (`hero-*.jpg`, `product-*.jpg`, `video-*.mp4`).

### File structure
```
/
├── index.html            ← homepage (the showcase — all signature effects live here)
├── {{ page2 }}.html       ← e.g. historia.html (story/about)
├── {{ page3 }}.html       ← e.g. producto.html (product detail)
├── {{ page4 }}.html       ← e.g. recetas.html (recipes/gallery/UGC)
├── fx.css                ← shared FX-layer styles (preloader, cursor, scenes…)
├── fx.js                 ← shared FX engine (GSAP/Lenis, all scroll behavior)
├── vendor/
│   ├── gsap.min.js
│   ├── ScrollTrigger.min.js
│   └── lenis.min.js
└── images/               ← photos + videos
```

Each page inlines its own layout CSS in `<head>`, then links the shared
`fx.css` and, before `</body>`, loads vendor scripts + `fx.js` (+ any page JS).

---

## 4. The Signature Effects (build all of these)

These are the "wow" moments. The homepage should feature **all** of them in a
deliberate sequence. Interior pages inherit the ambient layer (smooth scroll,
cursor, reveals, tilt) but need not repeat the heavy pinned scenes.

### 4.1 Cinematic Preloader
Full-screen dark panel on load. Brand wordmark in condensed type, a **0→100
counter**, and a thin progress bar that fills. On completion, the whole panel
**sweeps up and off** (`yPercent: -100`, `power4.inOut`) to reveal the hero.
Must self-destruct after a hard timeout (~4s) even if `load` never fires, and
must have a CSS-only fallback that fades it out if JS never runs. Only on the
homepage.

### 4.2 Hero Intro Choreography
When the preloader clears, play a timeline: the **headline splits into
characters** that cascade up (`yPercent: 120 → 0`, staggered ~0.02s), then
subtitle → attribute badges → CTA buttons → hero image/visual stagger in behind
it. The hero visual then holds a subtle infinite **float** (`y: -16, sine.inOut,
yoyo, repeat: -1`).

### 4.3 Scroll-Scrubbed Video Scene ("the 3D scrolly")
A full-viewport section that **pins** while a brand video **scrubs frame-by-frame
driven by scroll position** (not autoplay). As the user scrolls:
- The video container enters with a **3D tilt** (`rotationX: 14 → 0`, scaled up
  from `0.78 → 1`, `transformPerspective: 1100`) — like a screen rotating toward
  you.
- Set `video.currentTime = video.duration * progress` on ScrollTrigger update,
  throttled to ~30fps (only seek if the delta > 1/30s) so it stays smooth.
- Overlaid oversized headline (3 words, one per line, mixing solid / accent /
  outlined text) tracks its letter-spacing open, then dissolves up and out.
- `pin: true`, `scrub: 0.6`, `end: '+=250%'`, `anticipatePin: 1`.
- Give the `<video>` a `poster` (a still frame) so it looks right before metadata
  loads, and `muted playsinline preload="auto"`.

### 4.4 Pinned Horizontal Gallery
A dark section that **pins vertically while its content scrolls horizontally** —
the classic "scroll down = move right" gallery. Best photos in a row, alternating
vertical offsets for rhythm, numbered captions (`01 —`, `02 —`…). Drive `x` of
the track from scroll progress with `scrub: 1`, `invalidateOnRefresh: true`, and
recompute distance on resize. **Mobile fallback:** disable the pin and let it be
a native horizontal swipe (`overflow-x: auto; -webkit-overflow-scrolling: touch`).

### 4.5 Kinetic Typography Marquee
Oversized brand phrases (the tagline, key attributes) in condensed type repeated
across rows that **move horizontally on scroll** in alternating directions, with
a **scroll-velocity skew** — the faster you scroll, the more the type skews
(`skewX` clamped to ±9°, springing back to 0 with `power3`). Mix filled words
with `-webkit-text-stroke` outlined words. `aria-hidden="true"` — decorative.

### 4.6 Ambient Layer (every page)
- **Lenis smooth scroll** with GSAP ticker integration; hijack in-page anchor
  links to `lenis.scrollTo(target, { offset: -navHeight })`.
- **Custom cursor:** a small solid dot that tracks 1:1 + a larger ring that
  **lags behind** (lerp ~0.14) and **grows/tints** over interactive elements.
  Hidden on `pointer: coarse` (touch).
- **Scroll reveals:** take over the site's `.fade-up/.fade-left/.fade-right/
  .scale-in` classes with `ScrollTrigger.batch` — staggered, `power3.out`, once.
- **Section-title char reveals:** split every `h2` into characters, reveal on
  enter (`yPercent: 110 → 0`, stagger 0.016).
- **3D tilt** on cards & feature images (mouse-position → `rotationX/Y`, spring
  back with `elastic.out` on leave). Fine-pointer only.
- **Magnetic buttons:** primary CTAs pull toward the cursor within their bounds,
  spring back on leave. Fine-pointer only.
- **Parallax:** elements with `[data-parallax="0.2"]` drift at scroll-scrubbed
  offsets.
- **Navbar auto-hide:** hides on scroll-down, reveals on scroll-up, always shown
  near the top.
- **Ken Burns image settle:** feature images start at `scale: 1.25` and settle to
  `1` over `1.4s` when scrolled into view.
- **Film grain:** a fixed, subtle animated SVG-noise overlay (`opacity ~0.045`,
  `pointer-events: none`) for a filmic texture over everything.

---

## 5. The Animation Engine — Architecture (this is the crux)

Build **one** shared `fx.js`, loaded on every page, structured as a single IIFE.
This is the exact contract that makes it robust:

```
(function () {
  'use strict';

  // 1. Feature-detect up front
  var reduced     = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP     = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  var finePointer = matchMedia('(pointer: fine)').matches;
  var desktop     = innerWidth > 768;

  // 2. Things that are safe WITHOUT gsap (film grain, preloader release)
  //    run first — so even if GSAP is blocked, the preloader still clears.

  // 3. HARD GATE: if (!hasGSAP || reduced) return;
  //    Everything below is the additive "fancy" layer. Above this line the
  //    page is already fully functional via its own CSS/IntersectionObserver.

  gsap.registerPlugin(ScrollTrigger);

  // 4. Lenis smooth scroll wired to gsap.ticker + ScrollTrigger.update
  // 5. Custom cursor (finePointer only)
  // 6. splitChars() helper — wraps text nodes in per-word / per-char spans
  // 7. Take over .fade-* classes (kill their CSS transition, animate with GSAP)
  // 8. Section-title char reveals
  // 9. Hero intro timeline (paused; .play() when preloader done)
  // 10. Parallax, 3D tilt, magnetic buttons, navbar hide
  // 11. Scrub scene (only if #scrub-scene exists on the page)
  // 12. Horizontal gallery (only if #hgallery exists AND desktop)
  // 13. Kinetic type velocity-skew
  // 14. Ken Burns reveals
  // 15. window 'load' → ScrollTrigger.refresh()   // recalc after media loads
})();
```

**Guiding principles for the engine:**
- **Guard every scene by presence:** `var scene = document.getElementById('scrub-scene'); if (scene) { … }`. The same `fx.js` runs on all pages; each effect only activates if its markup exists.
- **The CSS is the source of truth for the resting state.** JS enhances. If JS never runs, CSS still shows a clean page (e.g. `.fade-up` has a CSS transition + an IntersectionObserver in the page's own script as the baseline; `fx.js` *replaces* that with nicer GSAP motion when available).
- **Split text must be idempotent** (guard with a `data-fx-split` flag) and must preserve spaces and nested inline elements.
- **Throttle scroll-driven video seeks** to ~30fps.
- **`invalidateOnRefresh` + recompute on resize** for anything measuring layout width (horizontal gallery).
- **`ScrollTrigger.refresh()` on `window.load`** so pinned distances are correct after images/video change layout height.

---

## 6. Page-by-Page Blueprint

### Homepage (`index.html`) — the showcase
Order of scenes (light/dark rhythm in parentheses):
1. Preloader → Hero with split-char headline + floating product visual (light)
2. Origin-story split section, image + emotional copy + pull-quote (dark)
3. **Scroll-scrubbed video scene** (dark, pinned)
4. Products grid, 3D-tilt cards, staggered reveal (light)
5. "Why us" value props (light/white)
6. Where-to-buy + embedded map (tinted)
7. Featured recipes/use-cases (light)
8. Testimonials (white)
9. **Pinned horizontal gallery** (dark)
10. Instagram/social feed grid (white)
11. **Kinetic typography** band (light)
12. Full-bleed CTA band driving the one conversion action (accent color)
13. Footer

### Story page — emotional long-form
Hero with kicker + big headline, first-person prose with pull-quotes, a
**vertical timeline** with iconographic milestones, values grid, a founder's
letter card, where-to-buy, CTA. Inherits ambient layer.

### Product page — conversion-focused
Breadcrumb, gallery (main image + clickable thumbnails that swap the main),
product info (badges, price/consult, quantity, primary CTA), ingredients +
nutrition table, "how to eat" toppings grid, reviews with rating summary,
FAQ accordion, related products. Inherits ambient layer.

### Recipes/Gallery page — engagement
Hero, sticky **filter chips** that show/hide cards by category, responsive
recipe-card grid (image-zoom on hover), an interactive quiz OR collaboration
form, a UGC/hashtag grid linking to social. Inherits ambient layer.

---

## 7. Component & Interaction Details

- **Buttons:** pill-shaped (`border-radius: 50px`), 3 variants (primary =
  brand, secondary = accent, outline). Lift + shadow on hover. Primary CTAs are
  magnetic.
- **Cards:** rounded (16–20px), soft brand-tinted shadow, lift on hover
  (`translateY(-8px)`), 3D tilt on mouse-move.
- **Images:** always layered — a real `<img>` with `object-fit: cover;
  position:absolute; inset:0` over a brand-gradient fallback, and
  `onerror="this.style.display='none'"` so a missing file reveals the gradient
  instead of a broken icon. **No emoji sitting on top of real photos.**
- **Floating action:** a persistent WhatsApp/CTA button bottom-corner with a
  hover tooltip.
- **Nav:** fixed, blurred translucent background, mobile hamburger → full-width
  dropdown; auto-hide on scroll.
- **Forms:** generous padding, branded focus states, no default browser styling.

---

## 8. Performance & Accessibility Checklist (verify before shipping)

- [ ] Only `transform` / `opacity` animated in scroll loops.
- [ ] `prefers-reduced-motion: reduce` → all heavy motion disabled, page fully usable.
- [ ] JS-blocked → preloader still clears, content still reveals (CSS/IO fallback).
- [ ] No horizontal overflow at 390px width (`scrollWidth <= innerWidth`).
- [ ] Pinned scenes disabled/replaced on touch; horizontal gallery = native swipe.
- [ ] Custom cursor hidden on touch.
- [ ] All `<video>` are `muted playsinline preload="auto"` with a `poster`.
- [ ] Every image has `alt`; decorative kinetic type is `aria-hidden`.
- [ ] In-page anchors scroll smoothly with the right nav offset.
- [ ] Semantic headings, sufficient color contrast, keyboard-focusable interactives.
- [ ] `ScrollTrigger.refresh()` after media load so pins measure correctly.
- [ ] 60fps on a mid-range laptop; no jank entering/leaving pinned scenes.

---

## 9. How to Verify (the agent must actually test)

Don't trust "it looks right in the code." Serve the site and drive it in a real
headless browser (Playwright/Puppeteer, Chromium):
1. Load each page; assert **zero** console/page errors and no failed requests.
2. Assert GSAP/ScrollTrigger/Lenis are defined and the preloader is removed.
3. Programmatically scroll into each pinned scene; assert the scrub video's
   `currentTime` advances and the horizontal track's `transform` changes.
4. Screenshot hero, scrub scene, gallery, kinetic band — eyeball them.
5. Repeat at 390px width; assert no horizontal overflow and native-swipe fallback.
6. Toggle `prefers-reduced-motion`; assert the page is still readable/usable.

---

## 10. Deliverables

- All page `.html` files, `fx.css`, `fx.js`, vendored libraries in `/vendor`,
  and an `/images` folder (real assets or clearly-named placeholders with graceful
  fallbacks).
- A short `README.md`: how to run locally (`npx serve .`), the image-naming map,
  and any `{{ placeholders }}` (prices, links, coordinates) the owner must fill.
- Commit in logical chunks with clear messages. Static-hostable as-is.

---

### Final instruction to the agent
Build the homepage first and get its signature scenes (preloader, hero
choreography, scrub video, horizontal gallery, kinetic type) feeling
*expensive* before moving to interior pages. Restraint over noise: if an effect
doesn't serve the story or the sale, cut it. The bar is "a stranger scrolls this
and wants to buy / share it." Ship nothing that isn't 60fps and gracefully
degradable.
