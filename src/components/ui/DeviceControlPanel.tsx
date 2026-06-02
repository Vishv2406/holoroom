import { motion } from 'framer-motion';
import { DeviceState } from '../../data/homeConfig';
import { useHomeStore } from '../../store/useHomeStore';

const DEVICE_ICONS: Record<string, string> = {
  light: '💡',
  fan: '🌀',
  ac: '❄️',
  tv: '📺',
  geyser: '🔥',
  plug: '🔌',
  exhaust: '💨',
};

const MODE_OPTIONS = ['cool', 'heat', 'fan', 'auto'] as const;
const FAN_SPEEDS = [1, 2, 3, 4, 5];
const TIMER_OPTIONS = [15, 30, 45, 60];

interface Props {
  device: DeviceState & { roomId: number; roomName: string };
}

export function DeviceControlPanel({ device }: Props) {
  const { toggleDevice, updateDevice } = useHomeStore();

  const icon = DEVICE_ICONS[device.type] ?? '🔧';

  const formatLastUsed = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    return `${Math.floor(diffMin / 60)}h ago`;
  };

  return (
    <div className="space-y-4">
      {/* Device header */}
      <div className="flex items-center gap-3 p-4 rounded-xl"
        style={{ background: '#0E0E22', border: '1px solid #1E1E3A' }}>
        <div className="text-3xl">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-bold text-lg truncate">{device.name}</div>
          <div className="text-sm" style={{ color: '#888899' }}>{device.roomName}</div>
          <div className="text-xs mt-0.5" style={{ color: '#555577' }}>
            Last used: {formatLastUsed(device.lastUsed)}
          </div>
        </div>
        <div className={`px-2 py-1 rounded-lg text-xs font-bold ${device.isOn ? 'bg-green-900 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
          {device.isOn ? 'ON' : 'OFF'}
        </div>
      </div>

      {/* Power Toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl"
        style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
        <div>
          <div className="text-white font-semibold">Power</div>
          <div className="text-sm" style={{ color: '#888899' }}>
            {device.energyWatts}W {device.isOn ? 'consuming' : '(standby)'}
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleDevice(device.id);
          }}
          className="relative w-14 h-7 rounded-full transition-all duration-300 cursor-pointer select-none"
          style={{
            background: device.isOn
              ? 'linear-gradient(90deg, #00BCD4, #00E5FF)'
              : '#2A2A4A',
            boxShadow: device.isOn ? '0 0 12px rgba(0,188,212,0.5)' : 'none',
            cursor: 'pointer',
          }}
        >
          <motion.div
            animate={{ x: device.isOn ? 28 : 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg"
          />
        </motion.button>
      </div>

      {/* Light controls */}
      {device.type === 'light' && (
        <div className="p-4 rounded-xl space-y-3"
          style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">Brightness</span>
            <span className="text-sm font-bold" style={{ color: '#00BCD4' }}>
              {device.brightness ?? 100}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={device.brightness ?? 100}
            onChange={(e) => {
              e.preventDefault();
              updateDevice(device.id, { brightness: +e.target.value });
            }}
            className="w-full cursor-pointer"
            style={{ cursor: 'pointer' }}
          />
          <div className="flex justify-between text-xs" style={{ color: '#555577' }}>
            <span>Dim</span><span>Bright</span>
          </div>
        </div>
      )}

      {/* Fan controls */}
      {(device.type === 'fan' || device.type === 'exhaust') && (
        <div className="p-4 rounded-xl space-y-3"
          style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
          <div className="text-white font-semibold">Fan Speed</div>
          <div className="flex gap-2">
            {FAN_SPEEDS.map((s) => (
              <motion.button
                key={s}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateDevice(device.id, { speed: s });
                }}
                className="flex-1 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer select-none"
                style={{
                  background: device.speed === s ? '#00BCD4' : '#1A1A35',
                  color: device.speed === s ? '#000' : '#AAAACC',
                  border: `1px solid ${device.speed === s ? '#00BCD4' : '#2A2A4A'}`,
                  boxShadow: device.speed === s ? '0 0 8px rgba(0,188,212,0.4)' : 'none',
                  cursor: 'pointer',
                }}
              >
                {s}
              </motion.button>
            ))}
          </div>
          <div className="text-xs text-center" style={{ color: '#555577' }}>
            {device.speed === 1 ? 'Breeze' : device.speed === 2 ? 'Gentle' : device.speed === 3 ? 'Normal' : device.speed === 4 ? 'Fast' : 'Turbo'}
          </div>
        </div>
      )}

      {/* AC controls */}
      {device.type === 'ac' && (
        <>
          <div className="p-4 rounded-xl space-y-3"
            style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">Temperature</span>
              <span className="text-lg font-black" style={{ color: '#00BCD4' }}>
                {device.temperature ?? 24}°C
              </span>
            </div>
            <input
              type="range"
              min={16}
              max={30}
              value={device.temperature ?? 24}
              onChange={(e) => {
                e.preventDefault();
                updateDevice(device.id, { temperature: +e.target.value });
              }}
              className="w-full cursor-pointer"
              style={{ cursor: 'pointer' }}
            />
            <div className="flex justify-between text-xs" style={{ color: '#555577' }}>
              <span>16°C ❄️</span><span>30°C 🔥</span>
            </div>
          </div>

          <div className="p-4 rounded-xl space-y-3"
            style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
            <div className="text-white font-semibold">Mode</div>
            <div className="grid grid-cols-2 gap-2">
              {MODE_OPTIONS.map((m) => (
                <motion.button
                  key={m}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateDevice(device.id, { mode: m });
                  }}
                  className="py-2 rounded-lg text-sm font-bold capitalize transition-all flex items-center justify-center gap-1 cursor-pointer select-none"
                  style={{
                    background: device.mode === m ? '#00BCD4' : '#1A1A35',
                    color: device.mode === m ? '#000' : '#AAAACC',
                    border: `1px solid ${device.mode === m ? '#00BCD4' : '#2A2A4A'}`,
                    cursor: 'pointer',
                  }}
                >
                  {m === 'cool' ? '❄️' : m === 'heat' ? '🔥' : m === 'fan' ? '🌀' : '🤖'} {m}
                </motion.button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* TV controls */}
      {device.type === 'tv' && (
        <div className="p-4 rounded-xl space-y-3"
          style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">Volume</span>
            <span className="text-sm font-bold" style={{ color: '#00BCD4' }}>
              {device.volume ?? 30}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={device.volume ?? 30}
            onChange={(e) => {
              e.preventDefault();
              updateDevice(device.id, { volume: +e.target.value });
            }}
            className="w-full cursor-pointer"
            style={{ cursor: 'pointer' }}
          />
          <div className="flex justify-between text-xs" style={{ color: '#555577' }}>
            <span>🔇 Mute</span><span>🔊 Max</span>
          </div>
        </div>
      )}

      {/* Geyser timer */}
      {device.type === 'geyser' && (
        <div className="p-4 rounded-xl space-y-3"
          style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
          <div className="text-white font-semibold">Timer</div>
          <div className="grid grid-cols-2 gap-2">
            {TIMER_OPTIONS.map((t) => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateDevice(device.id, { timer: t });
                }}
                className="py-2 rounded-lg text-sm font-bold transition-all cursor-pointer select-none"
                style={{
                  background: device.timer === t ? '#FF4500' : '#1A1A35',
                  color: device.timer === t ? '#FFF' : '#AAAACC',
                  border: `1px solid ${device.timer === t ? '#FF4500' : '#2A2A4A'}`,
                  cursor: 'pointer',
                }}
              >
                {t} min
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Energy display */}
      <div className="p-4 rounded-xl"
        style={{ background: '#0A1A0A', border: '1px solid #1A3A1A' }}>
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: '#888899' }}>Energy Use</span>
          <span className="font-bold" style={{ color: device.isOn ? (device.energyWatts > 500 ? '#FF4500' : '#00FF88') : '#444466' }}>
            {device.isOn ? `${device.energyWatts}W` : '0W'}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs" style={{ color: '#555577' }}>Est. monthly cost</span>
          <span className="text-xs font-bold" style={{ color: '#888899' }}>
            ₹{Math.round((device.isOn ? device.energyWatts : 0) / 1000 * 24 * 30 * 8)}
          </span>
        </div>
      </div>
    </div>
  );
}
