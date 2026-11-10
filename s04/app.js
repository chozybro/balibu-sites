/* s04 — Type Pop. Vanilla JS: i18n, menu tabs, word-wallpaper marquees, ring stickers, block reveals, nav swap. */
(function () {
  'use strict';
  var D = document, root = D.documentElement;
  root.classList.add('js');
  var M = window.BALIBU_MENU;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = 'en';
  try { if (localStorage.getItem('balibu-lang') === 'id') lang = 'id'; } catch (e) {}

  var promo = {}; M.promos.forEach(function (p) { promo[p.id] = p; });

  var T = {
    en: {
      skip: 'Skip to the menu', nav_menu: 'Menu', nav_promo: 'Promo', nav_happy: 'Happy hour', nav_mood: 'Story', nav_find: 'Find us',
      h1a: 'Burgers', h1b: 'Coffee', h1c: 'Ubud',
      lead: 'Food, friends &amp; a good evening. Smashed burgers, Kintamani coffee and house cocktails on Jl. Sugriwa.',
      cta_menu: 'See the menu', cta_wa: 'Book on WhatsApp', hero_burst_a: 'Opens',
      addr_line: 'Jl. Sugriwa No. 60, Padangtegal Kelod, Ubud · Daily 08:00 – 23:00',
      menu_kicker: 'The menu · 8 sections · 37 things we love', menu_h: 'Pick a section',
      footnote: M.brand.footnote_en,
      combo_kicker: 'Signature · every day', combo_line: promo.combo.line_en, combo_cta: 'Order the combo',
      open_free: 'Free', open_first: 'first 100', open_kicker: 'Opening day', open_h: 'We open 1 December', open_line: promo.opening.line_en,
      c_d: 'days', c_h: 'hrs', c_m: 'min', c_s: 'sec',
      brunch_h: 'Weekend Brunch', brunch_line: 'Pancakes and flat white, 95K until noon. Sat &amp; Sun.',
      hh_kicker: 'Happy hour · every day', hh_for: 'for', hh_line: promo.happy.line_en, hh_cta: 'See the cocktails',
      story_kicker: 'Our story', story_h: 'Good food, good mood.',
      story_p1: 'Balibu is a burger bar and coffee spot in the middle of Ubud. Beef smashed to order, brioche from our own oven, Kintamani arabica roasted in Bali — and house cocktails when the sun goes down.',
      story_p2: 'Come for breakfast, stay for the evening. Bring friends, or make some here.',
      f_hours: 'hours open, every day', f_items: 'dishes &amp; drinks', f_kopi: 'free kopi on 1 Dec',
      find_kicker: 'Hours &amp; location', find_h: 'Find us', map_open: 'Open in Google Maps', hours: 'Daily 08:00 – 23:00',
      book_h: 'Save a table', book_p: 'Tell us when you are coming and we will keep a table warm.',
      f_name: 'Name', f_date: 'Date', f_guests: 'Guests', f_phone: 'WhatsApp number', book_btn: 'Hold my table',
      err_name: 'Please tell us your name.', err_date: 'Pick a date from 1 December.', err_phone: 'Add a WhatsApp number so we can reach you.',
      ok_h: 'Thanks, {n}!', ok_p: 'Table for {g} on {d} — noted. Online booking opens soon; until then, message us on WhatsApp and we will hold it.',
      live_on: 'Happy hour is on — until 19:00', live_in: 'Next happy hour in {h}h {m}m', live_pre: ' · from 1 Dec',
      open_now: 'We are open — come by!',
      ticker: ['Smashed to order', 'Kintamani coffee', 'House cocktails', 'Happy hour 17–19', 'Opening 1 December', 'Good food, good mood'],
      tabs_label: 'Menu sections', burger_open: 'Open menu', burger_close: 'Close menu',
      walls: { hero: 'Burgers', promo: 'Smash', happy: 'Happy hour', mood: 'Good mood', find: 'Ubud' }
    },
    id: {
      skip: 'Langsung ke menu', nav_menu: 'Menu', nav_promo: 'Promo', nav_happy: 'Happy hour', nav_mood: 'Cerita', nav_find: 'Lokasi',
      h1a: 'Burger', h1b: 'Kopi', h1c: 'Ubud',
      lead: 'Makanan enak, teman baik, malam yang asyik. Burger smash, kopi Kintamani dan koktail rumah di Jl. Sugriwa.',
      cta_menu: 'Lihat menu', cta_wa: 'Pesan via WhatsApp', hero_burst_a: 'Buka',
      addr_line: 'Jl. Sugriwa No. 60, Padangtegal Kelod, Ubud · Setiap hari 08.00 – 23.00',
      menu_kicker: 'Menu · 8 bagian · 37 favorit kami', menu_h: 'Pilih bagian',
      footnote: M.brand.footnote_id,
      combo_kicker: 'Andalan · setiap hari', combo_line: promo.combo.line_id, combo_cta: 'Pesan combo',
      open_free: 'Gratis', open_first: '100 pertama', open_kicker: 'Hari pembukaan', open_h: 'Buka 1 Desember', open_line: promo.opening.line_id,
      c_d: 'hari', c_h: 'jam', c_m: 'menit', c_s: 'detik',
      brunch_h: 'Brunch Akhir Pekan', brunch_line: 'Pancake dan flat white, 95K sampai jam 12. Sabtu &amp; Minggu.',
      hh_kicker: 'Happy hour · setiap hari', hh_for: 'untuk', hh_line: promo.happy.line_id, hh_cta: 'Lihat koktail',
      story_kicker: 'Cerita kami', story_h: 'Makan enak, hati senang.',
      story_p1: 'Balibu adalah bar burger dan tempat ngopi di tengah Ubud. Daging sapi di-smash saat dipesan, brioche dari oven kami sendiri, arabika Kintamani yang disangrai di Bali — dan koktail rumah saat matahari terbenam.',
      story_p2: 'Datang untuk sarapan, tinggal sampai malam. Ajak teman, atau temukan teman baru di sini.',
      f_hours: 'jam buka, setiap hari', f_items: 'makanan &amp; minuman', f_kopi: 'kopi gratis 1 Des',
      find_kicker: 'Jam &amp; lokasi', find_h: 'Temukan kami', map_open: 'Buka di Google Maps', hours: 'Setiap hari 08.00 – 23.00',
      book_h: 'Pesan meja', book_p: 'Kabari kami kapan Anda datang, kami siapkan mejanya.',
      f_name: 'Nama', f_date: 'Tanggal', f_guests: 'Tamu', f_phone: 'Nomor WhatsApp', book_btn: 'Pesan meja saya',
      err_name: 'Mohon isi nama Anda.', err_date: 'Pilih tanggal mulai 1 Desember.', err_phone: 'Tambahkan nomor WhatsApp agar kami bisa menghubungi Anda.',
      ok_h: 'Terima kasih, {n}!', ok_p: 'Meja untuk {g} orang pada {d} — dicatat. Pemesanan online segera dibuka; sementara itu, kirim pesan WhatsApp dan kami simpan mejanya.',
      live_on: 'Happy hour sedang berlangsung — sampai 19.00', live_in: 'Happy hour berikutnya dalam {h} j {m} m', live_pre: ' · mulai 1 Des',
      open_now: 'Kami sudah buka — mampir yuk!',
      ticker: ['Di-smash saat dipesan', 'Kopi Kintamani', 'Koktail rumah', 'Happy hour 17–19', 'Buka 1 Desember', 'Makan enak, hati senang'],
      tabs_label: 'Bagian menu', burger_open: 'Buka menu', burger_close: 'Tutup menu',
      walls: { hero: 'Burger', promo: 'Smash', happy: 'Happy hour', mood: 'Good mood', find: 'Ubud' }
    }
  };
  var TAGS = { id: { signature: 'andalan', 'local twist': 'rasa lokal', veg: 'vegetarian', big: 'besar', local: 'lokal', classic: 'klasik', brunch: 'brunch', favourite: 'favorit' } };
  var RINGS = {
    hero: { bg: 'red', fg: 'cream', big: 'MENU', en: 'See the menu · opens 1 Dec · Ubud · ', id: 'Lihat menu · buka 1 Des · Ubud · ' },
    combo: { bg: 'red', fg: 'cream', big: '125K', en: 'Smash combo · fries · iced lemon tea · ', id: 'Smash combo · kentang · es teh lemon · ' },
    brunch: { bg: 'yellow', fg: 'dark', big: '95K', en: 'Weekend brunch · Sat & Sun · ', id: 'Brunch · Sabtu & Minggu · ' },
    happy: { bg: 'yellow', fg: 'dark', big: '17–19', en: 'Two for one · house cocktails · ', id: 'Beli 1 gratis 1 · koktail rumah · ' },
    book: { bg: 'yellow', fg: 'dark', big: 'HI!', en: 'Save a table · see you soon · ', id: 'Pesan meja · sampai jumpa · ' }
  };
  var SEC_RING = {
    burgers: { en: 'Smashed to order · brioche bun · ', id: 'Di-smash saat dipesan · roti brioche · ' },
    bites: { en: 'Made for sharing · or not · ', id: 'Untuk berbagi · atau tidak · ' },
    plates: { en: 'Ubud classics · bowls · plates · ', id: 'Klasik Ubud · bowl · hidangan · ' },
    sweet: { en: 'Save room · something sweet · ', id: 'Sisakan tempat · yang manis · ' },
    coffee: { en: 'Kintamani arabica · roasted in Bali · ', id: 'Arabika Kintamani · sangrai Bali · ' },
    fresh: { en: 'Fresh & cold · all day long · ', id: 'Segar & dingin · sepanjang hari · ' },
    cocktails: { en: 'Happy hour 17–19 · two for one · ', id: 'Happy hour 17–19 · beli 1 gratis 1 · ' },
    beer: { en: 'Ice cold · Bintang · craft IPA · ', id: 'Dingin · Bintang · craft IPA · ' }
  };
  var FEAT = { burgers: ['b1', 'hero-smash'], bites: ['s2', 'loaded-fries'], plates: ['p1', 'nasi-goreng'], sweet: ['d3', 'pannacotta'],
    coffee: ['c2', 'flat-white'], fresh: ['f3', 'smoothie'], cocktails: ['k1', 'spritz'], beer: ['w2', 'craft-beer'] };
  var COL = { red: '#D50F04', cream: '#FFF0D2', yellow: '#FFAE2E', dark: '#232323', bright: '#FFDD8C' };

  function t(k) { var v = T[lang][k]; return v == null ? T.en[k] : v; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- starburst clip-path ---------- */
  (function () {
    var n = 20, pts = [];
    for (var i = 0; i < n * 2; i++) {
      var a = (Math.PI * i) / n - Math.PI / 2, r = i % 2 ? 41 : 50;
      pts.push((50 + r * Math.cos(a)).toFixed(2) + '% ' + (50 + r * Math.sin(a)).toFixed(2) + '%');
    }
    root.style.setProperty('--burst-path', 'polygon(' + pts.join(',') + ')');
  })();

  /* ---------- ring sticker ---------- */
  var ringN = 0;
  function ringSVG(text, big, bg, fg) {
    var id = 'rp' + (++ringN), r = 74, L = (2 * Math.PI * r - 6).toFixed(1);
    var bigSize = big.length > 4 ? 44 : big.length > 3 ? 52 : 60;
    return '<svg viewBox="0 0 200 200" aria-hidden="true" focusable="false">' +
      '<circle cx="100" cy="100" r="97" fill="' + COL[bg] + '" stroke="#232323" stroke-width="3"/>' +
      '<circle cx="100" cy="100" r="55" fill="none" stroke="' + COL[fg] + '" stroke-width="1.5" stroke-dasharray="2 5" opacity=".55"/>' +
      '<defs><path id="' + id + '" d="M100,100 m-' + r + ',0 a' + r + ',' + r + ' 0 1,1 ' + 2 * r + ',0 a' + r + ',' + r + ' 0 1,1 -' + 2 * r + ',0"/></defs>' +
      '<g class="spin"><text class="rt" fill="' + COL[fg] + '" dy="5"><textPath href="#' + id + '" textLength="' + L + '" lengthAdjust="spacing">' + esc(text.toUpperCase()) + '</textPath></text></g>' +
      '<text class="rb" x="100" y="100" text-anchor="middle" dominant-baseline="central" fill="' + COL[fg] + '" style="font-size:' + bigSize + 'px">' + esc(big) + '</text>' +
      '</svg>';
  }
  function renderRings() {
    D.querySelectorAll('[data-ring]').forEach(function (el) {
      var R = RINGS[el.getAttribute('data-ring')];
      el.innerHTML = ringSVG(R[lang], R.big, R.bg, R.fg);
    });
  }

  /* ---------- word wallpaper ---------- */
  var walls = [];
  function wallWord(sec) {
    var k = sec.getAttribute('data-wall');
    if (k === 'menu') { var s = M.sections[curSec]; return lang === 'id' ? s.title_id : s.title_en; }
    return t('walls')[k];
  }
  function buildWall(sec) {
    var w = sec.querySelector('.wall'); if (!w) return;
    var vw = window.innerWidth, h = sec.offsetHeight;
    var fs = vw < 560 ? 92 : vw < 980 ? 130 : 172;
    var word = wallWord(sec).toUpperCase();
    var rows = Math.ceil((h * 1.04) / (fs * 0.8)) + 1;
    var estW = (word.length * 0.5 + 0.25) * fs;
    var reps = Math.max(2, Math.ceil((vw * 1.2) / estW) + 1);
    var unit = ''; for (var i = 0; i < reps; i++) unit += '<span>' + esc(word) + '</span>';
    var html = '';
    for (var r = 0; r < rows; r++) {
      var speed = 22 + ((r * 37) % 5) * 9;           /* px per second, varies per row */
      var dur = ((estW * reps) / speed).toFixed(1);
      var dir = r % 2 ? 'reverse' : 'normal';
      var delay = (-((r * 7.3) % 1) * dur).toFixed(1);
      html += '<div class="wrow" style="--wfs:' + fs + 'px;--dur:' + dur + 's;--dir:' + dir + ';animation-delay:' + delay + 's">' + unit + unit + '</div>';
    }
    w.innerHTML = html;
    sec._wallKey = word + '|' + rows + '|' + vw;
  }
  function buildWalls() { walls.forEach(buildWall); }

  /* ---------- i18n ---------- */
  function applyLang() {
    root.lang = lang;
    D.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n'); if (k === 'ticker') return;
      el.innerHTML = t(k);
    });
    D.querySelectorAll('.hero__w').forEach(function (el) { el.innerHTML = '<i>' + el.innerHTML + '</i>'; });
    var tk = D.querySelector('.ticker__row'), items = t('ticker').map(function (s) { return '<span>' + esc(s) + '</span><em>★</em>'; }).join('');
    tk.innerHTML = items + items + items + items;
    D.querySelectorAll('.lang__b').forEach(function (b) { var on = b.getAttribute('data-lang') === lang; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
    D.getElementById('tabs').setAttribute('aria-label', t('tabs_label'));
    renderRings(); renderTabs(); renderMenu(false); buildWalls(); updateLive(); tick();
  }
  D.querySelectorAll('.lang__b').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang');
      try { localStorage.setItem('balibu-lang', lang); } catch (e) {}
      applyLang();
    });
  });

  /* ---------- menu ---------- */
  var curSec = 0;
  var tabsEl = D.getElementById('tabs'), listEl = D.getElementById('menuList'), featEl = D.getElementById('menuFeat');
  function renderTabs() {
    tabsEl.innerHTML = M.sections.map(function (s, i) {
      return '<button type="button" class="tab" role="tab" id="tab-' + s.id + '" aria-controls="menuPanel" aria-selected="' + (i === curSec) + '" tabindex="' + (i === curSec ? 0 : -1) + '" data-i="' + i + '">' +
        esc(lang === 'id' ? s.title_id : s.title_en) + '<small>' + s.items.length + '</small></button>';
    }).join('');
  }
  function renderMenu(animate) {
    var s = M.sections[curSec], f = FEAT[s.id];
    D.getElementById('menuPanel').setAttribute('aria-labelledby', 'tab-' + s.id);
    listEl.innerHTML = s.items.map(function (it, i) {
      var tag = it.tag ? '<span class="item__tag">' + esc(lang === 'id' && TAGS.id[it.tag] ? TAGS.id[it.tag] : it.tag) + '</span>' : '';
      return '<li class="item" style="--i:' + i + '">' +
        '<div class="item__th"><img loading="lazy" src="../shared/img/t/' + it.photo + '.jpg" alt="' + esc(it.name) + '" width="76" height="76"></div>' +
        '<div><h3 class="item__name">' + esc(it.name) + tag + '</h3><p class="item__ing">' + esc(lang === 'id' ? it.ingredients_id : it.ingredients_en) + '</p></div>' +
        '<div class="burst price" aria-label="' + it.price + 'K"><div class="burst__in">' + it.price + 'K</div></div></li>';
    }).join('');
    var fi = s.items.filter(function (x) { return x.id === f[0]; })[0];
    var prevSrc = featEl.querySelector('img') && featEl.querySelector('img').getAttribute('src');
    var src = '../shared/img/cutw/' + f[1] + '.webp';
    featEl.innerHTML = '<img class="cut feat__img jump' + (animate && prevSrc !== src ? ' swap' : '') + '" src="' + src + '" alt="' + esc(fi.name) + '" width="800" height="800">' +
      '<div class="ring ring--feat" role="img" aria-label="' + esc(fi.name) + ' ' + fi.price + 'K">' + ringSVG(SEC_RING[s.id][lang], fi.price + 'K', 'cream', 'red') + '</div>' +
      '<p class="feat__cap">' + esc(fi.name) + '</p>';
    var items = listEl.querySelectorAll('.item');
    if (RM || !animate) { items.forEach(function (el) { el.classList.add('in'); }); }
    else { requestAnimationFrame(function () { requestAnimationFrame(function () { items.forEach(function (el) { el.classList.add('in'); }); }); }); }
  }
  function selectSec(i, focus) {
    if (i === curSec) return;
    curSec = i;
    tabsEl.querySelectorAll('.tab').forEach(function (b, j) { b.setAttribute('aria-selected', j === i); b.tabIndex = j === i ? 0 : -1; });
    var b = tabsEl.children[i];
    if (focus) b.focus();
    if (b.scrollIntoView && tabsEl.scrollWidth > tabsEl.clientWidth) tabsEl.scrollTo({ left: b.offsetLeft - 18, behavior: RM ? 'auto' : 'smooth' });
    renderMenu(true);
    buildWall(D.getElementById('menu'));
  }
  tabsEl.addEventListener('click', function (e) { var b = e.target.closest('.tab'); if (b) selectSec(+b.getAttribute('data-i')); });
  tabsEl.addEventListener('keydown', function (e) {
    var n = M.sections.length, k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowLeft' || k === 'Home' || k === 'End') {
      e.preventDefault();
      var i = k === 'Home' ? 0 : k === 'End' ? n - 1 : (curSec + (k === 'ArrowRight' ? 1 : -1) + n) % n;
      selectSec(i, true);
    }
  });
  D.getElementById('toCocktails').addEventListener('click', function () {
    var i = M.sections.map(function (s) { return s.id; }).indexOf('cocktails');
    selectSec(i);
    D.getElementById('menu').scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
  });

  /* ---------- happy hour live (Bali time, UTC+8) ---------- */
  var OPEN = Date.UTC(2026, 11, 1, 0, 0, 0); /* 1 Dec 2026 08:00 Bali */
  function updateLive() {
    var now = Date.now(), b = new Date(now + 8 * 3600e3), mins = b.getUTCHours() * 60 + b.getUTCMinutes();
    var el = D.getElementById('live'), on = mins >= 17 * 60 && mins < 19 * 60, txt;
    if (on) txt = t('live_on');
    else { var d = (17 * 60 - mins + 1440) % 1440; txt = t('live_in').replace('{h}', Math.floor(d / 60)).replace('{m}', d % 60); }
    if (now < OPEN) txt += t('live_pre');
    el.classList.toggle('on', on);
    el.querySelector('span').textContent = txt;
  }
  setInterval(updateLive, 30000);

  /* ---------- opening countdown ---------- */
  var cEl = D.getElementById('count');
  function tick() {
    var d = OPEN - Date.now();
    if (d <= 0) { cEl.innerHTML = '<p><strong>' + esc(t('open_now')) + '</strong></p>'; return; }
    var s = Math.floor(d / 1000), v = { d: Math.floor(s / 86400), h: Math.floor(s / 3600) % 24, m: Math.floor(s / 60) % 60, s: s % 60 };
    cEl.querySelectorAll('[data-c]').forEach(function (x) { var k = x.getAttribute('data-c'); x.textContent = k === 'd' ? v[k] : String(v[k]).padStart(2, '0'); });
  }
  setInterval(tick, 1000);

  /* ---------- reveal pops + counters ---------- */
  function countUp(el) {
    var to = +el.getAttribute('data-to');
    if (RM) { el.textContent = to; return; }
    var t0 = performance.now();
    (function f(now) { var p = Math.min(1, (now - t0) / 1300); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      if (el.hasAttribute('data-to')) countUp(el); else el.classList.add('in');
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  D.querySelectorAll('.pop,[data-to]').forEach(function (el) { io.observe(el); });

  /* pause marquees that are off screen */
  var wio = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('is-paused', !e.isIntersecting); }); });

  /* ---------- block colour reveal + nav swap ---------- */
  var blocks = [].slice.call(D.querySelectorAll('.blk'));
  var themed = [].slice.call(D.querySelectorAll('.blk,.ticker,.foot'));
  var nav = D.getElementById('nav'), links = [].slice.call(D.querySelectorAll('.nav__links a'));
  blocks.forEach(function (b) {
    var p = b.previousElementSibling;
    var th = p ? (p.classList.contains('ticker') ? 'dark' : p.getAttribute('data-theme')) : null;
    if (th) b.style.setProperty('--prev', COL[th]);
  });
  var ticking = false, heroLock = D.querySelector('.hero__lockup');
  function onScroll() {
    ticking = false;
    var vh = window.innerHeight, y = (nav.offsetHeight || 64) / 2;
    if (!RM) blocks.forEach(function (b) {
      if (!b.style.getPropertyValue('--prev')) return;
      var r = b.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) return;
      var p = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.75)));
      b.style.setProperty('--ci', ((1 - p) * 5).toFixed(2) + '%');
      b.style.setProperty('--cr', ((1 - p) * 90).toFixed(0) + 'px');
    });
    var cur = null;
    for (var i = 0; i < themed.length; i++) { var r2 = themed[i].getBoundingClientRect(); if (r2.top <= y && r2.bottom > y) { cur = themed[i]; break; } }
    if (cur) nav.setAttribute('data-theme', cur.classList.contains('ticker') ? 'dark' : cur.getAttribute('data-theme'));
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
    nav.classList.toggle('at-top', window.scrollY < Math.max(120, heroLock.offsetTop + heroLock.offsetHeight - 40));
    var id = cur && cur.id;
    links.forEach(function (a) { a.classList.toggle('is-cur', a.getAttribute('href') === '#' + id); });
    var mc = D.querySelector('meta[name=theme-color]'); if (mc && cur) mc.setAttribute('content', COL[nav.getAttribute('data-theme')]);
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* ---------- mobile menu ---------- */
  var burger = D.getElementById('burger'), navlinks = D.getElementById('navlinks');
  function setMenu(open) {
    navlinks.classList.toggle('open', open); nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? t('burger_close') : t('burger_open'));
    D.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  links.forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  /* ---------- lightbox ---------- */
  var lb = D.getElementById('lb'), lbImg = D.getElementById('lbImg'), lbX = D.getElementById('lbX'), lastFocus = null;
  D.getElementById('gallery').addEventListener('click', function (e) {
    var b = e.target.closest('.ph'); if (!b) return;
    lastFocus = b; var im = b.querySelector('img');
    lbImg.src = b.getAttribute('data-full'); lbImg.alt = im.alt; lb.hidden = false; lbX.focus();
  });
  function closeLb() { lb.hidden = true; if (lastFocus) lastFocus.focus(); }
  lbX.addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  D.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (!lb.hidden) closeLb(); if (navlinks.classList.contains('open')) setMenu(false); }
    if (e.key === 'Tab' && !lb.hidden) { e.preventDefault(); lbX.focus(); }
  });

  /* ---------- booking stub: never submits anywhere ---------- */
  var form = D.getElementById('book'), err = D.getElementById('bookErr'), ok = D.getElementById('bookOk');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = form.name.value.trim(), d = form.date.value, ph = form.phone.value.trim(), msg = '';
    if (!n) msg = t('err_name');
    else if (!d || d < '2026-12-01') msg = t('err_date');
    else if (!/^[0-9 +()-]{7,20}$/.test(ph)) msg = t('err_phone');
    if (msg) { err.textContent = msg; err.hidden = false; ok.hidden = true; return; }
    err.hidden = true;
    var dt = new Date(d + 'T12:00:00');
    var ds = dt.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long' });
    ok.innerHTML = '<strong></strong><span></span>';
    ok.querySelector('strong').textContent = t('ok_h').replace('{n}', n.slice(0, 40));
    ok.querySelector('span').textContent = t('ok_p').replace('{g}', form.guests.value).replace('{d}', ds);
    ok.hidden = false;
  });

  /* ---------- boot ---------- */
  walls = [].slice.call(D.querySelectorAll('.blk')).filter(function (s) { return s.querySelector('.wall'); });
  applyLang();
  walls.forEach(function (s) { wio.observe(s.querySelector('.wall')); });
  var heroEl = D.querySelector('.hero');
  requestAnimationFrame(function () { requestAnimationFrame(function () { heroEl.classList.add('on'); }); });
  onScroll();
  var lastW = window.innerWidth, rT;
  window.addEventListener('resize', function () {
    clearTimeout(rT);
    rT = setTimeout(function () { if (window.innerWidth !== lastW) { lastW = window.innerWidth; buildWalls(); } onScroll(); }, 200);
  });
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function (es) {
      es.forEach(function (e) {
        var s = e.target, fs = window.innerWidth < 560 ? 92 : window.innerWidth < 980 ? 130 : 172;
        var rows = Math.ceil((s.offsetHeight * 1.04) / (fs * 0.8)) + 1;
        if (s._wallKey && s._wallKey.split('|')[1] != rows) buildWall(s);
      });
    });
    walls.forEach(function (s) { ro.observe(s); });
  }
})();
