import NqbralGamesLogo from '@public/nqbral-games-logo-row.png';
import Image from 'next/image';
import Link from 'next/link';

export default function NavbarBlack() {
  return (
    <div className="fixed top-0 flex w-full flex-row items-center justify-between bg-neutral-900 px-6 py-4 shadow-sm shadow-neutral-950">
      <Link href="/">
        <Image src={NqbralGamesLogo} className="w-20" alt="nqbral-games-logo" />
      </Link>
    </div>
  );
}
