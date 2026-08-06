'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Settings, Shield, LogOut, ChevronDown } from 'lucide-react';
import { UserAvatar } from '@/components/dashboard/common/UserAvatar';
import { mockCurrentUser } from '@/mock/users';
import { toast } from 'sonner';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/60 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <UserAvatar name={mockCurrentUser.name} avatarUrl={mockCurrentUser.avatarUrl} size="sm" showStatusBadge />
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-semibold text-slate-100">{mockCurrentUser.name}</span>
          <span className="text-[10px] text-slate-400 truncate max-w-[110px]">{mockCurrentUser.role}</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0F172A]/95 border border-slate-800 shadow-2xl backdrop-blur-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2.5 mb-1 border-b border-slate-800/80">
            <p className="text-xs font-bold text-slate-100">{mockCurrentUser.name}</p>
            <p className="text-[11px] text-slate-400 truncate">{mockCurrentUser.email}</p>
          </div>

          <div className="space-y-0.5">
            <Link
              href="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <User className="w-4 h-4 text-[#3D5AFE]" />
              <span>Profile</span>
            </Link>

            <Link
              href="/dashboard/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Settings</span>
            </Link>

            <Link
              href="/account-suspended"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Security Status</span>
            </Link>
          </div>

          <div className="mt-1 pt-1 border-t border-slate-800/80">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
