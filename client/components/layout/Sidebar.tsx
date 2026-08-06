'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Award,
  User,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import BrandLogo from '@/components/auth/BrandLogo';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const sidebarNavItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Skill Verification', href: '/dashboard/skill-verification', icon: Award, badge: 'AI Verified' },
  { label: 'User Profile', href: '/dashboard/profile', icon: User },
  { label: 'Notifications', href: '/dashboard/notifications', icon: Bell, badgeCount: 2 },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`hidden md:flex flex-col fixed top-0 left-0 bottom-0 z-40 bg-[#080D26]/90 border-r border-slate-800/80 backdrop-blur-xl transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'
        }`}
    >
      {/* Header / Brand */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800/80">
        {!collapsed && <BrandLogo />}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3D5AFE] to-[#00D9C0] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              S
            </div>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        {sidebarNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all group relative ${isActive
                ? 'bg-gradient-to-r from-[#3D5AFE]/20 to-transparent text-white border-l-2 border-[#3D5AFE] shadow-sm'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-[#3D5AFE]' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
              />

              {!collapsed && <span className="truncate">{item.label}</span>}

              {!collapsed && item.badge && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-[#00D9C0]/10 text-[#00D9C0] border border-[#00D9C0]/20 font-semibold">
                  {item.badge}
                </span>
              )}

              {!collapsed && item.badgeCount && (
                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-[#3D5AFE] text-white">
                  {item.badgeCount}
                </span>
              )}

              {/* Tooltip on collapse */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Pro Banner */}
      {!collapsed && (
        <div className="p-4 m-3 rounded-2xl bg-gradient-to-b from-[#3D5AFE]/15 to-transparent border border-[#3D5AFE]/20 text-center">
          <div className="inline-flex p-2 rounded-xl bg-[#3D5AFE]/20 text-[#00D9C0] mb-2">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-200">AI Verification v4</h4>
          <p className="text-[11px] text-slate-400 mt-1">Autonomous skill audit engine active</p>
        </div>
      )}
    </aside>
  );
};
