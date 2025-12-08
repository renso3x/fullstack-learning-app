
import { api } from '@/lib/axios';

export async function fetchMyScanLogs(courseId?: string) {
  const res = await api.get('/scan-logs/me', {
    params: courseId ? { courseId } : {},
  });
  return res.data;
}

export async function createScanLog(payload: any) {
  const res = await api.post('/scan-logs', payload);
  return res.data;
}
