import NavAndSideBar from '../components/navbar/NavAndSideBar';
import Footer from '../footer/Footer';

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

        <form className="space-y-6">
          <div>
            <label className="mb-1 block text-sm">Nom</label>
            <input
              type="text"
              className="w-full rounded bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Adresse email</label>
            <input
              type="email"
              className="w-full rounded bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Message</label>
            <textarea
              rows={5}
              className="w-full rounded bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded bg-blue-500 px-6 py-2 font-semibold text-black hover:bg-blue-700"
          >
            Envoyer
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
