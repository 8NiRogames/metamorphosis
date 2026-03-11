(function () {
  const {
    questGenerators,
    questSkillRotation,
    skillToAttribute,
    questTextPools,
    mainQuestFamilies,
    progressionSteps
  } = window.MetaData;

  function getTodayKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function fillTemplate(text) {
    return text.replace(/\{(\w+)\}/g, (_, key) => {
      const pool = questTextPools[key];
      return pool && pool.length ? randomFrom(pool) : key;
    });
  }

  function buildDailyQuest(skill, template, idx) {
    const attr = skillToAttribute[skill];
    return {
      id: `dq_${getTodayKey()}_${idx}_${skill.replace(/\s+/g, '_')}`,
      title: fillTemplate(template.text),
      skill,
      attribute: attr,
      skillXp: 20,
      xp: 20,
      metaType: template.type,
      metaAmount: template.amount
    };
  }

  function createFreshDailyQuestSet() {
    const skillPool = [...questSkillRotation];
    const chosenSkills = [];

    while (chosenSkills.length < 5 && skillPool.length) {
      const idx = Math.floor(Math.random() * skillPool.length);
      chosenSkills.push(skillPool.splice(idx, 1)[0]);
    }

    const selected = chosenSkills.map((skill, index) => {
      const templates = questGenerators[skill] || [];
      const template = randomFrom(templates);
      return buildDailyQuest(skill, template, index);
    });

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
              <div class="quest-desc">+${q.xp} Character XP • +${q.skillXp} ${q.skill} XP</div>
              <div class="small-muted">Attribute: ${q.attribute}</div>
            </div>
            <span class="tag daily">${q.skill}</span>
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

    window.MetaStats.gainSkillXP(quest.attribute, quest.skill, quest.skillXp);
    window.MetaApp.gainXP(quest.xp);

    updateStreakForToday(true);
    renderDailyQuests();
  }

  function getUnlockedMilestoneCount(progress) {
    return progressionSteps.filter(step => progress >= step).length;
  }

  function renderMainQuests() {
    const state = window.MetaApp.state;

    window.MetaApp.$('mainQuestList').innerHTML = mainQuestFamilies.map(family => {
      const progress = state.mainQuestProgress[family.id] || 0;
      const unlockedCount = getUnlockedMilestoneCount(progress);
      const nextMilestone = family.milestones.find(step => step > progress) || null;
      const prevMilestone = unlockedCount > 0 ? family.milestones[unlockedCount - 1] : 0;
      const percent = nextMilestone
        ? Math.min(100, ((progress - prevMilestone) / (nextMilestone - prevMilestone)) * 100)
        : 100;

      return `
        <div class="quest-item">
          <div class="quest-head">
            <div>
              <div class="quest-title">${family.title}</div>
              <div class="quest-desc">Skill: ${family.skill} • Progress: ${progress} ${family.unit}</div>
              <div class="small-muted">Next milestone: ${nextMilestone ?? 'Completed'} • Reward: +${family.rewardXp} Character XP • +25 ${family.skill} XP</div>
            </div>
            <span class="tag main">${unlockedCount}/${family.milestones.length}</span>
          </div>

          <div class="progress-shell">
            <div class="progress-fill good" style="width:${percent}%"></div>
          </div>

          <div class="quest-progress-row">
            <button class="step-btn" onclick="changeMainQuestProgress('${family.id}', -1)">−</button>
            <div class="small-muted" style="text-align:center;">${progress} ${family.unit}</div>
            <button class="step-btn" onclick="changeMainQuestProgress('${family.id}', 1)">+</button>
          </div>

          <div style="display:flex; gap:10px; margin-top:10px; align-items:center;">
            <input
              type="number"
              min="1"
              step="1"
              id="bulk_${family.id}"
              placeholder="Add amount"
              style="flex:1; background:#111119; color:var(--text); border:1px solid var(--border); border-radius:10px; padding:10px;"
            />
            <button class="btn" onclick="applyMainQuestBulk('${family.id}')">Add</button>
          </div>
        </div>
      `;
    }).join('');
  }

  function applyMainQuestBulk(id) {
    const input = window.MetaApp.$(`bulk_${id}`);
    if (!input) return;

    const amount = parseInt(input.value, 10);
    if (!amount || amount < 1) return;

    changeMainQuestProgress(id, amount);
    input.value = '';
  }

  function changeMainQuestProgress(id, delta) {
    const family = mainQuestFamilies.find(q => q.id === id);
    if (!family) return;

    const state = window.MetaApp.state;
    const oldValue = state.mainQuestProgress[id] || 0;
    const nextValue = Math.max(0, oldValue + delta);

    if (nextValue === oldValue) return;

    state.mainQuestProgress[id] = nextValue;

    if (delta > 0) {
      state.mainQuestStepCount += delta;
      state.completedQuestTotal += 1;

      const attr = skillToAttribute[family.skill];
      window.MetaStats.gainSkillXP(attr, family.skill, 15 * delta);
      updateStreakForToday(true);
    }

    const oldMilestones = family.milestones.filter(step => oldValue >= step).length;
    const newMilestones = family.milestones.filter(step => nextValue >= step).length;

    if (newMilestones > oldMilestones) {
      const rewardCount = newMilestones - oldMilestones;

      for (let i = 0; i < rewardCount; i++) {
        const attr = skillToAttribute[family.skill];
        window.MetaStats.gainSkillXP(attr, family.skill, 25);
        window.MetaApp.gainXP(family.rewardXp);
      }
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
  window.applyMainQuestBulk = applyMainQuestBulk;
})();
