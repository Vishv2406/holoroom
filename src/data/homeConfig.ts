// Complete home configuration — all rooms and devices

export interface DeviceState {
  id: number;
  name: string;
  type: 'light' | 'fan' | 'ac' | 'tv' | 'geyser' | 'plug' | 'exhaust';
  isOn: boolean;
  brightness?: number;   // 0–100 for lights
  speed?: number;        // 1–5 for fans
  temperature?: number;  // 16–30 for AC
  mode?: 'cool' | 'heat' | 'fan' | 'auto';
  volume?: number;       // 0–100 for TV
  timer?: number;        // minutes for geyser
  energyWatts: number;
  position: { x: number; y: number; z: number };
  lastUsed: string;
}

export interface RoomConfig {
  id: number;
  name: string;
  position: { x: number; z: number };
  size: { width: number; depth: number };
  color: string;
  temperature: number; // simulated room temp
  devices: DeviceState[];
}

export const INITIAL_HOME_CONFIG: RoomConfig[] = [
  {
    id: 1,
    name: 'Master Bedroom',
    position: { x: -7, z: -4 },
    size: { width: 8, depth: 7 },
    color: '#2D3561',
    temperature: 28,
    devices: [
      {
        id: 101,
        name: 'Ceiling Light',
        type: 'light',
        isOn: false,
        brightness: 100,
        energyWatts: 10,
        position: { x: 0, y: 2.7, z: 0 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 102,
        name: 'Ceiling Fan',
        type: 'fan',
        isOn: false,
        speed: 3,
        energyWatts: 55,
        position: { x: 0, y: 2.6, z: 0 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 103,
        name: 'Air Conditioner',
        type: 'ac',
        isOn: false,
        temperature: 24,
        mode: 'cool',
        energyWatts: 1500,
        position: { x: -3.5, y: 2.0, z: 0 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 104,
        name: 'Smart Plug',
        type: 'plug',
        isOn: false,
        energyWatts: 0,
        position: { x: 2, y: 0.4, z: -3 },
        lastUsed: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    name: 'Bedroom 2',
    position: { x: 5, z: -4 },
    size: { width: 7, depth: 7 },
    color: '#1B4332',
    temperature: 29,
    devices: [
      {
        id: 201,
        name: 'Ceiling Light',
        type: 'light',
        isOn: false,
        brightness: 100,
        energyWatts: 10,
        position: { x: 0, y: 2.7, z: 0 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 202,
        name: 'Ceiling Fan',
        type: 'fan',
        isOn: false,
        speed: 3,
        energyWatts: 55,
        position: { x: 0, y: 2.6, z: 0 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 203,
        name: 'Smart Plug',
        type: 'plug',
        isOn: false,
        energyWatts: 0,
        position: { x: 2, y: 0.4, z: -3 },
        lastUsed: new Date().toISOString(),
      },
    ],
  },
  {
    id: 3,
    name: 'Living Hall',
    position: { x: -3, z: 4 },
    size: { width: 12, depth: 6 },
    color: '#1A1A2E',
    temperature: 30,
    devices: [
      {
        id: 301,
        name: 'Ceiling Light',
        type: 'light',
        isOn: true,
        brightness: 80,
        energyWatts: 10,
        position: { x: 0, y: 2.7, z: 0 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 302,
        name: 'Ceiling Fan',
        type: 'fan',
        isOn: true,
        speed: 3,
        energyWatts: 55,
        position: { x: 0, y: 2.6, z: 0 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 303,
        name: 'Television',
        type: 'tv',
        isOn: false,
        volume: 30,
        energyWatts: 120,
        position: { x: 0, y: 1.2, z: -2.8 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 304,
        name: 'Smart Plug 1',
        type: 'plug',
        isOn: false,
        energyWatts: 0,
        position: { x: -4, y: 0.4, z: -2.8 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 305,
        name: 'Smart Plug 2',
        type: 'plug',
        isOn: false,
        energyWatts: 0,
        position: { x: 4, y: 0.4, z: -2.8 },
        lastUsed: new Date().toISOString(),
      },
    ],
  },
  {
    id: 4,
    name: 'Kitchen',
    position: { x: 7, z: 4 },
    size: { width: 6, depth: 6 },
    color: '#3D1A00',
    temperature: 32,
    devices: [
      {
        id: 401,
        name: 'Ceiling Light',
        type: 'light',
        isOn: false,
        brightness: 100,
        energyWatts: 10,
        position: { x: 0, y: 2.7, z: 0 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 402,
        name: 'Exhaust Fan',
        type: 'exhaust',
        isOn: false,
        speed: 1,
        energyWatts: 30,
        position: { x: 2.5, y: 2.5, z: 0 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 403,
        name: 'Smart Plug',
        type: 'plug',
        isOn: false,
        energyWatts: 0,
        position: { x: 0, y: 0.4, z: -2.5 },
        lastUsed: new Date().toISOString(),
      },
    ],
  },
  {
    id: 5,
    name: 'Bathroom',
    position: { x: -9, z: 4 },
    size: { width: 4, depth: 6 },
    color: '#0D3B4A',
    temperature: 26,
    devices: [
      {
        id: 501,
        name: 'Ceiling Light',
        type: 'light',
        isOn: false,
        brightness: 100,
        energyWatts: 10,
        position: { x: 0, y: 2.7, z: 0 },
        lastUsed: new Date().toISOString(),
      },
      {
        id: 502,
        name: 'Geyser',
        type: 'geyser',
        isOn: false,
        timer: 30,
        energyWatts: 2000,
        position: { x: -1.5, y: 2.0, z: 0 },
        lastUsed: new Date().toISOString(),
      },
    ],
  },
];
