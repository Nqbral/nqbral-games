import ArticlesPagination from '@/app/components/articles/ArticlesPagination';
import Footer from '@/app/components/footer/Footer';
import NavAndSideBar from '@/app/components/navbar/NavAndSideBar';
import { Suspense } from 'react';

export const metadata = {
  title: 'Actualités - Nqbral Games',
  description:
    'Les dernières actualités, dev blogs et maintenances de Nqbral Games.',
  keywords: [
    'Nqbral Games',
    'actualités',
    'blog',
    'maintenance',
    'jeux en ligne',
  ],
  openGraph: {
    title: 'Actualités - Nqbral Games',
    description:
      'Restez informé des dernières actualités et mises à jour sur Nqbral Games.',
    url: 'https://nqbral-games.fr/articles',
    siteName: 'Nqbral Games',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Actualités - Nqbral Games',
    description: 'Les dernières news et blogs de la plateforme Nqbral Games.',
  },
};

interface Props {
  params: { page: number };
}

export default async function ArticlesPage({ params }: Props) {
  const { page } = params;

  return (
    <>
      <NavAndSideBar />
      <main className="mx-auto mt-20 mb-12 max-w-4xl px-4">
        <h1 className="mb-8 w-full text-center text-4xl font-bold text-blue-400">
          Actualités
        </h1>
        <Suspense>
          <ArticlesPagination page={page} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
