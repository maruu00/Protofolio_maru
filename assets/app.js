/* =========================================================
   maru@portfolio — terminal edition · interactions
   ========================================================= */
(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer  = window.matchMedia('(pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pad = (n) => String(n).padStart(2, '0');

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
      link: 'https://github.com/marruuu-u990/nexumo-tienda',
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
      site: 'https://spainroleplay.site',
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
      site: 'https://frentehispano.xyz',
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
      cat: 'FiveM · NUI',
      year: '2026',
      role: 'UI design & NUI',
      context: 'Tablet de solicitudes de robo',
      desc: [
        'Tablet dentro de Phantom RP para pedir atracos, todavía <b>en desarrollo</b>. La preview ya muestra cómo el jugador elige ubicación, vehículo y acompañantes; el staff revisará la solicitud y la aceptará o rechazará con un motivo.',
        'Estados, historial, perfil y estadísticas en una <b>glass UI oscura</b> que se integra en la partida sin romper la inmersión. Feedback inmediato para que nadie se quede mirando una pantalla vacía.'
      ],
      stack: ['Lua', 'FiveM', 'NUI', 'HTML/CSS', 'UX'],
      cover: 'script_robos_fivem2',
      status: 'en desarrollo · preview',
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
      link: 'https://github.com/maruu00/airpda-bot',
      images: images([
        ['bot_log_dni', 'Log · registro de DNI'],
        ['bot_log_seguridad', 'Log · alerta de seguridad'],
        ['bot_embed_v2', 'Embed · ficha de usuario'],
        ['registro_bot_iplogger', 'Log · registro de IP']
      ])
    },

    dguard: {
      title: 'dguard',
      cat: 'API Security · Anti-DDoS',
      year: '2026',
      role: 'Diseño & desarrollo backend',
      context: 'Protección de la API de Nexumo',
      desc: [
        'Capa de defensa para la API de Nexumo. Cada IP tiene un token bucket con dos umbrales: 40 peticiones por minuto en endpoints caros (pagos, contacto, reseñas) y 150 en el resto. Cuando se agota, el cliente recibe un proof-of-work; si falla cinco veces, la IP se bloquea temporalmente.',
        'Se suma a la validación HMAC de tokens, la comprobación de importes en servidor, el bloqueo de path traversal y las alertas de seguridad. El objetivo no era frenar bots a base de capturas, sino que <b>una persona real nunca note la barrera</b>.'
      ],
      stack: ['Node.js', 'Express', 'Vercel', 'HMAC', 'Rate limiting', 'PoW'],
      cover: 'dguard-output',
      status: 'en producción',
      images: images([
        ['dguard-output', 'Test real · rate limit + PoW + ban'],
        ['dguard-code', 'dguard · token bucket']
      ])
    },

    fivemkit: {
      title: 'FiveM Essentials',
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
      link: 'https://github.com/marruuu-u990/hud-script',
      images: images([
        ['hud', 'HUD personalizado'],
        ['jail_1', 'Sistema de cárcel (IC)'],
        ['jail_2', 'Cárcel · logs en Discord'],
        ['truker_job', 'Script camionero']
      ])
    },

    astri: {
      title: 'Astri Hub',
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

  /* =========================================================
     reloj, fecha, navegación
     ========================================================= */

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const clockTargets = [$('#clock'), $('#contactClock')].filter(Boolean);

  const tickClock = () => {
    const now = new Date();
    const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    clockTargets.forEach((el) => { el.textContent = time; });
  };
  tickClock();
  window.setInterval(tickClock, 1000);

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const loginEl = $('#lastLogin');
  if (loginEl) {
    const d = new Date(Date.now() - 1000 * 60 * 8);
    loginEl.textContent = `${DAYS[d.getDay()]} ${MONTHS[d.getMonth()]} ${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${d.getFullYear()}`;
  }

  const menu = $('#menu');
  const menuBtn = $('#menuBtn');

  const setMenu = (open, restoreFocus = true) => {
    if (!menu || !menuBtn) return;
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
    if (open) {
      const first = menu.querySelector('a, button');
      if (first) first.focus({ preventScroll: true });
    } else if (restoreFocus) {
      menuBtn.focus({ preventScroll: true });
    }
  };

  const scrollToId = (id) => {
    const target = document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    try { history.replaceState(null, '', `#${id}`); } catch { /* file:// */ }
    return true;
  };

  $$('[data-scroll]').forEach((el) => {
    el.addEventListener('click', (event) => {
      const id = el.getAttribute('data-scroll');
      if (!id || !document.getElementById(id)) return;
      event.preventDefault();
      if (menu && menu.classList.contains('open')) setMenu(false, false);
      scrollToId(id);
    });
  });

  if (menuBtn) menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  const menuClose = $('#menuClose');
  if (menuClose) menuClose.addEventListener('click', () => setMenu(false));
  if (menu) {
    menu.addEventListener('click', (event) => {
      if (event.target === menu) setMenu(false);
    });
  }

  const toTop = $('#toTop');
  if (toTop) toTop.addEventListener('click', () => scrollToId('hero'));

  /* =========================================================
     scroll · progreso · barra de estado
     ========================================================= */

  const progressBar = $('#progressBar');
  const statusFill = $('#statusBar');
  const statusPct = $('#statusPct');
  const statusPath = $('#statusPath');
  const navLinks = $$('.nav a[data-scroll]');
  const watchSections = $$('main > section[id]');
  const traveler = $('#traveler');
  const travelerRail = $('#travelerRail');
  const travelerShip = $('#travelerShip');
  const travelerFill = $('#travelerFill');
  const travelerLabel = $('#travelerLabel');
  const travelerTicks = $$('.traveler__rail i');

  let scrollQueued = false;
  let travelerMoveTimer = 0;

  const syncActiveSection = () => {
    const visibleSections = watchSections.filter((section) => !section.hidden);
    if (!visibleSections.length) return;
    const marker = window.innerHeight * 0.38;
    let current = visibleSections[0].id;

    visibleSections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) current = section.id;
    });

    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) current = visibleSections[visibleSections.length - 1].id;

    if (statusPath) statusPath.textContent = current;
    if (travelerLabel) travelerLabel.textContent = `~/${current}`;
    travelerTicks.forEach((tick) => tick.classList.toggle('on', tick.dataset.id === current));

    navLinks.forEach((link) => {
      const on = link.getAttribute('data-scroll') === current;
      link.classList.toggle('active', on);
      if (on) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  const renderScroll = () => {
    scrollQueued = false;
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? clamp(doc.scrollTop / max, 0, 1) : 0;

    if (progressBar) progressBar.style.transform = `scaleX(${ratio})`;
    if (statusFill) statusFill.style.width = `${(ratio * 100).toFixed(1)}%`;
    if (statusPct) statusPct.textContent = String(Math.round(ratio * 100)).padStart(3, '0');

    if (travelerShip && travelerRail) {
      const travel = Math.max(0, travelerRail.clientHeight - 26);
      travelerShip.style.transform = `translateY(${(ratio * travel).toFixed(1)}px)`;
    }
    if (travelerFill) travelerFill.style.transform = `scaleY(${ratio.toFixed(4)})`;
    if (traveler) {
      traveler.classList.add('is-moving');
      window.clearTimeout(travelerMoveTimer);
      travelerMoveTimer = window.setTimeout(() => traveler.classList.remove('is-moving'), 220);
    }

    syncActiveSection();
  };

  const queueScroll = () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(renderScroll);
  };

  window.addEventListener('scroll', queueScroll, { passive: true });
  window.addEventListener('resize', queueScroll, { passive: true });
  renderScroll();

  /* =========================================================
     reveals · contadores
     ========================================================= */

  const revealTargets = $$('[data-reveal]');

  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in'));
  }

  const animateCount = (el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    const finish = () => { el.textContent = `${target}${suffix}`; };

    if (reduceMotion) return finish();

    const duration = 1000;
    const start = performance.now();

    const frame = (now) => {
      const t = clamp((now - start) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(frame);
      else finish();
    };

    requestAnimationFrame(frame);
  };

  const counters = $$('[data-count]');

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach((el) => countObserver.observe(el));
  } else {
    counters.forEach((el) => animateCount(el));
  }

  /* =========================================================
     consola interactiva
     ========================================================= */

  const shellOut = $('#shellOut');
  const shellInput = $('#shellInput');
  const shellText = $('#shellText');
  const shellLine = $('#shellLine');

  const history = [];
  let historyIndex = -1;

  const printLine = (text, cls = '') => {
    if (!shellOut) return;
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.textContent = text;
    shellOut.appendChild(div);
    while (shellOut.children.length > 80) shellOut.firstElementChild.remove();
    shellOut.scrollTop = shellOut.scrollHeight;
  };

  const printHTML = (html, cls = '') => {
    if (!shellOut) return;
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.innerHTML = html;
    shellOut.appendChild(div);
    while (shellOut.children.length > 80) shellOut.firstElementChild.remove();
    shellOut.scrollTop = shellOut.scrollHeight;
  };

  const esc = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const sectionsList = ['about', 'work', 'play', 'path', 'services', 'contact'];
  const commandNames = [
    'help', 'ls', 'open', 'cat', 'whoami', 'neofetch', 'contact', 'socials',
    'cd', 'clear', 'date', 'pwd', 'echo', 'sudo', 'theme', 'banner', 'launch', 'signal', 'exit'
  ];

  const projectNames = ORDER;

  const helpText = () => {
    const rows = [
      ['help', 'esta ayuda'],
      ['ls', 'lista ~/projects'],
      ['open <proyecto>', 'abre su README.md'],
      ['cat <archivo>', 'about.md · services.json · contact.sh'],
      ['whoami', 'quién soy'],
      ['neofetch', 'ficha del sistema'],
      ['contact', 'cómo contactarme'],
      ['launch', 'despega y desbloquea ~/signal'],
      ['cd <sección>', 'navega por la página'],
      ['date · pwd · echo', 'lo obvio'],
      ['clear', 'limpia la terminal'],
      ['exit', 'cierra la sesión']
    ];
    const width = Math.max(...rows.map(([cmd]) => cmd.length)) + 2;
    return rows.map(([cmd, label]) => `${cmd.padEnd(width)}${label}`).join('\n');
  };

  const COMMANDS = {
    help() {
      printLine('comandos disponibles:', 'ok');
      printLine(helpText(), 'pre');
      printLine('tip: Tab autocompleta · ↑ ↓ historial · Ctrl+L limpia');
    },

    ls() {
      const width = Math.max(...ORDER.map((id) => PROJECTS[id].title.length)) + 4;
      ORDER.forEach((id) => {
        const p = PROJECTS[id];
        printLine(`drwxr-xr-x  ${id.padEnd(width)}${p.cat.padEnd(26)}${p.year}`);
      });
      printLine(`total ${ORDER.length} · usa "open <proyecto>" para leer el README`);
    },

    open(args) {
      const id = (args[0] || '').toLowerCase().replace(/\/$/, '');
      if (!id) {
        printLine(`proyectos: ${ORDER.join(', ')}`);
        return;
      }
      if (!PROJECTS[id]) {
        printLine(`open: no such project: ${id}`, 'err');
        return;
      }
      printLine(`abriendo ${id}/README.md ...`, 'ok');
      openProject(id);
    },

    cat(args) {
      const file = (args[0] || '').toLowerCase();
      if (!file) {
        printLine('cat: falta el nombre del archivo', 'err');
        return;
      }
      if (file === 'about.md' || file === 'about') {
        printLine('maru — fullstack developer · Barcelona, ES');
        printLine('Interfaces y sistemas que se sienten vivos: FiveM, web, bots de Discord');
        printLine('y experimentos interactivos. HTML, CSS, JavaScript y Lua, con Node.js');
        printLine('cuando el proyecto pide backend.');
        return;
      }
      if (file === 'services.json') {
        printLine(`{
  "fivem":     "servidores, scripts a medida, NUI",
  "web":       "landings, tiendas, dashboards",
  "discord":   "moderación, logs, tickets, economía",
  "lab":       "minecraft, 3D, microjuegos, IA"
}`, 'pre');
        return;
      }
      if (file === 'contact.sh') {
        printLine('discord  1037473407756935218');
        printLine('github   github.com/marruuu-u990');
        printLine('response < 24 h');
        return;
      }
      if (file === 'signal.txt' || file === 'signal') {
        if (!unlocked) {
          printLine('cat: signal.txt: permiso denegado', 'err');
          printLine('pista: ejecuta "./launch.sh" para desbloquearlo');
          return;
        }
        printLine('señal recibida · orbit 41.3874, 2.1686', 'ok');
        printLine('barcelona, es · latencia 0 ms · sin paquetes perdidos');
        return;
      }
      if (PROJECTS[file]) {
        printLine(`abriendo ${file}/README.md ...`, 'ok');
        openProject(file);
        return;
      }
      printLine(`cat: ${file}: no such file or directory`, 'err');
    },

    whoami() {
      printLine('maru', 'ok');
      printLine('fullstack developer · Barcelona, ES');
      printLine('fivem · web · discord bots · interfaces');
    },

    neofetch() {
      const logo = [
        '      .---.',
        '     / o o \\',
        '     \\  ^  /',
        "      '---'",
        '      /   \\',
        '     /_____\\'
      ];
      const info = [
        'maru@portfolio',
        '--------------',
        'OS ......... Windows 11',
        'Role ....... fullstack developer',
        'Shell ...... zsh 5.9',
        'Uptime ..... 4 years',
        'Stack ...... html css js lua node',
        'Location ... Barcelona, ES'
      ];
      const lines = [];
      for (let i = 0; i < Math.max(logo.length, info.length); i += 1) {
        lines.push(`${(logo[i] || '').padEnd(20)}${info[i] || ''}`);
      }
      printLine(lines.join('\n'), 'pre');
    },

    contact() {
      printLine('discord   1037473407756935218', 'ok');
      printLine('github    github.com/marruuu-u990');
      printLine('docs      portfolio de edición');
      printLine('response  < 24 h');
      printLine('o usa los enlaces de la sección contacto.');
    },

    socials() {
      COMMANDS.contact();
    },

    cd(args) {
      const target = (args[0] || '~').replace(/^~\//, '').replace(/\/$/, '');
      if (target === '~' || target === '' || target === 'portfolio') {
        scrollToId('hero');
        printLine('~/portfolio');
        return;
      }
      if (target === '..') {
        scrollToId('hero');
        printLine('~/');
        return;
      }
      if (sectionsList.includes(target)) {
        scrollToId(target);
        printLine(`~/portfolio/${target}`);
        return;
      }
      printLine(`cd: no such file or directory: ${target}`, 'err');
    },

    clear() {
      if (shellOut) shellOut.innerHTML = '';
    },

    date() {
      printLine(new Date().toString());
    },

    pwd() {
      printLine('/home/maru/portfolio');
    },

    echo(args, raw) {
      const text = raw.replace(/^echo\s*/i, '');
      printLine(text || '');
    },

    sudo() {
      printLine('[sudo] password for maru: ********');
      printLine('maru is not in the sudoers file. This incident will be reported.', 'err');
    },

    launch() {
      printLine('iniciando protocolo de despegue ...', 'ok');
      runLaunch();
    },

    signal() {
      if (!unlocked) {
        printLine('signal: acceso restringido', 'err');
        printLine('ejecuta "launch" para desbloquear ~/signal');
        return;
      }
      printLine('abriendo ~/signal ...', 'ok');
      scrollToId('signal');
    },

    theme(args) {
      const scan = $('.scanlines');
      if (!scan) return;
      const mode = (args[0] || '').toLowerCase();
      if (mode === 'off') {
        scan.style.display = 'none';
        printLine('scanlines off');
      } else if (mode === 'on') {
        scan.style.display = '';
        printLine('scanlines on');
      } else {
        printLine('uso: theme on | theme off');
      }
    },

    banner() {
      printLine('███╗   ███╗ █████╗ ██████╗ ██╗   ██╗\n████╗ ████║██╔══██╗██╔══██╗██║   ██║\n██╔████╔██║███████║██████╔╝██║   ██║\n██║╚██╔╝██║██╔══██║██╔══██╗██║   ██║\n██║ ╚═╝ ██║██║  ██║██║  ██║╚██████╔╝\n╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ', 'pre');
    },

    exit() {
      printLine('logout');
      printLine('[process completed]', 'ok');
      if (shellInput) shellInput.blur();
    }
  };

  const syncShellText = () => {
    if (!shellText || !shellInput) return;
    const value = shellInput.value;
    if (!value) {
      shellText.textContent = '';
      return;
    }
    const size = parseFloat(getComputedStyle(shellText).fontSize) || 13;
    const charWidth = size * 0.6;
    const available = shellText.parentElement ? shellText.parentElement.clientWidth : 400;
    const maxChars = Math.max(6, Math.floor(available / charWidth) - 2);
    shellText.textContent = value.length > maxChars ? `…${value.slice(-(maxChars - 1))}` : value;
  };

  const resetHistoryCursor = () => { historyIndex = -1; };

  const runCommand = (raw) => {
    const value = typeof raw === 'string' ? raw : (shellInput ? shellInput.value : '');
    const line = value.trim();

    if (line) {
      printHTML(`<span class="dim">maru@portfolio:~$</span> ${esc(line)}`);
      history.push(line);
      if (history.length > 40) history.shift();
    }
    resetHistoryCursor();

    if (shellInput) {
      shellInput.value = '';
      syncShellText();
    }

    if (!line) return;

    const [name, ...args] = line.split(/\s+/);
    const key = name.toLowerCase().replace(/^\.\//, '').replace(/\.sh$/, '');
    const handler = COMMANDS[key];

    if (handler) {
      handler(args, line);
      return;
    }

    if (PROJECTS[key]) {
      printLine(`abriendo ${key}/README.md ...`, 'ok');
      openProject(key);
      return;
    }

    printLine(`zsh: command not found: ${name}`, 'err');
    printLine('prueba con "help" o "ls".');
  };

  const completeInput = () => {
    if (!shellInput) return;
    const value = shellInput.value;
    const parts = value.split(/\s+/);
    const trailingSpace = /\s$/.test(value);

    let pool = commandNames;
    let prefix = parts[0];

    if (parts.length > 1 || trailingSpace) {
      const base = parts[0].toLowerCase();
      if (base === 'open' || base === 'cat') {
        pool = projectNames;
        prefix = trailingSpace ? '' : parts[parts.length - 1];
      } else if (base === 'cd') {
        pool = sectionsList;
        prefix = trailingSpace ? '' : parts[parts.length - 1];
      } else {
        pool = commandNames;
        prefix = parts[parts.length - 1];
      }
    }

    const matches = pool.filter((item) => item.startsWith(prefix.toLowerCase()));

    if (matches.length === 0) return;
    if (matches.length === 1) {
      if (parts.length > 1 || trailingSpace) {
        parts[parts.length - 1] = matches[0];
        shellInput.value = parts.join(' ');
      } else {
        shellInput.value = matches[0];
      }
      syncShellText();
      return;
    }

    printLine(matches.join('  '));
  };

  if (shellInput) {
    shellInput.addEventListener('input', syncShellText);

    shellInput.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        completeInput();
        return;
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        runCommand();
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (!history.length) return;
        if (historyIndex === -1) historyIndex = history.length - 1;
        else historyIndex = Math.max(0, historyIndex - 1);
        shellInput.value = history[historyIndex];
        syncShellText();
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex === -1) return;
        historyIndex += 1;
        if (historyIndex >= history.length) {
          historyIndex = -1;
          shellInput.value = '';
        } else {
          shellInput.value = history[historyIndex];
        }
        syncShellText();
        return;
      }

      if (event.key === 'Escape') {
        shellInput.blur();
        return;
      }

      if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
        event.preventDefault();
        COMMANDS.clear();
      }
    });

    if (shellLine) {
      shellLine.addEventListener('click', (event) => {
        if (event.target === shellInput) return;
        shellInput.focus();
      });
    }

    $$('.shell__quick [data-cmd]').forEach((btn) => {
      btn.addEventListener('click', () => {
        runCommand(btn.dataset.cmd);
        shellInput.focus();
      });
    });
  }

  /* =========================================================
     preview flotante
     ========================================================= */

  const preview = $('#preview');
  const previewImg = $('#previewImg');
  const previewLabel = $('#previewLabel');
  const workRows = $$('.work-row');

  if (preview && previewImg && previewLabel && finePointer) {
    const placePreview = (event) => {
      const width = preview.offsetWidth;
      const height = preview.offsetHeight;
      const gap = 18;
      let x = event.clientX + gap;
      let y = event.clientY + gap;

      if (x + width > window.innerWidth - 12) x = event.clientX - width - gap;
      if (y + height > window.innerHeight - 12) y = window.innerHeight - height - 12;

      preview.style.left = `${Math.max(12, x)}px`;
      preview.style.top = `${Math.max(12, y)}px`;
    };

    const showPreview = (row, event) => {
      const project = PROJECTS[row.dataset.project];
      if (!project) return;
      previewImg.src = IMG(project.cover);
      previewImg.alt = `${project.title} — preview`;
      previewLabel.textContent = `${row.dataset.project}/preview.png`;
      preview.classList.add('on');
      placePreview(event);
    };

    workRows.forEach((row) => {
      row.addEventListener('pointerenter', (event) => {
        if (event.pointerType && event.pointerType !== 'mouse') return;
        showPreview(row, event);
      });

      row.addEventListener('pointermove', (event) => {
        if (!preview.classList.contains('on')) return;
        placePreview(event);
      });

      row.addEventListener('pointerleave', () => preview.classList.remove('on'));
      row.addEventListener('focus', () => preview.classList.remove('on'));
    });

    window.addEventListener('scroll', () => preview.classList.remove('on'), { passive: true });
  }

  /* =========================================================
     filtros de proyectos
     ========================================================= */

  const filterButtons = $$('.filters [data-filter]');
  const workCount = $('#workCount');

  filterButtons.forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));

    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach((other) => {
        const on = other === btn;
        other.classList.toggle('active', on);
        other.setAttribute('aria-pressed', String(on));
      });

      let visible = 0;
      workRows.forEach((row) => {
        const show = filter === 'all' || row.dataset.cat === filter;
        row.classList.toggle('is-hidden', !show);
        if (show) visible += 1;
      });

      if (workCount) workCount.textContent = `total ${visible}`;
      if (preview) preview.classList.remove('on');
    });
  });

  /* =========================================================
     modal README · lightbox · toast
     ========================================================= */

  const modal = $('#modal');
  const modalScroll = $('#modalScroll');
  const modalBar = $('#modalBar');
  const modalMeta = $('#modalMeta');
  const modalTitle = $('#modalTitle');
  const modalSub = $('#modalSub');
  const modalDesc = $('#modalDesc');
  const modalCount = $('#modalCount');
  const modalGallery = $('#modalGallery');
  const modalNext = $('#modalNext');
  const modalNextName = $('#modalNextName');
  const modalClose = $('#modalClose');
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const lightboxCount = $('#lightboxCount');

  let activeProject = null;
  let activeGallery = [];
  let lightboxIndex = 0;
  let lastFocused = null;

  const buildMeta = (project) => {
    const rows = [
      ['project', esc(project.title)],
      ['category', esc(project.cat)],
      ['year', esc(project.year)],
      ['role', esc(project.role)],
      ['context', esc(project.context)],
      ['stack', project.stack.map((tech) => `<span class="tag">${esc(tech)}</span>`).join('')]
    ];
    if (project.site) {
      const label = project.site.replace('https://', '');
      rows.push(['live', `<a href="${esc(project.site)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`]);
    }
    if (project.link) {
      const label = project.link.replace('https://github.com/', 'github.com/');
      rows.push(['repo', `<a href="${esc(project.link)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`]);
    }
    rows.push(['status', esc(project.status || 'shipped · online')]);
    return rows.map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`).join('');
  };

  const renderGallery = (project) => {
    activeGallery = project.images.slice();

    if (modalCount) modalCount.textContent = String(activeGallery.length);
    if (!modalGallery) return;

    modalGallery.className = activeGallery.length === 2 ? 'md__gallery md__gallery--pair' : 'md__gallery';

    modalGallery.innerHTML = activeGallery.map((image, index) => {
      const number = String(index + 1).padStart(2, '0');
      return `
      <button class="gallery__item" type="button" data-index="${index}" aria-label="Ampliar ${number} · ${esc(image.label)}">
        <img src="${image.src}" alt="${esc(image.label)}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async">
        <span>${number} · ${esc(image.label)}</span>
      </button>
    `;
    }).join('');
  };

  const openProject = (id) => {
    const project = PROJECTS[id];
    if (!project || !modal) return false;

    activeProject = id;
    lastFocused = document.activeElement;

    if (modalBar) modalBar.textContent = `${id}/README.md`;
    if (modalMeta) modalMeta.innerHTML = buildMeta(project);
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalSub) modalSub.textContent = `${project.cat} · ${project.year} · ${project.role}`;

    if (modalDesc) {
      modalDesc.innerHTML = `
        <p>${project.desc.join('</p><p>')}</p>
        <h4>stack</h4>
        <ul>${project.stack.map((tech) => `<li>${esc(tech)}</li>`).join('')}</ul>
      `;
    }

    renderGallery(project);

    const index = ORDER.indexOf(id);
    const nextId = ORDER[(index + 1) % ORDER.length];
    if (modalNext) modalNext.dataset.project = nextId;
    if (modalNextName) modalNextName.textContent = PROJECTS[nextId].title;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    if (modalScroll) modalScroll.scrollTop = 0;
    if (modalClose) modalClose.focus({ preventScroll: true });

    return true;
  };

  const closeProject = () => {
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    activeProject = null;
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus({ preventScroll: true });
    }
  };

  const renderLightbox = () => {
    const image = activeGallery[lightboxIndex];
    if (!image || !lightboxImg) return;
    lightboxImg.src = image.src;
    lightboxImg.alt = image.label;
    if (lightboxCount) {
      lightboxCount.textContent = `${lightboxIndex + 1} / ${activeGallery.length} · ${image.label}`;
    }
  };

  const openLightbox = (index) => {
    if (!lightbox || !activeGallery.length) return;
    lightboxIndex = clamp(index, 0, activeGallery.length - 1);
    renderLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    if (modalClose) modalClose.focus({ preventScroll: true });
  };

  const stepLightbox = (delta) => {
    if (!activeGallery.length) return;
    lightboxIndex = (lightboxIndex + delta + activeGallery.length) % activeGallery.length;
    renderLightbox();
  };

  workRows.forEach((row) => {
    row.addEventListener('click', () => openProject(row.dataset.project));
  });

  if (modalClose) modalClose.addEventListener('click', closeProject);
  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeProject();
    });
  }
  if (modalNext) {
    modalNext.addEventListener('click', () => {
      const id = modalNext.dataset.project;
      if (id) openProject(id);
    });
  }
  if (modalGallery) {
    modalGallery.addEventListener('click', (event) => {
      const item = event.target.closest('.gallery__item');
      if (!item) return;
      openLightbox(Number(item.dataset.index) || 0);
    });
  }

  const lightboxClose = $('#lightboxClose');
  const lightboxPrev = $('#lightboxPrev');
  const lightboxNext = $('#lightboxNext');

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => stepLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => stepLightbox(1));
  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }

  const toast = $('#toast');
  let toastTimer = 0;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('on');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('on'), 2200);
  };

  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        area.remove();
      }
      showToast(`copiado: ${text}`);
    } catch {
      showToast('no se pudo copiar');
    }
  };

  $$('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => copyText(btn.dataset.copy));
  });

  /* =========================================================
     launch.sh · cohete · desbloqueo de ~/signal
     ========================================================= */

  const UNLOCK_KEY = 'maru.signal';
  const launchpad = $('#launchpad');
  const launchLog = $('#launchLog');
  const launchScene = $('#launchScene');
  const launchStatus = $('#launchStatus');
  const launchGo = $('#launchGo');
  const launchClose = $('#launchClose');
  const signalSection = $('#signal');
  const shellLock = $('#shellLock');
  const statusLock = $('#statusLock');
  const statusMode = $('.statusbar__mode');
  const launchTitle = $('#launchTitle');
  const secretLinks = $$('.nav__secret');
  const launchButtons = $$('[data-launch]');

  let unlocked = store.get(UNLOCK_KEY, '') === '1';
  let launching = false;
  let launchTimers = [];
  let launchFocus = null;

  const launchLater = (fn, ms) => {
    const id = window.setTimeout(fn, ms);
    launchTimers.push(id);
    return id;
  };

  const clearLaunchTimers = () => {
    launchTimers.forEach((id) => window.clearTimeout(id));
    launchTimers = [];
  };

  const applyUnlock = (announce = false) => {
    unlocked = true;
    store.set(UNLOCK_KEY, '1');

    if (signalSection) signalSection.hidden = false;
    secretLinks.forEach((link) => { link.hidden = false; });
    document.body.classList.add('is-unlocked');

    if (statusLock) {
      statusLock.textContent = '[ unlocked ]';
      statusLock.classList.add('on');
    }
    if (statusMode) statusMode.textContent = 'ORBIT';

    if (shellLock) {
      shellLock.classList.add('is-open');
      shellLock.innerHTML = '<span class="shell__lock-tag">[unlocked]</span> señal disponible en <button type="button">~/signal</button>';
      const jump = shellLock.querySelector('button');
      if (jump) jump.addEventListener('click', () => scrollToId('signal'));
    }

    if (launchGo) {
      launchGo.disabled = false;
      launchGo.textContent = '[ ir a la señal → ]';
      launchGo.dataset.mode = 'signal';
    }

    if (announce) showToast('señal desbloqueada · ~/signal');
    renderScroll();
  };

  const openLaunchpad = () => {
    if (!launchpad) return;
    launchFocus = document.activeElement;
    launchpad.classList.add('open');
    launchpad.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    if (launchClose) launchClose.focus({ preventScroll: true });
  };

  const closeLaunchpad = () => {
    if (!launchpad || !launchpad.classList.contains('open')) return;
    clearLaunchTimers();
    launching = false;
    launchpad.classList.remove('open', 'is-launching', 'is-done');
    launchpad.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    if (launchScene) launchScene.classList.remove('is-launching', 'is-done');
    if (launchStatus) launchStatus.textContent = 'standby';
    if (launchTitle) launchTitle.textContent = 'launch.sh — preflight';
    if (statusMode) statusMode.textContent = unlocked ? 'ORBIT' : 'NORMAL';
    if (launchFocus && typeof launchFocus.focus === 'function') {
      launchFocus.focus({ preventScroll: true });
    }
  };

  const LAUNCH_STEPS = [
    { at: 0, text: '$ ./launch.sh --target portfolio', cls: 'dim' },
    { at: 420, text: '› preflight .......... ok' },
    { at: 800, text: '› fuel ............... 100%' },
    { at: 1180, text: '› telemetry .......... linked' },
    { at: 1520, text: '3', cls: 'big' },
    { at: 1880, text: '2', cls: 'big' },
    { at: 2240, text: '1', cls: 'big' },
    { at: 2580, text: 'ignition', cls: 'ok', action: 'ignite' },
    { at: 3220, text: 'liftoff' },
    { at: 4600, text: 'orbit reached · señal desbloqueada', cls: 'ok', action: 'unlock' }
  ];

  const runLaunch = () => {
    if (!launchpad) {
      applyUnlock(true);
      return;
    }
    if (launching) return;

    launching = true;
    clearLaunchTimers();

    const speed = reduceMotion ? 0.35 : 1;

    if (launchLog) launchLog.innerHTML = '';
    if (launchpad) launchpad.classList.remove('is-done');
    if (launchScene) launchScene.classList.remove('is-launching', 'is-done');
    if (launchStatus) launchStatus.textContent = 'preflight';
    if (launchTitle) launchTitle.textContent = 'launch.sh — preflight';
    if (statusMode) statusMode.textContent = 'LAUNCH';
    if (launchGo) {
      launchGo.disabled = true;
      launchGo.textContent = '[ ... ]';
    }

    openLaunchpad();

    LAUNCH_STEPS.forEach((step) => {
      launchLater(() => {
        if (!launchLog) return;

        const line = document.createElement('div');
        line.textContent = step.text;
        if (step.cls) line.className = step.cls;

        if (step.cls === 'big') {
          const previous = launchLog.querySelector('.is-count');
          if (previous) previous.remove();
          line.classList.add('is-count');
        }

        launchLog.appendChild(line);
        launchLog.scrollTop = launchLog.scrollHeight;

        if (step.action === 'ignite') {
          launchpad.classList.add('is-launching');
          if (launchScene) launchScene.classList.add('is-launching');
          if (launchStatus) launchStatus.textContent = 'liftoff';
        }

        if (step.action === 'unlock') {
          launching = false;
          applyUnlock(true);
          launchpad.classList.add('is-done');
          if (launchScene) launchScene.classList.add('is-done');
          if (launchStatus) launchStatus.textContent = 'orbit';
          if (launchTitle) launchTitle.textContent = 'launch.sh — orbit';
        }
      }, step.at * speed);
    });
  };

  if (launchClose) launchClose.addEventListener('click', closeLaunchpad);
  if (launchpad) {
    launchpad.addEventListener('click', (event) => {
      if (event.target === launchpad) closeLaunchpad();
    });
  }

  if (launchGo) {
    launchGo.addEventListener('click', () => {
      if (launchGo.dataset.mode === 'signal') {
        closeLaunchpad();
        scrollToId('signal');
      } else {
        runLaunch();
      }
    });
  }

  launchButtons.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      runLaunch();
    });
  });

  if (unlocked) applyUnlock(false);


  /* =========================================================
     snake.sh
     ========================================================= */

  const snakeCanvas = $('#snakeCanvas');
  const snakeScoreEl = $('#snakeScore');
  const snakeHighEl = $('#snakeHigh');
  const snakeStateEl = $('#snakeState');
  const snakeOverlay = $('#snakeOverlay');
  const snakeTitle = $('#snakeTitle');
  const snakeText = $('#snakeText');
  const snakeStartBtn = $('#snakeStart');

  const SNAKE_KEY = 'maru.snake.high';

  const snake = {
    ctx: null,
    cols: 24,
    rows: 15,
    cell: 20,
    body: [],
    dir: { x: 1, y: 0 },
    queue: [],
    food: { x: 0, y: 0 },
    score: 0,
    high: Number(store.get(SNAKE_KEY, 0)) || 0,
    state: 'ready',
    step: 130,
    acc: 0,
    last: 0,
    raf: 0
  };

  const setupSnakeCanvas = () => {
    if (!snakeCanvas) return null;
    const ctx = snakeCanvas.getContext('2d');
    if (!ctx) return null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    snakeCanvas.width = 480 * dpr;
    snakeCanvas.height = 300 * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  };

  const snakeHud = () => {
    if (snakeScoreEl) snakeScoreEl.textContent = String(snake.score);
    if (snakeHighEl) snakeHighEl.textContent = String(snake.high);
    if (snakeStateEl) snakeStateEl.textContent = snake.state;
  };

  const placeFood = () => {
    const free = [];
    for (let y = 0; y < snake.rows; y += 1) {
      for (let x = 0; x < snake.cols; x += 1) {
        if (!snake.body.some((part) => part.x === x && part.y === y)) free.push({ x, y });
      }
    }
    snake.food = free.length ? free[Math.floor(Math.random() * free.length)] : { x: 0, y: 0 };
  };

  const drawSnake = () => {
    const ctx = snake.ctx;
    if (!ctx) return;

    ctx.fillStyle = '#040404';
    ctx.fillRect(0, 0, 480, 300);

    ctx.strokeStyle = 'rgba(255,255,255,.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 480; x += snake.cell) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, 300);
      ctx.stroke();
    }
    for (let y = 0; y <= 300; y += snake.cell) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(480, y + 0.5);
      ctx.stroke();
    }

    const fx = snake.food.x * snake.cell;
    const fy = snake.food.y * snake.cell;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(fx + 5, fy + 5, snake.cell - 10, snake.cell - 10);
    ctx.strokeStyle = 'rgba(255,255,255,.4)';
    ctx.strokeRect(fx + 2.5, fy + 2.5, snake.cell - 5, snake.cell - 5);

    snake.body.forEach((part, index) => {
      const px = part.x * snake.cell;
      const py = part.y * snake.cell;
      const head = index === 0;

      ctx.fillStyle = head ? '#ffffff' : '#c9c9c9';
      ctx.fillRect(px + 2, py + 2, snake.cell - 4, snake.cell - 4);

      if (!head) {
        ctx.fillStyle = 'rgba(0,0,0,.2)';
        ctx.fillRect(px + 2, py + 2, snake.cell - 4, 2);
      }
    });
  };

  const showSnakeOverlay = (title, text, action) => {
    if (snakeTitle) snakeTitle.textContent = title;
    if (snakeText) snakeText.textContent = text;
    if (snakeStartBtn) snakeStartBtn.textContent = action || '[ start ]';
    if (snakeOverlay) snakeOverlay.classList.remove('hide');
  };

  const hideSnakeOverlay = () => {
    if (snakeOverlay) snakeOverlay.classList.add('hide');
  };

  const snakeReset = () => {
    snake.body = [
      { x: 12, y: 7 },
      { x: 11, y: 7 },
      { x: 10, y: 7 },
      { x: 9, y: 7 }
    ];
    snake.dir = { x: 1, y: 0 };
    snake.queue = [];
    snake.score = 0;
    snake.step = 130;
    snake.acc = 0;
    placeFood();
    snakeHud();
    drawSnake();
  };

  const snakeTurn = (x, y) => {
    if (snake.state !== 'playing') return;
    if (snake.queue.length >= 2) return;
    const last = snake.queue.length ? snake.queue[snake.queue.length - 1] : snake.dir;
    if (last.x === -x && last.y === -y) return;
    if (last.x === x && last.y === y) return;
    snake.queue.push({ x, y });
  };

  const snakeGameOver = () => {
    snake.state = 'over';
    if (snake.score > snake.high) {
      snake.high = snake.score;
      store.set(SNAKE_KEY, snake.high);
    }
    snakeHud();
    showSnakeOverlay('game over', `Puntuación ${snake.score} · récord ${snake.high}`, '[ retry ]');
    drawSnake();
  };

  const snakeTick = () => {
    if (snake.queue.length) {
      snake.dir = snake.queue.shift();
    }

    const head = snake.body[0];
    const next = { x: head.x + snake.dir.x, y: head.y + snake.dir.y };

    if (next.x < 0 || next.y < 0 || next.x >= snake.cols || next.y >= snake.rows) {
      snakeGameOver();
      return;
    }

    const eats = next.x === snake.food.x && next.y === snake.food.y;
    const body = eats ? snake.body : snake.body.slice(0, -1);

    if (body.some((part) => part.x === next.x && part.y === next.y)) {
      snakeGameOver();
      return;
    }

    snake.body.unshift(next);

    if (eats) {
      snake.score += 10;
      if (snake.step > 78) snake.step -= 2;
      placeFood();
    } else {
      snake.body.pop();
    }

    snakeHud();
  };

  const snakeLoop = (now) => {
    if (snake.state !== 'playing') {
      snake.raf = 0;
      return;
    }

    if (!snake.last) snake.last = now;
    const delta = Math.min(120, now - snake.last);
    snake.last = now;
    snake.acc += delta;

    if (snake.acc >= snake.step) {
      snake.acc = 0;
      snakeTick();
    }

    drawSnake();
    snake.raf = requestAnimationFrame(snakeLoop);
  };

  const snakeStart = () => {
    if (!snake.ctx) return;
    snakeReset();
    snake.state = 'playing';
    snake.last = 0;
    hideSnakeOverlay();
    snakeHud();
    if (!snake.raf) snake.raf = requestAnimationFrame(snakeLoop);
  };

  const snakePause = () => {
    if (snake.state === 'playing') {
      snake.state = 'paused';
      snakeHud();
      showSnakeOverlay('paused', 'Pulsa space o el botón para continuar.', '[ resume ]');
    } else if (snake.state === 'paused') {
      snake.state = 'playing';
      snake.last = 0;
      hideSnakeOverlay();
      snakeHud();
      if (!snake.raf) snake.raf = requestAnimationFrame(snakeLoop);
    }
  };

  if (snakeCanvas) {
    snake.ctx = setupSnakeCanvas();
    if (snake.ctx) {
      snakeReset();
      if (snakeHighEl) snakeHighEl.textContent = String(snake.high);
    }
  }

  if (snakeStartBtn) {
    snakeStartBtn.addEventListener('click', () => {
      if (snake.state === 'paused') snakePause();
      else snakeStart();
    });
  }

  $$('#snakePad [data-dir]').forEach((btn) => {
    btn.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      const map = {
        up: [0, -1],
        down: [0, 1],
        left: [-1, 0],
        right: [1, 0]
      };
      const dir = map[btn.dataset.dir];
      if (dir) snakeTurn(dir[0], dir[1]);
    });
  });

  const snakeInView = () => {
    if (!snakeCanvas) return false;
    const rect = snakeCanvas.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  };

  /* =========================================================
     memory.sh
     ========================================================= */

  const memoryGrid = $('#memoryGrid');
  const memoryScoreEl = $('#memoryScore');
  const memoryHighEl = $('#memoryHigh');
  const memoryPhaseEl = $('#memoryPhase');
  const memoryOverlay = $('#memoryOverlay');
  const memoryTitle = $('#memoryTitle');
  const memoryText = $('#memoryText');
  const memoryStartBtn = $('#memoryStart');
  const memoryStatus = $('#memoryStatus');

  const MEMORY_KEY = 'maru.memory.high';

  const memory = {
    seq: [],
    input: [],
    level: 0,
    high: Number(store.get(MEMORY_KEY, 0)) || 0,
    phase: 'ready',
    timers: [],
    cells: []
  };

  const memoryHud = () => {
    if (memoryScoreEl) memoryScoreEl.textContent = String(memory.level);
    if (memoryHighEl) memoryHighEl.textContent = String(memory.high);
    if (memoryPhaseEl) memoryPhaseEl.textContent = memory.phase;

    if (memoryStatus) {
      const labels = {
        ready: 'pulsa start',
        watch: 'observa la secuencia',
        input: 'repite la secuencia',
        between: 'bien · siguiente nivel',
        over: 'has fallado'
      };
      memoryStatus.textContent = labels[memory.phase] || 'pulsa start';
    }
  };

  const clearMemoryTimers = () => {
    memory.timers.forEach((id) => window.clearTimeout(id));
    memory.timers = [];
  };

  const memoryLater = (fn, ms) => {
    const id = window.setTimeout(fn, ms);
    memory.timers.push(id);
    return id;
  };

  const setMemoryEnabled = (on) => {
    memory.cells.forEach((cell) => { cell.disabled = !on; });
  };

  const flashCell = (index, ms = 380) => {
    const cell = memory.cells[index];
    if (!cell) return;
    cell.classList.add('lit');
    memoryLater(() => cell.classList.remove('lit'), ms);
  };

  const memorySequence = () => {
    memory.phase = 'watch';
    memory.input = [];
    memoryHud();
    clearMemoryTimers();
    setMemoryEnabled(false);
    memory.cells.forEach((cell) => cell.classList.remove('lit', 'bad'));

    memory.seq.forEach((index, step) => {
      memoryLater(() => flashCell(index, 380), 500 + step * 620);
    });

    memoryLater(() => {
      memory.phase = 'input';
      setMemoryEnabled(true);
      memoryHud();
    }, 500 + memory.seq.length * 620);
  };

  const memoryNextLevel = () => {
    memory.level += 1;
    if (memory.level > memory.high) {
      memory.high = memory.level;
      store.set(MEMORY_KEY, memory.high);
    }
    memory.seq.push(Math.floor(Math.random() * 9));
    memoryHud();
    memorySequence();
  };

  const memoryFail = () => {
    memory.phase = 'over';
    clearMemoryTimers();
    setMemoryEnabled(false);

    memory.cells.forEach((cell) => cell.classList.remove('lit'));
    const wrong = memory.cells[memory.input[memory.input.length - 1]];
    if (wrong) wrong.classList.add('bad');

    memoryHud();

    if (memoryTitle) memoryTitle.textContent = 'has fallado';
    if (memoryText) memoryText.textContent = `Llegaste al nivel ${memory.level} · récord ${memory.high}`;
    if (memoryStartBtn) memoryStartBtn.textContent = '[ retry ]';
    if (memoryOverlay) memoryOverlay.classList.remove('hide');
  };

  const memoryPress = (index) => {
    if (memory.phase !== 'input') return;
    const cell = memory.cells[index];
    if (cell) {
      cell.classList.add('lit');
      memoryLater(() => cell.classList.remove('lit'), 150);
    }

    memory.input.push(index);
    const step = memory.input.length - 1;

    if (memory.seq[step] !== index) {
      memoryFail();
      return;
    }

    if (memory.input.length === memory.seq.length) {
      memory.phase = 'between';
      setMemoryEnabled(false);
      memoryHud();
      memoryLater(memoryNextLevel, 720);
    }
  };

  const memoryStart = () => {
    clearMemoryTimers();
    memory.seq = [];
    memory.input = [];
    memory.level = 0;
    memory.phase = 'ready';
    memory.cells.forEach((cell) => cell.classList.remove('lit', 'bad'));
    if (memoryOverlay) memoryOverlay.classList.add('hide');
    memoryHud();
    if (memoryStartBtn) memoryStartBtn.textContent = '[ start ]';
    memoryNextLevel();
  };

  if (memoryGrid) {
    for (let i = 0; i < 9; i += 1) {
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'memory__cell';
      cell.dataset.index = String(i);
      cell.textContent = String(i + 1).padStart(2, '0');
      cell.disabled = true;
      cell.setAttribute('aria-label', `Casilla ${String(i + 1).padStart(2, '0')}`);
      memoryGrid.appendChild(cell);
      memory.cells.push(cell);
    }

    memoryGrid.addEventListener('click', (event) => {
      const cell = event.target.closest('.memory__cell');
      if (!cell || cell.disabled) return;
      memoryPress(Number(cell.dataset.index));
    });

    memoryHud();
  }

  if (memoryStartBtn) memoryStartBtn.addEventListener('click', memoryStart);

  /* =========================================================
     atajos globales
     ========================================================= */

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (launchpad && launchpad.classList.contains('open')) {
        closeLaunchpad();
        return;
      }
      if (lightbox && lightbox.classList.contains('open')) {
        closeLightbox();
        return;
      }
      if (modal && modal.classList.contains('open')) {
        closeProject();
        return;
      }
      if (menu && menu.classList.contains('open')) {
        setMenu(false);
        return;
      }
    }

    const tag = (event.target && event.target.tagName ? event.target.tagName : '').toLowerCase();
    const typing = tag === 'input' || tag === 'textarea' || tag === 'select'
      || (event.target && event.target.isContentEditable);

    if (typing) return;

    if (lightbox && lightbox.classList.contains('open')) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stepLightbox(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        stepLightbox(1);
      }
      return;
    }

    if (modal && modal.classList.contains('open')) {
      if ((event.key === 'ArrowRight' || event.key === 'ArrowLeft') && activeProject) {
        event.preventDefault();
        const index = ORDER.indexOf(activeProject);
        const delta = event.key === 'ArrowRight' ? 1 : -1;
        openProject(ORDER[(index + delta + ORDER.length) % ORDER.length]);
      }
      return;
    }

    if (snakeInView() && (snake.state === 'playing' || snake.state === 'paused')) {
      const key = event.key.toLowerCase();

      if (key === ' ' || event.code === 'Space') {
        event.preventDefault();
        snakePause();
        return;
      }

      if (key === 'arrowup' || key === 'w') {
        event.preventDefault();
        snakeTurn(0, -1);
        return;
      }
      if (key === 'arrowdown' || key === 's') {
        event.preventDefault();
        snakeTurn(0, 1);
        return;
      }
      if (key === 'arrowleft' || key === 'a') {
        event.preventDefault();
        snakeTurn(-1, 0);
        return;
      }
      if (key === 'arrowright' || key === 'd') {
        event.preventDefault();
        snakeTurn(1, 0);
      }
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && snake.state === 'playing') snakePause();
  });

  /* =========================================================
     init
     ========================================================= */

  const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (typeof reduceQuery.addEventListener === 'function') {
    reduceQuery.addEventListener('change', (event) => {
      if (event.matches) {
        revealTargets.forEach((el) => el.classList.add('in'));
      }
    });
  }

  const heroSection = $('#hero');
  if (heroSection) heroSection.dataset.ready = 'true';
})();
