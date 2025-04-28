import LoveLetterLogo from '@public/love-letter-logo.png';
import { Orbitron } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const orbitron = Orbitron({
  subsets: ['latin'],
});

export default function LastHope() {
  return (
    <div
      className={
        orbitron.className +
        ' last-hope-bg flex w-96 flex-col items-center rounded-lg sm:w-xl md:w-2xl'
      }
    >
      <div className="flex w-full flex-col items-center border-b-1 border-slate-700 py-4">
        <Image src={LoveLetterLogo} alt="last-hope-logo" className="w-80" />
      </div>
      <div className="flex w-full flex-col items-center gap-4 px-8 py-4">
        <div className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque iusto
          quo nemo architecto, adipisci voluptatum, dolore, magni voluptates
          dolor facilis dolorum laboriosam earum est ipsam aspernatur maiores
          culpa dolorem ipsa.
        </div>
        <Link href={'https://last-hope.nqbral-games.fr/'}>
          <button className="button border-last-hope-primary hover:border-last-hope-primary-hover my-1 rounded-md border-2 px-6 py-2 transition-colors">
            Jouer à Last Hope
          </button>
        </Link>
      </div>
    </div>
  );
}
