'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchLearners } from '@/api/admin';
import Protected from '@/components/Protected';
import RoleGuard from '@/components/RoleGuard';

export default function LearnersPage() {
  const { data: learners, isLoading } = useQuery({
    queryKey: ['learners'],
    queryFn: fetchLearners,
  });

  return (
    <Protected>
      <RoleGuard roles={['faculty', 'admin']}>
        <div className="container py-8">
          <h1 className="text-2xl font-semibold mb-6">Learners</h1>

          {isLoading && <p>Loading...</p>}

          <ul className="space-y-3">
            {learners?.map((l: any) => (
              <li
                key={l._id}
                className="bg-white p-4 shadow rounded-md flex justify-between"
              >
                <div>
                  <p className="font-semibold">{l.name}</p>
                  <p className="text-sm text-gray-500">{l.email}</p>
                </div>

                <a
                  href={`/faculty/scan-logs?userId=${l._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Scans →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </RoleGuard>
    </Protected>
  );
}
