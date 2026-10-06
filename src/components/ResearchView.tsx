import React, { useState } from 'react';
import { 
  Download, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';
import { TIER_DEFINITIONS } from '../data/taxonomyData';

export const ResearchView: React.FC = () => {
  const [selectedTierDetail, setSelectedTierDetail] = useState<string>('T2');

  const handleDownloadPaper = () => {
    window.open(
      'https://www.classification.gov.au/about-us/media-and-news/news/new-classifications-for-gambling-content-video-games',
      '_blank'
    );
  };

  const citationsList = [
    {
      authors: 'Langham, E., Thorne, H., Browne, M., Donaldson, P., Rose, J., & Rockloff, M.',
      year: '2016',
      title: 'Understanding gambling related harm: a proposed definition, conceptual framework, and taxonomy of harms.',
      journal: 'BMC Public Health, 16, Article 80',
      doi: 'https://doi.org/10.1186/s12889-016-2747-0',
      relevance: 'Provides the 7-dimension socio-technical harm taxonomy foundational to CASHMASK scoring.'
    },
    {
      authors: 'Drummond, A., & Sauer, J. D.',
      year: '2018',
      title: 'Video game loot boxes are psychologically akin to gambling.',
      journal: 'Nature Human Behaviour, 2(8), 530–532',
      doi: 'https://doi.org/10.1038/s41562-018-0360-7',
      relevance: 'Demonstrates empirical overlap between variable-ratio game draws and traditional gambling.'
    },
    {
      authors: 'Spicer, S. G., Nicklin, L. L., Uther, M., Lloyd, J., Lloyd, H., & Close, J.',
      year: '2022',
      title: 'Loot boxes, problem gambling and problem video gaming: A systematic review and meta-synthesis.',
      journal: 'New Media & Society, 24(4), 1001–1022',
      doi: 'https://doi.org/10.1177/14614448211027175',
      relevance: 'Meta-analysis establishing reliable positive correlation between loot spending and problem gambling.'
    },
    {
      authors: 'Greer, N., Murray Boyle, C., & Jenkinson, R.',
      year: '2022',
      title: 'Harms associated with loot boxes, simulated gambling and other in-game purchases in video games.',
      journal: 'Australian Institute of Family Studies (AIFS)',
      doi: 'https://aifs.gov.au/research-programs/australian-gambling-research-centre',
      relevance: 'Australian government study evaluating cumulative financial and psychological harm on youth.'
    },
    {
      authors: 'Carter, M., Zhangshao, T., Hardwick, T., Egliston, B., & Xiao, L. Y.',
      year: '2025',
      title: 'Investigating mobile games’ compliance with Australia’s 2024 mandatory minimum age classifications scheme for gambling-like mechanics.',
      journal: 'SSRN Preprint',
      doi: 'https://doi.org/10.2139/ssrn.5543999',
      relevance: 'Empirical audit demonstrating widespread non-compliance of App Store games with Australian ACB rules.'
    }
  ];

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '24px',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      boxShadow: 'var(--shadow-card)',
      padding: '36px',
      marginBottom: '40px'
    }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #093326 0%, #064e3b 60%, #0f766e 100%)',
        borderRadius: '18px',
        padding: '32px',
        color: '#ffffff',
        marginBottom: '36px',
        boxShadow: '0 8px 24px rgba(9, 51, 38, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{
            background: 'rgba(52, 211, 153, 0.2)',
            color: '#6ee7b7',
            padding: '3px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.04em'
          }}>
            ECU CSG3101 RESEARCH FRAMEWORK
          </span>
          <span style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>
            Edith Cowan University • School of Science
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 10px', lineHeight: 1.2 }}>
          Socio-Technical Security Against Online Games for Cash
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#d1fae5', maxWidth: '750px', lineHeight: 1.6, margin: 0 }}>
          Investigating convertibility and financial extraction in interactive entertainment. A scientific classification methodology developed under academic supervision at Edith Cowan University.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
          <button
            onClick={handleDownloadPaper}
            style={{
              background: '#ffffff',
              color: '#093326',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            <Download size={16} />
            <span>Australian Classification Guidelines (Sept 2024)</span>
          </button>
        </div>
      </div>

      {/* Section 1: The Core Scientific Thesis */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#093326', marginBottom: '12px' }}>
          1. The Research Thesis: Content vs. Convertibility
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '20px' }}>
          Legacy age classification frameworks (such as PEGI in Europe, the ESRB in North America, and historically the Australian Classification Board) were designed around <em>thematic content</em>—censoring or gating games based on violence, language, sexual themes, or horror. However, modern predatory monetization does not rely on thematic shock value; it operates through <strong>variable-ratio micro-financial extraction</strong>.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', marginBottom: '10px' }}>
              <AlertTriangle size={20} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>Legacy Content-Based Systems</h3>
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: '#7f1d1d', lineHeight: 1.7, margin: 0 }}>
              <li>Rates games solely on surface audiovisual themes (violence, nudity, coarse language).</li>
              <li>Treats real-money transactions as an informational footer label (e.g. <em>"In-Game Purchases"</em>).</li>
              <li>Fails to evaluate whether money can be deposited, wagered, or converted back to fiat currency.</li>
              <li>Allows predatory casino and loot mechanics to enter children's devices with <strong>3+ / 7+ ratings</strong>.</li>
            </ul>
          </div>

          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46', marginBottom: '10px' }}>
              <CheckCircle2 size={20} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>CASHMASK Convertibility Continuum</h3>
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: '#064e3b', lineHeight: 1.7, margin: 0 }}>
              <li>Evaluates the <strong>structural liquidity</strong> of virtual currency and items.</li>
              <li>Tests whether virtual items can be liquidated via grey-market P2P, dev-exchange, or offshore bookmakers.</li>
              <li>Classifies platforms from <strong>T0 (No Paid Element)</strong> to <strong>T6 (Unlicensed Wagering)</strong>.</li>
              <li>Directly informs parents and regulators if a game functions as an unrated gambling mechanism.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section 2: Interactive T0–T6 Continuum Explorer */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#093326', marginBottom: '8px' }}>
          2. The T0–T6 Cash Realisability Continuum
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '20px' }}>
          Click any tier below to examine its formal operational definition, liquidity dynamics, and statutory implications under Australian law:
        </p>

        {/* Tier Selector Chips */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px',
          marginBottom: '20px'
        }}>
          {Object.keys(TIER_DEFINITIONS).map((code) => {
            const info = TIER_DEFINITIONS[code];
            const isSelected = selectedTierDetail === code;
            return (
              <button
                key={code}
                onClick={() => setSelectedTierDetail(code)}
                style={{
                  background: isSelected ? info.color : '#f8fafc',
                  color: isSelected ? '#ffffff' : '#334155',
                  border: `2px solid ${isSelected ? info.color : '#e2e8f0'}`,
                  borderRadius: '12px',
                  padding: '12px 10px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{code}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, opacity: 0.9, marginTop: '2px' }}>
                  {info.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Deep-Dive Card */}
        {(() => {
          const tier = TIER_DEFINITIONS[selectedTierDetail];
          return (
            <div style={{
              background: '#f8fafc',
              border: `2px solid ${tier.color}`,
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 4px 14px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span style={{
                  background: tier.color,
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  padding: '4px 12px',
                  borderRadius: '8px'
                }}>
                  {tier.code}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {tier.title}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  • {tier.shortDesc}
                </span>
              </div>

              <p style={{ fontSize: '0.925rem', color: '#334155', lineHeight: 1.6, marginBottom: '20px' }}>
                {tier.fullDesc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#093326', margin: '0 0 6px' }}>
                    FINANCIAL INFLOW (DEPOSIT)
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    {selectedTierDetail === 'T0'
                      ? 'No real-money deposits accepted or possible.'
                      : selectedTierDetail === 'T1'
                      ? 'Direct in-game purchase of fixed digital cosmetics or virtual tokens.'
                      : selectedTierDetail === 'T2'
                      ? 'Purchase of variable-ratio random items (loot boxes, gachas, card packs).'
                      : selectedTierDetail === 'T3'
                      ? 'Real-money deposits into platform or secondary trading ecosystems.'
                      : selectedTierDetail === 'T4'
                      ? 'Purchase of intermediate creator tokens (Robux, sweepstakes coins).'
                      : 'Real fiat currency, cryptocurrency, or virtual assets deposited for wagering.'}
                  </p>
                </div>

                <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#093326', margin: '0 0 6px' }}>
                    CONVERTIBILITY / OUTFLOW (CASH-OUT)
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    {selectedTierDetail === 'T0' || selectedTierDetail === 'T1' || selectedTierDetail === 'T2'
                      ? 'Closed-loop: No official or legal mechanism to withdraw or liquidate virtual assets for fiat currency.'
                      : selectedTierDetail === 'T3'
                      ? 'Grey-market convertibility: Liquidated for fiat cash via third-party marketplaces (e.g. CS2 skin cashout sites).'
                      : selectedTierDetail === 'T4'
                      ? 'Token-mediated cash-out: Converted through developer programs (e.g. Roblox DevEx) or dual-currency sweepstakes.'
                      : selectedTierDetail === 'T5'
                      ? 'Licensed cash-out: Payout directly to verified Australian bank account under state gaming regulation.'
                      : 'Offshore cash-out: High friction or crypto withdrawal; risk of account freezes and no regulatory recourse.'}
                  </p>
                </div>

                <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#093326', margin: '0 0 6px' }}>
                    AUSTRALIAN REGULATORY STATUS
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                    {selectedTierDetail === 'T0' || selectedTierDetail === 'T1'
                      ? 'General consumer protection under Australian Consumer Law (ACL).'
                      : selectedTierDetail === 'T2'
                      ? 'Subject to mandatory minimum M rating under Australian Classification Board September 2024 rules.'
                      : selectedTierDetail === 'T3' || selectedTierDetail === 'T4'
                      ? 'Subject to ACMA review and potential Interactive Gambling Act scrutiny depending on primary wagering mechanism.'
                      : selectedTierDetail === 'T5'
                      ? 'Regulated under Australian state/territory licensing; mandatory BetStop and KYC integration.'
                      : 'Prohibited service under Interactive Gambling Act 2001 (Cth); subject to ACMA domain blocking and financial penalties.'}
                  </p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Section 3: Peer-Reviewed Scientific Bibliography */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#093326', marginBottom: '8px' }}>
          3. Peer-Reviewed Academic Bibliography & Sources
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '20px' }}>
          The CASHMASK framework grounds its harm dimensions in leading peer-reviewed literature and statutory evaluations:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {citationsList.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '16px',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ flex: '1 1 500px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                  {item.authors} ({item.year}). {item.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', marginBottom: '6px' }}>
                  {item.journal}
                </div>
                <div style={{ fontSize: '0.775rem', color: '#059669', fontWeight: 600 }}>
                  <strong>CASHMASK Application:</strong> {item.relevance}
                </div>
              </div>

              <a
                href={item.doi}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#093326',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '6px 12px',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>View Source</span>
                <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
