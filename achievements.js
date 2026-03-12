window.MetaAchievements = (function () {
  const { achievementFamilies } = window.MetaData;

  function state() {
    return window.MetaApp.state;
  }

  function getProgress(family) {
    const s = state();

    switch (family.type) {
      case 'skill_level':
        return s.progression.skills[family.skill]?.level || 0;
      case 'attribute_level':
        return s.progression.attributes[family.attribute]?.level || 0;
      case 'daily_total':
        return s.quests.stats.completedTotal;
      case 'main_total':
        return s.quests.stats.mainStepsTotal;
      case 'streak':
        return s.quests.stats.streak;
      case 'main_family':
        return s.quests.mainFamilies[family.familyId]?.progress || 0;
      default:
        return 0;
    }
  }

  function nextMilestone(family, progress) {
    return family.milestones.find(m => m > progress) || null;
  }

  function unlockedCount(family, progress) {
    return family.milestones.filter(m => progress >= m).length;
  }

  function tierClass(family, progress) {
    const next = nextMilestone(family, progress);
    if (next === null) return 'legendary';
    if (next <= 10) return 'easy';
    if (next <= 100) return 'medium';
    return 'legendary';
  }

  function buildCard(family) {
    const progress = getProgress(family);
    const next = nextMilestone(family, progress);
    const unlocked = unlockedCount(family, progress);
    const prev = unlocked > 0 ? family.milestones[unlocked - 1] : 0;
    const percent = next ? Math.min(100, ((progress - prev) / (next - prev)) * 100) : 100;

    return `
      <div class="achievement-item">
        <div class="achievement-head">
          <div>
            <div class="achievement-title">${next === null ? '🏆' : '🔒'} ${family.title}</div>
            <div class="achievement-desc">Progress: ${progress} • Next: ${next ?? 'Completed'} • Reward: +${family.rewardXp} Character XP</div>
          </div>
          <span class="tag ${tierClass(family, progress)}">${unlocked}/${family.milestones.length}</span>
        </div>

        <div class="progress-shell">
          <div class="progress-fill ${next === null ? 'good' : ''}" style="width:${percent}%"></div>
        </div>
      </div>
    `;
  }

  function renderAchievements() {
    const quick = [];
    const medium = [];
    const legendary = [];

    achievementFamilies.forEach(family => {
      const progress = getProgress(family);
      const tier = tierClass(family, progress);
      if (tier === 'easy') quick.push(family);
      else if (tier === 'medium') medium.push(family);
      else legendary.push(family);
    });

    document.getElementById('achievementListEasy').innerHTML = quick.map(buildCard).join('');
    document.getElementById('achievementListMedium').innerHTML = medium.map(buildCard).join('');
    document.getElementById('achievementListLegendary').innerHTML = legendary.map(buildCard).join('');
  }

  return { renderAchievements };
})();
