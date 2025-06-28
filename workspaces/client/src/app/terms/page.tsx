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
        <h1 className="mb-8 text-3xl font-bold text-blue-400 md:text-4xl">
          Conditions Générales d’Utilisation
        </h1>
        <p className="mb-12 text-sm text-gray-400">
          Dernière mise à jour : 28 juin 2025
        </p>

        <section className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-blue-400">1. Objet</h2>
            <p>
              Les présentes CGU définissent les conditions dans lesquelles vous
              pouvez accéder à Nqbral Games, créer un compte, jouer à nos jeux
              en ligne, et interagir avec les autres utilisateurs.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              2. Accès au service
            </h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>L’accès au site est gratuit.</li>
              <li>
                Certains jeux ou fonctionnalités peuvent nécessiter un compte.
              </li>
              <li>Connexion internet et navigateur requis.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              3. Compte utilisateur
            </h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                Fournissez des informations exactes lors de l’inscription.
              </li>
              <li>Vous êtes responsable de la sécurité de votre compte.</li>
              <li>Nous pouvons suspendre votre compte en cas d’abus.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              4. Règles de comportement
            </h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>Respectez les autres joueurs.</li>
              <li>Ne trichez pas, ne spammez pas.</li>
              <li>Pas de propos haineux ou discriminatoires.</li>
              <li>Utilisez le site dans un but ludique et respectueux.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              5. Propriété intellectuelle
            </h2>
            <p>
              Tout le contenu du site (jeux, graphismes, code, etc.) appartient
              à Nqbral Games. Toute reproduction ou redistribution sans
              autorisation est interdite.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              6. Données personnelles
            </h2>
            <p>
              Vos données sont traitées conformément à notre{' '}
              <a href="/privacy" className="text-blue-400 underline">
                politique de confidentialité
              </a>
              . Vous pouvez les consulter, modifier ou supprimer à tout moment.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              7. Responsabilités
            </h2>
            <p>
              Nous faisons notre possible pour assurer la continuité du service,
              sans garantie d&apos;absence totale de bugs ou interruptions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              8. Modifications
            </h2>
            <p>
              Nqbral Games se réserve le droit de modifier ces CGU. Vous serez
              informé de tout changement significatif.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">9. Contact</h2>
            <p>
              Pour toute question, contactez-nous via la page{' '}
              <a href="/contact" className="text-blue-400">
                Contact
              </a>{' '}
              ou par e-mail à{' '}
              <a
                href="mailto:contact@nqbral-games.fr"
                className="text-blue-400 underline"
              >
                contact@nqbral-games.fr
              </a>
              .
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
