"use client";

import { Article } from "@/api/article";
import Link from "next/link";
import React from "react";
import { AiOutlineTag } from "react-icons/ai";
import { TbArrowBigRightLines } from "react-icons/tb";
import { MainPage } from "./MainPage";

type ArticleListProps = {
  articles: Article[];
};

const ArticleList = ({ articles }: ArticleListProps) => {
  const tags: Record<string, Article[]> = {};
  articles.forEach((article) => {
    article.meta.tags.forEach((tag: string) => {
      tags[tag] ? tags[tag].push(article) : (tags[tag] = [article]);
    });
  });
  const tagkeys = Object.keys(tags);
  const btns = tagkeys.map((tag) => (
    <a
      key={tag}
      href={"/tags#" + tag}
      className="px-6 py-2 m-2 shadow rounded-full border border-gray-300 flex items-center gap-2 hover:bg-cyan-600 hover:text-white transition"
    >
      <AiOutlineTag />
      {tag + " | " + tags[tag].length}
    </a>
  ));

  const postPreview = tagkeys.map((tag: string) => (
    <div
      id={tag}
      key={tag}
      className="flex flex-col space-y-2 target:font-bold target:text-sky-600"
    >
      <h2 className="font-semibold pl-2 py-6 text-3xl">{tag}</h2>
      {tags[tag].map((article) => (
        <Link href={`/${article.meta.slug}`} key={article.meta.slug}>
          <div className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-4 rounded-xl">
            <h2 className="font-semibold text-xl text-gray-600">
              {article.meta.title}
            </h2>
            <time className="font-semibold text-gray-500"></time>
          </div>
        </Link>
      ))}
    </div>
  ));

  return (
    <MainPage title="Tags">
      <section className="flex flex-wrap items-center justify-center">
        {btns}
      </section>
      {postPreview}
    </MainPage>
  );
};

export default ArticleList;
