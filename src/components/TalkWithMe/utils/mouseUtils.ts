import * as THREE from "three";

export const handleMouseMove = (
  event: MouseEvent,
  callback: (x: number, y: number) => void
) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;
  callback(x, y);
};

export const handleTouchMove = (
  event: TouchEvent,
  callback: (x: number, y: number) => void
) => {
  const x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  const y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  callback(x, y);
};

export const handleTouchEnd = (
  callback: (x: number, y: number, ix: number, iy: number) => void
) => {
  callback(0, 0, 0.05, 0.05);
};

export const handleHeadRotation = (
  head: THREE.Object3D,
  x: number,
  y: number,
  ix: number,
  iy: number,
  lerp: (a: number, b: number, t: number) => number
) => {
  const targetRotationX = y * 0.4;
  const targetRotationY = x * 0.6;
  
  head.rotation.x = lerp(head.rotation.x, targetRotationX, ix);
  head.rotation.y = lerp(head.rotation.y, targetRotationY, iy);
};
