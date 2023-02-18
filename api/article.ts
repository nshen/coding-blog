import * as fs from "node:fs/promises";
import path from "path";
import dayjs from "dayjs";
import { compileFile } from "./mdx";
// import relativeTime from "dayjs/plugin/relativeTime"; // import plugin
// dayjs.extend(relativeTime);

type Article = {
  meta: {
    title: string;
    date: string;
    tags: string[];
    description?: string;
    slug: string;
    draft?: boolean;
  };
  content: JSX.Element;
};

const _getDefaultSlug = (filePath: string) => {
  const slug = path.basename(filePath).split(".")[0].toLowerCase(); // remove ext
  return slug;
};

const readArticle = async (path: string): Promise<Article | null> => {
  try {
    var { content, frontmatter } = (await compileFile(path)) || {};
  } catch (error) {
    console.error("Error: Failed to CompileMDX: ", error);
    return null;
  }
  if (!content) {
    console.error(`missing content, ${path} is ignored`);
    return null;
  }
  if (!frontmatter) {
    console.error(`missing frontmatter, ${path} is ignored`);
    return null;
  }
  if (!frontmatter.title || frontmatter.title.length <= 0) {
    console.error(`[frontmatter error]: missing title, ${path} is ignored`);
    return null;
  }
  if (!frontmatter.date) {
    console.error(`[frontmatter error]: missing date, ${path} ignored`);
    return null;
  }
  const day = dayjs(frontmatter.date);
  if (!day.isValid()) {
    console.error(`[frontmatter error]: date is not valid, ${path} ignored`);
    return null;
  }
  if (frontmatter?.draft) {
    console.info(`[build pass]: ignore draft: ${path}`);
    return null;
  }
  return {
    meta: {
      ...frontmatter,
      title: frontmatter.title,
      date: day.format(),
      tags: (Array.isArray(frontmatter.tags)
        ? frontmatter.tags
        : frontmatter.tags.replace("，", ",").split(",")
      ).sort(),
      description: frontmatter.description ?? "",
      slug: frontmatter.slug ?? _getDefaultSlug(path),
      draft: frontmatter.draft ? true : false,
    },
    content: content,
  };
};

let _articles: Article[];

const getArticles = async () => {
  const folder = "posts";
  const files = await fs.readdir(folder);
  const mdfiles = files.filter((file) => /\.mdx?$/.test(file));
  const allArticles = await Promise.all(
    mdfiles.map((file) => readArticle(path.join(folder, file)))
  );
  _articles = allArticles
    .filter((article): article is Article => article != null)
    .sort((a, b) => (dayjs(a.meta.date).isBefore(dayjs(b.meta.date)) ? 1 : -1));
  return _articles;
};

const getArticleBySlug = async (
  slug: string,
  reloadArticles: boolean = false
) => {
  if (!_articles || reloadArticles) await getArticles();
  return _articles.find((article) => article.meta.slug === slug);
};

export { type Article, getArticles, getArticleBySlug };
