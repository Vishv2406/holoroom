import { useCallback, useRef } from 'react';
import { useHomeStore } from '../store/useHomeStore';
import { SCENES } from '../data/scenes';

export function useScenePlayer() {
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const {
    updateDevice,
    setActiveScene,
    setIsPlayingScene,
    setSceneStep,
    setSceneProgress,
    addNotification,
  } = useHomeStore();

  const cancelScene = useCallback(() => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    setIsPlayingScene(false);
    setSceneStep(0);
    setSceneProgress(0);
    setActiveScene(null);
  }, [setIsPlayingScene, setSceneStep, setSceneProgress, setActiveScene]);

  const playScene = useCallback(
    (sceneId: number, activateMode: boolean = true) => {
      const scene = SCENES.find((s) => s.id === sceneId);
      if (!scene) return;

      // Cancel any ongoing scene
      cancelScene();

      setActiveScene(sceneId);
      setIsPlayingScene(true);
      setSceneStep(0);
      setSceneProgress(0);

      const totalSteps = scene.steps.length;
      const maxDelay = Math.max(...scene.steps.map((s) => s.delay)) + 500;

      scene.steps.forEach((step, index) => {
        const t = setTimeout(() => {
          setSceneStep(index + 1);
          setSceneProgress(Math.round(((index + 1) / totalSteps) * 100));

          if (activateMode) {
            const updates: Record<string, unknown> = { isOn: step.action === 'on' };
            if (step.brightness !== undefined) updates.brightness = step.brightness;
            if (step.speed !== undefined) updates.speed = step.speed;
            if (step.temperature !== undefined) updates.temperature = step.temperature;
            if (step.mode !== undefined) updates.mode = step.mode;
            if (step.volume !== undefined) updates.volume = step.volume;
            if (step.timer !== undefined) updates.timer = step.timer;
            updateDevice(step.deviceId, updates as Parameters<typeof updateDevice>[1]);
          }
        }, step.delay);

        timeoutsRef.current.push(t);
      });

      // Finish
      const finishT = setTimeout(() => {
        setIsPlayingScene(false);
        setSceneProgress(100);
        if (activateMode) {
          addNotification(`Scene "${scene.name}" ${scene.emoji} activated!`, 'success');
        }
        // Keep scene active for 2 more seconds to show completion
        const clearT = setTimeout(() => {
          setActiveScene(null);
          setSceneStep(0);
          setSceneProgress(0);
        }, 2000);
        timeoutsRef.current.push(clearT);
      }, maxDelay);

      timeoutsRef.current.push(finishT);
    },
    [cancelScene, setActiveScene, setIsPlayingScene, setSceneStep, setSceneProgress, updateDevice, addNotification]
  );

  return { playScene, cancelScene };
}
