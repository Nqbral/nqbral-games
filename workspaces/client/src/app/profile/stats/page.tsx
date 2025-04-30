'use client';

import NavigationProfile from '@/app/components/profile/NavigationProfile';
import NavbarBlack from '@components/navbar/NavbarBlack';
import { useAuth } from '@context/AuthProvider';
import axios from '@lib/axiosInstance';
import LastHopeLogo from '@public/last-hope-logo.png';
import LoveLetterLogo from '@public/love-letter-logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { Stats } from '../../types/user';

export default function ProfilePageStats() {
  const { accessToken, isLogged } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | undefined>(undefined);

  useEffect(() => {
    if (!accessToken) return;

    axios.get('/user/stats').then((res) => setStats(res.data));
  }, [accessToken]);

  useEffect(() => {
    if (isLogged != null && !isLogged) {
      router.push('/');
    }
  }, [isLogged, router]);

  if (!stats)
    return (
      <>
        <NavbarBlack />
        <div className="flex min-h-screen flex-row">
          <NavigationProfile />
          <div className="flex min-h-screen w-full flex-col items-center justify-center">
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#fff"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </div>
        </div>
      </>
    );

  return (
    <>
      <NavbarBlack />
      <div className="flex min-h-screen flex-row">
        <NavigationProfile />
        <div className="flex w-full flex-col items-center gap-8 pt-24">
          <h1 className="text-xl font-bold">Vos stastistiques de jeu</h1>

          <div className="flex flex-col rounded-lg border-1 border-neutral-100">
            <div className="w-full border-b-1 border-neutral-100 px-8">
              <Image
                src={LoveLetterLogo}
                alt="love-letter-logo"
                className="w-64 p-4"
              />
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Match(s) joué(s):{' '}
              <span className="text-amber-500">
                {stats.loveLetter.gamesPlayed}
              </span>
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Match(s) gagné(s):{' '}
              <span className="text-emerald-500">{stats.loveLetter.wins}</span>
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Match(s) perdu(s):{' '}
              <span className="text-red-400">{stats.loveLetter.losses}</span>
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Manche(s) jouée(s):{' '}
              <span className="text-amber-500">
                {stats.loveLetter.roundsPlayed}
              </span>
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Manche(s) gagnée(s):{' '}
              <span className="text-emerald-500">
                {stats.loveLetter.roundsWin}
              </span>
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Manche(s) perdue(s):{' '}
              <span className="text-red-400">
                {stats.loveLetter.roundsLosses}
              </span>
            </div>
          </div>

          <div className="flex flex-col rounded-lg border-1 border-neutral-100">
            <div className="w-full border-b-1 border-neutral-100 px-8">
              <Image
                src={LastHopeLogo}
                alt="last-hope-logo"
                className="w-64 p-4"
              />
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Match(s) joué(s):{' '}
              <span className="text-amber-500">
                {stats.lastHope.gamesPlayed}
              </span>
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Match(s) gagné(s):{' '}
              <span className="text-emerald-500">{stats.lastHope.wins}</span>
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Match(s) perdu(s):{' '}
              <span className="text-red-400">{stats.lastHope.losses}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
