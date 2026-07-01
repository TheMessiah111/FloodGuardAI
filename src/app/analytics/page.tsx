'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { RainfallChart } from '@/components/dashboard/RainfallChart';
import { PredictionChart } from '@/components/analytics/PredictionChart';
import { AccuracyCard } from '@/components/analytics/AccuracyCard';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Model Analytics"
        description="Verify predictive accuracy index grids and rainfall trend charts"
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          
            <RainfallChart />
            <PredictionChart />
            <AccuracyCard />
          </div>
        </div>
    </DashboardLayout>
  );
}
