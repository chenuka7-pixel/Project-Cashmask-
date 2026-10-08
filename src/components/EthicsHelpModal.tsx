import React from 'react';
import { X, ShieldCheck, AlertTriangle } from 'lucide-react';

interface EthicsHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EthicsHelpModal: React.FC<EthicsHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 200,
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '640px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        position: 'relative',
        background: '#0f172a'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
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

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={22} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#ffffff' }}>
              Research Governance & Ethics Notice
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Edith Cowan University • CSG3101 Applied Project
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {/* Research Scope */}
          <div>
            <h3 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '4px' }}>
              Academic Scope & Method
            </h3>
            <p>
              This application publishes research on the cash realisability and socio-technical harms of online games offering monetary or pseudo-monetary rewards. The evaluations classify games based on observable monetary mechanics, terms of service, and public regulatory actions.
            </p>
          </div>

          {/* Privacy & Ethics */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '8px',
            padding: '12px'
          }}>
            <h3 style={{ fontSize: '0.9rem', color: '#a5b4fc', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} />
              <span>Zero Personal Data Tracking</span>
            </h3>
            <p style={{ fontSize: '0.8rem' }}>
              No user accounts are required, no cookies are used for tracking, and no conversation logs or personal identifying information are stored. In accordance with university research guidelines, no human subjects are involved.
            </p>
          </div>

          {/* Legal / Clinical Disclaimer */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '8px',
            padding: '12px'
          }}>
            <h3 style={{ fontSize: '0.9rem', color: '#fca5a5', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={16} />
              <span>Research Notice — Not Legal or Clinical Advice</span>
            </h3>
            <p style={{ fontSize: '0.8rem' }}>
              The risk indicators and tier classifications represent academic taxonomy analyses and are not formal legal determinations or psychiatric diagnoses. Regulatory enforcement actions reflect public records from agencies such as the Australian Communications and Media Authority (ACMA).
            </p>
          </div>

          {/* Australian Support Services */}
          <div>
            <h3 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '8px' }}>
              Australian Support & Help Services
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: '#fff' }}>National Gambling Helpline</strong>
                <div style={{ fontSize: '0.8rem' }}>Free, confidential support 24 hours a day, 7 days a week: <strong>1800 858 858</strong></div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: '#fff' }}>Gambling Help Online</strong>
                <div style={{ fontSize: '0.8rem' }}>Live chat and online counseling: <a href="https://www.gamblinghelponline.org.au" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>gamblinghelponline.org.au</a></div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <strong style={{ color: '#fff' }}>BetStop — National Self-Exclusion Register</strong>
                <div style={{ fontSize: '0.8rem' }}>Free Australian Government register to exclude from all licensed wagering providers: <a href="https://www.betstop.gov.au" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>betstop.gov.au</a></div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ marginTop: '24px', textAlign: 'right' }}>
          <button onClick={onClose} className="btn-primary" style={{ padding: '8px 20px' }}>
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
