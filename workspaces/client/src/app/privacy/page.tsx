import { Metadata } from 'next';

import NavAndSideBar from '../components/navbar/NavAndSideBar';
import Footer from '../footer/Footer';

export const metadata: Metadata = {
  title: 'Politique de confidentialité - Nqbral Games',
  description:
    'Découvrez comment Nqbral Games protège vos données personnelles conformément au RGPD. Consultez notre politique de confidentialité pour plus de détails.',
  keywords: [
    'politique de confidentialité',
    'données personnelles',
    'RGPD',
    'sécurité',
    'protection des données',
    'Nqbral Games',
    'jeux en ligne',
    'données utilisateurs',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Politique de confidentialité | Nqbral Games',
    description:
      'Chez Nqbral Games, nous prenons la protection de vos données au sérieux. Lisez notre politique de confidentialité pour comprendre vos droits et notre engagement.',
    url: 'https://nqbral-games.fr/privacy',
    siteName: 'Nqbral Games',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <NavAndSideBar />
      <div className="mx-auto mt-20 mb-12 max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold text-blue-400 md:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mb-12 text-sm text-gray-400">
          Dernière mise à jour : 28 juin 2025
        </p>

        <section className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              1. Collecte des données
            </h2>
            <p>
              Nous collectons uniquement les données nécessaires à la création
              de compte et à l’utilisation de nos jeux : adresse e-mail, pseudo,
              mot de passe chiffré, et données de jeu.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              2. Utilisation des données
            </h2>
            <p>
              Vos données sont utilisées pour permettre l’accès à nos services,
              personnaliser l’expérience utilisateur, assurer la sécurité des
              comptes et envoyer des notifications importantes.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              3. Stockage et sécurité
            </h2>
            <p>
              Vos données sont stockées de manière sécurisée sur nos serveurs,
              avec des mesures de protection techniques et organisationnelles
              conformes au RGPD.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              4. Partage des données
            </h2>
            <p>
              Nous ne partageons aucune donnée personnelle avec des tiers, sauf
              obligation légale ou partenaire technique agissant sous contrat.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              5. Vos droits
            </h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                Droit d’accès, rectification et suppression de vos données.
              </li>
              <li>Droit à la portabilité et à la limitation du traitement.</li>
              <li>
                Droit d’opposition et de retrait du consentement à tout moment.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">6. Contact</h2>
            <p>
              Pour exercer vos droits, contactez-nous à{' '}
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
