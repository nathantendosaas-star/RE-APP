export type Plan = 'free' | 'starter' | 'pro';

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  agencyName?: string;
  phone?: string;
  headshotUrl?: string;
  plan: Plan;
  stripeCustomerId?: string;
  createdAt?: string;
}

export interface Listing {
  id: string;
  userId: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  feature1: string;
  feature2: string;
  feature3: string;
  targetBuyer?: string;
  tone?: string;
  photoUrls: string[];
  createdAt?: string;
}

export interface GeneratedContent {
  id: string;
  listingId: string;
  userId: string;
  listingDescription: string;
  captions: {
    instagram1: string;
    instagram2: string;
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  email: {
    subject: string;
    body: string;
  };
  miniSiteSlug: string;
  createdAt?: string;
}

export interface Subscription {
  userId: string;
  plan: Plan;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  generationsUsed: number;
  generationsLimit: number;
  totalGenerationsUsed: number;
  periodEnd?: string;
  updatedAt?: string;
}

export interface ListingFormData {
  address: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  feature1: string;
  feature2: string;
  feature3: string;
  targetBuyer: string;
  tone: string;
  photos: File[];
}
