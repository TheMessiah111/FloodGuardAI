'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from '@/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('floodguard_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('floodguard_user');
        }
      }
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const loggedUser = res.data.user;
      setUser(loggedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('floodguard_user', JSON.stringify(loggedUser));
      }
      return loggedUser;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Authentication failed';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/auth/register', data);
      return res.data;
    } catch (err: any) {
      const errMsg = err.response?.data?.error || 'Registration failed';
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('floodguard_user');
    }
    // Clear cookie by calling a logout endpoint or document cookie deletion
    document.cookie = 'token=; Max-Age=0; path=/;';
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
