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
            style={{ pointerEvents: 'none' }}
          >
            {/* 3D Canvas — full screen background with pointer events disabled initially */}
            <div className="absolute inset-0" style={{ zIndex: 1, pointerEvents: 'auto' }}>
              <SceneCanvas />
            </div>

            {/* UI Overlay - TopBar always clickable */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
              <TopBar />
            </div>
            
            {/* LeftSidebar always clickable */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
              <LeftSidebar />
            </div>

            {/* Panels that appear on the right */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
              <EnergyPanel />
              <AutomationBuilder />
            </div>

            {/* Right device/room panel */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 40 }}>
              <RightPanel />
            </div>

            {/* Quick camera controls */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 25 }}>
              <QuickControls />
            </div>

            {/* Overlays */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
              <NotificationsPanel />
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
