import React, { useState } from 'react';
import { Sparkles, Crown, CheckCircle2, User, Phone, Building, Save, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { getLocalUser, saveLocalUser, getLocalSubscription, saveLocalSubscription } from '@/lib/firebase';
import { UserProfile, Subscription, Plan } from '@/types';

export const SettingsPage: React.FC = () => {
  const [user, setUser] = useState<UserProfile>(getLocalUser());
  const [sub, setSub] = useState<Subscription>(getLocalSubscription());
  const [savedMsg, setSavedMsg] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveLocalUser(user);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleSelectPlan = (newPlan: Plan) => {
    let limit = 3;
    if (newPlan === 'starter') limit = 20;
    if (newPlan === 'pro') limit = 999999;

    const updatedUser: UserProfile = { ...user, plan: newPlan };
    const updatedSub: Subscription = {
      ...sub,
      plan: newPlan,
      generationsLimit: limit,
      status: 'active',
    };

    saveLocalUser(updatedUser);
    saveLocalSubscription(updatedSub);
    setUser(updatedUser);
    setSub(updatedSub);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
          <div className="border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-bold text-slate-900">Account Settings & Subscription</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Update your agent profile, headshot, and billing subscription
            </p>
          </div>

          {savedMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Agent profile updated successfully!
            </div>
          )}

          {/* Section 1: Agent Profile */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              Agent Branding & Contact Profile
            </h2>

            <form onSubmit={handleProfileSave} className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Agent Name</label>
                  <input
                    type="text"
                    value={user.fullName}
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Brokerage / Agency Name</label>
                  <input
                    type="text"
                    value={user.agencyName || ''}
                    onChange={(e) => setUser({ ...user, agencyName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={user.phone || ''}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Agent Photo / Headshot URL</label>
                  <input
                    type="text"
                    value={user.headshotUrl || ''}
                    onChange={(e) => setUser({ ...user, headshotUrl: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save Profile Changes
              </button>
            </form>
          </div>

          {/* Section 2: Subscription & Plans */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-emerald-600" />
                  Subscription Plan & Usage
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Current plan: <span className="font-bold text-emerald-700 uppercase">{sub.plan}</span> ({sub.generationsUsed} of {sub.generationsLimit === 999999 ? '∞' : sub.generationsLimit} used)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Free */}
              <div className={`p-5 rounded-2xl border flex flex-col justify-between ${sub.plan === 'free' ? 'border-2 border-slate-900 bg-slate-50' : 'border-slate-200'}`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-500 uppercase">Free Trial</span>
                    {sub.plan === 'free' && <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold">Active</span>}
                  </div>
                  <div className="text-3xl font-black text-slate-900">$0</div>
                  <p className="text-xs text-slate-500">3 lifetime generations to test with real agents</p>
                </div>
                <button
                  onClick={() => handleSelectPlan('free')}
                  disabled={sub.plan === 'free'}
                  className="w-full mt-4 py-2 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-100 disabled:opacity-50"
                >
                  {sub.plan === 'free' ? 'Current Plan' : 'Select Free'}
                </button>
              </div>

              {/* Starter */}
              <div className={`p-5 rounded-2xl border flex flex-col justify-between ${sub.plan === 'starter' ? 'border-2 border-emerald-600 bg-emerald-50/50' : 'border-slate-200'}`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-600 uppercase">Starter</span>
                    {sub.plan === 'starter' && <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">Active</span>}
                  </div>
                  <div className="text-3xl font-black text-slate-900">$29 <span className="text-xs font-normal text-slate-500">/mo</span></div>
                  <p className="text-xs text-slate-500">20 listing marketing kits generated per month</p>
                </div>
                <button
                  onClick={() => handleSelectPlan('starter')}
                  className={`w-full mt-4 py-2 rounded-xl text-xs font-bold transition ${
                    sub.plan === 'starter'
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  {sub.plan === 'starter' ? 'Active Subscription' : 'Upgrade to Starter ($29/mo)'}
                </button>
              </div>

              {/* Pro */}
              <div className={`p-5 rounded-2xl border flex flex-col justify-between ${sub.plan === 'pro' ? 'border-2 border-emerald-600 bg-emerald-50/50' : 'border-slate-200'}`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-emerald-600 uppercase">Pro Agent</span>
                    {sub.plan === 'pro' && <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded font-bold">Active</span>}
                  </div>
                  <div className="text-3xl font-black text-slate-900">$59 <span className="text-xs font-normal text-slate-500">/mo</span></div>
                  <p className="text-xs text-slate-500">Unlimited generations & custom agent branding</p>
                </div>
                <button
                  onClick={() => handleSelectPlan('pro')}
                  className={`w-full mt-4 py-2 rounded-xl text-xs font-bold transition ${
                    sub.plan === 'pro'
                      ? 'bg-slate-900 text-white cursor-default'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {sub.plan === 'pro' ? 'Active Subscription' : 'Upgrade to Pro ($59/mo)'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
