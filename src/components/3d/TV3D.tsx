import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface TV3DProps {
  isOn: boolean;
  position: [number, number, number];
  onClick: () => void;
  isSelected?: boolean;
}

export function TV3D({ isOn, position, onClick, isSelected }: TV3DProps) {
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
  });

  return (
    <group position={position}>
      {/* TV Body/Bezel */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[2.0, 1.2, 0.1]} />
        <meshStandardMaterial
          color={isOn ? '#1A1A2E' : '#111111'}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.056]}>
        <boxGeometry args={[1.85, 1.05, 0.01]} />
        <meshStandardMaterial
          color={isOn ? '#2244AA' : '#0A0A0A'}
          emissive={isOn ? '#1133AA' : '#000000'}
          emissiveIntensity={isOn ? 0.8 : 0}
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>

      {/* Screen shimmer/content simulation */}
      {isOn && (
        <>
          <mesh position={[-0.5, 0.1, 0.062]}>
            <boxGeometry args={[0.6, 0.3, 0.001]} />
            <meshStandardMaterial color="#4488FF" emissive="#4488FF" emissiveIntensity={0.5} transparent opacity={0.4} />
          </mesh>
          <mesh position={[0.3, -0.2, 0.062]}>
            <boxGeometry args={[0.8, 0.15, 0.001]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.3} transparent opacity={0.2} />
          </mesh>
        </>
      )}

      {/* Screen glow when ON */}
      {isOn && (
        <pointLight
          color="#4488FF"
          intensity={1.2}
          distance={5}
          decay={2}
          position={[0, 0, 0.5]}
        />
      )}

      {/* Stand */}
      <mesh position={[0, -0.75, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.15]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.65, 0]}>
        <boxGeometry args={[0.06, 0.2, 0.06]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Selection glow */}
      {isSelected && (
        <mesh>
          <boxGeometry args={[2.1, 1.3, 0.15]} />
          <meshStandardMaterial color="#00BCD4" transparent opacity={0.12} emissive="#00BCD4" emissiveIntensity={1} />
        </mesh>
      )}
    </group>
  );
}
