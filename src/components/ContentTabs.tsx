import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FileText, Share2, Mail, Globe, ExternalLink, RefreshCw, CheckCircle2 } from 'lucide-react';
import { GeneratedContent, Listing } from '@/types';
import { CopyButton } from './CopyButton';

interface ContentTabsProps {
  content: GeneratedContent;
  listing: Listing;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({
  content,
  listing,
  onRegenerate,
  isRegenerating = false,
}) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'social' | 'email' | 'minisite'>('desc');

  const publicMiniSiteUrl = `${window.location.origin}/p/${content.miniSiteSlug}`;

  const tabs = [
    { id: 'desc', label: 'MLS Description', icon: FileText },
    { id: 'social', label: 'Social Captions (5)', icon: Share2 },
    { id: 'email', label: 'Buyer Email', icon: Mail },
    { id: 'minisite', label: 'Mini-Site & QR', icon: Globe },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Tab bar navigation */}
      <div className="border-b border-gray-200 bg-gray-50/70 px-4 pt-3 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-medium text-sm transition border-b-2 ${
                isActive
                  ? 'bg-white border-emerald-600 text-emerald-700 shadow-sm'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: MLS Listing Description */}
      {activeTab === 'desc' && (
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-900">MLS Listing Description</h3>
              <p className="text-xs text-gray-500">
                Ready to paste into your local MLS (Zillow, Realtor.com, Redfin)
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  disabled={isRegenerating}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                  Regenerate
                </button>
              )}
              <CopyButton text={content.listingDescription} label="Copy Description" />
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-800 whitespace-pre-line leading-relaxed">
            {content.listingDescription}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
            <span>Word count: {content.listingDescription.split(/\s+/).length} words</span>
            <span>Character count: {content.listingDescription.length} characters</span>
          </div>
        </div>
      )}

      {/* Tab 2: 5 Social Media Captions */}
      {activeTab === 'social' && (
        <div className="p-6 space-y-6">
          <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Platform-Optimized Captions</h3>
              <p className="text-xs text-gray-500">5 custom copy variations crafted for high engagement</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Instagram 1 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-pink-700 bg-pink-100 px-2 py-0.5 rounded uppercase">
                    Instagram — Lifestyle Angle
                  </span>
                  <CopyButton text={content.captions.instagram1.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)} />
                </div>
                <p className="text-xs text-gray-700 whitespace-pre-line font-mono leading-relaxed">
                  {content.captions.instagram1.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)}
                </p>
              </div>
            </div>

            {/* Instagram 2 */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded uppercase">
                    Instagram — Feature Showcase
                  </span>
                  <CopyButton text={content.captions.instagram2.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)} />
                </div>
                <p className="text-xs text-gray-700 whitespace-pre-line font-mono leading-relaxed">
                  {content.captions.instagram2.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)}
                </p>
              </div>
            </div>

            {/* Facebook */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded uppercase">
                    Facebook Post
                  </span>
                  <CopyButton text={content.captions.facebook.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)} />
                </div>
                <p className="text-xs text-gray-700 whitespace-pre-line font-mono leading-relaxed">
                  {content.captions.facebook.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)}
                </p>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded uppercase">
                    LinkedIn — Investor Focus
                  </span>
                  <CopyButton text={content.captions.linkedin.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)} />
                </div>
                <p className="text-xs text-gray-700 whitespace-pre-line font-mono leading-relaxed">
                  {content.captions.linkedin.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)}
                </p>
              </div>
            </div>

            {/* Twitter/X */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-800 bg-gray-200 px-2 py-0.5 rounded uppercase">
                    X / Twitter (Under 280 Chars)
                  </span>
                  <CopyButton text={content.captions.twitter.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)} />
                </div>
                <p className="text-xs text-gray-700 whitespace-pre-line font-mono leading-relaxed">
                  {content.captions.twitter.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Buyer Email */}
      {activeTab === 'email' && (
        <div className="p-6 space-y-6">
          <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Ready-To-Send Buyer Email</h3>
              <p className="text-xs text-gray-500">Paste directly into Gmail, Mailchimp, or your CRM</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-gray-500 uppercase">Subject Line</span>
                <CopyButton text={content.email.subject} />
              </div>
              <p className="text-sm font-semibold text-gray-900">{content.email.subject}</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-gray-500 uppercase">Email Body</span>
                <CopyButton text={content.email.body.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)} />
              </div>
              <div className="text-xs font-mono text-gray-800 whitespace-pre-line leading-relaxed">
                {content.email.body.replace(/\[MINI_SITE_URL\]/g, publicMiniSiteUrl)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Public Mini-Site & QR Code */}
      {activeTab === 'minisite' && (
        <div className="p-6 space-y-6">
          <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900">Single-Property Mini-Site & QR Code</h3>
              <p className="text-xs text-gray-500">
                Share this link on social media, WhatsApp, or print on physical property flyers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Public Shareable URL</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={publicMiniSiteUrl}
                    className="w-full text-xs font-mono bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
                  />
                  <CopyButton text={publicMiniSiteUrl} label="Copy Link" />
                  <a
                    href={`/p/${content.miniSiteSlug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition shrink-0"
                  >
                    Open <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/80 border border-emerald-100 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Mini-site features:
                </div>
                <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside pl-1">
                  <li>Full high-res photo gallery carousel</li>
                  <li>MLS description + property specifications</li>
                  <li>Direct agent contact buttons (Email & WhatsApp)</li>
                  <li>Fully responsive for mobile buyers</li>
                </ul>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
              <span className="text-xs font-bold text-gray-700">Flyer QR Code</span>
              <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <QRCodeSVG value={publicMiniSiteUrl} size={135} level="H" />
              </div>
              <p className="text-[11px] text-gray-500 text-center">Scan with phone camera to view mini-site instantly</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
