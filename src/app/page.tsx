import React from 'react';
import Link from 'next/link';
import { Map, Brain, PhoneCall, BarChart3, BellRing, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <img src="/logo.png" alt="Logo" className="h-7 w-7 object-contain rounded-md" />
          <span className="text-xl font-bold tracking-tight text-white">FloodGuard AI</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="px-4 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-md shadow-blue-500/10">
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col items-center justify-center text-center space-y-8">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold">
          <BellRing className="h-3.5 w-3.5" />
          <span>Early Warning Warning System Active</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight md:leading-none">
          AI-Based Early Warning System for{' '}
          <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Flood Prediction
          </span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          A Computer Science penultimate year research project utilizing hydro-meteorological telemetries and heuristic predictions to safeguard local Nigerian communities along active river basins.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-lg shadow-blue-500/20 group cursor-pointer"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 font-semibold border border-slate-700 hover:bg-slate-800 text-white rounded-lg transition-all cursor-pointer"
          >
            <span>Model Simulation</span>
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-16">
          <div className="p-6 bg-slate-800/50 border border-slate-700/60 rounded-2xl text-left space-y-4 hover:border-blue-500/30 transition-colors">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-white text-base">Predictive Intelligence</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzes rainfall, river runoff levels, and soil saturation to calculate warning indices.
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 border border-slate-700/60 rounded-2xl text-left space-y-4 hover:border-blue-500/30 transition-colors">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
              <Map className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-white text-base">GIS Spatial Mapping</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Geographic monitoring mapping high-risk zones across Nigeria using OpenStreetMap coordinates.
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 border border-slate-700/60 rounded-2xl text-left space-y-4 hover:border-blue-500/30 transition-colors">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-white text-base">Model Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tracks precipitation histories, prediction frequencies, and accuracy indexes for verification.
            </p>
          </div>

          <div className="p-6 bg-slate-800/50 border border-slate-700/60 rounded-2xl text-left space-y-4 hover:border-blue-500/30 transition-colors">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
              <PhoneCall className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-white text-base">Emergency Grid</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Facilitates direct hotlines and evacuation links to civil agencies (NEMA, Police, medical teams).
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-slate-800/80 bg-slate-950 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Computer Science Final Year Project — FloodGuard AI © 2026</p>
          <p className="hover:text-slate-400 transition-colors">Preparedness through predictive engineering</p>
        </div>
      </footer>
    </div>
  );
}
