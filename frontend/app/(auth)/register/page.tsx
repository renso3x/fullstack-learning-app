'use client';

import { useState } from 'react';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import GuestOnly from '@/components/GuestOnly';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      const { user, token } = res.data;

      login(user, token);

      // Learners are redirected to learner dashboard by default
      router.push('/learner/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <GuestOnly>
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg p-8 rounded-xl space-y-4"
        >
          <h1 className="text-2xl font-semibold text-center">Register</h1>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            className="input"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-full">Create Account</button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </GuestOnly>
  );
}
