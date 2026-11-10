/* Balibu — s07 "Blueprint" */
(function () {
  'use strict';
  var M = window.BALIBU_MENU;
  var doc = document, root = doc.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  function el(tag, cls, text) { var n = doc.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---------- strings ---------- */
  var T = {
    en: {
      'skip': 'Skip to content',
      'nav.menu': 'Menu', 'nav.combo': 'Combo', 'nav.happy': 'Happy hour', 'nav.visit': 'Find us', 'nav.book': 'Book a table',
      's1.name': 'Anatomy', 's2.name': 'Opening', 's3.name': 'Specification', 's4.name': 'Menu', 's5.name': 'Smash Combo', 's6.name': 'Happy hour', 's7.name': 'Site photos', 's8.name': 'Request form', 's9.name': 'Location',
      's2.meta': 'Date · offer', 's3.meta': 'About the place', 's4.meta': 'Fig. 01 – 08 · prices in K¹', 's5.meta': 'Fig. 09 · exploded view', 's7.meta': 'Tap to enlarge', 's8.meta': 'Table booking',
      'hours.short': 'Daily 08:00 – 23:00', 'hours.long': 'Daily 08:00 – 23:00 · happy hour 17:00 – 19:00',
      'hero.t1': 'Anatomy of', 'hero.t2': 'a good burger', 'hero.sub': 'Balibu Smash — 95K. Every layer, labelled.',
      'hero.lead': 'Burgers smashed to order, Kintamani coffee and house cocktails. Ubud, opening 1 December.', 'hero.cta': 'See the menu',
      'hero.cap': 'Balibu Smash, elevation view. Not to scale; appetite may vary.',
      'l1.t': 'Brioche bun', 'l1.s': 'from our oven', 'l1.p': 'Baked in our own oven every day. Soft inside, a shine on top, toasted on the plate before it meets the beef.',
      'l2.t': 'Cheddar', 'l2.s': 'melted on the plate', 'l2.p': 'Laid on the patties while they are still on the hot plate, so it melts into every edge.',
      'l3.t': 'Double smashed beef', 'l3.s': 'smashed to order', 'l3.p': 'Two beef patties, smashed to order. Pressed thin on a very hot plate for a dark, crisp crust.',
      'l4.t': 'House sauce', 'l4.s': 'with pickles', 'l4.p': 'Our own recipe, with pickles for a sharp bite. Ask for extra; everyone does.',
      'open.title': 'We open 1 December 2026.', 'open.line': 'The first 100 guests get a free Es Kopi Susu Aren.', 'open.guests': 'guests', 'open.ing': 'espresso, milk, palm sugar, ice', 'open.free': 'free',
      'story.title': 'A bar and kitchen, drawn up properly.', 'story.cap': 'Balibu specification',
      'story.p': 'Balibu sits on Jl. Sugriwa, a few minutes from the centre of Ubud. Coffee from eight, burgers all day, cocktails until late. We kept the brief short: good food, good mood.',
      'spec.k1': 'Kitchen', 'spec.v1': 'Beef patties smashed to order, brioche from our oven', 'spec.k2': 'Coffee', 'spec.v2': 'Kintamani arabica, roasted in Bali',
      'spec.k3': 'Bar', 'spec.v3': 'House cocktails, Balinese arak, local craft IPA', 'spec.k4': 'Hours', 'spec.k5': 'Location',
      'story.pa': 'Two burgers, one guest', 'story.pb': 'The bar after six',
      'menu.title': 'Bill of materials.', 'f.all': 'All', 'f.sig': 'Signature', 'f.local': 'Local', 'f.veg': 'Veg',
      'combo.title': 'Anatomy of a combo.', 'combo.a': 'double smashed beef, cheddar, pickles, house sauce', 'combo.detail': 'Detail B',
      'combo.fries': 'Hand-cut fries', 'combo.b': 'sea salt, rosemary, garlic aioli', 'combo.tea': 'Iced lemon tea', 'combo.c': 'black tea, lemon, cane sugar',
      'combo.all': 'All three', 'combo.sum': 'A + B + C =', 'combo.note': 'Every day, dine in or take away. Weekend brunch⁴: pancakes and flat white, 95K until noon.',
      'happy.title': 'Two for one, explained.', 'happy.line': 'Two for one on house cocktails, every day 17:00 – 19:00.',
      'happy.s1': 'Order a house cocktail between 17:00 and 19:00.', 'happy.s2': 'We pour a second one, on us.', 'happy.s3': 'Hand it to a friend. Or don\'t.',
      'happy.pay': 'you pay', 'happy.now': 'Now in Ubud',
      'photos.title': 'Field notes.', 'photos.c1': 'Smashed to order, served under warm lights.', 'photos.c2': 'The bar, set before the rush.', 'photos.c3': 'The hot plate at work.',
      'photos.c4': 'Ubud, all around us.', 'photos.c5': 'Burgers are better shared.', 'photos.c6': 'Coffee from eight in the morning.',
      'book.title': 'Reserve a table.', 'book.lead': 'Fill in four fields and we will keep a table for you. Walk-ins are always welcome.',
      'book.name': 'Name', 'book.phone': 'WhatsApp number', 'book.date': 'Date', 'book.time': 'Time', 'book.guests': 'Guests', 'book.send': 'Submit request',
      'book.doneK': 'Request logged', 'book.doneNote': 'This page is a preview, so nothing was sent yet. To book for real, message us on WhatsApp.', 'book.again': 'New request',
      'visit.title': 'Site plan.', 'visit.cap': 'Address and contacts', 'visit.addr': 'Address', 'visit.route': 'Open in Google Maps',
      'footnote': M.brand.footnote_en, 'fn2': 'Happy hour: two for one on house cocktails, every day 17:00 – 19:00.',
      'fn3': 'Opening offer: the first 100 guests from 1 December 2026 get a free Es Kopi Susu Aren.', 'fn4': 'Weekend brunch: pancakes and flat white, 95K until noon, Saturday and Sunday.',
      'tb.project': 'Project', 'tb.contact': 'Contact', 'tb.sheet': 'Sheet', 'foot.top': 'Back to Sheet 01 ↑'
    },
    id: {
      'skip': 'Langsung ke konten',
      'nav.menu': 'Menu', 'nav.combo': 'Kombo', 'nav.happy': 'Happy hour', 'nav.visit': 'Lokasi', 'nav.book': 'Pesan meja',
      's1.name': 'Anatomi', 's2.name': 'Pembukaan', 's3.name': 'Spesifikasi', 's4.name': 'Menu', 's5.name': 'Smash Combo', 's6.name': 'Happy hour', 's7.name': 'Foto lokasi', 's8.name': 'Formulir', 's9.name': 'Lokasi',
      's2.meta': 'Tanggal · promo', 's3.meta': 'Tentang tempat ini', 's4.meta': 'Gbr. 01 – 08 · harga dalam K¹', 's5.meta': 'Gbr. 09 · tampilan urai', 's7.meta': 'Ketuk untuk memperbesar', 's8.meta': 'Reservasi meja',
      'hours.short': 'Setiap hari 08.00 – 23.00', 'hours.long': 'Setiap hari 08.00 – 23.00 · happy hour 17.00 – 19.00',
      'hero.t1': 'Anatomi', 'hero.t2': 'burger yang enak', 'hero.sub': 'Balibu Smash — 95K. Setiap lapisan, diberi label.',
      'hero.lead': 'Burger smash dibuat saat dipesan, kopi Kintamani dan koktail rumah. Ubud, buka 1 Desember.', 'hero.cta': 'Lihat menu',
      'hero.cap': 'Balibu Smash, tampak samping. Tidak sesuai skala; selera bisa berbeda.',
      'l1.t': 'Roti brioche', 'l1.s': 'dari oven kami', 'l1.p': 'Dipanggang di oven kami setiap hari. Lembut di dalam, mengilap di atas, dipanggang di plat sebelum bertemu daging.',
      'l2.t': 'Cheddar', 'l2.s': 'meleleh di atas plat', 'l2.p': 'Diletakkan di atas patty saat masih di plat panas, jadi meleleh sampai ke setiap tepi.',
      'l3.t': 'Daging sapi smash ganda', 'l3.s': 'di-smash saat dipesan', 'l3.p': 'Dua patty daging sapi, di-smash saat dipesan. Ditekan tipis di plat yang sangat panas sampai kerak gelap dan renyah.',
      'l4.t': 'Saus rumah', 'l4.s': 'dengan acar', 'l4.p': 'Resep kami sendiri, dengan acar untuk rasa segar. Minta tambahan; semua orang juga begitu.',
      'open.title': 'Kami buka 1 Desember 2026.', 'open.line': '100 tamu pertama dapat Es Kopi Susu Aren gratis.', 'open.guests': 'tamu', 'open.ing': 'espresso, susu, gula aren, es', 'open.free': 'gratis',
      'story.title': 'Bar dan dapur, dirancang dengan benar.', 'story.cap': 'Spesifikasi Balibu',
      'story.p': 'Balibu ada di Jl. Sugriwa, beberapa menit dari pusat Ubud. Kopi mulai jam delapan, burger sepanjang hari, koktail sampai malam. Briefnya singkat: makan enak, hati senang.',
      'spec.k1': 'Dapur', 'spec.v1': 'Patty daging sapi di-smash saat dipesan, brioche dari oven kami', 'spec.k2': 'Kopi', 'spec.v2': 'Arabika Kintamani, disangrai di Bali',
      'spec.k3': 'Bar', 'spec.v3': 'Koktail rumah, arak Bali, bir craft IPA lokal', 'spec.k4': 'Jam buka', 'spec.k5': 'Lokasi',
      'story.pa': 'Dua burger, satu tamu', 'story.pb': 'Bar setelah jam enam',
      'menu.title': 'Daftar bahan.', 'f.all': 'Semua', 'f.sig': 'Andalan', 'f.local': 'Lokal', 'f.veg': 'Vegetarian',
      'combo.title': 'Anatomi sebuah kombo.', 'combo.a': 'daging sapi smash ganda, cheddar, acar, saus rumah', 'combo.detail': 'Detail B',
      'combo.fries': 'Kentang goreng', 'combo.b': 'garam laut, rosemary, aioli bawang putih', 'combo.tea': 'Es teh lemon', 'combo.c': 'teh hitam, lemon, gula tebu',
      'combo.all': 'Ketiganya', 'combo.sum': 'A + B + C =', 'combo.note': 'Setiap hari, makan di tempat atau dibawa pulang. Brunch akhir pekan⁴: pancake dan flat white, 95K sampai jam 12.',
      'happy.title': 'Beli satu gratis satu, dijelaskan.', 'happy.line': 'Beli satu gratis satu koktail rumah, setiap hari 17.00 – 19.00.',
      'happy.s1': 'Pesan koktail rumah antara jam 17.00 dan 19.00.', 'happy.s2': 'Kami tuangkan gelas kedua, gratis.', 'happy.s3': 'Berikan ke teman. Atau tidak.',
      'happy.pay': 'kamu bayar', 'happy.now': 'Sekarang di Ubud',
      'photos.title': 'Catatan lapangan.', 'photos.c1': 'Di-smash saat dipesan, disajikan di bawah lampu hangat.', 'photos.c2': 'Bar, siap sebelum ramai.', 'photos.c3': 'Plat panas sedang bekerja.',
      'photos.c4': 'Ubud di sekeliling kami.', 'photos.c5': 'Burger lebih enak dibagi.', 'photos.c6': 'Kopi mulai jam delapan pagi.',
      'book.title': 'Pesan meja.', 'book.lead': 'Isi empat kolom dan kami siapkan meja untukmu. Tanpa reservasi juga selalu boleh.',
      'book.name': 'Nama', 'book.phone': 'Nomor WhatsApp', 'book.date': 'Tanggal', 'book.time': 'Jam', 'book.guests': 'Jumlah tamu', 'book.send': 'Kirim permintaan',
      'book.doneK': 'Permintaan tercatat', 'book.doneNote': 'Halaman ini masih pratinjau, jadi belum ada yang terkirim. Untuk reservasi sungguhan, kirim pesan WhatsApp.', 'book.again': 'Permintaan baru',
      'visit.title': 'Denah lokasi.', 'visit.cap': 'Alamat dan kontak', 'visit.addr': 'Alamat', 'visit.route': 'Buka di Google Maps',
      'footnote': M.brand.footnote_id, 'fn2': 'Happy hour: beli satu gratis satu koktail rumah, setiap hari 17.00 – 19.00.',
      'fn3': 'Promo pembukaan: 100 tamu pertama mulai 1 Desember 2026 dapat Es Kopi Susu Aren gratis.', 'fn4': 'Brunch akhir pekan: pancake dan flat white, 95K sampai jam 12, Sabtu dan Minggu.',
      'tb.project': 'Proyek', 'tb.contact': 'Kontak', 'tb.sheet': 'Lembar', 'foot.top': 'Kembali ke Lembar 01 ↑'
    }
  };
  var NOTE_ID = { burgers: 'Patty daging sapi di-smash saat dipesan, brioche dari oven kami.', bites: 'Untuk berbagi. Atau tidak.', plates: 'Klasik Ubud dan beberapa dari perjalanan.', coffee: 'Arabika Kintamani, disangrai di Bali.', cocktails: 'Happy hour 17.00 – 19.00: beli satu gratis satu koktail rumah.' };
  var TAGS = {
    en: { signature: 'signature', 'local twist': 'local twist', veg: 'veg', big: 'big', local: 'local', classic: 'classic', brunch: 'brunch', favourite: 'favourite' },
    id: { signature: 'andalan', 'local twist': 'sentuhan lokal', veg: 'vegetarian', big: 'porsi besar', local: 'lokal', classic: 'klasik', brunch: 'brunch', favourite: 'favorit' }
  };
  var MSG = {
    en: { fig: 'Fig.', items: function (n) { return n + ' items'; }, hNo: 'No.', hItem: 'Item / spec', hK: 'K', match: function (n) { return n + ' match'; },
      soon: 'Starts in ', on: 'On now — ends in ', next: 'Next one in ', closed: 'Closed now · ', h: ' h ', m: ' min', sheet: 'Sheet',
      daysLeft: function (n) { return '<b>' + n + (n === 1 ? ' day' : ' days') + '</b> to opening night.'; }, open: '<b>We are open.</b> Come by.',
      errName: 'Field F1: please tell us your name.', errPhone: 'Field F2: please add a WhatsApp number we can reach.', errDate: 'Field F3: please pick a date from 1 December 2026.', errTime: 'Field F4: please pick a time.',
      done: function (n, g, d, t) { return 'Thank you, ' + n + '. A table for ' + g + ' on ' + d + ' at ' + t + '.'; }, guests: function (n) { return n === 1 ? '1 guest' : n + ' guests'; } },
    id: { fig: 'Gbr.', items: function (n) { return n + ' menu'; }, hNo: 'No.', hItem: 'Menu / isi', hK: 'K', match: function (n) { return n + ' cocok'; },
      soon: 'Mulai dalam ', on: 'Sedang berlangsung — selesai dalam ', next: 'Berikutnya dalam ', closed: 'Sedang tutup · ', h: ' j ', m: ' mnt', sheet: 'Lembar',
      daysLeft: function (n) { return '<b>' + n + ' hari</b> menuju malam pembukaan.'; }, open: '<b>Kami sudah buka.</b> Mampir, ya.',
      errName: 'Kolom F1: tulis nama kamu, ya.', errPhone: 'Kolom F2: tambahkan nomor WhatsApp yang bisa dihubungi.', errDate: 'Kolom F3: pilih tanggal mulai 1 Desember 2026.', errTime: 'Kolom F4: pilih jam.',
      done: function (n, g, d, t) { return 'Terima kasih, ' + n + '. Meja untuk ' + g + ' pada ' + d + ' jam ' + t + '.'; }, guests: function (n) { return n + ' orang'; } }
  };
  var lang = 'en', filter = 'all';
  try { var saved = localStorage.getItem('balibu-lang'); if (saved === 'id' || saved === 'en') lang = saved; } catch (e) { /* storage blocked */ }

  /* ---------- menu: Fig. 01–08 technical tables ---------- */
  var figs = $('#figs');
  function renderMenu() {
    figs.textContent = '';
    M.sections.forEach(function (sec, si) {
      var f = el('section', 'fig'); f.id = 'fig-' + sec.id; f.setAttribute('aria-labelledby', 'fh-' + sec.id);
      var head = el('div', 'fig__head');
      head.appendChild(el('span', null, MSG[lang].fig + ' ' + pad(si + 1) + ' —'));
      var h = el('h3', null, lang === 'id' ? sec.title_id : sec.title_en); h.id = 'fh-' + sec.id; head.appendChild(h);
      head.appendChild(el('span', null, MSG[lang].items(sec.items.length)));
      f.appendChild(head);
      var note = lang === 'id' ? NOTE_ID[sec.id] : sec.note_en; if (note) f.appendChild(el('p', 'fig__note', note));
      var t = el('table', 'tbl'), th = el('thead'), tr = el('tr');
      var a = el('th', 'h-no', MSG[lang].hNo); a.scope = 'col'; tr.appendChild(a);
      var b = el('th', null, ''); b.scope = 'col'; b.appendChild(el('span', 'sr', 'Photo')); tr.appendChild(b);
      var c = el('th', null, MSG[lang].hItem); c.scope = 'col'; tr.appendChild(c);
      var d = el('th', null, MSG[lang].hK); d.scope = 'col'; tr.appendChild(d);
      th.appendChild(tr); t.appendChild(th);
      var tb = el('tbody');
      sec.items.forEach(function (it, ii) {
        var r = el('tr', 'row'); r.dataset.tag = it.tag || ''; r.style.setProperty('--d', (ii * 0.07) + 's');
        r.appendChild(el('td', 'c-no', pad(si + 1) + '.' + (ii + 1)));
        var p = el('td', 'c-ph'), img = el('img'); img.src = '../shared/img/t/' + it.photo + '.jpg'; img.alt = it.name; img.width = 52; img.height = 52; img.loading = 'lazy'; img.decoding = 'async'; p.appendChild(img); r.appendChild(p);
        var nm = el('td', 'c-it'), bb = el('b', null, it.name);
        if (it.tag) bb.appendChild(el('span', 'tg', TAGS[lang][it.tag] || it.tag));
        nm.appendChild(bb); nm.appendChild(el('span', null, lang === 'id' ? it.ingredients_id : it.ingredients_en)); r.appendChild(nm);
        var k = el('td', 'c-k'), num = el('span', 'count', String(it.price)); num.dataset.to = it.price; k.appendChild(num); k.appendChild(doc.createTextNode('K')); r.appendChild(k);
        tb.appendChild(r);
      });
      t.appendChild(tb); f.appendChild(t); figs.appendChild(f);
    });
    applyFilter();
  }
  function matches(tag) { if (filter === 'all') return true; if (filter === 'local') return /local/.test(tag); return tag === filter; }
  function applyFilter() {
    var n = 0;
    $$('#figs tr.row').forEach(function (r) { var ok = matches(r.dataset.tag); r.classList.toggle('is-dim', !ok); if (ok) n++; });
    $('#filterN').textContent = filter === 'all' ? '' : MSG[lang].match(n);
  }
  $$('.chip').forEach(function (c) {
    c.addEventListener('click', function () {
      filter = c.dataset.f; $$('.chip').forEach(function (x) { x.setAttribute('aria-pressed', String(x === c)); }); applyFilter();
    });
  });

  /* ---------- language ---------- */
  function applyLang(l) {
    lang = l; root.lang = l;
    $$('[data-i18n]').forEach(function (n) { var v = T[l][n.getAttribute('data-i18n')]; if (v != null) n.textContent = v; });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    renderMenu(); fillGuests(); observe(); tick(); countdown(); setSheet(curSheet);
    try { localStorage.setItem('balibu-lang', l); } catch (e) { /* storage blocked */ }
  }
  $$('.lang button').forEach(function (b) { b.addEventListener('click', function () { if (b.dataset.lang !== lang) applyLang(b.dataset.lang); }); });

  /* ---------- counters ---------- */
  function countUp(n) {
    var to = +n.dataset.to; if (reduced || !to) { n.textContent = String(to); return; }
    var t0 = 0, dur = 900 + Math.min(600, to * 3);
    function step(ts) { if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / dur), e = 1 - Math.pow(1 - p, 3); n.textContent = String(Math.round(to * e)); if (p < 1) requestAnimationFrame(step); }
    n.textContent = '0'; requestAnimationFrame(step);
  }

  /* ---------- reveals ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var t = e.target; t.classList.add('in'); io.unobserve(t);
      $$('.count', t).forEach(function (c, i) { if (c.dataset.done) return; c.dataset.done = '1'; setTimeout(function () { countUp(c); }, i * 60); });
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }) : null;
  function observe() {
    $$('.rv:not(.in), .fig:not(.in), .sheet__head:not(.in), .xpl:not(.in)').forEach(function (n) { if (io) io.observe(n); else n.classList.add('in'); });
  }

  /* ---------- SVG draw-on lengths ---------- */
  $$('.co-line polyline, polyline.draw, line.draw').forEach(function (p) {
    try { var L = Math.ceil(p.getTotalLength()) + 2; p.style.setProperty('--len', L); } catch (e) { /* not rendered */ }
  });

  /* ---------- anatomy: sequence, focus, ruler ---------- */
  var stage = $('#stage'), lines = $$('.co-line'), labels = $$('.co');
  (function addNums() {
    var wrap = el('div', 'stage__num'); wrap.setAttribute('aria-hidden', 'true');
    lines.forEach(function (g, i) { var c = g.querySelector('circle'); var s = el('span', null, String(i + 1)); s.style.left = ((c.getAttribute('cx') - 300) / 10) + '%'; s.style.top = ((c.getAttribute('cy') - 16) / 9.67) + '%'; wrap.appendChild(s); });
    stage.appendChild(wrap);
  })();
  function drawAll() {
    lines.forEach(function (g, i) {
      setTimeout(function () { g.classList.add('is-drawn'); labels[i].classList.add('is-drawn'); if (i === lines.length - 1) stage.classList.add('is-drawn'); }, reduced ? 0 : 500 + i * 380);
    });
  }
  if (io) {
    var sio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { drawAll(); sio.disconnect(); } }, { threshold: 0.25 });
    sio.observe(stage);
  } else drawAll();
  function focusCo(i) {
    stage.classList.toggle('has-focus', i >= 0);
    lines.forEach(function (g, k) { g.classList.toggle('is-focus', k === i); });
    labels.forEach(function (g, k) { g.classList.toggle('is-focus', k === i); });
  }
  var layers = $$('.layer'), activeLayer = -1;
  if (io) {
    var lio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var i = +e.target.dataset.co;
        if (e.isIntersecting) { activeLayer = i; } else if (activeLayer === i) { activeLayer = -1; }
      });
      layers.forEach(function (l, k) { l.classList.toggle('is-on', k === activeLayer); });
      focusCo(activeLayer);
    }, { rootMargin: '-42% 0px -42% 0px' });
    layers.forEach(function (l) { lio.observe(l); });
  }
  labels.forEach(function (c, i) {
    c.addEventListener('mouseenter', function () { focusCo(i); });
    c.addEventListener('mouseleave', function () { focusCo(activeLayer); });
  });

  /* ---------- scroll: header, sheet indicator, grid parallax, ruler ---------- */
  var hdr = $('#hdr'), gridfine = $('#gridfine'), anat = $('.anat'), rulerFill = $('#rulerFill'), ticking = false;
  function onScroll() {
    var y = window.scrollY;
    if (burger.getAttribute('aria-expanded') !== 'true') hdr.classList.toggle('is-scrolled', y > 30);
    if (!reduced) gridfine.style.backgroundPosition = '0 ' + (y * 0.3).toFixed(1) + 'px';
    var span = anat.offsetHeight - window.innerHeight;
    rulerFill.style.height = (span > 0 ? Math.max(0, Math.min(1, (y - anat.offsetTop) / span)) * 100 : 0).toFixed(1) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  var curSheet = $('.anat');
  function setSheet(s) {
    if (!s) return; curSheet = s;
    $('#sheetNo').textContent = MSG[lang].sheet + ' ' + s.dataset.sheet;
    $('#sheetName').textContent = T[lang][s.dataset.sheetKey];
  }
  if (io) {
    var shio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) setSheet(e.target); }); }, { rootMargin: '-30% 0px -65% 0px' });
    $$('[data-sheet]').forEach(function (s) { shio.observe(s); });
  }

  /* ---------- drawer ---------- */
  var burger = $('.burger'), drawer = $('#drawer');
  function setDrawer(open) {
    burger.setAttribute('aria-expanded', String(open)); burger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) { drawer.hidden = false; requestAnimationFrame(function () { drawer.classList.add('is-open'); }); doc.body.style.overflow = 'hidden'; hdr.classList.add('is-scrolled'); }
    else { drawer.classList.remove('is-open'); doc.body.style.overflow = ''; setTimeout(function () { if (burger.getAttribute('aria-expanded') === 'false') drawer.hidden = true; }, 350); onScroll(); }
  }
  burger.addEventListener('click', function () { setDrawer(burger.getAttribute('aria-expanded') !== 'true'); });
  $$('#drawer a').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { setDrawer(false); burger.focus(); } });

  /* ---------- happy hour timeline (Ubud = UTC+8, no DST) ---------- */
  var ticks = $('#ticks');
  for (var hh = 8; hh <= 23; hh++) { var s = el('span', hh === 17 || hh === 19 ? 'is-hh' : null, pad(hh)); s.style.left = ((hh - 8) / 15 * 100) + '%'; ticks.appendChild(s); }
  function ubud() { var d = new Date(Date.now() + 8 * 3600e3); return { h: d.getUTCHours(), m: d.getUTCMinutes(), s: d.getUTCSeconds() }; }
  function dur(mins) { var h = Math.floor(mins / 60), m = Math.ceil(mins % 60); if (m === 60) { h++; m = 0; } return (h ? h + MSG[lang].h : '') + m + MSG[lang].m; }
  var nowTime = $('#nowTime'), nowStatus = $('#nowStatus'), nowMark = $('#nowMark');
  function tick() {
    var u = ubud(), now = u.h * 60 + u.m + u.s / 60, S = 17 * 60, E = 19 * 60, msg;
    nowTime.textContent = pad(u.h) + ':' + pad(u.m);
    var open = now >= 8 * 60 && now < 23 * 60;
    nowMark.classList.toggle('is-off', !open);
    if (open) nowMark.style.left = ((now - 480) / 900 * 100).toFixed(2) + '%';
    if (now < S) msg = MSG[lang].soon + '<b>' + dur(S - now) + '</b>';
    else if (now < E) msg = MSG[lang].on + '<b>' + dur(E - now) + '</b>';
    else msg = MSG[lang].next + '<b>' + dur(24 * 60 - now + S) + '</b>';
    nowStatus.innerHTML = (open ? '' : MSG[lang].closed) + msg;
  }
  setInterval(tick, 1000);
  function countdown() {
    var openAt = Date.UTC(2026, 10, 30, 16, 0, 0); /* 1 Dec 2026 00:00 in Ubud */
    var days = Math.ceil((openAt - Date.now()) / 864e5);
    $('#countdown').innerHTML = days > 0 ? MSG[lang].daysLeft(days) : MSG[lang].open;
  }

  /* ---------- lightbox ---------- */
  var lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lastFrame = null;
  $$('.frame').forEach(function (f) {
    f.addEventListener('click', function () {
      var img = f.querySelector('img'); lastFrame = f;
      lbImg.src = img.src; lbImg.alt = img.alt;
      lbCap.textContent = ''; lbCap.appendChild(el('b', null, f.querySelector('.frame__no').textContent)); lbCap.appendChild(doc.createTextNode(T[lang][f.dataset.cap] || ''));
      if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', '');
    });
  });
  function closeLb() { if (lb.open) { if (typeof lb.close === 'function') lb.close(); else lb.removeAttribute('open'); } }
  $('#lbX').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  lb.addEventListener('close', function () { if (lastFrame) lastFrame.focus(); });

  /* ---------- booking stub (never submits anywhere) ---------- */
  var form = $('#bookForm'), F = form.elements, done = $('#bookDone'), err = $('#formErr');
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
    $$('.fld', form).forEach(function (n) { n.classList.remove('is-bad'); });
    $$('input,select', form).forEach(function (n) { n.removeAttribute('aria-invalid'); });
    if (!name) { bad = F.name; msg = MSG[lang].errName; }
    else if (!/^\+?[0-9][0-9\s-]{6,18}$/.test(phone)) { bad = F.phone; msg = MSG[lang].errPhone; }
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < '2026-12-01') { bad = F.date; msg = MSG[lang].errDate; }
    else if (!time) { bad = F.time; msg = MSG[lang].errTime; }
    if (bad) { err.textContent = msg; bad.setAttribute('aria-invalid', 'true'); bad.closest('.fld').classList.add('is-bad'); bad.focus(); return; }
    err.textContent = '';
    var p = date.split('-'), dt = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    var dStr = dt.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });
    $('#doneRef').textContent = 'BLB-' + p[1] + p[2] + '-' + time.replace(':', '');
    $('#doneTitle').textContent = MSG[lang].done(name.slice(0, 60), MSG[lang].guests(+F.guests.value), dStr, time);
    form.hidden = true; done.hidden = false; done.focus();
  });
  $('#bookAgain').addEventListener('click', function () { done.hidden = true; form.hidden = false; form.reset(); fillGuests(); F.name.focus(); });

  /* ---------- init ---------- */
  applyLang(lang); onScroll();
})();
