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

  function splitInternalRefs(text) {
    return String(text || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
      .map(raw => {
        const [type, id] = raw.split(':');
        return {
          type: (type || '').trim(),
          id: (id || '').trim()
        };
      })
      .filter(item => item.type && item.id);
  }

  function ensureGalleryFavorites() {
    if (!state().gallery.favorites) state().gallery.favorites = [];
  }

  function ensureGalleryCollapseState() {
    if (!state().ui.collapsedGalleryFolders) state().ui.collapsedGalleryFolders = {};
  }

  function ensureFinanceUiState() {
    if (!state().ui.financeTab) state().ui.financeTab = 'all';
    if (!state().ui.financeMonthFilter) state().ui.financeMonthFilter = '';
    if (!state().finance.recurringTemplates) state().finance.recurringTemplates = {};
    if (!state().finance.recurringOrder) state().finance.recurringOrder = [];
  }

  function isGalleryFolderCollapsed(id) {
    ensureGalleryCollapseState();
    return !!state().ui.collapsedGalleryFolders[id];
  }

  function toggleGalleryFolder(id) {
    ensureGalleryCollapseState();
    state().ui.collapsedGalleryFolders[id] = !state().ui.collapsedGalleryFolders[id];
    window.MetaApp.save();
    renderGallery();
  }

  function formatDate(dateString) {
    if (!dateString) return '-';
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleString();
  }

  function formatMonthKey(dateString) {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return '';
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }

  function isToday(dateString) {
    if (!dateString) return false;
    const d = new Date(dateString);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate();
  }

  function isFuture(dateString) {
    if (!dateString) return false;
    const d = new Date(dateString + 'T23:59:59');
    const now = new Date();
    return d.getTime() > now.getTime() && !isToday(dateString);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function openImagePreview(imageId) {
    const modal = document.getElementById('imagePreviewModal');
    const img = document.getElementById('imagePreviewFull');
    const title = document.getElementById('imagePreviewTitle');
    const description = document.getElementById('imagePreviewDescription');
    const folder = document.getElementById('imagePreviewFolder');
    const created = document.getElementById('imagePreviewCreated');
    const visibility = document.getElementById('imagePreviewVisibility');
    const image = state().gallery.images[imageId];

    if (!modal || !img || !title || !description || !folder || !created || !visibility || !image) return;

    const folderObj = state().gallery.folders[image.folderId];

    img.src = image.src || '';
    img.alt = image.title || 'Preview';
    title.textContent = image.title || 'Untitled image';
    description.textContent = image.description || 'No description';
    folder.textContent = folderObj?.name || '-';
    created.textContent = formatDate(image.createdAt);
    visibility.textContent = image.visibility || 'inherited';

    modal.classList.add('active');
  }

  function closeImagePreview() {
    const modal = document.getElementById('imagePreviewModal');
    const img = document.getElementById('imagePreviewFull');
    const title = document.getElementById('imagePreviewTitle');
    const description = document.getElementById('imagePreviewDescription');
    const folder = document.getElementById('imagePreviewFolder');
    const created = document.getElementById('imagePreviewCreated');
    const visibility = document.getElementById('imagePreviewVisibility');

    if (!modal) return;

    modal.classList.remove('active');
    if (img) { img.src = ''; img.alt = 'Preview'; }
    if (title) title.textContent = 'Image';
    if (description) description.textContent = '';
    if (folder) folder.textContent = '-';
    if (created) created.textContent = '-';
    if (visibility) visibility.textContent = '-';
  }

  function closeFinanceTypeModal() {
    const modal = document.getElementById('financeTypeModal');
    if (modal) modal.classList.remove('active');
  }

  function bindImagePreviewEvents() {
    document.querySelectorAll('.gallery-thumb-button').forEach(btn => {
      if (btn.dataset.bound === '1') return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const imageId = btn.dataset.imageId;
        if (imageId) openImagePreview(imageId);
      });
    });

    const imageModal = document.getElementById('imagePreviewModal');
    if (imageModal && !imageModal.dataset.bound) {
      imageModal.dataset.bound = '1';
      imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) closeImagePreview();
      });
    }

    const financeModal = document.getElementById('financeTypeModal');
    if (financeModal && !financeModal.dataset.bound) {
      financeModal.dataset.bound = '1';
      financeModal.addEventListener('click', (e) => {
        if (e.target === financeModal) closeFinanceTypeModal();
      });
    }

    if (!document.body.dataset.previewEscapeBound) {
      document.body.dataset.previewEscapeBound = '1';
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeImagePreview();
          closeFinanceTypeModal();
        }
      });
    }
  }

  function saveJournalEntry() {
    const editingId = document.getElementById('journalEditingId').value.trim();
    const title = document.getElementById('journalTitle').value.trim();
    const category = document.getElementById('journalCategory').value.trim();
    const content = document.getElementById('journalContent').value.trim();
    const tags = splitTags(document.getElementById('journalTags').value);
    const link = document.getElementById('journalLink').value.trim();
    const internalRefs = splitInternalRefs(document.getElementById('journalInternalLinks').value);
    const visibility = document.getElementById('journalVisibility').value;

    if (!title || !content) return;

    if (editingId && state().journal.entries[editingId]) {
      state().journal.entries[editingId] = {
        ...state().journal.entries[editingId],
        title,
        category: category || 'General',
        content,
        tags,
        visibility,
        updatedAt: new Date().toISOString(),
        linkedExternal: link ? [{ title: 'External Link', url: link }] : [],
        linkedInternal: internalRefs
      };
    } else {
      const id = uid('journal');
      state().journal.entries[id] = {
        id,
        title,
        category: category || 'General',
        content,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        visibility,
        linkedExternal: link ? [{ title: 'External Link', url: link }] : [],
        linkedInternal: internalRefs
      };
      state().journal.order.unshift(id);
    }

    clearJournalForm();
    window.MetaApp.save();
    renderJournal();
  }

  function startEditJournalEntry(id) {
    const entry = state().journal.entries[id];
    if (!entry) return;

    document.getElementById('journalEditingId').value = entry.id;
    document.getElementById('journalTitle').value = entry.title || '';
    document.getElementById('journalCategory').value = entry.category || '';
    document.getElementById('journalContent').value = entry.content || '';
    document.getElementById('journalTags').value = (entry.tags || []).join(', ');
    document.getElementById('journalVisibility').value = entry.visibility || 'private';
    document.getElementById('journalLink').value = entry.linkedExternal?.[0]?.url || '';
    document.getElementById('journalInternalLinks').value = (entry.linkedInternal || []).map(item => `${item.type}:${item.id}`).join(', ');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteJournalEntry(id) {
    if (!state().journal.entries[id]) return;
    delete state().journal.entries[id];
    state().journal.order = state().journal.order.filter(x => x !== id);
    clearJournalForm();
    window.MetaApp.save();
    renderJournal();
  }

  function clearJournalForm() {
    document.getElementById('journalEditingId').value = '';
    document.getElementById('journalTitle').value = '';
    document.getElementById('journalCategory').value = '';
    document.getElementById('journalContent').value = '';
    document.getElementById('journalTags').value = '';
    document.getElementById('journalLink').value = '';
    document.getElementById('journalInternalLinks').value = '';
    document.getElementById('journalVisibility').value = 'private';
  }

  function renderInternalLinks(list) {
    if (!list?.length) return '';
    return `
      <div class="link-pill-row">
        ${list.map(item => `<div class="link-pill">${escapeHtml(item.type)}:${escapeHtml(item.id)}</div>`).join('')}
      </div>
    `;
  }

  function renderJournal() {
    const search = (document.getElementById('journalSearch')?.value || '').toLowerCase().trim();

    const list = state().journal.order
      .map(id => state().journal.entries[id])
      .filter(Boolean)
      .filter(entry => {
        if (!search) return true;
        const hay = [
          entry.title,
          entry.category,
          entry.content,
          ...(entry.tags || []),
          ...(entry.linkedInternal || []).map(x => `${x.type}:${x.id}`)
        ].join(' ').toLowerCase();
        return hay.includes(search);
      });

    document.getElementById('journalList').innerHTML = list.length ? list.map(entry => `
      <div class="module-card">
        <h4>${escapeHtml(entry.title)}</h4>
        <p><strong>Category:</strong> ${escapeHtml(entry.category)}</p>
        <p>${escapeHtml(entry.content)}</p>
        <p class="small-muted">Tags: ${escapeHtml((entry.tags || []).join(', ') || 'none')} • Visibility: ${escapeHtml(entry.visibility)}</p>
        ${entry.linkedExternal?.length ? `<p class="small-muted">Link: ${escapeHtml(entry.linkedExternal[0].url)}</p>` : ''}
        ${renderInternalLinks(entry.linkedInternal)}
        <div class="module-actions">
          <button class="action-btn" onclick="MetaModules.startEditJournalEntry('${entry.id}')">Edit</button>
          <button class="action-btn danger" onclick="MetaModules.deleteJournalEntry('${entry.id}')">Delete</button>
        </div>
      </div>
    `).join('') : `<div class="notice-box"><p>No journal entries found.</p></div>`;

    const searchInput = document.getElementById('journalSearch');
    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = '1';
      searchInput.addEventListener('input', renderJournal);
    }
  }

  function addGalleryFolder() {
    const name = document.getElementById('galleryFolderName').value.trim();
    if (!name) return;

    ensureGalleryCollapseState();

    const id = uid('folder');
    state().gallery.folders[id] = {
      id,
      name,
      visibility: 'friends',
      createdAt: new Date().toISOString(),
      itemIds: []
    };
    state().gallery.folderOrder.unshift(id);
    state().ui.collapsedGalleryFolders[id] = false;

    document.getElementById('galleryFolderName').value = '';
    window.MetaApp.save();
    renderGallery();
  }

  function renameGalleryFolder(id) {
    const folder = state().gallery.folders[id];
    if (!folder) return;
    const next = prompt('Rename folder:', folder.name);
    if (!next || !next.trim()) return;
    folder.name = next.trim();
    window.MetaApp.save();
    renderGallery();
  }

  function setGalleryFolderVisibility(id, visibility) {
    const folder = state().gallery.folders[id];
    if (!folder) return;
    folder.visibility = visibility;
    window.MetaApp.save();
    renderGallery();
  }

  function setGalleryImageVisibility(id, visibility) {
    const image = state().gallery.images[id];
    if (!image) return;
    image.visibility = visibility;
    window.MetaApp.save();
    renderGallery();
  }

  function deleteGalleryFolder(id) {
    const folder = state().gallery.folders[id];
    if (!folder) return;

    folder.itemIds.forEach(imageId => {
      delete state().gallery.images[imageId];
      state().gallery.favorites = (state().gallery.favorites || []).filter(x => x !== imageId);
    });

    delete state().gallery.folders[id];
    state().gallery.folderOrder = state().gallery.folderOrder.filter(x => x !== id);

    ensureGalleryCollapseState();
    delete state().ui.collapsedGalleryFolders[id];

    window.MetaApp.save();
    renderGallery();
  }

  function populateGalleryFolderSelect() {
    const select = document.getElementById('galleryTargetFolder');
    if (!select) return;

    const folders = state().gallery.folderOrder.map(id => state().gallery.folders[id]).filter(Boolean);
    select.innerHTML = folders.length
      ? folders.map(folder => `<option value="${folder.id}">${escapeHtml(folder.name)}</option>`).join('')
      : `<option value="">No folders yet</option>`;
  }

  function addGalleryImage() {
    const folderId = document.getElementById('galleryTargetFolder').value;
    const title = document.getElementById('galleryImageTitle').value.trim();
    const description = document.getElementById('galleryImageDescription').value.trim();
    const fileInput = document.getElementById('galleryImageFile');
    const file = fileInput.files?.[0];

    if (!folderId || !file || !state().gallery.folders[folderId]) return;

    const reader = new FileReader();
    reader.onload = () => {
      const id = uid('img');
      state().gallery.images[id] = {
        id,
        folderId,
        title: title || file.name,
        description,
        src: reader.result,
        createdAt: new Date().toISOString(),
        visibility: 'inherited'
      };
      state().gallery.folders[folderId].itemIds.unshift(id);

      document.getElementById('galleryImageTitle').value = '';
      document.getElementById('galleryImageDescription').value = '';
      fileInput.value = '';

      window.MetaApp.save();
      renderGallery();
    };

    reader.readAsDataURL(file);
  }

  function editGalleryImage(id) {
    const image = state().gallery.images[id];
    if (!image) return;

    const nextTitle = prompt('Image title:', image.title || '');
    if (nextTitle === null) return;

    const nextDescription = prompt('Image description:', image.description || '');
    if (nextDescription === null) return;

    image.title = nextTitle.trim() || image.title;
    image.description = nextDescription.trim();
    window.MetaApp.save();
    renderGallery();
  }

  function moveGalleryImage(id, nextFolderId) {
    const image = state().gallery.images[id];
    if (!image) return;
    if (!nextFolderId || !state().gallery.folders[nextFolderId]) return;
    if (image.folderId === nextFolderId) return;

    const oldFolder = state().gallery.folders[image.folderId];
    const newFolder = state().gallery.folders[nextFolderId];

    if (oldFolder) oldFolder.itemIds = oldFolder.itemIds.filter(x => x !== id);
    newFolder.itemIds.unshift(id);
    image.folderId = nextFolderId;

    window.MetaApp.save();
    renderGallery();
  }

  function deleteGalleryImage(id) {
    const image = state().gallery.images[id];
    if (!image) return;

    const folder = state().gallery.folders[image.folderId];
    if (folder) folder.itemIds = folder.itemIds.filter(x => x !== id);

    delete state().gallery.images[id];
    ensureGalleryFavorites();
    state().gallery.favorites = state().gallery.favorites.filter(x => x !== id);

    closeImagePreview();
    window.MetaApp.save();
    renderGallery();
  }

  function toggleGalleryFavorite(id) {
    ensureGalleryFavorites();
    if (state().gallery.favorites.includes(id)) {
      state().gallery.favorites = state().gallery.favorites.filter(x => x !== id);
    } else {
      state().gallery.favorites.push(id);
    }
    window.MetaApp.save();
    renderGallery();
  }

  function renderGallery() {
    ensureGalleryFavorites();
    ensureGalleryCollapseState();
    populateGalleryFolderSelect();

    const search = (document.getElementById('gallerySearch')?.value || '').toLowerCase().trim();
    const folders = state().gallery.folderOrder.map(id => state().gallery.folders[id]).filter(Boolean);

    document.getElementById('galleryFolderList').innerHTML = folders.length ? folders
      .filter(folder => {
        if (!search) return true;
        const folderImages = folder.itemIds.map(id => state().gallery.images[id]).filter(Boolean);
        const hay = [folder.name, ...folderImages.map(img => `${img.title} ${img.description || ''}`)].join(' ').toLowerCase();
        return hay.includes(search);
      })
      .map(folder => {
        const images = folder.itemIds
          .map(id => state().gallery.images[id])
          .filter(Boolean)
          .filter(image => {
            if (!search) return true;
            const hay = `${folder.name} ${image.title} ${image.description || ''}`.toLowerCase();
            return hay.includes(search);
          });

        const collapsed = isGalleryFolderCollapsed(folder.id);

        return `
          <div class="gallery-folder-card">
            <div class="gallery-folder-head" onclick="MetaModules.toggleGalleryFolder('${folder.id}')">
              <div class="gallery-folder-head-left">
                <div class="gallery-folder-toggle">${collapsed ? '+' : '−'}</div>
                <div>
                  <h4>${escapeHtml(folder.name)}</h4>
                  <p class="small-muted">Visibility: ${escapeHtml(folder.visibility)} • Images: ${folder.itemIds.length}</p>
                </div>
              </div>
              <span class="tag">${folder.itemIds.length}</span>
            </div>

            <div class="gallery-folder-body ${collapsed ? 'collapsed' : ''}">
              <div class="toolbar-grid two-cols">
                <div class="field">
                  <label>Folder visibility</label>
                  <select onchange="MetaModules.setGalleryFolderVisibility('${folder.id}', this.value)">
                    <option value="private" ${folder.visibility === 'private' ? 'selected' : ''}>Private</option>
                    <option value="friends" ${folder.visibility === 'friends' ? 'selected' : ''}>Friends</option>
                    <option value="public" ${folder.visibility === 'public' ? 'selected' : ''}>Public</option>
                  </select>
                </div>
              </div>

              <div class="gallery-folder-actions">
                <button class="action-btn" onclick="event.stopPropagation(); MetaModules.renameGalleryFolder('${folder.id}')">Rename</button>
                <button class="action-btn danger" onclick="event.stopPropagation(); MetaModules.deleteGalleryFolder('${folder.id}')">Delete Folder</button>
              </div>

              ${images.length ? `
                <div class="gallery-image-grid">
                  ${images.map(image => {
                    const favorite = state().gallery.favorites.includes(image.id);
                    const otherFolders = folders.filter(f => f.id !== folder.id);
                    return `
                      <div class="gallery-image-card">
                        <button class="gallery-thumb-button" data-image-id="${image.id}" type="button">
                          <img src="${image.src}" alt="${escapeHtml(image.title)}" />
                        </button>

                        <h4>${escapeHtml(image.title)}</h4>
                        <p>${escapeHtml(image.description || 'No description')}</p>

                        <div class="field" style="margin-top:8px;">
                          <label>Image visibility</label>
                          <select onchange="MetaModules.setGalleryImageVisibility('${image.id}', this.value)">
                            <option value="inherited" ${image.visibility === 'inherited' ? 'selected' : ''}>Inherited</option>
                            <option value="private" ${image.visibility === 'private' ? 'selected' : ''}>Private</option>
                            <option value="friends" ${image.visibility === 'friends' ? 'selected' : ''}>Friends</option>
                            <option value="public" ${image.visibility === 'public' ? 'selected' : ''}>Public</option>
                          </select>
                        </div>

                        ${otherFolders.length ? `
                          <div class="field" style="margin-top:8px;">
                            <label>Move to folder</label>
                            <select onchange="MetaModules.moveGalleryImage('${image.id}', this.value)">
                              <option value="">Choose folder</option>
                              ${otherFolders.map(f => `<option value="${f.id}">${escapeHtml(f.name)}</option>`).join('')}
                            </select>
                          </div>
                        ` : ''}

                        <div class="gallery-image-actions">
                          <button class="action-btn" onclick="MetaModules.editGalleryImage('${image.id}')">Edit</button>
                          <button class="favorite-btn ${favorite ? 'active' : ''}" onclick="MetaModules.toggleGalleryFavorite('${image.id}')">${favorite ? '★ Favorited' : '☆ Favorite'}</button>
                          <button class="action-btn danger" onclick="MetaModules.deleteGalleryImage('${image.id}')">Delete</button>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              ` : `<div class="notice-box"><p>No images in this folder yet.</p></div>`}
            </div>
          </div>
        `;
      }).join('')
      : `<div class="notice-box"><p>No gallery folders found.</p></div>`;

    const searchInput = document.getElementById('gallerySearch');
    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = '1';
      searchInput.addEventListener('input', renderGallery);
    }

    bindImagePreviewEvents();
  }

  function addCalendarEvent() {
    const title = document.getElementById('calendarTitle').value.trim();
    const date = document.getElementById('calendarDate').value.trim();
    const note = document.getElementById('calendarNote').value.trim();
    const visibility = document.getElementById('calendarVisibility').value;
    const link = document.getElementById('calendarLink').value.trim();
    const reminder = document.getElementById('calendarReminder').value === 'true';

    if (!title || !date) return;

    const id = uid('event');
    state().calendar.events[id] = {
      id,
      title,
      date,
      note,
      visibility,
      link,
      reminder
    };
    state().calendar.order.unshift(id);

    ['calendarTitle', 'calendarDate', 'calendarNote', 'calendarLink'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('calendarVisibility').value = 'private';
    document.getElementById('calendarReminder').value = 'true';

    window.MetaApp.save();
    renderCalendar();
  }

  function editCalendarEvent(id) {
    const event = state().calendar.events[id];
    if (!event) return;

    const title = prompt('Event title:', event.title || '');
    if (title === null) return;

    const note = prompt('Event note:', event.note || '');
    if (note === null) return;

    const link = prompt('Event link:', event.link || '');
    if (link === null) return;

    event.title = title.trim() || event.title;
    event.note = note.trim();
    event.link = link.trim();

    window.MetaApp.save();
    renderCalendar();
  }

  function deleteCalendarEvent(id) {
    if (!state().calendar.events[id]) return;
    delete state().calendar.events[id];
    state().calendar.order = state().calendar.order.filter(x => x !== id);
    window.MetaApp.save();
    renderCalendar();
  }

  function toggleCalendarReminder(id) {
    const event = state().calendar.events[id];
    if (!event) return;
    event.reminder = !event.reminder;
    window.MetaApp.save();
    renderCalendar();
  }

  function setCalendarVisibility(id, value) {
    const event = state().calendar.events[id];
    if (!event) return;
    event.visibility = value;
    window.MetaApp.save();
    renderCalendar();
  }

  function renderCalendar() {
    const events = state().calendar.order.map(id => state().calendar.events[id]).filter(Boolean);

    document.getElementById('calendarList').innerHTML = events.length ? events.map(event => {
      const today = isToday(event.date);
      const future = isFuture(event.date);
      return `
        <div class="module-card">
          <div class="quest-head">
            <div>
              <h4>${escapeHtml(event.title)}</h4>
              <p><strong>Date:</strong> ${escapeHtml(event.date)}</p>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              ${today ? '<span class="tag today">Today</span>' : ''}
              ${future ? '<span class="tag upcoming">Upcoming</span>' : ''}
            </div>
          </div>

          <p>${escapeHtml(event.note || 'No note')}</p>
          ${event.link ? `<p class="small-muted">Link: ${escapeHtml(event.link)}</p>` : ''}

          <div class="toolbar-grid two-cols">
            <div class="field">
              <label>Visibility</label>
              <select onchange="MetaModules.setCalendarVisibility('${event.id}', this.value)">
                <option value="private" ${event.visibility === 'private' ? 'selected' : ''}>Private</option>
                <option value="friends" ${event.visibility === 'friends' ? 'selected' : ''}>Friends</option>
                <option value="public" ${event.visibility === 'public' ? 'selected' : ''}>Public</option>
              </select>
            </div>
            <div class="field">
              <label>Reminder</label>
              <button class="btn" onclick="MetaModules.toggleCalendarReminder('${event.id}')">${event.reminder ? 'Turn Off' : 'Turn On'}</button>
            </div>
          </div>

          <p class="small-muted">Visibility: ${escapeHtml(event.visibility)} • Reminder: ${event.reminder ? 'on' : 'off'}</p>

          <div class="module-actions">
            <button class="action-btn" onclick="MetaModules.editCalendarEvent('${event.id}')">Edit</button>
            <button class="action-btn danger" onclick="MetaModules.deleteCalendarEvent('${event.id}')">Delete</button>
          </div>
        </div>
      `;
    }).join('') : `<div class="notice-box"><p>No calendar events yet.</p></div>`;
  }

  function materializeRecurringFinanceEntries() {
    ensureFinanceUiState();
    const templates = state().finance.recurringOrder.map(id => state().finance.recurringTemplates[id]).filter(Boolean);
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    templates.forEach(template => {
      const start = new Date(template.startDate || template.createdAt || new Date().toISOString());
      if (Number.isNaN(start.getTime())) return;

      let year = start.getFullYear();
      let month = start.getMonth() + 1;

      while (`${year}-${String(month).padStart(2, '0')}` <= currentMonthKey) {
        const monthKey = `${year}-${String(month).padStart(2, '0')}`;
        const entryId = `${template.id}__${monthKey}`;

        if (!state().finance.entries[entryId]) {
          const occurredAt = `${monthKey}-01`;
          state().finance.entries[entryId] = {
            id: entryId,
            title: template.title,
            type: template.type,
            amount: Number(template.amount || 0),
            priority: template.priority || '',
            link: template.link || '',
            visibility: template.visibility || 'private',
            createdAt: new Date().toISOString(),
            occurredAt,
            recurringSourceId: template.id
          };
          state().finance.order.unshift(entryId);
        }

        if (template.recurrence === 'yearly') {
          year += 1;
        } else {
          month += 1;
          if (month > 12) {
            month = 1;
            year += 1;
          }
        }
      }
    });
  }

  function addFinanceEntry() {
    ensureFinanceUiState();

    const title = document.getElementById('financeTitle').value.trim();
    const type = document.getElementById('financeType').value;
    const amount = document.getElementById('financeAmount').value.trim();
    const priority = document.getElementById('financePriority').value.trim();
    const link = document.getElementById('financeLink').value.trim();
    const recurring = document.getElementById('financeRecurring').value;
    const financeDate = document.getElementById('financeDate').value.trim();
    let visibility = document.getElementById('financeVisibility').value;

    if (!title) return;
    if (type === 'wishlist') visibility = 'friends';

    const occurredAt = financeDate || new Date().toISOString().slice(0, 10);

    if (recurring !== 'none') {
      const templateId = uid('financeRecurring');
      state().finance.recurringTemplates[templateId] = {
        id: templateId,
        title,
        type,
        amount: Number(amount || 0),
        priority,
        link,
        visibility,
        recurrence: recurring,
        startDate: occurredAt,
        createdAt: new Date().toISOString()
      };
      state().finance.recurringOrder.unshift(templateId);
      materializeRecurringFinanceEntries();
    } else {
      const id = uid('finance');
      state().finance.entries[id] = {
        id,
        title,
        type,
        amount: Number(amount || 0),
        priority,
        link,
        visibility,
        createdAt: new Date().toISOString(),
        occurredAt
      };
      state().finance.order.unshift(id);
    }

    ['financeTitle', 'financeAmount', 'financePriority', 'financeLink', 'financeDate'].forEach(id => {
      const node = document.getElementById(id);
      if (node) node.value = '';
    });
    document.getElementById('financeType').value = 'income';
    document.getElementById('financeVisibility').value = 'private';
    document.getElementById('financeRecurring').value = 'none';

    window.MetaApp.save();
    renderFinance();
  }

  function editFinanceEntry(id) {
    const item = state().finance.entries[id];
    if (!item) return;

    const title = prompt('Entry title:', item.title || '');
    if (title === null) return;

    const amount = prompt('Amount:', String(item.amount ?? 0));
    if (amount === null) return;

    const priority = prompt('Priority / note:', item.priority || '');
    if (priority === null) return;

    const link = prompt('Link:', item.link || '');
    if (link === null) return;

    item.title = title.trim() || item.title;
    item.amount = Number(amount || 0);
    item.priority = priority.trim();
    item.link = link.trim();

    window.MetaApp.save();
    renderFinance();
    renderFinanceTypeModal();
  }

  function deleteFinanceEntry(id) {
    if (!state().finance.entries[id]) return;
    delete state().finance.entries[id];
    state().finance.order = state().finance.order.filter(x => x !== id);
    window.MetaApp.save();
    renderFinance();
    renderFinanceTypeModal();
  }

  function setFinanceVisibility(id, visibility) {
    const item = state().finance.entries[id];
    if (!item) return;
    item.visibility = visibility;
    window.MetaApp.save();
    renderFinance();
    renderFinanceTypeModal();
  }

  function setFinanceTab(tab) {
    ensureFinanceUiState();
    state().ui.financeTab = tab;
    window.MetaApp.save();

    document.querySelectorAll('.finance-type-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.financeTab === tab);
    });

    renderFinance();
  }

  function applyFinanceMonthFilter() {
    ensureFinanceUiState();
    const value = document.getElementById('financeMonthFilter').value || '';
    state().ui.financeMonthFilter = value;
    window.MetaApp.save();
    renderFinance();
  }

  function clearFinanceMonthFilter() {
    ensureFinanceUiState();
    state().ui.financeMonthFilter = '';
    const input = document.getElementById('financeMonthFilter');
    if (input) input.value = '';
    window.MetaApp.save();
    renderFinance();
  }

  function getFinanceEntriesByTab(tab) {
    ensureFinanceUiState();
    const monthFilter = state().ui.financeMonthFilter || '';

    let entries = state().finance.order.map(id => state().finance.entries[id]).filter(Boolean);

    if (tab && tab !== 'all') {
      entries = entries.filter(entry => entry.type === tab);
    }

    if (monthFilter) {
      entries = entries.filter(entry => formatMonthKey(entry.occurredAt || entry.createdAt) === monthFilter);
    }

    return entries;
  }

  function openFinanceTypeModal() {
    const modal = document.getElementById('financeTypeModal');
    if (!modal) return;
    renderFinanceTypeModal();
    modal.classList.add('active');
  }

  function renderFinanceTypeModal() {
    const titleNode = document.getElementById('financeTypeModalTitle');
    const listNode = document.getElementById('financeTypeModalList');
    if (!titleNode || !listNode) return;

    ensureFinanceUiState();
    const tab = state().ui.financeTab || 'all';
    const monthFilter = state().ui.financeMonthFilter || '';
    const label = tab === 'all' ? 'All Finance Entries' : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Entries`;

    titleNode.textContent = monthFilter ? `${label} • ${monthFilter}` : label;

    const entries = getFinanceEntriesByTab(tab);

    listNode.innerHTML = entries.length ? entries.map(item => `
      <div class="module-card">
        <h4>${escapeHtml(item.title)}</h4>
        <p><strong>Type:</strong> ${escapeHtml(item.type)}</p>
        <p><strong>Amount:</strong> ${item.amount}</p>
        <p><strong>Date:</strong> ${escapeHtml(item.occurredAt || item.createdAt || '-')}</p>
        <p class="small-muted">Priority: ${escapeHtml(item.priority || 'none')} • Visibility: ${escapeHtml(item.visibility)}</p>
        ${item.link ? `<p class="small-muted">Link: ${escapeHtml(item.link)}</p>` : ''}

        <div class="toolbar-grid two-cols">
          <div class="field">
            <label>Visibility</label>
            <select onchange="MetaModules.setFinanceVisibility('${item.id}', this.value)">
              <option value="private" ${item.visibility === 'private' ? 'selected' : ''}>Private</option>
              <option value="friends" ${item.visibility === 'friends' ? 'selected' : ''}>Friends</option>
              <option value="public" ${item.visibility === 'public' ? 'selected' : ''}>Public</option>
            </select>
          </div>
        </div>

        <div class="module-actions">
          <button class="action-btn" onclick="MetaModules.editFinanceEntry('${item.id}')">Edit</button>
          <button class="action-btn danger" onclick="MetaModules.deleteFinanceEntry('${item.id}')">Delete</button>
        </div>
      </div>
    `).join('') : `<div class="notice-box"><p>No entries in this tab.</p></div>`;
  }

  function getFinanceTotals() {
    ensureFinanceUiState();
    const entries = Object.values(state().finance.entries || {});
    const monthFilter = state().ui.financeMonthFilter || '';

    let income = 0;
    let expense = 0;
    let investment = 0;
    let wishlist = 0;

    entries
      .filter(e => !monthFilter || formatMonthKey(e.occurredAt || e.createdAt) === monthFilter)
      .forEach(e => {
        const amount = Number(e.amount) || 0;
        if (e.type === 'income') income += amount;
        if (e.type === 'expense') expense += amount;
        if (e.type === 'investment') investment += amount;
        if (e.type === 'wishlist') wishlist += amount;
      });

    return {
      income,
      expense,
      investment,
      wishlist,
      balance: income - expense - investment
    };
  }

  function getFinanceTimelineData() {
    const entries = Object.values(state().finance.entries || {});
    const monthly = {};

    entries.forEach(entry => {
      const base = entry.occurredAt || entry.createdAt;
      const date = new Date(base);
      if (Number.isNaN(date.getTime())) return;

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthly[key]) monthly[key] = { income: 0, expense: 0, investment: 0 };

      const amount = Number(entry.amount) || 0;
      if (entry.type === 'income') monthly[key].income += amount;
      if (entry.type === 'expense') monthly[key].expense += amount;
      if (entry.type === 'investment') monthly[key].investment += amount;
    });

    return Object.keys(monthly).sort().map(key => ({
      month: key,
      balance: monthly[key].income - monthly[key].expense - monthly[key].investment
    }));
  }

  function setupCanvasSize(canvas) {
    if (!canvas || !canvas.parentElement) return false;
    const parentWidth = canvas.parentElement.clientWidth;
    if (!parentWidth || parentWidth <= 0) return false;
    canvas.width = Math.max(320, Math.floor(parentWidth - 8));
    canvas.height = 240;
    return true;
  }

  function drawFinanceChart(income, expense, investment, wishlist, balance) {
    const canvas = document.getElementById('financeChart');
    if (!canvas || !setupCanvasSize(canvas)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const values = [income, expense, investment, wishlist, Math.max(0, balance)];
    const labels = ['Income', 'Expense', 'Investment', 'Wishlist', 'Balance'];
    const colors = ['#5f8f46', '#b8862f', '#7660b4', '#c99a45', '#d0a13c'];
    const max = Math.max(...values, 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const usableHeight = canvas.height - 80;
    const slotWidth = canvas.width / values.length;
    const barWidth = Math.min(64, slotWidth - 24);

    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    values.forEach((value, i) => {
      const barHeight = (value / max) * usableHeight;
      const x = i * slotWidth + (slotWidth / 2) - (barWidth / 2);
      const y = canvas.height - 40 - barHeight;

      ctx.fillStyle = colors[i];
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = '#f0e3c8';
      ctx.fillText(String(value), x + (barWidth / 2), y - 10);
      ctx.fillText(labels[i], x + (barWidth / 2), canvas.height - 15);
    });

    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.beginPath();
    ctx.moveTo(20, canvas.height - 40);
    ctx.lineTo(canvas.width - 20, canvas.height - 40);
    ctx.stroke();
  }

  function drawFinanceTimelineChart(timeline) {
    const canvas = document.getElementById('financeTimelineChart');
    if (!canvas || !setupCanvasSize(canvas)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!timeline.length) {
      ctx.fillStyle = '#f0e3c8';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('No monthly finance data yet.', canvas.width / 2, canvas.height / 2);
      return;
    }

    const paddingX = 50;
    const paddingTop = 30;
    const paddingBottom = 45;
    const usableWidth = canvas.width - paddingX * 2;
    const usableHeight = canvas.height - paddingTop - paddingBottom;

    const values = timeline.map(item => item.balance);
    const max = Math.max(...values, 0, 1);
    const min = Math.min(...values, 0);
    const range = Math.max(1, max - min);
    const zeroY = paddingTop + ((max - 0) / range) * usableHeight;

    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.beginPath();
    ctx.moveTo(paddingX, zeroY);
    ctx.lineTo(canvas.width - paddingX, zeroY);
    ctx.stroke();

    ctx.strokeStyle = '#c99a45';
    ctx.lineWidth = 3;
    ctx.beginPath();

    timeline.forEach((item, index) => {
      const x = paddingX + (timeline.length === 1 ? usableWidth / 2 : (index / (timeline.length - 1)) * usableWidth);
      const y = paddingTop + ((max - item.balance) / range) * usableHeight;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();
    ctx.lineWidth = 1;

    timeline.forEach((item, index) => {
      const x = paddingX + (timeline.length === 1 ? usableWidth / 2 : (index / (timeline.length - 1)) * usableWidth);
      const y = paddingTop + ((max - item.balance) / range) * usableHeight;

      ctx.fillStyle = item.balance >= 0 ? '#5f8f46' : '#b94444';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f0e3c8';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.month, x, canvas.height - 15);
      ctx.fillText(String(item.balance), x, y - 12);
    });
  }

  function updateFinanceSummary() {
    materializeRecurringFinanceEntries();

    const { income, expense, investment, wishlist, balance } = getFinanceTotals();

    const incomeNode = document.getElementById('financeIncomeTotal');
    const expenseNode = document.getElementById('financeExpenseTotal');
    const investmentNode = document.getElementById('financeInvestmentTotal');
    const wishlistNode = document.getElementById('financeWishlistTotal');
    const balanceNode = document.getElementById('financeBalance');

    if (incomeNode) incomeNode.textContent = income;
    if (expenseNode) expenseNode.textContent = expense;
    if (investmentNode) investmentNode.textContent = investment;
    if (wishlistNode) wishlistNode.textContent = wishlist;
    if (balanceNode) balanceNode.textContent = balance;

    requestAnimationFrame(() => {
      drawFinanceChart(income, expense, investment, wishlist, balance);
      drawFinanceTimelineChart(getFinanceTimelineData());
    });
  }

  function exportFinanceData() {
    ensureFinanceUiState();
    const payload = {
      entries: state().finance.entries || {},
      order: state().finance.order || [],
      recurringTemplates: state().finance.recurringTemplates || {},
      recurringOrder: state().finance.recurringOrder || []
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `metamorphosis-finance-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function importFinanceData(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        state().finance.entries = parsed.entries || {};
        state().finance.order = parsed.order || [];
        state().finance.recurringTemplates = parsed.recurringTemplates || {};
        state().finance.recurringOrder = parsed.recurringOrder || [];
        window.MetaApp.save();
        renderFinance();
      } catch (err) {
        alert('Import failed. Invalid finance JSON.');
      }
    };
    reader.readAsText(file);

    event.target.value = '';
  }

  function renderFinanceTypeModal() {
    const titleNode = document.getElementById('financeTypeModalTitle');
    const listNode = document.getElementById('financeTypeModalList');
    if (!titleNode || !listNode) return;

    ensureFinanceUiState();
    const tab = state().ui.financeTab || 'all';
    const monthFilter = state().ui.financeMonthFilter || '';
    const label = tab === 'all' ? 'All Finance Entries' : `${tab.charAt(0).toUpperCase() + tab.slice(1)} Entries`;
    titleNode.textContent = monthFilter ? `${label} • ${monthFilter}` : label;

    const entries = getFinanceEntriesByTab(tab);

    listNode.innerHTML = entries.length ? entries.map(item => `
      <div class="module-card">
        <h4>${escapeHtml(item.title)}</h4>
        <p><strong>Type:</strong> ${escapeHtml(item.type)}</p>
        <p><strong>Amount:</strong> ${item.amount}</p>
        <p><strong>Date:</strong> ${escapeHtml(item.occurredAt || item.createdAt || '-')}</p>
        <p class="small-muted">Priority: ${escapeHtml(item.priority || 'none')} • Visibility: ${escapeHtml(item.visibility)}</p>
        ${item.link ? `<p class="small-muted">Link: ${escapeHtml(item.link)}</p>` : ''}

        <div class="toolbar-grid two-cols">
          <div class="field">
            <label>Visibility</label>
            <select onchange="MetaModules.setFinanceVisibility('${item.id}', this.value)">
              <option value="private" ${item.visibility === 'private' ? 'selected' : ''}>Private</option>
              <option value="friends" ${item.visibility === 'friends' ? 'selected' : ''}>Friends</option>
              <option value="public" ${item.visibility === 'public' ? 'selected' : ''}>Public</option>
            </select>
          </div>
        </div>

        <div class="module-actions">
          <button class="action-btn" onclick="MetaModules.editFinanceEntry('${item.id}')">Edit</button>
          <button class="action-btn danger" onclick="MetaModules.deleteFinanceEntry('${item.id}')">Delete</button>
        </div>
      </div>
    `).join('') : `<div class="notice-box"><p>No entries in this tab.</p></div>`;
  }

  function renderFinance() {
    ensureFinanceUiState();
    materializeRecurringFinanceEntries();

    const tab = state().ui.financeTab || 'all';
    const monthInput = document.getElementById('financeMonthFilter');
    if (monthInput) monthInput.value = state().ui.financeMonthFilter || '';

    document.querySelectorAll('.finance-type-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.financeTab === tab);
    });

    const entries = getFinanceEntriesByTab(tab);

    document.getElementById('financeList').innerHTML = entries.length ? entries.map(item => `
      <div class="module-card">
        <div class="quest-head">
          <div>
            <h4>${escapeHtml(item.title)}</h4>
            <p><strong>Type:</strong> ${escapeHtml(item.type)}</p>
          </div>
          <span class="tag">${item.amount}</span>
        </div>

        <p><strong>Amount:</strong> ${item.amount}</p>
        <p><strong>Date:</strong> ${escapeHtml(item.occurredAt || item.createdAt || '-')}</p>
        <p class="small-muted">Priority: ${escapeHtml(item.priority || 'none')} • Visibility: ${escapeHtml(item.visibility)}</p>
        ${item.link ? `<p class="small-muted">Link: ${escapeHtml(item.link)}</p>` : ''}

        <div class="module-actions">
          <button class="action-btn" onclick="MetaModules.editFinanceEntry('${item.id}')">Edit</button>
          <button class="action-btn danger" onclick="MetaModules.deleteFinanceEntry('${item.id}')">Delete</button>
        </div>
      </div>
    `).join('') : `<div class="notice-box"><p>No finance entries in this tab.</p></div>`;

    updateFinanceSummary();
    renderFinanceTypeModal();
  }

  function renderMeta() {
    const qaNode = document.getElementById('qaList');
    const appliedNode = document.getElementById('appliedPatchList');
    const plannedNode = document.getElementById('plannedPatchList');

    if (qaNode) {
      qaNode.innerHTML = (window.MetaData.qaItems || []).map(item => `
        <div class="module-card">
          <h4>${escapeHtml(item.q)}</h4>
          <p>${escapeHtml(item.a)}</p>
        </div>
      `).join('');
    }

    if (appliedNode) {
      appliedNode.innerHTML = (window.MetaData.appliedPatchNotes || []).map(patch => `
        <div class="module-card">
          <h4>${escapeHtml(patch.version)}</h4>
          <ul class="small-muted">
            ${(patch.items || []).map(item => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    }

    if (plannedNode) {
      plannedNode.innerHTML = (window.MetaData.plannedPatchNotes || []).map(patch => `
        <div class="module-card">
          <h4>${escapeHtml(patch.version)}</h4>
          <ul class="small-muted">
            ${(patch.items || []).map(item => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    }
  }

  function renderCommunity() {
    const vis = state().social.profileVisibility;
    document.getElementById('communityVisibilityList').innerHTML = Object.entries(vis).map(([key, value]) => `
      <div class="module-card">
        <h4>${escapeHtml(key)}</h4>
        <p class="small-muted">Default visibility: ${escapeHtml(value)}</p>
      </div>
    `).join('');
  }

  return {
    saveJournalEntry,
    startEditJournalEntry,
    deleteJournalEntry,
    clearJournalForm,

    addGalleryFolder,
    renameGalleryFolder,
    setGalleryFolderVisibility,
    setGalleryImageVisibility,
    deleteGalleryFolder,
    addGalleryImage,
    editGalleryImage,
    moveGalleryImage,
    deleteGalleryImage,
    toggleGalleryFavorite,
    toggleGalleryFolder,
    openImagePreview,
    closeImagePreview,

    addCalendarEvent,
    editCalendarEvent,
    deleteCalendarEvent,
    toggleCalendarReminder,
    setCalendarVisibility,

    addFinanceEntry,
    editFinanceEntry,
    deleteFinanceEntry,
    setFinanceVisibility,
    setFinanceTab,
    applyFinanceMonthFilter,
    clearFinanceMonthFilter,
    openFinanceTypeModal,
    closeFinanceTypeModal,
    exportFinanceData,
    importFinanceData,

    renderJournal,
    renderGallery,
    renderCalendar,
    renderFinance,
    renderMeta,
    renderCommunity
  };
})();
