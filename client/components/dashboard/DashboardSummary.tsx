'use client';

import React from 'react';
import { Target, Award, CheckCircle } from 'lucide-react';
import { mockDashboardSummary } from '@/mock/dashboard';

export const DashboardSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800 flex items-center gap-3">
        <div className="p-3 rounded-xl bg-[#3D5AFE]/15 text-[#3D5AFE]">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400">Target Role Match</p>
          <p className="text-base font-bold text-slate-100">Senior Full-Stack</p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800 flex items-center gap-3">
        <div className="p-3 rounded-xl bg-[#00D9C0]/15 text-[#00D9C0]">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400">Total Credentials</p>
          <p className="text-base font-bold text-slate-100">
            {mockDashboardSummary.passedAssessmentsCount} Badges Earned
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800 flex items-center gap-3">
        <div className="p-3 rounded-xl bg-emerald-500/15 text-emerald-400">
          <CheckCircle className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-400">Verification Rate</p>
          <p className="text-base font-bold text-slate-100">94.2% Pass Rate</p>
        </div>
      </div>
    </div>
  );
};
