import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Suspense } from 'react';

import { AuthProvider } from './context/AuthProvider';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nqbral Games',
  description: 'Nqbral Games',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Suspense>
        <html lang="fr">
          <body className={roboto.className}>{children}</body>
        </html>
      </Suspense>
    </AuthProvider>
  );
}
