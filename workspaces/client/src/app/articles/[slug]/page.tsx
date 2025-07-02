import ArticleDetail from '@/app/components/articles/ArticleDetail';
import NavAndSideBar from '@/app/components/navbar/NavAndSideBar';
import Footer from '@/app/footer/Footer';

interface Props {
  params: { slug: string };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = params;

  return (
    <>
      <NavAndSideBar />
      <main className="mx-auto mt-20 max-w-4xl p-4">
        <ArticleDetail slug={slug} />
      </main>
      <Footer />
    </>
  );
}
