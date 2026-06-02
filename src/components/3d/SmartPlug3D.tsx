interface SmartPlugProps {
  isOn: boolean;
  position: [number, number, number];
  onClick: () => void;
  isSelected?: boolean;
}

export function SmartPlug3D({ isOn, position, onClick, isSelected }: SmartPlugProps) {
  return (
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      {/* Socket plate */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[0.22, 0.22, 0.1]} />
        <meshStandardMaterial
          color={isOn ? '#003322' : '#2A2A3A'}
          emissive={isOn ? '#00FF88' : '#000000'}
          emissiveIntensity={isOn ? 0.4 : 0}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Plug holes */}
      <mesh position={[-0.04, 0, 0.055]}>
        <boxGeometry args={[0.03, 0.08, 0.01]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[0.04, 0, 0.055]}>
        <boxGeometry args={[0.03, 0.08, 0.01]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* LED indicator */}
      <mesh position={[0, 0.07, 0.055]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial
          color={isOn ? '#00FF88' : '#333333'}
          emissive={isOn ? '#00FF88' : '#000000'}
          emissiveIntensity={isOn ? 2 : 0}
        />
      </mesh>

      {/* Selection glow */}
      {isSelected && (
        <mesh>
          <boxGeometry args={[0.28, 0.28, 0.15]} />
          <meshStandardMaterial color="#00BCD4" transparent opacity={0.2} emissive="#00BCD4" emissiveIntensity={1} />
        </mesh>
      )}

      {/* Power glow */}
      {isOn && (
        <pointLight color="#00FF88" intensity={0.4} distance={1.5} decay={2} />
      )}
    </group>
  );
}
