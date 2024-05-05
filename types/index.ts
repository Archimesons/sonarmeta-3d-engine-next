export type SidebarType = "B" | "L" | "T" | "P" | "M" | "A" | "V";

export type LightBarContentType = {
  id: number;
  type: LightTypeType;
  name: LightNameType;
};

export type LightType = {
  index: 1 | 2 | 3;
  type: LightTypeType;
  name: LightNameType;
  color: string;
  intensity: number;
  visible: boolean;
  decay: number;
  angle: number;
  penumbra: number;
  attachedToCamera: boolean;
  castShadow: boolean;
  shadowBias: number;
};

type LightTypeType = "D" | "P" | "S" | "H" | "N";
type LightNameType = "平行光" | "点光" | "聚光" | "半球光" | "禁用";
