'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Weather } from '@/types';

export function useWeather(location?: string) {
  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [singleWeather, setSingleWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (location) {
        const res = await axios.get(`/api/weather?location=${encodeURIComponent(location)}`);
        setSingleWeather(res.data);
      } else {
        const res = await axios.get('/api/weather');
        setWeatherData(res.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load weather data');
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    weatherData,
    singleWeather,
    loading,
    error,
    refetch: fetchWeather,
  };
}
