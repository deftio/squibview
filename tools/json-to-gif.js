#!/usr/bin/env node

/**
 * json-to-gif.js
 * 
 * Converts JSON frame data from browser-gif-creator.html into an animated GIF
 * 
 * Usage: node tools/json-to-gif.js <input.json> [output.gif]
 * Example: node tools/json-to-gif.js squibview-gif-frames.json squibview-demo.gif
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to convert data URL to buffer
function dataURLToBuffer(dataURL) {
    const base64Data = dataURL.split(',')[1];
    return Buffer.from(base64Data, 'base64');
}

// Smart timing algorithm for better scene appreciation
function generateSmartDelays(totalFrames) {
    const delays = [];
    
    // New frame sequence with rich content from sample-content.md:
    // 0-3: Title typing (fast) - 80ms each
    // 4-6: Description building (fast) - 80ms each  
    // 7-10: Feature bullets (fast) - 80ms each
    // 11-15: Table building (medium) - 120ms each
    // 16: Complete table (PAUSE) - 1000ms
    // 17: Mermaid diagram (PAUSE) - 1500ms
    // 18-20: Math equations (PAUSE each) - 750ms each
    // 21-22: SVG shapes (PAUSE each) - 1000ms each
    // 23-25: GeoJSON maps (PAUSE each) - 1500ms each
    // 26-29: STL 3D model (spinning effect) - 200ms each
    // 30: Final summary (PAUSE) - 2000ms
    
    for (let i = 0; i < totalFrames; i++) {
        let delay;
        
        if (i <= 10) {
            // Fast typing for title, description, bullets
            delay = 8; // 80ms - fast typing
        } else if (i <= 15) {
            // Medium for table building
            delay = 12; // 120ms
        } else if (i === 16) {
            // Table completion pause
            delay = 100; // 1000ms
        } else if (i === 17) {
            // Diagram appreciation pause
            delay = 150; // 1500ms
        } else if (i >= 18 && i <= 20) {
            // Math equation appreciation - each equation gets time
            delay = 75; // 750ms each
        } else if (i >= 21 && i <= 22) {
            // SVG shape appreciation
            delay = 100; // 1000ms each
        } else if (i >= 23 && i <= 25) {
            // GeoJSON map appreciation
            delay = 150; // 1500ms each
        } else if (i >= 26 && i <= 29) {
            // STL 3D model - spinning/building effect
            delay = 20; // 200ms for smooth animation
        } else if (i === 30) {
            // Final summary - long pause to appreciate
            delay = 200; // 2000ms
        } else {
            // Fallback for any extra frames
            delay = 50; // 500ms
        }
        
        delays.push(delay);
    }
    
    console.log(`📊 Generated ${delays.length} smart delays: typing (80ms) → content appreciation (750-1500ms) → final pause (2s)`);
    return delays;
}

// Main conversion function
const convertJSONToGif = async (inputFile, outputFile = 'squibview-demo.gif') => {
    console.log('🎬 Converting JSON frames to GIF...');
    
    try {
        // Read JSON file
        const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
        const { frames, fps, width, height } = jsonData;
        
        console.log(`📊 Processing ${frames.length} frames at ${fps}fps (${width}x${height})`);
        
        // Create temporary directory for frames
        const tempDir = path.join(path.dirname(inputFile), 'temp-frames');
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true });
        }
        fs.mkdirSync(tempDir);
        
        // Save each frame as PNG
        console.log('💾 Extracting frames...');
        for (let i = 0; i < frames.length; i++) {
            const frameBuffer = dataURLToBuffer(frames[i]);
            const framePath = path.join(tempDir, `frame-${String(i).padStart(4, '0')}.png`);
            fs.writeFileSync(framePath, frameBuffer);
            
            if (i % 10 === 0) {
                console.log(`   Extracted ${i + 1}/${frames.length} frames`);
            }
        }
        
        // Create GIF using ffmpeg
        console.log('🎥 Creating GIF with ffmpeg...');
        const { execSync } = await import('child_process');
        
        const outputPath = path.resolve(outputFile);
        const ffmpegCmd = [
            'ffmpeg',
            '-y', // Overwrite output
            `-framerate ${fps}`,
            `-i "${tempDir}/frame-%04d.png"`,
            `-vf "scale=${width}:${height}"`,
            '-loop 0', // Loop infinitely
            `"${outputPath}"`
        ].join(' ');
        
        try {
            execSync(ffmpegCmd, { stdio: 'inherit' });
            console.log(`✅ GIF created successfully: ${outputFile}`);
            
            // Show file size
            const stats = fs.statSync(outputPath);
            const sizeKB = Math.round(stats.size / 1024);
            console.log(`📊 File size: ${sizeKB}KB`);
            
        } catch (error) {
            console.error('❌ ffmpeg failed. Make sure ffmpeg is installed.');
            console.log('');
            console.log('📋 Manual command to create GIF:');
            console.log(ffmpegCmd);
            return;
        }
        
        // Clean up temp files
        fs.rmSync(tempDir, { recursive: true });
        console.log('🧹 Cleaned up temporary files');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

// Enhanced version with more options
const convertWithOptions = async (inputFile, options = {}) => {
    const {
        outputFile = 'squibview-demo.gif',
        quality = 'high', // high, medium, low
        optimize = true,
        palette = true
    } = options;
    
    console.log('🎬 Converting JSON frames to optimized GIF...');
    
    try {
        const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
        const { frames, fps, width, height } = jsonData;
        
        console.log(`📊 Processing ${frames.length} frames at ${fps}fps (${width}x${height})`);
        
        // Create temporary directory
        const tempDir = path.join(path.dirname(inputFile), 'temp-frames');
        if (fs.existsSync(tempDir)) {
            fs.rmSync(tempDir, { recursive: true });
        }
        fs.mkdirSync(tempDir);
        
        // Extract frames
        console.log('💾 Extracting frames...');
        for (let i = 0; i < frames.length; i++) {
            const frameBuffer = dataURLToBuffer(frames[i]);
            const framePath = path.join(tempDir, `frame-${String(i).padStart(4, '0')}.png`);
            fs.writeFileSync(framePath, frameBuffer);
        }
        
        // Create optimized GIF with smart timing
        console.log('🎥 Creating optimized GIF with smart timing...');
        const { execSync } = await import('child_process');
        const outputPath = path.resolve(outputFile);
        
        // Generate variable delays file for smart timing
        const delaysFile = path.join(tempDir, 'delays.txt');
        const smartDelays = generateSmartDelays(frames.length);
        const delayLines = smartDelays.map((delay, i) => 
            `file 'frame-${String(i).padStart(4, '0')}.png'\nduration ${delay / 100}\n`
        ).join('');
        fs.writeFileSync(delaysFile, delayLines + `file 'frame-${String(frames.length - 1).padStart(4, '0')}.png'\n`);
        
        console.log('⏱️  Applied smart timing: fast typing, scene appreciation pauses');
        
        let ffmpegCmd;
        
        if (palette && optimize) {
            // Two-pass with custom palette for better quality
            const paletteFile = path.join(tempDir, 'palette.png');
            
            // Generate palette
            const paletteCmd = [
                'ffmpeg', '-y',
                `-framerate ${fps}`,
                `-i "${tempDir}/frame-%04d.png"`,
                '-vf "palettegen=max_colors=256:reserve_transparent=0"',
                `"${paletteFile}"`
            ].join(' ');
            
            execSync(paletteCmd);
            console.log('🎨 Generated optimized palette');
            
            // Create GIF with palette, smart timing, and auto-crop
            const cropHeight = Math.min(height, 550); // Auto-crop to remove whitespace
            ffmpegCmd = [
                'ffmpeg', '-y',
                `-f concat -safe 0 -i "${delaysFile}"`,
                `-i "${paletteFile}"`,
                `-lavfi "crop=${width}:${cropHeight}:0:0[cropped];[cropped]paletteuse=dither=bayer:bayer_scale=3"`,
                '-loop 0',
                `"${outputPath}"`
            ].join(' ');
            
        } else {
            // Simple conversion with smart timing and auto-crop
            const cropHeight = Math.min(height, 550); // Auto-crop to remove whitespace
            ffmpegCmd = [
                'ffmpeg', '-y',
                `-f concat -safe 0 -i "${delaysFile}"`,
                `-vf "scale=${width}:${height},crop=${width}:${cropHeight}:0:0"`,
                '-loop 0',
                `"${outputPath}"`
            ].join(' ');
        }
        
        try {
            execSync(ffmpegCmd, { stdio: 'inherit' });
            
            const stats = fs.statSync(outputPath);
            const sizeKB = Math.round(stats.size / 1024);
            
            console.log(`✅ Optimized GIF created: ${outputFile}`);
            console.log(`📊 File size: ${sizeKB}KB`);
            console.log(`⏱️  Duration: ${(frames.length / fps).toFixed(1)}s`);
            
        } catch (error) {
            console.error('❌ ffmpeg command failed');
            console.log('📋 Command was:', ffmpegCmd);
            throw error;
        }
        
        // Clean up
        fs.rmSync(tempDir, { recursive: true });
        console.log('🎉 Conversion complete!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

// CLI interface
const main = () => {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('📋 Usage: node tools/json-to-gif.js <input.json> [output.gif]');
        console.log('');
        console.log('Examples:');
        console.log('  node tools/json-to-gif.js squibview-gif-frames.json');
        console.log('  node tools/json-to-gif.js frames.json custom-demo.gif');
        console.log('');
        console.log('Requirements:');
        console.log('  - ffmpeg must be installed and available in PATH');
        console.log('  - Input JSON must be from browser-gif-creator.html');
        process.exit(1);
    }
    
    const inputFile = args[0];
    const outputFile = args[1] || 'squibview-demo.gif';
    
    if (!fs.existsSync(inputFile)) {
        console.error(`❌ Input file not found: ${inputFile}`);
        process.exit(1);
    }
    
    // Use enhanced conversion with optimization
    convertWithOptions(inputFile, {
        outputFile,
        quality: 'high',
        optimize: true,
        palette: true
    });
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { convertJSONToGif, convertWithOptions };