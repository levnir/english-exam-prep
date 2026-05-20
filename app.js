// ============================================================
// app.js — Abigail's English Exam Prep
// ============================================================

// ── SECTION DEFINITIONS ──────────────────────────────────────
const SECTIONS = [
  { id: 'listen',   emoji: '👂', title: 'Listen & Mark',    titleHe: 'האזנה',          color: '#E63946', desc: 'Listen to the conversation and answer.',   descHe: 'האזינו לשיחה וענו על השאלה.' },
  { id: 'vocab',    emoji: '📚', title: 'Vocabulary',        titleHe: 'אוצר מילים',     color: '#4ECDC4', desc: 'Match words to pictures and fill sentences.', descHe: 'התאימו מילים לתמונות והשלימו משפטים.' },
  { id: 'sounds',   emoji: '🔡', title: 'Sounds',            titleHe: 'צלילים',         color: '#45B7D1', desc: 'Complete the word with le, er, or ir.',      descHe: 'השלימו את המילה עם le, er, ir.' },
  { id: 'truefalse',emoji: '✅', title: 'True or False',     titleHe: 'נכון / לא נכון', color: '#2D6A4F', desc: 'Is the sentence true or false?',             descHe: 'האם המשפט נכון או לא נכון?' },
  { id: 'reading',  emoji: '📖', title: 'Reading',           titleHe: 'קריאה והבנה',   color: '#6C5CE7', desc: 'Read the passage and answer questions.',     descHe: 'קראו את הקטע וענו על השאלות.' },
  { id: 'writing',  emoji: '🧩', title: 'Fill in the Blanks', titleHe: 'השלמת משפטים',   color: '#E17055', desc: 'Fill in the blanks using the word bank.',    descHe: 'מלאו את החסר ממאגר המילים.' },
  { id: 'time',     emoji: '🕐', title: 'What Time Is It?',  titleHe: 'מה השעה?',       color: '#FDCB6E', desc: 'Look at the clock and write the time.',      descHe: 'הסתכלו על השעון וכתבו את השעה.' },
  { id: 'spelling', emoji: '✏️', title: 'Spelling',          titleHe: 'כתיב',           color: '#A29BFE', desc: 'Look at the picture and write the word.',    descHe: 'הסתכלו בתמונה וכתבו את המילה באנגלית.' },
];

// ── STATE ────────────────────────────────────────────────────
const state = {
  screen: 'home',      // 'home' | 'exercise' | 'result'
  sectionId: null,
  exercises: [],
  idx: 0,
  score: 0,
  answered: false,
  lastResult: null,    // 'correct' | 'close' | 'wrong'
  attempts: 0,         // wrong attempts on current question
  revealed: false,     // true after 3 wrong attempts — correct answer shown
  wrongClicks: [],     // indices of already-tried wrong options (click exercises)
  // writing state (indices into wordBank; locked = correct and permanent)
  writingFilled: null,
  writingLocked: null,
  // progress saved per section
  progress: JSON.parse(localStorage.getItem(CONFIG.storageKey) || '{}'),
};

// ── UTILITIES ────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr, n) {
  return shuffle(arr).slice(0, n);
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

function checkTyped(input, correct) {
  const a = input.trim().toLowerCase();
  const b = correct.trim().toLowerCase();
  if (a === b) return 'correct';
  const dist = levenshtein(a, b);
  if (dist <= (b.length <= 5 ? 1 : 2)) return 'close';
  return 'wrong';
}

function stars(pct) {
  if (pct >= 0.8) return '⭐⭐⭐';
  if (pct >= 0.5) return '⭐⭐';
  return '⭐';
}

function starsCount(pct) {
  if (pct >= 0.8) return 3;
  if (pct >= 0.5) return 2;
  return 1;
}

function saveProgress(sectionId, starCount) {
  const prev = state.progress[sectionId] || 0;
  state.progress[sectionId] = Math.max(prev, starCount);
  localStorage.setItem(CONFIG.storageKey, JSON.stringify(state.progress));
}

function storedStars(sectionId) {
  const n = state.progress[sectionId] || 0;
  return '⭐'.repeat(n) + '☆'.repeat(3 - n);
}

function daysUntilExam() {
  const exam = new Date(CONFIG.examDate);
  const now  = new Date();
  const diff = Math.ceil((exam - now) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

// ── CLOCK SVG ────────────────────────────────────────────────
function clockSVG(h, m) {
  const size = 180, cx = 90, cy = 90, r = 80;
  const toRad = d => (d - 90) * Math.PI / 180;

  const hAngle = ((h % 12) + m / 60) * 30;
  const mAngle = m * 6;

  const hx = cx + r * 0.55 * Math.cos(toRad(hAngle));
  const hy = cy + r * 0.55 * Math.sin(toRad(hAngle));
  const mx = cx + r * 0.78 * Math.cos(toRad(mAngle));
  const my = cy + r * 0.78 * Math.sin(toRad(mAngle));

  let numbers = '';
  for (let i = 1; i <= 12; i++) {
    const a = toRad(i * 30);
    const nx = cx + (r - 18) * Math.cos(a);
    const ny = cy + (r - 18) * Math.sin(a);
    numbers += `<text x="${nx.toFixed(1)}" y="${ny.toFixed(1)}" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="800" font-family="Nunito,sans-serif" fill="#2D6A4F">${i}</text>`;
  }

  // tick marks
  let ticks = '';
  for (let i = 0; i < 12; i++) {
    const a = toRad(i * 30);
    const x1 = (cx + (r - 6) * Math.cos(a)).toFixed(1);
    const y1 = (cy + (r - 6) * Math.sin(a)).toFixed(1);
    const x2 = (cx + r * Math.cos(a)).toFixed(1);
    const y2 = (cy + r * Math.sin(a)).toFixed(1);
    ticks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#95D5B2" stroke-width="2"/>`;
  }

  return `<svg class="clock-svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="white" stroke="#2D6A4F" stroke-width="4"/>
    ${ticks}
    ${numbers}
    <line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#2D6A4F" stroke-width="6" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#F4A261" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="6" fill="#E63946"/>
  </svg>`;
}

// ── SOUND EFFECTS ────────────────────────────────────────────
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return _audioCtx;
}

function playSound(result) {
  try {
    const ctx = getAudioCtx();
    if (result === 'correct') {
      // Two-note ascending chime: E5 → A5
      [659, 880].forEach((freq, i) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.13;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.22, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.start(t);
        osc.stop(t + 0.28);
      });
    } else if (result === 'close') {
      // Single mid tone: A4
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = 440;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } else {
      // Short low buzz: sawtooth at C3
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.value = 180;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.10, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.22);
    }
  } catch (e) { /* audio not supported — fail silently */ }
}

// ── TTS ───────────────────────────────────────────────────────
function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US';
  utt.rate = 0.75;
  // prefer a female English voice if available
  const voices = window.speechSynthesis.getVoices();
  const en = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
          || voices.find(v => v.lang.startsWith('en-'));
  if (en) utt.voice = en;
  window.speechSynthesis.speak(utt);
}

// ── BUILD EXERCISE LISTS ──────────────────────────────────────
function buildExercises(sectionId) {
  switch (sectionId) {
    case 'listen': {
      const conv = pick(DATA.listening, 1)[0];
      return conv.questions.map(q => ({
        type: 'listen',
        speech: conv.speech,
        title: conv.title,
        question: q.q,
        options: q.options,
        answer: q.answer,
      }));
    }

    case 'vocab': {
      const wtp = shuffle(DATA.wordToPicture).slice(0, 3).map(item => ({
        type: 'word-to-picture',
        word: item.word,
        options: shuffle([item.correct, ...item.distractors]),
        correct: item.correct,
      }));
      const sc = shuffle(DATA.sentenceCompletion).slice(0, 4).map(item => ({
        type: 'sentence-type',
        sentence: item.sentence,
        answer: item.answer,
        emoji: item.emoji,
        hint: item.hint,
      }));
      const qa = shuffle(DATA.qaMatching).slice(0, 3).map(item => ({
        type: 'qa-match',
        question: item.question,
        correct: item.correct,
        options: shuffle([item.correct, ...item.wrong.slice(0, 3)]),
      }));
      return shuffle([...wtp, ...sc, ...qa]);
    }

    case 'sounds': {
      const soundList = [...new Set(DATA.sounds.map(s => s.sound))];
      const bySound = Object.fromEntries(soundList.map(s => [s, []]));
      DATA.sounds.forEach(s => bySound[s.sound].push(s));
      let exs = [];
      for (const snd of soundList) {
        const items = shuffle(bySound[snd]).slice(0, 4);
        items.forEach((item, i) => {
          if (i < 2) {
            exs.push({ type: 'sound-choose', ...item,
              options: shuffle([...soundList]) });
          } else {
            exs.push({ type: 'sound-type', ...item });
          }
        });
      }
      return shuffle(exs);
    }

    case 'truefalse':
      return shuffle(DATA.trueFalse).slice(0, 12).map(item => ({
        type: 'truefalse', ...item
      }));

    case 'reading': {
      const passage = pick(DATA.passages, 1)[0];
      return passage.questions.map(q => ({
        type: q.type === 'type' ? 'reading-type' : 'reading-choice',
        passage,
        question: q.q,
        options: q.options || null,
        answer: q.answer,
      }));
    }

    case 'writing':
      return shuffle(DATA.writing).slice(0, 3).map(ex => ({ type: 'writing', ...ex, wordBank: shuffle([...ex.wordBank]) }));

    case 'time':
      return shuffle(DATA.clockTimes).slice(0, 5).map(item => ({
        type: 'time-type', ...item
      }));

    case 'spelling':
      return shuffle(DATA.vocabulary).slice(0, 10).map(item => ({
        type: 'spelling', ...item, answer: item.word
      }));

    default: return [];
  }
}

// ── RENDER ───────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app');
  if (state.screen === 'home')     app.innerHTML = renderHome();
  if (state.screen === 'exercise') app.innerHTML = renderExercise();
  if (state.screen === 'result')   app.innerHTML = renderResult();
  attach();
}

// ── HOME SCREEN ───────────────────────────────────────────────
function renderHome() {
  const days = daysUntilExam();
  const dayWord = days === 1 ? 'day' : 'days';
  const cards = SECTIONS.map(s => `
    <div class="section-card" data-action="start" data-id="${s.id}">
      <div class="card-stripe" style="background:${s.color}"></div>
      <span class="card-emoji">${s.emoji}</span>
      <div class="card-title">${s.title}</div>
      <div class="card-title-he">${s.titleHe}</div>
      <div class="card-stars">${storedStars(s.id)}</div>
    </div>`).join('');

  return `
    <div class="app-header">
      <h1>🌟 ${CONFIG.studentName}'s English Prep!</h1>
      <div class="subtitle">${CONFIG.unit} ${CONFIG.unitEmojis}</div>
      <div class="subtitle-he">${CONFIG.unitHe}</div>
    </div>
    <div class="countdown">📅 ${days} ${dayWord} until the exam — ${CONFIG.examDateDisplay} &nbsp;|&nbsp; ${days} ימים לפני המבדק</div>
    <div class="section-grid">${cards}</div>`;
}

// ── EXERCISE SCREEN ───────────────────────────────────────────
function renderExercise() {
  const ex = state.exercises[state.idx];
  if (!ex) return '';
  const total = state.exercises.length;
  const pct   = (state.idx / total * 100).toFixed(0);
  const sec   = SECTIONS.find(s => s.id === state.sectionId);

  const topbar = `
    <div class="ex-topbar">
      <button class="btn-home" data-action="home">🏠 Home</button>
      <div class="progress-wrap">
        <div class="progress-label">Question ${state.idx + 1} of ${total}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>
    </div>`;

  const instruction = `
    <div class="ex-instruction">
      <div class="en">${sec.emoji} ${sec.desc}</div>
      <div class="he">${sec.descHe}</div>
    </div>`;

  let body = '';
  switch (ex.type) {
    case 'listen':       body = renderListen(ex);      break;
    case 'word-to-picture': body = renderWordToPic(ex); break;
    case 'sentence-type': body = renderSentenceType(ex); break;
    case 'qa-match':     body = renderQAMatch(ex);     break;
    case 'sound-choose': body = renderSoundChoose(ex); break;
    case 'sound-type':   body = renderSoundType(ex);   break;
    case 'truefalse':    body = renderTrueFalse(ex);   break;
    case 'reading-choice': body = renderReadingChoice(ex); break;
    case 'reading-type': body = renderReadingType(ex); break;
    case 'writing':      body = renderWriting(ex);     break;
    case 'time-type':    body = renderTimeType(ex);    break;
    case 'spelling':     body = renderSpelling(ex);    break;
    default: body = '<p>Loading...</p>';
  }

  const feedback = state.lastResult ? renderFeedback() : '';
  const nextBtn  = state.answered
    ? `<button class="btn-next" data-action="next">${state.idx + 1 < total ? 'Next →' : 'See Results 🎉'}</button>`
    : '';

  return `<div class="ex-screen">${topbar}${instruction}${body}${feedback}${nextBtn}</div>`;
}

// ── INDIVIDUAL EXERCISE RENDERERS ────────────────────────────
// Helper: CSS class + disabled state for a click option
// correctVal: the value or index that is correct
// thisVal: the value or index of this button
function optState(idx, isCorrect) {
  if (state.answered) {
    if (isCorrect) return { cls: 'correct', disabled: true };
    if (state.wrongClicks.includes(idx)) return { cls: 'wrong', disabled: true };
    return { cls: '', disabled: true };
  }
  if (state.revealed) {
    if (isCorrect) return { cls: 'correct', disabled: false }; // must click this
    return { cls: 'tried', disabled: true };
  }
  if (state.wrongClicks.includes(idx)) return { cls: 'tried', disabled: true };
  return { cls: '', disabled: false };
}

function renderListen(ex) {
  const optBtns = ex.options.map((opt, i) => {
    const { cls, disabled } = optState(i, i === ex.answer);
    return `<button class="opt-btn ${cls}" data-action="choice"
      data-idx="${i}" ${disabled ? 'disabled' : ''}>${opt}</button>`;
  }).join('');

  return `
    <div class="ex-card">
      <span class="scene">🎧</span>
      <div class="sentence">${ex.question}</div>
      <div class="hint-he">שאלה • Question</div>
    </div>
    <button class="listen-btn" data-action="speak" data-text="${encodeURIComponent(ex.speech)}">
      <span class="icon">🔊</span> Listen / האזינו
    </button>
    <div class="options-grid single-col">${optBtns}</div>`;
}

function renderWordToPic(ex) {
  const optBtns = ex.options.map((opt, i) => {
    const { cls, disabled } = optState(i, opt === ex.correct);
    return `<button class="opt-btn ${cls}" style="font-size:2rem;" data-action="choice"
      data-idx="${i}" data-val="${opt}" ${disabled ? 'disabled' : ''}>${opt}</button>`;
  }).join('');

  return `
    <div class="ex-card">
      <div class="sentence" style="font-size:2rem; letter-spacing:2px;">${ex.word}</div>
      <div class="hint-he">בחרו את התמונה המתאימה • Click the matching picture</div>
    </div>
    <div class="options-grid">${optBtns}</div>`;
}

function renderSentenceType(ex) {
  const display = ex.sentence.replace('___',
    `<span class="blank-slot">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>`);
  return `
    <div class="ex-card">
      <span class="scene">${ex.emoji}</span>
      <div class="sentence">${display}</div>
      <div class="hint-he">רמז: ${ex.hint}</div>
    </div>
    <div class="type-area">
      <input class="type-input" id="typeInput" type="text" placeholder="Type the word..."
        autocomplete="off" autocorrect="off" spellcheck="false"
        ${state.answered ? 'disabled' : ''}
        value="${state.typedAnswer || ''}">

      <button class="btn-check" data-action="check-type" ${state.answered ? 'disabled' : ''}>
        ✔ Check
      </button>
    </div>`;
}

function renderQAMatch(ex) {
  const optBtns = ex.options.map((opt, i) => {
    const { cls, disabled } = optState(i, opt === ex.correct);
    return `<button class="opt-btn ${cls}" data-action="choice"
      data-idx="${i}" ${disabled ? 'disabled' : ''}>${opt}</button>`;
  }).join('');

  return `
    <div class="question-display">${ex.question}</div>
    <div class="options-grid single-col">${optBtns}</div>`;
}

function renderSoundChoose(ex) {
  const highlighted = ex.blank.replace('__',
    `<span class="sound-blank">&nbsp;&nbsp;&nbsp;&nbsp;</span>`);
  const optBtns = ex.options.map((opt, i) => {
    const { cls, disabled } = optState(i, opt === ex.sound);
    return `<button class="opt-btn ${cls}" style="font-size:1.4rem; font-weight:900;"
      data-action="choice" data-idx="${i}" data-val="${opt}"
      ${disabled ? 'disabled' : ''}>${opt}</button>`;
  }).join('');

  return `
    <div class="ex-card">
      <span class="scene">${ex.emoji}</span>
      <div class="sound-display">${highlighted}</div>
      <div class="hint-he">השלימו את הצליל • Choose the sound</div>
    </div>
    <div class="options-grid">${optBtns}</div>`;
}

function renderSoundType(ex) {
  const soundList = [...new Set(DATA.sounds.map(s => s.sound))].join(' / ');
  const highlighted = ex.blank.replace('__',
    `<span class="sound-blank">&nbsp;&nbsp;&nbsp;&nbsp;</span>`);
  return `
    <div class="ex-card">
      <span class="scene">${ex.emoji}</span>
      <div class="sound-display">${highlighted}</div>
      <div class="hint-he">כתבו את הצליל החסר (${soundList})</div>
    </div>
    <div class="type-area">
      <input class="type-input" id="typeInput" type="text" maxlength="4"
        placeholder="${soundList}"
        autocomplete="off" autocorrect="off" spellcheck="false"
        style="font-size:1.8rem; font-weight:900; max-width:180px;"
        ${state.answered ? 'disabled' : ''}
        value="${state.typedAnswer || ''}">

      <button class="btn-check" data-action="check-sound" ${state.answered ? 'disabled' : ''}>
        ✔ Check
      </button>
    </div>`;
}

function renderTrueFalse(ex) {
  // True = index 0, False = index 1 for optState purposes
  const trueState  = optState(0, ex.answer === true);
  const falseState = optState(1, ex.answer === false);
  return `
    <div class="ex-card">
      <span class="scene">${ex.scene}</span>
      <div class="sentence">${ex.sentence}</div>
    </div>
    <div class="tf-btns">
      <button class="btn-true ${trueState.cls}"  data-action="tf" data-val="true"
        ${trueState.disabled ? 'disabled' : ''}>
        ✅ True<br><span style="font-size:0.8rem;font-weight:600">נכון</span>
      </button>
      <button class="btn-false ${falseState.cls}" data-action="tf" data-val="false"
        ${falseState.disabled ? 'disabled' : ''}>
        ❌ False<br><span style="font-size:0.8rem;font-weight:600">לא נכון</span>
      </button>
    </div>`;
}

function renderReadingChoice(ex) {
  const optBtns = ex.options.map((opt, i) => {
    const { cls, disabled } = optState(i, i === ex.answer);
    return `<button class="opt-btn ${cls}" data-action="choice"
      data-idx="${i}" ${disabled ? 'disabled' : ''}>${opt}</button>`;
  }).join('');

  return `
    <div class="passage-box">${ex.passage.text}</div>
    <div class="ex-card" style="padding:14px 16px;">
      <div class="sentence" style="font-size:1.1rem;">${ex.question}</div>
    </div>
    <div class="options-grid single-col">${optBtns}</div>`;
}

function renderReadingType(ex) {
  return `
    <div class="passage-box">${ex.passage.text}</div>
    <div class="ex-card" style="padding:14px 16px;">
      <div class="sentence" style="font-size:1.1rem;">${ex.question}</div>
    </div>
    <div class="type-area">
      <input class="type-input" id="typeInput" type="text"
        placeholder="Type your answer..."
        autocomplete="off" autocorrect="off" spellcheck="false"
        ${state.answered ? 'disabled' : ''}
        value="${state.typedAnswer || ''}">

      <button class="btn-check" data-action="check-type" ${state.answered ? 'disabled' : ''}>
        ✔ Check
      </button>
    </div>`;
}

function renderWriting(ex) {
  const blanksCount = ex.segments.filter(s => s.blank).length;
  if (!state.writingFilled) {
    state.writingFilled = new Array(blanksCount).fill(null);
    state.writingLocked = new Array(blanksCount).fill(false);
  }

  let bi = 0;
  const passageHTML = ex.segments.map(seg => {
    if (!seg.blank) return `<span>${seg.text}</span>`;
    const widx   = state.writingFilled[bi];
    const locked = state.writingLocked[bi];
    const filled = widx !== null;
    const displayVal = filled ? ex.wordBank[widx] : null;
    const cls = locked ? 'fill-blank filled'
              : filled ? 'fill-blank filled'
              : 'fill-blank';
    const style = locked ? 'background:#d8f3dc;border-color:#52B788;' : '';
    const action = (!locked && filled) ? `data-action="blank-click" data-blank="${bi}" style="cursor:pointer;${style}"` : `style="${style}"`;
    const display = filled ? displayVal : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    const idx = bi++;
    return `<span class="${cls}" ${action} data-blank="${idx}">${display}</span>`;
  }).join('');

  const wordChips = ex.wordBank.map((w, i) => {
    const used = state.writingFilled.includes(i);
    return `<button class="word-chip" data-action="word-chip" data-widx="${i}"
      ${used ? 'disabled' : ''}>${w}</button>`;
  }).join('');

  const allFilled = state.writingFilled.every((v, i) => v !== null || state.writingLocked[i]);
  const lockedCount = state.writingLocked.filter(Boolean).length;
  const checkBtn = !state.answered
    ? `<button class="btn-check" data-action="check-writing" ${allFilled ? '' : 'disabled'}>✔ Check</button>`
    : '';
  const progressNote = lockedCount > 0 && !state.answered
    ? `<div style="text-align:center;font-size:0.9rem;color:#2D6A4F;font-weight:700;">✅ ${lockedCount} / ${blanksCount} correct so far</div>`
    : '';

  return `
    <div class="ex-card">
      <span class="scene">${ex.emoji}</span>
      <div class="passage-text">${passageHTML}</div>
    </div>
    ${progressNote}
    <div class="word-bank">${wordChips}</div>
    <div style="text-align:center;">${checkBtn}</div>`;
}

function renderTimeType(ex) {
  const isOclock = ex.m === 0;
  const hint = isOclock
    ? 'Write: It\'s [number] o\'clock  |  כתבו: השעה [מספר] בדיוק'
    : 'Write: It\'s half past [number]  |  כתבו: השעה [מספר] וחצי';

  return `
    <div class="ex-card">
      <div class="clock-wrap">${clockSVG(ex.h, ex.m)}</div>
      <div class="hint-he" style="margin-top:8px;">${hint}</div>
    </div>
    <div class="type-area">
      <input class="type-input" id="typeInput" type="text"
        placeholder="It's ..."
        autocomplete="off" autocorrect="off" spellcheck="false"
        ${state.answered ? 'disabled' : ''}
        value="${state.typedAnswer || ''}">

      <button class="btn-check" data-action="check-time" ${state.answered ? 'disabled' : ''}>
        ✔ Check
      </button>
    </div>`;
}

function renderSpelling(ex) {
  return `
    <div class="ex-card">
      <span class="scene">${ex.emoji}</span>
      <div class="hint-he">${ex.hebrew}</div>
    </div>
    <div class="type-area">
      <input class="type-input" id="typeInput" type="text"
        placeholder="Write the word in English..."
        autocomplete="off" autocorrect="off" spellcheck="false"
        ${state.answered ? 'disabled' : ''}
        value="${state.typedAnswer || ''}">
      <button class="btn-check" data-action="check-type" ${state.answered ? 'disabled' : ''}>
        ✔ Check
      </button>
    </div>`;
}

// ── FEEDBACK ─────────────────────────────────────────────────
function renderFeedback() {
  const ex = state.exercises[state.idx];
  const r  = state.lastResult;

  if (r === 'correct') {
    const msgs   = ['Great job! 🎉', 'Excellent! ⭐', 'Perfect! 🌟', 'Well done! 👏', 'Amazing! 🦁'];
    const hemsgs = ['!כל הכבוד', '!מצוין', '!נהדר', '!יופי'];
    return `<div class="feedback correct">
      ${msgs[Math.floor(Math.random() * msgs.length)]} &nbsp; ${hemsgs[Math.floor(Math.random() * hemsgs.length)]}
    </div>`;
  }

  if (r === 'close' && !state.revealed) {
    const left = 3 - state.attempts;
    const leftWord = left === 1 ? 'try' : 'tries';
    const leftHe   = left === 1 ? 'ניסיון נוסף אחד' : `עוד ${left} ניסיונות`;
    return `<div class="feedback close">
      Almost! Check your spelling carefully 📝 &nbsp; ${left} ${leftWord} left
      <span style="font-size:0.85rem;direction:rtl;">כמעט! בדקי שוב את האיות — ${leftHe}</span>
    </div>`;
  }

  // Writing has its own retry feedback (no reveal — word bank is always visible)
  if (ex.type === 'writing' && !state.answered) {
    const locked = state.writingLocked ? state.writingLocked.filter(Boolean).length : 0;
    const total  = ex.segments.filter(s => s.blank).length;
    const wrong  = total - locked;
    return `<div class="feedback wrong">
      ${locked > 0 ? `✅ ${locked} correct` : ''} ❌ ${wrong} wrong — wrong words cleared, try again! 💪
      <span style="font-size:0.85rem;direction:rtl;">המילים השגויות נמחקו — נסי שוב</span>
    </div>`;
  }

  const isTyped = ['sentence-type','reading-type','sound-type','time-type','spelling'].includes(ex.type);

  if (state.revealed) {
    const correctDisplay = getCorrectDisplay(ex);
    const action = isTyped
      ? 'Now type it above to continue ↑'
      : 'Click the correct answer above to continue ↑';
    const actionHe = isTyped
      ? 'כתבי את התשובה למעלה כדי להמשיך'
      : 'לחצי על התשובה הנכונה למעלה כדי להמשיך';
    return `<div class="feedback wrong">
      The answer is:
      <span class="correct-answer" style="font-size:1.4rem;">✏️ ${correctDisplay}</span>
      <span style="font-size:0.95rem;font-weight:700;">${action}</span>
      <span style="font-size:0.85rem;direction:rtl;">${actionHe}</span>
    </div>`;
  }

  // Not yet revealed — show tries remaining
  const left = 3 - state.attempts;
  const leftWord = left === 1 ? 'try' : 'tries';
  const leftHe   = left === 1 ? 'ניסיון נוסף אחד' : `עוד ${left} ניסיונות`;
  return `<div class="feedback wrong">
    Not quite — try again! 💪 &nbsp; ${left} ${leftWord} left
    <span style="font-size:0.85rem;direction:rtl;">${leftHe}</span>
  </div>`;
}

function getCorrectDisplay(ex) {
  if (ex.type === 'sentence-type' || ex.type === 'reading-type' || ex.type === 'spelling') return ex.answer;
  if (ex.type === 'sound-type' || ex.type === 'sound-choose') return `${ex.blank.replace('__', `[${ex.sound}]`)}  →  ${ex.word}`;
  if (ex.type === 'qa-match')    return ex.correct;
  if (ex.type === 'truefalse')   return ex.answer ? '✅ True / נכון' : '❌ False / לא נכון';
  if (ex.type === 'time-type')   return ex.phrase;
  if (ex.type === 'word-to-picture') return ex.correct;
  if (ex.type === 'listen' || ex.type === 'reading-choice') return ex.options[ex.answer];
  return '';
}

// ── RESULT SCREEN ─────────────────────────────────────────────
function renderResult() {
  const total = state.exercises.length;
  const pct   = total > 0 ? state.score / total : 0;
  const s     = stars(pct);
  const count = starsCount(pct);
  const sec   = SECTIONS.find(s => s.id === state.sectionId);

  const msgs = {
    3: ['You are a star! 🌟', `Incredible work, ${CONFIG.studentName}! 🎉`, `!${CONFIG.studentNameHe}, את מדהימה`],
    2: [`Good job, ${CONFIG.studentName}! 💪`, 'Keep practising! 📚', '!יפה מאוד, תמשיכי להתאמן'],
    1: [`Keep going, ${CONFIG.studentName}! 💛`, "You'll do better next time!", '!אל תוותרי, תנסי שוב'],
  };
  const msgSet = msgs[count];

  return `
    <div class="result-screen">
      <div class="result-emoji">${sec.emoji}</div>
      <div class="result-stars">${s}</div>
      <div class="result-title">${msgSet[0]}</div>
      <div class="result-subtitle">${msgSet[2]}</div>
      <div class="result-score">
        ✅ ${state.score} / ${total} correct<br>
        <span style="font-size:0.9rem;color:#666;">${Math.round(pct * 100)}%</span>
      </div>
      <div class="result-btns">
        <button class="btn-retry" data-action="retry">🔄 Try Again</button>
        <button class="btn-go-home" data-action="home">🏠 Home</button>
      </div>
    </div>`;
}

// ── EVENT HANDLERS ────────────────────────────────────────────
function attach() {
  const inp = document.getElementById('typeInput');
  if (inp) setTimeout(() => { inp.focus(); inp.select(); }, 80);
}

function handleClick(e) {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;

  if (action === 'start') {
    startSection(el.dataset.id);
  } else if (action === 'home') {
    state.screen = 'home';
    render();
  } else if (action === 'speak') {
    speak(decodeURIComponent(el.dataset.text));
    state.listenPlayed = true;
  } else if (action === 'choice') {
    if (state.answered) return;
    handleChoice(parseInt(el.dataset.idx), el.dataset.val);
  } else if (action === 'check-type') {
    handleCheckType();
  } else if (action === 'check-sound') {
    handleCheckSound();
  } else if (action === 'check-time') {
    handleCheckTime();
  } else if (action === 'tf') {
    if (state.answered) return;
    handleTF(el.dataset.val === 'true');
  } else if (action === 'word-chip') {
    handleWordChip(parseInt(el.dataset.widx));
  } else if (action === 'blank-click') {
    handleBlankClick(parseInt(el.dataset.blank));
  } else if (action === 'check-writing') {
    handleCheckWriting();
  } else if (action === 'next') {
    nextExercise();
  } else if (action === 'retry') {
    startSection(state.sectionId);
  }
}

function handleKeydown(e) {
  if (e.key !== 'Enter') return;
  if (state.screen !== 'exercise') return;

  if (state.answered) {
    e.preventDefault();
    nextExercise();
    return;
  }

  const ex = state.exercises[state.idx];
  if (!ex) return;
  if (ex.type === 'sentence-type' || ex.type === 'reading-type' || ex.type === 'spelling') handleCheckType();
  else if (ex.type === 'sound-type') handleCheckSound();
  else if (ex.type === 'time-type') handleCheckTime();
}

// ── ACTION HANDLERS ───────────────────────────────────────────
function startSection(id) {
  state.sectionId  = id;
  state.exercises  = buildExercises(id);
  state.idx        = 0;
  state.score      = 0;
  state.answered   = false;
  state.lastResult = null;
  state.userChoice = null;
  state.typedAnswer = null;
  state.attempts   = 0;
  state.revealed   = false;
  state.wrongClicks = [];
  state.listenPlayed = false;
  state.writingFilled = null;
  state.writingLocked = null;
  state.screen = 'exercise';

  render();
}

function handleChoice(idx, val) {
  const ex = state.exercises[state.idx];

  let isCorrect = false;
  if (ex.type === 'word-to-picture')   isCorrect = (val === ex.correct);
  else if (ex.type === 'qa-match')     isCorrect = (ex.options[idx] === ex.correct);
  else if (ex.type === 'listen')       isCorrect = (idx === ex.answer);
  else if (ex.type === 'sound-choose') isCorrect = (val === ex.sound);
  else if (ex.type === 'reading-choice') isCorrect = (idx === ex.answer);
  else if (ex.type === 'truefalse')    isCorrect = (val === ex.answer);

  if (isCorrect) {
    state.answered = true;
    state.userChoice = idx;
    state.lastResult = 'correct';
    if (state.attempts === 0) state.score++;
    playSound('correct');
    render();
    return;
  }

  // Wrong answer
  if (!state.wrongClicks.includes(idx)) state.wrongClicks.push(idx);
  state.attempts++;
  state.lastResult = 'wrong';
  if (state.attempts >= 3) state.revealed = true;
  playSound('wrong');
  render();
}

function handleCheckType() {
  const inp = document.getElementById('typeInput');
  if (!inp || !inp.value.trim()) return;
  const ex = state.exercises[state.idx];
  state.typedAnswer = inp.value;

  if (state.revealed) {
    // Force-type mode: must match exactly (they can see the answer)
    if (inp.value.trim().toLowerCase() === ex.answer.trim().toLowerCase()) {
      state.answered = true;
      state.lastResult = 'correct';
      playSound('correct');
      render();
    } else {
      playSound('wrong');
      render();
    }
    return;
  }

  const result = checkTyped(inp.value, ex.answer);
  if (result === 'correct') {
    state.answered = true;
    state.lastResult = 'correct';
    if (state.attempts === 0) state.score++;
    playSound('correct');
  } else {
    // 'close' and 'wrong' both require another attempt
    state.attempts++;
    state.lastResult = result;
    if (state.attempts >= 3) state.revealed = true;
    playSound(result);
  }
  render();
}

function handleCheckSound() {
  const inp = document.getElementById('typeInput');
  if (!inp || !inp.value.trim()) return;
  const ex = state.exercises[state.idx];
  const typed = inp.value.trim().toLowerCase();
  const correct = ex.sound.toLowerCase();
  state.typedAnswer = inp.value;

  if (state.revealed) {
    if (typed === correct) {
      state.answered = true;
      state.lastResult = 'correct';
      playSound('correct');
      render();
    } else {
      playSound('wrong');
      render();
    }
    return;
  }

  if (typed === correct) {
    state.answered = true;
    state.lastResult = 'correct';
    if (state.attempts === 0) state.score++;
    playSound('correct');
  } else {
    state.attempts++;
    state.lastResult = 'wrong';
    if (state.attempts >= 3) state.revealed = true;
    playSound('wrong');
  }
  render();
}

function handleCheckTime() {
  const inp = document.getElementById('typeInput');
  if (!inp || !inp.value.trim()) return;
  const ex = state.exercises[state.idx];
  state.typedAnswer = inp.value;

  if (state.revealed) {
    if (inp.value.trim().toLowerCase() === ex.phrase.trim().toLowerCase()) {
      state.answered = true;
      state.lastResult = 'correct';
      playSound('correct');
      render();
    } else {
      playSound('wrong');
      render();
    }
    return;
  }

  const result = checkTyped(inp.value, ex.phrase);
  if (result === 'correct') {
    state.answered = true;
    state.lastResult = 'correct';
    if (state.attempts === 0) state.score++;
    playSound('correct');
  } else {
    state.attempts++;
    state.lastResult = result;
    if (state.attempts >= 3) state.revealed = true;
    playSound(result);
  }
  render();
}

function handleTF(val) {
  // True = index 0, False = index 1 — reuse handleChoice logic
  const idx = val === true ? 0 : 1;
  handleChoice(idx, val);
}

function handleWordChip(widx) {
  const ex = state.exercises[state.idx];
  if (!ex || state.answered) return;
  // Find next unfilled, unlocked blank
  const nextBlank = state.writingFilled.findIndex((v, i) => v === null && !state.writingLocked[i]);
  if (nextBlank === -1) return;
  state.writingFilled[nextBlank] = widx;
  render();
}

function handleBlankClick(blankIdx) {
  const ex = state.exercises[state.idx];
  if (!ex || state.answered) return;
  if (state.writingLocked[blankIdx]) return; // locked = correct, can't remove
  state.writingFilled[blankIdx] = null;
  render();
}

function handleCheckWriting() {
  const ex = state.exercises[state.idx];
  const blanks = ex.segments.filter(s => s.blank);
  let newlyCorrect = 0;

  blanks.forEach((seg, i) => {
    if (state.writingLocked[i]) return; // already correct from a previous check
    const widx = state.writingFilled[i];
    if (widx !== null && ex.wordBank[widx].toLowerCase() === seg.answer.toLowerCase()) {
      state.writingLocked[i] = true;
      newlyCorrect++;
    } else {
      state.writingFilled[i] = null; // clear wrong blank, word returns to bank
    }
  });

  const allLocked = state.writingLocked.every(Boolean);
  if (allLocked) {
    state.answered = true;
    state.lastResult = 'correct';
    state.score++;
    playSound('correct');
  } else {
    state.lastResult = 'wrong';
    playSound('wrong');
  }
  render();
}

function nextExercise() {
  const total = state.exercises.length;
  if (state.idx + 1 < total) {
    state.idx++;
    state.answered   = false;
    state.lastResult = null;
    state.userChoice = null;
    state.typedAnswer = null;
    state.attempts   = 0;
    state.revealed   = false;
    state.wrongClicks = [];
    state.listenPlayed = false;
    state.writingFilled = null;
    state.writingLocked = null;
    state.screen = 'exercise';

    render();
  } else {
    // Show results
    const pct = state.score / total;
    saveProgress(state.sectionId, starsCount(pct));
    state.screen = 'result';
    render();
  }
}

// ── INIT ─────────────────────────────────────────────────────
// Attach click and keydown once on document — avoids duplicate listeners
// that would accumulate if attached inside render/attach on #app.
document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeydown);
document.title = `${CONFIG.studentName}'s English Exam Prep`;

// Wait for voices to load before first render (TTS quirk)
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {};
}

render();
