'use client';

import '../app/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '@/context/AuthProvider';
import Navbar from '@/components/Navbar';

const client = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <QueryClientProvider client={client}>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
