import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Alert } from '@/types';
import { formatDate } from '@/lib/utils';

export function AlertBanner({ alert, onClose }: { alert: Alert; onClose?: () => void }) {
  return (
    <div className="bg-red-600 text-white px-6 py-3.5 flex items-center justify-between shadow-lg relative overflow-hidden animate-in slide-in-from-top duration-300">
      <div className="absolute inset-0 bg-red-700/20 animate-pulse pointer-events-none" />

      <div className="flex items-center space-x-3 z-10">
        <AlertTriangle className="h-5 w-5 shrink-0 text-white" />
        <div className="text-sm font-semibold flex flex-col sm:flex-row sm:items-center sm:space-x-2">
          <span>{alert.message}</span>
          <span className="text-[10px] text-red-200 font-medium">({formatDate(alert.createdAt)})</span>
        </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer z-10"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
