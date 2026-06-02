# ⚡ Quick Start Guide - HOLOROOM 3D

Get up and running in 5 minutes!

---

## 🚀 Installation

### Step 1: Install Dependencies
```bash
cd d:\Downloads\holoroom-3d-digital-twin
npm install
```

**Wait for installation to complete** (~2-3 minutes depending on internet speed)

### Step 2: Start Development Server
```bash
npm run dev
```

**You should see:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 3: Open in Browser
- Open Chrome/Firefox/Edge
- Navigate to: `http://localhost:5173`
- **HOLOROOM 3D loads!** 🎉

---

## 🎮 First Steps (30 Seconds Tutorial)

### 1. Explore the 3D Home (5 seconds)
- **Drag** with mouse to rotate view
- **Scroll** to zoom in/out
- See your 2BHK apartment with 5 rooms

### 2. Control a Device (10 seconds)
- **Click** any glowing sphere (light) in 3D
- Right panel slides in
- **Toggle** the power switch
- Watch it glow/dim in 3D!

### 3. Run a Scene (10 seconds)
- **Click** any emoji button in top bar (try 🌅 Good Morning)
- Watch devices activate one by one
- See the magic happen!

### 4. Check Energy Usage (5 seconds)
- **Click** "Energy Monitor" button (left sidebar, bottom)
- See total power consumption
- View energy rings around devices

**Congratulations! You're now a HOLOROOM 3D pro! 🎓**

---

## 🎯 Quick Feature Access

| Feature | How to Access |
|---------|---------------|
| **Control Device** | Click device in 3D |
| **Focus on Room** | Click room floor or label in 3D |
| **Run Scene** | Click emoji buttons in top bar |
| **View Energy** | Click "Energy Monitor" (left sidebar) |
| **Create Rule** | Click "Automation Rules" (left sidebar) |
| **Notifications** | Click bell icon (top right) |
| **Settings** | Click gear icon (top right) |
| **Close Panel** | Press ESC or click X button |

---

## 💡 Pro Tips

### Most Useful Shortcuts:
1. **ESC key** = Close any panel
2. **Click TouchBeat logo** = Return to overview
3. **Bottom-right buttons** = Quick room navigation
4. **Top bar emoji buttons** = Instant scene activation

### Try These First:
1. ✅ Click 🌅 Good Morning scene button
2. ✅ Click a light in 3D, change brightness
3. ✅ Open Energy Monitor, see the rings
4. ✅ Click a room, use "All Off" button
5. ✅ Create an automation rule

---

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
# Kill the process or use different port
npm run dev -- --port 3000
```

### Installation fails?
```bash
# Clear npm cache
npm cache clean --force
npm install
```

### 3D view is black/blank?
- Check browser console (F12)
- Update graphics drivers
- Try Chrome instead of other browsers
- Make sure WebGL is enabled

### Buttons not working?
- **Refresh page** (F5)
- Hard refresh (Ctrl + Shift + R)
- Clear browser cache
- Make sure JavaScript is enabled

### Performance issues?
- Close other browser tabs
- Zoom browser to 100%
- Update your browser
- Check GPU usage in Task Manager

---

## 📚 Next Steps

### Learn More:
- Read **USER_GUIDE.md** for complete feature documentation
- Read **README.md** for project overview
- Read **CHANGELOG.md** for latest updates

### Explore Features:
1. **All 5 Scenes** - Try each one
2. **Every Device Type** - Light, Fan, AC, TV, Geyser, Plug
3. **Automation Rules** - Create your own
4. **Energy Monitoring** - Turn off high consumers
5. **Room Controls** - All On/Off buttons

### Customize:
1. **Rename devices** (Settings → Device names)
2. **Change home name** (Settings → Home name)
3. **Create automation rules** (Automation Builder)
4. **Set up your preferred scenes**

---

## 🎬 Video Tutorial (Coming Soon)

Watch a 2-minute walkthrough video:
- How to navigate the 3D view
- How to control devices
- How to run scenes
- How to create automation rules

---

## 💬 Get Help

### Documentation:
- 📖 **USER_GUIDE.md** - Complete feature guide
- 📝 **README.md** - Project overview
- 🔄 **CHANGELOG.md** - Version history

### Support:
- 📧 Email: support@touchbeat.in
- 🌐 Website: touchbeat.in

### Common Questions:

**Q: Is this connected to real devices?**
A: Currently this is a demo/simulation. Real IoT integration coming in v2.0.

**Q: Can I use this on mobile?**
A: Yes! It works on mobile browsers with touch controls.

**Q: Can I add more rooms?**
A: Custom floor plans coming in v1.2.0.

**Q: Is there a mobile app?**
A: React Native app coming in v1.4.0.

**Q: Can I voice control?**
A: Voice control coming in v1.2.0.

---

## 🚀 Build for Production

### When ready to deploy:
```bash
npm run build
```

### Output:
- Build files in `dist/` folder
- Ready to deploy to Vercel, Netlify, or any static host

### Deploy to Vercel (Recommended):
```bash
npm install -g vercel
vercel
```

Follow the prompts, and you're live! 🌐

---

## ✨ Enjoy HOLOROOM 3D!

**You're all set!** 🎉

Start exploring your 3D smart home. If you have any questions, check the USER_GUIDE.md or reach out to support.

**Happy controlling!** 🏠✨

---

*Made with ❤️ by TouchBeat Automation*
*Last Updated: December 20, 2024*
