import React, { useState } from 'react';
import { GameProfile, RESEARCHED_PROFILES, TIER_DEFINITIONS } from '../data/taxonomyData';
import { Search, BookOpen, ArrowRight } from 'lucide-react';

interface ProfilesGridProps {
  onSelectProfile: (profile: GameProfile) => void;
  onAskChatbot: (profile: GameProfile) => void;
}

export const ProfilesGrid: React.FC<ProfilesGridProps> = ({ onSelectProfile, onAskChatbot }) => {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');

  const filtered = RESEARCHED_PROFILES.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.representativeTitle.toLowerCase().includes(search.toLowerCase()) ||
      p.candidateClass.toLowerCase().includes(search.toLowerCase()) ||
      p.primaryAudience.toLowerCase().includes(search.toLowerCase());
    
    const matchesTier = selectedTier === 'ALL' || p.tierCode === selectedTier;
    return matchesSearch && matchesTier;
  });

  const getScoreBadge = (score: number, rating: string) => {
    const color = score >= 8 ? '#ef4444' : score >= 6 ? '#f59e0b' : '#10b981';
    return (
      <span style={{
        background: `rgba(${score >= 8 ? '239, 68, 68' : score >= 6 ? '245, 158, 11' : '16, 185, 129'}, 0.15)`,
        color: color,
        border: `1px solid ${color}44`,
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '0.725rem',
        fontWeight: 700,
        fontFamily: 'var(--font-mono)'
      }}>
        {score}/10 {rating}
      </span>
    );
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px 48px' }}>
      {/* Title & Filter Controls */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{
              background: 'rgba(99, 102, 241, 0.2)',
              color: '#a5b4fc',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px'
            }}>
              GROUND TRUTH DATASET
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Strictly from Taxonomy Research Dossiers
            </span>
          </div>
          <h2 style={{ fontSize: '1.75rem', color: '#ffffff' }}>
            Evaluated Game Profiles & Archetypes
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Each profile evaluates cash realisability, predatory mechanics, and Australian regulatory status.
          </p>
        </div>

        {/* Search & Tier Filters */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
            <input
              type="text"
              placeholder="Search dossiers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                color: '#ffffff',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                fontSize: '0.875rem',
                outline: 'none',
                width: '240px'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '4px',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            {['ALL', 'T2', 'T6'].map(tier => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                style={{
                  background: selectedTier === tier ? 'var(--accent-primary)' : 'transparent',
                  color: selectedTier === tier ? '#ffffff' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Profile Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '20px'
      }}>
        {filtered.map(profile => {
          const tier = TIER_DEFINITIONS[profile.tierCode];
          return (
            <div 
              key={profile.id}
              className="glass-panel"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                {/* Header Row: ID, Name, Tier */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                      fontWeight: 700
                    }}>
                      {profile.id}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: '#ffffff', lineHeight: 1.2 }}>
                      {profile.name}
                    </h3>
                  </div>

                  <span className={`tier-badge tier-${profile.tierCode}`}>
                    {profile.tierCode} • {tier?.shortDesc || profile.tierCode}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  {profile.representativeTitle}
                </div>

                {/* Candidate Class */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '0.78rem',
                  color: 'var(--text-primary)',
                  marginBottom: '12px',
                  lineHeight: 1.4
                }}>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Class:</strong> {profile.candidateClass}
                </div>

                {/* Score Indicators */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Harm:</span>
                    {getScoreBadge(profile.harmScore, profile.harmRating)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Risk:</span>
                    {getScoreBadge(profile.riskScore, profile.riskRating)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Financial:</span>
                    {getScoreBadge(profile.financialScore, profile.financialRating)}
                  </div>
                </div>

                {/* Primary Audience */}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <strong style={{ color: '#ffffff' }}>Audience:</strong> {profile.primaryAudience}
                </div>

                {/* Regulatory Callout */}
                <div style={{
                  fontSize: '0.75rem',
                  color: '#f87171',
                  background: 'rgba(239, 68, 68, 0.08)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  lineHeight: 1.3
                }}>
                  <strong>Legal Status:</strong> {profile.regulatoryStatus.slice(0, 110)}...
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '8px',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '14px',
                marginTop: '4px'
              }}>
                <button
                  onClick={() => onSelectProfile(profile)}
                  className="btn-secondary"
                  style={{ flex: 1, fontSize: '0.75rem', justifyContent: 'center' }}
                >
                  <BookOpen size={14} />
                  <span>Full Dossier</span>
                </button>
                <button
                  onClick={() => onAskChatbot(profile)}
                  className="btn-primary"
                  style={{ flex: 1, fontSize: '0.75rem', justifyContent: 'center' }}
                >
                  <span>Chatbot Guide</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
