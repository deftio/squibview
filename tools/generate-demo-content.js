#!/usr/bin/env node

/**
 * generate-demo-content.js
 * 
 * Generates demo content optimized for creating animated GIFs that showcase
 * SquibView's key features: live editing, Mermaid diagrams, math equations,
 * bidirectional editing, and interactive maps.
 * 
 * Usage: node tools/generate-demo-content.js
 * Output: demo/gif-demo-content.md
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Demo content designed for step-by-step GIF recording
const demoContent = `# SquibView Live Demo

> **Recording Instructions:**
> 1. Start with empty editor, type content step by step
> 2. Show live preview updating in real-time
> 3. Demonstrate bidirectional editing by clicking in rendered view
> 4. Keep each section brief for GIF timing

## ⚡ Real-time Markdown
Type this text and watch it render instantly:

**Bold text**, *italic text*, and \`inline code\` all update live!

---

## 📊 Live Mermaid Diagrams
Watch this diagram build as you type:

\`\`\`mermaid
graph TD
    A[User Types] --> B{SquibView}
    B -->|Instantly| C[Beautiful Diagrams]
    B -->|Real-time| D[Live Preview]
    C --> E[🎉 Amazing Results]
    D --> E
\`\`\`

---

## 🧮 LaTeX Math Equations
Mathematical beauty in real-time:

Inline math: $E = mc^2$

Block equations:
$$\\sum_{i=1}^{n} x_i = \\frac{n(n+1)}{2}$$

Complex formulas:
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

---

## 🗺️ Interactive GeoJSON Maps
Geographic data that comes alive:

\`\`\`geojson
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "San Francisco",
        "description": "Tech Hub"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-122.4194, 37.7749]
      }
    },
    {
      "type": "Feature", 
      "properties": {
        "name": "New York",
        "description": "Finance Center"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-74.0059, 40.7128]
      }
    }
  ]
}
\`\`\`

---

## 🎯 Syntax Highlighted Code
Perfect for technical documentation:

\`\`\`javascript
// SquibView integration example
const editor = new SquibView({
  element: document.getElementById('editor'),
  content: '# Hello **SquibView**!',
  initialView: 'split'
});

// Watch the magic happen
editor.setContent(newMarkdown);
\`\`\`

\`\`\`python
# Data science example
import pandas as pd
import matplotlib.pyplot as plt

def analyze_data(df):
    """Real-time documentation with SquibView"""
    return df.describe()
\`\`\`

---

## 📋 Tables & Data
Structured data made beautiful:

| Feature | SquibView | Competitors |
|---------|-----------|-------------|
| Live Preview | ✅ Instant | ❌ Slow |
| Rich Content | ✅ Full Support | ❌ Limited |
| Bidirectional | ✅ Yes | ❌ No |
| Offline Ready | ✅ Yes | ❌ CDN Only |

---

## 🔄 Bidirectional Editing Demo
**Try this in the GIF:**
1. Type content in source editor
2. Click on rendered text to edit directly
3. Show changes syncing back to source
4. Demonstrate the magic of two-way editing!

> **Pro tip:** Click on any rendered text to edit it directly!

---

## 🎨 Rich Content Showcase
Everything works together seamlessly:

### Mixed Content Example:
The formula for compound interest is: $A = P(1 + r)^t$

\`\`\`mermaid
graph LR
    P[Principal] --> A[Amount]
    R[Rate] --> A
    T[Time] --> A
    A --> F[Financial Freedom! 💰]
\`\`\`

**Result:** Beautiful, interactive documentation that updates in real-time!

---

## 🚀 Ready to Use SquibView?

Visit: [SquibView on GitHub](https://github.com/deftio/squibview)

\`\`\`bash
# Get started in seconds
npx squibv your-document.md
\`\`\`

*End of demo content - perfect for showcasing SquibView's power!*
`;

// Demo HTML template for testing the content
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SquibView GIF Demo</title>
    <link rel="stylesheet" href="../dist/squibview.min.css">
    <style>
        body { 
            margin: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #f8f9fa;
        }
        .demo-container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px;
            background: white;
            min-height: 100vh;
        }
        .demo-header {
            text-align: center;
            margin-bottom: 2rem;
            padding: 1rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 8px;
        }
        .recording-tips {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 1rem;
            margin-bottom: 2rem;
        }
        .recording-tips h3 {
            margin-top: 0;
            color: #856404;
        }
    </style>
</head>
<body>
    <div class="demo-container">
        <div class="demo-header">
            <h1>📹 SquibView GIF Demo Setup</h1>
            <p>Perfect content for creating compelling animated demonstrations</p>
        </div>
        
        <div class="recording-tips">
            <h3>🎬 Recording Tips</h3>
            <ul>
                <li><strong>Start with empty editor</strong> - Type content step by step</li>
                <li><strong>Keep it smooth</strong> - Type at moderate speed (not too fast)</li>
                <li><strong>Show the magic</strong> - Pause to let viewers see live updates</li>
                <li><strong>Highlight features</strong> - Focus on Mermaid, math, bidirectional editing</li>
                <li><strong>Resolution:</strong> 1280x720 or 1920x1080 (16:9 ratio)</li>
                <li><strong>Duration:</strong> 30-45 seconds for optimal GIF size</li>
            </ul>
        </div>
        
        <div id="squibview-demo"></div>
    </div>

    <script src="../dist/squibview.standalone.min.js"></script>
    <script>
        // Initialize SquibView with demo content
        const demoEditor = new SquibView({
            element: document.getElementById('squibview-demo'),
            content: \`\`, // Start empty for step-by-step recording
            initialView: 'split',
            showControls: true,
            titleShow: false
        });

        // Utility function to load demo content for testing
        function loadDemoContent() {
            fetch('./gif-demo-content.md')
                .then(response => response.text())
                .then(content => {
                    demoEditor.setContent(content, 'md');
                })
                .catch(error => {
                    console.log('Demo content not loaded, using fallback');
                    demoEditor.setContent('# Start typing to see SquibView magic!', 'md');
                });
        }

        // Load demo content after a short delay
        setTimeout(loadDemoContent, 1000);
    </script>
</body>
</html>`;

// Create demo directory if it doesn't exist
const demoDir = path.join(path.dirname(__dirname), 'demo');
if (!fs.existsSync(demoDir)) {
    fs.mkdirSync(demoDir, { recursive: true });
}

// Write demo content file
const contentPath = path.join(demoDir, 'gif-demo-content.md');
fs.writeFileSync(contentPath, demoContent, 'utf8');

// Write demo HTML file
const htmlPath = path.join(demoDir, 'gif-demo.html');
fs.writeFileSync(htmlPath, htmlTemplate, 'utf8');

// Create README for the demo directory
const demoReadme = `# SquibView GIF Demo Setup

This directory contains optimized content for creating animated GIF demonstrations of SquibView's key features.

## Files

- **gif-demo-content.md** - Step-by-step demo content for GIF recording
- **gif-demo.html** - HTML page for testing and recording
- **README.md** - This file

## Creating the GIF

### 1. Setup
1. Run \`npm run build\` to ensure latest SquibView build
2. Open \`demo/gif-demo.html\` in your browser
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
   - **ffmpeg:** \`ffmpeg -i recording.mov -vf "fps=15,scale=1280:-1" squibview-demo.gif\`
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
\`\`\`bash
node tools/generate-demo-content.js
\`\`\`

This will regenerate both the markdown content and HTML demo page with any updates.
`;

const readmePath = path.join(demoDir, 'README.md');
fs.writeFileSync(readmePath, demoReadme, 'utf8');

console.log('✅ Demo content generated successfully!');
console.log('');
console.log('📁 Files created:');
console.log(`   demo/gif-demo-content.md`);
console.log(`   demo/gif-demo.html`);
console.log(`   demo/README.md`);
console.log('');
console.log('🎬 Next steps:');
console.log('1. Open demo/gif-demo.html in your browser');
console.log('2. Set up screen recording software');
console.log('3. Follow the recording script in demo/README.md');
console.log('4. Create squibview-demo.gif');
console.log('');
console.log('💡 Tip: Start with empty editor and type step-by-step for best GIF impact!');