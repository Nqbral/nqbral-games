'use client';

import { Article, MetaDataPagination } from '@/app/types/article';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import ArticlePreview from './ArticlePreview';

export default function ArticlesPagination() {
  const [page, setPage] = useState<number | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [metaDataPagination, setMetadataPagination] =
    useState<MetaDataPagination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const limit = 2;

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const myPage = searchParams.get('page');

    if (!myPage) {
      return;
    }

    setPage(parseInt(myPage));
  }, [searchParams]);

  useEffect(() => {
    if (page == null) {
      return;
    }

    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/articles?pagination[start]=${(page - 1) * limit}&pagination[limit]=${limit}&populate=tags`,
        );
        const data = await res.json();
        setArticles(data.data);
        setMetadataPagination(data.meta);
      } catch (err) {
        console.error('Erreur lors du chargement des articles', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  const previousPage = () => {
    if (page) {
      const previousPage = page - 1;
      router.push('/articles?page=' + previousPage);
    }
  };

  const nextPage = () => {
    if (page) {
      const nextPage = page + 1;
      router.push('/articles?page=' + nextPage);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6">
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
      ) : articles.length == 0 ? (
        <>
          <p className="text-sm text-gray-400 italic sm:text-base">
            Aucun article
          </p>
        </>
      ) : (
        <>
          <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
            {articles.map((article) => (
              <ArticlePreview article={article} key={article.id} />
            ))}
          </div>
          <div className="flex flex-row gap-2">
            {page && page - 1 != 0 && (
              <button
                onClick={previousPage}
                aria-label="Page précédente"
                className="rounded-md bg-neutral-700 p-3 transition-colors hover:bg-neutral-800"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            {metaDataPagination &&
              page &&
              page * limit < metaDataPagination.pagination.total && (
                <button
                  onClick={nextPage}
                  aria-label="Page suivante"
                  className="rounded-md bg-neutral-700 p-3 transition-colors hover:bg-neutral-800"
                >
                  <ArrowRight size={20} />
                </button>
              )}
          </div>
        </>
      )}
    </div>
  );
}
