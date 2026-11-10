/* s09 — Colour Tiles. Vanilla JS: mosaic rendering, FLIP filter, flip cards, tilt, i18n. */
(function () {
  'use strict';
  var D = document, root = D.documentElement;
  root.classList.add('js');
  var M = window.BALIBU_MENU;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var MOB = window.matchMedia('(max-width: 700px)');
  var lang = 'en';
  try { if (localStorage.getItem('balibu-lang') === 'id') lang = 'id'; } catch (e) {}
  var promo = {}; M.promos.forEach(function (p) { promo[p.id] = p; });

  var T = {
    en: {
      skip: 'Skip to the menu', nav_menu: 'Menu', nav_promo: 'Promo', nav_story: 'Story', nav_find: 'Find us',
      h1a: 'Burgers', h1b: 'Coffee', h1c: 'Ubud',
      promise: 'Food, friends &amp; a good evening. Smashed to order · Kintamani coffee · house cocktails · opening 1 December.',
      cta_menu: 'See the menu', cta_wa: 'WhatsApp us',
      combo_k: 'Signature · every day', combo_line: promo.combo.line_en,
      open_k: 'Opening day', open_h: 'We open<br>1 Dec', open_line: promo.opening.line_en,
      c_d: 'days', c_h: 'hrs', c_m: 'min', c_s: 'sec', open_now: 'We are open — come by!',
      hh_k: 'Happy hour · every day', hh_for: 'for', hh_line: promo.happy.line_en,
      live_on: 'On now — until 19:00', live_in: 'Next one in {h}h {m}m', live_pre: ' · from 1 Dec',
      brunch_h: 'Weekend Brunch', brunch_line: 'Pancakes + flat white, 95K until noon, Sat &amp; Sun.',
      jump_k: 'Tonight', jump_h: 'See the cocktails',
      menu_k: 'The menu', all: 'Everything', all_note: 'All eight sections, from smash burgers to a cold Bintang.',
      items: '{n} items', footnote: M.brand.footnote_en,
      story_k: 'Our story', story_h: 'Good food, good mood.',
      story_p: 'A burger bar and coffee spot in the middle of Ubud. Beef smashed to order, brioche from our own oven, Kintamani arabica roasted in Bali — and house cocktails when the sun goes down.',
      f_hours: 'hours open, every day', f_items: 'dishes &amp; drinks', f_kopi: 'free kopi on 1 Dec',
      find_h: 'Find us', hours_k: 'Open daily', hours: 'Daily 08:00 – 23:00', route_k: 'Directions',
      book_h: 'Save a table', book_p: 'Tell us when you are coming and we will keep a table ready.',
      f_name: 'Name', f_date: 'Date', f_guests: 'Guests', f_phone: 'WhatsApp number', book_btn: 'Hold my table',
      err_name: 'Please tell us your name.', err_date: 'Pick a date from 1 December.', err_phone: 'Add a WhatsApp number so we can reach you.',
      ok_h: 'Thanks, {n}!', ok_p: 'Table for {g} on {d} — noted. Online booking opens soon; until then, message us on WhatsApp and we will hold it.', ok_again: 'Change details',
      show: 'show ingredients', flip_back: 'Tap to flip back',
      fill_hint_k: 'How it works', fill_hint_h: 'Tap a tile', fill_hint_p: 'Flip any dish to see what is inside.',
      fill_next_k: 'Next up', fill_wa_k: 'Hungry?', fill_wa_h: 'Order on WhatsApp',
      burger_open: 'Open menu', burger_close: 'Close menu', chips_label: 'Menu sections'
    },
    id: {
      skip: 'Langsung ke menu', nav_menu: 'Menu', nav_promo: 'Promo', nav_story: 'Cerita', nav_find: 'Lokasi',
      h1a: 'Burger', h1b: 'Kopi', h1c: 'Ubud',
      promise: 'Makanan enak, teman baik, malam yang asyik. Di-smash saat dipesan · kopi Kintamani · koktail rumah · buka 1 Desember.',
      cta_menu: 'Lihat menu', cta_wa: 'WhatsApp kami',
      combo_k: 'Andalan · setiap hari', combo_line: promo.combo.line_id,
      open_k: 'Hari pembukaan', open_h: 'Buka<br>1 Des', open_line: promo.opening.line_id,
      c_d: 'hari', c_h: 'jam', c_m: 'menit', c_s: 'detik', open_now: 'Kami sudah buka — mampir yuk!',
      hh_k: 'Happy hour · setiap hari', hh_for: 'untuk', hh_line: promo.happy.line_id,
      live_on: 'Sedang berlangsung — sampai 19.00', live_in: 'Berikutnya dalam {h} j {m} m', live_pre: ' · mulai 1 Des',
      brunch_h: 'Brunch Akhir Pekan', brunch_line: 'Pancake + flat white, 95K sampai jam 12, Sabtu &amp; Minggu.',
      jump_k: 'Malam ini', jump_h: 'Lihat koktail',
      menu_k: 'Menu', all: 'Semua', all_note: 'Delapan bagian, dari burger smash sampai Bintang dingin.',
      items: '{n} menu', footnote: M.brand.footnote_id,
      story_k: 'Cerita kami', story_h: 'Makan enak, hati senang.',
      story_p: 'Bar burger dan tempat ngopi di tengah Ubud. Daging sapi di-smash saat dipesan, brioche dari oven kami sendiri, arabika Kintamani yang disangrai di Bali — dan koktail rumah saat matahari terbenam.',
      f_hours: 'jam buka, setiap hari', f_items: 'makanan &amp; minuman', f_kopi: 'kopi gratis 1 Des',
      find_h: 'Temukan kami', hours_k: 'Buka setiap hari', hours: 'Setiap hari 08.00 – 23.00', route_k: 'Rute',
      book_h: 'Pesan meja', book_p: 'Kabari kami kapan Anda datang, kami siapkan mejanya.',
      f_name: 'Nama', f_date: 'Tanggal', f_guests: 'Tamu', f_phone: 'Nomor WhatsApp', book_btn: 'Pesan meja saya',
      err_name: 'Mohon isi nama Anda.', err_date: 'Pilih tanggal mulai 1 Desember.', err_phone: 'Tambahkan nomor WhatsApp agar kami bisa menghubungi Anda.',
      ok_h: 'Terima kasih, {n}!', ok_p: 'Meja untuk {g} orang pada {d} — dicatat. Pemesanan online segera dibuka; sementara itu, kirim pesan WhatsApp dan kami simpan mejanya.', ok_again: 'Ubah detail',
      show: 'lihat bahan', flip_back: 'Ketuk untuk kembali',
      fill_hint_k: 'Cara pakai', fill_hint_h: 'Ketuk kartu', fill_hint_p: 'Balik kartu menu untuk melihat bahannya.',
      fill_next_k: 'Berikutnya', fill_wa_k: 'Lapar?', fill_wa_h: 'Pesan via WhatsApp',
      burger_open: 'Buka menu', burger_close: 'Tutup menu', chips_label: 'Bagian menu'
    }
  };
  var NOTE_ID = { burgers: 'Daging sapi di-smash saat dipesan, brioche dari oven kami.', bites: 'Untuk berbagi. Atau tidak.', plates: 'Klasik Ubud dan beberapa dari perjalanan.',
    coffee: 'Arabika Kintamani, disangrai di Bali.', cocktails: 'Happy hour 17.00 – 19.00: beli satu gratis satu koktail rumah.' };
  var NOTE_EN_FALLBACK = { sweet: 'Save room.', fresh: 'Cold, bright and made to order.', beer: 'Ice cold, all day.' };
  var NOTE_ID_FALLBACK = { sweet: 'Sisakan tempat.', fresh: 'Dingin, segar, dibuat saat dipesan.', beer: 'Dingin, sepanjang hari.' };
  var TAGS = { signature: 'andalan', 'local twist': 'rasa lokal', veg: 'vegetarian', big: 'besar', local: 'lokal', classic: 'klasik', brunch: 'brunch', favourite: 'favorit' };
  var CUTS = 'burger-pineapple chicken-burger classic-burger coconut craft-beer crispy-chicken double-burger espresso-martini espresso flat-white iced-latte iced-tea kopi-susu kopi-tubruk lemonade loaded-fries margarita matcha mojito nasi-goreng negroni onion-rings pannacotta poke smoothie spritz tempe-chips veggie-burger wings'.split(' ');
  var OVERRIDE = { b1: 'hero-smash' };
  var ROUND = [];
  var COLS = ['yellow', 'red', 'bright', 'dark', 'cream'];
  var HERO = [['b1', 'yellow'], ['c3', 'red'], ['k3', 'bright'], ['c2', 'cream']];

  function t(k) { var v = T[lang][k]; return v == null ? T.en[k] : v; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var byId = {}, secOf = {};
  M.sections.forEach(function (s) { s.items.forEach(function (it) { byId[it.id] = it; secOf[it.id] = s; }); });
  function secTitle(s) { return lang === 'id' ? s.title_id : s.title_en; }
  function secNote(s) { return lang === 'id' ? (NOTE_ID[s.id] || NOTE_ID_FALLBACK[s.id] || '') : (s.note_en || NOTE_EN_FALLBACK[s.id] || ''); }

  /* ---------- dish tile ---------- */
  function dishHTML(it) {
    var s = secOf[it.id], ing = lang === 'id' ? it.ingredients_id : it.ingredients_en;
    var key = OVERRIDE[it.id] || it.photo, cut = !!OVERRIDE[it.id] || (CUTS.indexOf(it.photo) > -1 && ROUND.indexOf(it.id) < 0);
    var img = cut ? '<img class="cut" loading="lazy" src="../shared/img/cutw/' + key + '.webp" alt="' + esc(it.name) + '">'
                  : '<img class="round" loading="lazy" src="../shared/img/t/' + key + '.jpg" alt="' + esc(it.name) + '">';
    var tag = it.tag ? '<span class="dish__tag">' + esc(lang === 'id' ? (TAGS[it.tag] || it.tag) : it.tag) + '</span>' : '';
    return '<div class="tile__in">' +
      '<div class="face face--front">' + tag + '<span class="dish__hint" aria-hidden="true">+</span>' +
        '<div class="dish__pic">' + img + '</div>' +
        '<div class="dish__meta"><h3 class="dish__name">' + esc(it.name) + '</h3><span class="dish__price">' + it.price + 'K</span><p class="dish__peek">' + esc(ing) + '</p></div></div>' +
      '<div class="face face--back" aria-hidden="true"><div><p class="back__k">' + esc(secTitle(s)) + '</p><p class="back__n">' + esc(it.name) + '</p></div>' +
        '<p class="back__i">' + esc(ing) + '</p><div class="back__row"><span class="back__p">' + it.price + 'K</span><span class="back__x">' + esc(t('flip_back')) + '</span></div></div>' +
      '</div><button type="button" class="dish__btn" aria-expanded="false" aria-label="' + esc(it.name + ', ' + it.price + 'K — ' + t('show')) + '"></button>';
  }
  function makeDish(it, col) {
    var a = D.createElement('article');
    a.className = 'tile tile--dish t11 c-' + col;
    a.setAttribute('data-id', it.id); a.setAttribute('data-sec', secOf[it.id].id);
    a.innerHTML = dishHTML(it);
    return a;
  }
  function refreshDish(a) {
    var fl = a.classList.contains('is-flipped');
    a.innerHTML = dishHTML(byId[a.getAttribute('data-id')]);
    if (fl) { a.querySelector('.dish__btn').setAttribute('aria-expanded', 'true'); a.querySelector('.face--back').removeAttribute('aria-hidden'); }
  }
  function toggleFlip(a, force) {
    var on = force == null ? !a.classList.contains('is-flipped') : force;
    a.classList.toggle('is-flipped', on);
    var b = a.querySelector('.dish__btn'); if (b) b.setAttribute('aria-expanded', on);
    var bk = a.querySelector('.face--back'); if (bk) { if (on) bk.removeAttribute('aria-hidden'); else bk.setAttribute('aria-hidden', 'true'); }
  }
  D.addEventListener('click', function (e) {
    var b = e.target.closest('.dish__btn'); if (b) toggleFlip(b.closest('.tile--dish'));
  });
  /* hover tilt (desktop, fine pointer) */
  if (FINE && !RM) {
    D.addEventListener('pointermove', function (e) {
      var a = e.target.closest && e.target.closest('.tile--dish'); if (!a) return;
      var r = a.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      a.classList.add('tilting');
      a.style.setProperty('--ry', (px * 14).toFixed(2) + 'deg'); a.style.setProperty('--rx', (-py * 14).toFixed(2) + 'deg');
    });
    D.addEventListener('pointerout', function (e) {
      var a = e.target.closest && e.target.closest('.tile--dish'); if (!a || a.contains(e.relatedTarget)) return;
      a.classList.remove('tilting'); a.style.removeProperty('--ry'); a.style.removeProperty('--rx');
    });
  }

  /* ---------- hero dish tiles ---------- */
  var heroGrid = D.getElementById('heroGrid');
  HERO.forEach(function (h) { var a = makeDish(byId[h[0]], h[1]); a.classList.add('rv'); heroGrid.appendChild(a); });
  heroGrid.querySelectorAll('img').forEach(function (im, i) { if (i < 5) { im.removeAttribute('loading'); } });

  /* ---------- menu mosaic ---------- */
  var grid = D.getElementById('menuGrid'), secTile = D.getElementById('secTile');
  var dishes = [];
  M.sections.forEach(function (s) {
    s.items.forEach(function (it, i) { var a = makeDish(it, COLS[i % 5]); a.hidden = true; grid.appendChild(a); dishes.push(a); });
  });
  var fills = {
    next: mk('button', 'tile tile--fill t11 c-red', ''),
    hint: mk('div', 'tile tile--fill t11 c-cream', ''),
    wa: mk('a', 'tile tile--fill t11 c-yellow', '')
  };
  fills.wa.href = 'https://wa.me/628214248077'; fills.wa.target = '_blank'; fills.wa.rel = 'noopener';
  fills.next.type = 'button';
  ['next', 'hint', 'wa'].forEach(function (k) { fills[k].hidden = true; grid.appendChild(fills[k]); });
  function mk(tag, cls, html) { var e = D.createElement(tag); e.className = cls; e.innerHTML = html; return e; }
  function renderFills() {
    var nx = nextSec();
    fills.next.innerHTML = '<span class="k">' + t('fill_next_k') + '</span><span class="sm-h">' + esc(nx ? secTitle(nx) : t('all')) + '</span><span class="arrow" aria-hidden="true">→</span>';
    fills.hint.innerHTML = '<span class="k">' + t('fill_hint_k') + '</span><span class="sm-h">' + t('fill_hint_h') + '</span><p>' + t('fill_hint_p') + '</p>';
    fills.wa.innerHTML = '<span class="k">' + t('fill_wa_k') + '</span><span class="sm-h">' + t('fill_wa_h') + '</span><span class="arrow" aria-hidden="true">→</span>';
  }
  function nextSec() {
    if (cur === 'all') return M.sections[0];
    var i = M.sections.map(function (s) { return s.id; }).indexOf(cur);
    return M.sections[(i + 1) % M.sections.length];
  }
  fills.next.addEventListener('click', function () { var n = nextSec(); setFilter(n.id, true); scrollToMenu(); });

  /* chips */
  var chips = D.getElementById('chips'), ind = chips.querySelector('.chips__ind');
  var cur = 'burgers';
  function renderChips() {
    chips.querySelectorAll('.chip').forEach(function (c) { c.remove(); });
    var list = M.sections.map(function (s) { return [s.id, secTitle(s), s.items.length]; }).concat([['all', t('all'), dishes.length]]);
    list.forEach(function (c) {
      var b = D.createElement('button'); b.type = 'button'; b.className = 'chip'; b.setAttribute('data-f', c[0]);
      b.setAttribute('aria-pressed', c[0] === cur); b.innerHTML = esc(c[1]) + '<small>' + c[2] + '</small>';
      chips.appendChild(b);
    });
    chips.setAttribute('aria-label', t('chips_label'));
    moveInd(false);
  }
  function moveInd(smooth) {
    var b = chips.querySelector('.chip[data-f="' + cur + '"]'); if (!b) return;
    if (!smooth) ind.style.transition = 'none';
    ind.style.width = b.offsetWidth + 'px'; ind.style.transform = 'translateX(' + b.offsetLeft + 'px)';
    if (!smooth) { ind.offsetWidth; ind.style.transition = ''; }
    var l = b.offsetLeft - 16, r = b.offsetLeft + b.offsetWidth - chips.clientWidth + 16;
    if (chips.scrollLeft > l) chips.scrollTo({ left: l, behavior: smooth && !RM ? 'smooth' : 'auto' });
    else if (chips.scrollLeft < r) chips.scrollTo({ left: r, behavior: smooth && !RM ? 'smooth' : 'auto' });
  }
  chips.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (b) setFilter(b.getAttribute('data-f'), true); });

  function renderSecTile(animate) {
    var s = M.sections.filter(function (x) { return x.id === cur; })[0];
    D.getElementById('menuH').textContent = s ? secTitle(s) : t('all');
    D.getElementById('secNote').textContent = s ? secNote(s) : t('all_note');
    D.getElementById('secCount').textContent = t('items').replace('{n}', s ? s.items.length : dishes.length);
    if (animate && !RM) { secTile.classList.remove('swap'); secTile.offsetWidth; secTile.classList.add('swap'); }
  }
  function visibleFills(nDish) {
    var cols = MOB.matches ? 2 : 4, cells = 2 + nDish, rem = (cols - (cells % cols)) % cols;
    return ['next', 'hint', 'wa'].slice(0, rem);
  }
  var token = 0;
  function setFilter(f, animate) {
    var my = ++token;
    var prevCur = cur; cur = f;
    chips.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-f') === f); });
    moveInd(true);
    var showD = dishes.filter(function (a) { return f === 'all' || a.getAttribute('data-sec') === f; });
    var fl = visibleFills(showD.length);
    var want = new Set(showD.concat(fl.map(function (k) { return fills[k]; })));
    var before = [].slice.call(grid.children).filter(function (el) { return !el.hidden; });
    var first = new Map(); before.forEach(function (el) { first.set(el, el.getBoundingClientRect()); });
    var leaving = before.filter(function (el) { return el !== secTile && !want.has(el); });
    dishes.forEach(function (a) { if (a.classList.contains('is-flipped')) toggleFlip(a, false); });
    var go = function () {
      if (my !== token) return;
      dishes.forEach(function (a) { a.hidden = !want.has(a); a.classList.add('rv', 'in'); });
      Object.keys(fills).forEach(function (k) { fills[k].hidden = !want.has(fills[k]); });
      renderFills(); renderSecTile(animate && prevCur !== f);
      if (!animate || RM) return;
      var n = 0;
      [].slice.call(grid.children).forEach(function (el) {
        if (el.hidden) return;
        var r = el.getBoundingClientRect(), p = first.get(el);
        if (p) {
          var dx = p.left - r.left, dy = p.top - r.top;
          if (dx || dy) el.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px)' }, { transform: 'none' }], { duration: 600, easing: 'cubic-bezier(.22,1,.36,1)' });
        } else {
          el.animate([{ opacity: 0, transform: 'translateY(24px) scale(.82)' }, { opacity: 1, transform: 'none' }],
            { duration: 520, delay: Math.min(n++, 14) * 45, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' });
        }
      });
    };
    if (animate && !RM && leaving.length) {
      Promise.all(leaving.map(function (el) {
        return el.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.86)' }], { duration: 170, easing: 'ease-in', fill: 'forwards' }).finished
          .then(function (an) { return an; });
      })).then(function (anims) { go(); leaving.forEach(function (el) { el.getAnimations().forEach(function (a) { a.cancel(); }); }); });
    } else go();
  }
  function scrollToMenu() {
    var top = grid.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) D.getElementById('menu').scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
  }
  D.querySelectorAll('[data-jump]').forEach(function (a) { a.addEventListener('click', function () { setFilter(a.getAttribute('data-jump'), false); }); });
  MOB.addEventListener && MOB.addEventListener('change', function () { setFilter(cur, false); });

  /* ---------- i18n ---------- */
  function applyLang() {
    root.lang = lang;
    D.querySelectorAll('[data-i18n]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n')); });
    D.querySelectorAll('.lang__b').forEach(function (b) { var on = b.getAttribute('data-lang') === lang; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    D.querySelectorAll('.tile--dish').forEach(refreshDish);
    renderChips(); renderFills(); renderSecTile(false); updateLive(); tick();
    var ok = D.getElementById('bookOk'); if (!ok.hidden && lastBook) showOk(lastBook);
  }
  D.querySelectorAll('.lang__b').forEach(function (b) {
    b.addEventListener('click', function () { lang = b.getAttribute('data-lang'); try { localStorage.setItem('balibu-lang', lang); } catch (e) {} applyLang(); });
  });

  /* ---------- live status + countdown (Bali UTC+8) ---------- */
  var OPEN = Date.UTC(2026, 11, 1, 0, 0, 0);
  function updateLive() {
    var now = Date.now(), b = new Date(now + 8 * 3600e3), mins = b.getUTCHours() * 60 + b.getUTCMinutes();
    var el = D.getElementById('live'), on = mins >= 1020 && mins < 1140, txt;
    if (on) txt = t('live_on'); else { var d = (1020 - mins + 1440) % 1440; txt = t('live_in').replace('{h}', Math.floor(d / 60)).replace('{m}', d % 60); }
    if (now < OPEN) txt += t('live_pre');
    el.classList.toggle('on', on); el.querySelector('span').textContent = txt;
  }
  setInterval(updateLive, 30000);
  var cEl = D.getElementById('count');
  function tick() {
    var d = OPEN - Date.now();
    if (d <= 0) { cEl.innerHTML = '<p class="promo__time">' + esc(t('open_now')) + '</p>'; return; }
    var s = Math.floor(d / 1000), v = { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60 };
    cEl.querySelectorAll('[data-c]').forEach(function (x) { var k = x.getAttribute('data-c'); x.textContent = k === 'd' ? v[k] : String(v[k]).padStart(2, '0'); });
  }
  setInterval(tick, 1000);

  /* ---------- entrance + counters ---------- */
  function countUp(el) {
    var to = +el.getAttribute('data-to'); if (RM) { el.textContent = to; return; }
    var t0 = performance.now();
    (function f(now) { var p = Math.min(1, (now - t0) / 1300); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      if (el.hasAttribute('data-to')) countUp(el);
      else {
        var g = el.parentElement, cw = g.clientWidth / (MOB.matches ? 2 : 4);
        var col = Math.round(el.offsetLeft / cw), row = Math.round(el.offsetTop / cw);
        el.style.setProperty('--d', ((col + row) % 6) * 70 + 'ms'); el.classList.add('in');
      }
      io.unobserve(el);
    });
  }, { threshold: 0.12 });
  D.querySelectorAll('.mosaic > .tile').forEach(function (el) { if (el.closest('#menuGrid') && el.classList.contains('tile--dish')) return; el.classList.add('rv'); io.observe(el); });
  D.querySelectorAll('[data-to]').forEach(function (el) { io.observe(el); });

  /* ---------- nav ---------- */
  var nav = D.getElementById('nav'), links = [].slice.call(D.querySelectorAll('.nav__links a'));
  var bands = [].slice.call(D.querySelectorAll('.band'));
  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 6);
    var tt = D.querySelector('.tile--title'); nav.classList.toggle('at-top', tt.getBoundingClientRect().bottom > nav.offsetHeight + 60 && window.scrollY < tt.offsetTop + 200);
    var y = nav.offsetHeight + 40, id = null;
    bands.forEach(function (b) { var r = b.getBoundingClientRect(); if (r.top <= y && r.bottom > y) id = b.id; });
    links.forEach(function (a) { a.classList.toggle('is-cur', a.getAttribute('href') === '#' + id); });
  }
  var tk = false;
  window.addEventListener('scroll', function () { if (!tk) { tk = true; requestAnimationFrame(function () { tk = false; onScroll(); }); } }, { passive: true });
  var burger = D.getElementById('burger'), navlinks = D.getElementById('navlinks');
  function setMenu(open) {
    navlinks.classList.toggle('open', open); nav.classList.toggle('menu-open', open); burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? t('burger_close') : t('burger_open')); D.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  links.forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  /* ---------- lightbox ---------- */
  var lb = D.getElementById('lb'), lbImg = D.getElementById('lbImg'), lbX = D.getElementById('lbX'), last = null;
  D.querySelectorAll('.photo').forEach(function (b) {
    b.addEventListener('click', function () { last = b; lbImg.src = b.getAttribute('data-full'); lbImg.alt = b.querySelector('img').alt; lb.hidden = false; lbX.focus(); });
  });
  function closeLb() { lb.hidden = true; if (last) last.focus(); }
  lbX.addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  D.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (!lb.hidden) closeLb(); if (navlinks.classList.contains('open')) setMenu(false);
      var f = D.querySelector('.tile--dish.is-flipped'); if (f) toggleFlip(f, false); }
    if (e.key === 'Tab' && !lb.hidden) { e.preventDefault(); lbX.focus(); }
  });

  /* ---------- booking stub: never submits ---------- */
  var form = D.getElementById('book'), err = D.getElementById('bookErr'), ok = D.getElementById('bookOk'), lastBook = null;
  function showOk(b) {
    var ds = new Date(b.d + 'T12:00:00').toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long' });
    ok.innerHTML = '<b></b><p></p><button type="button" class="pill pill--dark"></button>';
    ok.querySelector('b').textContent = t('ok_h').replace('{n}', b.n.slice(0, 40));
    ok.querySelector('p').textContent = t('ok_p').replace('{g}', b.g).replace('{d}', ds);
    var again = ok.querySelector('button'); again.textContent = t('ok_again');
    again.addEventListener('click', function () { ok.hidden = true; form.querySelector('.book__form').hidden = false; form.name.focus(); });
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = form.name.value.trim(), d = form.date.value, ph = form.phone.value.trim(), msg = '';
    if (!n) msg = t('err_name'); else if (!d || d < '2026-12-01') msg = t('err_date'); else if (!/^[0-9 +()-]{7,20}$/.test(ph)) msg = t('err_phone');
    if (msg) { err.textContent = msg; err.hidden = false; return; }
    err.hidden = true; lastBook = { n: n, d: d, g: form.guests.value };
    showOk(lastBook); form.querySelector('.book__form').hidden = true; ok.hidden = false;
  });

  /* ---------- boot ---------- */
  applyLang();
  setFilter('burgers', false);
  onScroll();
  window.addEventListener('resize', function () { moveInd(false); });
  if (D.fonts && D.fonts.ready) D.fonts.ready.then(function () { moveInd(false); });
})();
