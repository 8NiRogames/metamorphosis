(function () {
  const { dailyQuestPool, mainQuests } = window.MetaData;

  function renderAttributeRewards(category, amount = 10) {
    const rewards = window.MetaStats.getAttributeRewardMap(category, amount);

    return Object.entries(rewards)
      .map(([attr, value]) => `+${value} ${attr}`)
      .join(' • ');
  }

  function getTodayKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function createFreshDailyQuestSet() {
    const poolCopy = [...dailyQuestPool];
    const selected = [];

    while (selected.length < 3 && poolCopy.length) {
      const idx = Math.floor(Math.random() * poolCopy.length);
      selected.push(poolCopy.splice(idx, 1)[0]);
    }

    localStorage.setItem('meta_dailyQuestSet', JSON.stringify(selected));
    localStorage.setItem('meta_dailyQuestDone', JSON.stringify([]));
    localStorage.setItem('meta_dailyQuestDate', getTodayKey());

    return selected;
  }

  function getTodayQuests() {
    const today = getTodayKey();
    const storedDate = localStorage.getItem('meta_dailyQuestDate');
    let storedQuests = JSON.parse(localStorage.getItem('meta_dailyQuestSet') || '[]');
    let done = JSON.parse(localStorage.getItem('meta_dailyQuestDone') || '[]');
    let rerollDate = localStorage.getItem('meta_dailyQuestRerollDate');

    if (storedDate !== today) {
      storedQuests = createFreshDailyQuestSet();
      done = [];
      localStorage.setItem('meta_dailyQuestRerollDate', '');
      rerollDate = '';
    }

    return { quests: storedQuests, done, rerollDate };
  }

  function rerollDailyQuests() {
    const today = getTodayKey();
    const rerollDate = localStorage.getItem('meta_dailyQuestRerollDate');

    if (rerollDate === today) {
      alert('You already rerolled daily quests today.');
      return;
    }

    createFreshDailyQuestSet();
    localStorage.setItem('meta_dailyQuestRerollDate', today);
    renderDailyQuests();
  }

  function renderDailyQuests() {
    const { quests, done, rerollDate } = getTodayQuests();

    window.MetaApp.$('dailyQuestList').innerHTML = quests.map(q => {
      const checked = done.includes(q.id);

      return `
        <div class="quest-item">
          <div class="quest-head">
            <div>
              <div class="quest-title">${q.title}</div>
              <div class="quest-desc">Daily quest • ${q.xp} main XP reward</div>
              <div class="small-muted">${renderAttributeRewards(q.category, 10)}</div>
            </div>
            <span class="tag daily">${q.category}</span>
          </div>
          <div class="checkbox-row">
            <input type="checkbox" ${checked ? 'checked' : ''} onchange="completeDailyQuest('${q.id}')">
            <span class="small-muted">Mark completed</span>
          </div>
        </div>
      `;
    }).join('');

    const rerollBtn = window.MetaApp.$('rerollButton');
    if (rerollBtn) {
      rerollBtn.disabled = rerollDate === getTodayKey();
      rerollBtn.textContent = rerollDate === getTodayKey() ? '🎲 Reroll Used Today' : '🎲 Reroll Once Today';
    }
  }

  function completeDailyQuest(id) {
    const { quests, done } = getTodayQuests();
    if (done.includes(id)) return;

    const quest = quests.find(q => q.id === id);
    if (!quest) return;

    done.push(id);
    localStorage.setItem('meta_dailyQuestDone', JSON.stringify(done));

    const state = window.MetaApp.state;
    state.completedQuestTotal += 1;

    if (state.dailyCategoryProgress[quest.category] != null) {
      state.dailyCategoryProgress[quest.category] += 1;
    }

    window.MetaStats.rewardAttributeXP(quest.category, 10);
    window.MetaApp.gainXP(quest.xp);
    updateStreakForToday(true);
    renderDailyQuests();
  }

  function getMainQuestCategory(quest) {
    const title = quest.title.toLowerCase();

    if (
      title.includes('lose') ||
      title.includes('exercise') ||
      title.includes('swim') ||
      title.includes('bike')
    ) return 'Body';

    if (
      title.includes('read') ||
      title.includes('journal') ||
      title.includes('study') ||
      title.includes('project')
    ) return 'Mind';

    if (
      title.includes('cook') ||
      title.includes('family') ||
      title.includes('garden') ||
      title.includes('plasma')
    ) return 'Life';

    if (title.includes('game')) return 'Social';

    return 'Discipline';
  }

  function renderMainQuests() {
    const state = window.MetaApp.state;

    window.MetaApp.$('mainQuestList').innerHTML = mainQuests.map(q => {
      const current = state.mainQuestProgress[q.id] || 0;
      const percent = Math.min(100, (current / q.steps) * 100);
      const done = current >= q.steps;

      return `
        <div class="quest-item">
          <div class="quest-head">
            <div>
              <div class="quest-title">${q.title}</div>
              <div class="quest-desc">${q.desc}</div>
              <div class="small-muted">${renderAttributeRewards(getMainQuestCategory(q), 10)}</div>
            </div>
            <span class="tag main">${current}/${q.steps}</span>
          </div>
          <div class="progress-shell"><div class="progress-fill good" style="width:${percent}%"></div></div>
          <div class="quest-progress-row">
            <button class="step-btn" onclick="changeMainQuestProgress('${q.id}', -1)">−</button>
            <div class="small-muted" style="text-align:center;">${done ? 'Completed' : `${q.xpReward} XP on completion`}</div>
            <button class="step-btn" onclick="changeMainQuestProgress('${q.id}', 1)">+</button>
          </div>
        </div>
      `;
    }).join('');
  }

  function changeMainQuestProgress(id, delta) {
    const quest = mainQuests.find(q => q.id === id);
    if (!quest) return;

    const state = window.MetaApp.state;
    const oldValue = state.mainQuestProgress[id] || 0;
    const nextValue = Math.max(0, Math.min(quest.steps, oldValue + delta));

    if (nextValue === oldValue) return;

    state.mainQuestProgress[id] = nextValue;

    if (delta > 0) {
      state.mainQuestStepCount += 1;
      state.completedQuestTotal += 1;

      const category = getMainQuestCategory(quest);
      window.MetaStats.rewardAttributeXP(category, 10);

      updateStreakForToday(true);
    }

    if (oldValue < quest.steps && nextValue >= quest.steps) {
      window.MetaApp.gainXP(quest.xpReward);
    } else {
      window.MetaApp.updateUI();
      window.MetaApp.saveState();
    }
  }

  function updateStreakForToday(hadQuestCompletion) {
    const today = getTodayKey();
    const lastProcessed = localStorage.getItem('meta_streakDateProcessed');
    const state = window.MetaApp.state;

    if (hadQuestCompletion && lastProcessed !== today) {
      state.streak += 1;
      state.completedDays += 1;
      localStorage.setItem('meta_streakDateProcessed', today);
    }

    window.MetaApp.saveState();
    window.MetaApp.updateUI();
  }

  function processMissedDayPenalty() {
    const today = getTodayKey();
    const lastPenaltyCheck = localStorage.getItem('meta_lastPenaltyCheck');
    const lastPositiveDay = localStorage.getItem('meta_streakDateProcessed');
    const state = window.MetaApp.state;

    if (lastPenaltyCheck === today) return;

    if (lastPositiveDay && lastPositiveDay !== today) {
      const todayDate = new Date(today + 'T00:00:00');
      const positiveDate = new Date(lastPositiveDay + 'T00:00:00');
      const diffDays = Math.floor((todayDate - positiveDate) / (1000 * 60 * 60 * 24));
      if (diffDays >= 1) state.streak -= 1;
    }

    localStorage.setItem('meta_lastPenaltyCheck', today);
    window.MetaApp.saveState();
  }

  window.MetaQuests = {
    renderDailyQuests,
    renderMainQuests,
    processMissedDayPenalty
  };

  window.rerollDailyQuests = rerollDailyQuests;
  window.completeDailyQuest = completeDailyQuest;
  window.changeMainQuestProgress = changeMainQuestProgress;
})();
