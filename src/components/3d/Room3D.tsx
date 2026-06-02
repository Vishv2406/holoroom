import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomConfig, DeviceState } from '../../data/homeConfig';
import { Light3D } from './Light3D';
import { Fan3D } from './Fan3D';
import { AC3D } from './AC3D';
import { TV3D } from './TV3D';
import { Geyser3D } from './Geyser3D';
import { SmartPlug3D } from './SmartPlug3D';
import { EnergyAura } from './EnergyAura';
import { RoomLabel } from './RoomLabel';

interface Room3DProps {
  room: RoomConfig;
  selectedDeviceId: number | null;
  showEnergyAura: boolean;
  onDeviceClick: (device: DeviceState, roomId: number, roomName: string) => void;
  onRoomClick: (room: RoomConfig) => void;
}

const WALL_HEIGHT = 3;
const WALL_THICKNESS = 0.2;

export function Room3D({ room, selectedDeviceId, showEnergyAura, onDeviceClick, onRoomClick }: Room3DProps) {
  const floorRef = useRef<THREE.Mesh>(null!);
  const t = useRef(0);
  
  useFrame((_, delta) => {
    t.current += delta;
  });

  const { position, size, color, devices } = room;
  const px = position.x;
  const pz = position.z;
  const w = size.width;
  const d = size.depth;

  const renderDevice = (device: DeviceState) => {
    const worldPos: [number, number, number] = [
      px + device.position.x,
      device.position.y,
      pz + device.position.z,
    ];
    const isSelected = selectedDeviceId === device.id;
    const handleClick = () => onDeviceClick(device, room.id, room.name);

    const aura = (
      <EnergyAura
        key={`aura-${device.id}`}
        watts={device.energyWatts}
        isOn={device.isOn}
        position={worldPos}
        visible={showEnergyAura}
      />
    );

    let deviceMesh = null;

    if (device.type === 'light') {
      deviceMesh = (
        <Light3D
          key={device.id}
          isOn={device.isOn}
          brightness={device.brightness ?? 100}
          position={worldPos}
          onClick={handleClick}
          isSelected={isSelected}
        />
      );
    } else if (device.type === 'fan') {
      deviceMesh = (
        <Fan3D
          key={device.id}
          isOn={device.isOn}
          speed={device.speed ?? 3}
          position={worldPos}
          onClick={handleClick}
          isSelected={isSelected}
        />
      );
    } else if (device.type === 'ac') {
      deviceMesh = (
        <AC3D
          key={device.id}
          isOn={device.isOn}
          temperature={device.temperature ?? 24}
          mode={device.mode ?? 'cool'}
          position={worldPos}
          onClick={handleClick}
          isSelected={isSelected}
        />
      );
    } else if (device.type === 'tv') {
      deviceMesh = (
        <TV3D
          key={device.id}
          isOn={device.isOn}
          position={worldPos}
          onClick={handleClick}
          isSelected={isSelected}
        />
      );
    } else if (device.type === 'geyser') {
      deviceMesh = (
        <Geyser3D
          key={device.id}
          isOn={device.isOn}
          position={worldPos}
          onClick={handleClick}
          isSelected={isSelected}
        />
      );
    } else if (device.type === 'plug' || device.type === 'exhaust') {
      deviceMesh = (
        <SmartPlug3D
          key={device.id}
          isOn={device.isOn}
          position={worldPos}
          onClick={handleClick}
          isSelected={isSelected}
        />
      );
    }

    return (
      <group key={device.id}>
        {deviceMesh}
        {aura}
      </group>
    );
  };

  const activeCount = devices.filter((d) => d.isOn).length;

  return (
    <group>
      {/* Floor */}
      <mesh
        ref={floorRef}
        position={[px, 0, pz]}
        receiveShadow
        onClick={(e) => { e.stopPropagation(); onRoomClick(room); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        <boxGeometry args={[w, 0.1, d]} />
        <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Ceiling (transparent-ish) */}
      <mesh position={[px, WALL_HEIGHT, pz]} receiveShadow>
        <boxGeometry args={[w, 0.08, d]} />
        <meshStandardMaterial color="#1A1A2E" transparent opacity={0.3} roughness={1} />
      </mesh>

      {/* WALLS — North (back) */}
      <mesh position={[px, WALL_HEIGHT / 2, pz - d / 2]} receiveShadow castShadow>
        <boxGeometry args={[w, WALL_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color="#2A2A3E" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* South (front) */}
      <mesh position={[px, WALL_HEIGHT / 2, pz + d / 2]} receiveShadow castShadow>
        <boxGeometry args={[w, WALL_HEIGHT, WALL_THICKNESS]} />
        <meshStandardMaterial color="#252535" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* West (left) */}
      <mesh position={[px - w / 2, WALL_HEIGHT / 2, pz]} receiveShadow castShadow>
        <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, d]} />
        <meshStandardMaterial color="#222232" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* East (right) */}
      <mesh position={[px + w / 2, WALL_HEIGHT / 2, pz]} receiveShadow castShadow>
        <boxGeometry args={[WALL_THICKNESS, WALL_HEIGHT, d]} />
        <meshStandardMaterial color="#222232" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Room Label */}
      <RoomLabel
        name={room.name}
        activeCount={activeCount}
        position={[px, WALL_HEIGHT + 0.9, pz]}
        onClick={() => onRoomClick(room)}
      />

      {/* Devices */}
      {devices.map(renderDevice)}
    </group>
  );
}
