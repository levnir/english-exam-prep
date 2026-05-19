// ============================================================
// data.js — All content for Abigail's English Exam Prep App
// Jet 2, Unit 3: Animals Are Cool
// ============================================================

const DATA = {

  // ----------------------------------------------------------
  // VOCABULARY — word, emoji, Hebrew meaning
  // ----------------------------------------------------------
  vocabulary: [
    { word: "animal",   emoji: "🐾", hebrew: "בעל חיים" },
    { word: "elephant", emoji: "🐘", hebrew: "פיל" },
    { word: "lion",     emoji: "🦁", hebrew: "אריה" },
    { word: "turtle",   emoji: "🐢", hebrew: "צב" },
    { word: "penguin",  emoji: "🐧", hebrew: "פינגווין" },
    { word: "zebra",    emoji: "🦓", hebrew: "זברה" },
    { word: "bird",     emoji: "🐦", hebrew: "ציפור" },
    { word: "horse",    emoji: "🐴", hebrew: "סוס" },
    { word: "kitten",   emoji: "🐱", hebrew: "חתלתול" },
    { word: "tired",    emoji: "😴", hebrew: "עייף/ה" },
    { word: "hungry",   emoji: "🤤", hebrew: "רעב/ה" },
    { word: "thirsty",  emoji: "🥤", hebrew: "צמא/ה" },
    { word: "dirty",    emoji: "🧹", hebrew: "מלוכלך/ת" },
    { word: "scared",   emoji: "😨", hebrew: "מפחד/ת" },
    { word: "cool",     emoji: "😎", hebrew: "מגניב/ה" },
    { word: "great",    emoji: "⭐", hebrew: "נהדר/ת" },
    { word: "drink",    emoji: "🥛", hebrew: "לשתות" },
    { word: "listen",   emoji: "👂", hebrew: "להקשיב" },
    { word: "watch",    emoji: "👀", hebrew: "לצפות" },
    { word: "walk",     emoji: "🚶", hebrew: "ללכת" },
    { word: "smile",    emoji: "😊", hebrew: "לחייך" },
    { word: "try",      emoji: "💪", hebrew: "לנסות" },
    { word: "clean",    emoji: "🧽", hebrew: "לנקות" },
    { word: "dance",    emoji: "💃", hebrew: "לרקוד" },
    { word: "ride",     emoji: "🚲", hebrew: "לרכב" },
    { word: "bring",    emoji: "🎁", hebrew: "להביא" },
    { word: "wake up",  emoji: "⏰", hebrew: "להתעורר" },
    { word: "bath",     emoji: "🛁", hebrew: "אמבטיה" },
    { word: "dinner",   emoji: "🍽️", hebrew: "ארוחת ערב" },
    { word: "birthday", emoji: "🎂", hebrew: "יום הולדת" },
    { word: "cake",     emoji: "🍰", hebrew: "עוגה" },
    { word: "beach",    emoji: "🏖️", hebrew: "חוף ים" },
    { word: "sea",      emoji: "🌊", hebrew: "ים" },
    { word: "farm",     emoji: "🌾", hebrew: "חווה" },
    { word: "swimsuit", emoji: "🩱", hebrew: "בגד ים" },
    { word: "bike",     emoji: "🚲", hebrew: "אופניים" },
    { word: "floor",    emoji: "🏠", hebrew: "רצפה" },
    { word: "table",    emoji: "🪑", hebrew: "שולחן" },
    { word: "hospital", emoji: "🏥", hebrew: "בית חולים" },
    { word: "doctor",   emoji: "🩺", hebrew: "רופא/ה" },
    { word: "people",   emoji: "👫", hebrew: "אנשים" },
    { word: "woman",    emoji: "👩", hebrew: "אישה" },
    { word: "face",     emoji: "😀", hebrew: "פנים" },
    { word: "tricks",   emoji: "🎩", hebrew: "פעלולים" },
    { word: "behind",   emoji: "↩️", hebrew: "מאחורי" },
    { word: "water",    emoji: "💧", hebrew: "מים" },
    { word: "with",     emoji: "🤝", hebrew: "עם" },
    { word: "Arabic",   emoji: "🌙", hebrew: "ערבית" },
    { word: "Hebrew",   emoji: "✡️", hebrew: "עברית" },
    { word: "star",     emoji: "⭐", hebrew: "כוכב" },
    { word: "park",     emoji: "🌳", hebrew: "פארק" },
  ],

  // ----------------------------------------------------------
  // WORD → PICTURE groups (word + 3 distractors from same category)
  // ----------------------------------------------------------
  wordToPicture: [
    { word: "elephant", correct: "🐘", distractors: ["🦁", "🐢", "🦓"] },
    { word: "lion",     correct: "🦁", distractors: ["🐘", "🦓", "🐧"] },
    { word: "turtle",   correct: "🐢", distractors: ["🐦", "🐱", "🦛"] },
    { word: "penguin",  correct: "🐧", distractors: ["🐢", "🦁", "🐴"] },
    { word: "zebra",    correct: "🦓", distractors: ["🐘", "🦁", "🐴"] },
    { word: "horse",    correct: "🐴", distractors: ["🦓", "🐘", "🦁"] },
    { word: "bird",     correct: "🐦", distractors: ["🐱", "🐢", "🐧"] },
    { word: "kitten",   correct: "🐱", distractors: ["🐦", "🐢", "🐴"] },
    { word: "tired",    correct: "😴", distractors: ["😨", "🤤", "😊"] },
    { word: "scared",   correct: "😨", distractors: ["😴", "😎", "🤤"] },
    { word: "hungry",   correct: "🤤", distractors: ["🥤", "😴", "😨"] },
    { word: "thirsty",  correct: "🥤", distractors: ["🤤", "😴", "🛁"] },
    { word: "dirty",    correct: "🧹", distractors: ["🛁", "🥤", "🧽"] },
    { word: "bath",     correct: "🛁", distractors: ["🧹", "🍽️", "🥤"] },
    { word: "dinner",   correct: "🍽️", distractors: ["🍰", "🛁", "🥤"] },
    { word: "birthday", correct: "🎂", distractors: ["🎁", "🎉", "🍰"] },
    { word: "cake",     correct: "🍰", distractors: ["🎂", "🍽️", "🎁"] },
    { word: "beach",    correct: "🏖️", distractors: ["🌊", "🌾", "🌳"] },
    { word: "farm",     correct: "🌾", distractors: ["🏖️", "🌳", "🏥"] },
    { word: "hospital", correct: "🏥", distractors: ["🏖️", "🌾", "🌳"] },
    { word: "bike",     correct: "🚲", distractors: ["🐴", "🚶", "🎁"] },
    { word: "doctor",   correct: "🩺", distractors: ["👩", "👫", "🎩"] },
    { word: "tricks",   correct: "🎩", distractors: ["🎁", "🎂", "🩺"] },
    { word: "listen",   correct: "👂", distractors: ["👀", "🤝", "💪"] },
    { word: "smile",    correct: "😊", distractors: ["😎", "😴", "💃"] },
    { word: "dance",    correct: "💃", distractors: ["🚶", "🚲", "😊"] },
  ],

  // ----------------------------------------------------------
  // SENTENCE COMPLETION — type the missing word
  // ----------------------------------------------------------
  sentenceCompletion: [
    { sentence: "I am ___. I need to drink water.",            answer: "thirsty",  emoji: "🥤",  hint: "צמא/ה" },
    { sentence: "I am ___. I want to eat dinner.",             answer: "hungry",   emoji: "🤤",  hint: "רעב/ה" },
    { sentence: "I am ___. I need to sleep.",                  answer: "tired",    emoji: "😴",  hint: "עייף/ה" },
    { sentence: "The floor is ___. Let's clean it.",           answer: "dirty",    emoji: "🧹",  hint: "מלוכלך/ת" },
    { sentence: "I am ___ of lions! They are big!",            answer: "scared",   emoji: "😨",  hint: "מפחד/ת" },
    { sentence: "The lion is ___ the tree.",                   answer: "behind",   emoji: "🦁🌳", hint: "מאחורי" },
    { sentence: "I ___ to music every morning.",               answer: "listen",   emoji: "👂",  hint: "להקשיב" },
    { sentence: "I can ___ a bike to school.",                 answer: "ride",     emoji: "🚲",  hint: "לרכב" },
    { sentence: "Please ___ a cake to the party.",             answer: "bring",    emoji: "🎂",  hint: "להביא" },
    { sentence: "The ___ is black and white.",                 answer: "zebra",    emoji: "🦓",  hint: "זברה" },
    { sentence: "The ___ can swim and do tricks.",             answer: "penguin",  emoji: "🐧",  hint: "פינגווין" },
    { sentence: "She is a ___. She works at the hospital.",    answer: "doctor",   emoji: "🩺",  hint: "רופא/ה" },
    { sentence: "I eat ___ at seven o'clock.",                 answer: "dinner",   emoji: "🍽️",  hint: "ארוחת ערב" },
    { sentence: "Hippos ___ in the water.",                    answer: "walk",     emoji: "🦛💧", hint: "ללכת" },
    { sentence: "Let's have a ___. I am dirty.",               answer: "bath",     emoji: "🛁",  hint: "אמבטיה" },
    { sentence: "Happy ___! How old are you?",                 answer: "birthday", emoji: "🎂",  hint: "יום הולדת" },
    { sentence: "The people love to ___ to music.",            answer: "dance",    emoji: "💃",  hint: "לרקוד" },
    { sentence: "Put the cake on the ___.",                    answer: "table",    emoji: "🪑",  hint: "שולחן" },
    { sentence: "The floor is dirty. Let's ___ it.",           answer: "clean",    emoji: "🧽",  hint: "לנקות" },
    { sentence: "We swim in the ___ at the beach.",            answer: "sea",      emoji: "🌊",  hint: "ים" },
    { sentence: "I am good at Arabic and ___.",                answer: "Hebrew",   emoji: "✡️",  hint: "עברית" },
    { sentence: "The animals are so ___! I love them.",        answer: "cool",     emoji: "😎",  hint: "מגניב/ה" },
    { sentence: "She has a beautiful ___ . She is smiling.",   answer: "smile",    emoji: "😊",  hint: "חיוך" },
    { sentence: "___ up! It's seven o'clock.",                 answer: "wake",     emoji: "⏰",  hint: "להתעורר" },
  ],

  // ----------------------------------------------------------
  // Q&A MATCHING — match the question to the right answer
  // ----------------------------------------------------------
  qaMatching: [
    {
      question: "How many lions do you have?",
      correct: "I have three lions.",
      wrong: ["I want five turtles.", "It's eight o'clock.", "I'm good at tricks."]
    },
    {
      question: "How many elephants do you want?",
      correct: "I want two elephants.",
      wrong: ["I have three lions.", "I'm good at Hebrew.", "It's half past six."]
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
      question: "How many brothers do you have?",
      correct: "I have two brothers.",
      wrong: ["I'm ten years old.", "I'm good at Arabic.", "It's half past three."]
    },
    {
      question: "Are you hungry?",
      correct: "Yes, I want to eat dinner.",
      wrong: ["I have two brothers.", "I'm ten years old.", "I'm good at tricks."]
    },
    {
      question: "Can you help me?",
      correct: "Yes. I'm good at Hebrew.",
      wrong: ["I have two brothers.", "Yes, I want to eat dinner.", "I'm ten years old."]
    },
    {
      question: "Where is the lion?",
      correct: "It's behind the tree.",
      wrong: ["I have two brothers.", "Yes, I want to eat dinner.", "I'm good at tricks."]
    },
    {
      question: "What can the penguin do?",
      correct: "It can swim and do tricks.",
      wrong: ["It's behind the tree.", "I have two brothers.", "It's half past three."]
    },
    {
      question: "Is the floor dirty?",
      correct: "Yes. Let's clean it.",
      wrong: ["It can swim and do tricks.", "I'm ten years old.", "I have two brothers."]
    },
  ],

  // ----------------------------------------------------------
  // SOUNDS — le, er, ir, ar
  // Each item: full word, the blank version, the sound to fill in
  // ----------------------------------------------------------
  sounds: [
    // le
    { word: "turtle",   blank: "turt__",   sound: "le",  emoji: "🐢" },
    { word: "table",    blank: "tab__",    sound: "le",  emoji: "🪑" },
    { word: "people",   blank: "peop__",   sound: "le",  emoji: "👫" },
    { word: "apple",    blank: "app__",    sound: "le",  emoji: "🍎" },
    { word: "little",   blank: "litt__",   sound: "le",  emoji: "🐭" },
    { word: "purple",   blank: "purp__",   sound: "le",  emoji: "🟣" },
    { word: "smile",    blank: "smi__",    sound: "le",  emoji: "😊" },
    // er
    { word: "dinner",   blank: "dinn__",   sound: "er",  emoji: "🍽️" },
    { word: "water",    blank: "wat__",    sound: "er",  emoji: "💧" },
    { word: "winter",   blank: "wint__",   sound: "er",  emoji: "❄️" },
    { word: "sister",   blank: "sist__",   sound: "er",  emoji: "👧" },
    { word: "teacher",  blank: "teach__",  sound: "er",  emoji: "📚" },
    { word: "letter",   blank: "lett__",   sound: "er",  emoji: "✉️" },
    { word: "under",    blank: "und__",    sound: "er",  emoji: "⬇️" },
    // ir
    { word: "dirty",    blank: "d__ty",    sound: "ir",  emoji: "🧹" },
    { word: "bird",     blank: "b__d",     sound: "ir",  emoji: "🐦" },
    { word: "shirt",    blank: "sh__t",    sound: "ir",  emoji: "👕" },
    { word: "birthday", blank: "b__thday", sound: "ir",  emoji: "🎂" },
    { word: "first",    blank: "f__st",    sound: "ir",  emoji: "🥇" },
    { word: "girl",     blank: "g__l",     sound: "ir",  emoji: "👧" },
    { word: "circle",   blank: "c__cle",   sound: "ir",  emoji: "⭕" },
    // ar
    { word: "park",     blank: "p__k",     sound: "ar",  emoji: "🌳" },
    { word: "farm",     blank: "f__m",     sound: "ar",  emoji: "🌾" },
    { word: "party",    blank: "p__ty",    sound: "ar",  emoji: "🎉" },
    { word: "star",     blank: "st__",     sound: "ar",  emoji: "⭐" },
    { word: "art",      blank: "__t",      sound: "ar",  emoji: "🎨" },
    { word: "car",      blank: "c__",      sound: "ar",  emoji: "🚗" },
    { word: "start",    blank: "st__t",    sound: "ar",  emoji: "🚦" },
  ],

  // ----------------------------------------------------------
  // TRUE / FALSE — sentence + correct answer + emoji scene
  // ----------------------------------------------------------
  trueFalse: [
    { sentence: "Lions are small animals.",                      answer: false, scene: "🦁" },
    { sentence: "Turtles can walk very fast.",                   answer: false, scene: "🐢💨" },
    { sentence: "Elephants have big ears and a long nose.",      answer: true,  scene: "🐘" },
    { sentence: "Penguins can fly in the sky.",                  answer: false, scene: "🐧🌤️" },
    { sentence: "Hippos can walk in the water.",                 answer: true,  scene: "🦛💧" },
    { sentence: "Zebras are black and white.",                   answer: true,  scene: "🦓" },
    { sentence: "Birds have four legs.",                         answer: false, scene: "🐦" },
    { sentence: "A doctor works at a hospital.",                 answer: true,  scene: "🩺🏥" },
    { sentence: "You eat dinner in the morning.",                answer: false, scene: "🍽️🌅" },
    { sentence: "A farm has animals.",                           answer: true,  scene: "🌾🐄" },
    { sentence: "A swimsuit is for the beach.",                  answer: true,  scene: "🩱🏖️" },
    { sentence: "A birthday party always has a cake.",           answer: true,  scene: "🎂🎉" },
    { sentence: "You ride a bike at the hospital.",              answer: false, scene: "🚲🏥" },
    { sentence: "People drink water when they are thirsty.",     answer: true,  scene: "💧😓" },
    { sentence: "You listen with your eyes.",                    answer: false, scene: "👂" },
    { sentence: "A penguin is good at swimming.",                answer: true,  scene: "🐧🌊" },
    { sentence: "The lion is behind the zebra.",                 answer: true,  scene: "🦁🦓" },
    { sentence: "You have a bath when you are clean.",           answer: false, scene: "🛁" },
    { sentence: "A kitten is a baby cat.",                       answer: true,  scene: "🐱" },
    { sentence: "People ride horses at the farm party.",         answer: true,  scene: "🐴🌾" },
  ],

  // ----------------------------------------------------------
  // READING COMPREHENSION passages
  // ----------------------------------------------------------
  passages: [
    {
      id: "bella",
      title: "Bella's Day",
      emoji: "🐕",
      color: "#4ECDC4",
      text: "Meet my dog Bella. This is Bella's day.\nBella wakes up at seven o'clock.\nAt nine o'clock, Bella plays at home.\nAt half past eleven, Bella is thirsty. She drinks water.\nAt one o'clock, Bella is hungry. She eats dinner.\nAt half past five, Bella is dirty. She runs to the bath.\nAt half past nine, Bella is tired.",
      questions: [
        {
          q: "What time does Bella wake up?",
          type: "choice",
          options: ["At six o'clock", "At seven o'clock", "At eight o'clock"],
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
          options: ["She plays at home", "She eats dinner", "She runs to the bath"],
          answer: 2
        },
        {
          q: "How does Bella feel at half past nine?",
          type: "choice",
          options: ["Hungry", "Dirty", "Tired"],
          answer: 2
        },
        {
          q: "Write one word: Bella drinks water because she is ___.",
          type: "type",
          answer: "thirsty"
        },
      ]
    },
    {
      id: "ari",
      title: "Ari's Day",
      emoji: "🦁",
      color: "#F4A261",
      text: "Ari is a lion. He lives in Africa.\nHe wakes up at six o'clock. He drinks water.\nAt half past eight, he sees an old tree. He sits and rests.\nAt five o'clock, Ari sees a zebra. He wants to eat the zebra.\nAt nine o'clock, Ari is tired. He sleeps near the tree.",
      questions: [
        {
          q: "What is Ari?",
          type: "choice",
          options: ["A zebra", "A lion", "An elephant"],
          answer: 1
        },
        {
          q: "Where does Ari live?",
          type: "choice",
          options: ["In a park", "At a farm", "In Africa"],
          answer: 2
        },
        {
          q: "What does Ari drink in the morning?",
          type: "type",
          answer: "water"
        },
        {
          q: "What does Ari see at five o'clock?",
          type: "choice",
          options: ["A tree", "A zebra", "A penguin"],
          answer: 1
        },
        {
          q: "How does Ari feel at nine o'clock?",
          type: "choice",
          options: ["Hungry", "Scared", "Tired"],
          answer: 2
        },
      ]
    },
    {
      id: "peter",
      title: "Peter Penguin",
      emoji: "🐧",
      color: "#74B9FF",
      text: "It is a cold winter day. The people are watching Betty Bird.\nShe can sing in English, Hebrew and Arabic. Peter Penguin is listening.\n\"I want to sing,\" says Peter.\nBetty Bird is flying in the sky. The people are smiling.\n\"I want to fly,\" says Peter.\n\"You are a penguin. You can't fly. You can't sing,\" say the people.\n\"I am good at swimming. I am good at tricks,\" says Peter.\n\"You are great, Peter!\" say the people.",
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
    {
      id: "hospital",
      title: "At the Hospital",
      emoji: "🏥",
      color: "#A29BFE",
      text: "The children are at the hospital.\nNeta is helping the doctor.\nSagi is cleaning the floor.\nKaren is bringing food.\nEmma is doing tricks.\nAmir is singing and dancing.\nOfek is talking to a sad boy.\nIt's great to help people!",
      questions: [
        {
          q: "Who is cleaning the floor?",
          type: "choice",
          options: ["Neta", "Sagi", "Karen"],
          answer: 1
        },
        {
          q: "Who is helping the doctor?",
          type: "choice",
          options: ["Neta", "Emma", "Amir"],
          answer: 0
        },
        {
          q: "What is Emma doing?",
          type: "type",
          answer: "tricks"
        },
        {
          q: "Who is bringing food?",
          type: "choice",
          options: ["Sagi", "Ofek", "Karen"],
          answer: 2
        },
        {
          q: "Why are the children at the hospital?",
          type: "choice",
          options: ["To play games", "To help people", "To eat dinner"],
          answer: 1
        },
      ]
    },
    {
      id: "safari",
      title: "Safari Animals Are Cool",
      emoji: "🦒",
      color: "#55EFC4",
      text: "Jane, Percy and Liz are at the Safari Park.\nJane: Look at the zebra!\nPercy: It's beautiful!\nJane: Look! There is a lion behind the zebra. I am scared of lions.\nLiz: There is a turtle near the water. It has a funny face.\nJane: Look in the water! There are two elephants. They are playing.\nPercy: There are hippos in the water too. They are walking.\nJane: Wow! Hippos are cool!",
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
          q: "How does Jane feel about lions?",
          type: "choice",
          options: ["Cool", "Scared", "Tired"],
          answer: 1
        },
      ]
    },
  ],

  // ----------------------------------------------------------
  // WORD BANK WRITING — fill in the blanks
  // segments: { text } for plain text, { blank, answer } for gaps
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
        { text: "! But the animals are " },
        { blank: true, answer: "cool" },
        { text: ". The elephant is " },
        { blank: true, answer: "great" },
        { text: "!" },
      ],
      wordBank: ["zebra", "lion", "scared", "cool", "great"],
    },
    {
      id: "party",
      title: "My Birthday Party",
      emoji: "🎂",
      segments: [
        { text: "Today is my " },
        { blank: true, answer: "birthday" },
        { text: ". Come to my party! Please " },
        { blank: true, answer: "bring" },
        { text: " a swimsuit. We will swim in the " },
        { blank: true, answer: "sea" },
        { text: ". We will eat " },
        { blank: true, answer: "cake" },
        { text: ". It will be " },
        { blank: true, answer: "great" },
        { text: "!" },
      ],
      wordBank: ["birthday", "bring", "sea", "cake", "great"],
    },
    {
      id: "busy_day",
      title: "A Busy Day",
      emoji: "☀️",
      segments: [
        { text: "I " },
        { blank: true, answer: "wake" },
        { text: " up at seven o'clock. I am " },
        { blank: true, answer: "hungry" },
        { text: ". I eat " },
        { blank: true, answer: "dinner" },
        { text: " at eight o'clock. Then I " },
        { blank: true, answer: "listen" },
        { text: " to music. At night I am " },
        { blank: true, answer: "tired" },
        { text: "." },
      ],
      wordBank: ["wake", "hungry", "dinner", "listen", "tired"],
    },
    {
      id: "peter_writes",
      title: "Peter Penguin Writes",
      emoji: "🐧",
      segments: [
        { text: "I am a " },
        { blank: true, answer: "penguin" },
        { text: ". I live in a cold place. I cannot " },
        { blank: true, answer: "fly" },
        { text: " and I cannot " },
        { blank: true, answer: "sing" },
        { text: ". But I am good at " },
        { blank: true, answer: "swimming" },
        { text: ". I can do " },
        { blank: true, answer: "tricks" },
        { text: " too. I am great!" },
      ],
      wordBank: ["penguin", "fly", "sing", "swimming", "tricks"],
    },
    {
      id: "hospital_day",
      title: "At the Hospital",
      emoji: "🏥",
      segments: [
        { text: "The children are at the " },
        { blank: true, answer: "hospital" },
        { text: ". Neta is helping the " },
        { blank: true, answer: "doctor" },
        { text: ". Sagi is " },
        { blank: true, answer: "clean" },
        { text: "ing the floor. Emma is doing " },
        { blank: true, answer: "tricks" },
        { text: ". It is " },
        { blank: true, answer: "great" },
        { text: " to help people!" },
      ],
      wordBank: ["hospital", "doctor", "clean", "tricks", "great"],
    },
  ],

  // ----------------------------------------------------------
  // LISTENING — TTS conversations + questions
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
      id: "party_listen",
      title: "The Birthday Party",
      speech: "Adam says: Come to my birthday party! Bob says: Great! When is the party? Adam says: It is on Friday at seven o'clock. Please bring a swimsuit. Bob says: Good idea! Where is the party? Adam says: It is at the beach.",
      question: "Where is the party?",
      options: ["At a farm", "At the beach", "At the hospital"],
      answer: 1,
    },
    {
      id: "bella_listen",
      title: "How Is Bella?",
      speech: "Dana says: How is your dog Bella today? Noa says: She is tired and dirty. Dana says: Oh! Give her a bath. Noa says: Good idea. She will be happy after a bath.",
      question: "How is Bella?",
      options: ["Hungry and thirsty", "Tired and dirty", "Scared and cool"],
      answer: 1,
    },
  ],

  // ----------------------------------------------------------
  // CLOCK TIMES — for "What Time Is It?" section
  // hours (1-12), minutes (0 or 30), spoken phrase
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
