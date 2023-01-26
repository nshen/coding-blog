import React from "react";
import { SocialIcon } from "react-social-icons";
import Image from "next/image";

type Props = {
  title: string;
};

export const Hero = (props: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="basis-3/5 space-y-7">
        <h2 className="font-bold text-6xl"> {props.title}</h2>
        <p className="">Welcome to my digital garden. 🌱</p>
        <p className="leading-6">
          I a self taughtjslkdfjskdl jsd lfjsklfjl dlajf lkfldj alfjlafj asldj
          lajfl ajflkajf afj alskjflasjf salfj aljfla fd.
        </p>
        <div className="flex items-center space-x-3">
          <SocialIcon
            bgColor="gray"
            target="_blank"
            url="https://www.twitter.com/nshen121"
          />
          <SocialIcon
            bgColor="gray"
            target="_blank"
            url="https://github.com/nshen"
          />
          <SocialIcon
            bgColor="gray"
            target="_blank"
            url="https://t.me/nshen121"
          />
          <SocialIcon
            bgColor="gray"
            target="_blank"
            url="https://www.linkedin.com/in/nshen121"
          />
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
