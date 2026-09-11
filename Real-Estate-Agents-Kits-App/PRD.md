# Product Requirements Document (PRD)
# AI Listing Marketing Kit
**Version:** 1.0  
**Status:** Pre-Development  
**Last Updated:** March 2026

---

## 1. Product Overview

### 1.1 Product Name
AI Listing Marketing Kit (working title — to be finalised)

### 1.2 One-Line Description
A web application that takes a real estate agent's property details and generates a complete marketing kit — MLS listing description, 5 platform-specific social media captions, a buyer email, and a shareable single-property mini-site — in under 60 seconds.

### 1.3 Problem Statement
Real estate agents spend 2–4 hours per listing writing marketing copy, creating social posts, drafting emails, and building property pages. They either do this themselves (slow, inconsistent quality) or pay a marketing agency (expensive, slow turnaround). Neither option scales when an agent has multiple active listings.

### 1.4 Solution
A single-input form where an agent enters property details once. The app sends those details to Google Gemini 2.5 Flash Lite and returns a complete, ready-to-use marketing kit in one click. Everything is saved, accessible from a dashboard, and comes with a shareable public mini-site link for each listing.

### 1.5 Target Users

**Primary User: Independent Real Estate Agent**
- Works alone or in a small team
- Lists 2–10 properties per month
- Active on Instagram, Facebook, and email
- Pays for tools that save them time
- Not tech-savvy — needs zero learning curve

**Secondary User: Small Real Estate Agency / Team Lead**
- Manages 3–10 agents
- Needs consistent brand voice across all listings
- Would pay for a team/agency plan (post-MVP)

### 1.6 Success Metrics (3-Month Targets)
- 10–20 beta users onboarded (free)
- 30–50 paying subscribers by end of month 2
- $1,500–$2,500 MRR by end of month 2
- $3,000–$5,000 MRR by end of month 3
- Average generation time under 10 seconds
- User retention rate above 60% month-over-month

---

## 2. User Stories

### 2.1 Authentication

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| AUTH-01 | Visitor | Sign up with email and password | I can access the app | Must Have |
| AUTH-02 | Visitor | Log in with email and password | I can return to my account | Must Have |
| AUTH-03 | User | Log out | My account stays secure | Must Have |
| AUTH-04 | User | Reset my password via email | I can recover access if I forget it | Must Have |
| AUTH-05 | User | Stay logged in across sessions | I don't have to log in every visit | Should Have |

### 2.2 Onboarding

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| ONB-01 | New user | Complete my profile after signup | My name and contact info appears on mini-sites | Must Have |
| ONB-02 | New user | See how many free generations I have left | I know when I'll need to upgrade | Must Have |
| ONB-03 | New user | Be redirected to the dashboard after signup | I can start using the tool immediately | Must Have |

### 2.3 Core Generation Feature

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| GEN-01 | Agent | Fill in a form with property details | The AI has everything it needs | Must Have |
| GEN-02 | Agent | Upload up to 3 property photos | They appear on my mini-site | Must Have |
| GEN-03 | Agent | Choose the writing tone | The content matches my brand voice | Must Have |
| GEN-04 | Agent | Choose the target buyer type | The content speaks to the right audience | Must Have |
| GEN-05 | Agent | Hit one button to generate everything | I don't have to run multiple prompts | Must Have |
| GEN-06 | Agent | See a loading state while generating | I know the app is working | Must Have |
| GEN-07 | Agent | See an error message if generation fails | I can try again without confusion | Must Have |
| GEN-08 | Agent | Regenerate any section individually | I can tweak one piece without redoing everything | Should Have |

### 2.4 Results & Content

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| RES-01 | Agent | See the listing description in a readable view | I can review before copying | Must Have |
| RES-02 | Agent | See all 5 social captions in separate cards | I can review and copy each one individually | Must Have |
| RES-03 | Agent | See the buyer email with subject and body | I can paste it directly into my email tool | Must Have |
| RES-04 | Agent | Copy any piece of content with one click | I don't have to manually select text | Must Have |
| RES-05 | Agent | See a confirmation when I copy | I know the copy worked | Must Have |
| RES-06 | Agent | Get a shareable mini-site URL | I can send buyers directly to a property page | Must Have |
| RES-07 | Agent | See a QR code for the mini-site | I can print it on flyers | Should Have |
| RES-08 | Agent | Access past listings from my dashboard | I can find old content without regenerating | Must Have |

### 2.5 Public Mini-Site

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| MINI-01 | Buyer | View a property page without logging in | I can see the listing immediately | Must Have |
| MINI-02 | Buyer | See property photos in a gallery | I can evaluate the property visually | Must Have |
| MINI-03 | Buyer | See property details (price, beds, baths) | I can quickly assess if it fits my needs | Must Have |
| MINI-04 | Buyer | See the full listing description | I can read about the property | Must Have |
| MINI-05 | Buyer | See the agent's contact information | I can reach out directly | Must Have |
| MINI-06 | Buyer | Click to email or WhatsApp the agent | I can contact them from the page | Must Have |

### 2.6 Dashboard

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| DASH-01 | Agent | See all my listings in a grid or list | I can find any past listing quickly | Must Have |
| DASH-02 | Agent | See how many generations I've used this month | I can manage my usage | Must Have |
| DASH-03 | Agent | Delete a listing | I can remove outdated or test entries | Should Have |
| DASH-04 | Agent | Search or filter listings by address | I can find specific listings fast | Could Have |

### 2.7 Billing & Subscriptions

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| BILL-01 | Free user | See a clear upgrade prompt when I hit my limit | I know my options | Must Have |
| BILL-02 | User | Subscribe to a paid plan via Stripe | I can unlock more generations | Must Have |
| BILL-03 | User | See my current plan on the settings page | I know what I'm paying for | Must Have |
| BILL-04 | User | Access the Stripe billing portal | I can manage or cancel my subscription | Must Have |
| BILL-05 | User | Receive a confirmation email when I subscribe | I have proof of purchase | Should Have |

### 2.8 Settings & Profile

| ID | As a... | I want to... | So that... | Priority |
|----|---------|-------------|-----------|----------|
| SET-01 | Agent | Update my full name | It appears correctly on mini-sites | Must Have |
| SET-02 | Agent | Update my agency name | It appears on mini-sites | Must Have |
| SET-03 | Agent | Update my phone number | Buyers can call me from the mini-site | Must Have |
| SET-04 | Agent | Upload a headshot | It appears on mini-sites | Should Have |

---

## 3. Functional Requirements

### 3.1 Authentication System
- Email and password authentication via Firebase Auth
- Persistent sessions (user stays logged in on page reload)
- Email verification sent on signup (Firebase built-in)
- Password reset via email link (Firebase built-in)
- Protected routes — all `/dashboard/*` routes redirect to `/login` if unauthenticated
- On successful login/signup → redirect to `/dashboard`
- On logout → redirect to `/`

### 3.2 User Profile
- A Firestore document is created for every new user at path `users/{uid}` on first login/signup
- Profile fields: `fullName`, `agencyName`, `phone`, `headshotUrl`, `plan`, `stripeCustomerId`, `createdAt`
- Default plan: `free`
- Profile is editable from the settings page
- Headshot stored in Firebase Storage at `headshots/{uid}/photo`

### 3.3 Listing Form
**Required fields (form will not submit without these):**
- Property address (text, max 200 chars)
- List price (number, min $1)
- Bedrooms (select: 1, 2, 3, 4, 5+)
- Bathrooms (select: 1, 1.5, 2, 2.5, 3, 3.5, 4+)
- Property type (select: House, Condo, Townhouse, Apartment, Land, Commercial)
- Feature 1 (text, max 100 chars)
- Feature 2 (text, max 100 chars)
- Feature 3 (text, max 100 chars)

**Optional fields:**
- Target buyer (select: First-Time Buyer, Family, Investor, Luxury, Downsizer)
- Writing tone (select: Professional, Warm & Friendly, Luxury, Energetic)
- Photos (file upload, max 3 files, max 5MB each, JPG/PNG/WEBP only)

**Validation:**
- All required fields validated on submit
- Photos validated for type and size client-side before upload
- Form shows inline error messages per field

### 3.4 Content Generation
- When the form is submitted, photos are uploaded to Firebase Storage first
- After upload, a `listings` document is created in Firestore
- A POST request is made to the internal Next.js API route `/api/generate`
- The API route checks the user's generation limit before calling Gemini
- If limit reached → return 403 with `LIMIT_REACHED` error code
- If within limit → call Gemini 2.5 Flash Lite API
- Gemini is prompted to return JSON only (no markdown, no backticks)
- Response is parsed and saved to `generated_content` collection in Firestore
- `generations_used` is incremented by 1 in the user's `subscriptions` document
- The frontend polls or receives the result and navigates to the results page

**Generation limits by plan:**
- Free: 3 total (lifetime, not monthly)
- Starter: 20 per billing month
- Pro: Unlimited

**Error handling:**
- If Gemini API fails → return 500, show retry option to user
- If JSON parsing fails → retry generation once automatically
- If second attempt fails → show error with support contact

### 3.5 Generated Content Storage
Each generation creates one document in `generated_content/{id}` with:
- `listingId` — reference to the listing
- `userId` — the agent's uid
- `listingDescription` — full MLS description text
- `captions.instagram1`, `captions.instagram2`, `captions.facebook`, `captions.linkedin`, `captions.twitter`
- `email.subject`, `email.body`
- `miniSiteSlug` — 8-character unique slug (nanoid)
- `createdAt` — server timestamp

### 3.6 Copy-to-Clipboard
- Every content section (listing description, each caption, email subject, email body) has a copy button
- On click: content is written to clipboard via `navigator.clipboard.writeText()`
- Button text changes to "Copied!" for 2 seconds then resets
- If clipboard API unavailable (non-HTTPS or old browser): fallback using `document.execCommand('copy')` on a temporary textarea

### 3.7 Mini-Site
- Public route: `/p/[slug]`
- No authentication required to view
- Fetches `generated_content` document by `miniSiteSlug` field
- Fetches the associated `listings` document
- Fetches the agent's `users` profile document
- Renders: photos carousel, price, beds/baths, address, listing description, agent info, contact buttons
- Contact buttons: "Email Agent" (mailto link), "WhatsApp" (wa.me link with pre-filled message)
- Page is statically renderable (use Next.js `generateStaticParams` or ISR with 60s revalidation)
- "Powered by [AppName]" footer link on every mini-site
- QR code generated client-side using `qrcode.react` library pointing to the mini-site URL

### 3.8 Stripe Billing
**Plans and Stripe Products:**
- Starter: $29/month recurring — 20 generations/month
- Pro: $59/month recurring — unlimited generations

**Checkout flow:**
1. User clicks upgrade on the upgrade modal or settings page
2. Frontend calls `/api/stripe/create-checkout` with the desired plan
3. API creates a Stripe Checkout Session with the correct Price ID
4. User is redirected to Stripe-hosted checkout page
5. On success → Stripe redirects to `/dashboard?upgraded=true`
6. Webhook at `/api/stripe/webhook` handles `checkout.session.completed`
7. Webhook updates `subscriptions/{uid}` in Firestore with new plan, limit, status, `stripeSubscriptionId`, `stripeCustomerId`

**Webhook events handled:**
- `checkout.session.completed` → activate subscription, set plan + limit
- `invoice.paid` → reset `generations_used` to 0 each billing cycle
- `customer.subscription.deleted` → downgrade user to free plan
- `customer.subscription.updated` → handle plan changes

**Stripe Customer Portal:**
- Button in settings page calls `/api/stripe/portal`
- API creates a Stripe Billing Portal Session
- User is redirected to Stripe-hosted portal to manage/cancel

### 3.9 Generation Limit Enforcement
Every call to `/api/generate` runs this check server-side:
```
fetch user's subscriptions/{uid} document
if plan === 'free' AND total_generations_used >= 3 → BLOCK
if plan === 'starter' AND generations_used >= 20 → BLOCK
if plan === 'pro' → ALLOW always
if no subscription document → treat as free
```
This check must happen server-side (in the API route), not only on the frontend, to prevent bypass.

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Generation response time: under 15 seconds (Gemini API dependent)
- Page load time (dashboard): under 2 seconds on average connection
- Photo upload: progress indicator shown for uploads over 2 seconds
- Mini-site load time: under 1.5 seconds (static/ISR page)

### 4.2 Security
- All Firebase Security Rules must enforce that users can only read/write their own documents
- API keys (Gemini, Stripe) must only be used server-side — never exposed to the client
- Stripe webhook must verify the `stripe-signature` header before processing
- File uploads validated server-side for type and size
- Firebase Storage rules must restrict write access to authenticated users only, for their own path

### 4.3 Reliability
- Generation failures must show a clear, actionable error message
- App must remain functional if a single Firestore read fails (graceful fallback states)
- Stripe webhook failures must not silently drop — log errors to console/monitoring

### 4.4 Scalability
- Firebase/Firestore scales automatically — no action needed at MVP scale
- Gemini API quota: monitor via Google Cloud Console
- Vercel serverless functions handle `/api/*` routes — scales automatically

### 4.5 Accessibility
- All interactive elements keyboard-accessible
- All images have alt text
- Color contrast meets WCAG AA minimum
- Form fields have associated labels

---

## 5. Data Models (Firestore Collections)

### Collection: `users`
Document ID: Firebase Auth `uid`
```
{
  uid:               string,
  email:             string,
  fullName:          string,
  agencyName:        string,        // optional
  phone:             string,        // optional
  headshotUrl:       string,        // optional, Firebase Storage URL
  plan:              'free' | 'starter' | 'pro',
  stripeCustomerId:  string,        // optional, set after first Stripe interaction
  createdAt:         Timestamp
}
```

### Collection: `listings`
Document ID: auto-generated
```
{
  id:                string,        // same as document ID
  userId:            string,        // Firebase Auth uid
  address:           string,
  price:             number,
  bedrooms:          number,
  bathrooms:         number,
  propertyType:      string,
  feature1:          string,
  feature2:          string,
  feature3:          string,
  targetBuyer:       string,        // optional
  tone:              string,        // optional, default 'Professional'
  photoUrls:         string[],      // Firebase Storage URLs, max 3
  createdAt:         Timestamp
}
```

### Collection: `generated_content`
Document ID: auto-generated
```
{
  id:                string,
  listingId:         string,        // reference to listings document
  userId:            string,
  listingDescription: string,
  captions: {
    instagram1:      string,
    instagram2:      string,
    facebook:        string,
    linkedin:        string,
    twitter:         string
  },
  email: {
    subject:         string,
    body:            string
  },
  miniSiteSlug:      string,        // unique 8-char slug e.g. "xK92mP4a"
  createdAt:         Timestamp
}
```

### Collection: `subscriptions`
Document ID: Firebase Auth `uid`
```
{
  userId:                  string,
  plan:                    'free' | 'starter' | 'pro',
  stripeSubscriptionId:    string,    // optional
  stripeCustomerId:        string,    // optional
  status:                  'active' | 'canceled' | 'past_due' | 'trialing',
  generationsUsed:         number,    // resets monthly for paid plans
  generationsLimit:        number,    // 3 (free) | 20 (starter) | 999999 (pro)
  totalGenerationsUsed:    number,    // lifetime counter, never resets
  periodEnd:               Timestamp, // optional, next billing date
  updatedAt:               Timestamp
}
```

---

## 6. API Endpoints

### POST `/api/generate`
**Auth:** Required (Firebase ID token in Authorization header)  
**Body:** `{ listingId: string }`  
**Logic:** Validates token → checks generation limit → calls Gemini → saves to Firestore → returns generated content  
**Response 200:** `{ success: true, contentId: string, content: {...} }`  
**Response 403:** `{ error: 'LIMIT_REACHED' }`  
**Response 500:** `{ error: 'GENERATION_FAILED' }`

### POST `/api/stripe/create-checkout`
**Auth:** Required  
**Body:** `{ plan: 'starter' | 'pro' }`  
**Logic:** Creates Stripe Checkout Session → returns session URL  
**Response 200:** `{ url: string }`

### POST `/api/stripe/webhook`
**Auth:** None (verified via Stripe signature)  
**Body:** Raw Stripe event  
**Logic:** Handles `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`, `customer.subscription.updated`  
**Response 200:** `{ received: true }`

### POST `/api/stripe/portal`
**Auth:** Required  
**Body:** None  
**Logic:** Creates Stripe Billing Portal Session → returns URL  
**Response 200:** `{ url: string }`

### POST `/api/upload`
**Auth:** Required  
**Body:** FormData with image files  
**Logic:** Validates file type/size → uploads to Firebase Storage → returns URLs  
**Response 200:** `{ urls: string[] }`

---

## 7. Firebase Security Rules

### Firestore Rules
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can only read/write their own profile
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    // Listings: authenticated users can create, only owner can read/update/delete
    match /listings/{listingId} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null
        && resource.data.userId == request.auth.uid;
    }

    // Generated content: owner read only; writes only from server (Admin SDK)
    match /generated_content/{contentId} {
      allow read: if request.auth != null
        && resource.data.userId == request.auth.uid;
      // Public mini-site reads: allow if reading by miniSiteSlug (no auth)
      allow read: if true;   // public mini-sites must be readable — restrict further post-MVP
      allow write: if false; // server-only writes via Admin SDK
    }

    // Subscriptions: owner read only; writes only from server
    match /subscriptions/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
      allow write: if false; // server-only
    }
  }
}
```

### Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Property photos: owner write, public read
    match /listings/{uid}/{listingId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.uid == uid
        && request.resource.size < 5 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }

    // Headshots: owner write, public read
    match /headshots/{uid}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == uid
        && request.resource.size < 2 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## 8. Environment Variables Required

All environment variables are stored in `.env.local` (never committed to git).

```
# Firebase Client SDK (public — safe to expose to browser)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin SDK (server-only — never expose to browser)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# Gemini API (server-only)
GEMINI_API_KEY=

# Stripe (server-only except publishable key)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_STARTER_PRICE_ID=
STRIPE_PRO_PRICE_ID=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 9. Pages & Routes Summary

| Route | Auth Required | Description |
|-------|--------------|-------------|
| `/` | No | Landing page |
| `/login` | No (redirect if authed) | Login form |
| `/signup` | No (redirect if authed) | Signup form |
| `/dashboard` | Yes | Listings grid + usage bar |
| `/dashboard/new` | Yes | New listing form |
| `/dashboard/listing/[id]` | Yes | Results — tabs for all generated content |
| `/dashboard/settings` | Yes | Profile + billing |
| `/p/[slug]` | No | Public mini-site for a property |
| `/upgrade` | Yes | Upgrade plan modal/page |
| `/api/generate` | Yes | Server: Gemini generation endpoint |
| `/api/stripe/create-checkout` | Yes | Server: Stripe checkout |
| `/api/stripe/webhook` | No (sig verified) | Server: Stripe events |
| `/api/stripe/portal` | Yes | Server: Stripe portal |

---

## 10. Out of Scope for MVP

The following are explicitly NOT in the MVP and will be considered for v2:

- Team / agency plans (multi-seat)
- Email integrations (Mailchimp, Klaviyo)
- MLS direct submission
- Bulk listing import
- Custom domain mini-sites
- Analytics per listing (views, clicks)
- A/B caption testing
- White-labelling
- Mobile app
- Social scheduling / direct posting to Instagram/Facebook
- Google OAuth login
- Two-factor authentication
- Zapier / API access for agents

---

*End of PRD v1.0*
