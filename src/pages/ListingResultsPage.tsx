import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Building2, Calendar, MapPin, Tag } from 'lucide-react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ContentTabs } from '@/components/ContentTabs';
import { getListingByIdLocal, getLocalContent, saveLocalContent } from '@/lib/firebase';
import { generateContentForListing } from '@/lib/gemini';
import { Listing, GeneratedContent } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';

export const ListingResultsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [listing, setListing] = useState<Listing | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    if (id) {
      const foundListing = getListingByIdLocal(id);
      if (foundListing) {
        setListing(foundListing);
        const allContent = getLocalContent();
        const foundContent = allContent.find((c) => c.listingId === id);
        if (foundContent) {
          setContent(foundContent);
        }
      }
    }
  }, [id]);

  const handleRegenerate = async () => {
    if (!listing) return;
    setIsRegenerating(true);
    try {
      const regenerated = await generateContentForListing(listing);
      const updatedContentRecord: GeneratedContent = {
        id: content?.id || `content-${Date.now()}`,
        ...regenerated,
        createdAt: new Date().toISOString(),
      };
      saveLocalContent(updatedContentRecord);
      setContent(updatedContentRecord);
    } catch (err) {
      console.error(err);
    } finally {
      setIsRegenerating(false);
    }
  };

  if (!listing || !content) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold text-slate-500">Listing or marketing kit not found.</p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Kit Generated Successfully
            </span>
          </div>

          {/* Listing Overview Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <h1 className="text-xl font-bold text-slate-900">{listing.address}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-1">
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                  {formatPrice(listing.price)}
                </span>
                <span>{listing.bedrooms} Beds</span>
                <span>•</span>
                <span>{listing.bathrooms} Baths</span>
                <span>•</span>
                <span>{listing.propertyType}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(listing.createdAt)}
                </span>
              </div>
            </div>

            <Link
              to={`/p/${content.miniSiteSlug}`}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shrink-0"
            >
              Preview Public Mini-Site →
            </Link>
          </div>

          {/* Render 4 Content Tabs */}
          <ContentTabs
            content={content}
            listing={listing}
            onRegenerate={handleRegenerate}
            isRegenerating={isRegenerating}
          />
        </main>
      </div>
    </div>
  );
};
