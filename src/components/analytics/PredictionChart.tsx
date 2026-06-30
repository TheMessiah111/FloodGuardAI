'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../common/Card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity } from 'lucide-react';

const MOCK_PREDICTION_RISK = [
  { week: 'Wk 1', avgRisk: 15 },
  { week: 'Wk 2', avgRisk: 22 },
  { week: 'Wk 3', avgRisk: 35 },
  { week: 'Wk 4', avgRisk: 42 },
  { week: 'Wk 5', avgRisk: 68 },
  { week: 'Wk 6', avgRisk: 78 },
  { week: 'Wk 7', avgRisk: 88 },
  { week: 'Wk 8', avgRisk: 82 },
  { week: 'Wk 9', avgRisk: 65 },
  { week: 'Wk 10', avgRisk: 45 },
  { week: 'Wk 11', avgRisk: 30 },
  { week: 'Wk 12', avgRisk: 25 },
];

export function PredictionChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="h-full min-h-[300px] flex items-center justify-center">
        <p className="text-sm text-slate-400 font-medium">Loading prediction chart...</p>
      </Card>
    );
  }

  return (
    <Card className="h-full min-h-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Historical Risk Indexes</CardTitle>
          <CardDescription>Average calculated risk levels over last 12 weeks</CardDescription>
        </div>
        <Activity className="h-5 w-5 text-indigo-600" />
      </CardHeader>
      <CardContent>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_PREDICTION_RISK} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
              />
              <Line type="monotone" dataKey="avgRisk" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Risk Level %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
