window.MetaModules = (function () {
  function state() {
    return window.MetaApp.state;
  }

  function uid(prefix) {
    return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  }

  function splitTags(text) {
    return String(text || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
  }

  function addJournalEntry() {
    const title = document.getElementById('journalTitle').value.trim();
    const category = document.getElementById('journalCategory').value.trim();
    const content = document.getElementById('journalContent').value.trim();
    const tags = splitTags(document.getElementById('journalTags').value);
    const link = document.getElementById('journalLink').value.trim();

    if (!title || !content) return;

    const id = uid('journal');
    state().journal.entries[id] = {
      id,
      title,
      category: category || 'General',
      content,
      tags,
      createdAt: new Date().toISOString(),
      visibility: 'private',
      linkedExternal: link ? [{ title: 'External Link', url: link }] : []
    };
    state().journal.order.unshift(id);
    clearJournalForm();
    window.MetaApp.save();
    renderJournal();
  }

  function clearJournalForm() {
    ['journalTitle', 'journalCategory', 'journalContent', 'journalTags', 'journalLink'].forEach(id => {
      document.getElementById(id).value = '';
    });
  }

  function renderJournal() {
    const list = state().journal.order.map(id => state().journal.entries[id]);
    document.getElementById('journalList').innerHTML = list.length ? list.map(entry => `
      <div class="module-card">
        <h4>${entry.title}</h4>
        <p><strong>Category:</strong> ${entry.category}</p>
        <p>${entry.content}</p>
        <p class="small-muted">Tags: ${entry.tags.join(', ') || 'none'} • Visibility: ${entry.visibility}</p>
        ${entry.linkedExternal?.length ? `<p class="small-muted">Link: ${entry.linkedExternal[0].url}</p>` : ''}
      </div>
    `).join('') : `<div class="notice-box"><p>No journal entries yet.</p></div>`;
  }

  function addGalleryFolder() {
    const name = document.getElementById('galleryFolderName').value.trim();
    if (!name) return;
    const id = uid('folder');

    state().gallery.folders[id] = {
      id,
      name,
      visibility: 'friends',
      createdAt: new Date().toISOString(),
      itemIds: []
    };
    state().gallery.folderOrder.unshift(id);
    document.getElementById('galleryFolderName').value = '';
    window.MetaApp.save();
    renderGallery();
  }

  function renderGallery() {
    const folders = state().gallery.folderOrder.map(id => state().gallery.folders[id]);
    document.getElementById('galleryFolderList').innerHTML = folders.length ? folders.map(folder => `
      <div class="module-card">
        <h4>${folder.name}</h4>
        <p class="small-muted">Visibility: ${folder.visibility} • Images: ${folder.itemIds.length}</p>
      </div>
    `).join('') : `<div class="notice-box"><p>No gallery folders yet.</p></div>`;
  }

  function addCalendarEvent() {
    const title = document.getElementById('calendarTitle').value.trim();
    const date = document.getElementById('calendarDate').value.trim();
    const note = document.getElementById('calendarNote').value.trim();
    if (!title || !date) return;

    const id = uid('event');
    state().calendar.events[id] = {
      id,
      title,
      date,
      note,
      visibility: 'private',
      reminder: true
    };
    state().calendar.order.unshift(id);

    ['calendarTitle', 'calendarDate', 'calendarNote'].forEach(id => {
      document.getElementById(id).value = '';
    });

    window.MetaApp.save();
    renderCalendar();
  }

  function renderCalendar() {
    const events = state().calendar.order.map(id => state().calendar.events[id]);
    document.getElementById('calendarList').innerHTML = events.length ? events.map(event => `
      <div class="module-card">
        <h4>${event.title}</h4>
        <p><strong>Date:</strong> ${event.date}</p>
        <p>${event.note || 'No note'}</p>
        <p class="small-muted">Visibility: ${event.visibility} • Reminder: ${event.reminder ? 'on' : 'off'}</p>
      </div>
    `).join('') : `<div class="notice-box"><p>No calendar events yet.</p></div>`;
  }

  function addFinanceEntry() {
    const title = document.getElementById('financeTitle').value.trim();
    const type = document.getElementById('financeType').value;
    const amount = document.getElementById('financeAmount').value.trim();
    const priority = document.getElementById('financePriority').value.trim();
    if (!title) return;

    const id = uid('finance');
    state().finance.entries[id] = {
      id,
      title,
      type,
      amount: Number(amount || 0),
      priority,
      visibility: 'private',
      createdAt: new Date().toISOString()
    };
    state().finance.order.unshift(id);

    ['financeTitle', 'financeAmount', 'financePriority'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('financeType').value = 'income';

    window.MetaApp.save();
    renderFinance();
  }

  function renderFinance() {
    const entries = state().finance.order.map(id => state().finance.entries[id]);
    document.getElementById('financeList').innerHTML = entries.length ? entries.map(item => `
      <div class="module-card">
        <h4>${item.title}</h4>
        <p><strong>Type:</strong> ${item.type}</p>
        <p><strong>Amount:</strong> ${item.amount}</p>
        <p class="small-muted">Priority: ${item.priority || 'none'} • Visibility: ${item.visibility}</p>
      </div>
    `).join('') : `<div class="notice-box"><p>No finance entries yet.</p></div>`;
  }

  function renderMeta() {
    document.getElementById('qaList').innerHTML = window.MetaData.qaItems.map(item => `
      <div class="module-card">
        <h4>${item.q}</h4>
        <p>${item.a}</p>
      </div>
    `).join('');

    document.getElementById('patchList').innerHTML = window.MetaData.patchNotes.map(patch => `
      <div class="module-card">
        <h4>${patch.version}</h4>
        <ul class="small-muted">
          ${patch.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  function renderCommunity() {
    const vis = state().social.profileVisibility;
    document.getElementById('communityVisibilityList').innerHTML = Object.entries(vis).map(([key, value]) => `
      <div class="module-card">
        <h4>${key}</h4>
        <p class="small-muted">Default visibility: ${value}</p>
      </div>
    `).join('');
  }

  return {
    addJournalEntry,
    addGalleryFolder,
    addCalendarEvent,
    addFinanceEntry,
    renderJournal,
    renderGallery,
    renderCalendar,
    renderFinance,
    renderMeta,
    renderCommunity
  };
})();
