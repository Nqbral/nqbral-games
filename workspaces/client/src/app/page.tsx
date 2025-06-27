import NqbralGamesLogo from '@public/nqbral-games-logo.png';
import type { Metadata } from 'next';
import Image from 'next/image';

import HomeClient from './components/clients/HomeClient';
import LastHope from './components/games/LastHope';
import ShadowNetwork from './components/games/ShadowNetwork';

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
      <HomeClient />
      <div className="flex w-full flex-col items-center gap-16 py-8">
        <div className="flex w-72 flex-col items-center gap-4 rounded-lg bg-neutral-900 text-center sm:w-xl md:w-2xl">
          <div
            className="flex w-full flex-col items-center border-b-1 border-neutral-600 py-4"
            id="last-hope-game"
          >
            <Image
              src={NqbralGamesLogo}
              alt="nqbral-games-logo"
              className="w-32 sm:w-52"
            />
          </div>
          <h1 className="text-lg font-bold sm:text-xl">
            Bienvenue sur Nqbral Games !
          </h1>
          <section className="px-4 pb-4 text-center text-sm sm:text-base">
            <span className="italic">Nqbral Games</span> est une plateforme
            française dédiée aux jeux de société en ligne, repensés pour le web.
            Découvrez des expériences multijoueurs uniques, inspirées de grands
            classiques ou des concepts originaux mêlant stratégie, bluff,
            coopération et trahison. <br />
            <br />
            Conçus pour être joués à distance entre amis, nos jeux combinent
            esthétique soignée, règles accessibles et mécaniques profondes pour
            des parties rapides ou intenses. Que vous soyez amateur de
            stratégie, fan de jeux à rôles cachés, ou simple curieux,{' '}
            <span className="italic">Nqbral Games</span> vous propose une
            nouvelle façon de jouer, partout, à tout moment, sans installation.{' '}
            <br />
            <br />
            Rejoignez la communauté, explorez nos univers comme{' '}
            <span className="font-bold">Last Hope</span> ou{' '}
            <span className="font-bold">Shadow Network</span>, et défiez vos
            amis en quelques clics.
          </section>
        </div>
        <ShadowNetwork />
        <LastHope />
      </div>
    </>
  );
}
