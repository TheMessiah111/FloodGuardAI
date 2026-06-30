'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { WeatherSummary } from '@/components/dashboard/WeatherSummary';
import { RiskOverview } from '@/components/dashboard/RiskOverview';
import { RecentPredictions } from '@/components/dashboard/RecentPredictions';
import { LatestAlerts } from '@/components/dashboard/LatestAlerts';
import { RainfallChart } from '@/components/dashboard/RainfallChart';
import { FloodMapPreview } from '@/components/dashboard/FloodMapPreview';
import { useDashboard } from '@/hooks/useDashboard';
import { useWeather } from '@/hooks/useWeather';
import { Loading } from '@/components/common/Loading';
import { ErrorState } from '@/components/common/ErrorState';

export default function DashboardPage() {
  const { stats, loading: statsLoading, error: statsError, refetch: refetchStats } = useDashboard();
  const { weatherData, loading: weatherLoading, error: weatherError, refetch: refetchWeather } = useWeather();

  const handleRetry = () => {
    refetchStats();
    refetchWeather();
  };

  if (statsLoading || weatherLoading) {
    return (
      <DashboardLayout>
        <Loading message="Syncing community telemetry sensors..." />
      </DashboardLayout>
    );
  }

  if (statsError || weatherError || !stats) {
    return (
      <DashboardLayout>
        <ErrorState
          message={statsError || weatherError || 'Unable to load dashboard configuration.'}
          onRetry={handleRetry}
        />
      </DashboardLayout>
    );
  }

  // Count risk categories for RiskOverview from recent predictions
  // Default values to seed the display if predictions are empty
  let low = 3, med = 2, high = 2, crit = 1;
  
  if (stats.recentPredictions && stats.recentPredictions.length > 0) {
    low = stats.recentPredictions.filter((p) => p.riskLevel === 'LOW').length;
    med = stats.recentPredictions.filter((p) => p.riskLevel === 'MEDIUM').length;
    high = stats.recentPredictions.filter((p) => p.riskLevel === 'HIGH').length;
    crit = stats.recentPredictions.filter((p) => p.riskLevel === 'CRITICAL').length;
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Control Panel"
        description="Hydro-meteorological early warning system for Nigerian communities"
      />

      <div className="space-y-6">
        {/* Stats Section */}
        <DashboardStats
          totalPredictions={stats.totalPredictions}
          activeAlerts={stats.activeAlerts}
          averageRiskPercentage={stats.averageRiskPercentage}
          criticalCommunitiesCount={stats.criticalCommunitiesCount}
        />

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            <RainfallChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecentPredictions predictions={stats.recentPredictions} />
              <LatestAlerts alerts={stats.latestAlerts} />
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <RiskOverview
              lowCount={low}
              mediumCount={med}
              highCount={high}
              criticalCount={crit}
            />
            <WeatherSummary weatherData={weatherData} />
            <FloodMapPreview />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
