'use client';

import LastHopeLogo from '@public/last-hope-logo-without-text.png';
import ShadowNetworkLogo from '@public/shadow_network_logo_without_text.png';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import TagBadgeGame from '../tags/TagBadgeGame';

const games = [
  {
    name: 'Last Hope',
    slug: 'last-hope',
    link: process.env.NEXT_PUBLIC_WS_URL_LAST_HOPE ?? '',
    description:
      "Dans un laboratoire isolé, alors que l'infection se propage, quelques docteurs tentent désespérément de trouver un remède. Mais parmi eux, des infectés, encore humains en apparence, cherchent à saboter leurs efforts. Jeu de bluff et de trahison, chaque joueur devra gagner la confiance des autres... ou les manipuler pour mieux les tromper. Dans cette lutte silencieuse, qui sauvera l'humanité... et qui précipitera sa chute ?",
    image: LastHopeLogo,
    tags: ['Rôles cachés', 'Trahison', 'Post-apocalyptique'],
  },
  {
    name: 'Shadow Network',
    slug: 'shadow-network',
    link: process.env.NEXT_PUBLIC_WS_URL_SHADOW_NETWORK ?? '',
    description:
      "Shadow Network est un jeu de cartes rapide et stratégique où les joueurs s'affrontent pour livrer un message crucial entre les mains du Président. En faisant preuve de déduction, de risque et d'un peu de chance, les joueurs éliminent leurs adversaires et tentent d'être le dernier survivant ou d'avoir la carte la plus haute à la fin de la manche.",
    image: ShadowNetworkLogo,
    tags: ['Espionnage', 'Stratégie', 'Cartes'],
  },
];

export default function OurGames() {
  const [search, setSearch] = useState('');

  const normalize = (str: string) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  // Filtrage des jeux selon la recherche (nom ou tags)
  const filteredGames = games.filter(
    (game) =>
      normalize(game.name).includes(normalize(search)) ||
      game.tags.some((tag) => normalize(tag).includes(normalize(search))),
  );

  return (
    <section
      className="relative z-10 bg-black px-6 py-10 text-white sm:px-12 lg:px-24"
      id="games"
    >
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 text-4xl font-bold">
          Nos <span className="text-cyan-400">Jeux</span>
        </h2>
        <p className="mb-12 text-lg text-gray-300">
          Découvrez des jeux de société modernes conçus pour le web : bluff,
          coopération, stratégie... le tout 100% en ligne.
        </p>

        {/* Input de recherche */}
        <input
          type="text"
          placeholder="Rechercher un jeu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 w-full max-w-xs rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-center text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
        />

        <div className="grid items-stretch justify-center gap-10 sm:grid-cols-1 md:grid-cols-2">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 200 }}
                key={game.slug}
                className="group h-full"
              >
                <Link
                  href={game.link}
                  className="group flex h-full min-h-[450px] flex-col overflow-hidden rounded-2xl bg-gray-900 shadow-lg transition-all duration-300 hover:bg-gray-950"
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      className="object-contain pt-4"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 text-left">
                    <h3 className="mb-2 text-center text-2xl font-semibold text-white">
                      {game.name}
                    </h3>
                    <p className="mb-3 text-center text-sm text-gray-400">
                      {game.description}
                    </p>
                    <div className="mt-auto mb-4 flex w-full flex-wrap justify-center gap-2">
                      {game.tags.map((tag, i) => (
                        <TagBadgeGame label={tag} key={`badge-tag-${i}`} />
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-gray-400">Aucun jeu trouvé.</div>
          )}
        </div>
      </div>
    </section>
  );
}
