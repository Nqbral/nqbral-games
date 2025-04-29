'use client';

import NavbarHomePage from '@/app/components/navbar/NavbarHomePage';
import LastHope from '@components/games/LastHope';
import LoveLetter from '@components/games/LoveLetter';
import { useAuth } from '@context/AuthProvider';
import { ThreeDots } from 'react-loader-spinner';

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
      <NavbarHomePage />
      <LoveLetter />
      <LastHope />
    </div>
  );
}
