/* =========================================================
   MARU — 2026 portfolio · interactions
   ========================================================= */
(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer  = window.matchMedia('(pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v === null ? fallback : v; }
      catch { return fallback; }
    },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} }
  };

  /* =========================================================
     data
     ========================================================= */
  const IMG = (name) => `img/web/${name}.webp`;
  const images = (arr) => arr.map(([name, label]) => ({ name, label, src: IMG(name) }));

  const PROJECTS = {
    nexumo: {
      title: 'Nexumo',
      display: 'Nexumo',
      cat: 'E-commerce · Web',
      year: '2026',
      role: 'Diseño UI & frontend',
      context: 'Tienda online de reventa',
      desc: [
        'Nexumo es una tienda de productos de reventa con un catálogo que se puede filtrar por categoría, precio y disponibilidad. La home vende antes de que hagas scroll: oferta, contador y productos en stock.',
        'El trabajo fue construir una identidad oscura con acento rojo sin sacrificar legibilidad: carrito, checkout, reseñas y preguntas frecuentes <b>en el mismo lenguaje visual</b>. Todo responsive y con estados de carga cuidados.'
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'E-commerce', 'Responsive'],
      cover: 'tienda_online_1',
      images: images([
        ['tienda_online_1', 'Home · oferta y catálogo'],
        ['tienda_online_2', 'Catálogo filtrable'],
        ['tienda_online_3', 'Detalle de producto'],
        ['tienda_online_4', 'Reseñas y FAQ'],
        ['tienda_online_5', 'Flujo de compra']
      ])
    },

    maloa: {
      title: 'Maloa Moscato',
      display: 'Maloa <em>Moscato</em>',
      cat: 'Branding · Web',
      year: '2026',
      role: 'Dirección de arte & frontend',
      context: 'Peluquería en Poblenou, Barcelona',
      desc: [
        'Web para una peluquería con más de 20 años de trayectoria. La dirección de arte tira de serif editorial, fotografía cálida y mucho aire: la marca tenía que sentirse tan cuidada como un corte.',
        'Incluye presentación, servicios con precios, galería, opiniones y reserva. El reto fue que la elegancia no se comiera la claridad: <b>cada sección se lee en segundos</b> y la reserva está siempre a un click.'
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'Branding', 'Responsive'],
      cover: 'proyecto_tienda_peluqueria',
      images: images([
        ['proyecto_tienda_peluqueria', 'Hero · dirección de arte'],
        ['proyecto_tienda_peluqueria2', 'Historia de la marca'],
        ['proyecto_tienda_peluqueria3', 'Servicios y precios'],
        ['proyecto_tienda_peluqueria4', 'Reserva y contacto']
      ])
    },

    spainrp: {
      title: 'Spain RP',
      display: 'Spain <em>RP</em>',
      cat: 'Plataforma web · Game UI',
      year: '2026',
      role: 'Diseño & desarrollo',
      context: 'Servidor de rol policial (PSN)',
      desc: [
        'Spain RP necesitaba una web pública y una PDA para dentro del juego. La web reúne normativa, código penal consultable, zonas de riesgo y solicitudes; la PDA lleva la misma identidad al roleplay con fichas de ciudadanos, sanciones y licencias.',
        'El reto fue unificar dos contextos muy distintos —navegador y NUI— con <b>una jerarquía clara</b>, modo oscuro y componentes reutilizables. Datos densos sin que parezca una hoja de cálculo.'
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'FiveM NUI', 'Lua', 'MySQL'],
      cover: 'proyecto_web_rp',
      images: images([
        ['proyecto_web_rp', 'Landing · Spain RP'],
        ['proyecto_web_rp2', 'Código penal consultable'],
        ['proyecto_web_rp3', 'Zonas seguras y de riesgo'],
        ['proyecto_pda_0', 'PDA · escritorio'],
        ['proyecto_pda_1', 'PDA · panel de administración'],
        ['proyecto_pda_2', 'PDA · ficha de ciudadano'],
        ['proyecto_pda_3', 'PDA · sanciones y licencias']
      ])
    },

    frente: {
      title: 'Frente Hispano',
      display: 'Frente <em>Hispano</em>',
      cat: 'FiveM · Web & Dashboard',
      year: '2026',
      role: 'Diseño & desarrollo fullstack',
      context: 'Servidor de roleplay en FiveM',
      desc: [
        'Sitio oficial de Frente Hispano. Estado del servidor en vivo, normativa, controles interactivos, formularios de contacto y reporte, y un panel de staff con métricas de jugadores y sanciones.',
        'La prioridad era que la comunidad encontrara todo sin perderse y que el staff tuviera <b>datos útiles a un vistazo</b>. La página de controles convierte las teclas en una interfaz explorable en lugar de una lista de texto.'
      ],
      stack: ['HTML', 'CSS', 'JavaScript', 'FiveM', 'Dashboard', 'API'],
      cover: 'proyecto_web_rp4',
      images: images([
        ['proyecto_web_rp4', 'Home · estado en vivo'],
        ['proyecto_web_rp5', 'Comunidad y métricas'],
        ['proyecto_web_rp6', 'Controles interactivos'],
        ['proyecto_web_rp7', 'Contacto y reportes'],
        ['proyecto_web_panel_staff', 'Panel de staff']
      ])
    },

    phantom: {
      title: 'Phantom RP',
      display: 'Phantom <em>RP</em>',
      cat: 'FiveM · NUI',
      year: '2026',
      role: 'UI design & NUI',
      context: 'Tablet de solicitudes de robo',
      desc: [
        'Tablet dentro de Phantom RP para pedir atracos. El jugador elige ubicación, vehículo y acompañantes; el staff revisa la solicitud y la acepta o rechaza con un motivo.',
        'Estados, historial, perfil y estadísticas en una <b>glass UI oscura</b> que se integra en la partida sin romper la inmersión. Feedback inmediato para que nadie se quede mirando una pantalla vacía.'
      ],
      stack: ['Lua', 'FiveM', 'NUI', 'HTML/CSS', 'UX'],
      cover: 'script_robos_fivem2',
      images: images([
        ['script_robos_fivem2', 'Mis solicitudes'],
        ['script_robos_fivem', 'Nueva solicitud'],
        ['script_robos_fivem3', 'Estadísticas'],
        ['script_robos_fivem4', 'Detalle de solicitud'],
        ['script_robos_fivem5', 'Perfil de usuario']
      ])
    },

    bot: {
      title: 'Ops Bot',
      display: 'Ops <em>Bot</em>',
      cat: 'Discord · Automatización',
      year: '2026',
      role: 'Desarrollo & diseño de embeds',
      context: 'Staff de servidores FiveM',
      desc: [
        'Bot de operaciones para Discord: registra DNIs, alertas de seguridad e IPs en embeds claros y accionables, y automatiza tareas repetitivas del staff.',
        'Cada evento queda trazado con usuario, fecha, datos y contexto, pero <b>sin llenar el servidor de ruido</b>. La información se agrupa y se presenta como una ficha, no como un volcado de logs.'
      ],
      stack: ['discord.js', 'Node.js', 'MongoDB', 'Webhooks'],
      cover: 'bot_log_dni',
      link: 'https://github.com/MaruMC123/Moderation_Bot',
      images: images([
        ['bot_log_dni', 'Log · registro de DNI'],
        ['bot_log_seguridad', 'Log · alerta de seguridad'],
        ['bot_embed_v2', 'Embed · ficha de usuario'],
        ['registro_bot_iplogger', 'Log · registro de IP']
      ])
    },

    fivemkit: {
      title: 'FiveM Essentials',
      display: 'FiveM <em>Essentials</em>',
      cat: 'FiveM · Scripts & UI',
      year: '2025',
      role: 'Scripting & NUI',
      context: 'Servidores ESX / QBCore',
      desc: [
        'Tres sistemas que resumen mi etapa de scripting: un HUD minimalista, una cárcel IC con logs en Discord y el script de camionero con el que empecé a diseñar sistemas completos.',
        'Cada uno con su NUI, sus estados y persistencia. Piezas pensadas para funcionar en servidores con <b>carga real</b>, no solo en la demo.'
      ],
      stack: ['Lua', 'ESX', 'QBCore', 'NUI', 'MySQL'],
      cover: 'hud',
      images: images([
        ['hud', 'HUD personalizado'],
        ['jail_1', 'Sistema de cárcel (IC)'],
        ['jail_2', 'Cárcel · logs en Discord'],
        ['truker_job', 'Script camionero']
      ])
    },

    astri: {
      title: 'Astri Hub',
      display: 'Astri <em>Hub</em>',
      cat: 'Minecraft · Founder',
      year: '2025',
      role: 'Founder & desarrollo',
      context: 'Servidor de Minecraft',
      desc: [
        'Astri Hub fue mi primera aventura como founder: un servidor de Minecraft con economía, protecciones, minijuegos y una comunidad activa.',
        'Aprendí que un proyecto es tanto código como personas: moderar, escuchar y priorizar. <b>La primera vez que algo que construí tuvo usuarios reales.</b>'
      ],
      stack: ['Java', 'Spigot', 'Paper', 'Community'],
      cover: 'astrihub',
      images: images([
        ['astrihub', 'Astri Hub · 2025']
      ])
    }
  };

  const ORDER = Object.keys(PROJECTS);
  const pad = (n) => String(n).padStart(2, '0');

  /* =========================================================
     loader
     ========================================================= */
  const loader = $('#loader');
  const loadCount = $('#loadCount');
  const loadBar = $('#loadBar');

  document.body.classList.add('is-locked');

  const finishLoad = () => {
    if (!loader) return;
    loader.classList.add('done');
    document.body.classList.remove('is-locked');
    document.body.classList.add('is-loaded');
    window.setTimeout(() => loader.remove(), 1300);
  };

  if (loader) {
    const duration = reduceMotion ? 250 : 1150;
    const start = performance.now();
    const tick = (now) => {
      const p = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (loadCount) loadCount.textContent = String(Math.round(eased * 100)).padStart(3, '0');
      if (loadBar) loadBar.style.transform = `scaleX(${eased})`;
      if (p < 1) requestAnimationFrame(tick);
      else window.setTimeout(finishLoad, 120);
    };
    requestAnimationFrame(tick);
  } else {
    document.body.classList.remove('is-locked');
    document.body.classList.add('is-loaded');
  }

  /* =========================================================
     clock
     ========================================================= */
  const clockEls = [$('#navClock'), $('#heroClock'), $('#contactClock')].filter(Boolean);
  const fmtTime = new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Madrid'
  });
  const tickClock = () => {
    const t = fmtTime.format(new Date());
    clockEls.forEach((el) => { el.textContent = t; });
  };
  tickClock();
  window.setInterval(tickClock, 15000);

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* =========================================================
     navigation / menu
     ========================================================= */
  const nav = $('#nav');
  const burger = $('#burger');
  const menu = $('#menu');

  const closeMenu = () => {
    if (!menu || !burger) return;
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('is-locked');
  };

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = !menu.classList.contains('open');
      menu.classList.toggle('open', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.classList.toggle('is-locked', open);
    });
  }

  const scrollToId = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  };

  $$('[data-scroll]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const id = el.dataset.scroll;
      if (!id) return;
      e.preventDefault();
      closeMenu();
      scrollToId(id);
    });
  });

  if (menu) {
    $$('.menu__links a').forEach((a, i) => {
      a.style.transitionDelay = `${120 + i * 55}ms`;
    });
  }

  const toTop = $('#toTop');
  if (toTop) {
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  }

  /* =========================================================
     reveal / counters / signature
     ========================================================= */
  const revealEls = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('in'));
  } else {
    const revealObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => revealObs.observe(el));
  }

  const signature = $('#signature');
  if (signature) {
    if (reduceMotion || !('IntersectionObserver' in window)) signature.classList.add('in');
    else {
      const sigObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { signature.classList.add('in'); sigObs.disconnect(); }
        });
      }, { threshold: 0.4 });
      sigObs.observe(signature);
    }
  }

  // counters
  const counters = $$('[data-count]');
  const animateCounter = (el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const duration = 1300;
    const start = performance.now();
    const step = (now) => {
      const p = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const countObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        animateCounter(e.target);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => countObs.observe(el));
  } else {
    counters.forEach(animateCounter);
  }

  /* =========================================================
     scroll progress + rail + timeline drawing
     ========================================================= */
  const progressBar = $('#progressBar');
  const railLinks = $$('[data-rail]');
  const timeline = $('#timeline');
  const timelinePath = $('#timelinePath');
  const timelineTip = $('#timelineTip');
  const navLinks = $$('.nav__links a');

  const sectionIds = ['about', 'work', 'play', 'path', 'contact'];
  let scrollTicking = false;

  const updateScrollUi = () => {
    scrollTicking = false;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;

    if (progressBar) progressBar.style.transform = `scaleX(${p})`;
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);

    // active section
    let current = '';
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top <= window.innerHeight * 0.45 && r.bottom > window.innerHeight * 0.35) current = id;
    });
    railLinks.forEach((a) => a.classList.toggle('active', a.dataset.rail === current));
    navLinks.forEach((a) => a.classList.toggle('active', a.dataset.scroll === current));

    // timeline line drawing
    if (timeline && timelinePath) {
      const r = timeline.getBoundingClientRect();
      const start = window.innerHeight * 0.78;
      const raw = (start - r.top) / Math.max(r.height, 1);
      const lineProgress = clamp(raw, 0, 1);
      timelinePath.style.strokeDashoffset = String(1 - lineProgress);
      if (timelineTip) {
        timelineTip.style.top = `${lineProgress * 100}%`;
        timelineTip.classList.toggle('on', lineProgress > 0.01 && lineProgress < 0.995);
      }
    }
  };

  const requestScrollUi = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScrollUi);
  };

  window.addEventListener('scroll', requestScrollUi, { passive: true });
  window.addEventListener('resize', requestScrollUi);
  updateScrollUi();

  // timeline items activation
  const timelineItems = $$('.timeline__item');
  if ('IntersectionObserver' in window) {
    const lineObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); lineObs.unobserve(e.target); }
      });
    }, { threshold: 0.35 });
    timelineItems.forEach((el) => lineObs.observe(el));
  } else {
    timelineItems.forEach((el) => el.classList.add('in'));
  }

  /* =========================================================
     flow-field canvas
     ========================================================= */
  const flow = $('#flow');
  if (flow) {
    const ctx = flow.getContext('2d');
    let width = 0, height = 0, dpr = 1;
    let particles = [];
    let raf = 0;
    let running = true;
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };

    const makeParticle = (spawnAnywhere = true) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      px: 0, py: 0,
      life: spawnAnywhere ? Math.random() * 260 : 0,
      accent: Math.random() < 0.08,
      speed: 0.35 + Math.random() * 0.7
    });

    const seed = () => {
      const count = reduceMotion ? 120 : clamp(Math.floor((width * height) / 3800), 140, 480);
      particles = Array.from({ length: count }, () => makeParticle(true));
      particles.forEach((p) => { p.px = p.x; p.py = p.y; });
    };

    const resize = () => {
      const rect = flow.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      flow.width = Math.floor(width * dpr);
      flow.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#08080a';
      ctx.fillRect(0, 0, width, height);
      seed();
      if (reduceMotion) drawStatic();
    };

    const field = (x, y, t) =>
      (Math.sin(x * 0.0023 + t * 0.32) +
       Math.cos(y * 0.0027 - t * 0.22) +
       Math.sin((x + y) * 0.0013 + t * 0.16)) * Math.PI * 0.75;

    const drawStatic = () => {
      ctx.fillStyle = 'rgba(242,240,234,.16)';
      for (let i = 0; i < 260; i++) {
        const x = (i * 137.5) % width;
        const y = (i * 89.3) % height;
        ctx.fillRect(x, y, 1, 1);
      }
    };

    const frame = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!visible) return;

      const t = now * 0.001;
      // trailing fade
      ctx.fillStyle = 'rgba(8,8,10,.07)';
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 0.7;

      for (const p of particles) {
        const angle = field(p.x, p.y, t);
        const nx = p.x + Math.cos(angle) * p.speed;
        const ny = p.y + Math.sin(angle) * p.speed;

        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = p.accent ? 'rgba(216,255,62,.42)' : 'rgba(242,240,234,.12)';
        ctx.stroke();

        // soft pointer attraction
        if (pointer.active) {
          const dx = pointer.x - nx;
          const dy = pointer.y - ny;
          const d2 = dx * dx + dy * dy;
          if (d2 < 18000 && d2 > 1) {
            const f = 0.35 / Math.sqrt(d2);
            p.x += dx * f * 2;
            p.y += dy * f * 2;
          }
        }

        p.px = nx;
        p.py = ny;
        p.x = nx;
        p.y = ny;
        p.life += 1;

        if (p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20 || p.life > 300) {
          Object.assign(p, makeParticle(false));
          p.px = p.x;
          p.py = p.y;
        }
      }
    };

    flow.addEventListener('pointermove', (e) => {
      const r = flow.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    }, { passive: true });
    flow.addEventListener('pointerleave', () => { pointer.active = false; });

    if ('IntersectionObserver' in window) {
      const visObs = new IntersectionObserver((entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      }, { threshold: 0 });
      visObs.observe(flow);
    }
    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden && document.getElementById('hero')?.getBoundingClientRect().bottom > 0;
    });

    window.addEventListener('resize', resize);

    resize();
    if (!reduceMotion) raf = requestAnimationFrame(frame);
  }

  /* =========================================================
     deck pointer parallax
     ========================================================= */
  const deck = $('#deck');
  if (deck && finePointer && !reduceMotion) {
    const cards = $$('.deck__card', deck);
    const hero = $('#hero');
    hero?.addEventListener('pointermove', (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      cards.forEach((card, i) => {
        const depth = (i + 1) * 6;
        card.style.setProperty('--px', `${(-x * depth).toFixed(2)}px`);
        card.style.setProperty('--py', `${(-y * depth).toFixed(2)}px`);
      });
    }, { passive: true });
    hero?.addEventListener('pointerleave', () => {
      cards.forEach((card) => {
        card.style.setProperty('--px', '0px');
        card.style.setProperty('--py', '0px');
      });
    });
  }

  /* =========================================================
     work filters + floating preview + scramble
     ========================================================= */
  const rows = $$('.work-row');
  const workCount = $('#workCount');
  const filterButtons = $$('.filters button');

  const visibleLabel = (count) => `${pad(count)} ${count === 1 ? 'proyecto' : 'proyectos'}`;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
      let shown = 0;
      rows.forEach((row) => {
        const match = filter === 'all' || row.dataset.cat === filter;
        row.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      if (workCount) workCount.textContent = visibleLabel(shown);
    });
  });

  const preview = $('#preview');
  const previewImg = $('#previewImg');
  const previewLabel = $('#previewLabel');
  let previewVisible = false;
  let previewX = 0, previewY = 0, previewTX = 0, previewTY = 0;

  const previewLoop = () => {
    if (!previewVisible) return;
    previewX += (previewTX - previewX) * 0.16;
    previewY += (previewTY - previewY) * 0.16;
    if (preview) preview.style.transform = `translate3d(${previewX}px, ${previewY}px, 0) scale(1) rotate(-2deg)`;
    requestAnimationFrame(previewLoop);
  };

  const showPreview = (row, e) => {
    if (!preview || !previewImg || !finePointer || window.innerWidth < 900) return;
    const project = PROJECTS[row.dataset.project];
    if (!project) return;
    previewImg.src = `img/web/${project.cover}-thumb.webp`;
    previewImg.alt = project.title;
    if (previewLabel) previewLabel.textContent = project.title;
    previewX = e.clientX + 24;
    previewY = e.clientY - 110;
    previewTX = previewX;
    previewTY = previewY;
    previewVisible = true;
    preview.classList.add('on');
    preview.style.transform = `translate3d(${previewX}px, ${previewY}px, 0) scale(1) rotate(-2deg)`;
    requestAnimationFrame(previewLoop);
  };

  const movePreview = (e) => {
    const w = preview ? preview.offsetWidth : 380;
    const h = preview ? preview.offsetHeight : 238;
    previewTX = clamp(e.clientX + 28, 10, window.innerWidth - w - 14);
    previewTY = clamp(e.clientY - h / 2, 10, window.innerHeight - h - 14);
  };

  const hidePreview = () => {
    previewVisible = false;
    preview?.classList.remove('on');
  };

  rows.forEach((row) => {
    row.addEventListener('mouseenter', (e) => showPreview(row, e));
    row.addEventListener('mousemove', movePreview);
    row.addEventListener('mouseleave', hidePreview);
    row.addEventListener('focus', () => {
      const project = PROJECTS[row.dataset.project];
      if (project && preview && finePointer) {
        previewImg.src = `img/web/${project.cover}-thumb.webp`;
        if (previewLabel) previewLabel.textContent = project.title;
        const r = row.getBoundingClientRect();
        previewX = previewTX = window.innerWidth - 420;
        previewY = previewTY = r.top + r.height / 2 - 120;
        previewVisible = true;
        preview.classList.add('on');
        requestAnimationFrame(previewLoop);
      }
    });
    row.addEventListener('blur', hidePreview);

    const title = $('[data-scramble]', row);
    if (title && !reduceMotion) {
      row.addEventListener('mouseenter', () => scramble(title));
      row.addEventListener('focus', () => scramble(title));
    }
  });

  const scrambleChars = '!<>-_\\/[]{}=+*^?#';
  const scrambleTimers = new WeakMap();
  function scramble(el) {
    const original = el.dataset.original || el.textContent;
    el.dataset.original = original;
    clearInterval(scrambleTimers.get(el));
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      el.textContent = original.split('').map((ch, i) => {
        if (ch === ' ') return ' ';
        if (i < frame / 2) return original[i];
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }).join('');
      if (frame > original.length * 2 + 6) {
        clearInterval(timer);
        el.textContent = original;
      }
    }, 26);
    scrambleTimers.set(el, timer);
  }

  /* =========================================================
     modal + lightbox
     ========================================================= */
  const modal = $('#modal');
  const modalScroll = $('#modalScroll');
  const modalCover = $('#modalCover');
  const modalTitle = $('#modalTitle');
  const modalCat = $('#modalCat');
  const modalDesc = $('#modalDesc');
  const modalRole = $('#modalRole');
  const modalYear = $('#modalYear');
  const modalContext = $('#modalContext');
  const modalStack = $('#modalStack');
  const modalIndex = $('#modalIndex');
  const modalCount = $('#modalCount');
  const modalGallery = $('#modalGallery');
  const modalNextName = $('#modalNextName');
  const modalNext = $('#modalNext');
  const modalLinkRow = $('#modalLinkRow');
  const modalLink = $('#modalLink');
  const modalClose = $('#modalClose');

  let activeProjectId = null;
  let lastFocused = null;

  const lockBody = (lock) => {
    document.body.classList.toggle('is-locked', lock);
    if (lock) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = sw > 0 ? `${sw}px` : '';
    } else {
      document.body.style.paddingRight = '';
    }
  };

  const openProject = (id) => {
    const project = PROJECTS[id];
    if (!project || !modal) return;

    lastFocused = document.activeElement;
    activeProjectId = id;
    const idx = ORDER.indexOf(id);

    modalIndex.textContent = `Proyecto ${pad(idx + 1)} / ${pad(ORDER.length)}`;
    modalCover.src = IMG(project.cover);
    modalCover.alt = `${project.title} — ${project.cat}`;
    modalTitle.innerHTML = project.display;
    modalCat.innerHTML = `${project.cat}<b>${project.year}</b>`;
    modalDesc.innerHTML = project.desc.map((p) => `<p>${p}</p>`).join('');
    modalRole.textContent = project.role;
    modalYear.textContent = project.year;
    modalContext.textContent = project.context;
    modalStack.innerHTML = project.stack.map((s) => `<span>${s}</span>`).join('');
    modalCount.textContent = String(project.images.length);

    if (project.link) {
      modalLinkRow.hidden = false;
      modalLink.href = project.link;
    } else {
      modalLinkRow.hidden = true;
      modalLink.removeAttribute('href');
    }

    modalGallery.innerHTML = project.images.map((im, i) => `
      <figure data-index="${i}" tabindex="0" role="button" aria-label="Ampliar ${im.label}">
        <img src="${im.src}" alt="${project.title} — ${im.label}" loading="lazy" width="1600" height="900" decoding="async">
        <figcaption>${im.label}</figcaption>
      </figure>
    `).join('');

    const nextId = ORDER[(idx + 1) % ORDER.length];
    if (modalNextName) modalNextName.textContent = PROJECTS[nextId].title;
    modalNext?.setAttribute('data-next', nextId);

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    lockBody(true);
    if (modalScroll) modalScroll.scrollTop = 0;
    window.setTimeout(() => modalClose?.focus({ preventScroll: true }), 120);
  };

  const closeProject = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    activeProjectId = null;
    lockBody(false);
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus({ preventScroll: true });
    }
  };

  $$('[data-project]').forEach((el) => {
    el.addEventListener('click', () => openProject(el.dataset.project));
  });

  modalClose?.addEventListener('click', closeProject);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeProject(); });

  modalNext?.addEventListener('click', () => {
    const next = modalNext.dataset.next;
    if (next) openProject(next);
  });

  modalGallery?.addEventListener('click', (e) => {
    const fig = e.target.closest('figure');
    if (!fig) return;
    const project = PROJECTS[activeProjectId];
    if (!project) return;
    openLightbox(project.images.map((im) => ({ src: im.src, alt: `${project.title} — ${im.label}` })), Number(fig.dataset.index));
  });

  modalGallery?.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const fig = e.target.closest('figure');
    if (!fig) return;
    e.preventDefault();
    fig.click();
  });

  // focus trap inside modal
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !modal?.classList.contains('open')) return;
    const focusables = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', modal)
      .filter((el) => el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* lightbox */
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const lightboxCount = $('#lightboxCount');
  const lightboxClose = $('#lightboxClose');
  const lightboxPrev = $('#lightboxPrev');
  const lightboxNext = $('#lightboxNext');
  let lightboxItems = [];
  let lightboxIndex = 0;

  function renderLightbox() {
    if (!lightboxImg || !lightboxItems.length) return;
    const item = lightboxItems[lightboxIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    if (lightboxCount) lightboxCount.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
  }

  function openLightbox(items, index = 0) {
    lightboxItems = items;
    lightboxIndex = clamp(index, 0, items.length - 1);
    renderLightbox();
    lightbox?.classList.add('open');
    lightbox?.setAttribute('aria-hidden', 'false');
    lockBody(true);
    lightboxClose?.focus({ preventScroll: true });
  }

  function closeLightbox() {
    lightbox?.classList.remove('open');
    lightbox?.setAttribute('aria-hidden', 'true');
    if (!modal?.classList.contains('open')) lockBody(false);
  }

  const stepLightbox = (dir) => {
    if (!lightboxItems.length) return;
    lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
  };

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', () => stepLightbox(-1));
  lightboxNext?.addEventListener('click', () => stepLightbox(1));
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (lightbox?.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') stepLightbox(-1);
      else if (e.key === 'ArrowRight') stepLightbox(1);
      return;
    }
    if (e.key === 'Escape' && modal?.classList.contains('open')) closeProject();
  });

  /* =========================================================
     copy + toast
     ========================================================= */
  const toast = $('#toast');
  let toastTimer = 0;
  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('on'), 2200);
  };

  $$('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        showToast('Copiado al portapapeles');
      } catch {
        showToast('No se pudo copiar');
      }
    });
  });

  /* =========================================================
     cursor + magnetic
     ========================================================= */
  if (finePointer && !reduceMotion) {
    document.body.classList.add('has-cursor');
    const cursor = $('#cursor');
    const cursorLabel = $('#cursorLabel');
    const dot = $('.cursor__dot', cursor || document);
    const ring = $('.cursor__ring', cursor || document);

    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let rx = tx, ry = ty;

    const moveCursor = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dot) dot.style.translate = `${tx}px ${ty}px`;
    };

    const cursorLoop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ring) ring.style.translate = `${rx}px ${ry}px`;
      requestAnimationFrame(cursorLoop);
    };
    requestAnimationFrame(cursorLoop);
    window.addEventListener('pointermove', moveCursor, { passive: true });

    document.addEventListener('pointerover', (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, textarea, [role="button"]');
      if (!target) {
        cursor?.classList.remove('is-hover', 'has-label');
        return;
      }
      cursor?.classList.add('is-hover');
      const label = target.dataset.cursor;
      if (label && cursorLabel) {
        cursorLabel.textContent = label;
        cursor?.classList.add('has-label');
      } else {
        cursor?.classList.remove('has-label');
      }
    });

    document.addEventListener('pointerleave', () => {
      if (cursor) cursor.style.opacity = '0';
    });
    document.addEventListener('pointerenter', () => {
      if (cursor) cursor.style.opacity = '1';
    });

    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        el.style.translate = `${(mx * 0.16).toFixed(1)}px ${(my * 0.2).toFixed(1)}px`;
      });
      el.addEventListener('pointerleave', () => { el.style.translate = '0px 0px'; });
    });
  }

  /* =========================================================
     sound
     ========================================================= */
  let audioCtx = null;
  let soundOn = store.get('maru:sound', 'on') !== 'off';
  const soundToggle = $('#soundToggle');
  const soundLabel = $('#soundLabel');

  const refreshSoundUi = () => {
    if (!soundToggle || !soundLabel) return;
    soundToggle.setAttribute('aria-pressed', soundOn ? 'true' : 'false');
    soundLabel.textContent = soundOn ? 'Sonido on' : 'Sonido off';
  };
  refreshSoundUi();

  soundToggle?.addEventListener('click', () => {
    soundOn = !soundOn;
    store.set('maru:sound', soundOn ? 'on' : 'off');
    refreshSoundUi();
    if (soundOn) sfx(620, 0.07, 'sine', 0.03);
  });

  function sfx(freq = 440, duration = 0.08, type = 'sine', volume = 0.035) {
    if (!soundOn) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioCtx ||= new Ctx();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration + 0.02);
    } catch { /* no audio, no pasa nada */ }
  }

  /* =========================================================
     mini-game · snake
     ========================================================= */
  const snakeCanvas = $('#snakeCanvas');
  if (snakeCanvas) {
    const ctx = snakeCanvas.getContext('2d');
    const W = 480, H = 300, COLS = 24, ROWS = 15, CELL = 20;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    snakeCanvas.width = W * dpr;
    snakeCanvas.height = H * dpr;
    snakeCanvas.style.aspectRatio = `${W} / ${H}`;
    ctx.scale(dpr, dpr);

    const overlay = $('#snakeOverlay');
    const startBtn = $('#snakeStart');
    const scoreEl = $('#snakeScore');
    const highEl = $('#snakeHigh');
    const overlayTitle = overlay?.querySelector('h4');
    const overlayText = overlay?.querySelector('p');
    const gameCard = $('#snakeGame');

    let high = Number(store.get('maru:snake:high', 0)) || 0;
    let body = [];
    let dir = { x: 1, y: 0 };
    let queuedDir = { x: 1, y: 0 };
    let food = { x: 16, y: 7 };
    let score = 0;
    let state = 'idle';
    let lastTime = 0;
    let acc = 0;
    let raf = 0;
    let tickMs = 120;

    if (highEl) highEl.textContent = String(high);

    const roundRect = (x, y, w, h, r) => {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
      else {
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
      }
    };

    const spawnFood = () => {
      for (let i = 0; i < 400; i++) {
        const p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
        if (!body.some((s) => s.x === p.x && s.y === p.y)) return p;
      }
      return { x: 1, y: 1 };
    };

    const reset = () => {
      body = [{ x: 8, y: 7 }, { x: 7, y: 7 }, { x: 6, y: 7 }];
      dir = { x: 1, y: 0 };
      queuedDir = { x: 1, y: 0 };
      score = 0;
      tickMs = 120;
      acc = 0;
      food = spawnFood();
      if (scoreEl) scoreEl.textContent = '0';
      draw();
    };

    const draw = () => {
      ctx.fillStyle = '#070708';
      ctx.fillRect(0, 0, W, H);

      // grid dots
      ctx.fillStyle = 'rgba(242,240,234,.055)';
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          ctx.fillRect(x * CELL + CELL / 2, y * CELL + CELL / 2, 1, 1);
        }
      }

      // food
      const pulse = 1 + Math.sin(performance.now() / 240) * 0.12;
      ctx.save();
      ctx.shadowColor = 'rgba(216,255,62,.55)';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#d8ff3e';
      ctx.beginPath();
      ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, 4.4 * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // snake body
      body.forEach((seg, i) => {
        const isHead = i === 0;
        const x = seg.x * CELL;
        const y = seg.y * CELL;
        ctx.fillStyle = isHead ? '#d8ff3e' : i < 3 ? 'rgba(242,240,234,.92)' : 'rgba(242,240,234,.58)';
        roundRect(x + 2, y + 2, CELL - 4, CELL - 4, isHead ? 6 : 4);
        ctx.fill();

        if (isHead) {
          ctx.fillStyle = 'rgba(8,8,10,.85)';
          const ex = dir.x !== 0 ? (dir.x > 0 ? 12 : 6) : 8;
          const ey = dir.y !== 0 ? (dir.y > 0 ? 12 : 6) : 8;
          ctx.fillRect(x + ex, y + ey, 2, 2);
          ctx.fillRect(x + (dir.x !== 0 ? ex : 12), y + (dir.y !== 0 ? ey : 12), 2, 2);
        }
      });

      if (state === 'paused') {
        ctx.fillStyle = 'rgba(7,7,8,.55)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#d8ff3e';
        ctx.font = '500 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('— PAUSA —', W / 2, H / 2 + 4);
      }
    };

    const showOverlay = (title, text, button) => {
      if (overlayTitle) overlayTitle.innerHTML = title;
      if (overlayText) overlayText.textContent = text;
      if (startBtn) startBtn.textContent = button;
      overlay?.classList.remove('hide');
    };

    const hideOverlay = () => overlay?.classList.add('hide');

    const gameOver = () => {
      state = 'over';
      cancelAnimationFrame(raf);
      sfx(130, 0.22, 'sawtooth', 0.05);
      if (score > high) {
        high = score;
        store.set('maru:snake:high', String(high));
        if (highEl) highEl.textContent = String(high);
      }
      draw();
      showOverlay(
        `<em>Game over</em> ${score} punto${score === 1 ? '' : 's'}`,
        score >= high && score > 0 ? '¡Nuevo récord! Reintenta y súbelo.' : `Tu récord sigue en ${high}. Otra vez.`,
        'Reintentar'
      );
    };

    const step = () => {
      dir = queuedDir;
      const head = { x: body[0].x + dir.x, y: body[0].y + dir.y };

      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) { gameOver(); return; }
      if (body.some((s) => s.x === head.x && s.y === head.y)) { gameOver(); return; }

      body.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        score++;
        if (scoreEl) scoreEl.textContent = String(score);
        food = spawnFood();
        tickMs = Math.max(68, 120 - Math.floor(score / 3) * 6);
        sfx(560 + Math.min(score, 12) * 28, 0.06, 'square', 0.03);
      } else {
        body.pop();
      }
    };

    const loop = (now) => {
      if (state !== 'running') return;
      raf = requestAnimationFrame(loop);
      if (!lastTime) lastTime = now;
      acc += now - lastTime;
      lastTime = now;

      if (acc >= tickMs) {
        acc = 0;
        step();
      }
      draw();
    };

    const start = () => {
      if (state === 'paused') {
        state = 'running';
        lastTime = 0;
        acc = 0;
        hideOverlay();
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
        return;
      }
      reset();
      state = 'running';
      lastTime = 0;
      hideOverlay();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };

    const pause = () => {
      if (state !== 'running') return;
      state = 'paused';
      cancelAnimationFrame(raf);
      draw();
      showOverlay('<em>Pausa</em> Respira', 'El tablero te espera. Pulsa continuar o la barra espaciadora.', 'Continuar');
    };

    startBtn?.addEventListener('click', start);

    const setDirection = (next) => {
      if (state !== 'running') return;
      if (next.x === -dir.x && next.y === -dir.y) return;
      if (next.x === dir.x && next.y === dir.y) return;
      queuedDir = next;
    };

    const keyDirs = {
      arrowup: { x: 0, y: -1 }, w: { x: 0, y: -1 },
      arrowdown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
      arrowleft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
      arrowright: { x: 1, y: 0 }, d: { x: 1, y: 0 }
    };

    document.addEventListener('keydown', (e) => {
      if (state !== 'running' && state !== 'paused') return;
      const key = e.key.toLowerCase();

      if (key === ' ') {
        e.preventDefault();
        if (state === 'running') pause();
        else start();
        return;
      }

      const next = keyDirs[key];
      if (!next || state !== 'running') return;
      e.preventDefault();
      setDirection(next);
    });

    $$('#snakePad button').forEach((btn) => {
      const dirs = {
        up: { x: 0, y: -1 }, down: { x: 0, y: 1 },
        left: { x: -1, y: 0 }, right: { x: 1, y: 0 }
      };
      btn.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        setDirection(dirs[btn.dataset.dir]);
      });
    });

    if ('IntersectionObserver' in window && gameCard) {
      const gameObs = new IntersectionObserver((entries) => {
        if (!entries[0]?.isIntersecting && state === 'running') pause();
      }, { threshold: 0.1 });
      gameObs.observe(gameCard);
    }

    reset();
  }

  /* =========================================================
     mini-game · memory sequence
     ========================================================= */
  const memoryGrid = $('#memoryGrid');
  if (memoryGrid) {
    const glyphs = ['◆', '▲', '●', '■', '✕', '≈', '✦', '≡', '⬡'];
    const cells = [];
    const overlay = $('#memoryOverlay');
    const startBtn = $('#memoryStart');
    const scoreEl = $('#memoryScore');
    const highEl = $('#memoryHigh');
    const statusEl = $('#memoryStatus');
    const phaseEl = $('#memoryPhase');
    const overlayTitle = overlay?.querySelector('h4');
    const overlayText = overlay?.querySelector('p');

    let high = Number(store.get('maru:memory:high', 0)) || 0;
    let sequence = [];
    let inputIndex = 0;
    let level = 0;
    let phase = 'idle';
    let token = 0;
    let ignoreClicks = false;

    if (highEl) highEl.textContent = String(high);

    glyphs.forEach((glyph, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'memory__cell';
      btn.dataset.i = String(i);
      btn.textContent = glyph;
      btn.setAttribute('aria-label', `Casilla ${i + 1}`);
      btn.addEventListener('click', () => handleCell(i));
      memoryGrid.appendChild(btn);
      cells.push(btn);
    });

    const setStatus = (a, b) => {
      if (statusEl) statusEl.textContent = a;
      if (phaseEl) phaseEl.textContent = b;
    };

    const flash = (index, on) => {
      const cell = cells[index];
      if (!cell) return;
      cell.classList.toggle('lit', on);
      if (on) sfx(240 + index * 45, 0.09, 'sine', 0.035);
    };

    const wait = (ms, t) => new Promise((resolve) => {
      window.setTimeout(() => resolve(t === token), ms);
    });

    const showOverlay = (title, text, button) => {
      if (overlayTitle) overlayTitle.innerHTML = title;
      if (overlayText) overlayText.textContent = text;
      if (startBtn) startBtn.textContent = button;
      overlay?.classList.remove('hide');
    };

    const hideOverlay = () => overlay?.classList.add('hide');

    const playSequence = async (t) => {
      setStatus('Observa…', 'Secuencia');
      if (phaseEl) phaseEl.textContent = 'Observa';
      await wait(480, t);
      for (const index of sequence) {
        if (t !== token) return;
        flash(index, true);
        await wait(380, t);
        if (t !== token) return;
        flash(index, false);
        await wait(150, t);
      }
      if (t !== token) return;
      inputIndex = 0;
      phase = 'input';
      setStatus('Tu turno', 'Repite');
      if (phaseEl) phaseEl.textContent = 'Tu turno';
    };

    const nextLevel = async (t) => {
      if (t !== token) return;
      level++;
      if (scoreEl) scoreEl.textContent = String(level);
      const next = Math.floor(Math.random() * glyphs.length);
      sequence.push(next);
      phase = 'playback';
      ignoreClicks = true;
      await playSequence(t);
      ignoreClicks = false;
    };

    const fail = () => {
      token++;
      phase = 'over';
      ignoreClicks = true;
      sfx(110, 0.25, 'sawtooth', 0.05);
      if (level > high) {
        high = level;
        store.set('maru:memory:high', String(high));
        if (highEl) highEl.textContent = String(high);
      }
      setStatus('Secuencia rota', 'Game over');
      showOverlay(
        `<em>Game over</em> Nivel ${level}`,
        level >= high && level > 0 ? '¡Tu mejor marca! La memoria también se entrena.' : `Tu récord es ${high}. Otra ronda.`,
        'Reintentar'
      );
    };

    const handleCell = (index) => {
      if (phase !== 'input' || ignoreClicks) return;
      const expected = sequence[inputIndex];
      flash(index, true);
      window.setTimeout(() => flash(index, false), 140);

      if (index !== expected) {
        const cell = cells[index];
        if (cell) {
          cell.classList.add('bad');
          window.setTimeout(() => cell.classList.remove('bad'), 380);
        }
        fail();
        return;
      }

      inputIndex++;
      if (inputIndex === sequence.length) {
        phase = 'wait';
        ignoreClicks = true;
        setStatus('Correcto', 'Siguiente…');
        const t = token;
        window.setTimeout(() => {
          if (t !== token) return;
          ignoreClicks = false;
          nextLevel(t);
        }, 620);
      }
    };

    const startGame = () => {
      token++;
      const t = token;
      sequence = [];
      inputIndex = 0;
      level = 0;
      phase = 'playback';
      ignoreClicks = true;
      if (scoreEl) scoreEl.textContent = '0';
      hideOverlay();
      cells.forEach((c) => c.classList.remove('lit', 'bad'));
      nextLevel(t);
    };

    startBtn?.addEventListener('click', startGame);

    setStatus('Pulsa empezar', 'Listo');
    if (phaseEl) phaseEl.textContent = 'Listo';
  }

  /* =========================================================
     services spotlight
     ========================================================= */
  if (finePointer) {
    $$('.service').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  /* =========================================================
     keyboard / misc
     ========================================================= */
  // prevent orphaned scroll lock
  window.addEventListener('pageshow', () => {
    if (!modal?.classList.contains('open') && !lightbox?.classList.contains('open') && !menu?.classList.contains('open')) {
      document.body.classList.remove('is-locked');
    }
  });
})();
