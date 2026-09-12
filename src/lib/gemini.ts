import { GoogleGenerativeAI } from '@google/generative-ai';
import { Listing, GeneratedContent } from '@/types';
import { generateSlug, formatPrice } from './utils';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '';

export async function generateContentForListing(listing: Listing): Promise<Omit<GeneratedContent, 'id' | 'createdAt'>> {
  const miniSiteSlug = generateSlug(8);

  if (apiKey && apiKey !== 'your_gemini_api_key' && apiKey.length > 10) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-lite',
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const prompt = `
You are an expert real estate copywriter with 15 years of experience.

PROPERTY DETAILS:
- Address: ${listing.address}
- Price: ${formatPrice(listing.price)}
- Bedrooms: ${listing.bedrooms} | Bathrooms: ${listing.bathrooms}
- Property Type: ${listing.propertyType}
- Key Feature 1: ${listing.feature1}
- Key Feature 2: ${listing.feature2}
- Key Feature 3: ${listing.feature3}
- Target Buyer: ${listing.targetBuyer || 'General Buyers'}
- Tone: ${listing.tone || 'Professional'}

Generate real estate marketing content and return ONLY a valid JSON object in this exact structure:
{
  "listingDescription": "150-250 word compelling MLS-ready listing description. Evocative and specific, leading with key selling points. End with call to action.",
  "captions": {
    "instagram1": "Instagram caption with emojis and 6-8 relevant hashtags. Focus on lifestyle.",
    "instagram2": "Second Instagram caption highlighting key feature angle with different emojis/hashtags.",
    "facebook": "Conversational Facebook post with price, location, features, and zero hashtags.",
    "linkedin": "Professional LinkedIn post targeted at investors or relocating buyers.",
    "twitter": "Punchy tweet under 260 characters total."
  },
  "email": {
    "subject": "Catchy email subject line under 55 characters",
    "body": "Full buyer prospect email body (150-200 words) with warm intro, key highlights, price, and clear next steps."
  }
}
`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const cleaned = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const data = JSON.parse(cleaned);

      return {
        listingId: listing.id,
        userId: listing.userId,
        listingDescription: data.listingDescription,
        captions: {
          instagram1: data.captions.instagram1,
          instagram2: data.captions.instagram2,
          facebook: data.captions.facebook,
          linkedin: data.captions.linkedin,
          twitter: data.captions.twitter,
        },
        email: {
          subject: data.email.subject,
          body: data.email.body,
        },
        miniSiteSlug,
      };
    } catch (err) {
      console.warn('Gemini API call failed, falling back to smart generation model:', err);
    }
  }

  // Smart Fallback Generation Model (For Demo & instant testing)
  const priceFormatted = formatPrice(listing.price);
  const toneWord = listing.tone || 'stunning';
  const buyerTarget = listing.targetBuyer || 'buyers searching for quality living';

  const desc = `Welcome to this ${toneWord.toLowerCase()} ${listing.propertyType.toLowerCase()} situated at ${listing.address}. Offering ${listing.bedrooms} spacious bedrooms and ${listing.bathrooms} bathrooms, this home has been thoughtfully designed for comfort and modern living.\n\nHighlights include ${listing.feature1.toLowerCase()}, along with ${listing.feature2.toLowerCase()}. You will also love ${listing.feature3.toLowerCase()}, making it ideal for ${buyerTarget.toLowerCase()}.\n\nOffered at ${priceFormatted}, this property is a rare find in today's market. Don't miss out on this extraordinary opportunity—contact us today for your private tour!`;

  const ig1 = `✨ JUST LISTED! Discover your new home at ${listing.address} 📍\n\n🏡 Specs: ${listing.bedrooms} Beds | ${listing.bathrooms} Baths | ${priceFormatted}\n\nKey Highlights:\n⭐ ${listing.feature1}\n⭐ ${listing.feature2}\n⭐ ${listing.feature3}\n\nPerfect for ${buyerTarget.toLowerCase()}! Tap link in bio for the full mini-site & video walkthrough 📲\n\n#JustListed #RealEstate #${listing.propertyType.replace(/\s+/g, '')} #HomeForSale #PropertyListing #HouseHunting #RealEstateAgent`;

  const ig2 = `Imagine waking up to ${listing.feature1.toLowerCase()} every single day 🌅\n\n📍 ${listing.address} is officially on the market for ${priceFormatted}.\n\nWith ${listing.bedrooms} bedrooms, ${listing.bathrooms} bathrooms, and ${listing.feature2.toLowerCase()}, this property won't last long!\n\nDM us directly for private walkthrough details 🔑\n\n#NewListing #RealEstateGoals #DreamHome #ListingAgent #PropertyInvestment`;

  const fb = `🏡 NEW LISTING ANNOUNCEMENT!\nLocation: ${listing.address}\nPrice: ${priceFormatted}\nDetails: ${listing.bedrooms} Bedrooms | ${listing.bathrooms} Bathrooms (${listing.propertyType})\n\nFeatures you'll fall in love with:\n- ${listing.feature1}\n- ${listing.feature2}\n- ${listing.feature3}\n\nIdeal for ${buyerTarget.toLowerCase()}.\n\nCheck out the full single-property website here: [MINI_SITE_URL]\nContact our team today to schedule your private tour!`;

  const li = `New Property Release | ${listing.address}\n\nWe are pleased to introduce this exceptional ${listing.propertyType.toLowerCase()} to the market. Offered at ${priceFormatted}, the property delivers an optimal balance of location, architectural appeal, and modern functionality.\n\nKey Attributes:\n• ${listing.bedrooms} Bedrooms / ${listing.bathrooms} Bathrooms\n• ${listing.feature1}\n• ${listing.feature2}\n• ${listing.feature3}\n\nSuitable for ${buyerTarget.toLowerCase()} or investors seeking strong long-term real estate equity. Inquiries and private showings available upon request.`;

  const tw = `🚨 JUST LISTED! ${listing.bedrooms} Bed / ${listing.bathrooms} Bath ${listing.propertyType} at ${listing.address}. Offered at ${priceFormatted}. Features ${listing.feature1}! 📲 View site: [MINI_SITE_URL] #RealEstate`;

  const emailSubject = ` Exclusive Preview: ${listing.address} (${priceFormatted})`;
  const emailBody = `Hi [Buyer Name],\n\nI wanted to personally share an exciting new property listing with you before it reaches the broader market.\n\nLocated at ${listing.address}, this beautiful ${listing.propertyType.toLowerCase()} is listed at ${priceFormatted} and features ${listing.bedrooms} bedrooms and ${listing.bathrooms} bathrooms.\n\nSome of the stand-out features include:\n- ${listing.feature1}\n- ${listing.feature2}\n- ${listing.feature3}\n\nYou can view photos and complete details on the single-property mini-site here:\n[MINI_SITE_URL]\n\nPlease let me know if you would like to arrange a private walk-through this week!\n\nBest regards,\n[AGENT_NAME]\n[AGENT_PHONE]`;

  return {
    listingId: listing.id,
    userId: listing.userId,
    listingDescription: desc,
    captions: {
      instagram1: ig1,
      instagram2: ig2,
      facebook: fb,
      linkedin: li,
      twitter: tw,
    },
    email: {
      subject: emailSubject,
      body: emailBody,
    },
    miniSiteSlug,
  };
}
