import { GoogleAnalytics } from '@next/third-parties/google';
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
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="theme-color" content="#18181b" />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'WebSite',
                  name: 'Nqbral Games',
                  url: 'https://nqbral-games.fr/',
                  sameAs: [
                    'https://last-hope.nqbral-games.fr',
                    'https://shadow-network.nqbral-games.fr',
                  ],
                }),
              }}
            />
          </head>
          <body className={roboto.className}>{children}</body>
          <GoogleAnalytics gaId="GTM-WRPZ9KMK" />
        </html>
      </Suspense>
    </AuthProvider>
  );
}
