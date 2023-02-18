import { getArticles } from "@/api/article";
import { Hero } from "@/components/Hero";
import config from "site.config";
import Link from "next/link";
import ProjectCard from "@/components/Card";
import dayjs from "dayjs";

export default async function Home() {
  const articles = await getArticles();
  articles.length = 6;
  const postPreview = articles.map((article) => (
    <Link href={`/${article.meta.slug}`} key={article.meta.slug}>
      <div className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-4 rounded-xl">
        <h2 className="font-semibold text-xl text-gray-600 tracking-wider">
          {article.meta.title}
        </h2>
        <time className="font-semibold text-gray-500 hidden md:block">
          {dayjs(article.meta.date).format("MMMM D, YYYY")}
        </time>
      </div>
    </Link>
  ));
  return (
    <main className="grow space-y-20">
      <Hero {...config.hero} />
      {/* Posts */}
      <section>
        <div className="flex items-center justify-between py-2 mb-4">
          <h2 className="font-bold text-3xl text-cyan-800">Latest Posts</h2>
          <Link
            className="px-4 py-1 border-2 border-cyan-600 hover:bg-gray-200  rounded-full "
            href={"/blog"}
          >
            View all
          </Link>
        </div>
        <div className="flex flex-col space-y-2">{postPreview}</div>
      </section>
      {/* Projects  */}
      <section>
        <div className="flex items-center justify-between py-2 mb-4">
          <h2 className="font-bold text-3xl">Projects</h2>
          <Link
            className="px-4 py-2 bg-gray-100 shadow-red-500 rounded-lg "
            href={"/projects"}
          >
            <button>View all</button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {config.projects.map((project) => (
            <ProjectCard key={project.source} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
}
