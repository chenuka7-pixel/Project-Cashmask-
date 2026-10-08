import React from 'react';
import { HelpCircle } from 'lucide-react';

interface CashRealisabilityTiersProps {
  selectedTier: string | null;
  onSelectTier: (tierCode: string) => void;
}

export const CashRealisabilityTiers: React.FC<CashRealisabilityTiersProps> = ({
  selectedTier,
  onSelectTier
}) => {
  const tiers = [
    {
      code: 'T0',
      title: 'No Paid Element',
      bottomLabel: 'LOWEST',
      color: '#059669',
      stripeColor: '#10b981',
      bgColor: '#ffffff'
    },
    {
      code: 'T1',
      title: 'Closed-loop Paid Reward',
      bottomLabel: null,
      color: '#0d9488',
      stripeColor: '#14b8a6',
      bgColor: '#ffffff'
    },
    {
      code: 'T2',
      title: 'Paid Random Draw',
      bottomLabel: null,
      color: '#ca8a04',
      stripeColor: '#eab308',
      bgColor: '#ffffff'
    },
    {
      code: 'T3',
      title: 'Grey-market Convertible',
      bottomLabel: null,
      color: '#ea580c',
      stripeColor: '#f97316',
      bgColor: '#ffffff'
    },
    {
      code: 'T4',
      title: 'Token-mediated Cash-out',
      bottomLabel: null,
      color: '#ea580c',
      stripeColor: '#fb923c',
      bgColor: '#ffffff'
    },
    {
      code: 'T5',
      title: 'Licensed Real-money Wagering',
      bottomLabel: null,
      color: '#dc2626',
      stripeColor: '#ef4444',
      bgColor: '#ffffff'
    },
    {
      code: 'T6',
      title: 'Unlicensed / Offshore Real-money Wagering',
      bottomLabel: 'HIGHEST RISK',
      color: '#991b1b',
      stripeColor: '#b91c1c',
      bgColor: '#ffffff'
    }
  ];

  return (
    <div style={{
      marginTop: '24px',
      background: '#fffdf9',
      border: '1px solid rgba(0, 0, 0, 0.07)',
      borderRadius: '22px',
      padding: '24px 26px 26px',
      boxShadow: 'var(--shadow-card)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          fontSize: '0.675rem',
          fontWeight: 800,
          color: '#d97706',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '4px'
        }}>
          Primary Axis
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
            Cash Realisability Tiers
          </h2>
          <span title="The operative axis of the Cashmask framework measuring cash extraction potential">
            <HelpCircle size={16} color="#9ca3af" style={{ cursor: 'pointer' }} />
          </span>
        </div>

        <p style={{ fontSize: '0.825rem', color: '#6b7280', marginTop: '3px' }}>
          How far a game takes a player along the path from spending money to withdrawing real money.
        </p>
      </div>

      {/* 7 Cards Horizontal Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '10px'
      }}>
        {tiers.map((t) => {
          const isSelected = selectedTier === t.code;

          return (
            <div
              key={t.code}
              onClick={() => onSelectTier(t.code)}
              className="tier-item-card"
              style={{
                borderTop: `4px solid ${t.stripeColor}`,
                borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
                borderRight: '1px solid rgba(0, 0, 0, 0.08)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
                background: '#ffffff',
                boxShadow: isSelected ? `0 0 0 2px ${t.color}` : '0 2px 8px rgba(0, 0, 0, 0.03)',
                height: '140px',
                padding: '14px 8px 12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div>
                <div style={{
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-display)',
                  color: t.color,
                  lineHeight: 1,
                  marginBottom: '8px'
                }}>
                  {t.code}
                </div>

                <div style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: '#374151',
                  lineHeight: 1.25,
                  padding: '0 2px'
                }}>
                  {t.title}
                </div>
              </div>

              {/* Bottom tag for T0 / T6 */}
              {t.bottomLabel ? (
                <div style={{
                  fontSize: '0.625rem',
                  fontWeight: 800,
                  color: t.code === 'T6' ? '#991b1b' : '#059669',
                  background: t.code === 'T6' ? '#fee2e2' : '#d1fae5',
                  padding: '2px 0',
                  borderRadius: '4px',
                  letterSpacing: '0.04em',
                  marginTop: 'auto'
                }}>
                  {t.bottomLabel}
                </div>
              ) : (
                <div style={{ height: '16px' }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Convertibility Continuum Gradient Bar (from new renderings) */}
      <div style={{
        marginTop: '18px',
        paddingTop: '16px',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        fontSize: '0.775rem',
        color: '#4b5563',
        fontWeight: 600
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '220px' }}>
          <span style={{
            background: '#ecfdf5',
            color: '#059669',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.675rem',
            fontWeight: 800
          }}>
            T0–T1
          </span>
          <span>No real money can be withdrawn</span>
        </div>

        <div style={{
          flex: 1,
          height: '6px',
          borderRadius: '999px',
          background: 'linear-gradient(90deg, #059669 0%, #10b981 20%, #eab308 50%, #f97316 75%, #991b1b 100%)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', minWidth: '220px' }}>
          <span>Real money can be withdrawn</span>
          <span style={{
            background: '#fef2f2',
            color: '#991b1b',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.675rem',
            fontWeight: 800
          }}>
            T5–T6
          </span>
        </div>
      </div>
    </div>
  );
};
