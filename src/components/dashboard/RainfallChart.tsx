'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../common/Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { CloudRain } from 'lucide-react';

const MOCK_RAINFALL = [
  { month: 'Jan', level: 15 },
  { month: 'Feb', level: 25 },
  { month: 'Mar', level: 55 },
  { month: 'Apr', level: 110 },
  { month: 'May', level: 180 },
  { month: 'Jun', level: 245 },
  { month: 'Jul', level: 310 },
  { month: 'Aug', level: 290 },
  { month: 'Sep', level: 340 },
  { month: 'Oct', level: 220 },
  { month: 'Nov', level: 60 },
  { month: 'Dec', level: 20 },
];

export function RainfallChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="h-full min-h-[300px] flex items-center justify-center">
        <p className="text-sm text-slate-400 font-medium">Loading precipitation data...</p>
      </Card>
    );
  }

  return (
    <Card className="h-full min-h-[300px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Rainfall Trends (2026)</CardTitle>
          <CardDescription>Monthly precipitation readings in mm</CardDescription>
        </div>
        <CloudRain className="h-5 w-5 text-blue-600 animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_RAINFALL} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
              />
              <Bar dataKey="level" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} name="Precipitation" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
