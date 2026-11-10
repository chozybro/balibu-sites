/* s06 — Deals Board. Vanilla JS: i18n, ticker, board accordion, row slide-ins, weekday deals, flip countdown, lightbox, form stub. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var M = window.BALIBU_MENU;
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  var T = {
    en: {
      skip: 'Skip to the board', nav_board: 'The Board', nav_deals: 'Deals', nav_combo: 'Combo', nav_open: 'Opening', nav_find: 'Find us',
      tagline: 'Burgers · Coffee · Ubud', hero_1: "What's on", hero_2: 'the board', hero_3: 'today',
      hero_p: 'Burgers smashed to order, Kintamani coffee and house cocktails. Jl. Sugriwa No. 60, Ubud · daily 08 – 23.',
      cta_board: 'See the board', cta_find: 'Find us', daily: 'DAILY', hh_name: 'Happy hour', hh_desc: '2 for 1 house cocktails, 17 – 19',
      open_name: 'Opening night', open_desc: 'First 100 guests: free Es Kopi Susu Aren', free: 'FREE',
      about_h: 'House rules', about_x: 'Food, friends & a good evening.',
      r1: 'Smashed to order', r1p: 'Beef patties hit a hot griddle the minute you order. Brioche from our own oven.',
      r2: 'Kintamani coffee', r2p: 'Arabica from the Kintamani highlands, roasted in Bali. Kopi tubruk the local way, or a flat white.',
      r3: 'Louder after five', r3p: 'House cocktails with arak and passion fruit. Two for one, 17:00 – 19:00.',
      r4: 'Open every day', r4p: '08:00 – 23:00. Breakfast coffee to the last round.', about_cap: 'Jl. Sugriwa 60 · Ubud',
      board_h: 'The Board', board_sub: '{s} sections · {n} plates & pours · prices in K', open_all: 'Open all', close_all: 'Close all', items: 'items',
      footnote: 'Prices in thousands of rupiah (K). Subject to 15% tax & service.',
      deals_h: '7 days<br>of deals', deals_today: 'Today in Ubud is', deals_note: 'Deals run from opening day, 1 December.', today: 'Today',
      open_kick: 'Opening night · 1 December 2026', open_h: 'Doors open<br>in', u_d: 'days', u_h: 'hours', u_m: 'min', u_s: 'sec',
      open_done: "We're open. Come say hi!", free_p: 'first guests get a free Es Kopi Susu Aren',
      combo_h: 'Smash<br>combo', combo_kick: 'Every day · dine in or take away', c2n: 'Hand-cut fries', c3n: 'Iced lemon tea',
      all3: 'All three for', instead: 'Instead of 165K', save: 'Save 40K', combo_cta: 'Ask on WhatsApp',
      happy_kick: 'Happy hour · every day', happy_p: 'Two for one on house cocktails, every day 17:00 – 19:00.', x2: '2 for',
      hh_on: 'On now · pours until 19:00', hh_next: 'Next round in {h} h {m} min',
      wall_h: 'On the wall', wall_x: 'Tap a photo to open it.',
      g1: 'The table you want to be at.', g2: 'Shaken, not rushed.', g3: 'Late bite.', g4: 'Ten minutes from the rice fields.', g5: 'After five.', g6: 'Stacked tall.',
      find_h: 'Find us', wa: 'WhatsApp +62 821-4248-077', hours: 'Daily 08:00 – 23:00',
      book_h: 'Reserve a table', b_name: 'Name', b_contact: 'WhatsApp or email', b_date: 'Date', b_guests: 'Guests', b_btn: 'Hold my table',
      b_err: 'Please add your name, a contact and a date.', b_err2: 'Enter a valid WhatsApp number or email.', b_err3: 'Pick a date from 1 December 2026.', b_ok: 'Thanks, {name}! Table for {n} on {d} noted. We will confirm on WhatsApp.',
      tick: ['Open 1 Dec', 'Happy hour 17 – 19', 'Smashed to order', 'Kintamani coffee', 'Smash combo 125K', 'Jl. Sugriwa No. 60', '@balibu.bar', 'Daily 08 – 23'],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], dshort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    },
    id: {
      skip: 'Langsung ke menu', nav_board: 'Menu', nav_deals: 'Promo', nav_combo: 'Kombo', nav_open: 'Pembukaan', nav_find: 'Lokasi',
      tagline: 'Burger · Kopi · Ubud', hero_1: 'Ada apa', hero_2: 'di papan', hero_3: 'hari ini',
      hero_p: 'Burger smash fresh, kopi Kintamani dan koktail rumah. Jl. Sugriwa No. 60, Ubud · setiap hari 08 – 23.',
      cta_board: 'Lihat menu', cta_find: 'Cari kami', daily: 'SETIAP HARI', hh_name: 'Happy hour', hh_desc: 'Beli 1 gratis 1 koktail rumah, 17 – 19',
      open_name: 'Malam pembukaan', open_desc: '100 tamu pertama: Es Kopi Susu Aren gratis', free: 'GRATIS',
      about_h: 'Aturan rumah', about_x: 'Makanan enak, teman baik, malam yang asyik.',
      r1: 'Di-smash saat dipesan', r1p: 'Patty daging langsung masuk griddle panas begitu kamu pesan. Brioche dari oven sendiri.',
      r2: 'Kopi Kintamani', r2p: 'Arabika dari dataran tinggi Kintamani, disangrai di Bali. Kopi tubruk ala lokal, atau flat white.',
      r3: 'Makin seru setelah jam lima', r3p: 'Koktail rumah dengan arak dan markisa. Beli 1 gratis 1, 17.00 – 19.00.',
      r4: 'Buka setiap hari', r4p: '08.00 – 23.00. Dari kopi pagi sampai ronde terakhir.', about_cap: 'Jl. Sugriwa 60 · Ubud',
      board_h: 'Papan Menu', board_sub: '{s} bagian · {n} menu · harga dalam K', open_all: 'Buka semua', close_all: 'Tutup semua', items: 'menu',
      footnote: 'Harga dalam ribuan rupiah (K), belum termasuk pajak & layanan 15%.',
      deals_h: '7 hari<br>7 promo', deals_today: 'Hari ini di Ubud:', deals_note: 'Promo berlaku mulai hari pembukaan, 1 Desember.', today: 'Hari ini',
      open_kick: 'Malam pembukaan · 1 Desember 2026', open_h: 'Kami buka<br>dalam', u_d: 'hari', u_h: 'jam', u_m: 'menit', u_s: 'detik',
      open_done: 'Kami sudah buka. Mampir yuk!', free_p: 'tamu pertama dapat Es Kopi Susu Aren gratis',
      combo_h: 'Smash<br>combo', combo_kick: 'Setiap hari · makan di sini atau bawa pulang', c2n: 'Kentang goreng', c3n: 'Es teh lemon',
      all3: 'Ketiganya cuma', instead: 'Bukan 165K', save: 'Hemat 40K', combo_cta: 'Tanya via WhatsApp',
      happy_kick: 'Happy hour · setiap hari', happy_p: 'Beli satu gratis satu koktail rumah, setiap hari 17.00 – 19.00.', x2: '2 cuma',
      hh_on: 'Sedang berlangsung · sampai 19.00', hh_next: 'Ronde berikutnya {h} j {m} mnt lagi',
      wall_h: 'Di dinding', wall_x: 'Ketuk foto untuk membuka.',
      g1: 'Meja yang paling seru.', g2: 'Dikocok, tanpa buru-buru.', g3: 'Camilan malam.', g4: 'Sepuluh menit dari sawah.', g5: 'Setelah jam lima.', g6: 'Ditumpuk tinggi.',
      find_h: 'Lokasi', wa: 'WhatsApp +62 821-4248-077', hours: 'Setiap hari 08.00 – 23.00',
      book_h: 'Pesan meja', b_name: 'Nama', b_contact: 'WhatsApp atau email', b_date: 'Tanggal', b_guests: 'Tamu', b_btn: 'Pesan mejaku',
      b_err: 'Isi nama, kontak dan tanggal ya.', b_err2: 'Isi nomor WhatsApp atau email yang valid.', b_err3: 'Pilih tanggal mulai 1 Desember 2026.', b_ok: 'Terima kasih, {name}! Meja untuk {n} pada {d} sudah dicatat. Kami konfirmasi via WhatsApp.',
      tick: ['Buka 1 Des', 'Happy hour 17 – 19', 'Di-smash saat dipesan', 'Kopi Kintamani', 'Smash combo 125K', 'Jl. Sugriwa No. 60', '@balibu.bar', 'Setiap hari 08 – 23'],
      days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'], dshort: ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']
    }
  };
  var NOTES_ID = { burgers: 'Daging di-smash saat dipesan, brioche dari oven kami.', bites: 'Untuk berbagi. Atau tidak.', plates: 'Klasik Ubud dan beberapa dari perjalanan.', coffee: 'Arabika Kintamani, disangrai di Bali.', cocktails: 'Happy hour 17.00–19.00: beli satu gratis satu koktail rumah.' };
  var TAGS_ID = { 'signature': 'andalan', 'local twist': 'sentuhan lokal', 'veg': 'vegetarian', 'big': 'besar', 'local': 'lokal', 'classic': 'klasik', 'brunch': 'brunch', 'favourite': 'favorit' };
  /* weekday index: 0 = Sunday (JS getDay) */
  var DEALS = [
    { d: 0, en: ['Family Plates', 'Two plates + two fresh drinks for the table'], id: ['Family Plates', 'Dua hidangan + dua minuman segar untuk satu meja'], p: '140K', img: 'nasi-goreng', w: 1400, h: 933 },
    { d: 1, en: ['Smash Monday', 'Balibu Smash + hand-cut fries'], id: ['Smash Monday', 'Balibu Smash + kentang goreng'], p: '95K', img: 'smash-burger', w: 1400, h: 935 },
    { d: 2, en: ['Wing Night', '12 wings, two sauces'], id: ['Wing Night', '12 sayap ayam, dua saus'], p: '120K', img: 'wings', w: 1400, h: 933 },
    { d: 3, en: ['Kopi Day', 'Any coffee + a brownie'], id: ['Kopi Day', 'Kopi apa saja + brownie'], p: '60K', img: 'flat-white', w: 1200, h: 1600 },
    { d: 4, en: ['Twin Burgers', 'Two classics, one price'], id: ['Twin Burgers', 'Dua burger klasik, satu harga'], p: '150K', img: 'classic-burger', w: 1600, h: 1064 },
    { d: 5, en: ['Happy Hour XL', '2 for 1 house cocktails until 20:00'], id: ['Happy Hour XL', 'Beli 1 gratis 1 koktail rumah sampai 20.00'], p: '17–20', img: 'spritz', w: 1067, h: 1600 },
    { d: 6, en: ['Brunch Club', 'Fluffy pancakes + flat white until noon'], id: ['Brunch Club', 'Pancake + flat white sampai jam 12'], p: '95K', img: 'pancakes', w: 1400, h: 978 }
  ];
  var ORDER = [1, 2, 3, 4, 5, 6, 0];

  var lang = 'en';
  try { lang = localStorage.getItem('balibu-lang') === 'id' ? 'id' : 'en'; } catch (e) { /* storage blocked */ }
  function t(k) { var v = T[lang][k]; return v === undefined ? T.en[k] : v; }
  function bali() { var d = new Date(); return new Date(d.getTime() + (d.getTimezoneOffset() + 480) * 60000); }
  var todayIdx = bali().getDay();
  var selDay = todayIdx;
  var openSecs = {}; if (M) openSecs[M.sections[0].id] = true;

  function applyText() {
    doc.lang = lang;
    $$('[data-i18n]').forEach(function (el) { var v = t(el.getAttribute('data-i18n')); if (typeof v === 'string') el.textContent = v; });
    $$('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    var cnt = M.sections.reduce(function (n, x) { return n + x.items.length; }, 0);
    $('#boardSubT').textContent = t('board_sub').replace('{s}', M.sections.length).replace('{n}', cnt);
    var items = {}; M.sections.forEach(function (s) { s.items.forEach(function (it) { items[it.id] = it; }); });
    $$('[data-item]').forEach(function (el) { var it = items[el.getAttribute('data-item')]; if (it) el.textContent = lang === 'id' ? it.ingredients_id : it.ingredients_en; });
  }

  /* ---------- ticker ---------- */
  function renderTicker() {
    var g = t('tick').map(function (w) { return '<span>' + esc(w) + '<i aria-hidden="true">✦</i></span>'; }).join('');
    $('#tickerTrack').innerHTML = g + g;
  }

  /* ---------- board ---------- */
  var chev = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 5l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.6"/></svg>';
  function renderBoard() {
    var n = 0, html = '';
    M.sections.forEach(function (s, si) {
      var open = !!openSecs[s.id];
      var title = lang === 'id' ? s.title_id : s.title_en;
      var note = lang === 'id' ? (NOTES_ID[s.id] || '') : (s.note_en || '');
      html += '<div class="sec" id="sec-' + s.id + '"><button type="button" class="sec-band" aria-expanded="' + open + '" aria-controls="rows-' + s.id + '">' +
        '<span class="sn">SEC ' + (si < 9 ? '0' : '') + (si + 1) + '</span><span class="st">' + esc(title) + '</span><span class="sx">' + esc(note) + '</span>' +
        '<span class="sc">' + s.items.length + ' ' + esc(t('items')) + '</span><span class="chev">' + chev + '</span></button>' +
        '<ol class="rows" id="rows-' + s.id + '"' + (open ? '' : ' hidden') + '>';
      s.items.forEach(function (it) {
        n++;
        var tag = it.tag ? '<span class="tag">' + esc(lang === 'id' ? (TAGS_ID[it.tag] || it.tag) : it.tag) + '</span>' : '';
        html += '<li class="row si"><span class="row-n">' + (n < 10 ? '0' : '') + n + '</span>' +
          '<div class="row-b"><h3>' + esc(it.name) + tag + '</h3><p>' + esc(lang === 'id' ? it.ingredients_id : it.ingredients_en) + '</p></div>' +
          '<span class="pb pb-d">' + it.price + 'K</span>' +
          '<img class="row-ph" src="../shared/img/t/' + esc(it.photo) + '.jpg" alt="' + esc(it.name) + '" width="78" height="78" loading="lazy" decoding="async"></li>';
      });
      html += '</ol></div>';
    });
    $('#boardBody').innerHTML = html;
    observeRows($$('#boardBody .rows:not([hidden]) .row'));
    syncOpenAll();
  }
  function syncOpenAll() {
    var all = M.sections.every(function (s) { return openSecs[s.id]; });
    $('#openAll').textContent = t(all ? 'close_all' : 'open_all');
  }
  function toggleSec(id, open) {
    openSecs[id] = open;
    var b = $('#sec-' + id + ' .sec-band'), list = $('#rows-' + id);
    b.setAttribute('aria-expanded', open); list.hidden = !open;
    if (open) {
      var rows = $$('.row', list);
      rows.forEach(function (r, i) { r.classList.remove('in'); r.style.setProperty('--d', Math.min(i * 60, 360) + 'ms'); });
      observeRows(rows);
    }
    syncOpenAll();
  }
  $('#boardBody').addEventListener('click', function (e) {
    var b = e.target.closest('.sec-band'); if (!b) return;
    var id = b.getAttribute('aria-controls').slice(5);
    var open = b.getAttribute('aria-expanded') !== 'true';
    toggleSec(id, open);
    if (!open) { var sec = $('#sec-' + id); if (sec.getBoundingClientRect().top < 0) sec.scrollIntoView({ block: 'start' }); }
  });
  $('#openAll').addEventListener('click', function () {
    var all = M.sections.every(function (s) { return openSecs[s.id]; });
    M.sections.forEach(function (s) { toggleSec(s.id, !all); });
  });

  /* ---------- reveals ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.1 }) : null;
  function observeRows(list) {
    list.forEach(function (r, i) {
      if (!r.style.getPropertyValue('--d')) r.style.setProperty('--d', (i % 6) * 50 + 'ms');
      if (io) io.observe(r); else r.classList.add('in');
    });
  }
  $$('.row-in').forEach(function (el, i) { el.style.setProperty('--d', (i % 4) * 80 + 'ms'); });
  observeRows($$('.row-in'));
  observeRows($$('#comboRows .row'));
  var cr = $('#comboRows');
  if (io) { var io3 = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { cr.classList.add('in'); io3.disconnect(); } }, { threshold: 0.5 }); io3.observe(cr); } else cr.classList.add('in');

  /* ---------- 7 days ---------- */
  function dealFor(d) { for (var i = 0; i < DEALS.length; i++) if (DEALS[i].d === d) return DEALS[i]; }
  function renderWeek() {
    var w = $('#week'), html = '<span class="week-ind" id="weekInd" aria-hidden="true"></span>';
    ORDER.forEach(function (d) {
      var x = dealFor(d), sel = d === selDay;
      html += '<button type="button" class="day" role="tab" id="day-' + d + '" aria-controls="deal" aria-selected="' + sel + '" tabindex="' + (sel ? 0 : -1) + '">' +
        (d === todayIdx ? '<span class="tt">' + esc(t('today')) + '</span>' : '') +
        '<span class="dn">' + esc(t('dshort')[d]) + '</span><span class="dd">' + esc(x[lang][0]) + '</span><span class="dp">' + esc(x.p) + '</span></button>';
    });
    w.innerHTML = html;
    showDeal(selDay, false);
  }
  function showDeal(d, anim) {
    selDay = d;
    var x = dealFor(d), pos = ORDER.indexOf(d);
    $$('#week .day').forEach(function (b) { var on = b.id === 'day-' + d; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    $('#weekInd').style.transform = 'translateX(' + (pos * 100) + '%)';
    var img = $('#dealImg');
    img.src = '../shared/img/' + x.img + '.jpg'; img.width = x.w; img.height = x.h; img.alt = x[lang][0];
    $('#dealDay').textContent = t('days')[d].toUpperCase() + (d === todayIdx ? ' · ' + t('today').toUpperCase() : '');
    $('#dealName').textContent = x[lang][0];
    $('#dealDesc').textContent = x[lang][1];
    $('#dealPrice').textContent = x.p;
    $('#deal').setAttribute('aria-labelledby', 'day-' + d);
    if (anim) { var el = $('#deal'); el.classList.remove('sw'); void el.offsetWidth; el.classList.add('sw'); }
  }
  $('#week').addEventListener('click', function (e) { var b = e.target.closest('.day'); if (b) showDeal(Number(b.id.slice(4)), true); });
  $('#week').addEventListener('keydown', function (e) {
    var i = ORDER.indexOf(selDay), n = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: 6 }[e.key];
    if (n === undefined) return; e.preventDefault(); n = (n + 7) % 7;
    showDeal(ORDER[n], true); $('#day-' + ORDER[n]).focus();
  });
  function renderHero() {
    var x = dealFor(todayIdx);
    $('#heroDay').textContent = t('dshort')[todayIdx];
    $('#heroDeal').textContent = x[lang][0];
    $('#heroDesc').textContent = x[lang][1];
    $('#heroPrice').textContent = x.p;
    $('#todayName').textContent = t('days')[todayIdx];
  }

  /* ---------- happy hour list + status ---------- */
  function renderHappy() {
    var cock = M.sections.filter(function (s) { return s.id === 'cocktails'; })[0];
    $('#happyList').innerHTML = cock.items.map(function (it) {
      return '<li><span><b>' + esc(it.name) + '</b><small>' + esc(lang === 'id' ? it.ingredients_id : it.ingredients_en) + '</small></span><span class="x2">' + esc(t('x2')) + '</span><span class="pb pb-r">' + it.price + 'K</span></li>';
    }).join('');
  }
  function happyStatus() {
    var el = $('#hhStatus'), n = bali(), mins = n.getHours() * 60 + n.getMinutes();
    if (mins >= 1020 && mins < 1140) { el.textContent = t('hh_on'); el.classList.add('on'); return; }
    el.classList.remove('on');
    var left = (1020 - mins + 1440) % 1440;
    el.textContent = t('hh_next').replace('{h}', Math.floor(left / 60)).replace('{m}', left % 60);
  }

  /* ---------- hours table ---------- */
  function renderHours() {
    $('#hoursBody').innerHTML = ORDER.map(function (d) {
      var x = dealFor(d);
      return '<tr' + (d === todayIdx ? ' class="today"' : '') + '><td>' + esc(t('dshort')[d]) + '</td><td>' + esc(x[lang][0]) + ' · ' + esc(x.p) + '</td><td>08:00 – 23:00</td></tr>';
    }).join('');
  }

  /* ---------- flip countdown ---------- */
  var OPEN = Date.UTC(2026, 10, 30, 16, 0, 0); /* 1 Dec 2026 00:00 Asia/Makassar (UTC+8) */
  var last = {};
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function setFlip(id, v) {
    var el = $('#' + id);
    if (last[id] === v) return;
    if (last[id] === undefined || RM) { el.textContent = v; last[id] = v; return; }
    last[id] = v;
    el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip');
    setTimeout(function () { el.textContent = v; }, 190);
  }
  function countdown() {
    var ms = OPEN - Date.now();
    if (ms <= 0) { $('#flips').hidden = true; $('#openDone').hidden = false; return false; }
    var s = Math.floor(ms / 1000);
    setFlip('f-d', pad(Math.floor(s / 86400))); setFlip('f-h', pad(Math.floor(s % 86400 / 3600)));
    setFlip('f-m', pad(Math.floor(s % 3600 / 60))); setFlip('f-s', pad(s % 60));
    return true;
  }

  /* ---------- lightbox ---------- */
  var lb = $('#lb');
  $('#wall').addEventListener('click', function (e) {
    var b = e.target.closest('.pic'); if (!b) return;
    var im = b.querySelector('img');
    $('#lbImg').src = im.src; $('#lbImg').alt = im.alt; $('#lbCap').textContent = b.querySelector('.pic-n').textContent + ' · ' + t(b.getAttribute('data-cap'));
    if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
  });
  $('#lbX').addEventListener('click', function () { lb.close ? lb.close() : lb.removeAttribute('open'); });
  lb.addEventListener('click', function (e) { if (e.target === lb && lb.close) lb.close(); });

  /* ---------- booking stub (never submits) ---------- */
  var book = $('#book');
  book.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = book.elements, msg = $('#bookMsg');
    var name = f.name.value.trim(), contact = f.contact.value.trim(), date = f.date.value;
    function bad(k) { msg.className = 'book-msg err'; msg.textContent = t(k); }
    if (!name || !contact || !date) { bad('b_err'); return; }
    var digits = contact.replace(/[\s().-]/g, '');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact) && !/^\+?\d{8,15}$/.test(digits)) { bad('b_err2'); return; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < '2026-12-01') { bad('b_err3'); return; }
    var dd = date.split('-');
    msg.className = 'book-msg ok';
    msg.textContent = t('b_ok').replace('{name}', name.slice(0, 40)).replace('{n}', f.guests.value).replace('{d}', dd[2] + '.' + dd[1] + '.' + dd[0]);
    book.reset();
  });

  /* ---------- header shrink, nav ---------- */
  var hdr = $('#hdr'), nav = $('#nav'), burger = $('#burger');
  function setNav(open) {
    doc.style.setProperty('--navtop', hdr.getBoundingClientRect().bottom + 'px');
    nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-open', open);
  }
  burger.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { setNav(false); burger.focus(); } });
  var tk = false;
  window.addEventListener('scroll', function () {
    if (tk) return; tk = true;
    requestAnimationFrame(function () { hdr.classList.toggle('sm', (window.scrollY || window.pageYOffset) > 60); tk = false; });
  }, { passive: true });

  /* ---------- language ---------- */
  function setLang(l) {
    lang = l;
    try { localStorage.setItem('balibu-lang', l); } catch (e) { /* ignore */ }
    applyText(); renderTicker(); renderBoard(); renderWeek(); renderHero(); renderHappy(); renderHours(); happyStatus();
    var m = $('#bookMsg'); m.textContent = ''; m.className = 'book-msg';
  }
  $('#lang').addEventListener('click', function () { setLang(lang === 'en' ? 'id' : 'en'); });

  setLang(lang);
  if (countdown()) { var timer = setInterval(function () { if (!countdown()) clearInterval(timer); }, 1000); }
  setInterval(happyStatus, 30000);
})();
