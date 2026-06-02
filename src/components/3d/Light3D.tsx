import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Light3DProps {
  isOn: boolean;
  brightness: number;
  position: [number, number, number];
  onClick: () => void;
  isSelected?: boolean;
}

export function Light3D({ isOn, brightness, position, onClick, isSelected }: Light3DProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta * 2;
    // Subtle pulse when ON
    if (isOn && glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t.current) * 0.05);
    }
    // Selected pulse
    if (isSelected && meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(t.current * 3) * 0.08);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(1);
    }
  });

  const brightnessFactor = isOn ? brightness / 100 : 0;
  const lightColor = new THREE.Color(1, 0.87 * brightnessFactor, 0.3 * brightnessFactor);
  const emissiveIntensity = isOn ? 0.8 * brightnessFactor : 0;

  return (
    <group position={position}>
      {/* Main bulb sphere */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
        castShadow
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={isOn ? lightColor : '#333333'}
          emissive={isOn ? lightColor : '#000000'}
          emissiveIntensity={emissiveIntensity}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Outer glow halo when ON */}
      {isOn && (
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color={lightColor}
            transparent
            opacity={0.15 * brightnessFactor}
            emissive={lightColor}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}

      {/* Actual point light when ON */}
      {isOn && (
        <pointLight
          color={lightColor}
          intensity={2.5 * brightnessFactor}
          distance={8}
          decay={2}
          castShadow
        />
      )}

      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.35, 32]} />
          <meshStandardMaterial color="#00BCD4" emissive="#00BCD4" emissiveIntensity={2} transparent opacity={0.9} />
        </mesh>
      )}

      {/* Cord from ceiling */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 6]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
    </group>
  );
}
