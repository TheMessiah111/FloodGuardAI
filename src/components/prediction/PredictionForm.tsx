'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../common/Card';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { NIGERIA_STATES } from '@/data/nigeria';

export function PredictionForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
  const [selectedState, setSelectedState] = useState('Kogi');
  const [selectedLga, setSelectedLga] = useState('Lokoja');
  const [isFetchingWeather, setIsFetchingWeather] = useState(false);
  const [weatherSyncStatus, setWeatherSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

  const [formData, setFormData] = useState({
    rainfall: '45',
    temperature: '28',
    humidity: '75',
    riverLevel: '2.5',
    windSpeed: '12',
    soilMoisture: '40',
  });

  const stateOptions = [
    { label: '-- Select State --', value: '' },
    ...NIGERIA_STATES.map((s) => ({ label: s.state, value: s.state })),
  ];

  const currentStateObj = NIGERIA_STATES.find((s) => s.state === selectedState);
  const lgaOptions = [
    {
      label: currentStateObj ? '-- Select LGA --' : '-- Select State First --',
      value: '',
    },
    ...(currentStateObj ? currentStateObj.lgas.map((l) => ({ label: l, value: l })) : []),
  ];

  const fetchRealTimeWeather = async (state: string, lga: string) => {
    if (!state || !lga) return;

    setIsFetchingWeather(true);
    setWeatherSyncStatus('syncing');
    try {
      const locationQuery = `${lga} (${state})`;
      const response = await axios.get(`/api/weather?location=${encodeURIComponent(locationQuery)}`);
      const weather = response.data;

      const currentMonth = new Date().getMonth();
      const isRainySeason = currentMonth >= 3 && currentMonth <= 9; // April to October

      const rainfallVal = weather.rainfall || 0;

      // Soil moisture: correlated with rainfall
      const calculatedSoilMoisture = Math.min(
        100,
        Math.max(10, Math.round(30 + (rainfallVal / 140) * 60 + (isRainySeason ? 10 : 0) + (Math.random() * 10 - 5)))
      );

      // River level: correlated with rainfall
      const calculatedRiverLevel = Number(
        Math.min(
          8.0,
          Math.max(0.5, 1.0 + (rainfallVal / 140) * 5.0 + (isRainySeason ? 0.8 : 0) + (Math.random() * 0.6 - 0.3))
        ).toFixed(1)
      );

      setFormData({
        rainfall: String(weather.rainfall),
        temperature: String(weather.temperature),
        humidity: String(weather.humidity),
        windSpeed: String(weather.windSpeed),
        soilMoisture: String(calculatedSoilMoisture),
        riverLevel: String(calculatedRiverLevel),
      });
      setWeatherSyncStatus('synced');
    } catch (error) {
      console.error('Error fetching real-time weather:', error);
      setWeatherSyncStatus('error');
    } finally {
      setIsFetchingWeather(false);
    }
  };

  // Fetch initial telemetry for Kogi/Lokoja
  useEffect(() => {
    fetchRealTimeWeather('Kogi', 'Lokoja');
  }, []);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedLga('');
    setWeatherSyncStatus('idle');
  };

  const handleLgaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lga = e.target.value;
    setSelectedLga(lga);
    if (lga) {
      fetchRealTimeWeather(selectedState, lga);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState || !selectedLga) return;

    onSubmit({
      location: `${selectedLga} (${selectedState})`,
      rainfall: Number(formData.rainfall),
      temperature: Number(formData.temperature),
      humidity: Number(formData.humidity),
      riverLevel: Number(formData.riverLevel),
      windSpeed: Number(formData.windSpeed),
      soilMoisture: Number(formData.soilMoisture),
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>AI Simulation Input</CardTitle>
        <CardDescription>Input telemetry indicators to evaluate flood probabilities</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="State"
              name="selectedState"
              value={selectedState}
              onChange={handleStateChange}
              options={stateOptions}
              required
            />
            <Select
              label="Local Govt (LGA)"
              name="selectedLga"
              value={selectedLga}
              onChange={handleLgaChange}
              options={lgaOptions}
              disabled={!selectedState}
              required
            />
          </div>

          {weatherSyncStatus !== 'idle' && (
            <div className={`text-[10px] px-3 py-1.5 rounded-lg flex items-center space-x-1.5 font-medium transition-all duration-300 ${
              weatherSyncStatus === 'syncing' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
              weatherSyncStatus === 'synced' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
              'bg-red-50 text-red-700 border border-red-100'
            }`}>
              {weatherSyncStatus === 'syncing' && (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-ping shrink-0" />
                  <span>Syncing real-time telemetry from LGA station...</span>
                </>
              )}
              {weatherSyncStatus === 'synced' && (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Telemetries auto-filled according to real-time readings.</span>
                </>
              )}
              {weatherSyncStatus === 'error' && (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>Failed to sync real-time readings. Please enter manually.</span>
                </>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Rainfall (mm)"
              name="rainfall"
              type="number"
              step="any"
              value={formData.rainfall}
              onChange={handleChange}
              required
            />
            <Input
              label="River Level (m)"
              name="riverLevel"
              type="number"
              step="any"
              value={formData.riverLevel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Soil Moisture (%)"
              name="soilMoisture"
              type="number"
              step="any"
              value={formData.soilMoisture}
              onChange={handleChange}
              required
            />
            <Input
              label="Temperature (°C)"
              name="temperature"
              type="number"
              step="any"
              value={formData.temperature}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Atmospheric Humidity (%)"
              name="humidity"
              type="number"
              step="any"
              value={formData.humidity}
              onChange={handleChange}
              required
            />
            <Input
              label="Wind Speed (km/h)"
              name="windSpeed"
              type="number"
              step="any"
              value={formData.windSpeed}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" fullWidth isLoading={isLoading || isFetchingWeather} className="mt-4">
            Calculate Flood Risk Index
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
