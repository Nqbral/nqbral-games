import ShadowNetworkLogo from '@public/shadow_network_logo.png';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const montserrat = Montserrat({
  subsets: ['latin'],
});

export default function ShadowNetwork() {
  return (
    <div
      className={
        montserrat.className +
        ' shadow-network-bg flex w-72 flex-col items-center rounded-lg sm:w-xl md:w-2xl'
      }
    >
      <div className="flex w-full flex-col items-center border-b-1 border-slate-700 py-4">
        <Image
          src={ShadowNetworkLogo}
          alt="shadow-network-logo"
          className="w-24 sm:w-48"
        />
      </div>
      <div
        className="flex w-full flex-col items-center gap-4 px-8 py-4"
        id="shadow-network-game"
      >
        <div className="text-center text-sm sm:text-base">
          Shadow Network est un jeu de cartes rapide et stratégique où les
          joueurs s&apos;affrontent pour livrer un message crucial entre les
          mains du Président. En faisant preuve de déduction, de risque et
          d&apos;un peu de chance, les joueurs éliminent leurs adversaires et
          tentent d&apos;être le dernier survivant ou d&apos;avoir la carte la
          plus haute à la fin de la manche.
        </div>
        <Link href={process.env.NEXT_PUBLIC_WS_URL_SHADOW_NETWORK ?? ''}>
          <button className="button border-love-letter-primary hover:border-love-letter-primary-hover my-1 rounded-md border-2 px-6 py-2 text-sm transition-colors sm:text-base">
            Jouer à Shadow Network
          </button>
        </Link>
      </div>
    </div>
  );
}
