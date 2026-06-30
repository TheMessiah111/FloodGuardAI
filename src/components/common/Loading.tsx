import React from 'react';

export function Loading({ message = 'Loading system data...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <div className="relative">
        <img
          src="/logo.png"
          alt="Loading..."
          className="h-14 w-14 object-contain rounded-xl animate-logo-zoom"
        />
        {/* Subtle spinning glow border */}
        <div className="absolute -inset-1.5 border border-blue-500/20 border-t-blue-500 rounded-full animate-spin pointer-events-none" />
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider animate-pulse pt-2">{message}</p>
    </div>
  );
}
