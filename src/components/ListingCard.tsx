import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Home, Calendar, Trash2, ExternalLink, Sparkles } from 'lucide-react';
import { Listing } from '@/types';
import { formatPrice, formatDate } from '@/lib/utils';
import { deleteLocalListing } from '@/lib/firebase';

interface ListingCardProps {
  listing: Listing;
  onDelete?: () => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete listing for "${listing.address}"?`)) {
      deleteLocalListing(listing.id);
      if (onDelete) onDelete();
    }
  };

  const defaultPhoto = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80';
  const displayPhoto = listing.photoUrls && listing.photoUrls.length > 0 ? listing.photoUrls[0] : defaultPhoto;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition group flex flex-col justify-between">
      <div>
        {/* Photo Container */}
        <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
          <img
            src={displayPhoto}
            alt={listing.address}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
            {formatPrice(listing.price)}
          </div>
          <button
            onClick={handleDelete}
            className="absolute top-3 right-3 p-1.5 rounded-md bg-white/80 hover:bg-red-50 text-gray-600 hover:text-red-600 backdrop-blur-sm transition shadow-sm"
            title="Delete listing"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2.5">
          <h3 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition">
            {listing.address}
          </h3>

          <div className="flex items-center space-x-4 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-gray-400" />
              {listing.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-gray-400" />
              {listing.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-gray-400" />
              {listing.propertyType}
            </span>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 italic bg-gray-50 p-2 rounded-lg border border-gray-100">
            "{listing.feature1}"
          </p>
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDate(listing.createdAt)}
        </span>

        <Link
          to={`/dashboard/listing/${listing.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700"
        >
          <Sparkles className="w-3.5 h-3.5" />
          View Kit →
        </Link>
      </div>
    </div>
  );
};
