'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { PredictionForm } from '@/components/prediction/PredictionForm';
import { PredictionResult } from '@/components/prediction/PredictionResult';
import { usePrediction } from '@/hooks/usePrediction';
import { Prediction } from '@/types';
import { AlertCircle } from 'lucide-react';

export default function PredictionPage() {
  const { predict, loading, error } = usePrediction();
  const [result, setResult] = useState<Prediction | null>(null);

  const handlePredictSubmit = async (data: any) => {
    try {
      const res = await predict(data);
      setResult(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Predictive Modeling"
        description="Compute regional hazard indicators and emergency response protocols"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <PredictionForm onSubmit={handlePredictSubmit} isLoading={loading} />
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {result ? (
            <PredictionResult prediction={result} />
          ) : (
            <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white flex flex-col items-center justify-center space-y-3">
              <div className="p-4 bg-blue-50 text-blue-500 rounded-full">
                <svg className="h-8 w-8 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800">Ready for Simulation</h3>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Provide hydro-meteorological parameters in the input panel and evaluate critical regional flood threats.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
