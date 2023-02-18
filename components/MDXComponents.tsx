import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";
import CodeBlock from "./CodeBlock";

const components = {
  h1: (props: any) => (
    <h1 {...props} className="text-4xl font-semibold mb-5">
      {props.children}
    </h1>
  ),

  h2: (props: any) => (
    <h2 {...props} className="text-2xl font-semibold mb-6 mt-10">
      {props.children}
    </h2>
  ),

  a: (props: any) => {
    const style =
      "inline-flex items-center gap-1 text-cyan-800 no-underline hover:underline font-semibold my-0 mx-1";
    return props.href.indexOf("http") >= 0 ? (
      <a {...props} className={style} target="_blank" rel="nofollow">
        {props.children}
        <RxExternalLink />
      </a>
    ) : (
      <a {...props} className={style}>
        {props.children}
      </a>
    );
  },

  pre: CodeBlock,
};

export default components;
