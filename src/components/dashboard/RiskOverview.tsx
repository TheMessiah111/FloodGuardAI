import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../common/Card';
import { AlertCircle } from 'lucide-react';

export function RiskOverview({
  lowCount,
  mediumCount,
  highCount,
  criticalCount,
}: {
  lowCount: number;
  mediumCount: number;
  highCount: number;
  criticalCount: number;
}) {
  const total = lowCount + mediumCount + highCount + criticalCount || 1;
  const lowPercent = Math.round((lowCount / total) * 100);
  const mediumPercent = Math.round((mediumCount / total) * 100);
  const highPercent = Math.round((highCount / total) * 100);
  const criticalPercent = Math.round((criticalCount / total) * 100);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Community Risk Profile</CardTitle>
          <CardDescription>Aggregate risk distribution</CardDescription>
        </div>
        <AlertCircle className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-red-700 font-bold">Critical Threat</span>
            <span className="text-slate-600">{criticalCount} ({criticalPercent}%)</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full rounded-full transition-all duration-300" style={{ width: `${criticalPercent}%` }} />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-orange-700 font-bold">High Risk</span>
            <span className="text-slate-600">{highCount} ({highPercent}%)</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full rounded-full transition-all duration-300" style={{ width: `${highPercent}%` }} />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-yellow-700 font-bold">Moderate Warning</span>
            <span className="text-slate-600">{mediumCount} ({mediumPercent}%)</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-yellow-500 h-full rounded-full transition-all duration-300" style={{ width: `${mediumPercent}%` }} />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-green-700 font-bold">Stable / Low Risk</span>
            <span className="text-slate-600">{lowCount} ({lowPercent}%)</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full rounded-full transition-all duration-300" style={{ width: `${lowPercent}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
