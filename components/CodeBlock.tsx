"use client"

import React from "react";

const CodeBlock = (props: any) => {
  return (
    <div className="relative border border-black not-prose">
      <p className="absolute right-4 top-2 text-gray-300" >{props["data-language"] || "Text"}</p>
      <pre {...props}>{props.children}</pre>
    </div>
  );
};

export default CodeBlock;
