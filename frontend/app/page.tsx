'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeRedirect() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
      return;
    }

    if (user.role === 'learner') {
      router.replace('/learner/dashboard');
    } else {
      router.replace('/faculty/dashboard');
    }
  }, [user]);

  return null;
}
