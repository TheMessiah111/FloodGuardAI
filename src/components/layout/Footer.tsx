import React from 'react';

export function Footer() {
  return (
    <footer className="py-6 px-8 border-t border-slate-200 bg-white text-center text-xs text-slate-400">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
        <p>© 2026 FloodGuard AI. Computer Science Final Year Research Project.</p>
        <p className="font-medium text-slate-500">
          Flood Early Warning System for Nigerian Communities
        </p>
      </div>
    </footer>
  );
}
