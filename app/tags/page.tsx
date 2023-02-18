import { getArticles } from "@/api/article";
import ArticleList from "@/components/ArticleList";

async function TagsPage() {
  const articles = await getArticles();
  return <ArticleList articles={articles} />;
}

export default TagsPage;
