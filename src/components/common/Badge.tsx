import React from 'react';
import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'low' | 'medium' | 'high' | 'critical' | 'info' | 'success' | 'warning' | 'error';
}

export function Badge({ className, variant = 'info', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider',
        {
          'bg-green-100 text-green-800 border border-green-200': variant === 'low' || variant === 'success',
          'bg-yellow-100 text-yellow-800 border border-yellow-200': variant === 'medium' || variant === 'warning',
          'bg-orange-100 text-orange-800 border border-orange-200': variant === 'high',
          'bg-red-100 text-red-800 border border-red-200': variant === 'critical' || variant === 'error',
          'bg-blue-100 text-blue-800 border border-blue-200': variant === 'info',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function getRiskVariant(level: RiskLevel): BadgeProps['variant'] {
  switch (level) {
    case 'LOW':
      return 'low';
    case 'MEDIUM':
      return 'medium';
    case 'HIGH':
      return 'high';
    case 'CRITICAL':
      return 'critical';
    default:
      return 'info';
  }
}
