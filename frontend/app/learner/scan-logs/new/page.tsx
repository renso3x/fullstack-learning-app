'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Protected from '@/components/Protected';
import RoleGuard from '@/components/RoleGuard';
import { createScanLog } from '@/api/scanLogs';
import Loading from '@/components/Loading';

function NewScanLogPageContent() {
  const params = useSearchParams();
  const router = useRouter();
  const courseId = params.get('course');

  const [title, setTitle] = useState('');
  const [indication, setIndication] = useState('');
  const [location, setLocation] = useState('');
  const [dateOfScan, setDateOfScan] = useState('');
  const [notes, setNotes] = useState('');

  const mutation = useMutation({
    mutationFn: createScanLog,
    onSuccess: () => {
      router.push(`/learner/scan-logs?course=${courseId}`);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate({
      courseId,
      title,
      indication,
      location,
      dateOfScan,
      notes,
    });
  }

  return (
    <Protected>
      <RoleGuard roles={['learner']}>
        <div className="container py-8 max-w-lg mx-auto">
          <h1 className="text-2xl font-semibold mb-6">New Scan Log</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Title (e.g., FAST exam)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              className="input"
              placeholder="Indication"
              value={indication}
              onChange={(e) => setIndication(e.target.value)}
              required
            />

            <input
              className="input"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              className="input"
              type="date"
              value={dateOfScan}
              onChange={(e) => setDateOfScan(e.target.value)}
              required
            />

            <textarea
              className="input"
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : 'Create Log'}
            </button>
          </form>
        </div>
      </RoleGuard>
    </Protected>
  );
}

export default function NewScanLogPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NewScanLogPageContent />
    </Suspense>
  );
}
