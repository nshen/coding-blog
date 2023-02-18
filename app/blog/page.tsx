import { Article, getArticles } from "@/api/article";
import { MainPage } from "@/components/MainPage";
import dayjs from "dayjs";
import Link from "next/link";

async function ArticlesPage() {
  const articles = await getArticles();
  const years: string[] = [];
  const yearsMap: Record<string, Article[]> = {};
  let minYear = Infinity;
  let maxYear = 0;
  articles.forEach((article) => {
    let yearNum = dayjs(article.meta.date).year();
    minYear = yearNum < minYear ? yearNum : minYear;
    maxYear = yearNum > maxYear ? yearNum : maxYear;
    const year = dayjs(article.meta.date).year().toString();
    if (yearsMap[year]) {
      yearsMap[year].push(article);
    } else {
      yearsMap[year] = [article];
      years.push(year);
    }
  });
  const postPreview = years.map((year) => (
    <section key={year} className="flex flex-col space-y-2">
      <h2 className="font-semibold pl-2 py-6 text-3xl text-gray-400">{year}</h2>
      {yearsMap[year].map((article) => (
        <Link href={`/${article.meta.slug}`} key={article.meta.slug}>
          <div className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-4 rounded-xl">
            <h2 className="font-semibold text-xl text-gray-600">
              {article.meta.title}
            </h2>
            <time className="font-semibold text-gray-500 hidden md:block">
              {dayjs(article.meta.date).format("MMMM D")}
            </time>
          </div>
        </Link>
      ))}
    </section>
  ));

  return (
    <MainPage
      title="Blog"
      subtitle={`I’ve written ${articles.length} articles in the past ${
        maxYear - minYear
      } years.`}
    >
      {postPreview}
    </MainPage>
  );
}

export default ArticlesPage;
