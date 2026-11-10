/* Balibu — s02 "After Dark" */
(function () {
  'use strict';
  var M = window.BALIBU_MENU;
  var doc = document, root = doc.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };

  /* ---------- strings ---------- */
  var T = {
    en: {
      'skip': 'Skip to content',
      'nav.menu': 'Menu', 'nav.happy': 'Happy hour', 'nav.mood': 'Mood', 'nav.visit': 'Find us', 'nav.book': 'Book a table', 'nav.combo': 'Smash Combo',
      'hours.short': 'Daily 08:00 – 23:00', 'hours.long': 'Daily 08:00 – 23:00 · happy hour 17:00 – 19:00',
      'hero.eyebrow': 'Burgers · Coffee · Cocktails — Ubud', 'hero.t1': 'A good evening', 'hero.t2': 'starts here.',
      'hero.lead': 'Burgers smashed to order, Kintamani coffee and house cocktails in the heart of Ubud. Opening 1 December.',
      'hero.cta': 'See the menu', 'hero.scroll': 'Scroll',
      'open.eyebrow': 'Opening night', 'open.title': 'We open 1 December 2026.',
      'open.line': 'The first 100 guests get a free Es Kopi Susu Aren — espresso, milk and Balinese palm sugar over ice.',
      'open.ring': 'first 100 guests · free es kopi susu aren ·',
      'story.eyebrow': 'Our story', 'story.title': 'Late nights in Ubud.',
      'story.p1': 'Balibu is a bar and kitchen on Jl. Sugriwa, a few minutes from the centre of Ubud. Breakfast coffee at eight, burgers at lunch, cocktails when the sun goes down.',
      'story.p2': 'Beef patties are smashed to order on a hot plate, the brioche comes from our own oven, the coffee is Kintamani arabica roasted in Bali. Simple things, done properly.',
      'story.hand': 'good food, good mood', 'story.f1k': 'Open', 'story.f2k': 'Coffee', 'story.f2v': 'Kintamani arabica', 'story.f3k': 'Brioche', 'story.f3v': 'from our oven',
      'menu.eyebrow': 'Eat & drink', 'menu.title': 'The menu.',
      'menu.lead': 'Eight sections, one kitchen and one bar. Tap a section to jump; prices are in thousands of rupiah.',
      'footnote': M.brand.footnote_en,
      'combo.eyebrow': 'Signature', 'combo.line': 'Balibu Smash + hand-cut fries + iced lemon tea.', 'combo.fries': 'Hand-cut fries', 'combo.tea': 'Iced lemon tea', 'combo.was': 'instead of',
      'brunch.title': 'Weekend brunch', 'brunch.line': 'Pancakes and flat white, 95K until noon, Saturday and Sunday.',
      'happy.eyebrow': 'Every day', 'happy.title': 'Happy hour', 'happy.line': 'Two for one on house cocktails, every day 17:00 – 19:00.', 'happy.now': 'Now in Ubud',
      'mood.eyebrow': 'Mood', 'mood.title': 'Good food, good mood.',
      'mood.c1': 'The bar, before the rush', 'mood.c2': 'One for you, one for later', 'mood.c3': 'Smashed to order', 'mood.c4': 'Coffee from eight',
      'mood.c5': 'Ubud, all around', 'mood.c6': 'Double, if you dare', 'mood.c7': 'The hot plate', 'mood.c8': 'Long tables, long evenings',
      'book.eyebrow': 'Reservations', 'book.title': 'Save us a table.', 'book.lead': 'Tell us when you are coming and we will keep a good spot. Walk-ins are always welcome.',
      'book.name': 'Name', 'book.phone': 'WhatsApp number', 'book.date': 'Date', 'book.time': 'Time', 'book.guests': 'Guests', 'book.send': 'Request a table',
      'book.doneEyebrow': 'Noted', 'book.doneNote': 'This page is a preview, so nothing was sent yet. To book for real, message us on WhatsApp.', 'book.again': 'New request',
      'visit.eyebrow': 'Find us', 'visit.title': 'On Jl. Sugriwa.', 'visit.addr': 'Address', 'visit.hours': 'Hours', 'visit.talk': 'Talk to us', 'visit.route': 'Open in Google Maps',
      'foot.follow': 'Follow', 'foot.top': 'Back to top ↑'
    },
    id: {
      'skip': 'Langsung ke konten',
      'nav.menu': 'Menu', 'nav.happy': 'Happy hour', 'nav.mood': 'Suasana', 'nav.visit': 'Lokasi', 'nav.book': 'Pesan meja', 'nav.combo': 'Smash Combo',
      'hours.short': 'Setiap hari 08.00 – 23.00', 'hours.long': 'Setiap hari 08.00 – 23.00 · happy hour 17.00 – 19.00',
      'hero.eyebrow': 'Burger · Kopi · Koktail — Ubud', 'hero.t1': 'Malam yang asyik', 'hero.t2': 'dimulai di sini.',
      'hero.lead': 'Burger smash dibuat saat dipesan, kopi Kintamani dan koktail rumah di jantung Ubud. Buka 1 Desember.',
      'hero.cta': 'Lihat menu', 'hero.scroll': 'Gulir',
      'open.eyebrow': 'Malam pembukaan', 'open.title': 'Kami buka 1 Desember 2026.',
      'open.line': '100 tamu pertama dapat Es Kopi Susu Aren gratis — espresso, susu dan gula aren Bali dengan es.',
      'open.ring': '100 tamu pertama · es kopi susu aren gratis ·',
      'story.eyebrow': 'Cerita kami', 'story.title': 'Malam panjang di Ubud.',
      'story.p1': 'Balibu adalah bar dan dapur di Jl. Sugriwa, beberapa menit dari pusat Ubud. Kopi pagi jam delapan, burger saat makan siang, koktail ketika matahari terbenam.',
      'story.p2': 'Patty daging sapi di-smash saat dipesan di atas plat panas, brioche dari oven kami sendiri, kopinya arabika Kintamani yang disangrai di Bali. Hal sederhana, dikerjakan dengan benar.',
      'story.hand': 'makan enak, hati senang', 'story.f1k': 'Buka', 'story.f2k': 'Kopi', 'story.f2v': 'arabika Kintamani', 'story.f3k': 'Brioche', 'story.f3v': 'dari oven kami',
      'menu.eyebrow': 'Makan & minum', 'menu.title': 'Menu.',
      'menu.lead': 'Delapan bagian, satu dapur dan satu bar. Ketuk bagian untuk melompat; harga dalam ribuan rupiah.',
      'footnote': M.brand.footnote_id,
      'combo.eyebrow': 'Andalan', 'combo.line': 'Balibu Smash + kentang goreng + es teh lemon.', 'combo.fries': 'Kentang goreng', 'combo.tea': 'Es teh lemon', 'combo.was': 'bukan',
      'brunch.title': 'Brunch akhir pekan', 'brunch.line': 'Pancake dan flat white, 95K sampai jam 12, Sabtu dan Minggu.',
      'happy.eyebrow': 'Setiap hari', 'happy.title': 'Happy hour', 'happy.line': 'Beli satu gratis satu koktail rumah, setiap hari 17.00 – 19.00.', 'happy.now': 'Sekarang di Ubud',
      'mood.eyebrow': 'Suasana', 'mood.title': 'Makan enak, hati senang.',
      'mood.c1': 'Bar, sebelum ramai', 'mood.c2': 'Satu untukmu, satu untuk nanti', 'mood.c3': 'Di-smash saat dipesan', 'mood.c4': 'Kopi mulai jam delapan',
      'mood.c5': 'Ubud di sekeliling', 'mood.c6': 'Dobel, kalau berani', 'mood.c7': 'Plat panas', 'mood.c8': 'Meja panjang, malam panjang',
      'book.eyebrow': 'Reservasi', 'book.title': 'Sisakan meja untuk kami.', 'book.lead': 'Beri tahu kapan kamu datang, kami siapkan tempat yang enak. Tanpa reservasi juga selalu boleh.',
      'book.name': 'Nama', 'book.phone': 'Nomor WhatsApp', 'book.date': 'Tanggal', 'book.time': 'Jam', 'book.guests': 'Jumlah tamu', 'book.send': 'Minta meja',
      'book.doneEyebrow': 'Tercatat', 'book.doneNote': 'Halaman ini masih pratinjau, jadi belum ada yang terkirim. Untuk reservasi sungguhan, kirim pesan WhatsApp.', 'book.again': 'Permintaan baru',
      'visit.eyebrow': 'Lokasi', 'visit.title': 'Di Jl. Sugriwa.', 'visit.addr': 'Alamat', 'visit.hours': 'Jam buka', 'visit.talk': 'Hubungi kami', 'visit.route': 'Buka di Google Maps',
      'foot.follow': 'Ikuti', 'foot.top': 'Kembali ke atas ↑'
    }
  };
  var NOTE_ID = {
    burgers: 'Patty daging sapi di-smash saat dipesan, brioche dari oven kami.',
    bites: 'Untuk berbagi. Atau tidak.',
    plates: 'Klasik Ubud dan beberapa dari perjalanan.',
    coffee: 'Arabika Kintamani, disangrai di Bali.',
    cocktails: 'Happy hour 17.00 – 19.00: beli satu gratis satu koktail rumah.'
  };
  var TAGS = {
    en: { signature: 'signature', 'local twist': 'local twist', veg: 'veg', big: 'big', local: 'local', classic: 'classic', brunch: 'brunch', favourite: 'favourite' },
    id: { signature: 'andalan', 'local twist': 'sentuhan lokal', veg: 'vegetarian', big: 'porsi besar', local: 'lokal', classic: 'klasik', brunch: 'brunch', favourite: 'favorit' }
  };
  var MSG = {
    en: { soon: 'Happy hour starts in ', on: 'Happy hour is on — ends in ', next: 'Next happy hour in ', h: ' h ', m: ' min',
      daysLeft: function (n) { return '<b>' + n + (n === 1 ? ' day' : ' days') + '</b> to go. See you there.'; }, open: '<b>We are open.</b> Come by.',
      errName: 'Please tell us your name.', errPhone: 'Please add a WhatsApp number we can reach.', errDate: 'Please pick a date from 1 December 2026.', errTime: 'Please pick a time.',
      done: function (n, g, d, t) { return 'Thank you, ' + n + '. A table for ' + g + ' on ' + d + ' at ' + t + '.'; }, guests: function (n) { return n === 1 ? '1 guest' : n + ' guests'; }, items: function (n) { return n + ' items'; } },
    id: { soon: 'Happy hour mulai dalam ', on: 'Happy hour sedang berlangsung — selesai dalam ', next: 'Happy hour berikutnya dalam ', h: ' j ', m: ' mnt',
      daysLeft: function (n) { return '<b>' + n + ' hari</b> lagi. Sampai jumpa.'; }, open: '<b>Kami sudah buka.</b> Mampir, ya.',
      errName: 'Tulis nama kamu, ya.', errPhone: 'Tambahkan nomor WhatsApp yang bisa dihubungi.', errDate: 'Pilih tanggal mulai 1 Desember 2026.', errTime: 'Pilih jam.',
      done: function (n, g, d, t) { return 'Terima kasih, ' + n + '. Meja untuk ' + g + ' pada ' + d + ' jam ' + t + '.'; }, guests: function (n) { return n + ' orang'; }, items: function (n) { return n + ' menu'; } }
  };
  var lang = 'en';
  try { var saved = localStorage.getItem('balibu-lang'); if (saved === 'id' || saved === 'en') lang = saved; } catch (e) { /* storage blocked */ }

  /* ---------- menu render ---------- */
  var body = $('#menuBody'), index = $('#menuIndex');
  function el(tag, cls, text) { var n = doc.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function renderMenu() {
    body.textContent = ''; index.textContent = '';
    M.sections.forEach(function (sec, si) {
      var s = el('section', 'msec'); s.id = 'm-' + sec.id; s.setAttribute('aria-labelledby', 'mh-' + sec.id);
      var head = el('div', 'msec__head'); var h = el('h3', null, lang === 'id' ? sec.title_id : sec.title_en); h.id = 'mh-' + sec.id;
      head.appendChild(h); head.appendChild(el('span')); s.appendChild(head);
      var note = lang === 'id' ? NOTE_ID[sec.id] : sec.note_en;
      if (note) s.appendChild(el('p', 'msec__note', note));
      var ul = el('ul', 'items');
      sec.items.forEach(function (it, ii) {
        var li = el('li', 'item rv'); li.style.setProperty('--d', (ii % 2) * 0.08 + Math.floor(ii / 2) * 0.06 + 's');
        li.dataset.photo = it.photo;
        var img = el('img', 'item__ph'); img.src = '../shared/img/t/' + it.photo + '.jpg'; img.alt = it.name; img.width = 64; img.height = 64; img.loading = 'lazy'; img.decoding = 'async';
        var txt = el('div', 'item__txt'); var nm = el('h4', 'item__name', it.name);
        if (it.tag) nm.appendChild(el('span', 'tag', TAGS[lang][it.tag] || it.tag));
        txt.appendChild(nm); txt.appendChild(el('p', 'item__ing', lang === 'id' ? it.ingredients_id : it.ingredients_en));
        li.appendChild(img); li.appendChild(txt); li.appendChild(el('span', 'item__price', it.price + 'K'));
        ul.appendChild(li);
      });
      s.appendChild(ul); body.appendChild(s);
      var a = el('a'); a.href = '#m-' + sec.id;
      a.appendChild(el('small', null, ('0' + (si + 1)).slice(-2)));
      a.appendChild(doc.createTextNode(lang === 'id' ? sec.title_id : sec.title_en));
      a.appendChild(el('em', null, String(sec.items.length)));
      var li2 = el('li'); li2.appendChild(a); index.appendChild(li2);
    });
    var drinks = $('#drinks'); drinks.textContent = '';
    M.sections.filter(function (s) { return s.id === 'cocktails'; })[0].items.forEach(function (it, i) {
      var li = el('li', 'drink rv'); li.style.setProperty('--d', i * 0.07 + 's');
      var img = el('img'); img.src = '../shared/img/t/' + it.photo + '.jpg'; img.alt = it.name; img.width = 150; img.height = 150; img.loading = 'lazy';
      li.appendChild(img); li.appendChild(el('h3', null, it.name)); li.appendChild(el('p', null, it.price + 'K'));
      drinks.appendChild(li);
    });
  }

  /* ---------- language ---------- */
  function applyLang(l) {
    lang = l; root.lang = l;
    $$('[data-i18n]').forEach(function (n) { var v = T[l][n.getAttribute('data-i18n')]; if (v != null) n.textContent = v; });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    renderMenu(); fillGuests(); observeAll(); tick(); countdown(); bindPeek();
    try { localStorage.setItem('balibu-lang', l); } catch (e) { /* storage blocked */ }
  }
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { if (b.dataset.lang !== lang) applyLang(b.dataset.lang); }); });

  /* ---------- reveals ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  function observeAll() {
    $$('.rv:not(.in), .hair:not(.in), .msec:not(.in)').forEach(function (n) { if (io) io.observe(n); else n.classList.add('in'); });
    if (io) watchSections();
  }

  /* active section in index */
  var secIO;
  function watchSections() {
    if (secIO) secIO.disconnect();
    secIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        $$('#menuIndex a').forEach(function (a) {
          var on = a.getAttribute('href') === '#' + e.target.id; a.classList.toggle('is-active', on);
          if (on) { a.setAttribute('aria-current', 'true'); var ol = index; if (ol.scrollWidth > ol.clientWidth) ol.scrollTo({ left: a.parentNode.offsetLeft - 16, behavior: reduced ? 'auto' : 'smooth' }); }
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    $$('.msec').forEach(function (s) { secIO.observe(s); });
  }

  /* ---------- header + drawer ---------- */
  var hdr = $('#hdr'), burger = $('.burger'), drawer = $('#drawer');
  function setDrawer(open) {
    burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) { drawer.hidden = false; requestAnimationFrame(function () { drawer.classList.add('is-open'); }); doc.body.style.overflow = 'hidden'; hdr.classList.add('is-scrolled'); }
    else { drawer.classList.remove('is-open'); doc.body.style.overflow = ''; setTimeout(function () { if (burger.getAttribute('aria-expanded') === 'false') drawer.hidden = true; }, 400); onScroll(); }
  }
  burger.addEventListener('click', function () { setDrawer(burger.getAttribute('aria-expanded') !== 'true'); });
  $$('#drawer a').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setDrawer(false); burger.focus(); } });

  /* ---------- scroll: header state + parallax ---------- */
  var parEls = $$('[data-par]'), ticking = false;
  function onScroll() {
    if (burger.getAttribute('aria-expanded') !== 'true') hdr.classList.toggle('is-scrolled', window.scrollY > 40);
    if (reduced) return;
    var vh = window.innerHeight;
    parEls.forEach(function (n) {
      var r = n.parentNode.getBoundingClientRect(); if (r.bottom < -100 || r.top > vh + 100) return;
      var lim = r.height * 0.075, off = Math.max(-lim, Math.min(lim, (r.top + r.height / 2 - vh / 2) * parseFloat(n.dataset.par)));
      n.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* ---------- cursor-follow preview in the menu ---------- */
  var peek = $('#peek'), peekImg = peek.querySelector('img'), px = 0, py = 0, raf = 0;
  function bindPeek() {
    if (!finePointer || reduced) return;
    $$('.item').forEach(function (it) {
      it.addEventListener('mouseenter', function () { peekImg.src = '../shared/img/t/' + it.dataset.photo + '.jpg'; peek.classList.add('on'); });
      it.addEventListener('mouseleave', function () { peek.classList.remove('on'); });
    });
  }
  if (finePointer && !reduced) {
    body.addEventListener('mousemove', function (e) {
      px = e.clientX + 170; py = e.clientY;
      if (px > window.innerWidth - 130) px = e.clientX - 170;
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; peek.style.transform = 'translate(' + (px - 120) + 'px,' + (py - 120) + 'px) scale(' + (peek.classList.contains('on') ? 1 : .6) + ')'; });
    });
  }

  /* ---------- Ubud clock (Asia/Makassar, UTC+8, no DST) ---------- */
  function ubud() { var d = new Date(Date.now() + 8 * 3600e3); return { h: d.getUTCHours(), m: d.getUTCMinutes(), s: d.getUTCSeconds() }; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dur(mins) { var h = Math.floor(mins / 60), m = Math.ceil(mins % 60); if (m === 60) { h++; m = 0; } return (h ? h + MSG[lang].h : '') + m + MSG[lang].m; }
  var clockTime = $('#clockTime'), clockStatus = $('#clockStatus'), clockFill = $('#clockFill');
  function tick() {
    var u = ubud(), now = u.h * 60 + u.m + u.s / 60, S = 17 * 60, E = 19 * 60, msg, prog;
    clockTime.innerHTML = pad(u.h) + ':' + pad(u.m) + '<span>:' + pad(u.s) + '</span>';
    if (now < S) { msg = MSG[lang].soon + '<b>' + dur(S - now) + '</b>'; prog = (now + 24 * 60 - E) / (22 * 60); }
    else if (now < E) { msg = MSG[lang].on + '<b>' + dur(E - now) + '</b>'; prog = (now - S) / 120; }
    else { msg = MSG[lang].next + '<b>' + dur(24 * 60 - now + S) + '</b>'; prog = (now - E) / (22 * 60); }
    clockStatus.innerHTML = msg; clockFill.style.width = (Math.min(1, prog) * 100).toFixed(2) + '%';
  }
  function countdown() {
    var openAt = Date.UTC(2026, 10, 30, 16, 0, 0); /* 1 Dec 2026 00:00 in Ubud */
    var days = Math.ceil((openAt - Date.now()) / 864e5);
    $('#countdown').innerHTML = days > 0 ? MSG[lang].daysLeft(days) : MSG[lang].open;
  }
  setInterval(tick, 1000);

  /* ---------- gallery strip: drag, arrows, progress ---------- */
  var strip = $('#strip'), fill = $('#stripFill');
  function stripProgress() { var p = (strip.scrollLeft + strip.clientWidth) / strip.scrollWidth; fill.style.width = (Math.min(1, p) * 100).toFixed(1) + '%'; }
  strip.addEventListener('scroll', stripProgress, { passive: true }); window.addEventListener('resize', stripProgress);
  $$('.arrow').forEach(function (b) { b.addEventListener('click', function () { strip.scrollBy({ left: +b.dataset.dir * strip.clientWidth * 0.6, behavior: reduced ? 'auto' : 'smooth' }); }); });
  var drag = null;
  strip.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse' || e.button !== 0) return; drag = { x: e.clientX, l: strip.scrollLeft, moved: false }; });
  window.addEventListener('pointermove', function (e) {
    if (!drag) return; var dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 5) { drag.moved = true; strip.classList.add('is-drag'); }
    if (drag.moved) strip.scrollLeft = drag.l - dx;
  });
  window.addEventListener('pointerup', function () { if (drag && drag.moved) strip.classList.remove('is-drag'); drag = null; });
  strip.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); strip.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * 360, behavior: reduced ? 'auto' : 'smooth' }); }
  });

  /* ---------- booking stub (never submits anywhere) ---------- */
  var form = $("#bookForm"), F = form.elements, done = $('#bookDone'), err = $('#formErr');
  (function fillTimes() {
    var sel = $('#f-time'), o = el('option', null, '—'); o.value = ''; sel.appendChild(o);
    for (var m = 8 * 60; m <= 22 * 60; m += 30) { var t = pad(Math.floor(m / 60)) + ':' + pad(m % 60); var op = el('option', null, t); op.value = t; if (t === '19:00') op.selected = true; sel.appendChild(op); }
  })();
  function fillGuests() {
    var sel = $('#f-guests'), cur = sel.value || '2'; sel.textContent = '';
    for (var g = 1; g <= 12; g++) { var op = el('option', null, MSG[lang].guests(g)); op.value = String(g); if (String(g) === cur) op.selected = true; sel.appendChild(op); }
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = F.name.value.trim(), phone = F.phone.value.trim(), date = F.date.value, time = F.time.value, bad = null, msg = '';
    $$('input,select', form).forEach(function (n) { n.removeAttribute('aria-invalid'); });
    if (!name) { bad = F.name; msg = MSG[lang].errName; }
    else if (!/^\+?[0-9][0-9\s-]{6,18}$/.test(phone)) { bad = F.phone; msg = MSG[lang].errPhone; }
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < '2026-12-01') { bad = F.date; msg = MSG[lang].errDate; }
    else if (!time) { bad = F.time; msg = MSG[lang].errTime; }
    if (bad) { err.textContent = msg; bad.setAttribute('aria-invalid', 'true'); bad.focus(); return; }
    err.textContent = '';
    var p = date.split('-'), dt = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    var dStr = dt.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });
    $('#doneTitle').textContent = MSG[lang].done(name.slice(0, 60), MSG[lang].guests(+F.guests.value), dStr, time);
    form.hidden = true; done.hidden = false; done.focus();
  });
  $('#bookAgain').addEventListener('click', function () { done.hidden = true; form.hidden = false; form.reset(); fillGuests(); F.name.focus(); });

  /* ---------- init ---------- */
  applyLang(lang); onScroll(); stripProgress();
  if (!io) $$('.rv,.hair,.msec').forEach(function (n) { n.classList.add('in'); });
})();
