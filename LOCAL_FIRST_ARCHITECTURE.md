# Ilmizo — Local-First, Zero-Cloud-Database Architecture (`v2`)

## 1. Product & Architecture Decision
Ilmizo operates as a **100% Local-First, Offline-Capable Progressive Web Application (PWA)** built with React 19, Vite, and TypeScript.
- **Zero Cloud Database / Zero Paid Backend**: Cloud databases (Firebase, Supabase, Cloud SQL), cloud authentication servers, and multi-device cloud synchronization are explicitly **DEFERRED / NOT REQUIRED FOR CURRENT RELEASE**.
- **Zero Telemetry or Third-Party Tracking**: Personal learning records, Adult Salah/Hifz logs, and Child profiles never leave the user's device.

---

## 2. Two-Tier Local Storage Architecture
All persistent data is managed through a single typed data-access layer (`src/services/localDatabase.ts`) and backup engine (`src/services/backupRestoreEngine.ts`):

1. **Primary Structured Database — IndexedDB (`ilmizo_local_db`, Schema Version `2`)**:
   - `app_state` (`id: 'master_v2'`): Stores the complete `PersistedMasterStateV2` document (Adult profile, up to 5 Child profiles isolated by stable `childId`, Quran bookmarks, personal notes, Hifz plans, spaced-repetition queue, Salah daily records, Duas favorites, Seerah milestones, completed lessons, mastered vocabulary, quiz attempts, tasks, and halal/Sadaqah expense entries).
   - `learning_events` (keyPath `id`, indexes `by_dateKey`, `by_childId`, `by_mode`): Append-only unified event log for Adult and Child learning milestones.
   - `offline_surahs` (keyPath `cacheKey`, indexes `by_surahNumber`, `by_downloaded`): Stores explicitly downloaded Surahs (`isExplicitDownload: true`) and cached API responses (`isExplicitDownload: false`) with verified Uthmani script, translations, and audio URLs.
   - `offline_audio` (keyPath `id`, index `by_surahNumber`): Reserved store for cached recitation audio metadata.
   - `prayer_timings_cache` (keyPath `cacheKey`): Caches verified Aladhan prayer timings by city, country, calculation method, Asr school, and date key for offline access.
   - `recovery_snapshots` (keyPath `id`): Stores automatic pre-import recovery snapshots (`pre_import_latest`) before any JSON backup import overwrites local state.

2. **Lightweight Preferences & Backward-Compatible Fallback — `localStorage`**:
   - `ilmizo_migration_v2_verified`: Set to `'true'` only after `ilmizo_master_state_v1` has been migrated to IndexedDB and read back for verification.
   - `ilmizo_master_state_v1`: Preserved intact during migration and mirrored as a synchronous safety fallback so zero legacy data is ever lost.
   - `ilmizo_prefs_v2`: Lightweight UI preferences (`darkMode`, `language`, `autoPlayRecitation`, `activeChildId`, `mode`).

---

## 3. Safe `v1 -> v2` Migration Pipeline
On startup (`hydrateOrMigrateMasterState` in `src/services/localDatabase.ts`):
1. Checks IndexedDB `app_state` for `master_v2`.
2. If not present, reads legacy `localStorage.getItem('ilmizo_master_state_v1')`.
3. Normalizes and validates every field via `normalizePersistedMasterState`, writes the `v2` record to IndexedDB, reads it back from IndexedDB to verify integrity, and only then sets `ilmizo_migration_v2_verified = 'true'`.
4. **Never deletes `ilmizo_master_state_v1`**, ensuring complete backward safety.

---

## 4. Offline Content Resolution & Transparency
Every Quran Surah is explicitly labeled according to its real offline availability (`getSurahOfflineAvailability` in `src/data/quranData.ts`):
- **✓ Bundled Offline (`bundled_full`)**: Surahs 1, 93, 94, 95, 97, 103, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114 — complete verified Uthmani Arabic, transliteration, English, Hindi, and Urdu translations bundled directly in the app bundle.
- **✓ Saved Offline (`downloaded_idb`)**: Any of the 114 Surahs explicitly downloaded by the user into IndexedDB `offline_surahs` via the Surah List, Reader header, or Offline Manager.
- **Key Verses Offline (`bundled_partial`)**: Surahs 2, 18, 36, 55, 56, 67 — key verses bundled offline; full Surah can be saved to IndexedDB with 1 tap when online.
- **Cached (`cached_idb`)**: Previously opened online Surahs cached in IndexedDB.
- **Offline Safety Rule**: If a user opens an uncached Surah while offline, Ilmizo displays an explicit **Offline Mode — Not Cached on Device** card for that exact Surah and **never** substitutes Al-Fatiha or another Surah's verses.

---

## 5. Validated JSON Backup, Import Preview & Recovery Snapshot
Located in `src/services/backupRestoreEngine.ts` and `src/components/pwa/LocalDataManagerCard.tsx`:
- **Manual JSON Export**: Exports a timestamped `IlmizoBackupBundleV2` (`schemaVersion: 2`, `exportedAt`, full adult + child state).
- **Pre-Write Validation & Deduplication**: Validates JSON syntax, schema version, and structure, and deduplicates repeated IDs across child profiles, bookmarks, notes, Hifz plans, revisions, learning events, quizzes, tasks, and expenses.
- **Interactive Import Preview**: Displays an on-screen summary of the backup file (Adult name, export date, child profile names, bookmarks count, Hifz plans count,Salah days, and learning events) requiring explicit user confirmation before writing.
- **Automatic Pre-Import Recovery Snapshot**: Before applying an import, the current state is saved to IndexedDB `recovery_snapshots` (`pre_import_latest`) with a 1-click **Undo Last Import** button.
