window.MetaData = {
  xpConfig: {
    character: { base: 50, multiplier: 1.04, flat: 2 },
    attribute: { base: 40, multiplier: 1.03, flat: 1 },
    skill: { base: 30, multiplier: 1.025, flat: 1 }
  },

  progressionSteps: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],

  skillTree: {
    Strength: [
      'Calisthenics',
      'Gym Training',
      'Manual Labor',
      'Heavy Carrying',
      'Core Training',
      'Push Strength',
      'Pull Strength',
      'Grip Strength',
      'Resistance Training',
      'Functional Strength'
    ],
    Dexterity: [
      'Typing',
      'Drawing',
      'Mini Painting',
      'DIY Repairs',
      'First Aid',
      'Tool Handling',
      'Detail Work',
      'Handwriting',
      'Photo Editing',
      'Mouse Precision'
    ],
    Agility: [
      'Running',
      'Cycling',
      'Swimming',
      'Hiking',
      'Stretching',
      'Mobility Training',
      'Balance',
      'Footwork',
      'Reaction Speed',
      'Jump Training'
    ],
    Endurance: [
      'Walking',
      'Long Cycling',
      'Cardio Training',
      'Sleep Hygiene',
      'Household Chores',
      'Work Stamina',
      'Long Distance Walking',
      'Recovery Routine',
      'Consistency',
      'Backpack Carry'
    ],
    Intelligence: [
      'Reading',
      'Study',
      'Language Learning',
      'Writing',
      'Planning',
      'Research',
      'Critical Thinking',
      'Problem Solving',
      'Memory Training',
      'Computer Skills'
    ],
    Willpower: [
      'Meditation',
      'No Sugary Drinks',
      'No Doomscrolling',
      'Routine Keeping',
      'Task Finishing',
      'Impulse Control',
      'Sleep Discipline',
      'Focus Training',
      'Stress Management',
      'Self-Control'
    ],
    Wits: [
      'Humor',
      'Improvisation',
      'Roleplay',
      'Debate',
      'Observation',
      'Conversation Timing',
      'Social Reading',
      'Fast Thinking',
      'Adaptability',
      'Pattern Spotting'
    ],
    Wisdom: [
      'Cooking',
      'Journaling',
      'Budgeting',
      'Gardening',
      'Life Balance',
      'Self-Reflection',
      'Emotional Insight',
      'Animal Care',
      'Practical Judgment',
      'Long-Term Thinking'
    ]
  },

  skillToAttribute: {
    'Calisthenics': 'Strength',
    'Gym Training': 'Strength',
    'Manual Labor': 'Strength',
    'Heavy Carrying': 'Strength',
    'Core Training': 'Strength',
    'Push Strength': 'Strength',
    'Pull Strength': 'Strength',
    'Grip Strength': 'Strength',
    'Resistance Training': 'Strength',
    'Functional Strength': 'Strength',

    'Typing': 'Dexterity',
    'Drawing': 'Dexterity',
    'Mini Painting': 'Dexterity',
    'DIY Repairs': 'Dexterity',
    'First Aid': 'Dexterity',
    'Tool Handling': 'Dexterity',
    'Detail Work': 'Dexterity',
    'Handwriting': 'Dexterity',
    'Photo Editing': 'Dexterity',
    'Mouse Precision': 'Dexterity',

    'Running': 'Agility',
    'Cycling': 'Agility',
    'Swimming': 'Agility',
    'Hiking': 'Agility',
    'Stretching': 'Agility',
    'Mobility Training': 'Agility',
    'Balance': 'Agility',
    'Footwork': 'Agility',
    'Reaction Speed': 'Agility',
    'Jump Training': 'Agility',

    'Walking': 'Endurance',
    'Long Cycling': 'Endurance',
    'Cardio Training': 'Endurance',
    'Sleep Hygiene': 'Endurance',
    'Household Chores': 'Endurance',
    'Work Stamina': 'Endurance',
    'Long Distance Walking': 'Endurance',
    'Recovery Routine': 'Endurance',
    'Consistency': 'Endurance',
    'Backpack Carry': 'Endurance',

    'Reading': 'Intelligence',
    'Study': 'Intelligence',
    'Language Learning': 'Intelligence',
    'Writing': 'Intelligence',
    'Planning': 'Intelligence',
    'Research': 'Intelligence',
    'Critical Thinking': 'Intelligence',
    'Problem Solving': 'Intelligence',
    'Memory Training': 'Intelligence',
    'Computer Skills': 'Intelligence',

    'Meditation': 'Willpower',
    'No Sugary Drinks': 'Willpower',
    'No Doomscrolling': 'Willpower',
    'Routine Keeping': 'Willpower',
    'Task Finishing': 'Willpower',
    'Impulse Control': 'Willpower',
    'Sleep Discipline': 'Willpower',
    'Focus Training': 'Willpower',
    'Stress Management': 'Willpower',
    'Self-Control': 'Willpower',

    'Humor': 'Wits',
    'Improvisation': 'Wits',
    'Roleplay': 'Wits',
    'Debate': 'Wits',
    'Observation': 'Wits',
    'Conversation Timing': 'Wits',
    'Social Reading': 'Wits',
    'Fast Thinking': 'Wits',
    'Adaptability': 'Wits',
    'Pattern Spotting': 'Wits',

    'Cooking': 'Wisdom',
    'Journaling': 'Wisdom',
    'Budgeting': 'Wisdom',
    'Gardening': 'Wisdom',
    'Life Balance': 'Wisdom',
    'Self-Reflection': 'Wisdom',
    'Emotional Insight': 'Wisdom',
    'Animal Care': 'Wisdom',
    'Practical Judgment': 'Wisdom',
    'Long-Term Thinking': 'Wisdom'
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
    'Household Chores',
    'Study',
    'Research',
    'Typing',
    'Budgeting',
    'Hiking',
    'Cardio Training',
    'Routine Keeping',
    'Observation',
    'Problem Solving',
    'Tool Handling',
    'Balance',
    'Work Stamina',
    'Self-Reflection',
    'Emotional Insight'
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
    ],
    Study: [
      { text: 'Study one topic for 20 minutes', amount: 20 },
      { text: 'Make notes from one learning session', amount: 1 },
      { text: 'Review previously learned material', amount: 1 }
    ],
    Research: [
      { text: 'Research one topic in depth', amount: 1 },
      { text: 'Compare two sources on one subject', amount: 2 },
      { text: 'Collect references for one topic', amount: 1 }
    ],
    Typing: [
      { text: 'Do a 10-minute typing session', amount: 10 },
      { text: 'Practice speed typing', amount: 1 },
      { text: 'Write text cleanly without distractions', amount: 1 }
    ],
    Budgeting: [
      { text: 'Record today’s expenses', amount: 1 },
      { text: 'Review one spending category', amount: 1 },
      { text: 'Plan one purchase priority', amount: 1 }
    ],
    Hiking: [
      { text: 'Do a short hike or trail walk', amount: 1 },
      { text: 'Walk a route with elevation', amount: 1 },
      { text: 'Spend a focused session outdoors', amount: 1 }
    ],
    'Cardio Training': [
      { text: 'Do 15 minutes of cardio', amount: 15 },
      { text: 'Complete one cardio session', amount: 1 },
      { text: 'Push through a higher-intensity interval', amount: 1 }
    ],
    'Routine Keeping': [
      { text: 'Follow your planned routine today', amount: 1 },
      { text: 'Complete your morning structure', amount: 1 },
      { text: 'Keep discipline through one full block', amount: 1 }
    ],
    Observation: [
      { text: 'Notice 5 details in your environment', amount: 5 },
      { text: 'Observe one social situation carefully', amount: 1 },
      { text: 'Write down something subtle you noticed', amount: 1 }
    ],
    'Problem Solving': [
      { text: 'Solve one practical problem', amount: 1 },
      { text: 'Break one task into smaller steps', amount: 1 },
      { text: 'Fix one issue that was blocking progress', amount: 1 }
    ],
    'Tool Handling': [
      { text: 'Use tools for one practical task', amount: 1 },
      { text: 'Do one small repair properly', amount: 1 },
      { text: 'Practice precision with a tool-based task', amount: 1 }
    ],
    Balance: [
      { text: 'Do one balance-focused exercise', amount: 1 },
      { text: 'Practice stability and posture', amount: 1 },
      { text: 'Add balance work to movement practice', amount: 1 }
    ],
    'Work Stamina': [
      { text: 'Stay focused through one long work block', amount: 1 },
      { text: 'Push through one tiring but useful task', amount: 1 },
      { text: 'Finish one demanding session without quitting', amount: 1 }
    ],
    'Self-Reflection': [
      { text: 'Reflect on one decision honestly', amount: 1 },
      { text: 'Write what you learned from today', amount: 1 },
      { text: 'Identify one repeating pattern in yourself', amount: 1 }
    ],
    'Emotional Insight': [
      { text: 'Name one feeling and why it is there', amount: 1 },
      { text: 'Track your emotional response to one event', amount: 1 },
      { text: 'Reflect on what you needed today emotionally', amount: 1 }
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
    { id: 'ach_skill_reading', title: 'Reading Mastery', type: 'skill_level', skill: 'Reading', milestones: [1, 5, 10, 13, 25, 50, 100], rewardXp: 60 },
    { id: 'ach_skill_cycling', title: 'Cycling Mastery', type: 'skill_level', skill: 'Cycling', milestones: [1, 5, 10, 13, 25, 50, 100], rewardXp: 60 },
    { id: 'ach_skill_journaling', title: 'Journaling Mastery', type: 'skill_level', skill: 'Journaling', milestones: [1, 5, 10, 13, 25, 50, 100], rewardXp: 60 },
    { id: 'ach_attr_strength', title: 'Strength Ascension', type: 'attribute_level', attribute: 'Strength', milestones: [1, 5, 10, 13, 25, 50, 100], rewardXp: 80 },
    { id: 'ach_attr_intelligence', title: 'Intelligence Ascension', type: 'attribute_level', attribute: 'Intelligence', milestones: [1, 5, 10, 13, 25, 50, 100], rewardXp: 80 },
    { id: 'ach_daily_total', title: 'Daily Quest Completion', type: 'daily_total', milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000], rewardXp: 50 },
    { id: 'ach_main_total', title: 'Main Quest Progress', type: 'main_total', milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000], rewardXp: 70 },
    { id: 'ach_streak', title: 'Streak Keeper', type: 'streak', milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000], rewardXp: 90 },
    { id: 'ach_books_family', title: 'Books Read', type: 'main_family', familyId: 'mq_books_read', milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000], rewardXp: 70 },
    { id: 'ach_cycling_family', title: 'Cycling Distance', type: 'main_family', familyId: 'mq_cycling_km', milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000], rewardXp: 70 }
  ],

  qaItems: [
    { q: 'How does XP work?', a: 'Character XP increases your level up to 100. After that, further progress goes into character paragon instead of normal levels.' },
    { q: 'How do attributes grow?', a: 'Attributes have their own XP pool and are fed by the skills connected to them. They also continue into paragon after hitting the maximum level.' },
    { q: 'How do skills work?', a: 'Each skill has its own level, XP, next-XP requirement and paragon. When a skill reaches level 100, its bar keeps looping and gives paragon levels.' },
    { q: 'How do main quests work?', a: 'Main quests are family-based long-term progression tracks. Their milestones follow the configured step sequence and reward XP when thresholds are reached.' },
    { q: 'What is paragon used for?', a: 'Paragon is the infinite progression system after max level. It is planned to become a special currency for avatar features, items and other late-game systems.' },
    { q: 'How do finances work right now?', a: 'Finance entries can be stored as income, expense, investment or wishlist items. Wishlist is intended to be visible to friends in the future.' },
    { q: 'What can the gallery do right now?', a: 'The gallery supports folders, image uploads, favorites, image preview, and visibility settings for both folders and images.' },
    { q: 'Is multiplayer already active?', a: 'Not yet. The current structure is preparing for future accounts, friends, profile viewing, privacy rules and shared visibility systems.' }
  ],

  appliedPatchNotes: [
    {
      version: 'v1.6 Finance Tools',
      items: [
        'Added monthly finance filter.',
        'Added recurring finance entries.',
        'Added finance export and import.',
        'Added monthly timeline graph based on recorded entries.'
      ]
    },
    {
      version: 'v1.5 Finance Timeline / Meta Split',
      items: [
        'Finance graph no longer stretches incorrectly after reload.',
        'Removed the redundant secondary finance graph.',
        'Added monthly finance timeline graph.',
        'Separated applied patch notes from planned patch notes.'
      ]
    },
    {
      version: 'v1.4 Finance / Calendar / Privacy',
      items: [
        'Added finance summary cards.',
        'Added single finance overview graph.',
        'Added finance tabs by type.',
        'Added finance modal for the active filtered tab.',
        'Added finance edit and delete support.',
        'Expanded calendar with visibility, reminders, links, edit and delete actions.',
        'Expanded gallery with folder visibility and image visibility.',
        'Updated Q&A and patch notes.'
      ]
    }
  ],

  plannedPatchNotes: [
    {
      version: 'Planned v1.7 Social / Privacy Architecture',
      items: [
        'Friend profiles and profile viewing.',
        'Shared visibility rules for modules and entries.',
        'Friends-only and public profile sections.',
        'Preparation for multiplayer account structure.'
      ]
    },
    {
      version: 'Planned v1.8 Avatar / Inventory',
      items: [
        'Avatar system expansion.',
        'Item and equipment system.',
        'Paragon usage as special currency.',
        'Visual character progression.'
      ]
    },
    {
      version: 'Planned v1.9 Story / Chains / Community',
      items: [
        'Quest chains and story arcs.',
        'Shared challenges.',
        'Community profile interactions.',
        'Expanded multiplayer layer.'
      ]
    }
  ]
};
