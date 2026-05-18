# Abigail's English Exam Prep — CLAUDE.md

## Project overview

Interactive web app to help Abigail (4th grade, Israel) prepare for her English exam on **May 26, 2026**.
The exam covers **Jet 2, Unit 3: "Animals Are Cool"** and has 6 parts (Listening, Vocabulary, Sounds, Reading/True-False, Reading Comprehension, Writing/Fill-in-Blanks).

**Live URL:** https://levnir.github.io/english-exam-prep/
**GitHub:** public repo, username `levnir`, repo `english-exam-prep`
**Local preview:** open `index.html` directly in a browser — no build step needed.

---

## File structure

```
index.html          — shell only; loads fonts, style.css, data.js, app.js
style.css           — all styles (~420 lines)
data.js             — all content / game data (~624 lines)
app.js              — all game logic (~1042 lines)
exam-material-summary.txt  — detailed summary of exam material (all 10 sections)
chat-history.txt    — human-readable log of the full first conversation session
```

No build tools, no frameworks, no npm. Pure HTML/CSS/JS.

---

## Architecture

### Rendering
Single-page app. One global `state` object. Every state change calls `render()`, which replaces `document.getElementById('app').innerHTML` entirely.

Three screens: `'home'` | `'exercise'` | `'result'`

### Event delegation (critical — do not change)
Click and keydown listeners are attached **once** to `document` at init, at the very bottom of `app.js`:
```js
document.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeydown);
```
The `attach()` function (called after every render) only auto-focuses the text input. It does **not** add listeners. Adding listeners inside `attach()` or `render()` caused a severe accumulation bug that was fixed — do not reintroduce.

### State object
```js
const state = {
  screen: 'home',
  sectionId: null,
  exercises: [],
  idx: 0,
  score: 0,
  answered: false,
  lastResult: null,       // 'correct' | 'close' | 'wrong'
  attempts: 0,            // wrong attempts on current question
  revealed: false,        // true after 3 wrong attempts — shows correct answer
  wrongClicks: [],        // indices of already-tried wrong options (click exercises)
  writingFilled: null,    // array of word-bank indices (null = empty)
  writingLocked: null,    // array of booleans (true = correct, permanently green)
  userChoice: null,
  typedAnswer: null,
  listenPlayed: false,
  progress: JSON.parse(localStorage.getItem('abigail_progress') || '{}'),
};
```

---

## Sections (SECTIONS array in app.js)

| id | Title | Exercises | Exercise types |
|----|-------|-----------|----------------|
| `listen` | Listen & Mark | 5 | `listen` (TTS + click) |
| `vocab` | Vocabulary | ~22 (8 word-to-pic + 8 sentence-type + 6 qa-match, shuffled) | `word-to-picture`, `sentence-type`, `qa-match` |
| `sounds` | Sounds | 16 (4 per sound le/er/ir/ar; 2 choose + 2 type each) | `sound-choose`, `sound-type` |
| `truefalse` | True or False | 12 of 20 | `truefalse` |
| `reading` | Reading | 5 questions from 1 random passage | `reading-choice`, `reading-type` |
| `writing` | Fill in the Blanks | 5 | `writing` |
| `time` | What Time Is It? | 10 of 24 | `time-type` |

---

## Retry mechanic (applies to ALL exercise types)

**Click-based** (word-to-picture, qa-match, listen, sound-choose, reading-choice, truefalse):
- Wrong click → button fades (`.tried` class, opacity 0.5), attempt counter increments
- After 3 wrong attempts → `state.revealed = true` → correct answer highlighted green, wrong options disabled
- User must click the correct (now highlighted) button to advance — no score awarded

**Type-based** (sentence-type, reading-type, sound-type, time-type):
- "Close" (1–2 char typo) is treated the same as "wrong" — no leniency
- After 3 wrong attempts → `state.revealed = true` → answer shown in feedback
- User must type the exact correct answer to advance — no score awarded after reveal

**Writing** (fill-in-blanks):
- No attempt limit — word bank always visible
- On Check: correct blanks lock green, wrong blanks clear back to bank
- Retry until all blanks locked (no score deducted for retries; score always +1 on completion)

**Score:** only incremented if `state.attempts === 0` when correct answer given.

**`optState(idx, isCorrect)` helper** — centralizes button CSS class + disabled logic for all click exercises. Called from every click-exercise renderer.

---

## Data (data.js)

```
DATA.vocabulary[]        — 51 words: word, emoji, hebrew
DATA.wordToPicture[]     — 26 items: word, correct emoji, 3 distractor emojis
DATA.sentenceCompletion[]— 24 items: sentence (with ___), answer, emoji, hint (Hebrew)
DATA.qaMatching[]        — 10 Q&A pairs: question, correct answer, 3 wrong answers
DATA.sounds[]            — 28 items (7 per sound le/er/ir/ar): word, blank, sound, emoji
DATA.trueFalse[]         — 20 items: sentence, answer (bool), scene emoji
DATA.passages[]          — 5 passages: bella, ari, peter, hospital, safari
                           Each has .text and .questions[] ({q, type, options?, answer})
DATA.writing[]           — 5 fill-in exercises: safari_day, party, busy_day,
                           peter_writes, hospital_day
                           Each has .segments[] ({text} or {blank:true, answer}) and .wordBank[]
DATA.listening[]         — 5 TTS exercises: speech string, question, options[], answer index
DATA.clockTimes[]        — 24 times: h (1–12), m (0 or 30), phrase ("It's X o'clock" / "It's half past X")
```

---

## Sounds (exam Part 3)

Four sounds practiced: `le` (end of word), `er` (end), `ir` (middle), `ar` (middle/end).

For each sound, 4 words selected: 2 shown as `sound-choose` (click le/er/ir/ar), 2 as `sound-type` (type the missing sound).

---

## CSS / Theme

File: `style.css`. Safari/animals color scheme.

CSS variables:
```css
--green-dark:  #2D6A4F   /* primary dark green */
--green-mid:   #40916C
--green-light: #95D5B2
--yellow:      #F4A261
--orange:      #E76F51
--cream:       #FFF8E7   /* page background */
--correct:     #52B788
--wrong:       #E63946
--close:       #F4A261
```

Key classes:
- `.opt-btn.correct` — green, shown when answered or revealed
- `.opt-btn.wrong` — red (immediate wrong feedback)
- `.opt-btn.tried` — faded red (opacity 0.5), shows exhausted wrong options
- `.fill-blank` / `.fill-blank.filled` — writing section blank slots
- `.feedback.correct/.wrong/.close` — animated feedback banner
- `.clock-svg` — SVG analog clock

---

## Audio

**Sound effects** (`playSound(result)` in app.js, Web Audio API, no files):
- `correct`: two-note ascending chime E5 (659 Hz) → A5 (880 Hz)
- `close`: single A4 (440 Hz) sine tone
- `wrong`: short sawtooth buzz at 180 Hz

**TTS** (`speak(text)` in app.js, Web Speech API):
- Used for listening section
- English voice, rate 0.85
- Prefers female voice if available
- All listening exercises use real names (not "A says / B says"): Dana/Noa, Mom/Lior, Teacher/Maya/Dan, Adam/Bob, Jane/Percy/Liz

---

## Clock SVG

`clockSVG(h, m)` in app.js generates inline SVG (180×180 px):
- Hour hand: dark green, 55% radius
- Minute hand: yellow (#F4A261), 78% radius
- Red center dot, 12 number labels, 12 tick marks

---

## Progress persistence

`localStorage` key: `abigail_progress`
Value: `{ listen: 0–3, vocab: 0–3, sounds: 0–3, ... }`
Stars: ≥80% → 3 stars, ≥50% → 2 stars, else 1 star.
Best score per section is saved (never decremented).

---

## Known bugs fixed (do not re-introduce)

1. **Duplicate event listener accumulation** — fixed by attaching listeners once to `document`, not inside `attach()`.
2. **True/False freeze** — `handleChoice` was missing `ex.type === 'truefalse'` case. Fixed: `isCorrect = (val === ex.answer)`.
3. **"Close" too lenient** — close answers previously advanced question. Fixed: close treated same as wrong (increments attempts, no advance).
4. **Writing section string vs index** — rewrote to store word-bank indices in `writingFilled`, not string values.
5. **TTS name "Yael" unclear** — changed to "Maya" throughout.

---

## Deployment

GitHub Pages hosts the `main` branch root. After any change:
```
git add <files>
git commit -m "description"
git push
```
Live site updates in ~1–2 minutes. No build step.

---

## Where we left off (as of 2026-05-18)

The app is **complete and live**. All 7 sections are working. The user (Abigail's father) is reviewing the app section by section and providing corrections. The most recently completed tasks were:
- Clock section reduced from 12 to 10 questions
- `exam-material-summary.txt` created (10-section detailed exam material reference)
- `chat-history.txt` created (readable log of the full first session, 97 messages)

**No outstanding bugs or pending tasks.** Waiting for next user review feedback.

---

## Source material

- `מבדק באנגלית 26-05-2026.txt` — teacher's Hebrew note (exam structure + Wordwall links)
- Green book: "Jet 2 Learn and Practice" (scanned, read via PyMuPDF → PNG images)
- Yellow book: "Jet 2 Reading and More" (scanned, read via PyMuPDF → PNG images)
- Three Wordwall vocabulary links (fetched at project start)

All exam content is documented in `exam-material-summary.txt`.
