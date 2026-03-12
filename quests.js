window.MetaQuests = (function () {
  const { questSkillRotation, questGenerators, mainQuestFamilies, progressionSteps, skillToAttribute } = window.MetaData;

  function state() {
    return window.MetaApp.state;
  }

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getDailySearch() {
    return state().ui.searchQueries.dailyQuests.toLowerCase().trim();
  }

  function getMainSearch() {
    return state().ui.searchQueries.mainQuests.toLowerCase().trim();
  }

  function getMainFilter() {
    return state().ui.filters.mainQuestSkill || 'all';
  }

  function ensureFavorites() {
    if (!state().quests.favorites) {
      state().quests.favorites = { dailyIds: [], mainIds: [] };
    }
  }

  function generateDailyQuests() {
    const pool = [...questSkillRotation];
    const pickedSkills = [];

    while (pickedSkills.length < 5 && pool.length) {
      const i = Math.floor(Math.random() * pool.length);
      pickedSkills.push(pool.splice(i, 1)[0]);
    }

    const quests = pickedSkills.map((skill, idx) => {
      const template = randomFrom(questGenerators[skill]);
      const attribute = skillToAttribute[skill];
      return {
        id: `dq_${todayKey()}_${idx}_${skill.replace(/\s+/g, '_')}`,
        title: template.text,
        skill,
        attribute,
        xpReward: 20,
        skillXpReward: 20,
        attributeXpReward: 10,
        completed: false
      };
    });

    state().quests.daily.date = todayKey();
    state().quests.daily.rerollUsed = false;
    state().quests.daily.active = quests;
    state().quests.daily.doneIds = [];
  }

  function ensureDailyState() {
    ensureFavorites();
    if (state().quests.daily.date !== todayKey()) {
      generateDailyQuests();
      cleanupFavoriteDailyIds();
    }
  }

  function cleanupFavoriteDailyIds() {
    const activeIds = new Set(state().quests.daily.active.map(q => q.id));
    state().quests.favorites.dailyIds = state().quests.favorites.dailyIds.filter(id => activeIds.has(id));
  }

  function rerollDailyQuests() {
    ensureDailyState();
    if (state().quests.daily.rerollUsed) {
      alert('You already rerolled daily quests today.');
      return;
    }
    generateDailyQuests();
    state().quests.daily.rerollUsed = true;
    cleanupFavoriteDailyIds();
    window.MetaApp.save();
    window.MetaApp.renderAll();
  }

  function completeDailyQuest(id) {
    ensureDailyState();
    if (state().quests.daily.doneIds.includes(id)) return;

    const quest = state().quests.daily.active.find(q => q.id === id);
    if (!quest) return;

    state().quests.daily.doneIds.push(id);
    state().quests.history.push({
      id: `qh_${Date.now()}`,
      questId: id,
      completedAt: new Date().toISOString()
    });

    state().quests.stats.completedTotal += 1;

    window.MetaProgression.gainSkillXP(quest.attribute, quest.skill, quest.skillXpReward);
    window.MetaProgression.gainCharacterXP(quest.xpReward);
    bumpDailyCompletion();
    window.MetaApp.save();
    window.MetaApp.renderAll();
  }

  function bumpDailyCompletion() {
    const key = todayKey();
    const stats = state().quests.stats;
    if (stats.streakDateProcessed !== key) {
      stats.streak += 1;
      stats.completedDays += 1;
      stats.streakDateProcessed = key;
    }
  }

  function processMissedDayPenalty() {
    const stats = state().quests.stats;
    const key = todayKey();
    if (stats.lastPenaltyCheck === key) return;

    if (stats.streakDateProcessed && stats.streakDateProcessed !== key) {
      const current = new Date(`${key}T00:00:00`);
      const last = new Date(`${stats.streakDateProcessed}T00:00:00`);
      const diff = Math.floor((current - last) / (1000 * 60 * 60 * 24));
      if (diff >= 1) stats.streak -= 1;
    }

    stats.lastPenaltyCheck = key;
  }

  function milestoneCount(progress) {
    return progressionSteps.filter(step => progress >= step).length;
  }

  function changeMainQuestProgress(id, delta) {
    const family = mainQuestFamilies.find(f => f.id === id);
    if (!family) return;

    const record = state().quests.mainFamilies[id] || { progress: 0, milestonesCompleted: 0 };
    const oldValue = record.progress;
    const nextValue = Math.max(0, oldValue + delta);
    if (nextValue === oldValue) return;

    record.progress = nextValue;

    const oldCount = milestoneCount(oldValue);
    const newCount = milestoneCount(nextValue);

    if (delta > 0) {
      state().quests.stats.mainStepsTotal += delta;
      state().quests.stats.completedTotal += 1;
      bumpDailyCompletion();
      window.MetaProgression.gainSkillXP(skillToAttribute[family.skill], family.skill, 15 * delta);
    }

    if (newCount > oldCount) {
      const rewardCount = newCount - oldCount;
      for (let i = 0; i < rewardCount; i++) {
        window.MetaProgression.gainSkillXP(skillToAttribute[family.skill], family.skill, 25);
        window.MetaProgression.gainCharacterXP(family.rewardXp);
      }
      record.milestonesCompleted = newCount;
    }

    state().quests.mainFamilies[id] = record;
    window.MetaApp.save();
    window.MetaApp.renderAll();
  }

  function applyMainQuestBulk(id) {
    const input = document.getElementById(`bulk_${id}`);
    const value = parseInt(input.value, 10);
    if (!value || value < 1) return;
    changeMainQuestProgress(id, value);
    input.value = '';
  }

  function toggleFavoriteDaily(id) {
    ensureFavorites();
    const arr = state().quests.favorites.dailyIds;
    if (arr.includes(id)) {
      state().quests.favorites.dailyIds = arr.filter(x => x !== id);
    } else {
      arr.push(id);
    }
    window.MetaApp.save();
    renderDailyQuests();
    renderFavoritesQuests();
  }

  function toggleFavoriteMain(id) {
    ensureFavorites();
    const arr = state().quests.favorites.mainIds;
    if (arr.includes(id)) {
      state().quests.favorites.mainIds = arr.filter(x => x !== id);
    } else {
      arr.push(id);
    }
    window.MetaApp.save();
    renderMainQuests();
    renderFavoritesQuests();
  }

  function renderDailyQuests() {
    ensureDailyState();

    const q = getDailySearch();
    const quests = state().quests.daily.active.filter(item => {
      if (!q) return true;
      const hay = `${item.title} ${item.skill} ${item.attribute}`.toLowerCase();
      return hay.includes(q);
    });

    document.getElementById('dailyQuestList').innerHTML = quests.map(item => {
      const checked = state().quests.daily.doneIds.includes(item.id);
      const favorite = state().quests.favorites.dailyIds.includes(item.id);

      return `
        <div class="quest-item">
          <div class="quest-head">
            <div>
              <div class="quest-title">${item.title}</div>
              <div class="quest-desc">
                +${item.xpReward} Character XP • +${item.skillXpReward} ${item.skill} XP • +${item.attributeXpReward} ${item.attribute} XP
              </div>
            </div>
            <span class="tag daily">${item.skill}</span>
          </div>

          <div class="checkbox-row">
            <input type="checkbox" ${checked ? 'checked' : ''} onchange="MetaQuests.completeDailyQuest('${item.id}')">
            <span class="small-muted">Mark completed</span>
          </div>

          <div class="quest-actions">
            <button class="favorite-btn ${favorite ? 'active' : ''}" onclick="MetaQuests.toggleFavoriteDaily('${item.id}')">
              ${favorite ? '★ Favorited' : '☆ Favorite'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    const btn = document.getElementById('rerollButton');
    btn.disabled = state().quests.daily.rerollUsed;
    btn.textContent = state().quests.daily.rerollUsed ? '🎲 Reroll Used Today' : '🎲 Reroll Once Today';
  }

  function renderMainQuests() {
    ensureFavorites();

    const search = getMainSearch();
    const filter = getMainFilter();

    document.getElementById('mainQuestSkillFilter').innerHTML = `
      <option value="all">All skills</option>
      ${[...new Set(mainQuestFamilies.map(q => q.skill))].sort().map(skill => `<option value="${skill}" ${filter === skill ? 'selected' : ''}>${skill}</option>`).join('')}
    `;

    const filtered = mainQuestFamilies.filter(family => {
      const matchesSkill = filter === 'all' || family.skill === filter;
      const hay = `${family.title} ${family.skill}`.toLowerCase();
      const matchesSearch = !search || hay.includes(search);
      return matchesSkill && matchesSearch;
    });

    document.getElementById('mainQuestList').innerHTML = filtered.map(family => {
      const record = state().quests.mainFamilies[family.id] || { progress: 0, milestonesCompleted: 0 };
      const progress = record.progress;
      const next = progressionSteps.find(step => step > progress) || null;
      const prev = progressionSteps.filter(step => step <= progress).slice(-1)[0] || 0;
      const percent = next ? Math.min(100, ((progress - prev) / (next - prev)) * 100) : 100;
      const favorite = state().quests.favorites.mainIds.includes(family.id);

      return `
        <div class="quest-item">
          <div class="quest-head">
            <div>
              <div class="quest-title">${family.title}</div>
              <div class="quest-desc">
                Skill: ${family.skill} • Progress: ${progress} ${family.unit} • Next milestone: ${next ?? 'Completed'}
              </div>
              <div class="small-muted">
                +${family.rewardXp} Character XP • +25 ${family.skill} XP on milestone
              </div>
            </div>
            <span class="tag main">${record.milestonesCompleted}/${progressionSteps.length}</span>
          </div>

          <div class="progress-shell">
            <div class="progress-fill good" style="width:${percent}%"></div>
          </div>

          <div class="quest-progress-row">
            <button class="step-btn" onclick="MetaQuests.changeMainQuestProgress('${family.id}', -1)">−</button>
            <div class="small-muted" style="text-align:center;">${progress} ${family.unit}</div>
            <button class="step-btn" onclick="MetaQuests.changeMainQuestProgress('${family.id}', 1)">+</button>
          </div>

          <div class="toolbar-grid" style="margin-top:10px; margin-bottom:0;">
            <div class="field">
              <label>Add bulk progress</label>
              <input type="number" id="bulk_${family.id}" min="1" step="1" placeholder="Add amount" />
            </div>
            <div class="field compact">
              <label>&nbsp;</label>
              <button class="btn" onclick="MetaQuests.applyMainQuestBulk('${family.id}')">Add</button>
            </div>
          </div>

          <div class="quest-actions">
            <button class="favorite-btn ${favorite ? 'active' : ''}" onclick="MetaQuests.toggleFavoriteMain('${family.id}')">
              ${favorite ? '★ Favorited' : '☆ Favorite'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function renderFavoritesQuests() {
    ensureFavorites();
    ensureDailyState();

    const daily = state().quests.daily.active.filter(q => state().quests.favorites.dailyIds.includes(q.id));
    const main = mainQuestFamilies.filter(q => state().quests.favorites.mainIds.includes(q.id));

    const container = document.getElementById('favoriteQuestList');

    if (!daily.length && !main.length) {
      container.innerHTML = `<div class="notice-box"><p>No favorite quests yet.</p></div>`;
      return;
    }

    container.innerHTML = `
      ${daily.length ? `
        <div class="notice-box">
          <p><strong>Favorite Daily Quests</strong></p>
        </div>
        ${daily.map(item => `
          <div class="quest-item">
            <div class="quest-head">
              <div>
                <div class="quest-title">${item.title}</div>
                <div class="quest-desc">+${item.xpReward} Character XP • +${item.skillXpReward} ${item.skill} XP • +${item.attributeXpReward} ${item.attribute} XP</div>
              </div>
              <span class="tag daily">${item.skill}</span>
            </div>
            <div class="quest-actions">
              <button class="favorite-btn active" onclick="MetaQuests.toggleFavoriteDaily('${item.id}')">★ Favorited</button>
            </div>
          </div>
        `).join('')}
      ` : ''}

      ${main.length ? `
        <div class="notice-box">
          <p><strong>Favorite Main Quests</strong></p>
        </div>
        ${main.map(family => {
          const record = state().quests.mainFamilies[family.id] || { progress: 0, milestonesCompleted: 0 };
          return `
            <div class="quest-item">
              <div class="quest-head">
                <div>
                  <div class="quest-title">${family.title}</div>
                  <div class="quest-desc">Skill: ${family.skill} • Progress: ${record.progress} ${family.unit}</div>
                </div>
                <span class="tag main">${family.skill}</span>
              </div>
              <div class="quest-actions">
                <button class="favorite-btn active" onclick="MetaQuests.toggleFavoriteMain('${family.id}')">★ Favorited</button>
              </div>
            </div>
          `;
        }).join('')}
      ` : ''}
    `;
  }

  function bindSearchAndFilter() {
    const daily = document.getElementById('dailyQuestSearch');
    const main = document.getElementById('mainQuestSearch');
    const filter = document.getElementById('mainQuestSkillFilter');

    if (daily && !daily.dataset.bound) {
      daily.dataset.bound = '1';
      daily.addEventListener('input', e => {
        state().ui.searchQueries.dailyQuests = e.target.value;
        renderDailyQuests();
      });
    }

    if (main && !main.dataset.bound) {
      main.dataset.bound = '1';
      main.addEventListener('input', e => {
        state().ui.searchQueries.mainQuests = e.target.value;
        renderMainQuests();
      });
    }

    if (filter && !filter.dataset.bound) {
      filter.dataset.bound = '1';
      filter.addEventListener('change', e => {
        state().ui.filters.mainQuestSkill = e.target.value;
        renderMainQuests();
      });
    }
  }

  return {
    processMissedDayPenalty,
    rerollDailyQuests,
    completeDailyQuest,
    changeMainQuestProgress,
    applyMainQuestBulk,
    toggleFavoriteDaily,
    toggleFavoriteMain,
    renderDailyQuests,
    renderMainQuests,
    renderFavoritesQuests,
    bindSearchAndFilter
  };
})();

function rerollDailyQuests() {
  window.MetaQuests.rerollDailyQuests();
}
