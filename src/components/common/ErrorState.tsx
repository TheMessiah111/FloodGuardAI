import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

export function ErrorState({
  message = 'An error occurred while fetching system data.',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 border border-dashed border-red-200 rounded-xl bg-red-50/50 max-w-md mx-auto">
      <div className="p-3 bg-red-100 text-red-600 rounded-full">
        <AlertCircle className="h-8 w-8" />
      </div>
      <div className="space-y-1">
        <h4 className="font-semibold text-slate-900">System Error</h4>
        <p className="text-sm text-slate-500 leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
