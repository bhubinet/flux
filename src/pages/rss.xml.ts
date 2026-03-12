import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { loadAllArticles } from '../utils/articles';

export function GET(context: APIContext) {
  const articles = loadAllArticles().slice(0, 50);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  return rss({
    title: 'Flux — Veille technologique',
    description: 'Les derniers articles tech, IA, DevOps, Cloud et Cybersécurité agrégés.',
    site: context.site!,
    items: articles.map((article) => ({
      title: `Flux - ${article.title}`,
      pubDate: new Date(article.pubDate),
      description: article.description,
      link: `${base}/article/${article.id}/`,
      categories: article.categories,
    })),
    customData: '<language>fr</language>',
  });
}
