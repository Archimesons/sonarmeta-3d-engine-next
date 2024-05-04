import * as THREE from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";

import { backgroundTransparentImage, preloadedBackgroundImages, preloadedEnvImages } from "@/constant";

export function switchBackgroundChoice({
  backgroundFlag,
  backgroundChoice,
  backgroundColor,
  scene,
  renderer,
  pmremGenerator,
  bgImgIndex,
  bgEnvIndex,
}: {
  backgroundFlag: boolean;
  backgroundChoice: "C" | "I" | "E";
  backgroundColor: string;
  scene: THREE.Scene | null;
  renderer: THREE.WebGLRenderer | null;
  pmremGenerator: THREE.PMREMGenerator | null;
  bgImgIndex: number;
  bgEnvIndex: number;
}) {
  if (!scene || !renderer) return;

  // If background is enabled
  if (backgroundFlag) {
    // Color mode
    if (backgroundChoice === "C") {
      scene.background = new THREE.Color(backgroundColor);
      // renderer.toneMapping = THREE.NoToneMapping;
    }

    // Image mode
    else if (backgroundChoice === "I") {
      scene.background = new THREE.TextureLoader().load(preloadedBackgroundImages[bgImgIndex].path);
      // renderer.toneMapping = THREE.NoToneMapping;
    }

    // Environment mode
    else if (backgroundChoice === "E") {
      new EXRLoader().load(preloadedEnvImages[bgEnvIndex].path, (texture) => {
        const envMap = pmremGenerator?.fromEquirectangular(texture);
        if (envMap) scene.background = envMap.texture;
      });
      // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    }
  }

  // If background is disabled, TODO: transparent
  else {
    // Load background transparent texture
    new THREE.TextureLoader().load(backgroundTransparentImage, (texture) => {
      scene.background = texture;
    });
    // renderer.toneMapping = THREE.NoToneMapping;
  }
}
