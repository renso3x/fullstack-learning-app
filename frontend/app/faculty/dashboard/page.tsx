'use client';
import Protected from '../../../components/Protected';
import RoleGuard from '../../../components/RoleGuard';

export default function FacultyDashboard() {
  return (
    <Protected>
      <RoleGuard roles={['faculty', 'admin']}>
        <div className="p-6">
          <h1 className="text-2xl font-semibold">Faculty Dashboard</h1>
        </div>
      </RoleGuard>
    </Protected>
  );
}
