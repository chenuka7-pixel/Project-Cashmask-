import React, { useState, useMemo } from 'react';
import { GameProfile, RESEARCHED_PROFILES, TIER_DEFINITIONS } from '../data/taxonomyData';
import { BookOpen, ArrowRight, Filter, ChevronLeft, ChevronRight, RotateCcw, Search } from 'lucide-react';

interface GamesViewProps {
  onSelectProfile: (profile: GameProfile) => void;
  onAskAssistant: (profile: GameProfile) => void;
  filterTier?: string | null;
  searchFilter?: string;
  profiles?: GameProfile[];
  activeCategoryFilter?: string;
  onClearCategoryFilter?: () => void;
}

export const GamesView: React.FC<GamesViewProps> = ({
  onSelectProfile,
  onAskAssistant,
  filterTier,
  searchFilter,
  profiles,
  activeCategoryFilter,
  onClearCategoryFilter
}) => {
  const activeProfiles = profiles || RESEARCHED_PROFILES;
  const [selectedTierFilter, setSelectedTierFilter] = useState<string | null>(filterTier || null);
  const [localSearch, setLocalSearch] = useState<string>(searchFilter || '');
  const [sortBy, setSortBy] = useState<'harm-desc' | 'risk-desc' | 'name-asc' | 'newest'>('harm-desc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const pageSize = 6;

  // Sync external props if they change
  React.useEffect(() => {
    if (filterTier !== undefined) {
      setSelectedTierFilter(filterTier);
      setCurrentPage(1);
    }
  }, [filterTier]);

  React.useEffect(() => {
    if (searchFilter !== undefined) {
      setLocalSearch(searchFilter);
      setCurrentPage(1);
    }
  }, [searchFilter]);

  // Handle Explore actions from sidebar
  React.useEffect(() => {
    if (activeCategoryFilter === 'explore-high-risk') {
      setSelectedTierFilter('T6');
      setSortBy('harm-desc');
      setCurrentPage(1);
    } else if (activeCategoryFilter === 'explore-new') {
      setSelectedTierFilter(null);
      setSortBy('newest');
      setCurrentPage(1);
    } else if (activeCategoryFilter === 'explore-search') {
      setSelectedTierFilter(null);
      setCurrentPage(1);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [activeCategoryFilter]);

  const tierOptions = ['ALL', 'T0', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6'];

  const filteredAndSorted = useMemo(() => {
    const list = activeProfiles.filter((p) => {
      if (selectedTierFilter && selectedTierFilter !== 'ALL' && p.tierCode !== selectedTierFilter) {
        return false;
      }
      if (localSearch.trim()) {
        const q = localSearch.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchTitle = p.representativeTitle.toLowerCase().includes(q);
        const matchClass = p.candidateClass.toLowerCase().includes(q);
        const matchAudience = p.primaryAudience.toLowerCase().includes(q);
        return matchName || matchTitle || matchClass || matchAudience;
      }
      return true;
    });

    list.sort((a, b) => {
      if (sortBy === 'harm-desc') return b.harmScore - a.harmScore;
      if (sortBy === 'risk-desc') return b.riskScore - a.riskScore;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0;
    });

    return list;
  }, [activeProfiles, selectedTierFilter, localSearch, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / pageSize));
  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAndSorted.slice(start, start + pageSize);
  }, [filteredAndSorted, currentPage, pageSize]);

  const handleResetFilters = () => {
    setSelectedTierFilter(null);
    setLocalSearch('');
    setCurrentPage(1);
    if (onClearCategoryFilter) {
      onClearCategoryFilter();
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.06)',
      borderRadius: '22px',
      padding: '28px',
      boxShadow: 'var(--shadow-card)'
    }}>
      {/* Catalog Header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
              Classified Games Catalog
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '4px' }}>
              Detailed socio-technical assessments from ECU CSG3101 research. Evaluates convertibility, harm mechanics, and regulatory exposure.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.775rem', color: '#6b7280' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                color: '#1e293b',
                outline: 'none',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <option value="harm-desc">Harm Rating (Highest first)</option>
              <option value="risk-desc">Risk Score (Highest first)</option>
              <option value="newest">Newly Added / Re-Classified</option>
              <option value="name-asc">Game Name (A–Z)</option>
            </select>
          </div>
        </div>

        {/* Active Explore Filter Banners */}
        {activeCategoryFilter === 'explore-high-risk' && (
          <div style={{
            marginTop: '16px',
            background: '#fef2f2',
            border: '1.5px solid #f87171',
            borderRadius: '12px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#dc2626', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                  HIGH RISK FILTER
                </span>
                <strong style={{ color: '#991b1b', fontSize: '0.9rem' }}>
                  Tier T6: Direct Wagering & Unlicensed Outlets
                </strong>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.775rem', color: '#b91c1c' }}>
                Displaying games and platforms with direct real-money liquidity, wagering mechanics, or active ACMA ISP blocking orders.
              </p>
            </div>
            {onClearCategoryFilter && (
              <button
                type="button"
                onClick={onClearCategoryFilter}
                style={{
                  background: '#ffffff',
                  border: '1px solid #fca5a5',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: '#991b1b'
                }}
              >
                Show All Tiers
              </button>
            )}
          </div>
        )}

        {activeCategoryFilter === 'explore-new' && (
          <div style={{
            marginTop: '16px',
            background: '#ecfdf5',
            border: '1.5px solid #34d399',
            borderRadius: '12px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#059669', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                  NEWLY ADDED
                </span>
                <strong style={{ color: '#065f46', fontSize: '0.9rem' }}>
                  Recently Classified Game Dossiers
                </strong>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.775rem', color: '#047857' }}>
                Displaying the latest verified game entries added and analyzed under the ECU CSG3101 taxonomy framework.
              </p>
            </div>
            {onClearCategoryFilter && (
              <button
                type="button"
                onClick={onClearCategoryFilter}
                style={{
                  background: '#ffffff',
                  border: '1px solid #a7f3d0',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: '#065f46'
                }}
              >
                Reset Catalog View
              </button>
            )}
          </div>
        )}

        {activeCategoryFilter === 'explore-search' && (
          <div style={{
            marginTop: '16px',
            background: '#eff6ff',
            border: '1.5px solid #60a5fa',
            borderRadius: '12px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#2563eb', color: '#fff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                  SEARCH MODE
                </span>
                <strong style={{ color: '#1e40af', fontSize: '0.9rem' }}>
                  Interactive Catalog Search
                </strong>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.775rem', color: '#1d4ed8' }}>
                Type in the search field below to filter games by title, candidate class, audience, or monetization mechanism.
              </p>
            </div>
            {onClearCategoryFilter && (
              <button
                type="button"
                onClick={onClearCategoryFilter}
                style={{
                  background: '#ffffff',
                  border: '1px solid #bfdbfe',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  color: '#1e40af'
                }}
              >
                Show All Games
              </button>
            )}
          </div>
        )}

        {/* Filters and Search Bar */}
        <div style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}>
          {/* Tier Pills */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
              <Filter size={13} /> Tier:
            </span>
            {tierOptions.map((t) => {
              const isSelected = (!selectedTierFilter && t === 'ALL') || (selectedTierFilter === t);
              return (
                <button
                  key={t}
                  onClick={() => {
                    setSelectedTierFilter(t === 'ALL' ? null : t);
                    setCurrentPage(1);
                  }}
                  style={{
                    background: isSelected ? '#0a3528' : '#f3f4f6',
                    color: isSelected ? '#ffffff' : '#4b5563',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '0.75rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} color="#9ca3af" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Filter catalog..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '18px',
                padding: '6px 12px 6px 30px',
                fontSize: '0.8rem',
                outline: 'none',
                color: '#1e293b'
              }}
            />
          </div>
        </div>
      </div>

      {/* Pagination summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        fontSize: '0.775rem',
        color: '#6b7280'
      }}>
        <span>
          Showing {filteredAndSorted.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}–{Math.min(currentPage * pageSize, filteredAndSorted.length)} of {filteredAndSorted.length} games
          {activeProfiles.length > filteredAndSorted.length && ` (filtered from ${activeProfiles.length} classified profiles)`}
        </span>
        <span>Page {currentPage} of {totalPages}</span>
      </div>

      {/* Empty State */}
      {filteredAndSorted.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          background: '#f8fafc',
          borderRadius: '16px',
          border: '1px dashed #cbd5e1'
        }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#334151', marginBottom: '6px' }}>
            No classified games matched your filter
          </h4>
          <p style={{ fontSize: '0.825rem', color: '#64748b', marginBottom: '16px' }}>
            Try selecting a different tier or clearing the search keyword.
          </p>
          <button
            onClick={handleResetFilters}
            style={{
              background: '#0a3528',
              color: '#ffffff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RotateCcw size={14} />
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        /* Paginated Games Grid (6 per page) */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '16px'
        }}>
          {paginatedGames.map((p) => {
            const tier = TIER_DEFINITIONS[p.tierCode];
            const isHighHarm = p.harmScore >= 8;

            return (
              <div
                key={p.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '16px',
                  padding: '18px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  {/* Header: ID, Title, Tier Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.675rem',
                        fontWeight: 700,
                        color: '#9ca3af'
                      }}>
                        {p.id}
                      </span>
                      <h4 style={{ fontSize: '1.15rem', color: '#111827', fontWeight: 800 }}>
                        {p.name}
                      </h4>
                    </div>

                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: isHighHarm ? '#fee2e2' : '#fef3c7',
                      color: isHighHarm ? '#991b1b' : '#92400e',
                      border: `1px solid ${isHighHarm ? '#fca5a5' : '#fde68a'}`
                    }}>
                      {p.tierCode} • {tier.shortDesc}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.775rem', color: '#6b7280', marginBottom: '10px' }}>
                    {p.representativeTitle}
                  </div>

                  {/* Candidate Class */}
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    fontSize: '0.75rem',
                    color: '#334151',
                    marginBottom: '10px',
                    lineHeight: 1.35
                  }}>
                    <strong style={{ color: '#0f766e' }}>Class:</strong> {p.candidateClass}
                  </div>

                  {/* Metric Gauges */}
                  <div style={{
                    display: 'flex',
                    gap: '6px',
                    marginBottom: '10px'
                  }}>
                    <span style={{
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: p.harmScore >= 8 ? '#fee2e2' : '#fef3c7',
                      color: p.harmScore >= 8 ? '#991b1b' : '#92400e'
                    }}>
                      Harm: {p.harmScore}/10 ({p.harmRating})
                    </span>
                    <span style={{
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: '#f1f5f9',
                      color: '#475569'
                    }}>
                      Risk: {p.riskScore}/10
                    </span>
                    <span style={{
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: '#f1f5f9',
                      color: '#475569'
                    }}>
                      Financial: {p.financialScore}/10
                    </span>
                  </div>

                  {/* Regulatory Callout */}
                  <div style={{
                    fontSize: '0.725rem',
                    color: '#991b1b',
                    background: '#fef2f2',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid #fecaca',
                    lineHeight: 1.3
                  }}>
                    <strong>Status:</strong> {p.regulatoryStatus.slice(0, 95)}...
                  </div>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '14px',
                  borderTop: '1px solid #f3f4f6',
                  paddingTop: '12px'
                }}>
                  <button
                    onClick={() => onSelectProfile(p)}
                    style={{
                      flex: 1,
                      background: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      color: '#374151',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <BookOpen size={13} />
                    <span>Read Dossier</span>
                  </button>

                  <button
                    onClick={() => onAskAssistant(p)}
                    style={{
                      flex: 1,
                      background: '#0a3528',
                      color: '#ffffff',
                      border: 'none',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Ask Assistant</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: '28px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)'
        }}>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              color: currentPage === 1 ? '#9ca3af' : '#374151',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: currentPage === 1 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ChevronLeft size={14} />
            <span>Previous</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                border: pageNum === currentPage ? 'none' : '1px solid #e5e7eb',
                background: pageNum === currentPage ? '#0a3528' : '#ffffff',
                color: pageNum === currentPage ? '#ffffff' : '#374151',
                fontSize: '0.8rem',
                fontWeight: pageNum === currentPage ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              background: '#f3f4f6',
              border: '1px solid #e5e7eb',
              color: currentPage === totalPages ? '#9ca3af' : '#374151',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: currentPage === totalPages ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
