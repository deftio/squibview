#!/usr/bin/env node

/**
 * create-animated-gif.js
 * 
 * Automated GIF creation using Puppeteer to demonstrate SquibView features.
 * Creates a clean, reproducible animated demo showing:
 * 1. Basic markdown editing
 * 2. Mermaid diagram rendering
 * 3. Math equation rendering  
 * 4. GeoJSON map rendering
 * 
 * Usage: node tools/create-animated-gif.js
 * Output: squibview-demo.gif
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
    width: 1280,
    height: 720,
    fps: 15,
    duration: 30, // seconds
    outputFile: 'squibview-demo.gif'
};

// Progressive demo script - builds content incrementally
const demoScript = [
    {
        displayTime: 1500,
        content: '# SquibView Demo',
        description: 'Start with heading'
    },
    {
        displayTime: 1500,
        content: `# SquibView Demo

**Live markdown rendering** as you type!`,
        description: 'Add description'
    },
    {
        displayTime: 2000,
        content: `# SquibView Demo

**Live markdown rendering** as you type!

- Bullet points
- Tables and lists
- *Rich* formatting`,
        description: 'Add bullet points'
    },
    {
        displayTime: 2000,
        content: `# SquibView Demo

**Live markdown rendering** as you type!

- Bullet points  
- Tables and lists
- *Rich* formatting

| Feature | Status |
|---------|--------|
| Live Preview | ✅ |
| Diagrams | ✅ |`,
        description: 'Add markdown table'
    },
    {
        displayTime: 3000,
        content: `# SquibView Demo

**Live markdown rendering** as you type!

## Live Diagrams

\`\`\`mermaid
graph LR
    A[Type] --> B[Render]
    B --> C[✨ Live!]
\`\`\``,
        description: 'Add Mermaid diagram'
    },
    {
        displayTime: 2500,
        content: `# SquibView Demo

**Live markdown rendering** as you type!

## Math Equations

Inline: $E = mc^2$

Block equations:
$$\\frac{d}{dx}\\left( \\int_{0}^{x} f(u)\\,du\\right) = f(x)$$`,
        description: 'Add math equations'
    },
    {
        displayTime: 2500,
        content: `# SquibView Demo

**Live markdown rendering** as you type!

## Interactive Maps

\`\`\`geojson
{
  "type": "Feature",
  "properties": {"name": "Demo Point"},
  "geometry": {
    "type": "Point",
    "coordinates": [-122.4, 37.8]
  }
}
\`\`\``,
        description: 'Add GeoJSON map'
    }
];

// Create clean demo HTML page
const createDemoPage = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SquibView Automated Demo</title>
    <link rel="stylesheet" href="../dist/squibview.min.css">
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #ffffff;
            color: #333333;
            -webkit-font-smoothing: antialiased;
        }
        .demo-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
        }
        /* Hide any extra controls for clean demo */
        .squibview-title {
            display: none;
        }
        /* Ensure proper colors */
        * {
            color-scheme: light;
        }
        /* Fix any weird color issues */
        .squibview-rendered-content {
            background: white !important;
            color: #333 !important;
        }
    </style>
</head>
<body>
    <div class="demo-container">
        <div id="squibview-demo"></div>
    </div>

    <script src="../dist/squibview.standalone.umd.min.js"></script>
    <script>
        try {
            // Create SquibView instance
            console.log('Creating SquibView instance...');
            window.demoEditor = new SquibView('#squibview-demo', {
                content: '',
                initialView: 'split',
                showControls: false, // Clean demo without controls
                titleShow: false
            });
            console.log('SquibView created successfully');

            // Expose setContent for Puppeteer
            window.setDemoContent = (content) => {
                console.log('Setting content:', content.substring(0, 50) + '...');
                window.demoEditor.setContent(content, 'md');
            };
            console.log('Demo setup complete');
        } catch (error) {
            console.error('Error creating SquibView:', error);
            window.initError = error.message;
        }
    </script>
</body>
</html>`;
};

// Helper function to wait for specific elements to be rendered
const waitForContentRendered = async (page, contentType) => {
    if (contentType.includes('Mermaid')) {
        // Wait for mermaid diagram to be rendered
        await page.waitForSelector('.mermaid svg', { timeout: 5000 }).catch(() => {
            console.log('     Mermaid diagram may not have rendered properly');
        });
    } else if (contentType.includes('Math')) {
        // Wait for MathJax to render
        await page.waitForFunction(() => {
            return document.querySelector('.MathJax') || document.querySelector('[data-mathml]');
        }, { timeout: 3000 }).catch(() => {
            console.log('     Math equations may not have rendered properly');
        });
    } else if (contentType.includes('Maps')) {
        // Wait for Leaflet map to be rendered
        await page.waitForSelector('.leaflet-container', { timeout: 5000 }).catch(() => {
            console.log('     GeoJSON map may not have rendered properly');
        });
    }
};

// Main GIF creation function
const createAnimatedGif = async () => {
    console.log('🚀 Starting automated GIF creation...');
    
    // Create demo HTML file
    const demoDir = path.join(path.dirname(__dirname), 'demo');
    if (!fs.existsSync(demoDir)) {
        fs.mkdirSync(demoDir, { recursive: true });
    }
    
    const demoPagePath = path.join(demoDir, 'auto-demo.html');
    fs.writeFileSync(demoPagePath, createDemoPage(), 'utf8');
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({ 
        headless: true, // Set to true for production
        defaultViewport: null, // Let page set its own viewport
        args: [
            '--force-color-profile=srgb',
            '--disable-features=TranslateUI',
            '--disable-extensions',
            '--disable-component-extensions-with-background-pages',
            '--disable-default-apps',
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    
    const page = await browser.newPage();
    
    // Set proper viewport and color settings
    await page.setViewport({
        width: config.width,
        height: config.height,
        deviceScaleFactor: 1
    });
    
    // Navigate to demo page
    const demoUrl = `file://${demoPagePath}`;
    await page.goto(demoUrl, { waitUntil: 'networkidle0' });
    
    console.log('📄 Demo page loaded');
    
    // Debug: Check what's available
    const debugInfo = await page.evaluate(() => {
        return {
            SquibView: typeof window.SquibView,
            demoEditor: typeof window.demoEditor,
            setDemoContent: typeof window.setDemoContent,
            initError: window.initError || 'none'
        };
    });
    console.log('🔍 Debug info:', debugInfo);
    
    // Get console logs
    const logs = await page.evaluate(() => {
        return window.console ? 'Console available' : 'No console';
    });
    console.log('Console:', logs);
    
    // Wait for SquibView to initialize
    await page.waitForFunction(() => window.demoEditor && window.setDemoContent, { timeout: 10000 });
    
    // Array to store screenshots for GIF
    const screenshots = [];
    
    console.log('🎬 Recording demo sequence...');
    
    // Execute demo script
    for (let i = 0; i < demoScript.length; i++) {
        const step = demoScript[i];
        console.log(`   Step ${i + 1}: ${step.description}`);
        
        // Set content all at once (no typing simulation for better rendering)
        await page.evaluate((content) => {
            window.setDemoContent(content);
        }, step.content);
        
        // Wait for specific content to render properly
        console.log(`     Waiting for ${step.description} to render...`);
        await waitForContentRendered(page, step.description);
        
        // Additional small delay to ensure everything is stable
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Take screenshots during this step
        const stepScreenshots = Math.floor((step.displayTime / 1000) * config.fps);
        console.log(`     Capturing ${stepScreenshots} frames...`);
        
        for (let j = 0; j < stepScreenshots; j++) {
            const screenshot = await page.screenshot({ 
                type: 'png',
                fullPage: false,
                omitBackground: false,
                captureBeyondViewport: false,
                clip: {
                    x: 0,
                    y: 0,
                    width: config.width,
                    height: config.height
                }
            });
            screenshots.push(screenshot);
            await new Promise(resolve => setTimeout(resolve, 1000 / config.fps));
        }
    }
    
    console.log(`📸 Captured ${screenshots.length} frames`);
    
    // Close browser
    await browser.close();
    
    // Create temporary directory for frames
    const framesDir = path.join(demoDir, 'frames');
    if (fs.existsSync(framesDir)) {
        fs.rmSync(framesDir, { recursive: true });
    }
    fs.mkdirSync(framesDir);
    
    // Save frames as PNG files
    console.log('💾 Saving frames...');
    for (let i = 0; i < screenshots.length; i++) {
        const framePath = path.join(framesDir, `frame-${String(i).padStart(4, '0')}.png`);
        fs.writeFileSync(framePath, screenshots[i]);
    }
    
    // Create GIF using ffmpeg (if available)
    const { execSync } = await import('child_process');
    const outputPath = path.join(path.dirname(__dirname), config.outputFile);
    
    try {
        const ffmpegCmd = `ffmpeg -y -framerate ${config.fps} -i "${framesDir}/frame-%04d.png" -vf "scale=${config.width}:${config.height}" -loop 0 "${outputPath}"`;
        execSync(ffmpegCmd);
        console.log(`✅ GIF created: ${config.outputFile}`);
        
        // Clean up frames
        fs.rmSync(framesDir, { recursive: true });
        
    } catch (error) {
        console.log('⚠️  ffmpeg not available. Frames saved in demo/frames/');
        console.log('   To create GIF manually:');
        console.log(`   ffmpeg -framerate ${config.fps} -i "demo/frames/frame-%04d.png" -vf "scale=${config.width}:${config.height}" -loop 0 ${config.outputFile}`);
    }
    
    console.log('🎉 Demo GIF creation complete!');
};

// Error handling
const main = async () => {
    try {
        await createAnimatedGif();
    } catch (error) {
        console.error('❌ Error creating GIF:', error);
        process.exit(1);
    }
};

// Check if puppeteer is available
try {
    await import('puppeteer');
    main();
} catch (error) {
    console.error('❌ Puppeteer not found. Install with: npm install --save-dev puppeteer');
    console.log('');
    console.log('Alternative: Use the manual demo page at demo/gif-demo.html');
    process.exit(1);
}