'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const HIDE_ON = ['/login', '/register'];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Hide navbar on auth pages
  if (HIDE_ON.includes(pathname)) return null;

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="container flex items-center justify-between py-3">
        {/* Left side: brand + links */}
        <div className="flex items-center gap-6">
          <Link
            href={user ? '/' : '/login'}
            className="font-bold text-blue-700"
          >
            POCUS Learning
          </Link>

          {user && user.role === 'learner' && (
            <div className="flex gap-4 text-sm">
              <Link href="/learner/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/learner/scan-logs" className="hover:underline">
                My Scan Logs
              </Link>
            </div>
          )}

          {user && (user.role === 'faculty' || user.role === 'admin') && (
            <div className="flex gap-4 text-sm">
              <Link href="/faculty/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/faculty/learners" className="hover:underline">
                Learners
              </Link>
              <Link href="/faculty/courses" className="hover:underline">
                Courses
              </Link>
              <Link href="/faculty/scan-logs" className="hover:underline">
                Scan Logs
              </Link>
            </div>
          )}
        </div>

        {/* Right side: user & logout */}
        <div className="flex items-center gap-4 text-sm">
          {user && (
            <>
              <span className="text-gray-600">
                {user.name} ({user.role})
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
