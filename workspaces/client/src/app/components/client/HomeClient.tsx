'use client';

import ShadowNetwork from '@/app/components/games/ShadowNetwork';
import NavbarHomePage from '@/app/components/navbar/NavbarHomePage';
import LastHope from '@components/games/LastHope';
import { useAuth } from '@context/AuthProvider';
import NqbralGamesLogo from '@public/nqbral-games-logo.png';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import BurgerBar from '../burger_bar/BurgerBar';
import ErrorMessage from '../error_message/ErrorMessage';
import NavbarBlack from '../navbar/NavbarBlack';

export default function HomeClient() {
  const { loading, isLogged } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
      {isLogged && (
        <button
          className="fixed top-12 left-4 z-50 sm:top-16 md:top-20"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu
            size={36}
            className="rounded-sm border-1 border-neutral-600 bg-black p-2"
          />
        </button>
      )}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-80 transform bg-neutral-950 p-4 shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button className="mb-4 ml-auto" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
          <BurgerBar />
        </button>
      </div>
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
        <div className="px-4 pb-4 text-center text-sm sm:text-base">
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
      <ErrorMessage />
      <NavbarHomePage />
      <ShadowNetwork />
      <LastHope />
    </div>
  );
}
