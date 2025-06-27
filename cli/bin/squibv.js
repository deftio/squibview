#!/usr/bin/env node

/**
 * SquibView CLI
 * Command-line interface for converting Markdown to HTML using SquibView
 */

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { build } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
const packageJson = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8'));

const program = new Command();

/**
 * Collects style parameter overrides from command line
 * @param {string} value - Key=value pair (e.g., "layout.maxWidth=1200px")
 * @param {Object} previous - Previous collected parameters
 * @returns {Object} - Updated parameters object
 */
function collectStyleParams(value, previous) {
  const [key, val] = value.split('=');
  if (!key || val === undefined) {
    throw new Error(`Invalid style parameter format: ${value}. Use key=value format.`);
  }
  return { ...previous, [key]: val };
}

program
  .name('squibv')
  .description(`Convert Markdown files to high-quality HTML using SquibView (v${packageJson.version})`)
  .version(packageJson.version);

// Build command (and default)
program
  .command('build')
  .description('Convert Markdown file to HTML')
  .argument('[file]', 'Input Markdown file')
  .option('-i, --input <source>', 'Input source (file path or "-" for stdin)')
  .option('-o, --output <dest>', 'Output destination (file path, "-" or "stdout" for stdout)')
  .option('-s, --standalone', 'Create self-contained HTML file (default: true)', true)
  .option('--css <file>', 'Custom CSS file to override default styles')
  .option('--html-style-config <file>', 'HTML style configuration file (JSON)')
  .option('--html-style-param <key=value>', 'Override style parameter (e.g. layout.maxWidth=1200px)', collectStyleParams, {})
  .option('--convert-md-links', 'Convert .md links to .html links for documentation generation')
  .option('--bundle-offline', 'Bundle MathJax, Mermaid, and highlight.js locally for offline use')
  .option('--favicon <file>', 'Custom favicon file (PNG, ICO, SVG) or URL')
  .option('--log <file>', 'Log file for messages (default: stderr)')
  .option('--quiet', 'Suppress progress messages')
  .option('-w, --watch', 'Watch input file for changes and rebuild automatically')
  .action(async (file, options) => {
    try {
      await build(file, options);
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

// Make build the default command when no command is specified
program
  .argument('[file]', 'Input Markdown file')
  .option('-i, --input <source>', 'Input source (file path or "-" for stdin)')
  .option('-o, --output <dest>', 'Output destination (file path, "-" or "stdout" for stdout)')
  .option('-s, --standalone', 'Create self-contained HTML file (default: true)', true)
  .option('--css <file>', 'Custom CSS file to override default styles')
  .option('--html-style-config <file>', 'HTML style configuration file (JSON)')
  .option('--html-style-param <key=value>', 'Override style parameter (e.g. layout.maxWidth=1200px)', collectStyleParams, {})
  .option('--convert-md-links', 'Convert .md links to .html links for documentation generation')
  .option('--bundle-offline', 'Bundle MathJax, Mermaid, and highlight.js locally for offline use')
  .option('--favicon <file>', 'Custom favicon file (PNG, ICO, SVG) or URL')
  .option('--log <file>', 'Log file for messages (default: stderr)')
  .option('--quiet', 'Suppress progress messages')
  .option('-w, --watch', 'Watch input file for changes and rebuild automatically')
  .action(async (file, options) => {
    if (file || options.input) {
      try {
        await build(file, options);
      } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
      }
    } else {
      program.help();
    }
  });

program.parse();