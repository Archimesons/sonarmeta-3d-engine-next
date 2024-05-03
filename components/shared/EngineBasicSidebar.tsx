"use client";

import SingleIcon from "@/components/icon/SingleIcon";
import EngineSlider from "@/components/ui/EngineSlider";
import EngineColorInput from "@/components/ui/EngineColorInput";
import EngineSwitch from "../ui/EngineSwitch";

export default function EngineBasicSidebar({
  auxiliaryFlag,
  fov,
  near,
  far,
  wireframeFlag,
  wireframeOpacity,
  wireframeColor,
  getAuxiliaryFlag,
  getRotateStatus,
  getFieldOfView,
  getNearClippingDistance,
  getFarClippingDistance,
  getWireframeFlag,
  getWireframeOpacity,
  getWireframeColor,
}: {
  auxiliaryFlag: boolean;
  fov: number;
  near: number;
  far: number;
  wireframeFlag: boolean;
  wireframeOpacity: number;
  wireframeColor: string;
  getAuxiliaryFlag: (flag: boolean) => void;
  getRotateStatus: (axis: "X" | "Y" | "Z", side: 0 | 1) => void;
  getFieldOfView: (fov: number) => void;
  getNearClippingDistance: (near: number) => void;
  getFarClippingDistance: (far: number) => void;
  getWireframeFlag: (flag: boolean) => void;
  getWireframeOpacity: (opacity: number) => void;
  getWireframeColor: (color: string) => void;
}) {
  function handleRotate(id: 1 | 2 | 3, side: 0 | 1) {
    if (id === 1) getRotateStatus("X", side);
    else if (id === 2) getRotateStatus("Y", side);
    else if (id === 3) getRotateStatus("Z", side);
  }

  return (
    <>
      <div className="flex flex-col gap-4 px-4">
        <p className="text-zinc-50 text-sm">基础设置</p>

        <EngineSwitch
          id="auxiliaryFlag"
          title="启用辅助线"
          defaultChecked={auxiliaryFlag}
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
          title="视场角"
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
          title="启用线框"
          defaultChecked={wireframeFlag}
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
    </>
  );
}
