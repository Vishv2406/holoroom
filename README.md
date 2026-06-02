# 🏠 HOLOROOM 3D - Interactive Smart Home Digital Twin

**Your Smart Home. In 3D. In Your Browser.**

A cutting-edge browser-based 3D smart home control panel where you can visualize your entire home in 3D, interact with devices spatially, and manage automation scenes in real-time.

Built for **TouchBeat Automation** (touchbeat.in) - Premium smart home solutions.

---

## ✨ Features

### 🎮 Interactive 3D Visualization
- **Full 3D apartment model** with 5 rooms (2BHK Indian layout)
- **Orbit controls** - Rotate, zoom, and pan around your home
- **Smooth camera transitions** when focusing on rooms
- **Real-time device animations** - Rotating fans, glowing lights, pulsing energy auras

### 🎛️ Device Control
- **Click any device in 3D** to open its control panel
- **Comprehensive controls** for all device types:
  - **Lights** - ON/OFF, brightness slider (0-100%)
  - **Fans** - Speed control (1-5), rotation animation
  - **Air Conditioners** - Temperature (16-30°C), modes (Cool/Heat/Fan/Auto)
  - **TV** - Power, volume control
  - **Geyser** - Timer settings (15/30/45/60 min)
  - **Smart Plugs** - Simple ON/OFF
- **Energy monitoring** for each device
- **Last used** timestamps

### 🏠 Room Management
- **Room-level controls** - Turn all devices in a room ON/OFF
- **Live stats** - Active device count, power usage, temperature
- **Quick access** from sidebar
- **Smooth camera focus** on selected room

### ✨ Automation Scenes
5 pre-built scenes with sequential animations:

1. **🌅 Good Morning** - Gentle wake-up routine
2. **🎬 Movie Night** - Perfect cinema ambiance
3. **😴 Sleep Mode** - Peaceful night setup
4. **🔒 Away Mode** - Secure your home
5. **🌆 Good Evening** - Relaxing evening atmosphere

- **Preview mode** - Watch animation without activating
- **Activate mode** - Run the scene and save device states
- **Real-time progress** indicator

### ⚡ Energy Monitoring
- **Total home consumption** (live Watts)
- **Per-device energy usage** with color-coded rings
- **Per-room breakdown**
- **Monthly cost estimates** in ₹ (Indian rupees)
- **Turn off high consumers** button (>1000W)
- **Visual energy auras** in 3D (Green/Yellow/Red)

### 🤖 Automation Rules Builder
- **Visual if-then rule creator**
- **Device-triggered automations**
- **Enable/disable rules** on the fly
- Example: "IF Living Light turns OFF → THEN TV turns OFF"

### 🔔 Notifications
- **Real-time alerts** for device events
- **Energy tips** and recommendations
- **Unread badge** counter
- **Mark as read** functionality

### ⚙️ Settings
- **Rename devices**
- **Edit home name**
- **Dark mode** toggle (default: enabled)
- **Reset to defaults**

---

## 🎨 Design

### Color Palette
- **Primary (TouchBeat Cyan)**: #00BCD4
- **Secondary (Dark Navy)**: #1A1A2E
- **Accent (Red)**: #E94560
- **Success (Green)**: #00FF88
- **Warning (Yellow)**: #FFD700
- **Danger (Red)**: #FF4500

### UI Layout
- **Top Bar** - Logo, stats, quick scenes, notifications
- **Left Sidebar** - Rooms and scenes browser
- **Main Canvas** - Full 3D interactive scene
- **Right Panel** - Device/room control panel (slides in)
- **Overlays** - Energy panel, automation builder, notifications, settings

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to project directory
cd holoroom-3d-digital-twin

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 🎮 User Guide

### Navigation
- **Mouse Drag** - Rotate 3D view
- **Scroll Wheel** - Zoom in/out
- **Right Click + Drag** - Pan camera
- **ESC key** - Close open panels
- **Click any device** - Open device control
- **Click room floor/label** - Focus on room

### Quick Actions
- **Top bar scene buttons** - Instant scene activation
- **Sidebar room cards** - Jump to any room
- **Energy Monitor button** - Open energy panel
- **Automation Rules button** - Open rule builder

### Scene Workflow
1. Browse scenes in left sidebar "Scenes" tab
2. Click **Preview** to see animation (no changes saved)
3. Click **Activate** to run scene and save states
4. Watch the sequential device activation with progress bar

### Creating Automation Rules
1. Click "Automation Rules" in left sidebar
2. Select **trigger device** and condition
3. Select **action device** and action
4. Click "Add Rule"
5. Enable/disable rules anytime

---

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Three.js** - 3D rendering engine
- **@react-three/fiber** - React wrapper for Three.js
- **@react-three/drei** - Helper components for R3F
- **Zustand** - State management
- **Framer Motion** - UI animations
- **TailwindCSS** - Styling
- **Lucide React** - Icons

### 3D Architecture
- **Procedurally generated apartment** (no external 3D files)
- **Real-time animations** - Fan rotation, light glow, energy auras
- **Smooth camera interpolation** using lerp
- **Optimized shadows and lighting**

---

## 📁 Project Structure

```
holoroom-3d-digital-twin/
├── src/
│   ├── components/
│   │   ├── 3d/              # 3D components
│   │   │   ├── SceneCanvas.tsx
│   │   │   ├── ApartmentModel.tsx
│   │   │   ├── Room3D.tsx
│   │   │   ├── Light3D.tsx
│   │   │   ├── Fan3D.tsx
│   │   │   ├── AC3D.tsx
│   │   │   ├── TV3D.tsx
│   │   │   ├── Geyser3D.tsx
│   │   │   ├── SmartPlug3D.tsx
│   │   │   ├── EnergyAura.tsx
│   │   │   └── RoomLabel.tsx
│   │   └── ui/              # UI components
│   │       ├── TopBar.tsx
│   │       ├── LeftSidebar.tsx
│   │       ├── RightPanel.tsx
│   │       ├── DeviceControlPanel.tsx
│   │       ├── RoomControlPanel.tsx
│   │       ├── EnergyPanel.tsx
│   │       ├── AutomationBuilder.tsx
│   │       ├── NotificationsPanel.tsx
│   │       └── SettingsPage.tsx
│   ├── store/
│   │   └── useHomeStore.ts  # Zustand state management
│   ├── data/
│   │   ├── homeConfig.ts    # Initial home setup
│   │   ├── scenes.ts        # Scene definitions
│   │   └── energyData.ts    # Energy consumption data
│   ├── hooks/
│   │   └── useScenePlayer.ts
│   ├── utils/
│   │   ├── cameraUtils.ts
│   │   └── cn.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 🎯 Future Enhancements

- [ ] **Backend API** integration for persistent data
- [ ] **Real IoT device** connectivity via MQTT/WebSocket
- [ ] **Voice control** via Web Speech API
- [ ] **Multi-home** support
- [ ] **Custom floor plans** upload
- [ ] **Mobile app** version (React Native)
- [ ] **VR/AR mode** for immersive control
- [ ] **Energy analytics** dashboard with charts
- [ ] **Weather-based** automation
- [ ] **User accounts** and permissions

---

## 📝 License

Copyright © 2024 TouchBeat Automation. All rights reserved.

---

## 🤝 Credits

**Built with ❤️ by TouchBeat Automation**

- Website: [touchbeat.in](https://touchbeat.in)
- 3D Engine: Three.js
- Framework: React + Vite
- Design: TouchBeat Design Team

---

## 📞 Support

For issues or questions:
- Email: support@touchbeat.in
- Website: touchbeat.in

---

**Enjoy controlling your smart home in 3D! 🏠✨**
