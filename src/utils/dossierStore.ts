import { GameProfile, RESEARCHED_PROFILES } from '../data/taxonomyData';

const STORAGE_KEY = 'cashmask_dossiers_db_v2';
const AUTH_KEY = 'cashmask_admin_auth_v1';

type StoreListener = (profiles: GameProfile[]) => void;

class DossierStore {
  private profiles: GameProfile[] = [];
  private listeners: Set<StoreListener> = new Set();
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.isInitialized) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.profiles = parsed;
          this.isInitialized = true;
          return;
        }
      }
    } catch (err) {
      console.warn('Could not read cached profiles from localStorage:', err);
    }

    // Default to initial research dataset
    this.profiles = [...RESEARCHED_PROFILES];
    this.isInitialized = true;
    this.persist();
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profiles));
    } catch (err) {
      console.error('Failed to persist profiles to localStorage:', err);
    }
  }

  private notify() {
    this.persist();
    const current = [...this.profiles];
    this.listeners.forEach((listener) => {
      try {
        listener(current);
      } catch (err) {
        console.error('Error in dossierStore listener:', err);
      }
    });
  }

  public subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    // Send immediate initial value
    listener([...this.profiles]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getProfiles(): GameProfile[] {
    return [...this.profiles];
  }

  public getProfileById(id: string): GameProfile | undefined {
    return this.profiles.find((p) => p.id === id);
  }

  public getNextAvailableId(): string {
    const existingNums = this.profiles
      .map((p) => {
        const match = p.id.match(/^G(\d+)/i);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((n) => n > 0);

    const max = existingNums.length > 0 ? Math.max(...existingNums) : 46;
    const next = max + 1;
    return `G${next < 100 ? next.toString().padStart(3, '0') : next}`;
  }

  public saveProfile(profile: GameProfile): { success: boolean; message: string } {
    const index = this.profiles.findIndex((p) => p.id === profile.id);
    if (index >= 0) {
      // Update existing
      this.profiles[index] = { ...profile };
      this.notify();
      return { success: true, message: `Profile ${profile.id} (${profile.name}) updated successfully.` };
    } else {
      // Create new
      this.profiles.push({ ...profile });
      this.notify();
      return { success: true, message: `Profile ${profile.id} (${profile.name}) created successfully.` };
    }
  }

  public deleteProfile(id: string): { success: boolean; message: string } {
    const initialLen = this.profiles.length;
    this.profiles = this.profiles.filter((p) => p.id !== id);
    if (this.profiles.length < initialLen) {
      this.notify();
      return { success: true, message: `Profile ${id} deleted successfully.` };
    }
    return { success: false, message: `Profile ${id} not found.` };
  }

  public duplicateProfile(id: string): GameProfile | null {
    const original = this.getProfileById(id);
    if (!original) return null;

    const newId = this.getNextAvailableId();
    const copy: GameProfile = {
      ...original,
      id: newId,
      name: `${original.name} (Copy)`,
      representativeTitle: `${original.representativeTitle} [Duplicate]`,
    };

    this.profiles.push(copy);
    this.notify();
    return copy;
  }

  public bulkImport(
    imported: GameProfile[],
    mode: 'merge' | 'replace'
  ): { success: number; updated: number; added: number; errors: string[] } {
    const errors: string[] = [];
    if (!Array.isArray(imported) || imported.length === 0) {
      return { success: 0, updated: 0, added: 0, errors: ['No valid profiles provided.'] };
    }

    let added = 0;
    let updated = 0;

    if (mode === 'replace') {
      this.profiles = [...imported];
      added = imported.length;
      this.notify();
      return { success: imported.length, updated: 0, added, errors };
    }

    // Merge mode
    const profileMap = new Map<string, GameProfile>();
    this.profiles.forEach((p) => profileMap.set(p.id, p));

    imported.forEach((p, idx) => {
      if (!p.id || !p.name) {
        errors.push(`Row ${idx + 1}: Missing ID or Name.`);
        return;
      }
      if (profileMap.has(p.id)) {
        profileMap.set(p.id, p);
        updated++;
      } else {
        profileMap.set(p.id, p);
        added++;
      }
    });

    this.profiles = Array.from(profileMap.values());
    this.notify();
    return { success: added + updated, updated, added, errors };
  }

  public resetToDefault(): void {
    this.profiles = [...RESEARCHED_PROFILES];
    this.notify();
  }

  public exportToJson(): string {
    return JSON.stringify(this.profiles, null, 2);
  }

  public exportToCsv(): string {
    const headers = [
      'id',
      'name',
      'representativeTitle',
      'candidateClass',
      'primaryAudience',
      'gamblingConnection',
      'tierCode',
      'tierClassification',
      'harmScore',
      'harmRating',
      'riskScore',
      'riskRating',
      'financialScore',
      'financialRating',
      'monetaryValue',
      'regulatoryStatus',
      'categoryIds',
      'citationsCount',
      'fullDossierText'
    ];

    const rows = this.profiles.map((p) => {
      const escape = (str: any) => `"${String(str ?? '').replace(/"/g, '""')}"`;
      return [
        escape(p.id),
        escape(p.name),
        escape(p.representativeTitle),
        escape(p.candidateClass),
        escape(p.primaryAudience),
        escape(p.gamblingConnection),
        escape(p.tierCode),
        escape(p.tierClassification),
        p.harmScore,
        escape(p.harmRating),
        p.riskScore,
        escape(p.riskRating),
        p.financialScore,
        escape(p.financialRating),
        escape(p.monetaryValue),
        escape(p.regulatoryStatus),
        escape((p.categoryIds || []).join(';')),
        p.citations?.length || 0,
        escape(p.fullDossierText)
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }

  public parseJsonImport(jsonString: string): { valid: GameProfile[]; errors: string[] } {
    const errors: string[] = [];
    const valid: GameProfile[] = [];

    try {
      const parsed = JSON.parse(jsonString);
      const items = Array.isArray(parsed) ? parsed : [parsed];

      items.forEach((item: any, i: number) => {
        if (!item || typeof item !== 'object') {
          errors.push(`Item ${i + 1}: Not a valid JSON object.`);
          return;
        }
        if (!item.id || typeof item.id !== 'string') {
          errors.push(`Item ${i + 1}: Missing or invalid 'id'.`);
          return;
        }
        if (!item.name || typeof item.name !== 'string') {
          errors.push(`Item ${i + 1} (${item.id}): Missing or invalid 'name'.`);
          return;
        }

        const tierCode = (['T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6'].includes(item.tierCode)
          ? item.tierCode
          : 'T2') as GameProfile['tierCode'];

        const profile: GameProfile = {
          id: item.id.trim(),
          name: item.name.trim(),
          representativeTitle: item.representativeTitle || item.name,
          candidateClass: item.candidateClass || 'General Interactive Game',
          primaryAudience: item.primaryAudience || 'General Audience (13+)',
          gamblingConnection: item.gamblingConnection || 'In-game chance or currency mechanics',
          tierClassification: item.tierClassification || `Classified as ${tierCode}`,
          tierCode,
          harmScore: typeof item.harmScore === 'number' ? item.harmScore : 5,
          harmRating: item.harmRating || 'Moderate',
          riskScore: typeof item.riskScore === 'number' ? item.riskScore : 5,
          riskRating: item.riskRating || 'Moderate',
          financialScore: typeof item.financialScore === 'number' ? item.financialScore : 5,
          financialRating: item.financialRating || 'Moderate',
          monetaryValue: item.monetaryValue || 'Closed virtual ecosystem currency',
          regulatoryStatus: item.regulatoryStatus || 'Under evaluation by Australian Classification Board',
          fullDossierText: item.fullDossierText || `Academic research analysis for ${item.name}.`,
          categoryIds: Array.isArray(item.categoryIds) ? item.categoryIds : [],
          citations: Array.isArray(item.citations) ? item.citations : []
        };

        valid.push(profile);
      });
    } catch (e: any) {
      errors.push(`JSON Parse Error: ${e.message}`);
    }

    return { valid, errors };
  }

  public parseCsvImport(csvString: string): { valid: GameProfile[]; errors: string[] } {
    const errors: string[] = [];
    const valid: GameProfile[] = [];

    try {
      const lines = csvString.split(/\r?\n/).filter((l) => l.trim().length > 0);
      if (lines.length < 2) {
        errors.push('CSV must contain a header row and at least one data row.');
        return { valid, errors };
      }

      // Simple CSV row parser handling quotes
      const parseCsvLine = (line: string): string[] => {
        const result: string[] = [];
        let cur = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              cur += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (char === ',' && !inQuotes) {
            result.push(cur);
            cur = '';
          } else {
            cur += char;
          }
        }
        result.push(cur);
        return result;
      };

      const headers = parseCsvLine(lines[0]).map((h) => h.trim());
      const idIdx = headers.indexOf('id');
      const nameIdx = headers.indexOf('name');
      const tierIdx = headers.indexOf('tierCode');

      if (idIdx === -1 || nameIdx === -1) {
        errors.push('CSV header must contain at least "id" and "name" columns.');
        return { valid, errors };
      }

      for (let r = 1; r < lines.length; r++) {
        const cols = parseCsvLine(lines[r]);
        if (cols.length <= Math.max(idIdx, nameIdx)) continue;

        const id = cols[idIdx]?.trim();
        const name = cols[nameIdx]?.trim();
        if (!id || !name) {
          errors.push(`Row ${r + 1}: Missing ID or Name.`);
          continue;
        }

        const tierRaw = tierIdx >= 0 ? cols[tierIdx]?.trim() : 'T2';
        const tierCode = (['T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6'].includes(tierRaw) ? tierRaw : 'T2') as GameProfile['tierCode'];

        const getCol = (name: string, fallback = '') => {
          const idx = headers.indexOf(name);
          return idx >= 0 && cols[idx] !== undefined ? cols[idx].trim() : fallback;
        };

        const harmScore = parseInt(getCol('harmScore', '5'), 10) || 5;
        const riskScore = parseInt(getCol('riskScore', '5'), 10) || 5;
        const financialScore = parseInt(getCol('financialScore', '5'), 10) || 5;
        const categoryIdsRaw = getCol('categoryIds', '');
        const categoryIds = categoryIdsRaw ? categoryIdsRaw.split(';').map((s) => s.trim()).filter(Boolean) : [];

        valid.push({
          id,
          name,
          representativeTitle: getCol('representativeTitle', name),
          candidateClass: getCol('candidateClass', 'Interactive Media Product'),
          primaryAudience: getCol('primaryAudience', 'General Gaming Audience'),
          gamblingConnection: getCol('gamblingConnection', 'Chance and microtransaction elements'),
          tierClassification: getCol('tierClassification', `Classified under ${tierCode}`),
          tierCode,
          harmScore,
          harmRating: getCol('harmRating', harmScore >= 8 ? 'Very High' : harmScore >= 6 ? 'High' : harmScore >= 3 ? 'Moderate' : 'Low'),
          riskScore,
          riskRating: getCol('riskRating', riskScore >= 8 ? 'Very High' : riskScore >= 6 ? 'High' : riskScore >= 3 ? 'Moderate' : 'Low'),
          financialScore,
          financialRating: getCol('financialRating', financialScore >= 8 ? 'Very High' : 'Moderate'),
          monetaryValue: getCol('monetaryValue', 'Virtual currency purchase mechanics'),
          regulatoryStatus: getCol('regulatoryStatus', 'Subject to Australian Interactive Gambling Act 2001 and ACB Guidelines'),
          fullDossierText: getCol('fullDossierText', `Academic classification assessment for ${name}.`),
          categoryIds,
          citations: []
        });
      }
    } catch (err: any) {
      errors.push(`CSV Parse Error: ${err.message}`);
    }

    return { valid, errors };
  }

  // Auth state helpers
  public isAdminAuthenticated(): boolean {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  public setAdminAuthenticated(val: boolean): void {
    if (val) {
      sessionStorage.setItem(AUTH_KEY, 'true');
    } else {
      sessionStorage.removeItem(AUTH_KEY);
    }
  }

  public checkPasskey(passkey: string): boolean {
    const clean = passkey.trim().toLowerCase();
    return clean === 'ecu3101' || clean === 'cashmask2026' || clean === 'admin';
  }
}

export const dossierStore = new DossierStore();
