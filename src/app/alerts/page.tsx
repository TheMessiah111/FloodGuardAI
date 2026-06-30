'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { AlertList } from '@/components/alerts/AlertList';
import { useAlerts } from '@/hooks/useAlerts';
import { Loading } from '@/components/common/Loading';
import { ErrorState } from '@/components/common/ErrorState';

export default function AlertsPage() {
  const { alerts, loading, error, markAsRead, refetch } = useAlerts();

  return (
    <DashboardLayout>
      <PageHeader
        title="Emergency Warnings"
        description="Review auto-triggered flood warnings and hazard dispatches"
      />

      <div className="space-y-6">
        {loading ? (
          <Loading message="Checking community alert feeds..." />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <AlertList alerts={alerts} onAcknowledge={markAsRead} />
        )}
      </div>
    </DashboardLayout>
  );
}
