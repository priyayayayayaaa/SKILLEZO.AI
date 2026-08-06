'use client';

import React from 'react';
import { Palette, Moon, Sun, Monitor } from 'lucide-react';
import { CardHeader } from '@/components/dashboard/common/CardHeader';
import { toast } from 'sonner';

export const AppearanceSettings: React.FC = () => {
  const [theme, setTheme] = React.useState<'dark' | 'light' | 'system'>('dark');

  const handleSelectTheme = (t: 'dark' | 'light' | 'system') => {
    setTheme(t);
    toast.info(`Theme changed to ${t} (Enterprise Dark Theme is enforcement default)`);
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md space-y-6">
      <CardHeader
        title="Appearance & Theme"
        subtitle="Customize interface theme and display density"
        icon={<Palette className="w-5 h-5 text-[#00D9C0]" />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
        <button
          onClick={() => handleSelectTheme('dark')}
          className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all ${
            theme === 'dark'
              ? 'bg-[#3D5AFE]/20 border-[#3D5AFE] text-white shadow-lg'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Moon className="w-6 h-6 text-[#3D5AFE]" />
          <span className="text-xs font-bold">Dark Enterprise</span>
        </button>

        <button
          onClick={() => handleSelectTheme('light')}
          className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all ${
            theme === 'light'
              ? 'bg-[#3D5AFE]/20 border-[#3D5AFE] text-white shadow-lg'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sun className="w-6 h-6 text-amber-400" />
          <span className="text-xs font-bold">Light Mode</span>
        </button>

        <button
          onClick={() => handleSelectTheme('system')}
          className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-center transition-all ${
            theme === 'system'
              ? 'bg-[#3D5AFE]/20 border-[#3D5AFE] text-white shadow-lg'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Monitor className="w-6 h-6 text-[#00D9C0]" />
          <span className="text-xs font-bold">System Default</span>
        </button>
      </div>
    </div>
  );
};
