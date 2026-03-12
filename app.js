window.MetaApp = (function () {
  let state = null;

  const $ = (id) => document.getElementById(id);

  function load() {
    state = window.MetaStore.load();
  }

  function save() {
    window.MetaStore.save(state);
  }

  function safeCall(label, fn) {
    try {
      fn();
    } catch (err) {
      console.error(`[Metamorphosis] ${label} failed:`, err);
    }
  }

  function applyTheme() {
    document.body.setAttribute('data-theme', state.ui.theme);
    const btn = $('themeToggleBtn');
    if (btn) {
      btn.textContent = state.ui.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
  }

  function applySidebarState() {
    const sidebar = $('sidebar');
    const backdrop = $('sidebarBackdrop');
    const pin = $('sidebarPinToggle');

    if (!sidebar) return;

    sidebar.classList.toggle('collapsed', !!state.ui.sidebarCollapsed);
    sidebar.classList.toggle('mobile-open', !!state.ui.mobileSidebarOpen);

    if (backdrop) {
      backdrop.classList.toggle('open', !!state.ui.mobileSidebarOpen);
    }

    if (pin) {
      pin.textContent = state.ui.sidebarCollapsed ? '⇥' : '⇤';
    }
  }

  function toggleThemeInternal() {
    state.ui.theme = state.ui.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    save();
  }

  function toggleSidebarCollapsedInternal() {
    state.ui.sidebarCollapsed = !state.ui.sidebarCollapsed;
    applySidebarState();
    save();
  }

  function toggleSidebarInternal() {
    state.ui.mobileSidebarOpen = !state.ui.mobileSidebarOpen;
    applySidebarState();
    save();
  }

  function closeSidebarInternal() {
    state.ui.mobileSidebarOpen = false;
    applySidebarState();
    save();
  }

  function setPage(pageKey) {
    state.ui.activePage = pageKey;

    document.querySelectorAll('.page').forEach((page) => {
      page.classList.remove('active');
    });

    document.querySelectorAll('[data-page-link]').forEach((btn) => {
      btn.classList.remove('active');
    });

    const page = $(`page-${pageKey}`);
    if (page) {
      page.classList.add('active');
    }

    document.querySelectorAll(`[data-page-link="${pageKey}"]`).forEach((btn) => {
      btn.classList.add('active');
    });

    closeSidebarInternal();
    save();
  }

  function setupNavigation() {
    document.querySelectorAll('[data-page-link]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setPage(btn.dataset.pageLink);
      });
    });

    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('hidden-tab')) return;

        const group = btn.dataset.subtab;
        const target = btn.dataset.target;

        document
          .querySelectorAll(`.tab-btn[data-subtab="${group}"]`)
          .forEach((b) => b.classList.remove('active'));

        document
          .querySelectorAll(`#page-${group} .subsection`)
          .forEach((sec) => sec.classList.remove('active'));

        btn.classList.add('active');

        const targetNode = $(`sub-${group}-${target}`);
        if (targetNode) {
          targetNode.classList.add('active');
        }
      });
    });
  }

  function renderHome() {
    const c = state.progression.character;

    if ($('homeXp')) $('homeXp').textContent = c.xp;
    if ($('homeLevel')) $('homeLevel').textContent = c.level;
    if ($('homeNextLevel')) $('homeNextLevel').textContent = c.nextXp;
    if ($('homeCharacterParagon')) $('homeCharacterParagon').textContent = c.paragon;

    const percent = Math.max(0, Math.min(100, (c.xp / c.nextXp) * 100));
    if ($('homeXpFill')) $('homeXpFill').style.width = `${percent}%`;

    if ($('homeDisplayName')) $('homeDisplayName').textContent = state.profile.displayName;
    if ($('homeProfileTitle')) $('homeProfileTitle').textContent = state.profile.title;
    if ($('homeAvatarIcon')) $('homeAvatarIcon').textContent = state.profile.avatar.portraitValue || '🜂';

    safeCall('renderHomePreview', () => window.MetaProgression.renderHomePreview());
  }

  function renderStats() {
    const c = state.progression.character;

    if ($('xp')) $('xp').textContent = c.xp;
    if ($('level')) $('level').textContent = c.level;
    if ($('nextLevel')) $('nextLevel').textContent = c.nextXp;

    const percent = Math.max(0, Math.min(100, (c.xp / c.nextXp) * 100));
    if ($('xpfill')) $('xpfill').style.width = `${percent}%`;

    if ($('questCompletionCount')) $('questCompletionCount').textContent = state.quests.stats.completedTotal;
    if ($('completedDaysCount')) $('completedDaysCount').textContent = state.quests.stats.completedDays;
    if ($('mainQuestStepCount')) $('mainQuestStepCount').textContent = state.quests.stats.mainStepsTotal;
    if ($('streakNumber')) $('streakNumber').textContent = state.quests.stats.streak;

    const paragon = window.MetaProgression.getTotalParagon();

    if ($('characterParagon')) $('characterParagon').textContent = paragon.character;
    if ($('totalParagon')) $('totalParagon').textContent = paragon.total;
    if ($('paragonCharacterOnly')) $('paragonCharacterOnly').textContent = paragon.character;
    if ($('paragonAttributesOnly')) $('paragonAttributesOnly').textContent = paragon.attributes;
    if ($('paragonSkillsOnly')) $('paragonSkillsOnly').textContent = paragon.skills;

    if ($('homeParagonCharacterOnly')) $('homeParagonCharacterOnly').textContent = paragon.character;
    if ($('homeParagonAttributesOnly')) $('homeParagonAttributesOnly').textContent = paragon.attributes;
    if ($('homeParagonSkillsOnly')) $('homeParagonSkillsOnly').textContent = paragon.skills;
    if ($('homeTotalParagon')) $('homeTotalParagon').textContent = paragon.total;

    safeCall('renderAttributes', () => window.MetaProgression.renderAttributes());
  }

  function renderAll() {
    safeCall('renderHome', renderHome);
    safeCall('renderStats', renderStats);
    safeCall('renderDailyQuests', () => window.MetaQuests.renderDailyQuests());
    safeCall('renderMainQuests', () => window.MetaQuests.renderMainQuests());
    safeCall('renderFavoriteQuests', () => window.MetaQuests.renderFavoritesQuests());
    safeCall('bindSearchAndFilter', () => window.MetaQuests.bindSearchAndFilter());
    safeCall('renderAchievements', () => window.MetaAchievements.renderAchievements());
    safeCall('renderJournal', () => window.MetaModules.renderJournal());
    safeCall('renderGallery', () => window.MetaModules.renderGallery());
    safeCall('renderCalendar', () => window.MetaModules.renderCalendar());
    safeCall('renderFinance', () => window.MetaModules.renderFinance());
    safeCall('renderMeta', () => window.MetaModules.renderMeta());
    safeCall('renderCommunity', () => window.MetaModules.renderCommunity());
    applySidebarState();
  }

  function openResetModalInternal() {
    const node = $('resetModal');
    if (node) node.classList.add('active');
  }

  function closeResetModalInternal() {
    const node = $('resetModal');
    if (node) node.classList.remove('active');
  }

  function confirmResetCharacterInternal() {
    state = window.MetaStore.reset();
    applyTheme();
    renderAll();
    closeResetModalInternal();
    setPage('home');
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
    applySidebarState();
    safeCall('processMissedDayPenalty', () => window.MetaQuests.processMissedDayPenalty());
    setupNavigation();
    renderAll();
    setPage(state.ui.activePage || 'home');
    initMidnightRefresh();
  }

  return {
    get state() {
      return state;
    },
    $,
    save,
    renderAll,
    init,
    toggleThemeInternal,
    toggleSidebarCollapsedInternal,
    toggleSidebarInternal,
    closeSidebarInternal,
    openResetModalInternal,
    closeResetModalInternal,
    confirmResetCharacterInternal
  };
})();

function toggleTheme() {
  window.MetaApp.toggleThemeInternal();
}

function toggleSidebarCollapsed() {
  window.MetaApp.toggleSidebarCollapsedInternal();
}

function toggleSidebar() {
  window.MetaApp.toggleSidebarInternal();
}

function closeSidebar() {
  window.MetaApp.closeSidebarInternal();
}

function openResetModal() {
  window.MetaApp.openResetModalInternal();
}

function closeResetModal() {
  window.MetaApp.closeResetModalInternal();
}

function confirmResetCharacter() {
  window.MetaApp.confirmResetCharacterInternal();
}

document.addEventListener('DOMContentLoaded', () => {
  window.MetaApp.init();
});
