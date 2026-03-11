(function () {
  const { skillOptions } = window.MetaData;

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

  function makeProgress(level = 0, xp = 0, nextXp = 100) {
    return { level, xp, nextXp };
  }

  function normalizeProgress(value) {
    if (value && typeof value === 'object') {
      return {
        level: Number(value.level || 0),
        xp: Number(value.xp || 0),
        nextXp: Number(value.nextXp || 100)
      };
    }

    if (typeof value === 'number') {
      return {
        level: Math.max(0, Math.min(100, value)),
        xp: 0,
        nextXp: 100
      };
    }

    return makeProgress();
  }

  function initializeSkillState() {
    const state = window.MetaApp.state;

    ATTRS.forEach(attr => {
      if (!state.selectedSkills[attr]) state.selectedSkills[attr] = [];
      state.attributeStats[attr] = normalizeProgress(state.attributeStats[attr]);

      skillOptions[attr].forEach(skill => {
        state.skillValues[skill] = normalizeProgress(state.skillValues[skill]);
      });
    });
  }

  function gainAttributeXP(attr, amount) {
    const state = window.MetaApp.state;
    const stat = state.attributeStats[attr];

    if (!stat || stat.level >= 100) return;

    stat.xp += amount;

    while (stat.xp >= stat.nextXp && stat.level < 100) {
      stat.xp -= stat.nextXp;
      stat.level += 1;
      stat.nextXp = Math.floor(stat.nextXp * 1.12);
    }

    if (stat.level >= 100) {
      stat.level = 100;
      stat.xp = 0;
    }
  }

  function rewardAttributeXP(category, amount = 10) {
    const add = (attr, value) => gainAttributeXP(attr, value);

    switch (category) {
      case 'Body':
        add('Strength', amount);
        add('Dexterity', amount);
        add('Agility', amount);
        add('Endurance', amount * 2);
        break;

      case 'Mind':
        add('Intelligence', amount * 2);
        add('Willpower', amount);
        add('Wits', amount);
        add('Wisdom', amount * 2);
        break;

      case 'Discipline':
        add('Willpower', amount * 2);
        add('Wisdom', amount);
        add('Endurance', amount);
        break;

      case 'Social':
        add('Wits', amount * 2);
        add('Wisdom', amount);
        break;

      case 'Life':
        add('Endurance', amount);
        add('Wisdom', amount * 2);
        break;
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

    const optionsHtml = skillOptions[attr]
      .filter(skill => !chosen.includes(skill))
      .map(skill => `<option value="${skill}">${skill}</option>`)
      .join('');

    return `
      <div class="attr-card">
        <div class="attr-head">
          <div class="attr-title">${attr}</div>
          <span class="tag">Level ${stat.level}</span>
        </div>
        <div class="progress-shell">
          <div class="progress-fill" style="width:${getAttributePercent(attr)}%"></div>
        </div>
        <div class="inline-note">XP ${stat.xp} / ${stat.nextXp}</div>
        <div class="inline-note">Primary attribute grows from quests and skill level-ups. Adding a new skill alone does not increase it.</div>

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
          <span class="tag">Level ${skillData.level}</span>
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

    const state = window.MetaApp.state;
    if (!state.selectedSkills[attr]) state.selectedSkills[attr] = [];

    if (!state.selectedSkills[attr].includes(skill)) {
      state.selectedSkills[attr].push(skill);
    }

    window.MetaApp.saveState();
    window.MetaApp.updateUI();
  }

  function changeSkillValue(attr, skill, delta) {
    const state = window.MetaApp.state;
    const skillData = state.skillValues[skill];

    if (!skillData) return;

    if (delta > 0) {
      skillData.xp += delta;

      while (skillData.xp >= skillData.nextXp && skillData.level < 100) {
        skillData.xp -= skillData.nextXp;
        skillData.level += 1;
        skillData.nextXp = Math.floor(skillData.nextXp * 1.1);

        gainAttributeXP(attr, 15);
      }

      if (skillData.level >= 100) {
        skillData.level = 100;
        skillData.xp = 0;
      }
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
    rewardAttributeXP,
    initializeSkillState,
    renderAttributes,
    getAttributeLevel,
    getAttributePercent
  };

  window.addSkillToAttribute = addSkillToAttribute;
  window.changeSkillValue = changeSkillValue;
  window.removeSkillFromAttribute = removeSkillFromAttribute;
})();
