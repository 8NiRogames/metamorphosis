window.MetaStore = (function () {
  const KEY = 'metamorphosis_state_v1_1';

  function load() {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const fresh = window.MetaSchema.createDefaultState();
      save(fresh);
      return fresh;
    }

    try {
      const parsed = JSON.parse(raw);
      return deepMerge(window.MetaSchema.createDefaultState(), parsed);
    } catch (err) {
      console.error('State load failed, resetting save.', err);
      const fresh = window.MetaSchema.createDefaultState();
      save(fresh);
      return fresh;
    }
  }

  function save(state) {
    state.meta.updatedAt = new Date().toISOString();
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function reset() {
    localStorage.removeItem(KEY);
    const fresh = window.MetaSchema.createDefaultState();
    save(fresh);
    return fresh;
  }

  function deepMerge(base, incoming) {
    if (Array.isArray(base)) return Array.isArray(incoming) ? incoming : base;
    if (typeof base !== 'object' || base === null) return incoming ?? base;
    const out = { ...base };
    Object.keys(incoming || {}).forEach(key => {
      if (key in base) {
        out[key] = deepMerge(base[key], incoming[key]);
      } else {
        out[key] = incoming[key];
      }
    });
    return out;
  }

  return { load, save, reset };
})();
