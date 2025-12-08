'use client';
import Protected from '../../../components/Protected';

export default function LearnerDashboard() {
  return (
    <Protected>
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Learner Dashboard</h1>
      </div>
    </Protected>
  );
}
