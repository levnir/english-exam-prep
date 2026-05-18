// ============================================================
// app.js — Abigail's English Exam Prep
// ============================================================

// ── SECTION DEFINITIONS ──────────────────────────────────────
const SECTIONS = [
  { id: 'listen',   emoji: '👂', title: 'Listen & Mark',    titleHe: 'האזנה',          color: '#E63946', desc: 'Listen to the conversation and answer.',   descHe: 'האזינו לשיחה וענו על השאלה.' },
  { id: 'vocab',    emoji: '📚', title: 'Vocabulary',        titleHe: 'אוצר מילים',     color: '#4ECDC4', desc: 'Match words to pictures and fill sentences.', descHe: 'התאימו מילים לתמונות והשלימו משפטים.' },
  { id: 'sounds',   emoji: '🔤', title: 'Sounds',            titleHe: 'צלילים',         color: '#45B7D1', desc: 'Complete the word with le, er, ir, or ar.',  descHe: 'השלימו את המילה עם le, er, ir, ar.' },
  { id: 'truefalse',emoji: '✅', title: 'True or False',     titleHe: 'נכון / לא נכון', color: '#2D6A4F', desc: 'Is the sentence true or false?',             descHe: 'האם המשפט נכון או לא נכון?' },
  { id: 'reading',  emoji: '📖', title: 'Reading',           titleHe: 'קריאה והבנה',   color: '#6C5CE7', desc: 'Read the passage and answer questions.',     descHe: 'קראו את הקטע וענו על השאלות.' },
  { id: 'writing',  emoji: '✏️', title: 'Writing',           titleHe: 'כתיבה',          color: '#E17055', desc: 'Fill in the passage from the word bank.',    descHe: 'מלאו את הקטע ממאגר המילים.' },
  { id: 'time',     emoji: '🕐', title: 'What Time Is It?',  titleHe: 'מה השעה?',       color: '#FDCB6E', desc: 'Look at the clock and write the time.',      descHe: 'הסתכלו על השעון וכתבו את השעה.' },
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
  // writing state
  writingFilled: [],
  writingWordUsed: [],
  // progress saved per section
  progress: JSON.parse(localStorage.getItem('abigail_progress') || '{}'),
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
  localStorage.setItem('abigail_progress', JSON.stringify(state.progress));
}

function storedStars(sectionId) {
  const n = state.progress[sectionId] || 0;
  return '⭐'.repeat(n) + '☆'.repeat(3 - n);
}

function daysUntilExam() {
  const exam = new Date('2026-05-26');
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

// ── TTS ───────────────────────────────────────────────────────
function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'en-US';
  utt.rate = 0.85;
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
    case 'listen':
      return shuffle(DATA.listening).slice(0, 5).map(item => ({ type: 'listen', ...item }));

    case 'vocab': {
      const wtp = shuffle(DATA.wordToPicture).slice(0, 8).map(item => ({
        type: 'word-to-picture',
        word: item.word,
        options: shuffle([item.correct, ...item.distractors]),
        correct: item.correct,
      }));
      const sc = shuffle(DATA.sentenceCompletion).slice(0, 8).map(item => ({
        type: 'sentence-type',
        sentence: item.sentence,
        answer: item.answer,
        emoji: item.emoji,
        hint: item.hint,
      }));
      const qa = shuffle(DATA.qaMatching).slice(0, 6).map(item => ({
        type: 'qa-match',
        question: item.question,
        correct: item.correct,
        options: shuffle([item.correct, ...item.wrong.slice(0, 3)]),
      }));
      return shuffle([...wtp, ...sc, ...qa]);
    }

    case 'sounds': {
      // Mix guided (choose) and typing (type) for each of the 4 sounds
      const bySound = { le: [], er: [], ir: [], ar: [] };
      DATA.sounds.forEach(s => bySound[s.sound].push(s));
      let exs = [];
      for (const snd of ['le', 'er', 'ir', 'ar']) {
        const items = shuffle(bySound[snd]).slice(0, 4);
        items.forEach((item, i) => {
          if (i < 2) {
            exs.push({ type: 'sound-choose', ...item,
              options: shuffle(['le', 'er', 'ir', 'ar']) });
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
      return [pick(DATA.writing, 1)[0]].map(ex => ({ type: 'writing', ...ex }));

    case 'time':
      return shuffle(DATA.clockTimes).slice(0, 12).map(item => ({
        type: 'time-type', ...item
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
      <h1>🌟 Abigail's English Prep!</h1>
      <div class="subtitle">Jet 2 · Unit 3 · Animals Are Cool 🦁🐢🐧</div>
      <div class="subtitle-he">הכנה למבדק — יחידה 3</div>
    </div>
    <div class="countdown">📅 ${days} ${dayWord} until the exam — May 26 &nbsp;|&nbsp; ${days} ימים לפני המבדק</div>
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
    default: body = '<p>Loading...</p>';
  }

  const feedback = state.answered ? renderFeedback() : '';
  const nextBtn  = state.answered
    ? `<button class="btn-next" data-action="next">${state.idx + 1 < total ? 'Next →' : 'See Results 🎉'}</button>`
    : '';

  return `<div class="ex-screen">${topbar}${instruction}${body}${feedback}${nextBtn}</div>`;
}

// ── INDIVIDUAL EXERCISE RENDERERS ────────────────────────────

function renderListen(ex) {
  const listened = state.listenPlayed;
  const optBtns = ex.options.map((opt, i) => {
    let cls = 'opt-btn';
    if (state.answered) {
      if (i === ex.answer) cls += ' correct';
      else if (state.userChoice === i && i !== ex.answer) cls += ' wrong';
    }
    return `<button class="opt-btn ${cls === 'opt-btn' ? '' : cls.replace('opt-btn ', '')}"
      data-action="choice" data-idx="${i}" ${state.answered ? 'disabled' : ''}>${opt}</button>`;
  }).join('');

  return `
    <div class="ex-card">
      <span class="scene">🎧</span>
      <div class="sentence">${ex.question}</div>
      <div class="hint-he">שאלה • Question</div>
    </div>
    <button class="listen-btn" data-action="speak" data-text="${encodeURIComponent(ex.speech)}">
      <span class="icon">🔊</span> Listen Again / האזינו
    </button>
    <div class="options-grid single-col">${optBtns}</div>`;
}

function renderWordToPic(ex) {
  const optBtns = ex.options.map((opt, i) => {
    let extra = '';
    if (state.answered) {
      if (opt === ex.correct) extra = 'correct';
      else if (state.userChoice === i && opt !== ex.correct) extra = 'wrong';
    }
    return `<button class="opt-btn ${extra}" style="font-size:2rem;" data-action="choice"
      data-idx="${i}" data-val="${opt}" ${state.answered ? 'disabled' : ''}>${opt}</button>`;
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
        value="${state.answered ? (state.typedAnswer || '') : ''}">
      <button class="btn-check" data-action="check-type" ${state.answered ? 'disabled' : ''}>
        ✔ Check
      </button>
    </div>`;
}

function renderQAMatch(ex) {
  const optBtns = ex.options.map((opt, i) => {
    let extra = '';
    if (state.answered) {
      if (opt === ex.correct) extra = 'correct';
      else if (state.userChoice === i && opt !== ex.correct) extra = 'wrong';
    }
    return `<button class="opt-btn ${extra}" data-action="choice"
      data-idx="${i}" ${state.answered ? 'disabled' : ''}>${opt}</button>`;
  }).join('');

  return `
    <div class="question-display">${ex.question}</div>
    <div class="options-grid single-col">${optBtns}</div>`;
}

function renderSoundChoose(ex) {
  const highlighted = ex.blank.replace('__',
    `<span class="sound-blank">&nbsp;&nbsp;&nbsp;&nbsp;</span>`);
  const optBtns = ex.options.map((opt, i) => {
    let extra = '';
    if (state.answered) {
      if (opt === ex.sound) extra = 'correct';
      else if (state.userChoice === i && opt !== ex.sound) extra = 'wrong';
    }
    return `<button class="opt-btn ${extra}" style="font-size:1.4rem; font-weight:900;"
      data-action="choice" data-idx="${i}" data-val="${opt}"
      ${state.answered ? 'disabled' : ''}>${opt}</button>`;
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
  const highlighted = ex.blank.replace('__',
    `<span class="sound-blank">&nbsp;&nbsp;&nbsp;&nbsp;</span>`);
  return `
    <div class="ex-card">
      <span class="scene">${ex.emoji}</span>
      <div class="sound-display">${highlighted}</div>
      <div class="hint-he">כתבו את הצליל החסר (le / er / ir / ar)</div>
    </div>
    <div class="type-area">
      <input class="type-input" id="typeInput" type="text" maxlength="4"
        placeholder="le / er / ir / ar"
        autocomplete="off" autocorrect="off" spellcheck="false"
        style="font-size:1.8rem; font-weight:900; max-width:180px;"
        ${state.answered ? 'disabled' : ''}
        value="${state.answered ? (state.typedAnswer || '') : ''}">
      <button class="btn-check" data-action="check-sound" ${state.answered ? 'disabled' : ''}>
        ✔ Check
      </button>
    </div>`;
}

function renderTrueFalse(ex) {
  let trueExtra = '', falseExtra = '';
  if (state.answered) {
    if (ex.answer === true)  { trueExtra = 'style="background:#b7e4c7"'; }
    else                     { falseExtra = 'style="background:#f5c6cb"'; }
  }
  return `
    <div class="ex-card">
      <span class="scene">${ex.scene}</span>
      <div class="sentence">${ex.sentence}</div>
    </div>
    <div class="tf-btns">
      <button class="btn-true"  data-action="tf" data-val="true"
        ${state.answered ? 'disabled' : ''} ${trueExtra}>
        ✅ True<br><span style="font-size:0.8rem;font-weight:600">נכון</span>
      </button>
      <button class="btn-false" data-action="tf" data-val="false"
        ${state.answered ? 'disabled' : ''} ${falseExtra}>
        ❌ False<br><span style="font-size:0.8rem;font-weight:600">לא נכון</span>
      </button>
    </div>`;
}

function renderReadingChoice(ex) {
  const optBtns = ex.options.map((opt, i) => {
    let extra = '';
    if (state.answered) {
      if (i === ex.answer) extra = 'correct';
      else if (state.userChoice === i) extra = 'wrong';
    }
    return `<button class="opt-btn ${extra}" data-action="choice"
      data-idx="${i}" ${state.answered ? 'disabled' : ''}>${opt}</button>`;
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
        value="${state.answered ? (state.typedAnswer || '') : ''}">
      <button class="btn-check" data-action="check-type" ${state.answered ? 'disabled' : ''}>
        ✔ Check
      </button>
    </div>`;
}

function renderWriting(ex) {
  if (!state.writingFilled) {
    state.writingFilled = new Array(ex.segments.filter(s => s.blank).length).fill(null);
    state.writingWordUsed = new Array(ex.wordBank.length).fill(false);
  }

  let blankIdx = 0;
  const passageHTML = ex.segments.map(seg => {
    if (!seg.blank) return `<span>${seg.text}</span>`;
    const val = state.writingFilled[blankIdx];
    const filled = val !== null;
    const wrongFill = filled && state.answered && val.toLowerCase() !== seg.answer.toLowerCase();
    const cls = filled
      ? (wrongFill ? 'fill-blank wrong-fill' : 'fill-blank filled')
      : 'fill-blank';
    const display = filled ? val : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    const bi = blankIdx++;
    return `<span class="${cls}" data-blank="${bi}">${display}</span>`;
  }).join('');

  const wordChips = ex.wordBank.map((w, i) => {
    const used = state.writingWordUsed[i];
    return `<button class="word-chip" data-action="word-chip" data-widx="${i}"
      ${used ? 'disabled' : ''}>${w}</button>`;
  }).join('');

  const allFilled = state.writingFilled.every(v => v !== null);
  const checkBtn = !state.answered
    ? `<button class="btn-check" data-action="check-writing"
        ${allFilled ? '' : 'disabled'}>✔ Check All</button>`
    : '';

  return `
    <div class="ex-card">
      <span class="scene">${ex.emoji}</span>
      <div class="passage-text">${passageHTML}</div>
    </div>
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
        value="${state.answered ? (state.typedAnswer || '') : ''}">
      <button class="btn-check" data-action="check-time" ${state.answered ? 'disabled' : ''}>
        ✔ Check
      </button>
    </div>`;
}

// ── FEEDBACK ─────────────────────────────────────────────────
function renderFeedback() {
  const ex = state.exercises[state.idx];
  const r  = state.lastResult;

  if (r === 'correct') {
    const msgs = ['Great job! 🎉', 'Excellent! ⭐', 'Perfect! 🌟', 'Well done! 👏', 'Amazing! 🦁'];
    const hemsgs = ['!כל הכבוד', '!מצוין', '!נהדר', '!יופי'];
    return `<div class="feedback correct">
      ${msgs[Math.floor(Math.random() * msgs.length)]} &nbsp; ${hemsgs[Math.floor(Math.random() * hemsgs.length)]}
    </div>`;
  }

  let correctDisplay = '';
  if (ex.type === 'sentence-type' || ex.type === 'reading-type') {
    correctDisplay = ex.answer;
  } else if (ex.type === 'sound-type' || ex.type === 'sound-choose') {
    correctDisplay = `${ex.blank.replace('__', `[${ex.sound}]`)}  →  ${ex.word}`;
  } else if (ex.type === 'qa-match') {
    correctDisplay = ex.correct;
  } else if (ex.type === 'truefalse') {
    correctDisplay = ex.answer ? '✅ True / נכון' : '❌ False / לא נכון';
  } else if (ex.type === 'time-type') {
    correctDisplay = ex.phrase;
  } else if (ex.type === 'word-to-picture') {
    correctDisplay = ex.correct;
  } else if (ex.type === 'listen') {
    correctDisplay = ex.options[ex.answer];
  }

  if (r === 'close') {
    return `<div class="feedback close">
      Almost! Check the spelling 📝
      <span class="correct-answer">✏️ ${correctDisplay}</span>
      <span style="font-size:0.85rem;direction:rtl;">כמעט! בדקו את האיות</span>
    </div>`;
  }

  return `<div class="feedback wrong">
    Not quite. The answer is: ❌
    <span class="correct-answer">✅ ${correctDisplay}</span>
    <span style="font-size:0.85rem;direction:rtl;">התשובה הנכונה למעלה</span>
  </div>`;
}

// ── RESULT SCREEN ─────────────────────────────────────────────
function renderResult() {
  const total = state.exercises.length;
  const pct   = total > 0 ? state.score / total : 0;
  const s     = stars(pct);
  const count = starsCount(pct);
  const sec   = SECTIONS.find(s => s.id === state.sectionId);

  const msgs = {
    3: ['You are a star! 🌟', 'Incredible work, Abigail! 🎉', '!אביגיל, את מדהימה'],
    2: ['Good job, Abigail! 💪', 'Keep practising! 📚', '!יפה מאוד, תמשיכי להתאמן'],
    1: ['Keep going, Abigail! 💛', "You'll do better next time!", '!אל תוותרי, תנסי שוב'],
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
  document.getElementById('app').addEventListener('click', handleClick);
  document.getElementById('app').addEventListener('keydown', handleKeydown);

  // Auto-focus typing inputs
  const inp = document.getElementById('typeInput');
  if (inp) setTimeout(() => inp.focus(), 80);

  // Auto-play first listen exercise
  const ex = state.exercises[state.idx];
  if (ex && ex.type === 'listen' && !state.listenPlayed) {
    state.listenPlayed = false;
  }
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
  } else if (action === 'check-writing') {
    handleCheckWriting();
  } else if (action === 'next') {
    nextExercise();
  } else if (action === 'retry') {
    startSection(state.sectionId);
  }
}

function handleKeydown(e) {
  if (e.key === 'Enter') {
    if (state.answered) {
      nextExercise();
      return;
    }
    const ex = state.exercises[state.idx];
    if (!ex) return;
    if (ex.type === 'sentence-type' || ex.type === 'reading-type') handleCheckType();
    if (ex.type === 'sound-type') handleCheckSound();
    if (ex.type === 'time-type') handleCheckTime();
  }
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
  state.listenPlayed = false;
  state.writingFilled = null;
  state.writingWordUsed = null;
  state.screen = 'exercise';

  // Auto-speak first listening exercise
  const first = state.exercises[0];
  if (first && first.type === 'listen') {
    setTimeout(() => speak(first.speech), 300);
  }

  render();
}

function handleChoice(idx, val) {
  const ex = state.exercises[state.idx];
  state.answered = true;
  state.userChoice = idx;

  let isCorrect = false;
  if (ex.type === 'word-to-picture') isCorrect = (val === ex.correct);
  else if (ex.type === 'qa-match')   isCorrect = (ex.options[idx] === ex.correct);
  else if (ex.type === 'listen')     isCorrect = (idx === ex.answer);
  else if (ex.type === 'sound-choose') isCorrect = (val === ex.sound);
  else if (ex.type === 'reading-choice') isCorrect = (idx === ex.answer);

  state.lastResult = isCorrect ? 'correct' : 'wrong';
  if (isCorrect) state.score++;
  render();
}

function handleCheckType() {
  const inp = document.getElementById('typeInput');
  if (!inp || !inp.value.trim()) return;
  const ex = state.exercises[state.idx];
  const result = checkTyped(inp.value, ex.answer);
  state.answered = true;
  state.typedAnswer = inp.value;
  state.lastResult = result;
  if (result === 'correct' || result === 'close') state.score++;
  render();
}

function handleCheckSound() {
  const inp = document.getElementById('typeInput');
  if (!inp || !inp.value.trim()) return;
  const ex = state.exercises[state.idx];
  const typed = inp.value.trim().toLowerCase();
  const correct = ex.sound.toLowerCase();
  state.answered = true;
  state.typedAnswer = inp.value;
  state.lastResult = typed === correct ? 'correct' : 'wrong';
  if (typed === correct) state.score++;
  render();
}

function handleCheckTime() {
  const inp = document.getElementById('typeInput');
  if (!inp || !inp.value.trim()) return;
  const ex = state.exercises[state.idx];
  const result = checkTyped(inp.value, ex.phrase);
  state.answered = true;
  state.typedAnswer = inp.value;
  state.lastResult = result;
  if (result === 'correct' || result === 'close') state.score++;
  render();
}

function handleTF(val) {
  const ex = state.exercises[state.idx];
  state.answered = true;
  state.userChoice = val;
  const isCorrect = val === ex.answer;
  state.lastResult = isCorrect ? 'correct' : 'wrong';
  if (isCorrect) state.score++;
  render();
}

function handleWordChip(widx) {
  const ex = state.exercises[state.idx];
  if (!ex || state.answered) return;
  const blanks = ex.segments.filter(s => s.blank);
  const nextBlank = state.writingFilled.findIndex(v => v === null);
  if (nextBlank === -1) return;
  state.writingFilled[nextBlank] = ex.wordBank[widx];
  state.writingWordUsed[widx] = true;
  render();
}

function handleCheckWriting() {
  const ex = state.exercises[state.idx];
  const blanks = ex.segments.filter(s => s.blank);
  let correct = 0;
  blanks.forEach((seg, i) => {
    if (state.writingFilled[i] && state.writingFilled[i].toLowerCase() === seg.answer.toLowerCase()) correct++;
  });
  state.answered = true;
  state.score = correct;
  state.exercises[state.idx]._writingTotal = blanks.length;
  state.lastResult = correct === blanks.length ? 'correct' : correct > 0 ? 'close' : 'wrong';
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
    state.listenPlayed = false;
    // Don't reset writing state here since writing is one big exercise
    state.screen = 'exercise';

    // Auto-speak next listening exercise
    const next = state.exercises[state.idx];
    if (next && next.type === 'listen') {
      setTimeout(() => speak(next.speech), 300);
    }
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
// Wait for voices to load before first render (TTS quirk)
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {};
}

render();
