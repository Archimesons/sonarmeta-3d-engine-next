"use client";

import Image from "next/image";
import { useState } from "react";

export default function EngineIcon({
  iconUrl,
  tip,
  handleClick,
  size,
}: {
  iconUrl: string;
  tip: string;
  handleClick: () => void;
  size: number;
}) {
  const [tipFlag, setTipFlag] = useState<boolean>(false);

  return (
    <div
      className="relative w-9 h-9 hover:bg-zinc-600 duration-200 flex justify-center items-center rounded-full cursor-pointer"
      onMouseEnter={() => setTipFlag(true)}
      onMouseLeave={() => setTipFlag(false)}
      onClick={handleClick}
    >
      <Image src={iconUrl} alt="engine-icon" width={size} height={size} priority />

      <div
        className={`absolute ${
          tipFlag ? "block" : "hidden"
        } duration-200 min-w-[50px] bg-zinc-900 rounded-sm -top-8 text-center text-white text-xs p-1`}
      >
        {tip}
      </div>
    </div>
  );
}
