# AI Listing Marketing Kit for Real Estate Agents 🚀

> Turn any property address into a complete, high-converting real estate marketing kit in under 60 seconds — powered by Google Gemini 2.5 Flash Lite AI.

---

## 🌟 Overview

**ListingKit AI** is a vertical Micro-SaaS application built specifically for real estate agents, brokers, and real estate marketing agencies.

An agent enters basic property specifications (address, price, beds/baths, 3 key selling features, tone, target buyer), and ListingKit generates:

- 📝 **MLS Listing Description**: 150–250 word compelling write-up ready for Zillow, Redfin, Realtor.com, and local MLS boards.
- 📱 **5 Platform-Optimized Social Captions**:
  - Instagram — Lifestyle & Emotion (with emojis & hashtags)
  - Instagram — Feature Showcase
  - Facebook — Conversational group post
  - LinkedIn — Professional & investor-focused
  - X / Twitter — Punchy tweet under 280 characters
- 📧 **Ready-to-Send Buyer Email**: Catchy subject line + full email body ready for CRM or email blasts.
- 🔗 **Single-Property Mini-Site**: Instant public URL (`/p/[slug]`) featuring property specs, photo gallery carousel, listing description, and direct agent contact buttons (Email & WhatsApp).
- 📱 **Flyer QR Code**: Built-in QR code generator pointing to the property mini-site for print flyers and open house signs.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Lucide Icons
- **Routing**: React Router v6
- **AI Core**: Google Gemini 2.5 Flash Lite (`@google/generative-ai`)
- **Backend / DB & Auth**: Firebase Auth, Cloud Firestore, Firebase Storage (with smart client fallback mode for instant local testing)
- **QR Generation**: `qrcode.react`

---

## ⚡ Quick Start (Agent Demo Mode)

The app includes an instant **Demo Mode** out-of-the-box. You do **not** need to configure API keys or databases to test the full user experience right away!

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🔑 Environment Variables Configuration (Optional)

To enable live Google Gemini AI calls and live Firebase authentication, create a `.env` or `.env.local` file in the project root:

```env
# Google Gemini AI Key
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Client SDK
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Top navigation bar & user profile menu
│   │   ├── Sidebar.tsx          # Dashboard navigation & usage widget
│   │   ├── UsageBar.tsx         # Generation counter progress bar
│   │   ├── ListingCard.tsx      # Dashboard property listing card
│   │   ├── CopyButton.tsx       # Instant copy-to-clipboard button
│   │   └── ContentTabs.tsx      # Results tab view (MLS, Social, Email, Mini-Site)
│   ├── lib/
│   │   ├── firebase.ts          # Auth, Storage, and client state store helpers
│   │   ├── gemini.ts            # Gemini 2.5 Flash Lite API caller + smart model
│   │   └── utils.ts             # Price formatter, nanoid slug generator, date formatters
│   ├── pages/
│   │   ├── LandingPage.tsx      # Marketing landing page with hero & pricing tiers
│   │   ├── LoginPage.tsx        # Agent login screen
│   │   ├── SignupPage.tsx       # Agent signup screen
│   │   ├── DashboardPage.tsx    # Property listing grid & overview
│   │   ├── NewListingPage.tsx   # Property detail form & photo uploader
│   │   ├── ListingResultsPage.tsx # Marketing kit results page
│   │   ├── SettingsPage.tsx     # Agent branding profile & plan selection
│   │   └── PublicMiniSitePage.tsx # Public single-property website (/p/:slug)
│   ├── types/
│   │   └── index.ts             # TypeScript definitions
│   ├── App.tsx                  # React Router configuration
│   ├── main.tsx                 # React DOM root entry
│   └── index.css                # Tailwind base CSS
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 💰 Monetization Tiers

| Tier | Price | Monthly Limit |
|------|-------|---------------|
| **Free Trial** | $0 | 3 Lifetime Generations |
| **Starter** | $29 / mo | 20 Generations / Month |
| **Pro Agent** | $59 / mo | Unlimited Generations + Custom Agent Branding |

---

## 🚢 Deployment

Deploy seamlessly to Vercel, Netlify, or Cloudflare Pages:

1. Push code to GitHub
2. Import project into Vercel/Netlify
3. Set build command to `npm run build` and output directory to `dist`
4. Add environment variables if live Gemini / Firebase integration is enabled.

---

## 📄 License

MIT © ListingKit AI
