import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getEnergyColor } from '../../data/energyData';

interface EnergyAuraProps {
  watts: number;
  isOn: boolean;
  position: [number, number, number];
  visible: boolean;
}

export function EnergyAura({ watts, isOn, position, visible }: EnergyAuraProps) {
  const ringRef = useRef<THREE.Mesh>(null!);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta * 2;
    if (ringRef.current) {
      const pulse = 1 + Math.sin(t.current) * 0.08;
      ringRef.current.scale.setScalar(pulse);
      ringRef.current.rotation.z += delta * 0.5;
    }
  });

  if (!visible) return null;

  const color = getEnergyColor(isOn ? watts : 0);

  return (
    <mesh ref={ringRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.38, 0.5, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isOn ? 1.5 : 0.2}
        transparent
        opacity={isOn ? 0.7 : 0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
