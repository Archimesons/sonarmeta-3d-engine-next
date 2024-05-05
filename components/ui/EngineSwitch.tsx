"use client";

import { ChangeEvent } from "react";

export default function EngineSwitch({
  id,
  type,
  name,
  title,
  checked,
  getFlag,
  getChoice,
}: {
  id: string;
  type: "checkbox" | "radio";
  name?: string;
  title: string;
  checked?: boolean;
  getFlag?: (flag: boolean) => void;
  getChoice?: () => void;
}) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    getFlag?.(e.target.checked);
    getChoice?.();
  }

  return (
    <div className="flex items-center text-sm gap-2">
      <input className="cursor-pointer" id={id} type={type} name={name} checked={checked} onChange={handleChange} />

      <label className="text-zinc-400 cursor-pointer" htmlFor={id}>
        {title}
      </label>
    </div>
  );
}
