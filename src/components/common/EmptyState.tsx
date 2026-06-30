import React from 'react';
import { Database } from 'lucide-react';

export function EmptyState({
  title = 'No records found',
  description = 'There is currently no data in this dashboard module.',
  icon: Icon = Database,
}: {
  title?: string;
  description?: string;
  icon?: any;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-3 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
      <div className="p-3 bg-slate-100 text-slate-400 rounded-full">
        <Icon className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
