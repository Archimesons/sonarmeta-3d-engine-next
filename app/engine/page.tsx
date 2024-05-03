"use client";

import { useState } from "react";

import Engine from "@/components/engine/Engine";
import EngineTopbar from "@/components/shared/EngineTopbar";
import EngineBasicSidebar from "@/components/shared/EngineBasicSidebar";

export default function EnginePage() {
  const [sidebarFlag, setSidebarFlag] = useState<string>("BASIC");

  const [path, setPath] = useState<string>(
    "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-model/phoenix_bird.glb"
  );
  const [rotateModelFlag, setRotateModelFlag] = useState<{ axis: "X" | "Y" | "Z"; side: 0 | 1; flag: boolean }>({
    axis: "X",
    side: 0,
    flag: false,
  });
  const [fov, setFov] = useState<number>(45);
  const [near, setNear] = useState<number>(0.005);
  const [far, setFar] = useState<number>(1000);

  return (
    <>
      <EngineTopbar />

      <div className="flex h-[calc(100vh-55px)]">
        <div className="flex-[0_0_340px] flex flex-col overflow-auto overscroll-contain h-full bg-zinc-800 py-4 gap-4">
          {sidebarFlag === "BASIC" && (
            <EngineBasicSidebar
              getRotateStatus={(axis, side) =>
                setRotateModelFlag(({ flag }) => {
                  return { axis, side, flag: !flag };
                })
              }
              getFieldOfView={(fov) => setFov(fov)}
              getNearClippingDistance={(near) => setNear(near)}
              getFarClippingDistance={(far) => setFar(far)}
            />
          )}
        </div>

        <Engine path={path} fov={fov} near={near} far={far} />
      </div>
    </>
  );
}
