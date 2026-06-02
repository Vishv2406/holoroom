import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ApartmentModel } from './ApartmentModel';
import { useHomeStore } from '../../store/useHomeStore';
import { CAMERA_POSITIONS } from '../../utils/cameraUtils';

// Camera controller component — handles smooth transitions
function CameraController() {
  const { cameraTarget } = useHomeStore();
  const { camera, controls } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 20, 22));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const isAnimating = useRef(false);

  useEffect(() => {
    const pos = CAMERA_POSITIONS[cameraTarget] ?? CAMERA_POSITIONS.overview;
    targetPos.current.set(...pos.position);
    targetLookAt.current.set(...pos.target);
    isAnimating.current = true;
  }, [cameraTarget]);

  useFrame(() => {
    if (!isAnimating.current) return;

    const dist = camera.position.distanceTo(targetPos.current);

    camera.position.lerp(targetPos.current, 0.06);

    // Move orbit controls target
    if (controls) {
      const ctrl = controls as unknown as { target: THREE.Vector3; update: () => void };
      ctrl.target.lerp(targetLookAt.current, 0.06);
      ctrl.update();
    }

    if (dist < 0.05) {
      isAnimating.current = false;
    }
  });

  return null;
}

// Ground plane
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="#08080F" roughness={1} metalness={0} />
    </mesh>
  );
}

// Grid helper
function GridOverlay() {
  return (
    <gridHelper
      args={[50, 50, '#1A1A3A', '#141425']}
      position={[0, -0.09, 0]}
    />
  );
}

export function SceneCanvas() {
  const orbitRef = useRef(null);

  return (
    <Canvas
      camera={{ position: [0, 20, 22], fov: 55, near: 0.1, far: 200 }}
      shadows
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: 'transparent', pointerEvents: 'auto' }}
      onCreated={(state) => {
        // Allow pointer events to pass through to UI when hovering over empty space
        const canvas = state.gl.domElement;
        canvas.style.touchAction = 'auto';
      }}
    >
      {/* Background */}
      <color attach="background" args={['#060612']} />
      <fog attach="fog" args={['#060612', 30, 80]} />

      {/* Stars in background */}
      <Stars radius={80} depth={30} count={1000} factor={3} saturation={0} fade speed={0.5} />

      {/* Lighting */}
      <ambientLight intensity={0.25} color="#8888FF" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.8}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <directionalLight position={[-10, 15, -10]} intensity={0.3} color="#8888FF" />

      {/* Hemisphere light for sky/ground bounce */}
      <hemisphereLight args={['#1A1AFF', '#0A0A1A', 0.15]} />

      {/* Orbit Controls */}
      <OrbitControls
        ref={orbitRef}
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={4}
        maxDistance={40}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 0, 0]}
      />

      {/* Camera animator */}
      <CameraController />

      {/* Scene content */}
      <Ground />
      <GridOverlay />
      <ApartmentModel />
    </Canvas>
  );
}
