import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface AC3DProps {
  isOn: boolean;
  temperature?: number;
  mode?: string;
  position: [number, number, number];
  onClick: () => void;
  isSelected?: boolean;
}

export function AC3D({ isOn, position, onClick, isSelected }: AC3DProps) {
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta * 1.5;
  });

  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* AC body */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[1.5, 0.4, 0.2]} />
        <meshStandardMaterial
          color={isOn ? '#1A2A3A' : '#3A3A4A'}
          emissive={isOn ? '#00BCD4' : '#000000'}
          emissiveIntensity={isOn ? 0.4 : 0}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Front grille lines */}
      {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.11]}>
          <boxGeometry args={[0.03, 0.3, 0.01]} />
          <meshStandardMaterial color={isOn ? '#00BCD4' : '#555555'} />
        </mesh>
      ))}

      {/* LED indicator */}
      <mesh position={[0.6, 0.1, 0.11]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color={isOn ? '#00FF88' : '#333333'}
          emissive={isOn ? '#00FF88' : '#000000'}
          emissiveIntensity={isOn ? 1 : 0}
        />
      </mesh>

      {/* Cool air glow when ON */}
      {isOn && (
        <pointLight color="#00BCD4" intensity={0.8} distance={4} decay={2} position={[0, -0.3, 0.2]} />
      )}

      {/* Temperature display — small dot matrix */}
      <mesh position={[-0.5, 0.1, 0.11]}>
        <boxGeometry args={[0.3, 0.15, 0.01]} />
        <meshStandardMaterial
          color={isOn ? '#001A2E' : '#222222'}
          emissive={isOn ? '#00BCD4' : '#000000'}
          emissiveIntensity={isOn ? 0.6 : 0}
        />
      </mesh>

      {/* Selection glow */}
      {isSelected && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.6, 0.5, 0.25]} />
          <meshStandardMaterial color="#00BCD4" transparent opacity={0.15} emissive="#00BCD4" emissiveIntensity={1} />
        </mesh>
      )}

      {/* Temp tooltip stub */}
      {isOn && (
        <mesh position={[-0.5, 0.1, 0.115]}>
          <boxGeometry args={[0.25, 0.08, 0.001]} />
          <meshStandardMaterial
            color="#00BCD4"
            emissive="#00BCD4"
            emissiveIntensity={1}
            transparent
            opacity={0.5}
          />
        </mesh>
      )}
    </group>
  );
}
