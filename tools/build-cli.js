#!/usr/bin/env node

/**
 * build-cli.js
 * Build script for SquibView CLI (squibv)
 * 
 * Handles:
 * - Dependency validation
 * - Version synchronization  
 * - CLI-specific optimizations
 * - Distribution preparation
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

// Colors for output
const colors = {
  info: '\x1b[36m',    // Cyan
  success: '\x1b[32m', // Green
  warning: '\x1b[33m', // Yellow
  error: '\x1b[31m',   // Red
  reset: '\x1b[0m'     // Reset
};

function log(level, message) {
  console.log(`${colors[level]}${level.toUpperCase()}${colors.reset}: ${message}`);
}

function validateDependencies() {
  log('info', 'Validating CLI dependencies...');
  
  const packagePath = resolve(projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
  
  const requiredCliDeps = [
    'commander',
    'jsdom', 
    'mathjax',
    'mermaid',
    'highlight.js'
  ];
  
  const missing = [];
  const installed = [];
  
  for (const dep of requiredCliDeps) {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      installed.push(`${dep}@${packageJson.dependencies[dep]}`);
    } else {
      missing.push(dep);
    }
  }
  
  if (missing.length > 0) {
    log('error', `Missing CLI dependencies: ${missing.join(', ')}`);
    log('error', 'Run: npm install to install missing dependencies');
    process.exit(1);
  }
  
  log('success', `CLI dependencies validated: ${installed.join(', ')}`);
}

function validateLibraryBuild() {
  log('info', 'Validating SquibView library build...');
  
  const requiredFiles = [
    'dist/squibview.esm.min.js',
    'dist/squibview.css'
  ];
  
  const missing = [];
  
  for (const file of requiredFiles) {
    const filePath = resolve(projectRoot, file);
    if (!existsSync(filePath)) {
      missing.push(file);
    }
  }
  
  if (missing.length > 0) {
    log('error', `Missing library build files: ${missing.join(', ')}`);
    log('error', 'Run: npm run build:lib first');
    process.exit(1);
  }
  
  log('success', 'SquibView library build validated');
}

function validateCliImports() {
  log('info', 'Validating CLI import paths...');
  
  const cliRendererPath = resolve(projectRoot, 'cli/src/renderer.js');
  if (!existsSync(cliRendererPath)) {
    log('error', 'CLI renderer.js not found');
    process.exit(1);
  }
  
  const rendererContent = readFileSync(cliRendererPath, 'utf8');
  
  // Check if CLI imports the correct library path
  const expectedImport = '../../dist/squibview.esm.min.js';
  if (!rendererContent.includes(expectedImport)) {
    log('warning', `CLI may have incorrect import path. Expected: ${expectedImport}`);
  }
  
  log('success', 'CLI import paths validated');
}

function runCliValidationTest() {
  log('info', 'Running CLI validation test...');
  
  try {
    const testCommand = 'echo "# Test\nHello **CLI**" | node cli/bin/squibv.js -i - -o - --quiet';
    const output = execSync(testCommand, { 
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    // Basic validation that output looks like HTML
    if (output.includes('<!DOCTYPE html>') && output.includes('<strong>CLI</strong>')) {
      log('success', 'CLI validation test passed');
    } else {
      log('error', 'CLI validation test failed - output does not look correct');
      process.exit(1);
    }
  } catch (error) {
    log('error', `CLI validation test failed: ${error.message}`);
    process.exit(1);
  }
}

function updateCliVersion() {
  log('info', 'Synchronizing CLI version...');
  
  const packageJson = JSON.parse(readFileSync(resolve(projectRoot, 'package.json'), 'utf8'));
  const version = packageJson.version;
  
  // The CLI gets its version from the main package.json, so no additional sync needed
  // But we could add CLI-specific version tracking here if needed
  
  log('success', `CLI version synchronized: ${version}`);
}

function generateCliManifest() {
  log('info', 'Generating CLI build manifest...');
  
  const packageJson = JSON.parse(readFileSync(resolve(projectRoot, 'package.json'), 'utf8'));
  
  const manifest = {
    name: 'squibv',
    version: packageJson.version,
    buildTime: new Date().toISOString(),
    dependencies: {
      commander: packageJson.dependencies.commander,
      jsdom: packageJson.dependencies.jsdom,
      mathjax: packageJson.dependencies.mathjax,
      mermaid: packageJson.dependencies.mermaid,
      'highlight.js': packageJson.dependencies['highlight.js']
    },
    libraryVersion: packageJson.version,
    node: process.version
  };
  
  const manifestPath = resolve(projectRoot, 'cli/.build-manifest.json');
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  log('success', `CLI build manifest generated: cli/.build-manifest.json`);
}

function main() {
  console.log('🔧 Building SquibView CLI (squibv)...\n');
  
  try {
    validateDependencies();
    validateLibraryBuild();
    validateCliImports();
    updateCliVersion();
    runCliValidationTest();
    generateCliManifest();
    
    console.log('\n✅ CLI build completed successfully!');
    console.log('📦 CLI is ready for distribution');
    
  } catch (error) {
    log('error', `CLI build failed: ${error.message}`);
    process.exit(1);
  }
}

main();