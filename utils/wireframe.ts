import * as THREE from "three";

export function generateLineSegments({
  wireframeOpacity,
  wireframeColor,
  geometry,
  node,
}: {
  wireframeOpacity: number;
  wireframeColor: string;
  geometry: THREE.BufferGeometry;
  node: any;
}) {
  const material = new THREE.LineBasicMaterial({ color: wireframeColor, transparent: true });
  material.opacity = wireframeOpacity;

  const wireframe = new THREE.LineSegments(geometry, material);
  node.add(wireframe);
}

export function removeLineSegments({ node }: { node: any }) {
  node.traverse((child: any) => {
    if (child.type === "LineSegments") node.remove(child);
  });
}
