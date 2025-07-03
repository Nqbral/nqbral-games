'use client';

import { Article } from '@/app/types/article';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

type ArticleDetailProps = {
  slug: string;
};

export default function ArticleDetail({ slug }: ArticleDetailProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getArticleBySlug = async (slug: string) => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/articles?filters[slug][$eq]=${slug}&populate=tags`,
        );
        const data = await res.json();
        setArticle(data.data[0]);
      } catch (err) {
        console.error("Erreur lors du chargement de l'article", err);
      } finally {
        setLoading(false);
      }
    };

    getArticleBySlug(slug);
  }, [slug]);

  return (
    <div className="mb-4 flex flex-col flex-wrap items-center gap-6">
      {loading ? (
        <div className="min-h-[300px]">
          <ThreeDots
            visible={true}
            height="40"
            width="40"
            color="#fff"
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </div>
      ) : article ? (
        <>
          <h1 className="text-center text-2xl font-bold text-blue-400 sm:text-4xl">
            {article.title}
          </h1>
          <div className="flex flex-row flex-wrap items-center justify-center">
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
          </div>
          <div className="prose max-w-96 rounded-lg bg-neutral-900 p-4 sm:w-xl sm:max-w-xl md:w-2xl md:max-w-2xl lg:w-4xl lg:max-w-4xl">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          <motion.a
            href="/articles/1"
            whileTap={{ scale: 0.97 }}
            className="mb-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700"
            aria-label="Voir les actualités"
            title="Voir les actualités"
          >
            Voir les autres actualités
            <ArrowRight size={20} />
          </motion.a>
        </>
      ) : (
        <>
          <p className="text-4xl text-gray-400">Article non trouvé</p>
          <motion.a
            href="/articles/1"
            whileTap={{ scale: 0.97 }}
            className="mb-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700"
            aria-label="Voir les actualités"
            title="Voir les actualités"
          >
            Voir les autres actualités
            <ArrowRight size={20} />
          </motion.a>
        </>
      )}
    </div>
  );
}
