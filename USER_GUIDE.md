# 🎮 HOLOROOM 3D - Complete User Guide

Welcome to HOLOROOM 3D! This guide will help you master every feature of your 3D smart home control panel.

---

## 📱 Interface Overview

### Top Bar (Always Visible)
- **TouchBeat Logo** (Left) - Click to return to overview
- **Home Name** - Your home identifier
- **Active Devices** - Green badge showing devices currently ON
- **Power Usage** - Real-time total Watts (turns red above 2000W)
- **Quick Scene Buttons** - 5 emoji buttons for instant scene activation
- **Weather Widget** - Current location and temperature
- **Time & Date** - Live clock
- **Notifications Bell** - Red badge shows unread count
- **Settings Gear** - Opens settings panel

### Left Sidebar
**Two tabs:**
1. **🏠 Rooms Tab**
   - Overview button - Shows all rooms at once
   - Individual room cards showing:
     - Active/total device count
     - Progress bar (how many devices are ON)
     - Room temperature
     - Current power usage
   - Click any room to focus camera and open room control

2. **✨ Scenes Tab**
   - 5 pre-built automation scenes
   - Each scene shows:
     - Name and emoji
     - Description
     - Device count and step count
     - Preview button (watch without activating)
     - Activate button (run and save changes)
   - Active scene progress bar when running

**Bottom Section:**
- **Energy Monitor** button - Opens energy analysis panel
- **Automation Rules** button - Opens rule builder

### Main Canvas (Center)
- **3D View** of your entire home
- **Interactive devices** - Click to control
- **Clickable rooms** - Click floor or label to focus
- **Floating room labels** - Hover to see details

### Right Panel (Slides In)
Opens when you click a device or room:
- **Device Panel** - Full controls for selected device
- **Room Panel** - Manage all devices in a room

### Bottom Right Corner
**Quick Camera Controls:**
- Overview button
- Individual room shortcut buttons
- Shows active device count per room

---

## 🎮 Navigation & Controls

### Mouse Controls
| Action | Result |
|--------|--------|
| **Left Click + Drag** | Rotate 3D view around home |
| **Right Click + Drag** | Pan camera (move view left/right/up/down) |
| **Scroll Wheel Up** | Zoom in (get closer) |
| **Scroll Wheel Down** | Zoom out (see more) |
| **Click Device** | Open device control panel |
| **Click Room Floor** | Focus camera on room + open room panel |
| **Click Room Label** | Focus camera on room + open room panel |

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| **ESC** | Close any open panel |
| **Scroll** | Zoom in/out in 3D view |

### Touch Controls (Mobile/Tablet)
- **One finger drag** - Rotate view
- **Two finger pinch** - Zoom in/out
- **Two finger drag** - Pan camera
- **Tap device** - Open controls
- **Tap room** - Focus and open room panel

---

## 🎛️ Device Controls

### All Devices Have:
- **Power Toggle** - Large animated switch (cyan = ON, gray = OFF)
- **Energy Display** - Current Watts consumption
- **Monthly Cost Estimate** - In ₹ (Indian Rupees)
- **Last Used** - Timestamp (e.g., "5m ago", "2h ago")

### Device-Specific Controls:

#### 💡 Lights
- **Brightness Slider** (0-100%)
  - 0% = Completely dim
  - 100% = Maximum brightness
- In 3D: Brighter = larger glow, more light emission

#### 🌀 Fans & Exhaust Fans
- **Speed Selector** (1-5)
  - 1 = Breeze (slowest rotation)
  - 2 = Gentle
  - 3 = Normal
  - 4 = Fast
  - 5 = Turbo (fastest rotation)
- In 3D: Higher speed = faster blade rotation
- Energy scales with speed (Speed 5 uses 3x more power than Speed 1)

#### ❄️ Air Conditioners
- **Temperature Slider** (16°C to 30°C)
  - 16°C = Maximum cooling
  - 30°C = Minimum cooling
- **Mode Selector**
  - ❄️ Cool - Cooling mode (most common)
  - 🔥 Heat - Heating mode
  - 🌀 Fan - Fan only (no cooling)
  - 🤖 Auto - Automatic temperature control
- In 3D: Blue glow when ON
- Highest energy consumer (~1500W)

#### 📺 Television
- **Volume Slider** (0-100%)
  - 0% = Muted
  - 100% = Maximum volume
- In 3D: Screen glows blue when ON

#### 🔥 Geyser (Water Heater)
- **Timer Selector**
  - 15 min - Quick heat
  - 30 min - Standard
  - 45 min - Extended
  - 60 min - Full hour
- In 3D: Orange-red glow when heating
- High energy consumer (~2000W)

#### 🔌 Smart Plugs
- Simple ON/OFF only
- Controls whatever is plugged in
- In 3D: Green glow when active

---

## 🏠 Room Management

### Accessing Room Controls
1. Click room in left sidebar **OR**
2. Click room floor in 3D **OR**
3. Click room label in 3D **OR**
4. Use quick controls (bottom right)

### Room Panel Features

**Room Header:**
- Active device count
- Total power usage (Watts)
- Room temperature sensor

**Quick Actions:**
- **All On** button - Turn ON all devices in room instantly
- **All Off** button - Turn OFF all devices in room instantly

**Device List:**
- All devices in the room
- Quick toggle switches for each
- Live power consumption display
- Visual indicator dot for ON devices (green pulse)

**Energy Summary:**
- Current room usage (Watts)
- Estimated monthly cost for this room

---

## ✨ Automation Scenes

### What Are Scenes?
Pre-programmed sequences that control multiple devices automatically with smooth animations.

### Available Scenes:

#### 🌅 Good Morning
**Perfect for:** Starting your day
**Duration:** ~5 seconds
**Sequence:**
1. Master Bedroom light ON (80% brightness)
2. Master Bedroom fan ON (Speed 2)
3. Kitchen light ON
4. Geyser ON (30 min timer)
5. Living Hall light ON (60% brightness)

#### 🎬 Movie Night
**Perfect for:** Cinema experience at home
**Duration:** ~3 seconds
**Sequence:**
1. Living Hall light OFF
2. Master Bedroom light DIM (20%)
3. Bedroom 2 light OFF
4. TV ON
5. AC ON (24°C, Cool)
6. All fans ON (Speed 2)

#### 😴 Sleep Mode
**Perfect for:** Peaceful night
**Duration:** ~4 seconds
**Sequence:**
1. All lights OFF (one by one)
2. All fans OFF
3. AC ON (26°C for comfort)
4. TV OFF
5. All smart plugs OFF

#### 🔒 Away Mode
**Perfect for:** Leaving home
**Duration:** ~2 seconds
**Sequence:**
1. ALL devices turn OFF
2. Confirmation notification: "Home secured"

#### 🌆 Good Evening
**Perfect for:** Returning home
**Duration:** ~3 seconds
**Sequence:**
1. Living Hall light ON (80%)
2. Master Bedroom light ON (70%)
3. Kitchen light ON
4. All fans ON (Speed 3)
5. AC ON (23°C)

### How to Use Scenes:

**Method 1: From Sidebar**
1. Switch to "Scenes" tab in left sidebar
2. Find your desired scene
3. Click **Preview** to watch animation (no changes saved)
4. Click **Activate** to run scene and apply changes

**Method 2: Quick Scene Buttons (Top Bar)**
1. Click any of the 5 emoji buttons in top bar
2. Scene immediately activates (no preview option)

**During Scene Playback:**
- Progress bar shows completion percentage
- Current step number displayed
- Cancel button (X) to stop scene mid-playback
- Devices activate one by one with 0.5-1 second delays
- Visual highlights on each device as it activates

---

## ⚡ Energy Monitoring

### Opening Energy Panel
- Click "Energy Monitor" button in left sidebar (bottom)

### Energy Panel Features:

**Total Consumption**
- Live Watts for entire home
- Changes color:
  - Green: 0-1000W (Low)
  - Yellow: 1000-2000W (Medium)
  - Red: 2000W+ (High)

**Device Energy Rings (in 3D)**
- Colored rings around devices showing usage:
  - 🟢 Green ring: 0-100W (Low - lights, plugs)
  - 🟡 Yellow ring: 100-500W (Medium - fans, TV)
  - 🔴 Red ring: 500W+ (High - AC, geyser)
- Only visible when Energy Panel is open
- Pulsing animation

**Energy Charts**
- Per-device bar chart
- Per-room donut chart
- Interactive hover for details

**Cost Estimates**
- Daily usage (kWh)
- Monthly cost in ₹ (at ₹8/kWh Indian rate)

**High Consumer Alert**
- "Turn Off High Consumers" button
- Automatically turns OFF all devices using >1000W
- Useful for emergency energy saving

### Energy Saving Tips:
1. Fans use 80% less energy than AC
2. LED lights (10W) vs traditional bulbs (60W+)
3. Turn off geysers after use (2000W!)
4. Use Away Mode when leaving home

---

## 🤖 Automation Rules

### Opening Automation Builder
- Click "Automation Rules" button in left sidebar (bottom)

### How to Create Rules:

**Step 1: Choose Trigger**
- **Device Dropdown** - Select which device triggers the rule
- **Condition Dropdown** - When does it trigger?
  - "turns ON"
  - "turns OFF"
  - Time-based (future feature)

**Step 2: Choose Action**
- **Device Dropdown** - Select which device performs action
- **Action Dropdown** - What should it do?
  - "Turn ON"
  - "Turn OFF"
  - "Set Speed" (for fans)
  - "Set Temperature" (for AC)
  - "Activate Scene"

**Step 3: Add Rule**
- Click "Add Rule" button
- Rule appears in list below
- Automatically enabled

### Managing Rules:

**Rule List Shows:**
- Rule name (auto-generated or custom)
- Trigger → Action description
- Enable/Disable toggle
- Delete button (trash icon)
- Edit button (future feature)

**Example Rules:**
- "Living Light turns OFF → TV turns OFF"
- "AC turns ON → Bedroom Fan speed 1"
- "Bedroom 2 Light turns ON → Master Bedroom Light 50%"

**Rules run automatically** when conditions are met!

---

## 🔔 Notifications

### Opening Notifications
- Click bell icon in top bar
- Red badge shows unread count

### Notification Types:

**Success** 🟢
- Scene activated
- Rule created
- Settings saved

**Info** 🔵
- Energy tips
- System messages
- Welcome messages

**Warning** 🟡
- Device ON for long time
- High energy usage
- Unusual activity

**Danger** 🔴
- Critical alerts
- System errors
- Security alerts

### Managing Notifications:
- Click individual notification to mark as read
- "Mark All Read" button at top
- Notifications history persists
- New notifications appear at top

---

## ⚙️ Settings

### Opening Settings
- Click gear icon in top bar

### Settings Options:

**Home Configuration**
- **Home Name** - Change display name (text input)
- Save button to apply

**Device Management**
- **Rename Devices** - Click device, enter new name
- Original names: "Ceiling Light", "Ceiling Fan", etc.
- Custom names: "My Bedroom Light", "Study Fan", etc.

**Appearance**
- **Dark Mode** - Toggle (currently default ON)
- Light mode coming soon

**TouchBeat Account**
- Account email (display only)
- Account type (display only)
- Subscription status

**Data Management**
- **Reset to Defaults** button
  - Restores all device names
  - Resets all device states to OFF
  - Clears automation rules
  - Restores initial notifications
  - **Warning:** Cannot be undone!

### Closing Settings
- Click X button (top right)
- Click outside panel
- Press ESC key

---

## 💡 Pro Tips & Tricks

### Efficiency Tips:
1. **Use room shortcuts** (bottom right) for quick navigation
2. **ESC key** closes any panel instantly
3. **Create automation rules** for frequently used combinations
4. **Use Preview mode** to test scenes before activating
5. **Monitor energy panel** to identify power-hungry devices

### Visual Feedback:
- **Device glow** in 3D = Device is ON
- **Fan rotation** = Speed indicator
- **Energy rings** = Power consumption level
- **Camera smooth transition** = Focusing on room
- **Pulsing notifications badge** = Unread messages

### Best Practices:
1. **Good Morning Scene** - Run when you wake up
2. **Sleep Mode Scene** - Run before bed
3. **Away Mode Scene** - Run when leaving home
4. **Movie Night Scene** - Perfect for family time
5. **Create rules** for TV + Light synchronization

### Troubleshooting:
- **Can't click device?** - Zoom in closer, device might be obstructed
- **Camera stuck?** - Click "Overview" button to reset
- **Panel won't close?** - Press ESC key
- **Slow performance?** - Reduce browser zoom to 100%
- **Scene not working?** - Refresh page, try again

---

## 📱 Mobile Usage

### Optimized for Touch:
- All buttons are touch-friendly
- Swipe to rotate 3D view
- Pinch to zoom
- Tap devices to control
- Bottom hint text hidden on mobile

### Mobile Tips:
1. Use portrait mode for sidebar
2. Use landscape mode for 3D view
3. Double-tap to zoom to device
4. Use quick controls for fast navigation

---

## 🎯 Common Use Cases

### Morning Routine:
1. Open app
2. Click 🌅 Good Morning scene in top bar
3. Watch devices activate sequentially
4. Adjust AC temperature if needed

### Leaving Home:
1. Click 🔒 Away Mode scene
2. All devices turn OFF
3. Check notification for confirmation
4. Close app

### Evening Entertainment:
1. Navigate to Living Hall (sidebar or 3D)
2. Click 🎬 Movie Night scene
3. Adjust TV volume as needed
4. Enjoy!

### Energy Audit:
1. Open Energy Monitor
2. Check total consumption
3. Identify red-ring devices (high consumers)
4. Click "Turn Off High Consumers" if needed
5. Check monthly cost estimate

### Custom Automation:
1. Open Automation Rules
2. Create rule: "Living Light OFF → TV OFF"
3. Test by turning Living Light OFF
4. TV automatically turns OFF
5. Enable/disable rule anytime

---

## 🚀 Advanced Features (Coming Soon)

- **Voice Control** - "Hey HOLOROOM, turn on Living Hall"
- **Weather-Based Automation** - Auto AC based on temperature
- **Custom Floor Plans** - Upload your own home layout
- **Multi-Home Support** - Switch between homes
- **Scheduled Scenes** - Run scenes at specific times
- **Energy Analytics** - Detailed usage graphs over time
- **Guest Access** - Share limited control with family
- **VR Mode** - Walk through your home in VR

---

## 📞 Need Help?

**TouchBeat Support:**
- Email: support@touchbeat.in
- Website: touchbeat.in
- Phone: Available on website

**Quick Fixes:**
- Refresh page (F5)
- Clear browser cache
- Try different browser (Chrome recommended)
- Check internet connection

---

**Enjoy your smart home experience! 🏠✨**

*Built with ❤️ by TouchBeat Automation*
