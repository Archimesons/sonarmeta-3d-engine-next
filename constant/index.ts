import { LightBarContentType, LightType } from "@/types";

export const preloadedBackgroundImages = [
  {
    id: 0,
    name: "Background 1",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-background-image/virtual1.png",
  },
  {
    id: 1,
    name: "Background 2",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-background-image/virtual2.png",
  },
  {
    id: 2,
    name: "Background 3",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-background-image/virtual3.png",
  },
  {
    id: 3,
    name: "Background 4",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-background-image/virtual4.png",
  },
];

export const preloadedEnvImages = [
  {
    id: 0,
    name: "Environment Map 1",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr1.exr",
    preview: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr1.png",
  },
  {
    id: 1,
    name: "Environment Map 2",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr2.exr",
    preview: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr2.png",
  },
  {
    id: 2,
    name: "Environment Map 3",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr3.exr",
    preview: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr3.png",
  },
  {
    id: 3,
    name: "Environment Map 4",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr4.exr",
    preview: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr4.png",
  },
  {
    id: 4,
    name: "Environment Map 5",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr5.exr",
    preview: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr5.png",
  },
  {
    id: 5,
    name: "Environment Map 6",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr6.exr",
    preview: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr6.png",
  },
  {
    id: 6,
    name: "Environment Map 7",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr7.exr",
    preview: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-environment/exr7.png",
  },
];

export const preloadedMatcapImages = [
  {
    id: 0,
    name: "Gypsum",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-matcap/matcap1.png",
  },
  {
    id: 1,
    name: "Cement",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-matcap/matcap2.png",
  },
  {
    id: 2,
    name: "Snowball",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-matcap/matcap3.png",
  },
  {
    id: 3,
    name: "Metal",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-matcap/matcap4.png",
  },
  {
    id: 4,
    name: "Steel",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-matcap/matcap5.png",
  },
  {
    id: 5,
    name: "Pearl",
    path: "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/preloaded-matcap/matcap6.png",
  },
];

export const backgroundTransparentImage =
  "https://sonarmeta.oss-cn-shenzhen.aliyuncs.com/public-assets/transparent.jpg";

export const sidebarFlagImage = [
  { flag: "B", path: "/icon/gear.svg", size: 26 },
  { flag: "L", path: "/icon/light.svg", size: 15 },
  { flag: "T", path: "/icon/image.svg", size: 24 },
  { flag: "P", path: "/icon/camera-viewfinder.svg", size: 22 },
  { flag: "M", path: "/icon/location.svg", size: 16 },
  { flag: "A", path: "/icon/animation.svg", size: 23 },
  { flag: "V", path: "/icon/glass.svg", size: 32 },
];

export const lightBarContent: LightBarContentType[] = [
  { id: 0, type: "D", name: "平行光" },
  { id: 1, type: "P", name: "点光" },
  { id: 2, type: "S", name: "聚光" },
  { id: 3, type: "H", name: "半球光" },
  { id: 4, type: "N", name: "禁用" },
];

export const lightPresets1: LightType = {
  index: 1,
  type: "D",
  name: "平行光",
  color: "#6CBBFF",
  intensity: 0.12,
  visible: true,
  decay: 0,
  angle: 0,
  penumbra: 0,
  attachedToCamera: false,
  castShadow: false,
  shadowBias: 0.2659,
  position: { x: 2, y: 2, z: 2 },
};
export const lightPresets2: LightType = {
  index: 2,
  type: "P",
  name: "点光",
  color: "#FFE0B5",
  intensity: 1,
  visible: true,
  decay: 0.5,
  angle: 0,
  penumbra: 0,
  attachedToCamera: false,
  castShadow: false,
  shadowBias: 0.2659,
  position: { x: -2, y: -2, z: -2 },
};
export const lightPresets3: LightType = {
  index: 3,
  type: "S",
  name: "聚光",
  color: "#0C9D41",
  intensity: 0.8553,
  visible: true,
  decay: 0.5,
  angle: 25,
  penumbra: 0.5,
  attachedToCamera: false,
  castShadow: false,
  shadowBias: 0.2659,
  position: { x: -2, y: 2, z: 2 },
};
