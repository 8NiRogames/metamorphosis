window.MetaSchema = {
  createDefaultState() {
    const { xpConfig, skillTree } = window.MetaData;

    const attributes = {};
    const selectedSkills = {};
    const skills = {};
    const collapsedAttributes = {};

    Object.keys(skillTree).forEach(attr => {
      attributes[attr] = { level: 0, xp: 0, nextXp: xpConfig.attribute.base, paragon: 0 };
      selectedSkills[attr] = [];
      collapsedAttributes[attr] = false;
      skillTree[attr].forEach(skill => {
        skills[skill] = { level: 0, xp: 0, nextXp: xpConfig.skill.base, paragon: 0, attribute: attr };
      });
    });

    return {
      meta: {
        version: '1.3.0',
        saveFormat: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },

      profile: {
        id: 'char_local',
        username: 'local_user',
        displayName: 'The Ongoing Self',
        title: 'Future portrait, cosmetics and equipped visuals will live here.',
        avatar: {
          portraitType: 'icon',
          portraitValue: '🜂',
          customImage: null
        }
      },

      progression: {
        character: {
          level: 0,
          xp: 0,
          nextXp: xpConfig.character.base,
          paragon: 0,
          totalXpEarned: 0
        },
        attributes,
        skills,
        selectedSkills
      },

      quests: {
        daily: {
          date: '',
          rerollUsed: false,
          active: [],
          doneIds: []
        },
        mainFamilies: {},
        favorites: {
          dailyIds: [],
          mainIds: []
        },
        stats: {
          completedTotal: 0,
          completedDays: 0,
          mainStepsTotal: 0,
          streak: 0,
          streakDateProcessed: '',
          lastPenaltyCheck: ''
        },
        history: []
      },

      achievements: {
        favorites: [],
        unlockedLog: []
      },

      journal: {
        entries: {},
        order: []
      },

      gallery: {
        folders: {},
        images: {},
        favorites: [],
        folderOrder: []
      },

      calendar: {
        events: {},
        order: []
      },

      finance: {
        entries: {},
        order: []
      },

      inventory: {
        items: {},
        ownedItemIds: [],
        equipped: {
          head: null,
          neck: null,
          weapon: null,
          chest: null,
          hands: null,
          ring: null,
          artifact: null,
          relic: null,
          feet: null
        },
        paragonCurrency: 0
      },

      links: {
        items: {}
      },

      social: {
        account: {
          userId: null,
          email: null
        },
        friends: [],
        friendRequestsIn: [],
        friendRequestsOut: [],
        profileVisibility: {
          profile: 'public',
          achievements: 'public',
          quests: 'friends',
          journal: 'private',
          gallery: 'friends',
          calendar: 'private',
          finance: 'private'
        }
      },

      ui: {
        activePage: 'home',
        theme: 'dark',
        sidebarCollapsed: false,
        mobileSidebarOpen: false,
        collapsedAttributes,
        searchQueries: {
          dailyQuests: '',
          mainQuests: ''
        },
        filters: {
          mainQuestSkill: 'all'
        }
      },

      settings: {
        sound: {
          enabled: false,
          volume: 70
        },
        notifications: {
          calendarReminders: true
        }
      }
    };
  }
};
