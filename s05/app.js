/* Balibu · s05 Comic Pop — vanilla JS, no dependencies */
(function () {
  'use strict';
  var M = window.BALIBU_MENU || { sections: [], brand: {} };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- strings ---------- */
  var T = {
    en: {
      skip: 'Skip to the menu', p_cover: 'Cover', p_story: 'Origin', p_menu: 'The menu', p_combo: 'Smash combo', p_promo: 'Happy hour', p_gallery: 'Meanwhile', p_visit: 'Find us', p_book: 'Book',
      n_menu: 'Menu', n_combo: 'Combo', n_promo: 'Promo', n_gallery: 'Gallery', n_find: 'Find us', n_book: 'Book',
      issue: 'Issue #01 · Ubud · Dec 2026', h1a: 'Burgers,', h1b: 'Coffee,', h1c: 'Ubud!',
      lead: 'Beef smashed to order, Kintamani coffee and house cocktails in the heart of Ubud.',
      cta_menu: 'See the menu', cta_find: 'Find us', hours: 'Daily 08:00 – 23:00', holy: 'Holy smash!', open_bub: 'Opening\n1 Dec!',
      ch1: 'Chapter 1 — Origin story', st_a: 'Ubud, Bali. Rice fields, scooters… and one big craving.', st_h: 'We smash. You smile.',
      st_p1: 'Balibu is a bar & resto on Jl. Sugriwa: beef patties smashed to order on a hot plate, brioche from our own oven, Kintamani arabica roasted here in Bali, and cocktails with Balinese arak.',
      st_p2: 'Come for breakfast at eight, stay for happy hour at five. Good food, good mood.',
      s_items: 'things on the menu', s_hours: 'hours a day', s_sections: 'menu chapters', st_bub: 'Kintamani beans, roasted in Bali!',
      menu_h: 'Menu!', menu_cap: 'Issue #01 · Food & drinks · All day', menu_note: 'Every dish, every drink, one strip. Tap a chapter to jump in.',
      f_all: 'All', f_food: 'Food', f_drinks: 'Drinks',
      footnote: M.brand.footnote_en || 'Prices in thousands of rupiah (K). Subject to 15% tax & service.',
      combo_tab: 'Combo deal', combo_bub: 'Combo time!', c_fries: 'Hand-cut fries', c_tea: 'Iced lemon tea', combo_line: 'Every day. Dine in or take away.',
      hh_cap: 'Every day · 17:00 – 19:00', hh_h: 'Happy hour!', hh_line: 'Two for one on house cocktails, every day 17:00 – 19:00.',
      hh_on: 'On now! Ends in', hh_off: 'Starts in',
      op_cap: 'Grand opening', op_h: 'We open 1 Dec!', op_days: 'days to go', op_now: 'we are open!', op_line: 'First 100 guests get a free Es Kopi Susu Aren.',
      br_h: 'Weekend brunch 95K', br_line: 'Pancakes and flat white, until noon on Sat & Sun.',
      meanwhile: 'Meanwhile, at Balibu…', g1: 'Friends. Burgers. Loud laughs.', g2: 'Later that evening… shake, shake!', g3: 'Midnight craving? We close at 23:00.',
      here: "We're here!", find_h: 'Find us!', addr_l: 'Address', hours_l: 'Hours', phone_l: 'WhatsApp', wa: 'WhatsApp us', route: 'Route',
      book_cap: 'Reservations', book_h: 'Save me a seat!', book_p: "Tell us when you're coming. Opening week fills up fast.",
      f_name: 'Your name', f_date: 'Date', f_guests: 'Guests', f_go: 'Book it!',
      ok: function (n, d, g) { return 'Pow! Got it, ' + n + ' — ' + g + ' on ' + d + '. This is a preview: send it to us on WhatsApp to lock it in.'; },
      need: 'Add your name first!', tbc: 'To be continued…'
    },
    id: {
      skip: 'Langsung ke menu', p_cover: 'Sampul', p_story: 'Asal-usul', p_menu: 'Menu', p_combo: 'Smash combo', p_promo: 'Happy hour', p_gallery: 'Sementara itu', p_visit: 'Lokasi', p_book: 'Reservasi',
      n_menu: 'Menu', n_combo: 'Kombo', n_promo: 'Promo', n_gallery: 'Galeri', n_find: 'Lokasi', n_book: 'Pesan',
      issue: 'Edisi #01 · Ubud · Des 2026', h1a: 'Burger,', h1b: 'Kopi,', h1c: 'Ubud!',
      lead: 'Daging sapi di-smash saat dipesan, kopi Kintamani dan koktail rumah di jantung Ubud.',
      cta_menu: 'Lihat menu', cta_find: 'Lokasi kami', hours: 'Setiap hari 08.00 – 23.00', holy: 'Smash banget!', open_bub: 'Buka\n1 Des!',
      ch1: 'Bab 1 — Kisah awal', st_a: 'Ubud, Bali. Sawah, motor… dan satu rasa lapar besar.', st_h: 'Kami smash. Kamu senyum.',
      st_p1: 'Balibu adalah bar & resto di Jl. Sugriwa: patty sapi di-smash saat dipesan, brioche dari oven sendiri, arabika Kintamani yang disangrai di Bali, dan koktail dengan arak Bali.',
      st_p2: 'Sarapan jam delapan, lanjut happy hour jam lima. Makanan enak, suasana asyik.',
      s_items: 'menu pilihan', s_hours: 'jam sehari', s_sections: 'bab menu', st_bub: 'Biji Kintamani, disangrai di Bali!',
      menu_h: 'Menu!', menu_cap: 'Edisi #01 · Makanan & minuman · Sepanjang hari', menu_note: 'Semua hidangan dan minuman dalam satu strip. Ketuk bab untuk melompat.',
      f_all: 'Semua', f_food: 'Makanan', f_drinks: 'Minuman',
      footnote: M.brand.footnote_id || 'Harga dalam ribuan rupiah (K), belum termasuk pajak & layanan 15%.',
      combo_tab: 'Paket kombo', combo_bub: 'Waktunya kombo!', c_fries: 'Kentang goreng', c_tea: 'Es teh lemon', combo_line: 'Setiap hari. Makan di sini atau bawa pulang.',
      hh_cap: 'Setiap hari · 17.00 – 19.00', hh_h: 'Happy hour!', hh_line: 'Beli satu gratis satu koktail rumah, setiap hari 17.00 – 19.00.',
      hh_on: 'Sedang berlangsung! Berakhir', hh_off: 'Mulai dalam',
      op_cap: 'Pembukaan', op_h: 'Buka 1 Des!', op_days: 'hari lagi', op_now: 'kami sudah buka!', op_line: '100 tamu pertama dapat Es Kopi Susu Aren gratis.',
      br_h: 'Brunch akhir pekan 95K', br_line: 'Pancake dan flat white, sampai jam 12 hari Sabtu & Minggu.',
      meanwhile: 'Sementara itu, di Balibu…', g1: 'Teman. Burger. Tawa lepas.', g2: 'Malam harinya… kocok, kocok!', g3: 'Lapar tengah malam? Kami tutup jam 23.00.',
      here: 'Kami di sini!', find_h: 'Temukan kami!', addr_l: 'Alamat', hours_l: 'Jam buka', phone_l: 'WhatsApp', wa: 'Chat WhatsApp', route: 'Rute',
      book_cap: 'Reservasi', book_h: 'Simpan kursiku!', book_p: 'Kabari kapan kamu datang. Minggu pembukaan cepat penuh.',
      f_name: 'Nama kamu', f_date: 'Tanggal', f_guests: 'Tamu', f_go: 'Pesan!',
      ok: function (n, d, g) { return 'Pow! Siap, ' + n + ' — ' + g + ' orang, ' + d + '. Ini pratinjau: kirim ke WhatsApp kami untuk konfirmasi.'; },
      need: 'Isi nama dulu ya!', tbc: 'Bersambung…'
    }
  };
  var SEC = {
    burgers: { n_id: 'Patty sapi di-smash saat dipesan, brioche dari oven kami.', sfx: ['Smashed to order!', 'Di-smash saat dipesan!'] },
    bites: { n_id: 'Untuk berbagi. Atau tidak.', sfx: ['Crunch time!', 'Waktunya kriuk!'] },
    plates: { n_id: 'Klasik Ubud dan beberapa favorit dari jalanan.', sfx: ['Ubud classics!', 'Klasik Ubud!'] },
    sweet: { n_en: 'Something sweet to finish.', n_id: 'Penutup yang manis.', sfx: ['Save room!', 'Sisakan tempat!'] },
    coffee: { n_id: 'Arabika Kintamani, disangrai di Bali.', sfx: ['Wake up, Ubud!', 'Bangun, Ubud!'] },
    fresh: { n_en: 'Cold, fresh, straight to the table.', n_id: 'Dingin, segar, langsung ke meja.', sfx: ['Brrr… so fresh!', 'Brrr… segar!'] },
    cocktails: { n_id: 'Happy hour 17.00 – 19.00: beli satu gratis satu koktail rumah.', sfx: ['Shaken, not boring!', 'Dikocok, tak membosankan!'] },
    beer: { n_en: 'Ice cold, Ubud style.', n_id: 'Dingin, gaya Ubud.', sfx: ['Cheers, Ubud!', 'Bersulang, Ubud!'] }
  };
  var TAG_ID = { signature: 'andalan', 'local twist': 'rasa lokal', veg: 'vegetarian', big: 'jumbo', local: 'lokal', classic: 'klasik', brunch: 'brunch', favourite: 'favorit' };
  var FOOD = { burgers: 1, bites: 1, plates: 1, sweet: 1 };
  var lang = 'en';
  try { lang = localStorage.getItem('balibu-lang') === 'id' ? 'id' : 'en'; } catch (e) {}

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- menu strip ---------- */
  var strip = $('#strip');
  var rots = [-0.8, 0.7, 0.5, -0.6, -0.4, 0.9, 0.6, -0.7];
  function renderMenu() {
    var html = '', chips = '';
    M.sections.forEach(function (s, i) {
      var ex = SEC[s.id] || { sfx: ['', ''] };
      var title = lang === 'id' ? s.title_id : s.title_en;
      var note = lang === 'id' ? (ex.n_id || '') : (s.note_en || ex.n_en || '');
      html += '<article class="panel mp pop" id="m-' + s.id + '" data-kind="' + (FOOD[s.id] ? 'food' : 'drinks') + '" style="--r:' + rots[i % rots.length] + 'deg" aria-labelledby="t-' + s.id + '">' +
        '<h3 class="tab" id="t-' + s.id + '">' + esc(title) + '<em>' + s.items.length + '</em></h3>' +
        (note ? '<p class="mp-note">' + esc(note) + '</p>' : '') + '<ul class="items">';
      s.items.forEach(function (it) {
        var tag = it.tag ? (lang === 'id' ? (TAG_ID[it.tag] || it.tag) : it.tag) : '';
        html += '<li class="it' + (it.tag === 'signature' ? ' sig' : '') + '" tabindex="0">' +
          '<img src="../shared/img/t/' + it.photo + '.jpg" alt="' + esc(it.name) + '" loading="lazy" decoding="async" width="68" height="68">' +
          '<div><h4 class="it-n"><span>' + esc(it.name) + '</span>' + (tag ? '<span class="tag">' + esc(tag) + '</span>' : '') + '</h4>' +
          '<p>' + esc(lang === 'id' ? it.ingredients_id : it.ingredients_en) + '</p></div>' +
          '<span class="pb" aria-label="' + it.price + ' thousand rupiah"><svg aria-hidden="true"><use href="#pburst"/></svg><b>' + it.price + 'K</b></span></li>';
      });
      html += '</ul><div class="mp-sfx" aria-hidden="true"><span class="bubble' + (i % 2 ? ' bubble-y' : '') + '">' + esc(ex.sfx[lang === 'id' ? 1 : 0]) + '</span></div></article>';
      chips += '<button type="button" class="chip chip-sec" data-jump="m-' + s.id + '">' + esc(title) + '</button>';
    });
    strip.innerHTML = html;
    $('.chips-sec').innerHTML = chips;
    applyFilter(curFilter, true);
    $$('.mp').forEach(function (el) { observe(el); });
  }

  /* ---------- filter + jump ---------- */
  var curFilter = 'all';
  function applyFilter(f, silent) {
    curFilter = f;
    $$('.chip[data-f]').forEach(function (c) { var on = c.getAttribute('data-f') === f; c.classList.toggle('on', on); c.setAttribute('aria-pressed', on); });
    $$('.mp').forEach(function (p) {
      var hide = f !== 'all' && p.getAttribute('data-kind') !== f;
      p.classList.toggle('hide', hide);
      if (!hide && !silent) { p.classList.remove('in'); void p.offsetWidth; requestAnimationFrame(function () { p.classList.add('in'); }); }
    });
    $$('.chip-sec').forEach(function (c) {
      var p = document.getElementById(c.getAttribute('data-jump'));
      c.hidden = !!(p && p.classList.contains('hide'));
    });
  }
  $('.chips').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-f')) { applyFilter(b.getAttribute('data-f')); return; }
    var p = document.getElementById(b.getAttribute('data-jump'));
    if (p) {
      p.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      p.classList.remove('flash'); void p.offsetWidth; p.classList.add('flash');
    }
  });

  /* ---------- i18n ---------- */
  function applyLang() {
    var d = T[lang];
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (el) { var v = d[el.getAttribute('data-i18n')]; if (typeof v === 'string') el.textContent = v; });
    var h1 = $('.hero-h1'); if (h1) h1.setAttribute('aria-label', d.h1a + ' ' + d.h1b + ' ' + d.h1c);
    var b = $('.btn-lang'); b.innerHTML = '<span' + (lang === 'en' ? ' class="on"' : '') + '>EN</span>/<span' + (lang === 'id' ? ' class="on"' : '') + '>ID</span>';
    renderMenu(); setCaption(curPage, true); tickClocks();
  }
  $('.btn-lang').addEventListener('click', function () {
    lang = lang === 'en' ? 'id' : 'en';
    try { localStorage.setItem('balibu-lang', lang); } catch (e) {}
    applyLang();
  });

  /* ---------- speed lines ---------- */
  function rnd(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
  $$('svg.speed').forEach(function (svg, k) {
    var n = +svg.getAttribute('data-rays') || 40, r = rnd(17 + k * 31), out = '<g>';
    for (var i = 0; i < n; i++) {
      var a = (i / n) * Math.PI * 2 + r() * 0.06, r1 = 20 + r() * 12, r2 = 90;
      out += '<line x1="' + (Math.cos(a) * r1).toFixed(2) + '" y1="' + (Math.sin(a) * r1).toFixed(2) + '" x2="' + (Math.cos(a) * r2).toFixed(2) + '" y2="' + (Math.sin(a) * r2).toFixed(2) + '" stroke-width="' + (1.6 + r() * 2.2).toFixed(2) + '"/>';
    }
    svg.innerHTML = out + '</g>';
  });

  /* ---------- pop-in on scroll ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); if (e.target.classList.contains('story-b')) countUp(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  function observe(el) { if (io) io.observe(el); else el.classList.add('in'); }
  $$('.pop').forEach(observe);

  /* ---------- counters ---------- */
  function countUp(root) {
    $$('.count', root).forEach(function (el) {
      var to = +el.getAttribute('data-to'); if (reduce) { el.textContent = to; return; }
      var t0 = null;
      function step(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }
      el.textContent = '0'; requestAnimationFrame(step);
    });
  }
  var total = 0; M.sections.forEach(function (s) { total += s.items.length; });
  var c0 = $('.count[data-to="37"]'); if (c0) { c0.setAttribute('data-to', total); c0.textContent = total; }
  var c2 = $('.count[data-to="8"]'); if (c2) { c2.setAttribute('data-to', M.sections.length); c2.textContent = M.sections.length; }

  /* ---------- halftone parallax ---------- */
  var ht = $$('.ht'), ticking = false;
  function para() {
    ticking = false; var y = window.scrollY;
    if (ht[0]) ht[0].style.transform = 'translate3d(0,' + (-(y * 0.08) % 26) + 'px,0)';
    if (ht[1]) ht[1].style.transform = 'translate3d(0,' + (-(y * 0.22) % 400) + 'px,0)';
    if (ht[2]) ht[2].style.transform = 'translate3d(0,' + (-(y * 0.35) % 600) + 'px,0)';
  }
  if (!reduce) window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(para); } }, { passive: true });

  /* ---------- sticky caption nav ---------- */
  var curPage = $('#cover'), navCap = $('.nav-cap');
  function setCaption(sec, force) {
    if (!sec || (!force && sec === curPage)) return;
    curPage = sec;
    $('.nav-page').textContent = 'P.' + sec.getAttribute('data-page');
    $('.nav-title').textContent = T[lang][sec.getAttribute('data-title')];
    if (!force && !reduce) { navCap.classList.remove('flip'); void navCap.offsetWidth; navCap.classList.add('flip'); }
    var id = sec.id;
    $$('.nav-links a').forEach(function (a) { a.classList.toggle('cur', a.getAttribute('href') === '#' + id || (id === 'promos' && a.getAttribute('href') === '#promos')); });
  }
  var pages = $$('[data-page]');
  if ('IntersectionObserver' in window) {
    var pio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) setCaption(e.target); }); }, { rootMargin: '-45% 0px -50% 0px' });
    pages.forEach(function (p) { pio.observe(p); });
  }

  /* ---------- burger ---------- */
  var burger = $('.burger'), links = $('#navlinks');
  function closeNav() { links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); }
  burger.addEventListener('click', function () {
    var open = !links.classList.contains('open');
    links.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  links.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });

  /* ---------- clocks (Bali time, UTC+8) ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function hms(s) { return pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60); }
  function tickClocks() {
    var now = Date.now(), d = new Date(now + 8 * 3600e3);
    var s = d.getUTCHours() * 3600 + d.getUTCMinutes() * 60 + d.getUTCSeconds();
    var on = s >= 17 * 3600 && s < 19 * 3600;
    var left = on ? 19 * 3600 - s : (17 * 3600 - s + 86400) % 86400;
    $('.hh-state').textContent = T[lang][on ? 'hh_on' : 'hh_off'];
    $('.hh-clock').textContent = hms(left);
    $('.hh-status').classList.toggle('live', on);
    var days = Math.ceil((Date.UTC(2026, 11, 1, 0, 0, 0) - now) / 864e5);
    var cd = $('.cd-days');
    if (days > 0) { cd.textContent = days; $('.countdown span').textContent = T[lang].op_days; }
    else { cd.textContent = '!'; $('.countdown span').textContent = T[lang].op_now; }
  }
  setInterval(tickClocks, 1000);

  /* ---------- lightbox ---------- */
  var lb = $('.lightbox');
  $$('.gal').forEach(function (g) {
    g.addEventListener('click', function () {
      var img = $('img', lb); img.src = g.getAttribute('data-full'); img.alt = $('img', g).alt;
      $('figcaption', lb).textContent = T[lang][g.getAttribute('data-cap')];
      if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
    });
  });
  $('.lb-close').addEventListener('click', function () { lb.close ? lb.close() : lb.removeAttribute('open'); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });

  function fmtDate(v) { var m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(v || ''); if (!m) return lang === 'id' ? '1 Des' : '1 Dec'; var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])); return d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }); }
  /* ---------- booking stub (never submits) ---------- */
  var form = $('.book-panel'), ok = $('.book-ok');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim().slice(0, 60);
    form.elements.name.classList.toggle('bad', !name);
    ok.hidden = false;
    var msg = name ? T[lang].ok(name, fmtDate(form.elements.date.value), form.elements.guests.value) : T[lang].need;
    $('span', ok).textContent = msg;
    ok.style.animation = 'none'; void ok.offsetWidth; ok.style.animation = '';
    if (!name) form.elements.name.focus();
  });

  /* ---------- go ---------- */
  applyLang();
  requestAnimationFrame(function () { $('.hero').classList.add('go'); });
})();
