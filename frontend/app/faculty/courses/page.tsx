'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCoursesAdmin, updateCourse, createCourse } from '@/api/admin';
import Protected from '@/components/Protected';
import RoleGuard from '@/components/RoleGuard';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

export default function CoursesAdminPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  // Fetch courses
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: fetchCoursesAdmin,
  });

  // Toggle active/inactive
  const toggleMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateCourse(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
    },
  });

  // Create new course
  const createMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      setOpen(false);
    },
  });

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const modality = (form.elements.namedItem('modality') as HTMLInputElement)
      .value;
    const description = (
      form.elements.namedItem('description') as HTMLInputElement
    ).value;

    createMutation.mutate({ title, modality, description });
  }

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message="Failed to load data" />;

  return (
    <Protected>
      <RoleGuard roles={['faculty', 'admin']}>
        <div className="container py-8 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Manage Courses</h1>

            {/* Create button visible ONLY to admin */}
            <RoleGuard roles={['admin']}>
              <button className="btn btn-primary" onClick={() => setOpen(true)}>
                + Create Course
              </button>
            </RoleGuard>
          </div>

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
                  {course.description && (
                    <p className="text-sm text-gray-400">
                      {course.description}
                    </p>
                  )}
                </div>

                <button
                  className={`px-4 py-2 rounded ${
                    course.status === 'active'
                      ? 'bg-red-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                  onClick={() =>
                    toggleMutation.mutate({
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

          {/* Modal */}
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Create Course</h2>

                <form className="space-y-4" onSubmit={handleCreate}>
                  <input
                    className="input"
                    name="title"
                    placeholder="Title"
                    required
                  />

                  <input
                    className="input"
                    name="modality"
                    placeholder="Modality"
                    required
                  />

                  <textarea
                    className="input"
                    name="description"
                    placeholder="Description"
                  />

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? 'Saving...' : 'Create'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </RoleGuard>
    </Protected>
  );
}
