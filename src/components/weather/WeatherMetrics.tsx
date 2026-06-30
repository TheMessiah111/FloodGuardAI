import React from 'react';
import { Card, CardContent } from '../common/Card';
import { Weather } from '@/types';
import { CloudRain, Thermometer, Droplet, Wind } from 'lucide-react';

export function WeatherMetrics({ weatherData }: { weatherData: Weather[] }) {
  if (!weatherData || weatherData.length === 0) return null;

  const avgTemp = Math.round(weatherData.reduce((acc, w) => acc + w.temperature, 0) / weatherData.length);
  const avgHumidity = Math.round(weatherData.reduce((acc, w) => acc + w.humidity, 0) / weatherData.length);
  const maxRainfall = Math.max(...weatherData.map((w) => w.rainfall));
  const avgWind = Math.round(weatherData.reduce((acc, w) => acc + w.windSpeed, 0) / weatherData.length);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="flex items-center space-x-4 p-5">
          <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
            <Thermometer className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Avg Temp</p>
            <h3 className="text-xl font-bold text-slate-800">{avgTemp}°C</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center space-x-4 p-5">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
            <Droplet className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Avg Humidity</p>
            <h3 className="text-xl font-bold text-slate-800">{avgHumidity}%</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center space-x-4 p-5">
          <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
            <CloudRain className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Max Rainfall</p>
            <h3 className="text-xl font-bold text-slate-800">{maxRainfall} mm</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center space-x-4 p-5">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <Wind className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase">Avg Wind</p>
            <h3 className="text-xl font-bold text-slate-800">{avgWind} km/h</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
