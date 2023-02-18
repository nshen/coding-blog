import ProjectCard from "@/components/Card";
import { MainPage } from "@/components/MainPage";
import config from "site.config";

async function ProjectsPage() {
  return (
    <MainPage title="Projects" subtitle="I made open source projects with ❤️ ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
        {config.projects.map((project) => (
          <ProjectCard key={project.source} {...project} />
        ))}
      </div>
    </MainPage>
  );
}

export default ProjectsPage;
