import { compileFile } from "@/api/mdx";
import { MainPage } from "@/components/MainPage";
import MDXContainer from "@/components/MDXContainer";
import { notFound } from "next/navigation";

const AboutPage = async () => {
  const result = await compileFile("app/about/about.mdx");
  if (!result) notFound();
  return (
    <MainPage title="About me">
      <MDXContainer>{result.content}</MDXContainer>
    </MainPage>
  );
};

export default AboutPage;
