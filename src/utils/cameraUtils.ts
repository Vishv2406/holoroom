import * as THREE from 'three';

export interface CameraPosition {
  position: [number, number, number];
  target: [number, number, number];
}

export const CAMERA_POSITIONS: Record<string, CameraPosition> = {
  overview: {
    position: [0, 20, 22],
    target: [0, 0, 0],
  },
  'Master Bedroom': {
    position: [-7, 10, 6],
    target: [-7, 0, -4],
  },
  'Bedroom 2': {
    position: [5, 10, 6],
    target: [5, 0, -4],
  },
  'Living Hall': {
    position: [-3, 10, 14],
    target: [-3, 0, 4],
  },
  Kitchen: {
    position: [7, 10, 14],
    target: [7, 0, 4],
  },
  Bathroom: {
    position: [-9, 10, 14],
    target: [-9, 0, 4],
  },
};

export function lerpVector3(
  current: THREE.Vector3,
  target: THREE.Vector3,
  alpha: number
): THREE.Vector3 {
  return current.lerp(target, alpha);
}
