import Footer from '../components/footer/Footer';
import NavAndSideBar from '../components/navbar/NavAndSideBar';

export const metadata = {
  title: 'À propos de Nqbral Games',
  description:
    'Découvrez Nqbral Games, une plateforme française de jeux de société en ligne repensés pour le web. Conçus et développés par un passionné, nos jeux offrent une expérience multijoueur unique mêlant stratégie, bluff et immersion.',
  keywords: [
    'Nqbral Games',
    'jeux de société en ligne',
    'jeux multijoueurs',
    'jeux de stratégie',
    'jeux de bluff',
    'Last Hope',
    'Shadow Network',
    'plateforme de jeux',
    'développeur indépendant',
    'jeux français en ligne',
  ],
  openGraph: {
    title: 'À propos de Nqbral Games',
    description:
      'Jeux de société en ligne repensés pour le web. Créés par un développeur passionné, jouez entre amis à des jeux multijoueurs innovants comme Last Hope et Shadow Network.',
    url: 'https://nqbral-games.fr/about',
    siteName: 'Nqbral Games',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos de Nqbral Games',
    description:
      'Rejoignez la communauté Nqbral Games — des jeux de société modernes, immersifs et accessibles, développés avec passion.',
  },
};

export default function AboutPage() {
  return (
    <>
      <NavAndSideBar />
      <div className="mx-auto mt-20 mb-12 max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold text-blue-400">
          À propos de Nqbral Games
        </h1>

        <p className="mb-4 text-lg leading-relaxed">
          Nqbral Games est une plateforme française de jeux de société en ligne,
          conçue pour réunir stratégie, bluff, et fun entre amis. Notre ambition
          est de réinventer les grands classiques du jeu de société pour le web,
          avec une touche moderne, accessible à tous, sans téléchargement.
        </p>

        <p className="mb-4 text-lg leading-relaxed">
          Nous créons des jeux multijoueurs originaux ou inspirés, pensés pour
          des parties courtes mais intenses. Que ce soit dans un univers
          post-apocalyptique avec <strong>Last Hope</strong>, ou
          d&apos;espionnage avec <strong>Shadow Network</strong>, chaque jeu est
          une nouvelle aventure.
        </p>

        <p className="mb-12 text-lg leading-relaxed">
          Notre mission ? Offrir une expérience fluide, immersive et
          communautaire à tous les amateurs de jeux de société modernes.
        </p>

        {/* Section L'Équipe */}
        <section className="border-t border-gray-700 pt-12">
          <h2 className="mb-6 text-3xl font-semibold text-blue-400">
            L&apos;Équipe
          </h2>

          <div>
            <h3 className="text-2xl font-bold text-white">
              Simon Chevalier (NqbraL)
            </h3>
            <p className="text-sm text-gray-400 italic">
              Créateur & Développeur indépendant
            </p>
            <p className="text-md mt-3 leading-relaxed">
              Je suis le créateur de la plateforme Nqbral Games. Je conçois,
              développe et publie les jeux de la plateforme. Mon objectif est
              simple : offrir des expériences de jeu innovantes, fluides et
              accessibles à tous. Passionné de jeux de société, de code et de
              design, je m’occupe de tout, du concept aux animations.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
