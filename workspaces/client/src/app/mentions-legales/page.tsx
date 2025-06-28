import { Metadata } from 'next';

import NavbarHomePage from '../components/navbar/NavbarHomePage';
import Footer from '../footer/Footer';

export const metadata: Metadata = {
  title: 'Mentions légales - Nqbral Games',
  description:
    "Consultez les mentions légales de Nqbral Games. Informations sur l'éditeur du site, l'hébergement, la propriété intellectuelle et les responsabilités.",
  keywords: [
    'mentions légales',
    'informations légales',
    'éditeur',
    'hébergeur',
    'propriété intellectuelle',
    'responsabilités',
    'Nqbral Games',
  ],
  robots: 'index, follow',
  openGraph: {
    title: 'Mentions légales - Nqbral Games',
    description:
      'Toutes les informations légales concernant le site Nqbral Games : éditeur, hébergement, responsabilités et cadre juridique.',
    url: 'https://nqbral-games.fr/mentions-legales',
    siteName: 'Nqbral Games',
    type: 'website',
  },
};

export default function LegalNoticePage() {
  return (
    <>
      <NavbarHomePage />
      <div className="mx-auto mt-20 mb-12 max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold text-blue-400 md:text-4xl">
          Mentions légales
        </h1>
        <p className="mb-12 text-sm text-gray-400">
          Conformément à l’article 6 de la loi n°2004-575 du 21 juin 2004 pour
          la confiance dans l’économie numérique.
        </p>

        <section className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              Éditeur du site
            </h2>
            <p>
              <strong>Nqbral Games</strong>
              <br />
              Site édité par : Simon Chevalier (Nqbral)
              <br />
              Adresse e-mail :{' '}
              <a
                href="mailto:contact@nqbral-games.fr"
                className="text-blue-400 underline"
              >
                contact@nqbral-games.fr
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              Hébergement
            </h2>
            <p>
              Le site est hébergé par :<br />
              <strong>Hostinger</strong>
              <br />
              Adresse de l’hébergeur : 61 Lordou Vironos Street, 6023 Larnaca,
              Chypre
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              Propriété intellectuelle
            </h2>
            <p>
              Tous les éléments présents sur le site sont la propriété exclusive
              de Nqbral Games. Toute reproduction, représentation ou diffusion,
              même partielle, sans autorisation, est interdite.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-blue-400">Contact</h2>
            <p>
              Pour toute question, vous pouvez nous contacter à l’adresse
              suivante :{' '}
              <a
                href="mailto:contact@nqbral-games.fr"
                className="text-blue-400 underline"
              >
                contact@nqbral-games.fr
              </a>{' '}
              ou par le formulaire de{' '}
              <a href="/contact" className="text-blue-400">
                Contact
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
