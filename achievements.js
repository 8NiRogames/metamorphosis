(function () {
  const { achievements } = window.MetaData;

  function achievementUnlocked(ach) {
    const state = window.MetaApp.state;

    switch (ach.type) {
      case 'quests': return state.completedQuestTotal >= ach.target;
      case 'level': return state.level >= ach.target;
      case 'days': return state.completedDays >= ach.target;
      case 'streak': return state.streak >= ach.target;
      case 'mainSteps': return state.mainQuestStepCount >= ach.target;
      case 'dailyCategory': return (state.dailyCategoryProgress[ach.category] || 0) >= ach.target;
      case 'totalXpEarned': return state.totalXpEarned >= ach.target;
      default: return false;
    }
  }

  function achievementProgressText(ach) {
    const state = window.MetaApp.state;
    let current = 0;

    switch (ach.type) {
      case 'quests': current = state.completedQuestTotal; break;
      case 'level': current = state.level; break;
      case 'days': current = state.completedDays; break;
      case 'streak': current = state.streak; break;
      case 'mainSteps': current = state.mainQuestStepCount; break;
      case 'dailyCategory': current = state.dailyCategoryProgress[ach.category] || 0; break;
      case 'totalXpEarned': current = state.totalXpEarned; break;
    }

    return `${current} / ${ach.target}`;
  }

  function renderAchievementTier(containerId, list) {
    const state = window.MetaApp.state;

    window.MetaApp.$(containerId).innerHTML = list.map(ach => {
      const unlocked = achievementUnlocked(ach);
      const tagClass = ach.tier === 'legendary' ? 'legendary' : ach.tier;

      let current = 0;
      switch (ach.type) {
        case 'quests': current = state.completedQuestTotal; break;
        case 'level': current = state.level; break;
        case 'days': current = state.completedDays; break;
        case 'streak': current = Math.max(0, state.streak); break;
        case 'mainSteps': current = state.mainQuestStepCount; break;
        case 'dailyCategory': current = state.dailyCategoryProgress[ach.category] || 0; break;
        case 'totalXpEarned': current = state.totalXpEarned; break;
      }

      const fill = Math.min(100, (current / ach.target) * 100);

      return `
        <div class="achievement-item ${unlocked ? 'unlocked' : ''}">
          <div class="achievement-head">
            <div>
              <div class="achievement-title">${unlocked ? '🏆' : '🔒'} ${ach.title}</div>
              <div class="achievement-desc">${ach.desc}</div>
            </div>
            <span class="tag ${tagClass}">${achievementProgressText(ach)}</span>
          </div>
          <div class="progress-shell"><div class="progress-fill ${unlocked ? 'good' : ''}" style="width:${fill}%"></div></div>
        </div>
      `;
    }).join('');
  }

  function renderAchievements() {
    const grouped = { easy: [], medium: [], legendary: [] };
    achievements.forEach(ach => grouped[ach.tier].push(ach));

    renderAchievementTier('achievementListEasy', grouped.easy);
    renderAchievementTier('achievementListMedium', grouped.medium);
    renderAchievementTier('achievementListLegendary', grouped.legendary);
  }

  window.MetaAchievements = {
    renderAchievements
  };
})();
