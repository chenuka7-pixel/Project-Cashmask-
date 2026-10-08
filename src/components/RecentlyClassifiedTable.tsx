import React from 'react';
import { GameProfile, TIER_DEFINITIONS } from '../data/taxonomyData';
import { ArrowRight, Clock, ChevronRight } from 'lucide-react';

interface RecentlyClassifiedTableProps {
  profiles: GameProfile[];
  onSelectProfile: (profile: GameProfile) => void;
  onViewAllGames: () => void;
}

export const RecentlyClassifiedTable: React.FC<RecentlyClassifiedTableProps> = ({
  profiles,
  onSelectProfile,
  onViewAllGames
}) => {
  // Take up to 6 most recent / researched game profiles
  const displayProfiles = profiles.slice(0, 6);

  const getTierColor = (tierCode: string) => {
    return TIER_DEFINITIONS[tierCode]?.color || '#059669';
  };

  // Convert riskScore (0-10) to 5-dot rating
  const renderRiskDots = (score: number) => {
    const dotsCount = Math.min(5, Math.max(1, Math.round(score / 2)));
    const dotColor = score >= 8 ? '#dc2626' : score >= 6 ? '#ea580c' : score >= 4 ? '#d97706' : '#059669';

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
        {[1, 2, 3, 4, 5].map((d) => (
          <span
            key={d}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: d <= dotsCount ? dotColor : '#e2e8f0',
              display: 'inline-block'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{
      marginTop: '28px',
      background: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.06)',
      borderRadius: '22px',
      padding: '28px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)'
    }}>
      {/* Section Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div>
          <div style={{
            fontSize: '0.675rem',
            fontWeight: 800,
            color: '#059669',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Clock size={13} />
            <span>LIVE INDEX</span>
          </div>
          <h2 style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#111827',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            Recently Added / Updated Games
          </h2>
        </div>

        <button
          onClick={onViewAllGames}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#059669',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 10px',
            borderRadius: '8px',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ecfdf5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <span>View all games</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Responsive Table Container */}
      <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
          fontSize: '0.825rem'
        }}>
          <thead>
            <tr style={{
              background: '#f8fafc',
              borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
              fontSize: '0.7rem',
              fontWeight: 800,
              color: '#64748b',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              <th style={{ padding: '12px 16px' }}>Game / Candidate</th>
              <th style={{ padding: '12px 14px' }}>Cash Tier</th>
              <th style={{ padding: '12px 14px' }}>Financial Exposure</th>
              <th style={{ padding: '12px 14px' }}>Primary Audience</th>
              <th style={{ padding: '12px 14px' }}>Risk Indicator</th>
              <th style={{ padding: '12px 14px' }}>Classified Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Dossier</th>
            </tr>
          </thead>
          <tbody>
            {displayProfiles.map((p, idx) => {
              const tierColor = getTierColor(p.tierCode);

              return (
                <tr
                  key={p.id}
                  onClick={() => onSelectProfile(p)}
                  style={{
                    borderBottom: idx === displayProfiles.length - 1 ? 'none' : '1px solid rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fdfbf7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {/* Game & Title */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.875rem' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.725rem', color: '#6b7280', marginTop: '2px' }}>
                      {p.representativeTitle}
                    </div>
                  </td>

                  {/* Cash Tier Badge */}
                  <td style={{ padding: '14px 14px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '3px 9px',
                      borderRadius: '6px',
                      fontSize: '0.725rem',
                      fontWeight: 800,
                      background: `${tierColor}15`,
                      color: tierColor,
                      border: `1px solid ${tierColor}40`,
                      fontFamily: 'var(--font-mono)'
                    }}>
                      {p.tierCode}
                    </span>
                  </td>

                  {/* Financial Exposure */}
                  <td style={{ padding: '14px 14px', color: '#374151', fontWeight: 600 }}>
                    {p.financialRating || 'Medium'}
                  </td>

                  {/* Primary Audience */}
                  <td style={{ padding: '14px 14px', color: '#4b5563' }}>
                    {p.primaryAudience}
                  </td>

                  {/* Risk Indicator (5 dots) */}
                  <td style={{ padding: '14px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {renderRiskDots(p.riskScore)}
                      <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#64748b' }}>
                        {p.riskScore}/10
                      </span>
                    </div>
                  </td>

                  {/* Classified Status */}
                  <td style={{ padding: '14px 14px', color: '#64748b', fontSize: '0.75rem' }}>
                    {p.regulatoryStatus.includes('Unlicensed') || p.regulatoryStatus.includes('ACMA') ? (
                      <span style={{ color: '#dc2626', fontWeight: 700 }}>ACMA Notice</span>
                    ) : (
                      <span>ACB Framework</span>
                    )}
                  </td>

                  {/* Dossier Action Arrow */}
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '26px',
                      height: '26px',
                      borderRadius: '6px',
                      background: '#f3f4f6',
                      color: '#4b5563'
                    }}>
                      <ChevronRight size={14} />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
