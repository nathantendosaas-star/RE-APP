# MVP Specification
# AI Listing Marketing Kit
**Version:** 1.0  
**Stack:** Next.js 14 · Firebase · Gemini 2.5 Flash Lite · Stripe · Vercel

---

## 1. Tech Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | Next.js 14 (App Router) | Full-stack — frontend + API routes |
| Auth | Firebase Auth | Email/password |
| Database | Cloud Firestore | NoSQL document database |
| File Storage | Firebase Storage | Property photos + headshots |
| AI | Google Gemini 2.5 Flash Lite | Via `@google/generative-ai` SDK |
| Payments | Stripe | Subscriptions + billing portal |
| Hosting | Vercel | Auto-deploy from GitHub |
| Styling | Tailwind CSS | Utility-first CSS |
| Components | shadcn/ui | Pre-built accessible components |
| Slug Gen | nanoid | Unique mini-site slugs |
| QR Code | qrcode.react | Client-side QR generation |

---

## 2. Project Setup

### 2.1 Create the Project
```bash
npx create-next-app@latest listing-kit --typescript --tailwind --app --src-dir
cd listing-kit
```

### 2.2 Install All Dependencies
```bash
# Firebase
npm install firebase firebase-admin

# Gemini AI
npm install @google/generative-ai

# Stripe
npm install stripe @stripe/stripe-js

# UI Components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input label select tabs card badge toast dialog

# Utilities
npm install nanoid qrcode.react clsx lucide-react
```

### 2.3 Environment Variables
Create `.env.local` in the project root. Fill in values from your Firebase project settings, Google AI Studio, and Stripe dashboard. See the PRD Section 8 for the full list of required variables. Do NOT commit this file — it's already in `.gitignore` by default with Next.js.

---

## 3. Full File & Folder Structure

```
listing-kit/
├── src/
│   ├── app/
│   │   ├── layout.tsx                        # Root layout — fonts, providers
│   │   ├── page.tsx                          # Landing page (/)
│   │   ├── login/
│   │   │   └── page.tsx                      # Login page
│   │   ├── signup/
│   │   │   └── page.tsx                      # Signup page
│   │   ├── dashboard/
│   │   │   ├── layout.tsx                    # Dashboard layout — sidebar, auth guard
│   │   │   ├── page.tsx                      # Dashboard home — listings grid
│   │   │   ├── new/
│   │   │   │   └── page.tsx                  # New listing form
│   │   │   ├── listing/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx              # Results page — all generated content
│   │   │   └── settings/
│   │   │       └── page.tsx                  # Profile + billing settings
│   │   ├── p/
│   │   │   └── [slug]/
│   │   │       └── page.tsx                  # Public mini-site (no auth)
│   │   └── api/
│   │       ├── generate/
│   │       │   └── route.ts                  # POST — Gemini generation endpoint
│   │       └── stripe/
│   │           ├── create-checkout/
│   │           │   └── route.ts              # POST — create Stripe checkout session
│   │           ├── webhook/
│   │           │   └── route.ts              # POST — Stripe webhook handler
│   │           └── portal/
│   │               └── route.ts              # POST — create Stripe billing portal
│   ├── components/
│   │   ├── auth/
│   │   │   └── AuthGuard.tsx                 # Wraps protected pages, redirects if no session
│   │   ├── dashboard/
│   │   │   ├── ListingCard.tsx               # Card shown in dashboard grid
│   │   │   ├── UsageBar.tsx                  # Generations used / limit progress bar
│   │   │   └── Sidebar.tsx                   # Dashboard navigation sidebar
│   │   ├── listing/
│   │   │   ├── ListingForm.tsx               # Full new listing form with validation
│   │   │   ├── PhotoUpload.tsx               # Drag-and-drop photo upload component
│   │   │   └── GenerateButton.tsx            # Submit button with loading state
│   │   ├── results/
│   │   │   ├── ContentTabs.tsx               # Tab switcher for results sections
│   │   │   ├── CopyButton.tsx                # Copy-to-clipboard button with feedback
│   │   │   ├── DescriptionCard.tsx           # Listing description display
│   │   │   ├── CaptionsGrid.tsx              # 5 social caption cards
│   │   │   ├── EmailCard.tsx                 # Email subject + body display
│   │   │   └── MiniSiteCard.tsx              # Shareable link + QR code
│   │   ├── minisite/
│   │   │   ├── PhotoCarousel.tsx             # Property photo gallery
│   │   │   └── AgentContact.tsx              # Agent info + email/WhatsApp buttons
│   │   └── ui/                               # shadcn/ui generated components (auto)
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── client.ts                     # Firebase client SDK init (browser)
│   │   │   ├── admin.ts                      # Firebase Admin SDK init (server only)
│   │   │   ├── auth.ts                       # Auth helper functions
│   │   │   └── firestore.ts                  # Firestore helper functions
│   │   ├── gemini.ts                         # Gemini API call + prompt builder
│   │   ├── stripe.ts                         # Stripe server-side client init
│   │   └── utils.ts                          # Shared utilities (cn, formatPrice, etc.)
│   ├── hooks/
│   │   ├── useAuth.ts                        # Auth state hook
│   │   ├── useListings.ts                    # Fetch user's listings
│   │   └── useSubscription.ts                # Fetch user's subscription/plan
│   └── types/
│       └── index.ts                          # All TypeScript type definitions
├── public/
│   └── og-image.png                          # Open Graph image for landing page
├── .env.local                                # Environment variables (never commit)
├── .gitignore
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 4. TypeScript Types (`src/types/index.ts`)

```typescript
export type Plan = 'free' | 'starter' | 'pro'

export interface UserProfile {
  uid: string
  email: string
  fullName: string
  agencyName?: string
  phone?: string
  headshotUrl?: string
  plan: Plan
  stripeCustomerId?: string
  createdAt: Date
}

export interface Listing {
  id: string
  userId: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  propertyType: string
  feature1: string
  feature2: string
  feature3: string
  targetBuyer?: string
  tone?: string
  photoUrls: string[]
  createdAt: Date
}

export interface GeneratedContent {
  id: string
  listingId: string
  userId: string
  listingDescription: string
  captions: {
    instagram1: string
    instagram2: string
    facebook: string
    linkedin: string
    twitter: string
  }
  email: {
    subject: string
    body: string
  }
  miniSiteSlug: string
  createdAt: Date
}

export interface Subscription {
  userId: string
  plan: Plan
  stripeSubscriptionId?: string
  stripeCustomerId?: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  generationsUsed: number
  generationsLimit: number
  totalGenerationsUsed: number
  periodEnd?: Date
  updatedAt: Date
}

export interface ListingFormData {
  address: string
  price: string
  bedrooms: string
  bathrooms: string
  propertyType: string
  feature1: string
  feature2: string
  feature3: string
  targetBuyer: string
  tone: string
  photos: File[]
}
```

---

## 5. Firebase Setup (`src/lib/firebase/`)

### `client.ts` — Browser SDK
```typescript
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth    = getAuth(app)
export const db      = getFirestore(app)
export const storage = getStorage(app)
```

### `admin.ts` — Server Admin SDK
```typescript
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId:   process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // Replace escaped newlines — common issue with Vercel env vars
      privateKey:  process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
}

export const adminDb      = getFirestore()
export const adminStorage = getStorage()
```

### `auth.ts` — Auth Helpers
```typescript
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { auth, db } from './client'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export async function signUp(email: string, password: string): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  // Create the user profile document
  await setDoc(doc(db, 'users', cred.user.uid), {
    uid:       cred.user.uid,
    email:     cred.user.email,
    fullName:  '',
    plan:      'free',
    createdAt: serverTimestamp(),
  })
  // Create the subscription document with free defaults
  await setDoc(doc(db, 'subscriptions', cred.user.uid), {
    userId:                cred.user.uid,
    plan:                  'free',
    status:                'active',
    generationsUsed:       0,
    generationsLimit:      3,
    totalGenerationsUsed:  0,
    updatedAt:             serverTimestamp(),
  })
  return cred.user
}

export async function logIn(email: string, password: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function logOut(): Promise<void> {
  await signOut(auth)
}

export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email)
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
```

### `firestore.ts` — Firestore Helpers
```typescript
import {
  doc, collection, addDoc, getDoc, getDocs,
  updateDoc, deleteDoc, query, where, orderBy,
  serverTimestamp, Timestamp
} from 'firebase/firestore'
import { db } from './client'
import { Listing, GeneratedContent, UserProfile, Subscription } from '@/types'

// ─── User Profile ──────────────────────────────────────────
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return null
  return snap.data() as UserProfile
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  await updateDoc(doc(db, 'users', uid), data)
}

// ─── Listings ──────────────────────────────────────────────
export async function createListing(data: Omit<Listing, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'listings'), {
    ...data,
    createdAt: serverTimestamp(),
  })
  await updateDoc(ref, { id: ref.id })
  return ref.id
}

export async function getUserListings(userId: string): Promise<Listing[]> {
  const q = query(
    collection(db, 'listings'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ ...d.data(), id: d.id } as Listing))
}

export async function getListing(listingId: string): Promise<Listing | null> {
  const snap = await getDoc(doc(db, 'listings', listingId))
  if (!snap.exists()) return null
  return { ...snap.data(), id: snap.id } as Listing
}

export async function deleteListing(listingId: string): Promise<void> {
  await deleteDoc(doc(db, 'listings', listingId))
}

// ─── Generated Content ─────────────────────────────────────
export async function getGeneratedContent(listingId: string): Promise<GeneratedContent | null> {
  const q = query(
    collection(db, 'generated_content'),
    where('listingId', '==', listingId)
  )
  const snap = await getDocs(q)
  if (snap.empty) return null
  return { ...snap.docs[0].data(), id: snap.docs[0].id } as GeneratedContent
}

export async function getContentBySlug(slug: string): Promise<GeneratedContent | null> {
  const q = query(
    collection(db, 'generated_content'),
    where('miniSiteSlug', '==', slug)
  )
  const snap = await getDocs(q)
  if (snap.empty) return null
  return { ...snap.docs[0].data(), id: snap.docs[0].id } as GeneratedContent
}

// ─── Subscriptions ─────────────────────────────────────────
export async function getSubscription(uid: string): Promise<Subscription | null> {
  const snap = await getDoc(doc(db, 'subscriptions', uid))
  if (!snap.exists()) return null
  return snap.data() as Subscription
}
```

---

## 6. Gemini Integration (`src/lib/gemini.ts`)

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Listing } from '@/types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-lite',
  generationConfig: {
    responseMimeType: 'application/json',
    temperature: 0.8,        // some creativity without going off the rails
    maxOutputTokens: 2000,
  },
})

function buildPrompt(listing: Listing): string {
  return `
You are a world-class real estate copywriter with 15 years of experience writing for top agencies.

PROPERTY DETAILS:
- Address: ${listing.address}
- List Price: $${listing.price.toLocaleString()}
- Bedrooms: ${listing.bedrooms}
- Bathrooms: ${listing.bathrooms}
- Property Type: ${listing.propertyType}
- Key Features: ${listing.feature1}, ${listing.feature2}, ${listing.feature3}
- Target Buyer: ${listing.targetBuyer || 'General buyers'}
- Writing Tone: ${listing.tone || 'Professional'}

Generate complete real estate marketing content and return ONLY a valid JSON object with this exact structure:
{
  "listingDescription": "A compelling 150-250 word MLS listing description. Specific, evocative, no clichés like 'nestled' or 'boasting'. Lead with the strongest selling point. End with a call to action.",
  "captions": {
    "instagram1": "Instagram caption focusing on lifestyle and emotion. Include 5-8 relevant hashtags at the end. Max 300 words.",
    "instagram2": "Second Instagram caption from a completely different angle — highlight a different feature or benefit. Include different hashtags.",
    "facebook": "Facebook post. Conversational, slightly longer, great for sharing in community groups. No hashtags. Include price and key details.",
    "linkedin": "Professional LinkedIn post targeting investors or professionals relocating to the area. Mention ROI potential or lifestyle upgrade. No hashtags.",
    "twitter": "Punchy Twitter/X post. MUST be under 270 characters including spaces. No hashtags needed."
  },
  "email": {
    "subject": "Email subject line. Under 55 characters. Create urgency or curiosity.",
    "body": "Full email body for the agent to send to their buyers list. 150-200 words. Professional but warm. Open with the hook, describe the property briefly, include price, end with clear CTA and agent contact placeholder [AGENT_PHONE]."
  }
}

STRICT RULES:
- Return ONLY the JSON object. No markdown. No code blocks. No explanation text.
- Every field must be filled. No empty strings.
- Twitter post MUST be under 270 characters.
- Do not mention the agent's name — use [AGENT_NAME] as placeholder if needed.
`
}

export async function generateListingContent(listing: Listing) {
  const prompt = buildPrompt(listing)

  let attempt = 0
  const maxAttempts = 2

  while (attempt < maxAttempts) {
    try {
      const result = await model.generateContent(prompt)
      const text = result.response.text()

      // Clean the response — remove any accidental markdown fences
      const cleaned = text
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim()

      const parsed = JSON.parse(cleaned)

      // Validate the structure
      if (
        !parsed.listingDescription ||
        !parsed.captions?.instagram1 ||
        !parsed.email?.subject
      ) {
        throw new Error('Invalid response structure from Gemini')
      }

      return parsed
    } catch (err) {
      attempt++
      if (attempt >= maxAttempts) {
        throw new Error(`Gemini generation failed after ${maxAttempts} attempts: ${err}`)
      }
      // Wait 1 second before retry
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}
```

---

## 7. API Routes

### `/api/generate/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth'
import { adminDb } from '@/lib/firebase/admin'
import { generateListingContent } from '@/lib/gemini'
import { nanoid } from 'nanoid'
import { FieldValue } from 'firebase-admin/firestore'

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Firebase ID token
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const idToken = authHeader.split('Bearer ')[1]
    const decoded = await getAuth().verifyIdToken(idToken)
    const uid = decoded.uid

    // 2. Get the listing ID from request body
    const { listingId } = await req.json()
    if (!listingId) {
      return NextResponse.json({ error: 'listingId required' }, { status: 400 })
    }

    // 3. Verify the listing belongs to this user
    const listingSnap = await adminDb.collection('listings').doc(listingId).get()
    if (!listingSnap.exists || listingSnap.data()?.userId !== uid) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    // 4. Check generation limit
    const subSnap = await adminDb.collection('subscriptions').doc(uid).get()
    const sub = subSnap.data()

    if (!sub) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    const isPro = sub.plan === 'pro'
    const isStarter = sub.plan === 'starter'
    const isFree = sub.plan === 'free'

    if (isFree && sub.totalGenerationsUsed >= 3) {
      return NextResponse.json({ error: 'LIMIT_REACHED' }, { status: 403 })
    }
    if (isStarter && sub.generationsUsed >= 20) {
      return NextResponse.json({ error: 'LIMIT_REACHED' }, { status: 403 })
    }

    // 5. Generate content with Gemini
    const listing = listingSnap.data() as any
    const generated = await generateListingContent(listing)

    // 6. Save generated content to Firestore
    const slug = nanoid(8)
    const contentRef = adminDb.collection('generated_content').doc()

    await contentRef.set({
      id:                  contentRef.id,
      listingId,
      userId:              uid,
      listingDescription:  generated.listingDescription,
      captions:            generated.captions,
      email:               generated.email,
      miniSiteSlug:        slug,
      createdAt:           FieldValue.serverTimestamp(),
    })

    // 7. Increment generation counters
    await adminDb.collection('subscriptions').doc(uid).update({
      generationsUsed:      FieldValue.increment(1),
      totalGenerationsUsed: FieldValue.increment(1),
      updatedAt:            FieldValue.serverTimestamp(),
    })

    // 8. Return the content + content ID
    return NextResponse.json({
      success:   true,
      contentId: contentRef.id,
      slug,
      content:   generated,
    })

  } catch (err: any) {
    console.error('Generation error:', err)
    return NextResponse.json({ error: 'GENERATION_FAILED' }, { status: 500 })
  }
}
```

### `/api/stripe/create-checkout/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth'
import Stripe from 'stripe'
import { adminDb } from '@/lib/firebase/admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const PRICE_IDS: Record<string, string> = {
  starter: process.env.STRIPE_STARTER_PRICE_ID!,
  pro:     process.env.STRIPE_PRO_PRICE_ID!,
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const idToken = authHeader.split('Bearer ')[1]
  const decoded = await getAuth().verifyIdToken(idToken)
  const uid = decoded.uid

  const { plan } = await req.json()
  const priceId = PRICE_IDS[plan]

  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  // Check if user already has a Stripe customer ID
  const userSnap = await adminDb.collection('users').doc(uid).get()
  const userData = userSnap.data()
  let customerId = userData?.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email:    decoded.email!,
      metadata: { firebaseUid: uid },
    })
    customerId = customer.id
    await adminDb.collection('users').doc(uid).update({ stripeCustomerId: customerId })
  }

  const session = await stripe.checkout.sessions.create({
    customer:            customerId,
    mode:                'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
    cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
    metadata:    { firebaseUid: uid, plan },
  })

  return NextResponse.json({ url: session.url })
}
```

### `/api/stripe/webhook/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { adminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const PLAN_LIMITS: Record<string, number> = {
  starter: 20,
  pro:     999999,
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session  = event.data.object as Stripe.Checkout.Session
        const uid      = session.metadata?.firebaseUid
        const plan     = session.metadata?.plan
        if (!uid || !plan) break

        await adminDb.collection('subscriptions').doc(uid).set({
          userId:                uid,
          plan,
          stripeSubscriptionId:  session.subscription as string,
          stripeCustomerId:      session.customer as string,
          status:                'active',
          generationsUsed:       0,
          generationsLimit:      PLAN_LIMITS[plan] ?? 20,
          updatedAt:             FieldValue.serverTimestamp(),
        }, { merge: true })

        await adminDb.collection('users').doc(uid).update({
          plan,
          stripeCustomerId: session.customer as string,
        })
        break
      }

      case 'invoice.paid': {
        // Reset monthly generations on each new billing period
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        const usersSnap = await adminDb
          .collection('users')
          .where('stripeCustomerId', '==', customerId)
          .get()

        if (!usersSnap.empty) {
          const uid = usersSnap.docs[0].id
          await adminDb.collection('subscriptions').doc(uid).update({
            generationsUsed: 0,
            updatedAt:       FieldValue.serverTimestamp(),
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const sub        = event.data.object as Stripe.Subscription
        const customerId = sub.customer as string

        const usersSnap = await adminDb
          .collection('users')
          .where('stripeCustomerId', '==', customerId)
          .get()

        if (!usersSnap.empty) {
          const uid = usersSnap.docs[0].id
          await adminDb.collection('subscriptions').doc(uid).update({
            plan:             'free',
            status:           'canceled',
            generationsLimit: 3,
            updatedAt:        FieldValue.serverTimestamp(),
          })
          await adminDb.collection('users').doc(uid).update({ plan: 'free' })
        }
        break
      }

      case 'customer.subscription.updated': {
        const sub        = event.data.object as Stripe.Subscription
        const customerId = sub.customer as string
        const status     = sub.status

        const usersSnap = await adminDb
          .collection('users')
          .where('stripeCustomerId', '==', customerId)
          .get()

        if (!usersSnap.empty) {
          const uid = usersSnap.docs[0].id
          await adminDb.collection('subscriptions').doc(uid).update({
            status,
            updatedAt: FieldValue.serverTimestamp(),
          })
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook processing error:', err)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

// Required: disable body parsing so we get the raw body for Stripe signature verification
export const config = { api: { bodyParser: false } }
```

### `/api/stripe/portal/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth'
import Stripe from 'stripe'
import { adminDb } from '@/lib/firebase/admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const idToken = authHeader.split('Bearer ')[1]
  const decoded = await getAuth().verifyIdToken(idToken)
  const uid     = decoded.uid

  const userSnap = await adminDb.collection('users').doc(uid).get()
  const customerId = userSnap.data()?.stripeCustomerId

  if (!customerId) {
    return NextResponse.json({ error: 'No billing account found' }, { status: 404 })
  }

  const session = await stripe.billingPortal.sessions.create({
    customer:   customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
  })

  return NextResponse.json({ url: session.url })
}
```

---

## 8. Auth Hook (`src/hooks/useAuth.ts`)

```typescript
'use client'
import { useState, useEffect } from 'react'
import { User } from 'firebase/auth'
import { onAuthChange } from '@/lib/firebase/auth'

export function useAuth() {
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return { user, loading }
}
```

---

## 9. Auth Guard Component (`src/components/auth/AuthGuard.tsx`)

```typescript
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  if (!user)   return null

  return <>{children}</>
}
```

---

## 10. Page-by-Page Functionality

---

### Page 1: Landing Page (`/`)
**File:** `src/app/page.tsx`

**Functionality:**
- Server component — no auth required
- If user is already logged in, show a "Go to Dashboard" button prominently
- Contains a sign-up CTA button that links to `/signup`
- Contains a login link that links to `/login`
- No API calls — static content only

---

### Page 2: Signup Page (`/signup`)
**File:** `src/app/signup/page.tsx`

**Functionality:**
- Client component
- If user is already authenticated → redirect to `/dashboard`
- Form fields: Full Name, Email, Password, Confirm Password
- Validation:
  - All fields required
  - Email must be valid format
  - Password minimum 8 characters
  - Confirm Password must match Password
- On submit:
  1. Call `signUp(email, password)` from `src/lib/firebase/auth.ts`
  2. After user is created, call `updateUserProfile(uid, { fullName })` to save name
  3. On success → redirect to `/dashboard`
  4. On error → show error message inline (e.g. "Email already in use")
- Loading state on submit button while request is in flight
- Link to `/login` for existing users

---

### Page 3: Login Page (`/login`)
**File:** `src/app/login/page.tsx`

**Functionality:**
- Client component
- If user is already authenticated → redirect to `/dashboard`
- Form fields: Email, Password
- Validation: both fields required, email format valid
- On submit:
  1. Call `logIn(email, password)`
  2. On success → redirect to `/dashboard`
  3. On error → show error message (e.g. "Incorrect email or password")
- "Forgot your password?" link:
  - Opens a small modal or inline section with an email input
  - Calls `resetPassword(email)`
  - Shows confirmation: "Check your inbox for a reset link"
- Link to `/signup` for new users
- Loading state on submit button

---

### Page 4: Dashboard (`/dashboard`)
**File:** `src/app/dashboard/page.tsx`
**Layout:** `src/app/dashboard/layout.tsx`

**Layout functionality:**
- Wraps all `/dashboard/*` pages
- Renders the `<AuthGuard>` component — if not logged in, redirects to `/login`
- Renders the `<Sidebar>` with nav links: Dashboard, New Listing, Settings, Logout

**Dashboard page functionality:**
- Client component
- On mount: fetch user's listings with `getUserListings(uid)` from Firestore
- On mount: fetch subscription with `getSubscription(uid)`
- Renders `<UsageBar>` showing `generationsUsed` / `generationsLimit`
- If `upgraded=true` in the URL query params → show a success toast "Plan upgraded successfully!"
- If user has no listings → show empty state: "No listings yet. Create your first one."
- If user has listings → render a grid of `<ListingCard>` components
- Each `<ListingCard>` shows: address, price, date created, photo thumbnail (if any)
- Each card links to `/dashboard/listing/[id]`
- Each card has a delete button (with confirmation dialog) — calls `deleteListing(id)`
- "New Listing" button in the top right → links to `/dashboard/new`

---

### Page 5: New Listing Form (`/dashboard/new`)
**File:** `src/app/dashboard/new/page.tsx`

**Functionality:**
- Client component
- On mount: fetch subscription — if limit reached, redirect to `/upgrade` or show upgrade modal immediately
- Renders the full `<ListingForm>` component
- Form has two sections: Property Details and Marketing Preferences
- Photo upload via `<PhotoUpload>` component:
  - Accepts JPG, PNG, WEBP
  - Max 3 files, max 5MB each
  - Shows preview thumbnails after selection
  - Validates file type and size client-side with inline errors
- On form submit:
  1. Validate all required fields — show inline errors if missing
  2. Upload photos to Firebase Storage at `listings/{uid}/{timestamp}/{filename}` — show upload progress
  3. Create a `listings` document in Firestore with all form data + photo URLs
  4. Get the user's Firebase ID token: `await auth.currentUser.getIdToken()`
  5. POST to `/api/generate` with `{ listingId }` and the ID token in the Authorization header
  6. Show a loading screen: "Generating your marketing kit... (this takes about 10 seconds)"
  7. On success → navigate to `/dashboard/listing/[listingId]`
  8. On `LIMIT_REACHED` error → show upgrade modal
  9. On `GENERATION_FAILED` error → show error toast with "Try again" button

---

### Page 6: Results Page (`/dashboard/listing/[id]`)
**File:** `src/app/dashboard/listing/[id]/page.tsx`

**Functionality:**
- Client component
- On mount: fetch the `listings` document for this ID
- On mount: fetch the `generated_content` document for this listing ID
- If content is not yet available (race condition) → show loading spinner, poll every 2 seconds up to 30 seconds
- Renders `<ContentTabs>` with 4 tabs:

**Tab 1 — Listing Description**
- Displays the `listingDescription` in a readable card
- Character count shown (for MLS limits)
- `<CopyButton>` that copies the description text
- "Regenerate Description" button — calls `/api/generate` again (uses another credit)

**Tab 2 — Social Captions**
- 5 cards, one per platform: Instagram 1, Instagram 2, Facebook, LinkedIn, Twitter/X
- Each card shows the platform name/icon + the caption text
- Each card has its own `<CopyButton>`
- Twitter card shows a character counter — warns if over 280 chars

**Tab 3 — Buyer Email**
- Two sections: Subject Line and Email Body
- Each section has its own `<CopyButton>`
- Email body is rendered in a monospace-friendly format

**Tab 4 — Mini-Site**
- Shows the full shareable URL: `[APP_URL]/p/[slug]`
- Large "Copy Link" button
- "Open Mini-Site" button that opens the URL in a new tab
- `<QRCode>` component rendering the QR code (from `qrcode.react`)
- "Download QR Code" button — triggers canvas-to-PNG download

---

### Page 7: Settings (`/dashboard/settings`)
**File:** `src/app/dashboard/settings/page.tsx`

**Functionality:**
- Client component
- On mount: fetch user profile and subscription from Firestore
- Renders two sections: Profile and Billing

**Profile section:**
- Editable fields: Full Name, Agency Name, Phone Number
- Headshot upload: click to upload or drag and drop
  - Uploads to `headshots/{uid}/photo` in Firebase Storage
  - Updates `headshotUrl` in the user's Firestore profile
- Save button: calls `updateUserProfile(uid, data)` on Firestore
- Shows success/error toast after save

**Billing section:**
- Shows current plan as a badge (Free / Starter / Pro)
- Shows `generationsUsed` / `generationsLimit` for the current month
- If on free plan: shows upgrade buttons for Starter ($29/mo) and Pro ($59/mo)
  - On click: gets ID token → calls `/api/stripe/create-checkout` → redirects to Stripe checkout
- If on paid plan: shows "Manage Billing" button
  - On click: gets ID token → calls `/api/stripe/portal` → redirects to Stripe portal
- Shows next billing date if available (`subscription.periodEnd`)

---

### Page 8: Public Mini-Site (`/p/[slug]`)
**File:** `src/app/p/[slug]/page.tsx`

**Functionality:**
- This page is publicly accessible — no authentication
- Server component (for SEO and fast load)
- On render: query Firestore for `generated_content` where `miniSiteSlug == slug`
- If not found → render a 404 page: "This listing page doesn't exist or has been removed."
- If found: fetch the associated `listings` document and the agent's `users` profile document
- Renders:
  1. Property photo carousel (if photos exist) or a placeholder
  2. Property details header: price, address, beds/baths, property type
  3. Full listing description
  4. Agent info card: headshot, name, agency, phone
  5. Contact buttons:
     - "Email Agent" → `mailto:agent@email.com?subject=Inquiry about [address]`
     - "WhatsApp" → `https://wa.me/[phone]?text=Hi, I'm interested in [address]`
  6. Footer: "Powered by [AppName]" linking back to the landing page
- Page has proper `<title>` and `<meta>` tags for social sharing:
  - Title: `[address] — Listed at $[price]`
  - Description: First 160 chars of the listing description
  - OG image: first property photo URL

---

### Page 9: Upgrade Page (Modal or `/upgrade`)
**Functionality:**
- Can be implemented as a full-page route or a modal overlay
- Triggered when: user hits generation limit and tries to generate
- Shows both plans side by side with features
- "Upgrade to Starter" → hits `/api/stripe/create-checkout` with `plan: 'starter'`
- "Upgrade to Pro" → hits `/api/stripe/create-checkout` with `plan: 'pro'`
- Both buttons show loading state while creating the Stripe session

---

## 11. Key Helper: Making Authenticated API Calls

Anytime you call `/api/generate`, `/api/stripe/*`, etc. from the frontend, you need to include the Firebase ID token. Use this pattern:

```typescript
import { auth } from '@/lib/firebase/client'

async function callApi(endpoint: string, body: object) {
  const idToken = await auth.currentUser?.getIdToken()
  if (!idToken) throw new Error('Not authenticated')

  const res = await fetch(endpoint, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${idToken}`,
    },
    body: JSON.stringify(body),
  })

  return res.json()
}
```

---

## 12. Stripe Setup (One-Time in Stripe Dashboard)

1. Create two Products in Stripe Dashboard:
   - **AI Listing Kit — Starter**: $29/month recurring → copy the Price ID → set as `STRIPE_STARTER_PRICE_ID`
   - **AI Listing Kit — Pro**: $59/month recurring → copy the Price ID → set as `STRIPE_PRO_PRICE_ID`

2. Create a Webhook endpoint:
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events to listen for: `checkout.session.completed`, `invoice.paid`, `customer.subscription.deleted`, `customer.subscription.updated`
   - Copy the Webhook Signing Secret → set as `STRIPE_WEBHOOK_SECRET`

3. For local development, use the Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

---

## 13. Firebase Admin SDK Setup

1. In Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key" → download the JSON file
3. Copy `project_id`, `client_email`, and `private_key` from that file
4. Set them as environment variables (see PRD Section 8)
5. **Delete the downloaded JSON file** — never commit it to git

---

## 14. Vercel Deployment

1. Push code to GitHub
2. Import repo in Vercel
3. Add all environment variables from `.env.local` in Vercel project settings
4. Set `NEXT_PUBLIC_APP_URL` to your production domain (e.g. `https://yourapp.vercel.app`)
5. Vercel auto-deploys on every push to `main`

---

## 15. Build Order — 5 Weeks

### Week 1 — Foundation
- [ ] Next.js project setup + all packages installed
- [ ] Firebase project created, Auth enabled, Firestore + Storage rules set
- [ ] Firebase client + admin SDK initialized
- [ ] Auth hooks and AuthGuard component built
- [ ] Signup, Login, Logout working end-to-end
- [ ] Dashboard layout + sidebar built
- [ ] Firestore: user profile + subscription documents created on signup

### Week 2 — Core Feature
- [ ] New listing form built with all fields + validation
- [ ] Photo upload to Firebase Storage working
- [ ] Listing document created in Firestore on form submit
- [ ] Gemini integration built and tested in isolation
- [ ] `/api/generate` route complete — generation limit check + Gemini call + Firestore save
- [ ] Results page built — all 4 tabs rendering content
- [ ] Copy buttons working on all content sections

### Week 3 — Mini-Site + Polish
- [ ] Public mini-site page built (`/p/[slug]`)
- [ ] Photo carousel on mini-site
- [ ] Agent contact buttons (email + WhatsApp)
- [ ] QR code generation on results page
- [ ] QR code download working
- [ ] Dashboard listing grid + empty state
- [ ] Delete listing working

### Week 4 — Billing
- [ ] Stripe products + webhook created in Stripe Dashboard
- [ ] `/api/stripe/create-checkout` working
- [ ] `/api/stripe/webhook` handling all 4 events
- [ ] `/api/stripe/portal` working
- [ ] Upgrade modal shown when limit reached
- [ ] Settings page billing section complete
- [ ] Generation limits enforced server-side

### Week 5 — Launch Prep
- [ ] Settings profile editing + headshot upload working
- [ ] Landing page built
- [ ] All error states handled gracefully
- [ ] Test full flow end-to-end on staging
- [ ] Deploy to Vercel production
- [ ] Set up Stripe webhook pointing to production URL
- [ ] Onboard 5–10 beta testers for free

---

*End of MVP Specification v1.0*
