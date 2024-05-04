import * as THREE from "three";

export function rotateModelAnimate({
  model,
  axis,
  side,
  angle,
}: {
  model: THREE.Group | null;
  axis: "X" | "Y" | "Z";
  side: 0 | 1;
  angle: number;
}) {
  if (axis === "X" && side === 0) model?.rotateX((Math.PI * 5) / 180);
  else if (axis === "X" && side === 1) model?.rotateX((Math.PI * 5) / -180);
  else if (axis === "Y" && side === 0) model?.rotateY((Math.PI * 5) / 180);
  else if (axis === "Y" && side === 1) model?.rotateY((Math.PI * 5) / -180);
  else if (axis === "Z" && side === 0) model?.rotateZ((Math.PI * 5) / 180);
  else if (axis === "Z" && side === 1) model?.rotateZ((Math.PI * 5) / -180);

  angle += 5;
  if (angle === 90) return;

  requestAnimationFrame(() => rotateModelAnimate({ model, axis, side, angle }));
}
