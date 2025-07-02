'use client';

import { Article } from '@/app/types/article';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
          <p className="text-sm text-gray-400 italic sm:text-base">
            Aucun article
          </p>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => {
            return (
              <motion.div
                key={article.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-2xl bg-zinc-900 p-4 shadow-lg transition-all duration-300 hover:bg-zinc-800"
              >
                {article.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: tag.colorBg, // fallback
                      color: tag.colorText,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
                <Link
                  href={`/articles/${article.slug}`}
                  className="flex flex-grow flex-col items-center gap-3"
                >
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {article.excerpt}
                  </p>
                  <p className="mt-auto inline-flex items-center text-sm text-cyan-400 hover:underline">
                    Lire l&apos;article{' '}
                    <ArrowRight size={16} className="ml-1" />
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
