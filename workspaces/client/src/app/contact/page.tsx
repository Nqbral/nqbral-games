import Footer from '../components/footer/Footer';
import ContactForm from '../components/form/ContactForm';
import NavAndSideBar from '../components/navbar/NavAndSideBar';

export const metadata = {
  title: 'Contact - Nqbral Games',
  description:
    'Une question ? Un retour ? Contactez Nqbral Games, la plateforme française dédiée aux jeux de société multijoueurs en ligne, modernes et immersifs.',
  keywords: [
    'Contact Nqbral Games',
    'support jeux en ligne',
    'aide Nqbral Games',
    'jeux de société en ligne',
    'jeux multijoueurs web',
    'Shadow Network',
    'Last Hope',
    'développeur jeux en ligne',
    'plateforme jeux bluff stratégie',
  ],
  openGraph: {
    title: 'Contactez Nqbral Games',
    description:
      'Besoin d’aide, de renseignements ou envie de partager vos retours ? Contactez directement le créateur de Nqbral Games.',
    url: 'https://nqbral-games.fr/contact',
    siteName: 'Nqbral Games',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Nqbral Games',
    description:
      'Une question ? Un bug ? Écrivez directement au développeur de Nqbral Games, la plateforme de jeux de société en ligne modernes.',
    creator: '@TonPseudoTwitter',
  },
};

export default function ContactPage() {
  return (
    <>
      <NavAndSideBar />
      <div className="mx-auto mt-20 mb-12 max-w-2xl">
        <h1 className="mb-6 text-4xl font-bold text-blue-400">Contact</h1>
        <p className="mb-8 text-lg leading-relaxed">
          Une question, une suggestion ou un bug à signaler ? Contactez-nous via
          ce formulaire ou écrivez-nous directement à :{' '}
          <a
            href="mailto:contact@nqbral-games.fr"
            className="text-blue-400 hover:underline"
          >
            contact@nqbral-games.fr
          </a>
        </p>

        <ContactForm />
      </div>
      <Footer />
    </>
  );
}
