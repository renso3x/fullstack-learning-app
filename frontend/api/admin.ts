import { api } from '@/lib/axios';

export async function fetchMetrics() {
  const res = await api.get('/metrics/summary');
  return res.data;
}

export async function fetchLearners() {
  const res = await api.get('/users', { params: { role: 'learner' } });
  return res.data;
}

export async function fetchCoursesAdmin() {
  const res = await api.get('/courses');
  return res.data;
}

export async function updateCourse(id: string, status: string) {
  const res = await api.patch(`/courses/${id}`, { status });
  return res.data;
}

export async function fetchAllScanLogs(filters: any = {}) {
  const res = await api.get('/scan-logs', { params: filters });
  return res.data;
}

export async function createCourse(payload: {
  title: string;
  description?: string;
  modality: string;
}) {
  const res = await api.post('/courses', payload);
  return res.data;
}
