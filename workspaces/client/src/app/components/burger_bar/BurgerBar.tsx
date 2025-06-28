import { useAuth } from '@/app/context/AuthProvider';
import { cn } from '@/app/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BurgerBar() {
  const { isAdmin } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-full flex-col justify-between px-6 py-8 text-sm sm:text-base">
      <div className="flex flex-col gap-6">
        <ul className="flex flex-col gap-3">
          <li>
            <Link
              href="/"
              className={cn(
                'transition-colors hover:text-neutral-300',
                pathname === '/' && 'text-blue-400',
              )}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={cn(
                'transition-colors hover:text-neutral-300',
                pathname === '/about' && 'text-blue-400',
              )}
            >
              À propos
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={cn(
                'transition-colors hover:text-neutral-300',
                pathname === '/contact' && 'text-blue-400',
              )}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="border-t border-neutral-700 pt-6">
          <p className="mb-4 text-xs tracking-wider text-neutral-500 uppercase">
            Profil
          </p>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/profile/informations"
                className={cn(
                  'transition-colors hover:text-neutral-300',
                  pathname === '/profile/informations' && 'text-blue-400',
                )}
              >
                Profil
              </Link>
            </li>
            <li>
              <Link
                href="/profile/stats"
                className={cn(
                  'transition-colors hover:text-neutral-300',
                  pathname === '/profile/informations' && 'text-blue-400',
                )}
              >
                Statistiques de jeu
              </Link>
            </li>
          </ul>
        </div>

        {isAdmin && (
          <div className="border-t border-neutral-700 pt-6">
            <p className="mb-4 text-xs tracking-wider text-neutral-500 uppercase">
              Administration
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/admin"
                  className={cn(
                    'transition-colors hover:text-neutral-300',
                    pathname === '/admin' && 'text-blue-400',
                  )}
                >
                  Tableau de bord admin
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <ul className="mt-8 flex flex-col gap-2 border-t border-neutral-700 pt-4 text-xs text-neutral-400">
        <li>
          <Link href="/terms" className="hover:text-neutral-300">
            Conditions Générales d&apos;Utilisation
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="hover:text-neutral-300">
            Politique de confidentialité
          </Link>
        </li>
        <li>
          <Link href="/mentions-legales" className="hover:text-neutral-300">
            Mentions légales
          </Link>
        </li>
      </ul>
    </nav>
  );
}
