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
index.html               — shell only; loads fonts, style.css, data.js, app.js
style.css                — all styles (~420 lines)
data.js                  — CONFIG block + exam content trimmed to green p01–p16 + yellow p01–p03
app.js                   — all game logic (~1043 lines)
data-unit3-full.js       — ARCHIVE: full unit 3 data (all pages); swap in as data.js if needed
exam-material-summary.txt— detailed summary of exam material (all 10 sections)
chat-history.txt         — human-readable log of the full first conversation session
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
| `listen` | Listen & Mark | 3 questions from 1 random conversation (bank of 8) | `listen` (TTS + click) |
| `vocab` | Vocabulary | 10 (3 word-to-pic + 4 sentence-type + 3 qa-match, shuffled) | `word-to-picture`, `sentence-type`, `qa-match` |
| `sounds` | Sounds 🔡 | 12 (4 per sound le/er/ir; 2 choose + 2 type each) | `sound-choose`, `sound-type` |
| `truefalse` | True or False | 12 of 20 | `truefalse` |
| `reading` | Reading | 3 questions from 1 random passage (bank of 8) | `reading-choice`, `reading-type` |
| `writing` | Fill in the Blanks 🧩 | 3 of 10 | `writing` |
| `time` | What Time Is It? | 5 of 24 | `time-type` |
| `spelling` | Spelling ✏️ | 10 of 34 | `spelling` |

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

## Config (data.js — top of file)

All exam-specific metadata lives in a `CONFIG` object at the top of `data.js`. To adapt the app for a new exam, only these 7 lines need to change:

```js
const CONFIG = {
  studentName:     "Abigail",
  studentNameHe:   "אביגיל",
  examDate:        "2026-05-26",      // ISO format YYYY-MM-DD
  examDateDisplay: "May 26",          // shown in countdown bar
  unit:            "Jet 2 · Unit 3 · Animals Are Cool",
  unitEmojis:      "🦁🐢🐧",
  unitHe:          "הכנה למבדק — יחידה 3",
  storageKey:      "abigail_progress", // localStorage key
};
```

`app.js` reads all of these — no hard-coded names, dates, or titles anywhere in the logic.

---

## Data (data.js)

```
DATA.vocabulary[]        — 34 words: word, emoji, hebrew (trimmed to green p01–p16, yellow p01–p03)
DATA.wordToPicture[]     — 20 items: word, correct emoji, 3 distractor emojis
DATA.sentenceCompletion[]— 24 items: sentence (with ___), answer, emoji, hint (Hebrew)
DATA.qaMatching[]        — 10 Q&A pairs: question, correct answer, 3 wrong answers
DATA.sounds[]            — 16 items (le×5, er×6, ir×5): word, blank, sound, emoji — NO ar
DATA.trueFalse[]         — 20 items: sentence, answer (bool), scene emoji
DATA.passages[]          — 8 passages, each 5 sentences + 3 questions:
                           safari, bella, peter, safari_animals, toms_day,
                           betty_bird, my_favourite, lion_turtle
                           Each has .text (5 sentences) and .questions[] (3 items, type "choice" or "type")
                           1 passage picked randomly per session; ALL 3 questions shown
DATA.writing[]           — 10 fill-in exercises: safari_day, bella_day, peter_penguin,
                           animal_riddles, good_at, toms_day, animal_facts,
                           betty_bird, feelings, the_lion
                           Each has .segments[] ({text} or {blank:true, answer}) and .wordBank[]
                           3 picked randomly per session
DATA.listening[]         — 8 conversations; each has .speech (5 speaker lines) and .questions[] (3 items)
                           Conversations: safari_listen, time_listen, tricks_listen, bella_listen,
                           penguin_listen, animals_listen, routine_listen, languages_listen
                           1 conversation picked randomly per session; ALL 3 questions shown
                           Auto-play disabled — user must click "Listen" button to start TTS
DATA.clockTimes[]        — 24 times: h (1–12), m (0 or 30), phrase ("It's X o'clock" / "It's half past X")
```

---

## Sounds (exam Part 3)

Three sounds practiced: `le` (end of word), `er` (end), `ir` (middle). **`ar` is not in scope** — the given pages (green p01–p16, yellow p01–p03) contain no `ar` practice words.

For each sound, 4 words selected: 2 shown as `sound-choose` (click le/er/ir), 2 as `sound-type` (type the missing sound).

Full word list: **le** — turtle, table, apple, people, smile; **er** — dinner, water, winter, brother, summer, paper; **ir** — dirty, shirt, bird, thirsty, girl.

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
- English voice, rate 0.75 (slowed from 0.85 for clarity)
- Prefers female voice if available
- All listening exercises use real names (not "A says / B says")
- Does NOT auto-play; user clicks the "Listen" button to hear the conversation
- Listen button toggles: press while speaking → stops; press again → restarts
- Button label switches between "🔊 Listen / האזינו" and "⏹ Stop / עצור"
- Button resets to Listen automatically when speech ends naturally (`utt.onend` → `render()`)

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
6. **`getCorrectDisplay` missing `reading-choice`** — returned empty string on reveal; fixed by adding `ex.options[ex.answer]` case (same as `listen`).
7. **Sound-type hint hardcoded 'ar'** — hint and placeholder in `renderSoundType` said "le / er / ir / ar"; fixed to derive the list dynamically from `DATA.sounds` so material changes in `data.js` flow through automatically.
8. **Dead code in `attach()`** — leftover from auto-play removal set `listenPlayed = false` when it was already false; removed.
9. **`handleCheckSound` missing revealed guard** — unlike `handleCheckType`/`handleCheckTime`, continued incrementing `state.attempts` after reveal; fixed by adding the same `if (state.revealed)` guard.

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

## Where we left off (as of 2026-05-20)

The app is **complete and live**. All 8 sections are working. The most recently completed work:
- Material narrowed to green p01–p16 + yellow p01–p03 (verified by re-reading all 19 pages)
- `data.js` rewritten with trimmed content; old full content archived as `data-unit3-full.js`
- `ar` sound removed from sounds section (no supporting words in the given pages)
- CONFIG block added to top of `data.js` for easy per-exam customization
- Sounds exercise refactored to derive sound list dynamically from `DATA.sounds` —
  adding/removing a sound in `data.js` now flows through automatically with no `app.js` changes
- True/False: replaced context-dependent "Bella is thirsty at half past eleven" with
  "When you are thirsty, you eat dinner." (false) — tests vocabulary without passage memorization
- TTS rate slowed from 0.85 → 0.75; name "Noa" → "Lisa" in bella_listen (clearer pronunciation)
- **New Spelling section (8th)** — shows emoji + Hebrew hint, user types English word from memory;
  10 random words from `DATA.vocabulary` per session; same retry mechanic as other type exercises
- Section icons: Sounds=🔡, Fill in the Blanks=🧩, Spelling=✏️
- Clock section: 5 random questions per session (was 10)
- **Listening redesigned**: bank of 8 conversations (5 speaker lines each, 3 questions each);
  1 random conversation per session with ALL 3 questions shown; auto-play removed;
  3 conversations replaced to stay within green p01–p16 scope (animals_listen, routine_listen, languages_listen)
  Questions designed to require actual listening — no trivially common-knowledge answers
- **Reading expanded**: 8 passages (was 3), each 5 sentences + 3 questions;
  1 passage chosen randomly per session
- **Writing expanded**: 10 exercises (was 5); 3 chosen randomly per session
- Code review: 4 bugs fixed (getCorrectDisplay reading-choice, sound-type hint ar, dead code in attach, handleCheckSound revealed guard)
- **Vocabulary reduced**: 22 → 10 questions per session (3 word-to-pic + 4 sentence-type + 3 qa-match)
- Vocabulary section instructions updated to cover all 3 question types (English + Hebrew)
- **Typed input UX**: wrong answer text preserved in input after failed attempt; text is selected on re-focus so student can edit or retype
- **Listen button toggles**: press to start, press again to stop, resets automatically when speech ends
- Table emoji fixed in sounds section (🪑 → 🍽️)

**No outstanding bugs or pending tasks.** Waiting for next user review feedback.

---

## Source material

- `מבדק באנגלית 26-05-2026.txt` — teacher's Hebrew note (exam structure + Wordwall links)
- Green book: "Jet 2 Learn and Practice" (scanned, read via PyMuPDF → PNG images)
- Yellow book: "Jet 2 Reading and More" (scanned, read via PyMuPDF → PNG images)
- Three Wordwall vocabulary links (fetched at project start)

All exam content is documented in `exam-material-summary.txt`.
