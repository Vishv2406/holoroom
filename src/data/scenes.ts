// Scene definitions with sequential animation steps

export interface SceneStep {
  deviceId: number;
  action: 'on' | 'off';
  brightness?: number;
  speed?: number;
  temperature?: number;
  mode?: 'cool' | 'heat' | 'fan' | 'auto';
  volume?: number;
  timer?: number;
  delay: number; // ms delay before this step executes
}

export interface Scene {
  id: number;
  name: string;
  emoji: string;
  description: string;
  color: string;
  gradient: string;
  deviceCount: number;
  steps: SceneStep[];
}

export const SCENES: Scene[] = [
  {
    id: 1,
    name: 'Good Morning',
    emoji: '🌅',
    description: 'Start your day energized',
    color: '#FF9500',
    gradient: 'from-orange-600 to-yellow-500',
    deviceCount: 5,
    steps: [
      { deviceId: 101, action: 'on', brightness: 80, delay: 0 },
      { deviceId: 102, action: 'on', speed: 2, delay: 1000 },
      { deviceId: 401, action: 'on', delay: 2000 },
      { deviceId: 502, action: 'on', timer: 30, delay: 3000 },
      { deviceId: 301, action: 'on', brightness: 60, delay: 4000 },
    ],
  },
  {
    id: 2,
    name: 'Movie Night',
    emoji: '🎬',
    description: 'Perfect cinema ambience',
    color: '#9B59B6',
    gradient: 'from-purple-700 to-indigo-600',
    deviceCount: 6,
    steps: [
      { deviceId: 301, action: 'off', delay: 0 },
      { deviceId: 101, action: 'on', brightness: 20, delay: 500 },
      { deviceId: 201, action: 'off', delay: 1000 },
      { deviceId: 303, action: 'on', volume: 40, delay: 1500 },
      { deviceId: 103, action: 'on', temperature: 24, mode: 'cool', delay: 2000 },
      { deviceId: 102, action: 'on', speed: 2, delay: 2500 },
    ],
  },
  {
    id: 3,
    name: 'Sleep Mode',
    emoji: '😴',
    description: 'Peaceful night setup',
    color: '#2C3E50',
    gradient: 'from-slate-700 to-slate-900',
    deviceCount: 7,
    steps: [
      { deviceId: 101, action: 'off', delay: 0 },
      { deviceId: 201, action: 'off', delay: 500 },
      { deviceId: 301, action: 'off', delay: 1000 },
      { deviceId: 401, action: 'off', delay: 1500 },
      { deviceId: 102, action: 'off', delay: 2000 },
      { deviceId: 103, action: 'on', temperature: 26, mode: 'cool', delay: 2500 },
      { deviceId: 303, action: 'off', delay: 3000 },
    ],
  },
  {
    id: 4,
    name: 'Away Mode',
    emoji: '🔒',
    description: 'Secure your home',
    color: '#E74C3C',
    gradient: 'from-red-700 to-red-900',
    deviceCount: 10,
    steps: [
      { deviceId: 101, action: 'off', delay: 0 },
      { deviceId: 102, action: 'off', delay: 200 },
      { deviceId: 103, action: 'off', delay: 400 },
      { deviceId: 104, action: 'off', delay: 600 },
      { deviceId: 201, action: 'off', delay: 800 },
      { deviceId: 202, action: 'off', delay: 1000 },
      { deviceId: 203, action: 'off', delay: 1200 },
      { deviceId: 301, action: 'off', delay: 1400 },
      { deviceId: 302, action: 'off', delay: 1600 },
      { deviceId: 303, action: 'off', delay: 1800 },
      { deviceId: 304, action: 'off', delay: 2000 },
      { deviceId: 305, action: 'off', delay: 2200 },
      { deviceId: 401, action: 'off', delay: 2400 },
      { deviceId: 402, action: 'off', delay: 2600 },
      { deviceId: 403, action: 'off', delay: 2800 },
      { deviceId: 501, action: 'off', delay: 3000 },
      { deviceId: 502, action: 'off', delay: 3200 },
    ],
  },
  {
    id: 5,
    name: 'Good Evening',
    emoji: '🌆',
    description: 'Relax after a long day',
    color: '#E67E22',
    gradient: 'from-orange-700 to-amber-600',
    deviceCount: 5,
    steps: [
      { deviceId: 301, action: 'on', brightness: 80, delay: 0 },
      { deviceId: 101, action: 'on', brightness: 70, delay: 500 },
      { deviceId: 401, action: 'on', delay: 1000 },
      { deviceId: 302, action: 'on', speed: 3, delay: 1500 },
      { deviceId: 103, action: 'on', temperature: 23, mode: 'cool', delay: 2000 },
    ],
  },
];
