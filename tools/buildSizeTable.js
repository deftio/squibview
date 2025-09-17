#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

// Build configurations with descriptions
const builds = [
  {
    name: 'ESM Bundle',
    file: 'squibview.esm.min.js',
    description: 'ES Module with all features bundled'
  },
  {
    name: 'UMD Bundle',
    file: 'squibview.umd.min.js',
    description: 'Universal Module Definition with all features'
  },
  {
    name: 'ESM Lean',
    file: 'squibview.esm-lean.min.js',
    description: 'ES Module without bundled libraries'
  },
  {
    name: 'UMD Lean',
    file: 'squibview.umd-lean.min.js',
    description: 'UMD without bundled libraries'
  },
  {
    name: 'ESM Autoload',
    file: 'squibview.autoload.esm.min.js',
    description: 'ES Module with CDN autoloading'
  },
  {
    name: 'UMD Autoload',
    file: 'squibview.autoload.umd.min.js',
    description: 'UMD with CDN autoloading'
  },
  {
    name: 'Standalone ESM',
    file: 'squibview.standalone.esm.min.js',
    description: 'All-inclusive ES Module (no external dependencies)'
  },
  {
    name: 'Standalone UMD',
    file: 'squibview.standalone.umd.min.js',
    description: 'All-inclusive UMD (no external dependencies)'
  }
];

// Get file size in KB
function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(1);
  } catch (err) {
    return 'N/A';
  }
}

// Get gzipped size
function getGzippedSize(filePath) {
  try {
    const result = execSync(`gzip -c "${filePath}" | wc -c`, { encoding: 'utf-8' });
    return (parseInt(result.trim()) / 1024).toFixed(1);
  } catch (err) {
    return 'N/A';
  }
}

// Generate markdown table
function generateTable() {
  let table = '| Build Variant | Minified Size | Gzipped | Description |\n';
  table += '|---------------|---------------|---------|-------------|\n';

  builds.forEach(build => {
    const filePath = path.join(distDir, build.file);
    const size = getFileSize(filePath);
    const gzipped = getGzippedSize(filePath);

    table += `| **${build.name}** | ${size} KB | ${gzipped} KB | ${build.description} |\n`;
  });

  // Add CSS file
  const cssPath = path.join(distDir, 'squibview.min.css');
  const cssSize = getFileSize(cssPath);
  const cssGzipped = getGzippedSize(cssPath);
  table += `| **CSS** | ${cssSize} KB | ${cssGzipped} KB | Minified styles (required for all builds) |\n`;

  return table;
}

// Generate comparison section
function generateComparison() {
  let comparison = '\n### Build Configuration Guide\n\n';

  comparison += '**All configurations are available in both ESM and UMD formats:**\n\n';

  comparison += '| Configuration | What It Does | When to Use | Libraries Included |\n';
  comparison += '|--------------|--------------|-------------|--------------------|\n';
  comparison += '| **Standard** | Bundles core libraries for immediate use | Default choice for most projects | markdown-it, mermaid, highlight.js bundled |\n';
  comparison += '| **Autoload** | Loads libraries from CDN when content needs them | Best for performance-conscious apps | Core only, loads mermaid/hljs/mathjax/leaflet/three.js on-demand |\n';
  comparison += '| **Lean** | Minimal build, you provide all dependencies | Advanced users with existing bundler setup | None - bring your own |\n';
  comparison += '| **Standalone** | Everything bundled, no external dependencies | Offline/airgapped environments | All libraries pre-bundled (~3.8MB) |\n';

  comparison += '\n### Quick Decision Guide\n\n';

  // Get sizes for key comparisons
  const standardSize = getFileSize(path.join(distDir, 'squibview.esm.min.js'));
  const autoloadSize = getFileSize(path.join(distDir, 'squibview.autoload.esm.min.js'));
  const leanSize = getFileSize(path.join(distDir, 'squibview.esm-lean.min.js'));
  const standaloneSize = getFileSize(path.join(distDir, 'squibview.standalone.esm.min.js'));

  comparison += '- **Need it to just work?** → Use **Standard** (' + standardSize + ' KB)\n';
  comparison += '- **Want smaller initial load?** → Use **Autoload** (' + autoloadSize + ' KB, loads libraries as needed)\n';
  comparison += '- **Have a complex build system?** → Use **Lean** (' + leanSize + ' KB, you control dependencies)\n';
  comparison += '- **No internet/CDN access?** → Use **Standalone** (' + standaloneSize + ' KB, everything included)\n';

  return comparison;
}

// Generate README configuration table
function generateReadmeTable() {
  const esmStandard = {
    size: getFileSize(path.join(distDir, 'squibview.esm.min.js')),
    gzip: getGzippedSize(path.join(distDir, 'squibview.esm.min.js'))
  };
  const esmAutoload = {
    size: getFileSize(path.join(distDir, 'squibview.autoload.esm.min.js')),
    gzip: getGzippedSize(path.join(distDir, 'squibview.autoload.esm.min.js'))
  };
  const esmLean = {
    size: getFileSize(path.join(distDir, 'squibview.esm-lean.min.js')),
    gzip: getGzippedSize(path.join(distDir, 'squibview.esm-lean.min.js'))
  };
  const esmStandalone = {
    size: getFileSize(path.join(distDir, 'squibview.standalone.esm.min.js')),
    gzip: getGzippedSize(path.join(distDir, 'squibview.standalone.esm.min.js'))
  };

  let table = '| Configuration | What It Does | Best For | Size (min/gzip) | What\'s Included |\n';
  table += '|--------------|--------------|----------|-----------------|------------------|\n';
  table += `| **Autoload** 🚀 | Zero config - just works! | Easiest setup | ${esmAutoload.size}KB / ${esmAutoload.gzip}KB | Core editor + auto-loads: diagrams, math, syntax highlighting, maps, 3D |\n`;
  table += `| **Standard** | Pre-bundles common libraries | No CDN needed | ${esmStandard.size}KB / ${esmStandard.gzip}KB | Editor + diagram (mermaid) + syntax highlighting (hljs) |\n`;
  table += `| **Lean** | Minimal - you add libraries | Custom bundlers | ${esmLean.size}KB / ${esmLean.gzip}KB | Editor only - bring your own libraries |\n`;
  table += `| **Standalone** | Everything pre-bundled | Offline use | ${(parseFloat(esmStandalone.size)/1024).toFixed(1)}MB / ${(parseFloat(esmStandalone.gzip)/1024).toFixed(0)}MB | Everything - no external dependencies |\n`;

  return table;
}

// Update README with build sizes
function updateReadme() {
  const readmePath = path.join(__dirname, '..', 'README.md');
  let readme = fs.readFileSync(readmePath, 'utf-8');

  // Find and replace the table
  const tableStart = '| Configuration | What It Does | Best For | Size (min/gzip) | Libraries Included |';
  const tableEnd = '| **Standalone**';

  const startIdx = readme.indexOf(tableStart);
  if (startIdx !== -1) {
    // Find the end of the table (next empty line after Standalone row)
    let endIdx = readme.indexOf('\n\n', readme.indexOf('| **Standalone**', startIdx));
    if (endIdx === -1) endIdx = readme.indexOf('\n#', startIdx); // Or next heading

    if (endIdx !== -1) {
      const newTable = generateReadmeTable();
      readme = readme.substring(0, startIdx) + newTable + readme.substring(endIdx);
      fs.writeFileSync(readmePath, readme);
      console.log('✅ README.md updated with current build sizes');
      return true;
    }
  }

  console.log('⚠️  Could not find build size table in README.md');
  return false;
}

// Write to file
function writeToBuildSizesFile() {
  const content = '<!-- This file is auto-generated by tools/buildSizeTable.js -->\n\n' +
                  '## Build Sizes\n\n' +
                  generateTable() +
                  generateComparison() +
                  '\n<!-- End auto-generated content -->\n';

  const outputPath = path.join(__dirname, '..', 'docs', 'build-sizes.md');
  fs.writeFileSync(outputPath, content);
  console.log(`Build sizes written to ${outputPath}`);

  // Also update README
  updateReadme();

  return content;
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  writeToBuildSizesFile();

  // Also output to console
  console.log('\nBuild Size Table:\n');
  console.log(generateTable());
}

export { generateTable, generateComparison };