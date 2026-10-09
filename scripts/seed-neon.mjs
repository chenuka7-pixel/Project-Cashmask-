import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_s6vEMk8bndrU@ep-snowy-salad-a74eioxr-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const sql = neon(DATABASE_URL);

async function main() {
  console.log("Connecting to Neon Postgres (Sydney Pooler)...");

  // 1. Create Tables
  console.log("Creating database tables...");
  await sql`
    CREATE TABLE IF NOT EXISTS taxonomy_categories (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      branch_direction VARCHAR(10) NOT NULL CHECK (branch_direction IN ('UP', 'DOWN')),
      category_group VARCHAR(50) NOT NULL,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS game_profiles (
      id VARCHAR(20) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      representative_title VARCHAR(255) NOT NULL,
      candidate_class TEXT NOT NULL,
      primary_audience TEXT NOT NULL,
      gambling_connection TEXT NOT NULL,
      tier_classification VARCHAR(150) NOT NULL,
      tier_code VARCHAR(10) NOT NULL,
      harm_score INTEGER NOT NULL,
      harm_rating VARCHAR(30) NOT NULL,
      risk_score INTEGER NOT NULL,
      risk_rating VARCHAR(30) NOT NULL,
      financial_score INTEGER NOT NULL,
      financial_rating VARCHAR(30) NOT NULL,
      monetary_value TEXT NOT NULL,
      regulatory_status TEXT NOT NULL,
      full_dossier_text TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS profile_taxonomy_mapping (
      profile_id VARCHAR(20) REFERENCES game_profiles(id) ON DELETE CASCADE,
      category_id VARCHAR(50) REFERENCES taxonomy_categories(id) ON DELETE CASCADE,
      is_primary BOOLEAN DEFAULT FALSE,
      PRIMARY KEY (profile_id, category_id)
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS research_citations (
      id SERIAL PRIMARY KEY,
      profile_id VARCHAR(20) REFERENCES game_profiles(id) ON DELETE CASCADE,
      citation_text TEXT NOT NULL,
      source_type VARCHAR(50) NOT NULL,
      year VARCHAR(10)
    );
  `;

  console.log("Seeding Taxonomy Categories (40 Branches)...");
  const categories = [
    // UP (Demographics, Genres, Operators, Platforms)
    { id: 'cat-teenager', name: 'Teenager', dir: 'UP', group: 'Demographics', desc: 'Adolescent and youth demographics vulnerable to microtransactions and peer gaming.' },
    { id: 'cat-old-people', name: 'Old People', dir: 'UP', group: 'Demographics', desc: 'Older adults and retirees targeted by social-casino and traditional chance formats.' },
    { id: 'cat-adults', name: 'Adults', dir: 'UP', group: 'Demographics', desc: 'General adult population with independent financial access.' },
    { id: 'cat-football', name: 'Football', dir: 'UP', group: 'Sports & Wagering', desc: 'Football pools, accumulators, prop bets and sports markets.' },
    { id: 'cat-cricket-ipl', name: 'Cricket IPL', dir: 'UP', group: 'Sports & Wagering', desc: 'Cricket and Indian Premier League sportsbooks (1xBet, Parimatch, 4Rabet).' },
    { id: 'cat-fps-games', name: 'First person shooting games', dir: 'UP', group: 'Game Genres', desc: 'Competitive shooter titles with in-game item economies and skins.' },
    { id: 'cat-gacha', name: 'Gacha', dir: 'UP', group: 'Mechanics & Genres', desc: 'Card pack and character gacha mechanics with randomized drop rates.' },
    { id: 'cat-sports-operators', name: 'Sports Betting Operators', dir: 'UP', group: 'Operators', desc: 'Mainstream licensed sports betting bookmakers (Sportsbet, TAB, Ladbrokes).' },
    { id: 'cat-inplay-betting', name: 'In-play/live Betting Platform', dir: 'UP', group: 'Operators', desc: 'Real-time wagering on ongoing matches with rapid bet-turnover.' },
    { id: 'cat-betting-exchange', name: 'Betting Exchange', dir: 'UP', group: 'Operators', desc: 'Peer-to-peer betting markets offering odds trading.' },
    { id: 'cat-offshore-gambling', name: 'Offshore Gambling Sites', dir: 'UP', group: 'Operators', desc: 'Unlicensed offshore bookmakers and casinos operating outside Australian jurisdiction.' },
    { id: 'cat-bingo-keno', name: 'Bingo and Keno products', dir: 'UP', group: 'Game Genres', desc: 'Community and commercial draw games, social keno and digital bingo.' },
    { id: 'cat-cruise-gambling', name: 'Cruise ship and Tourist Gambling', dir: 'UP', group: 'Physical & Travel', desc: 'Maritime and destination casino formats (Blackjack, Craps, Roulette).' },
    { id: 'cat-mobile', name: 'Mobile', dir: 'UP', group: 'Platforms', desc: 'Smartphone wagering and gaming applications available on iOS and Android.' },
    { id: 'cat-social-casino', name: 'Social Casino Games', dir: 'UP', group: 'Game Genres', desc: 'Free-to-play slot, poker and table games with real-money chip purchases.' },
    { id: 'cat-fantasy-sports', name: 'Fantasy Sports Betting', dir: 'UP', group: 'Sports & Wagering', desc: 'Daily fantasy sports contests with entry fees and cash prizes.' },
    { id: 'cat-lottery-draws', name: 'Lottery and Draw Games', dir: 'UP', group: 'Lottery', desc: 'High-jackpot state and commercial lotteries (Powerball, Oz Lotto).' },
    { id: 'cat-instant-scratch', name: 'Instant-Win & Scratch Games', dir: 'UP', group: 'Lottery', desc: 'Digital and paper scratch-its providing instantaneous reward resolution.' },
    { id: 'cat-wrestling', name: 'Wrestling', dir: 'UP', group: 'Sports & Wagering', desc: 'Combat entertainment wagering (Moneyline, futures pools).' },
    { id: 'cat-basketball', name: 'Basketball', dir: 'UP', group: 'Sports & Wagering', desc: 'Basketball league and tournament match betting.' },

    // DOWN (Mechanics, Harm Vectors, Psychological Drivers, Web3)
    { id: 'cat-horse-racing', name: 'Horse racing', dir: 'DOWN', group: 'Wagering Formats', desc: 'Pari-mutuel and fixed-odds thoroughbred racing.' },
    { id: 'cat-fantasy-sport-down', name: 'Fantasy Sport', dir: 'DOWN', group: 'Wagering Formats', desc: 'Skill-contest sports leagues with financial entry pools.' },
    { id: 'cat-esport-tournaments', name: 'E-Sport tournament', dir: 'DOWN', group: 'Esports', desc: 'Professional gaming tournaments with direct and item-based wagering.' },
    { id: 'cat-loot-box-system', name: 'Loot-box system', dir: 'DOWN', group: 'Monetary Mechanics', desc: 'Purchasable mystery boxes with randomized virtual prizes and skins.' },
    { id: 'cat-wheel-spin', name: 'Wheel/Spin', dir: 'DOWN', group: 'Monetary Mechanics', desc: 'Spinning wheels used for e-commerce engagement and casino minigames.' },
    { id: 'cat-children', name: 'Children', dir: 'DOWN', group: 'Vulnerable Groups', desc: 'Under-13 demographic targeted by virtual coin packs and reward loops.' },
    { id: 'cat-financial-gain', name: 'Financial Gain', dir: 'DOWN', group: 'Drivers & Motivations', desc: 'Player motivation driven by belief of financial recovery or income generation.' },
    { id: 'cat-social-isolation', name: 'Social Isolation', dir: 'DOWN', group: 'Harm Vectors', desc: 'Psychological vulnerability leading to repetitive, solitary wagering behavior.' },
    { id: 'cat-entertainment', name: 'Entertainment', dir: 'DOWN', group: 'Drivers & Motivations', desc: 'Leisure and recreational gaming motivation masking loss velocity.' },
    { id: 'cat-excitement', name: 'Excitement', dir: 'DOWN', group: 'Drivers & Motivations', desc: 'Dopaminergic arousal generated by variable-ratio chance mechanics.' },
    { id: 'cat-curiosity', name: 'Curiosity', dir: 'DOWN', group: 'Drivers & Motivations', desc: 'Blind box and novelty discovery driving repeat micro-spending.' },
    { id: 'cat-social-media', name: 'Social Media', dir: 'DOWN', group: 'Harm Vectors', desc: 'Social media platforms, algorithmic feeds, and viral engagement driving gambling exposure.' },
    { id: 'cat-lack-of-knowledge', name: 'Lack of knowledge', dir: 'DOWN', group: 'Harm Vectors', desc: 'Low financial or algorithmic literacy obscuring odds and house edge.' },
    { id: 'cat-poker', name: 'Poker', dir: 'DOWN', group: 'Game Genres', desc: 'Texas Hold\'em, Omaha, and community card games (simulated and cash).' },
    { id: 'cat-low-income', name: 'Low income household', dir: 'DOWN', group: 'Vulnerable Groups', desc: 'Socioeconomically vulnerable households disproportionately impacted by financial loss.' },
    { id: 'cat-rural-communities', name: 'Rural Communities', dir: 'DOWN', group: 'Vulnerable Groups', desc: 'Regional demographics targeted by online card games (Rummy, Teen Patti).' },
    { id: 'cat-nfts', name: 'NFTS', dir: 'DOWN', group: 'Emerging Tech', desc: 'Non-fungible token wagering and blockchain collectibles.' },
    { id: 'cat-urban-communities', name: 'Urban Communities', dir: 'DOWN', group: 'Vulnerable Groups', desc: 'Metropolitan demographics adopting gamified crypto and loot boxes.' },
    { id: 'cat-crypto-games', name: 'Crypto Games', dir: 'DOWN', group: 'Emerging Tech', desc: 'Play-to-earn (P2E) blockchain games and cryptocurrency wagering.' },
    { id: 'cat-metaverse-platforms', name: 'Metaverse Platforms', dir: 'DOWN', group: 'Emerging Tech', desc: 'Virtual reality casino worlds and decentralized virtual lands (Decentraland, VRChat).' }
  ];

  for (const c of categories) {
    await sql`
      INSERT INTO taxonomy_categories (id, name, branch_direction, category_group, description)
      VALUES (${c.id}, ${c.name}, ${c.dir}, ${c.group}, ${c.desc})
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        branch_direction = EXCLUDED.branch_direction,
        category_group = EXCLUDED.category_group,
        description = EXCLUDED.description;
    `;
  }

  console.log("Seeding 7 Verified Research Profiles (Taxonomy Research Folder Only)...");
  const profiles = [
    {
      id: 'G010',
      name: 'CSCase.com',
      rep_title: 'CSCase.com',
      cand_class: 'Unofficial CS2 skin case-opening / gambling site (third-party, not affiliated with Valve)',
      audience: 'CS2/CS:GO players; free-case onboarding with no deposit required to start',
      gambling_conn: 'Direct — real money is deposited, wagered on random outcomes, and skins can be sold externally for cash',
      tier_class: 'T6 – Unlicensed Real-money Wagering (primary), with a T3-style grey-market conversion step for the skin payout',
      tier_code: 'T6',
      harm_score: 7,
      harm_rating: 'High',
      risk_score: 7,
      risk_rating: 'High',
      financial_score: 7,
      financial_rating: 'High',
      monetary_val: 'Real money in → chance-based skin payout → skin sellable on third-party markets for real cash out',
      regulatory_stat: 'Not identified as licensed in any jurisdiction reviewed. Unofficial third party exploiting Steam API.',
      full_text: `CSCase.com – Taxonomy Profile
Candidate Class: Unofficial CS2 skin case-opening / gambling site (third-party, not affiliated with Valve).
Primary Audience: CS2/CS:GO players; free-case onboarding with no deposit required to start.
Gambling Connection: Direct — real money is deposited, wagered on random outcomes, and skins can be sold externally for cash.
Addiction / Harm Score: 7/10 – High. Free case mechanics lower the psychological barrier to gambling.
Risk Score: 7/10 – High.
Tier: T6 – Unlicensed Real-money Wagering (primary), with a T3-style grey-market conversion step for the skin payout.
Financial Score: 7/10 – High.
Monetary Value: Real money in → chance-based skin payout → skin sellable on third-party markets for real cash out.
Regulatory Status: Not identified as licensed in any jurisdiction reviewed.`
    },
    {
      id: 'G034',
      name: 'CSGOLuck.com',
      rep_title: 'CSGOLuck.com',
      cand_class: 'Unofficial CS2 skin gambling site offering case opening, case battles, and casino-style games (Roulette, Crash, Coinflip, Mines, Plinko, Towers, Wheel, Jackpot) plus esports betting',
      audience: 'CS2/CS:GO players; operating since 2021, self-categorised as a "Gambling Service"',
      gambling_conn: 'Direct — self-identifies as a gambling service; offers explicit casino game formats, not just loot-box opening',
      tier_class: 'T6 – Unlicensed Real-money Wagering (primary), with a T3-style grey-market conversion step for skin/crypto payouts',
      tier_code: 'T6',
      harm_score: 9,
      harm_rating: 'Very High',
      risk_score: 9,
      risk_rating: 'Very High',
      financial_score: 8,
      financial_rating: 'High',
      monetary_val: 'Real money / skins in → high-frequency casino wagering → skins or crypto out',
      regulatory_stat: 'No gambling licence stated anywhere on the site; operator reported as GG Technology Ltd (Cyprus / Curaçao). Operates outside Australian jurisdiction.',
      full_text: `CSGOLuck.com – Taxonomy Profile
Candidate Class: Unofficial CS2 skin gambling site offering case opening, case battles, and casino-style games plus esports betting.
Primary Audience: CS2/CS:GO players; operating since 2021.
Gambling Connection: Direct — explicit casino game formats with high loss velocity.
Addiction / Harm Score: 9/10 – Very High. Offers rapid-cycle casino games (Crash, Roulette, Mines) alongside loot boxes.
Risk Score: 9/10 – Very High.
Tier: T6 – Unlicensed Real-money Wagering (primary), with a T3-style grey-market conversion step.
Financial Score: 8/10 – High.
Monetary Value: Real money / skins in → high-frequency casino wagering → skins or crypto out.
Regulatory Status: No gambling licence stated anywhere on the site; operator reported as GG Technology Ltd.`
    },
    {
      id: 'G043',
      name: 'Pool',
      rep_title: '8 Ball Pool (Miniclip) & Skill-Cash Pool Apps',
      cand_class: 'Free-to-play competitive skill game with coin-staked matches and paid random boxes (proposed new candidate class; overlaps paid loot-box and children reward-token classes)',
      audience: 'Teenagers and young adults. The US App Store listing rates it 13+ and flags loot boxes and contests',
      gambling_conn: 'Moderate / Indirect. Paid chance-based items and coin stakes, but no cash-out route in official title; real-money variants use tournament stakes',
      tier_class: 'T2: paid random draw, no cash-out (8 Ball Pool). Skill-cash pool apps: T4/T5 boundary',
      tier_code: 'T2',
      harm_score: 5,
      harm_rating: 'Moderate',
      risk_score: 5,
      risk_rating: 'Moderate',
      financial_score: 5,
      financial_rating: 'Moderate',
      monetary_val: 'Real money in → coins or surprise boxes → closed-loop gameplay (8 Ball Pool). Real money entry → cash prize out (Skill-Cash pool)',
      regulatory_stat: '8 Ball Pool: no gambling-regulator action found. Skill-cash variants face state-by-state prohibitions in the United States.',
      full_text: `Pool: Taxonomy Profile
Representative Title: 8 Ball Pool (Miniclip). Real-money variant: skill-cash pool apps.
Candidate Class: Free-to-play competitive skill game with coin-staked matches and paid random boxes.
Primary Audience: Teenagers and young adults (App Store 13+).
Gambling Connection: Moderate / Indirect. Paid chance-based cues and coin stakes.
Addiction / Harm Score: 5/10: Moderate. Variable-ratio cues and match staking mimic betting psychology.
Risk Score: 5/10: Moderate.
Tier: T2 (8 Ball Pool) / T4–T5 boundary for skill-cash tournament pool apps.
Financial Score: 5/10: Moderate.
Monetary Value: Closed-loop coins in 8 Ball Pool; skill-cash variants allow cash entry and cash withdrawals.
Regulatory Status: Main title unencumbered by gambling law; skill-cash contested under state laws.`
    },
    {
      id: 'G044',
      name: 'Bingo',
      rep_title: 'Bingo Blitz (Playtika) & Bingo Cash (Papaya Gaming)',
      cand_class: 'Social-casino apps (free-to-play, purchasable virtual currency). Real-money variant: skill-cash contest app',
      audience: 'Adults, including older adults. Washington Attorney General alleges children also access on family devices',
      gambling_conn: 'High (simulated). Bingo is a chance game, and virtual currency bought with real money is staked with no withdrawal; real-money variants allow cash payouts',
      tier_class: 'T2: paid random draw, no cash-out (Bingo Blitz). Bingo Cash: T4/T5 boundary',
      tier_code: 'T2',
      harm_score: 7,
      harm_rating: 'High',
      risk_score: 6,
      risk_rating: 'Moderate to High',
      financial_score: 7,
      financial_rating: 'High',
      monetary_val: 'Real money in → credits or power-ups → zero cash-out (Bingo Blitz). Real money entry → cash prize out (Bingo Cash)',
      regulatory_stat: 'Bingo Blitz: Named in Washington State Attorney General consumer-protection lawsuit (Feb 2026). Classified as simulated gambling.',
      full_text: `Bingo: Taxonomy Profile
Representative Title: Bingo Blitz (Playtika). Real-money variant: Bingo Cash (Papaya Gaming).
Candidate Class: Social-casino apps. Real-money variant: skill-cash contest app.
Primary Audience: Adults, older adults; children via family devices.
Gambling Connection: High (simulated). Stake virtual coins on chance bingo cards.
Addiction / Harm Score: 7/10: High. Continuous play, near-miss effects, power-up mechanics.
Risk Score: 6/10: Moderate to High.
Tier: T2: paid random draw, no cash-out (Bingo Blitz). Bingo Cash: T4/T5 boundary.
Financial Score: 7/10: High.
Monetary Value: Closed-loop credit sink in social-casino; real cash wagering in skill-cash variant.
Regulatory Status: Named in Washington AG lawsuit (Feb 2026) regarding unlicensed gambling game mechanics.`
    },
    {
      id: 'G045',
      name: 'Online card games',
      rep_title: 'Zynga Poker (Texas Hold\'em) & Solitaire Cash / Teen Patti',
      cand_class: 'Social-casino apps (free-to-play, purchasable chips), with real-money card variants at the far end of cash-realisability',
      audience: 'Adults. Google Play listing notes intended for adults; simulated gambling',
      gambling_conn: 'High. Social variants simulate poker with chance-driven chips and no cash-out; real-money variants are direct gambling',
      tier_class: 'T2: paid random draw, no cash-out (Zynga Poker). Real-money variants: T4/T5 (solitaire); T6 (unlicensed real-money poker in AU, banned in India)',
      tier_code: 'T2',
      harm_score: 7,
      harm_rating: 'High',
      risk_score: 7,
      risk_rating: 'High',
      financial_score: 7,
      financial_rating: 'High',
      monetary_val: 'Real money in → poker chips → no cash out (Zynga). Real-money poker / Teen Patti: direct cash deposits and withdrawals',
      regulatory_stat: 'Zynga Poker: no licence required for social format. Real-money online poker is prohibited under Australia\'s Interactive Gambling Act 2001 (Cth). Banned in India under Online Gaming Act 2025.',
      full_text: `Online card games: Taxonomy Profile
Representative Title: Zynga Poker (Texas Hold'em). Real-money variants: Solitaire Cash, online poker, rummy, Teen Patti.
Candidate Class: Social-casino apps; real-money card games.
Primary Audience: Adults.
Gambling Connection: High. Simulates real poker, blackjack, and traditional card wagering.
Addiction / Harm Score: 7/10: High. Social chip exhaustion cycles push repetitive real-money chip bundles.
Risk Score: 7/10: High.
Tier: T2 (Zynga Poker) / T6 for unlicensed cash poker in Australia.
Financial Score: 7/10: High.
Monetary Value: Closed-loop chip sink in social-casino; direct cash in real-money poker.
Regulatory Status: Interactive Gambling Act 2001 (Cth) prohibits real-money online poker in Australia. India 2025 Act prohibits cash format.`
    },
    {
      id: 'G045-C',
      name: 'Online casino (real-money)',
      rep_title: 'Online Casino (Slots, Roulette, Crash, Live Dealer)',
      cand_class: 'Offshore/unlicensed bookmakers and casinos (T6 in Australia); licensed online casino (T5) in jurisdictions that license it',
      audience: 'Adults 18+ in principle. Unlicensed operators sit outside Australian consumer protection',
      gambling_conn: 'Direct. Real money is staked on chance-based casino games with a cash payout',
      tier_class: 'T6 in Australia (unlicensed and prohibited). T5 where operator holds a recognised local licence',
      tier_code: 'T6',
      harm_score: 9,
      harm_rating: 'Very High',
      risk_score: 8,
      risk_rating: 'High',
      financial_score: 9,
      financial_rating: 'Very High',
      monetary_val: 'Real cash deposited, converted to credits or chips and withdrawable as cash, subject to operator terms',
      regulatory_stat: 'Prohibited interactive gambling services are unlawful in Australia under Interactive Gambling Act 2001 (Cth); ACMA blocked 1,788 illegal gambling and affiliate sites by Aug 2026.',
      full_text: `Casino: Taxonomy Profile
Scope: Online casino (real-money): slots, roulette, blackjack, baccarat, live-dealer tables and crash games.
Candidate Class: Offshore/unlicensed bookmakers and casinos (T6 in Australia).
Primary Audience: Adults 18+.
Gambling Connection: Direct. Real money staked on chance games for cash payout.
Addiction / Harm Score: 9/10: Very High. Uncapped loss velocity, 24/7 access, chip abstraction effect.
Risk Score: 8/10: High.
Tier: T6 in Australia (prohibited and unlicensed).
Financial Score: 9/10: Very High.
Monetary Value: Real cash in → credits → real cash withdrawal.
Regulatory Status: ACMA has blocked 1,788 illegal gambling domains as of August 2026 under the Interactive Gambling Act 2001 (Cth).`
    },
    {
      id: 'G046',
      name: 'Melbet',
      rep_title: 'Melbet (Sportsbook & Casino)',
      cand_class: 'Offshore/unlicensed bookmakers (T6). Also fits cricket and fantasy-sports wagering, esports wagering, and online casino as facets',
      audience: 'Adult bettors, with cricket and IPL markets and local payment methods aimed at South Asian markets (India, Bangladesh)',
      gambling_conn: 'Direct. Real-money sports betting and casino games with cash payout',
      tier_class: 'T6: unlicensed or offshore real-money wagering (Australia and India)',
      tier_code: 'T6',
      harm_score: 9,
      harm_rating: 'Very High',
      risk_score: 9,
      risk_rating: 'Very High',
      financial_score: 9,
      financial_rating: 'Very High',
      monetary_val: 'Real cash (including INR, BDT and cryptocurrency) deposited and withdrawable, subject to operator terms',
      regulatory_stat: 'Claims a Curaçao licence (unverified); no Australian licence. Online money games prohibited in India under 2025 Act (in force May 2026).',
      full_text: `Melbet: Taxonomy Profile
Representative Title: Melbet (also written MelBet): offshore online sportsbook and casino.
Candidate Class: Offshore/unlicensed bookmakers (T6).
Primary Audience: Adult bettors, cricket and IPL focus, South Asian diaspora.
Gambling Connection: Direct. Real money sports betting and 5,000+ casino games.
Addiction / Harm Score: 9/10: Very High. Live in-play wagering, crash games (Aviator), crypto deposits.
Risk Score: 9/10: Very High.
Tier: T6: unlicensed or offshore real-money wagering.
Financial Score: 9/10: Very High.
Monetary Value: Real cash (INR, BDT, crypto) in and out.
Regulatory Status: Unverified Curaçao licence claims. No Australian licence. Prohibited in India under the 2025 Act.`
    }
  ];

  for (const p of profiles) {
    await sql`
      INSERT INTO game_profiles (
        id, name, representative_title, candidate_class, primary_audience,
        gambling_connection, tier_classification, tier_code, harm_score, harm_rating,
        risk_score, risk_rating, financial_score, financial_rating, monetary_value,
        regulatory_status, full_dossier_text
      ) VALUES (
        ${p.id}, ${p.name}, ${p.rep_title}, ${p.cand_class}, ${p.audience},
        ${p.gambling_conn}, ${p.tier_class}, ${p.tier_code}, ${p.harm_score}, ${p.harm_rating},
        ${p.risk_score}, ${p.risk_rating}, ${p.financial_score}, ${p.financial_rating}, ${p.monetary_val},
        ${p.regulatory_stat}, ${p.full_text}
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        representative_title = EXCLUDED.representative_title,
        candidate_class = EXCLUDED.candidate_class,
        primary_audience = EXCLUDED.primary_audience,
        gambling_connection = EXCLUDED.gambling_connection,
        tier_classification = EXCLUDED.tier_classification,
        tier_code = EXCLUDED.tier_code,
        harm_score = EXCLUDED.harm_score,
        harm_rating = EXCLUDED.harm_rating,
        risk_score = EXCLUDED.risk_score,
        risk_rating = EXCLUDED.risk_rating,
        financial_score = EXCLUDED.financial_score,
        financial_rating = EXCLUDED.financial_rating,
        monetary_value = EXCLUDED.monetary_value,
        regulatory_status = EXCLUDED.regulatory_status,
        full_dossier_text = EXCLUDED.full_dossier_text;
    `;
  }

  console.log("Seeding Profile to Taxonomy Mappings...");
  const mappings = [
    { p: 'G010', c: 'cat-loot-box-system', primary: true },
    { p: 'G010', c: 'cat-fps-games', primary: false },
    { p: 'G010', c: 'cat-teenager', primary: false },
    { p: 'G010', c: 'cat-offshore-gambling', primary: false },

    { p: 'G034', c: 'cat-loot-box-system', primary: true },
    { p: 'G034', c: 'cat-offshore-gambling', primary: true },
    { p: 'G034', c: 'cat-fps-games', primary: false },
    { p: 'G034', c: 'cat-excitement', primary: false },

    { p: 'G043', c: 'cat-teenager', primary: true },
    { p: 'G043', c: 'cat-old-people', primary: false },
    { p: 'G043', c: 'cat-entertainment', primary: true },
    { p: 'G043', c: 'cat-nfts', primary: false },

    { p: 'G044', c: 'cat-old-people', primary: true },
    { p: 'G044', c: 'cat-bingo-keno', primary: true },
    { p: 'G044', c: 'cat-social-casino', primary: true },
    { p: 'G044', c: 'cat-social-isolation', primary: false },

    { p: 'G045', c: 'cat-old-people', primary: true },
    { p: 'G045', c: 'cat-poker', primary: true },
    { p: 'G045', c: 'cat-social-casino', primary: true },
    { p: 'G045', c: 'cat-rural-communities', primary: false },

    { p: 'G045-C', c: 'cat-offshore-gambling', primary: true },
    { p: 'G045-C', c: 'cat-cruise-gambling', primary: false },
    { p: 'G045-C', c: 'cat-excitement', primary: true },
    { p: 'G045-C', c: 'cat-lack-of-knowledge', primary: false },

    { p: 'G046', c: 'cat-cricket-ipl', primary: true },
    { p: 'G046', c: 'cat-offshore-gambling', primary: true },
    { p: 'G046', c: 'cat-inplay-betting', primary: false },
    { p: 'G046', c: 'cat-low-income', primary: true }
  ];

  for (const m of mappings) {
    await sql`
      INSERT INTO profile_taxonomy_mapping (profile_id, category_id, is_primary)
      VALUES (${m.p}, ${m.c}, ${m.primary})
      ON CONFLICT (profile_id, category_id) DO UPDATE SET
        is_primary = EXCLUDED.is_primary;
    `;
  }

  console.log("Seeding Research Citations & Legal References...");
  const citations = [
    { p: 'G010', text: 'Trustpilot (n.d.). CSCase.com user reviews and trust indicators. CS.Money (n.d.) Steam trading market integration.', type: 'REVIEW', year: '2026' },
    { p: 'G010', text: 'Harris, Griffiths and Gibson (2025). Rapid evidence review of skins gambling in young adults. GOV.UK.', type: 'ACADEMIC_STUDY', year: '2025' },
    { p: 'G034', text: 'GG Technology Ltd corporate filings and self-categorized Gambling Service disclosure. CSGOLuck terms of service.', type: 'LITIGATION', year: '2026' },
    { p: 'G034', text: 'Hing et al. (2022). Adolescent betting on esports using cash and skins. PLOS ONE, 17(5).', type: 'ACADEMIC_STUDY', year: '2022' },
    { p: 'G043', text: 'Miniclip 8 Ball Pool App Store and Google Play Terms of Service and Loot Box Disclosures.', type: 'REVIEW', year: '2026' },
    { p: 'G043', text: 'Drummond & Sauer (2018). Video game loot boxes are psychologically akin to gambling. Nature Human Behaviour.', type: 'ACADEMIC_STUDY', year: '2018' },
    { p: 'G044', text: 'State of Washington v. Playtika Ltd. Consumer Protection Enforcement Action, King County Superior Court.', type: 'LITIGATION', year: '2026' },
    { p: 'G044', text: 'Australian Classification Board (2024). Mandatory classification guidelines for simulated gambling (R18+).', type: 'REGULATOR_ACMA', year: '2024' },
    { p: 'G045', text: 'Interactive Gambling Act 2001 (Cth). Australian Federal Legislation prohibiting online real-money poker and casino services.', type: 'LEGAL_ACT', year: '2001' },
    { p: 'G045', text: 'Parliament of India (2025). The Promotion and Regulation of Online Gaming Act 2025 (in force May 2026).', type: 'LEGAL_ACT', year: '2025' },
    { p: 'G045-C', text: 'Australian Communications and Media Authority (ACMA, 2026). Illegal gambling website blocking register (1,788 sites blocked).', type: 'REGULATOR_ACMA', year: '2026' },
    { p: 'G045-C', text: 'Lapuz & Griffiths (2010). The role of chips in poker gambling: An empirical pilot study.', type: 'ACADEMIC_STUDY', year: '2010' },
    { p: 'G046', text: 'Telecom Asia & Football Whispers (2026). Melbet operational coverage, mirror domains and payment gateways.', type: 'REVIEW', year: '2026' },
    { p: 'G046', text: 'Langham et al. (2016). Understanding gambling related harm: A conceptual framework and taxonomy of harms. BMC Public Health.', type: 'ACADEMIC_STUDY', year: '2016' }
  ];

  for (const cit of citations) {
    await sql`
      INSERT INTO research_citations (profile_id, citation_text, source_type, year)
      VALUES (${cit.p}, ${cit.text}, ${cit.type}, ${cit.year});
    `;
  }

  console.log("✅ Neon Database Seeding Completed Successfully!");
  const count = await sql`SELECT count(*) FROM game_profiles;`;
  console.log(`Verified Game Profiles Count: ${count[0].count}`);
  const catCount = await sql`SELECT count(*) FROM taxonomy_categories;`;
  console.log(`Verified Taxonomy Categories Count: ${catCount[0].count}`);
}

main().catch(err => {
  console.error("❌ Seed Error:", err);
  process.exit(1);
});
