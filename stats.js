(function () {
  const { skillTree } = window.MetaData;

  const ATTRS = [
    'Strength',
    'Dexterity',
    'Agility',
    'Endurance',
    'Intelligence',
    'Willpower',
    'Wits',
    'Wisdom'
  ];

  function makeProgress(level = 0, xp = 0, nextXp = 60, paragon = 0) {
    return { level, xp, nextXp, paragon };
  }

  function normalizeProgress(value, fallbackNextXp = 60) {
    if (value && typeof value === 'object') {
      return {
        level: Number(value.level || 0),
        xp: Number(value.xp || 0),
        nextXp: Number(value.nextXp || fallbackNextXp),
        paragon: Number(value.paragon || 0)
      };
    }

    if (typeof value === 'number') {
      return {
        level: Math.max(0, Math.min(100, value)),
        xp: 0,
        nextXp: fallbackNextXp,
        paragon: 0
      };
    }

    return { level: 0, xp: 0, nextXp: fallbackNextXp, paragon: 0 };
  }

  function initializeSkillState() {
    const state = window.MetaApp.state;

    ATTRS.forEach(attr => {
      if (!state.selectedSkills[attr]) state.selectedSkills[attr] = [];
      if (!state.attributeStats[attr]) state.attributeStats[attr] = makeProgress(0, 0, 80, 0);
      state.attributeStats[attr] = normalizeProgress(state.attributeStats[attr], 80);

      skillTree[attr].forEach(skill => {
        state.skillValues[skill] = normalizeProgress(state.skillValues[skill], 60);
      });
    });
  }

  function ensureSkillAttached(attr, skill) {
    const state = window.MetaApp.state;
    if (!state.selectedSkills[attr]) state.selectedSkills[attr] = [];
    if (!state.selectedSkills[attr].includes(skill)) {
      state.selectedSkills[attr].push(skill);
    }
  }

  function gainAttributeXP(attr, amount) {
    const state = window.MetaApp.state;
    const stat = state.attributeStats[attr];

    if (!stat) return;

    stat.xp += amount;

    while (stat.xp >= stat.nextXp) {
      if (stat.level < 100) {
        stat.xp -= stat.nextXp;
        stat.level += 1;
        stat.nextXp = Math.floor(stat.nextXp * 1.06 + 2);

        if (stat.level >= 100) {
          stat.level = 100;
        }
      } else {
        stat.xp -= stat.nextXp;
        stat.paragon += 1;
      }
    }
  }

  function gainSkillXP(attr, skill, amount) {
    const state = window.MetaApp.state;
    ensureSkillAttached(attr, skill);

    const skillData = state.skillValues[skill];
    if (!skillData) return;

    skillData.xp += amount;

    while (skillData.xp >= skillData.nextXp) {
      if (skillData.level < 100) {
        skillData.xp -= skillData.nextXp;
        skillData.level += 1;
        skillData.nextXp = Math.floor(skillData.nextXp * 1.05 + 1);

        gainAttributeXP(attr, 12);

        if (skillData.level >= 100) {
          skillData.level = 100;
        }
      } else {
        skillData.xp -= skillData.nextXp;
        skillData.paragon += 1;
      }
    }
  }

  function getAttributeLevel(attr) {
    const state = window.MetaApp.state;
    return state.attributeStats[attr]?.level || 0;
  }

  function getAttributePercent(attr) {
    const state = window.MetaApp.state;
    const stat = state.attributeStats[attr];
    if (!stat) return 0;
    return Math.min(100, (stat.xp / stat.nextXp) * 100);
  }

  function getAttributeParagon(attr) {
    const state = window.MetaApp.state;
    return state.attributeStats[attr]?.paragon || 0;
  }

  function renderAttributes() {
    const physical = ['Strength', 'Dexterity', 'Agility', 'Endurance'];
    const mental = ['Intelligence', 'Willpower', 'Wits', 'Wisdom'];

    window.MetaApp.$('physicalAttributes').innerHTML = physical.map(renderAttributeCard).join('');
    window.MetaApp.$('mentalAttributes').innerHTML = mental.map(renderAttributeCard).join('');
  }

  function renderAttributeCard(attr) {
    const state = window.MetaApp.state;
    const stat = state.attributeStats[attr];
    const chosen = state.selectedSkills[attr] || [];

    const optionsHtml = skillTree[attr]
      .filter(skill => !chosen.includes(skill))
      .map(skill => `<option value="${skill}">${skill}</option>`)
      .join('');

    return `
      <div class="attr-card">
        <div class="attr-head">
          <div class="attr-title">${attr}</div>
          <span class="tag">Level ${stat.level} • Paragon ${stat.paragon}</span>
        </div>
        <div class="progress-shell">
          <div class="progress-fill" style="width:${getAttributePercent(attr)}%"></div>
        </div>
        <div class="inline-note">XP ${stat.xp} / ${stat.nextXp}</div>
        <div class="inline-note">Primary attribute grows from skill level-ups. At max level it continues into paragon.</div>

        <select onchange="addSkillToAttribute('${attr}', this.value)">
          <option value="">Add a skill to ${attr}</option>
          ${optionsHtml}
        </select>

        <div class="skill-list" style="margin-top:12px;">
          ${chosen.map(skill => renderSkillCard(attr, skill)).join('')}
        </div>
      </div>
    `;
  }

  function renderSkillCard(attr, skill) {
    const state = window.MetaApp.state;
    const skillData = state.skillValues[skill];
    const percent = Math.min(100, (skillData.xp / skillData.nextXp) * 100);

    return `
      <div class="skill-card">
        <div class="skill-head">
          <div class="skill-title">${skill}</div>
          <span class="tag">Level ${skillData.level} • Paragon ${skillData.paragon}</span>
        </div>
        <div class="progress-shell">
          <div class="progress-fill warn" style="width:${percent}%"></div>
        </div>
        <div class="inline-note">XP ${skillData.xp} / ${skillData.nextXp}</div>

        <div class="skill-progress-row">
          <button class="step-btn" onclick="changeSkillValue('${attr}', '${skill}', -10)">−</button>
          <div class="small-muted" style="text-align:center;">Manual skill XP</div>
          <button class="step-btn" onclick="changeSkillValue('${attr}', '${skill}', 10)">+</button>
        </div>

        <div class="skill-actions">
          <button class="remove-btn" onclick="removeSkillFromAttribute('${attr}', '${skill.replace(/'/g, "\\'")}')">Remove Skill</button>
        </div>
      </div>
    `;
  }

  function addSkillToAttribute(attr, skill) {
    if (!skill) return;

    ensureSkillAttached(attr, skill);
    window.MetaApp.saveState();
    window.MetaApp.updateUI();
  }

  function changeSkillValue(attr, skill, delta) {
    const state = window.MetaApp.state;
    const skillData = state.skillValues[skill];

    if (!skillData) return;

    if (delta > 0) {
      gainSkillXP(attr, skill, delta);
    } else {
      skillData.xp = Math.max(0, skillData.xp + delta);
    }

    window.MetaApp.saveState();
    window.MetaApp.updateUI();
  }

  function removeSkillFromAttribute(attr, skill) {
    const state = window.MetaApp.state;
    if (!state.selectedSkills[attr]) return;

    state.selectedSkills[attr] = state.selectedSkills[attr].filter(s => s !== skill);

    window.MetaApp.saveState();
    window.MetaApp.updateUI();
  }

  window.MetaStats = {
    initializeSkillState,
    renderAttributes,
    getAttributeLevel,
    getAttributePercent,
    getAttributeParagon,
    gainSkillXP,
    ensureSkillAttached,
    gainAttributeXP
  };

  window.addSkillToAttribute = addSkillToAttribute;
  window.changeSkillValue = changeSkillValue;
  window.removeSkillFromAttribute = removeSkillFromAttribute;
})();
