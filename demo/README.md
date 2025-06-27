# SquibView GIF Demo Setup

This directory contains optimized content for creating animated GIF demonstrations of SquibView's key features.

## Files

- **gif-demo-content.md** - Step-by-step demo content for GIF recording
- **gif-demo.html** - HTML page for testing and recording
- **README.md** - This file

## Creating the GIF

### 1. Setup
1. Run `npm run build` to ensure latest SquibView build
2. Open `demo/gif-demo.html` in your browser
3. Set up screen recording (QuickTime, OBS, etc.)

### 2. Recording Settings
- **Resolution:** 1280x720 (recommended for GitHub)
- **Frame Rate:** 15-20 fps (smaller file size)
- **Duration:** 30-45 seconds maximum
- **File Size Target:** Under 3MB for GitHub

### 3. Recording Script
1. **Start with empty editor** (clear all content)
2. **Type gradually:** "# SquibView Live Demo"
3. **Add Mermaid section:** Show diagram building in real-time
4. **Add math equations:** Type LaTeX and show instant rendering
5. **Add GeoJSON:** Show map appearing
6. **Demonstrate bidirectional editing:** Click in rendered view, edit, show sync
7. **End with call-to-action**

### 4. GIF Optimization
After recording:
1. Convert to GIF using tools like:
   - **ffmpeg:** `ffmpeg -i recording.mov -vf "fps=15,scale=1280:-1" squibview-demo.gif`
   - **Online tools:** gifski.app, ezgif.com
   - **Photoshop:** Import video frames, optimize for web
2. Optimize file size (target under 3MB)
3. Test on GitHub to ensure good quality

### 5. Content Highlights to Show
- ⚡ **Real-time preview** - Typing with instant updates
- 📊 **Mermaid diagrams** - Complex diagrams that build live
- 🧮 **Math equations** - Beautiful LaTeX rendering
- 🗺️ **Interactive maps** - GeoJSON visualization
- 🔄 **Bidirectional editing** - Edit in rendered view
- 🎯 **Rich content** - Code, tables, formatting

## Regenerating Content

To update demo content:
```bash
node tools/generate-demo-content.js
```

This will regenerate both the markdown content and HTML demo page with any updates.
