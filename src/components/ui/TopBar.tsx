import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings, Zap, Home, Sun, Cloud, Activity } from 'lucide-react';
import { useHomeStore } from '../../store/useHomeStore';
import { useScenePlayer } from '../../hooks/useScenePlayer';
import { SCENES } from '../../data/scenes';

export function TopBar() {
  const [time, setTime] = useState(new Date());
  const {
    homeName,
    getTotalPower,
    getActiveDeviceCount,
    getUnreadCount,
    toggleNotifications,
    toggleSettings,
    setCameraTarget,
    isNotificationsOpen,
    isSettingsOpen,
  } = useHomeStore();

  const { playScene } = useScenePlayer();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  const totalPower = getTotalPower();
  const activeCount = getActiveDeviceCount();
  const unreadCount = getUnreadCount();

  const quickScenes = SCENES.slice(0, 5);

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 flex items-center justify-between px-4 h-[60px]"
      style={{
        background: 'linear-gradient(90deg, #0A0A1A 0%, #12122A 50%, #0A0A1A 100%)',
        borderBottom: '1px solid #1E1E3A',
        backdropFilter: 'blur(12px)',
        zIndex: 50,
        pointerEvents: 'auto',
      }}
    >
      {/* Left: Logo + Home name */}
      <div className="flex items-center gap-4 min-w-0">
        {/* TouchBeat Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCameraTarget('overview');
          }}
          className="flex items-center gap-2 group cursor-pointer select-none"
          style={{ cursor: 'pointer' }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00BCD4, #0088A8)' }}>
            <span className="text-white font-black text-sm">TB</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-white font-bold text-sm leading-none">HOLOROOM <span style={{ color: '#00BCD4' }}>3D</span></div>
            <div className="text-xs leading-none" style={{ color: '#00BCD4' }}>by TouchBeat</div>
          </div>
        </motion.button>

        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg"
          style={{ background: '#1A1A2E', border: '1px solid #2A2A4A' }}>
          <Home size={12} style={{ color: '#00BCD4' }} />
          <span className="text-white text-sm font-medium">{homeName}</span>
        </div>
      </div>

      {/* Center: Quick stats + scene buttons */}
      <div className="flex items-center gap-2 flex-1 justify-center mx-2">
        {/* Stats */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.div
            key={activeCount}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{ background: activeCount > 0 ? '#001A10' : '#1A1A2E', border: `1px solid ${activeCount > 0 ? '#00FF88' : '#2A2A4A'}` }}
          >
            <Activity size={12} style={{ color: activeCount > 0 ? '#00FF88' : '#666688' }} />
            <span className="text-xs font-bold" style={{ color: activeCount > 0 ? '#00FF88' : '#666688' }}>
              {activeCount} Active
            </span>
          </motion.div>

          <motion.div
            key={Math.round(totalPower)}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
            style={{
              background: totalPower > 2000 ? '#1A0500' : '#1A1A2E',
              border: `1px solid ${totalPower > 2000 ? '#FF4500' : '#2A2A4A'}`
            }}
          >
            <Zap size={12} style={{ color: totalPower > 2000 ? '#FF4500' : '#FFD700' }} />
            <span className="text-xs font-bold" style={{ color: totalPower > 2000 ? '#FF4500' : '#FFD700' }}>
              {totalPower}W
            </span>
          </motion.div>
        </div>

        {/* Quick scene buttons */}
        <div className="hidden sm:flex items-center gap-1">
          {quickScenes.map((scene) => (
            <motion.button
              key={scene.id}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                playScene(scene.id, true);
              }}
              title={`${scene.name} — ${scene.description}`}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all cursor-pointer select-none"
              style={{ background: '#1A1A35', border: '1px solid #2A2A4A', cursor: 'pointer' }}
            >
              {scene.emoji}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right: Weather + Time + Actions */}
      <div className="flex items-center gap-2">
        {/* Weather */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          style={{ background: '#1A1A2E', border: '1px solid #2A2A4A' }}>
          <Sun size={12} style={{ color: '#FFD700' }} />
          <span className="text-xs text-gray-300">Mumbai, 32°C</span>
          <Cloud size={10} style={{ color: '#88AACC' }} />
        </div>

        {/* Time */}
        <div className="hidden md:flex flex-col items-end px-3 py-1 rounded-lg"
          style={{ background: '#1A1A2E', border: '1px solid #2A2A4A' }}>
          <span className="text-white text-sm font-bold leading-none tabular-nums">
            {formatTime(time)}
          </span>
          <span className="text-xs leading-none mt-0.5" style={{ color: '#888899' }}>
            {formatDate(time)}
          </span>
        </div>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleNotifications();
          }}
          className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer select-none"
          style={{
            background: isNotificationsOpen ? '#001520' : '#1A1A2E',
            border: `1px solid ${isNotificationsOpen ? '#00BCD4' : '#2A2A4A'}`,
            cursor: 'pointer',
          }}
        >
          <Bell size={16} style={{ color: isNotificationsOpen ? '#00BCD4' : '#AAAACC' }} />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center badge-pulse"
              style={{ background: '#E94560' }}
            >
              <span className="text-white text-xs font-bold" style={{ fontSize: '9px' }}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </motion.div>
          )}
        </motion.button>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSettings();
          }}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer select-none"
          style={{
            background: isSettingsOpen ? '#001520' : '#1A1A2E',
            border: `1px solid ${isSettingsOpen ? '#00BCD4' : '#2A2A4A'}`,
            cursor: 'pointer',
          }}
        >
          <Settings size={16} style={{ color: isSettingsOpen ? '#00BCD4' : '#AAAACC' }} />
        </motion.button>
      </div>
    </motion.div>
  );
}
