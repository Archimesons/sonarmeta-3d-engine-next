"use client";

import { useState } from "react";

export default function EngineSwitch({
  id,
  title,
  defaultChecked,
  getFlag,
}: {
  id: string;
  title: string;
  defaultChecked: boolean;
  getFlag: (flag: boolean) => void;
}) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center text-sm gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
          getFlag(e.target.checked);
        }}
      />

      <label className="text-zinc-400" htmlFor={id}>
        {title}
      </label>
    </div>
  );
}
