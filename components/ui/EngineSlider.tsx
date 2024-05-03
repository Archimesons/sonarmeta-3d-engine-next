"use client";

import { ChangeEvent, useState } from "react";

export default function EngineSlider({
  title,
  min,
  max,
  step,
  defaultValue,
  getValue,
}: {
  title?: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  getValue: (val: number) => void;
}) {
  const [value, setValue] = useState<number>(defaultValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let val = Number(e.target.value);

    if (typeof val !== "number") val = defaultValue;
    else if (val < min) val = min;
    else if (val > max) val = max;

    setValue(val);
    getValue(val);
  }

  return (
    <div className="text-sm">
      {title && <label className="text-zinc-400">{title}</label>}
      
      <div className="flex justify-between items-center gap-2">
        <input
          className="w-full appearance-none h-2 rounded bg-[#323640] outline-none slider-thumb"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
        />

        <input
          className="text-center text-white w-[55px] h-[25px] rounded bg-[#323640] hover:bg-[#404856] duration-200"
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
