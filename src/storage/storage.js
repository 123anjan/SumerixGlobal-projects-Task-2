function makeStore(area) {
  return {
    get(key, fallback = null) {
      try {
        const raw = area.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        area.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.warn("Storage unavailable:", err);
      }
    },
    remove(key) {
      area.removeItem(key);
    },
  };
}

export const local = makeStore(localStorage); // preferences that persist
export const session = makeStore(sessionStorage); // per-tab data (selected employee, API cache)
