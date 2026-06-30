'use client';

import React, { useEffect, useRef } from 'react';
import { Community } from '@/types';
import 'leaflet/dist/leaflet.css';

export function FloodMap({ communities }: { communities: Community[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current && !mapInstance.current) {
      // Import leaflet dynamically
      import('leaflet').then((leafletModule) => {
        if (mapInstance.current) return;
        const L = leafletModule.default || leafletModule;
        
        const container = mapRef.current;
        if (!container || (container as any)._leaflet_id) return;

        // Focus centered on Nigerian River Niger/Benue confluence area
        const map = L.map(container).setView([7.8023, 6.7420], 6.5);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        mapInstance.current = map;

        communities.forEach((c) => {
          let markerColor = '#22c55e'; // LOW
          if (c.riskLevel === 'MEDIUM') markerColor = '#eab308';
          if (c.riskLevel === 'HIGH') markerColor = '#f97316';
          if (c.riskLevel === 'CRITICAL') markerColor = '#ef4444';

          const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="
              background-color: ${markerColor};
              width: 14px;
              height: 14px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 1px 4px rgba(0,0,0,0.3);
              ${c.riskLevel === 'CRITICAL' ? 'animation: pulse-ring 1.5s infinite;' : ''}
            "></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          });

          const popupContent = `
            <div style="font-family: system-ui, sans-serif; width: 160px; padding: 2px;">
              <h4 style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #1e293b; text-transform: uppercase;">${c.name}</h4>
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b;">${c.lga} LGA, ${c.state} State</p>
              <div style="
                background-color: ${markerColor}15;
                color: ${markerColor};
                border: 1px solid ${markerColor};
                display: inline-block;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                font-weight: 700;
                text-transform: uppercase;
                margin-bottom: 2px;
              ">Risk: ${c.riskLevel}</div>
              <p style="margin: 6px 0 0 0; font-size: 9px; color: #94a3b8;">Coords: ${c.latitude.toFixed(4)}, ${c.longitude.toFixed(4)}</p>
            </div>
          `;

          L.marker([c.latitude, c.longitude], { icon: customIcon })
            .bindPopup(popupContent)
            .addTo(map);
        });

      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [communities]);

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
      <div ref={mapRef} className="w-full h-full z-10" />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}} />

      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs px-3.5 py-2.5 rounded-lg shadow-md border border-slate-200/80 z-20 space-y-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
        <div className="text-[11px] border-b border-slate-100 pb-1 mb-1 font-extrabold text-slate-800">
          Risk Key
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500 border border-white" />
          <span>Critical Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-orange-500 border border-white" />
          <span>High Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-yellow-500 border border-white" />
          <span>Moderate Risk</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-green-500 border border-white" />
          <span>Low Risk</span>
        </div>
      </div>
    </div>
  );
}
export default FloodMap;
