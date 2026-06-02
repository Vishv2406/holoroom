import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SceneCanvas } from './components/3d/SceneCanvas';
import { TopBar } from './components/ui/TopBar';
import { LeftSidebar } from './components/ui/LeftSidebar';
import { RightPanel } from './components/ui/RightPanel';
import { EnergyPanel } from './components/ui/EnergyPanel';
import { AutomationBuilder } from './components/ui/AutomationBuilder';
import { NotificationsPanel } from './components/ui/NotificationsPanel';
import { SettingsPage } from './components/ui/SettingsPage';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { QuickControls } from './components/ui/QuickControls';
import { useHomeStore } from './store/useHomeStore';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { closePanel } = useHomeStore();

  const handleLoadDone = useCallback(() => {
    setIsLoading(false);
  }, []);

  // ESC key closes panel
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closePanel]);

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#060612', position: 'fixed', width: '100vw', height: '100vh' }}>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onDone={handleLoadDone} />}
      </AnimatePresence>

      {/* Main app (renders underneath loading screen) */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0"
            style={{ pointerEvents: 'auto' }}
          >
            {/* 3D Canvas — full screen background */}
            <div className="absolute inset-0" style={{ zIndex: 1, pointerEvents: 'none' }}>
              <SceneCanvas />
            </div>

            {/* UI Overlay - All UI elements are absolutely positioned and clickable */}
            {/* TopBar */}
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '60px', zIndex: 50, pointerEvents: 'auto' }}>
              <TopBar />
            </div>
            
            {/* LeftSidebar */}
            <div style={{ position: 'fixed', left: 0, top: '60px', bottom: 0, width: '280px', zIndex: 40, pointerEvents: 'auto' }}>
              <LeftSidebar />
            </div>

            {/* Panels that appear on the right - Energy Panel */}
            <div style={{ position: 'fixed', left: '280px', top: '60px', bottom: 0, zIndex: 45, pointerEvents: 'auto' }}>
              <EnergyPanel />
            </div>

            {/* Panels that appear on the right - Automation */}
            <div style={{ position: 'fixed', left: '280px', top: '60px', bottom: 0, zIndex: 45, pointerEvents: 'auto' }}>
              <AutomationBuilder />
            </div>

            {/* Right device/room panel */}
            <div style={{ position: 'fixed', right: 0, top: '60px', bottom: 0, zIndex: 50, pointerEvents: 'auto' }}>
              <RightPanel />
            </div>

            {/* Quick camera controls - bottom right */}
            <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 30, pointerEvents: 'auto' }}>
              <QuickControls />
            </div>

            {/* Overlays - Notifications */}
            <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 60, pointerEvents: 'auto' }}>
              <NotificationsPanel />
            </div>

            {/* Overlays - Settings */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 65, pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SettingsPage />
            </div>

            {/* Hint text at bottom center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 text-xs pointer-events-none text-center px-4"
              style={{ color: '#444466', maxWidth: '600px', zIndex: 5 }}
            >
              <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10">
                💡 <span className="font-semibold text-cyan-400">Tip:</span> Click any device in 3D to control it • Drag to rotate • Scroll to zoom • Press ESC to close panels
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
