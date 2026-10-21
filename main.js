/* =====================================================================
   main.js: data/content.js থেকে পেজ বানায়।
   সিকিউরিটি নিয়ম: কোথাও innerHTML ব্যবহার করা হয়নি, সব লেখা textContent দিয়ে
   বসে। তাই কেউ টার্মিনালে বা ডাটায় স্ক্রিপ্ট ঢোকালেও চলবে না (XSS বন্ধ)।
   ===================================================================== */
(() => {
  'use strict';
  const S = window.SITE;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PLACEHOLDER = 'placeholder.svg';

  /* ---------- ছোট হেল্পার ---------- */
  // শুধু http(s), mailto, # লিংক চলবে (javascript: ব্লক)
  const safeUrl = u => (/^(https:\/\/|http:\/\/|mailto:|#)/i.test(u || '') ? u : '#');
  const safeIcon = c => (/^[\w\- ]+$/.test(c || '') ? c : 'fa-solid fa-circle');

  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v);
    }
    kids.flat().forEach(c => { if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c)); });
    return e;
  }
  const icon = c => h('i', { class: safeIcon(c), 'aria-hidden': 'true' });
  const ext = (url, cls, ...kids) => h('a', { href: safeUrl(url), target: '_blank', rel: 'noopener noreferrer', class: cls }, ...kids);
  function pic(src, alt, cls) {
    const i = h('img', { src: src || PLACEHOLDER, alt: alt || '', class: cls, loading: 'lazy', decoding: 'async' });
    i.addEventListener('error', () => { if (!i.src.endsWith(PLACEHOLDER)) i.src = PLACEHOLDER; }, { once: true });
    return i;
  }
  const section = (id, title, sub, ...body) =>
    h('section', { id }, h('div', { class: 'wrap' },
      h('header', { class: 'sh rv' }, h('h2', { text: title }), sub ? h('p', { text: sub }) : null), ...body));
  const counter = (n, suffix) => h('span', { class: 'num', 'data-n': String(n), 'data-s': suffix || '', text: '0' + (suffix || '') });

  /* ---------- সেকশন বানানো ---------- */
  const P = S.profile;
  const NAV = [['research', 'Research'], ['projects', 'Projects'], ['about', 'About'], ['skills', 'Skills'],
    ['achievements', 'Success'], ['reviews', 'Reviews'], ['experience', 'Experience'], ['gallery', 'Gallery']];

  const NAV_ON = NAV.filter(([id]) => id !== 'reviews' || S.reviews.length);
  const nav = h('header', { class: 'nav', id: 'nav' }, h('div', { class: 'wrap nav-in' },
    h('a', { href: '#home', class: 'brand' }, pic(P.photo, P.name, 'avatar'), h('span', null, h('b', { text: P.name }), h('small', { text: P.tagline }))),
    h('nav', { class: 'links', id: 'links', 'aria-label': 'Main' }, NAV_ON.map(([id, t]) => h('a', { href: '#' + id, text: t }))),
    h('button', { class: 'burger', id: 'burger', 'aria-label': 'Open menu', 'aria-expanded': 'false' }, icon('fa-solid fa-bars'))));

  const chips = [P.roles[0], P.roles[1], P.roles[2], { icon: 'fa-solid fa-circle-check', label: S.stats[5].n + '+ projects delivered' }];
  const hero = h('section', { class: 'hero', id: 'home' }, h('div', { class: 'wrap hero-grid' },
    h('div', { class: 'hero-copy' },
      h('p', { class: 'status' }, h('span', { class: 'dot' }), P.status),
      h('h1', null, h('span', { class: 'l1', text: 'Hi, I am' }), h('span', { class: 'l2', text: P.name })),
      h('p', { class: 'sub', text: P.tagline }),
      h('ul', { class: 'roles' }, P.roles.map(r => h('li', null, icon(r.icon), r.label))),
      h('p', { class: 'lede', id: 'lede', 'aria-label': P.lede }),
      h('div', { class: 'cta' },
        ext(P.hireUrl, 'btn primary', icon('fa-brands fa-whatsapp'), 'Hire me'),
        h('a', { href: '#research', class: 'btn ghost', text: 'Read my research' }),
        h('span', { class: 'soc' }, S.socials.map(s => ext(s.url, 'soc-a', icon(s.icon), h('span', { class: 'sr', text: s.label })))))),
    h('div', { class: 'orb' },
      h('div', { class: 'ring' }), h('div', { class: 'portrait' }, pic(P.photo, P.name)),
      chips.map((c, i) => h('span', { class: 'chip c' + (i + 1) }, icon(c.icon), c.label)))),
    h('div', { class: 'wrap stats' }, S.stats.map(s => h('div', { class: 'glass' }, counter(s.n, s.suffix), h('span', { text: s.label })))));
  const tags = S.skills.flatMap(k => k.tags);
  const marquee = h('div', { class: 'marquee', 'aria-hidden': 'true' }, h('div', { class: 'track' }, tags.concat(tags).map(t => h('span', { text: t }))));

  const research = section('research', 'Research papers and publications',
    'Peer-reviewed publications, preprints, and open implementations in application security and threat intelligence.',
    h('div', { class: 'papers' }, S.papers.map(p => h('article', { class: 'card paper rv' },
      p.image ? pic(p.image, p.title, 'paper-img') : null,
      h('div', null,
        h('p', { class: 'tagline' }, icon('fa-solid fa-award'), p.tag + ', ' + p.year),
        h('h3', { text: p.title }),
        h('p', { class: 'by', text: 'by ' + p.authors }),
        h('p', { text: p.desc }),
        h('div', { class: 'cta' },
          p.paperUrl ? ext(p.paperUrl, 'btn primary', icon('fa-solid fa-file-lines'), 'Read paper') : null,
          p.codeUrl ? ext(p.codeUrl, 'btn ghost', icon('fa-brands fa-github'), 'Code and dataset') : null))))));

  const projects = section('projects', 'Security projects and tooling',
    'Open-source tools, pentesting scripts, and auditing utilities.',
    h('div', { class: 'grid3' }, S.projects.map(p => h('article', { class: 'card proj rv' },
      h('span', { class: 'ico' }, icon(p.icon)), h('h3', { text: p.title }), h('p', { text: p.desc }),
      ext(p.url, 'more', icon('fa-brands fa-github'), 'View repository')))));

  const A = S.about;
  const list = items => h('ul', { class: 'ticks' }, items.map(t => h('li', { text: t })));
  const about = section('about', A.heading, null,
    h('div', { class: 'about rv' },
      h('div', { class: 'prose' }, A.paras.map(t => h('p', { text: t }))),
      h('div', { class: 'side' },
        h('div', { class: 'card' }, h('h3', null, icon('fa-solid fa-trophy'), 'Credentials'), list(A.credentials)),
        h('div', { class: 'card' }, h('h3', null, icon('fa-solid fa-graduation-cap'), 'Education'), list(A.education)))));

  const skills = section('skills', 'Skills and services', null,
    h('div', { class: 'grid2' }, S.skills.map(s => h('article', { class: 'card skill rv' },
      h('h3', null, icon(s.icon), s.title),
      h('div', { class: 'tags' }, s.tags.map(t => h('span', { text: t })))))));

  const trust = h('section', { class: 'trust', id: 'trust' }, h('div', { class: 'wrap rv' },
    h('h2', { text: 'Why clients and teams trust my work' }),
    h('div', { class: 'tnums' }, S.trust.map(t => h('div', null, counter(t.n, t.suffix), h('span', { text: t.label })))),
    h('p', { text: S.trustNote })));

  const stories = section('achievements', 'Honours and success stories',
    'Recoveries, security wins, and communities I am proud to be part of.',
    h('div', { class: 'grid3' }, S.stories.map(s => h('article', { class: 'card story rv' },
      pic(s.image, s.title, 'story-img'),
      h('div', { class: 'body' }, h('span', { class: 'badge', text: s.badge }), h('h3', { text: s.title }), h('p', { text: s.desc }))))));

  const reviews = section('reviews', 'What people say about my work', 'Reviews from clients and site owners.',
    h('div', { class: 'reviews' }, S.reviews.map(r => h('button', { class: 'rev rv', type: 'button', 'data-zoom': r.image, 'data-alt': r.alt, 'aria-label': 'Open ' + r.alt }, pic(r.image, r.alt)))));

  const exp = section('experience', 'Experience', null,
    h('ol', { class: 'timeline' }, S.experience.map(e => h('li', { class: 'rv' },
      h('time', { text: e.date }), h('h3', { text: e.role }), h('p', { class: 'org', text: e.org }), h('p', { text: e.desc })))));

  const gallery = section('gallery', 'Events and moments', 'A few honours to share.',
    h('div', { class: 'gallery' }, S.gallery.map(g => h('button', { class: 'g rv', type: 'button', 'data-zoom': g.image, 'data-alt': g.caption, 'aria-label': 'Open ' + g.caption },
      pic(g.image, g.caption), h('span', { text: g.caption })))));

  const footer = h('footer', null, h('div', { class: 'wrap foot' },
    h('div', null, h('b', { text: P.name }), h('p', { text: 'Cybersecurity Researcher and Web Pentester, Senior Graphic Designer' })),
    h('div', { class: 'soc' }, S.socials.map(s => ext(s.url, 'soc-a', icon(s.icon), h('span', { class: 'sr', text: s.label })))),
    h('p', { class: 'copy', text: '© ' + new Date().getFullYear() + ' ' + P.name + '. All rights reserved.' })));

  /* টার্মিনাল + লাইটবক্স + কন্ট্রোল */
  const termIn = h('input', { class: 'term-in', id: 'termIn', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Terminal command' });
  const termBody = h('div', { class: 'term-body', id: 'termBody', 'aria-live': 'polite' });
  const term = h('div', { class: 'modal', id: 'term', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Terminal', hidden: '' },
    h('div', { class: 'term' },
      h('div', { class: 'term-top' }, h('span', { text: 'ahammed@portfolio: ~' }), h('button', { id: 'termX', 'aria-label': 'Close terminal' }, icon('fa-solid fa-xmark'))),
      termBody, h('label', { class: 'term-row' }, h('span', { text: '$' }), termIn)));
  const lbImg = h('img', { alt: '' });
  const lb = h('div', { class: 'modal lb', id: 'lb', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Image viewer', hidden: '' },
    h('button', { id: 'lbX', 'aria-label': 'Close image' }, icon('fa-solid fa-xmark')), lbImg);
  const dock = h('div', { class: 'dock' },
    h('button', { id: 'sound', 'aria-label': 'Toggle sound', 'aria-pressed': 'false' }, icon('fa-solid fa-volume-xmark')),
    h('button', { id: 'termBtn', 'aria-label': 'Open terminal (Ctrl + `)' }, icon('fa-solid fa-terminal')),
    h('button', { id: 'top', 'aria-label': 'Back to top' }, icon('fa-solid fa-arrow-up')));

  document.getElementById('app').append(nav, h('main', null, hero, marquee, research, projects, about, skills, trust, stories, S.reviews.length ? reviews : null, exp, gallery), footer, dock, term, lb);

  /* ---------- ইফেক্ট ---------- */
  const $ = id => document.getElementById(id);
  // টাইপরাইটার
  const lede = $('lede'); let ci = 0;
  (function type() {
    if (reduce) { lede.textContent = P.lede; return; }
    lede.textContent = P.lede.slice(0, ++ci);
    if (ci < P.lede.length) setTimeout(type, 16);
  })();

  // স্ক্রল রিভিল + কাউন্টার
  const count = el => {
    const n = +el.dataset.n, s = el.dataset.s; let t0;
    if (reduce) { el.textContent = n + s; return; }
    const step = ts => { t0 = t0 || ts; const p = Math.min((ts - t0) / 1200, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + s; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('.num').forEach(count);
    if (e.target.classList.contains('num')) count(e.target);
    io.unobserve(e.target);
  }), { threshold: 0.15 });
  document.querySelectorAll('.rv, .stats, .hero .num').forEach(el => io.observe(el));

  // কার্ডে মাউসের সাথে আলোর ঝলক
  document.addEventListener('pointermove', e => {
    const c = e.target.closest && e.target.closest('.card');
    if (c) { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px'); }
  }, { passive: true });

  // নেভ, স্ক্রল প্রোগ্রেস, টপ বাটন
  const links = $('links'), burger = $('burger');
  burger.addEventListener('click', () => { const o = links.classList.toggle('open'); burger.setAttribute('aria-expanded', String(o)); });
  links.addEventListener('click', e => { if (e.target.tagName === 'A') { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); } });
  addEventListener('scroll', () => {
    const d = document.documentElement;
    $('progress').style.width = (d.scrollTop / (d.scrollHeight - d.clientHeight || 1) * 100) + '%';
    nav.classList.toggle('scrolled', d.scrollTop > 30);
  }, { passive: true });
  $('top').addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

  // সাউন্ড (ডিফল্টে বন্ধ)
  let sound = false, actx;
  const beep = (f = 700) => {
    if (!sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const o = actx.createOscillator(), g = actx.createGain();
      o.frequency.value = f; g.gain.value = .03; o.connect(g); g.connect(actx.destination);
      o.start(); o.stop(actx.currentTime + .06);
    } catch (_) { /* ignore */ }
  };
  $('sound').addEventListener('click', e => {
    sound = !sound; const b = e.currentTarget; b.setAttribute('aria-pressed', String(sound));
    b.replaceChildren(icon(sound ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark')); beep(880);
  });

  /* ---------- লাইটবক্স (গ্যালারি ও রিভিউ বড় করে দেখা) ---------- */
  let lastFocus;
  const openModal = (m, focusEl) => { lastFocus = document.activeElement; m.hidden = false; (focusEl || m.querySelector('button')).focus(); };
  const closeModal = m => { m.hidden = true; if (lastFocus) lastFocus.focus(); };
  document.addEventListener('click', e => {
    const z = e.target.closest('[data-zoom]');
    if (z) { lbImg.src = z.dataset.zoom; lbImg.alt = z.dataset.alt || ''; lbImg.onerror = () => { lbImg.src = PLACEHOLDER; lbImg.onerror = null; }; openModal(lb); }
    if (e.target === lb || e.target.closest('#lbX')) closeModal(lb);
  });

  /* ---------- টার্মিনাল (শুধু লোকাল কমান্ড, কোনো API কী নেই) ---------- */
  const say = (t, cls) => { termBody.append(h('p', { class: cls || '', text: t })); termBody.scrollTop = termBody.scrollHeight; };
  say('Welcome to the portfolio terminal. Type help.');
  let quiz = { on: false, i: 0, score: 0 };
  const toggleTerm = () => { if (term.hidden) { openModal(term, termIn); beep(700); } else closeModal(term); };
  $('termBtn').addEventListener('click', toggleTerm);
  $('termX').addEventListener('click', toggleTerm);
  addEventListener('keydown', e => {
    if (e.ctrlKey && (e.key === '`' || e.key === '~')) { e.preventDefault(); toggleTerm(); }
    if (e.key === 'Escape') { if (!term.hidden) closeModal(term); if (!lb.hidden) closeModal(lb); }
  });
  termIn.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const raw = termIn.value.trim().slice(0, 100); termIn.value = ''; if (!raw) return;
    say('$ ' + raw, 'you'); beep(600);
    const cmd = raw.toLowerCase();
    if (quiz.on) {
      const q = S.quiz[quiz.i];
      if (cmd === q.a) { quiz.score++; say('Correct.', 'ok'); } else say('Wrong. Answer: ' + q.a, 'bad');
      if (++quiz.i < S.quiz.length) say(S.quiz[quiz.i].q); else { quiz.on = false; say('Done. Score: ' + quiz.score + ' / ' + S.quiz.length, 'ok'); }
      return;
    }
    const cmds = {
      help: () => say('Commands: about, research, skills, game, clear, exit'),
      about: () => say(P.name + ': ' + P.roles.map(r => r.label).join(', ') + '.'),
      research: () => S.papers.forEach((p, i) => say((i + 1) + '. ' + p.title + ' (' + p.year + ')')),
      skills: () => say(S.skills.flatMap(s => s.tags).join(', ')),
      game: () => { quiz = { on: true, i: 0, score: 0 }; say('Security quiz started.'); say(S.quiz[0].q); },
      clear: () => termBody.replaceChildren(),
      exit: () => closeModal(term)
    };
    (Object.prototype.hasOwnProperty.call(cmds, cmd) ? cmds[cmd] : () => say('Unknown command. Type help.', 'bad'))();
  });
})();
