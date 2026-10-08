import React from 'react';
import { Search, Download, ShieldCheck } from 'lucide-react';

interface CashmaskNavbarProps {
  activeNav: string;
  setActiveNav: (nav: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onDownloadPaper: () => void;
}

export const CashmaskNavbar: React.FC<CashmaskNavbarProps> = ({
  activeNav,
  setActiveNav,
  searchQuery,
  setSearchQuery,
  onDownloadPaper
}) => {
  const navLinks = ['Home', 'Taxonomy', 'Games', 'Research', 'About', 'Guidance', 'Admin'];

  return (
    <header style={{
      background: 'var(--bg-page)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        maxWidth: '1480px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveNav('Home')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          {/* Ninja / Mask Styled Icon */}
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '11px',
            background: 'linear-gradient(135deg, #093326 0%, #064e3b 60%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(9, 51, 38, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2.5C6.75 2.5 2.5 6.75 2.5 12C2.5 17.25 6.75 21.5 12 21.5C17.25 21.5 21.5 17.25 21.5 12C21.5 6.75 17.25 2.5 12 2.5Z" fill="#0a2a1f"/>
              <path d="M5.5 10C5.5 8.9 6.4 8 7.5 8H16.5C17.6 8 18.5 8.9 18.5 10V12.5C18.5 13.6 17.6 14.5 16.5 14.5H7.5C6.4 14.5 5.5 13.6 5.5 12.5V10Z" fill="#14b8a6"/>
              <path d="M7 11.2L9.5 10.2L9.5 12.2L7 11.2Z" fill="#ffffff"/>
              <path d="M17 11.2L14.5 10.2L14.5 12.2L17 11.2Z" fill="#ffffff"/>
              <circle cx="9.5" cy="11.2" r="1.1" fill="#34d399"/>
              <circle cx="14.5" cy="11.2" r="1.1" fill="#34d399"/>
            </svg>
          </div>
          <div>
            <div style={{
              fontWeight: 900,
              fontSize: '1.2rem',
              letterSpacing: '-0.03em',
              color: '#093326',
              lineHeight: 1,
              fontFamily: 'var(--font-display)'
            }}>
              CASHMASK
            </div>
            <div style={{
              fontSize: '0.625rem',
              fontWeight: 600,
              color: '#6b7280',
              letterSpacing: '0.04em',
              marginTop: '2px',
              textTransform: 'uppercase'
            }}>
              Know the Game. Know the Risk.
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {navLinks.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#093326' : '#6b7280',
                  cursor: 'pointer',
                  padding: '6px 0',
                  position: 'relative',
                  transition: 'color 0.15s ease'
                }}
              >
                {item === 'Admin' ? (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: isActive ? '#093326' : '#ecfdf5',
                    color: isActive ? '#34d399' : '#065f46',
                    border: `1px solid ${isActive ? '#093326' : '#a7f3d0'}`,
                    padding: '3px 8px',
                    borderRadius: '8px',
                    fontSize: '0.775rem',
                    fontWeight: 700
                  }}>
                    <ShieldCheck size={12} />
                    <span>Admin</span>
                  </span>
                ) : (
                  item
                )}
                {isActive && item !== 'Admin' && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '24px',
                    height: '2px',
                    borderRadius: '2px',
                    background: '#093326'
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Search & Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <Search 
              size={15} 
              color="#9ca3af" 
              style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: '#f2ece1',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '24px',
                padding: '8px 16px 8px 36px',
                fontSize: '0.85rem',
                outline: 'none',
                width: '190px',
                color: '#111827',
                transition: 'width 0.2s ease, background 0.2s ease'
              }}
              onFocus={(e) => e.target.style.width = '240px'}
              onBlur={(e) => e.target.style.width = '190px'}
            />
          </div>

          {/* Download Research Paper CTA Button */}
          <button
            onClick={onDownloadPaper}
            style={{
              background: '#0a3528',
              color: '#ffffff',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '24px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 10px rgba(10, 53, 40, 0.2)',
              transition: 'background 0.15s ease, transform 0.1s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#082a20')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#0a3528')}
          >
            <Download size={15} />
            <span>Download Research Paper</span>
          </button>
        </div>
      </div>
    </header>
  );
};
