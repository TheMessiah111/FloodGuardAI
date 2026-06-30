import React from 'react';
import { ShieldCheck, Info, MapPin, AlertCircle } from 'lucide-react';
import { RiskLevel } from '@/types';

export function RecommendationCard({
  level,
  message,
  action,
  location,
}: {
  level: RiskLevel;
  message: string;
  action: string;
  location: string;
}) {
  const getIcon = (lvl: RiskLevel) => {
    switch (lvl) {
      case 'CRITICAL':
      case 'HIGH':
        return <AlertCircle className="h-6 w-6 text-red-600 animate-bounce" />;
      default:
        return <ShieldCheck className="h-6 w-6 text-green-600" />;
    }
  };

  const getBorderColor = (lvl: RiskLevel) => {
    switch (lvl) {
      case 'LOW':
        return 'border-green-200';
      case 'MEDIUM':
        return 'border-yellow-200';
      case 'HIGH':
        return 'border-orange-200';
      case 'CRITICAL':
        return 'border-red-200';
      default:
        return 'border-slate-200';
    }
  };

  return (
    <div className={`p-6 bg-white border rounded-xl shadow-xs space-y-4 ${getBorderColor(level)}`}>
      <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
        <div className="p-2 bg-slate-50 rounded-lg shrink-0">
          {getIcon(level)}
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Early Warning Notice</h4>
          <div className="text-sm font-bold text-slate-800 flex items-center space-x-1">
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <span>Target: {location}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
          <Info className="h-3.5 w-3.5 shrink-0" />
          <span>Simulation Summary</span>
        </h5>
        <p className="text-sm text-slate-600 leading-relaxed pt-1">{message}</p>
      </div>

      <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-lg space-y-1">
        <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Safety Instruction</h5>
        <p className="text-sm font-semibold text-slate-800 leading-relaxed pt-1">{action}</p>
      </div>
    </div>
  );
}
