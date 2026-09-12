import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, Crown, ExternalLink } from 'lucide-react';
import { getLocalSubscription } from '@/lib/firebase';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const sub = getLocalSubscription();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Listing', path: '/dashboard/new', icon: PlusCircle },
    { name: 'Settings & Billing', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Navigation</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Plan status widget */}
        <div className="p-3.5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-emerald-600" />
              {sub.plan.toUpperCase()} PLAN
            </span>
            <span className="text-xs font-semibold text-emerald-700">
              {sub.generationsUsed} / {sub.generationsLimit === 999999 ? '∞' : sub.generationsLimit}
            </span>
          </div>

          <div className="w-full bg-emerald-200/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-600 h-1.5 rounded-full transition-all"
              style={{
                width: `${Math.min(
                  100,
                  (sub.generationsUsed / (sub.generationsLimit === 999999 ? 100 : sub.generationsLimit)) * 100
                )}%`,
              }}
            ></div>
          </div>

          <Link
            to="/dashboard/settings"
            className="block text-center text-xs font-medium text-emerald-700 hover:text-emerald-900 pt-1"
          >
            Upgrade for Unlimited →
          </Link>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Agent Feedback & Docs
        </a>
      </div>
    </aside>
  );
};
