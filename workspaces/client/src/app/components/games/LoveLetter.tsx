import LoveLetterLogo from '@public/love-letter-logo.png';
import { MedievalSharp } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const medievalsharp = MedievalSharp({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-medievalsharp',
  weight: ['400'],
});

export default function LoveLetter() {
  return (
    <div
      className={
        medievalsharp.className +
        ' love-letter-bg flex w-96 flex-col items-center rounded-lg sm:w-xl md:w-2xl'
      }
    >
      <div className="flex w-full flex-col items-center border-b-1 border-slate-700 py-4">
        <Image src={LoveLetterLogo} alt="love-letter-logo" className="w-80" />
      </div>
      <div className="flex w-full flex-col items-center gap-4 px-8 py-4">
        <div className="text-center">
          Love Letter est un jeu de cartes rapide et stratégique où les joueurs
          s&apos;affrontent pour gagner l&apos;affection de la Princesse en
          livrant leurs lettres d&apos;amour. En faisant preuve de déduction, de
          risque et d&apos;un peu de chance, les joueurs éliminent leurs
          adversaires et tentent d&apos;être le dernier survivant ou
          d&apos;avoir la carte la plus haute à la fin de la manche.
        </div>
        <Link href={process.env.NEXT_PUBLIC_WS_URL_LOVE_LETTER ?? ''}>
          <button className="button border-love-letter-primary hover:border-love-letter-primary-hover my-1 rounded-md border-2 px-6 py-2 transition-colors">
            Jouer à Love Letter
          </button>
        </Link>
      </div>
    </div>
  );
}
