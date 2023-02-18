import Link from "next/link";
import React from "react";

type Props = {};

// <nav className="bg-gray-100 text-gray-700 font-bold flex justify-between items-center -mx-10 p-4 px-10 rounded-3xl  my-10 mb-20">
export const Header = (props: Props) => {
  const linkStyle =
    "block text-gray-400 hover:text-cyan-700 hover:border-b-4 hover:border-cyan-700 transition duration-300";
  return (
    <header>
      <nav className="md:flex justify-between items-center mt-10 mb-20">
        <Link href="/" className="block mb-6 md:mb-0 font-mono hover:text-gray-400 text-gray-500 font-bold text-2xl">
          nshen
        </Link>
        <ul className="h-10 font-mono flex items-center font-semibold text-xl space-x-8">
          <li >
            <Link className={linkStyle} href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className={linkStyle} href="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link className={linkStyle} href="/projects">
              Projects
            </Link>
          </li>
          <li>
            <Link className={linkStyle} href="/links">
              Links
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
