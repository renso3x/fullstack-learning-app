'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMetrics } from '@/api/admin';
import Protected from '@/components/Protected';
import RoleGuard from '@/components/RoleGuard';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

export default function FacultyDashboard() {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
  });


  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Failed to load data" />;

  return (
    <Protected>
      <RoleGuard roles={['faculty', 'admin']}>
        <div className="container py-8 space-y-8">
          <h1 className="text-3xl font-semibold">Faculty Dashboard</h1>

          {isLoading && <p>Loading metrics...</p>}

          {metrics && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-sm uppercase text-gray-500">
                  Total Learners
                </h3>
                <p className="text-3xl font-bold">{metrics.totalLearners}</p>
              </div>

              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-sm uppercase text-gray-500">Total Scans</h3>
                <p className="text-3xl font-bold">{metrics.totalScans}</p>
              </div>

              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-sm uppercase text-gray-500">Courses</h3>
                <p className="text-3xl font-bold">{metrics.totalCourses}</p>
              </div>
            </div>
          )}

          {/* Link to learners */}
          <a href="/faculty/learners" className="text-blue-600 underline block">
            View Learners →
          </a>

          {/* Link to courses admin */}
          <a href="/faculty/courses" className="text-blue-600 underline block">
            Manage Courses →
          </a>

          {/* Link to scan logs */}
          <a
            href="/faculty/scan-logs"
            className="text-blue-600 underline block"
          >
            View Scan Logs →
          </a>
        </div>
      </RoleGuard>
    </Protected>
  );
}
