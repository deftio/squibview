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
  .option('--bundle-offline', 'Bundle MathJax, Mermaid, and highlight.js locally for offline use')
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
  .option('--bundle-offline', 'Bundle MathJax, Mermaid, and highlight.js locally for offline use')
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