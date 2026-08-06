'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import BrandLogo from '@/components/auth/BrandLogo';
import { sidebarNavItems } from './Sidebar';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Drawer */}
      <div className="relative w-4/5 max-w-xs bg-[#080D26] border-r border-slate-800 h-full flex flex-col z-10 p-4 shadow-2xl animate-in slide-in-from-left duration-300">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
          <BrandLogo />
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 space-y-1.5 overflow-y-auto">
          {sidebarNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#3D5AFE]/20 text-white border-l-2 border-[#3D5AFE]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#3D5AFE]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badgeCount && (
                  <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-[#3D5AFE] text-white">
                    {item.badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
