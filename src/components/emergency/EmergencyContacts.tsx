import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../common/Card';
import { PhoneCall, ShieldAlert, Heart, Flame } from 'lucide-react';
import { Button } from '../common/Button';

const EMERGENCY_CONTACTS = [
  {
    name: 'National Emergency Management Agency (NEMA)',
    phone: '0800-2255-6362',
    address: 'NEMA Headquarters, Plot 8, Adetokunbo Ademola Crescent, Wuse II, Abuja',
    description: 'Federal disaster management response, rescue orchestration, and relief mobilization.',
    icon: ShieldAlert,
    color: 'text-blue-600 bg-blue-50 border-blue-100',
  },
  {
    name: 'Nigeria Police Force (Emergency Response)',
    phone: '112',
    alternatePhone: '0803-300-3300',
    address: 'Regional police commands across flood-prone states.',
    description: 'Public order preservation, security patrols, and community evacuation support.',
    icon: PhoneCall,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
  },
  {
    name: 'Federal Fire Service Command',
    phone: '0803-200-5555',
    alternatePhone: '112',
    address: 'National emergency firefighting and rescue response grid.',
    description: 'Specialist water rescue operations, flood entrapment, and immediate physical extractions.',
    icon: Flame,
    color: 'text-red-600 bg-red-50 border-red-100',
  },
  {
    name: 'State General Hospital & Emergency Relief',
    phone: '0802-345-6789',
    address: 'General Hospital Road, State Capitals (Lokoja, Makurdi, Yenagoa)',
    description: 'First aid treatment, waterborne pathology control, and critical triage centers.',
    icon: Heart,
    color: 'text-green-600 bg-green-50 border-green-100',
  },
];

export function EmergencyContacts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {EMERGENCY_CONTACTS.map((contact, idx) => {
        const Icon = contact.icon;
        return (
          <Card key={idx} className="hover:shadow-md transition-all duration-200 flex flex-col justify-between">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between space-x-4">
                <div className="space-y-1">
                  <CardTitle className="text-base text-slate-800 font-bold">{contact.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-xs">{contact.description}</CardDescription>
                </div>
                <div className={`p-2.5 rounded-xl shrink-0 ${contact.color.split(' ')[0]} ${contact.color.split(' ')[1]}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2 text-xs text-slate-600">
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[9px]">Emergency Phone</span>
                  <span className="text-base font-extrabold text-slate-800 tracking-tight block mt-0.5">{contact.phone}</span>
                  {contact.alternatePhone && (
                    <span className="text-[10px] text-slate-400 font-semibold block">Alt: {contact.alternatePhone}</span>
                  )}
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[9px]">Office Address</span>
                  <span className="font-medium text-slate-500 block leading-relaxed mt-0.5">{contact.address}</span>
                </div>
              </div>
              <div className="pt-2">
                <a href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`} className="w-full block">
                  <Button variant="primary" size="sm" fullWidth className="space-x-2">
                    <PhoneCall className="h-4 w-4" />
                    <span>Dial Hotline</span>
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
