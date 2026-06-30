'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Community } from '@/types';
import { Loading } from '@/components/common/Loading';
import { ErrorState } from '@/components/common/ErrorState';

const FloodMap = dynamic(() => import('@/components/map/FloodMap'), {
  ssr: false,
  loading: () => <Loading message="Initialising GIS Map renderer..." />,
});

export default function MapPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunities = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/communities');
      setCommunities(res.data);
    } catch {
      setError('Failed to retrieve community markers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return (
    <DashboardLayout>
      <PageHeader
        title="Interactive GIS Map"
        description="Geographic threat level markers across susceptible Nigerian water basins"
      />

      <div className="space-y-6">
        {loading ? (
          <Loading message="Syncing geographic station coordinates..." />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchCommunities} />
        ) : (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <FloodMap communities={communities} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
