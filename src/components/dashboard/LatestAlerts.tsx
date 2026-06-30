import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../common/Card';
import { Alert } from '@/types';
import { Badge, getRiskVariant } from '../common/Badge';
import { formatDate } from '@/lib/utils';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function LatestAlerts({ alerts }: { alerts: Alert[] }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Latest Alerts</CardTitle>
          <CardDescription>Auto-triggered hazard events</CardDescription>
        </div>
        <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        {alerts.length === 0 ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
            <p className="text-sm text-slate-400 text-center font-medium">System clear — no active hazards</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 flex-1">
            {alerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="py-3 flex items-start justify-between first:pt-0 last:pb-0 space-x-2">
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-semibold text-slate-700">{alert.location}</span>
                  <span className="text-xs text-slate-500 line-clamp-1 mt-0.5">{alert.message}</span>
                  <span className="text-[9px] text-slate-400 font-medium mt-1">{formatDate(alert.createdAt)}</span>
                </div>
                <Badge variant={getRiskVariant(alert.riskLevel)} className="shrink-0">
                  {alert.riskLevel}
                </Badge>
              </div>
            ))}
          </div>
        )}
        <div className="pt-2">
          <Link
            href="/alerts"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Review all alert files</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
