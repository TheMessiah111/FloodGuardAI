import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../common/Card';
import { Map, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function FloodMapPreview() {
  return (
    <Card className="flex flex-col h-full bg-slate-50 border-blue-100 hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-800 flex items-center space-x-2">
          <Map className="h-5 w-5 text-blue-600" />
          <span>Interactive GIS Map</span>
        </CardTitle>
        <CardDescription>Visual risk monitoring coordinates</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-4">
        <div className="relative h-32 rounded-lg bg-blue-100 border border-blue-200 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
          <div className="absolute w-full h-4 bg-blue-500/30 blur-[2px] top-1/2 left-0 transform -translate-y-1/2 rotate-[-5deg]" />
          <span className="absolute text-[8px] tracking-wider text-blue-600 font-bold uppercase top-1/3 left-1/3 transform -rotate-[5deg]">
            RIVER RUNOFF CHANNEL
          </span>
          <span className="absolute top-[30%] left-[20%] w-2 h-2 rounded-full bg-green-500 border border-white" />
          <span className="absolute top-[60%] left-[55%] w-2.5 h-2.5 rounded-full bg-red-500 border border-white animate-ping" />
          <span className="absolute top-[60%] left-[55%] w-2.5 h-2.5 rounded-full bg-red-500 border border-white" />
          <span className="absolute top-[45%] left-[80%] w-2 h-2 rounded-full bg-yellow-500 border border-white" />
          <span className="text-[10px] font-bold text-slate-500 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-sm z-10">
            OpenStreetMap GIS Active
          </span>
        </div>

        <div className="pt-2">
          <Link
            href="/map"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Launch interactive map</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
