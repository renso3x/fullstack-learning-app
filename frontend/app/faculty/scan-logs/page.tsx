'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAllScanLogs,
  fetchCoursesAdmin,
  fetchLearners,
} from '@/api/admin';
import Protected from '@/components/Protected';
import RoleGuard from '@/components/RoleGuard';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

export default function ScanLogsAdminPage() {
  const params = useSearchParams();
  const router = useRouter();

  const initialUser = params.get('userId') || '';
  const initialCourse = params.get('courseId') || '';
  const initialStart = params.get('startDate') || '';
  const initialEnd = params.get('endDate') || '';

  const [userId, setUserId] = useState(initialUser);
  const [courseId, setCourseId] = useState(initialCourse);
  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);

  const { data: courses, isLoading: isLoadingCourses, error: errorCourses } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: fetchCoursesAdmin,
  });

  const { data: learners, isLoading: isLoadingLearners, error: errorLearners } = useQuery({
    queryKey: ['admin-learners'],
    queryFn: fetchLearners,
  });

  const { data: logs, isLoading } = useQuery({
    queryKey: ['admin-scan-logs', userId, courseId, startDate, endDate],
    queryFn: () =>
      fetchAllScanLogs({
        userId: userId || undefined,
        courseId: courseId || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      }),
  });

  function applyFilters() {
    const query: any = {};

    if (userId) query.userId = userId;
    if (courseId) query.courseId = courseId;
    if (startDate) query.startDate = startDate;
    if (endDate) query.endDate = endDate;

    const qs = new URLSearchParams(query).toString();
    router.push(`/faculty/scan-logs?${qs}`);
  }

  function clearFilters() {
    setUserId('');
    setCourseId('');
    setStartDate('');
    setEndDate('');
    router.push('/faculty/scan-logs');
  }

  if (isLoadingCourses || isLoadingLearners || isLoading) {
    return <Loading />;
  }

  if (errorCourses || errorLearners) {
    return <ErrorMessage message="Failed to load data" />;
  }

  return (
    <Protected>
      <RoleGuard roles={['faculty', 'admin']}>
        <div className="container py-8 space-y-8">
          <h1 className="text-2xl font-semibold">Scan Logs</h1>

          <div className="bg-white p-4 rounded shadow space-y-4">
            <h2 className="font-semibold">Filters</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <select
                className="input"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              >
                <option value="">All Learners</option>
                {learners?.map((l: any) => (
                  <option key={l._id} value={l._id}>
                    {l.name}
                  </option>
                ))}
              </select>

              <select
                className="input"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
              >
                <option value="">All Courses</option>
                {courses?.map((c: any) => (
                  <option key={c._id} value={c._id}>
                    {c.title}
                  </option>
                ))}
              </select>

              <input
                type="date"
                className="input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <input
                type="date"
                className="input"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button className="btn btn-primary" onClick={applyFilters}>
                Apply Filters
              </button>

              <button className="btn btn-secondary" onClick={clearFilters}>
                Clear
              </button>
            </div>
          </div>

          <ul className="space-y-3">
            {logs?.map((log: any) => (
              <li key={log._id} className="bg-white p-4 shadow rounded">
                <h3 className="font-semibold">{log.title}</h3>

                <p className="text-sm">Learner: {log.userId?.name}</p>
                <p className="text-sm">Course: {log.courseId?.title}</p>

                <p className="text-sm">
                  Date: {new Date(log.dateOfScan).toLocaleDateString()}
                </p>

                {log.indication && (
                  <p className="text-sm text-gray-600">
                    Indication: {log.indication}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </RoleGuard>
    </Protected>
  );
}
