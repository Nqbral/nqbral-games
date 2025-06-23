import { useAuth } from '@/app/context/AuthProvider';
import Link from 'next/link';

export default function BurgerBar() {
  const { isAdmin } = useAuth();
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <ul className="flex flex-col gap-4 pt-8 text-left text-sm sm:text-base">
        <Link
          href={'/profile/informations'}
          className="transition-colors hover:text-neutral-300"
        >
          <li>Profil</li>
        </Link>
        <Link
          href={'/profile/stats'}
          className="transition-colors hover:text-neutral-300"
        >
          <li>Statistiques de jeu</li>
        </Link>
        {isAdmin && (
          <Link
            href="/admin"
            className="transition-colors hover:text-neutral-300"
          >
            <li>Administration</li>
          </Link>
        )}
      </ul>
    </div>
  );
}
