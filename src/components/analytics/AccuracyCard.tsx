import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../common/Card';

export function AccuracyCard() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle>AI Model Verification</CardTitle>
        <CardDescription>Accuracy and validation index</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-700">Predictive Accuracy</h4>
            <p className="text-xs text-slate-500 font-medium">Against historical community occurrences</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-blue-600">94.2%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-slate-400">Mean Absolute Error</p>
            <p className="text-base font-bold text-slate-800 mt-1">2.41%</p>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-slate-400">RMSE Index</p>
            <p className="text-base font-bold text-slate-800 mt-1">3.15%</p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Confusion Matrix Rates</h4>
          <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-xl overflow-hidden text-xs">
            <div className="flex justify-between p-3 bg-white">
              <span className="text-slate-500 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span>True Positives (Recall)</span>
              </span>
              <span className="font-semibold text-slate-800">96.8%</span>
            </div>
            <div className="flex justify-between p-3 bg-white">
              <span className="text-slate-500 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>True Negatives (Specificity)</span>
              </span>
              <span className="font-semibold text-slate-800">91.6%</span>
            </div>
            <div className="flex justify-between p-3 bg-white">
              <span className="text-slate-500 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>False Positives (Type I Error)</span>
              </span>
              <span className="font-semibold text-slate-800">3.2%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
