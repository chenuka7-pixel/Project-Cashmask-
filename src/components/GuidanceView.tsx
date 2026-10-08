import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  ExternalLink, 
  Lock, 
  AlertTriangle, 
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface GuidanceViewProps {
  initialSection?: 'all' | 'screener' | 'parents' | 'faq';
  onClearSection?: () => void;
}

export const GuidanceView: React.FC<GuidanceViewProps> = ({
  initialSection = 'all',
  onClearSection
}) => {
  // Screener state
  const [screenerAnswers, setScreenerAnswers] = useState<Record<number, boolean>>({});
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activePlatformTab, setActivePlatformTab] = useState<'apple' | 'google' | 'steam' | 'playstation' | 'xbox'>('apple');

  const screenerRef = React.useRef<HTMLDivElement>(null);
  const parentsRef = React.useRef<HTMLDivElement>(null);
  const faqRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (initialSection === 'faq') {
      setActiveFaq(0);
      setTimeout(() => {
        faqRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else if (initialSection === 'parents') {
      setTimeout(() => {
        parentsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [initialSection]);

  const screenerQuestions = [
    {
      id: 1,
      question: "Does the game require paying real money for mystery boxes, crates, or card packs with randomised contents?",
      weight: 3,
      context: "Variable-ratio reinforcement schedule (mechanically identical to poker machine reels)."
    },
    {
      id: 2,
      question: "Does the game convert real money into secondary fictional currencies (e.g., Gems, Coins, Robux) before spending?",
      weight: 2,
      context: "Financial decoupling masks the actual AUD cost from the player and young adolescents."
    },
    {
      id: 3,
      question: "Can in-game items, skins, or accounts be traded to other players or cashed out through third-party websites?",
      weight: 4,
      context: "Real-world cashability creates secondary black markets and drives speculative gambling."
    },
    {
      id: 4,
      question: "Have you noticed hidden charges, recurring subscription traps, or pressure to buy items before a timer expires (FOMO)?",
      weight: 2,
      context: "Predatory dark patterns exploiting psychological urgency and cognitive biases."
    },
    {
      id: 5,
      question: "Does the player exhibit distress, mood swings, deception about spending, or loss of sleep over the game?",
      weight: 3,
      context: "Established behavioral indicators of behavioral addiction and financial harm."
    }
  ];

  const handleToggleAnswer = (id: number, val: boolean) => {
    setScreenerAnswers(prev => ({ ...prev, [id]: val }));
  };

  const answeredCount = Object.keys(screenerAnswers).length;
  const currentRiskScore = screenerQuestions.reduce((acc, q) => {
    return acc + (screenerAnswers[q.id] ? q.weight : 0);
  }, 0);

  const getRiskEvaluation = (score: number) => {
    if (answeredCount < 3) return { level: 'Incomplete', color: '#6b7280', bg: '#f3f4f6', text: 'Answer questions above to calculate household risk level.' };
    if (score <= 2) return { level: 'Low Risk (T0-T1)', color: '#059669', bg: '#ecfdf5', text: 'Minimal conversion potential. Game appears to have low monetization harm, though regular screen-time monitoring is still advised.' };
    if (score <= 6) return { level: 'Moderate Vulnerability (T2-T3)', color: '#d97706', bg: '#fffbeb', text: 'Significant microtransaction exposure. Implement platform spending caps immediately and monitor bank statements for recurring charges.' };
    if (score <= 10) return { level: 'High Harm Exposure (T4-T5)', color: '#ea580c', bg: '#fff7ed', text: 'Aggressive loot boxes or secondary market liquidity detected. Highly predatory monetization resembling regulated gambling.' };
    return { level: 'Critical Threat (T6 Alert)', color: '#dc2626', bg: '#fef2f2', text: 'Direct financial convertibility or simulated gambling mechanics. Immediate intervention, device lock-down, and financial audits strongly recommended.' };
  };

  const evaluation = getRiskEvaluation(currentRiskScore);

  const supportServices = [
    {
      name: "National Gambling Helpline",
      phone: "1800 858 858",
      url: "https://www.gamblinghelponline.org.au",
      desc: "Free, confidential 24/7 phone & live chat counselling provided by Australian state and federal governments.",
      available: "24 Hours / 7 Days",
      badge: "Primary Support"
    },
    {
      name: "BetStop – National Self-Exclusion",
      phone: "1800 238 786",
      url: "https://www.betstop.gov.au",
      desc: "Australian Government initiative allowing individuals to self-exclude from all licensed Australian interactive wagering providers in a single step.",
      available: "Online Register",
      badge: "Self-Exclusion"
    },
    {
      name: "Financial Counselling Australia",
      phone: "1800 007 007",
      url: "https://ndh.org.au",
      desc: "National Debt Helpline offering free, independent financial counselling for individuals facing debt from in-game spending and credit card overdraws.",
      available: "Mon–Fri 9:30am–4:30pm",
      badge: "Debt & Finance"
    },
    {
      name: "Kids Helpline Australia",
      phone: "1800 55 1800",
      url: "https://kidshelpline.com.au",
      desc: "Australia’s only free, 24/7 confidential phone and online counselling service specifically for young people aged 5 to 25.",
      available: "24 Hours / 7 Days",
      badge: "Youth & Teens"
    },
    {
      name: "Lifeline Australia",
      phone: "13 11 14",
      url: "https://www.lifeline.org.au",
      desc: "24-hour Australian crisis support and suicide prevention services for individuals experiencing severe emotional distress.",
      available: "24 Hours / 7 Days",
      badge: "Crisis Support"
    }
  ];

  const platformGuides = {
    apple: {
      name: "Apple iOS (iPhone & iPad)",
      steps: [
        "Go to Settings > Screen Time on the family organizer's device.",
        "Select Content & Privacy Restrictions and enter a secret 4-digit Parent Passcode.",
        "Tap iTunes & App Store Purchases > In-app Purchases, and change setting to 'Don't Allow'.",
        "Enable 'Ask to Buy' under Family Sharing so every download and purchase requires parental biometric approval.",
        "Remove any stored credit cards from Apple Wallet on the child's personal device."
      ]
    },
    google: {
      name: "Google Android & Play Store",
      steps: [
        "Open Google Play Store app > Tap Profile icon in top right > Settings.",
        "Select 'Authentication' > 'Require authentication for purchases'.",
        "Select 'For all purchases through Google Play on this device' and enable biometric/fingerprint lock.",
        "Install the 'Google Family Link' app to remotely approve or decline each purchase request.",
        "Set Google Play budget alerts under Payments & Subscriptions > Budget & History."
      ]
    },
    steam: {
      name: "Steam (PC / Mac)",
      steps: [
        "Open Steam > Settings > Family > Family View.",
        "Run the Family View wizard and select 'Only games I choose'.",
        "Uncheck access to the 'Steam Store' and 'Community Content' (disables Community Market item trading).",
        "Set a secret 4-digit PIN required to unlock store browsing or wallet spending.",
        "Enable Steam Guard Mobile Authenticator to prevent unauthorized P2P trading or account compromises."
      ]
    },
    playstation: {
      name: "Sony PlayStation (PS4 & PS5)",
      steps: [
        "Sign in as Family Manager on console or web at playstation.com.",
        "Go to Settings > Family and Parental Controls > Family Management.",
        "Select the child account > Applications/Devices/Network Features.",
        "Set 'Monthly Spending Limit' to exactly $0.00 AUD (never rely on default uncapped limits).",
        "Enable 'Require Password at Checkout' under User Management > Login Settings."
      ]
    },
    xbox: {
      name: "Microsoft Xbox & Windows PC",
      steps: [
        "Download the 'Xbox Family Settings' app on your phone (iOS / Android).",
        "Select your child’s gamer profile > 'Spending'.",
        "Toggle ON 'Ask to Buy' for every purchase.",
        "Set account balance and toggle OFF permission to save credit cards on the console.",
        "Under console Settings > Account > Sign-in & Security, require a passkey for store checkouts."
      ]
    }
  };

  const faqs = [
    {
      q: "Why do games use fictional currencies like Robux, V-Bucks, or Primogems?",
      a: "This behavioral design technique is called 'currency decoupling'. When players convert AUD dollars into gems or tokens, the human brain stops calculating the real-world value of individual purchases. It also allows developers to price items in awkward quantities (e.g., selling 500 coins for $7.99 when a skin costs 600 coins), forcing players to buy another bundle and leaving an 'endowment effect' remainder."
    },
    {
      q: "What changed under Australian law on 22 September 2024?",
      a: "The Australian Classification Board implemented strict mandatory minimum age ratings: (1) Any game containing paid chance-based mechanics (such as loot boxes or mystery spins) automatically receives a minimum 'M' (Mature - not recommended for persons under 15) rating. (2) Any game containing simulated gambling (interactive games simulating casino games or pokies) receives a mandatory 'R18+' legally restricted rating."
    },
    {
      q: "Can I get a refund under Australian Consumer Law for unauthorized purchases made by my child?",
      a: "Under the Australian Consumer Law (ACL), consumers have rights against unfair contract terms and misleading or unconscionable conduct. Both Apple and Google have formal refund dispute processes for unauthorized minor purchases, provided you report them promptly. If platforms refuse, complaints can be escalated to the Australian Competition and Consumer Commission (ACCC) or state Fair Trading bodies."
    },
    {
      q: "What is 'Skin Gambling' and is it legal in Australia?",
      a: "Skin gambling occurs when cosmetic in-game items (such as CS:GO / CS2 weapon finishes or TF2 keys) are used as digital casino chips on third-party offshore betting websites via Steam OpenID API. Under the Interactive Gambling Act 2001 (Cth), offering unlicensed online casino or gambling services to people physically located in Australia is illegal. The ACMA actively issues ISP blocking orders against these domains."
    },
    {
      q: "What should I do if a family member is showing signs of video game gambling addiction?",
      a: "Contact the National Gambling Helpline (1800 858 858) immediately. It is free, confidential, and staffed 24/7 by accredited professionals. Additionally, enable BetStop self-exclusion if real-money wagering is involved, lock down payment cards on all gaming consoles, and speak with an independent financial counsellor at the National Debt Helpline (1800 007 007)."
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
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #093326 0%, #064e3b 55%, #0d9488 100%)',
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
            HARM REDUCTION & CONSUMER PROTECTION HUB
          </span>
          <span style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>
            Australian Legal & Clinical Standard
          </span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
          Parent & Player Guidance Hub
        </h1>
        <p style={{ fontSize: '0.95rem', color: '#d1fae5', maxWidth: '780px', lineHeight: 1.6, margin: 0 }}>
          Practical tools, device parental control blueprints, behavioral warning checklists, and 24/7 Australian crisis hotlines to safeguard young people from predatory video game monetization and covert gambling mechanics.
        </p>
      </div>

      {/* Active Section Filter Banner */}
      {initialSection === 'faq' && (
        <div style={{
          background: '#eff6ff',
          border: '1.5px solid #60a5fa',
          borderRadius: '14px',
          padding: '14px 20px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#2563eb', color: '#ffffff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                FAQ VIEW
              </span>
              <strong style={{ color: '#1e40af', fontSize: '0.9rem' }}>
                Frequently Asked Questions & Australian Regulations
              </strong>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.775rem', color: '#1d4ed8' }}>
              Scrolled to plain-English guidance on loot box legal definitions, secondary skin markets, and Australian law.
            </p>
          </div>
          {onClearSection && (
            <button
              type="button"
              onClick={onClearSection}
              style={{
                background: '#ffffff',
                border: '1px solid #bfdbfe',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                color: '#1e40af'
              }}
            >
              Show Full Guidance Hub
            </button>
          )}
        </div>
      )}

      {initialSection === 'parents' && (
        <div style={{
          background: '#ecfdf5',
          border: '1.5px solid #34d399',
          borderRadius: '14px',
          padding: '14px 20px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#059669', color: '#ffffff', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800 }}>
                PARENTAL CONTROLS
              </span>
              <strong style={{ color: '#065f46', fontSize: '0.9rem' }}>
                Guidance for Parents & Spending Lock Blueprints
              </strong>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.775rem', color: '#047857' }}>
              Scrolled to step-by-step lock blueprints for Apple iOS, Google Android, Steam, PS5, and Xbox.
            </p>
          </div>
          {onClearSection && (
            <button
              type="button"
              onClick={onClearSection}
              style={{
                background: '#ffffff',
                border: '1px solid #a7f3d0',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                color: '#065f46'
              }}
            >
              Show Full Guidance Hub
            </button>
          )}
        </div>
      )}

      {/* SECTION 1: INTERACTIVE RISK CALCULATOR */}
      <div 
        ref={screenerRef}
        style={{
        background: '#fbf8f2',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '18px',
        padding: '28px',
        marginBottom: '36px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#093326',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldAlert size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Household Game Risk Screener
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#6b7280', margin: 0 }}>
              Evaluate whether a specific game poses hidden gambling risks to your children or household budget.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
          {screenerQuestions.map((q) => {
            const isYes = screenerAnswers[q.id] === true;
            const isNo = screenerAnswers[q.id] === false;
            return (
              <div 
                key={q.id}
                style={{
                  background: '#ffffff',
                  border: isYes ? '1.5px solid #f59e0b' : '1px solid rgba(0, 0, 0, 0.06)',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
                    {q.question}
                  </div>
                  <div style={{ fontSize: '0.775rem', color: '#6b7280' }}>
                    {q.context}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button
                    onClick={() => handleToggleAnswer(q.id, true)}
                    style={{
                      background: isYes ? '#dc2626' : '#f3f4f6',
                      color: isYes ? '#ffffff' : '#374151',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    YES
                  </button>
                  <button
                    onClick={() => handleToggleAnswer(q.id, false)}
                    style={{
                      background: isNo ? '#059669' : '#f3f4f6',
                      color: isNo ? '#ffffff' : '#374151',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    NO
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Screener Result Box */}
        <div style={{
          marginTop: '20px',
          background: evaluation.bg,
          border: `1.5px solid ${evaluation.color}`,
          borderRadius: '14px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: evaluation.color, letterSpacing: '0.05em' }}>
                Assessment Result
              </span>
              <span style={{
                background: evaluation.color,
                color: '#ffffff',
                padding: '2px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                {evaluation.level}
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>
              {evaluation.text}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: evaluation.color, lineHeight: 1 }}>
              {currentRiskScore} <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: 600 }}>/ 14</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '2px' }}>
              Harm Index Score
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: 24/7 CRISIS & RECOVERY HOTLINES (AUSTRALIA) */}
      <div style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#093326',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <PhoneCall size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Australian 24/7 Support Services & Crisis Directory
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#6b7280', margin: 0 }}>
              Free, government-funded, confidential assistance for individuals and families impacted by gaming and gambling harm.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {supportServices.map((srv, idx) => (
            <div 
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '14px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{
                    background: '#ecfdf5',
                    color: '#065f46',
                    border: '1px solid #a7f3d0',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}>
                    {srv.badge}
                  </span>
                  <span style={{ fontSize: '0.725rem', color: '#6b7280', fontWeight: 600 }}>
                    {srv.available}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: '0 0 6px' }}>
                  {srv.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.5, margin: '0 0 16px' }}>
                  {srv.desc}
                </p>
              </div>

              <div>
                <a
                  href={`tel:${srv.phone.replace(/\s+/g, '')}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: '#093326',
                    color: '#ffffff',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    marginBottom: '8px',
                    transition: 'all 0.15s'
                  }}
                >
                  <PhoneCall size={14} />
                  <span>Call {srv.phone}</span>
                </a>
                <a
                  href={srv.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    color: '#047857',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <span>Visit Official Portal</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: STEP-BY-STEP PLATFORM PARENTAL CONTROLS */}
      <div 
        ref={parentsRef}
        style={{
        background: '#ffffff',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '18px',
        padding: '28px',
        marginBottom: '36px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#093326',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Lock size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Device Parental Controls & Spending Lock Blueprints
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#6b7280', margin: 0 }}>
              Never save credit cards directly on gaming hardware. Implement hardware-level spending restrictions.
            </p>
          </div>
        </div>

        {/* Platform Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          paddingBottom: '12px',
          marginTop: '20px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'apple', label: 'Apple iOS' },
            { id: 'google', label: 'Google Android' },
            { id: 'steam', label: 'Valve Steam (PC)' },
            { id: 'playstation', label: 'PlayStation 5' },
            { id: 'xbox', label: 'Xbox / Microsoft' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePlatformTab(tab.id as any)}
              style={{
                background: activePlatformTab === tab.id ? '#093326' : '#f3f4f6',
                color: activePlatformTab === tab.id ? '#ffffff' : '#4b5563',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#065f46', marginBottom: '14px' }}>
            {platformGuides[activePlatformTab].name} Setup Guide:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {platformGuides[activePlatformTab].steps.map((st, i) => (
              <div 
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  background: '#f8fafc',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(0, 0, 0, 0.04)'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#047857',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1e293b', lineHeight: 1.5 }}>
                  {st}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4: WARNING SIGNS & RED FLAGS */}
      <div style={{
        background: '#fffbeb',
        border: '1px solid #fde68a',
        borderRadius: '18px',
        padding: '28px',
        marginBottom: '36px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#b45309',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#92400e', margin: 0 }}>
              Recognising Gambling Harm in Video Gamers
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#b45309', margin: 0 }}>
              Behavioral, financial, and emotional warning signs documented by the Australian Institute of Family Studies (AIFS).
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #fef3c7' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#b45309', margin: '0 0 8px' }}>
              Financial Red Flags
            </h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.6 }}>
              <li>Repeated small micro-charges ($1.49, $7.99) accumulating to hundreds of dollars.</li>
              <li>Repeated requests for Apple / Google / Steam prepaid gift cards instead of cash.</li>
              <li>Unexplained bank overdrafts or disappearing personal allowances.</li>
              <li>Attempting to sell personal belongings or physical possessions to buy in-game crates.</li>
            </ul>
          </div>

          <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #fef3c7' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#b45309', margin: '0 0 8px' }}>
              Behavioral Changes
            </h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.6 }}>
              <li>Severe irritability or aggression when game sessions are interrupted or ended.</li>
              <li>Obsessively watching YouTube / Twitch 'case opening' or 'gacha roll' live streams.</li>
              <li>Extreme anxiety over missing temporary 'limited-edition' battle pass events (FOMO).</li>
              <li>Declining school grades, withdrawal from sport, and sleep disruption.</li>
            </ul>
          </div>

          <div style={{ background: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #fef3c7' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#b45309', margin: '0 0 8px' }}>
              Secrecy & Cognitive Bias
            </h4>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.6 }}>
              <li>Hiding screens when parents enter the room; deleting purchase email receipts.</li>
              <li>'Near-miss' justifications: believing a rare jackpot item is 'due' on the next spin.</li>
              <li>Viewing skins and in-game cosmetics as financial investments rather than entertainment.</li>
              <li>Denial of total expenditure or claiming in-game purchases were free bonuses.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
      <div ref={faqRef}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#093326',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <HelpCircle size={18} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
              Monetization & Australian Regulations FAQ
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#6b7280', margin: 0 }}>
              Plain-English explanations of game monetization mechanics and legal frameworks in Australia.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index}
                style={{
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#ffffff'
                }}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    background: isOpen ? '#f8fafc' : '#ffffff',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#111827'
                  }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} color="#047857" /> : <ChevronDown size={18} color="#9ca3af" />}
                </button>
                {isOpen && (
                  <div style={{
                    padding: '16px 20px',
                    background: '#ffffff',
                    fontSize: '0.85rem',
                    color: '#4b5563',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(0, 0, 0, 0.05)'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
