import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Fan3DProps {
  isOn: boolean;
  speed: number;
  position: [number, number, number];
  onClick: () => void;
  isSelected?: boolean;
  isExhaust?: boolean;
}

export function Fan3D({ isOn, speed, position, onClick, isSelected, isExhaust }: Fan3DProps) {
  const bladeGroupRef = useRef<THREE.Group>(null!);
  const t = useRef(0);

  // Speed → rotation speed mapping
  const rotationSpeeds = [0, 0.5, 1.5, 3, 5, 8];
  const rotSpeed = isOn ? rotationSpeeds[speed] ?? 3 : 0;

  useFrame((_, delta) => {
    t.current += delta;
    if (bladeGroupRef.current) {
      bladeGroupRef.current.rotation.y += delta * rotSpeed * (Math.PI * 2);
    }
  });

  const hubColor = isOn ? '#00BCD4' : '#666666';
  const bladeColor = isOn ? '#AAAACC' : '#888888';
  const size = isExhaust ? 0.6 : 1.0;

  return (
    <group position={position}>
      {/* Motor housing */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <cylinderGeometry args={[0.15 * size, 0.15 * size, 0.12, 16]} />
        <meshStandardMaterial
          color={hubColor}
          emissive={isOn ? hubColor : '#000000'}
          emissiveIntensity={isOn ? 0.3 : 0}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Rotating blades group */}
      <group ref={bladeGroupRef}>
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI) / 2) * 0.55 * size,
              0,
              Math.sin((i * Math.PI) / 2) * 0.55 * size,
            ]}
            rotation={[0, (i * Math.PI) / 2, 0.1]}
          >
            <boxGeometry args={[1.0 * size, 0.05, 0.22 * size]} />
            <meshStandardMaterial
              color={bladeColor}
              roughness={0.6}
              metalness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Down-rod */}
      {!isExhaust && (
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
          <meshStandardMaterial color="#777777" metalness={0.8} />
        </mesh>
      )}

      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.7 * size, 0.03, 8, 32]} />
          <meshStandardMaterial color="#00BCD4" emissive="#00BCD4" emissiveIntensity={2} />
        </mesh>
      )}
    </group>
  );
}
