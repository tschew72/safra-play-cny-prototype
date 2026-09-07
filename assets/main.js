/* SAFRA Play — CNY Year of the Goat · prototype interactions */
(function () {
  /* ---------- SVG motif library (paper-cut style) ---------- */
  const SPRITE = `
  <svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
    <symbol id="seal-goat" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="22" fill="#C13A2A"/>
      <circle cx="24" cy="24" r="18.5" fill="none" stroke="#F3D9A8" stroke-width="1.4"/>
      <text x="24" y="31" text-anchor="middle" font-size="20" fill="#FAF0D8"
        font-family="'Noto Serif SC', Georgia, serif" font-weight="700">羊</text>
    </symbol>
    <symbol id="goat" viewBox="0 0 110 100">
      <g>
        <ellipse cx="62" cy="56" rx="30" ry="20"/>
        <path d="M44 50 C40 36 36 30 30 26 L40 20 C46 26 50 36 52 50 Z"/>
        <ellipse cx="27" cy="23" rx="12" ry="9" transform="rotate(-14 27 23)"/>
        <ellipse cx="16" cy="27" rx="6" ry="4.6"/>
        <path d="M34 15 L43 11 L37 21 Z"/>
        <path d="M29 14 C25 1 38 -5 49 2 C40 2 33 6 34 15 Z"/>
        <path d="M36 15 C34 4 45 -1 53 5 C46 5 40 9 40 15 Z"/>
        <path d="M21 32 L25 44 L30 32 Z"/>
        <rect x="44" y="70" width="7" height="26" rx="3"/>
        <rect x="56" y="72" width="7" height="26" rx="3"/>
        <rect x="72" y="72" width="7" height="26" rx="3"/>
        <rect x="84" y="70" width="7" height="26" rx="3"/>
        <path d="M90 46 L103 40 L94 55 Z"/>
      </g>
    </symbol>
    <symbol id="cloud" viewBox="0 0 72 34">
      <circle cx="20" cy="20" r="12"/><circle cx="37" cy="15" r="15"/><circle cx="54" cy="21" r="10"/>
      <rect x="8" y="22" width="56" height="10" rx="5"/>
    </symbol>
    <symbol id="blossom" viewBox="0 0 48 48">
      <g fill="currentColor">
        <circle cx="24" cy="12" r="8"/><circle cx="35.5" cy="20.3" r="8"/><circle cx="31.1" cy="32.6" r="8"/>
        <circle cx="16.9" cy="32.6" r="8"/><circle cx="12.5" cy="20.3" r="8"/>
      </g>
      <circle cx="24" cy="24" r="4.5" fill="#C9A24B"/>
    </symbol>
    <symbol id="lantern" viewBox="0 0 60 80">
      <rect x="22" y="2" width="16" height="7" rx="2" fill="#C9A24B"/>
      <ellipse cx="30" cy="30" rx="21" ry="24" fill="currentColor"/>
      <path d="M30 6 C20 14 20 46 30 54 M30 6 C40 14 40 46 30 54" stroke="#F3D9A8" stroke-width="1.4" fill="none"/>
      <rect x="21" y="51" width="18" height="7" rx="2" fill="#C9A24B"/>
      <line x1="30" y1="58" x2="30" y2="70" stroke="#C9A24B" stroke-width="2"/>
      <path d="M26 70 L34 70 L30 78 Z" fill="#C9A24B"/>
    </symbol>
    <symbol id="ic-goat" viewBox="0 0 110 100"><use href="#goat"/></symbol>
    <symbol id="ic-blossom" viewBox="0 0 48 48"><use href="#blossom"/></symbol>
    <symbol id="ic-lantern" viewBox="0 0 60 80"><use href="#lantern"/></symbol>
    <symbol id="ic-cloud" viewBox="0 0 72 34"><use href="#cloud"/></symbol>
    <symbol id="ic-fan" viewBox="0 0 64 48">
      <path d="M32 44 L6 16 A30 30 0 0 1 58 16 Z" fill="currentColor"/>
      <path d="M32 44 L16 12 M32 44 L32 9 M32 44 L48 12" stroke="#FAF4E8" stroke-width="1.6"/>
      <circle cx="32" cy="44" r="3.4" fill="#C9A24B"/>
    </symbol>
    <symbol id="ic-ingot" viewBox="0 0 64 44">
      <path d="M8 26 C8 14 20 8 32 8 C44 8 56 14 56 26 L50 34 C50 38 42 40 32 40 C22 40 14 38 14 34 Z" fill="currentColor"/>
      <ellipse cx="32" cy="15" rx="9" ry="5" fill="#FAF4E8" opacity=".55"/>
    </symbol>
    <symbol id="ic-cracker" viewBox="0 0 48 64">
      <rect x="14" y="16" width="20" height="40" rx="6" fill="currentColor"/>
      <rect x="14" y="26" width="20" height="5" fill="#C9A24B"/>
      <rect x="14" y="40" width="20" height="5" fill="#C9A24B"/>
      <path d="M24 16 C24 8 30 8 32 3" stroke="#C9A24B" stroke-width="2.4" fill="none"/>
      <circle cx="33" cy="3" r="2.4" fill="#C9A24B"/>
    </symbol>
    <symbol id="ic-orange" viewBox="0 0 56 60">
      <circle cx="28" cy="36" r="20" fill="currentColor"/>
      <path d="M28 16 C30 8 38 6 44 8 C40 14 34 17 28 16 Z" fill="#4E7E62"/>
      <rect x="26" y="12" width="4" height="7" rx="2" fill="#7A5A33"/>
    </symbol>
  </svg>`;
  document.body.insertAdjacentHTML('afterbegin', SPRITE);

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Countdown ---------- */
  const cd = $('[data-countdown]');
  if (cd) {
    const target = new Date(cd.dataset.countdown).getTime();
    const tick = () => {
      let d = Math.max(0, target - Date.now());
      const days = Math.floor(d / 864e5); d -= days * 864e5;
      const hrs = Math.floor(d / 36e5); d -= hrs * 36e5;
      const min = Math.floor(d / 6e4); d -= min * 6e4;
      const sec = Math.floor(d / 1e3);
      const set = (k, v) => { const el = $(`[data-cd="${k}"]`); if (el) el.textContent = String(v).padStart(2, '0'); };
      set('d', days); set('h', hrs); set('m', min); set('s', sec);
    };
    tick(); setInterval(tick, 1000);
  }

  /* ---------- Accordion ---------- */
  $$('.acc-q').forEach((btn) => btn.addEventListener('click', () => {
    const item = btn.closest('.acc-item');
    const wasOpen = item.classList.contains('open');
    $$('.acc-item.open').forEach((i) => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  }));

  /* ---------- Tabs (cosmetic filter) ---------- */
  $$('.tab').forEach((t) => t.addEventListener('click', () => {
    $$('.tab').forEach((x) => x.classList.remove('active'));
    t.classList.add('active');
    const f = t.dataset.filter;
    if (f) $$('[data-state]').forEach((c) => {
      c.style.display = (f === 'all' || c.dataset.state === f) ? '' : 'none';
    });
  }));

  /* ---------- Join campaign state ---------- */
  const joinBtn = $('[data-join]');
  if (joinBtn) joinBtn.addEventListener('click', () => {
    localStorage.setItem('spcny.joined', 'yes');
    location.href = 'campaign-joined.html';
  });

  /* ---------- Wave page: reflect briefing completion ---------- */
  if (document.body.dataset.page === 'wave' && localStorage.getItem('spcny.briefing1') === 'done') {
    const b = $('[data-briefing]');
    if (b) {
      b.querySelector('[data-brief-tag]').outerHTML = '<span class="tag tag-jade">1 of 1 cleared</span>';
      const btn = b.querySelector('[data-brief-btn]');
      btn.textContent = 'Review Briefing';
    }
    const lock = $('[data-game="memory"]');
    if (lock) {
      lock.querySelector('.btn-locked').outerHTML =
        '<a class="btn btn-primary btn-block" href="game-intro.html">Play ▸</a>';
    }
    const gl = $('[data-games-title]');
    if (gl) gl.textContent = 'Games';
  }

  /* ---------- Sign-in fake flow ---------- */
  const sendBtn = $('[data-send-code]');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const email = $('#email');
      if (!email.value || !email.value.includes('@')) { email.focus(); email.style.borderColor = 'var(--vermilion)'; return; }
      $('#step-email').style.display = 'none';
      $('#step-otp').style.display = '';
      $('.otp-row input').focus();
    });
    $$('.otp-row input').forEach((inp, i, all) => {
      inp.addEventListener('input', () => {
        inp.value = inp.value.replace(/\D/g, '').slice(0, 1);
        if (inp.value && all[i + 1]) all[i + 1].focus();
      });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !inp.value && all[i - 1]) all[i - 1].focus();
      });
    });
    $('[data-verify]').addEventListener('click', () => { location.href = 'index.html'; });
  }

  /* ---------- Quiz engine ---------- */
  const quizStage = $('[data-quiz]');
  if (quizStage) {
    const QS = [
      { text: 'Singapore celebrates National Day on 9 August.', answer: true },
      { text: 'National Service is only for the Army.', answer: false },
      { text: 'Full-time National Service lasts about two years.', answer: true },
    ];
    let qi = 0, locked = false;
    const qText = $('.q-text'), qFlag = $('[data-qflag]');
    const dots = $$('.q-dots i');
    const renderDots = () => dots.forEach((d, i) => {
      d.className = i < qi ? 'done' : i === qi ? 'now' : '';
    });
    $$('.answer-btn').forEach((btn) => btn.addEventListener('click', () => {
      if (locked) return; locked = true;
      const pick = btn.dataset.answer === 'true';
      const ok = pick === QS[qi].answer;
      btn.classList.add(ok ? 'correct' : 'wrong');
      setTimeout(() => {
        btn.classList.remove('correct', 'wrong');
        qi++;
        if (qi >= QS.length) {
          localStorage.setItem('spcny.briefing1', 'done');
          quizStage.innerHTML = `
            <div class="card card-lift" style="padding:56px">
              <div style="margin-bottom:14px"><svg width="72" height="72" viewBox="0 0 48 48"><use href="#blossom" style="color:#C13A2A"/></svg></div>
              <h2 class="display h-md">Briefing Complete</h2>
              <p class="sub" style="margin:12px 0 6px">3 / 3 correct — this wave's games are now unlocked.</p>
              <p class="num" style="font-size:34px">+ 300 XP</p>
              <div style="margin-top:26px"><a class="btn btn-primary" href="wave-1.html">Back to Wave 1 ▸</a></div>
            </div>`;
          return;
        }
        qText.textContent = QS[qi].text;
        qFlag.textContent = `Question ${qi + 1} of ${QS.length}`;
        renderDots(); locked = false;
      }, 650);
    }));
  }

  /* ---------- Story intro slider ---------- */
  const slider = $('[data-slider]');
  if (slider) {
    const SLIDES = [
      { who: 'Lee Jun Hao', quote: '“It\u2019s the start of something bigger.”', scene: 0 },
      { who: 'First morning', quote: '“Everything is new. Even the sunrise feels different.”', scene: 1 },
      { who: 'Learning the ropes', quote: '“Every detail matters. So does every friend.”', scene: 2 },
      { who: 'Ready', quote: '“Wave 1 begins. Match the pairs, calmly.”', scene: 3 },
    ];
    let si = 0;
    const who = $('.story-caption .who'), quote = $('.story-caption .quote'), idx = $('.pager .idx');
    const go = (n) => {
      si = Math.min(SLIDES.length - 1, Math.max(0, n));
      who.textContent = SLIDES[si].who; quote.textContent = SLIDES[si].quote;
      idx.textContent = `${si + 1} / ${SLIDES.length}`;
    };
    $('[data-prev]').addEventListener('click', () => go(si - 1));
    $('[data-next]').addEventListener('click', () => {
      if (si === SLIDES.length - 1) { location.href = 'round-briefing.html'; return; }
      go(si + 1);
    });
  }

  /* ---------- Memory Match game ---------- */
  const board = $('[data-mm]');
  if (board) {
    const ICONS = ['ic-goat', 'ic-blossom', 'ic-lantern', 'ic-cloud', 'ic-fan', 'ic-ingot', 'ic-cracker', 'ic-orange'];
    const FACE_IMG = {
      'ic-goat': new URL('./img/art-face-goat.jpg', import.meta.url).href,
      'ic-blossom': new URL('./img/art-face-blossom.jpg', import.meta.url).href,
    };
    const deck = [...ICONS, ...ICONS].sort(() => Math.random() - 0.5);
    let first = null, moves = 0, pairs = 0, combo = 0, best = 0, score = 0, busy = false;
    const setStat = (k, v) => { $(`[data-stat="${k}"]`).textContent = v; };
    deck.forEach((icon) => {
      const b = document.createElement('button');
      b.className = 'mm-card'; b.dataset.icon = icon;
      const front = FACE_IMG[icon]
        ? `<img class="mm-face-img" src="${FACE_IMG[icon]}" alt=""/>`
        : `<svg width="60" height="60" viewBox="0 0 110 100" preserveAspectRatio="xMidYMid meet"><use href="#${icon}" style="color:#C9A24B"/></svg>`;
      b.innerHTML = `<span class="mm-inner">
          <span class="mm-face mm-back"></span>
          <span class="mm-face mm-front">${front}</span>
        </span>`;
      b.addEventListener('click', () => {
        if (busy || b.classList.contains('flipped') || b.classList.contains('matched')) return;
        b.classList.add('flipped');
        if (!first) { first = b; return; }
        moves++; setStat('moves', moves);
        if (first.dataset.icon === b.dataset.icon) {
          combo++; best = Math.max(best, combo);
          score += 100 * combo;
          pairs++;
          first.classList.add('matched'); b.classList.add('matched');
          setStat('pairs', `${pairs} / 8`); setStat('best', best); setStat('score', `${score} XP`);
          first = null;
          if (pairs === 8) {
            const msg = $('[data-mm-msg]');
            msg.textContent = `Board cleared — ${score} XP earned. 大吉大利!`;
            msg.style.color = 'var(--vermilion)';
          }
        } else {
          combo = 0;
          busy = true;
          const a = first; first = null;
          setTimeout(() => { a.classList.remove('flipped'); b.classList.remove('flipped'); busy = false; }, 700);
        }
      });
      board.appendChild(b);
    });
  }
})();
