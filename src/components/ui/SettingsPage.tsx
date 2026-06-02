import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Moon, Sun, RefreshCw, Edit2, Check } from 'lucide-react';
import { useHomeStore } from '../../store/useHomeStore';

export function SettingsPage() {
  const {
    isSettingsOpen,
    toggleSettings,
    isDarkMode,
    toggleDarkMode,
    homeName,
    setHomeName,
    rooms,
    renameDevice,
    resetToDefaults,
    addNotification,
  } = useHomeStore();

  const [editingHomeName, setEditingHomeName] = useState(false);
  const [tempHomeName, setTempHomeName] = useState(homeName);
  const [editingDeviceId, setEditingDeviceId] = useState<number | null>(null);
  const [tempDeviceName, setTempDeviceName] = useState('');

  const handleSaveHomeName = () => {
    setHomeName(tempHomeName.trim() || homeName);
    setEditingHomeName(false);
  };

  const handleStartEditDevice = (id: number, currentName: string) => {
    setEditingDeviceId(id);
    setTempDeviceName(currentName);
  };

  const handleSaveDevice = (id: number) => {
    if (tempDeviceName.trim()) renameDevice(id, tempDeviceName.trim());
    setEditingDeviceId(null);
  };

  const handleReset = () => {
    resetToDefaults();
    addNotification('Home reset to default settings.', 'info');
  };

  return (
    <AnimatePresence>
      {isSettingsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSettings();
            }}
            className="fixed inset-0 cursor-pointer"
            style={{ 
              background: 'rgba(0,0,0,0.7)', 
              backdropFilter: 'blur(4px)',
              zIndex: 60,
              pointerEvents: 'auto',
            }}
          />

          {/* Settings modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-x-4 top-[70px] bottom-4 rounded-2xl overflow-hidden flex flex-col md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[560px]"
            style={{
              background: 'linear-gradient(180deg, #0D0D20 0%, #0A0A1A 100%)',
              border: '1px solid #2A2A4A',
              boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
              zIndex: 65,
              pointerEvents: 'auto',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid #1E1E3A' }}>
              <div>
                <div className="text-white font-bold text-lg">Settings</div>
                <div className="text-xs" style={{ color: '#888899' }}>HOLOROOM 3D Configuration</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSettings();
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer"
                style={{ background: '#1A1A35', border: '1px solid #2A2A4A', cursor: 'pointer' }}
              >
                <X size={16} style={{ color: '#AAAACC' }} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Home Config */}
              <section>
                <div className="text-sm font-bold mb-3" style={{ color: '#888899' }}>HOME CONFIGURATION</div>
                <div className="p-4 rounded-xl" style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold">Home Name</div>
                      <div className="text-xs" style={{ color: '#555577' }}>Displayed in top bar</div>
                    </div>
                    {editingHomeName ? (
                      <div className="flex items-center gap-2">
                        <input
                          autoFocus
                          value={tempHomeName}
                          onChange={(e) => setTempHomeName(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveHomeName()}
                          className="px-2 py-1 rounded-lg text-sm text-white w-32"
                          style={{ background: '#1A1A35', border: '1px solid #00BCD4', outline: 'none' }}
                        />
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSaveHomeName();
                          }}
                          className="cursor-pointer"
                          style={{ cursor: 'pointer' }}
                        >
                          <Check size={16} style={{ color: '#00FF88' }} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{homeName}</span>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setEditingHomeName(true);
                            setTempHomeName(homeName);
                          }}
                          className="cursor-pointer"
                          style={{ cursor: 'pointer' }}
                        >
                          <Edit2 size={14} style={{ color: '#00BCD4' }} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Appearance */}
              <section>
                <div className="text-sm font-bold mb-3" style={{ color: '#888899' }}>APPEARANCE</div>
                <div className="p-4 rounded-xl" style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isDarkMode ? <Moon size={18} style={{ color: '#7B68EE' }} /> : <Sun size={18} style={{ color: '#FFD700' }} />}
                      <div>
                        <div className="text-white font-semibold">Theme</div>
                        <div className="text-xs" style={{ color: '#555577' }}>{isDarkMode ? 'Dark mode' : 'Light mode'}</div>
                      </div>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleDarkMode();
                      }}
                      className="relative w-14 h-7 rounded-full transition-all duration-300 cursor-pointer"
                      style={{
                        background: isDarkMode ? '#7B68EE' : '#FFD700',
                        boxShadow: `0 0 12px ${isDarkMode ? '#7B68EE' : '#FFD700'}66`,
                        cursor: 'pointer',
                      }}
                    >
                      <motion.div
                        animate={{ x: isDarkMode ? 28 : 2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg"
                      />
                    </motion.button>
                  </div>
                </div>
              </section>

              {/* Device Names */}
              <section>
                <div className="text-sm font-bold mb-3" style={{ color: '#888899' }}>DEVICE NAMES</div>
                <div className="space-y-2">
                  {rooms.map((room) => (
                    <div key={room.id} className="rounded-xl overflow-hidden"
                      style={{ border: '1px solid #1E1E3A' }}>
                      <div className="px-4 py-2 text-xs font-bold" style={{ background: '#0E0E22', color: '#888899' }}>
                        {room.name}
                      </div>
                      {room.devices.map((device) => (
                        <div key={device.id}
                          className="flex items-center justify-between px-4 py-2.5"
                          style={{ background: '#131328', borderTop: '1px solid #1A1A30' }}
                        >
                          <span className="text-sm text-white">{device.name}</span>
                          {editingDeviceId === device.id ? (
                            <div className="flex items-center gap-2">
                              <input
                                autoFocus
                                value={tempDeviceName}
                                onChange={(e) => setTempDeviceName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveDevice(device.id)}
                                className="px-2 py-1 rounded text-sm text-white w-28"
                                style={{ background: '#1A1A35', border: '1px solid #00BCD4', outline: 'none' }}
                              />
                              <button 
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleSaveDevice(device.id);
                                }}
                                className="cursor-pointer"
                                style={{ cursor: 'pointer' }}
                              >
                                <Check size={14} style={{ color: '#00FF88' }} />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleStartEditDevice(device.id, device.name);
                              }}
                              className="cursor-pointer"
                              style={{ cursor: 'pointer' }}
                            >
                              <Edit2 size={12} style={{ color: '#555577' }} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </section>

              {/* Account info */}
              <section>
                <div className="text-sm font-bold mb-3" style={{ color: '#888899' }}>TOUCHBEAT ACCOUNT</div>
                <div className="p-4 rounded-xl space-y-2" style={{ background: '#131328', border: '1px solid #1E1E3A' }}>
                  {[
                    { label: 'Account', value: 'homeowner@touchbeat.in' },
                    { label: 'Plan', value: 'TouchBeat Premium' },
                    { label: 'Devices', value: '17 registered' },
                    { label: 'Location', value: 'Mumbai, India' },
                    { label: 'Version', value: 'HOLOROOM 3D v1.0' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span style={{ color: '#888899' }}>{label}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Reset */}
              <section>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleReset();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
                  style={{ background: '#1A0505', border: '1px solid #E94560', color: '#E94560', cursor: 'pointer' }}
                >
                  <RefreshCw size={14} />
                  Reset to Defaults
                </motion.button>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
