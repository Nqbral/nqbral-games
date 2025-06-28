'use client';

import NqbralGamesLogo from '@public/nqbral-games-logo.png';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

import ParticlesBackground from './ParticlesBackground';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center bg-gradient-to-br from-zinc-900 to-black px-6 py-24 text-center text-white">
      <ParticlesBackground />
      <motion.div
        initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        <Image
          src={NqbralGamesLogo}
          alt="Nqbral Games Logo"
          className="mx-auto mb-6 w-48"
        />
      </motion.div>

      <motion.h1
        className="max-w-3xl text-2xl font-bold sm:text-4xl md:text-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Jouez à des jeux de société en ligne avec Nqbral Games
      </motion.h1>

      <motion.p
        className="mt-6 max-w-2xl text-lg text-zinc-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Nqbral Games est la plateforme idéale pour jouer entre amis à des jeux
        de stratégie, bluff et rôles cachés. Entrez dans nos univers originaux,
        repensés pour le web, et commencez une partie en quelques clics, sans
        téléchargement.
      </motion.p>

      <motion.div
        className="z-10 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <motion.a
          href="#games"
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700"
        >
          Découvrir nos jeux
          <ArrowRight size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
}
