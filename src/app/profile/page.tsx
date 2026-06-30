'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/common/Card';
import { User, Mail, Phone, MapPin, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <DashboardLayout>
      <PageHeader
        title="Surveillance Zone Settings"
        description="Review credentials and geographical surveillance locations"
      />

      <div className="max-w-xl mx-auto space-y-6">
        <Card className="shadow-md">
          <CardHeader className="bg-slate-50 border-b border-slate-200/60 pb-5">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600 text-white rounded-full">
                <User className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-slate-800 text-lg font-bold">{user.name}</CardTitle>
                <CardDescription>System Access Profile</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-sm text-slate-600">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Email Address</span>
                  <span className="font-semibold text-slate-800 block mt-0.5">{user.email}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-4.5 w-4.5 text-slate-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Phone Number</span>
                  <span className="font-semibold text-slate-800 block mt-0.5">{user.phone}</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-100 my-4" />

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                <span>Monitored Surveillance Zone</span>
              </h4>
              <div className="grid grid-cols-3 gap-4 bg-slate-50 border border-slate-200/60 p-4 rounded-xl">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">State</span>
                  <span className="font-bold text-slate-800 block mt-0.5">{user.state}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">LGA</span>
                  <span className="font-bold text-slate-800 block mt-0.5">{user.lga}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Community</span>
                  <span className="font-bold text-slate-800 block mt-0.5">{user.community}</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-100 my-4" />

            <div className="flex items-center space-x-3 text-slate-555">
              <Calendar className="h-4.5 w-4.5 text-slate-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Registered Since</span>
                <span className="font-medium text-slate-650 block mt-0.5">{formatDate(user.createdAt)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-between bg-slate-50 border-t border-slate-100 p-4">
            <span className="text-xs text-slate-400 font-medium">CS Research Terminal v1.0</span>
            <Button variant="danger" size="sm" className="space-x-1.5" onClick={logout}>
              <LogOut className="h-4 w-4" />
              <span>Sign Out Account</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
