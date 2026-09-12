import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Building2, Sparkles, Filter } from 'lucide-react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { UsageBar } from '@/components/UsageBar';
import { ListingCard } from '@/components/ListingCard';
import { getLocalListings, getLocalSubscription } from '@/lib/firebase';

export const DashboardPage: React.FC = () => {
  const [listings, setListings] = useState(getLocalListings());
  const subscription = getLocalSubscription();

  const handleRefresh = () => {
    setListings(getLocalListings());
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          <UsageBar subscription={subscription} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Your Property Listings</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your active listing marketing kits and single-property websites
              </p>
            </div>

            <Link
              to="/dashboard/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Generate New Kit
            </Link>
          </div>

          {listings.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">No Property Kits Generated Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Enter a property address and details to get your MLS description, 5 social captions, buyer email, and mini-site in 60s.
                </p>
              </div>
              <Link
                to="/dashboard/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition"
              >
                <Sparkles className="w-4 h-4" />
                Create First Listing Kit
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} onDelete={handleRefresh} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
