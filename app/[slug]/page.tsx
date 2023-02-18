import { getArticleBySlug } from "@/api/article";
import { notFound } from "next/navigation";
import { AiOutlineTag, AiOutlineCalendar } from "react-icons/ai";
import dayjs from "dayjs";
import MDXContainer from "@/components/MDXContainer";

const BlogPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const article = await getArticleBySlug(slug);
  if (!article) {
    notFound();
  }
  const tags = article.meta.tags.map((tag) => (
    <a
      key={tag}
      href={"/tags/#" + tag}
      className="py-0.5 px-2 space-x-1 text-gray-500 bg-gray-200 flex items-center rounded hover:bg-cyan-600 hover:text-white transition"
    >
      <AiOutlineTag />
      <span className="text-xs">{tag}</span>
    </a>
  ));
  return (
    <article className="grow">
      <header className="flex flex-col items-center gap-5 mb-14">
        <h2 className="tracking-wide font-bold text-4xl text-center">
          {article.meta.title}
        </h2>
        <time className="flex mx-auto items-center space-x-2 text-gray-400 font-mono">
          <AiOutlineCalendar />
          <p>Updated on </p>
          <p>{dayjs(article.meta.date).format("MMMM D, YYYY")}</p>
        </time>
        <div className="flex gap-2 ">{tags}</div>
      </header>
      <MDXContainer>{article.content}</MDXContainer>
    </article>
  );
};

export default BlogPage;
