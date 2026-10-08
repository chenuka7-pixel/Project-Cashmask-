import React from 'react';
import { 
  DollarSign, 
  Clock, 
  Activity, 
  Lock, 
  AlertTriangle, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface HarmProfileExplorerProps {
  onSelectHarmProfile: (harmType: string) => void;
}

export const HarmProfileExplorer: React.FC<HarmProfileExplorerProps> = ({
  onSelectHarmProfile
}) => {
  const harmProfiles = [
    {
      id: 'financial',
      title: 'Financial Harm',
      desc: 'Money loss, overspending, financial strain, hidden microtransaction costs.',
      icon: DollarSign,
      color: '#059669',
      bgColor: '#ecfdf5',
      borderColor: '#a7f3d0'
    },
    {
      id: 'behavioural',
      title: 'Addiction / Behavioural Harm',
      desc: 'Mechanisms that may drive compulsive behaviour, sleep loss, and excessive play.',
      icon: Clock,
      color: '#7c3aed',
      bgColor: '#f5f3ff',
      borderColor: '#ddd6fe'
    },
    {
      id: 'psychological',
      title: 'Psychological Harm',
      desc: 'Stress, near-miss frustration, emotional distress, loss of subjective well-being.',
      icon: Activity,
      color: '#d97706',
      bgColor: '#fffbeb',
      borderColor: '#fde68a'
    },
    {
      id: 'privacy',
      title: 'Privacy / Data Harm',
      desc: 'Biometric profiling, behavioural tracking, age bypasses, and data sharing.',
      icon: Lock,
      color: '#0284c7',
      bgColor: '#f0f9ff',
      borderColor: '#bae6fd'
    },
    {
      id: 'consumer',
      title: 'Consumer / Exploitation Harm',
      desc: 'Dark patterns, misleading loot odds, FOMO timers, and unfair monetization.',
      icon: AlertTriangle,
      color: '#dc2626',
      bgColor: '#fef2f2',
      borderColor: '#fecaca'
    }
  ];

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
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '22px'
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
            <ShieldAlert size={14} />
            <span>WHO'S AFFECTED</span>
          </div>
          <h2 style={{
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#111827',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.02em',
            margin: '0 0 4px'
          }}>
            Explore by Harm Profile
          </h2>
          <p style={{
            fontSize: '0.85rem',
            color: '#6b7280',
            margin: 0
          }}>
            Every classified game is reviewed across five established dimensions of socio-technical and financial harm.
          </p>
        </div>
      </div>

      {/* 5-Card Responsive Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        {harmProfiles.map((p) => {
          const Icon = p.icon;

          return (
            <div
              key={p.id}
              onClick={() => onSelectHarmProfile(p.id)}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.07)',
                borderRadius: '16px',
                padding: '20px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = p.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.07)';
              }}
            >
              <div>
                {/* Icon Badge */}
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: p.bgColor,
                  border: `1px solid ${p.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: p.color,
                  marginBottom: '14px'
                }}>
                  <Icon size={19} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: '#111827',
                  margin: '0 0 6px',
                  lineHeight: 1.3
                }}>
                  {p.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.785rem',
                  color: '#6b7280',
                  lineHeight: 1.45,
                  margin: '0 0 16px'
                }}>
                  {p.desc}
                </p>
              </div>

              {/* View Games Link */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: p.color,
                marginTop: 'auto',
                paddingTop: '10px',
                borderTop: '1px solid rgba(0, 0, 0, 0.04)'
              }}>
                <span>View games</span>
                <ArrowRight size={13} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
