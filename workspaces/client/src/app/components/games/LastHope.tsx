import LastHopeLogo from '@public/last-hope-logo.png';
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
        <Image src={LastHopeLogo} alt="last-hope-logo" className="w-80" />
      </div>
      <div className="flex w-full flex-col items-center gap-4 px-8 py-4">
        <div className="text-center">
          Dans un laboratoire isolé, alors que l&apos;infection se propage,
          quelques docteurs tentent désespérément de trouver un remède. Mais
          parmi eux, des infectés, encore humains en apparence, cherchent à
          saboter leurs efforts.
          <br />
          <br />
          Jeu de bluff et de trahison, chaque joueur devra gagner la confiance
          des autres... ou les manipuler pour mieux les tromper. Dans cette
          lutte silencieuse, qui sauvera l&apos;humanité... et qui précipitera
          sa chute ?
        </div>
        {/* TODO : changer le lien pour la prod */}
        <Link href={'http://localhost:3034'}>
          <button className="button border-last-hope-primary hover:border-last-hope-primary-hover my-1 rounded-md border-2 px-6 py-2 transition-colors">
            Jouer à Last Hope
          </button>
        </Link>
      </div>
    </div>
  );
}
