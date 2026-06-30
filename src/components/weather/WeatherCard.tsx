import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../common/Card';
import { Weather } from '@/types';
import { CloudRain, Wind, Compass, Droplet, RefreshCw } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function WeatherCard({ weather }: { weather: Weather }) {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-0 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base text-slate-800">{weather.location}</CardTitle>
            <CardDescription>Meteorological Report</CardDescription>
          </div>
          <CloudRain className="h-8 w-8 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent className="pt-5 space-y-4">
        <div className="flex items-baseline space-x-1">
          <span className="text-4xl font-extrabold text-slate-900">{weather.temperature}</span>
          <span className="text-xl font-bold text-slate-500">°C</span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center space-x-2">
            <Droplet className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Humidity</p>
              <p className="text-sm font-semibold text-slate-700">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <CloudRain className="h-5 w-5 text-indigo-500" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Rainfall</p>
              <p className="text-sm font-semibold text-slate-700">{weather.rainfall} mm</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-emerald-500" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Wind</p>
              <p className="text-sm font-semibold text-slate-700">{weather.windSpeed} km/h</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Compass className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Pressure</p>
              <p className="text-sm font-semibold text-slate-700">{weather.pressure} hPa</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-100 font-medium">
          <div className="flex items-center space-x-1">
            <RefreshCw className="h-3 w-3 animate-spin-slow" />
            <span>Updated: {formatDate(weather.updatedAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
