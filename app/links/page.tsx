import { compileFile } from "@/api/mdx";
import { MainPage } from "@/components/MainPage";
import MDXContainer from "@/components/MDXContainer";
import { notFound } from "next/navigation";

async function LinksPage() {
  const result = await compileFile("app/links/links.mdx");
  if (!result) notFound();

  return (
    <MainPage title="Links" subtitle="友情链接">
      <MDXContainer>{result.content}</MDXContainer>
    </MainPage>
  );
}

export default LinksPage;
