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
  X,
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

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="relative flex flex-col w-64 bg-slate-900 text-slate-300 h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        <div className="flex items-center justify-between px-5 py-5 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-6 w-6 object-contain rounded-md" />
            <span className="text-base font-bold text-white tracking-tight">FloodGuard AI</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white focus:outline-none cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'hover:bg-slate-800 hover:text-white'
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800 text-center bg-slate-950">
          <p className="text-[10px] text-slate-500 font-medium">CS Research Project © 2026</p>
        </div>
      </div>
    </div>
  );
}
