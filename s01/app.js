/* s01 — Hands Up. Vanilla JS: i18n, menu tabs, parallax, marquee, reveals, checkboxes, countdown, form stub. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var M = window.BALIBU_MENU;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var T = {
    en: {
      skip: 'Skip to the menu', nav_menu: 'Menu', nav_combo: 'Combo', nav_happy: 'Happy hour', nav_find: 'Find us', nav_book: 'Join the opening',
      tagline: 'Burgers · Coffee · Ubud',
      hero_lead: 'Burgers smashed to order, Kintamani coffee and house cocktails on Jl. Sugriwa. Food, friends & a good evening.',
      cta_menu: 'See the menu', cta_find: 'Find us', cloud_hero: "Don't judge.<br>Just bite.", open_badge: 'Opening<br>1 Dec', hero_hand: 'smashed to order',
      chk_single: 'Single', chk_taken: 'Taken', chk_hungry: 'Hungryyyy', chk_thirsty: 'Thirstyyyy',
      story_kick: 'Jl. Sugriwa 60 · Ubud', story_h: 'FOOD, FRIENDS<br>&amp; A GOOD<br>EVENING.',
      story_p: 'Balibu is a burger bar and coffee spot in the middle of Ubud. Beef smashed to order on a hot griddle, brioche from our own oven, Kintamani arabica roasted on the island, and cocktails that get louder after five. Come hungry. Leave happy.',
      fact1: 'Smashed to order', fact2: 'Kintamani coffee', fact3: 'Open 08–23 daily', story_cap: 'the table you want to be at',
      menu_h: 'THE MENU', menu_sub: 'pick a section. point. bite.',
      footnote: 'Prices in thousands of rupiah (K). Subject to 15% tax & service.',
      combo_kick: 'Every day · dine in or take away', combo_h: 'SMASH<br>COMBO', combo_fries: 'Hand-cut fries', combo_tea: 'Iced lemon tea',
      combo_all: 'All three for', combo_save: 'save 40K', combo_cta: 'Ask on WhatsApp', burst: 'combo deal',
      happy_kick: 'Happy hour · 17:00 – 19:00', happy_h: 'TWO<br>FOR ONE', happy_p: 'Two for one on house cocktails, every day 17:00 – 19:00.',
      happy_hand: 'any box works. two drinks, one price.', hh_on: 'On now — pours until 19:00', hh_next: 'Next round in {h} h {m} min',
      gal_h: 'GOOD FOOD,<br>GOOD MOOD.', g1: 'extra crunchy', g2: 'after five', g3: 'iced, always', g4: "mango o'clock", g5: 'late bite',
      g6: 'shaken, not rushed', g7: 'kopi tubruk, the local way', g8: 'grill on', g9: 'ten minutes from green', g10: 'first shot',
      open_kick: 'Opening night', open_h1: 'WE OPEN', open_h2: '1 DEC', open_p: 'First 100 guests get a free Es Kopi Susu Aren.',
      cd_d: 'days', cd_h: 'hours', cd_m: 'min', cd_open: "We're open — come say hi!",
      form_h: 'Get on the opening list', form_sub: "We'll save you a seat and a free kopi.", f_name: 'Your name', f_contact: 'WhatsApp or email', f_guests: 'Guests',
      f_err: 'Add your name and a way to reach you.', f_btn: 'Count me in', f_ok: "You're on the list, {name}! See you on 1 December.",
      find_h: 'FIND US', hours_l: 'Hours', hours: 'Daily 08:00 – 23:00', hh_l: 'Happy hour', brunch_l: 'Weekend brunch', brunch: 'Sat & Sun until noon · 95K',
      wa: 'WhatsApp us', directions: 'Get directions →', map_pin: "we're here!",
      mq: ['Smashed to order', 'Single', 'Taken', 'Hungry', 'Kintamani coffee', 'Happy hour 17–19', 'Open 1 Dec', 'Good food, good mood']
    },
    id: {
      skip: 'Langsung ke menu', nav_menu: 'Menu', nav_combo: 'Kombo', nav_happy: 'Happy hour', nav_find: 'Lokasi', nav_book: 'Ikut pembukaan',
      tagline: 'Burger · Kopi · Ubud',
      hero_lead: 'Burger smash fresh, kopi Kintamani dan koktail rumah di Jl. Sugriwa. Makanan enak, teman baik, malam yang asyik.',
      cta_menu: 'Lihat menu', cta_find: 'Cari kami', cloud_hero: 'Jangan menilai.<br>Gigit saja.', open_badge: 'Buka<br>1 Des', hero_hand: 'di-smash saat dipesan',
      chk_single: 'Jomblo', chk_taken: 'Taken', chk_hungry: 'Laparrrr', chk_thirsty: 'Hausss',
      story_kick: 'Jl. Sugriwa 60 · Ubud', story_h: 'MAKAN ENAK,<br>TEMAN BAIK,<br>MALAM ASYIK.',
      story_p: 'Balibu adalah bar burger dan tempat ngopi di tengah Ubud. Daging di-smash saat dipesan di atas griddle panas, brioche dari oven sendiri, arabika Kintamani yang disangrai di Bali, dan koktail yang makin seru setelah jam lima. Datang lapar. Pulang senang.',
      fact1: 'Di-smash saat dipesan', fact2: 'Kopi Kintamani', fact3: 'Buka 08–23 setiap hari', story_cap: 'meja yang paling seru',
      menu_h: 'MENU KAMI', menu_sub: 'pilih bagian. tunjuk. gigit.',
      footnote: 'Harga dalam ribuan rupiah (K), belum termasuk pajak & layanan 15%.',
      combo_kick: 'Setiap hari · makan di sini atau bawa pulang', combo_h: 'SMASH<br>COMBO', combo_fries: 'Kentang goreng', combo_tea: 'Es teh lemon',
      combo_all: 'Ketiganya cuma', combo_save: 'hemat 40K', combo_cta: 'Tanya via WhatsApp', burst: 'paket kombo',
      happy_kick: 'Happy hour · 17.00 – 19.00', happy_h: 'BELI 1<br>GRATIS 1', happy_p: 'Beli satu gratis satu koktail rumah, setiap hari 17.00 – 19.00.',
      happy_hand: 'centang yang mana saja. dua minuman, satu harga.', hh_on: 'Sedang berlangsung — sampai 19.00', hh_next: 'Ronde berikutnya {h} j {m} mnt lagi',
      gal_h: 'MAKANAN ENAK,<br>SUASANA ASYIK.', g1: 'ekstra renyah', g2: 'setelah jam lima', g3: 'selalu dingin', g4: 'waktunya mangga', g5: 'camilan malam',
      g6: 'dikocok, tanpa buru-buru', g7: 'kopi tubruk, cara lokal', g8: 'panggangan menyala', g9: 'sepuluh menit ke sawah', g10: 'shot pertama',
      open_kick: 'Malam pembukaan', open_h1: 'KAMI BUKA', open_h2: '1 DES', open_p: '100 tamu pertama dapat Es Kopi Susu Aren gratis.',
      cd_d: 'hari', cd_h: 'jam', cd_m: 'menit', cd_open: 'Kami sudah buka — mampir yuk!',
      form_h: 'Masuk daftar pembukaan', form_sub: 'Kami siapkan kursi dan kopi gratis untukmu.', f_name: 'Nama kamu', f_contact: 'WhatsApp atau email', f_guests: 'Jumlah tamu',
      f_err: 'Isi nama dan kontak kamu ya.', f_btn: 'Ikut!', f_ok: 'Kamu sudah terdaftar, {name}! Sampai jumpa 1 Desember.',
      find_h: 'TEMUKAN KAMI', hours_l: 'Jam buka', hours: 'Setiap hari 08.00 – 23.00', hh_l: 'Happy hour', brunch_l: 'Brunch akhir pekan', brunch: 'Sabtu & Minggu sampai jam 12 · 95K',
      wa: 'Chat WhatsApp', directions: 'Petunjuk arah →', map_pin: 'kami di sini!',
      mq: ['Di-smash saat dipesan', 'Jomblo', 'Taken', 'Lapar', 'Kopi Kintamani', 'Happy hour 17–19', 'Buka 1 Des', 'Makanan enak, suasana asyik']
    }
  };
  var NOTES_ID = {
    burgers: 'Daging di-smash saat dipesan, brioche dari oven kami.', bites: 'Untuk berbagi. Atau tidak.',
    plates: 'Klasik Ubud dan beberapa dari perjalanan.', coffee: 'Arabika Kintamani, disangrai di Bali.',
    cocktails: 'Happy hour 17.00–19.00: beli satu gratis satu koktail rumah.'
  };
  var NOTES_EXTRA = {
    en: { sweet: 'Save room. Trust us.', fresh: 'Cold, bright, no shortcuts.', beer: 'Cold ones, local and not.' },
    id: { sweet: 'Sisakan tempat. Percayalah.', fresh: 'Dingin, segar, tanpa jalan pintas.', beer: 'Yang dingin, lokal dan impor.' }
  };
  var TAGS_ID = { 'signature': 'andalan', 'local twist': 'sentuhan lokal', 'veg': 'vegetarian', 'big': 'besar', 'local': 'lokal', 'classic': 'klasik', 'brunch': 'brunch', 'favourite': 'favorit' };

  var lang = 'en';
  try { lang = localStorage.getItem('balibu-lang') === 'id' ? 'id' : 'en'; } catch (e) { /* storage blocked */ }
  var activeSec = M && M.sections.length ? M.sections[0].id : '';

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function t(k) { return (T[lang] && T[lang][k]) || T.en[k] || ''; }

  function applyText() {
    doc.lang = lang;
    $$('[data-i18n]').forEach(function (el) { var v = t(el.getAttribute('data-i18n')); if (v) el.textContent = v; });
    $$('[data-i18n-html]').forEach(function (el) { var v = t(el.getAttribute('data-i18n-html')); if (v) el.innerHTML = v; });
  }

  /* ---------- menu tabs ---------- */
  var tabsEl = $('#tabs'), panelsEl = $('#panels');
  function renderMenu() {
    if (!M || !tabsEl) return;
    var tabs = '', panels = '';
    M.sections.forEach(function (s) {
      var sel = s.id === activeSec;
      var title = lang === 'id' ? s.title_id : s.title_en;
      tabs += '<button class="tab" role="tab" type="button" id="tab-' + s.id + '" aria-controls="p-' + s.id + '" aria-selected="' + sel + '" tabindex="' + (sel ? 0 : -1) + '">' +
        '<svg aria-hidden="true"><use href="#t-' + s.id + '"/></svg><span>' + esc(title) + '</span><sup>' + s.items.length + '</sup></button>';
      var note = lang === 'id' ? (NOTES_ID[s.id] || NOTES_EXTRA.id[s.id] || '') : (s.note_en || NOTES_EXTRA.en[s.id] || '');
      var cards = s.items.map(function (it, i) {
        var tag = it.tag ? '<span class="tag">' + esc(lang === 'id' ? (TAGS_ID[it.tag] || it.tag) : it.tag) + '</span>' : '';
        return '<article class="card" style="--i:' + i + '"><div class="card-ph"><img src="../shared/img/t/' + esc(it.photo) + '.jpg" alt="' + esc(it.name) + '" loading="lazy" decoding="async"></div>' +
          '<p class="price">' + it.price + 'K</p><h3>' + esc(it.name) + '</h3>' + tag +
          '<p class="ing">' + esc(lang === 'id' ? it.ingredients_id : it.ingredients_en) + '</p></article>';
      }).join('');
      panels += '<div class="panel' + (sel ? ' show' : '') + '" role="tabpanel" id="p-' + s.id + '" aria-labelledby="tab-' + s.id + '"' + (sel ? '' : ' hidden') + ' tabindex="0">' +
        (note ? '<p class="panel-note">' + esc(note) + '</p>' : '') + cards + '</div>';
    });
    tabsEl.innerHTML = tabs; panelsEl.innerHTML = panels;
  }
  function selectTab(id, focus) {
    if (id === activeSec) return;
    activeSec = id;
    $$('.tab', tabsEl).forEach(function (b) {
      var on = b.id === 'tab-' + id;
      b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
      if (on && b.scrollIntoView && window.innerWidth < 861) b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: RM ? 'auto' : 'smooth' });
    });
    $$('.panel', panelsEl).forEach(function (p) {
      var on = p.id === 'p-' + id;
      p.classList.remove('show'); p.hidden = !on;
      if (on) { void p.offsetWidth; p.classList.add('show'); }
    });
  }
  if (tabsEl) {
    tabsEl.addEventListener('click', function (e) { var b = e.target.closest('.tab'); if (b) selectTab(b.id.slice(4)); });
    tabsEl.addEventListener('keydown', function (e) {
      var list = $$('.tab', tabsEl), i = list.indexOf(document.activeElement); if (i < 0) return;
      var n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: list.length - 1 }[e.key];
      if (n === undefined) return; e.preventDefault();
      n = (n + list.length) % list.length; selectTab(list[n].id.slice(4), true);
    });
  }

  /* ---------- marquee ---------- */
  var icons = ['i-spark', 'i-box', 'i-box', 'i-check', 'i-arrow', 'i-squig', 'i-spark', 'i-check'];
  function renderMarquee() {
    var el = $('#marq'); if (!el) return;
    var group = t('mq').map(function (w, i) {
      return '<span class="marq-item">' + esc(w) + '<svg><use href="#' + icons[i % icons.length] + '"/></svg></span>';
    }).join('');
    el.innerHTML = group + group;
  }

  /* ---------- starburst ---------- */
  (function () {
    var poly = $('#burstPoly'); if (!poly) return;
    var pts = [], n = 22;
    for (var i = 0; i < n * 2; i++) {
      var r = i % 2 ? 82 : 104, a = Math.PI * i / n - Math.PI / 2;
      pts.push((r * Math.cos(a)).toFixed(1) + ',' + (r * Math.sin(a)).toFixed(1));
    }
    poly.setAttribute('points', pts.join(' '));
  })();

  /* ---------- header, burger ---------- */
  var hdr = $('#hdr'), burger = $('#burger'), nav = $('#nav');
  function setNav(open) {
    nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-open', open);
    $('.hdr-logo img').src = '../shared/logo/wordmark-' + (open ? 'dark' : 'cream') + '.png';
  }
  burger.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a') || e.target === nav) setNav(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); burger.focus(); } });

  /* ---------- scroll: header, parallax, gallery drift ---------- */
  var heroArt = $('#heroArt'), heroH = $('.hero-h'), rows = $$('.gal-row'), gal = $('.gal');
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    hdr.classList.toggle('sc', y > 40);
    if (!RM) {
      if (y < window.innerHeight * 1.3) {
        heroArt.style.transform = 'translate3d(0,' + (y * 0.2).toFixed(1) + 'px,0) rotate(' + (y * 0.008).toFixed(2) + 'deg)';
        heroH.style.translate = '0 ' + (y * -0.12).toFixed(1) + 'px';
      }
      if (gal && window.innerWidth > 860) {
        var r = gal.getBoundingClientRect(), vh = window.innerHeight;
        if (r.bottom > 0 && r.top < vh) {
          var p = (vh - r.top) / (vh + r.height) - 0.5;
          rows.forEach(function (row) { row.style.transform = 'translate3d(' + (p * 320 * Number(row.getAttribute('data-speed'))).toFixed(1) + 'px,0,0)'; });
        }
      }
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* ---------- reveals + checkbox draw-on ---------- */
  var hhBtns = $$('#hhChecks button');
  function autoCheck() {
    hhBtns.forEach(function (b, i) {
      if (b.getAttribute('data-auto')) setTimeout(function () { b.setAttribute('aria-pressed', 'true'); }, RM ? 0 : 500 + i * 250);
    });
  }
  hhBtns.forEach(function (b) { b.addEventListener('click', function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); }); });
  var rvEls = $$('.rv');
  rvEls.forEach(function (el) {
    var sib = $$(':scope > .rv', el.parentNode); var i = sib.indexOf(el);
    if (i > 0) el.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    rvEls.forEach(function (el) { io.observe(el); });
    var hc = $('#hhChecks');
    if (hc) {
      var io2 = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { autoCheck(); io2.disconnect(); } }, { threshold: 0.6 });
      io2.observe(hc);
    }
  } else { rvEls.forEach(function (el) { el.classList.add('in'); }); autoCheck(); }

  /* ---------- Makassar time (UTC+8) ---------- */
  function bali() { var d = new Date(); return new Date(d.getTime() + (d.getTimezoneOffset() + 480) * 60000); }
  var hhEl = $('#hhStatus');
  function happyStatus() {
    if (!hhEl) return;
    var n = bali(), mins = n.getHours() * 60 + n.getMinutes();
    if (mins >= 1020 && mins < 1140) { hhEl.textContent = t('hh_on'); hhEl.classList.add('on'); return; }
    hhEl.classList.remove('on');
    var left = (1020 - mins + 1440) % 1440;
    hhEl.textContent = t('hh_next').replace('{h}', Math.floor(left / 60)).replace('{m}', left % 60);
  }
  var OPEN = Date.UTC(2026, 10, 30, 16, 0, 0); /* 1 Dec 2026 00:00 Asia/Makassar */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function countdown() {
    var c = $('#count'); if (!c) return;
    var ms = OPEN - Date.now();
    if (ms <= 0) { c.innerHTML = '<p class="open-p">' + esc(t('cd_open')) + '</p>'; return; }
    var m = Math.floor(ms / 60000);
    $('#cd-d').textContent = pad(Math.floor(m / 1440));
    $('#cd-h').textContent = pad(Math.floor(m % 1440 / 60));
    $('#cd-m').textContent = pad(m % 60);
  }

  /* ---------- form stub (never submits) ---------- */
  var form = $('#form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim(), contact = form.elements.contact.value.trim();
    var err = $('#formErr'), ok = $('#formOk');
    if (!name || contact.length < 5) { err.hidden = false; ok.hidden = true; (name ? form.elements.contact : form.elements.name).focus(); return; }
    err.hidden = true;
    $('#formOkT').textContent = t('f_ok').replace('{name}', name.slice(0, 40));
    ok.hidden = false;
    ok.querySelector('path').style.animation = 'none'; void ok.offsetWidth; ok.querySelector('path').style.animation = '';
    form.reset();
  });

  /* ---------- language ---------- */
  function setLang(l) {
    lang = l;
    try { localStorage.setItem('balibu-lang', l); } catch (e) { /* ignore */ }
    applyText(); renderMenu(); renderMarquee(); happyStatus(); countdown();
    var okT = $('#formOkT'); if (okT && !$('#formOk').hidden) $('#formOk').hidden = true;
  }
  $('#lang').addEventListener('click', function () { setLang(lang === 'en' ? 'id' : 'en'); });

  setLang(lang);
  onScroll();
  setInterval(function () { happyStatus(); countdown(); }, 20000);
})();
