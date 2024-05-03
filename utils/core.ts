import * as THREE from "three";

export function render({
  scene,
  camera,
  renderer,
}: {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
}) {
  if (!scene || !camera) return;

  renderer?.render(scene, camera);
  // composer.render();
}

export function screenShot({ renderer }: { renderer: THREE.WebGLRenderer | null }) {
  if (!renderer) return;

  const imgData = renderer.domElement.toDataURL();
  const link = document.createElement("a");

  document.body.appendChild(link);
  link.download = "screenshot";
  link.href = imgData;
  link.click();
  document.body.removeChild(link);
}

export function toggleFullScreen({ htmlEleRef }: { htmlEleRef: HTMLDivElement | null }) {
  if (!document.fullscreenElement) htmlEleRef?.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
}

export function onCanvasResize({
  htmlEleRef,
  camera,
  renderer,
}: {
  htmlEleRef: HTMLDivElement | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
}) {
  if (!htmlEleRef || !camera) return;

  camera.aspect = htmlEleRef.clientWidth / htmlEleRef.clientHeight;
  camera.updateProjectionMatrix();

  renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer?.setSize(htmlEleRef.clientWidth, htmlEleRef.clientHeight);
}
