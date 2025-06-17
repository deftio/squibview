/**
 * index.js
 * Main CLI functionality with file I/O and build process
 */

import { readFileSync, writeFileSync, existsSync, statSync, watchFile, unwatchFile, createWriteStream } from 'fs';
import { extname, basename, resolve, dirname } from 'path';
import { renderMarkdownToHTML } from './renderer.js';
import { generateStandaloneHTML, extractTitleFromContent } from './html-generator.js';

/**
 * Main build function
 * @param {string} inputFile - Path to input markdown file
 * @param {Object} options - Build options
 */
export async function build(inputFile, options = {}) {
  const {
    input,
    output,
    standalone = true,
    css,
    bundleOffline = false,
    watch = false,
    log,
    quiet = false
  } = options;

  // Set up logging
  const logger = createLogger(log, quiet);

  // Determine input source
  let inputPath = null;
  let isStdin = false;
  
  if (input === '-') {
    // Reading from stdin
    isStdin = true;
    logger.info('Reading from stdin...');
  } else if (input) {
    // Use explicit input option
    inputPath = resolve(input);
  } else if (inputFile) {
    // Use positional argument
    inputPath = resolve(inputFile);
  } else {
    throw new Error('Input source required. Use file argument, -i flag, or -i - for stdin');
  }

  // Validate input file if not stdin
  if (!isStdin) {
    try {
      validateFile(inputPath, 'Input file');
    } catch (error) {
      throw new Error(`Input file error: ${error.message}`);
    }

    if (!inputPath.toLowerCase().endsWith('.md')) {
      throw new Error('Input file must be a Markdown file (.md extension)');
    }
  }

  // Determine output destination
  let outputPath = null;
  let isStdout = false;
  
  if (output === '-' || output === 'stdout') {
    isStdout = true;
    logger.info('Writing to stdout...');
  } else if (output) {
    outputPath = resolve(output);
  } else if (!isStdin && inputPath) {
    outputPath = getDefaultOutputPath(inputPath);
  } else {
    // Default to stdout for stdin input
    isStdout = true;
  }

  // Validate output directory if not stdout
  if (!isStdout) {
    const outputDir = dirname(outputPath);
    try {
      validateOutputDirectory(outputDir);
    } catch (error) {
      throw new Error(`Output directory error: ${error.message}`);
    }
  }

  // Validate custom CSS file if provided
  if (css) {
    try {
      validateFile(resolve(css), 'CSS file');
    } catch (error) {
      throw new Error(`CSS file error: ${error.message}`);
    }
  }

  // Prevent watch mode with pipes
  if (watch && (isStdin || isStdout)) {
    throw new Error('Watch mode is not compatible with stdin/stdout pipes');
  }

  // Build the content
  await buildContent(inputPath, outputPath, isStdin, isStdout, options, logger);

  if (!isStdout) {
    const inputName = isStdin ? 'stdin' : basename(inputPath);
    const outputName = basename(outputPath);
    logger.success(`✓ Built ${inputName} → ${outputName}`);
  }

  // Set up watch mode if requested
  if (watch) {
    console.log(`👀 Watching ${basename(inputFile)} for changes...`);
    console.log('Press Ctrl+C to stop watching');
    
    let isBuilding = false;
    
    watchFile(inputPath, { interval: 1000 }, async (curr, prev) => {
      if (isBuilding) return; // Prevent multiple simultaneous builds
      
      try {
        isBuilding = true;
        console.log(`📝 File changed, rebuilding...`);
        await buildFile(inputPath, outputPath, options);
        console.log(`✓ Rebuilt ${basename(inputFile)} → ${basename(outputPath)}`);
      } catch (error) {
        console.error(`❌ Build failed: ${error.message}`);
      } finally {
        isBuilding = false;
      }
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n👋 Stopping watch mode...');
      unwatchFile(inputPath);
      process.exit(0);
    });

    // Keep the process alive
    return new Promise(() => {});
  }
}

/**
 * Reads content from stdin
 * @returns {Promise<string>} - Content from stdin
 */
async function readStdin() {
  return new Promise((resolve, reject) => {
    let content = '';
    
    process.stdin.setEncoding('utf8');
    
    process.stdin.on('data', (chunk) => {
      content += chunk;
    });
    
    process.stdin.on('end', () => {
      resolve(content);
    });
    
    process.stdin.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Builds content from input to output
 * @param {string} inputPath - Input file path (null for stdin)
 * @param {string} outputPath - Output file path (null for stdout)
 * @param {boolean} isStdin - Reading from stdin
 * @param {boolean} isStdout - Writing to stdout
 * @param {Object} options - Build options
 * @param {Object} logger - Logger instance
 */
async function buildContent(inputPath, outputPath, isStdin, isStdout, options = {}, logger) {
  const { css, standalone = true, bundleOffline = false } = options;

  try {
    // Read input content
    let markdownContent;
    
    if (isStdin) {
      try {
        markdownContent = await readStdin();
      } catch (error) {
        throw new Error(`Failed to read from stdin: ${error.message}`);
      }
    } else {
      try {
        markdownContent = readFileSync(inputPath, 'utf8');
      } catch (error) {
        if (error.code === 'EACCES') {
          throw new Error(`Permission denied reading input file: ${inputPath}`);
        }
        throw new Error(`Failed to read input file: ${error.message}`);
      }
    }

    if (!markdownContent.trim()) {
      throw new Error('Input content is empty');
    }

    // Render markdown to HTML using SquibView
    let renderedHTML;
    try {
      renderedHTML = await renderMarkdownToHTML(markdownContent);
    } catch (error) {
      throw new Error(`Failed to render markdown: ${error.message}`);
    }

    // Generate complete HTML document
    const title = extractTitleFromContent(renderedHTML) || (isStdin ? 'Document' : basename(inputPath, '.md'));
    
    let completeHTML;
    try {
      completeHTML = generateStandaloneHTML(renderedHTML, {
        title,
        css: css ? resolve(css) : null,
        includeDefaultCSS: true,
        bundleOffline
      });
    } catch (error) {
      throw new Error(`Failed to generate HTML: ${error.message}`);
    }

    // Write output
    if (isStdout) {
      // Write to stdout
      process.stdout.write(completeHTML);
    } else {
      // Write to file
      try {
        writeFileSync(outputPath, completeHTML, 'utf8');
      } catch (error) {
        if (error.code === 'EACCES') {
          throw new Error(`Permission denied writing output file: ${outputPath}`);
        }
        if (error.code === 'ENOSPC') {
          throw new Error(`No space left on device when writing: ${outputPath}`);
        }
        throw new Error(`Failed to write output file: ${error.message}`);
      }
    }

  } catch (error) {
    throw new Error(`Build failed: ${error.message}`);
  }
}

/**
 * Gets the default output path for an input file
 * @param {string} inputPath - Input file path
 * @returns {string} - Default output path
 */
function getDefaultOutputPath(inputPath) {
  const dir = dirname(inputPath);
  const name = basename(inputPath, '.md');
  return resolve(dir, `${name}.html`);
}

/**
 * Validates that a file exists and is readable
 * @param {string} filePath - File path to validate
 * @param {string} fileType - Description of file type for error messages
 */
export function validateFile(filePath, fileType = 'File') {
  if (!existsSync(filePath)) {
    throw new Error(`${fileType} not found: ${filePath}`);
  }

  try {
    const stats = statSync(filePath);
    if (!stats.isFile()) {
      throw new Error(`${fileType} is not a regular file: ${filePath}`);
    }
  } catch (error) {
    if (error.code === 'EACCES') {
      throw new Error(`Permission denied reading ${fileType.toLowerCase()}: ${filePath}`);
    }
    throw error;
  }
}

/**
 * Validates that a directory exists and is writable
 * @param {string} dirPath - Directory path to validate
 */
export function validateOutputDirectory(dirPath) {
  if (!existsSync(dirPath)) {
    throw new Error(`Output directory does not exist: ${dirPath}`);
  }

  try {
    const stats = statSync(dirPath);
    if (!stats.isDirectory()) {
      throw new Error(`Output path is not a directory: ${dirPath}`);
    }
  } catch (error) {
    if (error.code === 'EACCES') {
      throw new Error(`Permission denied accessing output directory: ${dirPath}`);
    }
    throw error;
  }
}

/**
 * Creates a logger instance
 * @param {string} logFile - Log file path (optional)
 * @param {boolean} quiet - Suppress info messages
 * @returns {Object} - Logger object
 */
function createLogger(logFile, quiet = false) {
  let logStream = null;
  
  if (logFile) {
    logStream = createWriteStream(logFile, { flags: 'a' });
  }
  
  const log = (level, message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}\n`;
    
    // Write to log file if specified
    if (logStream) {
      logStream.write(logMessage);
    }
    
    // Write to stderr unless quiet (never to stdout to avoid corrupting output)
    if (!quiet || level === 'error') {
      process.stderr.write(`${level === 'error' ? '❌' : level === 'success' ? '✅' : 'ℹ️'} ${message}\n`);
    }
  };
  
  return {
    info: (message) => log('info', message),
    success: (message) => log('success', message),
    error: (message) => log('error', message),
    close: () => {
      if (logStream) {
        logStream.end();
      }
    }
  };
}