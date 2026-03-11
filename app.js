(function () {
  const state = {
    xp: 0,
    level: 0,
    nextLevel: 50,
    characterParagon: 0,

    completedQuestTotal: 0,
    completedDays: 0,
    streak: 0,
    mainQuestStepCount: 0,
    totalXpEarned: 0,

    attributeStats: {},
    selectedSkills: {},
    skillValues: {},
    dailyCategoryProgress: { Mind: 0, Body: 0, Discipline: 0, Social: 0, Life: 0 },
    mainQuestProgress: {}
  };

  const $ = (id) => document.getElementById(id);

  function saveState() {
    localStorage.setItem('meta_xp', state.xp);
    localStorage.setItem('meta_level', state.level);
    localStorage.setItem('meta_nextLevel', state.nextLevel);
    localStorage.setItem('meta_characterParagon', state.characterParagon);

    localStorage.setItem('meta_completedQuestTotal', state.completedQuestTotal);
    localStorage.setItem('meta_completedDays', state.completedDays);
    localStorage.setItem('meta_streak', state.streak);
    localStorage.setItem('meta_mainQuestStepCount', state.mainQuestStepCount);
    localStorage.setItem('meta_mainQuestProgress', JSON.stringify(state.mainQuestProgress));
    localStorage.setItem('meta_selectedSkills', JSON.stringify(state.selectedSkills));
    localStorage.setItem('meta_skillValues', JSON.stringify(state.skillValues));
    localStorage.setItem('meta_dailyCategoryProgress', JSON.stringify(state.dailyCategoryProgress));
    localStorage.setItem('meta_totalXpEarned', state.totalXpEarned);
    localStorage.setItem('meta_attributeStats', JSON.stringify(state.attributeStats));
  }

  function loadState() {
    state.xp = parseInt(localStorage.getItem('meta_xp') || '0', 10);
    state.level = parseInt(localStorage.getItem('meta_level') || '0', 10);
    state.nextLevel = parseInt(localStorage.getItem('meta_nextLevel') || '50', 10);
    state.characterParagon = parseInt(localStorage.getItem('meta_characterParagon') || '0', 10);

    state.completedQuestTotal = parseInt(localStorage.getItem('meta_completedQuestTotal') || '0', 10);
    state.completedDays = parseInt(localStorage.getItem('meta_completedDays') || '0', 10);
    state.streak = parseInt(localStorage.getItem('meta_streak') || '0', 10);
    state.mainQuestStepCount = parseInt(localStorage.getItem('meta_mainQuestStepCount') || '0', 10);
    state.mainQuestProgress = JSON.parse(localStorage.getItem('meta_mainQuestProgress') || '{}');
    state.selectedSkills = JSON.parse(localStorage.getItem('meta_selectedSkills') || '{}');
    state.skillValues = JSON.parse(localStorage.getItem('meta_skillValues') || '{}');
    state.dailyCategoryProgress = JSON.parse(localStorage.getItem('meta_dailyCategoryProgress') || '{"Mind":0,"Body":0,"Discipline":0,"Social":0,"Life":0}');
    state.totalXpEarned = parseInt(localStorage.getItem('meta_totalXpEarned') || '0', 10);
    state.attributeStats = JSON.parse(localStorage.getItem('meta_attributeStats') || '{}');
  }

  function gainXP(amount) {
    state.xp += amount;
    state.totalXpEarned += amount;

    while (state.xp >= state.nextLevel) {
      if (state.level < 100) {
        state.xp -= state.nextLevel;
        state.level += 1;
        state.nextLevel = Math.floor(state.nextLevel * 1.04 + 2);

        if (state.level >= 100) {
          state.level = 100;
        }
      } else {
        state.xp -= state.nextLevel;
        state.characterParagon += 1;
      }
    }

    updateUI();
    saveState();
  }

  function getAttributeParagonTotal() {
    return Object.values(state.attributeStats || {}).reduce((sum, stat) => sum + (stat?.paragon || 0), 0);
  }

  function getSkillParagonTotal() {
    return Object.values(state.skillValues || {}).reduce((sum, stat) => sum + (stat?.paragon || 0), 0);
  }

  function getTotalParagon() {
    return state.characterParagon + getAttributeParagonTotal() + getSkillParagonTotal();
  }

  function renderHomePreview() {
    const previews = [
      'Strength',
      'Dexterity',
      'Agility',
      'Endurance',
      'Intelligence',
      'Willpower',
      'Wits',
      'Wisdom'
    ];

    $('homeSkillPreview').innerHTML = previews.map(attr => {
      const level = window.MetaStats.getAttributeLevel(attr);
      const percent = window.MetaStats.getAttributePercent(attr);
      const paragon = window.MetaStats.getAttributeParagon(attr);

      return `
        <div class="mini-stat">
          <strong>${attr}</strong>
          <div class="progress-shell"><div class="progress-fill" style="width:${percent}%"></div></div>
          <div class="small-muted" style="margin-top:6px;">Level ${level} • Paragon ${paragon}</div>
        </div>
      `;
    }).join('');
  }

  function updateUI() {
    $('xp').textContent = state.xp;
    $('level').textContent = state.level;
    $('nextLevel').textContent = state.nextLevel;

    $('homeXp').textContent = state.xp;
    $('homeLevel').textContent = state.level;
    $('homeNextLevel').textContent = state.nextLevel;

    const percent = Math.max(0, Math.min(100, (state.xp / state.nextLevel) * 100));
    $('xpfill').style.width = percent + '%';
    $('homeXpFill').style.width = percent + '%';

    $('questCompletionCount').textContent = state.completedQuestTotal;
    $('completedDaysCount').textContent = state.completedDays;
    $('mainQuestStepCount').textContent = state.mainQuestStepCount;
    $('streakNumber').textContent = state.streak;

    const attributeParagon = getAttributeParagonTotal();
    const skillParagon = getSkillParagonTotal();
    const totalParagon = getTotalParagon();

    $('characterParagon').textContent = state.characterParagon;
    $('totalParagon').textContent = totalParagon;
    $('paragonCharacterOnly').textContent = state.characterParagon;
    $('paragonAttributesOnly').textContent = attributeParagon;
    $('paragonSkillsOnly').textContent = skillParagon;

    $('homeCharacterParagon').textContent = state.characterParagon;
    $('homeTotalParagon').textContent = totalParagon;
    $('homeParagonCharacterOnly').textContent = state.characterParagon;
    $('homeParagonAttributesOnly').textContent = attributeParagon;
    $('homeParagonSkillsOnly').textContent = skillParagon;

    renderHomePreview();
    window.MetaAchievements.renderAchievements();
    window.MetaQuests.renderMainQuests();
    window.MetaStats.renderAttributes();
  }

  function setPage(pageKey) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('[data-page-link]').forEach(btn => btn.classList.remove('active'));

    const page = $('page-' + pageKey);
    if (page) page.classList.add('active');

    document.querySelectorAll(`[data-page-link="${pageKey}"]`).forEach(btn => btn.classList.add('active'));
  }

  function setupPageNavigation() {
    document.querySelectorAll('[data-page-link]').forEach(btn => {
      btn.addEventListener('click', () => setPage(btn.dataset.pageLink));
    });
  }

  function setupSubtabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.dataset.subtab;
        const target = btn.dataset.target;

        document.querySelectorAll(`.tab-btn[data-subtab="${group}"]`).forEach(b => b.classList.remove('active'));
        document.querySelectorAll(`#page-${group} .subsection`).forEach(sec => sec.classList.remove('active'));

        btn.classList.add('active');
        $('sub-' + group + '-' + target).classList.add('active');
      });
    });
  }

  function openResetModal() {
    $('resetModal').classList.add('active');
  }

  function closeResetModal() {
    $('resetModal').classList.remove('active');
  }

  function confirmResetCharacter() {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('meta_')) localStorage.removeItem(key);
    });
    location.reload();
  }

  function initMidnightRefresh() {
    const now = new Date();
    const next = new Date();
    next.setHours(24, 0, 0, 0);
    const ms = next.getTime() - now.getTime();
    setTimeout(() => {
      location.reload();
    }, ms);
  }

  function init() {
    loadState();
    window.MetaStats.initializeSkillState();
    window.MetaQuests.processMissedDayPenalty();
    setupPageNavigation();
    setupSubtabs();
    window.MetaQuests.renderDailyQuests();
    updateUI();
    initMidnightRefresh();
  }

  window.MetaApp = {
    state,
    $,
    saveState,
    loadState,
    gainXP,
    updateUI,
    getTotalParagon,
    init
  };

  window.openResetModal = openResetModal;
  window.closeResetModal = closeResetModal;
  window.confirmResetCharacter = confirmResetCharacter;

  document.addEventListener('DOMContentLoaded', init);
})();
