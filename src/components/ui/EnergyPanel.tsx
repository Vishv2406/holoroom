import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { X, Zap, TrendingDown } from 'lucide-react';
import { useHomeStore } from '../../store/useHomeStore';
import { calcDailyKWh, calcMonthlyCost } from '../../data/energyData';

const ROOM_COLORS = ['#00BCD4', '#20C997', '#7B68EE', '#FF8C42', '#00E5FF'];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg text-xs"
        style={{ background: '#1A1A35', border: '1px solid #2A2A4A' }}>
        <div className="text-white font-bold">{label}</div>
        <div style={{ color: '#00BCD4' }}>{payload[0].value}W</div>
      </div>
    );
  }
  return null;
};

export function EnergyPanel() {
  const {
    isEnergyPanelOpen,
    toggleEnergyPanel,
    rooms,
    getTotalPower,
    toggleEnergyAura,
    showEnergyAura,
    turnOffHighConsumers,
    addNotification,
  } = useHomeStore();

  const totalPower = getTotalPower();
  const dailyKWh = calcDailyKWh(totalPower);
  const monthlyCost = calcMonthlyCost(totalPower);

  // Per-device data for bar chart
  const deviceData = rooms.flatMap((room) =>
    room.devices
      .filter((d) => d.isOn && d.energyWatts > 0)
      .map((d) => ({
        name: `${d.name.split(' ')[0]}`,
        watts: d.energyWatts,
        room: room.name.split(' ')[0],
      }))
  ).sort((a, b) => b.watts - a.watts).slice(0, 8);

  // Per-room data for pie chart
  const roomData = rooms.map((room, i) => ({
    name: room.name.split(' ')[0],
    value: room.devices.reduce((s, d) => s + (d.isOn ? d.energyWatts : 0), 0),
    color: ROOM_COLORS[i % ROOM_COLORS.length],
  })).filter((r) => r.value > 0);

  const hasHighConsumers = rooms.some((r) => r.devices.some((d) => d.isOn && d.energyWatts > 1000));

  return (
    <AnimatePresence>
      {isEnergyPanelOpen && (
        <motion.div
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-[60px] bottom-0 flex flex-col overflow-hidden"
          style={{
            left: '280px',
            width: '320px',
            background: 'linear-gradient(180deg, #0D0D20 0%, #0A0A1A 100%)',
            borderRight: '1px solid #1E1E3A',
            borderLeft: '1px solid #1E1E3A',
            zIndex: 45,
            pointerEvents: 'auto',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3"
            style={{ borderBottom: '1px solid #1E1E3A' }}>
            <div className="flex items-center gap-2">
              <Zap size={18} style={{ color: '#00FF88' }} />
              <div>
                <div className="text-white font-bold">Energy Monitor</div>
                <div className="text-xs" style={{ color: '#888899' }}>Real-time consumption</div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleEnergyPanel();
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
              style={{ background: '#1A1A35', border: '1px solid #2A2A4A', cursor: 'pointer' }}
            >
              <X size={14} style={{ color: '#AAAACC' }} />
            </motion.button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Now', value: `${totalPower}W`, color: totalPower > 2000 ? '#FF4500' : '#00BCD4', icon: '⚡' },
                { label: 'Daily', value: `${dailyKWh.toFixed(1)} kWh`, color: '#FFD700', icon: '📊' },
                { label: 'Monthly', value: `₹${Math.round(monthlyCost)}`, color: '#00FF88', icon: '💰' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.03 }}
                  className="p-3 rounded-xl text-center"
                  style={{ background: '#131328', border: '1px solid #1E1E3A' }}
                >
                  <div className="text-lg">{stat.icon}</div>
                  <div className="text-xs font-black mt-1 leading-tight" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: '#555577' }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Total power gauge */}
            <div className="p-4 rounded-xl" style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: '#888899' }}>Total Power</span>
                <span className="font-bold" style={{ color: totalPower > 3000 ? '#FF4500' : '#00BCD4' }}>
                  {(totalPower / 1000).toFixed(2)} kW
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: '#1A1A35' }}>
                <motion.div
                  animate={{ width: `${Math.min((totalPower / 5000) * 100, 100)}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{
                    background: totalPower > 3000
                      ? 'linear-gradient(90deg, #FF4500, #FF8800)'
                      : totalPower > 1500
                      ? 'linear-gradient(90deg, #FFD700, #FF8800)'
                      : 'linear-gradient(90deg, #00FF88, #00BCD4)',
                  }}
                />
              </div>
              <div className="text-xs mt-1" style={{ color: '#555577' }}>
                Max capacity: 5kW
              </div>
            </div>

            {/* Device bar chart */}
            {deviceData.length > 0 && (
              <div className="p-4 rounded-xl" style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
                <div className="text-sm font-semibold text-white mb-3">Top Consumers</div>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={deviceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fill: '#888899', fontSize: 10 }} />
                    <YAxis tick={{ fill: '#888899', fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="watts" radius={[3, 3, 0, 0]}>
                      {deviceData.map((entry, i) => (
                        <Cell
                          key={i}
                          fill={entry.watts > 1000 ? '#FF4500' : entry.watts > 200 ? '#FFD700' : '#00BCD4'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Room pie chart */}
            {roomData.length > 0 && (
              <div className="p-4 rounded-xl" style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
                <div className="text-sm font-semibold text-white mb-3">Usage by Room</div>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={roomData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {roomData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      formatter={(value) => (
                        <span style={{ color: '#AAAACC', fontSize: '11px' }}>{value}</span>
                      )}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}W`, 'Usage']}
                      contentStyle={{ background: '#1A1A35', border: '1px solid #2A2A4A', borderRadius: '8px' }}
                      labelStyle={{ color: '#FFFFFF' }}
                      itemStyle={{ color: '#00BCD4' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {deviceData.length === 0 && (
              <div className="text-center py-8" style={{ color: '#555577' }}>
                <div className="text-4xl mb-2">💤</div>
                <div className="text-sm">All devices are off</div>
                <div className="text-xs mt-1">Turn on devices to see energy usage</div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleEnergyAura();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer"
                style={{
                  background: showEnergyAura ? '#001A35' : '#1A1A35',
                  border: `1px solid ${showEnergyAura ? '#00BCD4' : '#2A2A4A'}`,
                  color: showEnergyAura ? '#00BCD4' : '#AAAACC',
                  cursor: 'pointer',
                }}
              >
                🔮 {showEnergyAura ? 'Hide' : 'Show'} Energy Aura
              </motion.button>

              {hasHighConsumers && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    turnOffHighConsumers();
                    addNotification('High consumers turned off. Energy saved! 🌱', 'success');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
                  style={{ background: '#1A0500', border: '1px solid #FF4500', color: '#FF4500', cursor: 'pointer' }}
                >
                  <TrendingDown size={14} />
                  Turn Off High Consumers (&gt;1kW)
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
