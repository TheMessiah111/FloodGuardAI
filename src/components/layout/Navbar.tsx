'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Menu, LogOut, BellRing } from 'lucide-react';

export interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h2 className="hidden md:block text-xl font-semibold text-slate-800">
          Control Panel
        </h2>
        <span className="md:hidden text-lg font-bold text-slate-900 tracking-tight">
          FloodGuard AI
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-100 rounded-full text-xs font-semibold animate-pulse">
          <BellRing className="h-3.5 w-3.5" />
          <span>System Active</span>
        </div>

        {user ? (
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-sm font-semibold text-slate-800 leading-tight">
                {user.name}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {user.community}, {user.state}
              </span>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2 pl-3 border-l border-slate-200">
            <Link href="/login" className="text-sm font-semibold text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
