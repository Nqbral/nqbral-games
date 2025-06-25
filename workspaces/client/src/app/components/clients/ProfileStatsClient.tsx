'use client';

import NavigationProfile from '@/app/components/profile/NavigationProfile';
import NavbarBlack from '@components/navbar/NavbarBlack';
import { useAuth } from '@context/AuthProvider';
import axios from '@lib/axiosInstance';
import LastHopeLogo from '@public/last-hope-logo.png';
import ShadowNetworkLogo from '@public/shadow_network_logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { Stats } from '../../types/user';

export default function ProfileStatsClient() {
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
        <div className="flex flex-col md:min-h-screen md:flex-row">
          <NavigationProfile />
          <div className="flex w-full flex-col items-center justify-center py-8 md:min-h-screen">
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
      <div className="flex flex-col md:min-h-screen md:flex-row">
        <NavigationProfile />
        <div className="flex w-full flex-col items-center gap-8 py-8 md:pt-24">
          <h1 className="text-xl font-bold">Vos statistiques de jeu</h1>

          <div className="flex w-72 flex-col rounded-lg border-1 border-neutral-700 shadow-md shadow-neutral-800">
            <div className="flex w-full flex-col items-center border-b-1 border-neutral-700 px-8">
              <Image
                src={ShadowNetworkLogo}
                alt="love-letter-logo"
                className="w-48 p-4"
              />
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Partie(s) jouée(s):{' '}
              <span className="text-amber-500">
                {stats.loveLetter.gamesPlayed}
              </span>
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Partie(s) gagnée(s):{' '}
              <span className="text-emerald-500">{stats.loveLetter.wins}</span>
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Partie(s) perdue(s):{' '}
              <span className="text-red-400">{stats.loveLetter.losses}</span>
            </div>
          </div>

          <div className="flex w-72 flex-col rounded-lg border-1 border-neutral-700 shadow-md shadow-neutral-800">
            <div className="flex w-full flex-col items-center border-b-1 border-neutral-700 px-8">
              <Image
                src={LastHopeLogo}
                alt="last-hope-logo"
                className="w-56 p-4"
              />
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Partie(s) jouée(s):{' '}
              <span className="text-amber-500">
                {stats.lastHope.gamesPlayed}
              </span>
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Partie(s) gagnée(s):{' '}
              <span className="text-emerald-500">{stats.lastHope.wins}</span>
            </div>
            <div className="border-b-1 border-neutral-700 px-4 py-2">
              Partie(s) perdue(s):{' '}
              <span className="text-red-400">{stats.lastHope.losses}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
