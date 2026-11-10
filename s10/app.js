/* Balibu · s10 Ink & Chalk — vanilla JS, no dependencies */
(function () {
  'use strict';
  var M = window.BALIBU_MENU || { sections: [], brand: {} };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var T = {
    en: {
      skip: 'Skip to the menu', n_menu: 'menu', n_drinks: 'drinks', n_promo: 'promo', n_find: 'find us', n_book: 'book a table',
      kicker: 'Burgers · Coffee · Ubud', h1a: 'good food,', h1b: 'good times.',
      lead: 'Burgers smashed to order, Kintamani coffee and house cocktails. Jl. Sugriwa No. 60, Ubud.',
      cta_menu: 'see the menu', cta_find: 'find us', open_st: 'opening 1 Dec!', hours: 'Daily 08:00 – 23:00',
      about_cap: "that's the vibe", about_h: "hi, we're Balibu.",
      about_p: 'A small bar & resto on Jl. Sugriwa in Ubud. We smash beef patties to order, bake our own brioche, pour Kintamani arabica roasted in Bali and shake cocktails with Balinese arak. Breakfast at eight, happy hour at five, friends all day.',
      note1: 'smashed to order', note2: 'Kintamani arabica', note3: 'open 08:00 – 23:00',
      menu_h: 'menu', menu_tag: 'good food, good times — Ubud, since 2026', yum: 'yum!',
      f_lbl: 'show me:', f_all: 'everything', f_sig: 'signatures', f_local: 'local twist', f_veg: 'veggie',
      count: function (n) { return n + (n === 1 ? ' pick' : ' picks'); },
      chef: "chef's pick →", br_h: 'weekend brunch, 95K', br_line: 'Pancakes and flat white, 95K until noon. Saturdays & Sundays.',
      combo_h: 'the smash combo', c_fries: 'hand-cut fries', c_tea: 'iced lemon tea', combo_every: 'every day',
      drinks_h: 'DRINKS', board_note: "today's board · drinks", special: "today's special",
      hh_h: 'happy hour 17 – 19', hh_line: 'Two for one on house cocktails: Balibu Spritz, Arak Mojito, Passion Margarita.',
      hh_on: 'on now! ends in', hh_off: 'starts in',
      footnote: M.brand.footnote_en || 'Prices in thousands of rupiah (K). Subject to 15% tax & service.',
      op_k: 'grand opening', op_h: 'we open 1 Dec!', op_line: 'First 100 guests get a free Es Kopi Susu Aren.', op_days: 'days to go', op_now: "we're open!",
      gal_h: 'little moments', gal_hint: 'swipe →',
      g1: 'long tables, loud laughs', g2: 'shake it, arak style', g3: 'two hands, one burger', g4: 'Ubud, our backyard', g5: 'late bites till 23:00',
      find_h: 'come say hi', wa: 'WhatsApp us', route: 'get directions',
      book_h: 'save a table', book_p: "Opening week fills up fast. Leave a note and we'll keep a spot for you.",
      f_name: 'your name', f_date: 'date', f_guests: 'guests', f_go: 'keep my spot',
      ok: function (n, d, g) { return 'yay, ' + n + '! ' + g + ' on ' + d + ' — noted. This is a preview, so send it to us on WhatsApp to confirm.'; },
      need: 'just your name first, please!', bad_date: 'we open on 1 Dec, so pick a date from then on!',
      sp_big: '2 for 1', a_open: 'Open menu', a_close: 'Close menu', a_lang: 'Switch language: English / Bahasa Indonesia', a_filter: 'Filter the menu', a_gal: 'Photo strip, scroll sideways'
    },
    id: {
      skip: 'Langsung ke menu', n_menu: 'menu', n_drinks: 'minuman', n_promo: 'promo', n_find: 'lokasi', n_book: 'pesan meja',
      kicker: 'Burger · Kopi · Ubud', h1a: 'makanan enak,', h1b: 'suasana asyik.',
      lead: 'Burger di-smash saat dipesan, kopi Kintamani dan koktail rumah. Jl. Sugriwa No. 60, Ubud.',
      cta_menu: 'lihat menu', cta_find: 'lokasi kami', open_st: 'buka 1 Des!', hours: 'Setiap hari 08.00 – 23.00',
      about_cap: 'begini suasananya', about_h: 'halo, kami Balibu.',
      about_p: 'Bar & resto kecil di Jl. Sugriwa, Ubud. Patty sapi di-smash saat dipesan, brioche dipanggang sendiri, arabika Kintamani yang disangrai di Bali, dan koktail dengan arak Bali. Sarapan jam delapan, happy hour jam lima, teman sepanjang hari.',
      note1: 'di-smash saat dipesan', note2: 'arabika Kintamani', note3: 'buka 08.00 – 23.00',
      menu_h: 'menu', menu_tag: 'makanan enak, suasana asyik — Ubud, sejak 2026', yum: 'enak!',
      f_lbl: 'tampilkan:', f_all: 'semua', f_sig: 'andalan', f_local: 'rasa lokal', f_veg: 'vegetarian',
      count: function (n) { return n + ' pilihan'; },
      chef: 'pilihan chef →', br_h: 'brunch akhir pekan, 95K', br_line: 'Pancake dan flat white, 95K sampai jam 12. Sabtu & Minggu.',
      combo_h: 'paket smash combo', c_fries: 'kentang goreng', c_tea: 'es teh lemon', combo_every: 'setiap hari',
      drinks_h: 'MINUMAN', board_note: 'papan hari ini · minuman', special: 'spesial hari ini',
      hh_h: 'happy hour 17 – 19', hh_line: 'Beli satu gratis satu koktail rumah: Balibu Spritz, Arak Mojito, Passion Margarita.',
      hh_on: 'sedang berlangsung! berakhir', hh_off: 'mulai dalam',
      footnote: M.brand.footnote_id || 'Harga dalam ribuan rupiah (K), belum termasuk pajak & layanan 15%.',
      op_k: 'pembukaan', op_h: 'buka 1 Des!', op_line: '100 tamu pertama dapat Es Kopi Susu Aren gratis.', op_days: 'hari lagi', op_now: 'kami sudah buka!',
      gal_h: 'momen kecil', gal_hint: 'geser →',
      g1: 'meja panjang, tawa lepas', g2: 'kocok ala arak', g3: 'dua tangan, satu burger', g4: 'Ubud, halaman belakang kami', g5: 'camilan malam sampai 23.00',
      find_h: 'mampir yuk', wa: 'Chat WhatsApp', route: 'petunjuk arah',
      book_h: 'pesan meja', book_p: 'Minggu pembukaan cepat penuh. Tinggalkan catatan, kami simpan tempat untukmu.',
      f_name: 'nama kamu', f_date: 'tanggal', f_guests: 'tamu', f_go: 'simpan tempatku',
      ok: function (n, d, g) { return 'asyik, ' + n + '! ' + g + ' orang, ' + d + ' — dicatat. Ini pratinjau, kirim ke WhatsApp kami untuk konfirmasi.'; },
      need: 'isi nama dulu ya!', bad_date: 'kami buka 1 Des, jadi pilih tanggal setelahnya ya!',
      sp_big: 'beli 1 gratis 1', a_open: 'Buka menu', a_close: 'Tutup menu', a_lang: 'Ganti bahasa: English / Bahasa Indonesia', a_filter: 'Saring menu', a_gal: 'Strip foto, geser ke samping'
    }
  };
  var NOTE_ID = { burgers: 'Patty sapi di-smash saat dipesan, brioche dari oven kami.', bites: 'Untuk berbagi. Atau tidak.', plates: 'Klasik Ubud dan beberapa favorit dari jalanan.', coffee: 'Arabika Kintamani, disangrai di Bali.', cocktails: 'Happy hour 17.00 – 19.00: beli satu gratis satu koktail rumah.' };
  var TAG_ID = { signature: 'andalan!', 'local twist': 'rasa lokal!', veg: 'vegetarian!', big: 'jumbo!', local: 'lokal!', classic: 'klasik!', brunch: 'brunch!', favourite: 'favorit!' };
  var FOOD = ['burgers', 'bites', 'plates', 'sweet'], DRINK = ['coffee', 'cocktails', 'fresh', 'beer'];
  var lang = 'en', filter = 'all';
  try { lang = localStorage.getItem('balibu-lang') === 'id' ? 'id' : 'en'; } catch (e) {}
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function sec(id) { for (var i = 0; i < M.sections.length; i++) if (M.sections[i].id === id) return M.sections[i]; return null; }

  /* ---------- menu ---------- */
  function secHTML(s) {
    var title = lang === 'id' ? s.title_id : s.title_en.toLowerCase();
    if (DRINK.indexOf(s.id) > -1 && lang === 'en') title = s.title_en;
    var note = lang === 'id' ? (NOTE_ID[s.id] || '') : (s.note_en || '');
    var h = '<div class="sec" id="s-' + s.id + '"><h3><span class="hw-t">' + esc(title) + '</span>' +
      '<svg class="ink-line" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M3 8C50 5 90 10 140 7S190 6 197 8"/></svg></h3>' +
      (note ? '<p class="sec-note">' + esc(note) + '</p>' : '') + '<ul class="items">';
    s.items.forEach(function (it) {
      var tag = it.tag ? (lang === 'id' ? (TAG_ID[it.tag] || it.tag) : it.tag + '!') : '';
      h += '<li class="it" data-tag="' + esc(it.tag || '') + '"><span class="thumb"><img src="../shared/img/t/' + it.photo + '.jpg" alt="' + esc(it.name) + '" loading="lazy" decoding="async" width="58" height="58"></span>' +
        '<div><h4 class="it-n">' + esc(it.name) + (tag ? '<span class="tag">' + esc(tag) + '</span>' : '') + '</h4>' +
        '<p>' + esc(lang === 'id' ? it.ingredients_id : it.ingredients_en) + '</p></div>' +
        '<span class="price" aria-label="' + it.price + ' thousand rupiah">' + it.price + 'K</span></li>';
    });
    return h + '</ul></div>';
  }
  function renderMenu() {
    $('#food').innerHTML = FOOD.map(function (id) { var s = sec(id); return s ? secHTML(s) : ''; }).join('');
    $('#drinklist').innerHTML = DRINK.map(function (id) { var s = sec(id); return s ? secHTML(s) : ''; }).join('');
    $$('.sec .ink-line').forEach(observe);
    applyFilter(filter);
  }
  function match(tag, f) { return f === 'all' || (f === 'local' ? /local/.test(tag) : tag === f); }
  function applyFilter(f) {
    filter = f; var n = 0;
    $$('.fchip').forEach(function (c) { var on = c.getAttribute('data-t') === f; c.classList.toggle('on', on); c.setAttribute('aria-pressed', on); });
    $$('#food .it').forEach(function (li) { var ok = match(li.getAttribute('data-tag'), f); li.classList.toggle('dim', !ok); li.classList.toggle('hid', !ok); if (ok) n++; });
    $$('#food .sec').forEach(function (s) { s.classList.toggle('hid', !s.querySelector('.it:not(.hid)')); });
    $('.f-count').textContent = f === 'all' ? '' : T[lang].count(n);
  }
  $('.filters').addEventListener('click', function (e) { var b = e.target.closest('.fchip'); if (b) applyFilter(b.getAttribute('data-t')); });

  /* ---------- i18n ---------- */
  function applyLang() {
    var d = T[lang];
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (el) { var v = d[el.getAttribute('data-i18n')]; if (typeof v === 'string') el.textContent = v; });
    $('.btn-lang').setAttribute('aria-label', d.a_lang); $('.filters').setAttribute('aria-label', d.a_filter); $('.gal-strip').setAttribute('aria-label', d.a_gal);
    burger.setAttribute('aria-label', nl.classList.contains('open') ? d.a_close : d.a_open);
    $('.hero-h1').setAttribute('aria-label', d.h1a + ' ' + d.h1b);
    $('.btn-lang').innerHTML = '<span' + (lang === 'en' ? ' class="on"' : '') + '>EN</span> / <span' + (lang === 'id' ? ' class="on"' : '') + '>ID</span>';
    renderMenu(); tick();
  }
  $('.btn-lang').addEventListener('click', function () {
    lang = lang === 'en' ? 'id' : 'en';
    try { localStorage.setItem('balibu-lang', lang); } catch (e) {}
    applyLang();
  });

  /* ---------- reveals, ink draw-on, handwriting ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var t = e.target;
      if (t._hw) { t._hw.forEach(function (h) { h.classList.add('on'); }); }
      else if (t.matches('.doodle, .ink-line')) t.classList.add('drawn'); else t.classList.add('on');
      io.unobserve(t);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }) : null;
  function observe(el) { if (io) io.observe(el); else el.classList.add(el.matches('.doodle, .ink-line') ? 'drawn' : 'on'); }
  $$('.rv, .doodle, .ink-line').forEach(function (el) { if (!el.closest('.hero')) observe(el); });
  /* clipped headings have no visible area, so watch their parent instead */
  $$('.rv-hw').forEach(function (h) {
    var p = h.parentElement;
    if (!io) { h.classList.add('on'); return; }
    if (!p._hw) { p._hw = []; io.observe(p); }
    p._hw.push(h);
  });
  ['.sb-a', '.sb-f', '.sb-c', '.sb-e'].forEach(function (s) { var el = $(s); if (el && !reduce) el.classList.add('morph'); });

  /* ---------- hero intro ---------- */
  function heroGo() {
    var hero = $('.hero'); hero.classList.add('go');
    $$('.hero .hw').forEach(function (el) { el.classList.add('on'); });
    $$('.hero .rv').forEach(function (el) { el.classList.add('on'); });
    $$('.hero .doodle').forEach(function (el, i) { setTimeout(function () { el.classList.add('drawn'); }, reduce ? 0 : 900 + i * 260); });
    $('.hero-line').classList.add('drawn');
  }

  /* ---------- wave parallax + nav state ---------- */
  var waves = $$('.wave svg'), nav = $('.nav'), ticking = false;
  function onScroll() {
    ticking = false; var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 10); setCur();
    if (reduce) return;
    waves.forEach(function (w, i) {
      var half = w.getBoundingClientRect().width / 2 || 1;
      var off = ((y * (i % 2 ? 0.18 : 0.12)) % half);
      w.style.transform = 'translate3d(' + (-off).toFixed(1) + 'px,0,0)';
    });
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* current nav link: recomputed on scroll, cleared when no section is active */
  var links = $$('.nav-links a'), secs = ['menu', 'drinks', 'promo', 'visit'].map(function (id) { return document.getElementById(id); }).filter(Boolean);
  function setCur() {
    var line = window.innerHeight * 0.45, cur = '';
    secs.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top <= line && r.bottom > line) cur = el.id; });
    links.forEach(function (a) { a.classList.toggle('cur', cur !== '' && a.getAttribute('href') === '#' + cur); });
  }

  /* ---------- burger ---------- */
  var burger = $('.burger'), nl = $('#navlinks');
  function closeNav() { nl.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', T[lang].a_open); }
  burger.addEventListener('click', function () {
    var open = !nl.classList.contains('open');
    nl.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? T[lang].a_close : T[lang].a_open);
  });
  nl.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

  /* ---------- clocks (Bali, UTC+8) ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tick() {
    var now = Date.now(), d = new Date(now + 8 * 3600e3);
    var s = d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds();
    var on = s >= 61200 && s < 68400, left = on ? 68400 - s : (61200 - s + 86400) % 86400;
    $('.hh-state').textContent = T[lang][on ? 'hh_on' : 'hh_off'];
    $('.hh-clock').textContent = pad(Math.floor(left / 3600)) + ':' + pad(Math.floor(left / 60) % 60) + ':' + pad(left % 60);
    var days = Math.ceil((Date.UTC(2026, 11, 1, 0, 0, 0) - now) / 864e5);
    $('.cd-days').textContent = days > 0 ? days : '♥';
    $('.cd-lbl').textContent = days > 0 ? T[lang].op_days : T[lang].op_now;
  }
  setInterval(tick, 1000);

  function fmtDate(v) { var m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(v || ''); if (!m) return lang === 'id' ? '1 Des' : '1 Dec'; var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])); return d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }); }
  /* ---------- booking stub (never submits) ---------- */
  var form = $('#book'), ok = $('.book-ok');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim().slice(0, 60);
    var dv = form.elements.date.value, mn = form.elements.date.min, dbad = !!name && !!mn && (!dv || dv < mn);
    form.elements.name.classList.toggle('bad', !name);
    form.elements.date.classList.toggle('bad', dbad);
    $('span', ok).textContent = dbad ? T[lang].bad_date : name ? T[lang].ok(name, fmtDate(form.elements.date.value), form.elements.guests.value) : T[lang].need;
    ok.hidden = false;
    var h = $('.ok-heart', ok); h.classList.remove('drawn'); void h.getBoundingClientRect(); requestAnimationFrame(function () { h.classList.add('drawn'); });
    if (!name) form.elements.name.focus(); else if (dbad) form.elements.date.focus();
  });

  /* ---------- reduced motion: freeze SMIL blob morph ---------- */
  if (reduce) $$('svg').forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });

  applyLang();
  onScroll();
  requestAnimationFrame(heroGo);
})();
