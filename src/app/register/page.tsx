'use client';

import React from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="flex items-center space-x-2.5 mb-8">
        <ShieldAlert className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold tracking-tight text-slate-800">FloodGuard AI</span>
      </div>
      <RegisterForm />
      <div className="text-center mt-6">
        <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
