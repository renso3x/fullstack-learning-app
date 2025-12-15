'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Protected from '@/components/Protected';
import RoleGuard from '@/components/RoleGuard';
import { fetchFilteredScanLogs } from '@/api/scanLogs';
import ErrorMessage from '@/components/ErrorMessage';
import Loading from '@/components/Loading';
import { Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';

function ScanLogsList() {
  const { user } = useAuth();
  const params = useSearchParams();
  const courseId = params.get('course');

  const {
    data: logs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['my-scan-logs', courseId],
    queryFn: () => fetchFilteredScanLogs({ userId: user?.id, courseId: courseId || undefined }),
  });


  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Failed to load data" />;
  
  return (
    <Protected>
      <RoleGuard roles={['learner']}>
        <div className="container py-8 space-y-6">
          <h1 className="text-2xl font-semibold">My Scan Logs</h1>

          {isLoading && <p>Loading...</p>}

          {!isLoading && logs?.length === 0 && (
            <p className="text-gray-500">No scan logs found.</p>
          )}

          <ul className="space-y-3">
            {logs?.map((log: any) => (
              <li key={log._id} className="bg-white p-4 shadow rounded-md">
                <h3 className="font-semibold">{log.title}</h3>
                <p className="text-sm text-gray-500">{log.indication}</p>
                <p className="text-sm">
                  Date: {new Date(log.dateOfScan).toLocaleDateString()}
                </p>
                <p className="text-sm">Location: {log.location}</p>
                {log.notes && (
                  <p className="text-sm italic">Notes: {log.notes}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </RoleGuard>
    </Protected>
  );
}

export default function ScanLogsListPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ScanLogsList />
    </Suspense>
  );
}

