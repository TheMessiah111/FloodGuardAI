import React from 'react';
import { Card, CardContent } from '../common/Card';
import { Badge, getRiskVariant } from '../common/Badge';
import { Alert } from '@/types';
import { formatDate } from '@/lib/utils';
import { AlertTriangle, CheckCheck } from 'lucide-react';
import { Button } from '../common/Button';

export function AlertCard({ alert, onAcknowledge }: { alert: Alert; onAcknowledge?: (id: string) => void }) {
  return (
    <Card className={`border-l-4 ${alert.isRead ? 'border-l-slate-300' : 'border-l-red-500'} hover:shadow-md transition-shadow duration-200`}>
      <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg shrink-0 ${alert.isRead ? 'bg-slate-100 text-slate-400' : 'bg-red-50 text-red-600'}`}>
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5 flex-wrap">
              <h4 className="font-bold text-slate-800">{alert.location}</h4>
              <Badge variant={getRiskVariant(alert.riskLevel)}>{alert.riskLevel}</Badge>
              {alert.isRead && (
                <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm uppercase tracking-wide">
                  Acknowledged
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{alert.message}</p>
            <p className="text-[10px] text-slate-400 font-medium">{formatDate(alert.createdAt)}</p>
          </div>
        </div>

        {!alert.isRead && onAcknowledge && (
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 text-slate-700 hover:text-green-700 hover:bg-green-50 hover:border-green-300"
            onClick={() => onAcknowledge(alert.id)}
          >
            <CheckCheck className="h-4 w-4 mr-1.5" />
            <span>Acknowledge</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
