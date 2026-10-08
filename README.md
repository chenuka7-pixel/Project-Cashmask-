# Socio-Technical Security Against Online Games for Cash
**Edith Cowan University (ECU) • Unit CSG3101 Applied Project**  
**Supervisor:** Dr. David Cook (Joondalup Campus)  
**Team Members:** Pasidu Gangodavilage, Kumarage Perera, Chenuka Arachchilage, Pasini Arachchilage, MD Anik, Ilhaan Fakeermahamood  

---

## 📌 Project Overview
This project classifies online games offering real money or cash-like rewards by **convertibility/cash realisability** (whether money can actually come back out) and **socio-technical harm** (who bears the loss). 

The platform features:
1. **Interactive Bidirectional Taxonomy Tree:** Directly modeled after the team's taxonomy blueprint, presenting 40 classification dimensions connecting demographics, game genres, monetary mechanics, psychological harm drivers, and emerging Web3 ecosystems.
2. **Evaluated Game Profiles (Taxonomy Research Dossiers):** In-depth evaluations of 7 primary archetypes and titles strictly sourced from the `Taxonomy research/` folder (`CSCase.com`, `CSGOLuck.com`, `Pool / 8 Ball Pool`, `Bingo Blitz`, `Zynga Poker`, `Online Casino`, and `Melbet`).
3. **Guidance Chatbot:** An academic, scope-guarded advisory assistant powered by OpenRouter OpenAI GPT-4o, strictly grounded on the research dataset and enforcing Australian problem gambling crisis referrals (National Gambling Helpline `1800 858 858`).
4. **Neon Serverless Postgres Database:** Sydney pooler (`ap-southeast-2`) relational database housing all taxonomy categories, game dossiers, and legal citations.

---

## 🛠️ Technology Stack
* **Frontend:** React 18, Vite 6, TypeScript, Vanilla CSS (Design Tokens, Glassmorphism, Dark Mode)
* **Backend Database:** Neon Serverless PostgreSQL (`@neondatabase/serverless`)
* **AI Model:** OpenRouter API (`openai/gpt-4o`)
* **Deployment Platform:** Vercel (SPA with Serverless Functions in `api/`)

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file (or copy from `.env.example`):
```env
DATABASE_URL="postgresql://neondb_owner:npg_s6vEMk8bndrU@ep-snowy-salad-a74eioxr-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
OPENROUTER_API_KEY="your-openrouter-api-key"
OPENROUTER_MODEL="openai/gpt-4o"
VITE_OPENROUTER_API_KEY="your-openrouter-api-key"
VITE_OPENROUTER_MODEL="openai/gpt-4o"
```

### 3. Seed Neon Database
To initialize the tables and seed all 40 taxonomy categories and 7 verified research dossiers into Neon Postgres:
```bash
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production
```bash
npm run build
```

---

## 🌐 Vercel Deployment
To deploy to Vercel:
1. Push your repository to GitHub or run `vercel` CLI.
2. In the Vercel Project Settings, add the following Environment Variables:
   * `DATABASE_URL`: Your Neon Postgres connection string
   * `OPENROUTER_API_KEY`: Your OpenRouter API key
   * `OPENROUTER_MODEL`: `openai/gpt-4o`
   * `VITE_OPENROUTER_API_KEY`: Your OpenRouter API key
   * `VITE_OPENROUTER_MODEL`: `openai/gpt-4o`
3. Deploy! Vercel will automatically build the React Vite application and serve `/api/chat` as a serverless function.

---

## 📞 Support & Help Services
* **National Gambling Helpline (Australia):** 1800 858 858 (Free call, confidential 24/7)
* **Gambling Help Online:** [gamblinghelponline.org.au](https://www.gamblinghelponline.org.au)
* **BetStop (National Self-Exclusion Register):** [betstop.gov.au](https://www.betstop.gov.au)
