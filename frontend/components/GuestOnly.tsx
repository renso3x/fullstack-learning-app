'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect based on user role
      if (user.role === 'faculty' || user.role === 'admin') {
        router.push('/faculty/dashboard');
      } else {
        router.push('/learner/dashboard');
      }
    }
  }, [user, isLoading, router]);

  // Show nothing while checking auth or if user is logged in
  if (isLoading || user) {
    return null;
  }

  return <>{children}</>;
}
