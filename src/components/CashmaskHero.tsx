import React from 'react';
import { Layers } from 'lucide-react';

interface CashmaskHeroProps {
  onSearchTag: (tag: string) => void;
  onSelectTier: (tierCode: string) => void;
}

export const CashmaskHero: React.FC<CashmaskHeroProps> = ({
  onSearchTag,
  onSelectTier
}) => {
  const popularSearches = ['Fortnite', 'Roblox', 'Coin Master', 'CS:GO Skins', 'FIFA Ultimate Team'];

  const scaleItems = [
    { code: 'T0', label: 'No cash-out pathway', color: '#10b981' },
    { code: 'T1', label: 'Closed-loop rewards', color: '#14b8a6' },
    { code: 'T2', label: 'Paid random draws', color: '#eab308' },
    { code: 'T3', label: 'Grey-market conversion', color: '#f97316' },
    { code: 'T4', label: 'Token cash-out', color: '#fb923c' },
    { code: 'T5', label: 'Licensed wagering', color: '#ef4444' },
    { code: 'T6', label: 'Unlicensed wagering', color: '#b91c1c' },
  ];

  return (
    <div style={{
      background: 'var(--bg-hero-gradient)',
      borderRadius: '22px',
      padding: '36px 36px',
      color: '#ffffff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '28px',
      boxShadow: '0 10px 30px rgba(10, 53, 40, 0.18)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Left Content */}
      <div style={{ maxWidth: '440px', zIndex: 2 }}>
        <div style={{
          fontSize: '0.675rem',
          fontWeight: 700,
          color: '#6ee7b7',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '14px'
        }}>
          Independent Classification of Online Games
        </div>

        <h1 style={{
          fontSize: '2.4rem',
          lineHeight: 1.15,
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '16px',
          letterSpacing: '-0.03em'
        }}>
          Understand the<br />
          real risks behind<br />
          online games.
        </h1>

        <p style={{
          fontSize: '0.9rem',
          color: '#d1fae5',
          lineHeight: 1.5,
          marginBottom: '24px',
          opacity: 0.95
        }}>
          Cashmask classifies games based on cash realisability, monetisation mechanics and the types of harm they may cause to different people.
        </p>

        {/* Popular searches */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '0.775rem', color: '#a7f3d0' }}>
            Popular searches:
          </span>
          {popularSearches.map((tag) => (
            <button
              key={tag}
              onClick={() => onSearchTag(tag)}
              className="hero-tag"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Right Nested Card: Cash Realisability Scale */}
      <div style={{
        background: 'rgba(5, 30, 22, 0.72)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backdropFilter: 'blur(12px)',
        borderRadius: '18px',
        padding: '20px 22px',
        width: '275px',
        flexShrink: 0,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '14px',
          paddingBottom: '10px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <Layers size={16} color="#fbbf24" />
          <span style={{ fontWeight: 700, fontSize: '0.825rem', color: '#ffffff' }}>
            Cash Realisability Scale
          </span>
        </div>

        {/* Scale list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
          {scaleItems.map((item) => (
            <div
              key={item.code}
              onClick={() => onSelectTier(item.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                padding: '2px 4px',
                borderRadius: '6px',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: item.color,
                boxShadow: `0 0 6px ${item.color}88`
              }} />
              <strong style={{ fontFamily: 'var(--font-mono)', color: '#ffffff', minWidth: '22px' }}>
                {item.code}
              </strong>
              <span style={{ color: '#d1fae5' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Low to High Risk Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#a7f3d0',
          letterSpacing: '0.04em'
        }}>
          <span>LOW RISK</span>
          <div style={{
            flex: 1,
            margin: '0 10px',
            height: '3px',
            borderRadius: '2px',
            background: 'linear-gradient(90deg, #10b981 0%, #eab308 50%, #ef4444 100%)',
            opacity: 0.85
          }} />
          <span style={{ color: '#f87171' }}>HIGH RISK</span>
        </div>
      </div>
    </div>
  );
};
