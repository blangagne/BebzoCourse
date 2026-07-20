/* Bebzocourse storage layer — schema independent from app version. */
(() => {
  "use strict";

  const SCHEMA_VERSION = 1;
  const PREFIX = "bz_";
  const META_KEY = "bz_db_schema";
  const BACKUP_KEY = "bz_auto_backup";
  const LEGACY_KEYS = ["bebzocourse", "bz_data", "bz_app_data"];
  const DATA_KEYS = [
    "bz_products", "bz_recipes", "bz_shopping", "bz_bought", "bz_history",
    "bz_streaks", "bz_options", "bz_aisles", "bz_stores", "bz_stock",
    "bz_mandatory_products", "bz_profile"
  ];

  const parse = value => {
    if (typeof value !== "string" || value === "") return null;
    try { return JSON.parse(value); } catch (_) { return null; }
  };

  function snapshot() {
    const data = {};
    for (const key of DATA_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw !== null && parse(raw) !== null) data[key] = raw;
    }
    return { schema: SCHEMA_VERSION, createdAt: new Date().toISOString(), data };
  }

  function saveBackup() {
    try {
      const snap = snapshot();
      if (Object.keys(snap.data).length) localStorage.setItem(BACKUP_KEY, JSON.stringify(snap));
    } catch (error) {
      console.warn("Sauvegarde automatique indisponible", error);
    }
  }

  function restoreMissingFromBackup() {
    const backup = parse(localStorage.getItem(BACKUP_KEY));
    if (!backup || !backup.data || typeof backup.data !== "object") return;
    for (const [key, raw] of Object.entries(backup.data)) {
      const current = localStorage.getItem(key);
      if ((current === null || parse(current) === null) && parse(raw) !== null) {
        localStorage.setItem(key, raw);
      }
    }
  }

  function migrateLegacyMonolith() {
    for (const legacyKey of LEGACY_KEYS) {
      const legacy = parse(localStorage.getItem(legacyKey));
      if (!legacy || typeof legacy !== "object" || Array.isArray(legacy)) continue;
      const mapping = {
        products: "bz_products", recipes: "bz_recipes", shopping: "bz_shopping",
        bought: "bz_bought", history: "bz_history", streaks: "bz_streaks",
        options: "bz_options", aisles: "bz_aisles", stores: "bz_stores",
        stock: "bz_stock", mandatoryProducts: "bz_mandatory_products", profile: "bz_profile"
      };
      for (const [oldName, newKey] of Object.entries(mapping)) {
        if (localStorage.getItem(newKey) === null && legacy[oldName] !== undefined) {
          localStorage.setItem(newKey, JSON.stringify(legacy[oldName]));
        }
      }
    }
  }

  function migrate() {
    restoreMissingFromBackup();
    const current = Number(localStorage.getItem(META_KEY) || 0);
    if (current < 1) migrateLegacyMonolith();
    localStorage.setItem(META_KEY, String(SCHEMA_VERSION));
    saveBackup();
  }

  window.BZStorage = {
    schemaVersion: SCHEMA_VERSION,
    saveBackup,
    snapshot,
    exportData() { return JSON.stringify(snapshot(), null, 2); }
  };

  try { migrate(); } catch (error) { console.error("Migration des données échouée", error); }
})();
