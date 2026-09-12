import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ImagePlus, ArrowRight, Upload, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ListingFormData } from '@/types';
import { saveLocalListing, saveLocalContent, getLocalSubscription, saveLocalSubscription, getLocalUser } from '@/lib/firebase';
import { generateContentForListing } from '@/lib/gemini';
import { generateSlug } from '@/lib/utils';

export const NewListingPage: React.FC = () => {
  const navigate = useNavigate();
  const user = getLocalUser();
  const sub = getLocalSubscription();

  const [formData, setFormData] = useState<ListingFormData>({
    address: '1044 Sunset Boulevard, Los Angeles, CA 90210',
    price: '1250000',
    bedrooms: '4',
    bathrooms: '3.5',
    propertyType: 'House',
    feature1: 'Panoramic ocean views and sun-drenched terrace',
    feature2: 'Custom Italian marble kitchen with wine cellar',
    feature3: 'Private infinity pool and outdoor summer kitchen',
    targetBuyer: 'Luxury buyers and executive families',
    tone: 'Luxury & Elegant',
    photos: [],
  });

  const [photoPreviews, setPhotoPreviews] = useState<string[]>([
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80'
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPhotoPreviews((prev) => [...prev, ...newPreviews].slice(0, 3));
      setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files].slice(0, 3) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check generation limit
    if (sub.plan === 'free' && sub.generationsUsed >= sub.generationsLimit) {
      setError(`Free generation limit reached (${sub.generationsUsed}/${sub.generationsLimit}). Please upgrade your plan in Settings to generate more.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const listingId = `listing-${Date.now()}`;
      const newListing = {
        id: listingId,
        userId: user.uid,
        address: formData.address,
        price: parseFloat(formData.price) || 0,
        bedrooms: parseInt(formData.bedrooms) || 1,
        bathrooms: parseFloat(formData.bathrooms) || 1,
        propertyType: formData.propertyType,
        feature1: formData.feature1,
        feature2: formData.feature2,
        feature3: formData.feature3,
        targetBuyer: formData.targetBuyer,
        tone: formData.tone,
        photoUrls: photoPreviews,
        createdAt: new Date().toISOString(),
      };

      // Generate content via Gemini SDK or smart model
      const generated = await generateContentForListing(newListing);

      const contentRecord = {
        id: `content-${Date.now()}`,
        ...generated,
        createdAt: new Date().toISOString(),
      };

      // Save locally
      saveLocalListing(newListing);
      saveLocalContent(contentRecord);

      // Increment subscription usage
      saveLocalSubscription({
        ...sub,
        generationsUsed: sub.generationsUsed + 1,
        totalGenerationsUsed: sub.totalGenerationsUsed + 1,
      });

      navigate(`/dashboard/listing/${listingId}`);
    } catch (err: any) {
      console.error(err);
      setError('Generation failed. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h1 className="text-2xl font-bold text-slate-900">Create New Property Marketing Kit</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Fill in property details below and hit Generate to produce your full marketing suite.
              </p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6">
              {/* Section 1: Property Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-700">
                  1. Property Specifications
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Property Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="e.g. 123 Maple Street, Austin TX"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Listing Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="485000"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Bedrooms</label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="1">1 Bed</option>
                      <option value="2">2 Beds</option>
                      <option value="3">3 Beds</option>
                      <option value="4">4 Beds</option>
                      <option value="5">5+ Beds</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Bathrooms</label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="1">1 Bath</option>
                      <option value="1.5">1.5 Baths</option>
                      <option value="2">2 Baths</option>
                      <option value="2.5">2.5 Baths</option>
                      <option value="3">3 Baths</option>
                      <option value="3.5">3.5 Baths</option>
                      <option value="4">4+ Baths</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Property Type</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="House">Single Family House</option>
                    <option value="Condo">Condo / Apartment</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Luxury Estate">Luxury Estate</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              {/* Section 2: Key Selling Features */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-700">
                  2. Key Selling Features (3 Highlights)
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Feature 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.feature1}
                    onChange={(e) => setFormData({ ...formData, feature1: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. Renovated chef's kitchen with quartz island"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Feature 2</label>
                  <input
                    type="text"
                    value={formData.feature2}
                    onChange={(e) => setFormData({ ...formData, feature2: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. Heated resort-style backyard swimming pool"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Feature 3</label>
                  <input
                    type="text"
                    value={formData.feature3}
                    onChange={(e) => setFormData({ ...formData, feature3: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. Minutes to top-rated schools & downtown"
                  />
                </div>
              </div>

              {/* Section 3: Tone & Target Audience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Buyer Audience</label>
                  <select
                    value={formData.targetBuyer}
                    onChange={(e) => setFormData({ ...formData, targetBuyer: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="First-Time Homebuyers">First-Time Homebuyers</option>
                    <option value="Families looking for upgrade">Families Looking for Upgrade</option>
                    <option value="Luxury buyers and executive families">Luxury & High-Net-Worth Buyers</option>
                    <option value="Investors looking for ROI">Real Estate Investors</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Copy Tone</label>
                  <select
                    value={formData.tone}
                    onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Professional & Persuasive">Professional & Persuasive</option>
                    <option value="Warm & Friendly">Warm & Inviting</option>
                    <option value="Luxury & Elegant">Luxury & Elegant</option>
                    <option value="Urgent & Punchy">Urgent & High-Energy</option>
                  </select>
                </div>
              </div>

              {/* Section 4: Property Photos */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-700">
                  Property Photos (Optional - Max 3 for Mini-Site Gallery)
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  {photoPreviews.map((url, idx) => (
                    <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden border border-slate-200 relative">
                      <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}

                  {photoPreviews.length < 3 && (
                    <label className="w-20 h-20 rounded-lg border-2 border-dashed border-slate-300 hover:border-emerald-500 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-600 cursor-pointer transition">
                      <Upload className="w-5 h-5 mb-1" />
                      <span className="text-[10px] font-semibold">Upload</span>
                      <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Generating Marketing Kit with Gemini AI... (takes ~3s)
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate My Full Marketing Kit →
                  </>
                )}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
