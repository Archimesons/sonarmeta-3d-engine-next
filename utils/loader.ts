import * as THREE from "three";

export function getModelFromLoader(res: any) {
  let model;
  if (res.scene) model = res.scene;
  else model = res;

  // Put the model to the original point and scale
  const box3 = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  box3.getSize(size);

  // Set the unit size to 6
  const param = 6 / Math.max(size.x, size.y, size.z);
  model.scale.set(param, param, param);

  const center = new THREE.Vector3();
  box3.getCenter(center);

  model.translateX(-center.x * param);
  model.translateY(-center.y * param);
  model.translateZ(-center.z * param);

  return model;
}
