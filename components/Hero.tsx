import React from "react";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  twitter?: string;
  github?: string;
  telegram?: string;
  linkedin?: string;
};

export const Hero = (props: Props) => {
  const { title, subtitle, description, twitter, github, telegram, linkedin } =
    props;
  return (
    <div className="flex items-center justify-between">
      <div className="basis-3/5 space-y-7">
        <h2 className="font-bold text-6xl"> {title}</h2>
        <p className="">{subtitle}</p>
        <p className="leading-6">{description}</p>
        <div className="flex items-center space-x-3">
          {twitter && (
            <SocialIcon bgColor="gray" target="_blank" url={twitter} />
          )}
          {github && <SocialIcon bgColor="gray" target="_blank" url={github} />}
          {telegram && (
            <SocialIcon bgColor="gray" target="_blank" url={telegram} />
          )}
          {linkedin && (
            <SocialIcon bgColor="gray" target="_blank" url={linkedin} />
          )}
        </div>
      </div>
      <div className="basis-2/5 m-2 ">
        <Image
          className="ml-auto drop-shadow-xl"
          alt="logo"
          width={300}
          height={427}
          src="/images/hero.png"
        ></Image>
      </div>
    </div>
  );
};
