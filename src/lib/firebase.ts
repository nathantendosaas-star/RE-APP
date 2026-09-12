import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { Listing, GeneratedContent, UserProfile, Subscription } from '@/types';
import { generateSlug } from './utils';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo_key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo_app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo_app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo_app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const storage = getStorage(app);

// Local Storage Fallback Store Keys
const LS_USER_KEY = 're_marketing_user';
const LS_LISTINGS_KEY = 're_marketing_listings';
const LS_CONTENT_KEY = 're_marketing_content';
const LS_SUB_KEY = 're_marketing_subscription';

const DEFAULT_USER: UserProfile = {
  uid: 'demo-agent-123',
  email: 'agent@realtydemo.com',
  fullName: 'Sarah Jenkins',
  agencyName: 'Premier Realty Group',
  phone: '(555) 234-5678',
  headshotUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  plan: 'free',
  createdAt: new Date().toISOString(),
};

const DEFAULT_SUB: Subscription = {
  userId: 'demo-agent-123',
  plan: 'free',
  status: 'active',
  generationsUsed: 1,
  generationsLimit: 3,
  totalGenerationsUsed: 1,
  updatedAt: new Date().toISOString(),
};

const INITIAL_SAMPLE_LISTINGS: Listing[] = [
  {
    id: 'listing-demo-1',
    userId: 'demo-agent-123',
    address: '742 Evergreen Terrace, Austin, TX 78704',
    price: 649000,
    bedrooms: 4,
    bathrooms: 3,
    propertyType: 'House',
    feature1: 'Gourmet kitchen with quartz countertops and oversized island',
    feature2: 'Resort-style backyard with heated swimming pool and patio',
    feature3: 'Minutes to downtown Austin and top-rated school district',
    targetBuyer: 'Families looking for luxury upgrade',
    tone: 'Warm & Inviting',
    photoUrls: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

const INITIAL_SAMPLE_CONTENT: GeneratedContent[] = [
  {
    id: 'content-demo-1',
    listingId: 'listing-demo-1',
    userId: 'demo-agent-123',
    listingDescription: 'Welcome to luxury living in the heart of Austin! This magnificent 4-bedroom, 3-bathroom residence at 742 Evergreen Terrace offers the perfect blend of elegance and modern convenience. Step inside to discover a light-filled open layout anchored by a state-of-the-art gourmet kitchen featuring premium quartz countertops and a massive central island—ideal for entertaining.\n\nThe main living space flows effortlessly to your private outdoor sanctuary, complete with a heated resort-style swimming pool, lush landscaping, and a spacious covered patio. Situated in one of Austin\'s most desirable school districts and just minutes from downtown dining and culture. Schedule your private tour today!',
    captions: {
      instagram1: '✨ JUST LISTED! Step into luxury at 742 Evergreen Terrace in Austin, TX 📍\n\nThis stunning 4 bed / 3 bath home features:\n🔥 Gourmet chef\'s kitchen with quartz island\n🏊‍♂️ Resort-style heated pool & outdoor lounge\n🎓 Top-rated school district location\n\nOffered at $649,000. Tap the link in bio for the full mini-site & tour! 📲\n\n#AustinRealEstate #AustinHomes #LuxuryListing #JustListed #TexasRealty #DreamHome #PoolHouse',
      instagram2: 'Pool weather is everyday when you live here ☀️🏊‍♂️ 742 Evergreen Terrace boasts the ultimate backyard retreat right in Austin! Who would you invite over for a weekend BBQ?\n\nDM for private showings before it\'s gone! 🔑\n\n#AustinLiving #BackyardGoals #RealEstateAgent #HouseHunting #AustinTX',
      facebook: '🏡 NEW LISTING IN AUSTIN, TX!\n742 Evergreen Terrace | Offered at $649,000\n\nLooking for the perfect family home with resort vibes? This 4-bed, 3-bath gem features a dream kitchen with quartz countertops and a sparkling heated backyard pool!\n\nCheck out the full listing & virtual flyer here: [MINI_SITE_URL]\nCall Sarah Jenkins at (555) 234-5678 for details.',
      linkedin: 'Excited to bring this exceptional residential listing to market in Austin, TX. 742 Evergreen Terrace offers strong long-term value in a high-demand school district. Featuring modern luxury finishes, a chef\'s kitchen, and a private pool area. Ideal for executive families or relocating professionals. Connect with me for full prospectus.',
      twitter: '🚨 JUST LISTED in Austin, TX! 4 Bed / 3 Bath house with chef\'s kitchen & resort pool! Offered at $649,000. 📲 Tour the mini-site now: [MINI_SITE_URL] #AustinRE'
    },
    email: {
      subject: ' Exclusive Preview: Stunning 4-Bed Austin Home with Pool!',
      body: 'Hi [Client Name],\n\nI wanted to share an exclusive new listing with you before it hits the open market!\n\n742 Evergreen Terrace is a breathtaking 4-bedroom, 3-bathroom house in Austin, TX, priced at $649,000. It features a fully updated gourmet kitchen with quartz countertops and an unbelievable backyard pool made for summer relaxation.\n\nYou can view photos and complete property specs here:\n[MINI_SITE_URL]\n\nReply to this email or call me directly at (555) 234-5678 if you\'d like to schedule a walk-through this week!\n\nBest regards,\nSarah Jenkins\nPremier Realty Group'
    },
    miniSiteSlug: 'demo742e',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

// LocalStorage Helpers
export function getLocalUser(): UserProfile {
  const data = localStorage.getItem(LS_USER_KEY);
  if (!data) {
    localStorage.setItem(LS_USER_KEY, JSON.stringify(DEFAULT_USER));
    return DEFAULT_USER;
  }
  return JSON.parse(data);
}

export function saveLocalUser(user: UserProfile): void {
  localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
}

export function getLocalSubscription(): Subscription {
  const data = localStorage.getItem(LS_SUB_KEY);
  if (!data) {
    localStorage.setItem(LS_SUB_KEY, JSON.stringify(DEFAULT_SUB));
    return DEFAULT_SUB;
  }
  return JSON.parse(data);
}

export function saveLocalSubscription(sub: Subscription): void {
  localStorage.setItem(LS_SUB_KEY, JSON.stringify(sub));
}

export function getLocalListings(): Listing[] {
  const data = localStorage.getItem(LS_LISTINGS_KEY);
  if (!data) {
    localStorage.setItem(LS_LISTINGS_KEY, JSON.stringify(INITIAL_SAMPLE_LISTINGS));
    return INITIAL_SAMPLE_LISTINGS;
  }
  return JSON.parse(data);
}

export function saveLocalListing(listing: Listing): void {
  const listings = getLocalListings();
  listings.unshift(listing);
  localStorage.setItem(LS_LISTINGS_KEY, JSON.stringify(listings));
}

export function deleteLocalListing(id: string): void {
  const listings = getLocalListings().filter(l => l.id !== id);
  localStorage.setItem(LS_LISTINGS_KEY, JSON.stringify(listings));
  const content = getLocalContent().filter(c => c.listingId !== id);
  localStorage.setItem(LS_CONTENT_KEY, JSON.stringify(content));
}

export function getLocalContent(): GeneratedContent[] {
  const data = localStorage.getItem(LS_CONTENT_KEY);
  if (!data) {
    localStorage.setItem(LS_CONTENT_KEY, JSON.stringify(INITIAL_SAMPLE_CONTENT));
    return INITIAL_SAMPLE_CONTENT;
  }
  return JSON.parse(data);
}

export function saveLocalContent(content: GeneratedContent): void {
  const allContent = getLocalContent();
  const existingIndex = allContent.findIndex(c => c.listingId === content.listingId);
  if (existingIndex >= 0) {
    allContent[existingIndex] = content;
  } else {
    allContent.unshift(content);
  }
  localStorage.setItem(LS_CONTENT_KEY, JSON.stringify(allContent));
}

export function getContentBySlugLocal(slug: string): GeneratedContent | null {
  const allContent = getLocalContent();
  return allContent.find(c => c.miniSiteSlug === slug) || null;
}

export function getListingByIdLocal(id: string): Listing | null {
  const listings = getLocalListings();
  return listings.find(l => l.id === id) || null;
}
