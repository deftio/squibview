/**
 * style-generator.js
 * Generates CSS from configuration objects
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Loads style configuration from file or uses defaults
 * @param {string|null} configPath - Path to config file, null for defaults
 * @returns {Object} - Style configuration object
 */
export function loadStyleConfig(configPath = null) {
  const defaultConfigPath = join(__dirname, '../config/default-html-style.json');
  
  try {
    if (configPath) {
      // Load custom config and merge with defaults
      const defaultConfig = JSON.parse(readFileSync(defaultConfigPath, 'utf8'));
      const customConfig = JSON.parse(readFileSync(configPath, 'utf8'));
      return mergeDeep(defaultConfig, customConfig);
    } else {
      // Load default config
      return JSON.parse(readFileSync(defaultConfigPath, 'utf8'));
    }
  } catch (error) {
    console.warn(`Warning: Could not load style config from ${configPath || defaultConfigPath}: ${error.message}`);
    return getHardcodedDefaults();
  }
}

/**
 * Applies parameter overrides to config
 * @param {Object} config - Base configuration
 * @param {Object} overrides - Parameter overrides in dot notation (e.g., {"layout.maxWidth": "1200px"})
 * @returns {Object} - Updated configuration
 */
export function applyConfigOverrides(config, overrides) {
  const result = JSON.parse(JSON.stringify(config)); // Deep clone
  
  for (const [path, value] of Object.entries(overrides)) {
    setNestedProperty(result, path, value);
  }
  
  return result;
}

/**
 * Generates CSS from style configuration
 * @param {Object} config - Style configuration object
 * @returns {string} - Generated CSS
 */
export function generateCSS(config) {
  const { typography, colors, layout, spacing, borders, borderRadius, fontWeight, breakpoints } = config;
  
  return `
/* SquibView CLI Generated Styles */
body {
  font-family: ${typography.fontFamily};
  line-height: ${typography.lineHeight};
  color: ${colors.text};
  max-width: ${layout.maxWidth};
  margin: ${layout.margin};
  padding: ${layout.padding};
  background-color: ${colors.background};
}

h1, h2, h3, h4, h5, h6 {
  margin-top: ${spacing.headingTopMargin};
  margin-bottom: ${spacing.headingBottomMargin};
  font-weight: ${fontWeight.headings};
  line-height: 1.25;
}

h1 { 
  font-size: ${typography.fontSize.h1};
  ${borders.h1.enabled ? `border-bottom: ${borders.h1.style}; padding-bottom: ${borders.h1.paddingBottom};` : ''}
}
h2 { 
  font-size: ${typography.fontSize.h2};
  ${borders.h2.enabled ? `border-bottom: ${borders.h2.style}; padding-bottom: ${borders.h2.paddingBottom};` : ''}
}
h3 { font-size: ${typography.fontSize.h3}; }
h4 { font-size: ${typography.fontSize.h4}; }
h5 { font-size: ${typography.fontSize.h5}; }
h6 { font-size: ${typography.fontSize.h6}; color: ${colors.h6}; }

p { margin-bottom: ${spacing.paragraphBottomMargin}; }

a {
  color: ${colors.link};
  text-decoration: none;
}

a:hover {
  color: ${colors.linkHover};
  text-decoration: underline;
}

ul, ol {
  margin-bottom: ${spacing.paragraphBottomMargin};
  padding-left: ${spacing.listPadding};
}

li {
  margin-bottom: ${spacing.listItemMargin};
}

blockquote {
  margin: ${spacing.paragraphBottomMargin} 0;
  padding: ${spacing.blockquotePadding};
  border-left: ${borders.blockquoteLeft};
  background-color: ${colors.blockquoteBackground};
  color: ${colors.blockquote};
}

code {
  background-color: ${colors.codeBackground};
  padding: ${spacing.codePadding};
  border-radius: ${borderRadius.code};
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.85em;
}

pre {
  background-color: ${colors.preBackground};
  padding: ${spacing.prePadding};
  margin-bottom: ${spacing.paragraphBottomMargin};
  overflow-x: auto;
  border-radius: ${borderRadius.pre};
}

pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: ${spacing.paragraphBottomMargin};
}

th, td {
  border: ${borders.table};
  padding: ${spacing.tableCellPadding};
  text-align: left;
}

th {
  background-color: ${colors.tableHeaderBackground};
  font-weight: ${fontWeight.bold};
}

img {
  max-width: 100%;
  height: auto;
  margin-bottom: ${spacing.imageBottomMargin};
}

hr {
  border: none;
  border-top: 1px solid #ddd;
  margin: 2rem 0;
}

/* Badge images - inline display */
p img {
  display: inline;
  margin: 0 2px;
  vertical-align: middle;
}

/* Math styling */
.MathJax {
  overflow-x: auto;
  overflow-y: hidden;
}

/* Responsive design */
@media (max-width: ${breakpoints.mobile}) {
  body {
    padding: ${layout.mobilePadding};
  }
  
  table {
    font-size: 0.875rem;
  }
  
  th, td {
    padding: 0.25rem;
  }
}

/* Print styles */
@media print {
  body {
    padding: 0;
    color: #000;
  }
  
  a {
    color: #000;
    text-decoration: underline;
  }
  
  pre, blockquote {
    page-break-inside: avoid;
  }
  
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
  }
}
`.trim();
}

/**
 * Deep merge two objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} - Merged object
 */
function mergeDeep(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = mergeDeep(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

/**
 * Set nested property using dot notation
 * @param {Object} obj - Object to modify
 * @param {string} path - Dot notation path (e.g., "layout.maxWidth")
 * @param {*} value - Value to set
 */
function setNestedProperty(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  
  current[keys[keys.length - 1]] = value;
}

/**
 * Hardcoded fallback defaults if config file fails to load
 * @returns {Object} - Default configuration
 */
function getHardcodedDefaults() {
  return {
    typography: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
      lineHeight: 1.6,
      fontSize: {
        h1: "2rem",
        h2: "1.5rem", 
        h3: "1.25rem",
        h4: "1rem",
        h5: "0.875rem",
        h6: "0.85rem"
      }
    },
    colors: {
      text: "#333",
      background: "#fff",
      link: "#0066cc",
      linkHover: "#0066cc",
      h6: "#666",
      blockquote: "#666",
      blockquoteBorder: "#ddd",
      blockquoteBackground: "#f9f9f9",
      codeBackground: "#f5f5f5",
      preBackground: "#f8f8f8",
      tableBorder: "#ddd",
      tableHeaderBackground: "#f2f2f2"
    },
    layout: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "1rem 3rem",
      mobilePadding: "0.5rem 1.5rem"
    },
    spacing: {
      headingTopMargin: "1.5em",
      headingBottomMargin: "0.5em",
      paragraphBottomMargin: "1rem",
      listPadding: "2rem",
      listItemMargin: "0.25rem",
      blockquotePadding: "0.5rem 1rem",
      codePadding: "0.2em 0.4em",
      prePadding: "1rem",
      tableCellPadding: "0.5rem",
      imageBottomMargin: "1rem"
    },
    borders: {
      h1: { enabled: false, style: "2px solid #eee", paddingBottom: "0.3em" },
      h2: { enabled: false, style: "1px solid #eee", paddingBottom: "0.3em" },
      blockquoteLeft: "4px solid #ddd",
      table: "1px solid #ddd"
    },
    borderRadius: {
      code: "3px",
      pre: "4px"
    },
    fontWeight: {
      headings: 600,
      bold: "bold"
    },
    breakpoints: {
      mobile: "768px"
    }
  };
}