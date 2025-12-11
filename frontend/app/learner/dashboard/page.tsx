'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCourses } from '@/api/courses';
import { enroll, fetchMyEnrollments } from '@/api/enrollments';
import Protected from '@/components/Protected';
import RoleGuard from '@/components/RoleGuard';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

export default function LearnerDashboard() {
  const queryClient = useQueryClient();

  // GET active courses
  const {
    data: courses,
    isLoading: loadingCourses,
    error: errorCourses,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  // GET enrolled courses
  const {
    data: myEnrollments,
    isLoading: loadingEnrollments,
    error: errorEnrollments,
  } = useQuery({
    queryKey: ['my-enrollments'],
    queryFn: fetchMyEnrollments,
  });

  // POST enroll request
  const mutation = useMutation({
    mutationFn: (courseId: string) => enroll(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-enrollments'] });
    },
  });

  if (loadingCourses || loadingEnrollments) return <Loading />;
  if (errorCourses || errorEnrollments)
    return <ErrorMessage message="Failed to load data" />;

  return (
    <Protected>
      <RoleGuard roles={['learner']}>
        <div className="container py-8 space-y-10">
          <h1 className="text-3xl font-semibold">Learner Dashboard</h1>

          <section>
            <h2 className="text-xl font-semibold mb-4">Available Courses</h2>

            {loadingCourses && <p>Loading courses...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses?.map((course: any) => (
                <div
                  key={course._id}
                  className="bg-white p-4 shadow rounded-lg"
                >
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-500">{course.modality}</p>

                  <button
                    className="btn btn-primary mt-3"
                    disabled={mutation.isPending}
                    onClick={() => mutation.mutate(course._id)}
                  >
                    Enroll
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>

            {loadingEnrollments && <p>Loading...</p>}

            <ul className="space-y-2">
              {myEnrollments?.map((en: any) => (
                <li
                  key={en._id}
                  className="bg-white p-3 rounded shadow flex justify-between"
                >
                  <span>{en.courseId?.title}</span>

                  <div className="flex gap-3">
                    <a
                      href={`/learner/scan-logs?course=${en.courseId?._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Logs
                    </a>
                    <a
                      href={`/learner/scan-logs/new?course=${en.courseId?._id}`}
                      className="text-green-600 hover:underline"
                    >
                      New Scan
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </RoleGuard>
    </Protected>
  );
}
