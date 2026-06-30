'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Alert } from '@/types';

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/alerts');
      setAlerts(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch alerts');
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await axios.patch('/api/alerts', { id });
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
      );
    } catch (err: any) {
      console.error('Failed to mark alert as read', err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  return {
    alerts,
    loading,
    error,
    markAsRead,
    refetch: fetchAlerts,
  };
}
