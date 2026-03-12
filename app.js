window.MetaApp = (function () {
  let state = null;

  const $ = (id) => document.getElementById(id);

  function load() {
    state = window.MetaStore.load();
  }

  function save() {
    window.MetaStore.save(state);
  }

  function applyTheme() {
    document.body.setAttribute('data-theme', state.ui.theme);
    const btn = $('themeToggleBtn');
    if (btn) {
      btn.textContent = state.ui.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
  }

  function toggleTheme() {
    state.ui.theme = state.ui.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    save();
  }

  function setPage(pageKey) {
    state.ui.activePage = pageKey;
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('[data-page-link]').forEach(btn => btn.classList.remove('active'));

    const page = $(`page-${pageKey}`);
    if (page) page.classList.add('active');

    document.querySelectorAll(`[data-page-link="${pageKey}"]`).forEach(btn => btn.classList.add('active'));
    save();
  }

  function setupNavigation() {
    document.querySelectorAll('[data-page-link]').forEach(btn => {
      btn.addEventListener('click', () => setPage(btn.dataset.pageLink));
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.dataset.subtab;
        const target = btn.dataset.target;

        document.querySelectorAll(`.tab-btn[data-subtab="${group}"]`).forEach(b => b.classList.remove('active'));
        document.querySelectorAll(`#page-${group} .subsection`).forEach(sec => sec.classList.remove('active'));

        btn.classList.add('active');
        $(`sub-${group}-${target}`).classList.add('active');
      });
    });
  }

  function renderHome() {
    const c = state.progression.character;
    $('homeXp').textContent = c.xp;
    $('homeLevel').textContent = c.level;
    $('homeNextLevel').textContent = c.nextXp;
    $('homeCharacterParagon').textContent = c.paragon;

    const percent = Math.max(0, Math.min(100, (c.xp / c.nextXp) * 100));
    $('homeXpFill').style.width = `${percent}%`;

    $('homeDisplayName').textContent = state.profile.displayName;
    $('homeProfileTitle').textContent = state.profile.title;
    $('homeAvatarIcon').textContent = state.profile.avatar.portraitValue || '🜂';

    window.MetaProgression.renderHomePreview();
  }

  function renderStats() {
    const c = state.progression.character;
    $('xp').textContent = c.xp;
    $('level').textContent = c.level;
    $('nextLevel').textContent = c.nextXp;

    const percent = Math.max(0, Math.min(100, (c.xp / c.nextXp) * 100));
    $('xpfill').style.width = `${percent}%`;

    $('questCompletionCount').textContent = state.quests.stats.completedTotal;
    $('completedDaysCount').textContent = state.quests.stats.completedDays;
    $('mainQuestStepCount').textContent = state.quests.stats.mainStepsTotal;
    $('streakNumber').textContent = state.quests.stats.streak;

    const paragon = window.MetaProgression.getTotalParagon();
    $('characterParagon').textContent = paragon.character;
    $('totalParagon').textContent = paragon.total;
    $('paragonCharacterOnly').textContent = paragon.character;
    $('paragonAttributesOnly').textContent = paragon.attributes;
    $('paragonSkillsOnly').textContent = paragon.skills;

    $('homeParagonCharacterOnly').textContent = paragon.character;
    $('homeParagonAttributesOnly').textContent = paragon.attributes;
    $('homeParagonSkillsOnly').textContent = paragon.skills;
    $('homeTotalParagon').textContent = paragon.total;

    window.MetaProgression.renderAttributes();
  }

  function renderAll() {
    renderHome();
    renderStats();
    window.MetaQuests.renderDailyQuests();
    window.MetaQuests.renderMainQuests();
    window.MetaQuests.bindSearchAndFilter();
    window.MetaAchievements.renderAchievements();
    window.MetaModules.renderJournal();
    window.MetaModules.renderGallery();
    window.MetaModules.renderCalendar();
    window.MetaModules.renderFinance();
    window.MetaModules.renderMeta();
    window.MetaModules.renderCommunity();
  }

  function openResetModal() {
    $('resetModal').classList.add('active');
  }

  function closeResetModal() {
    $('resetModal').classList.remove('active');
  }

  function confirmResetCharacter() {
    state = window.MetaStore.reset();
    applyTheme();
    renderAll();
    closeResetModal();
  }

  function initMidnightRefresh() {
    const now = new Date();
    const next = new Date();
    next.setHours(24, 0, 0, 0);
    const ms = next.getTime() - now.getTime();
    setTimeout(() => location.reload(), ms);
  }

  function init() {
    load();
    applyTheme();
    window.MetaQuests.processMissedDayPenalty();
    setupNavigation();
    setPage(state.ui.activePage || 'home');
    renderAll();
    initMidnightRefresh();
  }

  return {
    get state() { return state; },
    $,
    save,
    renderAll,
    init
  };
})();

function toggleTheme() {
  window.MetaApp.state.ui.theme = window.MetaApp.state.ui.theme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', window.MetaApp.state.ui.theme);
  const btn = document.getElementById('themeToggleBtn');
  btn.textContent = window.MetaApp.state.ui.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
  window.MetaApp.save();
}

function openResetModal() {
  document.getElementById('resetModal').classList.add('active');
}

function closeResetModal() {
  document.getElementById('resetModal').classList.remove('active');
}

function confirmResetCharacter() {
  location.reload(window.MetaStore.reset());
}

document.addEventListener('DOMContentLoaded', () => {
  window.MetaApp.init();
});
