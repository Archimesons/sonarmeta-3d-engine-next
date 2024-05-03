"use client";

import Image from "next/image";

export default function SingleIcon({
  iconUrl,
  isActive,
  handleClick,
  btnSize,
  iconSize,
}: {
  iconUrl: string;
  isActive?: boolean;
  handleClick: () => void;
  btnSize: string;
  iconSize: number;
}) {
  return (
    <div
      className={`flex justify-center items-center rounded-md duration-100 cursor-pointer ${
        isActive ? "bg-zinc-500" : "bg-zinc-700 hover:bg-zinc-600"
      }`}
      style={{ width: btnSize, height: btnSize }}
      onClick={() => handleClick()}
    >
      <Image className="text-white" src={iconUrl} alt="single-icon" width={iconSize} height={iconSize} priority />
    </div>
  );
}
