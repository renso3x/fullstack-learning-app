'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCoursesAdmin, updateCourse } from '@/api/admin';
import Protected from '@/components/Protected';
import RoleGuard from '@/components/RoleGuard';

export default function CoursesAdminPage() {
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: fetchCoursesAdmin,
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateCourse(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
    },
  });

  return (
    <Protected>
      <RoleGuard roles={['faculty', 'admin']}>
        <div className="container py-8 space-y-6">
          <h1 className="text-2xl font-semibold">Manage Courses</h1>

          {isLoading && <p>Loading courses...</p>}

          <ul className="space-y-4">
            {courses?.map((course: any) => (
              <li
                key={course._id}
                className="bg-white p-4 shadow rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{course.title}</p>
                  <p className="text-sm text-gray-500">{course.modality}</p>
                </div>

                <button
                  className={`px-4 py-2 rounded ${
                    course.status === 'active'
                      ? 'bg-red-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                  onClick={() =>
                    mutation.mutate({
                      id: course._id,
                      status:
                        course.status === 'active' ? 'inactive' : 'active',
                    })
                  }
                >
                  {course.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </RoleGuard>
    </Protected>
  );
}
