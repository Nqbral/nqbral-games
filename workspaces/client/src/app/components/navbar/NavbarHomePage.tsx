'use client';

import { useAuth } from '@/app/context/AuthProvider';
import LinkButton from '@components/buttons/LinkButton';
import NqbralGamesLogo from '@public/nqbral-games-logo-row.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavbarHomePage() {
  const { resetError, isLogged, username } = useAuth();
  const router = useRouter();

  const toLogin = () => {
    resetError();
    router.push('/signin');
  };

  return (
    <div className="fixed top-0 flex w-full flex-row items-center justify-between bg-neutral-900 px-6 py-4 shadow-sm shadow-neutral-950">
      <Link href="/">
        <Image
          src={NqbralGamesLogo}
          className="w-14 sm:w-20"
          alt="nqbral-games-logo"
        />
      </Link>
      {isLogged == null && <></>}
      {isLogged == true && (
        <LinkButton
          href="/profile/informations"
          buttonText={username}
          className="text-sm sm:text-base"
        />
      )}
      {isLogged == false && (
        <button
          className="text-sm transition-colors hover:text-neutral-300 sm:text-base"
          onClick={toLogin}
        >
          Se connecter
        </button>
      )}
    </div>
  );
}
