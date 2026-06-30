import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../common/Card';
import { Prediction } from '@/types';
import { Badge, getRiskVariant } from '../common/Badge';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';

export function RecentPredictions({ predictions }: { predictions: Prediction[] }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Recent Predictions</CardTitle>
          <CardDescription>Latest AI heuristic executions</CardDescription>
        </div>
        <Activity className="h-5 w-5 text-indigo-500" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        {predictions.length === 0 ? (
          <p className="text-sm text-slate-400 py-6 text-center">No predictions computed yet</p>
        ) : (
          <div className="divide-y divide-slate-100 flex-1">
            {predictions.slice(0, 5).map((pred) => (
              <div key={pred.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700">{pred.location}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{formatDate(pred.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-slate-800">{pred.riskPercentage}%</span>
                  <Badge variant={getRiskVariant(pred.riskLevel)}>{pred.riskLevel}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="pt-2">
          <Link
            href="/prediction"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Run new prediction model</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
