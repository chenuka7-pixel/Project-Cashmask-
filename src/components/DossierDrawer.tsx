import React from 'react';
import { GameProfile, TIER_DEFINITIONS } from '../data/taxonomyData';
import { X, Scale, DollarSign, Users, BookOpen, MessageSquare } from 'lucide-react';

interface DossierDrawerProps {
  profile: GameProfile | null;
  onClose: () => void;
  onAskChatbot: (profile: GameProfile) => void;
}

export const DossierDrawer: React.FC<DossierDrawerProps> = ({ profile, onClose, onAskChatbot }) => {
  if (!profile) return null;

  const tier = TIER_DEFINITIONS[profile.tierCode];

  // Helper for gauge color
  const getScoreColor = (score: number) => {
    if (score >= 8) return '#ef4444'; // Red
    if (score >= 6) return '#f59e0b'; // Amber
    return '#10b981'; // Green
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100%',
      maxWidth: '560px',
      height: '100vh',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(24px)',
      borderLeft: '1px solid var(--border-color)',
      boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.6)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      {/* Drawer Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        background: 'rgba(10, 13, 20, 0.5)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              background: 'rgba(99, 102, 241, 0.2)',
              color: '#a5b4fc',
              padding: '2px 8px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.75rem'
            }}>
              {profile.id}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Verified Taxonomy Dossier
            </span>
          </div>
          <h2 style={{ fontSize: '1.4rem', color: '#ffffff', lineHeight: 1.2 }}>
            {profile.name}
          </h2>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {profile.representativeTitle}
          </p>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: 'var(--text-secondary)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Drawer Body Scrollable */}
      <div style={{
        padding: '24px',
        overflowY: 'auto',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Tier Banner */}
        <div style={{
          background: `rgba(${profile.tierCode === 'T6' ? '239, 68, 68' : '245, 158, 11'}, 0.1)`,
          border: `1.5px solid ${tier.color}`,
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start'
        }}>
          <div style={{
            background: tier.color,
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: '1rem',
            padding: '6px 12px',
            borderRadius: '8px',
            boxShadow: `0 0 12px ${tier.color}44`
          }}>
            {profile.tierCode}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>
              {profile.tierClassification}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {tier.fullDesc}
            </div>
          </div>
        </div>

        {/* 3 Metrics Score Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px'
        }}>
          {/* Harm Score */}
          <div className="glass-panel" style={{ padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
              HARM SCORE
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: getScoreColor(profile.harmScore), fontFamily: 'var(--font-mono)' }}>
              {profile.harmScore}/10
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {profile.harmRating}
            </div>
          </div>

          {/* Risk Score */}
          <div className="glass-panel" style={{ padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
              RISK SCORE
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: getScoreColor(profile.riskScore), fontFamily: 'var(--font-mono)' }}>
              {profile.riskScore}/10
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {profile.riskRating}
            </div>
          </div>

          {/* Financial Score */}
          <div className="glass-panel" style={{ padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
              FINANCIAL SCORE
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: getScoreColor(profile.financialScore), fontFamily: 'var(--font-mono)' }}>
              {profile.financialScore}/10
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {profile.financialRating}
            </div>
          </div>
        </div>

        {/* Candidate Class */}
        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <BookOpen size={16} color="var(--accent-cyan)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', letterSpacing: '0.04em' }}>
              CANDIDATE CLASS
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
            {profile.candidateClass}
          </p>
        </div>

        {/* Monetary Mechanics & Cash Realisability */}
        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <DollarSign size={16} color="var(--accent-emerald)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', letterSpacing: '0.04em' }}>
              MONETARY VALUE & CONVERTIBILITY FLOW
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
            {profile.monetaryValue}
          </p>
        </div>

        {/* Target Audience */}
        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Users size={16} color="var(--accent-amber)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)', letterSpacing: '0.04em' }}>
              PRIMARY AUDIENCE & AFFECTED GROUPS
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
            {profile.primaryAudience}
          </p>
        </div>

        {/* Regulatory Status & ACMA Notice */}
        <div className="glass-panel" style={{ padding: '16px', borderLeft: '3px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Scale size={16} color="#ef4444" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ef4444', letterSpacing: '0.04em' }}>
              REGULATORY & LEGAL STATUS
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
            {profile.regulatoryStatus}
          </p>
        </div>

        {/* Detailed Academic Analysis Excerpt */}
        <div className="glass-panel" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.04em' }}>
            RESEARCH DOSSIER ANALYSIS
          </div>
          <div style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
            maxHeight: '220px',
            overflowY: 'auto',
            paddingRight: '6px'
          }}>
            {profile.fullDossierText}
          </div>
        </div>

        {/* Citations & Evidence */}
        <div style={{ marginTop: '4px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
            EVIDENCE & SOURCES CITED:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {profile.citations.map((c, idx) => (
              <div key={idx} style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <span>• {c.text}</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontSize: '0.7rem' }}>
                  [{c.sourceType} {c.year}]
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drawer Footer Action */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid var(--border-color)',
        background: 'rgba(10, 13, 20, 0.8)',
        display: 'flex',
        gap: '12px'
      }}>
        <button
          onClick={() => {
            onClose();
            onAskChatbot(profile);
          }}
          className="btn-primary"
          style={{ flex: 1, justifyContent: 'center', padding: '10px 16px' }}
        >
          <MessageSquare size={16} />
          <span>Ask Guidance Chatbot About {profile.name}</span>
        </button>
      </div>
    </div>
  );
};
