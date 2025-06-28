import NavbarHomePage from '../components/navbar/NavbarHomePage';
import Footer from '../footer/Footer';

export const metadata = {
  title: 'Conditions Générales d’Utilisation - Nqbral Games',
  description:
    'Découvrez les conditions d’utilisation de la plateforme Nqbral Games. Accès, responsabilité, confidentialité : tout ce que vous devez savoir pour utiliser nos jeux en ligne.',
  keywords: [
    'Conditions Nqbral Games',
    'CGU Nqbral Games',
    'Mentions légales',
    'Jeux de société en ligne',
    'Plateforme jeux multijoueurs',
    'Règlement Nqbral Games',
    'Confidentialité des données',
    'Utilisation site web jeux',
  ],
  openGraph: {
    title: 'Conditions Générales d’Utilisation | Nqbral Games',
    description:
      'Accédez aux conditions générales d’utilisation de Nqbral Games : droits, devoirs, confidentialité et informations légales concernant l’usage de la plateforme.',
    url: 'https://nqbral-games.fr/terms',
    siteName: 'Nqbral Games',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conditions Générales d’Utilisation | Nqbral Games',
    description:
      "Lisez les CGU de Nqbral Games pour comprendre vos droits et devoirs en tant qu'utilisateur de notre plateforme de jeux de société en ligne.",
  },
};

export default function TermsPage() {
  return (
    <>
      <NavbarHomePage />
      <div className="mx-auto mt-20 mb-12 max-w-5xl">
        <h1 className="mb-6 text-4xl font-bold text-blue-400">
          Conditions Générales d’Utilisation
        </h1>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">1. Objet</h2>
          <p>
            Les présentes conditions régissent l’utilisation du site Nqbral
            Games et des jeux qui y sont proposés.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            2. Données personnelles
          </h2>
          <p>
            Aucune donnée personnelle n’est vendue ou utilisée à des fins
            commerciales. Vos identifiants ne sont utilisés que pour permettre
            l’accès aux jeux et fonctionnalités de la plateforme.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            3. Propriété intellectuelle
          </h2>
          <p>
            Tous les éléments graphiques, mécaniques de jeu et textes sont la
            propriété de Nqbral Games ou de leurs auteurs.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-2xl font-semibold text-white">4. Contact</h2>
          <p>
            Pour toute demande liée à ces conditions, vous pouvez écrire à :{' '}
            <a
              href="mailto:contact@nqbral-games.fr"
              className="text-blue-400 underline"
            >
              contact@nqbral-games.fr
            </a>
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
