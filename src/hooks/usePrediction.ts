'use client';

import { useState, useCallback } from 'react';
import axios from 'axios';
import { Prediction } from '@/types';

export function usePrediction() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(async (data: {
    location: string;
    rainfall: number;
    temperature: number;
    humidity: number;
    riverLevel: number;
    windSpeed: number;
    soilMoisture: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/predict', data);
      const prediction = res.data;
      setPredictions((prev) => [prediction, ...prev]);
      return prediction;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Flood prediction calculation failed';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    predict,
    predictions,
    loading,
    error,
  };
}
