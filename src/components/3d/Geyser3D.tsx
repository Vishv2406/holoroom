import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface GeyserProps {
  isOn: boolean;
  position: [number, number, number];
  onClick: () => void;
  isSelected?: boolean;
}

export function Geyser3D({ isOn, position, onClick, isSelected }: GeyserProps) {
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta * 2;
  });

  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* Main cylinder */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <cylinderGeometry args={[0.28, 0.28, 0.6, 16]} />
        <meshStandardMaterial
          color={isOn ? '#2A0000' : '#333333'}
          emissive={isOn ? '#FF4500' : '#000000'}
          emissiveIntensity={isOn ? 0.5 + Math.sin(t.current) * 0.2 : 0}
          roughness={0.5}
          metalness={0.5}
        />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.1, 16]} />
        <meshStandardMaterial color={isOn ? '#331100' : '#444444'} roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Bottom cap */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.28, 0.22, 0.1, 16]} />
        <meshStandardMaterial color={isOn ? '#331100' : '#444444'} roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Pipes */}
      <mesh position={[0.2, 0.4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.2, 0.4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Power indicator */}
      <mesh position={[0, 0, 0.285]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color={isOn ? '#FF4500' : '#333333'}
          emissive={isOn ? '#FF4500' : '#000000'}
          emissiveIntensity={isOn ? 1.5 : 0}
        />
      </mesh>

      {/* Hot glow when ON */}
      {isOn && (
        <pointLight color="#FF6600" intensity={1.0} distance={3} decay={2} />
      )}

      {/* Selection glow */}
      {isSelected && (
        <mesh>
          <cylinderGeometry args={[0.35, 0.35, 0.75, 16]} />
          <meshStandardMaterial color="#00BCD4" transparent opacity={0.15} emissive="#00BCD4" emissiveIntensity={1} />
        </mesh>
      )}
    </group>
  );
}
