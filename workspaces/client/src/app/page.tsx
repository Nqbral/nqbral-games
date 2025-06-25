import type { Metadata } from 'next';
import Script from 'next/script';

import HomeClient from './components/client/HomeClient';

export const metadata: Metadata = {
  title: 'Nqbral Games – Plateforme de jeux de société en ligne',
  description:
    "Jouez à des jeux de société en ligne sur Nqbral Games : Last Hope, Shadow Network et bien d'autres. Plateforme multijoueur, accessible partout, sans installation.",
  keywords:
    'jeux de société en ligne, plateforme, multijoueur, Last Hope, Shadow Network, stratégie, bluff, rôles cachés, Nqbral Games',
  openGraph: {
    title: 'Nqbral Games – Plateforme de jeux de société en ligne',
    description:
      'Découvrez Nqbral Games, la plateforme française pour jouer à des jeux de société en ligne comme Last Hope et Shadow Network. Rejoignez la communauté !',
    url: 'https://nqbral-games.fr/',
    images: [
      {
        url: 'https://nqbral-games.fr/nqbral-games-logo-with-bg.png',
        width: 1024,
        height: 1024,
        alt: 'Nqbral Games logo',
      },
    ],
    siteName: 'Nqbral Games',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nqbral-games.fr/',
    languages: {
      fr: 'https://nqbral-games.fr/',
    },
    types: {},
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        strategy="afterInteractive"
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
      <HomeClient />
    </>
  );
}
