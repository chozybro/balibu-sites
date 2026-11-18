/* BALIBU site v1. Scroll reveals use IntersectionObserver; GSAP ScrollTrigger only scrubs the iris transitions.
   Everything is readable without this file (the markup carries all dish text, both languages). */
(() => {
  'use strict';
  const D = document, H = D.documentElement;
  const $ = (s, r = D) => r.querySelector(s);
  const $$ = (s, r = D) => Array.from(r.querySelectorAll(s));
  const reduce = !H.classList.contains('motion');
  const canVT = typeof D.startViewTransition === 'function' && !reduce;
  const narrow = () => innerWidth < 900;

  /* ---------- language ---------- */
  const langEl = $('.lang');
  function paintLang(l) {
    H.classList.toggle('id', l === 'id');
    H.lang = l;
    langEl.dataset.l = l;
    $$('button[data-lang]', langEl).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  }
  function setLang(l) {
    const cur = H.classList.contains('id') ? 'id' : 'en';
    try { localStorage.setItem('balibu-lang', l); } catch (e) { /* private mode */ }
    if (l === cur) return;
    if (canVT) {
      H.classList.add('lang-vt');
      const t = D.startViewTransition(() => paintLang(l));
      t.ready.catch(() => {}); t.finished.catch(() => {}).finally(() => H.classList.remove('lang-vt'));
    } else paintLang(l);
  }
  paintLang(H.classList.contains('id') ? 'id' : 'en');
  langEl.addEventListener('click', e => { const b = e.target.closest('button[data-lang]'); if (b) setLang(b.dataset.lang); });

  /* ---------- anchors (smooth only when motion is allowed) ---------- */
  function goTo(id, hash = true) {
    const el = D.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (hash) try { history.replaceState(null, '', '#' + id); } catch (e) { /* file: */ }
  }
  D.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.classList.contains('ix')) return;
    const id = a.getAttribute('href').slice(1);
    if (!id || !D.getElementById(id)) return;
    e.preventDefault();
    goTo(id === 'top' ? 'top' : id, id !== 'top');
    if (id === 'top') try { history.replaceState(null, '', location.pathname + location.search); } catch (err) { /* noop */ }
  });

  /* ---------- scroll progress, chapter bar ---------- */
  const tape = $('.tape'), bar = $('#bar'), chapters = $$('.chapter');
  const barItems = $$('.bar-i', bar);
  let vel = 0, lastY = scrollY, lastT = performance.now(), ticking = false, activeId = null;
  function frame() {
    ticking = false;
    const max = Math.max(1, H.scrollHeight - innerHeight);
    tape.style.setProperty('--p', Math.min(1, Math.max(0, scrollY / max)).toFixed(4));
    const mid = innerHeight * 0.45;
    let act = null;
    for (const c of chapters) { const r = c.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) { act = c.id; break; } }
    bar.classList.toggle('on', !!act);
    if (act !== activeId) {
      activeId = act;
      barItems.forEach(b => {
        const on = b.dataset.bar === act; b.classList.toggle('act', on);
        if (on) { b.setAttribute('aria-current', 'true'); bar.scrollTo({ left: b.offsetLeft - (bar.clientWidth - b.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' }); } else b.removeAttribute('aria-current');
      });
    }
  }
  addEventListener('scroll', () => {
    const t = performance.now(), dt = t - lastT;
    if (dt > 0) { vel = Math.abs(scrollY - lastY) / dt * 1000; lastY = scrollY; lastT = t; }
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }, { passive: true });
  frame();

  /* ---------- one-shot reveals ---------- */
  const headBeat = () => { const hb = $('.wm-head .hb'); if (!hb) return; hb.classList.remove('beat'); void hb.getBoundingClientRect(); hb.classList.add('beat'); };
  const $hb = $('.wm-head .hb'); if ($hb) $hb.addEventListener('animationend', () => $hb.classList.remove('beat'));
  if ('IntersectionObserver' in window && !reduce) {
    const mk = (fn, opts) => new IntersectionObserver((ents, o) => {
      const vis = ents.filter(x => x.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      vis.forEach((x, i) => { fn(x.target, i); o.unobserve(x.target); });
    }, opts);
    const fastNow = () => vel > 3000;
    const rows = mk((el, i) => { const f = fastNow(); el.style.setProperty('--d', (f ? 0 : Math.min(i, 3) * 0.07) + 's'); el.classList.add('in'); if (f) el.classList.add('fast'); }, { threshold: 0.25 });
    $$('.dish').forEach(el => rows.observe(el));
    const heads = mk(el => { $('.stamp', el).classList.add('in'); headBeat(); }, { rootMargin: '0px 0px -45% 0px', threshold: 0 });
    $$('.ch-head').forEach(el => heads.observe(el));
    const misc = mk(el => el.classList.add('in'), { threshold: 0.3 });
    $$('.scene, .aside, .logo-end, .map-card').forEach(el => misc.observe(el));
    // hero loops pause when off screen
    const arch = $('#arch');
    new IntersectionObserver(es => es.forEach(e => arch.classList.toggle('paused', !e.isIntersecting))).observe(arch);
  }

  /* ---------- hero: typed bubble, bites, pointer ---------- */
  const hb = $('#hb');
  const typers = [];
  function typeInto(span, text, speed = 28) {
    span.textContent = '';
    const sh = D.createElement('span'), rest = D.createElement('span');
    rest.className = 'rest'; rest.textContent = text;
    span.append(sh, rest);
    let i = 0;
    const id = setInterval(() => { i++; sh.textContent = text.slice(0, i); rest.textContent = text.slice(i); if (i >= text.length) { clearInterval(id); rest.remove(); } }, speed);
  }
  if (hb && !reduce) {
    const sp = { en: $('.en', hb), id: $('.id', hb) };
    const txt = { en: sp.en.textContent, id: sp.id.textContent };
    sp.en.classList.add('t'); sp.id.classList.add('t');
    setTimeout(() => { typeInto(sp.en, txt.en); typeInto(sp.id, txt.id); }, 1250);
    let bites = 0;
    const guy = $('.guy');
    guy.addEventListener('animationiteration', () => {
      bites++;
      if (bites === 3) { typeInto(sp.en, hb.dataset.altEn); typeInto(sp.id, hb.dataset.altId); }
    });
    if (matchMedia('(pointer: fine)').matches) {
      const cover = $('.cover'), sun = $('.arch-sun'), gw = $('.guy-wrap');
      cover.addEventListener('pointermove', e => {
        const x = (e.clientX / innerWidth - 0.5), y = (e.clientY / innerHeight - 0.5);
        sun.style.translate = `${(x * 24).toFixed(1)}px ${(y * 16).toFixed(1)}px`;
        gw.style.translate = `${(x * -10).toFixed(1)}px ${(y * -6).toFixed(1)}px`;
      }, { passive: true });
    }
  }

  /* ---------- GSAP: iris transitions scrubbed by scroll (no pinning) ---------- */
  const g = window.gsap, ST = window.ScrollTrigger;
  if (!reduce && g && ST) {
    g.registerPlugin(ST);
    $$('.ch-head').forEach(head => {
      const org = head.dataset.org || '50% 0%';
      g.fromTo(head, { clipPath: `circle(0% at ${org})` }, {
        clipPath: `circle(150% at ${org})`, ease: 'none',
        scrollTrigger: { trigger: head, start: 'top 100%', end: 'top 35%', scrub: true }
      });
    });
    const disc = $('#iris'), inner = $('.iris-in'), proxy = { r: 0 };
    const rMax = () => Math.hypot(disc.offsetWidth, disc.offsetHeight);
    const rEnd = () => Math.min(disc.offsetWidth * 0.5, disc.offsetHeight * 0.46);
    const discBg = $('.disc');
    const draw = () => { discBg.style.clipPath = `circle(${proxy.r.toFixed(1)}px at 50% 50%)`; };
    const strokes = $$('.end-heart .s');
    const frameEl = $('.closing .frame'), bub = $('.closing .bubble');
    const tl = g.timeline({ scrollTrigger: { trigger: '#closing', start: 'top 85%', end: 'top 5%', scrub: true, invalidateOnRefresh: true } });
    tl.fromTo(proxy, { r: rMax }, { r: rEnd, ease: 'none', duration: 1, onUpdate: draw }, 0)
      .fromTo(frameEl, { scale: 0.9 }, { scale: 1, ease: 'none', duration: 0.8 }, 0.1)
      .fromTo(strokes, { strokeDashoffset: 1.02 }, { strokeDashoffset: 0, ease: 'none', duration: 0.45, stagger: 0.2 }, 0.35)
      .fromTo(bub, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none', duration: 0.25 }, 0.75);
    draw();
    const refresh = () => ST.refresh();
    addEventListener('load', refresh);
    if (D.fonts && D.fonts.ready) D.fonts.ready.then(refresh);
  } else if (!reduce) {
    H.classList.add('nogsap');
  }

  /* ---------- index dialog ---------- */
  const idx = $('#index');
  const menuBtn = $('#menu-open');
  menuBtn.addEventListener('click', () => idx.showModal());
  idx.addEventListener('close', () => menuBtn.focus({ preventScroll: true }));
  idx.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) return idx.close();
    const a = e.target.closest('a.ix');
    if (!a) return;
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    idx.close();
    goTo(id);
  });

  /* ---------- dish window ---------- */
  const dlg = $('#dish'), sheet = $('#sheet'), scrollEl = $('#d-scroll'), imgEl = $('#d-img');
  const el = { eb: $('#d-eyebrow'), name: $('#d-name'), price: $('#d-price b'), sub: $('#d-sub'), desc: $('#d-desc'), tags: $('#d-tags'), prev: $('#d-prev'), next: $('#d-next'), nextN: $('#d-next-n') };
  let cur = null, pushed = false, fromPop = false, closing = false;
  const rowsOf = b => $$('[data-dish]', b.closest('.dishes'));
  const cloneKids = (src, dst) => { dst.replaceChildren(...(src ? Array.from(src.childNodes, n => n.cloneNode(true)) : [])); dst.hidden = !src || !src.childNodes.length; };
  const hiSrc = slug => `img/dishes/${slug}.webp`;

  const setAlt = btn => { imgEl.alt = $('.nm .' + (H.classList.contains('id') ? 'id' : 'en'), btn).textContent; };
  new MutationObserver(() => { if (cur && dlg.open) setAlt(cur); }).observe(H, { attributes: true, attributeFilter: ['class'] });

  function fill(btn) {
    const slug = btn.dataset.dish, sec = btn.closest('section');
    imgEl.src = $('.ph img', btn).currentSrc || $('.ph img', btn).src; // cached 480 first, then sharp 960
    const hi = new Image(); hi.src = hiSrc(slug);
    hi.decode().then(() => { if (cur === btn) imgEl.src = hiSrc(slug); }).catch(() => { if (cur === btn) imgEl.src = hiSrc(slug); });
    setAlt(btn);
    el.eb.replaceChildren();
    ['en', 'id'].forEach(l => { const s = D.createElement('span'); s.className = l; if (l === 'id') s.lang = 'id'; s.textContent = sec.dataset[l]; el.eb.append(s); });
    cloneKids($('.nm', btn), el.name);
    cloneKids($('.sub', btn), el.sub);
    cloneKids($('.ds', btn), el.desc);
    cloneKids($('.tgs', btn), el.tags);
    el.price.textContent = btn.dataset.price;
    const list = rowsOf(btn), i = list.indexOf(btn);
    const nxt = list[i + 1], prv = list[i - 1];
    el.prev.setAttribute('aria-disabled', String(!prv));
    el.prev.disabled = !prv;
    el.next.setAttribute('aria-disabled', String(!nxt));
    el.next.disabled = !nxt;
    if (nxt) cloneKids($('.nm', nxt), el.nextN); else { el.nextN.replaceChildren(); }
    scrollEl.scrollTop = 0;
  }
  const rowVisible = btn => { const r = btn.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };

  function openDish(btn, { push = true, vt = true } = {}) {
    if (dlg.open) return;
    cur = btn; closing = false;
    const slug = btn.dataset.dish;
    const rimg = $('.ph img', btn);
    if (canVT && vt && rowVisible(btn)) {
      rimg.style.viewTransitionName = 'dish-photo';
      dlg.classList.add('vt');
      const t = D.startViewTransition(() => {
        rimg.style.viewTransitionName = '';
        fill(btn); dlg.showModal();
        imgEl.style.viewTransitionName = 'dish-photo';
      });
      t.ready.catch(() => {});
      t.finished.catch(() => {}).finally(() => { imgEl.style.viewTransitionName = ''; dlg.classList.remove('vt'); });
    } else { fill(btn); dlg.showModal(); }
    try {
      if (push) { history.pushState({ dish: slug }, '', '#' + slug); pushed = true; }
      else { history.replaceState({ dish: slug, entry: 1 }, '', '#' + slug); pushed = false; }
    } catch (e) { pushed = false; }
  }

  function closeDish({ instant = false } = {}) {
    if (!dlg.open || closing) return;
    closing = true;
    const rimg = $('.ph img', cur);
    if (canVT && !instant && rowVisible(cur)) {
      imgEl.style.viewTransitionName = 'dish-photo';
      dlg.classList.add('vt');
      const t = D.startViewTransition(() => { imgEl.style.viewTransitionName = ''; dlg.close(); rimg.style.viewTransitionName = 'dish-photo'; });
      t.ready.catch(() => {});
      t.finished.catch(() => {}).finally(() => { rimg.style.viewTransitionName = ''; dlg.classList.remove('vt'); });
    } else if (!reduce && !instant) {
      dlg.classList.add('out');
      setTimeout(() => dlg.close(), 230);
    } else dlg.close();
  }

  dlg.addEventListener('close', () => {
    dlg.classList.remove('out', 'swap', 'back');
    sheet.style.transform = ''; sheet.style.transition = '';
    closing = false;
    try {
      if (pushed) { pushed = false; if (!fromPop) history.back(); }
      else if (/^#[a-z0-9-]+$/.test(location.hash) && D.querySelector(`[data-dish="${location.hash.slice(1)}"]`)) history.replaceState(null, '', location.pathname + location.search);
    } catch (e) { /* noop */ }
    fromPop = false;
    if (cur) cur.focus({ preventScroll: true });
  });
  dlg.addEventListener('cancel', e => { e.preventDefault(); closeDish(); });
  dlg.addEventListener('click', e => { if (e.target === dlg || e.target.closest('[data-close]')) closeDish(); });

  function go(dir) {
    if (!dlg.open || !cur) return;
    const list = rowsOf(cur), n = list[list.indexOf(cur) + dir];
    if (!n) return;
    cur = n;
    fill(n);
    dlg.classList.remove('swap', 'back'); void dlg.offsetWidth;
    if (!reduce) dlg.classList.add('swap'); if (dir < 0) dlg.classList.add('back');
    n.scrollIntoView({ block: 'center', behavior: 'auto' });
    try { history.replaceState({ dish: n.dataset.dish, entry: pushed ? 0 : 1 }, '', '#' + n.dataset.dish); } catch (e) { /* noop */ }
  }
  el.prev.addEventListener('click', () => go(-1));
  el.next.addEventListener('click', () => go(1));
  D.addEventListener('keydown', e => {
    if (!dlg.open) return;
    if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1);
  });
  D.addEventListener('click', e => { const b = e.target.closest('[data-dish]'); if (b && !dlg.open) openDish(b); });

  addEventListener('popstate', e => {
    const s = e.state;
    if (dlg.open && !(s && s.dish)) { fromPop = true; closeDish({ instant: true }); }
    else if (s && s.dish && !dlg.open) { const b = D.querySelector(`[data-dish="${s.dish}"]`); if (b) openDish(b, { push: false, vt: false }); }
  });

  // swipe: down closes, left/right changes dish (phone sheet only)
  let t0 = null;
  sheet.addEventListener('touchstart', e => {
    if (!narrow()) return;
    const t = e.touches[0];
    t0 = { x: t.clientX, y: t.clientY, t: e.timeStamp, axis: null, drag: false, dy: 0, dx: 0 };
  }, { passive: true });
  sheet.addEventListener('touchmove', e => {
    if (!t0) return;
    const t = e.touches[0];
    t0.dx = t.clientX - t0.x; t0.dy = t.clientY - t0.y;
    if (!t0.axis && Math.max(Math.abs(t0.dx), Math.abs(t0.dy)) > 8) t0.axis = Math.abs(t0.dx) > Math.abs(t0.dy) ? 'x' : 'y';
    if (t0.axis === 'x' && e.cancelable) e.preventDefault(); // keep horizontal swipes from becoming browser back/forward
    if (t0.axis === 'y' && t0.dy > 0 && scrollEl.scrollTop <= 0) {
      t0.drag = true;
      if (e.cancelable) e.preventDefault();
      sheet.style.transition = 'none';
      sheet.style.transform = `translateY(${t0.dy}px)`;
    }
  }, { passive: false });
  sheet.addEventListener('touchend', e => {
    if (!t0) return;
    const s = t0; t0 = null;
    if (s.drag) {
      const v = s.dy / Math.max(1, e.timeStamp - s.t);
      if (s.dy > sheet.offsetHeight * 0.25 || v > 0.5) {
        sheet.style.transition = 'transform .22s cubic-bezier(.65,0,.35,1)';
        sheet.style.transform = 'translateY(100%)';
        setTimeout(() => closeDish({ instant: true }), 210);
      } else {
        sheet.style.transition = 'transform .28s cubic-bezier(.34,1.56,.64,1)';
        sheet.style.transform = '';
      }
    } else if (s.axis === 'x' && Math.abs(s.dx) > 60) go(s.dx < 0 ? 1 : -1);
  });

  /* deep link: #<slug> opens the window on load */
  const h = location.hash.slice(1);
  if (/^[a-z0-9-]+$/.test(h)) {
    const b = D.querySelector(`[data-dish="${h}"]`);
    if (b) { b.scrollIntoView({ block: 'center', behavior: 'auto' }); openDish(b, { push: false, vt: false }); }
    else if (D.getElementById(h)) D.getElementById(h).scrollIntoView({ block: 'start', behavior: 'auto' });
  }
})();
