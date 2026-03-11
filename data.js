window.MetaData = {
  progressionSteps: [1, 5, 10, 13, 25, 50, 100, 250, 500, 666, 1000],

  xpConfig: {
    character: {
      base: 50,
      multiplier: 1.04,
      flat: 2
    },
    attribute: {
      base: 40,
      multiplier: 1.03,
      flat: 1
    },
    skill: {
      base: 30,
      multiplier: 1.025,
      flat: 1
    }
  },

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
      'Yard Work'
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

    'Walking': 'Endurance',
    'Long Cycling': 'Endurance',
    'Swimming Endurance': 'Endurance',
    'Cardio Training': 'Endurance',
    'Work Stamina': 'Endurance',
    'Sleep Hygiene': 'Endurance',
    'Recovery Routine': 'Endurance',
    'Backpack Hiking': 'Endurance',
    'Household Chores': 'Endurance',
    'Yard Work': 'Endurance',

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
    Reading: [
      { type: 'pages', amount: 5, text: 'Read 5 pages of a {genres} book' },
      { type: 'pages', amount: 10, text: 'Read 10 pages of a {genres} book' },
      { type: 'pages', amount: 15, text: 'Read 15 pages of a {genres} book' },
      { type: 'pages', amount: 20, text: 'Read 20 pages of a {genres} book' },
      { type: 'chapter', amount: 1, text: 'Read one chapter of a {genres} book' },
      { type: 'summary', amount: 1, text: 'Write a short summary from your reading' },
      { type: 'notes', amount: 1, text: 'Take notes from what you read' },
      { type: 'nonfiction', amount: 1, text: 'Read a nonfiction text for focused learning' },
      { type: 'fiction', amount: 1, text: 'Read fiction for immersion and focus' },
      { type: 'reflect', amount: 1, text: 'Read and reflect on one useful passage' }
    ],

    'Language Learning': [
      { type: 'words', amount: 5, text: 'Learn 5 new words in {languages}' },
      { type: 'words', amount: 10, text: 'Learn 10 new words in {languages}' },
      { type: 'words', amount: 20, text: 'Learn 20 new words in {languages}' },
      { type: 'listening', amount: 10, text: 'Listen to 10 minutes of {languages}' },
      { type: 'listening', amount: 20, text: 'Listen to 20 minutes of {languages}' },
      { type: 'reading', amount: 1, text: 'Read a short article in {languages}' },
      { type: 'writing', amount: 1, text: 'Write 5 sentences in {languages}' },
      { type: 'writing', amount: 1, text: 'Write 10 sentences in {languages}' },
      { type: 'flashcards', amount: 1, text: 'Review your {languages} flashcards' },
      { type: 'speaking', amount: 5, text: 'Practice speaking {languages} for 5 minutes' }
    ],

    Cooking: [
      { type: 'meal', amount: 1, text: 'Cook one proper {cuisines} meal' },
      { type: 'balanced', amount: 1, text: 'Cook a balanced {cuisines} meal' },
      { type: 'prep', amount: 1, text: 'Prepare ingredients for a {cuisines} dish' },
      { type: 'recipe', amount: 1, text: 'Cook a {cuisines} dish from a recipe' },
      { type: 'improvise', amount: 1, text: 'Improvise a {cuisines}-inspired meal' },
      { type: 'onepan', amount: 1, text: 'Cook a one-pan meal' },
      { type: 'rice', amount: 1, text: 'Cook a rice-based meal' },
      { type: 'signature', amount: 1, text: 'Improve one of your signature recipes' },
      { type: 'healthy', amount: 1, text: 'Cook a healthier version of a meal' },
      { type: 'cleanup', amount: 1, text: 'Cook and leave the kitchen clean' }
    ],

    Journaling: [
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

    Meditation: [
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

    Cycling: [
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

    Calisthenics: [
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

    Walking: [
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

    Swimming: [
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

    Stretching: [
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

    Writing: [
      { type: 'words', amount: 100, text: 'Write 100 words in {writingModes} form' },
      { type: 'words', amount: 250, text: 'Write 250 words in {writingModes} form' },
      { type: 'words', amount: 500, text: 'Write 500 words in {writingModes} form' },
      { type: 'reflection', amount: 1, text: 'Write a reflection piece' },
      { type: 'creative', amount: 1, text: 'Write a short creative passage' },
      { type: 'music', amount: 1, text: 'Write a few lines of lyrics or poetry' },
      { type: 'edit', amount: 1, text: 'Edit an older piece of writing' },
      { type: 'idea', amount: 1, text: 'Write down three new ideas' },
      { type: 'character', amount: 1, text: 'Write a character concept or backstory detail' },
      { type: 'project', amount: 1, text: 'Write something for Project Metamorphosis' }
    ],

    Planning: [
      { type: 'scope', amount: 1, text: 'Plan {planningScopes}' },
      { type: 'priority', amount: 1, text: 'Set three priorities for today' },
      { type: 'meal', amount: 1, text: 'Plan a meal block' },
      { type: 'training', amount: 1, text: 'Plan a training session' },
      { type: 'budget', amount: 1, text: 'Plan one spending category' },
      { type: 'study', amount: 1, text: 'Plan a study session' },
      { type: 'sleep', amount: 1, text: 'Plan your sleep schedule' },
      { type: 'project', amount: 1, text: 'Plan one step for Metamorphosis' },
      { type: 'checklist', amount: 1, text: 'Make a checklist for one task' },
      { type: 'review', amount: 1, text: 'Review and adjust one existing plan' }
    ],

    Gardening: [
      { type: 'task', amount: 1, text: 'Do one {gardenTaskTypes} task in the garden' },
      { type: 'water', amount: 1, text: 'Water plants properly' },
      { type: 'soil', amount: 1, text: 'Work on soil or planting space' },
      { type: 'weed', amount: 1, text: 'Remove weeds for a while' },
      { type: 'harvest', amount: 1, text: 'Prepare for harvest or check growth' },
      { type: 'seedling', amount: 1, text: 'Take care of seedlings or young plants' },
      { type: 'cleanup', amount: 1, text: 'Clean or organize one garden area' },
      { type: 'beds', amount: 1, text: 'Do one bed maintenance task' },
      { type: 'observe', amount: 1, text: 'Observe plant health and note changes' },
      { type: 'season', amount: 1, text: 'Do one season-prep garden task' }
    ],

    'Mini Painting': [
      { type: 'style', amount: 1, text: 'Paint a mini in a {paintStyles} style' },
      { type: 'base', amount: 1, text: 'Finish base colors on a mini' },
      { type: 'detail', amount: 1, text: 'Work on details on a mini' },
      { type: 'highlight', amount: 1, text: 'Practice highlights on a mini' },
      { type: 'shade', amount: 1, text: 'Practice shading on a mini' },
      { type: 'onehour', amount: 1, text: 'Do a focused one-hour mini painting session' },
      { type: 'scheme', amount: 1, text: 'Try a new color scheme on a mini' },
      { type: 'terrain', amount: 1, text: 'Paint or improve a base / terrain piece' },
      { type: 'cleanup', amount: 1, text: 'Prepare and clean a mini before painting' },
      { type: 'finish', amount: 1, text: 'Finish one stage of a mini project' }
    ],

    Drawing: [
      { type: 'theme', amount: 1, text: 'Draw a {drawingThemes}' },
      { type: 'sketch', amount: 1, text: 'Do a quick sketch study' },
      { type: 'lines', amount: 1, text: 'Practice clean linework' },
      { type: 'shading', amount: 1, text: 'Practice shading on a drawing' },
      { type: 'object', amount: 1, text: 'Draw one real-life object' },
      { type: 'character', amount: 1, text: 'Draw a character concept' },
      { type: 'scene', amount: 1, text: 'Sketch a simple scene' },
      { type: 'hands', amount: 1, text: 'Practice hands or anatomy basics' },
      { type: 'reference', amount: 1, text: 'Draw from reference' },
      { type: 'improv', amount: 1, text: 'Draw something from imagination' }
    ],

    'Household Chores': [
      { type: 'zone', amount: 1, text: 'Clean or organize the {houseZones}' },
      { type: 'surface', amount: 1, text: 'Clear one messy surface area' },
      { type: 'laundry', amount: 1, text: 'Do one useful laundry task' },
      { type: 'dishes', amount: 1, text: 'Wash dishes or clean kitchen tools' },
      { type: 'floor', amount: 1, text: 'Clean one floor area' },
      { type: 'storage', amount: 1, text: 'Organize one storage area' },
      { type: 'desk', amount: 1, text: 'Reset your desk or work area' },
      { type: 'trash', amount: 1, text: 'Take out trash and reset the area' },
      { type: 'bathroom', amount: 1, text: 'Do one bathroom cleaning task' },
      { type: 'car', amount: 1, text: 'Clean or organize the car interior' }
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
    'Gardening',
    'Mini Painting',
    'Drawing',
    'Household Chores'
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
  ],

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
    ],

    cuisines: [
      'Italian',
      'Chinese',
      'Czech',
      'Slovak',
      'Mexican',
      'Indian',
      'Mediterranean',
      'Japanese',
      'American',
      'French'
    ],

    paintStyles: [
      'fantasy',
      'sci-fi',
      'modern',
      'historical',
      'grimdark',
      'post-apocalyptic',
      'military',
      'steampunk',
      'horror',
      'mythological'
    ],

    languages: [
      'English',
      'German',
      'Russian',
      'Slovak',
      'Czech'
    ],

    drawingThemes: [
      'character',
      'landscape',
      'object study',
      'creature',
      'portrait',
      'fantasy scene',
      'sci-fi scene',
      'architecture',
      'vehicle',
      'abstract form'
    ],

    writingModes: [
      'journal',
      'story',
      'lyrics',
      'reflection',
      'character backstory',
      'scene description',
      'dialogue',
      'worldbuilding',
      'poetry',
      'idea draft'
    ],

    photoThemes: [
      'nature',
      'architecture',
      'night lights',
      'portrait',
      'street detail',
      'objects',
      'sky',
      'animals',
      'vehicles',
      'daily life'
    ],

    gardenTaskTypes: [
      'watering',
      'weeding',
      'plant care',
      'soil work',
      'harvest prep',
      'seedling care',
      'garden cleanup',
      'bed maintenance',
      'observation',
      'season prep'
    ],

    houseZones: [
      'kitchen',
      'bathroom',
      'bedroom',
      'desk area',
      'wardrobe',
      'hallway',
      'living room',
      'floor space',
      'storage area',
      'car interior'
    ],

    researchTopics: [
      'health',
      'fitness',
      'finance',
      'psychology',
      'language learning',
      'history',
      'technology',
      'gardening',
      'cooking',
      'productivity'
    ],

    planningScopes: [
      'today',
      'tomorrow',
      'this week',
      'meal prep',
      'training',
      'budget',
      'study session',
      'project progress',
      'sleep schedule',
      'house tasks'
    ]
  }
};
