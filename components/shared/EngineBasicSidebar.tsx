"use client";

import Image from "next/image";

import SingleIcon from "@/components/icon/SingleIcon";
import EngineSlider from "@/components/ui/EngineSlider";
import EngineColorInput from "@/components/ui/EngineColorInput";
import EngineSwitch from "@/components/ui/EngineSwitch";

import { preloadedBackgroundImages, preloadedEnvImages } from "@/constant";

export default function EngineBasicSidebar({
  auxiliaryFlag,
  fov,
  near,
  far,
  wireframeFlag,
  wireframeOpacity,
  wireframeColor,
  backgroundFlag,
  backgroundChoice,
  backgroundColor,
  backgroundImage,
  backgroundEnv,
  backgroundBlur,
  backgroundIntensity,
  getAuxiliaryFlag,
  getRotateStatus,
  getFieldOfView,
  getNearClippingDistance,
  getFarClippingDistance,
  getWireframeFlag,
  getWireframeOpacity,
  getWireframeColor,
  getBackgroundFlag,
  getBackgroundColor,
  getBackgroundChoice,
  getBackgroundImage,
  getBackgroundEnv,
  getBackgroundBlur,
  getBackgroundIntensity,
}: {
  auxiliaryFlag: boolean;
  fov: number;
  near: number;
  far: number;
  wireframeFlag: boolean;
  wireframeOpacity: number;
  wireframeColor: string;
  backgroundFlag: boolean;
  backgroundChoice: "C" | "I" | "E";
  backgroundColor: string;
  backgroundImage: number;
  backgroundEnv: number;
  backgroundBlur: number;
  backgroundIntensity: number;
  getAuxiliaryFlag: (flag: boolean) => void;
  getRotateStatus: (axis: "X" | "Y" | "Z", side: 0 | 1) => void;
  getFieldOfView: (fov: number) => void;
  getNearClippingDistance: (near: number) => void;
  getFarClippingDistance: (far: number) => void;
  getWireframeFlag: (flag: boolean) => void;
  getWireframeOpacity: (opacity: number) => void;
  getWireframeColor: (color: string) => void;
  getBackgroundFlag: (flag: boolean) => void;
  getBackgroundColor: (color: string) => void;
  getBackgroundChoice: (choice: "C" | "I" | "E") => void;
  getBackgroundImage: (index: number) => void;
  getBackgroundEnv: (index: number) => void;
  getBackgroundBlur: (blur: number) => void;
  getBackgroundIntensity: (intensity: number) => void;
}) {
  function handleRotate(id: 1 | 2 | 3, side: 0 | 1) {
    if (id === 1) getRotateStatus("X", side);
    else if (id === 2) getRotateStatus("Y", side);
    else if (id === 3) getRotateStatus("Z", side);
  }

  return (
    <>
      <div className="flex flex-col gap-4 px-4">
        <p className="text-zinc-50 text-sm">通用设置</p>

        <EngineSwitch
          id="auxiliaryFlag"
          type="checkbox"
          title="启用辅助线"
          checked={auxiliaryFlag}
          getFlag={(flag) => getAuxiliaryFlag(flag)}
        />

        {[1, 2, 3].map((id) => (
          <div key={id} className="flex justify-between items-center text-sm">
            {id === 1 && <p className="text-zinc-400">沿X轴旋转</p>}
            {id === 2 && <p className="text-zinc-400">沿Y轴旋转</p>}
            {id === 3 && <p className="text-zinc-400">沿Z轴旋转</p>}

            <div className="flex items-center gap-2">
              {[0, 1].map((side) => (
                <SingleIcon
                  key={side}
                  iconUrl={side === 0 ? "/icon/arrow-left.svg" : "/icon/arrow-right.svg"}
                  handleClick={() => handleRotate(id as 1 | 2 | 3, side as 0 | 1)}
                  btnSize="28px"
                  iconSize={16}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <hr className="border-zinc-500" />

      <div className="flex flex-col gap-4 px-4">
        <p className="text-zinc-50 text-sm">摄像机设置</p>

        <EngineSlider
          title="视野角"
          min={1}
          max={179}
          step={0.001}
          defaultValue={fov}
          getValue={(val) => getFieldOfView(val)}
        />
        <EngineSlider
          title="近剪裁距离"
          min={0.0001}
          max={0.005}
          step={0.00001}
          defaultValue={near}
          getValue={(val) => getNearClippingDistance(val)}
        />
        <EngineSlider
          title="远剪裁距离"
          min={1000}
          max={2000}
          step={10}
          defaultValue={far}
          getValue={(val) => getFarClippingDistance(val)}
        />
      </div>

      <hr className="border-zinc-500" />

      <div className="flex flex-col gap-4 px-4">
        <p className="text-zinc-50 text-sm">线框设置</p>

        <EngineSwitch
          id="wireframeFlag"
          type="checkbox"
          title="启用线框"
          checked={wireframeFlag}
          getFlag={(flag) => getWireframeFlag(flag)}
        />
        <EngineSlider
          title="线框透明度"
          min={0}
          max={1}
          step={0.001}
          defaultValue={wireframeOpacity}
          getValue={(val) => getWireframeOpacity(val)}
        />
        <EngineColorInput
          id="wireframeColor"
          title="线框颜色"
          defaultValue={wireframeColor}
          getColor={(color) => getWireframeColor(color)}
        />
      </div>

      <hr className="border-zinc-500" />

      <div className="flex flex-col gap-4 px-4">
        <p className="text-zinc-50 text-sm">背景设置</p>

        <EngineSwitch
          id="backgroundFlag"
          type="checkbox"
          title="启用背景"
          checked={backgroundFlag}
          getFlag={(flag) => getBackgroundFlag(flag)}
        />

        <div className="flex justify-between items-center">
          {["C", "I", "E"].map((choice) => (
            <EngineSwitch
              key={choice}
              id={`backgroundRadio${choice}`}
              type="radio"
              name="backgroundRadio"
              title={choice === "C" ? "启用颜色" : choice === "I" ? "启用图片" : "启用环境"}
              checked={backgroundChoice === choice}
              getChoice={() => getBackgroundChoice(choice as "C" | "I" | "E")}
            />
          ))}
        </div>

        {backgroundChoice === "C" && (
          <EngineColorInput
            id="backgroundColor"
            title="背景颜色"
            defaultValue={backgroundColor}
            getColor={(color) => getBackgroundColor(color)}
          />
        )}

        {backgroundChoice === "I" && (
          <div className="flex flex-col text-white gap-2">
            {preloadedBackgroundImages.map((img) => (
              <div
                key={img.id}
                className={`flex items-center bg-zinc-700 hover:bg-zinc-600  ${
                  backgroundImage === img.id ? "bg-zinc-600" : ""
                } duration-200 rounded cursor-pointer p-3 gap-3`}
                onClick={() => getBackgroundImage(img.id)}
              >
                <Image
                  className="rounded-sm"
                  src={img.path}
                  alt="preloaded-background-image"
                  width={64}
                  height={36}
                  priority
                />
                <span className="text-sm text-zinc-400">{img.name}</span>
              </div>
            ))}
          </div>
        )}

        {backgroundChoice === "E" && (
          <div className="flex flex-col text-white gap-2">
            {preloadedEnvImages.map((env) => (
              <div
                key={env.id}
                className={`flex items-center bg-zinc-700 hover:bg-zinc-600 ${
                  backgroundEnv === env.id ? "bg-zinc-600" : ""
                } duration-200 rounded cursor-pointer p-3 gap-3`}
                onClick={() => getBackgroundEnv(env.id)}
              >
                <Image
                  className="rounded-sm"
                  src={env.preview}
                  alt="preloaded-env-image"
                  width={64}
                  height={36}
                  priority
                />
                <span className="text-sm text-zinc-400">{env.name}</span>
              </div>
            ))}
          </div>
        )}

        {backgroundChoice === "E" && (
          <EngineSlider
            title="背景虚化"
            min={0}
            max={1}
            step={0.001}
            defaultValue={backgroundBlur}
            getValue={(val) => getBackgroundBlur(val)}
          />
        )}

        {["I", "E"].includes(backgroundChoice) && (
          <EngineSlider
            title="背景亮度"
            min={0}
            max={1}
            step={0.001}
            defaultValue={backgroundIntensity}
            getValue={(val) => getBackgroundIntensity(val)}
          />
        )}
      </div>
    </>
  );
}
