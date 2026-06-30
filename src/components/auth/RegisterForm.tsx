'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../common/Card';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { NIGERIA_STATES } from '@/data/nigeria';
import Link from 'next/link';

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    state: '',
    lga: '',
    community: '',
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const stateOptions = [
    { label: '-- Select State --', value: '' },
    ...NIGERIA_STATES.map((s) => ({ label: s.state, value: s.state })),
  ];

  const currentStateObj = NIGERIA_STATES.find((s) => s.state === formData.state);
  const lgaOptions = [
    {
      label: currentStateObj ? '-- Select LGA --' : '-- Select State First --',
      value: '',
    },
    ...(currentStateObj ? currentStateObj.lgas.map((l) => ({ label: l, value: l })) : []),
  ];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      state: e.target.value,
      lga: '', // Reset LGA when state changes
    });
  };

  const handleLgaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      lga: e.target.value,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, password, phone, state, lga, community } = formData;
    
    if (!name || !email || !password || !phone || !state || !lga || !community) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await register(formData);
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check inputs.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-slate-800">Register Profile</CardTitle>
        <CardDescription className="text-center">
          Create an account to track regional predictions and receive warnings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="name"
              placeholder="e.g. Samuel Adebayo"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="samuel@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone Number"
              name="phone"
              placeholder="e.g. 08012345678"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Select
              label="State"
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              options={stateOptions}
              required
            />
            <Select
              label="LGA"
              name="lga"
              value={formData.lga}
              onChange={handleLgaChange}
              options={lgaOptions}
              disabled={!formData.state}
              required
            />
            <Input
              label="Community Name"
              name="community"
              placeholder="Adankolo"
              value={formData.community}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" fullWidth isLoading={isLoading} className="mt-4">
            Register Account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-xs text-slate-500 font-medium">
          Already registered?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login Here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
