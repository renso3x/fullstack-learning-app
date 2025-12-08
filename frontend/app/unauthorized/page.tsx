'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleGoToDashboard = () => {
    if (user?.role === 'faculty' || user?.role === 'admin') {
      router.push('/faculty/dashboard');
    } else if (user?.role === 'learner') {
      router.push('/learner/dashboard');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-xl space-y-6 text-center">
        <div className="text-6xl">🚫</div>
        <h1 className="text-2xl font-semibold">Access Denied</h1>
        <p className="text-gray-600">
          You don't have permission to access this page.
        </p>

        <div className="flex gap-3 justify-center">
          <button onClick={handleGoToDashboard} className="btn btn-primary">
            Go to Dashboard
          </button>
          <button onClick={logout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
