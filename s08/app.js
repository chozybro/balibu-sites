/* s08 — Lowercase. Vanilla JS, no dependencies. */
(function () {
  'use strict';
  var M = window.BALIBU_MENU;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lang = 'en';
  try { lang = localStorage.getItem('balibu-lang') === 'id' ? 'id' : 'en'; } catch (e) {}

  var ID = {
    'nav.menu': 'menu', 'nav.promo': 'promo', 'nav.find': 'lokasi',
    'hero.h': 'burger, kopi<br>&amp; malam yang asyik.', 'hero.cta': 'lihat menu', 'hero.cta2': 'lokasi kami', 'hours': 'setiap hari 08.00 – 23.00',
    'coffee.lbl': 'ubud · sejak 2026', 'coffee.h': 'selamat pagi,<br>ubud',
    'coffee.p': 'Arabika Kintamani, disangrai di Bali. Daging sapi di-smash saat dipesan, brioche dari oven kami, koktail saat matahari terbenam. Tempat kecil di Jl. Sugriwa untuk makanan enak, teman baik dan malam yang asyik.',
    'open.h': 'buka 1 desember', 'open.p': '100 tamu pertama dapat es kopi susu aren gratis.',
    'menu.lbl': 'menu · 8 bagian', 'menu.h': 'di-smash saat dipesan,<br>brioche dari oven kami',
    'menu.p': 'Semua hidangan, semua harga. Arahkan kursor atau ketuk baris untuk membacanya dalam bahasa Inggris.', 'menu.hint': 'terus gulir',
    'footnote': 'Harga dalam ribuan rupiah (K), belum termasuk pajak &amp; layanan 15%.',
    'brunch.lbl': 'sabtu &amp; minggu · sampai jam 12', 'brunch.h': 'brunch akhir pekan,<br>95k',
    'brunch.p': 'Pancake lembut dengan pisang, karamel gula aren dan kelapa sangrai, plus flat white dua shot. Pagi yang santai, itu intinya.',
    'brunch.together': 'paket, sampai 12.00',
    'happy.lbl': 'setiap hari · 17.00 – 19.00', 'happy.h': 'happy hour,<br>beli satu gratis satu',
    'happy.p': 'Beli satu gratis satu koktail rumah: Balibu Spritz, Arak Mojito, Passion Margarita.',
    'combo.lbl': 'paket hemat · sepanjang hari', 'combo.p': 'Balibu Smash, kentang goreng dan es teh lemon. 165K di menu, 125K sebagai paket.',
    'combo.cta': 'pesan via whatsapp', 'combo.fries': 'kentang goreng', 'combo.tea': 'es teh lemon',
    'find.lbl': 'lokasi', 'find.d1': 'setiap hari', 'find.d3': 'brunch akhir pekan', 'find.d3v': 'sab – min, sampai 12.00', 'find.d4': 'pembukaan', 'find.d4v': '1 desember 2026',
    'news.lbl': 'daftar pembukaan', 'news.h': 'jadilah yang pertama<br>masuk', 'news.label': 'alamat email', 'news.send': 'daftar →'
  };
  var T = {
    en: { word: { burgers: 'burgers', bites: 'bites', plates: 'plates', sweet: 'sweet', coffee: 'coffee', fresh: 'fresh', cocktails: 'cocktails', beer: 'beer' },
      sub: { sweet: 'something to finish with.', fresh: 'cold, bright, local fruit.', beer: 'cold ones for the sunset.' }, alt: 'id',
      tags: {}, days: function (n) { return n === 1 ? '1 day to go' : n + ' days to go'; }, today: 'we are open',
      hhOn: 'happy hour is on now', hhIn: function (h, m) { return 'happy hour in ' + (h ? h + ' h ' : '') + m + ' min'; }, hhTom: 'next happy hour tomorrow at 17:00',
      ok: 'thank you. you are on the list — nothing was sent yet, this is a preview.', bad: 'please check the email address.' },
    id: { word: { burgers: 'burger', bites: 'camilan', plates: 'hidangan', sweet: 'manis', coffee: 'kopi', fresh: 'segar', cocktails: 'koktail', beer: 'bir' },
      sub: { burgers: 'Daging sapi di-smash saat dipesan, brioche dari oven kami.', bites: 'Untuk berbagi. Atau tidak.', plates: 'Klasik Ubud dan beberapa dari jalanan.', sweet: 'penutup yang manis.', coffee: 'Arabika Kintamani, disangrai di Bali.', fresh: 'dingin, segar, buah lokal.', cocktails: 'Happy hour 17.00 – 19.00: beli satu gratis satu koktail rumah.', beer: 'yang dingin untuk senja.' }, alt: 'en',
      tags: { signature: 'andalan', 'local twist': 'sentuhan lokal', veg: 'vegetarian', big: 'besar', local: 'lokal', classic: 'klasik', brunch: 'brunch', favourite: 'favorit' },
      days: function (n) { return 'tinggal ' + n + ' hari'; }, today: 'kami sudah buka',
      hhOn: 'happy hour sedang berlangsung', hhIn: function (h, m) { return 'happy hour dalam ' + (h ? h + ' j ' : '') + m + ' mnt'; }, hhTom: 'happy hour berikutnya besok jam 17.00',
      ok: 'terima kasih. anda sudah terdaftar — belum ada yang terkirim, ini hanya pratinjau.', bad: 'mohon periksa alamat email.' }
  };
  var EN = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (!(k in EN)) EN[k] = el.innerHTML; });
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------- menu ---------- */
  var track = document.getElementById('track'), intro = track.querySelector('.panel--intro');
  function renderMenu() {
    var L = T[lang];
    track.querySelectorAll('.panel--sec').forEach(function (p) { p.remove(); });
    var html = M.sections.map(function (s, i) {
      var sub = lang === 'id' ? (L.sub[s.id] || '') : (s.note_en || L.sub[s.id] || '');
      return '<div class="panel panel--sec" id="p-' + s.id + '"><div class="sec">' +
        '<p class="sec__word" aria-hidden="true">' + esc(L.word[s.id]) + '</p>' +
        '<h3 class="sec__h">' + esc((lang === 'id' ? s.title_id : s.title_en).toLowerCase()) + '</h3>' +
        '<p class="sec__sub">' + esc(sub) + '</p><ul class="items">' +
        s.items.map(function (it) {
          var main = lang === 'id' ? it.ingredients_id : it.ingredients_en, alt = lang === 'id' ? it.ingredients_en : it.ingredients_id;
          var tag = it.tag ? '<span class="it__tag">' + esc(L.tags[it.tag] || it.tag) + '</span>' : '';
          return '<li class="it" tabindex="0"><img class="it__img" src="../shared/img/t/' + esc(it.photo) + '.jpg" alt="' + esc(it.name) + '" width="56" height="56" loading="lazy" decoding="async">' +
            '<div><p class="it__name">' + esc(it.name) + tag + '</p><p class="it__ing">' + esc(main) + '</p>' +
            '<p class="it__alt" lang="' + L.alt + '"><span><b>' + L.alt + '</b>' + esc(alt) + '</span></p></div>' +
            '<span class="it__price">' + it.price + 'K</span></li>';
        }).join('') + '</ul></div></div>';
    }).join('');
    intro.insertAdjacentHTML('afterend', html);
    document.getElementById('idx').innerHTML = M.sections.map(function (s, i) {
      return '<li><button type="button" data-p="' + s.id + '">' + esc(L.word[s.id]) + '</button></li>';
    }).join('');
    layout();
  }
  track.addEventListener('click', function (e) { var it = e.target.closest('.it'); if (it && !window.matchMedia('(hover:hover)').matches) it.classList.toggle('open'); });
  track.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('it')) { e.preventDefault(); e.target.classList.toggle('open'); } });

  /* ---------- pinned horizontal scroll ---------- */
  var hs = document.getElementById('menu'), pin = hs.querySelector('.hs__pin'), bar = document.getElementById('bar');
  var pinned = false, dist = 0;
  function wantPin() { return !RM && window.innerWidth > 900 && window.innerHeight >= 640; }
  function layout() {
    pinned = wantPin();
    document.documentElement.classList.toggle('pin', pinned);
    if (pinned) {
      dist = Math.max(0, track.scrollWidth - window.innerWidth);
      hs.style.height = (window.innerHeight + dist) + 'px';
    } else { hs.style.height = ''; track.style.transform = ''; }
    tick();
  }
  function progress() { var r = hs.getBoundingClientRect(); return dist ? Math.min(1, Math.max(0, -r.top / dist)) : 0; }
  document.getElementById('idx').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var p = document.getElementById('p-' + b.dataset.p);
    if (!pinned) { p.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); return; }
    var x = Math.min(dist, p.offsetLeft - window.innerWidth * 0.08);
    window.scrollTo({ top: hs.offsetTop + Math.max(0, x), behavior: 'smooth' });
  });

  /* ---------- scroll loop: pin, drift words, index state ---------- */
  var drifts = Array.prototype.slice.call(document.querySelectorAll('.drift')), ticking = false;
  function tick() {
    ticking = false;
    var vh = window.innerHeight;
    if (pinned) {
      var pr = progress();
      track.style.transform = 'translate3d(' + (-pr * dist) + 'px,0,0)';
      bar.style.transform = 'scaleX(' + pr + ')';
      var x = pr * dist + window.innerWidth * 0.5, cur = null;
      track.querySelectorAll('.panel--sec').forEach(function (p) { if (p.offsetLeft <= x) cur = p.id.slice(2); });
      document.querySelectorAll('#idx button').forEach(function (b) { b.classList.toggle('on', b.dataset.p === cur); });
    }
    if (!RM) drifts.forEach(function (el) {
      var r = el.parentNode.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      el.style.transform = 'translate3d(' + ((r.top - vh / 2) * +el.dataset.drift) + 'px,0,0)';
    });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }
  window.addEventListener('scroll', req, { passive: true });
  var rz; window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(layout, 120); });

  /* ---------- reveals ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }) : null;
  document.querySelectorAll('.rv,.hair').forEach(function (el) { if (io) io.observe(el); else el.classList.add('in'); });

  /* ---------- counter ---------- */
  var cio = io ? new IntersectionObserver(function (es) { es.forEach(function (en) {
    if (!en.isIntersecting) return; cio.unobserve(en.target);
    var el = en.target, to = +el.dataset.to; if (RM) return;
    var t0 = null; (function step(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1600); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(performance.now());
  }); }, { threshold: 0.6 }) : null;
  document.querySelectorAll('.count').forEach(function (c) { if (cio) cio.observe(c); });

  /* ---------- Bali time: countdown + happy hour clock ---------- */
  function bali() { var d = new Date(); return new Date(d.getTime() + (d.getTimezoneOffset() + 480) * 60000); }
  function clocks() {
    var L = T[lang], n = bali();
    var days = Math.ceil((new Date(2026, 11, 1) - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / 864e5);
    document.getElementById('countdown').textContent = days > 0 ? L.days(days) : L.today;
    var mins = n.getHours() * 60 + n.getMinutes(), c = document.getElementById('clock'), txt;
    if (mins >= 1020 && mins < 1140) txt = L.hhOn; else if (mins < 1020) txt = L.hhIn(Math.floor((1020 - mins) / 60), (1020 - mins) % 60); else txt = L.hhTom;
    c.classList.toggle('live', mins >= 1020 && mins < 1140);
    c.innerHTML = '<i></i><span>' + esc(txt) + '</span>';
  }
  setInterval(clocks, 30000);

  /* ---------- language ---------- */
  function applyLang(l) {
    lang = l; document.documentElement.lang = l;
    try { localStorage.setItem('balibu-lang', l); } catch (e) {}
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lang === l); });
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n'), v = l === 'id' && ID[k] != null ? ID[k] : EN[k];
      if (v != null) el.innerHTML = v;
    });
    renderMenu(); clocks();
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { if (b.dataset.lang !== lang) { var y = window.scrollY; applyLang(b.dataset.lang); window.scrollTo(0, y); } }); });

  /* ---------- newsletter stub ---------- */
  var nf = document.getElementById('newsForm');
  nf.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = nf.elements.namedItem('email').value.trim(), msg = document.getElementById('newsMsg');
    if (!/^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/.test(v) || v.length > 120) { msg.textContent = T[lang].bad; return; }
    msg.textContent = T[lang].ok; nf.querySelector('button').disabled = true; nf.elements.namedItem('email').disabled = true;
  });

  /* ---------- boot ---------- */
  applyLang(lang);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  window.addEventListener('load', layout);
  requestAnimationFrame(function () { document.body.classList.add('ready'); });
})();
