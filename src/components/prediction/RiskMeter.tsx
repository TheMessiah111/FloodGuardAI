import React from 'react';
import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types';

export function RiskMeter({
  percentage,
  level,
  confidence,
}: {
  percentage: number;
  level: RiskLevel;
  confidence: number;
}) {
  const getStrokeColor = (lvl: RiskLevel) => {
    switch (lvl) {
      case 'LOW':
        return 'stroke-green-500';
      case 'MEDIUM':
        return 'stroke-yellow-500';
      case 'HIGH':
        return 'stroke-orange-500';
      case 'CRITICAL':
        return 'stroke-red-500 animate-pulse';
      default:
        return 'stroke-blue-500';
    }
  };

  const getBg = (lvl: RiskLevel) => {
    switch (lvl) {
      case 'LOW':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'MEDIUM':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'HIGH':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'CRITICAL':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 bg-slate-50 rounded-xl border border-slate-200/60 h-full">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level Indicator</h4>

      <div className="relative flex items-center justify-center w-36 h-36">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r={radius}
            className="stroke-slate-200"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r={radius}
            className={cn('transition-all duration-500 ease-out', getStrokeColor(level))}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-extrabold text-slate-800 leading-none">{percentage}%</span>
          <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Risk Index</span>
        </div>
      </div>

      <div className="space-y-1.5 w-full">
        <div className={cn('inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border', getBg(level))}>
          Severity: {level}
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Prediction Confidence: <span className="font-semibold text-slate-700">{confidence}%</span>
        </p>
      </div>
    </div>
  );
}
