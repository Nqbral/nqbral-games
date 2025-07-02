import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 px-6 py-10 text-gray-300 sm:px-12 lg:px-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-xl font-semibold text-white">
            Nqbral Games
          </h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Nqbral Games est une plateforme en ligne de jeux de société repensés
            pour le numérique. Bluff, stratégie, coopération : jouez où vous
            voulez, quand vous voulez, sans installation.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-lg font-semibold text-white">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="transition-colors hover:text-blue-400">
                Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/articles/1"
                className="transition-colors hover:text-blue-400"
              >
                Actualités
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="transition-colors hover:text-blue-400"
              >
                À propos
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-blue-400"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="transition-colors hover:text-blue-400"
              >
                CGU
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="transition-colors hover:text-blue-400"
              >
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link
                href="/mentions-legales"
                className="transition-colors hover:text-blue-400"
              >
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-lg font-semibold text-white">Communauté</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://discord.gg/..."
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-blue-400"
              >
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 w-full pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Nqbral Games. Tous droits réservés.
      </div>
    </footer>
  );
}
