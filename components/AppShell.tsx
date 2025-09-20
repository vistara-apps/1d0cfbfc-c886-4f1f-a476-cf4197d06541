'use client';

import { Header } from './Header';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6">
        {children}
      </main>
    </div>
  );
}
