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
    if (!state().gallery.favorites) {
      state().gallery.favorites = [];
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
    document.getElementById('journalInternalLinks').value = (entry.linkedInternal || [])
      .map(item => `${item.type}:${item.id}`)
      .join(', ');

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
        ${list.map(item => `
          <div class="link-pill">${item.type}:${item.id}</div>
        `).join('')}
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
        <h4>${entry.title}</h4>
        <p><strong>Category:</strong> ${entry.category}</p>
        <p>${entry.content}</p>
        <p class="small-muted">Tags: ${(entry.tags || []).join(', ') || 'none'} • Visibility: ${entry.visibility}</p>
        ${entry.linkedExternal?.length ? `<p class="small-muted">Link: ${entry.linkedExternal[0].url}</p>` : ''}
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

  function renameGalleryFolder(id) {
    const folder = state().gallery.folders[id];
    if (!folder) return;
    const next = prompt('Rename folder:', folder.name);
    if (!next || !next.trim()) return;
    folder.name = next.trim();
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
    window.MetaApp.save();
    renderGallery();
  }

  function populateGalleryFolderSelect() {
    const select = document.getElementById('galleryTargetFolder');
    if (!select) return;

    const folders = state().gallery.folderOrder.map(id => state().gallery.folders[id]).filter(Boolean);

    select.innerHTML = folders.length
      ? folders.map(folder => `<option value="${folder.id}">${folder.name}</option>`).join('')
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

    if (oldFolder) {
      oldFolder.itemIds = oldFolder.itemIds.filter(x => x !== id);
    }

    newFolder.itemIds.unshift(id);
    image.folderId = nextFolderId;

    window.MetaApp.save();
    renderGallery();
  }

  function deleteGalleryImage(id) {
    const image = state().gallery.images[id];
    if (!image) return;

    const folder = state().gallery.folders[image.folderId];
    if (folder) {
      folder.itemIds = folder.itemIds.filter(x => x !== id);
    }

    delete state().gallery.images[id];
    ensureGalleryFavorites();
    state().gallery.favorites = state().gallery.favorites.filter(x => x !== id);

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
    populateGalleryFolderSelect();

    const search = (document.getElementById('gallerySearch')?.value || '').toLowerCase().trim();
    const folders = state().gallery.folderOrder.map(id => state().gallery.folders[id]).filter(Boolean);

    document.getElementById('galleryFolderList').innerHTML = folders.length ? folders
      .filter(folder => {
        if (!search) return true;
        const folderImages = folder.itemIds.map(id => state().gallery.images[id]).filter(Boolean);
        const hay = [
          folder.name,
          ...folderImages.map(img => `${img.title} ${img.description || ''}`)
        ].join(' ').toLowerCase();
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

        return `
          <div class="gallery-folder-card">
            <h4>${folder.name}</h4>
            <p class="small-muted">Visibility: ${folder.visibility} • Images: ${folder.itemIds.length}</p>

            <div class="gallery-folder-actions">
              <button class="action-btn" onclick="MetaModules.renameGalleryFolder('${folder.id}')">Rename</button>
              <button class="action-btn danger" onclick="MetaModules.deleteGalleryFolder('${folder.id}')">Delete Folder</button>
            </div>

            ${images.length ? `
              <div class="gallery-image-grid">
                ${images.map(image => {
                  const favorite = state().gallery.favorites.includes(image.id);
                  const otherFolders = folders.filter(f => f.id !== folder.id);

                  return `
                    <div class="gallery-image-card">
                      <img src="${image.src}" alt="${image.title}" />
                      <h4>${image.title}</h4>
                      <p>${image.description || 'No description'}</p>

                      ${otherFolders.length ? `
                        <div class="field" style="margin-top:8px;">
                          <label>Move to folder</label>
                          <select onchange="MetaModules.moveGalleryImage('${image.id}', this.value)">
                            <option value="">Choose folder</option>
                            ${otherFolders.map(f => `<option value="${f.id}">${f.name}</option>`).join('')}
                          </select>
                        </div>
                      ` : ''}

                      <div class="gallery-image-actions">
                        <button class="action-btn" onclick="MetaModules.editGalleryImage('${image.id}')">Edit</button>
                        <button class="favorite-btn ${favorite ? 'active' : ''}" onclick="MetaModules.toggleGalleryFavorite('${image.id}')">
                          ${favorite ? '★ Favorited' : '☆ Favorite'}
                        </button>
                        <button class="action-btn danger" onclick="MetaModules.deleteGalleryImage('${image.id}')">Delete</button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : `<div class="notice-box"><p>No images in this folder yet.</p></div>`}
          </div>
        `;
      }).join('')
      : `<div class="notice-box"><p>No gallery folders found.</p></div>`;

    const searchInput = document.getElementById('gallerySearch');
    if (searchInput && !searchInput.dataset.bound) {
      searchInput.dataset.bound = '1';
      searchInput.addEventListener('input', renderGallery);
    }
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
    const events = state().calendar.order.map(id => state().calendar.events[id]).filter(Boolean);
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
    const entries = state().finance.order.map(id => state().finance.entries[id]).filter(Boolean);
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
    saveJournalEntry,
    startEditJournalEntry,
    deleteJournalEntry,
    clearJournalForm,
    addGalleryFolder,
    renameGalleryFolder,
    deleteGalleryFolder,
    addGalleryImage,
    editGalleryImage,
    moveGalleryImage,
    deleteGalleryImage,
    toggleGalleryFavorite,
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
