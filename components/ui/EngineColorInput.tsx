"use client";

import { useEffect, useState } from "react";

export default function EngineColorInput({
  id,
  title,
  defaultValue,
  getColor,
}: {
  id: string;
  title: string;
  defaultValue: string;
  getColor: (color: string) => void;
}) {
  const [color, setColor] = useState<string>(defaultValue);

  useEffect(() => {
    setColor(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex justify-between items-center">
      <p className="text-zinc-400 text-sm">{title}</p>

      <div className="flex items-center gap-2">
        <input
          id={id}
          className="w-[27px] h-[30px] bg-transparent cursor-pointer"
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            getColor(e.target.value);
          }}
        />

        <label className="text-zinc-50 text-sm cursor-pointer" htmlFor={id}>
          {color.toUpperCase()}
        </label>
      </div>
    </div>
  );
}
