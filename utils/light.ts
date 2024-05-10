import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

import { LightType, LightTypeType } from "@/types";

// Init a new light and opationally add it to the scene
export function initLight({
  light,
  scene,
  camera,
}: {
  light: LightType;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
}) {
  let newLight, newLightHelper;

  if (light.type === "D") {
    newLight = new THREE.DirectionalLight(light.color, light.intensity);
    newLightHelper = new THREE.DirectionalLightHelper(newLight, 1.2);
  } else if (light.type === "P") {
    newLight = new THREE.PointLight(light.color, light.intensity, 10);
    newLightHelper = new THREE.PointLightHelper(newLight, 1.2);
  } else if (light.type === "S") {
    newLight = new THREE.SpotLight(light.color, light.intensity, 10);
    newLightHelper = new THREE.SpotLightHelper(newLight);
  } else if (light.type === "H") {
    newLight = new THREE.HemisphereLight(light.color, 0xffffff, light.intensity);
    newLightHelper = new THREE.HemisphereLightHelper(newLight, 5);
  } else if (!newLight || !newLightHelper || light.type === "N") return { newLight, newLightHelper };

  newLight.position.set(light.position.x, light.position.y, light.position.z);
  newLightHelper.update();

  // Attached to camera
  if ((light.type === "D" || light.type === "H") && light.attachedToCamera) {
    const tempPosition = new THREE.Vector3(light.position.x, light.position.y, light.position.z);
    camera?.add(newLight);
    scene?.attach(newLight);
    newLight.position.set(tempPosition.x, tempPosition.y, tempPosition.z);
    camera?.attach(newLight);
  }

  modifyLight({ light, lightRef: newLight, scene, camera });

  scene?.add(newLight);
  scene?.add(newLightHelper);

  return { newLight, newLightHelper };
}

// Init new transform and rotate controls for a light
// This function can be only called once during initialization
export function initLightControls({
  renderer,
  camera,
  orbitControls,
}: {
  renderer: THREE.WebGLRenderer | null;
  camera: THREE.PerspectiveCamera | null;
  orbitControls: OrbitControls;
}) {
  if (!renderer || !camera) return { newLightTransformControls: undefined, newLightRotateControls: undefined };

  const newLightTransformControls = new TransformControls(camera, renderer.domElement);
  const newLightRotateControls = new TransformControls(camera, renderer.domElement);

  newLightTransformControls.setSize(0.6);
  newLightRotateControls.setSize(0.6);

  newLightTransformControls.addEventListener("mouseDown", () => {
    orbitControls.enabled = false;
    newLightRotateControls.enabled = false;
  });
  newLightTransformControls.addEventListener("mouseUp", () => {
    orbitControls.enabled = true;
    newLightRotateControls.enabled = true;
  });
  newLightRotateControls.addEventListener("mouseDown", () => {
    orbitControls.enabled = false;
    newLightTransformControls.enabled = false;
  });
  newLightRotateControls.addEventListener("mouseUp", () => {
    orbitControls.enabled = true;
    newLightTransformControls.enabled = true;
  });

  return { newLightTransformControls, newLightRotateControls };
}

// Attach light controls to a light and add them to the scene
export function attachLightControls({
  lightRef,
  lightTranslateControls,
  lightRotateControls,
  scene,
}: {
  lightRef: THREE.Light;
  lightTranslateControls: TransformControls;
  lightRotateControls: TransformControls;
  scene: THREE.Scene | null;
}) {
  lightTranslateControls.attach(lightRef);
  lightTranslateControls.setMode("translate");

  lightRotateControls.attach(lightRef);
  lightRotateControls.setMode("rotate");

  scene?.add(lightTranslateControls);
  scene?.add(lightRotateControls);
}

// Detach light controls from a light and remove them from the scene
export function detachLightControls({
  lightTranslateControls,
  lightRotateControls,
  scene,
}: {
  lightTranslateControls: TransformControls;
  lightRotateControls: TransformControls;
  scene: THREE.Scene | null;
}) {
  lightTranslateControls.detach();
  lightRotateControls.detach();

  scene?.remove(lightTranslateControls);
  scene?.remove(lightRotateControls);
}

// Modify light attributes
export function modifyLight({
  light,
  lightRef,
  scene,
  camera,
}: {
  light: LightType;
  lightRef: THREE.Light;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
}) {
  lightRef.color = new THREE.Color(light.color);
  lightRef.intensity = light.intensity;

  lightRef.castShadow = light.castShadow;
  if (lightRef.shadow) lightRef.shadow.bias = light.shadowBias;

  if (light.type === "D" || light.type === "H") {
    // Attached to camera and position
    if (light.attachedToCamera && lightRef.parent && lightRef.parent.type === "Scene") {
      const tempPosition = new THREE.Vector3(lightRef.position.x, lightRef.position.y, lightRef.position.z);
      camera?.add(lightRef);
      scene?.attach(lightRef);
      lightRef.position.set(tempPosition.x, tempPosition.y, tempPosition.z);
      camera?.attach(lightRef);
    } else if (
      !light.attachedToCamera &&
      lightRef.parent &&
      (lightRef.parent as THREE.PerspectiveCamera).isPerspectiveCamera
    ) {
      const worldPosition = new THREE.Vector3();
      lightRef.getWorldPosition(worldPosition);
      lightRef.position.set(worldPosition.x, worldPosition.y, worldPosition.z);
      scene?.add(lightRef);
    }
  }

  if (light.type === "P" || light.type === "S") (lightRef as THREE.PointLight | THREE.SpotLight).decay = light.decay;

  if (light.type === "S") {
    (lightRef as THREE.SpotLight).angle = (light.angle * Math.PI) / 180;
    (lightRef as THREE.SpotLight).penumbra = light.penumbra;
  }
}

// Remove light, its helper, and controls
export function removeLight({
  lightRef,
  lightHelper,
  lightTranslateControls,
  lightRotateControls,
  scene,
  camera,
}: {
  lightRef: THREE.Light;
  lightHelper: THREE.Object3D;
  lightTranslateControls: TransformControls;
  lightRotateControls: TransformControls;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
}) {
  scene?.remove(lightRef);
  camera?.remove(lightRef);

  removeLightHelperAndControls({ lightHelper, lightTranslateControls, lightRotateControls, scene });
}

// Remove the helper and controls from a light
function removeLightHelperAndControls({
  lightHelper,
  lightTranslateControls,
  lightRotateControls,
  scene,
}: {
  lightHelper: THREE.Object3D;
  lightTranslateControls: TransformControls;
  lightRotateControls: TransformControls;
  scene: THREE.Scene | null;
}) {
  scene?.remove(lightHelper);
  detachLightControls({ lightTranslateControls, lightRotateControls, scene });
}

// Handle attached to camera and btw position
function handleAttachedToCameraAndPosition({
  type,
  attachedToCamera,
  lightRef,
  scene,
  camera,
}: {
  type: LightTypeType;
  attachedToCamera: boolean;
  lightRef: THREE.Light;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
}) {
  if (type !== "D" && type !== "H") return;

  if (attachedToCamera && lightRef.parent && lightRef.parent.type === "Scene") {
    const tempPosition = new THREE.Vector3(lightRef.position.x, lightRef.position.y, lightRef.position.z);
    camera?.add(lightRef);
    scene?.attach(lightRef);
    lightRef.position.set(tempPosition.x, tempPosition.y, tempPosition.z);
    camera?.attach(lightRef);
  } else if (!attachedToCamera && lightRef.parent && (lightRef.parent as THREE.PerspectiveCamera).isPerspectiveCamera) {
    const worldPosition = new THREE.Vector3();
    lightRef.getWorldPosition(worldPosition);
    lightRef.position.set(worldPosition.x, worldPosition.y, worldPosition.z);
    scene?.add(lightRef);
  }
}
