import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Cpu, 
  ShieldCheck
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const teamMembers = [
    { name: 'Pasidu Gangodavilage', role: 'Project Lead & Lead Research Analyst', campus: 'Joondalup Campus' },
    { name: 'Kumarage Perera', role: 'Technical Architecture & Database Systems', campus: 'Joondalup Campus' },
    { name: 'Chenuka Arachchilage', role: 'Socio-Technical Vulnerability Analysis', campus: 'Joondalup Campus' },
    { name: 'Pasini Arachchilage', role: 'Classification Framework & Ethics Compliance', campus: 'Joondalup Campus' },
    { name: 'MD Anik', role: 'Regulatory Policy & ACMA Data Governance', campus: 'Joondalup Campus' },
    { name: 'Ilhaan Fakeermahamood', role: 'Interface Systems & Taxonomy Engineering', campus: 'Joondalup Campus' }
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
      {/* Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #093326 0%, #064e3b 50%, #047857 100%)',
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
            EDITH COWAN UNIVERSITY APPLIED PROJECT
          </span>
          <span style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>
            Unit CSG3101 • School of Science
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
          About the CASHMASK Project
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#d1fae5', maxWidth: '750px', lineHeight: 1.6, margin: 0 }}>
          Socio-Technical Security Against Online Games for Cash. An academic initiative dedicated to illuminating covert gambling mechanics, predatory microtransactions, and unregulated cash-out routes in modern video games.
        </p>
      </div>

      {/* Institutional Governance Banner */}
      <div style={{
        background: '#ecfdf5',
        border: '1px solid #a7f3d0',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '36px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '18px'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: '#065f46',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <GraduationCap size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46', margin: '0 0 6px' }}>
            Academic Supervision & Institutional Host
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#047857', lineHeight: 1.6, margin: 0 }}>
            <strong>Academic Supervisor:</strong> Dr. David Cook, Edith Cowan University (Joondalup Campus, Western Australia).<br />
            <strong>Research Unit:</strong> CSG3101 Applied Project in Computing and Security.<br />
            <strong>Focus:</strong> Socio-technical security, consumer vulnerability exploitation, digital asset liquidity, and Australian gambling regulation compliance.
          </p>
        </div>
      </div>

      {/* Student Research Team Grid */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Users size={20} color="#093326" />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#093326', margin: 0 }}>
            Student Research Team
          </h2>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '20px' }}>
          ECU School of Science student investigators collaborating on empirical analysis, classification modelling, and software development:
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {teamMembers.map((m, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '18px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', marginBottom: '4px' }}>
                {m.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600, marginBottom: '6px' }}>
                {m.role}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {m.campus} • Edith Cowan University
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Mission & The Problem */}
      <div style={{ marginBottom: '36px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#093326', marginBottom: '12px' }}>
          Our Mission: Know the Game. Know the Risk.
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '16px' }}>
          People lose real money to online games that were never presented to them as gambling, and they cannot easily determine which games these are. Video game storefronts often market slot machines as <em>"social games"</em>, unregulated loot-box roll sites as <em>"unboxing fun"</em>, and offshore bookmakers as <em>"esports hubs"</em>.
        </p>
        <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.7, marginBottom: '20px' }}>
          CASHMASK provides an evidence-based taxonomy and automated advisory system to unmask these mechanisms, arming Australian parents, educators, healthcare professionals, and government regulators with clear socio-technical transparency.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#093326', marginBottom: '6px' }}>
              1. Convertibility Analysis
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Tracking whether virtual items can be liquidated for real cash through grey markets, secondary exchanges, or developer payout routes.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#093326', marginBottom: '6px' }}>
              2. Socio-Technical Harm Scoring
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Applying Langham et al.’s validated 7-dimension harm framework to assess financial loss, emotional distress, and relationship friction.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#093326', marginBottom: '6px' }}>
              3. Australian Regulatory Alignment
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Correlating game mechanics with ACMA enforcement actions and the Australian Classification Board September 2024 mandates.
            </p>
          </div>
        </div>
      </div>

      {/* Technology & Infrastructure Stack */}
      <div style={{
        background: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        marginBottom: '36px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Cpu size={20} color="#093326" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#093326', margin: 0 }}>
            System Architecture & Technology Stack
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669' }}>DATABASE LAYER</span>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Neon Lakebase Serverless Postgres</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Sydney Region (ap-southeast-2 AWS pooler)</div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669' }}>FRONTEND FRAMEWORK</span>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Vite + React 18 + TypeScript</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Vanilla CSS design tokens matching CASHMASK brand</div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669' }}>ADVISORY AI ENGINE</span>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>OpenRouter GPT-4o Integration</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Scope-restricted academic guidance chatbot</div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#059669' }}>CRISIS INTERVENTION</span>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>Australian Crisis Protocol Guardrails</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>National Gambling Helpline (1800 858 858) & BetStop</div>
          </div>
        </div>
      </div>

      {/* Ethical Statement & Academic Disclaimer */}
      <div style={{
        background: '#fffbeb',
        border: '1px solid #fde68a',
        borderRadius: '16px',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#92400e', marginBottom: '8px' }}>
          <ShieldCheck size={20} />
          <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>
            Academic Research Disclaimer & Ethics Declaration
          </h3>
        </div>
        <p style={{ fontSize: '0.825rem', color: '#78350f', lineHeight: 1.6, margin: 0 }}>
          This web application and classification database was developed exclusively for academic research purposes under Edith Cowan University Unit CSG3101. The classifications, harm assessments, and risk ratings represent independent academic analysis based on documented game mechanics and publicly available regulatory evidence. They do not constitute formal legal advice, consumer financial guidance, or clinical diagnoses. All trademarks, company names, and game titles are the property of their respective owners and are referenced under the fair dealing provisions of the <em>Copyright Act 1968 (Cth)</em> for research, study, criticism, and review.
        </p>
      </div>
    </div>
  );
};
