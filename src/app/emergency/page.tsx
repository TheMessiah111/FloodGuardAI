'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { EmergencyContacts } from '@/components/emergency/EmergencyContacts';

export default function EmergencyPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Emergency Contacts"
        description="Immediate dispatch channels for disaster management and safety relief"
      />

      <div className="space-y-6">
        <EmergencyContacts />
      </div>
    </DashboardLayout>
  );
}
