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
    { word: "table",   blank: "tab__",   sound: "le", emoji: "🍽️" },
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
      text: "Jane, Percy and Liz are at the Safari Park.\nThere is a lion behind the zebra — Liz is scared of lions.\nThere is a turtle near the water. It has a funny face.\nTwo elephants are playing in the water.\nHippos are in the water too, but they cannot swim.",
      questions: [
        {
          q: "Write one word: There is a ___ behind the zebra.",
          type: "type",
          answer: "lion"
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
      text: "This is Bella the dog.\nBella wakes up at seven o'clock.\nAt half past eleven, Bella is thirsty and drinks water.\nAt five o'clock, Bella is hungry and eats dinner.\nAt half past seven, Bella is dirty and runs to the bath.",
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
      text: "It is a cold winter day.\nBetty Bird can sing in English, Hebrew and Arabic, and she can fly.\nPeter Penguin wants to sing and fly too.\nThe people say: you are a penguin — you cannot fly or sing.\nPeter says he is good at swimming and tricks, and the people say he is great!",
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
      ]
    },
    {
      id: "safari_animals",
      title: "Animals at the Safari",
      emoji: "🦁",
      color: "#F6D365",
      text: "A lion is big and fast and lives in Africa.\nAn elephant has big ears and a long nose.\nA hippo walks in the water — it cannot swim fast.\nA turtle is slow and has a funny face.\nA turtle can swim and walk.",
      questions: [
        {
          q: "Write one word: A lion lives in ___.",
          type: "type",
          answer: "Africa"
        },
        {
          q: "Can hippos swim fast?",
          type: "choice",
          options: ["Yes, they can.", "No, they can't.", "Only a little."],
          answer: 1
        },
        {
          q: "Write one word: A turtle is ___ and has a funny face.",
          type: "type",
          answer: "slow"
        },
      ]
    },
    {
      id: "toms_day",
      title: "Tom's Day",
      emoji: "🕐",
      color: "#FDCB6E",
      text: "My name is Tom.\nI wake up at seven o'clock.\nAt one o'clock, I am hungry and eat dinner.\nAt half past five, I am thirsty and drink water.\nAt nine o'clock, I am tired and go to sleep.",
      questions: [
        {
          q: "What time does Tom wake up?",
          type: "choice",
          options: ["Six o'clock", "Seven o'clock", "Half past seven"],
          answer: 1
        },
        {
          q: "Why does Tom drink water?",
          type: "choice",
          options: ["He is hungry", "He is tired", "He is thirsty"],
          answer: 2
        },
        {
          q: "Write one word: At nine o'clock, Tom is ___.",
          type: "type",
          answer: "tired"
        },
      ]
    },
    {
      id: "betty_bird",
      title: "Betty Bird",
      emoji: "🐦",
      color: "#A29BFE",
      text: "Betty Bird can sing in English, Hebrew and Arabic.\nShe can fly in the sky too.\nThe people watch Betty and smile.\nBetty is good at singing.\nShe is great!",
      questions: [
        {
          q: "What can Betty do?",
          type: "choice",
          options: ["Swim and dance", "Sing and fly", "Run and jump"],
          answer: 1
        },
        {
          q: "How many languages can Betty sing in?",
          type: "choice",
          options: ["One", "Two", "Three"],
          answer: 2
        },
        {
          q: "What do the people do when they watch Betty?",
          type: "choice",
          options: ["Sing", "Smile", "Dance"],
          answer: 1
        },
      ]
    },
    {
      id: "my_favourite",
      title: "My Favourite Animal",
      emoji: "🐧",
      color: "#74B9FF",
      text: "My name is Dana and my favourite animal is the penguin.\nA penguin is a bird, but it cannot fly or sing.\nA penguin is good at swimming.\nIt can do tricks too.\nI love penguins!",
      questions: [
        {
          q: "Write one word: Dana's favourite animal is the ___.",
          type: "type",
          answer: "penguin"
        },
        {
          q: "Can a penguin fly?",
          type: "choice",
          options: ["Yes, it can.", "No, it can't.", "Only a little."],
          answer: 1
        },
        {
          q: "What is a penguin good at?",
          type: "choice",
          options: ["Singing", "Flying", "Swimming"],
          answer: 2
        },
      ]
    },
    {
      id: "lion_turtle",
      title: "The Lion and the Turtle",
      emoji: "🦁🐢",
      color: "#55EFC4",
      text: "The lion is behind a big tree.\nThe lion is big and fast and wants to eat the turtle.\nThe turtle is slow and near the water.\nThe turtle goes into the water — the lion cannot swim.\nThe turtle is safe!",
      questions: [
        {
          q: "Where is the lion?",
          type: "choice",
          options: ["Near the water", "Behind a big tree", "In the water"],
          answer: 1
        },
        {
          q: "What does the lion want?",
          type: "choice",
          options: ["To swim in the water", "To eat the turtle", "To play with the turtle"],
          answer: 1
        },
        {
          q: "Why is the turtle safe?",
          type: "choice",
          options: ["Turtles are fast", "The lion is scared", "The lion cannot swim"],
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
    {
      id: "toms_day",
      title: "Tom's Day",
      emoji: "🕐",
      segments: [
        { text: "My name is Tom. I wake up at " },
        { blank: true, answer: "seven" },
        { text: " o'clock. I am hungry. I eat " },
        { blank: true, answer: "dinner" },
        { text: ". At half past five, I am " },
        { blank: true, answer: "thirsty" },
        { text: ". I drink water. At nine o'clock, I am " },
        { blank: true, answer: "tired" },
        { text: ". I go to " },
        { blank: true, answer: "sleep" },
        { text: "." },
      ],
      wordBank: ["seven", "dinner", "thirsty", "tired", "sleep"],
    },
    {
      id: "animal_facts",
      title: "Animal Facts",
      emoji: "🐾",
      segments: [
        { text: "A lion is a big " },
        { blank: true, answer: "animal" },
        { text: ". It is fast. A zebra is " },
        { blank: true, answer: "black" },
        { text: " and white. An elephant has big ears and a long " },
        { blank: true, answer: "nose" },
        { text: ". A turtle is very " },
        { blank: true, answer: "slow" },
        { text: ". A hippo walks in the " },
        { blank: true, answer: "water" },
        { text: "." },
      ],
      wordBank: ["animal", "black", "nose", "slow", "water"],
    },
    {
      id: "betty_bird",
      title: "Betty Bird",
      emoji: "🐦",
      segments: [
        { text: "Betty is a " },
        { blank: true, answer: "bird" },
        { text: ". She can sing in " },
        { blank: true, answer: "English" },
        { text: ", Hebrew and Arabic. She can fly in the " },
        { blank: true, answer: "sky" },
        { text: ". The people watch Betty and " },
        { blank: true, answer: "smile" },
        { text: ". Betty is great at " },
        { blank: true, answer: "singing" },
        { text: "!" },
      ],
      wordBank: ["bird", "English", "sky", "smile", "singing"],
    },
    {
      id: "feelings",
      title: "Feelings",
      emoji: "😊",
      segments: [
        { text: "When I am " },
        { blank: true, answer: "thirsty" },
        { text: ", I drink water. When I am " },
        { blank: true, answer: "hungry" },
        { text: ", I eat dinner. When I am " },
        { blank: true, answer: "tired" },
        { text: ", I go to sleep. When I am " },
        { blank: true, answer: "dirty" },
        { text: ", I run to the bath. When I am " },
        { blank: true, answer: "scared" },
        { text: ", I do not want to go to school." },
      ],
      wordBank: ["thirsty", "hungry", "tired", "dirty", "scared"],
    },
    {
      id: "the_lion",
      title: "The Lion",
      emoji: "🦁",
      segments: [
        { text: "A " },
        { blank: true, answer: "lion" },
        { text: " is big and fast. It lives in Africa. It has a big mouth and a funny " },
        { blank: true, answer: "face" },
        { text: ". A lion is " },
        { blank: true, answer: "cool" },
        { text: "! The lion is " },
        { blank: true, answer: "behind" },
        { text: " the tree. I am " },
        { blank: true, answer: "scared" },
        { text: " of lions!" },
      ],
      wordBank: ["lion", "face", "cool", "behind", "scared"],
    },
  ],

  // ----------------------------------------------------------
  // LISTENING — TTS conversations (8 conversations, 3 questions each)
  // Each conversation = 5 speaker lines. One chosen randomly per session.
  // Sources: yellow p01–p03, green p01–p16
  // ----------------------------------------------------------
  listening: [
    {
      id: "safari_listen",
      title: "At the Safari Park",
      speech: "Jane says: Welcome to the Safari Park! Look at the zebra. Percy says: Wow! It is black and white and beautiful. Jane says: And there is a lion behind the zebra. Percy says: I am scared of lions! Jane says: Do not worry. The lion is cool.",
      questions: [
        { q: "What does Jane say about the lion?",       options: ["The lion is hungry", "The lion is cool", "The lion is scared"], answer: 1 },
        { q: "Where is the lion?",                     options: ["Near the water", "Behind the zebra", "In the tree"],        answer: 1 },
        { q: "How does Percy feel about lions?",       options: ["Happy", "Cool", "Scared"],                                  answer: 2 },
      ],
    },
    {
      id: "time_listen",
      title: "What Time Is It?",
      speech: "Mom says: Tom, wake up! It is seven o'clock. Tom says: I am hungry, Mom. Mom says: We eat dinner at half past six. Tom says: And what time do I go to sleep? Mom says: You go to sleep at nine o'clock.",
      questions: [
        { q: "What time does Tom wake up?",            options: ["Half past six", "Six o'clock", "Seven o'clock"],            answer: 2 },
        { q: "What time do they eat dinner?",          options: ["Six o'clock", "Half past six", "Half past seven"],          answer: 1 },
        { q: "What time does Tom go to sleep?",        options: ["Nine o'clock", "Half past eight", "Half past nine"],        answer: 0 },
      ],
    },
    {
      id: "tricks_listen",
      title: "What Are You Good At?",
      speech: "Teacher says: What are you good at, Maya? Maya says: I am good at tricks! Teacher says: And you, Dan? Dan says: I am good at Arabic. Teacher says: You are both great!",
      questions: [
        { q: "What is Maya good at?",                  options: ["Arabic", "Tricks", "Swimming"],                             answer: 1 },
        { q: "What is Dan good at?",                   options: ["Tricks", "Swimming", "Arabic"],                             answer: 2 },
        { q: "What does the teacher say at the end?",  options: ["Try again!", "Good luck!", "You are both great!"],          answer: 2 },
      ],
    },
    {
      id: "bella_listen",
      title: "How Is Bella?",
      speech: "Dana says: How is your dog Bella today? Lisa says: She is tired and dirty. Dana says: What happened? Lisa says: Bella played in the park all day. Dana says: Give her a bath and let her sleep!",
      questions: [
        { q: "How is Bella?",                          options: ["Hungry and thirsty", "Tired and dirty", "Scared and cool"], answer: 1 },
        { q: "Where did Bella play?",                  options: ["At the beach", "At the farm", "In the park"],              answer: 2 },
        { q: "What does Dana say Lisa should do?",     options: ["Feed Bella dinner", "Take Bella to the vet", "Give her a bath and let her sleep"], answer: 2 },
      ],
    },
    {
      id: "penguin_listen",
      title: "Peter Penguin",
      speech: "Adam says: Can a penguin fly? Bob says: No! Penguins cannot fly. Adam says: Can Peter sing? Bob says: No. But Peter is great at swimming and tricks! Adam says: Peter is a great penguin!",
      questions: [
        { q: "What two things can Peter NOT do?",       options: ["Swim and walk", "Fly and sing", "Run and jump"],            answer: 1 },
        { q: "What is Peter great at?",                options: ["Singing and dancing", "Flying and running", "Swimming and tricks"], answer: 2 },
        { q: "What does Adam say about Peter?",        options: ["Peter is a great penguin!", "Peter cannot fly or sing", "Peter is scared"], answer: 0 },
      ],
    },
    {
      id: "animals_listen",
      title: "Animals Are Cool!",
      speech: "Dana says: Tell me about elephants. Tom says: Elephants are great! They have a long nose and they play in the water. Dana says: And turtles? Tom says: Turtles are very slow. But they can swim! Dana says: Which animal do you like more? Tom says: I like turtles more!",
      questions: [
        { q: "What does Tom say elephants do in the water?", options: ["Sleep", "Play", "Swim fast"],                         answer: 1 },
        { q: "What does Tom say about turtles?",       options: ["They are fast and can fly", "They are very slow but can swim", "They are big and cool"], answer: 1 },
        { q: "Which animal does Tom like more?",       options: ["Elephants", "Lions", "Turtles"],                            answer: 2 },
      ],
    },
    {
      id: "routine_listen",
      title: "Lisa's Day",
      speech: "Amy says: Lisa, what time do you wake up? Lisa says: I wake up at half past six. Amy says: When do you eat dinner? Lisa says: At six o'clock. And I go to sleep at half past nine. Amy says: That is late!",
      questions: [
        { q: "What time does Lisa wake up?",           options: ["Six o'clock", "Half past six", "Seven o'clock"],           answer: 1 },
        { q: "What time does Lisa eat dinner?",        options: ["Six o'clock", "Half past five", "Half past six"],           answer: 0 },
        { q: "What does Amy say about Lisa's bedtime?", options: ["That is early!", "Good for you!", "That is late!"],        answer: 2 },
      ],
    },
    {
      id: "languages_listen",
      title: "What Languages Do You Know?",
      speech: "Sara says: Tom, what languages can you speak? Tom says: I can speak Hebrew and English. Sara says: Can you speak Arabic? Tom says: A little. I am good at English. Sara says: I am good at Hebrew. I have a test today!",
      questions: [
        { q: "What languages can Tom speak?",          options: ["English and Arabic", "Hebrew and English", "Hebrew and Arabic"], answer: 1 },
        { q: "What is Tom good at?",                   options: ["Arabic", "Hebrew", "English"],                              answer: 2 },
        { q: "What does Sara have today?",             options: ["A test in Hebrew", "A birthday party", "An English lesson"], answer: 0 },
      ],
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
