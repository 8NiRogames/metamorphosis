window.MetaData = {
  xpConfig: {
    character: { base: 50, multiplier: 1.04, flat: 2 },
    attribute: { base: 40, multiplier: 1.03, flat: 1 },
    skill: { base: 30, multiplier: 1.025, flat: 1 }
  },

  progressionSteps: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],

  skillTree: {
    Strength: ['Calisthenics', 'Gym Training', 'Manual Labor', 'Heavy Carrying', 'Core Training'],
    Dexterity: ['Typing', 'Drawing', 'Mini Painting', 'DIY Repairs', 'First Aid'],
    Agility: ['Running', 'Cycling', 'Swimming', 'Hiking', 'Stretching'],
    Endurance: ['Walking', 'Long Cycling', 'Cardio Training', 'Sleep Hygiene', 'Household Chores'],
    Intelligence: ['Reading', 'Study', 'Language Learning', 'Writing', 'Planning'],
    Willpower: ['Meditation', 'No Sugary Drinks', 'No Doomscrolling', 'Routine Keeping', 'Task Finishing'],
    Wits: ['Humor', 'Improvisation', 'Roleplay', 'Debate', 'Observation'],
    Wisdom: ['Cooking', 'Journaling', 'Budgeting', 'Gardening', 'Life Balance']
  },

  skillToAttribute: {
    'Calisthenics': 'Strength',
    'Gym Training': 'Strength',
    'Manual Labor': 'Strength',
    'Heavy Carrying': 'Strength',
    'Core Training': 'Strength',

    'Typing': 'Dexterity',
    'Drawing': 'Dexterity',
    'Mini Painting': 'Dexterity',
    'DIY Repairs': 'Dexterity',
    'First Aid': 'Dexterity',

    'Running': 'Agility',
    'Cycling': 'Agility',
    'Swimming': 'Agility',
    'Hiking': 'Agility',
    'Stretching': 'Agility',

    'Walking': 'Endurance',
    'Long Cycling': 'Endurance',
    'Cardio Training': 'Endurance',
    'Sleep Hygiene': 'Endurance',
    'Household Chores': 'Endurance',

    'Reading': 'Intelligence',
    'Study': 'Intelligence',
    'Language Learning': 'Intelligence',
    'Writing': 'Intelligence',
    'Planning': 'Intelligence',

    'Meditation': 'Willpower',
    'No Sugary Drinks': 'Willpower',
    'No Doomscrolling': 'Willpower',
    'Routine Keeping': 'Willpower',
    'Task Finishing': 'Willpower',

    'Humor': 'Wits',
    'Improvisation': 'Wits',
    'Roleplay': 'Wits',
    'Debate': 'Wits',
    'Observation': 'Wits',

    'Cooking': 'Wisdom',
    'Journaling': 'Wisdom',
    'Budgeting': 'Wisdom',
    'Gardening': 'Wisdom',
    'Life Balance': 'Wisdom'
  },

  questSkillRotation: [
    'Reading',
    'Language Learning',
    'Writing',
    'Planning',
    'Journaling',
    'Meditation',
    'Cycling',
    'Walking',
    'Swimming',
    'Stretching',
    'Calisthenics',
    'Cooking',
    'Gardening',
    'Mini Painting',
    'Drawing',
    'Household Chores'
  ],

  questGenerators: {
    Reading: [
      { text: 'Read 10 pages of a fantasy book', amount: 10 },
      { text: 'Read 15 pages of a psychology book', amount: 15 },
      { text: 'Read one short chapter', amount: 1 }
    ],
    'Language Learning': [
      { text: 'Learn 10 new words', amount: 10 },
      { text: 'Write 5 sentences in your target language', amount: 5 },
      { text: 'Listen to 15 minutes of a foreign language', amount: 15 }
    ],
    Writing: [
      { text: 'Write 100 words', amount: 100 },
      { text: 'Write a short reflection', amount: 1 },
      { text: 'Write one creative paragraph', amount: 1 }
    ],
    Planning: [
      { text: 'Plan tomorrow', amount: 1 },
      { text: 'Set 3 priorities for today', amount: 3 },
      { text: 'Review one plan and improve it', amount: 1 }
    ],
    Journaling: [
      { text: 'Write one journal entry', amount: 1 },
      { text: 'Write 3 things you are grateful for', amount: 3 },
      { text: 'Reflect honestly on one emotion', amount: 1 }
    ],
    Meditation: [
      { text: 'Meditate for 5 minutes', amount: 5 },
      { text: 'Do one breathing exercise', amount: 1 },
      { text: 'Sit in silence for a short reset', amount: 1 }
    ],
    Cycling: [
      { text: 'Ride 5 km on a bike', amount: 5 },
      { text: 'Do a short bike session', amount: 1 },
      { text: 'Ride a route you do not usually take', amount: 1 }
    ],
    Walking: [
      { text: 'Walk 3 km', amount: 3 },
      { text: 'Take a 20-minute walk', amount: 20 },
      { text: 'Do a mindful outdoor walk', amount: 1 }
    ],
    Swimming: [
      { text: 'Swim 8 lengths', amount: 8 },
      { text: 'Swim for 15 minutes', amount: 15 },
      { text: 'Do a technique-focused swim', amount: 1 }
    ],
    Stretching: [
      { text: 'Stretch for 10 minutes', amount: 10 },
      { text: 'Do a hip mobility session', amount: 1 },
      { text: 'Do an evening stretch routine', amount: 1 }
    ],
    Calisthenics: [
      { text: 'Do a short bodyweight session', amount: 1 },
      { text: 'Do 20 reps of bodyweight exercise', amount: 20 },
      { text: 'Do a core-focused calisthenics session', amount: 1 }
    ],
    Cooking: [
      { text: 'Cook one proper meal', amount: 1 },
      { text: 'Cook and leave the kitchen clean', amount: 1 },
      { text: 'Improve one of your standard recipes', amount: 1 }
    ],
    Gardening: [
      { text: 'Do one garden task', amount: 1 },
      { text: 'Water plants properly', amount: 1 },
      { text: 'Do one season-prep garden task', amount: 1 }
    ],
    'Mini Painting': [
      { text: 'Paint one stage of a miniature', amount: 1 },
      { text: 'Do a focused mini painting session', amount: 1 },
      { text: 'Try a new color scheme on a mini', amount: 1 }
    ],
    Drawing: [
      { text: 'Do one quick sketch study', amount: 1 },
      { text: 'Draw from reference', amount: 1 },
      { text: 'Draw something from imagination', amount: 1 }
    ],
    'Household Chores': [
      { text: 'Clean one messy surface area', amount: 1 },
      { text: 'Do one useful household task', amount: 1 },
      { text: 'Reset your desk or work area', amount: 1 }
    ]
  },

  mainQuestFamilies: [
    { id: 'mq_books_read', title: 'Books Read', skill: 'Reading', unit: 'books', rewardXp: 120 },
    { id: 'mq_pages_read', title: 'Pages Read', skill: 'Reading', unit: 'pages', rewardXp: 60 },
    { id: 'mq_language_sessions', title: 'Language Sessions', skill: 'Language Learning', unit: 'sessions', rewardXp: 100 },
    { id: 'mq_written_words', title: 'Words Written', skill: 'Writing', unit: 'words', rewardXp: 70 },
    { id: 'mq_journal_entries', title: 'Journal Entries', skill: 'Journaling', unit: 'entries', rewardXp: 90 },
    { id: 'mq_cycling_km', title: 'Cycling Distance', skill: 'Cycling', unit: 'km', rewardXp: 100 },
    { id: 'mq_walking_km', title: 'Walking Distance', skill: 'Walking', unit: 'km', rewardXp: 80 },
    { id: 'mq_swimming_lengths', title: 'Swimming Lengths', skill: 'Swimming', unit: 'lengths', rewardXp: 90 },
    { id: 'mq_workout_sessions', title: 'Workout Sessions', skill: 'Calisthenics', unit: 'sessions', rewardXp: 110 },
    { id: 'mq_stretch_sessions', title: 'Stretch Sessions', skill: 'Stretching', unit: 'sessions', rewardXp: 80 },
    { id: 'mq_meditation_sessions', title: 'Meditation Sessions', skill: 'Meditation', unit: 'sessions', rewardXp: 90 },
    { id: 'mq_cooked_meals', title: 'Meals Cooked', skill: 'Cooking', unit: 'meals', rewardXp: 100 },
    { id: 'mq_gardening_tasks', title: 'Gardening Tasks', skill: 'Gardening', unit: 'tasks', rewardXp: 90 },
    { id: 'mq_planning_sessions', title: 'Planning Sessions', skill: 'Planning', unit: 'sessions', rewardXp: 90 }
  ],

  achievementFamilies: [
    { id: 'ach_skill_reading', title: 'Reading Mastery', type: 'skill_level', skill: 'Reading', milestones: [1,5,10,13,25,50,100], rewardXp: 60 },
    { id: 'ach_skill_cycling', title: 'Cycling Mastery', type: 'skill_level', skill: 'Cycling', milestones: [1,5,10,13,25,50,100], rewardXp: 60 },
    { id: 'ach_skill_journaling', title: 'Journaling Mastery', type: 'skill_level', skill: 'Journaling', milestones: [1,5,10,13,25,50,100], rewardXp: 60 },
    { id: 'ach_attr_strength', title: 'Strength Ascension', type: 'attribute_level', attribute: 'Strength', milestones: [1,5,10,13,25,50,100], rewardXp: 80 },
    { id: 'ach_attr_intelligence', title: 'Intelligence Ascension', type: 'attribute_level', attribute: 'Intelligence', milestones: [1,5,10,13,25,50,100], rewardXp: 80 },
    { id: 'ach_daily_total', title: 'Daily Quest Completion', type: 'daily_total', milestones: [1,5,10,13,25,50,100,250,500,666,1000], rewardXp: 50 },
    { id: 'ach_main_total', title: 'Main Quest Progress', type: 'main_total', milestones: [1,5,10,13,25,50,100,250,500,666,1000], rewardXp: 70 },
    { id: 'ach_streak', title: 'Streak Keeper', type: 'streak', milestones: [1,5,10,13,25,50,100,250,500,666,1000], rewardXp: 90 },
    { id: 'ach_books_family', title: 'Books Read', type: 'main_family', familyId: 'mq_books_read', milestones: [1,5,10,13,25,50,100,250,500,666,1000], rewardXp: 70 },
    { id: 'ach_cycling_family', title: 'Cycling Distance', type: 'main_family', familyId: 'mq_cycling_km', milestones: [1,5,10,13,25,50,100,250,500,666,1000], rewardXp: 70 }
  ],

  qaItems: [
    { q: 'How does XP work?', a: 'Character XP increases level up to 100 and then continues as paragon.' },
    { q: 'How do attributes grow?', a: 'Attributes use their own XP pool and grow from skill level-ups.' },
    { q: 'How do skills work?', a: 'Each skill has level, XP, next XP and paragon. Skill bars loop into paragon after level 100.' },
    { q: 'How do main quests work?', a: 'Main quests are family-based milestone progress tracks with rewards on thresholds.' }
  ],

  patchNotes: [
    {
      version: 'v1.1 Foundation',
      items: [
        'Modular state architecture',
        'Search in quests',
        'Main quest filter by skill',
        'Journal / Gallery / Calendar / Finance foundations',
        'Q&A and planned patches section',
        'Community and privacy foundation'
      ]
    },
    {
      version: 'Planned v1.2',
      items: [
        'Journal expansion',
        'Gallery folders and image pipeline',
        'Calendar reminders',
        'Finance detail tracking'
      ]
    }
  ]
};
