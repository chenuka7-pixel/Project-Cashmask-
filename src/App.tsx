import React, { useState, useEffect } from 'react';
import { CashmaskNavbar } from './components/CashmaskNavbar';
import { TaxonomySidebar } from './components/TaxonomySidebar';
import { CashmaskHero } from './components/CashmaskHero';
import { CashRealisabilityTiers } from './components/CashRealisabilityTiers';
import { CashmaskAssistant } from './components/CashmaskAssistant';
import { GamesView } from './components/GamesView';
import { TaxonomyTreeCanvas } from './components/TaxonomyTreeCanvas';
import { DossierDrawer } from './components/DossierDrawer';
import { CategoryDrawer } from './components/CategoryDrawer';
import { EthicsHelpModal } from './components/EthicsHelpModal';
import { AdminPanel } from './components/AdminPanel';
import { ResearchView } from './components/ResearchView';
import { AboutView } from './components/AboutView';
import { GuidanceView } from './components/GuidanceView';
import { HarmProfileExplorer } from './components/HarmProfileExplorer';
import { RecentlyClassifiedTable } from './components/RecentlyClassifiedTable';
import { CashmaskFooter } from './components/CashmaskFooter';
import { GameProfile, TaxonomyCategory } from './data/taxonomyData';
import { dossierStore } from './utils/dossierStore';
import { PhoneCall, ShieldCheck, Settings } from 'lucide-react';

export const App: React.FC = () => {
  const [activeNav, setActiveNav] = useState('Home');
  const [selectedSidebarCat, setSelectedSidebarCat] = useState('cash-realisability');
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<GameProfile | null>(null);
  const [inspectingCategory, setInspectingCategory] = useState<TaxonomyCategory | null>(null);
  const [assistantInitialProfile, setAssistantInitialProfile] = useState<GameProfile | null>(null);
  const [isEthicsModalOpen, setIsEthicsModalOpen] = useState(false);

  // Live Dossier Store State (includes custom/ingested profiles)
  const [profiles, setProfiles] = useState<GameProfile[]>(() => dossierStore.getProfiles());

  useEffect(() => {
    return dossierStore.subscribe((updated) => {
      setProfiles(updated);
    });
  }, []);

  const handleSearchTag = (tag: string) => {
    setSearchQuery(tag);
    setActiveNav('Games');
  };

  const handleSelectTier = (tierCode: string) => {
    setSelectedTier(prev => prev === tierCode ? null : tierCode);
    setActiveNav('Games');
  };

  const handleAskAssistant = (profile: GameProfile) => {
    setAssistantInitialProfile(profile);
  };

  const handleDownloadPaper = () => {
    window.open('https://www.classification.gov.au/about-us/media-and-news/news/new-classifications-for-gambling-content-video-games', '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', display: 'flex', flexDirection: 'column' }}>
      {/* Australian Crisis Support Top Ribbon */}
      <div style={{
        background: '#093326',
        color: '#d1fae5',
        fontSize: '0.75rem',
        padding: '5px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 700, color: '#6ee7b7' }}>ECU CSG3101 Research:</span>
          <span>Socio-Technical Security Against Online Games for Cash • Dr. David Cook</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a
            href="tel:1800858858"
            style={{
              color: '#fca5a5',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <PhoneCall size={12} />
            <span>National Gambling Helpline: 1800 858 858 (24/7 Free)</span>
          </a>
          <button
            onClick={() => setActiveNav('Admin')}
            style={{
              background: 'rgba(52, 211, 153, 0.15)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              color: '#6ee7b7',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Open Data Ingestion & Classification Console"
          >
            <Settings size={12} />
            <span>Admin Portal</span>
          </button>
          <button
            onClick={() => setIsEthicsModalOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#d1fae5',
              cursor: 'pointer',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ShieldCheck size={13} />
            <span>Ethics & Disclaimer</span>
          </button>
        </div>
      </div>

      {/* Top Main Navbar */}
      <CashmaskNavbar
        activeNav={activeNav}
        setActiveNav={(nav) => {
          setActiveNav(nav);
          if (nav === 'Home') {
            setSelectedSidebarCat('cash-realisability');
          } else if (nav === 'Taxonomy') {
            if (selectedSidebarCat.startsWith('explore-') || selectedSidebarCat === 'cash-realisability') {
              setSelectedSidebarCat('');
            }
          } else if (nav === 'Games') {
            if (selectedSidebarCat && !selectedSidebarCat.startsWith('explore-')) {
              setSelectedSidebarCat('');
            }
          }
        }}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (q && activeNav !== 'Games') {
            setActiveNav('Games');
          }
        }}
        onDownloadPaper={handleDownloadPaper}
      />

      {/* Main 3-Column Layout Container */}
      <div style={{
        maxWidth: '1480px',
        margin: '0 auto',
        padding: '24px 24px 48px',
        display: 'flex',
        gap: '24px',
        flex: 1,
        width: '100%',
        alignItems: 'flex-start'
      }}>
        {/* LEFT COLUMN: TAXONOMY BROWSER SIDEBAR */}
        <TaxonomySidebar
          selectedCategory={selectedSidebarCat}
          onSelectCategory={(catId) => {
            setSelectedSidebarCat(catId);
            if (catId === 'cash-realisability') {
              setActiveNav('Home');
            } else if (catId.startsWith('explore-')) {
              if (catId === 'explore-faq' || catId === 'explore-parents') {
                setActiveNav('Guidance');
              } else if (catId === 'explore-methodology') {
                setActiveNav('Research');
              } else if (catId === 'explore-high-risk') {
                setSelectedTier('T6');
                setActiveNav('Games');
              } else if (catId === 'explore-search') {
                setSelectedTier(null);
                setActiveNav('Games');
              } else if (catId === 'explore-new') {
                setSelectedTier(null);
                setActiveNav('Games');
              } else {
                setActiveNav('Games');
              }
            } else {
              setActiveNav('Taxonomy');
            }
          }}
          onLearnMore={() => setActiveNav('About')}
        />

        {/* MIDDLE COLUMN: HERO, TIERS & CONTENT */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {activeNav === 'Home' && (
            <div>
              {/* Deep Green Hero Card */}
              <CashmaskHero
                onSearchTag={handleSearchTag}
                onSelectTier={handleSelectTier}
              />

              {/* Primary Axis: Cash Realisability Tiers with Gradient Bar */}
              <CashRealisabilityTiers
                selectedTier={selectedTier}
                onSelectTier={handleSelectTier}
              />

              {/* Explore by Harm Profile (from new renderings) */}
              <HarmProfileExplorer
                onSelectHarmProfile={(_harmType) => {
                  setSelectedSidebarCat('harm-profile');
                  setActiveNav('Taxonomy');
                }}
              />

              {/* Recently Added / Updated Games Live Index (from new renderings) */}
              <RecentlyClassifiedTable
                profiles={profiles}
                onSelectProfile={(p) => setSelectedProfile(p)}
                onViewAllGames={() => {
                  setSelectedSidebarCat('');
                  setActiveNav('Games');
                }}
              />
            </div>
          )}

          {activeNav === 'Taxonomy' && (
            <div style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '20px', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
              <div style={{ marginBottom: '16px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>
                  Interactive Taxonomy Blueprint
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  Full visual mapping of online game mechanics across demographics, motivations, and harm profiles.
                </p>
              </div>

              <TaxonomyTreeCanvas
                onSelectProfile={(p) => setSelectedProfile(p)}
                onSelectCategory={(cat) => setInspectingCategory(cat)}
                profiles={profiles}
                activeSidebarCategory={selectedSidebarCat}
                onClearCategoryFilter={() => setSelectedSidebarCat('')}
              />
            </div>
          )}

          {activeNav === 'Games' && (
            <div>
              <GamesView
                onSelectProfile={(p) => setSelectedProfile(p)}
                onAskAssistant={handleAskAssistant}
                filterTier={selectedTier}
                searchFilter={searchQuery}
                profiles={profiles}
                activeCategoryFilter={selectedSidebarCat}
                onClearCategoryFilter={() => {
                  setSelectedSidebarCat('');
                  setSelectedTier(null);
                }}
              />
            </div>
          )}

          {activeNav === 'Admin' && (
            <div>
              <AdminPanel
                onPreviewProfile={(p) => setSelectedProfile(p)}
              />
            </div>
          )}

          {activeNav === 'Research' && (
            <div>
              <ResearchView
                activeSection={selectedSidebarCat}
                onClearSection={() => setSelectedSidebarCat('')}
              />
            </div>
          )}

          {activeNav === 'About' && (
            <div>
              <AboutView />
            </div>
          )}

          {activeNav === 'Guidance' && (
            <div>
              <GuidanceView
                initialSection={
                  selectedSidebarCat === 'explore-faq'
                    ? 'faq'
                    : selectedSidebarCat === 'explore-parents'
                    ? 'parents'
                    : 'all'
                }
                onClearSection={() => setSelectedSidebarCat('')}
              />
            </div>
          )}
        </main>

        {/* RIGHT COLUMN: CASHMASK ASSISTANT CHATBOT */}
        <CashmaskAssistant
          initialProfileQuery={assistantInitialProfile}
          onClearInitialQuery={() => setAssistantInitialProfile(null)}
        />
      </div>

      {/* Institutional Research Footer (from new renderings) */}
      <CashmaskFooter
        onNavigate={setActiveNav}
        onSelectSidebarCategory={(catId) => {
          setSelectedSidebarCat(catId);
          if (catId === 'cash-realisability') {
            setActiveNav('Home');
          } else if (catId === 'explore-faq' || catId === 'explore-parents') {
            setActiveNav('Guidance');
          } else if (catId === 'explore-methodology') {
            setActiveNav('Research');
          } else if (catId === 'explore-high-risk' || catId === 'explore-new' || catId === 'explore-search') {
            setActiveNav('Games');
          } else {
            setActiveNav('Taxonomy');
          }
        }}
        onOpenEthicsModal={() => setIsEthicsModalOpen(true)}
        onDownloadPaper={handleDownloadPaper}
      />

      {/* Academic Dossier Slide-Over Drawer */}
      <DossierDrawer
        profile={selectedProfile}
        onClose={() => setSelectedProfile(null)}
        onAskChatbot={handleAskAssistant}
      />

      {/* Category Games & Branch Inspector Slide-Over Drawer */}
      <CategoryDrawer
        category={inspectingCategory}
        onClose={() => setInspectingCategory(null)}
        onSelectProfile={(p) => setSelectedProfile(p)}
        onAskChatbot={handleAskAssistant}
        profiles={profiles}
      />

      {/* Ethics & Legal Notice Modal */}
      <EthicsHelpModal
        isOpen={isEthicsModalOpen}
        onClose={() => setIsEthicsModalOpen(false)}
      />
    </div>
  );
};
