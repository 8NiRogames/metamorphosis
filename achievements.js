window.MetaAchievements = (function () {
  const { achievementFamilies } = window.MetaData;

  function state() {
    return window.MetaApp.state;
  }

  function ensureFavorites() {
    if (!state().achievements.favorites) {
      state().achievements.favorites = [];
    }
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

  function toggleFavorite(id) {
    ensureFavorites();
    const arr = state().achievements.favorites;
    if (arr.includes(id)) {
      state().achievements.favorites = arr.filter(x => x !== id);
    } else {
      arr.push(id);
    }
    window.MetaApp.save();
    renderAchievements();
  }

  function cardHtml(family, favoriteOnly = false) {
    const progress = getProgress(family);
    const next = nextMilestone(family, progress);
    const unlocked = unlockedCount(family, progress);
    const prev = unlocked > 0 ? family.milestones[unlocked - 1] : 0;
    const percent = next ? Math.min(100, ((progress - prev) / (next - prev)) * 100) : 100;
    const tier = tierClass(family, progress);
    const favorite = state().achievements.favorites.includes(family.id);

    return `
      <div class="achievement-item ${unlocked > 0 ? 'achievement-unlocked' : ''}">
        <div class="achievement-head">
          <div>
            <div class="achievement-title">${next === null ? '🏆' : '🔒'} ${family.title}</div>
            <div class="achievement-desc">Progress: ${progress} • Next: ${next ?? 'Completed'} • Reward: +${family.rewardXp} Character XP</div>
          </div>
          <span class="tag ${tier}">${unlocked}/${family.milestones.length}</span>
        </div>

        <div class="progress-shell">
          <div class="progress-fill animated-fill ${next === null ? 'good' : ''}" style="width:${percent}%"></div>
        </div>

        <div class="achievement-actions">
          <button class="favorite-btn ${favorite ? 'active' : ''}" onclick="MetaAchievements.toggleFavorite('${family.id}')">
            ${favorite ? '★ Favorited' : '☆ Favorite'}
          </button>
        </div>
      </div>
    `;
  }

  function setTabVisibility(id, visible) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.classList.toggle('hidden-tab', !visible);
  }

  function renderAchievements() {
    ensureFavorites();

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

    const favorites = achievementFamilies.filter(f => state().achievements.favorites.includes(f.id));

    document.getElementById('achievementListEasy').innerHTML = quick.length
      ? quick.map(f => cardHtml(f)).join('')
      : `<div class="notice-box"><p>No quick achievements yet.</p></div>`;

    document.getElementById('achievementListMedium').innerHTML = medium.length
      ? medium.map(f => cardHtml(f)).join('')
      : `<div class="notice-box"><p>No steady achievements yet.</p></div>`;

    document.getElementById('achievementListLegendary').innerHTML = legendary.length
      ? legendary.map(f => cardHtml(f)).join('')
      : `<div class="notice-box"><p>No legendary achievements yet.</p></div>`;

    document.getElementById('achievementListFavorites').innerHTML = favorites.length
      ? favorites.map(f => cardHtml(f, true)).join('')
      : `<div class="notice-box"><p>No favorite achievements yet.</p></div>`;

    setTabVisibility('tab-achievements-medium', medium.length > 0);
    setTabVisibility('tab-achievements-legendary', legendary.length > 0);
    setTabVisibility('tab-achievements-favorites', favorites.length > 0);
  }

  return {
    toggleFavorite,
    renderAchievements
  };
})();
