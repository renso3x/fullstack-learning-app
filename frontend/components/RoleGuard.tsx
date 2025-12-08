'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RoleGuard({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: string[];
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) return;
    if (!roles.includes(user.role)) {
      router.push('/unauthorized');
    }
  }, [user, isLoading, roles, router]);

  if (isLoading) return null;
  
  // Don't render children if user doesn't have the right role
  if (user && !roles.includes(user.role)) return null;

  return <>{children}</>;
}
