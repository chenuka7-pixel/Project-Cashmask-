import React, { useState, useMemo } from 'react';
import { TaxonomyCategory, GameProfile, RESEARCHED_PROFILES, TIER_DEFINITIONS } from '../data/taxonomyData';
import { X, BookOpen, ArrowRight, Layers, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryDrawerProps {
  category: TaxonomyCategory | null;
  onClose: () => void;
  onSelectProfile: (profile: GameProfile) => void;
  onAskChatbot: (profile: GameProfile) => void;
  profiles?: GameProfile[];
}

export const CategoryDrawer: React.FC<CategoryDrawerProps> = ({
  category,
  onClose,
  onSelectProfile,
  onAskChatbot,
  profiles
}) => {
  const allProfiles = profiles || RESEARCHED_PROFILES;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Reset pagination when category changes
  React.useEffect(() => {
    setSearchTerm('');
    setSelectedTier(null);
    setCurrentPage(1);
  }, [category]);

  // Find all games that map to this category
  const categoryGames = useMemo(() => {
    if (!category) return [];
    
    // Match by category ID in categoryIds OR by researchedProfileIds
    return allProfiles.filter((p) => {
      const matchCatId = p.categoryIds && p.categoryIds.includes(category.id);
      const matchProfileId = category.researchedProfileIds && category.researchedProfileIds.includes(p.id);
      
      // Also match by category name keywords (fallback)
      const catName = category.name.toLowerCase();
      const matchName = catName.includes('old') && ['G043', 'G044', 'G045', 'G045-C'].includes(p.id);
      const matchLoot = catName.includes('loot') && ['G010', 'G034'].includes(p.id);
      const matchCricket = catName.includes('cricket') && p.id === 'G046';
      const matchCasino = catName.includes('casino') && ['G045-C', 'G045'].includes(p.id);
      const matchBingo = catName.includes('bingo') && p.id === 'G044';
      const matchPool = catName.includes('pool') && p.id === 'G043';

      return matchCatId || matchProfileId || matchName || matchLoot || matchCricket || matchCasino || matchBingo || matchPool;
    });
  }, [category, allProfiles]);

  // Filtered & Paginated
  const filteredGames = useMemo(() => {
    return categoryGames.filter((p) => {
      if (selectedTier && p.tierCode !== selectedTier) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          p.representativeTitle.toLowerCase().includes(q) ||
          p.candidateClass.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [categoryGames, selectedTier, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredGames.length / pageSize));
  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredGames.slice(start, start + pageSize);
  }, [filteredGames, currentPage, pageSize]);

  // Tier breakdown counts
  const tierCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categoryGames.forEach(p => {
      counts[p.tierCode] = (counts[p.tierCode] || 0) + 1;
    });
    return counts;
  }, [categoryGames]);

  if (!category) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      background: 'rgba(0, 0, 0, 0.45)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'flex-end',
      transition: 'opacity 0.2s ease'
    }}
    onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          height: '100vh',
          background: '#ffffff',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideInRight 0.25s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          background: 'linear-gradient(135deg, #093326 0%, #06281e 100%)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '6px'
            }}>
              <span style={{
                fontSize: '0.675rem',
                fontWeight: 800,
                color: '#6ee7b7',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: 'rgba(255, 255, 255, 0.12)',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                {category.group} • {category.direction} Branch
              </span>
              <span style={{
                fontSize: '0.7rem',
                color: '#a7f3d0'
              }}>
                ID: {category.id}
              </span>
            </div>

            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              fontFamily: 'var(--font-display)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#ffffff'
            }}>
              {category.name.replace('\n', ' ')}
            </h2>

            <p style={{
              fontSize: '0.85rem',
              color: '#d1fae5',
              marginTop: '8px',
              lineHeight: 1.45,
              opacity: 0.95
            }}>
              {category.description}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: 'none',
              color: '#ffffff',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginLeft: '16px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Stats & Filters Bar */}
        <div style={{
          padding: '16px 28px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334151' }}>
                Classified Games ({categoryGames.length}):
              </span>
              {Object.keys(tierCounts).map((tierCode) => (
                <span
                  key={tierCode}
                  onClick={() => {
                    setSelectedTier(prev => prev === tierCode ? null : tierCode);
                    setCurrentPage(1);
                  }}
                  style={{
                    fontSize: '0.675rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: selectedTier === tierCode ? '#0a3528' : '#ffffff',
                    color: selectedTier === tierCode ? '#ffffff' : '#475569',
                    border: '1px solid #cbd5e1'
                  }}
                >
                  {tierCode}: {tierCounts[tierCode]}
                </span>
              ))}
            </div>

            {/* In-category Search */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search games in branch..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '16px',
                  padding: '5px 10px 5px 30px',
                  fontSize: '0.775rem',
                  outline: 'none',
                  color: '#1e293b'
                }}
              />
            </div>
          </div>
        </div>

        {/* Games List (Scrollable Area) */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {filteredGames.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '48px 20px',
              background: '#f8fafc',
              borderRadius: '16px',
              border: '1px dashed #cbd5e1',
              color: '#64748b'
            }}>
              <Layers size={32} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#334151', marginBottom: '4px' }}>
                {categoryGames.length === 0
                  ? `No verified dossiers currently in "${category.name.replace('\n', ' ')}"`
                  : 'No games match your search/tier filter'}
              </h4>
              <p style={{ fontSize: '0.8rem', maxWidth: '420px', margin: '0 auto', lineHeight: 1.5 }}>
                {categoryGames.length === 0
                  ? 'This taxonomy category is ready for upcoming seed data. When new game profiles are uploaded, they will automatically appear here with complete evaluation dossiers.'
                  : 'Try resetting the tier filter or clearing your search term.'}
              </p>
            </div>
          ) : (
            paginatedGames.map((p) => {
              const tier = TIER_DEFINITIONS[p.tierCode];
              const isHighHarm = p.harmScore >= 8;

              return (
                <div
                  key={p.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: '14px',
                    padding: '16px 18px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.675rem',
                        fontWeight: 700,
                        color: '#94a3b8'
                      }}>
                        {p.id}
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827' }}>
                        {p.name}
                      </h4>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {p.representativeTitle}
                      </div>
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

                  <div style={{
                    fontSize: '0.75rem',
                    color: '#334151',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    marginBottom: '10px'
                  }}>
                    <strong style={{ color: '#0f766e' }}>Class:</strong> {p.candidateClass}
                  </div>

                  {/* Harm / Risk Metrics */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                    <span style={{
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: isHighHarm ? '#fee2e2' : '#fef3c7',
                      color: isHighHarm ? '#991b1b' : '#92400e'
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

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                    <button
                      onClick={() => onSelectProfile(p)}
                      style={{
                        flex: 1,
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        color: '#334151',
                        padding: '6px 10px',
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
                      onClick={() => onAskChatbot(p)}
                      style={{
                        flex: 1,
                        background: '#0a3528',
                        color: '#ffffff',
                        border: 'none',
                        padding: '6px 10px',
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
            })
          )}
        </div>

        {/* Drawer Pagination Footer */}
        {totalPages > 1 && (
          <div style={{
            padding: '12px 28px',
            borderTop: '1px solid #e2e8f0',
            background: '#f8fafc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Page {currentPage} of {totalPages} ({filteredGames.length} games)
            </span>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.75rem',
                  cursor: currentPage === 1 ? 'default' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ChevronLeft size={13} /> Previous
              </button>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.75rem',
                  cursor: currentPage === totalPages ? 'default' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Next <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
