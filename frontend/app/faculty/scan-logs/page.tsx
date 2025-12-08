'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchAllScanLogs, fetchCoursesAdmin } from '@/api/admin';
import Protected from '@/components/Protected';
import RoleGuard from '@/components/RoleGuard';

export default function ScanLogsAdminPage() {
  const params = useSearchParams();
  const userId = params.get('userId') || undefined;
  const courseId = params.get('courseId') || undefined;

  const { data: courses } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: fetchCoursesAdmin,
  });

  const { data: logs, isLoading } = useQuery({
    queryKey: ['admin-scan-logs', userId, courseId],
    queryFn: () =>
      fetchAllScanLogs({
        userId,
        courseId,
      }),
  });

  return (
    <Protected>
      <RoleGuard roles={['faculty', 'admin']}>
        <div className="container py-8 space-y-6">
          <h1 className="text-2xl font-semibold">Scan Logs</h1>

          {isLoading && <p>Loading...</p>}

          <ul className="space-y-3">
            {logs?.map((log: any) => (
              <li key={log._id} className="bg-white p-4 shadow rounded-md">
                <h3 className="font-semibold">{log.title}</h3>
                <p className="text-sm">{log.indication}</p>
                <p className="text-sm">By: {log.user?.name}</p>
                <p className="text-sm">{log.course?.title}</p>
                <p className="text-sm">
                  Date: {new Date(log.dateOfScan).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </RoleGuard>
    </Protected>
  );
}
