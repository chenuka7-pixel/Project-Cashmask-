import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  GameProfile,
  ResearchCitation,
  TAXONOMY_CATEGORIES,
  TIER_DEFINITIONS
} from '../data/taxonomyData';
import { dossierStore } from '../utils/dossierStore';
import {
  PlusCircle,
  Upload,
  Database,
  ListFilter,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Edit3,
  Copy,
  Download,
  Lock,
  Unlock,
  RefreshCw,
  Search,
  Sparkles,
  Layers,
  HelpCircle,
  Eye,
  Sliders,
  Check
} from 'lucide-react';

interface AdminPanelProps {
  onPreviewProfile?: (profile: GameProfile) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onPreviewProfile }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => dossierStore.isAdminAuthenticated());
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'entry' | 'bulk' | 'inventory' | 'neon'>('entry');

  // Dossiers from Store
  const [profiles, setProfiles] = useState<GameProfile[]>(() => dossierStore.getProfiles());

  // Subscribe to changes in Dossier Store
  useEffect(() => {
    return dossierStore.subscribe((updated) => {
      setProfiles(updated);
    });
  }, []);

  // Flash message for user feedback
  const [statusBanner, setStatusBanner] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const showBanner = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setStatusBanner({ type, message });
    setTimeout(() => setStatusBanner(null), 5000);
  };

  // -------------------------------------------------------------
  // TAB 1: SINGLE ENTRY FORM STATE
  // -------------------------------------------------------------
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formId, setFormId] = useState(() => dossierStore.getNextAvailableId());
  const [formName, setFormName] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formClass, setFormClass] = useState('');
  const [formAudience, setFormAudience] = useState('');
  const [formGamblingConn, setFormGamblingConn] = useState('');
  const [formTierCode, setFormTierCode] = useState<GameProfile['tierCode']>('T2');
  const [formTierDesc, setFormTierDesc] = useState('');
  const [formHarmScore, setFormHarmScore] = useState<number>(5);
  const [formRiskScore, setFormRiskScore] = useState<number>(5);
  const [formFinancialScore, setFormFinancialScore] = useState<number>(5);
  const [formMonetaryValue, setFormMonetaryValue] = useState('');
  const [formRegulatoryStatus, setFormRegulatoryStatus] = useState('');
  const [formFullDossier, setFormFullDossier] = useState('');
  const [formSelectedCatIds, setFormSelectedCatIds] = useState<string[]>([]);
  const [formCategorySearch, setFormCategorySearch] = useState('');
  const [formCitations, setFormCitations] = useState<ResearchCitation[]>([
    {
      text: 'Interactive Gambling Act 2001 (Cth), Part 2 Prohibited Gambling Services',
      sourceType: 'LEGAL_ACT',
      year: '2024'
    }
  ]);

  // Real-time calculation helpers for scores
  const getRating = (score: number) => {
    if (score >= 9) return 'Very High';
    if (score >= 7) return 'High';
    if (score >= 4) return 'Moderate';
    return 'Low';
  };

  // Auto-populate tier description when tier changes
  const handleSelectTier = (code: GameProfile['tierCode']) => {
    setFormTierCode(code);
    const def = TIER_DEFINITIONS[code];
    if (def) {
      setFormTierDesc(`${def.title}: ${def.fullDesc}`);
    }
  };

  // Reset form to blank creation mode
  const resetForm = () => {
    const nextId = dossierStore.getNextAvailableId();
    setFormMode('create');
    setFormId(nextId);
    setFormName('');
    setFormTitle('');
    setFormClass('');
    setFormAudience('Adolescent & Young Adult Gamers (Ages 13+)');
    setFormGamblingConn('In-game chance mechanisms and microtransaction routes');
    setFormTierCode('T2');
    setFormTierDesc(TIER_DEFINITIONS['T2'].fullDesc);
    setFormHarmScore(5);
    setFormRiskScore(5);
    setFormFinancialScore(5);
    setFormMonetaryValue('Virtual currency with platform-locked utility');
    setFormRegulatoryStatus('Compliant with minimum Australian Classification M-rating requirement for paid loot');
    setFormFullDossier(`### Executive Summary\nAnalysis of game economy and socio-technical risk vectors.\n\n### Primary Mechanism of Financial Extraction\nDetails regarding in-game monetization, virtual items, and variable-ratio reward schedules.\n\n### Socio-Technical Vulnerability Analysis\nPsychological triggers, dark patterns, and peer dynamics affecting participants.\n\n### Australian Regulatory Context\nEvaluation under the Interactive Gambling Act 2001 (Cth) and Australian Classification Board mandates.`);
    setFormSelectedCatIds([]);
    setFormCitations([
      {
        text: 'Australian Classification Board Guidelines for Video Games (2024 Amendment)',
        sourceType: 'LEGAL_ACT',
        year: '2024'
      }
    ]);
  };

  // Populate form with existing profile for editing
  const handleEditProfile = (profile: GameProfile) => {
    setFormMode('edit');
    setFormId(profile.id);
    setFormName(profile.name);
    setFormTitle(profile.representativeTitle);
    setFormClass(profile.candidateClass);
    setFormAudience(profile.primaryAudience);
    setFormGamblingConn(profile.gamblingConnection);
    setFormTierCode(profile.tierCode);
    setFormTierDesc(profile.tierClassification);
    setFormHarmScore(profile.harmScore);
    setFormRiskScore(profile.riskScore);
    setFormFinancialScore(profile.financialScore);
    setFormMonetaryValue(profile.monetaryValue);
    setFormRegulatoryStatus(profile.regulatoryStatus);
    setFormFullDossier(profile.fullDossierText);
    setFormSelectedCatIds([...(profile.categoryIds || [])]);
    setFormCitations(profile.citations?.length ? [...profile.citations] : []);
    setActiveTab('entry');
    showBanner(`Loaded profile ${profile.id} (${profile.name}) into editor.`, 'info');
  };

  // Save profile from Form
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formId.trim() || !formName.trim()) {
      showBanner('Please provide at least a Profile ID and Game Name.', 'error');
      return;
    }

    const newProfile: GameProfile = {
      id: formId.trim().toUpperCase(),
      name: formName.trim(),
      representativeTitle: formTitle.trim() || formName.trim(),
      candidateClass: formClass.trim() || 'Interactive Entertainment Product',
      primaryAudience: formAudience.trim() || 'General Audience',
      gamblingConnection: formGamblingConn.trim() || 'In-game virtual chance mechanisms',
      tierClassification: formTierDesc.trim() || `Classified under ${formTierCode}`,
      tierCode: formTierCode,
      harmScore: formHarmScore,
      harmRating: getRating(formHarmScore),
      riskScore: formRiskScore,
      riskRating: getRating(formRiskScore),
      financialScore: formFinancialScore,
      financialRating: getRating(formFinancialScore),
      monetaryValue: formMonetaryValue.trim() || 'Virtual in-game currency',
      regulatoryStatus: formRegulatoryStatus.trim() || 'Evaluated under Australian Classification Board guidelines',
      fullDossierText: formFullDossier.trim(),
      categoryIds: formSelectedCatIds,
      citations: formCitations.filter((c) => c.text.trim().length > 0)
    };

    const result = dossierStore.saveProfile(newProfile);
    if (result.success) {
      showBanner(result.message, 'success');
      if (formMode === 'create') {
        resetForm();
      }
    } else {
      showBanner(result.message, 'error');
    }
  };

  // Toggle category branch selection
  const toggleCategory = (catId: string) => {
    setFormSelectedCatIds((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  // Citation helpers
  const handleAddCitation = () => {
    setFormCitations((prev) => [
      ...prev,
      { text: '', sourceType: 'ACADEMIC_STUDY', year: new Date().getFullYear().toString() }
    ]);
  };

  const handleUpdateCitation = (index: number, field: keyof ResearchCitation, val: string) => {
    setFormCitations((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const handleRemoveCitation = (index: number) => {
    setFormCitations((prev) => prev.filter((_, i) => i !== index));
  };

  // -------------------------------------------------------------
  // TAB 2: BULK INGESTION STATE
  // -------------------------------------------------------------
  const [bulkInputText, setBulkInputText] = useState('');
  const [bulkFormat, setBulkFormat] = useState<'json' | 'csv'>('json');
  const [bulkMode, setBulkMode] = useState<'merge' | 'replace'>('merge');
  const [parsedBatch, setParsedBatch] = useState<GameProfile[]>([]);
  const [bulkValidationErrors, setBulkValidationErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validate on input change
  const handleValidateBulk = () => {
    if (!bulkInputText.trim()) {
      setParsedBatch([]);
      setBulkValidationErrors(['Please paste or upload JSON or CSV text to validate.']);
      return;
    }

    if (bulkFormat === 'json') {
      const { valid, errors } = dossierStore.parseJsonImport(bulkInputText);
      setParsedBatch(valid);
      setBulkValidationErrors(errors);
    } else {
      const { valid, errors } = dossierStore.parseCsvImport(bulkInputText);
      setParsedBatch(valid);
      setBulkValidationErrors(errors);
    }
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setBulkInputText(content);
      if (file.name.endsWith('.csv')) {
        setBulkFormat('csv');
      } else {
        setBulkFormat('json');
      }
      showBanner(`Loaded file: ${file.name} (${(file.size / 1024).toFixed(1)} KB). Click 'Validate Batch' to preview.`, 'info');
    };
    reader.readAsText(file);
  };

  // Commit bulk import
  const handleCommitBulkImport = () => {
    if (parsedBatch.length === 0) {
      showBanner('No validated profiles to import. Please validate your data first.', 'error');
      return;
    }

    if (bulkMode === 'replace') {
      const confirmReplace = window.confirm(
        `CAUTION: 'Clean Replace' will overwrite the current ${profiles.length} profiles with the ${parsedBatch.length} uploaded profiles. Continue?`
      );
      if (!confirmReplace) return;
    }

    const res = dossierStore.bulkImport(parsedBatch, bulkMode);
    if (res.errors.length > 0) {
      showBanner(`Import finished with warnings: ${res.added} added, ${res.updated} updated. ${res.errors.length} errors.`, 'error');
    } else {
      showBanner(`Successfully committed batch! ${res.added} profiles created, ${res.updated} updated. Total now: ${dossierStore.getProfiles().length}.`, 'success');
      setBulkInputText('');
      setParsedBatch([]);
      setActiveTab('inventory');
    }
  };

  // Pre-fill sample datasets (e.g., Roblox, Fortnite, Stake)
  const handleLoadSampleDataset = () => {
    const sampleProfiles: GameProfile[] = [
      {
        id: 'G047',
        name: 'Roblox (Robux Economy & Experiences)',
        representativeTitle: 'Roblox Corporation - User-Generated Games & Developer Exchange',
        candidateClass: 'Sandbox Metaverse & In-Game Creator Economy',
        primaryAudience: 'Children, Adolescents & Young Adults (Ages 7-24)',
        gamblingConnection: 'Player-created simulated casino experiences, unrated virtual loot boxes, external third-party Robux skin-gambling sites.',
        tierClassification: 'T4: Token-Mediated Cash-Out & T2: Variable Draw',
        tierCode: 'T4',
        harmScore: 7,
        harmRating: 'High',
        riskScore: 8,
        riskRating: 'High',
        financialScore: 8,
        financialRating: 'High',
        monetaryValue: 'Robux (R$): 1,000 R$ ≈ $12.50 AUD. Developer Exchange (DevEx) allows verified creators to cash out at 50,000 R$ threshold.',
        regulatoryStatus: 'Under ACMA scrutiny; Australian Classification Board 2024 mandates require minimum M rating for paid in-game chance elements.',
        fullDossierText: `### Executive Summary\nRoblox operates a massive dual-sided micro-economy. Players purchase Robux using fiat currency to spend on virtual items, passes, and variable-ratio chance rewards across millions of user-generated experiences.\n\n### Primary Extraction Mechanism\nRobux operates as a closed intermediate currency with high emotional saliency among youths. While Roblox officially prohibits off-site trading, third-party black-market exchanges and offshore gambling rings frequently utilize Robux as wager collateral.\n\n### Socio-Technical Vulnerability\nYoung players face pervasive peer pressure, cosmetic status competitions, and lack cognitive defenses against deceptive game loops.\n\n### Regulatory Assessment\nFalls squarely across the T4 (Token-Mediated Cash-Out) boundary via DevEx, with predatory secondary vectors.`,
        categoryIds: ['cat-teenager', 'cat-children', 'cat-mobile', 'cat-gacha'],
        citations: [
          { text: 'FTC Consumer Protection Inquiries on Child-Targeted Microtransactions (2024)', sourceType: 'LEGAL_ACT', year: '2024' },
          { text: 'Australian Classification Board Guidelines for Video Games (2024)', sourceType: 'REGULATOR_ACMA', year: '2024' }
        ]
      },
      {
        id: 'G048',
        name: 'Fortnite (Epic Games V-Bucks)',
        representativeTitle: 'Epic Games - Battle Royale & Virtual Cosmetic Ecosystem',
        candidateClass: 'Online Competitive Battle Royale & Metaverse',
        primaryAudience: 'Children, Teenagers & Young Adults (Ages 10-25)',
        gamblingConnection: 'Direct cosmetic storefront, past random Loot Llamas (settled), current rotating scarcity mechanics with artificial urgency.',
        tierClassification: 'T1: Closed-Loop Direct Purchase',
        tierCode: 'T1',
        harmScore: 4,
        harmRating: 'Moderate',
        riskScore: 4,
        riskRating: 'Moderate',
        financialScore: 3,
        financialRating: 'Low',
        monetaryValue: 'V-Bucks: 1,000 V-Bucks ≈ $11.95 AUD. Strictly closed-loop; no official or developer cash-out route.',
        regulatoryStatus: 'Epic Games settled FTC complaint in 2022 ($520M) regarding accidental child purchases; Loot Llamas discontinued in favor of transparent purchases.',
        fullDossierText: `### Executive Summary\nFortnite retired randomized blind-box Loot Llamas following regulatory pushback, transitioning to a closed-loop direct cosmetic store.\n\n### Primary Extraction Mechanism\nRotating daily item shop, Battle Passes, and licensed intellectual property cosmetics (Marvel, Disney, Anime).\n\n### Socio-Technical Vulnerability\nFear of Missing Out (FOMO) driven by ephemeral cosmetic rotations and playground social hierarchy.\n\n### Regulatory Assessment\nCategorized as T1 (Closed-Loop Direct Purchase) with moderate psychological pressure but zero cash realisability.`,
        categoryIds: ['cat-teenager', 'cat-children', 'cat-fps-games'],
        citations: [
          { text: 'Federal Trade Commission v. Epic Games, Inc., Order Granting Settlement (2022)', sourceType: 'LITIGATION', year: '2022' }
        ]
      }
    ];

    setBulkInputText(JSON.stringify(sampleProfiles, null, 2));
    setBulkFormat('json');
    setParsedBatch(sampleProfiles);
    setBulkValidationErrors([]);
    showBanner('Loaded sample template for Roblox (G047) and Fortnite (G048). Click "Commit Import" to add them.', 'info');
  };

  // Download export helpers
  const handleDownloadExport = (type: 'json' | 'csv') => {
    const data = type === 'json' ? dossierStore.exportToJson() : dossierStore.exportToCsv();
    const mime = type === 'json' ? 'application/json' : 'text/csv';
    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cashmask_dossiers_export_${new Date().toISOString().slice(0, 10)}.${type}`;
    a.click();
    URL.revokeObjectURL(url);
    showBanner(`Exported active research database as ${type.toUpperCase()}.`, 'success');
  };

  // -------------------------------------------------------------
  // TAB 3: INVENTORY STATE & FILTERS
  // -------------------------------------------------------------
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryTierFilter, setInventoryTierFilter] = useState('ALL');
  const [inventorySort, setInventorySort] = useState<'id' | 'name' | 'harm' | 'tier'>('id');

  const filteredInventory = useMemo(() => {
    return profiles.filter((p) => {
      if (inventoryTierFilter !== 'ALL' && p.tierCode !== inventoryTierFilter) return false;
      if (inventorySearch.trim()) {
        const q = inventorySearch.toLowerCase();
        return (
          p.id.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.representativeTitle.toLowerCase().includes(q) ||
          p.candidateClass.toLowerCase().includes(q) ||
          p.tierClassification.toLowerCase().includes(q)
        );
      }
      return true;
    }).sort((a, b) => {
      if (inventorySort === 'harm') return b.harmScore - a.harmScore;
      if (inventorySort === 'name') return a.name.localeCompare(b.name);
      if (inventorySort === 'tier') return a.tierCode.localeCompare(b.tierCode);
      return a.id.localeCompare(b.id, undefined, { numeric: true });
    });
  }, [profiles, inventorySearch, inventoryTierFilter, inventorySort]);

  // Delete profile
  const handleDeleteProfile = (id: string, name: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete profile ${id} (${name})?`);
    if (!confirmDelete) return;
    const res = dossierStore.deleteProfile(id);
    if (res.success) {
      showBanner(res.message, 'success');
    }
  };

  // Duplicate profile
  const handleDuplicateProfile = (id: string) => {
    const copy = dossierStore.duplicateProfile(id);
    if (copy) {
      showBanner(`Duplicated ${id} into new profile ${copy.id}.`, 'success');
      handleEditProfile(copy);
    }
  };

  // Reset to default
  const handleResetToDefault = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset the database to the 7 core seed profiles? All unexported custom additions will be cleared.'
    );
    if (!confirmReset) return;
    dossierStore.resetToDefault();
    showBanner('Reset database to default CSG3101 seed dataset.', 'info');
  };

  // Filter category branches for multi-select
  const filteredCategories = useMemo(() => {
    if (!formCategorySearch.trim()) return TAXONOMY_CATEGORIES;
    const q = formCategorySearch.toLowerCase();
    return TAXONOMY_CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    );
  }, [formCategorySearch]);

  // Generate Neon SQL statements for Tab 4
  const generatedSql = useMemo(() => {
    const escapeSql = (str: string) => (str ? str.replace(/'/g, "''") : '');
    const lines = [
      '-- CASHMASK ACADEMIC DOSSIER DATABASE SEED (ECU CSG3101)',
      `-- Generated on ${new Date().toISOString()}`,
      `-- Total Classified Profiles: ${profiles.length}\n`,
      'BEGIN;\n'
    ];

    profiles.forEach((p) => {
      lines.push(`-- Profile ${p.id}: ${escapeSql(p.name)}`);
      lines.push(`INSERT INTO game_profiles (`);
      lines.push(`  id, name, representative_title, candidate_class, primary_audience, gambling_connection,`);
      lines.push(`  tier_classification, tier_code, harm_score, harm_rating, risk_score, risk_rating,`);
      lines.push(`  financial_score, financial_rating, monetary_value, regulatory_status, full_dossier_text`);
      lines.push(`) VALUES (`);
      lines.push(`  '${p.id}',`);
      lines.push(`  '${escapeSql(p.name)}',`);
      lines.push(`  '${escapeSql(p.representativeTitle)}',`);
      lines.push(`  '${escapeSql(p.candidateClass)}',`);
      lines.push(`  '${escapeSql(p.primaryAudience)}',`);
      lines.push(`  '${escapeSql(p.gamblingConnection)}',`);
      lines.push(`  '${escapeSql(p.tierClassification)}',`);
      lines.push(`  '${p.tierCode}',`);
      lines.push(`  ${p.harmScore}, '${p.harmRating}',`);
      lines.push(`  ${p.riskScore}, '${p.riskRating}',`);
      lines.push(`  ${p.financialScore}, '${p.financialRating}',`);
      lines.push(`  '${escapeSql(p.monetaryValue)}',`);
      lines.push(`  '${escapeSql(p.regulatoryStatus)}',`);
      lines.push(`  '${escapeSql(p.fullDossierText)}'`);
      lines.push(`) ON CONFLICT (id) DO UPDATE SET`);
      lines.push(`  name = EXCLUDED.name, representative_title = EXCLUDED.representative_title,`);
      lines.push(`  tier_code = EXCLUDED.tier_code, harm_score = EXCLUDED.harm_score,`);
      lines.push(`  full_dossier_text = EXCLUDED.full_dossier_text;\n`);

      if (p.categoryIds && p.categoryIds.length > 0) {
        lines.push(`-- Category Mappings for ${p.id}`);
        p.categoryIds.forEach((catId) => {
          lines.push(`INSERT INTO profile_taxonomy_mapping (profile_id, category_id) VALUES ('${p.id}', '${catId}') ON CONFLICT DO NOTHING;`);
        });
        lines.push('');
      }

      if (p.citations && p.citations.length > 0) {
        lines.push(`-- Citations for ${p.id}`);
        p.citations.forEach((c) => {
          lines.push(`INSERT INTO research_citations (profile_id, citation_text, source_type, year) VALUES ('${p.id}', '${escapeSql(c.text)}', '${c.sourceType}', '${c.year}');`);
        });
        lines.push('');
      }
    });

    lines.push('COMMIT;');
    return lines.join('\n');
  }, [profiles]);

  // -------------------------------------------------------------
  // AUTHENTICATION VIEW (IF NOT LOGGED IN)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (dossierStore.checkPasskey(passkeyInput)) {
        dossierStore.setAdminAuthenticated(true);
        setIsAuthenticated(true);
        setAuthError('');
        showBanner('Access Granted. Welcome to the CASHMASK Ingestion Console.', 'success');
      } else {
        setAuthError('Invalid academic key. Please check your credentials.');
      }
    };

    return (
      <div style={{
        maxWidth: '680px',
        margin: '60px auto',
        padding: '36px',
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 20px 45px rgba(9, 51, 38, 0.12)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, #093326 0%, #064e3b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          color: '#34d399',
          boxShadow: '0 4px 14px rgba(9, 51, 38, 0.25)'
        }}>
          <Lock size={32} />
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: '#ecfdf5',
          color: '#065f46',
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '4px 12px',
          borderRadius: '20px',
          marginBottom: '12px'
        }}>
          <span>ECU CSG3101 RESEARCH CONSOLE</span>
        </div>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#093326', marginBottom: '8px' }}>
          Researcher Ingestion & Classification Portal
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', maxWidth: '500px', margin: '0 auto 28px', lineHeight: 1.5 }}>
          Restricted administrative interface for authoring game dossiers, mapping taxonomy branches, and ingesting bulk datasets into the CASHMASK database.
        </p>

        <form onSubmit={handleLogin} style={{ maxWidth: '420px', margin: '0 auto' }}>
          <div style={{ marginBottom: '16px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Academic Access Passkey
            </label>
            <input
              type="password"
              value={passkeyInput}
              onChange={(e) => setPasskeyInput(e.target.value)}
              placeholder="Enter research passkey..."
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1px solid #d1d5db',
                fontSize: '0.95rem',
                outline: 'none',
                background: '#f9fafb',
                transition: 'border 0.2s'
              }}
              autoFocus
            />
            {authError && (
              <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '6px', fontWeight: 600 }}>
                {authError}
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              background: '#093326',
              color: '#ffffff',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(9, 51, 38, 0.2)'
            }}
          >
            <Unlock size={18} />
            <span>Unlock Admin Console</span>
          </button>
        </form>

        <div style={{
          marginTop: '28px',
          padding: '14px',
          background: '#f8fafc',
          borderRadius: '12px',
          fontSize: '0.8rem',
          color: '#64748b',
          border: '1px dashed #cbd5e1'
        }}>
          <strong>Evaluation Key:</strong> <code>ecu3101</code> or <code>cashmask2026</code>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN CONSOLE
  // -------------------------------------------------------------
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '24px',
      border: '1px solid rgba(0,0,0,0.08)',
      boxShadow: 'var(--shadow-card)',
      padding: '28px',
      marginBottom: '40px'
    }}>
      {/* Top Banner / Notification */}
      {statusBanner && (
        <div style={{
          padding: '12px 18px',
          borderRadius: '12px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.875rem',
          fontWeight: 600,
          background: statusBanner.type === 'success' ? '#ecfdf5' : statusBanner.type === 'error' ? '#fef2f2' : '#eff6ff',
          color: statusBanner.type === 'success' ? '#065f46' : statusBanner.type === 'error' ? '#991b1b' : '#1e40af',
          border: `1px solid ${statusBanner.type === 'success' ? '#a7f3d0' : statusBanner.type === 'error' ? '#fecaca' : '#bfdbfe'}`
        }}>
          {statusBanner.type === 'success' ? <CheckCircle2 size={18} /> : statusBanner.type === 'error' ? <AlertCircle size={18} /> : <HelpCircle size={18} />}
          <span>{statusBanner.message}</span>
        </div>
      )}

      {/* Admin Header with Metadata & Export Quick Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '20px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              background: '#093326',
              color: '#34d399',
              fontSize: '0.7rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: '6px',
              letterSpacing: '0.04em'
            }}>
              RESEARCH WORKSPACE
            </span>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
              ECU CSG3101 Socio-Technical Classification
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#093326', letterSpacing: '-0.02em', margin: 0 }}>
            Dossier & Data Ingestion Console
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '4px', margin: 0 }}>
            Input single dossiers, batch ingest hundreds of games via JSON/CSV, map taxonomy branches, and sync with Neon Postgres.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleDownloadExport('json')}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download size={14} />
            <span>Export JSON</span>
          </button>
          <button
            onClick={() => handleDownloadExport('csv')}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleResetToDefault}
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#991b1b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Reset to 7 base seed dossiers"
          >
            <RefreshCw size={14} />
            <span>Reset Seed</span>
          </button>
          <button
            onClick={() => {
              dossierStore.setAdminAuthenticated(false);
              setIsAuthenticated(false);
            }}
            style={{
              background: '#093326',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Lock size={14} />
            <span>Exit Admin</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>TOTAL PROFILES</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#093326' }}>{profiles.length}</div>
          <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600 }}>Active in Application</div>
        </div>

        <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>TIER T6 PROFILES</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#ef4444' }}>
            {profiles.filter((p) => p.tierCode === 'T6').length}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Unlicensed Wagering</div>
        </div>

        <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>TIER T2 - T4 (LOOT/CONVERT)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f59e0b' }}>
            {profiles.filter((p) => ['T2', 'T3', 'T4'].includes(p.tierCode)).length}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Convertible & Chance</div>
        </div>

        <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>TAXONOMY BRANCHES</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0d9488' }}>
            {TAXONOMY_CATEGORIES.length}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>UP & DOWN Axes</div>
        </div>

        <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>STORAGE SUBSYSTEM</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46', marginTop: '4px' }}>
            Persisted Local
          </div>
          <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>0ms Sync Active</div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '2px solid #e2e8f0',
        marginBottom: '28px',
        gap: '4px'
      }}>
        <button
          onClick={() => setActiveTab('entry')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 20px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: activeTab === 'entry' ? '#093326' : '#64748b',
            borderBottom: activeTab === 'entry' ? '3px solid #093326' : '3px solid transparent',
            marginBottom: '-2px'
          }}
        >
          <PlusCircle size={16} />
          <span>Single Dossier Input & Editor</span>
          {formMode === 'edit' && (
            <span style={{ background: '#fef3c7', color: '#92400e', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px' }}>
              EDITING {formId}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('bulk')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 20px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: activeTab === 'bulk' ? '#093326' : '#64748b',
            borderBottom: activeTab === 'bulk' ? '3px solid #093326' : '3px solid transparent',
            marginBottom: '-2px'
          }}
        >
          <Upload size={16} />
          <span>Bulk Batch Ingestion (JSON / CSV)</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 20px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: activeTab === 'inventory' ? '#093326' : '#64748b',
            borderBottom: activeTab === 'inventory' ? '3px solid #093326' : '3px solid transparent',
            marginBottom: '-2px'
          }}
        >
          <ListFilter size={16} />
          <span>Dossier Inventory ({profiles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('neon')}
          style={{
            background: 'none',
            border: 'none',
            padding: '12px 20px',
            fontSize: '0.9rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: activeTab === 'neon' ? '#093326' : '#64748b',
            borderBottom: activeTab === 'neon' ? '3px solid #093326' : '3px solid transparent',
            marginBottom: '-2px'
          }}
        >
          <Database size={16} />
          <span>Neon Postgres & Schema</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: SINGLE DOSSIER ENTRY & EDITOR                      */}
      {/* ========================================================= */}
      {activeTab === 'entry' && (
        <form onSubmit={handleSaveProfile}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#f8fafc',
            padding: '14px 20px',
            borderRadius: '14px',
            marginBottom: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#093326', textTransform: 'uppercase' }}>
                {formMode === 'create' ? 'Creating New Research Dossier' : `Editing Dossier: ${formId}`}
              </span>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                Fill in the classification fields. Changes immediately propagate across the web application and taxonomy blueprint.
              </p>
            </div>
            {formMode === 'edit' && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                Cancel Edit / Switch to New
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            {/* Field: ID */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Profile ID * (e.g. G047, G048)
              </label>
              <input
                type="text"
                value={formId}
                onChange={(e) => setFormId(e.target.value.toUpperCase())}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  outline: 'none'
                }}
              />
            </div>

            {/* Field: Name */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Game / Platform Common Name *
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Roblox, Fortnite, CS:GO Luck"
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Field: Representative Title */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Representative Title & Operator Entity
              </label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Roblox Corporation - User-Generated Sandbox Experiences"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Field: Candidate Class */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Candidate Class / Platform Category
              </label>
              <input
                type="text"
                value={formClass}
                onChange={(e) => setFormClass(e.target.value)}
                placeholder="e.g. User-Generated Sandbox / Creator Economy"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Field: Primary Audience */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Primary Demographic & Audience
              </label>
              <input
                type="text"
                value={formAudience}
                onChange={(e) => setFormAudience(e.target.value)}
                placeholder="e.g. Children & Adolescents (Ages 7-18)"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Field: Gambling Connection */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                Gambling Connection / Harm Vectors
              </label>
              <input
                type="text"
                value={formGamblingConn}
                onChange={(e) => setFormGamblingConn(e.target.value)}
                placeholder="e.g. Virtual casino minigames, randomized reward chests, off-site wagering"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Section: CASH REALISABILITY TIER SELECTOR */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#093326', marginBottom: '8px' }}>
              Cash Realisability Tier (T0 – T6 Operative Axis) *
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
              gap: '10px'
            }}>
              {(Object.keys(TIER_DEFINITIONS) as GameProfile['tierCode'][]).map((tierKey) => {
                const def = TIER_DEFINITIONS[tierKey];
                const isSelected = formTierCode === tierKey;
                return (
                  <div
                    key={tierKey}
                    onClick={() => handleSelectTier(tierKey)}
                    style={{
                      border: `2px solid ${isSelected ? def.color : '#e2e8f0'}`,
                      background: isSelected ? `${def.color}10` : '#ffffff',
                      borderRadius: '12px',
                      padding: '12px 10px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{
                      display: 'inline-block',
                      background: def.color,
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px',
                      marginBottom: '4px'
                    }}>
                      {tierKey}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.2 }}>
                      {def.title}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '4px' }}>
                      {def.shortDesc}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '10px' }}>
              <input
                type="text"
                value={formTierDesc}
                onChange={(e) => setFormTierDesc(e.target.value)}
                placeholder="Detailed tier classification descriptor..."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.8rem',
                  outline: 'none',
                  background: '#f8fafc'
                }}
              />
            </div>
          </div>

          {/* Section: HARM & RISK METRICS (SLIDERS) */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sliders size={18} color="#093326" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#093326', margin: 0 }}>
                Harm, Vulnerability & Financial Realisability Metrics
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {/* Harm Score Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                    Harm Score (0-10)
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: formHarmScore >= 8 ? '#fecaca' : formHarmScore >= 6 ? '#fed7aa' : '#d1fae5',
                    color: formHarmScore >= 8 ? '#991b1b' : formHarmScore >= 6 ? '#9a3412' : '#065f46'
                  }}>
                    {formHarmScore}/10 • {getRating(formHarmScore)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formHarmScore}
                  onChange={(e) => setFormHarmScore(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: formHarmScore >= 8 ? '#ef4444' : formHarmScore >= 6 ? '#ea580c' : '#10b981' }}
                />
              </div>

              {/* Risk Score Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                    Risk Score (0-10)
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: formRiskScore >= 8 ? '#fecaca' : formRiskScore >= 6 ? '#fed7aa' : '#d1fae5',
                    color: formRiskScore >= 8 ? '#991b1b' : formRiskScore >= 6 ? '#9a3412' : '#065f46'
                  }}>
                    {formRiskScore}/10 • {getRating(formRiskScore)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formRiskScore}
                  onChange={(e) => setFormRiskScore(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: formRiskScore >= 8 ? '#ef4444' : formRiskScore >= 6 ? '#ea580c' : '#10b981' }}
                />
              </div>

              {/* Financial Realisability Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                    Financial Realisability (0-10)
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: formFinancialScore >= 8 ? '#fecaca' : formFinancialScore >= 6 ? '#fed7aa' : '#d1fae5',
                    color: formFinancialScore >= 8 ? '#991b1b' : formFinancialScore >= 6 ? '#9a3412' : '#065f46'
                  }}>
                    {formFinancialScore}/10 • {getRating(formFinancialScore)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formFinancialScore}
                  onChange={(e) => setFormFinancialScore(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: formFinancialScore >= 8 ? '#ef4444' : formFinancialScore >= 6 ? '#ea580c' : '#10b981' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginTop: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Monetary Value / Token Liquidity Mechanics
                </label>
                <input
                  type="text"
                  value={formMonetaryValue}
                  onChange={(e) => setFormMonetaryValue(e.target.value)}
                  placeholder="e.g. In-game currency with fiat cash-out threshold"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8rem',
                    outline: 'none',
                    background: '#ffffff'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Australian Regulatory Status & Legal Enforcement
                </label>
                <input
                  type="text"
                  value={formRegulatoryStatus}
                  onChange={(e) => setFormRegulatoryStatus(e.target.value)}
                  placeholder="e.g. ACMA review / Australian Classification Board M-rating requirement"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8rem',
                    outline: 'none',
                    background: '#ffffff'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section: TAXONOMY CATEGORY JUNCTION MAPPING (ALL 40 BRANCHES) */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} color="#093326" />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#093326', margin: 0 }}>
                    Taxonomy Blueprint Category Mapping ({formSelectedCatIds.length} Selected)
                  </h3>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0' }}>
                  Select the taxonomy categories this game maps to. This drives the interactive diagram and category drawers.
                </p>
              </div>

              <div style={{ width: '220px' }}>
                <input
                  type="text"
                  value={formCategorySearch}
                  onChange={(e) => setFormCategorySearch(e.target.value)}
                  placeholder="Filter categories..."
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.75rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              maxHeight: '220px',
              overflowY: 'auto',
              padding: '8px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0'
            }}>
              {filteredCategories.map((cat) => {
                const isSelected = formSelectedCatIds.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    style={{
                      background: isSelected ? '#093326' : '#ffffff',
                      color: isSelected ? '#34d399' : '#334155',
                      border: `1px solid ${isSelected ? '#093326' : '#cbd5e1'}`,
                      borderRadius: '8px',
                      padding: '4px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'all 0.1s'
                    }}
                  >
                    {isSelected ? <Check size={12} /> : null}
                    <span>{cat.name}</span>
                    <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>
                      ({cat.direction})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: RESEARCH CITATIONS */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '28px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#093326', margin: 0 }}>
                  Academic Citations & Legal Precedents ({formCitations.length})
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '2px 0 0' }}>
                  Grounds the dossier in peer-reviewed literature, ACMA rulings, or statutory acts.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddCitation}
                style={{
                  background: '#f1f5f9',
                  border: '1px solid #cbd5e1',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <PlusCircle size={14} />
                <span>Add Citation</span>
              </button>
            </div>

            {formCitations.map((cit, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginBottom: '10px',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
                <input
                  type="text"
                  value={cit.text}
                  onChange={(e) => handleUpdateCitation(idx, 'text', e.target.value)}
                  placeholder="Citation description (e.g. Interactive Gambling Act 2001, s 15)"
                  style={{
                    flex: '1 1 300px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8rem',
                    outline: 'none'
                  }}
                />
                <select
                  value={cit.sourceType}
                  onChange={(e) => handleUpdateCitation(idx, 'sourceType', e.target.value)}
                  style={{
                    width: '150px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.75rem',
                    outline: 'none',
                    background: '#f8fafc'
                  }}
                >
                  <option value="LEGAL_ACT">Legal Statute</option>
                  <option value="REGULATOR_ACMA">Regulator / ACMA</option>
                  <option value="ACADEMIC_STUDY">Academic Paper</option>
                  <option value="LITIGATION">Court Litigation</option>
                  <option value="REVIEW">Industry Review</option>
                </select>
                <input
                  type="text"
                  value={cit.year}
                  onChange={(e) => handleUpdateCitation(idx, 'year', e.target.value)}
                  placeholder="Year"
                  style={{
                    width: '70px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.75rem',
                    outline: 'none',
                    textAlign: 'center'
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveCitation(idx)}
                  style={{
                    background: '#fee2e2',
                    border: 'none',
                    color: '#b91c1c',
                    padding: '8px',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  title="Remove citation"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Section: FULL ACADEMIC DOSSIER MARKDOWN TEXTAREA */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: '#093326', marginBottom: '6px' }}>
              Full Academic Research Dossier (Markdown Format) *
            </label>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '8px' }}>
              Supports markdown headings (###), bullet points, and citations for display inside the Dossier Drawer.
            </p>
            <textarea
              value={formFullDossier}
              onChange={(e) => setFormFullDossier(e.target.value)}
              rows={12}
              required
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                lineHeight: 1.5,
                outline: 'none',
                background: '#fafafa'
              }}
            />
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              type="submit"
              style={{
                background: '#093326',
                color: '#ffffff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(9, 51, 38, 0.2)'
              }}
            >
              <CheckCircle2 size={18} />
              <span>{formMode === 'create' ? 'Save New Game Dossier' : `Update Dossier ${formId}`}</span>
            </button>

            <button
              type="button"
              onClick={resetForm}
              style={{
                background: '#f1f5f9',
                color: '#475569',
                border: '1px solid #cbd5e1',
                padding: '12px 20px',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reset Form
            </button>
          </div>
        </form>
      )}

      {/* ========================================================= */}
      {/* TAB 2: BULK DATA INGESTION (JSON / CSV BATCH)             */}
      {/* ========================================================= */}
      {activeTab === 'bulk' && (
        <div>
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#093326', margin: 0 }}>
                  Batch Ingestion Engine for 100s of Games
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px', maxWidth: '650px', lineHeight: 1.5 }}>
                  Paste or upload JSON arrays or CSV files to quickly import research datasets. The engine performs strict pre-flight validation before committing to the database.
                </p>
              </div>

              {/* Sample loader & template downloads */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleLoadSampleDataset}
                  style={{
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    color: '#065f46',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles size={14} />
                  <span>Load Sample (Roblox & Fortnite)</span>
                </button>
              </div>
            </div>

            {/* Ingestion Controls */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginRight: '8px' }}>Format:</span>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, marginRight: '12px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="bulkFormat"
                    value="json"
                    checked={bulkFormat === 'json'}
                    onChange={() => setBulkFormat('json')}
                    style={{ marginRight: '4px' }}
                  />
                  JSON
                </label>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="bulkFormat"
                    value="csv"
                    checked={bulkFormat === 'csv'}
                    onChange={() => setBulkFormat('csv')}
                    style={{ marginRight: '4px' }}
                  />
                  CSV
                </label>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginRight: '8px' }}>Import Mode:</span>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, marginRight: '12px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="bulkMode"
                    value="merge"
                    checked={bulkMode === 'merge'}
                    onChange={() => setBulkMode('merge')}
                    style={{ marginRight: '4px' }}
                  />
                  Merge & Update (Retain existing)
                </label>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#b91c1c', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="bulkMode"
                    value="replace"
                    checked={bulkMode === 'replace'}
                    onChange={() => setBulkMode('replace')}
                    style={{ marginRight: '4px' }}
                  />
                  Clean Replace (Overwrite all)
                </label>
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".json,.csv"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#334155',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Upload size={14} />
                  <span>Upload File (.json / .csv)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Text Area */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
              Paste Raw {bulkFormat.toUpperCase()} Data
            </label>
            <textarea
              value={bulkInputText}
              onChange={(e) => setBulkInputText(e.target.value)}
              rows={10}
              placeholder={bulkFormat === 'json' ? '[{\n  "id": "G047",\n  "name": "Roblox",\n  "tierCode": "T4",\n  "harmScore": 7\n}]' : 'id,name,representativeTitle,tierCode,harmScore\nG047,"Roblox","Roblox Corp","T4",7'}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.8rem',
                fontFamily: 'monospace',
                outline: 'none',
                background: '#fafafa'
              }}
            />
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button
              type="button"
              onClick={handleValidateBulk}
              style={{
                background: '#093326',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <CheckCircle2 size={16} />
              <span>Validate Batch</span>
            </button>

            {parsedBatch.length > 0 && (
              <button
                type="button"
                onClick={handleCommitBulkImport}
                style={{
                  background: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                }}
              >
                <Upload size={16} />
                <span>Commit Import ({parsedBatch.length} Profiles)</span>
              </button>
            )}
          </div>

          {/* Validation Report & Table Preview */}
          {bulkValidationErrors.length > 0 && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              padding: '14px',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <div style={{ fontWeight: 700, color: '#991b1b', fontSize: '0.85rem', marginBottom: '6px' }}>
                Validation Issues Detected:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.8rem', color: '#b91c1c' }}>
                {bulkValidationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {parsedBatch.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#093326' }}>
                  Previewing Validated Batch ({parsedBatch.length} Profiles Ready to Commit)
                </span>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                  Ready to Ingest
                </span>
              </div>

              <div style={{
                maxHeight: '300px',
                overflowY: 'auto',
                border: '1px solid #e2e8f0',
                borderRadius: '12px'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                      <th style={{ padding: '8px 12px' }}>ID</th>
                      <th style={{ padding: '8px 12px' }}>Name</th>
                      <th style={{ padding: '8px 12px' }}>Tier</th>
                      <th style={{ padding: '8px 12px' }}>Harm</th>
                      <th style={{ padding: '8px 12px' }}>Class</th>
                      <th style={{ padding: '8px 12px' }}>Categories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedBatch.map((p, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontWeight: 700 }}>{p.id}</td>
                        <td style={{ padding: '8px 12px', fontWeight: 600 }}>{p.name}</td>
                        <td style={{ padding: '8px 12px' }}>
                          <span style={{
                            background: TIER_DEFINITIONS[p.tierCode]?.color || '#64748b',
                            color: '#ffffff',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 700
                          }}>
                            {p.tierCode}
                          </span>
                        </td>
                        <td style={{ padding: '8px 12px' }}>{p.harmScore}/10</td>
                        <td style={{ padding: '8px 12px', color: '#64748b' }}>{p.candidateClass}</td>
                        <td style={{ padding: '8px 12px', color: '#64748b' }}>{p.categoryIds?.length || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: DOSSIER INVENTORY & MANAGEMENT TABLE               */}
      {/* ========================================================= */}
      {activeTab === 'inventory' && (
        <div>
          {/* Search & Filter Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', gap: '8px', flex: '1 1 300px', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} />
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="Search by ID, Game Name, Class, or Tier..."
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select
                value={inventoryTierFilter}
                onChange={(e) => setInventoryTierFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.8rem',
                  outline: 'none',
                  background: '#ffffff'
                }}
              >
                <option value="ALL">All Tiers (T0-T6)</option>
                <option value="T0">T0 - No Paid Element</option>
                <option value="T1">T1 - Closed-Loop Direct</option>
                <option value="T2">T2 - Paid Random Draw</option>
                <option value="T3">T3 - Grey-Market Convertible</option>
                <option value="T4">T4 - Token Cash-Out</option>
                <option value="T5">T5 - Licensed Wagering</option>
                <option value="T6">T6 - Unlicensed Wagering</option>
              </select>

              <select
                value={inventorySort}
                onChange={(e) => setInventorySort(e.target.value as any)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.8rem',
                  outline: 'none',
                  background: '#ffffff'
                }}
              >
                <option value="id">Sort by ID</option>
                <option value="harm">Sort by Harm Score</option>
                <option value="name">Sort by Name</option>
                <option value="tier">Sort by Tier</option>
              </select>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '12px' }}>
            Showing <strong>{filteredInventory.length}</strong> of <strong>{profiles.length}</strong> classified dossiers
          </div>

          {/* Table */}
          <div style={{
            overflowX: 'auto',
            border: '1px solid #e2e8f0',
            borderRadius: '14px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.825rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 800 }}>ID</th>
                  <th style={{ padding: '12px 16px', fontWeight: 800 }}>Game Title</th>
                  <th style={{ padding: '12px 16px', fontWeight: 800 }}>Tier</th>
                  <th style={{ padding: '12px 16px', fontWeight: 800 }}>Harm Score</th>
                  <th style={{ padding: '12px 16px', fontWeight: 800 }}>Candidate Class</th>
                  <th style={{ padding: '12px 16px', fontWeight: 800 }}>Branches</th>
                  <th style={{ padding: '12px 16px', fontWeight: 800, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((p) => {
                  const tierDef = TIER_DEFINITIONS[p.tierCode];
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.1s' }}>
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontWeight: 700, color: '#093326' }}>
                        {p.id}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{p.name}</div>
                        <div style={{ fontSize: '0.725rem', color: '#64748b' }}>{p.representativeTitle}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          background: tierDef?.color || '#64748b',
                          color: '#ffffff',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          letterSpacing: '0.02em'
                        }}>
                          {p.tierCode}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          background: p.harmScore >= 8 ? '#fecaca' : p.harmScore >= 6 ? '#fed7aa' : '#d1fae5',
                          color: p.harmScore >= 8 ? '#991b1b' : p.harmScore >= 6 ? '#9a3412' : '#065f46'
                        }}>
                          {p.harmScore}/10 • {p.harmRating}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#475569', fontSize: '0.75rem' }}>
                        {p.candidateClass}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#64748b' }}>
                        {p.categoryIds?.length || 0} branches
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            type="button"
                            onClick={() => onPreviewProfile?.(p)}
                            style={{
                              background: '#f1f5f9',
                              border: '1px solid #cbd5e1',
                              padding: '5px 8px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              color: '#334155'
                            }}
                            title="Preview Academic Dossier"
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditProfile(p)}
                            style={{
                              background: '#eff6ff',
                              border: '1px solid #bfdbfe',
                              padding: '5px 8px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              color: '#1e40af'
                            }}
                            title="Edit Dossier"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateProfile(p.id)}
                            style={{
                              background: '#f8fafc',
                              border: '1px solid #cbd5e1',
                              padding: '5px 8px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              color: '#475569'
                            }}
                            title="Duplicate Dossier"
                          >
                            <Copy size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProfile(p.id, p.name)}
                            style={{
                              background: '#fef2f2',
                              border: '1px solid #fecaca',
                              padding: '5px 8px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              color: '#991b1b'
                            }}
                            title="Delete Dossier"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: NEON POSTGRES DATABASE & SQL SYNC                  */}
      {/* ========================================================= */}
      {activeTab === 'neon' && (
        <div>
          <div style={{
            background: '#093326',
            color: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ background: '#34d399', color: '#093326', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>
                  NEON POSTGRES V1
                </span>
                <span style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>
                  Sydney Region (ap-southeast-2)
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                Relational Database Synchronization
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#d1fae5', margin: '4px 0 0', maxWidth: '600px', lineHeight: 1.5 }}>
                Connected tables: <code>game_profiles</code>, <code>profile_taxonomy_mapping</code>, <code>research_citations</code>, and <code>taxonomy_categories</code>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(generatedSql);
                  showBanner('Copied complete PostgreSQL seed SQL to clipboard!', 'success');
                }}
                style={{
                  background: '#ffffff',
                  color: '#093326',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Copy size={16} />
                <span>Copy Full SQL Seed</span>
              </button>
            </div>
          </div>

          {/* Database Schema & Credentials Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#093326', margin: '0 0 6px' }}>Database Endpoint</h4>
              <code style={{ fontSize: '0.75rem', color: '#475569', wordBreak: 'break-all' }}>
                ep-snowy-salad-a74eioxr-pooler.ap-southeast-2.aws.neon.tech
              </code>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#093326', margin: '0 0 6px' }}>Terminal Seed Command</h4>
              <code style={{ fontSize: '0.75rem', color: '#475569' }}>
                npm run seed (executes scripts/seed-neon.mjs)
              </code>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#093326', margin: '0 0 6px' }}>Table Junction</h4>
              <span style={{ fontSize: '0.75rem', color: '#475569' }}>
                profile_taxonomy_mapping (Foreign Keys with CASCADE)
              </span>
            </div>
          </div>

          {/* SQL Preview Box */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                Generated PostgreSQL DDL & DML for {profiles.length} Profiles
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Ready to paste into Neon SQL Editor or pgAdmin
              </span>
            </div>
            <textarea
              readOnly
              value={generatedSql}
              rows={14}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                background: '#1e293b',
                color: '#f8fafc',
                lineHeight: 1.4,
                outline: 'none'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
