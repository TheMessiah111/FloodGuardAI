'use client';

import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="flex items-center space-x-2.5 mb-8">
        <img src="/logo.png" alt="Logo" className="h-8 w-8 object-contain rounded-md" />
        <span className="text-2xl font-bold tracking-tight text-slate-800">FloodGuard AI</span>
      </div>
      <LoginForm />
      <div className="text-center mt-6">
        <Link href="/" className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
