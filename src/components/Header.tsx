import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, LogOut, Settings, LayoutDashboard, PlusCircle } from 'lucide-react';
import { getLocalUser, getLocalSubscription } from '@/lib/firebase';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = getLocalUser();
  const sub = getLocalSubscription();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold text-gray-900 tracking-tight block leading-none">ListingKit</span>
            <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">AI Marketing Suite</span>
          </div>
        </Link>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            to="/dashboard/new"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            New Listing
          </Link>

          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

          <div className="flex items-center space-x-2">
            <Link
              to="/dashboard/settings"
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 text-gray-700 transition"
              title="Settings"
            >
              {user.headshotUrl ? (
                <img src={user.headshotUrl} alt={user.fullName} className="w-8 h-8 rounded-full object-cover border border-emerald-500" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  {user.fullName ? user.fullName.charAt(0) : 'A'}
                </div>
              )}
              <span className="text-sm font-medium text-gray-800 hidden md:inline">{user.fullName || 'Agent'}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
              title="Log out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
