"use client";

import Image from "next/image";

import SingleIcon from "@/components/icon/SingleIcon";
import EngineSlider from "@/components/ui/EngineSlider";

export default function EngineBasicSidebar({
  getRotateStatus,
  getFieldOfView,
  getNearClippingDistance,
  getFarClippingDistance,
}: {
  getRotateStatus: (axis: "X" | "Y" | "Z", side: 0 | 1) => void;
  getFieldOfView: (fov: number) => void;
  getNearClippingDistance: (near: number) => void;
  getFarClippingDistance: (far: number) => void;
}) {
  function handleRotate(id: 1 | 2 | 3, side: 0 | 1) {
    if (id === 1) getRotateStatus("X", side);
    else if (id === 2) getRotateStatus("Y", side);
    else if (id === 3) getRotateStatus("Z", side);
  }

  return (
    <>
      <div className="flex flex-col gap-2 px-4">
        <p className="text-zinc-50 text-sm">模型旋转</p>

        {[1, 2, 3].map((id) => (
          <div key={id} className="flex justify-between items-center text-sm">
            {id === 1 && <p className="text-zinc-400">沿X轴方向</p>}
            {id === 2 && <p className="text-zinc-400">沿Y轴方向</p>}
            {id === 3 && <p className="text-zinc-400">沿Z轴方向</p>}

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

      <div className="flex flex-col gap-2 px-4">
        <p className="text-zinc-50 text-sm">摄像机设置</p>

        <EngineSlider
          title="视场角"
          min={1}
          max={179}
          step={0.001}
          defaultValue={45}
          getValue={(val) => getFieldOfView(val)}
        />

        <EngineSlider
          title="近剪裁距离"
          min={0.0001}
          max={0.005}
          step={0.00001}
          defaultValue={0.005}
          getValue={(val) => getNearClippingDistance(val)}
        />
        <EngineSlider
          title="远剪裁距离"
          min={1000}
          max={2000}
          step={10}
          defaultValue={1000}
          getValue={(val) => getFarClippingDistance(val)}
        />
      </div>
    </>
  );
}
