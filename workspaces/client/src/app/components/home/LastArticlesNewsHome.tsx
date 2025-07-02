'use client';

import { Article } from '@/app/types/article';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import ArticlePreview from '../articles/ArticlePreview';

export default function LastArticleNewsHome() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/articles?pagination[start]=0&pagination[limit]=2&populate=tags`,
        );
        const data = await res.json();
        setArticles(data.data);
      } catch (err) {
        console.error('Erreur lors du chargement des articles', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="px-6 py-12 text-white sm:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Dernières <span className="text-indigo-400">Actualités</span>
          </h2>
          <p className="mb-12 text-lg text-gray-300">
            Restez informé de nos nouveautés, mises à jour et événements.
          </p>
          <p className="text-center text-gray-400">
            Chargement des actualités...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12 text-white sm:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mb-4 text-4xl font-bold">
          Dernières <span className="text-indigo-400">Actualités</span>
        </h2>
        <p className="mb-12 text-lg text-gray-300">
          Restez informé de nos nouveautés, mises à jour et événements.
        </p>

        {articles.length == 0 && (
          <>
            <p className="text-sm text-gray-400 italic sm:text-base">
              Aucun article
            </p>
          </>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => {
            return <ArticlePreview article={article} key={article.id} />;
          })}
        </div>
        <motion.a
          href="/articles?page=1"
          whileTap={{ scale: 0.97 }}
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700"
          aria-label="Voir les actualités"
          title="Voir les actualités"
        >
          Plus d&apos;actualités
          <ArrowRight size={20} />
        </motion.a>
      </div>
    </section>
  );
}
