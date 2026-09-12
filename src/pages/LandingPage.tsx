import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, Zap, Share2, Globe, Shield, Star, ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Top Banner / Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">ListingKit</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition">
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition shadow-sm"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Powered by Gemini 2.5 AI
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Turn Any Property Address Into a Full <span className="text-emerald-600">Marketing Kit</span> in 60 Seconds.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Generate your MLS listing description, 5 platform-optimized social captions, buyer email blast, and a shareable single-property website with QR code instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
            >
              Generate My First Kit Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-base transition flex items-center justify-center"
            >
              Agent Demo Login
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-6 text-xs text-slate-500 font-medium pt-4">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No Credit Card Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3 Free Generations
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant Setup
            </span>
          </div>

          {/* Interactive Preview Card */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl border border-slate-200 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="text-xs font-mono text-slate-400 pl-2">listingkit.app/dashboard</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Live Generator Preview
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">1. MLS Description</span>
                  <p className="text-xs text-slate-700 line-clamp-3 mt-1 font-mono">
                    "Welcome to luxury living in Austin! 4 beds, 3 baths with chef's kitchen..."
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">2. Social Captions</span>
                  <p className="text-xs text-slate-700 line-clamp-3 mt-1 font-mono">
                    "✨ JUST LISTED! 742 Evergreen Terrace. Tap link in bio for tour! 🏊‍♂️ #RealEstate"
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">3. Buyer Email</span>
                  <p className="text-xs text-slate-700 line-clamp-3 mt-1 font-mono">
                    "Exclusive preview: 4-Bed Austin home with private resort pool..."
                  </p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">4. Mini-Site & QR</span>
                  <p className="text-xs text-slate-700 line-clamp-3 mt-1 font-mono">
                    listingkit.app/p/demo742e + Instant Flyer QR Code
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tiers Section */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-slate-900">Simple, Affordable Pricing</h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                Save hours on marketing every listing. Upgrade anytime as your inventory grows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-sm font-bold text-slate-500 uppercase">Free Trial</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">$0</span>
                    <span className="text-slate-500 text-sm">/ forever</span>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-600 pt-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 3 Total Generations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> MLS Descriptions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 5 Social Captions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Buyer Email Blast
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Single-Property Mini-Sites
                    </li>
                  </ul>
                </div>
                <Link
                  to="/signup"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-center block text-sm transition"
                >
                  Start Free
                </Link>
              </div>

              {/* Starter */}
              <div className="p-6 bg-white border-2 border-emerald-500 rounded-2xl shadow-xl space-y-6 flex flex-col justify-between relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Most Popular for Agents
                </div>
                <div className="space-y-4 pt-2">
                  <span className="text-sm font-bold text-emerald-600 uppercase">Starter</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">$29</span>
                    <span className="text-slate-500 text-sm">/ month</span>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-600 pt-2">
                    <li className="flex items-center gap-2 font-semibold text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 20 Generations / Month
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Unlimited Mini-Site Views
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Flyer QR Code Generator
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Photo Gallery Storage
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Priority Gemini AI Speed
                    </li>
                  </ul>
                </div>
                <Link
                  to="/signup"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center block text-sm transition shadow-md shadow-emerald-600/20"
                >
                  Get Started — $29/mo
                </Link>
              </div>

              {/* Pro */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-sm font-bold text-slate-500 uppercase">Pro Agent / Agency</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900">$59</span>
                    <span className="text-slate-500 text-sm">/ month</span>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-600 pt-2">
                    <li className="flex items-center gap-2 font-semibold text-slate-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> UNLIMITED Generations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Custom Branding & Logo
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Priority Support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Unlimited Mini-Sites
                    </li>
                  </ul>
                </div>
                <Link
                  to="/signup"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-center block text-sm transition"
                >
                  Upgrade to Pro — $59/mo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs space-y-2">
          <p>© {new Date().getFullYear()} ListingKit AI. Built specifically for Real Estate Agents.</p>
          <p className="text-slate-500">Gemini 2.5 AI Powered · Instant Single-Property Mini Sites · High Conversion Copy</p>
        </div>
      </footer>
    </div>
  );
};
