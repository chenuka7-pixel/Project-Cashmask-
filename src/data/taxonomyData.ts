export interface TaxonomyCategory {
  id: string;
  name: string;
  direction: 'UP' | 'DOWN';
  group: string;
  gamesList: string[];
  description: string;
  researchedProfileIds: string[];
}

export interface ResearchCitation {
  text: string;
  sourceType: 'REVIEW' | 'ACADEMIC_STUDY' | 'LITIGATION' | 'REGULATOR_ACMA' | 'LEGAL_ACT';
  year: string;
}

export interface GameProfile {
  id: string;
  name: string;
  representativeTitle: string;
  candidateClass: string;
  primaryAudience: string;
  gamblingConnection: string;
  tierClassification: string;
  tierCode: 'T0' | 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6';
  harmScore: number;
  harmRating: string;
  riskScore: number;
  riskRating: string;
  financialScore: number;
  financialRating: string;
  monetaryValue: string;
  regulatoryStatus: string;
  fullDossierText: string;
  categoryIds: string[];
  citations: ResearchCitation[];
}

export interface TierInfo {
  code: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  color: string;
}

export const TIER_DEFINITIONS: Record<string, TierInfo> = {
  T0: {
    code: 'T0',
    title: 'No Paid Element',
    shortDesc: 'Cannot be paid into',
    fullDesc: 'Free-to-play with no real-money deposits, purchases, or wagering routes.',
    color: '#10b981'
  },
  T1: {
    code: 'T1',
    title: 'Closed-Loop Direct Purchase',
    shortDesc: 'Items cannot be resold',
    fullDesc: 'Real money exchanged for in-game items or currency that cannot be liquidated or converted back to money.',
    color: '#3b82f6'
  },
  T2: {
    code: 'T2',
    title: 'Paid Random Draw (No Cash-Out)',
    shortDesc: 'Loot box / gacha, no cash route',
    fullDesc: 'Variable-ratio chance mechanics (loot boxes, gachas, card packs) without an official withdrawal mechanism.',
    color: '#f59e0b'
  },
  T3: {
    code: 'T3',
    title: 'Grey-Market Convertible',
    shortDesc: 'Resold outside platform',
    fullDesc: 'Virtual assets can be resold or liquidated for real fiat money outside the official game platform via secondary markets.',
    color: '#ea580c'
  },
  T4: {
    code: 'T4',
    title: 'Token-Mediated Cash-Out',
    shortDesc: 'Intermediate currency cash-out',
    fullDesc: 'Conversion to fiat money mediated through an intermediate developer programme (e.g. Roblox DevEx) or dual-currency sweepstakes.',
    color: '#8b5cf6'
  },
  T5: {
    code: 'T5',
    title: 'Licensed Real-Money Wagering',
    shortDesc: 'Australian / regulated licence',
    fullDesc: 'Regulated gambling operating under an official Australian or comparable state/federal gaming licence with mandatory consumer protections.',
    color: '#ec4899'
  },
  T6: {
    code: 'T6',
    title: 'Unlicensed / Offshore Wagering',
    shortDesc: 'Offshore, evades AU regulation',
    fullDesc: 'Real-money wagering operating without an Australian licence; evades local age-verification, consumer guarantees, and faces ACMA domain blocking.',
    color: '#ef4444'
  }
};

export const TAXONOMY_CATEGORIES: TaxonomyCategory[] = [
  // UP BRANCHES (Demographics, Genres, Wagering Platforms, Operators)
  {
    id: 'cat-teenager',
    name: 'Teenager',
    direction: 'UP',
    group: 'Demographics',
    gamesList: ['Fortnite', 'Call Of Duty', 'PUBG Mobile', 'Clash Of Clans', 'League Of Legends', 'Valorant'],
    description: 'Adolescent and youth gamer cohort exposed to skin monetization and predatory loot mechanics.',
    researchedProfileIds: ['G010', 'G034', 'G043']
  },
  {
    id: 'cat-old-people',
    name: 'Old People',
    direction: 'UP',
    group: 'Demographics',
    gamesList: ['Cards', 'Pool', 'Bingo', 'Casino'],
    description: 'Older adults and retirees targeted by social-casino applications and simulated classic formats.',
    researchedProfileIds: ['G043', 'G044', 'G045', 'G045-C']
  },
  {
    id: 'cat-adults',
    name: 'Adults',
    direction: 'UP',
    group: 'Demographics',
    gamesList: ['Daraz', 'AliExpress', 'Shein', 'Temu', 'JetX'],
    description: 'General adult consumer audience with direct banking access and disposable income.',
    researchedProfileIds: ['G045-C', 'G046']
  },
  {
    id: 'cat-football',
    name: 'Football',
    direction: 'UP',
    group: 'Sports & Wagering',
    gamesList: ['Football pools', 'Accumulator', 'Prop betting'],
    description: 'Football match wagering, multi-bet accumulators, and player performance prop stakes.',
    researchedProfileIds: ['G046']
  },
  {
    id: 'cat-cricket-ipl',
    name: 'Cricket IPL',
    direction: 'UP',
    group: 'Sports & Wagering',
    gamesList: ['1XBET', 'Parimatch', '4Rabet'],
    description: 'Cricket sportsbooks and Indian Premier League wagering with hyper-local promotional marketing.',
    researchedProfileIds: ['G046']
  },
  {
    id: 'cat-fps-games',
    name: 'First person shooting games',
    direction: 'UP',
    group: 'Game Genres',
    gamesList: ['Fortnite', 'Call Of Duty', 'PUBG Mobile'],
    description: 'First-person tactical and battle royale titles with highly active weapon skin economies.',
    researchedProfileIds: ['G010', 'G034']
  },
  {
    id: 'cat-gacha',
    name: 'Gacha',
    direction: 'UP',
    group: 'Mechanics & Genres',
    gamesList: ['Card pack gacha'],
    description: 'Japanese-style gachapon virtual prize capsules with disclosed or undisclosed probability tables.',
    researchedProfileIds: ['G043']
  },
  {
    id: 'cat-sports-operators',
    name: 'Sports Betting Operators',
    direction: 'UP',
    group: 'Operators',
    gamesList: ['Sportsbet', 'TAB', 'Ladbrokes', 'Betfair'],
    description: 'Licensed bookmakers operating under Australian state regulatory frameworks.',
    researchedProfileIds: []
  },
  {
    id: 'cat-inplay-betting',
    name: 'In-play/live Betting Platform',
    direction: 'UP',
    group: 'Operators',
    gamesList: ['Bet365 Live Betting', 'Neds Live Markets'],
    description: 'Continuous real-time wagering while matches are in progress, providing rapid turnaround betting.',
    researchedProfileIds: ['G046']
  },
  {
    id: 'cat-betting-exchange',
    name: 'Betting Exchange',
    direction: 'UP',
    group: 'Operators',
    gamesList: ['Betfair Exchange', 'Smarkets', 'BETDAQ'],
    description: 'Marketplace platform where players back or lay wagers directly against each other.',
    researchedProfileIds: []
  },
  {
    id: 'cat-offshore-gambling',
    name: 'Offshore Gambling Sites',
    direction: 'UP',
    group: 'Operators',
    gamesList: ['BetOnline', 'Duelbits', 'Ricky Casino'],
    description: 'Unlicensed overseas casino and sportsbook sites operating outside the reach of the ACMA and Australian consumer law.',
    researchedProfileIds: ['G010', 'G034', 'G045-C', 'G046']
  },
  {
    id: 'cat-bingo-keno',
    name: 'Bingo and Keno products',
    direction: 'UP',
    group: 'Game Genres',
    gamesList: ['Tabcorp Keno', 'Housie', 'Leagues Club Bingo'],
    description: 'Number draw chance games present across physical clubs, digital terminals, and mobile apps.',
    researchedProfileIds: ['G044']
  },
  {
    id: 'cat-cruise-gambling',
    name: 'Cruise ship and Tourist Gambling',
    direction: 'UP',
    group: 'Physical & Travel',
    gamesList: ['Blackjack', 'Craps', 'Roulette'],
    description: 'Jurisdiction-evading maritime wagering and destination tourist casino games.',
    researchedProfileIds: ['G045-C']
  },
  {
    id: 'cat-mobile',
    name: 'Mobile',
    direction: 'UP',
    group: 'Platforms',
    gamesList: ['TAB', 'Bet365', 'Sportsbet'],
    description: 'Mobile-first betting apps delivering 24/7 friction-free gambling directly to smartphones.',
    researchedProfileIds: ['G043', 'G044', 'G046']
  },
  {
    id: 'cat-social-casino',
    name: 'Social Casino Games',
    direction: 'UP',
    group: 'Game Genres',
    gamesList: ['Slotomania', 'DoubleDown Casino'],
    description: 'Simulated slots and table games selling purchasable chips with zero cash-out functionality.',
    researchedProfileIds: ['G044', 'G045']
  },
  {
    id: 'cat-fantasy-sports',
    name: 'Fantasy Sports Betting',
    direction: 'UP',
    group: 'Sports & Wagering',
    gamesList: ['DraftKings', 'FanDuel'],
    description: 'Daily fantasy contests framed around player statistics with real-money entrance pools.',
    researchedProfileIds: []
  },
  {
    id: 'cat-lottery-draws',
    name: 'Lottery and Draw Games',
    direction: 'UP',
    group: 'Lottery',
    gamesList: ['Powerball', 'Oz Lotto', 'Set for life'],
    description: 'State and commercial high-variance lotteries characterized by low odds and long draw cycles.',
    researchedProfileIds: []
  },
  {
    id: 'cat-instant-scratch',
    name: 'Instant-Win & Scratch Games',
    direction: 'UP',
    group: 'Lottery',
    gamesList: ['Online Scratch Cards', 'Digital Scratch Games', 'Instant Scratch-Its'],
    description: 'Immediate-outcome scratch tickets with near-miss audio-visual feedback loops.',
    researchedProfileIds: []
  },
  {
    id: 'cat-wrestling',
    name: 'Wrestling',
    direction: 'UP',
    group: 'Sports & Wagering',
    gamesList: ['Moneyline betting', 'Fantasy pools', 'Futures betting'],
    description: 'Scripted sports entertainment betting pools and futures props.',
    researchedProfileIds: []
  },
  {
    id: 'cat-basketball',
    name: 'Basketball',
    direction: 'UP',
    group: 'Sports & Wagering',
    gamesList: ['Unibet'],
    description: 'Basketball tournament match and micro-spread wagering.',
    researchedProfileIds: []
  },

  // DOWN BRANCHES (Mechanics, Harm Vectors, Motivations, Emerging Tech)
  {
    id: 'cat-horse-racing',
    name: 'Horse racing',
    direction: 'DOWN',
    group: 'Wagering Formats',
    gamesList: ['Betindiaraces', 'TAB', 'Sportsbet'],
    description: 'Traditional thoroughbred and harness racing wagering.',
    researchedProfileIds: []
  },
  {
    id: 'cat-fantasy-sport-down',
    name: 'Fantasy Sport',
    direction: 'DOWN',
    group: 'Wagering Formats',
    gamesList: ['Draftkings', 'Dream11', 'Drafters'],
    description: 'Skill-framed wagering formats utilizing athlete performance metrics.',
    researchedProfileIds: ['G046']
  },
  {
    id: 'cat-esport-tournaments',
    name: 'E-Sport tournament',
    direction: 'DOWN',
    group: 'Esports',
    gamesList: ['PUBG Global Series', 'PUBG Mobile Global Championship', 'Rocket League'],
    description: 'Competitive esports tournaments subject to both skin wagering and fiat match betting.',
    researchedProfileIds: ['G034']
  },
  {
    id: 'cat-loot-box-system',
    name: 'Loot-box system',
    direction: 'DOWN',
    group: 'Monetary Mechanics',
    gamesList: ['Case drop.eu', 'CScase', 'CSgo.net', 'Csgoluck'],
    description: 'Chance-based virtual containers offering high-value item odds; documented psychological gateway to gambling.',
    researchedProfileIds: ['G010', 'G034', 'G043']
  },
  {
    id: 'cat-wheel-spin',
    name: 'Wheel/Spin',
    direction: 'DOWN',
    group: 'Monetary Mechanics',
    gamesList: ['Temu', 'Shein', 'Csgoempire'],
    description: 'Roulette-style spinner mechanics embedded within retail apps and skin casinos.',
    researchedProfileIds: ['G034']
  },
  {
    id: 'cat-children',
    name: 'Children',
    direction: 'DOWN',
    group: 'Vulnerable Groups',
    gamesList: ['Pokemon', 'Minecraft', 'Fortnite', 'Roblox'],
    description: 'Under-13 demographic vulnerable to social pressure and virtual token currency abstraction.',
    researchedProfileIds: ['G043', 'G044']
  },
  {
    id: 'cat-financial-gain',
    name: 'Financial Gain',
    direction: 'DOWN',
    group: 'Drivers & Motivations',
    gamesList: ['1xbet', 'Bet365', 'Draftkings', 'Polymarket'],
    description: 'Cognitive distortion that gaming or betting can serve as a viable source of personal income.',
    researchedProfileIds: ['G010', 'G034', 'G046']
  },
  {
    id: 'cat-social-isolation',
    name: 'Social Isolation',
    direction: 'DOWN',
    group: 'Harm Vectors',
    gamesList: ['Temu', 'Slotomania', 'Zynga Poker', 'DoubleDown Casino'],
    description: 'Compulsive solitary play driven by social withdrawal, escapism, and artificial parasocial mechanics.',
    researchedProfileIds: ['G044', 'G045']
  },
  {
    id: 'cat-entertainment',
    name: 'Entertainment',
    direction: 'DOWN',
    group: 'Drivers & Motivations',
    gamesList: ['Formula 1', 'G2G', 'Bet365', 'DraftKings'],
    description: 'Recreational motivation that obscures the cumulative mathematical loss of continuous play.',
    researchedProfileIds: ['G043']
  },
  {
    id: 'cat-excitement',
    name: 'Excitement',
    direction: 'DOWN',
    group: 'Drivers & Motivations',
    gamesList: ['Livecasino', 'Plinko', 'Stakecasino', '1xbet'],
    description: 'High-arousal variable-ratio dopamine bursts triggered by fast-cycle crash and live games.',
    researchedProfileIds: ['G034', 'G045-C', 'G046']
  },
  {
    id: 'cat-curiosity',
    name: 'Curiosity',
    direction: 'DOWN',
    group: 'Drivers & Motivations',
    gamesList: ['Casino chips', 'Blind Box Toy', 'Steam-Trading Card'],
    description: 'Mystery and collection completion drivers exploited by blind boxes and trading cards.',
    researchedProfileIds: ['G010']
  },
  {
    id: 'cat-social-influence',
    name: 'Social Influence',
    direction: 'DOWN',
    group: 'Harm Vectors',
    gamesList: ['Social Media', 'ElGordo'],
    description: 'Communal participation, streamer sponsorships, and algorithmic social media betting promotion.',
    researchedProfileIds: ['G010', 'G034']
  },
  {
    id: 'cat-lack-of-knowledge',
    name: 'Lack of knowledge',
    direction: 'DOWN',
    group: 'Harm Vectors',
    gamesList: ['Scams', 'Stake', 'Mostbet'],
    description: 'Asymmetric information regarding house edge, odds of winning, and rigged offshore algorithms.',
    researchedProfileIds: ['G010', 'G034', 'G045-C']
  },
  {
    id: 'cat-poker',
    name: 'Poker',
    direction: 'DOWN',
    group: 'Game Genres',
    gamesList: ["Texas Hold'em", 'Omaha', 'Seven-Card Stud'],
    description: 'Community card formats combining perceived skill with chance-based chip stakes.',
    researchedProfileIds: ['G045']
  },
  {
    id: 'cat-low-income',
    name: 'Low income household',
    direction: 'DOWN',
    group: 'Vulnerable Groups',
    gamesList: ['Bet365', '1xbet', 'Betway', 'Mostbet'],
    description: 'Socioeconomically disadvantaged households suffering catastrophic welfare harm from wagering losses.',
    researchedProfileIds: ['G046']
  },
  {
    id: 'cat-rural-communities',
    name: 'Rural Communities',
    direction: 'DOWN',
    group: 'Vulnerable Groups',
    gamesList: ['Rummy', 'Teen patti'],
    description: 'Regional demographics targeted by mobile real-money card games in South Asia and diaspora.',
    researchedProfileIds: ['G045']
  },
  {
    id: 'cat-nfts',
    name: 'NFTS',
    direction: 'DOWN',
    group: 'Emerging Tech',
    gamesList: ['Pool', 'Snooker', 'Darts', 'Poker', 'BlackJack'],
    description: 'Digital asset ownership tokens integrated into skill wagering and casino metaverse mechanics.',
    researchedProfileIds: ['G043']
  },
  {
    id: 'cat-urban-communities',
    name: 'Urban Communities',
    direction: 'DOWN',
    group: 'Vulnerable Groups',
    gamesList: ['Rollbots', 'LootBox'],
    description: 'Tech-fluent urban youth demographics adopting Web3 skin casinos and speculative collectibles.',
    researchedProfileIds: ['G034']
  },
  {
    id: 'cat-crypto-games',
    name: 'Crypto Games',
    direction: 'DOWN',
    group: 'Emerging Tech',
    gamesList: ['P2E games', 'Myxbet'],
    description: 'Play-to-earn cryptocurrency titles and blockchain wagering platforms.',
    researchedProfileIds: ['G034', 'G046']
  },
  {
    id: 'cat-metaverse-platforms',
    name: 'Metaverse Platforms',
    direction: 'DOWN',
    group: 'Emerging Tech',
    gamesList: ['Decentraland', 'Illuvium', 'VRChat Casino Rooms'],
    description: 'Virtual world platforms hosting decentralized casino venues with crypto liquidity.',
    researchedProfileIds: []
  }
];

export const RESEARCHED_PROFILES: GameProfile[] = [
  {
    id: 'G010',
    name: 'CSCase.com',
    representativeTitle: 'CSCase.com',
    candidateClass: 'Unofficial CS2 skin case-opening / gambling site (third-party, not affiliated with Valve)',
    primaryAudience: 'CS2/CS:GO players; free-case onboarding with no deposit required to start',
    gamblingConnection: 'Direct — real money is deposited, wagered on random outcomes, and skins can be sold externally for cash',
    tierClassification: 'T6 – Unlicensed Real-money Wagering (primary), with a T3-style grey-market conversion step for the skin payout',
    tierCode: 'T6',
    harmScore: 7,
    harmRating: 'High',
    riskScore: 7,
    riskRating: 'High',
    financialScore: 7,
    financialRating: 'High',
    monetaryValue: 'Real money in → chance-based skin payout → skin sellable on third-party markets for real cash out',
    regulatoryStatus: 'Not identified as licensed in any jurisdiction reviewed. Unofficial third party exploiting Steam API.',
    fullDossierText: `CSCase.com is a third-party website where users can open CS2/CS:GO cases. One free case is available on the site and can be opened without a deposit. Free openings help attract new users by allowing them to win prizes without paying (Trustpilot, n.d.-a). CSCase.com and CaseDrop.eu are not affiliated with Valve or the Steam platform, but they use the Steam market to distribute prizes, just as other sites in this category do (Trustpilot, n.d.-a; Revolvertech, 2026).

Users pay real money to open virtual cases and receive random skins. Users can potentially sell their virtual skins on other websites and marketplaces and transfer the proceeds to their Steam accounts or crypto wallets for real money (Trustpilot, n.d.-a; CS.Money, n.d.).

Risk & Harm Assessment:
Addiction/Harm Score: 7/10 – High. Free cases act as a psychological foot-in-the-door, transitioning young gamers into real-money speculative case opening.
Risk Score: 7/10 – High.
Financial Exposure: 7/10 – High.
Tier: T6 – Unlicensed Real-money Wagering (primary), with a T3-style grey-market conversion step.`,
    categoryIds: ['cat-loot-box-system', 'cat-fps-games', 'cat-teenager', 'cat-offshore-gambling'],
    citations: [
      { text: 'Trustpilot (n.d.). CSCase.com user reviews and trust indicators. CS.Money (n.d.) Steam trading market integration.', sourceType: 'REVIEW', year: '2026' },
      { text: 'Harris, Griffiths and Gibson (2025). Rapid evidence review of skins gambling in young adults. GOV.UK.', sourceType: 'ACADEMIC_STUDY', year: '2025' }
    ]
  },
  {
    id: 'G034',
    name: 'CSGOLuck.com',
    representativeTitle: 'CSGOLuck.com',
    candidateClass: 'Unofficial CS2 skin gambling site offering case opening, case battles, and casino-style games (Roulette, Crash, Coinflip, Mines, Plinko, Towers, Wheel, Jackpot) plus esports betting',
    primaryAudience: 'CS2/CS:GO players; operating since 2021, self-categorised as a "Gambling Service"',
    gamblingConnection: 'Direct — self-identifies as a gambling service; offers explicit casino game formats, not just loot-box opening',
    tierClassification: 'T6 – Unlicensed Real-money Wagering (primary), with a T3-style grey-market conversion step for skin/crypto payouts',
    tierCode: 'T6',
    harmScore: 9,
    harmRating: 'Very High',
    riskScore: 9,
    riskRating: 'Very High',
    financialScore: 8,
    financialRating: 'High',
    monetaryValue: 'Real money / skins in → high-frequency casino wagering → skins or crypto out',
    regulatoryStatus: 'No gambling licence stated anywhere on the site; operator reported as GG Technology Ltd (Cyprus / Curaçao). Operates outside Australian jurisdiction.',
    fullDossierText: `CSGOLuck.com is an unofficial CS2 skin gambling platform active since 2021. Unlike pure case openers, CSGOLuck features direct casino games including Roulette, Crash, Coinflip, Mines, Plinko, Towers, Wheel, Jackpot, Case Battles, and esports match betting. The operator explicitly self-categorises the platform as a "Gambling Service" in its terms of service.

The platform accepts deposits in real money, Steam CS2 skins, and cryptocurrencies. Players wager on ultra-fast cycle variable-ratio casino games where losses accumulate rapidly. Payouts can be withdrawn via skins on third-party P2P markets or as cryptocurrency, facilitating immediate liquidity.

Risk & Harm Assessment:
Addiction/Harm Score: 9/10 – Very High. Rapid game loops (Crash, Roulette) maximize loss velocity and psychological arousal, far exceeding passive loot boxes.
Risk Score: 9/10 – Very High.
Tier: T6 – Unlicensed Real-money Wagering (primary), with a T3-style grey-market conversion step.
Regulatory Status: Operates without an Australian gambling licence or verifiable AML/KYC safeguards.`,
    categoryIds: ['cat-loot-box-system', 'cat-offshore-gambling', 'cat-fps-games', 'cat-excitement', 'cat-esport-tournaments'],
    citations: [
      { text: 'GG Technology Ltd corporate filings and self-categorized Gambling Service disclosure. CSGOLuck terms of service.', sourceType: 'LITIGATION', year: '2026' },
      { text: 'Hing et al. (2022). Adolescent betting on esports using cash and skins. PLOS ONE, 17(5).', sourceType: 'ACADEMIC_STUDY', year: '2022' }
    ]
  },
  {
    id: 'G043',
    name: 'Pool',
    representativeTitle: '8 Ball Pool (Miniclip) & Skill-Cash Pool Apps',
    candidateClass: 'Free-to-play competitive skill game with coin-staked matches and paid random boxes (proposed new candidate class; overlaps paid loot-box and children reward-token classes)',
    primaryAudience: 'Teenagers and young adults. The US App Store listing rates it 13+ and flags loot boxes and contests',
    gamblingConnection: 'Moderate / Indirect. Paid chance-based items and coin stakes, but no cash-out route in official title; real-money variants use tournament stakes',
    tierClassification: 'T2: paid random draw, no cash-out (8 Ball Pool). Skill-cash pool apps: T4/T5 boundary',
    tierCode: 'T2',
    harmScore: 5,
    harmRating: 'Moderate',
    riskScore: 5,
    riskRating: 'Moderate',
    financialScore: 5,
    financialRating: 'Moderate',
    monetaryValue: 'Real money in → coins or surprise boxes → closed-loop gameplay (8 Ball Pool). Real money entry → cash prize out (Skill-Cash pool)',
    regulatoryStatus: '8 Ball Pool: no gambling-regulator action found. Skill-cash variants face state-by-state prohibitions in the United States.',
    fullDossierText: `Pool is examined through its representative title 8 Ball Pool (Miniclip, owned by Tencent) alongside emerging real-money "skill-cash" pool apps. 8 Ball Pool is a free-to-play mobile physics simulator where players wager virtual coins to enter higher-stakes matches and purchase "Surprise Boxes" with randomized cue parts.

While 8 Ball Pool does not permit players to cash out (remaining a closed-loop T2 game), its staking mechanics replicate real-money wagering psychology. Meanwhile, third-party skill-cash variants (e.g. Pool Payday) allow direct fiat entry fees and cash prizes, operating on the boundary of T4/T5.

Risk & Harm Assessment:
Addiction/Harm Score: 5/10 – Moderate. Match entry coin sinks trigger repeat in-app purchases when coins are depleted.
Risk Score: 5/10 – Moderate.
Tier: T2: paid random draw, no cash-out (8 Ball Pool).
Regulatory Status: Not classified as gambling under current Australian law, but matches M-rating criteria under the 2024 Classification scheme.`,
    categoryIds: ['cat-teenager', 'cat-old-people', 'cat-entertainment', 'cat-nfts', 'cat-loot-box-system'],
    citations: [
      { text: 'Miniclip 8 Ball Pool App Store and Google Play Terms of Service and Loot Box Disclosures.', sourceType: 'REVIEW', year: '2026' },
      { text: 'Drummond & Sauer (2018). Video game loot boxes are psychologically akin to gambling. Nature Human Behaviour.', sourceType: 'ACADEMIC_STUDY', year: '2018' }
    ]
  },
  {
    id: 'G044',
    name: 'Bingo',
    representativeTitle: 'Bingo Blitz (Playtika) & Bingo Cash (Papaya Gaming)',
    candidateClass: 'Social-casino apps (free-to-play, purchasable virtual currency). Real-money variant: skill-cash contest app',
    primaryAudience: 'Adults, including older adults. Washington Attorney General alleges children also access on family devices',
    gamblingConnection: 'High (simulated). Bingo is a chance game, and virtual currency bought with real money is staked with no withdrawal; real-money variants allow cash payouts',
    tierClassification: 'T2: paid random draw, no cash-out (Bingo Blitz). Bingo Cash: T4/T5 boundary',
    tierCode: 'T2',
    harmScore: 7,
    harmRating: 'High',
    riskScore: 6,
    riskRating: 'Moderate to High',
    financialScore: 7,
    financialRating: 'High',
    monetaryValue: 'Real money in → credits or power-ups → zero cash-out (Bingo Blitz). Real money entry → cash prize out (Bingo Cash)',
    regulatoryStatus: 'Bingo Blitz: Named in Washington State Attorney General consumer-protection lawsuit (Feb 2026). Classified as simulated gambling.',
    fullDossierText: `Bingo is examined via Bingo Blitz (Playtika) and real-money variant Bingo Cash (Papaya Gaming). Bingo Blitz is one of the highest-grossing social-casino titles globally. Players stake virtual credits on random number draws and purchase paid power-ups.

Although credits cannot be cashed out, the game employs variable-ratio reinforcement, timed loss streaks, and psychological triggers that induce compulsive real-money spending. On 3 February 2026, the Washington State Attorney General filed an enforcement action against Playtika, alleging deceptive simulated gambling practices targeted at consumers and accessible to minors.

Risk & Harm Assessment:
Addiction/Harm Score: 7/10 – High. High loss velocity disguised by bright cartoon aesthetics and "near-miss" audiovisual celebratory cues.
Risk Score: 6/10 – Moderate to High.
Financial Score: 7/10 – High.
Tier: T2: paid random draw, no cash-out (Bingo Blitz). Bingo Cash: T4/T5 boundary.`,
    categoryIds: ['cat-old-people', 'cat-bingo-keno', 'cat-social-casino', 'cat-social-isolation'],
    citations: [
      { text: 'State of Washington v. Playtika Ltd. Consumer Protection Enforcement Action, King County Superior Court.', sourceType: 'LITIGATION', year: '2026' },
      { text: 'Australian Classification Board (2024). Mandatory classification guidelines for simulated gambling (R18+).', sourceType: 'REGULATOR_ACMA', year: '2024' }
    ]
  },
  {
    id: 'G045',
    name: 'Online card games',
    representativeTitle: "Zynga Poker (Texas Hold'em) & Solitaire Cash / Teen Patti",
    candidateClass: 'Social-casino apps (free-to-play, purchasable chips), with real-money card variants at the far end of cash-realisability',
    primaryAudience: 'Adults. Google Play listing notes intended for adults; simulated gambling',
    gamblingConnection: 'High. Social variants simulate poker with chance-driven chips and no cash-out; real-money variants are direct gambling',
    tierClassification: 'T2: paid random draw, no cash-out (Zynga Poker). Real-money variants: T4/T5 (solitaire); T6 (unlicensed real-money poker in AU, banned in India)',
    tierCode: 'T2',
    harmScore: 7,
    harmRating: 'High',
    riskScore: 7,
    riskRating: 'High',
    financialScore: 7,
    financialRating: 'High',
    monetaryValue: 'Real money in → poker chips → no cash out (Zynga). Real-money poker / Teen Patti: direct cash deposits and withdrawals',
    regulatoryStatus: "Zynga Poker: no licence required for social format. Real-money online poker is prohibited under Australia's Interactive Gambling Act 2001 (Cth). Banned in India under Online Gaming Act 2025.",
    fullDossierText: `Online card games are profiled through Zynga Poker alongside real-money variants like Solitaire Cash, online cash poker, rummy, and Teen Patti. Zynga Poker simulates casino Texas Hold'em. Players can purchase millions of chips with real currency but cannot redeem winnings for cash.

Research shows that social casino card games serve as a direct behavioural bridge to real-money wagering. The chip abstraction effect creates cognitive distancing, where players fail to register real-world financial expenditure.

Risk & Harm Assessment:
Addiction/Harm Score: 7/10 – High. Simulates real gambling and reinforces betting strategies with artificial high-stakes tables.
Risk Score: 7/10 – High.
Tier: T2 (Zynga Poker) / T6 for unlicensed real-money poker in Australia.
Regulatory Status: Australia's Interactive Gambling Act 2001 (Cth) bans online cash poker; India's 2025 Act prohibits online money games.`,
    categoryIds: ['cat-old-people', 'cat-poker', 'cat-social-casino', 'cat-rural-communities'],
    citations: [
      { text: 'Interactive Gambling Act 2001 (Cth). Australian Federal Legislation prohibiting online real-money poker and casino services.', sourceType: 'LEGAL_ACT', year: '2001' },
      { text: 'Parliament of India (2025). The Promotion and Regulation of Online Gaming Act 2025 (in force May 2026).', sourceType: 'LEGAL_ACT', year: '2025' }
    ]
  },
  {
    id: 'G045-C',
    name: 'Online casino (real-money)',
    representativeTitle: 'Online Casino (Slots, Roulette, Crash, Live Dealer)',
    candidateClass: 'Offshore/unlicensed bookmakers and casinos (T6 in Australia); licensed online casino (T5) in jurisdictions that license it',
    primaryAudience: 'Adults 18+ in principle. Unlicensed operators sit outside Australian consumer protection',
    gamblingConnection: 'Direct. Real money is staked on chance-based casino games with a cash payout',
    tierClassification: 'T6 in Australia (unlicensed and prohibited). T5 where operator holds a recognised local licence',
    tierCode: 'T6',
    harmScore: 9,
    harmRating: 'Very High',
    riskScore: 8,
    riskRating: 'High',
    financialScore: 9,
    financialRating: 'Very High',
    monetaryValue: 'Real cash deposited, converted to credits or chips and withdrawable as cash, subject to operator terms',
    regulatoryStatus: 'Prohibited interactive gambling services are unlawful in Australia under Interactive Gambling Act 2001 (Cth); ACMA blocked 1,788 illegal gambling and affiliate sites by Aug 2026.',
    fullDossierText: `Online casino websites and applications provide real-money casino games (slots, roulette, blackjack, baccarat, live-dealer tables, and crash games). Unlike free-to-play social apps, their core and sole function is gambling.

In Australia, providing interactive online casino games to Australian residents is prohibited under the Interactive Gambling Act 2001 (Cth). The Australian Communications and Media Authority (ACMA) actively investigates, issues warnings, and requests Australian ISPs to block unlicensed casino sites. By August 2026, ACMA had blocked 1,788 illegal gambling and affiliate domains.

Risk & Harm Assessment:
Addiction/Harm Score: 9/10 – Very High. Round-the-clock availability, lack of mandatory deposit limits, and chip abstraction induce severe financial harm.
Risk Score: 8/10 – High.
Tier: T6 in Australia (unlicensed and prohibited). T5 in jurisdictions with official statutory licensing.`,
    categoryIds: ['cat-offshore-gambling', 'cat-cruise-gambling', 'cat-excitement', 'cat-lack-of-knowledge', 'cat-adults'],
    citations: [
      { text: 'Australian Communications and Media Authority (ACMA, 2026). Illegal gambling website blocking register (1,788 sites blocked).', sourceType: 'REGULATOR_ACMA', year: '2026' },
      { text: 'Lapuz & Griffiths (2010). The role of chips in poker gambling: An empirical pilot study.', sourceType: 'ACADEMIC_STUDY', year: '2010' }
    ]
  },
  {
    id: 'G046',
    name: 'Melbet',
    representativeTitle: 'Melbet (Sportsbook & Casino)',
    candidateClass: 'Offshore/unlicensed bookmakers (T6). Also fits cricket and fantasy-sports wagering, esports wagering, and online casino as facets',
    primaryAudience: 'Adult bettors, with cricket and IPL markets and local payment methods aimed at South Asian markets (India, Bangladesh)',
    gamblingConnection: 'Direct. Real-money sports betting and casino games with cash payout',
    tierClassification: 'T6: unlicensed or offshore real-money wagering (Australia and India)',
    tierCode: 'T6',
    harmScore: 9,
    harmRating: 'Very High',
    riskScore: 9,
    riskRating: 'Very High',
    financialScore: 9,
    financialRating: 'Very High',
    monetaryValue: 'Real cash (including INR, BDT and cryptocurrency) deposited and withdrawable, subject to operator terms',
    regulatoryStatus: 'Claims a Curaçao licence (unverified); no Australian licence. Online money games prohibited in India under 2025 Act (in force May 2026).',
    fullDossierText: `Melbet is an international online bookmaker and casino established around 2012. It features sports wagering (with heavy emphasis on cricket and IPL), live in-play betting, esports, and an expansive casino catalogue of over 5,000 games including high-speed crash titles like Aviator.

Melbet targets developing markets and diaspora communities by integrating local payment rails (UPI, Paytm, bKash) and cryptocurrencies. It operates via mirror domains to circumvent regional ISP blocks.

Risk & Harm Assessment:
Addiction/Harm Score: 9/10 – Very High. Immediate live betting turnaround and instant-crash game cycles amplify loss chasing.
Risk Score: 9/10 – Very High.
Tier: T6: unlicensed or offshore real-money wagering in Australia and India.
Regulatory Status: Claims a Curaçao offshore licence with conflicting licence registration numbers. Has no Australian licence. Prohibited in India under the Promotion and Regulation of Online Gaming Act 2025.`,
    categoryIds: ['cat-cricket-ipl', 'cat-offshore-gambling', 'cat-inplay-betting', 'cat-low-income', 'cat-crypto-games'],
    citations: [
      { text: 'Telecom Asia & Football Whispers (2026). Melbet operational coverage, mirror domains and payment gateways.', sourceType: 'REVIEW', year: '2026' },
      { text: 'Langham et al. (2016). Understanding gambling related harm: A conceptual framework and taxonomy of harms. BMC Public Health.', sourceType: 'ACADEMIC_STUDY', year: '2016' }
    ]
  }
];
