import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../common/Card';
import { Prediction } from '@/types';
import { RiskMeter } from './RiskMeter';
import { RecommendationCard } from './RecommendationCard';
import { Droplet, Wind, CloudRain, Thermometer } from 'lucide-react';

export function PredictionResult({ prediction }: { prediction: Prediction }) {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-50 border-b border-slate-200/60">
        <CardTitle className="text-slate-800">Model Evaluation Results</CardTitle>
        <CardDescription>AI prediction calculated successfully</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <RiskMeter
              percentage={prediction.riskPercentage}
              level={prediction.riskLevel}
              confidence={prediction.confidenceScore}
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <RecommendationCard
              level={prediction.riskLevel}
              message={prediction.message}
              action={prediction.recommendedAction}
              location={prediction.location}
            />

            <div className="p-4 border border-slate-100 rounded-xl space-y-3">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Parameters Evaluated</h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="flex items-center space-x-2">
                  <CloudRain className="h-4 w-4 text-blue-500 shrink-0" />
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[9px]">Rainfall</p>
                    <p className="font-bold text-slate-700">{prediction.rainfall} mm</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplet className="h-4 w-4 text-blue-500 shrink-0" />
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[9px]">River Level</p>
                    <p className="font-bold text-slate-700">{prediction.riverLevel} m</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplet className="h-4 w-4 text-indigo-500 shrink-0" />
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[9px]">Soil Moisture</p>
                    <p className="font-bold text-slate-700">{prediction.soilMoisture}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="h-4 w-4 text-slate-500 shrink-0" />
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[9px]">Wind Speed</p>
                    <p className="font-bold text-slate-700">{prediction.windSpeed} km/h</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplet className="h-4 w-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[9px]">Humidity</p>
                    <p className="font-bold text-slate-700">{prediction.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-slate-400 font-semibold uppercase text-[9px]">Temperature</p>
                    <p className="font-bold text-slate-700">{prediction.temperature}°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
