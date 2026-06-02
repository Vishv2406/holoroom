import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onDone: () => void;
}

const LOADING_STEPS = [
  'Initializing HOLOROOM 3D...',
  'Loading apartment model...',
  'Configuring smart devices...',
  'Connecting to TouchBeat...',
  'Ready!',
];

export function LoadingScreen({ onDone }: Props) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = LOADING_STEPS.length;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setStep(Math.min(currentStep, steps - 1));
      setProgress(Math.min((currentStep / (steps - 1)) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(interval);
        setTimeout(onDone, 400);
      }
    }, 450);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #12122A 0%, #060612 70%)' }}
    >
      {/* Animated grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${(i % 4) * 25}%`,
              top: `${Math.floor(i / 4) * 50}%`,
              width: '25%',
              height: '50%',
              border: '1px solid #00BCD4',
              opacity: 0.3,
            }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative mb-8"
      >
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 -m-4 rounded-full"
          style={{ border: '2px solid transparent', borderTopColor: '#00BCD4', borderRightColor: '#00BCD455' }}
        />

        {/* Logo box */}
        <div
          className="relative w-24 h-24 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #001820, #003040)',
            border: '2px solid #00BCD4',
            boxShadow: '0 0 40px rgba(0,188,212,0.4), inset 0 0 20px rgba(0,188,212,0.1)',
          }}
        >
          <div>
            <div className="text-center text-3xl font-black" style={{ color: '#00BCD4' }}>TB</div>
            <div className="text-center text-xs font-bold text-white">HOLOROOM</div>
          </div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-2"
      >
        <div className="text-4xl font-black text-white">
          HOLOROOM <span style={{ color: '#00BCD4' }}>3D</span>
        </div>
        <div className="text-sm mt-1" style={{ color: '#888899' }}>
          Smart Home Digital Twin by TouchBeat
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm mb-10 italic"
        style={{ color: '#00BCD4' }}
      >
        "Your Smart Home. In 3D. In Your Browser."
      </motion.p>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-72 space-y-3"
      >
        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1A1A35' }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #00BCD4, #00E5FF)' }}
          />
        </div>

        {/* Status text */}
        <div className="text-center text-sm" style={{ color: '#888899' }}>
          {LOADING_STEPS[step]}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {LOADING_STEPS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i === step ? 1.4 : 1,
                background: i <= step ? '#00BCD4' : '#1A1A35',
              }}
              transition={{ duration: 0.2 }}
              className="w-2 h-2 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
