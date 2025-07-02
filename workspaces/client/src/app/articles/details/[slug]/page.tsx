import ArticleDetail from '@/app/components/articles/ArticleDetail';
import Footer from '@/app/components/footer/Footer';
import NavAndSideBar from '@/app/components/navbar/NavAndSideBar';

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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
