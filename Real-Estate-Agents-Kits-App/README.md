# AI Listing Marketing Kit

A web application for real estate agents that generates a complete property marketing kit — MLS listing description, 5 social captions, buyer email, and a shareable mini-site — in under 60 seconds.

---

## What It Does

An agent fills in one form with property details. The app sends those details to **Google Gemini 2.5 Flash Lite** and returns:

- ✅ MLS-ready listing description (150–250 words)
- ✅ 5 platform-specific social captions (Instagram ×2, Facebook, LinkedIn, Twitter/X)
- ✅ Ready-to-send buyer email (subject + body)
- ✅ A shareable public mini-site URL for the property
- ✅ A QR code for the mini-site (for print/flyers)

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Auth | Firebase Auth |
| Database | Cloud Firestore |
| File Storage | Firebase Storage |
| AI | Google Gemini 2.5 Flash Lite |
| Payments | Stripe (subscriptions) |
| Hosting | Vercel |
| Styling | Tailwind CSS + shadcn/ui |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project (Firestore + Storage + Auth enabled)
- A Google AI Studio API key (Gemini)
- A Stripe account (for payments)

### 1. Clone and Install
```bash
git clone https://github.com/yourusername/listing-kit.git
cd listing-kit
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the project root. You need to fill in:

- **Firebase Client SDK** keys from Firebase Console → Project Settings → Your Apps
- **Firebase Admin SDK** keys from Firebase Console → Project Settings → Service Accounts → Generate New Private Key
- **Gemini API Key** from [aistudio.google.com](https://aistudio.google.com)
- **Stripe keys** from [dashboard.stripe.com](https://dashboard.stripe.com)

See `PRD.md` Section 8 for the full list of required environment variable names.

> ⚠️ Never commit `.env.local` to git. It's already in `.gitignore`.

### 3. Set Up Firebase
1. Enable **Email/Password** authentication in Firebase Console → Authentication → Sign-in methods
2. Create a **Firestore** database in production mode
3. Enable **Firebase Storage**
4. Deploy the Security Rules from `PRD.md` Section 7 for both Firestore and Storage

### 4. Set Up Stripe
1. Create two products in Stripe Dashboard:
   - **Starter Plan**: $29/month recurring
   - **Pro Plan**: $59/month recurring
2. Copy both Price IDs into `.env.local`
3. Create a webhook pointing to `https://yourdomain.com/api/stripe/webhook`
4. Listen for: `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`, `customer.subscription.updated`
5. Copy the Webhook Signing Secret into `.env.local`

For local development, use the Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### 5. Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/                    # Pages and API routes
│   ├── page.tsx            # Landing page
│   ├── login/              # Login
│   ├── signup/             # Signup
│   ├── dashboard/          # Protected dashboard pages
│   ├── p/[slug]/           # Public mini-site
│   └── api/                # Server-side API routes
├── components/             # Reusable UI components
├── lib/                    # Firebase, Gemini, Stripe setup
├── hooks/                  # React hooks (auth, listings, subscription)
└── types/                  # TypeScript type definitions
```

See `MVP.md` for the full file structure and `PRD.md` for the complete product spec.

---

## Plans & Pricing

| Plan | Price | Generations |
|------|-------|-------------|
| Free | $0 | 3 total (lifetime trial) |
| Starter | $29/mo | 20 per month |
| Pro | $59/mo | Unlimited |

---

## Deployment

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local` in Vercel project settings
4. Set `NEXT_PUBLIC_APP_URL` to your production Vercel URL
5. Update your Stripe webhook URL to point to your production domain

Vercel auto-deploys on every push to `main`.

---

## Documentation

| File | Contents |
|------|----------|
| `README.md` | This file — setup and overview |
| `MVP.md` | Full technical spec — every page, API route, and component explained |
| `PRD.md` | Product Requirements Document — user stories, data models, security rules, acceptance criteria |

---

## Cost at Scale

Gemini 2.5 Flash Lite costs approximately **$0.00056 per generation** (less than 1/10th of a cent).

| Monthly Generations | API Cost |
|--------------------|----------|
| 1,000 | ~$0.56 |
| 10,000 | ~$5.60 |
| 50,000 | ~$28.00 |

Your infrastructure costs (Vercel + Firebase Spark plan) are effectively $0 during early stages.

---

## Important Notes

- The Firebase Admin SDK private key should never be committed to git
- All Gemini and Stripe secret keys are server-side only — never used in client code
- Generation limits are enforced server-side in `/api/generate` — not just on the frontend
- Stripe webhooks must verify the `stripe-signature` header before processing any event
