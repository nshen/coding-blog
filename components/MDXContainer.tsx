import React, { ReactNode } from "react";

const MDXContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="prose 
        prose-blockquote:font-serif prose-blockquote:not-italic prose-blockquote:bg-gray-100 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:tracking-wider
        prose-img:mx-auto prose-img:rounded-lg
        prose-li:my-1
        max-w-none"
    >
      {children}
    </div>
  );
};

export default MDXContainer;
