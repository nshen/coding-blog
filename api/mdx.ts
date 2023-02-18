import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm"; // Tables, footnotes, strikethrough, task lists, literal URLs.
import rehypePrettyCode from "rehype-pretty-code";
import mdxComponents from "@/components/MDXComponents";
import { readFile } from "node:fs/promises";

// rehypePrettyCode options
const options = {
  // Use one of Shiki's packaged themes
  // theme: "one-dark-pro",
  theme: "one-dark-pro",
  // Keep the background or use a custom background color?
  keepBackground: true,
  // Callback hooks to add custom logic to nodes when visiting
  // them.
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: any) {
    // Each line node by default has `class="line"`.
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node: any) {
    // Each word node has no className by default.
    node.properties.className = ["word"];
  },
};

async function compile(source: string): Promise<{
  content: JSX.Element;
  frontmatter: Record<string, string> | undefined;
}> {
  /* @ts-expect-error Server Component */
  const result =  await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, options]],
        format: "mdx",
      },
    },
    components: mdxComponents,
  });
  
  if (result === undefined){
    throw new Error("MDX result undefined")
  }
  return result
}

async function compileFile(path: string) {
  try {
    const source = await readFile(path, { encoding: "utf8" });
    return await compile(source);
  } catch (error) {
    console.error("MDX Compile Failed", error);
  }
}

export { compile, compileFile };
