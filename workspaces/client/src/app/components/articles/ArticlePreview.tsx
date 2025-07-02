import { Article } from '@/app/types/article';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
  article: Article;
};

export default function ArticlePreview({ article }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center rounded-2xl bg-zinc-900 p-4 shadow-lg transition-all duration-300 hover:bg-zinc-800"
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
        href={`/articles/details/${article.slug}`}
        className="flex flex-grow flex-col items-center gap-3"
      >
        <h3 className="mt-4 text-xl font-semibold text-white">
          {article.title}
        </h3>
        <p className="mt-2 text-center text-sm text-gray-400">
          {article.excerpt}
        </p>
        <p className="mt-auto inline-flex items-center text-sm text-cyan-400 hover:underline">
          Lire l&apos;article <ArrowRight size={16} className="ml-1" />
        </p>
      </Link>
    </motion.div>
  );
}
