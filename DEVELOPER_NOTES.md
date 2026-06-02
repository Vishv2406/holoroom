# 👨‍💻 Developer Notes - HOLOROOM 3D

Technical notes for developers who want to understand, modify, or extend this project.

---

## 🏗️ Architecture Overview

### Core Concepts

1. **Single Page Application (SPA)**
   - React 18 with functional components
   - No routing (single view)
   - State managed by Zustand

2. **3D Scene Graph**
   - Three.js rendering via React Three Fiber
   - Procedurally generated geometry
   - No external 3D model files

3. **State Management**
   - Centralized Zustand store
   - Computed values for derived state
   - Actions for state mutations

4. **Animation System**
   - Framer Motion for UI animations
   - Three.js useFrame for 3D animations
   - CSS transitions for micro-interactions

---

## 📦 Key Dependencies

### Production Dependencies:
```json
{
  "react": "^18.x",                    // UI framework
  "react-dom": "^18.x",                // DOM renderer
  "three": "^0.160.x",                 // 3D engine
  "@react-three/fiber": "^8.15.x",    // React wrapper for Three.js
  "@react-three/drei": "^9.92.x",     // R3F helpers
  "zustand": "^4.4.x",                 // State management
  "framer-motion": "^10.16.x",        // Animation library
  "lucide-react": "^0.294.x"          // Icon library
}
```

### Dev Dependencies:
```json
{
  "vite": "^5.x",                      // Build tool
  "typescript": "^5.x",                // Type safety
  "tailwindcss": "^3.x",              // Utility CSS
  "@types/react": "^18.x",            // React types
  "@types/three": "^0.160.x"          // Three.js types
}
```

---

## 🗂️ State Management (Zustand)

### Store Location:
`src/store/useHomeStore.ts`

### Store Structure:
```typescript
interface HomeStore {
  // Data
  rooms: RoomConfig[]                  // All rooms and devices
  homeName: string                     // Home identifier
  
  // Selected State
  selectedDevice: DeviceState | null   // Currently selected device
  selectedRoom: RoomConfig | null      // Currently selected room
  
  // Scene State
  activeScene: number | null           // Running scene ID
  isPlayingScene: boolean              // Is scene animating?
  sceneStep: number                    // Current step number
  sceneProgress: number                // Progress 0-100
  
  // UI State
  isPanelOpen: boolean                 // Right panel visible?
  panelType: 'device' | 'room' | null  // Panel content type
  isEnergyPanelOpen: boolean           // Energy panel visible?
  isAutomationOpen: boolean            // Automation panel visible?
  isNotificationsOpen: boolean         // Notifications visible?
  isSettingsOpen: boolean              // Settings visible?
  showEnergyAura: boolean              // Energy rings visible?
  isDarkMode: boolean                  // Dark mode enabled?
  cameraTarget: string                 // Camera focus target
  
  // Automation
  automationRules: AutomationRule[]    // All automation rules
  
  // Notifications
  notifications: Notification[]        // All notifications
  
  // Actions (30+ functions)
  // ... see useHomeStore.ts for full list
  
  // Computed Values
  getTotalPower: () => number
  getActiveDeviceCount: () => number
  getRoomDevices: (roomId: number) => DeviceState[]
  getUnreadCount: () => number
}
```

### Key Patterns:

**Immutable Updates:**
```typescript
toggleDevice: (deviceId) =>
  set((state) => ({
    rooms: state.rooms.map((room) => ({
      ...room,
      devices: room.devices.map((d) =>
        d.id === deviceId ? { ...d, isOn: !d.isOn } : d
      ),
    })),
  }))
```

**Computed Values:**
```typescript
getTotalPower: () => {
  const { rooms } = get();
  return rooms.reduce(
    (total, room) => total + room.devices.reduce(
      (s, d) => s + (d.isOn ? d.energyWatts : 0), 0
    ), 0
  );
}
```

---

## 🎨 3D Scene Architecture

### Component Hierarchy:
```
SceneCanvas
├── Canvas (R3F)
│   ├── Lights
│   │   ├── ambientLight
│   │   ├── directionalLight
│   │   └── hemisphereLight
│   ├── Controls
│   │   └── OrbitControls
│   ├── Ground
│   ├── Grid
│   ├── Stars (background)
│   └── ApartmentModel
│       └── Rooms (5x)
│           ├── Room3D
│           │   ├── Floor mesh
│           │   ├── Ceiling mesh
│           │   ├── Walls (4x)
│           │   ├── RoomLabel
│           │   └── Devices
│           │       ├── Light3D
│           │       ├── Fan3D
│           │       ├── AC3D
│           │       ├── TV3D
│           │       ├── Geyser3D
│           │       ├── SmartPlug3D
│           │       └── EnergyAura
```

### Camera System:
```typescript
// Camera positions defined in utils/cameraUtils.ts
export const CAMERA_POSITIONS = {
  overview: { position: [0, 18, 20], target: [0, 0, 0] },
  masterBedroom: { position: [-7, 8, 5], target: [-7, 0, -4] },
  // ... etc
};

// Smooth camera transition using lerp
useFrame(() => {
  camera.position.lerp(targetPos.current, 0.06);
  controls.target.lerp(targetLookAt.current, 0.06);
});
```

### Device Animation Pattern:
```typescript
// Fan rotation example
useFrame((_, delta) => {
  if (isOn) {
    meshRef.current.rotation.y += delta * speed * 0.8;
  }
});

// Light pulse example
useFrame((_, delta) => {
  t.current += delta * 2;
  if (isOn) {
    glowRef.current.scale.setScalar(
      1 + Math.sin(t.current) * 0.05
    );
  }
});
```

---

## 🎯 Adding New Features

### Adding a New Device Type:

**1. Update TypeScript Types:**
```typescript
// src/data/homeConfig.ts
export interface DeviceState {
  // ... existing fields
  newProperty?: number;  // Add new property
}
```

**2. Create 3D Component:**
```typescript
// src/components/3d/NewDevice3D.tsx
export function NewDevice3D({ isOn, position, onClick }) {
  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={isOn ? '#00FF00' : '#333333'} 
      />
    </mesh>
  );
}
```

**3. Add to Room3D:**
```typescript
// src/components/3d/Room3D.tsx
if (device.type === 'newdevice') {
  deviceMesh = (
    <NewDevice3D
      isOn={device.isOn}
      position={worldPos}
      onClick={handleClick}
    />
  );
}
```

**4. Create Control Panel:**
```typescript
// src/components/ui/DeviceControlPanel.tsx
{device.type === 'newdevice' && (
  <div>
    {/* Custom controls */}
  </div>
)}
```

**5. Add Energy Data:**
```typescript
// src/data/energyData.ts
export const DEVICE_ENERGY = {
  // ... existing
  newdevice: 100,  // Watts
};
```

### Adding a New Room:

**1. Update Initial Config:**
```typescript
// src/data/homeConfig.ts
export const INITIAL_HOME_CONFIG: RoomConfig[] = [
  // ... existing rooms
  {
    id: 6,
    name: 'New Room',
    position: { x: 10, z: 10 },
    size: { width: 6, depth: 6 },
    color: '#2D3561',
    temperature: 28,
    devices: [
      // Add devices
    ],
  },
];
```

**2. Add Camera Position:**
```typescript
// src/utils/cameraUtils.ts
export const CAMERA_POSITIONS = {
  // ... existing
  'New Room': {
    position: [10, 8, 16],
    target: [10, 0, 10],
  },
};
```

**3. Add Room Color:**
```typescript
// src/components/ui/LeftSidebar.tsx
const roomColors: Record<string, string> = {
  // ... existing
  'New Room': '#7B68EE',
};
```

### Adding a New Scene:

**1. Define Scene:**
```typescript
// src/data/scenes.ts
export const SCENES = [
  // ... existing
  {
    id: 6,
    name: 'New Scene',
    emoji: '🎉',
    description: 'Your custom scene',
    color: '#FF00FF',
    deviceCount: 5,
    steps: [
      { deviceId: 1, action: 'on', delay: 0 },
      { deviceId: 2, action: 'on', delay: 1000 },
      // ... more steps
    ],
  },
];
```

**2. Scene will automatically appear in:**
- Left sidebar scenes tab
- Top bar quick scene buttons (first 5 only)

### Adding a New Automation Trigger:

**1. Add Condition Type:**
```typescript
// src/components/ui/AutomationBuilder.tsx
const TRIGGER_CONDITIONS = [
  { value: 'turns_on', label: 'Turns ON' },
  { value: 'turns_off', label: 'Turns OFF' },
  { value: 'above_temp', label: 'Temperature Above' },  // NEW
];
```

**2. Handle in Store:**
```typescript
// src/store/useHomeStore.ts
toggleDevice: (deviceId) => {
  // ... existing logic
  
  // Check new trigger
  automationRules
    .filter((r) => r.triggerCondition === 'above_temp')
    .forEach((rule) => {
      if (temperature > rule.triggerValue) {
        // Execute action
      }
    });
}
```

---

## 🎨 Styling System

### TailwindCSS Usage:
- Utility classes for layout
- Responsive breakpoints (sm, md, lg, xl)
- Custom colors in inline styles

### Inline Styles Pattern:
```typescript
// Use inline styles for dynamic colors (TouchBeat branding)
style={{
  background: '#1A1A35',
  border: '1px solid #2A2A4A',
  color: isActive ? '#00BCD4' : '#AAAACC',
}}
```

### Animation Patterns:
```typescript
// Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
```

---

## 🔧 Development Workflow

### Running Development Server:
```bash
npm run dev
# Opens at http://localhost:5173
# Hot Module Replacement (HMR) enabled
```

### Building for Production:
```bash
npm run build
# Outputs to dist/
# Optimized and minified
```

### Preview Production Build:
```bash
npm run preview
# Test production build locally
```

### Type Checking:
```bash
npx tsc --noEmit
# Check TypeScript errors
```

---

## 🐛 Debugging Tips

### React DevTools:
- Install React DevTools extension
- Inspect component tree
- View props and state

### Three.js Debugging:
```typescript
// Add helpers in SceneCanvas.tsx
<axesHelper args={[5]} />  // Show X,Y,Z axes
<gridHelper args={[50, 50]} />  // Show grid

// Log camera position
useFrame(({ camera }) => {
  console.log(camera.position);
});
```

### Zustand DevTools:
```typescript
// Add devtools in useHomeStore.ts
import { devtools } from 'zustand/middleware';

export const useHomeStore = create(
  devtools((set, get) => ({
    // ... store
  }), { name: 'HomeStore' })
);
```

### Performance Profiling:
```bash
# React Profiler in DevTools
# Three.js stats
npm install three/examples/jsm/libs/stats.module
```

---

## ⚡ Performance Optimization

### Current Optimizations:
1. **Memoization** - useCallback, useMemo where needed
2. **Lazy Loading** - Code splitting with dynamic imports
3. **Three.js** - Efficient geometry, texture reuse
4. **Animations** - RequestAnimationFrame, no setInterval
5. **Re-renders** - Zustand shallow comparison

### Future Optimizations:
- [ ] Implement React.lazy for panels
- [ ] Add service worker for PWA
- [ ] Optimize texture compression
- [ ] Implement LOD (Level of Detail) for 3D
- [ ] Add virtual scrolling for long lists

---

## 🧪 Testing (Future)

### Recommended Test Setup:
```bash
npm install -D vitest @testing-library/react @testing-library/user-event
```

### Test Examples:
```typescript
// Unit test
test('toggleDevice turns device on/off', () => {
  const { result } = renderHook(() => useHomeStore());
  act(() => result.current.toggleDevice(1));
  expect(result.current.rooms[0].devices[0].isOn).toBe(true);
});

// Component test
test('DeviceControlPanel shows correct device', () => {
  render(<DeviceControlPanel device={mockDevice} />);
  expect(screen.getByText('Ceiling Light')).toBeInTheDocument();
});
```

---

## 📝 Code Style Guidelines

### TypeScript:
- Explicit return types for functions
- Interface over type alias
- Prefer const over let
- No any types (use unknown if needed)

### React:
- Functional components only
- Hooks at top level
- Destructure props
- One component per file

### Naming Conventions:
- **Components**: PascalCase (DeviceControlPanel)
- **Hooks**: camelCase with 'use' prefix (useScenePlayer)
- **Functions**: camelCase (toggleDevice)
- **Constants**: UPPER_SNAKE_CASE (DEVICE_ENERGY)
- **Types**: PascalCase (DeviceState)

### File Organization:
```
components/
  3d/          # Three.js components
  ui/          # UI components
store/         # Zustand stores
hooks/         # Custom hooks
utils/         # Utility functions
data/          # Static data and configs
```

---

## 🚀 Deployment

### Vercel (Recommended):
```bash
npm install -g vercel
vercel
```

### Netlify:
```bash
npm run build
# Upload dist/ folder
# Or connect Git repo
```

### Custom Server:
```bash
npm run build
# Serve dist/ with nginx/apache
# Configure SPA routing (fallback to index.html)
```

---

## 🔐 Environment Variables

### Future Backend Integration:
```env
# .env.local
VITE_API_URL=http://localhost:5000/api
VITE_WS_URL=ws://localhost:5000
VITE_MQTT_BROKER=mqtt://localhost:1883
```

### Usage:
```typescript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## 📚 Useful Resources

### Documentation:
- [React Docs](https://react.dev)
- [Three.js Docs](https://threejs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [Framer Motion](https://www.framer.com/motion)
- [TailwindCSS](https://tailwindcss.com/docs)

### Community:
- [React Three Fiber Discord](https://discord.gg/ZZjjNvJ)
- [Three.js Discourse](https://discourse.threejs.org)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/three.js)

---

## 🤝 Contributing Guidelines

### Before Contributing:
1. Read this document
2. Check existing code style
3. Test your changes
4. Update documentation
5. Follow TypeScript best practices

### Pull Request Process:
1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit PR with description

### Code Review Checklist:
- [ ] TypeScript errors resolved
- [ ] No console warnings
- [ ] Code formatted
- [ ] Comments added
- [ ] Types defined
- [ ] Performance acceptable
- [ ] Mobile tested
- [ ] Documentation updated

---

## 💡 Common Patterns

### State Update Pattern:
```typescript
// Always return new object
set((state) => ({
  ...state,
  property: newValue,
}))
```

### Event Handler Pattern:
```typescript
// Prevent propagation in 3D
onClick={(e) => {
  e.stopPropagation();
  handleClick();
}}
```

### Animation Pattern:
```typescript
// Use useFrame for 3D animations
useFrame((state, delta) => {
  meshRef.current.rotation.y += delta;
});

// Use Framer Motion for UI
<motion.div animate={{ opacity: 1 }} />
```

---

## 🎓 Learning Path

### For Beginners:
1. Learn React basics
2. Understand TypeScript
3. Explore Zustand store
4. Study component structure
5. Modify existing components

### For Intermediate:
1. Add new device types
2. Create custom scenes
3. Extend automation rules
4. Optimize performance
5. Add new features

### For Advanced:
1. Backend integration
2. WebSocket real-time updates
3. MQTT IoT connectivity
4. Custom 3D models
5. AR/VR implementation

---

## 📞 Developer Support

**Questions? Issues?**
- Check existing documentation first
- Search codebase for examples
- Review TypeScript types
- Test in isolation
- Ask in community forums

**TouchBeat Developer Support:**
- Email: dev@touchbeat.in
- Website: touchbeat.in/developers

---

**Happy Coding! 🚀**

*Last Updated: December 20, 2024*
*Version: 1.0.1*
