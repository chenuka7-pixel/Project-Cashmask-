import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  TAXONOMY_CATEGORIES, 
  TaxonomyCategory, 
  GameProfile, 
  RESEARCHED_PROFILES 
} from '../data/taxonomyData';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  Moon, 
  Sun,
  Search,
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface TaxonomyTreeCanvasProps {
  onSelectProfile: (profile: GameProfile) => void;
  onSelectCategory: (category: TaxonomyCategory) => void;
  profiles?: GameProfile[];
  activeSidebarCategory?: string;
  onClearCategoryFilter?: () => void;
}

const SIDEBAR_CATEGORY_FILTERS: Record<string, {
  title: string;
  badge: string;
  description: string;
  upCols: number[];
  downCols: number[];
  panX: number;
}> = {
  'audience-age': {
    title: 'Audience / Age Bands',
    badge: 'Demographics',
    description: 'Targeted demographic cohorts: Teenagers, Old People, and Adults subject to monetization mechanics.',
    upCols: [0, 1, 2],
    downCols: [],
    panX: 50
  },
  'game-types': {
    title: 'Game Types & Genres',
    badge: 'Genres',
    description: 'Game genres: First Person Shooters, Gacha, Mobile, Social Casino, Bingo, Pool, and Online Casinos.',
    upCols: [5, 6, 11, 13, 14, 16, 17],
    downCols: [1, 2, 13],
    panX: -550
  },
  'monetary-mechanics': {
    title: 'Monetary Mechanics',
    badge: 'Financial Flow',
    description: 'Extraction pathways: Microtransactions, Loot Boxes, Skin Gambling, Crypto, and Secondary Trading.',
    upCols: [12, 13],
    downCols: [4, 5, 16, 18],
    panX: -450
  },
  'harm-profile': {
    title: 'Harm Profile & Consequences',
    badge: 'Harm Vectors',
    description: 'Psychological and social harm outcomes: Depression, Social Isolation, and Financial hardship.',
    upCols: [],
    downCols: [6, 7, 12, 14],
    panX: -650
  },
  'who-is-harmed': {
    title: 'Who is Harmed?',
    badge: 'Vulnerability Impact',
    description: 'High-vulnerability populations: Underage youth, vulnerable seniors, and low-income households.',
    upCols: [0, 1, 2],
    downCols: [14, 15],
    panX: 50
  },
  'regulatory-status': {
    title: 'Regulatory Status',
    badge: 'Compliance & ACMA',
    description: 'Regulated Australian sportsbooks vs unlicensed offshore gambling sites subject to ACMA ISP blocking.',
    upCols: [7, 8, 9, 10, 12],
    downCols: [],
    panX: -850
  },
  'financial-exposure': {
    title: 'Financial Exposure & Wagering',
    badge: 'Wagering Capital',
    description: 'Distinguishing real-money betting and liquid assets from closed-loop digital entertainment.',
    upCols: [],
    downCols: [0, 1, 3, 4, 5],
    panX: -350
  }
};

export const TaxonomyTreeCanvas: React.FC<TaxonomyTreeCanvasProps> = ({ 
  onSelectProfile,
  onSelectCategory,
  profiles,
  activeSidebarCategory,
  onClearCategoryFilter
}) => {
  const activeProfiles = profiles || RESEARCHED_PROFILES;

  // Theme: 'light' (clean white schematic) vs 'dark' (sleek cyber blueprint)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  // Pan & Zoom
  const [scale, setScale] = useState(0.85);
  const [pan, setPan] = useState({ x: -180, y: 10 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ clientX: 0, clientY: 0, panX: 0, panY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeFilterInfo = useMemo(() => {
    if (!activeSidebarCategory) return null;
    return SIDEBAR_CATEGORY_FILTERS[activeSidebarCategory] || null;
  }, [activeSidebarCategory]);

  useEffect(() => {
    if (activeFilterInfo) {
      setPan({ x: activeFilterInfo.panX, y: 10 });
      setScale(0.85);
    }
  }, [activeFilterInfo]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // If clicking an interactive node, button, or input, do NOT drag
    if ((e.target as HTMLElement).closest('.interactive-node, .clickable-game, button, input')) {
      return;
    }
    setIsMouseDown(true);
    setIsDragging(false);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      setIsDragging(true);
      setPan({
        x: dragStartRef.current.panX + dx,
        y: dragStartRef.current.panY + dy
      });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    setScale((prev) => Math.min(Math.max(prev * factor, 0.35), 2.2));
  };

  const resetView = () => {
    setScale(0.85);
    setPan({ x: -180, y: 10 });
  };

  const fitView = () => {
    setScale(0.5);
    setPan({ x: 60, y: 50 });
  };

  const panToColumn = (colIdx: number) => {
    const colX = startX + colIdx * colWidth;
    setPan({
      x: -(colX * scale) + 400,
      y: 10
    });
  };

  // Helper to map game names to researched dossiers
  const getResearchedProfileForGame = (gameName: string): GameProfile | null => {
    const gn = gameName.toLowerCase().trim();
    // 1. Direct match by name or representative title or ID
    const directMatch = activeProfiles.find(
      (p) =>
        p.name.toLowerCase().includes(gn) ||
        p.representativeTitle.toLowerCase().includes(gn) ||
        p.id.toLowerCase() === gn
    );
    if (directMatch) return directMatch;

    // 2. Stem keywords
    if (gn.includes('cscase')) return activeProfiles.find((p) => p.id === 'G010') || null;
    if (gn.includes('csgoluck')) return activeProfiles.find((p) => p.id === 'G034') || null;
    if (gn === 'pool' || gn.includes('8 ball')) return activeProfiles.find((p) => p.id === 'G043') || null;
    if (gn.includes('bingo')) return activeProfiles.find((p) => p.id === 'G044') || null;
    if (
      gn.includes('cards') ||
      gn.includes('zynga') ||
      gn.includes("texas hold'em") ||
      gn.includes('rummy') ||
      gn.includes('teen patti') ||
      gn.includes('poker')
    ) {
      return activeProfiles.find((p) => p.id === 'G045') || null;
    }
    if (
      gn.includes('casino') ||
      gn.includes('blackjack') ||
      gn.includes('roulette') ||
      gn.includes('craps') ||
      gn.includes('livecasino')
    ) {
      return activeProfiles.find((p) => p.id === 'G045-C') || null;
    }
    if (
      gn.includes('melbet') ||
      gn.includes('1xbet') ||
      gn.includes('parimatch') ||
      gn.includes('cricket') ||
      gn.includes('ipl')
    ) {
      return activeProfiles.find((p) => p.id === 'G046') || null;
    }
    return null;
  };

  // Helper to map category branch label to taxonomy metadata
  const getCategoryByName = (name: string): TaxonomyCategory => {
    const cleanName = name.replace('\n', ' ').trim().toLowerCase();
    const found = TAXONOMY_CATEGORIES.find((c) => c.name.toLowerCase() === cleanName);
    if (found) return found;
    return {
      id: `cat-${cleanName.replace(/[^a-z0-9]/g, '-')}`,
      name: name.replace('\n', ' '),
      direction: 'UP',
      group: 'Taxonomy',
      gamesList: [],
      description: `Taxonomy classification axis for ${name.replace('\n', ' ')}.`,
      researchedProfileIds: []
    };
  };

  // 20 Columns matching WhatsApp blueprint
  const upBranches = [
    { name: 'Teenager', games: [] },
    { name: 'Old People', games: [] },
    { name: 'Adults', games: [] },
    { name: 'Football', games: [] },
    { name: 'Cricket IPL', games: ['Melbet'] },
    { name: 'First person\nshooting games', games: ['cscase.com'] },
    { name: 'Gacha', games: [] },
    { name: 'Sports Betting\nOperators', games: [] },
    { name: 'In-play/live\nBetting Platform', games: [] },
    { name: 'Betting\nExchange', games: [] },
    { name: 'Offshore\nGambling Sites', games: [] },
    { name: 'Bingo and\nKeno products', games: ['Bingo'] },
    { name: 'Cruise ship and\nTourist Gambling', games: [] },
    { name: 'Mobile', games: [] },
    { name: 'Social Casino\nGames', games: ['Cards', 'Casino', 'Bingo'] },
    { name: 'Fantasy Sports\nBetting', games: [] },
    { name: 'Lottery and\nDraw Games', games: [] },
    { name: 'Instant-Win &\nScratch Games', games: [] },
    { name: 'Wrestling', games: [] },
    { name: 'Basketball', games: [] }
  ];

  const downBranches = [
    { name: 'Horse racing', games: [] },
    { name: 'Online\nCasinos', games: ['Casino'] },
    { name: 'Pool and Billiard', games: ['8 Ball Pool'] },
    { name: 'Esports Betting', games: [] },
    { name: 'Loot-box\nsystem', games: ['csgoluck.com'] },
    { name: 'Skin\nGambling', games: ['cscase.com', 'csgoluck.com'] },
    { name: 'Depression', games: [] },
    { name: 'Social\nIsolation', games: [] },
    { name: 'Entertainment', games: [] },
    { name: 'Excitement', games: [] },
    { name: 'Curiosity', games: [] },
    { name: 'Social\nInfluence', games: [] },
    { name: 'Lack of\nknowledge', games: [] },
    { name: 'Poker', games: ['Cards'] },
    { name: 'Low\nincome\nhousehold', games: [] },
    { name: 'Rural\nCommunities', games: [] },
    { name: 'NFTS', games: [] },
    { name: 'Urban\nCommunities', games: [] },
    { name: 'Crypto\nGames', games: [] },
    { name: 'Metaverse\nPlatforms', games: [] }
  ];

  // Visual Theme Variables
  const isLight = theme === 'light';
  const canvasBg = isLight ? '#f8fafc' : '#0b0f19';
  const toolbarBg = isLight ? '#ffffff' : '#111827';
  const toolbarBorder = isLight ? '#e2e8f0' : '#1f2937';
  const lineColor = isLight ? '#334155' : 'rgba(255, 255, 255, 0.7)';
  const textColor = isLight ? '#0f172a' : '#f1f5f9';
  const titleColor = isLight ? '#093326' : '#ffffff';
  const highlightColor = isLight ? '#0284c7' : '#38bdf8';

  const colWidth = 155;
  const startX = 110;
  const axisY = 440;

  // Search Filter Matches
  const matchingBranches = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const q = searchTerm.toLowerCase().trim();
    const matches: { colIdx: number; name: string; direction: 'UP' | 'DOWN'; games: string[] }[] = [];

    upBranches.forEach((b, idx) => {
      const matchName = b.name.toLowerCase().includes(q);
      const matchGames = b.games.filter((g) => g.toLowerCase().includes(q));
      if (matchName || matchGames.length > 0) {
        matches.push({ colIdx: idx, name: b.name.replace('\n', ' '), direction: 'UP', games: b.games });
      }
    });

    downBranches.forEach((b, idx) => {
      const matchName = b.name.toLowerCase().includes(q);
      const matchGames = b.games.filter((g) => g.toLowerCase().includes(q));
      if (matchName || matchGames.length > 0) {
        matches.push({ colIdx: idx, name: b.name.replace('\n', ' '), direction: 'DOWN', games: b.games });
      }
    });

    return matches;
  }, [searchTerm]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      marginBottom: '32px',
      background: toolbarBg,
      borderRadius: '20px',
      border: `1px solid ${toolbarBorder}`,
      boxShadow: 'var(--shadow-card)',
      padding: '20px',
      transition: 'background 0.2s ease, border-color 0.2s ease'
    }}>
      {/* Top Toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '16px',
        padding: '12px 18px',
        background: isLight ? '#f1f5f9' : '#1e293b',
        borderRadius: '14px',
        border: `1px solid ${isLight ? '#cbd5e1' : '#334155'}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontWeight: 800,
            fontSize: '1rem',
            fontFamily: 'var(--font-display)',
            color: isLight ? '#093326' : '#f8fafc'
          }}>
            Taxonomy Schematic Explorer
          </span>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '6px',
            background: isLight ? '#dcfce7' : '#064e3b',
            color: isLight ? '#166534' : '#6ee7b7'
          }}>
            Official Classification Schema
          </span>
        </div>

        {/* Controls: Search & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search
              size={14}
              color={isLight ? '#64748b' : '#94a3b8'}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Filter game or node..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: isLight ? '#ffffff' : '#0f172a',
                border: `1px solid ${isLight ? '#cbd5e1' : '#475569'}`,
                color: isLight ? '#0f172a' : '#f8fafc',
                padding: '7px 30px 7px 30px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                outline: 'none',
                width: '190px',
                fontWeight: 600
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isLight ? '#64748b' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0
                }}
                title="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
            style={{
              background: isLight ? '#093326' : '#f59e0b',
              border: isLight ? '1px solid #064e3b' : '1px solid #d97706',
              color: isLight ? '#34d399' : '#093326',
              padding: '7px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: isLight ? '0 2px 6px rgba(9, 51, 38, 0.2)' : '0 2px 10px rgba(245, 158, 11, 0.4)',
              transition: 'all 0.15s ease'
            }}
          >
            {isLight ? <Moon size={14} /> : <Sun size={14} />}
            <span>{isLight ? '🌙 Dark Mode' : '☀️ Switch to Light Mode'}</span>
          </button>
        </div>
      </div>

      {/* Matching Search Results Quick-Bar */}
      {searchTerm.trim() && (
        <div style={{
          background: isLight ? '#fef3c7' : '#292524',
          border: `1px solid ${isLight ? '#fde68a' : '#78350f'}`,
          borderRadius: '10px',
          padding: '8px 14px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          fontSize: '0.8rem'
        }}>
          <span style={{ fontWeight: 700, color: isLight ? '#92400e' : '#fde68a' }}>
            Found {matchingBranches.length} matching {matchingBranches.length === 1 ? 'branch' : 'branches'}:
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {matchingBranches.map((m, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  panToColumn(m.colIdx);
                  onSelectCategory(getCategoryByName(m.name));
                }}
                style={{
                  background: isLight ? '#ffffff' : '#451a03',
                  border: `1px solid ${isLight ? '#f59e0b' : '#b45309'}`,
                  color: isLight ? '#78350f' : '#fef3c7',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>{m.name}</span>
                <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>({m.direction})</span>
                <ChevronRight size={12} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Sidebar Category Filter Banner */}
      {activeFilterInfo && (
        <div style={{
          background: isLight ? '#ecfdf5' : '#064e3b',
          border: `1.5px solid ${isLight ? '#34d399' : '#059669'}`,
          borderRadius: '12px',
          padding: '12px 18px',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                background: '#047857',
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.725rem',
                fontWeight: 800
              }}>
                {activeFilterInfo.badge}
              </span>
              <strong style={{ fontSize: '0.9rem', color: isLight ? '#065f46' : '#a7f3d0' }}>
                Active Filter: {activeFilterInfo.title}
              </strong>
            </div>
            <p style={{ fontSize: '0.775rem', color: isLight ? '#047857' : '#6ee7b7', margin: '4px 0 0' }}>
              {activeFilterInfo.description}
            </p>
          </div>
          {onClearCategoryFilter && (
            <button
              type="button"
              onClick={onClearCategoryFilter}
              style={{
                background: isLight ? '#ffffff' : '#0f172a',
                border: '1px solid #cbd5e1',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                color: isLight ? '#0f172a' : '#f8fafc',
                whiteSpace: 'nowrap'
              }}
            >
              Show Full Blueprint
            </button>
          )}
        </div>
      )}

      {/* Main Viewport Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          position: 'relative',
          width: '100%',
          height: '660px',
          background: canvasBg,
          borderRadius: '16px',
          border: isLight ? '1px solid #cbd5e1' : '1px solid #334155',
          boxShadow: isLight ? '0 10px 30px rgba(0,0,0,0.06)' : '0 10px 40px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          transition: 'background-color 0.2s ease'
        }}
      >
        {/* Navigation HUD Buttons */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          display: 'flex',
          gap: '6px',
          zIndex: 30,
          background: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(10px)',
          padding: '6px',
          borderRadius: '10px',
          border: isLight ? '1px solid #e2e8f0' : '1px solid #374151',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(s * 1.2, 2.2))}
            title="Zoom In"
            style={{
              background: 'none',
              border: 'none',
              color: isLight ? '#0f172a' : '#ffffff',
              padding: '6px 8px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <ZoomIn size={16} />
          </button>
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(s * 0.8, 0.35))}
            title="Zoom Out"
            style={{
              background: 'none',
              border: 'none',
              color: isLight ? '#0f172a' : '#ffffff',
              padding: '6px 8px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <ZoomOut size={16} />
          </button>
          <button
            type="button"
            onClick={resetView}
            title="Reset View"
            style={{
              background: 'none',
              border: 'none',
              color: isLight ? '#0f172a' : '#ffffff',
              padding: '6px 8px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={fitView}
            title="Fit to Screen"
            style={{
              background: 'none',
              border: 'none',
              color: isLight ? '#0f172a' : '#ffffff',
              padding: '6px 8px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            <Maximize2 size={16} />
          </button>
        </div>

        {/* Guide / Legend Badge */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 30,
          background: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(17, 24, 39, 0.9)',
          border: isLight ? '1px solid #cbd5e1' : '1px solid #374151',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '0.75rem',
          color: isLight ? '#334155' : '#cbd5e1',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#059669'
            }}></span>
            Click any category node to open detailed research drawer
          </span>
          <span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>
            • Drag canvas to pan | Scroll to zoom
          </span>
        </div>

        {/* THE SVG PANORAMIC SCHEMATIC CANVAS */}
        <div style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          width: '3350px',
          height: '920px',
          position: 'absolute',
          top: '20px',
          left: '20px',
          transition: isDragging ? 'none' : 'transform 0.08s ease-out',
          userSelect: 'none'
        }}>
          <svg width="3350" height="920" style={{ position: 'absolute', top: 0, left: 0 }}>
            {/* MAIN CENTRAL HORIZONTAL AXIS LINE */}
            <line
              x1={startX - 30}
              y1={axisY}
              x2={startX + 19 * colWidth + 50}
              y2={axisY}
              stroke={lineColor}
              strokeWidth="2.5"
            />

            {/* CENTRAL STEM DOWN TO TITLE */}
            <line
              x1={startX + 9.5 * colWidth}
              y1={axisY}
              x2={startX + 9.5 * colWidth}
              y2={axisY + 40}
              stroke={lineColor}
              strokeWidth="2"
            />

            {/* CENTRAL STEM FROM TITLE DOWN TO LOWER BASELINE */}
            <line
              x1={startX + 9.5 * colWidth}
              y1={axisY + 70}
              x2={startX + 9.5 * colWidth}
              y2={axisY + 110}
              stroke={lineColor}
              strokeWidth="2"
            />

            {/* LOWER HORIZONTAL BASELINE LINE */}
            <line
              x1={startX - 30}
              y1={axisY + 110}
              x2={startX + 19 * colWidth + 50}
              y2={axisY + 110}
              stroke={lineColor}
              strokeWidth="2.5"
            />

            {/* UPWARD BRANCHES STEMS & ARROWS */}
            {upBranches.map((_, idx) => {
              const cx = startX + idx * colWidth;
              return (
                <g key={`up-stem-${idx}`}>
                  {/* Stem from axis up to category label */}
                  <line
                    x1={cx}
                    y1={axisY}
                    x2={cx}
                    y2={axisY - 70}
                    stroke={lineColor}
                    strokeWidth="1.2"
                    strokeDasharray="4 2"
                  />
                  {/* Stem from category label up to arrow */}
                  <line
                    x1={cx}
                    y1={axisY - 110}
                    x2={cx}
                    y2={axisY - 140}
                    stroke={lineColor}
                    strokeWidth="1.2"
                  />
                  {/* Arrow Pointing UP */}
                  <polygon
                    points={`${cx},${axisY - 150} ${cx - 5},${axisY - 140} ${cx + 5},${axisY - 140}`}
                    fill={lineColor}
                  />
                </g>
              );
            })}

            {/* DOWNWARD BRANCHES STEMS & ARROWS */}
            {downBranches.map((_, idx) => {
              const cx = startX + idx * colWidth;
              return (
                <g key={`down-stem-${idx}`}>
                  {/* Stem from lower baseline down to category label */}
                  <line
                    x1={cx}
                    y1={axisY + 110}
                    x2={cx}
                    y2={axisY + 175}
                    stroke={lineColor}
                    strokeWidth="1.2"
                    strokeDasharray="4 2"
                  />
                  {/* Stem from category label down to arrow */}
                  <line
                    x1={cx}
                    y1={axisY + 215}
                    x2={cx}
                    y2={axisY + 240}
                    stroke={lineColor}
                    strokeWidth="1.2"
                  />
                  {/* Arrow Pointing DOWN */}
                  <polygon
                    points={`${cx},${axisY + 250} ${cx - 5},${axisY + 240} ${cx + 5},${axisY + 240}`}
                    fill={lineColor}
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Classification Axis Text */}
          <div style={{
            position: 'absolute',
            left: `${startX + 9.5 * colWidth}px`,
            top: `${axisY + 45}px`,
            transform: 'translateX(-50%)',
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            color: titleColor,
            whiteSpace: 'nowrap',
            letterSpacing: '-0.01em'
          }}>
            Classification of some games on different taxonomy
          </div>

          {/* UPWARD BRANCHES CONTENT (TOP HALF) */}
          {upBranches.map((col, idx) => {
            const cx = startX + idx * colWidth;
            const isMatch = searchTerm.trim() && (
              col.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
              col.games.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase().trim()))
            );

            const isAxisMatch = activeFilterInfo ? activeFilterInfo.upCols.includes(idx) : false;
            const isDimmed = activeFilterInfo ? !isAxisMatch : (searchTerm.trim() ? !isMatch : false);

            return (
              <div 
                key={`up-col-${idx}`}
                style={{
                  opacity: isDimmed ? 0.28 : 1,
                  transition: 'opacity 0.2s ease'
                }}
              >
                {/* Category Interactive Node Box */}
                <div 
                  className="interactive-node"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(getCategoryByName(col.name));
                  }}
                  style={{
                    position: 'absolute',
                    left: `${cx}px`,
                    top: `${axisY - 120}px`,
                    transform: isAxisMatch ? 'translateX(-50%) scale(1.08)' : 'translateX(-50%)',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: isAxisMatch
                      ? (isLight ? '#065f46' : '#6ee7b7')
                      : isMatch
                      ? '#093326'
                      : textColor,
                    whiteSpace: 'pre-line',
                    lineHeight: 1.2,
                    minWidth: '110px',
                    maxWidth: '135px',
                    cursor: 'pointer',
                    padding: '6px 8px',
                    borderRadius: '10px',
                    background: isAxisMatch
                      ? (isLight ? '#ecfdf5' : '#064e3b')
                      : isMatch
                      ? '#fde68a'
                      : isLight
                      ? '#ffffff'
                      : '#1e293b',
                    border: isAxisMatch
                      ? '2px solid #059669'
                      : isMatch
                      ? '2px solid #f59e0b'
                      : `1px solid ${isLight ? '#cbd5e1' : '#374151'}`,
                    boxShadow: isAxisMatch
                      ? '0 0 16px rgba(5, 150, 105, 0.45)'
                      : isMatch
                      ? '0 0 14px rgba(245, 158, 11, 0.6)'
                      : isLight
                      ? '0 2px 6px rgba(0,0,0,0.04)'
                      : '0 2px 6px rgba(0,0,0,0.3)',
                    transition: 'all 0.15s ease'
                  }}
                  title={`Inspect ${col.name.replace('\n', ' ')} branch (${col.games.length} games)`}
                >
                  <div>{col.name}</div>
                  <div style={{
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    color: isMatch
                      ? '#92400e'
                      : col.games.length > 0
                      ? isLight ? '#059669' : '#34d399'
                      : isLight ? '#64748b' : '#9ca3af',
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px'
                  }}>
                    <span>{col.games.length > 0 ? `${col.games.length} games` : 'Inspect'}</span>
                    <ExternalLink size={9} />
                  </div>
                </div>

                {/* Vertically Stacked Game Titles (above arrow) */}
                <div style={{
                  position: 'absolute',
                  left: `${cx}px`,
                  bottom: `${920 - (axisY - 160)}px`,
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column-reverse',
                  gap: '4px',
                  alignItems: 'center',
                  maxWidth: '135px'
                }}>
                  {col.games.length > 2 && (
                    <button
                      type="button"
                      className="interactive-node"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCategory(getCategoryByName(col.name));
                      }}
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        background: isLight ? '#ecfdf5' : '#064e3b',
                        color: isLight ? '#065f46' : '#6ee7b7',
                        border: `1px solid ${isLight ? '#a7f3d0' : '#059669'}`,
                        borderRadius: '10px',
                        padding: '2px 8px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        marginBottom: '2px'
                      }}
                    >
                      +{col.games.length - 2} more →
                    </button>
                  )}

                  {col.games.slice(0, 2).map((game, gIdx) => {
                    const researched = getResearchedProfileForGame(game);
                    const isHovered = hoveredGame === game;
                    const matchesSearch = searchTerm && game.toLowerCase().includes(searchTerm.toLowerCase().trim());

                    return (
                      <div
                        key={gIdx}
                        className="interactive-node clickable-game"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (researched) {
                            onSelectProfile(researched);
                          } else {
                            onSelectCategory(getCategoryByName(col.name));
                          }
                        }}
                        onMouseEnter={() => setHoveredGame(game)}
                        onMouseLeave={() => setHoveredGame(null)}
                        style={{
                          fontSize: '0.725rem',
                          color: researched 
                            ? (isLight ? '#065f46' : '#34d399') 
                            : matchesSearch 
                            ? highlightColor 
                            : (isLight ? '#1e293b' : '#cbd5e1'),
                          fontWeight: researched ? 800 : 600,
                          cursor: 'pointer',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: researched 
                            ? (isLight ? '#ecfdf5' : 'rgba(5, 150, 105, 0.25)') 
                            : matchesSearch 
                            ? (isLight ? '#e0f2fe' : 'rgba(56, 189, 248, 0.2)') 
                            : (isLight ? '#ffffff' : '#1e293b'),
                          border: researched 
                            ? `1px solid ${isLight ? '#10b981' : '#059669'}` 
                            : `1px solid ${isLight ? '#e2e8f0' : '#374151'}`,
                          whiteSpace: 'pre-line',
                          lineHeight: 1.15,
                          transition: 'all 0.15s ease',
                          transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                        }}
                        title={researched ? `Click to inspect verified dossier for ${researched.name}` : `Inspect ${col.name} games`}
                      >
                        {game}
                        {researched && (
                          <span style={{
                            display: 'block',
                            fontSize: '0.6rem',
                            color: isLight ? '#059669' : '#34d399',
                            fontFamily: 'var(--font-mono)',
                            marginTop: '1px'
                          }}>
                            [{researched.tierCode}]
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* DOWNWARD BRANCHES CONTENT (BOTTOM HALF) */}
          {downBranches.map((col, idx) => {
            const cx = startX + idx * colWidth;
            const isMatch = searchTerm.trim() && (
              col.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
              col.games.some((g) => g.toLowerCase().includes(searchTerm.toLowerCase().trim()))
            );

            const isAxisMatch = activeFilterInfo ? activeFilterInfo.downCols.includes(idx) : false;
            const isDimmed = activeFilterInfo ? !isAxisMatch : (searchTerm.trim() ? !isMatch : false);

            return (
              <div 
                key={`down-col-${idx}`}
                style={{
                  opacity: isDimmed ? 0.28 : 1,
                  transition: 'opacity 0.2s ease'
                }}
              >
                {/* Category Interactive Node Box */}
                <div 
                  className="interactive-node"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCategory(getCategoryByName(col.name));
                  }}
                  style={{
                    position: 'absolute',
                    left: `${cx}px`,
                    top: `${axisY + 180}px`,
                    transform: isAxisMatch ? 'translateX(-50%) scale(1.08)' : 'translateX(-50%)',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: isAxisMatch
                      ? (isLight ? '#065f46' : '#6ee7b7')
                      : isMatch
                      ? '#093326'
                      : textColor,
                    whiteSpace: 'pre-line',
                    lineHeight: 1.2,
                    minWidth: '110px',
                    maxWidth: '135px',
                    cursor: 'pointer',
                    padding: '6px 8px',
                    borderRadius: '10px',
                    background: isAxisMatch
                      ? (isLight ? '#ecfdf5' : '#064e3b')
                      : isMatch
                      ? '#fde68a'
                      : isLight
                      ? '#ffffff'
                      : '#1e293b',
                    border: isAxisMatch
                      ? '2px solid #059669'
                      : isMatch
                      ? '2px solid #f59e0b'
                      : `1px solid ${isLight ? '#cbd5e1' : '#374151'}`,
                    boxShadow: isAxisMatch
                      ? '0 0 16px rgba(5, 150, 105, 0.45)'
                      : isMatch
                      ? '0 0 14px rgba(245, 158, 11, 0.6)'
                      : isLight
                      ? '0 2px 6px rgba(0,0,0,0.04)'
                      : '0 2px 6px rgba(0,0,0,0.3)',
                    transition: 'all 0.15s ease'
                  }}
                  title={`Inspect ${col.name.replace('\n', ' ')} branch (${col.games.length} games)`}
                >
                  <div>{col.name}</div>
                  <div style={{
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    color: isMatch
                      ? '#92400e'
                      : col.games.length > 0
                      ? isLight ? '#059669' : '#34d399'
                      : isLight ? '#64748b' : '#9ca3af',
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px'
                  }}>
                    <span>{col.games.length > 0 ? `${col.games.length} games` : 'Inspect'}</span>
                    <ExternalLink size={9} />
                  </div>
                </div>

                {/* Vertically Stacked Game Titles (below arrow) */}
                <div style={{
                  position: 'absolute',
                  left: `${cx}px`,
                  top: `${axisY + 265}px`,
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  alignItems: 'center',
                  maxWidth: '135px'
                }}>
                  {col.games.slice(0, 2).map((game, gIdx) => {
                    const researched = getResearchedProfileForGame(game);
                    const isHovered = hoveredGame === game;
                    const matchesSearch = searchTerm && game.toLowerCase().includes(searchTerm.toLowerCase().trim());

                    return (
                      <div
                        key={gIdx}
                        className="interactive-node clickable-game"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (researched) {
                            onSelectProfile(researched);
                          } else {
                            onSelectCategory(getCategoryByName(col.name));
                          }
                        }}
                        onMouseEnter={() => setHoveredGame(game)}
                        onMouseLeave={() => setHoveredGame(null)}
                        style={{
                          fontSize: '0.725rem',
                          color: researched 
                            ? (isLight ? '#065f46' : '#34d399') 
                            : matchesSearch 
                            ? highlightColor 
                            : (isLight ? '#1e293b' : '#cbd5e1'),
                          fontWeight: researched ? 800 : 600,
                          cursor: 'pointer',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: researched 
                            ? (isLight ? '#ecfdf5' : 'rgba(5, 150, 105, 0.25)') 
                            : matchesSearch 
                            ? (isLight ? '#e0f2fe' : 'rgba(56, 189, 248, 0.2)') 
                            : (isLight ? '#ffffff' : '#1e293b'),
                          border: researched 
                            ? `1px solid ${isLight ? '#10b981' : '#059669'}` 
                            : `1px solid ${isLight ? '#e2e8f0' : '#374151'}`,
                          whiteSpace: 'pre-line',
                          lineHeight: 1.15,
                          transition: 'all 0.15s ease',
                          transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                        }}
                        title={researched ? `Click to inspect verified dossier for ${researched.name}` : `Inspect ${col.name} games`}
                      >
                        {game}
                        {researched && (
                          <span style={{
                            display: 'block',
                            fontSize: '0.6rem',
                            color: isLight ? '#059669' : '#34d399',
                            fontFamily: 'var(--font-mono)',
                            marginTop: '1px'
                          }}>
                            [{researched.tierCode}]
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
