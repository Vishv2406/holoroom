import { create } from 'zustand';
import { INITIAL_HOME_CONFIG, RoomConfig, DeviceState } from '../data/homeConfig';
import { getDeviceEnergy } from '../data/energyData';

export interface Notification {
  id: number;
  message: string;
  type: 'warning' | 'info' | 'success' | 'danger';
  isRead: boolean;
  createdAt: string;
}

export interface AutomationRule {
  id: number;
  name: string;
  triggerDeviceId: number | null;
  triggerCondition: string;
  actionDeviceId: number | null;
  action: string;
  actionValue?: string | number;
  isEnabled: boolean;
}

interface HomeStore {
  // Data
  rooms: RoomConfig[];
  homeName: string;

  // Selected
  selectedDevice: (DeviceState & { roomId: number; roomName: string }) | null;
  selectedRoom: RoomConfig | null;

  // Scene state
  activeScene: number | null;
  isPlayingScene: boolean;
  sceneStep: number;
  sceneProgress: number; // 0–100

  // UI state
  isPanelOpen: boolean;
  panelType: 'device' | 'room' | null;
  isEnergyPanelOpen: boolean;
  isAutomationOpen: boolean;
  isNotificationsOpen: boolean;
  isSettingsOpen: boolean;
  showEnergyAura: boolean;
  isDarkMode: boolean;
  cameraTarget: string; // 'overview' | room name

  // Automation
  automationRules: AutomationRule[];

  // Notifications
  notifications: Notification[];

  // Actions
  toggleDevice: (deviceId: number) => void;
  updateDevice: (deviceId: number, updates: Partial<DeviceState>) => void;
  selectDevice: (device: DeviceState, roomId: number, roomName: string) => void;
  selectRoom: (room: RoomConfig) => void;
  closePanel: () => void;
  setCameraTarget: (target: string) => void;
  setActiveScene: (sceneId: number | null) => void;
  setIsPlayingScene: (playing: boolean) => void;
  setSceneStep: (step: number) => void;
  setSceneProgress: (progress: number) => void;
  turnOffAllInRoom: (roomId: number) => void;
  turnOnAllInRoom: (roomId: number) => void;
  toggleEnergyPanel: () => void;
  toggleAutomation: () => void;
  toggleNotifications: () => void;
  toggleSettings: () => void;
  toggleEnergyAura: () => void;
  toggleDarkMode: () => void;
  setHomeName: (name: string) => void;
  renameDevice: (deviceId: number, name: string) => void;
  resetToDefaults: () => void;
  addNotification: (message: string, type: Notification['type']) => void;
  markNotificationRead: (id: number) => void;
  markAllNotificationsRead: () => void;
  addAutomationRule: (rule: Omit<AutomationRule, 'id'>) => void;
  updateAutomationRule: (id: number, updates: Partial<AutomationRule>) => void;
  deleteAutomationRule: (id: number) => void;
  toggleAutomationRule: (id: number) => void;
  turnOffHighConsumers: () => void;

  // Computed
  getTotalPower: () => number;
  getActiveDeviceCount: () => number;
  getRoomDevices: (roomId: number) => DeviceState[];
  getUnreadCount: () => number;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    message: 'Welcome to HOLOROOM 3D! Your smart home is ready.',
    type: 'success',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    message: 'Energy tip: Ceiling fans use 80% less energy than AC. Try using fan first!',
    type: 'info',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 3,
    message: 'Living Hall light has been ON for 2 hours.',
    type: 'warning',
    isRead: false,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 4,
    message: 'Good morning! Try activating the "Good Morning" scene.',
    type: 'info',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const INITIAL_RULES: AutomationRule[] = [
  {
    id: 1,
    name: 'TV Off with Lights',
    triggerDeviceId: 301,
    triggerCondition: 'turns_off',
    actionDeviceId: 303,
    action: 'turn_off',
    isEnabled: true,
  },
  {
    id: 2,
    name: 'AC Fan Sync',
    triggerDeviceId: 103,
    triggerCondition: 'turns_on',
    actionDeviceId: 102,
    action: 'set_speed',
    actionValue: 1,
    isEnabled: false,
  },
];

export const useHomeStore = create<HomeStore>((set, get) => ({
  rooms: INITIAL_HOME_CONFIG,
  homeName: 'My Home',
  selectedDevice: null,
  selectedRoom: null,
  activeScene: null,
  isPlayingScene: false,
  sceneStep: 0,
  sceneProgress: 0,
  isPanelOpen: false,
  panelType: null,
  isEnergyPanelOpen: false,
  isAutomationOpen: false,
  isNotificationsOpen: false,
  isSettingsOpen: false,
  showEnergyAura: false,
  isDarkMode: true,
  cameraTarget: 'overview',
  automationRules: INITIAL_RULES,
  notifications: INITIAL_NOTIFICATIONS,

  toggleDevice: (deviceId) =>
    set((state) => {
      const rooms = state.rooms.map((room) => ({
        ...room,
        devices: room.devices.map((d) => {
          if (d.id !== deviceId) return d;
          const isOn = !d.isOn;
          const energyWatts = getDeviceEnergy(d.type, isOn, d.speed);
          const updated = { ...d, isOn, energyWatts, lastUsed: new Date().toISOString() };
          // Check automation rules
          const { automationRules } = state;
          automationRules
            .filter((r) => r.isEnabled && r.triggerDeviceId === deviceId)
            .forEach((rule) => {
              const condition = isOn ? 'turns_on' : 'turns_off';
              if (rule.triggerCondition === condition) {
                // Schedule automation action (deferred via timeout)
                setTimeout(() => {
                  const store = get();
                  if (rule.action === 'turn_off') store.updateDevice(rule.actionDeviceId!, { isOn: false });
                  if (rule.action === 'turn_on') store.updateDevice(rule.actionDeviceId!, { isOn: true });
                  if (rule.action === 'set_speed') store.updateDevice(rule.actionDeviceId!, { speed: rule.actionValue as number });
                }, 500);
              }
            });
          return updated;
        }),
      }));

      // Update selectedDevice if it's the toggled one
      let selectedDevice = state.selectedDevice;
      if (selectedDevice && selectedDevice.id === deviceId) {
        const room = rooms.find((r) => r.id === selectedDevice!.roomId);
        const dev = room?.devices.find((d) => d.id === deviceId);
        if (dev) selectedDevice = { ...dev, roomId: selectedDevice.roomId, roomName: selectedDevice.roomName };
      }

      return { rooms, selectedDevice };
    }),

  updateDevice: (deviceId, updates) =>
    set((state) => {
      const rooms = state.rooms.map((room) => ({
        ...room,
        devices: room.devices.map((d) => {
          if (d.id !== deviceId) return d;
          const merged = { ...d, ...updates, lastUsed: new Date().toISOString() };
          const energyWatts = getDeviceEnergy(merged.type, merged.isOn, merged.speed);
          return { ...merged, energyWatts };
        }),
      }));

      let selectedDevice = state.selectedDevice;
      if (selectedDevice && selectedDevice.id === deviceId) {
        const room = rooms.find((r) => r.id === selectedDevice!.roomId);
        const dev = room?.devices.find((d) => d.id === deviceId);
        if (dev) selectedDevice = { ...dev, roomId: selectedDevice.roomId, roomName: selectedDevice.roomName };
      }

      return { rooms, selectedDevice };
    }),

  selectDevice: (device, roomId, roomName) =>
    set({
      selectedDevice: { ...device, roomId, roomName },
      selectedRoom: null,
      isPanelOpen: true,
      panelType: 'device',
      isEnergyPanelOpen: false,
      isAutomationOpen: false,
    }),

  selectRoom: (room) =>
    set({
      selectedRoom: room,
      selectedDevice: null,
      isPanelOpen: true,
      panelType: 'room',
      cameraTarget: room.name,
      isEnergyPanelOpen: false,
      isAutomationOpen: false,
    }),

  closePanel: () =>
    set({
      isPanelOpen: false,
      selectedDevice: null,
      selectedRoom: null,
      panelType: null,
    }),

  setCameraTarget: (target) => set({ cameraTarget: target }),

  setActiveScene: (sceneId) => set({ activeScene: sceneId }),
  setIsPlayingScene: (playing) => set({ isPlayingScene: playing }),
  setSceneStep: (step) => set({ sceneStep: step }),
  setSceneProgress: (progress) => set({ sceneProgress: progress }),

  turnOffAllInRoom: (roomId) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id !== roomId
          ? room
          : {
              ...room,
              devices: room.devices.map((d) => ({
                ...d,
                isOn: false,
                energyWatts: 0,
                lastUsed: new Date().toISOString(),
              })),
            }
      ),
    })),

  turnOnAllInRoom: (roomId) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id !== roomId
          ? room
          : {
              ...room,
              devices: room.devices.map((d) => ({
                ...d,
                isOn: true,
                energyWatts: getDeviceEnergy(d.type, true, d.speed),
                lastUsed: new Date().toISOString(),
              })),
            }
      ),
    })),

  toggleEnergyPanel: () =>
    set((state) => ({
      isEnergyPanelOpen: !state.isEnergyPanelOpen,
      isAutomationOpen: false,
      isNotificationsOpen: false,
      isSettingsOpen: false,
    })),

  toggleAutomation: () =>
    set((state) => ({
      isAutomationOpen: !state.isAutomationOpen,
      isEnergyPanelOpen: false,
      isNotificationsOpen: false,
      isSettingsOpen: false,
    })),

  toggleNotifications: () =>
    set((state) => ({
      isNotificationsOpen: !state.isNotificationsOpen,
      isEnergyPanelOpen: false,
      isAutomationOpen: false,
      isSettingsOpen: false,
    })),

  toggleSettings: () =>
    set((state) => ({
      isSettingsOpen: !state.isSettingsOpen,
      isEnergyPanelOpen: false,
      isAutomationOpen: false,
      isNotificationsOpen: false,
    })),

  toggleEnergyAura: () => set((state) => ({ showEnergyAura: !state.showEnergyAura })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setHomeName: (name) => set({ homeName: name }),

  renameDevice: (deviceId, name) =>
    set((state) => ({
      rooms: state.rooms.map((room) => ({
        ...room,
        devices: room.devices.map((d) => (d.id === deviceId ? { ...d, name } : d)),
      })),
    })),

  resetToDefaults: () =>
    set({
      rooms: INITIAL_HOME_CONFIG,
      automationRules: INITIAL_RULES,
      notifications: INITIAL_NOTIFICATIONS,
      homeName: 'My Home',
    }),

  addNotification: (message, type) =>
    set((state) => ({
      notifications: [
        { id: Date.now(), message, type, isRead: false, createdAt: new Date().toISOString() },
        ...state.notifications,
      ],
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    })),

  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),

  addAutomationRule: (rule) =>
    set((state) => ({
      automationRules: [...state.automationRules, { ...rule, id: Date.now() }],
    })),

  updateAutomationRule: (id, updates) =>
    set((state) => ({
      automationRules: state.automationRules.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),

  deleteAutomationRule: (id) =>
    set((state) => ({
      automationRules: state.automationRules.filter((r) => r.id !== id),
    })),

  toggleAutomationRule: (id) =>
    set((state) => ({
      automationRules: state.automationRules.map((r) =>
        r.id === id ? { ...r, isEnabled: !r.isEnabled } : r
      ),
    })),

  turnOffHighConsumers: () =>
    set((state) => ({
      rooms: state.rooms.map((room) => ({
        ...room,
        devices: room.devices.map((d) => {
          if (d.energyWatts > 1000) {
            return { ...d, isOn: false, energyWatts: 0, lastUsed: new Date().toISOString() };
          }
          return d;
        }),
      })),
    })),

  // Computed
  getTotalPower: () => {
    const { rooms } = get();
    return rooms.reduce(
      (total, room) => total + room.devices.reduce((s, d) => s + (d.isOn ? d.energyWatts : 0), 0),
      0
    );
  },

  getActiveDeviceCount: () => {
    const { rooms } = get();
    return rooms.reduce(
      (total, room) => total + room.devices.filter((d) => d.isOn).length,
      0
    );
  },

  getRoomDevices: (roomId) => {
    const { rooms } = get();
    return rooms.find((r) => r.id === roomId)?.devices ?? [];
  },

  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.isRead).length;
  },
}));
