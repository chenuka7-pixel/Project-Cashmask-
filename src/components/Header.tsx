import React from 'react';
import { ShieldAlert, BookOpen, GitBranch, MessageSquare, PhoneCall, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: 'tree' | 'dossiers' | 'chatbot';
  setActiveTab: (tab: 'tree' | 'dossiers' | 'chatbot') => void;
  onOpenEthicsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenEthicsModal }) => {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-color)',
      background: 'rgba(10, 13, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Top Academic & Crisis Helpline Bar */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '6px 24px',
        fontSize: '0.775rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          <span style={{ 
            background: 'rgba(99, 102, 241, 0.25)', 
            color: '#a5b4fc', 
            padding: '2px 8px', 
            borderRadius: '4px', 
            fontWeight: 700,
            fontFamily: 'var(--font-mono)' 
          }}>
            ECU CSG3101
          </span>
          <span>Edith Cowan University • Joondalup Campus • Dr. David Cook</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a 
            href="tel:1800858858" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              color: '#fca5a5', 
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.75rem',
              background: 'rgba(239, 68, 68, 0.12)',
              padding: '2px 10px',
              borderRadius: '20px',
              border: '1px solid rgba(239, 68, 68, 0.25)'
            }}
          >
            <PhoneCall size={12} />
            <span>National Gambling Helpline: 1800 858 858 (24/7 AU)</span>
          </a>
          <button
            onClick={onOpenEthicsModal}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem'
            }}
          >
            <HelpCircle size={13} />
            <span>Research & Ethics Notice</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '14px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)'
          }}>
            <ShieldAlert size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', lineHeight: 1.2, color: '#ffffff' }}>
              Socio-Technical Security
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Online Games for Cash Classification & Guidance
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '4px',
          borderRadius: '10px',
          border: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => setActiveTab('tree')}
            style={{
              background: activeTab === 'tree' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'tree' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '7px',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <GitBranch size={16} />
            <span>Interactive Tree</span>
          </button>

          <button
            onClick={() => setActiveTab('dossiers')}
            style={{
              background: activeTab === 'dossiers' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'dossiers' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '7px',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <BookOpen size={16} />
            <span>Research Dossiers (7)</span>
          </button>

          <button
            onClick={() => setActiveTab('chatbot')}
            style={{
              background: activeTab === 'chatbot' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'chatbot' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '7px',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <MessageSquare size={16} />
            <span>Guidance Chatbot</span>
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              fontSize: '0.65rem',
              padding: '1px 6px',
              borderRadius: '10px'
            }}>
              GPT-4o
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
