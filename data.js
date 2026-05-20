// ============================================================
// data.js — Abigail's English Exam Prep
// Jet 2, Unit 3: Animals Are Cool
// Scope: Green book p01–p16, Yellow book p01–p03
// ============================================================

// ── CONFIG — change this for a new exam ──────────────────────
const CONFIG = {
  studentName:     "Abigail",
  studentNameHe:   "אביגיל",
  examDate:        "2026-05-26",
  examDateDisplay: "May 26",
  unit:            "Jet 2 · Unit 3 · Animals Are Cool",
  unitEmojis:      "🦁🐢🐧",
  unitHe:          "הכנה למבדק — יחידה 3",
  storageKey:      "abigail_progress",
};

const DATA = {

  // ----------------------------------------------------------
  // VOCABULARY — word, emoji, Hebrew meaning
  // Sources: green p02–p16, yellow p01–p03
  // ----------------------------------------------------------
  vocabulary: [
    // Animals (green p02, yellow p01)
    { word: "animal",   emoji: "🐾", hebrew: "בעל חיים" },
    { word: "elephant", emoji: "🐘", hebrew: "פיל" },
    { word: "lion",     emoji: "🦁", hebrew: "אריה" },
    { word: "turtle",   emoji: "🐢", hebrew: "צב" },
    { word: "penguin",  emoji: "🐧", hebrew: "פינגווין" },
    { word: "zebra",    emoji: "🦓", hebrew: "זברה" },
    { word: "bird",     emoji: "🐦", hebrew: "ציפור" },
    { word: "hippo",    emoji: "🦛", hebrew: "היפופוטם" },
    // Feelings / States (green p03, p08)
    { word: "tired",    emoji: "😴", hebrew: "עייף/ה" },
    { word: "hungry",   emoji: "🤤", hebrew: "רעב/ה" },
    { word: "thirsty",  emoji: "🥤", hebrew: "צמא/ה" },
    { word: "dirty",    emoji: "🧹", hebrew: "מלוכלך/ת" },
    { word: "scared",   emoji: "😨", hebrew: "מפחד/ת" },
    { word: "cool",     emoji: "😎", hebrew: "מגניב/ה" },
    { word: "great",    emoji: "⭐", hebrew: "נהדר/ת" },
    // Actions (green p03, p08, p13)
    { word: "walk",     emoji: "🚶", hebrew: "ללכת" },
    { word: "drink",    emoji: "🥛", hebrew: "לשתות" },
    { word: "listen",   emoji: "👂", hebrew: "להקשיב" },
    { word: "watch",    emoji: "👀", hebrew: "לצפות" },
    { word: "smile",    emoji: "😊", hebrew: "לחייך" },
    { word: "try",      emoji: "💪", hebrew: "לנסות" },
    { word: "wake up",  emoji: "⏰", hebrew: "להתעורר" },
    // People (green p13)
    { word: "woman",    emoji: "👩", hebrew: "אישה" },
    { word: "people",   emoji: "👫", hebrew: "אנשים" },
    // Things (green p03, p08, yellow p01–p02)
    { word: "face",     emoji: "😀", hebrew: "פנים" },
    { word: "water",    emoji: "💧", hebrew: "מים" },
    { word: "dinner",   emoji: "🍽️", hebrew: "ארוחת ערב" },
    { word: "bath",     emoji: "🛁", hebrew: "אמבטיה" },
    { word: "tricks",   emoji: "🎩", hebrew: "פעלולים" },
    // Languages (green p12)
    { word: "Arabic",   emoji: "🌙", hebrew: "ערבית" },
    { word: "Hebrew",   emoji: "✡️", hebrew: "עברית" },
    // Function words (green p03)
    { word: "behind",   emoji: "↩️", hebrew: "מאחורי" },
    { word: "with",     emoji: "🤝", hebrew: "עם" },
    { word: "this",     emoji: "👆", hebrew: "זה / זאת" },
  ],

  // ----------------------------------------------------------
  // WORD → PICTURE groups (word + 3 distractors)
  // ----------------------------------------------------------
  wordToPicture: [
    { word: "elephant", correct: "🐘", distractors: ["🦁", "🐢", "🦓"] },
    { word: "lion",     correct: "🦁", distractors: ["🐘", "🦓", "🐧"] },
    { word: "turtle",   correct: "🐢", distractors: ["🐦", "🦛", "🐧"] },
    { word: "penguin",  correct: "🐧", distractors: ["🐢", "🦁", "🦛"] },
    { word: "zebra",    correct: "🦓", distractors: ["🐘", "🦁", "🐧"] },
    { word: "bird",     correct: "🐦", distractors: ["🐢", "🐧", "🦛"] },
    { word: "hippo",    correct: "🦛", distractors: ["🐘", "🦓", "🐢"] },
    { word: "tired",    correct: "😴", distractors: ["😨", "🤤", "😊"] },
    { word: "scared",   correct: "😨", distractors: ["😴", "😎", "🤤"] },
    { word: "hungry",   correct: "🤤", distractors: ["🥤", "😴", "😨"] },
    { word: "thirsty",  correct: "🥤", distractors: ["🤤", "😴", "🛁"] },
    { word: "dirty",    correct: "🧹", distractors: ["🛁", "🥤", "💧"] },
    { word: "bath",     correct: "🛁", distractors: ["🧹", "🍽️", "🥤"] },
    { word: "dinner",   correct: "🍽️", distractors: ["🛁", "🥤", "💧"] },
    { word: "water",    correct: "💧", distractors: ["🥤", "🛁", "🍽️"] },
    { word: "tricks",   correct: "🎩", distractors: ["💪", "👀", "😊"] },
    { word: "listen",   correct: "👂", distractors: ["👀", "🤝", "💪"] },
    { word: "watch",    correct: "👀", distractors: ["👂", "🤝", "💪"] },
    { word: "smile",    correct: "😊", distractors: ["😎", "😴", "😀"] },
    { word: "woman",    correct: "👩", distractors: ["👫", "💧", "🎩"] },
  ],

  // ----------------------------------------------------------
  // SENTENCE COMPLETION — type the missing word
  // Sources: green p03–p16, yellow p01–p03
  // ----------------------------------------------------------
  sentenceCompletion: [
    // Part 1 — animals (green p03, p05, p06)
    { sentence: "I am ___ of lions! They are big!",              answer: "scared",   emoji: "😨",    hint: "מפחד/ת" },
    { sentence: "The lion is ___ the tree.",                     answer: "behind",   emoji: "🦁🌳",  hint: "מאחורי" },
    { sentence: "My favorite ___ is an elephant.",               answer: "animal",   emoji: "🐾",    hint: "בעל חיים" },
    { sentence: "A ___ is a big cat.",                           answer: "lion",     emoji: "🦁",    hint: "אריה" },
    { sentence: "I ___ to school in the morning.",               answer: "walk",     emoji: "🚶",    hint: "ללכת" },
    { sentence: "I can swim and walk. I am a ___.",              answer: "turtle",   emoji: "🐢",    hint: "צב" },
    { sentence: "I have big ears and a long nose. I am an ___.", answer: "elephant", emoji: "🐘",    hint: "פיל" },
    { sentence: "The ___ is black and white.",                   answer: "zebra",    emoji: "🦓",    hint: "זברה" },
    // Part 2 — daily routine (green p08–p11)
    { sentence: "I am ___. I need to drink water.",              answer: "thirsty",  emoji: "🥤",    hint: "צמא/ה" },
    { sentence: "I am ___. I want to eat dinner.",               answer: "hungry",   emoji: "🤤",    hint: "רעב/ה" },
    { sentence: "I am ___. I need to sleep.",                    answer: "tired",    emoji: "😴",    hint: "עייף/ה" },
    { sentence: "The floor is ___.",                             answer: "dirty",    emoji: "🧹",    hint: "מלוכלך/ת" },
    { sentence: "I eat ___ at eight o'clock.",                   answer: "dinner",   emoji: "🍽️",   hint: "ארוחת ערב" },
    { sentence: "I play ___ my brother.",                        answer: "with",     emoji: "🤝",    hint: "עם" },
    { sentence: "My dog has a ___ on Friday.",                   answer: "bath",     emoji: "🛁",    hint: "אמבטיה" },
    { sentence: "I ___ to music every morning.",                 answer: "listen",   emoji: "👂",    hint: "להקשיב" },
    { sentence: "___ up! It's seven o'clock.",                   answer: "wake",     emoji: "⏰",    hint: "להתעורר" },
    { sentence: "My coat is ___.",                               answer: "dirty",    emoji: "🧹",    hint: "מלוכלך/ת" },
    // Part 3 — abilities and languages (green p12–p16)
    { sentence: "I am good at Arabic and ___.",                  answer: "Hebrew",   emoji: "✡️",    hint: "עברית" },
    { sentence: "The animals are so ___! I love them.",          answer: "cool",     emoji: "😎",    hint: "מגניב/ה" },
    { sentence: "She has a beautiful ___.",                      answer: "smile",    emoji: "😊",    hint: "חיוך" },
    { sentence: "I have a ___ dog.",                             answer: "great",    emoji: "⭐",    hint: "נהדר/ת" },
    { sentence: "The ___ can swim and do tricks.",               answer: "penguin",  emoji: "🐧",    hint: "פינגווין" },
    { sentence: "What are you good at? I'm good at ___.",        answer: "tricks",   emoji: "🎩",    hint: "פעלולים" },
  ],

  // ----------------------------------------------------------
  // Q&A MATCHING
  // Sources: green p04, p09, p13, p16
  // ----------------------------------------------------------
  qaMatching: [
    {
      question: "How many lions do you have?",
      correct: "I have three lions.",
      wrong: ["I want five turtles.", "It's eight o'clock.", "I'm good at tricks."]
    },
    {
      question: "What are you good at?",
      correct: "I'm good at tricks.",
      wrong: ["I have three lions.", "I want two elephants.", "It's half past six."]
    },
    {
      question: "How old are you?",
      correct: "I'm ten years old.",
      wrong: ["I'm good at tricks.", "I want two elephants.", "It's eight o'clock."]
    },
    {
      question: "Are you hungry?",
      correct: "Yes, I want to eat dinner.",
      wrong: ["I'm ten years old.", "I'm good at tricks.", "It's half past three."]
    },
    {
      question: "Can you help me?",
      correct: "Yes. I'm good at Hebrew.",
      wrong: ["I'm ten years old.", "Yes, I want to eat dinner.", "It's half past six."]
    },
    {
      question: "Where is the lion?",
      correct: "It's behind the tree.",
      wrong: ["I'm ten years old.", "Yes, I want to eat dinner.", "I'm good at tricks."]
    },
    {
      question: "What can the penguin do?",
      correct: "It can swim and do tricks.",
      wrong: ["It's behind the tree.", "I'm ten years old.", "It's half past three."]
    },
    {
      question: "I'm scared.",
      correct: "There's a lion near the tree.",
      wrong: ["I have ice cream on my face.", "They are nice.", "I'm good at tricks."]
    },
    {
      question: "Steve is dirty.",
      correct: "Have a bath.",
      wrong: ["Go to sleep.", "Eat a sandwich.", "Drink water."]
    },
    {
      question: "Linda is tired.",
      correct: "Go to sleep.",
      wrong: ["Have a bath.", "Eat a sandwich.", "Drink water."]
    },
  ],

  // ----------------------------------------------------------
  // SOUNDS — le, er, ir  (ar not in p01–p16)
  // Sources: green p02 (le), p07–p08 (er), p08–p09 (ir), p14 (le)
  // ----------------------------------------------------------
  sounds: [
    // le — end of word
    { word: "turtle",  blank: "turt__",  sound: "le", emoji: "🐢" },
    { word: "table",   blank: "tab__",   sound: "le", emoji: "🪑" },
    { word: "apple",   blank: "app__",   sound: "le", emoji: "🍎" },
    { word: "people",  blank: "peop__",  sound: "le", emoji: "👫" },
    { word: "smile",   blank: "smi__",   sound: "le", emoji: "😊" },
    // er — end of word
    { word: "dinner",  blank: "dinn__",  sound: "er", emoji: "🍽️" },
    { word: "water",   blank: "wat__",   sound: "er", emoji: "💧" },
    { word: "winter",  blank: "wint__",  sound: "er", emoji: "❄️" },
    { word: "brother", blank: "broth__", sound: "er", emoji: "👦" },
    { word: "summer",  blank: "summ__",  sound: "er", emoji: "☀️" },
    { word: "paper",   blank: "pap__",   sound: "er", emoji: "📄" },
    // ir — middle of word
    { word: "dirty",   blank: "d__ty",   sound: "ir", emoji: "🧹" },
    { word: "shirt",   blank: "sh__t",   sound: "ir", emoji: "👕" },
    { word: "bird",    blank: "b__d",    sound: "ir", emoji: "🐦" },
    { word: "thirsty", blank: "th__sty", sound: "ir", emoji: "🥤" },
    { word: "girl",    blank: "g__l",    sound: "ir", emoji: "👧" },
  ],

  // ----------------------------------------------------------
  // TRUE / FALSE
  // Sources: green p06, p14, yellow p01–p03
  // ----------------------------------------------------------
  trueFalse: [
    // green p06
    { sentence: "Fish live in water.",                            answer: true,  scene: "🐟💧" },
    { sentence: "Turtles walk fast.",                             answer: false, scene: "🐢" },
    { sentence: "Animals need water.",                            answer: true,  scene: "🐾💧" },
    { sentence: "Lions have green faces.",                        answer: false, scene: "🦁" },
    { sentence: "Elephants are small animals.",                   answer: false, scene: "🐘" },
    { sentence: "A turtle can swim and walk.",                    answer: true,  scene: "🐢🌊" },
    { sentence: "An elephant has big ears and a long nose.",      answer: true,  scene: "🐘" },
    // green p14
    { sentence: "Girls and boys are children.",                   answer: true,  scene: "👧👦" },
    { sentence: "Men and women are people.",                      answer: true,  scene: "👩👨" },
    { sentence: "Men and women are children.",                    answer: false, scene: "👩👨" },
    { sentence: "Penguins and lions are animals.",                answer: true,  scene: "🐧🦁" },
    // yellow p01 — Safari
    { sentence: "Hippos can walk in the water.",                  answer: true,  scene: "🦛💧" },
    { sentence: "Hippos can swim.",                               answer: false, scene: "🦛🌊" },
    { sentence: "The turtle has a funny face.",                   answer: true,  scene: "🐢😄" },
    { sentence: "Zebras are black and white.",                    answer: true,  scene: "🦓" },
    // yellow p02 — Bella's Day
    { sentence: "When you are thirsty, you eat dinner.",          answer: false, scene: "💧🍽️" },
    { sentence: "Bella has a bath because she is dirty.",         answer: true,  scene: "🐕🛁" },
    // yellow p03 — Peter Penguin
    { sentence: "Peter Penguin can fly.",                         answer: false, scene: "🐧" },
    { sentence: "Peter Penguin is good at swimming.",             answer: true,  scene: "🐧🌊" },
    { sentence: "Betty Bird can sing.",                           answer: true,  scene: "🐦🎵" },
  ],

  // ----------------------------------------------------------
  // READING COMPREHENSION passages
  // Sources: yellow p01–p03
  // ----------------------------------------------------------
  passages: [
    {
      id: "safari",
      title: "Safari Animals Are Cool",
      emoji: "🦒",
      color: "#55EFC4",
      text: "Jane, Percy and Liz are at the Safari Park.\nJane: Good morning! I help animals at the Safari Park.\nLiz: Look at the zebra! It's beautiful!\nLiz: Look! There is a lion behind the zebra. I'm scared of lions.\nPercy: There is a turtle near the water. It has a funny face.\nLiz: Look in the water! There are two elephants. They are playing.\nPercy: There are hippos in the water too. They are swimming.\nJane: No, they are walking in the water. Hippos can't swim.\nPercy: Wow! Hippos are cool!",
      questions: [
        {
          q: "Where are Jane, Percy and Liz?",
          type: "choice",
          options: ["At the beach", "At the Safari Park", "At the hospital"],
          answer: 1
        },
        {
          q: "What is behind the zebra?",
          type: "type",
          answer: "lion"
        },
        {
          q: "What are the elephants doing?",
          type: "choice",
          options: ["Walking", "Playing", "Swimming"],
          answer: 1
        },
        {
          q: "Who has a funny face?",
          type: "choice",
          options: ["The zebra", "The elephant", "The turtle"],
          answer: 2
        },
        {
          q: "Can hippos swim?",
          type: "choice",
          options: ["Yes, they can.", "No, they can't.", "Only a little."],
          answer: 1
        },
      ]
    },
    {
      id: "bella",
      title: "Bella's Day",
      emoji: "🐕",
      color: "#4ECDC4",
      text: "Meet my dog Bella. This is Bella's day.\nBella wakes up at seven o'clock.\nAt nine o'clock, Bella plays at home.\nAt half past eleven, Bella is thirsty. She drinks water.\nAt five o'clock, Bella is hungry. She eats dinner.\nAt half past five, Bella plays with friends.\nAt half past seven, Bella is dirty. She runs to the bath.\nAt half past nine, Bella is tired.",
      questions: [
        {
          q: "What time does Bella wake up?",
          type: "choice",
          options: ["At six o'clock", "At seven o'clock", "At nine o'clock"],
          answer: 1
        },
        {
          q: "Why does Bella drink water?",
          type: "choice",
          options: ["She is hungry", "She is thirsty", "She is tired"],
          answer: 1
        },
        {
          q: "What does Bella do at half past five?",
          type: "choice",
          options: ["She plays at home", "She plays with friends", "She runs to the bath"],
          answer: 1
        },
        {
          q: "How does Bella feel at half past nine?",
          type: "choice",
          options: ["Hungry", "Dirty", "Tired"],
          answer: 2
        },
        {
          q: "Write one word: Bella runs to the bath because she is ___.",
          type: "type",
          answer: "dirty"
        },
      ]
    },
    {
      id: "peter",
      title: "Peter Penguin",
      emoji: "🐧",
      color: "#74B9FF",
      text: "It is a cold winter day. The people are watching Betty Bird.\nShe can sing in English, Hebrew and Arabic.\nPeter Penguin is listening.\n\"I want to sing,\" says Peter.\nBetty Bird is flying in the sky. The people are smiling.\n\"I want to fly,\" says Peter.\n\"You are a penguin. You can't fly. You can't sing,\" say the people.\n\"I am good at swimming. I am good at tricks,\" says Peter.\n\"You are great, Peter!\" say the people.",
      questions: [
        {
          q: "What can Betty Bird do?",
          type: "choice",
          options: ["Swim and dance", "Sing and fly", "Run and jump"],
          answer: 1
        },
        {
          q: "What does Peter want to do?",
          type: "choice",
          options: ["Swim and do tricks", "Sing and fly", "Dance and run"],
          answer: 1
        },
        {
          q: "Write one word: Peter is good at swimming and ___.",
          type: "type",
          answer: "tricks"
        },
        {
          q: "What is the weather like?",
          type: "choice",
          options: ["Hot and sunny", "Cold and windy", "Cold winter day"],
          answer: 2
        },
        {
          q: "How do the people feel at the end?",
          type: "choice",
          options: ["Scared", "Tired", "Happy"],
          answer: 2
        },
      ]
    },
  ],

  // ----------------------------------------------------------
  // FILL IN THE BLANKS
  // Sources: yellow p01–p03, green p05–p06, p12–p15
  // ----------------------------------------------------------
  writing: [
    {
      id: "safari_day",
      title: "A Day at the Safari",
      emoji: "🦁",
      segments: [
        { text: "We are at the Safari Park. I can see a " },
        { blank: true, answer: "zebra" },
        { text: ". It is black and white. There is a " },
        { blank: true, answer: "lion" },
        { text: " behind the tree. I am " },
        { blank: true, answer: "scared" },
        { text: "! The hippos are " },
        { blank: true, answer: "walking" },
        { text: " in the water. Hippos are " },
        { blank: true, answer: "cool" },
        { text: "!" },
      ],
      wordBank: ["zebra", "lion", "scared", "walking", "cool"],
    },
    {
      id: "bella_day",
      title: "Bella's Day",
      emoji: "🐕",
      segments: [
        { text: "This is Bella's day. Bella wakes up at " },
        { blank: true, answer: "seven" },
        { text: " o'clock. At half past eleven, Bella is " },
        { blank: true, answer: "thirsty" },
        { text: ". She drinks water. At five o'clock, Bella is " },
        { blank: true, answer: "hungry" },
        { text: ". She eats dinner. At half past seven, Bella is " },
        { blank: true, answer: "dirty" },
        { text: ". She runs to the " },
        { blank: true, answer: "bath" },
        { text: "." },
      ],
      wordBank: ["seven", "thirsty", "hungry", "dirty", "bath"],
    },
    {
      id: "peter_penguin",
      title: "Peter Penguin",
      emoji: "🐧",
      segments: [
        { text: "I am a " },
        { blank: true, answer: "penguin" },
        { text: ". It is a cold " },
        { blank: true, answer: "winter" },
        { text: " day. I cannot fly and I cannot " },
        { blank: true, answer: "sing" },
        { text: ". But I am good at " },
        { blank: true, answer: "swimming" },
        { text: ". I can do " },
        { blank: true, answer: "tricks" },
        { text: " too. I am great!" },
      ],
      wordBank: ["penguin", "winter", "sing", "swimming", "tricks"],
    },
    {
      id: "animal_riddles",
      title: "Animal Riddles",
      emoji: "🐾",
      segments: [
        { text: "I can swim and " },
        { blank: true, answer: "walk" },
        { text: ". I have a funny face. I am a " },
        { blank: true, answer: "turtle" },
        { text: "! I have big " },
        { blank: true, answer: "ears" },
        { text: " and a long nose. I am an " },
        { blank: true, answer: "elephant" },
        { text: "! I am big and fast. I am a " },
        { blank: true, answer: "lion" },
        { text: "!" },
      ],
      wordBank: ["walk", "turtle", "ears", "elephant", "lion"],
    },
    {
      id: "good_at",
      title: "What Are You Good At?",
      emoji: "⭐",
      segments: [
        { text: "My name is Betty. I am a " },
        { blank: true, answer: "woman" },
        { text: ". I am good at " },
        { blank: true, answer: "Arabic" },
        { text: ". Look at the penguins. They are doing " },
        { blank: true, answer: "tricks" },
        { text: ". I " },
        { blank: true, answer: "watch" },
        { text: " the penguins every day. They make me " },
        { blank: true, answer: "smile" },
        { text: "." },
      ],
      wordBank: ["woman", "Arabic", "tricks", "watch", "smile"],
    },
  ],

  // ----------------------------------------------------------
  // LISTENING — TTS conversations
  // Sources: yellow p01–p03, green p07–p16
  // ----------------------------------------------------------
  listening: [
    {
      id: "safari_listen",
      title: "At the Safari Park",
      speech: "Jane says: Good morning children! Welcome to the Safari Park. Look at the zebra! Percy says: Wow! It is beautiful! Jane says: And look! There is a lion behind the zebra. Percy says: I am scared of lions! Jane says: Do not worry. The lion is cool.",
      question: "Which animals do they see?",
      options: ["🐘 elephant and 🦛 hippo", "🦓 zebra and 🦁 lion", "🐢 turtle and 🐦 bird"],
      answer: 1,
    },
    {
      id: "time_listen",
      title: "What Time Is It?",
      speech: "Mom says: Tom, what time is it? Tom says: It is half past seven. Mom says: Are you hungry? Tom says: Yes! I want to eat dinner. Mom says: OK, let us eat.",
      question: "What time is it?",
      options: ["It's seven o'clock", "It's half past six", "It's half past seven"],
      answer: 2,
    },
    {
      id: "tricks_listen",
      title: "What Are You Good At?",
      speech: "Teacher says: What are you good at, Maya? Maya says: I am good at tricks. Look! Teacher says: Wow, that is great! And what about you, Dan? Dan says: I am good at Arabic. Teacher says: Very good!",
      question: "What is Maya good at?",
      options: ["Arabic", "Tricks", "Swimming"],
      answer: 1,
    },
    {
      id: "bella_listen",
      title: "How Is Bella?",
      speech: "Dana says: How is your dog Bella today? Lisa says: She is tired and dirty. Dana says: Oh! Give her a bath. Lisa says: Good idea. She will be happy after a bath.",
      question: "How is Bella?",
      options: ["Hungry and thirsty", "Tired and dirty", "Scared and cool"],
      answer: 1,
    },
    {
      id: "penguin_listen",
      title: "Peter Penguin",
      speech: "Teacher says: Look at the penguin! What can it do? Sam says: It can swim. It is good at tricks. Teacher says: Can it fly? Sam says: No! Penguins cannot fly. Teacher says: You are great, Sam! You know a lot about penguins.",
      question: "What can the penguin do?",
      options: ["Fly and sing", "Swim and do tricks", "Walk and dance"],
      answer: 1,
    },
  ],

  // ----------------------------------------------------------
  // CLOCK TIMES — for "What Time Is It?" section
  // ----------------------------------------------------------
  clockTimes: [
    { h: 1,  m: 0,  phrase: "It's one o'clock"      },
    { h: 2,  m: 0,  phrase: "It's two o'clock"      },
    { h: 3,  m: 0,  phrase: "It's three o'clock"    },
    { h: 4,  m: 0,  phrase: "It's four o'clock"     },
    { h: 5,  m: 0,  phrase: "It's five o'clock"     },
    { h: 6,  m: 0,  phrase: "It's six o'clock"      },
    { h: 7,  m: 0,  phrase: "It's seven o'clock"    },
    { h: 8,  m: 0,  phrase: "It's eight o'clock"    },
    { h: 9,  m: 0,  phrase: "It's nine o'clock"     },
    { h: 10, m: 0,  phrase: "It's ten o'clock"      },
    { h: 11, m: 0,  phrase: "It's eleven o'clock"   },
    { h: 12, m: 0,  phrase: "It's twelve o'clock"   },
    { h: 1,  m: 30, phrase: "It's half past one"    },
    { h: 2,  m: 30, phrase: "It's half past two"    },
    { h: 3,  m: 30, phrase: "It's half past three"  },
    { h: 4,  m: 30, phrase: "It's half past four"   },
    { h: 5,  m: 30, phrase: "It's half past five"   },
    { h: 6,  m: 30, phrase: "It's half past six"    },
    { h: 7,  m: 30, phrase: "It's half past seven"  },
    { h: 8,  m: 30, phrase: "It's half past eight"  },
    { h: 9,  m: 30, phrase: "It's half past nine"   },
    { h: 10, m: 30, phrase: "It's half past ten"    },
    { h: 11, m: 30, phrase: "It's half past eleven" },
    { h: 12, m: 30, phrase: "It's half past twelve" },
  ],

};
