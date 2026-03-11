(function () {
  const { achievementFamilies, mainQuestFamilies } = window.MetaData;

  function getFamilyProgress(family) {
    const state = window.MetaApp.state;

    switch (family.type) {
      case 'skill_level':
        return state.skillValues[family.skill]?.level || 0;

      case 'attribute_level':
        return state.attributeStats[family.attribute]?.level || 0;

      case 'daily_total':
        return state.completedQuestTotal;

      case 'main_total':
        return state.mainQuestStepCount;

      case 'streak':
        return state.streak;

      case 'main_family':
        return state.mainQuestProgress[family.familyId] || 0;

      default:
        return 0;
    }
  }

  function getMilestoneCount(family) {
    const progress = getFamilyProgress(family);
    return family.milestones.filter(step => progress >= step).length;
  }

  function buildAchievementCard(family) {
    const progress = getFamilyProgress(family);
    const unlockedCount = getMilestoneCount(family);
    const nextMilestone = family.milestones.find(step => step > progress) || null;
    const prevMilestone = unlockedCount > 0 ? family.milestones[unlockedCount - 1] : 0;
    const percent = nextMilestone
      ? Math.min(100, ((progress - prevMilestone) / (nextMilestone - prevMilestone)) * 100)
      : 100;

    return `
      <div class="achievement-item ${nextMilestone === null ? 'unlocked' : ''}">
        <div class="achievement-head">
          <div>
            <div class="achievement-title">${nextMilestone === null ? '🏆' : '🔒'} ${family.title}</div>
            <div class="achievement-desc">Progress: ${progress} • Next: ${nextMilestone ?? 'Completed'} • Reward: +${family.rewardXp} Character XP</div>
          </div>
          <span class="tag ${nextMilestone === null ? 'legendary' : (nextMilestone <= 10 ? 'easy' : nextMilestone <= 100 ? 'medium' : 'legendary')}">${unlockedCount}/${family.milestones.length}</span>
        </div>
        <div class="progress-shell">
          <div class="progress-fill ${nextMilestone === null ? 'good' : ''}" style="width:${percent}%"></div>
        </div>
      </div>
    `;
  }

  function renderAchievements() {
    const quick = [];
    const steady = [];
    const legendary = [];

    achievementFamilies.forEach(family => {
      const progress = getFamilyProgress(family);
      const nextMilestone = family.milestones.find(step => step > progress) || null;

      if (nextMilestone === null || nextMilestone > 100) {
        legendary.push(family);
      } else if (nextMilestone > 10) {
        steady.push(family);
      } else {
        quick.push(family);
      }
    });

    window.MetaApp.$('achievementListEasy').innerHTML = quick.map(buildAchievementCard).join('');
    window.MetaApp.$('achievementListMedium').innerHTML = steady.map(buildAchievementCard).join('');
    window.MetaApp.$('achievementListLegendary').innerHTML = legendary.map(buildAchievementCard).join('');
  }

  window.MetaAchievements = {
    renderAchievements
  };
})();
