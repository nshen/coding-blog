import React from "react";
import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";

type ProjectCardProps = {
  title: string;
  description: string;
  source: string;
  article?: string;
};

const ProjectCard = ({
  title,
  description,
  article,
  source,
}: ProjectCardProps) => {
  return (
    <div className="flex flex-col border border-gray-300 rounded-lg shadow-md hover:shadow-cyan-100 hover:shadow-xl transition">
      <div className="p-6 grow rounded-t-lg">
        <Link
          href={source}
          className="font-bold text-xl text-cyan-800 font-mono"
        >
          {title}
        </Link>
        <p className="grow my-4 text-md text-gray-500">{description}</p>
      </div>

      <div className="bg-gray-200 h-14 rounded-b-lg flex items-center">
        {article && (
          <Link href={article} className="p-2 mr-6 border border-gray-100">
            Article
          </Link>
        )}
        <Link
          href={source}
          className="flex items-center gap-0.5 text-sm text-gray-600 mx-6 border hover:border-b-gray-400"
        >
          GitHub <RxExternalLink />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
