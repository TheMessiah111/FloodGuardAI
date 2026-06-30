import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../common/Card';
import { Weather } from '@/types';
import { CloudSun, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function WeatherSummary({ weatherData }: { weatherData: Weather[] }) {
  const displayData = weatherData.slice(0, 3);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Regional Weather</CardTitle>
          <CardDescription>Monitored safety stations</CardDescription>
        </div>
        <CloudSun className="h-5 w-5 text-blue-500" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        {displayData.length === 0 ? (
          <p className="text-sm text-slate-400 py-4 text-center">No weather stations online</p>
        ) : (
          <div className="divide-y divide-slate-100 flex-1">
            {displayData.map((station) => (
              <div key={station.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <span className="text-sm font-semibold text-slate-700">{station.location}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-bold text-slate-900">{station.temperature}°C</span>
                  <span className="text-xs text-slate-400 font-medium">{station.rainfall} mm rain</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="pt-2">
          <Link
            href="/map"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View weather map</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
