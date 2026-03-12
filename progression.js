window.MetaProgression = (function () {
  const { xpConfig, skillTree } = window.MetaData;

  function state() {
    return window.MetaApp.state;
  }

  function ensureSkillAttached(attribute, skill) {
    const s = state();
    const selected = s.progression.selectedSkills[attribute];
    if (!selected.includes(skill)) selected.push(skill);
  }

  function gainCharacterXP(amount) {
    const character = state().progression.character;
    character.xp += amount;
    character.totalXpEarned += amount;

    while (character.xp >= character.nextXp) {
      if (character.level < 100) {
        character.xp -= character.nextXp;
        character.level += 1;
        character.nextXp = Math.floor(character.nextXp * xpConfig.character.multiplier + xpConfig.character.flat);
        if (character.level > 100) character.level = 100;
      } else {
        character.xp -= character.nextXp;
        character.paragon += 1;
      }
    }
  }

  function gainAttributeXP(attribute, amount) {
    const attr = state().progression.attributes[attribute];
    attr.xp += amount;

    while (attr.xp >= attr.nextXp) {
      if (attr.level < 100) {
        attr.xp -= attr.nextXp;
        attr.level += 1;
        attr.nextXp = Math.floor(attr.nextXp * xpConfig.attribute.multiplier + xpConfig.attribute.flat);
        if (attr.level > 100) attr.level = 100;
      } else {
        attr.xp -= attr.nextXp;
        attr.paragon += 1;
      }
    }
  }

  function gainSkillXP(attribute, skill, amount) {
    const skillData = state().progression.skills[skill];
    if (!skillData) return;

    ensureSkillAttached(attribute, skill);
    skillData.xp += amount;

    while (skillData.xp >= skillData.nextXp) {
      if (skillData.level < 100) {
        skillData.xp -= skillData.nextXp;
        skillData.level += 1;
        skillData.nextXp = Math.floor(skillData.nextXp * xpConfig.skill.multiplier + xpConfig.skill.flat);
        if (skillData.level > 100) skillData.level = 100;
        gainAttributeXP(attribute, 10);
      } else {
        skillData.xp -= skillData.nextXp;
        skillData.paragon += 1;
      }
    }
  }

  function changeSkillXP(attribute, skill, delta) {
    const skillData = state().progression.skills[skill];
    if (!skillData) return;

    if (delta > 0) {
      gainSkillXP(attribute, skill, delta);
    } else {
      skillData.xp = Math.max(0, skillData.xp + delta);
    }

    window.MetaApp.save();
    window.MetaApp.renderAll();
  }

  function addSkillToAttribute(attribute, skill) {
    if (!skill) return;
    ensureSkillAttached(attribute, skill);
    window.MetaApp.save();
    window.MetaApp.renderAll();
  }

  function removeSkillFromAttribute(attribute, skill) {
    const selected = state().progression.selectedSkills[attribute];
    state().progression.selectedSkills[attribute] = selected.filter(s => s !== skill);
    window.MetaApp.save();
    window.MetaApp.renderAll();
  }

  function toggleAttribute(attribute) {
    const collapsed = state().ui.collapsedAttributes || {};
    collapsed[attribute] = !collapsed[attribute];
    state().ui.collapsedAttributes = collapsed;
    window.MetaApp.save();
    renderAttributes();
  }

  function isCollapsed(attribute) {
    return !!state().ui.collapsedAttributes?.[attribute];
  }

  function getTotalParagon() {
    const s = state();
    const character = s.progression.character.paragon;
    const attr = Object.values(s.progression.attributes).reduce((sum, a) => sum + a.paragon, 0);
    const skills = Object.values(s.progression.skills).reduce((sum, sk) => sum + sk.paragon, 0);
    return {
      total: character + attr + skills,
      character,
      attributes: attr,
      skills
    };
  }

  function renderHomePreview() {
    const ids = ['Strength', 'Dexterity', 'Agility', 'Endurance', 'Intelligence', 'Willpower', 'Wits', 'Wisdom'];
    const container = document.getElementById('homeSkillPreview');
    container.innerHTML = ids.map(attr => {
      const d = state().progression.attributes[attr];
      const percent = Math.min(100, (d.xp / d.nextXp) * 100);
      return `
        <div class="mini-stat">
          <strong>${attr}</strong>
          <div class="progress-shell"><div class="progress-fill" style="width:${percent}%"></div></div>
          <div class="small-muted" style="margin-top:6px;">Level ${d.level} • Paragon ${d.paragon}</div>
        </div>
      `;
    }).join('');
  }

  function renderAttributes() {
    renderAttributeGroup('physicalAttributes', ['Strength', 'Dexterity', 'Agility', 'Endurance']);
    renderAttributeGroup('mentalAttributes', ['Intelligence', 'Willpower', 'Wits', 'Wisdom']);
  }

  function renderAttributeGroup(containerId, attrs) {
    document.getElementById(containerId).innerHTML = attrs.map(renderAttributeCard).join('');
  }

  function renderAttributeCard(attribute) {
    const s = state();
    const stat = s.progression.attributes[attribute];
    const selected = s.progression.selectedSkills[attribute] || [];
    const options = skillTree[attribute]
      .filter(skill => !selected.includes(skill))
      .map(skill => `<option value="${skill}">${skill}</option>`)
      .join('');

    const percent = Math.min(100, (stat.xp / stat.nextXp) * 100);
    const collapsed = isCollapsed(attribute);

    return `
      <div class="attr-card">
        <div class="attr-head" onclick="MetaProgression.toggleAttribute('${attribute}')">
          <div class="attr-head-left">
            <div class="attr-toggle">${collapsed ? '+' : '−'}</div>
            <div class="attr-title">${attribute}</div>
          </div>
          <span class="tag">Level ${stat.level} • Paragon ${stat.paragon}</span>
        </div>

        <div class="progress-shell">
          <div class="progress-fill" style="width:${percent}%"></div>
        </div>

        <div class="small-muted" style="margin-top:8px;">XP ${stat.xp} / ${stat.nextXp}</div>

        <div class="attr-body ${collapsed ? 'collapsed' : ''}">
          <div class="field" style="margin-top:10px;">
            <label>Add Skill</label>
            <select onchange="MetaProgression.addSkillToAttribute('${attribute}', this.value)">
              <option value="">Choose a skill for ${attribute}</option>
              ${options}
            </select>
          </div>

          <div class="skill-list" style="margin-top:12px;">
            ${selected.length ? selected.map(skill => renderSkillCard(attribute, skill)).join('') : `<div class="notice-box"><p>No skills selected yet.</p></div>`}
          </div>
        </div>
      </div>
    `;
  }

  function renderSkillCard(attribute, skill) {
    const skillData = state().progression.skills[skill];
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

        <div class="small-muted" style="margin-top:8px;">XP ${skillData.xp} / ${skillData.nextXp}</div>

        <div class="skill-progress-row">
          <button class="step-btn" onclick="MetaProgression.changeSkillXP('${attribute}', '${skill}', -10)">−</button>
          <div class="small-muted" style="text-align:center;">Manual skill XP</div>
          <button class="step-btn" onclick="MetaProgression.changeSkillXP('${attribute}', '${skill}', 10)">+</button>
        </div>

        <div class="skill-actions">
          <button class="remove-btn" onclick="MetaProgression.removeSkillFromAttribute('${attribute}', '${skill}')">Remove Skill</button>
        </div>
      </div>
    `;
  }

  return {
    gainCharacterXP,
    gainSkillXP,
    changeSkillXP,
    addSkillToAttribute,
    removeSkillFromAttribute,
    toggleAttribute,
    getTotalParagon,
    renderHomePreview,
    renderAttributes
  };
})();
