"use client";

import Image from "next/image";

import EngineSlider from "@/components/ui/EngineSlider";
import EngineColorInput from "@/components/ui/EngineColorInput";
import EngineSwitch from "@/components/ui/EngineSwitch";

import { lightBarContent } from "@/constant";
import { LightType } from "@/types";

export default function EngineLightSidebar({
  lightFlag,
  lightChoice,
  lights,
  getLightFlag,
  getLightChoice,
  getLights,
}: {
  lightFlag: boolean;
  lightChoice: 1 | 2 | 3;
  lights: LightType[];
  getLightFlag: (flag: boolean) => void;
  getLightChoice: (choice: 1 | 2 | 3) => void;
  getLights: (lights: LightType[]) => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-4 px-4">
        <p className="text-zinc-50 text-sm">光源设置</p>

        <EngineSwitch
          id="lightFlag"
          type="checkbox"
          title="启用光源"
          checked={lightFlag}
          getFlag={(flag) => getLightFlag(flag)}
        />

        <div className="flex flex-col text-sm gap-2">
          {lights.map((light: LightType) => (
            <div
              key={light.index}
              className={`flex justify-between items-center bg-zinc-700 hover:bg-zinc-600 ${
                lightChoice === light.index ? "bg-zinc-600" : ""
              } duration-200 rounded cursor-pointer p-3`}
              onClick={() => getLightChoice(light.index)}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: light.color }} />
                <span className="text-zinc-400">
                  {light.index}：{light.name}
                </span>
              </div>

              <Image
                className="cursor-pointer"
                src={light.visible ? "/icon/eye.svg" : "/icon/eye-slash.svg"}
                alt="eye-icon"
                width={16}
                height={16}
                priority
                onClick={() => {
                  const lightsCopy = [...lights];
                  lightsCopy[light.index - 1].visible = !lightsCopy[light.index - 1].visible;
                  getLights(lightsCopy);
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-sm">
          {lightBarContent.map(({ id, type, name }) => (
            <EngineSwitch
              key={id}
              id={`lightRadio${type}`}
              type="radio"
              name="lightTypeRadio"
              title={name}
              checked={lights[lightChoice - 1].type === type}
              getChoice={() => {
                const lightsCopy = [...lights];
                lightsCopy[lightChoice - 1].type = type;
                lightsCopy[lightChoice - 1].name = name;
                getLights(lightsCopy);
              }}
            />
          ))}
        </div>

        {lights[lightChoice - 1].type !== "N" && (
          <>
            <EngineColorInput
              id="lightColor"
              title="光源颜色"
              defaultValue={lights[lightChoice - 1].color}
              getColor={(color) => {
                const lightsCopy = [...lights];
                lightsCopy[lightChoice - 1].color = color;
                getLights(lightsCopy);
              }}
            />
            <EngineSlider
              title="光源强度"
              min={0}
              max={10}
              step={0.0001}
              defaultValue={lights[lightChoice - 1].intensity}
              getValue={(val) => {
                const lightsCopy = [...lights];
                lightsCopy[lightChoice - 1].intensity = val;
                getLights(lightsCopy);
              }}
            />
          </>
        )}

        {["D", "H"].includes(lights[lightChoice - 1].type) && (
          <EngineSwitch
            id="attachedToCamera"
            type="checkbox"
            title="启用追踪摄像机"
            checked={lights[lightChoice - 1].attachedToCamera}
            getFlag={(flag) => {
              const lightsCopy = [...lights];
              lightsCopy[lightChoice - 1].attachedToCamera = flag;
              getLights(lightsCopy);
            }}
          />
        )}

        {["P", "S"].includes(lights[lightChoice - 1].type) && (
          <EngineSlider
            title="光源半衰"
            min={0}
            max={1}
            step={0.001}
            defaultValue={lights[lightChoice - 1].decay}
            getValue={(val) => {
              const lightsCopy = [...lights];
              lightsCopy[lightChoice - 1].decay = val;
              getLights(lightsCopy);
            }}
          />
        )}

        {lights[lightChoice - 1].type === "S" && (
          <>
            <EngineSlider
              title="光源角度"
              min={1}
              max={90}
              step={0.1}
              defaultValue={lights[lightChoice - 1].angle}
              getValue={(val) => {
                const lightsCopy = [...lights];
                lightsCopy[lightChoice - 1].angle = val;
                getLights(lightsCopy);
              }}
            />
            <EngineSlider
              title="光源半影"
              min={0}
              max={1}
              step={0.0001}
              defaultValue={lights[lightChoice - 1].penumbra}
              getValue={(val) => {
                const lightsCopy = [...lights];
                lightsCopy[lightChoice - 1].penumbra = val;
                getLights(lightsCopy);
              }}
            />
          </>
        )}

        {["D", "S"].includes(lights[lightChoice - 1].type) && (
          <>
            <EngineSwitch
              id="castShadow"
              type="checkbox"
              title="启用投影"
              checked={lights[lightChoice - 1].castShadow}
              getFlag={(flag) => {
                const lightsCopy = [...lights];
                lightsCopy[lightChoice - 1].castShadow = flag;
                getLights(lightsCopy);
              }}
            />
            <EngineSlider
              title="投影偏差"
              min={0}
              max={1}
              step={0.0001}
              defaultValue={lights[lightChoice - 1].shadowBias}
              getValue={(val) => {
                const lightsCopy = [...lights];
                lightsCopy[lightChoice - 1].shadowBias = val;
                getLights(lightsCopy);
              }}
            />
          </>
        )}
      </div>

      <hr className="border-zinc-500" />
    </>
  );
}
