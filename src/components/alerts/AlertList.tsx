'use client';

import React, { useState } from 'react';
import { Alert } from '@/types';
import { AlertCard } from './AlertCard';
import { EmptyState } from '../common/EmptyState';
import { AlertTriangle, CheckSquare } from 'lucide-react';

export function AlertList({
  alerts,
  onAcknowledge,
}: {
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
}) {
  const [filter, setFilter] = useState<'active' | 'acknowledged'>('active');

  const filteredAlerts = alerts.filter((alert) =>
    filter === 'active' ? !alert.isRead : alert.isRead
  );

  return (
    <div className="space-y-4">
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
            filter === 'active'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          <span>Active Warnings ({alerts.filter((a) => !a.isRead).length})</span>
        </button>
        <button
          onClick={() => setFilter('acknowledged')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors cursor-pointer flex items-center space-x-2 ${
            filter === 'acknowledged'
              ? 'border-slate-800 text-slate-800'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <CheckSquare className="h-4 w-4" />
          <span>Acknowledged ({alerts.filter((a) => a.isRead).length})</span>
        </button>
      </div>

      {filteredAlerts.length === 0 ? (
        <EmptyState
          title={filter === 'active' ? 'All Clear!' : 'No Acknowledged Warnings'}
          description={
            filter === 'active'
              ? 'There are no active flood hazard warning logs.'
              : 'You have not marked any warnings as acknowledged.'
          }
          icon={AlertTriangle}
        />
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onAcknowledge={onAcknowledge} />
          ))}
        </div>
      )}
    </div>
  );
}
