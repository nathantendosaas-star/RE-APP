import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Subscription } from '@/types';

interface UsageBarProps {
  subscription: Subscription;
}

export const UsageBar: React.FC<UsageBarProps> = ({ subscription }) => {
  const isUnlimited = subscription.generationsLimit >= 999999;
  const percentage = isUnlimited
    ? 0
    : Math.min(100, (subscription.generationsUsed / subscription.generationsLimit) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center space-x-3.5">
        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-semibold text-gray-900">Monthly AI Generations</h4>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-100 text-emerald-800">
              {subscription.plan}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            {isUnlimited
              ? 'You have unlimited marketing kit generations available.'
              : `You have used ${subscription.generationsUsed} of ${subscription.generationsLimit} free generations.`}
          </p>
        </div>
      </div>

      {!isUnlimited && (
        <div className="w-full sm:w-auto flex items-center gap-4">
          <div className="w-32 hidden md:block">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          <Link
            to="/dashboard/settings"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition shrink-0"
          >
            Upgrade Plan
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};
