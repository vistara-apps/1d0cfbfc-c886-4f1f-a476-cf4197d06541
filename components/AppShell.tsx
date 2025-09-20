'use client';

import { useMiniKit } from '@coinbase/minikit';
import { Header } from './Header';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { context } = useMiniKit();

  return (
    <div className="min-h-screen bg-background">
      <Header user={context?.user} />
      <main className="container py-6">
        {children}
      </main>
    </div>
  );
}
