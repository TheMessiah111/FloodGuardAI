'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Brain,
  Map,
  AlertTriangle,
  BarChart3,
  PhoneCall,
  User,
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Flood Prediction', href: '/prediction', icon: Brain },
  { label: 'Flood Map', href: '/map', icon: Map },
  { label: 'Risk Alerts', href: '/alerts', icon: AlertTriangle },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Emergency Contacts', href: '/emergency', icon: PhoneCall },
  { label: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-80 bg-slate-900 border-r border-slate-800 text-slate-300 h-screen sticky top-0">
      {/* Header / Branding */}
     <div className="flex items-center gap-0 px-4 py-4 border-b border-slate-800">
    <img
      src="/logo.png"
      alt="FloodGuard AI logo"
      className="h-15 w-13 mx-2  "
    />
    <span className="font-bold tracking-tight text-white truncate text-lg">
      FloodGuard AI
    </span>
  </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                  : 'hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Meta */}
      <div className="p-4 border-t border-slate-800 text-center bg-slate-950">
        <p className="text-xs text-slate-500 font-medium">Nigerian Communities Warning System</p>
        <p className="text-[10px] text-slate-600 mt-1">CS Research Project © 2026</p>
      </div>
    </aside>
  );
}
