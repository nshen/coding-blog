import React from "react";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";
import heroPng from "@/public/images/hero.png";

type Props = {
  title: string;
  subtitle: string;
  description: string;
  twitter?: string;
  github?: string;
  telegram?: string;
  linkedin?: string;
  email?: string;
};

export const Hero = ({
  title,
  subtitle,
  description,
  twitter,
  github,
  telegram,
  linkedin,
  email,
}: Props) => {
  return (
    <div className="md:flex items-center justify-between">
      <div className="md:basis-3/5 space-y-7 flex flex-col items-center justify-center md:block ">
        <h2 className="inline-block font-bold text-3xl md:text-4xl lg:text-6xl text-cyan-700">
          {title}
        </h2>
        <p className="font-medium text-gray-600">{subtitle}</p>
        <p className="font-medium text-gray-400">{description}</p>
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
          {email && (
            <SocialIcon
              bgColor="gray"
              target="_blank"
              url={`mailto:${email}`}
            />
          )}
        </div>
      </div>
      <div className="basis-2/5 m-2 relative hidden md:block">
        <div id="heroBlur" className="hover:opacity-20 absolute inset-0 rounded-full filter blur-2xl bg-cyan-500 opacity-0 transition duration-1000"></div>
        <Image className="ml-auto" alt="Hero" src={heroPng} priority></Image>
      </div>
    </div>
  );
};
