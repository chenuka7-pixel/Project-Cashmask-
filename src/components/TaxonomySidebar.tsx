import React from 'react';
import { 
  Layers, 
  Gamepad2, 
  Users, 
  CreditCard, 
  Activity, 
  HeartHandshake, 
  Scale, 
  DollarSign, 
  Search, 
  AlertTriangle, 
  Clock, 
  BookOpen, 
  HelpCircle, 
  ShieldCheck 
} from 'lucide-react';

interface TaxonomySidebarProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
}

export const TaxonomySidebar: React.FC<TaxonomySidebarProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const browserItems = [
    { id: 'cash-realisability', label: 'Cash Realisability', icon: Layers, badge: 'Tiers' },
    { id: 'game-types', label: 'Game Types', icon: Gamepad2 },
    { id: 'audience-age', label: 'Audience / Age Bands', icon: Users },
    { id: 'monetary-mechanics', label: 'Monetary Mechanics', icon: CreditCard },
    { id: 'harm-profile', label: 'Harm Profile', icon: Activity },
    { id: 'who-is-harmed', label: 'Who is Harmed?', icon: HeartHandshake },
    { id: 'regulatory-status', label: 'Regulatory Status', icon: Scale },
    { id: 'financial-exposure', label: 'Financial Exposure', icon: DollarSign },
  ];

  const exploreItems = [
    { id: 'explore-search', label: 'Search Games', icon: Search },
    { id: 'explore-high-risk', label: 'High Risk Games', icon: AlertTriangle },
    { id: 'explore-new', label: 'Newly Added', icon: Clock },
    { id: 'explore-methodology', label: 'Methodology', icon: BookOpen },
    { id: 'explore-faq', label: 'FAQ', icon: HelpCircle },
    { id: 'explore-parents', label: 'Guidance for Parents', icon: ShieldCheck },
  ];

  return (
    <aside style={{
      width: '230px',
      flexShrink: 0,
      background: '#ffffff',
      border: '1px solid rgba(0, 0, 0, 0.06)',
      borderRadius: '20px',
      padding: '20px 14px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.02)',
      alignSelf: 'flex-start'
    }}>
      {/* SECTION 1: TAXONOMY BROWSER */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          fontSize: '0.675rem',
          fontWeight: 700,
          color: '#9ca3af',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          padding: '0 10px',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Layers size={13} />
          <span>Taxonomy Browser</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {browserItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedCategory === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '12px',
                  border: isActive ? '1px solid #fde68a' : '1px solid transparent',
                  background: isActive ? '#fef3c7' : 'transparent',
                  color: isActive ? '#92400e' : '#4b5563',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={16} color={isActive ? '#b45309' : '#6b7280'} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span style={{
                    fontSize: '0.675rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    color: '#92400e',
                    padding: '1px 6px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    border: '1px solid #fde68a'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: EXPLORE */}
      <div>
        <div style={{
          fontSize: '0.675rem',
          fontWeight: 700,
          color: '#9ca3af',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          padding: '0 10px',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Search size={13} />
          <span>Explore</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {exploreItems.map((item) => {
            const Icon = item.icon;
            const isActive = selectedCategory === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  borderRadius: '12px',
                  border: isActive ? '1px solid #e5e7eb' : '1px solid transparent',
                  background: isActive ? '#f3f4f6' : 'transparent',
                  color: isActive ? '#111827' : '#4b5563',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} color={isActive ? '#111827' : '#6b7280'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: BOTTOM SAFE PLAY & ETHICS CARD */}
      <div style={{
        marginTop: '18px',
        background: 'linear-gradient(135deg, #093326 0%, #06281e 100%)',
        borderRadius: '16px',
        padding: '12px 14px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 12px rgba(9, 51, 38, 0.2)'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <ShieldCheck size={18} color="#6ee7b7" />
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
            Safe Play Support
          </div>
          <div style={{ fontSize: '0.65rem', color: '#a7f3d0', marginTop: '2px' }}>
            1800 858 858 (Free 24/7)
          </div>
        </div>
      </div>
    </aside>
  );
};
