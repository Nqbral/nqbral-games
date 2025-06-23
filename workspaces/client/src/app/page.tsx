'use client';

import ShadowNetwork from '@/app/components/games/ShadowNetwork';
import NavbarHomePage from '@/app/components/navbar/NavbarHomePage';
import LastHope from '@components/games/LastHope';
import { useAuth } from '@context/AuthProvider';
import NqbralGamesLogo from '@public/nqbral-games-logo.png';
import Image from 'next/image';
import { ThreeDots } from 'react-loader-spinner';

import HeadDescription from './components/head/Head';
import NavbarBlack from './components/navbar/NavbarBlack';

export default function Home() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <NavbarBlack />
        <ThreeDots
          visible={true}
          height="40"
          width="40"
          color="#fff"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  return (
    <div className="mt-16 flex w-full flex-col items-center gap-16 py-8">
      <HeadDescription />
      <div className="bg- flex w-96 flex-col items-center gap-4 rounded-lg bg-neutral-900 text-center sm:w-xl md:w-2xl">
        <div
          className="flex w-full flex-col items-center border-b-1 border-slate-700 py-4"
          id="last-hope-game"
        >
          <Image
            src={NqbralGamesLogo}
            alt="nqbral-games-logo"
            className="w-52"
          />
        </div>
        <h1 className="text-xl font-bold">Bienvenue sur Nqbral Games !</h1>
        <div className="px-4 pb-4 text-center">
          <span className="italic">Nqbral Games</span> est une plateforme
          française dédiée aux jeux de société en ligne, repensés pour le web.
          Découvrez des expériences multijoueurs uniques, inspirées de grands
          classiques ou des concepts originaux mêlant stratégie, bluff,
          coopération et trahison. <br />
          <br />
          Conçus pour être joués à distance entre amis, nos jeux combinent
          esthétique soignée, règles accessibles et mécaniques profondes pour
          des parties rapides ou intenses. Que vous soyez amateur de stratégie,
          fan de jeux à rôles cachés, ou simple curieux,{' '}
          <span className="italic">Nqbral Games</span> vous propose une nouvelle
          façon de jouer, partout, à tout moment, sans installation. <br />
          <br />
          Rejoignez la communauté, explorez nos univers comme{' '}
          <span className="font-bold">Last Hope</span> ou{' '}
          <span className="font-bold">Shadow Network</span>, et défiez vos amis
          en quelques clics.
        </div>
      </div>
      <NavbarHomePage />
      <ShadowNetwork />
      <LastHope />
    </div>
  );
}
