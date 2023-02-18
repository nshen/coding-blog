import React, { PropsWithChildren } from "react";

type Props = {
  title: string;
  subtitle?: string;
};

export const MainPage = ({
  title,
  subtitle,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <main className="grow flex flex-col justify-start">
      <h1 className="text-center font-mono font-semibold text-cyan-800 text-4xl mb-6">
        {title}
      </h1>
      <p className="mb-10 text-center text-2xl text-gray-400">{subtitle}</p>
      {children}
    </main>
  );
};
