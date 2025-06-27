#!/usr/bin/env node

/**
 * create-simple-gif.js
 * 
 * Simplified GIF creation with just the most reliable content.
 * Creates a shorter, more focused demo showing basic markdown and Mermaid.
 * 
 * Usage: node tools/create-simple-gif.js
 * Output: squibview-simple-demo.gif
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration for simpler, more reliable GIF
const config = {
    width: 1280,
    height: 720,
    fps: 12, // Slightly slower for better reliability
    outputFile: 'squibview-simple-demo.gif'
};

// Simplified demo script with just the most reliable content
const demoScript = [
    {
        displayTime: 2000,
        content: '# SquibView\n\n**Real-time markdown rendering**\n\nEdit and see instant updates!',
        description: 'Basic markdown'
    },
    {
        displayTime: 3500,
        content: `# SquibView

## Live Diagrams

\`\`\`mermaid
graph LR
    A[Write] --> B[Render]
    B --> C[🎉 Beautiful!]
\`\`\`

**Interactive content, instantly!**`,
        description: 'Mermaid diagram'
    }
];

// Create simple demo HTML page
const createSimpleDemoPage = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SquibView Simple Demo</title>
    <link rel="stylesheet" href="../dist/squibview.min.css">
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: #ffffff;
        }
        .demo-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
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
            console.log('Creating SquibView instance...');
            window.demoEditor = new SquibView('#squibview-demo', {
                content: '',
                initialView: 'split',
                showControls: false,
                titleShow: false
            });
            console.log('SquibView created successfully');

            window.setDemoContent = (content) => {
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

// Main simple GIF creation function
const createSimpleGif = async () => {
    console.log('🚀 Starting simple GIF creation...');
    
    // Create demo HTML file
    const demoDir = path.join(path.dirname(__dirname), 'demo');
    if (!fs.existsSync(demoDir)) {
        fs.mkdirSync(demoDir, { recursive: true });
    }
    
    const demoPagePath = path.join(demoDir, 'simple-demo.html');
    fs.writeFileSync(demoPagePath, createSimpleDemoPage(), 'utf8');
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({ 
        headless: true, // Run headless for production
        defaultViewport: {
            width: config.width,
            height: config.height
        }
    });
    
    const page = await browser.newPage();
    
    // Navigate to demo page
    const demoUrl = `file://${demoPagePath}`;
    await page.goto(demoUrl, { waitUntil: 'networkidle0' });
    
    console.log('📄 Demo page loaded');
    
    // Wait for SquibView to initialize
    await page.waitForFunction(() => window.demoEditor && window.setDemoContent, { timeout: 10000 });
    
    // Array to store screenshots for GIF
    const screenshots = [];
    
    console.log('🎬 Recording simple demo sequence...');
    
    // Execute demo script
    for (let i = 0; i < demoScript.length; i++) {
        const step = demoScript[i];
        console.log(`   Step ${i + 1}: ${step.description}`);
        
        // Set content
        await page.evaluate((content) => {
            window.setDemoContent(content);
        }, step.content);
        
        // Wait for content to render
        if (step.description.includes('Mermaid')) {
            console.log('     Waiting for Mermaid to render...');
            await page.waitForSelector('.mermaid svg', { timeout: 5000 }).catch(() => {
                console.log('     Using fallback wait for Mermaid');
            });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Extra wait for Mermaid
        } else {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Take screenshots
        const stepScreenshots = Math.floor((step.displayTime / 1000) * config.fps);
        console.log(`     Capturing ${stepScreenshots} frames...`);
        
        for (let j = 0; j < stepScreenshots; j++) {
            const screenshot = await page.screenshot({ 
                type: 'png',
                fullPage: false,
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
    const framesDir = path.join(demoDir, 'simple-frames');
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
    
    // Create GIF using ffmpeg
    const { execSync } = await import('child_process');
    const outputPath = path.join(path.dirname(__dirname), config.outputFile);
    
    try {
        const ffmpegCmd = `ffmpeg -y -framerate ${config.fps} -i "${framesDir}/frame-%04d.png" -vf "scale=${config.width}:${config.height}" -loop 0 "${outputPath}"`;
        execSync(ffmpegCmd);
        console.log(`✅ Simple GIF created: ${config.outputFile}`);
        
        // Clean up frames
        fs.rmSync(framesDir, { recursive: true });
        
    } catch (error) {
        console.log('⚠️  ffmpeg not available. Frames saved in demo/simple-frames/');
        console.log(`   To create GIF manually:`);
        console.log(`   ffmpeg -framerate ${config.fps} -i "demo/simple-frames/frame-%04d.png" -vf "scale=${config.width}:${config.height}" -loop 0 ${config.outputFile}`);
    }
    
    console.log('🎉 Simple demo GIF creation complete!');
};

// Error handling
const main = async () => {
    try {
        await createSimpleGif();
    } catch (error) {
        console.error('❌ Error creating simple GIF:', error);
        process.exit(1);
    }
};

// Check if puppeteer is available
try {
    await import('puppeteer');
    main();
} catch (error) {
    console.error('❌ Puppeteer not found. Install with: npm install --save-dev puppeteer');
    process.exit(1);
}