import type { Metadata } from 'next';

import ErrorMessage from './components/error_message/ErrorMessage';
import Footer from './components/home/Footer';
import HeroSection from './components/home/HeroSection';
import NavAndSideBarHome from './components/home/NavAndSideBarHome';
import OurGames from './components/home/OurGames';
import WhyNqbralGames from './components/home/WhyNqbralGames';

export const metadata: Metadata = {
  title: 'Nqbral Games – Plateforme de jeux de société en ligne',
  description:
    'Jouez à des jeux de société en ligne sur Nqbral Games : Last Hope, Shadow Network et autres. Plateforme multijoueur, accessible partout, sans installation.',
  keywords: [
    'jeux de société en ligne',
    'multijoueur',
    'nqbral games',
    'stratégie',
    'bluff',
    'rôles cachés',
    'last hope',
    'shadow network',
    'plateforme de jeux',
  ],
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
      <NavAndSideBarHome />
      <HeroSection />
      <WhyNqbralGames />
      <OurGames />
      <ErrorMessage />
      <Footer />
    </>
  );
}
