window.MetaData = {
  progressionSteps: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],

  skillTree: {
    Strength: [
      'Calisthenics',
      'Gym Training',
      'Powerlifting Basics',
      'Manual Labor',
      'Heavy Carrying',
      'Wood Chopping',
      'Shoveling',
      'Push Strength',
      'Pull Strength',
      'Core Training'
    ],

    Dexterity: [
      'Typing',
      'Drawing',
      'Mini Painting',
      'Knife Skills',
      'DIY Repairs',
      'Tool Handling',
      'Driving Precision',
      'Photography',
      'Craft Work',
      'First Aid'
    ],

    Agility: [
      'Running',
      'Cycling',
      'Swimming',
      'Hiking',
      'Stretching',
      'Mobility Training',
      'Dance',
      'Football',
      'Basketball',
      'Table Tennis'
    ],

    Endurance: [
      'Walking',
      'Long Cycling',
      'Swimming Endurance',
      'Cardio Training',
      'Work Stamina',
      'Sleep Hygiene',
      'Recovery Routine',
      'Backpack Hiking',
      'Household Chores',
      'Gardening'
    ],

    Intelligence: [
      'Reading',
      'Study',
      'Language Learning',
      'Research',
      'Writing',
      'Critical Thinking',
      'Planning',
      'Excel / Spreadsheets',
      'Computer Skills',
      'Problem Solving'
    ],

    Willpower: [
      'Meditation',
      'No Sugary Drinks',
      'No Doomscrolling',
      'Routine Keeping',
      'Sleep Discipline',
      'Cold Showers',
      'Impulse Control',
      'Stress Management',
      'Consistency',
      'Task Finishing'
    ],

    Wits: [
      'Humor',
      'Improvisation',
      'Roleplay',
      'Debate',
      'Fast Talking',
      'Social Reading',
      'Adaptability',
      'Creative Problem Solving',
      'Conversation Timing',
      'Observation'
    ],

    Wisdom: [
      'Cooking',
      'Herbalism',
      'Journaling',
      'Self Reflection',
      'Emotional Insight',
      'Psychology Basics',
      'Budgeting',
      'Animal Care',
      'Gardening',
      'Life Balance'
    ]
  },

  skillToAttribute: {
    'Calisthenics': 'Strength',
    'Gym Training': 'Strength',
    'Powerlifting Basics': 'Strength',
    'Manual Labor': 'Strength',
    'Heavy Carrying': 'Strength',
    'Wood Chopping': 'Strength',
    'Shoveling': 'Strength',
    'Push Strength': 'Strength',
    'Pull Strength': 'Strength',
    'Core Training': 'Strength',

    'Typing': 'Dexterity',
    'Drawing': 'Dexterity',
    'Mini Painting': 'Dexterity',
    'Knife Skills': 'Dexterity',
    'DIY Repairs': 'Dexterity',
    'Tool Handling': 'Dexterity',
    'Driving Precision': 'Dexterity',
    'Photography': 'Dexterity',
    'Craft Work': 'Dexterity',
    'First Aid': 'Dexterity',

    'Running': 'Agility',
    'Cycling': 'Agility',
    'Swimming': 'Agility',
    'Hiking': 'Agility',
    'Stretching': 'Agility',
    'Mobility Training': 'Agility',
    'Dance': 'Agility',
    'Football': 'Agility',
    'Basketball': 'Agility',
    'Table Tennis': 'Agility',

'Walking',
'Long Cycling',
'Swimming Endurance',
'Cardio Training',
'Work Stamina',
'Sleep Hygiene',
'Recovery Routine',
'Backpack Hiking',
'Household Chores',
'Yard Work'

    'Reading': 'Intelligence',
    'Study': 'Intelligence',
    'Language Learning': 'Intelligence',
    'Research': 'Intelligence',
    'Writing': 'Intelligence',
    'Critical Thinking': 'Intelligence',
    'Planning': 'Intelligence',
    'Excel / Spreadsheets': 'Intelligence',
    'Computer Skills': 'Intelligence',
    'Problem Solving': 'Intelligence',

    'Meditation': 'Willpower',
    'No Sugary Drinks': 'Willpower',
    'No Doomscrolling': 'Willpower',
    'Routine Keeping': 'Willpower',
    'Sleep Discipline': 'Willpower',
    'Cold Showers': 'Willpower',
    'Impulse Control': 'Willpower',
    'Stress Management': 'Willpower',
    'Consistency': 'Willpower',
    'Task Finishing': 'Willpower',

    'Humor': 'Wits',
    'Improvisation': 'Wits',
    'Roleplay': 'Wits',
    'Debate': 'Wits',
    'Fast Talking': 'Wits',
    'Social Reading': 'Wits',
    'Adaptability': 'Wits',
    'Creative Problem Solving': 'Wits',
    'Conversation Timing': 'Wits',
    'Observation': 'Wits',

    'Cooking': 'Wisdom',
    'Herbalism': 'Wisdom',
    'Journaling': 'Wisdom',
    'Self Reflection': 'Wisdom',
    'Emotional Insight': 'Wisdom',
    'Psychology Basics': 'Wisdom',
    'Budgeting': 'Wisdom',
    'Animal Care': 'Wisdom',
    'Gardening': 'Wisdom',
    'Life Balance': 'Wisdom'
  },

  questGenerators: {
    'Calisthenics': [
      { type: 'count', amount: 10, text: 'Do 10 reps of bodyweight exercise' },
      { type: 'count', amount: 20, text: 'Do 20 reps of bodyweight exercise' },
      { type: 'count', amount: 30, text: 'Do 30 reps of bodyweight exercise' },
      { type: 'count', amount: 40, text: 'Do 40 reps of bodyweight exercise' },
      { type: 'time', amount: 10, text: 'Do a 10-minute calisthenics session' },
      { type: 'time', amount: 15, text: 'Do a 15-minute calisthenics session' },
      { type: 'time', amount: 20, text: 'Do a 20-minute calisthenics session' },
      { type: 'combo', amount: 1, text: 'Complete a push / pull / legs bodyweight circuit' },
      { type: 'core', amount: 1, text: 'Do a core-focused calisthenics session' },
      { type: 'form', amount: 1, text: 'Practice strict form in a bodyweight movement' }
    ],

    'Cycling': [
      { type: 'distance_km', amount: 3, text: 'Ride 3 km on a bike' },
      { type: 'distance_km', amount: 5, text: 'Ride 5 km on a bike' },
      { type: 'distance_km', amount: 10, text: 'Ride 10 km on a bike' },
      { type: 'distance_km', amount: 15, text: 'Ride 15 km on a bike' },
      { type: 'time', amount: 15, text: 'Do a 15-minute bike ride' },
      { type: 'time', amount: 30, text: 'Do a 30-minute bike ride' },
      { type: 'route', amount: 1, text: 'Ride a route you do not usually take' },
      { type: 'interval', amount: 1, text: 'Do a short interval bike session' },
      { type: 'hill', amount: 1, text: 'Include at least one uphill section in your ride' },
      { type: 'recovery', amount: 1, text: 'Do a light recovery bike ride' }
    ],

    'Swimming': [
      { type: 'laps', amount: 4, text: 'Swim 4 lengths' },
      { type: 'laps', amount: 8, text: 'Swim 8 lengths' },
      { type: 'laps', amount: 12, text: 'Swim 12 lengths' },
      { type: 'time', amount: 15, text: 'Swim for 15 minutes' },
      { type: 'time', amount: 20, text: 'Swim for 20 minutes' },
      { type: 'technique', amount: 1, text: 'Focus on technique during a swim session' },
      { type: 'breathing', amount: 1, text: 'Practice breathing control while swimming' },
      { type: 'endurance', amount: 1, text: 'Do an endurance-focused swim session' },
      { type: 'kick', amount: 1, text: 'Practice leg work in the pool' },
      { type: 'recovery', amount: 1, text: 'Do a light recovery swim' }
    ],

    'Walking': [
      { type: 'distance_km', amount: 2, text: 'Walk 2 km' },
      { type: 'distance_km', amount: 3, text: 'Walk 3 km' },
      { type: 'distance_km', amount: 5, text: 'Walk 5 km' },
      { type: 'time', amount: 20, text: 'Take a 20-minute walk' },
      { type: 'time', amount: 30, text: 'Take a 30-minute walk' },
      { type: 'outdoor', amount: 1, text: 'Go for a mindful outdoor walk' },
      { type: 'stairs', amount: 1, text: 'Include stairs or elevation in your walk' },
      { type: 'sunlight', amount: 1, text: 'Take a daylight walk' },
      { type: 'fast', amount: 1, text: 'Do a brisk walk' },
      { type: 'relaxed', amount: 1, text: 'Do a relaxed recovery walk' }
    ],

    'Stretching': [
      { type: 'time', amount: 5, text: 'Stretch for 5 minutes' },
      { type: 'time', amount: 10, text: 'Stretch for 10 minutes' },
      { type: 'time', amount: 15, text: 'Stretch for 15 minutes' },
      { type: 'hamstrings', amount: 1, text: 'Do a hamstring-focused stretch session' },
      { type: 'back', amount: 1, text: 'Do a back and spine stretch session' },
      { type: 'hips', amount: 1, text: 'Do a hip mobility session' },
      { type: 'shoulders', amount: 1, text: 'Do a shoulder mobility session' },
      { type: 'fullbody', amount: 1, text: 'Do a full-body stretching session' },
      { type: 'morning', amount: 1, text: 'Do a morning stretch routine' },
      { type: 'evening', amount: 1, text: 'Do an evening stretch routine' }
    ],

    'Reading': [
      { type: 'pages', amount: 5, text: 'Read 5 pages of a {genre} book' },
      { type: 'pages', amount: 10, text: 'Read 10 pages of a {genre} book' },
      { type: 'pages', amount: 15, text: 'Read 15 pages of a {genre} book' },
      { type: 'pages', amount: 20, text: 'Read 20 pages of a {genre} book' },
      { type: 'chapter', amount: 1, text: 'Read one chapter of a {genre} book' },
      { type: 'summary', amount: 1, text: 'Read and write one short summary from a {genre} book' },
      { type: 'notes', amount: 1, text: 'Take notes from your reading today' },
      { type: 'nonfiction', amount: 1, text: 'Read a nonfiction text for focused learning' },
      { type: 'fiction', amount: 1, text: 'Read fiction for immersion and focus' },
      { type: 're-read', amount: 1, text: 'Re-read a useful passage and reflect on it' }
    ],

    'Language Learning': [
      { type: 'words', amount: 5, text: 'Learn 5 new words in your target language' },
      { type: 'words', amount: 10, text: 'Learn 10 new words in your target language' },
      { type: 'words', amount: 20, text: 'Learn 20 new words in your target language' },
      { type: 'listening', amount: 10, text: 'Listen to 10 minutes of content in your target language' },
      { type: 'listening', amount: 20, text: 'Listen to 20 minutes of content in your target language' },
      { type: 'reading', amount: 1, text: 'Read a short article in your target language' },
      { type: 'writing', amount: 1, text: 'Write 5 sentences in your target language' },
      { type: 'writing', amount: 1, text: 'Write 10 sentences in your target language' },
      { type: 'flashcards', amount: 1, text: 'Review your language flashcards' },
      { type: 'speaking', amount: 5, text: 'Practice speaking for 5 minutes' }
    ],

    'Writing': [
      { type: 'words', amount: 100, text: 'Write 100 words' },
      { type: 'words', amount: 250, text: 'Write 250 words' },
      { type: 'words', amount: 500, text: 'Write 500 words' },
      { type: 'reflection', amount: 1, text: 'Write a reflection on your day' },
      { type: 'creative', amount: 1, text: 'Write one short creative passage' },
      { type: 'music', amount: 1, text: 'Write a few lines of lyrics or poetry' },
      { type: 'edit', amount: 1, text: 'Edit an older piece of writing' },
      { type: 'idea', amount: 1, text: 'Write down three new ideas' },
      { type: 'character', amount: 1, text: 'Write a character concept or backstory detail' },
      { type: 'project', amount: 1, text: 'Write something for Project Metamorphosis' }
    ],

    'Planning': [
      { type: 'tomorrow', amount: 1, text: 'Plan tomorrow in advance' },
      { type: 'week', amount: 1, text: 'Plan a part of your week' },
      { type: 'priority', amount: 1, text: 'Set three priorities for today' },
      { type: 'meal', amount: 1, text: 'Plan your meals for part of the day' },
      { type: 'budget', amount: 1, text: 'Plan one spending category' },
      { type: 'training', amount: 1, text: 'Plan one workout or movement session' },
      { type: 'sleep', amount: 1, text: 'Plan your bedtime and wake time' },
      { type: 'project', amount: 1, text: 'Plan one step for Metamorphosis' },
      { type: 'checklist', amount: 1, text: 'Make a checklist for one task' },
      { type: 'review', amount: 1, text: 'Review and adjust one existing plan' }
    ],

    'Journaling': [
      { type: 'entry', amount: 1, text: 'Write one journal entry' },
      { type: 'gratitude', amount: 1, text: 'Write three things you are grateful for' },
      { type: 'emotion', amount: 1, text: 'Write honestly about one emotion you felt today' },
      { type: 'progress', amount: 1, text: 'Write about your recent progress' },
      { type: 'reflection', amount: 1, text: 'Reflect on one mistake without self-hate' },
      { type: 'clarity', amount: 1, text: 'Write to clear your head for 10 minutes' },
      { type: 'prompt', amount: 1, text: 'Answer one self-reflection prompt' },
      { type: 'lesson', amount: 1, text: 'Write one lesson from today' },
      { type: 'vision', amount: 1, text: 'Write about the person you want to become' },
      { type: 'archive', amount: 1, text: 'Re-read an old journal note and reflect' }
    ],

    'Meditation': [
      { type: 'time', amount: 3, text: 'Meditate for 3 minutes' },
      { type: 'time', amount: 5, text: 'Meditate for 5 minutes' },
      { type: 'time', amount: 10, text: 'Meditate for 10 minutes' },
      { type: 'breathing', amount: 1, text: 'Do one breathing exercise session' },
      { type: 'silence', amount: 1, text: 'Sit in silence without distractions' },
      { type: 'focus', amount: 1, text: 'Do a focused attention meditation' },
      { type: 'bodyscan', amount: 1, text: 'Do a body scan meditation' },
      { type: 'reset', amount: 1, text: 'Use meditation to reset after stress' },
      { type: 'morning', amount: 1, text: 'Meditate in the morning' },
      { type: 'evening', amount: 1, text: 'Meditate before sleep' }
    ],

    'Cooking': [
      { type: 'meal', amount: 1, text: 'Cook one proper meal' },
      { type: 'meal', amount: 1, text: 'Cook a meal with protein and vegetables' },
      { type: 'prep', amount: 1, text: 'Prepare ingredients in advance for cooking' },
      { type: 'recipe', amount: 1, text: 'Cook using a written recipe' },
      { type: 'improvise', amount: 1, text: 'Cook creatively with what you have' },
      { type: 'rice', amount: 1, text: 'Cook a rice-based meal' },
      { type: 'pan', amount: 1, text: 'Cook a one-pan meal' },
      { type: 'signature', amount: 1, text: 'Refine one of your signature recipes' },
      { type: 'healthy', amount: 1, text: 'Cook a healthier version of a meal' },
      { type: 'cleanup', amount: 1, text: 'Cook and leave the kitchen clean' }
    ],

    'Gardening': [
      { type: 'plant', amount: 1, text: 'Care for plants or seedlings' },
      { type: 'water', amount: 1, text: 'Water plants properly' },
      { type: 'soil', amount: 1, text: 'Work on soil, beds or planting space' },
      { type: 'weed', amount: 1, text: 'Remove weeds for a while' },
      { type: 'harvest', amount: 1, text: 'Harvest something from the garden if possible' },
      { type: 'plan', amount: 1, text: 'Plan a small garden task or layout' },
      { type: 'yard', amount: 1, text: 'Do one yard or lawn task' },
      { type: 'care', amount: 1, text: 'Do a maintenance task around plants' },
      { type: 'observe', amount: 1, text: 'Observe plant health and note changes' },
      { type: 'clean', amount: 1, text: 'Clean or organize a garden area' }
    ]
  },

  questSkillRotation: [
    'Calisthenics',
    'Cycling',
    'Swimming',
    'Walking',
    'Stretching',
    'Reading',
    'Language Learning',
    'Writing',
    'Planning',
    'Journaling',
    'Meditation',
    'Cooking',
    'Gardening'
  ],

  mainQuestFamilies: [
    {
      id: 'mq_books_read',
      title: 'Books Read',
      skill: 'Reading',
      unit: 'books',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 120
    },
    {
      id: 'mq_pages_read',
      title: 'Pages Read',
      skill: 'Reading',
      unit: 'pages',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 60
    },
    {
      id: 'mq_language_sessions',
      title: 'Language Sessions',
      skill: 'Language Learning',
      unit: 'sessions',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 100
    },
    {
      id: 'mq_words_learned',
      title: 'Words Learned',
      skill: 'Language Learning',
      unit: 'words',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 70
    },
    {
      id: 'mq_written_entries',
      title: 'Journal Entries',
      skill: 'Journaling',
      unit: 'entries',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 90
    },
    {
      id: 'mq_written_words',
      title: 'Words Written',
      skill: 'Writing',
      unit: 'words',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 70
    },
    {
      id: 'mq_cycling_km',
      title: 'Cycling Distance',
      skill: 'Cycling',
      unit: 'km',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 100
    },
    {
      id: 'mq_walking_km',
      title: 'Walking Distance',
      skill: 'Walking',
      unit: 'km',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 80
    },
    {
      id: 'mq_swimming_lengths',
      title: 'Swimming Lengths',
      skill: 'Swimming',
      unit: 'lengths',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 90
    },
    {
      id: 'mq_workout_sessions',
      title: 'Workout Sessions',
      skill: 'Calisthenics',
      unit: 'sessions',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 110
    },
    {
      id: 'mq_stretch_sessions',
      title: 'Stretch Sessions',
      skill: 'Stretching',
      unit: 'sessions',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 80
    },
    {
      id: 'mq_meditation_sessions',
      title: 'Meditation Sessions',
      skill: 'Meditation',
      unit: 'sessions',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 90
    },
    {
      id: 'mq_cooked_meals',
      title: 'Meals Cooked',
      skill: 'Cooking',
      unit: 'meals',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 100
    },
    {
      id: 'mq_gardening_tasks',
      title: 'Gardening Tasks',
      skill: 'Gardening',
      unit: 'tasks',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 90
    },
    {
      id: 'mq_planning_sessions',
      title: 'Planning Sessions',
      skill: 'Planning',
      unit: 'sessions',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 90
    }
  ],

  achievementFamilies: [
    {
      id: 'ach_skill_reading',
      title: 'Reading Mastery',
      type: 'skill_level',
      skill: 'Reading',
      milestones: [1, 5, 10, 13, 25, 50, 100],
      rewardXp: 60
    },
    {
      id: 'ach_skill_language',
      title: 'Language Mastery',
      type: 'skill_level',
      skill: 'Language Learning',
      milestones: [1, 5, 10, 13, 25, 50, 100],
      rewardXp: 60
    },
    {
      id: 'ach_skill_cycling',
      title: 'Cycling Mastery',
      type: 'skill_level',
      skill: 'Cycling',
      milestones: [1, 5, 10, 13, 25, 50, 100],
      rewardXp: 60
    },
    {
      id: 'ach_skill_calisthenics',
      title: 'Calisthenics Mastery',
      type: 'skill_level',
      skill: 'Calisthenics',
      milestones: [1, 5, 10, 13, 25, 50, 100],
      rewardXp: 60
    },
    {
      id: 'ach_skill_journaling',
      title: 'Journaling Mastery',
      type: 'skill_level',
      skill: 'Journaling',
      milestones: [1, 5, 10, 13, 25, 50, 100],
      rewardXp: 60
    },
    {
      id: 'ach_skill_meditation',
      title: 'Meditation Mastery',
      type: 'skill_level',
      skill: 'Meditation',
      milestones: [1, 5, 10, 13, 25, 50, 100],
      rewardXp: 60
    },
    {
      id: 'ach_attr_strength',
      title: 'Strength Ascension',
      type: 'attribute_level',
      attribute: 'Strength',
      milestones: [1, 5, 10, 13, 25, 50, 100],
      rewardXp: 80
    },
    {
      id: 'ach_attr_endurance',
      title: 'Endurance Ascension',
      type: 'attribute_level',
      attribute: 'Endurance',
      milestones: [1, 5, 10, 13, 25, 50, 100],
      rewardXp: 80
    },
    {
      id: 'ach_attr_intelligence',
      title: 'Intelligence Ascension',
      type: 'attribute_level',
      attribute: 'Intelligence',
      milestones: [1, 5, 10, 13, 25, 50, 100],
      rewardXp: 80
    },
    {
      id: 'ach_attr_wisdom',
      title: 'Wisdom Ascension',
      type: 'attribute_level',
      attribute: 'Wisdom',
      milestones: [1, 5, 10, 13, 25, 50, 100],
      rewardXp: 80
    },
    {
      id: 'ach_daily_total',
      title: 'Daily Quest Completion',
      type: 'daily_total',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 50
    },
    {
      id: 'ach_main_total',
      title: 'Main Quest Progress',
      type: 'main_total',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 70
    },
    {
      id: 'ach_streak',
      title: 'Streak Keeper',
      type: 'streak',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 90
    },
    {
      id: 'ach_books_family',
      title: 'Books Read',
      type: 'main_family',
      familyId: 'mq_books_read',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 70
    },
    {
      id: 'ach_cycling_family',
      title: 'Cycling Distance',
      type: 'main_family',
      familyId: 'mq_cycling_km',
      milestones: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],
      rewardXp: 70
    }
  },

  questTextPools: {
    genres: [
      'fantasy',
      'sci-fi',
      'history',
      'psychology',
      'philosophy',
      'biography',
      'economics',
      'self-development',
      'mystery',
      'adventure'
    ]
  }
};
