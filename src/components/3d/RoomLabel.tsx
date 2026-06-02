import { Text, Billboard } from '@react-three/drei';

interface RoomLabelProps {
  name: string;
  activeCount: number;
  position: [number, number, number];
  onClick: () => void;
}

export function RoomLabel({ name, activeCount, position, onClick }: RoomLabelProps) {
  return (
    <Billboard position={position} follow={true}>
      <group onClick={(e) => { e.stopPropagation(); onClick(); }}>
        {/* Background panel */}
        <mesh>
          <planeGeometry args={[3.2, 0.7]} />
          <meshStandardMaterial
            color="#0A0A1A"
            transparent
            opacity={0.75}
            roughness={0.9}
          />
        </mesh>

        {/* Border */}
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[3.25, 0.72]} />
          <meshStandardMaterial
            color="#00BCD4"
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Room name */}
        <Text
          position={[0, 0.1, 0.01]}
          fontSize={0.28}
          color="#00BCD4"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
        >
          {name}
        </Text>

        {/* Active device count */}
        <Text
          position={[0, -0.17, 0.01]}
          fontSize={0.16}
          color={activeCount > 0 ? '#00FF88' : '#666688'}
          anchorX="center"
          anchorY="middle"
        >
          {activeCount > 0 ? `● ${activeCount} device${activeCount !== 1 ? 's' : ''} active` : '○ All off'}
        </Text>
      </group>
    </Billboard>
  );
}
