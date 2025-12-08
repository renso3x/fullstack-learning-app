'use client';

import { useState } from 'react';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import GuestOnly from '@/components/GuestOnly';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      const { user, token } = res.data;

      login(user, token);

      if (user.role === 'faculty' || user.role === 'admin') {
        router.push('/faculty/dashboard');
      } else {
        router.push('/learner/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  }

  return (
    <GuestOnly>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg p-8 rounded-xl space-y-4"
        >
          <h1 className="text-2xl font-semibold text-center">Login</h1>

          {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-full">Login</button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
    </GuestOnly>
  );
}
