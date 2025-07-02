export type Article = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
  tags: TagArticle[];
};

export type TagArticle = {
  id: number;
  name: string;
  colorText: string;
  colorBg: string;
};
