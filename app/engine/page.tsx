"use client";

import { useState } from "react";
import Image from "next/image";

import Engine from "@/components/engine/Engine";
import EngineTopbar from "@/components/shared/EngineTopbar";
import EngineBasicSidebar from "@/components/shared/EngineBasicSidebar";

import { lightPresets1, lightPresets2, lightPresets3, sidebarFlagImage } from "@/constant";
import { LightType, SidebarType } from "@/types";
import EngineLightSidebar from "@/components/shared/EngineLightSidebar";

export default function EnginePage() {
  const [sidebarFlag, setSidebarFlag] = useState<SidebarType>("B");

  // Basic settings
  const [path, setPath] = useState<string>(
    "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/test-models/SK_Cartoon_Female_059/SK_Cartoon_Female_059.gltf"
  );
  const [rotateStatus, setRotateStatus] = useState<{ axis: "X" | "Y" | "Z"; side: 0 | 1; flag: boolean }>({
    axis: "X",
    side: 0,
    flag: false,
  });
  const [auxiliaryFlag, setAuxiliaryFlag] = useState<boolean>(false);
  const [fov, setFov] = useState<number>(45);
  const [near, setNear] = useState<number>(0.005);
  const [far, setFar] = useState<number>(1000);
  const [wireframeFlag, setWireframeFlag] = useState<boolean>(false);
  const [wireframeOpacity, setWireframeOpacity] = useState<number>(1);
  const [wireframeColor, setWireframeColor] = useState<string>("#000000");
  const [backgroundFlag, setBackgroundFlag] = useState<boolean>(true);
  const [backgroundChoice, setBackgroundChoice] = useState<"C" | "I" | "E">("C");
  const [backgroundColor, setBackgroundColor] = useState<string>("#565656");
  const [backgroundImage, setBackgroundImage] = useState<number>(0);
  const [backgroundEnv, setBackgroundEnv] = useState<number>(0);
  const [backgroundBlur, setBackgroundBlur] = useState<number>(0.5);
  const [backgroundIntensity, setBackgroundIntensity] = useState<number>(1);

  // Light settings
  const [lightFlag, setLightFlag] = useState<boolean>(false);
  const [lightChoice, setLightChoice] = useState<1 | 2 | 3>(1);
  const [lights, setLights] = useState<LightType[]>([lightPresets1, lightPresets2, lightPresets3]);

  return (
    <>
      <EngineTopbar />

      <div className="flex h-[calc(100vh-55px)]">
        <div className="flex-[0_0_336px] flex flex-col overflow-auto overscroll-contain h-full bg-zinc-800 pb-12 gap-4">
          {/* Sidebar selector */}
          <div className="flex justify-between items-center">
            {sidebarFlagImage.map((item) => (
              <div
                className={`flex justify-center items-center w-[48px] h-[48px] ${
                  sidebarFlag === item.flag ? "bg-zinc-700" : ""
                } hover:bg-zinc-700 border-b-[1px] border-zinc-500 duration-200 cursor-pointer`}
                key={item.flag}
                onClick={() => setSidebarFlag(item.flag as SidebarType)}
              >
                <Image src={item.path} alt="sidebarFlagImage" width={item.size} height={item.size} priority />
              </div>
            ))}
          </div>

          {sidebarFlag === "B" && (
            <EngineBasicSidebar
              // Default values
              auxiliaryFlag={auxiliaryFlag}
              fov={fov}
              near={near}
              far={far}
              wireframeFlag={wireframeFlag}
              wireframeOpacity={wireframeOpacity}
              wireframeColor={wireframeColor}
              backgroundFlag={backgroundFlag}
              backgroundChoice={backgroundChoice}
              backgroundColor={backgroundColor}
              backgroundImage={backgroundImage}
              backgroundEnv={backgroundEnv}
              backgroundBlur={backgroundBlur}
              backgroundIntensity={backgroundIntensity}
              // Getter functions
              getAuxiliaryFlag={(flag) => setAuxiliaryFlag(flag)}
              getRotateStatus={(axis, side) =>
                setRotateStatus(({ flag }) => {
                  return { axis, side, flag: !flag };
                })
              }
              getFieldOfView={(fov) => setFov(fov)}
              getNearClippingDistance={(near) => setNear(near)}
              getFarClippingDistance={(far) => setFar(far)}
              getWireframeFlag={(flag) => setWireframeFlag(flag)}
              getWireframeOpacity={(opacity) => setWireframeOpacity(opacity)}
              getWireframeColor={(color) => setWireframeColor(color)}
              getBackgroundFlag={(flag) => setBackgroundFlag(flag)}
              getBackgroundChoice={(choice) => setBackgroundChoice(choice)}
              getBackgroundColor={(color) => setBackgroundColor(color)}
              getBackgroundImage={(index) => setBackgroundImage(index)}
              getBackgroundEnv={(index) => setBackgroundEnv(index)}
              getBackgroundBlur={(blur) => setBackgroundBlur(blur)}
              getBackgroundIntensity={(intensity) => setBackgroundIntensity(intensity)}
            />
          )}

          {sidebarFlag === "L" && (
            <EngineLightSidebar
              lightFlag={lightFlag}
              lightChoice={lightChoice}
              lights={lights}
              getLightFlag={(flag) => setLightFlag(flag)}
              getLightChoice={(choice) => setLightChoice(choice)}
              getLights={(lights) => setLights(lights)}
            />
          )}
        </div>

        <Engine
          path={path}
          auxiliaryFlag={auxiliaryFlag}
          rotateStatus={rotateStatus}
          fov={fov}
          near={near}
          far={far}
          wireframeFlag={wireframeFlag}
          wireframeOpacity={wireframeOpacity}
          wireframeColor={wireframeColor}
          backgroundFlag={backgroundFlag}
          backgroundChoice={backgroundChoice}
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
          backgroundEnv={backgroundEnv}
          backgroundBlur={backgroundBlur}
          backgroundIntensity={backgroundIntensity}
          lightFlag={lightFlag}
          lightChoice={lightChoice}
          lights={lights}
        />
      </div>
    </>
  );
}
