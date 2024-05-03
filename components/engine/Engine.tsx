"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

import { getModelFromLoader } from "@/utils/loader";

export default function Engine({ path, fov, near, far }: { path: string; fov: number; near: number; far: number }) {
  const [progress, setProgress] = useState<number>(0);
  const [itemsLoaded, setItemsLoaded] = useState<number>(0);
  const [itemsTotal, setItemsTotal] = useState<number>(1);
  const [loadingFlag, setLoadingFlag] = useState<boolean>(false);
  const [helperFlag, setHelperFlag] = useState<boolean>(false);

  const htmlEleRef = useRef<HTMLDivElement | null>(null);

  const scene = useRef<THREE.Scene | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const orbitControls = useRef<OrbitControls | null>(null);
  const axesHelper = useRef<THREE.AxesHelper | null>(null);
  const gridHelper = useRef<THREE.GridHelper | null>(null);
  const ambientLight = useRef<THREE.AmbientLight | null>(null);

  const animate = useCallback(() => {
    orbitControls.current?.update();
    render();
    requestAnimationFrame(animate);
  }, []);

  const init = useCallback(() => {
    if (!htmlEleRef.current) return;

    // Scene
    scene.current = new THREE.Scene();
    scene.current.background = new THREE.Color(0x565656);

    // Renderer
    renderer.current = new THREE.WebGLRenderer({ antialias: true });
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.current.setSize(htmlEleRef.current.clientWidth, htmlEleRef.current.clientHeight);
    htmlEleRef.current.appendChild(renderer.current.domElement);

    // Auxiliary
    gridHelper.current = new THREE.GridHelper(11, 11);
    axesHelper.current = new THREE.AxesHelper(5.5);

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

    // Ambient light
    ambientLight.current = new THREE.AmbientLight();

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
      const model = getModelFromLoader(res);
      scene.current?.add(model);
    });

    animate();
  }, [animate, far, fov, near, path]);

  function render() {
    if (!scene.current || !camera.current) return;

    renderer.current?.render(scene.current, camera.current);
    // composer.current?.render();
  }

  function screenShot() {
    if (!renderer.current) return;

    render();

    const imgData = renderer.current.domElement.toDataURL();
    const link = document.createElement("a");

    document.body.appendChild(link);
    link.download = "screenshot";
    link.href = imgData;
    link.click();
    document.body.removeChild(link);
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) htmlEleRef.current?.requestFullscreen();
    else if (document.exitFullscreen) document.exitFullscreen();
  }

  function onCanvasResize() {
    if (!htmlEleRef.current || !camera.current) return;

    camera.current.aspect = htmlEleRef.current.clientWidth / htmlEleRef.current.clientHeight;
    camera.current.updateProjectionMatrix();

    renderer.current?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.current?.setSize(htmlEleRef.current.clientWidth, htmlEleRef.current.clientHeight);
  }

  // Mounted
  useEffect(() => {
    init();
    window.addEventListener("resize", onCanvasResize);

    const htmlEleCopy = htmlEleRef.current;
    return () => {
      if (renderer.current) htmlEleCopy?.removeChild(renderer.current.domElement);
    };
  }, [init]);

  // Camera watcher
  useEffect(() => {
    if (!camera.current) return;

    camera.current.fov = fov;
    camera.current.near = near;
    camera.current.far = far;
    camera.current.updateProjectionMatrix();
  }, [fov, near, far]);

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
          <EngineIcon iconUrl="/icon/camera.svg" tip="Photo" handleClick={screenShot} size={20} />
          <EngineIcon iconUrl="/icon/arrow-expand.svg" tip="Full(F)" handleClick={toggleFullScreen} size={18} />
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
