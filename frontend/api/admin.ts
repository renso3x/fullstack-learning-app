import { api } from '@/lib/axios';

// Metrics summary
export async function fetchMetrics() {
  const res = await api.get('/metrics/summary');
  return res.data;
}

// List all learners
export async function fetchLearners() {
  const res = await api.get('/users', { params: { role: 'learner' } });
  return res.data;
}

// List all courses
export async function fetchCoursesAdmin() {
  const res = await api.get('/courses');
  return res.data;
}

// Toggle course status
export async function updateCourse(id: string, status: string) {
  const res = await api.patch(`/courses/${id}`, { status });
  return res.data;
}

// Scan logs (with optional filters)
export async function fetchAllScanLogs(filters: any = {}) {
  const res = await api.get('/scan-logs', { params: filters });
  return res.data;
}
