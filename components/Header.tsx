import Link from "next/link";
import React from "react";

type Props = {};

export const Header = (props: Props) => {
  return (
    <header>
      <nav className="flex justify-between items-center mx-auto py-10">
        <Link href="/">
          <h1 className="font-serif text-2xl">nshen</h1>
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>Links</li>
        </ul>
      </nav>
    </header>
  );
};
