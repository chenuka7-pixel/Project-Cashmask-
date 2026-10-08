import { ShieldCheck, ExternalLink } from 'lucide-react';

interface CashmaskFooterProps {
  onNavigate: (nav: string) => void;
  onSelectSidebarCategory: (catId: string) => void;
  onOpenEthicsModal: () => void;
  onDownloadPaper: () => void;
}

export const CashmaskFooter: React.FC<CashmaskFooterProps> = ({
  onNavigate,
  onSelectSidebarCategory,
  onOpenEthicsModal,
  onDownloadPaper
}) => {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #092019 0%, #051410 100%)',
      color: '#ffffff',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      marginTop: '60px',
      padding: '48px 24px 32px'
    }}>
      <div style={{
        maxWidth: '1480px',
        margin: '0 auto'
      }}>
        {/* 4-Column Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand & Institution Column */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}>
                <ShieldCheck size={20} color="#ffffff" />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff' }}>
                  CASHMASK
                </div>
                <div style={{ fontSize: '0.625rem', color: '#6ee7b7', fontWeight: 700, letterSpacing: '0.04em' }}>
                  ECU CSG3101 RESEARCH PROJECT
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.825rem', color: '#a7f3d0', lineHeight: 1.6, margin: '0 0 14px' }}>
              An independent, research-led taxonomy classifying online video games on cash realisability, predatory monetization mechanics, and the risk of gambling-related harm.
            </p>

            <div style={{
              fontSize: '0.75rem',
              color: '#6ee7b7',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>School of Science • Edith Cowan University</span>
            </div>
          </div>

          {/* EXPLORE COLUMN */}
          <div>
            <h4 style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#34d399',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  onClick={() => {
                    onSelectSidebarCategory('explore-search');
                  }}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  Search Games Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectSidebarCategory('explore-high-risk');
                  }}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  High Risk Games (T6)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectSidebarCategory('explore-new');
                  }}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  Newly Added Dossiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('Home');
                    onSelectSidebarCategory('cash-realisability');
                  }}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  Cash Realisability Tiers (T0–T6)
                </button>
              </li>
            </ul>
          </div>

          {/* RESEARCH COLUMN */}
          <div>
            <h4 style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#34d399',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Research
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  onClick={() => {
                    onNavigate('Research');
                    onSelectSidebarCategory('explore-methodology');
                  }}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  Research Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('Taxonomy');
                  }}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  Interactive Taxonomy Blueprint
                </button>
              </li>
              <li>
                <button
                  onClick={onDownloadPaper}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  <span>Australian Gov Classification Paper</span>
                  <ExternalLink size={12} />
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('Research');
                  }}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  Peer-Reviewed Sources & Citations
                </button>
              </li>
            </ul>
          </div>

          {/* SUPPORT & CONSUMER PROTECTION */}
          <div>
            <h4 style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#34d399',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}>
              Support & Protection
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <button
                  onClick={() => {
                    onNavigate('Guidance');
                    onSelectSidebarCategory('explore-parents');
                  }}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  Guidance for Parents & Spending Locks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('About')}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  About CSG3101 Roster
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('Guidance');
                    onSelectSidebarCategory('explore-faq');
                  }}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  FAQ & Legal Definitions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEthicsModal}
                  style={{ background: 'none', border: 'none', color: '#d1fae5', fontSize: '0.825rem', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#d1fae5')}
                >
                  Ethics & Disclaimers
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          fontSize: '0.75rem',
          color: '#6ee7b7'
        }}>
          <div>
            © 2026 Cashmask Project • Edith Cowan University (Perth, Western Australia)
          </div>

          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('Research')}
              style={{ background: 'none', border: 'none', color: '#a7f3d0', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}
            >
              Academic Methodology
            </button>
            <button
              onClick={onOpenEthicsModal}
              style={{ background: 'none', border: 'none', color: '#a7f3d0', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}
            >
              Ethical Governance
            </button>
            <button
              onClick={() => onNavigate('Guidance')}
              style={{ background: 'none', border: 'none', color: '#a7f3d0', fontSize: '0.75rem', cursor: 'pointer', padding: 0 }}
            >
              24/7 Helpline Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
