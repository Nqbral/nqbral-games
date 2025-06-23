import NqbralGamesLogo from '@public/nqbral-games-logo-row-black.png';
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarWhite() {
  return (
    <div className="fixed top-0 flex w-full flex-row items-center justify-between bg-neutral-300 px-6 py-4 shadow-sm shadow-neutral-950">
      <Link href="/">
        <Image
          src={NqbralGamesLogo}
          className="w-14 sm:w-20"
          alt="nqbral-games-logo"
        />
      </Link>
    </div>
  );
}
