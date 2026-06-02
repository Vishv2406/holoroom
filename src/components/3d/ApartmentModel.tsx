import { useHomeStore } from '../../store/useHomeStore';
import { Room3D } from './Room3D';
import { DeviceState } from '../../data/homeConfig';

export function ApartmentModel() {
  const { rooms, selectedDevice, showEnergyAura, selectDevice, selectRoom } = useHomeStore();

  const handleDeviceClick = (device: DeviceState, roomId: number, roomName: string) => {
    selectDevice(device, roomId, roomName);
  };

  return (
    <group>
      {rooms.map((room) => (
        <Room3D
          key={room.id}
          room={room}
          selectedDeviceId={selectedDevice?.id ?? null}
          showEnergyAura={showEnergyAura}
          onDeviceClick={handleDeviceClick}
          onRoomClick={selectRoom}
        />
      ))}
    </group>
  );
}
