import { api } from '@/lib/axios';

export async function enroll(courseId: string) {
  const res = await api.post('/enrollments', { courseId });
  return res.data;
}

export async function fetchMyEnrollments() {
  const res = await api.get('/enrollments/me');
  return res.data;
}
