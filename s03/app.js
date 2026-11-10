/* s03 — Cream Editorial. Vanilla JS, no dependencies. */
(function () {
  'use strict';
  var M = window.BALIBU_MENU;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var doc = document.documentElement;
  var lang = 'en';
  try { lang = localStorage.getItem('balibu-lang') === 'id' ? 'id' : 'en'; } catch (e) {}

  /* ---------- strings (EN lives in the HTML; ID here) ---------- */
  var ID = {
    'nav.menu': 'Menu', 'nav.promo': 'Promo', 'nav.gallery': 'Galeri', 'nav.find': 'Lokasi', 'nav.brunch': 'Brunch',
    'nav.book': 'Pesan meja', 'nav.open': 'Buka menu', 'drawer.hand': 'sampai jumpa di Jl. Sugriwa',
    'hero.kicker': '№ 1 · Burger · Kopi · Ubud',
    'hero.h': 'Burger,<br>kopi &amp;<br>malam asyik.',
    'hero.hand': 'buka 1 Desember',
    'hero.lede': 'Daging sapi di-smash saat dipesan, brioche dari oven kami, kopi Kintamani di pagi hari dan koktail setelah gelap.',
    'hero.cta': 'Lihat menu', 'hero.cta2': 'Lokasi kami', 'hours.daily': 'Setiap hari 08.00 – 23.00',
    'story.label': '01 — Cerita kami',
    'story.h': 'Dapur kecil di Jl.&nbsp;Sugriwa dengan panggangan besar, mesin espresso yang bagus dan <mark class="mk">tanpa terburu-buru</mark>.',
    'story.p1': 'Setiap patty kami smash saat dipesan di atas plat panas, brioche dipanggang tiap pagi, dan kopi arabika Kintamani disangrai di Bali.',
    'story.p2': 'Datang untuk sarapan setelah jalan-jalan di sawah, tinggal sampai happy hour, pulang kalau musiknya bilang begitu. Makanan enak, suasana asyik.',
    'story.cap': 'kru Balibu, sedang mencoba menu',
    'menu.h': 'Menu kami.', 'menu.hand': 'di-smash saat dipesan, brioche dari oven kami',
    'footnote': 'Harga dalam ribuan rupiah (K), belum termasuk pajak &amp; layanan 15%.',
    'combo.label': '02 — Paket hemat', 'combo.h': 'Smash Combo', 'combo.hand': 'burger + kentang + es teh lemon',
    'combo.fries': 'Kentang Goreng', 'combo.tea': 'Es Teh Lemon', 'combo.save': 'Semuanya', 'combo.cta': 'Pesan via WhatsApp',
    'hh.label': '03 — Setiap hari', 'hh.h': 'Happy hour',
    'hh.p': 'Beli satu gratis satu koktail rumah: Balibu Spritz, Arak Mojito, Passion Margarita.',
    'hh.hand': 'beli satu gratis satu, setiap hari',
    'open.label': '04 — Hari pembukaan', 'open.h': 'Buka 1&nbsp;Des', 'open.unit': 'kopi gratis',
    'open.p': '100 tamu pertama dapat Es Kopi Susu Aren gratis: espresso, susu, gula aren, es.',
    'brunch.label': '05 — Sabtu &amp; Minggu', 'brunch.h': 'Brunch akhir pekan',
    'brunch.hand': 'pancake + flat white, sampai jam 12, Sabtu &amp; Minggu',
    'brunch.p': 'Pancake lembut dengan pisang, karamel gula aren dan kelapa sangrai, plus flat white dua shot.',
    'gallery.label': '06 — Lembar kontak', 'gallery.h': 'Suasana asyik, dalam film.', 'gallery.hand': 'ketuk foto untuk melihat lebih dekat',
    'book.label': '07 — Simpan kursi', 'book.h': 'Pesan meja untuk minggu pembukaan.',
    'book.p': 'Tinggalkan nama dan nomor WhatsApp. Kami akan mengonfirmasi meja Anda langsung.',
    'book.name': 'Nama Anda', 'book.phone': 'WhatsApp', 'book.date': 'Tanggal', 'book.guests': 'Tamu', 'book.send': 'Minta meja',
    'find.label': '08 — Lokasi', 'find.h': 'Jl. Sugriwa No. 60', 'find.d1': 'Setiap hari', 'find.d2': 'Happy hour',
    'find.d3': 'Brunch akhir pekan', 'find.d3v': 'Sab–Min sampai 12.00', 'find.d4': 'Pembukaan', 'find.d4v': '1 Desember 2026',
    'find.hand': 'datang lapar, pulang senang'
  };
  var T = {
    en: { tabs: ['Burgers &amp; Bites', 'Plates &amp; Sweet', 'Coffee &amp; Fresh', 'Cocktails &amp; Beer'],
      sn: { burgers: 'Beef patties smashed to order, brioche from our oven.', bites: 'Made for sharing. Or not.', plates: 'Ubud classics and a few from the road.', sweet: 'save room for this', coffee: 'Kintamani arabica, roasted in Bali.', fresh: 'cold, bright, local fruit', cocktails: 'two for one, 17:00 – 19:00', beer: 'cold ones for the sunset' },
      notes: { b1: "chef's pick", s2: 'made for sharing', c5: 'free on 1 Dec', k2: 'try it at sunset' },
      tags: {}, err: 'Please add your name, a WhatsApp number and a date from 1 December.',
      ok: function (n, d, g) { return '<b>Thank you, ' + n + '!</b><p>We have noted a table for ' + g + ' on ' + d + '. We will confirm on WhatsApp within a day.</p><p class="hand">nothing was sent anywhere yet — this is a preview</p>'; },
      open: 'Open now · until 23:00', closed: 'Closed now · opens 08:00', soon: 'Opening 1 December 2026',
      days: function (n) { return n === 1 ? 'one more day!' : n + ' days to go'; }, today: 'today is the day!',
      sheet: ['the long table', 'first round', 'behind the bar', 'night smash', 'Saturday crowd', 'stacked', 'to go', 'on the grill'], pick: 'this one!' },
    id: { tabs: ['Burger &amp; Camilan', 'Hidangan &amp; Manis', 'Kopi &amp; Segar', 'Koktail &amp; Bir'],
      sn: { burgers: 'Daging sapi di-smash saat dipesan, brioche dari oven kami.', bites: 'Untuk berbagi. Atau tidak.', plates: 'Klasik Ubud dan beberapa dari jalanan.', sweet: 'sisakan tempat untuk ini', coffee: 'Arabika Kintamani, disangrai di Bali.', fresh: 'dingin, segar, buah lokal', cocktails: 'beli satu gratis satu, 17.00 – 19.00', beer: 'yang dingin untuk senja' },
      notes: { b1: 'pilihan chef', s2: 'untuk berbagi', c5: 'gratis 1 Des', k2: 'coba saat senja' },
      tags: { signature: 'andalan', 'local twist': 'sentuhan lokal', veg: 'vegetarian', big: 'besar', local: 'lokal', classic: 'klasik', brunch: 'brunch', favourite: 'favorit' },
      err: 'Mohon isi nama, nomor WhatsApp dan tanggal mulai 1 Desember.',
      ok: function (n, d, g) { return '<b>Terima kasih, ' + n + '!</b><p>Kami catat meja untuk ' + g + ' orang pada ' + d + '. Kami akan konfirmasi via WhatsApp dalam sehari.</p><p class="hand">belum ada yang terkirim — ini hanya pratinjau</p>'; },
      open: 'Buka sekarang · sampai 23.00', closed: 'Tutup · buka 08.00', soon: 'Buka 1 Desember 2026',
      days: function (n) { return n === 1 ? 'tinggal satu hari!' : 'tinggal ' + n + ' hari'; }, today: 'hari ini!',
      sheet: ['meja panjang', 'ronde pertama', 'di balik bar', 'smash malam', 'ramai Sabtu', 'bertumpuk', 'dibawa pulang', 'di panggangan'], pick: 'yang ini!' }
  };
  var EN = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (!(k in EN)) EN[k] = el.innerHTML; });

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------- split text ---------- */
  function split(el) {
    var html = el.innerHTML.replace(/&nbsp;/g, '\u00a0').replace(/<br\s*\/?>/gi, '\n');
    var tmp = document.createElement('div'); tmp.innerHTML = html;
    var lines = tmp.textContent.trim().split('\n'), i = 0;
    el.setAttribute('aria-label', lines.join(' ').replace(/\s+/g, ' '));
    el.innerHTML = lines.map(function (line) {
      return line.trim().split(/\s+/).map(function (w) {
        return '<span class="w" aria-hidden="true"><span style="transition-delay:' + (i++ * 70) + 'ms">' + esc(w) + '</span></span>';
      }).join(' ');
    }).join('<br>');
  }

  /* ---------- sketch underline ---------- */
  var SQ = '<svg class="sq" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 6C28 2 52 9 84 5S142 2 168 6 192 7 198 4"/></svg>';
  function sketch(root) { (root || document).querySelectorAll('.sk:not([data-sq])').forEach(function (a) { a.setAttribute('data-sq', ''); a.insertAdjacentHTML('beforeend', SQ); }); }

  /* ---------- menu ---------- */
  var PAGES = [['burgers', 'bites'], ['plates', 'sweet'], ['coffee', 'fresh'], ['cocktails', 'beer']];
  var current = 0;
  function secById(id) { for (var i = 0; i < M.sections.length; i++) if (M.sections[i].id === id) return M.sections[i]; return null; }
  function renderMenu() {
    var L = T[lang], tabs = document.getElementById('menuTabs'), pages = document.getElementById('menuPages');
    tabs.innerHTML = PAGES.map(function (p, i) {
      return '<button class="tab sk" role="tab" type="button" id="tab' + i + '" aria-controls="page' + i + '" aria-selected="' + (i === current) + '" tabindex="' + (i === current ? 0 : -1) + '"><small>№ ' + (i + 1) + '</small>' + L.tabs[i] + '</button>';
    }).join('');
    pages.innerHTML = PAGES.map(function (p, i) {
      return '<div class="page" role="tabpanel" id="page' + i + '" aria-labelledby="tab' + i + '"' + (i === current ? '' : ' hidden') + '>' + p.map(function (sid) {
        var s = secById(sid);
        return '<div class="sec"><div class="sec__head"><h3>' + esc(lang === 'id' ? s.title_id : s.title_en) + '</h3><span>' + esc(lang === 'id' ? s.title_en : s.title_id) + '</span></div>' +
          '<p class="hand sec__note">' + esc(L.sn[sid] || '') + '</p>' +
          s.items.map(function (it) {
            var tag = it.tag ? '<span class="row__tag">' + esc(L.tags[it.tag] || it.tag) + '</span>' : '';
            var note = L.notes[it.id] ? '<span class="row__note">' + esc(L.notes[it.id]) + '<svg><use href="#arrow"/></svg></span>' : '';
            return '<div class="row">' + note + '<img class="row__img" src="../shared/img/t/' + esc(it.photo) + '.jpg" alt="' + esc(it.name) + '" width="64" height="64" loading="lazy" decoding="async">' +
              '<div><p class="row__name">' + esc(it.name) + tag + '</p><p class="row__ing">' + esc(lang === 'id' ? it.ingredients_id : it.ingredients_en) + '</p></div>' +
              '<span class="row__price"><span class="mk">' + it.price + 'K</span></span></div>';
          }).join('') + '</div>';
      }).join('') + '</div>';
    }).join('');
    sketch(tabs);
    observe(pages.querySelectorAll('.row'));
  }
  function selectTab(i, focus) {
    current = i;
    document.querySelectorAll('.tab').forEach(function (t, j) { t.setAttribute('aria-selected', j === i); t.tabIndex = j === i ? 0 : -1; if (j === i && focus) t.focus(); });
    document.querySelectorAll('.page').forEach(function (p, j) {
      p.hidden = j !== i;
      if (j === i) { p.classList.remove('enter'); void p.offsetWidth; p.classList.add('enter'); p.querySelectorAll('.row').forEach(function (r) { r.classList.remove('in'); }); observe(p.querySelectorAll('.row')); }
    });
  }
  document.getElementById('menuTabs').addEventListener('click', function (e) { var b = e.target.closest('.tab'); if (b) selectTab(+b.id.slice(3)); });
  document.getElementById('menuTabs').addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault(); selectTab((current + (e.key === 'ArrowRight' ? 1 : 3)) % 4, true);
  });

  /* ---------- gallery ---------- */
  var SHOTS = ['hero-friends', 'hero-party', 'hero-bartender', 'night-burger', 'hero-people', 'yellow-stack', 'hero-fastfood', 'grill'];
  function renderSheet() {
    var L = T[lang];
    document.getElementById('sheet').innerHTML = SHOTS.map(function (k, i) {
      var cls = 'frame' + (i === 3 ? ' frame--pick' : '');
      return '<li class="' + cls + '">' + (i === 3 ? '<span class="frame__pick">' + L.pick + '</span>' : '') +
        '<button type="button" data-i="' + i + '" aria-label="' + esc(L.sheet[i]) + '"><img src="../shared/img/' + k + '.jpg" alt="' + esc(L.sheet[i]) + '" width="600" height="400" loading="lazy" decoding="async"></button>' +
        '<p class="frame__n"><span>' + String(i + 1).padStart(2, '0') + 'A ▸</span><span>BALIBU 26</span></p></li>';
    }).join('');
  }
  var lb = document.getElementById('lightbox'), lbI = 0;
  function showLb(i) {
    lbI = (i + SHOTS.length) % SHOTS.length;
    var img = document.getElementById('lbImg');
    img.src = '../shared/img/' + SHOTS[lbI] + '.jpg'; img.alt = T[lang].sheet[lbI];
    document.getElementById('lbCap').textContent = String(lbI + 1).padStart(2, '0') + ' — ' + T[lang].sheet[lbI];
    if (!lb.open) lb.showModal();
  }
  document.getElementById('sheet').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) showLb(+b.dataset.i); });
  document.getElementById('lbClose').addEventListener('click', function () { lb.close(); });
  document.getElementById('lbPrev').addEventListener('click', function () { showLb(lbI - 1); });
  document.getElementById('lbNext').addEventListener('click', function () { showLb(lbI + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') showLb(lbI + 1); if (e.key === 'ArrowLeft') showLb(lbI - 1); });

  /* ---------- reveals ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }) : null;
  function observe(list) { Array.prototype.forEach.call(list, function (el) { if (io) io.observe(el); else el.classList.add('in'); }); }

  /* ---------- counter ---------- */
  function countUp(el) {
    var to = +el.dataset.to; if (RM) { el.textContent = to; return; }
    var t0 = null; function step(t) { if (!t0) t0 = t; var p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }
    el.textContent = '0'; requestAnimationFrame(step);
  }
  var cio = io ? new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } }); }, { threshold: 0.6 }) : null;
  document.querySelectorAll('.count').forEach(function (c) { if (cio) cio.observe(c); });

  /* ---------- dates: countdown + open status (Bali = UTC+8) ---------- */
  function baliNow() { var d = new Date(); return new Date(d.getTime() + (d.getTimezoneOffset() + 480) * 60000); }
  function dates() {
    var L = T[lang], now = baliNow(), open = new Date(2026, 11, 1);
    var days = Math.ceil((open - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 864e5);
    document.getElementById('countdown').textContent = days > 0 ? L.days(days) : L.today;
    var st = document.getElementById('status'), h = now.getHours(), isOpen = days <= 0 && h >= 8 && h < 23;
    st.classList.toggle('open', isOpen);
    st.querySelector('span').textContent = days > 0 ? L.soon : (isOpen ? L.open : L.closed);
  }

  /* ---------- language ---------- */
  function applyLang(l) {
    lang = l; doc.lang = l;
    try { localStorage.setItem('balibu-lang', l); } catch (e) {}
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.lang === l); });
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n'), v = l === 'id' && ID[k] != null ? ID[k] : EN[k];
      if (v == null) return;
      el.innerHTML = v;
      if (el.hasAttribute('data-split')) split(el);
      if (el.classList.contains('sk') || el.querySelector('.mk')) { el.removeAttribute('data-sq'); }
    });
    document.querySelectorAll('.sk').forEach(function (a) { if (!a.querySelector('.sq')) a.removeAttribute('data-sq'); });
    sketch();
    renderMenu(); renderSheet(); dates();
    document.querySelectorAll('.story__h .mk').forEach(function (m) { if (m.closest('.in')) m.classList.add('in'); });
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { if (b.dataset.lang !== lang) applyLang(b.dataset.lang); }); });

  /* ---------- nav ---------- */
  var top = document.getElementById('top'), burger = document.querySelector('.burger'), drawer = document.getElementById('drawer');
  function setDrawer(open) {
    burger.setAttribute('aria-expanded', open); drawer.hidden = !open; document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setDrawer(drawer.hidden); });
  drawer.addEventListener('click', function (e) { if (e.target.closest('a')) setDrawer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !drawer.hidden) setDrawer(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 820 && !drawer.hidden) setDrawer(false); });

  /* ---------- form ---------- */
  var form = document.getElementById('bookForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var F = form.elements, n = F.namedItem('name').value.trim().slice(0, 60), p = F.namedItem('phone').value.replace(/[^\d+]/g, ''), d = F.namedItem('date').value, g = F.namedItem('guests').value;
    var err = document.getElementById('bookErr'), ok = document.getElementById('bookOk');
    if (!n || p.replace(/\D/g, '').length < 8 || !d || d < '2026-12-01') { err.textContent = T[lang].err; err.hidden = false; ok.hidden = true; return; }
    err.hidden = true;
    var dd = new Date(d + 'T12:00:00').toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long' });
    ok.innerHTML = T[lang].ok(esc(n), esc(dd), esc(g)); ok.hidden = false;
    form.querySelector('button[type=submit]').disabled = true;
  });

  /* ---------- parallax + header ---------- */
  var par = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var mx = 0, my = 0, ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight;
    top.classList.toggle('small', y > 40);
    if (RM) return;
    par.forEach(function (el) {
      var r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) return;
      var c = (r.top + r.height / 2 - vh / 2), k = +el.dataset.parallax;
      var rot = el.classList.contains('hero__cut') ? (-4 + y * 0.012) : 0;
      el.style.transform = 'translate3d(' + (mx * k * 60) + 'px,' + (-c * k + my * k * 40) + 'px,0) rotate(' + rot + 'deg)';
    });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    window.addEventListener('pointermove', function (e) { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; req(); }, { passive: true });
  }

  /* ---------- boot ---------- */
  applyLang(lang);
  document.querySelectorAll('[data-split]').forEach(function (el) { if (!el.querySelector('.w')) split(el); });
  observe(document.querySelectorAll('.rv,.rule--grow,[data-split]:not(.hero__h),.combo__price,.story__h'));
  requestAnimationFrame(function () { setTimeout(function () {
    document.querySelectorAll('.hero [data-split], .top .rule--grow').forEach(function (el) { el.classList.add('in'); });
  }, 80); });
  frame();
})();
