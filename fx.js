/* ═══════════════════════════════════════════════════════════════
   Family Farm Bolivia — FX engine
   GSAP + ScrollTrigger + Lenis. Progressive enhancement:
   if the libs are missing or the user prefers reduced motion,
   every page falls back to its built-in IntersectionObserver
   animations and nothing breaks.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduced     = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP     = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var desktop     = window.innerWidth > 768;

  /* ── Film grain ─────────────────────────────────────────── */
  if (!reduced) {
    var grain = document.createElement('div');
    grain.className = 'fx-grain';
    grain.setAttribute('aria-hidden', 'true');
    document.body.appendChild(grain);
  }

  /* ── Preloader (only exists on index) ───────────────────── */
  var pre = document.getElementById('preloader');
  var preDone = false;

  function releasePreloader() {
    if (!pre || preDone) return;
    preDone = true;
    if (hasGSAP && !reduced) {
      var num = pre.querySelector('.pre-num');
      var bar = pre.querySelector('.pre-bar span');
      var count = { v: parseFloat(num && num.textContent) || 0 };
      gsap.to(count, {
        v: 100, duration: .5, ease: 'power2.out',
        onUpdate: function () {
          if (num) num.textContent = Math.round(count.v);
          if (bar) bar.style.width = count.v + '%';
        }
      });
      gsap.to(pre, {
        yPercent: -100, duration: .9, ease: 'power4.inOut', delay: .55,
        onComplete: function () { pre.remove(); playHeroIntro(); }
      });
    } else {
      pre.remove();
      playHeroIntro();
    }
  }

  if (pre) {
    if (hasGSAP && !reduced) {
      var num0 = pre.querySelector('.pre-num');
      var bar0 = pre.querySelector('.pre-bar span');
      var c0 = { v: 0 };
      gsap.to(c0, {
        v: 88, duration: 1.4, ease: 'power2.out',
        onUpdate: function () {
          if (preDone) return;
          if (num0) num0.textContent = Math.round(c0.v);
          if (bar0) bar0.style.width = c0.v + '%';
        }
      });
    }
    if (document.readyState === 'complete') setTimeout(releasePreloader, 500);
    else window.addEventListener('load', function () { setTimeout(releasePreloader, 250); });
    setTimeout(releasePreloader, 4000); // hard fallback
  }

  /* Anything below needs GSAP + motion allowed */
  if (!hasGSAP || reduced) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Lenis smooth scroll ────────────────────────────────── */
  var lenis = null;
  if (typeof window.Lenis !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'auto';
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        a.addEventListener('click', function (e) {
          var target = document.querySelector(id);
          if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -72 }); }
        });
      }
    });
  }

  /* ── Custom cursor ──────────────────────────────────────── */
  if (finePointer) {
    var dot  = document.createElement('div'); dot.className  = 'fx-cursor-dot';
    var ring = document.createElement('div'); ring.className = 'fx-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, ringScale = 1;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate(' + (mx - 4) + 'px,' + (my - 4) + 'px)';
    }, { passive: true });
    gsap.ticker.add(function () {
      rx += (mx - rx) * .14; ry += (my - ry) * .14;
      ring.style.transform = 'translate(' + (rx - 22) + 'px,' + (ry - 22) + 'px) scale(' + ringScale + ')';
    });
    document.addEventListener('mouseover', function (e) {
      var hit = e.target.closest('a, button, .btn, [data-tilt], .gallery-thumb, .faq-q, .filter-btn');
      ringScale = hit ? 1.75 : 1;
      ring.classList.toggle('is-hover', !!hit);
    });
  }

  /* ── Split text helper ──────────────────────────────────── */
  function splitChars(el) {
    if (el.dataset.fxSplit) return el.querySelectorAll('.fx-ch');
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var word = document.createElement('span');
            word.className = 'fx-word';
            part.split('').forEach(function (c) {
              var s = document.createElement('span');
              s.className = 'fx-ch';
              s.textContent = c;
              word.appendChild(s);
            });
            frag.appendChild(word);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.className.indexOf('fx-word') === -1) {
          walk(child);
        }
      });
    })(el);
    el.dataset.fxSplit = '1';
    return el.querySelectorAll('.fx-ch');
  }

  /* ── Take over the CSS fade system ──────────────────────── */
  [
    ['.fade-up',    { y: 60 }],
    ['.fade-left',  { x: -60 }],
    ['.fade-right', { x: 60 }],
    ['.scale-in',   { scale: .9 }]
  ].forEach(function (pair) {
    var els = gsap.utils.toArray(pair[0]);
    if (!els.length) return;
    els.forEach(function (el) {
      el.style.transition = 'none';
      el.classList.add('visible');
    });
    gsap.set(els, Object.assign({ opacity: 0 }, pair[1]));
    ScrollTrigger.batch(els, {
      start: 'top 88%',
      once: true,
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1, x: 0, y: 0, scale: 1,
          duration: 1, ease: 'power3.out', stagger: .09, overwrite: true
        });
      }
    });
  });

  /* ── Section title char reveals ─────────────────────────── */
  gsap.utils.toArray('.section-header h2, .story h2, .ugc h2').forEach(function (h) {
    var chars = splitChars(h);
    if (!chars.length) return;
    gsap.set(chars, { yPercent: 110, opacity: 0 });
    gsap.to(chars, {
      yPercent: 0, opacity: 1, duration: .9, ease: 'power4.out', stagger: .016,
      scrollTrigger: { trigger: h, start: 'top 88%', once: true }
    });
  });

  /* ── Hero intro timeline ────────────────────────────────── */
  var heroTl = null;
  var heroH1 = document.querySelector('.hero h1, .hero-historia h1, .hero-recetas h1, .product-info h1');
  if (heroH1) {
    var hChars = splitChars(heroH1);
    gsap.set(hChars, { yPercent: 120, opacity: 0 });
    heroTl = gsap.timeline({ paused: true });
    heroTl.to(hChars, { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power4.out', stagger: .022 });
    var addFrom = function (sel, vars, pos) {
      if (document.querySelector(sel)) heroTl.from(sel, vars, pos);
    };
    addFrom('.hero-sub',           { y: 30, opacity: 0, duration: .8, ease: 'power3.out' }, '-=.7');
    addFrom('.hero-tagline',       { y: 30, opacity: 0, duration: .8, ease: 'power3.out' }, '-=.6');
    addFrom('.hero-attrs .badge',  { y: 20, opacity: 0, duration: .5, ease: 'power2.out', stagger: .06 }, '-=.5');
    addFrom('.hero-ctas .btn',     { y: 24, opacity: 0, duration: .6, ease: 'power3.out', stagger: .1 }, '-=.4');
    addFrom('.hero-img-wrap',      { scale: .8, opacity: 0, duration: 1.1, ease: 'power3.out' }, .15);
    addFrom('.hero-float-badge',   { y: 30, opacity: 0, duration: .7, ease: 'back.out(1.6)', stagger: .15 }, '-=.6');
  }
  function playHeroIntro() { if (heroTl) heroTl.play(); }
  if (!pre) playHeroIntro();

  /* Hero circle: GSAP-driven float (replaces CSS keyframes so
     it can compose with the 3D tilt below) */
  var heroImg = document.querySelector('.hero-img-wrap');
  if (heroImg) {
    heroImg.style.animation = 'none';
    gsap.to(heroImg, { y: -16, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }

  /* ── Parallax [data-parallax] ───────────────────────────── */
  gsap.utils.toArray('[data-parallax]').forEach(function (el) {
    var speed = parseFloat(el.getAttribute('data-parallax')) || .2;
    gsap.to(el, {
      yPercent: speed * 100, ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') || el,
        start: 'top bottom', end: 'bottom top', scrub: true
      }
    });
  });

  /* ── 3D tilt ────────────────────────────────────────────── */
  document.querySelectorAll('.product-card, .gallery-main, .hero-img-story, .why-matters-img').forEach(function (el) {
    if (!el.hasAttribute('data-tilt')) el.setAttribute('data-tilt', '7');
  });
  if (finePointer) {
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-tilt')) || 8;
      el.style.transition = 'box-shadow .3s ease, border-color .3s ease';
      if (el.parentElement) el.parentElement.style.perspective = '900px';
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5;
        var py = (e.clientY - r.top) / r.height - .5;
        gsap.to(el, {
          rotationY: px * strength, rotationX: -py * strength,
          transformPerspective: 900, duration: .5, ease: 'power2.out'
        });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { rotationX: 0, rotationY: 0, duration: .8, ease: 'elastic.out(1,.55)' });
      });
    });
  }

  /* ── Magnetic buttons ───────────────────────────────────── */
  if (finePointer) {
    document.querySelectorAll('.hero-ctas .btn, .cta-band .btn, .btn-wa-nav').forEach(function (el) {
      el.style.transition = 'background .3s ease, box-shadow .3s ease, color .3s ease';
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * .35,
          y: (e.clientY - r.top - r.height / 2) * .35,
          duration: .4, ease: 'power2.out'
        });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(el, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.4)' });
      });
    });
  }

  /* ── Navbar hide on scroll down / reveal on scroll up ───── */
  var nav = document.querySelector('nav');
  if (nav) {
    nav.classList.add('fx-nav');
    ScrollTrigger.create({
      start: 'top top', end: 'max',
      onUpdate: function (self) {
        if (self.scroll() < 120) { nav.classList.remove('fx-hidden'); return; }
        nav.classList.toggle('fx-hidden', self.direction === 1);
      }
    });
  }

  /* ── Cinematic scrub scene: video scrubbed by scroll ────── */
  var scene = document.getElementById('scrub-scene');
  if (scene) {
    var vid   = scene.querySelector('video');
    var media = scene.querySelector('.scrub-media');
    var title = scene.querySelector('.scrub-title');
    var hint  = scene.querySelector('.scrub-hint');
    if (vid) { vid.pause(); try { vid.currentTime = 0; } catch (e) {} }
    var lastT = -1;
    var scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: scene, start: 'top top', end: '+=250%',
        scrub: .6, pin: true, anticipatePin: 1,
        onUpdate: function (self) {
          if (vid && vid.duration) {
            var t = vid.duration * Math.min(self.progress * 1.15, 1);
            if (Math.abs(t - lastT) > 1 / 30) { vid.currentTime = t; lastT = t; }
          }
        }
      }
    });
    scrubTl
      .fromTo(media,
        { rotationX: 14, scale: .78, yPercent: 6, transformPerspective: 1100, borderRadius: 28 },
        { rotationX: 0,  scale: 1,   yPercent: 0, borderRadius: 0, duration: .35, ease: 'power2.out' }, 0)
      .fromTo(title, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .3, ease: 'power2.out' }, .05)
      .to(title, { letterSpacing: '.08em', duration: .45, ease: 'none' }, .3)
      .to(hint,  { opacity: 0, duration: .1 }, .25)
      .to(title, { yPercent: -60, opacity: 0, duration: .3, ease: 'power2.in' }, .7);
  }

  /* ── Horizontal gallery (pinned, scroll-driven) ─────────── */
  var hg = document.getElementById('hgallery');
  if (hg && desktop) {
    var track  = hg.querySelector('.hg-track');
    var pinBox = hg.querySelector('.hg-pin');
    if (track && pinBox) {
      pinBox.classList.add('is-js');
      var dist = function () { return Math.max(0, track.scrollWidth - innerWidth + innerWidth * .08); };
      gsap.to(track, {
        x: function () { return -dist(); },
        ease: 'none',
        scrollTrigger: {
          trigger: hg, start: 'top top',
          end: function () { return '+=' + (dist() + innerHeight * .2); },
          scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true
        }
      });
    }
  }

  /* ── Kinetic type: counter-scroll + velocity skew ───────── */
  gsap.utils.toArray('.kinetic-track').forEach(function (track, i) {
    var dir = i % 2 === 0 ? -1 : 1;
    gsap.fromTo(track, { xPercent: dir * 2 }, {
      xPercent: dir * -12, ease: 'none',
      scrollTrigger: {
        trigger: track.parentElement,
        start: 'top bottom', end: 'bottom top', scrub: true
      }
    });
  });
  var kineticTracks = document.querySelectorAll('.kinetic-track');
  if (kineticTracks.length) {
    var proxy = { skew: 0 };
    var setters = Array.prototype.map.call(kineticTracks, function (t) {
      return gsap.quickSetter(t, 'skewX', 'deg');
    });
    var clampSkew = gsap.utils.clamp(-9, 9);
    ScrollTrigger.create({
      onUpdate: function (self) {
        var skew = clampSkew(self.getVelocity() / -350);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0, duration: .7, ease: 'power3', overwrite: true,
            onUpdate: function () {
              setters.forEach(function (s) { s(proxy.skew); });
            }
          });
        }
      }
    });
  }

  /* ── Cinematic image reveals (Ken Burns settle) ─────────── */
  gsap.utils.toArray('.story-img-wrap, .map-wrap, .hero-img-story, .why-matters-img, .hg-item figure').forEach(function (el) {
    var img = el.querySelector('img, iframe, video');
    if (!img) return;
    gsap.fromTo(img, { scale: 1.25 }, {
      scale: 1, duration: 1.4, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  /* Recalculate pinned distances once media has loaded */
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
