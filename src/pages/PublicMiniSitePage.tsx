import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getContentBySlugLocal, getListingByIdLocal, getLocalUser } from '@/lib/firebase';
import { GeneratedContent, Listing, UserProfile } from '@/types';
import { formatPrice } from '@/lib/utils';
import { MapPin, Bed, Bath, Home, Phone, Mail, Sparkles, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export const PublicMiniSitePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [agent, setAgent] = useState<UserProfile | null>(null);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  useEffect(() => {
    if (slug) {
      const foundContent = getContentBySlugLocal(slug);
      if (foundContent) {
        setContent(foundContent);
        const foundListing = getListingByIdLocal(foundContent.listingId);
        if (foundListing) {
          setListing(foundListing);
        }
      }
      setAgent(getLocalUser());
    }
  }, [slug]);

  if (!content || !listing) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
        <div className="space-y-4 max-w-md">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-emerald-400">
            <Home className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold">Property Mini-Site Not Found</h1>
          <p className="text-xs text-slate-400">
            This single-property website link may have been modified or removed by the listing agent.
          </p>
          <Link
            to="/"
            className="inline-block px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
          >
            Visit ListingKit AI
          </Link>
        </div>
      </div>
    );
  }

  const photos = listing.photoUrls && listing.photoUrls.length > 0
    ? listing.photoUrls
    : ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop&q=80'];

  const agentName = agent?.fullName || 'Sarah Jenkins';
  const agencyName = agent?.agencyName || 'Premier Realty Group';
  const agentPhone = agent?.phone || '(555) 234-5678';
  const agentEmail = agent?.email || 'agent@realtydemo.com';

  const nextPhoto = () => setCurrentPhotoIdx((prev) => (prev + 1) % photos.length);
  const prevPhoto = () => setCurrentPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-200 py-3 px-4 sm:px-8 border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-white uppercase tracking-wider">Exclusive Property Listing</span>
        </div>
        <div className="text-slate-400 hidden sm:block">
          Presented by <span className="text-white font-semibold">{agencyName}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* Photo Gallery Carousel */}
        <div className="relative h-80 sm:h-[450px] w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={photos[currentPhotoIdx]}
            alt={listing.address}
            className="w-full h-full object-cover transition-all duration-500"
          />

          {photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-sm transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-sm transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 bg-slate-900/60 backdrop-blur-sm px-3 py-1 rounded-full">
                {photos.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentPhotoIdx ? 'bg-emerald-400 w-5' : 'bg-white/50'
                    }`}
                  ></div>
                ))}
              </div>
            </>
          )}

          <div className="absolute top-4 left-4 bg-emerald-600 text-white text-base font-black px-4 py-1.5 rounded-xl shadow-lg">
            {formatPrice(listing.price)}
          </div>
        </div>

        {/* Address Header & Highlights */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-6">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {listing.address}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-600 pt-2">
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                <Bed className="w-4 h-4 text-emerald-600" />
                {listing.bedrooms} Bedrooms
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                <Bath className="w-4 h-4 text-emerald-600" />
                {listing.bathrooms} Bathrooms
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                <Home className="w-4 h-4 text-emerald-600" />
                {listing.propertyType}
              </span>
            </div>
          </div>

          {/* Listing Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">About This Residence</h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line font-sans">
              {content.listingDescription}
            </p>
          </div>

          {/* Highlights */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Features & Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
                ✨ {listing.feature1}
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
                ✨ {listing.feature2}
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800">
                ✨ {listing.feature3}
              </div>
            </div>
          </div>
        </div>

        {/* Agent Contact Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            {agent?.headshotUrl ? (
              <img src={agent.headshotUrl} alt={agentName} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400" />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl font-bold">
                {agentName.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="text-lg font-bold text-white">{agentName}</h3>
              <p className="text-xs text-slate-300">{agencyName}</p>
              <p className="text-xs text-emerald-400 font-medium mt-1">{agentPhone}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href={`mailto:${agentEmail}?subject=Inquiry regarding ${listing.address}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Mail className="w-4 h-4" />
              Email Agent
            </a>
            <a
              href={`https://wa.me/${agentPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${agentName}, I am interested in viewing ${listing.address}`)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-950 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Powered by footer */}
        <div className="text-center pt-8 border-t border-slate-200">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-600 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by ListingKit AI — Real Estate Agent Marketing Suite
          </Link>
        </div>
      </div>
    </div>
  );
};
