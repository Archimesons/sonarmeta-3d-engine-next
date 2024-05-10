"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

import EngineIcon from "@/components/icon/EngineIcon";

import { render, screenShot, toggleFullScreen, onCanvasResize } from "@/utils/core";
import { getModelFromLoader } from "@/utils/loader";
import { rotateModelAnimate } from "@/utils/rotation";
import { generateLineSegments, removeLineSegments } from "@/utils/wireframe";
import { handleBackgroundConfig } from "@/utils/background";
import {
  attachLightControls,
  detachLightControls,
  initLight,
  initLightControls,
  modifyLight,
  removeLight,
} from "@/utils/light";

import { LightType } from "@/types";

export default function Engine({
  path,
  auxiliaryFlag,
  rotateStatus,
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
  lightFlag,
  lightChoice,
  lights,
}: {
  path: string;
  auxiliaryFlag: boolean;
  rotateStatus: { axis: "X" | "Y" | "Z"; side: 0 | 1; flag: boolean };
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
  lightFlag: boolean;
  lightChoice: 1 | 2 | 3;
  lights: LightType[];
}) {
  const [progress, setProgress] = useState<number>(0);
  const [itemsLoaded, setItemsLoaded] = useState<number>(0);
  const [itemsTotal, setItemsTotal] = useState<number>(1);
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const [helperFlag, setHelperFlag] = useState<boolean>(false);

  const htmlEleRef = useRef<HTMLDivElement | null>(null);

  const scene = useRef<THREE.Scene | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const model = useRef<THREE.Group | null>(null);
  const modelGeometryList = useRef<THREE.BufferGeometry[]>([]);
  const orbitControls = useRef<OrbitControls | null>(null);
  const axesHelper = useRef<THREE.AxesHelper | null>(null);
  const gridHelper = useRef<THREE.GridHelper | null>(null);
  const pmremGenerator = useRef<THREE.PMREMGenerator | null>(null);

  const lightList = useRef<THREE.Light[]>([]);
  const lightHelperList = useRef<THREE.Object3D[]>([]);
  const lightTranslateControlsList = useRef<TransformControls[]>([]);
  const lightRotateControlsList = useRef<TransformControls[]>([]);
  const ambientLight = useRef<THREE.AmbientLight | null>(null);

  // Mounted
  useEffect(() => {
    init();
    window.addEventListener("resize", () =>
      onCanvasResize({ htmlEleRef: htmlEleRef.current, camera: camera.current, renderer: renderer.current })
    );

    const htmlEleCopy = htmlEleRef.current;
    return () => {
      if (renderer.current) htmlEleCopy?.removeChild(renderer.current.domElement);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auxiliary watcher
  useEffect(() => {
    if (auxiliaryFlag) {
      gridHelper.current = new THREE.GridHelper(11, 11);
      axesHelper.current = new THREE.AxesHelper(5.5);

      scene.current?.add(gridHelper.current, axesHelper.current);
    } else {
      if (gridHelper.current) scene.current?.remove(gridHelper.current);
      if (axesHelper.current) scene.current?.remove(axesHelper.current);

      gridHelper.current = axesHelper.current = null;
    }
  }, [auxiliaryFlag]);

  // Rotate status watcher
  useEffect(() => {
    if (!model.current) return;
    rotateModelAnimate({ model: model.current, axis: rotateStatus.axis, side: rotateStatus.side, angle: 0 });
  }, [rotateStatus]);

  // Camera watcher
  useEffect(() => {
    if (!camera.current) return;

    camera.current.fov = fov;
    camera.current.near = near;
    camera.current.far = far;
    camera.current.updateProjectionMatrix();
  }, [fov, near, far]);

  // Wireframe flag watcher
  useEffect(() => {
    model.current?.traverse((node: any) => {
      if (!node.isMesh) return;

      if (wireframeFlag) {
        // if (animationList.length) node.material.wireframe = true;

        const geometry = new THREE.WireframeGeometry(node.geometry);
        modelGeometryList.current.push(geometry);

        generateLineSegments({ wireframeOpacity, wireframeColor, geometry, node });
      } else {
        modelGeometryList.current.forEach((geo) => geo.dispose());
        modelGeometryList.current = [];
        // if (animationList.length) node.material.wireframe = false;

        removeLineSegments({ node });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wireframeFlag]);

  // Wireframe attributes wathcer
  useEffect(() => {
    if (!wireframeFlag) return;

    let index = 0;
    model.current?.traverse((node: any) => {
      if (!node.isMesh) return;
      index++;

      removeLineSegments({ node });
      generateLineSegments({ wireframeOpacity, wireframeColor, geometry: modelGeometryList.current[index], node });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wireframeOpacity, wireframeColor]);

  // Background switch watcher
  useEffect(() => {
    handleBackgroundConfig({
      backgroundFlag,
      backgroundChoice,
      backgroundColor,
      scene: scene.current,
      renderer: renderer.current,
      pmremGenerator: pmremGenerator.current,
      backgroundImageIndex: backgroundImage,
      backgroundEnvIndex: backgroundEnv,
    });
  }, [backgroundFlag, backgroundChoice, backgroundColor, backgroundImage, backgroundEnv]);

  // Background attributes watcher
  useEffect(() => {
    if (!backgroundFlag || !scene.current) return;

    if (backgroundChoice === "E") scene.current.backgroundBlurriness = backgroundBlur;
    if (["I", "E"].includes(backgroundChoice)) scene.current.backgroundIntensity = backgroundIntensity;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundBlur, backgroundIntensity]);

  // Light flag and choice watcher
  useEffect(() => {
    for (let i = 0; i < lights.length; i++) {
      if (lightFlag) {
        if (lights[i].type === "N") continue;

        scene.current?.add(lightList.current[i]);
        scene.current?.add(lightHelperList.current[i]);

        if (i === lightChoice - 1)
          attachLightControls({
            lightRef: lightList.current[i],
            lightTranslateControls: lightTranslateControlsList.current[i],
            lightRotateControls: lightRotateControlsList.current[i],
            scene: scene.current,
          });
        else
          detachLightControls({
            lightTranslateControls: lightTranslateControlsList.current[i],
            lightRotateControls: lightRotateControlsList.current[i],
            scene: scene.current,
          });
      } else
        removeLight({
          lightRef: lightList.current[i],
          lightHelper: lightHelperList.current[i],
          lightTranslateControls: lightTranslateControlsList.current[i],
          lightRotateControls: lightRotateControlsList.current[i],
          scene: scene.current,
          camera: camera.current,
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightFlag, lightChoice]);

  // Light attributes watcher
  useEffect(() => {
    if (!lightFlag) return;

    const index = lightChoice - 1;

    modifyLight({
      light: lights[index],
      lightRef: lightList.current[index],
      scene: scene.current,
      camera: camera.current,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lights]);

  // Light type watcher
  useEffect(
    () => {
      if (!lightFlag) return;

      const index = lightChoice - 1;

      // Store the original light position
      const worldPosition = new THREE.Vector3();
      lightList.current[index].getWorldPosition(worldPosition);

      removeLight({
        lightRef: lightList.current[index],
        lightHelper: lightHelperList.current[index],
        lightTranslateControls: lightTranslateControlsList.current[index],
        lightRotateControls: lightRotateControlsList.current[index],
        scene: scene.current,
        camera: camera.current,
      });

      lightList.current[index].dispose(); // @ts-ignore
      lightHelperList.current[index].dispose();

      const { newLight, newLightHelper } = initLight({
        light: lights[index],
        scene: scene.current,
        camera: camera.current,
      });

      if (!newLight || !newLightHelper) return;

      newLight.position.set(worldPosition.x, worldPosition.y, worldPosition.z);

      lightList.current[index] = newLight;
      lightHelperList.current[index] = newLightHelper;

      attachLightControls({
        lightRef: lightList.current[index],
        lightTranslateControls: lightTranslateControlsList.current[index],
        lightRotateControls: lightRotateControlsList.current[index],
        scene: scene.current,
      });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    lights.map((light) => light.type)
  );

  // Initialize the whole scene, this function can only be called once
  function init() {
    if (!htmlEleRef.current) return;

    // Scene
    scene.current = new THREE.Scene();
    scene.current.background = new THREE.Color(backgroundColor);
    scene.current.backgroundBlurriness = backgroundBlur;
    scene.current.backgroundIntensity = backgroundIntensity;

    // Renderer
    renderer.current = new THREE.WebGLRenderer({ antialias: true });
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.current.setSize(htmlEleRef.current.clientWidth, htmlEleRef.current.clientHeight);
    htmlEleRef.current.appendChild(renderer.current.domElement);

    // Camera
    const aspect = htmlEleRef.current.clientWidth / htmlEleRef.current.clientHeight;
    camera.current = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.current.position.set(0, 3, 8);
    scene.current.add(camera.current);

    // Orbit controls
    orbitControls.current = new OrbitControls(camera.current, renderer.current.domElement);
    orbitControls.current.enableDamping = true;
    orbitControls.current.dampingFactor = 0.09;
    orbitControls.current.update();

    // Lights and controls
    for (let i = 0; i < lights.length; i++) {
      const { newLight, newLightHelper } = initLight({
        light: lights[i],
        scene: scene.current,
        camera: camera.current,
      });
      if (newLight) lightList.current.push(newLight);
      if (newLightHelper) lightHelperList.current.push(newLightHelper);

      const { newLightTransformControls, newLightRotateControls } = initLightControls({
        renderer: renderer.current,
        camera: camera.current,
        orbitControls: orbitControls.current,
      });
      if (newLightTransformControls) lightTranslateControlsList.current.push(newLightTransformControls);
      if (newLightRotateControls) lightRotateControlsList.current.push(newLightRotateControls);
    }

    // Ambient light
    ambientLight.current = new THREE.AmbientLight();
    // scene.current.add(ambientLight.current);

    // Environment
    pmremGenerator.current = new THREE.PMREMGenerator(renderer.current);
    pmremGenerator.current.compileEquirectangularShader();

    // Loading manager
    const manager = new THREE.LoadingManager();
    manager.onProgress = (_url, loaded, total) => {
      setProgress((loaded / total) * 100);
      setItemsLoaded(loaded);
      setItemsTotal(total);

      if (loaded / total === 1)
        setTimeout(() => {
          setLoadingFlag(true);
        }, 1000);
    };

    // Loaders
    const loader = new GLTFLoader(manager);
    loader.load(path, (res) => {
      const m = getModelFromLoader(res);
      model.current = m;
      scene.current?.add(m);
    });

    animate();
  }

  // Animate the scene as a loop
  function animate() {
    orbitControls.current?.update(); // @ts-ignore
    lightHelperList.current.forEach((helper) => helper.update());
    render({ scene: scene.current, camera: camera.current, renderer: renderer.current });
    requestAnimationFrame(animate);
  }

  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing" ref={htmlEleRef}>
      {/* Progress curtain */}
      {!(progress === 100 && loadingFlag) && (
        <div className="absolute w-full h-full bg-zinc-700 flex justify-center items-center">
          <div className="w-1/2 text-center">
            <p className="text-lg text-white mb-2">
              Loading... {itemsLoaded} / {itemsTotal}
            </p>
            <div className="flex bg-zinc-800 h-1.5 overflow-hidden rounded-full">
              <div
                className="transition-[width] duration-1000 ease-in-out bg-violet-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Engine icons */}
      {progress === 100 && loadingFlag && (
        <div className="absolute flex items-center right-4 bottom-4 gap-3">
          <EngineIcon
            iconUrl="/icon/questionmark.svg"
            tip="Help"
            handleClick={() => setHelperFlag((prev) => !prev)}
            size={12}
          />
          <EngineIcon
            iconUrl="/icon/camera.svg"
            tip="Photo"
            handleClick={() => {
              render({ scene: scene.current, camera: camera.current, renderer: renderer.current });
              screenShot({ renderer: renderer.current });
            }}
            size={20}
          />
          <EngineIcon
            iconUrl="/icon/arrow-expand.svg"
            tip="Full(F)"
            handleClick={() => toggleFullScreen({ htmlEleRef: htmlEleRef.current })}
            size={18}
          />
        </div>
      )}

      {/* Helper */}
      {progress === 100 && loadingFlag && helperFlag && (
        <div className="absolute text-white bg-zinc-900/70 top-0 right-0 bottom-0 left-0 backdrop-blur">
          <Image
            className="relative top-8 left-8"
            src="/icon/xmark.svg"
            alt="xmark-icon"
            width={32}
            height={32}
            onClick={() => setHelperFlag(false)}
            priority
          />

          <div className="flex justify-around items-center h-[95%]">
            <div className="max-w-[290px] flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image src="/icon/arrow-expand.svg" alt="arrow-expand-icon" width={20} height={20} priority />
                <p className="text-2xl">平移</p>
              </div>
              <p>Windows：右键拖拽</p>
              <p>macOS: 双指触摸拖拽</p>
            </div>

            <div className="max-w-[290px] flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image src="/icon/arrow-orbit.svg" alt="arrow-orbit-icon" width={20} height={20} priority />
                <p className="text-2xl">旋转</p>
              </div>
              <p>Windows：左键拖拽</p>
              <p>macOS: 单指拖拽 OR 三指拖拽</p>
            </div>

            <div className="max-w-[290px] flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image src="/icon/zoom-in.svg" alt="zoom-in-icon" width={20} height={20} priority />
                <p className="text-2xl">缩放</p>
              </div>
              <p>Windows：鼠标滑轮</p>
              <p>macOS: 双指缩放手势 OR 双指上下移动</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
