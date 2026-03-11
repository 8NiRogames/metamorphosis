(function () {
  const { skillOptions } = window.MetaData;

  function rewardAttributeXP(category, amount = 1) {
    const state = window.MetaApp.state;
    const add = (attr, value) => {
      state.attributeBonus[attr] = Math.min(40, (state.attributeBonus[attr] || 0) + value);
    };

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

  function initializeSkillState() {
    const state = window.MetaApp.state;
    Object.keys(skillOptions).forEach(attr => {
      if (!state.selectedSkills[attr]) state.selectedSkills[attr] = [];
      skillOptions[attr].forEach(skill => {
        if (state.skillValues[skill] == null) state.skillValues[skill] = 0;
      });
    });
  }

  function calculateAttributeValue(attr) {
    const state = window.MetaApp.state;
    const chosen = state.selectedSkills[attr] || [];
    const bonus = state.attributeBonus[attr] || 0;

    if (!chosen.length) return Math.min(100, bonus);

    const sum = chosen.reduce((acc, skill) => acc + (state.skillValues[skill] || 0), 0);
    const base = Math.round(sum / chosen.length);

    return Math.min(100, base + bonus);
  }

  function renderAttributes() {
    const physical = ['Strength', 'Dexterity', 'Agility', 'Endurance'];
    const mental = ['Intelligence', 'Willpower', 'Wits', 'Wisdom'];

    window.MetaApp.$('physicalAttributes').innerHTML = physical.map(renderAttributeCard).join('');
    window.MetaApp.$('mentalAttributes').innerHTML = mental.map(renderAttributeCard).join('');
  }

  function renderAttributeCard(attr) {
    const state = window.MetaApp.state;
    const value = calculateAttributeValue(attr);
    const bonus = state.attributeBonus[attr] || 0;
    const chosen = state.selectedSkills[attr] || [];

    const optionsHtml = skillOptions[attr]
      .filter(skill => !chosen.includes(skill))
      .map(skill => `<option value="${skill}">${skill}</option>`)
      .join('');

    return `
      <div class="attr-card">
        <div class="attr-head">
          <div class="attr-title">${attr}</div>
          <span class="tag">Auto • ${value}% • +${bonus}</span>
        </div>
        <div class="progress-shell"><div class="progress-fill" style="width:${value}%"></div></div>
        <div class="inline-note">Primary attribute value is the average of the selected skills below.</div>
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
    const value = window.MetaApp.state.skillValues[skill] || 0;
    return `
      <div class="skill-card">
        <div class="skill-head">
          <div class="skill-title">${skill}</div>
          <span class="tag">${value}%</span>
        </div>
        <div class="progress-shell"><div class="progress-fill warn" style="width:${value}%"></div></div>
        <div class="skill-progress-row">
          <button class="step-btn" onclick="changeSkillValue('${skill}', -5)">−</button>
          <div class="small-muted" style="text-align:center;">Manual skill progress</div>
          <button class="step-btn" onclick="changeSkillValue('${skill}', 5)">+</button>
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
    if (!state.selectedSkills[attr].includes(skill)) state.selectedSkills[attr].push(skill);
    window.MetaApp.saveState();
    window.MetaApp.updateUI();
  }

  function changeSkillValue(skill, delta) {
    const state = window.MetaApp.state;
    state.skillValues[skill] = Math.max(0, Math.min(100, (state.skillValues[skill] || 0) + delta));
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
    calculateAttributeValue,
    renderAttributes
  };

  window.addSkillToAttribute = addSkillToAttribute;
  window.changeSkillValue = changeSkillValue;
  window.removeSkillFromAttribute = removeSkillFromAttribute;
})();
