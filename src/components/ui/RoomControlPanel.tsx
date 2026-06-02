import { motion } from 'framer-motion';
import { RoomConfig } from '../../data/homeConfig';
import { useHomeStore } from '../../store/useHomeStore';
import { Thermometer, Zap, PowerOff, Power } from 'lucide-react';

const DEVICE_ICONS: Record<string, string> = {
  light: '💡', fan: '🌀', ac: '❄️', tv: '📺',
  geyser: '🔥', plug: '🔌', exhaust: '💨',
};

interface Props {
  room: RoomConfig;
}

export function RoomControlPanel({ room }: Props) {
  const { toggleDevice, turnOffAllInRoom, turnOnAllInRoom } = useHomeStore();

  const activeCount = room.devices.filter((d) => d.isOn).length;
  const totalPower = room.devices.reduce((s, d) => s + (d.isOn ? d.energyWatts : 0), 0);

  return (
    <div className="space-y-4">
      {/* Room header */}
      <div className="p-4 rounded-xl"
        style={{ background: '#0E0E22', border: '1px solid #1E1E3A' }}>
        <div className="text-xl font-bold text-white mb-2">{room.name}</div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-lg font-black" style={{ color: '#00BCD4' }}>{activeCount}</div>
            <div className="text-xs" style={{ color: '#555577' }}>Active</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-black" style={{ color: '#FFD700' }}>{totalPower}W</div>
            <div className="text-xs" style={{ color: '#555577' }}>Power</div>
          </div>
          <div className="text-center flex flex-col items-center">
            <div className="flex items-center gap-1">
              <Thermometer size={12} style={{ color: '#FF6688' }} />
              <span className="text-lg font-black" style={{ color: '#FF6688' }}>{room.temperature}°C</span>
            </div>
            <div className="text-xs" style={{ color: '#555577' }}>Room Temp</div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-2">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            turnOnAllInRoom(room.id);
          }}
          className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer select-none"
          style={{ background: '#001520', border: '1px solid #00BCD4', color: '#00BCD4', cursor: 'pointer' }}
        >
          <Power size={14} />
          All On
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            turnOffAllInRoom(room.id);
          }}
          className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer select-none"
          style={{ background: '#1A0A0A', border: '1px solid #FF4500', color: '#FF4500', cursor: 'pointer' }}
        >
          <PowerOff size={14} />
          All Off
        </motion.button>
      </div>

      {/* Device list */}
      <div className="space-y-2">
        <div className="text-sm font-semibold" style={{ color: '#888899' }}>Devices</div>
        {room.devices.map((device, i) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-3 rounded-xl"
            style={{
              background: device.isOn ? '#0A1520' : '#0E0E22',
              border: `1px solid ${device.isOn ? '#1E3A4A' : '#1E1E3A'}`,
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl">{DEVICE_ICONS[device.type] ?? '🔧'}</span>
              <div className="min-w-0">
                <div className="text-white text-sm font-medium truncate">{device.name}</div>
                <div className="text-xs" style={{ color: '#555577' }}>
                  {device.isOn ? (
                    <span style={{ color: '#00FF88' }}>{device.energyWatts}W</span>
                  ) : (
                    'Standby'
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Mini power indicator */}
              {device.isOn && (
                <div className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#00FF88' }} />
              )}
              {/* Toggle */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleDevice(device.id);
                }}
                className="relative w-11 h-6 rounded-full transition-all duration-300 cursor-pointer select-none"
                style={{
                  background: device.isOn ? 'linear-gradient(90deg, #00BCD4, #00E5FF)' : '#2A2A4A',
                  boxShadow: device.isOn ? '0 0 8px rgba(0,188,212,0.4)' : 'none',
                  cursor: 'pointer',
                }}
              >
                <motion.div
                  animate={{ x: device.isOn ? 22 : 2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Energy summary */}
      <div className="p-3 rounded-xl" style={{ background: '#0A1A0A', border: '1px solid #1A3A1A' }}>
        <div className="flex items-center gap-2 mb-2">
          <Zap size={14} style={{ color: '#00FF88' }} />
          <span className="text-sm font-semibold" style={{ color: '#00FF88' }}>Energy Summary</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: '#888899' }}>Current usage</span>
          <span className="font-bold text-white">{totalPower}W</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span style={{ color: '#888899' }}>Est. monthly</span>
          <span className="font-bold" style={{ color: '#FFD700' }}>
            ₹{Math.round(totalPower / 1000 * 24 * 30 * 8)}
          </span>
        </div>
      </div>
    </div>
  );
}
