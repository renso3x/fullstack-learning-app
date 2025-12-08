import { api } from '@/lib/axios';

export async function fetchCourses() {
  const res = await api.get('/courses');
  return res.data;
}
