import { Globe, ShieldCheck, Sparkles, Users } from 'lucide-react';

export default function WhyNqbralGames() {
  return (
    <section className="relative z-10 px-6 py-20 text-white sm:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-4 text-4xl font-bold text-white">
          Pourquoi choisir <span className="text-indigo-400">Nqbral Games</span>{' '}
          ?
        </h2>
        <p className="mb-12 text-lg text-gray-300">
          Nqbral Games est la plateforme française dédiée aux jeux de société en
          ligne. Vivez des expériences multijoueur uniques, pensées pour le web
          et accessibles partout, sans téléchargement.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center">
            <Sparkles className="mb-4 h-10 w-10 text-indigo-400" />
            <h3 className="text-xl font-semibold">
              Jeux exclusifs et immersifs
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Des univers originaux et scénarisés inspirés de grands classiques.
              Chaque partie est unique.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Users className="mb-4 h-10 w-10 text-green-400" />
            <h3 className="text-xl font-semibold">Multijoueur entre amis</h3>
            <p className="mt-2 text-sm text-gray-400">
              Invitez vos proches en quelques clics. Jouez à distance en temps
              réel, sans installation.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <Globe className="mb-4 h-10 w-10 text-cyan-400" />
            <h3 className="text-xl font-semibold">Accessibilité web</h3>
            <p className="mt-2 text-sm text-gray-400">
              Compatible sur navigateur desktop et mobile. Rejoignez une partie
              n’importe où, n’importe quand.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <ShieldCheck className="mb-4 h-10 w-10 text-pink-400" />
            <h3 className="text-xl font-semibold">Sécurité & comptes</h3>
            <p className="mt-2 text-sm text-gray-400">
              Votre compte est protégé. Retrouvez votre progression, votre
              profil, et vos statistiques à tout moment.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl text-sm leading-relaxed text-gray-400">
          <p>
            Nqbral Games est bien plus qu’un simple site de jeux en ligne. C’est
            une plateforme immersive pour jouer à des jeux de société modernes,
            repensés pour le web. Inspirés de mécaniques célèbres comme les
            rôles cachés, le bluff ou la stratégie à élimination, nos jeux comme{' '}
            <strong>Last Hope</strong> ou <strong>Shadow Network</strong> vous
            permettent de vivre des parties intenses, rapides ou longues, avec
            vos amis, où que vous soyez.
          </p>
          <p className="mt-4">
            Grâce à notre technologie web, aucune installation n’est nécessaire
            : connectez-vous, rejoignez un lobby, et commencez à jouer.
            Rejoignez dès maintenant la communauté francophone des amateurs de
            jeux de société en ligne !
          </p>
        </div>
      </div>
    </section>
  );
}
