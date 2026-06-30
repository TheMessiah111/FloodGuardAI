import React from 'react';
import { Card, CardContent } from '../common/Card';
import { Brain, Bell, ShieldAlert, Droplets } from 'lucide-react';

export interface DashboardStatsProps {
  totalPredictions: number;
  activeAlerts: number;
  averageRiskPercentage: number;
  criticalCommunitiesCount: number;
}

export function DashboardStats({
  totalPredictions,
  activeAlerts,
  averageRiskPercentage,
  criticalCommunitiesCount,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <Card className="hover:translate-y-[-2px] transition-transform duration-200">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Predictions</p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{totalPredictions}</h3>
            <p className="text-xs text-slate-500 mt-1">Calculated indicators</p>
          </div>
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
            <Brain className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:translate-y-[-2px] transition-transform duration-200">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Alerts</p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{activeAlerts}</h3>
            <p className="text-xs text-slate-500 mt-1">Requiring verification</p>
          </div>
          <div className="p-3.5 bg-red-50 text-red-600 rounded-xl">
            <Bell className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:translate-y-[-2px] transition-transform duration-200">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Risk</p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{averageRiskPercentage}%</h3>
            <p className="text-xs text-slate-500 mt-1">Regional average index</p>
          </div>
          <div className="p-3.5 bg-yellow-50 text-yellow-600 rounded-xl">
            <Droplets className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>

      <Card className="hover:translate-y-[-2px] transition-transform duration-200">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Areas</p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{criticalCommunitiesCount}</h3>
            <p className="text-xs text-slate-500 mt-1">Communities at risk</p>
          </div>
          <div className="p-3.5 bg-orange-50 text-orange-600 rounded-xl">
            <ShieldAlert className="h-6 w-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
