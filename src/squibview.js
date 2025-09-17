/* SquibView a live md/html/etc Editor/renderer with copy support
 supports markdown, html, and split view
 supports copying of formatted html and markdown
 supports copying of images as data urls
 supports copying of svg as png
 supports copying of tables as formatted tables
 supports copying of code blocks as formatted tables
 supports copying of math blocks as formatted math
 by deftio (c) 2024
*/

// Import required libraries
import TinyEmitter from 'tiny-emitter';
import DiffMatchPatch from 'diff-match-patch';
import './squibview.css'; // Import the main CSS file
import { VERSION, REPO_URL } from './version.js'; // Import version info
import EventEmitter3 from 'eventemitter3';
import MarkdownIt from 'markdown-it'; // Import markdown-it
import Papa from 'papaparse';
import HtmlToMarkdown from './HtmlToMarkdown.js';
import { RevisionHistory } from './RevisionHistory.js';

// Import highlight.js for syntax highlighting
// Use dynamic lookup to maintain compatibility with different build targets
function getHljs() {
  try {
    if (typeof window !== 'undefined' && window.hljs) {
      return window.hljs;
    }
    if (typeof global !== 'undefined' && global.hljs) {
      return global.hljs;
    }
  } catch (e) {
    // Ignore errors
  }
  return null;
}

// Fix for development mode
/*
try {
  if (!TinyEmitter || !DiffMatchPatch) {
    // If direct imports failed, try the shim
    const shim = await import('./import-shim.js');
    if (!TinyEmitter && shim.TinyEmitter) TinyEmitter = shim.TinyEmitter;
    if (!DiffMatchPatch && shim.DiffMatchPatch) DiffMatchPatch = shim.DiffMatchPatch;
  }
} catch (e) {
  console.warn('Import shim not available, continuing with direct imports', e);
}
*/

/**
 * SquibView is a lightweight editor that live-renders different content types
 */
class SquibView {
  static defaultOptions = {
    initialContent: '',
    inputContentType: 'md', // 'md', 'html', 'reveal', 'csv' or 'tsv'
    showControls: true,
    titleShow: false,
    titleContent: '',
    initialView: 'split',
    baseClass: 'squibview',
    onReplaceSelectedText: null,
    preserveImageTags: true, // Changed default to true
    showLineNumbers: false,  // Enable/disable line numbers
    lineNumberStart: 1,      // Starting line number
    lineNumberMinDigits: 2,   // Minimum digits (e.g., 01, 02)
    autoload_deps: null      // Default off, can be { all: true } or fine-grained control
  };

  // Default CDN URLs for autoloading dependencies
  static DEFAULT_CDN_URLS = {
    mermaid: {
      script: 'https://unpkg.com/mermaid@10.6.1/dist/mermaid.min.js'
    },
    hljs: {
      script: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',
      css: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'
    },
    mathjax: {
      script: 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js'
    },
    leaflet: {
      script: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
      css: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    },
    three: {
      script: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    },
    stlLoader: {
      script: 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/STLLoader.js'
    },
    orbitControls: {
      script: 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js'
    }
  };

  static version = {
    version: VERSION,
    url: REPO_URL
  };

  /**
   * Creates a new SquibView instance.
   * 
   * @param {HTMLElement|string} element - The DOM element or selector where the editor will be mounted
   * @param {Object} options - Configuration options for the editor
   * @param {string} [options.initialContent=''] - Initial content to load
   * @param {string} [options.inputContentType='md'] - Type of the initial content ('md', 'html', 'reveal', 'csv', 'tsv')
   * @param {boolean} [options.showControls=true] - Whether to show the control buttons
   * @param {boolean} [options.titleShow=false] - Whether to show the title section
   * @param {string} [options.titleContent=''] - Content for the title section
   * @param {string} [options.initialView='split'] - Initial view mode ('src', 'html', 'split')
   * @param {string} [options.baseClass='squibview'] - Base CSS class for styling
   * @param {Object|null} [options.autoload_deps=null] - Configuration for autoloading dependencies. null = disabled (default), { all: true } = enable all, or fine-grained control per library
   * @throws {Error} Throws if the container element is not found
   */
  constructor(element, options = {}) {
    this.options = { ...SquibView.defaultOptions, ...options };
    
    this.container = typeof element === 'string' ? document.querySelector(element) : element;

    if (!this.container) {
      throw new Error('Container element not found');
    }

    // Initialize autoload configuration
    this._initializeAutoload();

    // Initialize event emitter for plugin communication and selection events
    this.events = new TinyEmitter();
    
    // Initialize revision manager
    this.revisionManager = new RevisionHistory();
    
    // Track last selection data
    this.lastSelectionData = null;
    
    // Store text selection handlers
    this._onTextReplacementHandler = null;
    
    // Initialize renderer registry
    this.renderers = {};
    
    // Initialize HTML to Markdown converter
    this._initializeHtmlToMarkdown();
    
    // Initialize libraries and register default renderers
    this.initializeLibraries();
    this.registerDefaultRenderers();
    
    // Create DOM structure
    this.createStructure();
    this.initializeEventHandlers();
    this.initializeResizeObserver();
    
    // Initialize line numbers if enabled
    if (this.options.showLineNumbers) {
      this.initializeLineNumbers();
    }
    
    // Set initial content
    if (this.options.initialContent) {
      this.revisionManager.initialize(this.options.initialContent, this.options.inputContentType);
      this.setContent(this.options.initialContent, this.options.inputContentType, false);
    } else {
      this.revisionManager.initialize('', this.options.inputContentType);
    }
    
    // Set initial view
    this.setView(this.options.initialView);
    
    // Update UI elements based on current content type
    this.updateTypeButtons();
    
    // Set up text replacement handler if provided in options
    if (this.options.onReplaceSelectedText) {
      this.onReplaceSelectedText = this.options.onReplaceSelectedText;
    }
  }

  /**
   * Initialize autoload configuration
   * @private
   */
  _initializeAutoload() {
    const autoloadConfig = this.options.autoload_deps;

    // If autoload is disabled (null or false), do nothing
    if (!autoloadConfig) {
      this.autoloadConfig = null;
      return;
    }

    // Parse the configuration
    this.autoloadConfig = {
      enabled: true,
      cdnUrls: { ...SquibView.DEFAULT_CDN_URLS, ...(autoloadConfig.cdnUrls || {}) },
      libraries: {}
    };

    // Helper to parse library config
    const parseLibConfig = (libName, config) => {
      // If 'all' is set, apply to all libraries
      if (config.all === true) {
        return { strategy: 'ondemand' };
      } else if (config.all === 'auto') {
        return { strategy: 'auto' };
      } else if (config.all === false) {
        return { strategy: 'none' };
      }

      // Check specific library config
      const libConfig = config[libName];

      if (libConfig === false || libConfig === 'none') {
        return { strategy: 'none' };
      } else if (libConfig === true || libConfig === 'ondemand') {
        return { strategy: 'ondemand' };
      } else if (libConfig === 'auto') {
        return { strategy: 'auto' };
      } else if (typeof libConfig === 'function') {
        return { strategy: 'custom', handler: libConfig };
      } else if (typeof libConfig === 'object') {
        return libConfig;
      }

      // Default based on 'all' setting or ondemand
      return config.all ? { strategy: 'ondemand' } : { strategy: 'none' };
    };

    // Configure each library
    ['mermaid', 'hljs', 'mathjax', 'leaflet', 'three'].forEach(lib => {
      this.autoloadConfig.libraries[lib] = parseLibConfig(lib, autoloadConfig);
    });

    // Track loaded libraries
    this.loadedLibraries = new Set();
    this.loadingPromises = {};

    // Load 'auto' libraries immediately after init
    setTimeout(() => this._loadAutoLibraries(), 0);
  }

  /**
   * Load libraries configured with 'auto' strategy
   * @private
   */
  async _loadAutoLibraries() {
    if (!this.autoloadConfig || !this.autoloadConfig.enabled) return;

    for (const [libName, config] of Object.entries(this.autoloadConfig.libraries)) {
      if (config.strategy === 'auto') {
        await this._autoloadLibrary(libName);
      }
    }
  }

  /**
   * Load a script dynamically
   * @private
   */
  _loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  /**
   * Load a CSS file dynamically
   * @private
   */
  _loadCSS(href) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`link[href="${href}"]`)) {
        resolve();
        return;
      }

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = resolve;
      link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
      document.head.appendChild(link);
    });
  }

  /**
   * Autoload a specific library
   * @private
   */
  async _autoloadLibrary(libName) {
    if (!this.autoloadConfig || !this.autoloadConfig.enabled) return false;

    const config = this.autoloadConfig.libraries[libName];
    if (!config || config.strategy === 'none') return false;

    // Check if already loaded
    if (this.loadedLibraries.has(libName)) return true;

    // Check if library is already available
    if (this._isLibraryLoaded(libName)) {
      this.loadedLibraries.add(libName);
      return true;
    }

    // Handle custom loading strategy
    if (config.strategy === 'custom' && config.handler) {
      const result = await config.handler();
      if (result) this.loadedLibraries.add(libName);
      return result;
    }

    // Check if already loading
    if (this.loadingPromises[libName]) {
      return this.loadingPromises[libName];
    }

    // Start loading
    const cdnConfig = this.autoloadConfig.cdnUrls[libName];
    if (!cdnConfig) return false;

    this.loadingPromises[libName] = this._loadLibraryAssets(libName, cdnConfig);

    try {
      const result = await this.loadingPromises[libName];
      if (result) {
        this.loadedLibraries.add(libName);
        // Re-initialize if needed
        if (libName === 'mermaid') {
          this.initializeLibraries();
        }
      }
      return result;
    } finally {
      delete this.loadingPromises[libName];
    }
  }

  /**
   * Load library assets (script and optional CSS)
   * @private
   */
  async _loadLibraryAssets(libName, cdnConfig) {
    try {
      const promises = [];

      if (cdnConfig.script) {
        promises.push(this._loadScript(cdnConfig.script));
      }

      if (cdnConfig.css) {
        promises.push(this._loadCSS(cdnConfig.css));
      }

      await Promise.all(promises);

      // Wait for library to be available
      await this._waitForLibrary(libName);

      // Special handling for Three.js - load additional dependencies after THREE is available
      if (libName === 'three' && window.THREE) {
        // STLLoader and OrbitControls need THREE to be globally available
        if (this.autoloadConfig.cdnUrls.stlLoader) {
          await this._loadScript(this.autoloadConfig.cdnUrls.stlLoader.script);
        }
        if (this.autoloadConfig.cdnUrls.orbitControls) {
          await this._loadScript(this.autoloadConfig.cdnUrls.orbitControls.script);
        }
      }

      return this._isLibraryLoaded(libName);
    } catch (err) {
      if (this.autoloadConfig.debug) {
        console.error(`Failed to load ${libName}:`, err);
      }
      return false;
    }
  }

  /**
   * Wait for a library to become available
   * @private
   */
  _waitForLibrary(libName, maxAttempts = 20) {
    return new Promise((resolve) => {
      let attempts = 0;
      const check = () => {
        if (this._isLibraryLoaded(libName) || attempts >= maxAttempts) {
          resolve();
        } else {
          attempts++;
          setTimeout(check, 100);
        }
      };
      check();
    });
  }

  /**
   * Check if a library is loaded
   * @private
   */
  _isLibraryLoaded(libName) {
    switch (libName) {
      case 'mermaid':
        return typeof window !== 'undefined' && typeof window.mermaid !== 'undefined';
      case 'hljs':
        return typeof window !== 'undefined' && typeof window.hljs !== 'undefined';
      case 'mathjax':
        return typeof window !== 'undefined' && typeof window.MathJax !== 'undefined';
      case 'leaflet':
        return typeof window !== 'undefined' && typeof window.L !== 'undefined';
      case 'three':
        return typeof window !== 'undefined' && typeof window.THREE !== 'undefined';
      default:
        return false;
    }
  }

  /**
   * Check content and autoload required libraries
   * @private
   */
  async _checkAndAutoloadLibraries(content) {
    if (!this.autoloadConfig || !this.autoloadConfig.enabled) return;

    const promises = [];

    // Check for mermaid diagrams
    if (content.includes('```mermaid')) {
      const config = this.autoloadConfig.libraries.mermaid;
      if (config && config.strategy === 'ondemand') {
        promises.push(this._autoloadLibrary('mermaid'));
      }
    }

    // Check for code blocks (for syntax highlighting)
    if (/```\w+/.test(content)) {
      const config = this.autoloadConfig.libraries.hljs;
      if (config && config.strategy === 'ondemand') {
        promises.push(this._autoloadLibrary('hljs'));
      }
    }

    // Check for math content
    if (content.includes('$$') || content.includes('```math')) {
      const config = this.autoloadConfig.libraries.mathjax;
      if (config && config.strategy === 'ondemand') {
        promises.push(this._autoloadLibrary('mathjax'));
      }
    }

    // Check for GeoJSON/TopoJSON
    if (content.includes('```geojson') || content.includes('```topojson')) {
      const config = this.autoloadConfig.libraries.leaflet;
      if (config && config.strategy === 'ondemand') {
        promises.push(this._autoloadLibrary('leaflet'));
      }
    }

    // Check for STL 3D models
    if (content.includes('```stl')) {
      const config = this.autoloadConfig.libraries.three;
      if (config && config.strategy === 'ondemand') {
        promises.push(this._autoloadLibrary('three'));
      }
    }

    // Wait for all libraries to load
    if (promises.length > 0) {
      await Promise.all(promises);
    }
  }

  /**
   * Initialize the HTML to Markdown converter
   *
   * @private
   */
  async _initializeHtmlToMarkdown() {
    try {
      // Try to load synchronously first for better performance
      if (typeof HtmlToMarkdown !== 'undefined') {
        // If HtmlToMarkdown is already available globally (e.g., in UMD build)
        this._htmlToMarkdownConverter = new HtmlToMarkdown({
          cacheSize: 20 // Cache up to 20 recent conversions for better performance
        });
      } else {
        // Fall back to dynamic import if needed
        const module = await import('./HtmlToMarkdown.js');
        const HtmlToMarkdownClass = module.default;
        this._htmlToMarkdownConverter = new HtmlToMarkdownClass({
          cacheSize: 20
        });
      }
    } catch (err) {
      console.error('Failed to load HtmlToMarkdown module:', err);
      // Provide a minimal fallback implementation
      this._htmlToMarkdownConverter = {
        convert: (html) => {
          const div = document.createElement('div');
          div.innerHTML = html;
          return div.textContent;
        }
      };
    }
  }

  /**
   * Initializes the required libraries for rendering content.
   * Sets up Mermaid for diagrams and markdown-it for Markdown processing.
   * 
   * @private
   */
  initializeLibraries() {
    // Initialize Mermaid for diagram rendering if available
    if (typeof window !== 'undefined' && window.mermaid) {
      window.mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'loose',
        theme: 'default',
        errorCallback: function (error) {
          console.warn("Mermaid error:", error);
          return "<div class='mermaid-error'></div>";
        }
      });
      window.mermaid.init(undefined, ".mermaid");
    }
    
    // Initialize markdown-it with options and syntax highlighting
    this.md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (str, lang) => {
        const hljs = getHljs();
        if (lang && hljs && hljs.getLanguage && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (e) {
            // Fallback to no highlighting on error
          }
        }
        return '';
      }
    });

    // Configure custom fence rendering for markdown-it
    const defaultFence = this.md.renderer.rules.fence ||
      ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

    this.md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const info = token.info.trim().toLowerCase(); // Normalize to lowercase
      const content = token.content; // Raw content from the fenced block

      // Handle Mermaid diagrams
      if (info === 'mermaid') {
        const escapedContent = this.md.utils.escapeHtml(content);
        return `<div class="mermaid" data-source-type="mermaid">${escapedContent}</div>`;
      }

      // Handle SVG directly
      if (info === 'svg') {
        const escapeForAttribute = (str) => {
          return str.replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#x27;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
        };
        const escapedSource = escapeForAttribute(content);
        return `<div class="svg-container" data-source-type="svg" data-original-source="${escapedSource}">${content}</div>`;
      }

      // Handle GeoJSON maps
      if (info === 'geojson') {
        const escapedContent = this.md.utils.escapeHtml(content);
        const escapedSource = this.md.utils.escapeHtml(content);
        return `<div class="geojson-container" data-source-type="geojson" data-original-source="${escapedSource}">${escapedContent}</div>`;
      }

      // Handle TopoJSON maps  
      if (info === 'topojson') {
        const escapedContent = this.md.utils.escapeHtml(content);
        const escapedSource = this.md.utils.escapeHtml(content);
        return `<div class="topojson-container" data-source-type="topojson" data-original-source="${escapedSource}">${escapedContent}</div>`;
      }

      // Handle STL 3D models
      if (info === 'stl') {
        const escapedContent = this.md.utils.escapeHtml(content);
        const escapedSource = this.md.utils.escapeHtml(content);
        return `<div class="stl-container" data-source-type="stl" data-original-source="${escapedSource}">${escapedContent}</div>`;
      }

      // Handle mathematical expressions
      if (info === 'math') {
        const mathId = 'math-' + Math.random().toString(36).substring(2, 15);
        // Pass raw 'content' to MathJax, wrapped in $$ ... $$ on a single line
        const singleLineContent = content.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
        return `<div id="${mathId}" class="math-display" data-source-type="math">$${'$'}${singleLineContent}$${'$'}</div>`;
      }

      // Default fence renderer (for code blocks)
      const langName = token.info.trim().split(/\s+/)[0] || '';
      const escapedLangName = this.md.utils.escapeHtml(langName);
      const tableLangs = ['csv', 'tsv', 'psv'];
      if (tableLangs.includes(langName)) {
        try {
          if (typeof Papa === 'undefined' || typeof Papa.parse !== 'function') {
            return `<pre class="squibview-error" data-source-type="${escapedLangName}">Error: PapaParse library not loaded.</pre>`;
          }
          let parseConfig = { skipEmptyLines: true };
          if (langName !== 'tsv') parseConfig.delimiter = langName === 'csv' ? ',' : '|';
          const parsedData = Papa.parse(content, parseConfig);
          if (parsedData.errors && parsedData.errors.length > 0) {
            let errorMessages = parsedData.errors.map(err => `${err.type}: ${err.message} (Row: ${err.row})`).join('\n');
            return `<pre class="squibview-error" data-source-type="${escapedLangName}">Error parsing ${langName} data:\n${this.md.utils.escapeHtml(errorMessages)}</pre>`;
          }
          return `<div data-source-type="${escapedLangName}">${this._dataToHtmlTable(parsedData.data)}</div>`;
        } catch (e) {
          return `<pre class="squibview-error" data-source-type="${escapedLangName}">Could not render ${this.md.utils.escapeHtml(langName)} table.</pre>`;
        }
      }
      let codeHtml;
      const hljs = getHljs();
      if (hljs && hljs.getLanguage && hljs.getLanguage(langName)) {
        try {
          const highlightedContent = hljs.highlight(content, { language: langName, ignoreIllegals: true }).value;
          codeHtml = `<pre><code class="hljs language-${escapedLangName}" data-source-type="code" data-lang="${escapedLangName}">${highlightedContent}</code></pre>`;
        } catch (e) {
          // Fallback to non-highlighted if error occurs
        }
      }
      if (!codeHtml) {
        const escapedContent = this.md.utils.escapeHtml(content);
        codeHtml = `<pre><code class="hljs language-${escapedLangName}" data-source-type="code" data-lang="${escapedLangName}">${escapedContent}</code></pre>`;
      }
      return `<div data-source-type="${escapedLangName || 'code'}">${codeHtml}</div>`;
    };
  }

  /**
   * Converts parsed data (array of arrays) to an HTML table string.
   *
   * @param {Array<Array<string>>} rows - The data rows, where the first row is the header.
   * @returns {string} An HTML table string.
   * @private
   */
  _dataToHtmlTable(rows) {
    if (!rows || rows.length === 0) {
      return '<p class="squibview-info">No data to display.</p>';
    }

    let html = '<table class="squibview-data-table">';

    // Header
    const headerCells = rows[0];
    html += '<thead><tr>';
    headerCells.forEach(cell => {
      html += `<th>${this.md.utils.escapeHtml(String(cell))}</th>`;
    });
    html += '</tr></thead>';

    // Body
    html += '<tbody>';
    for (let i = 1; i < rows.length; i++) {
      html += '<tr>';
      const bodyCells = rows[i];
      // Ensure all rows have the same number of cells as the header
      // by either truncating or padding with empty cells
      for (let j = 0; j < headerCells.length; j++) {
          const cellContent = bodyCells[j] !== undefined ? String(bodyCells[j]) : '';
          html += `<td>${this.md.utils.escapeHtml(cellContent)}</td>`;
      }
      html += '</tr>';
    }
    html += '</tbody></table>';

    return html;
  }

  /**
   * Registers a content type renderer with specified configuration
   * 
   * @param {string} type - The content type identifier ('md', 'html', etc.)
   * @param {Object} config - Renderer configuration
   * @param {Function} config.render - Function to render the content type
   * @param {Function} [config.sourceToOutput] - Function to transform source to output
   * @param {Function} [config.outputToSource] - Function to transform output back to source
   * @param {Object} [config.operations] - Map of operations that can be performed on this content type
   * @param {Array} [config.buttons] - Buttons to display when this content type is active
   */
  registerRenderer(type, config) {
    this.renderers[type] = config;
    
    // Trigger event for plugins to react
    this.events.emit('renderer:registered', type, config);
    
    // Update buttons if this is the current content type
    if (this.inputContentType === type) {
      this.updateTypeButtons();
    }
  }
  
  /**
   * Registers the default renderers for standard content types
   * 
   * @private
   */
  registerDefaultRenderers() {
    // Markdown renderer
    this.registerRenderer('md', {
      render: (source) => this.renderMarkdown(source),
      sourceToOutput: (source) => this.md.render(source),
      outputToSource: (output, options = {}) => this.htmlToMarkdown(output, options),
      operations: {
        increaseHeadings: (src) => this.markdownAdjustHeadings(src, 1),
        decreaseHeadings: (src) => this.markdownAdjustHeadings(src, -1),
        removeHR: (src) => src.replace(/---/g, ''),
        fixLinefeeds: (src) => this.fixLinefeedsInMarkdown(src),
        toggleLinefeedView: () => { this.toggleLinefeedView(); return this.getContent(); }
      },
      buttons: [
        { label: 'H-', action: 'decreaseHeadings', title: 'Decrease heading levels' },
        { label: 'H+', action: 'increaseHeadings', title: 'Increase heading levels' },
        { label: 'Remove HR', action: 'removeHR', title: 'Remove horizontal rules' },
        { label: 'Smart Linefeeds', action: 'fixLinefeeds', title: 'Convert all single line breaks to hard line breaks (two spaces + newline) in the source.' }
      ]
    });
    
    // HTML renderer
    this.registerRenderer('html', {
      render: (source) => this.renderHTML(source),
      sourceToOutput: (source) => source,
      outputToSource: (output) => output,
      operations: {},
      buttons: []
    });
    
    // RevealJS renderer
    this.registerRenderer('reveal', {
      render: (source) => this.renderHTML(this.makeRevealJSFullPage(source)),
      sourceToOutput: (source) => this.makeRevealJSFullPage(source),
      outputToSource: (output) => output,
      operations: {},
      buttons: []
    });
    
    // CSV renderer
    this.registerRenderer('csv', {
      render: (source) => {
        const markdownTable = this.csvOrTsvToMarkdownTable(source, ',');
        this.renderMarkdown(markdownTable);
      },
      sourceToOutput: (source) => this.csvOrTsvToMarkdownTable(source, ','),
      outputToSource: (output) => this.tableToCSV(output),
      operations: {},
      buttons: []
    });
    
    // TSV renderer
    this.registerRenderer('tsv', {
      render: (source) => {
        const markdownTable = this.csvOrTsvToMarkdownTable(source, '\t');
        this.renderMarkdown(markdownTable);
      },
      sourceToOutput: (source) => this.csvOrTsvToMarkdownTable(source, '\t'),
      outputToSource: (output) => this.tableToCSV(output, '\t'),
      operations: {},
      buttons: []
    });
    
    // Semicolon separated values renderer
    this.registerRenderer('semisv', {
      render: (source) => {
        const markdownTable = this.csvOrTsvToMarkdownTable(source, ';');
        this.renderMarkdown(markdownTable);
      },
      sourceToOutput: (source) => this.csvOrTsvToMarkdownTable(source, ';'),
      outputToSource: (output) => this.tableToCSV(output, ';'),
      operations: {},
      buttons: []
    });
    
    // Space separated values renderer
    this.registerRenderer('ssv', {
      render: (source) => {
        const markdownTable = this.csvOrTsvToMarkdownTable(source, ' ');
        this.renderMarkdown(markdownTable);
      },
      sourceToOutput: (source) => this.csvOrTsvToMarkdownTable(source, ' '),
      outputToSource: (output) => this.tableToCSV(output, ' '),
      operations: {},
      buttons: []
    });
  }

  /**
   * Creates the DOM structure for the editor.
   * Sets up the title bar, controls, and editor areas.
   * 
   * @private
   */
  createStructure() {
    this.container.classList.add(this.options.baseClass);

    this.container.innerHTML = `
      <div class="${this.options.baseClass}-title" ${!this.options.titleShow ? 'style="display:none"' : ''}>
        ${this.options.titleContent}
      </div>
      <div class="${this.options.baseClass}-controls" ${!this.options.showControls ? 'style="display:none"' : ''}>
        <button data-view='src'>Source</button>
        <button data-view="html">Rendered</button>
        <button data-view="split">Split</button>
        <button class="copy-src-button">Copy Source</button>
        <button class="copy-html-button">Copy Rendered</button>
        <button class="revision-undo" title="Undo">&#x21A9;</button>
        <button class="revision-redo" title="Redo">&#x21AA;</button>
        <span class="${this.options.baseClass}-type-buttons"></span>
      </div>
      <div class="${this.options.baseClass}-editor">
        ${this.options.showLineNumbers ? 
          `<div class="${this.options.baseClass}-source-panel">
            <div class="${this.options.baseClass}-line-gutter"></div>
            <textarea class="${this.options.baseClass}-input"></textarea>
          </div>` :
          `<textarea class="${this.options.baseClass}-input"></textarea>`
        }
        <div class="${this.options.baseClass}-output"></div>
      </div>
    `;

    this.title = this.container.querySelector(`.${this.options.baseClass}-title`);
    this.controls = this.container.querySelector(`.${this.options.baseClass}-controls`);
    this.editor = this.container.querySelector(`.${this.options.baseClass}-editor`);
    this.input = this.container.querySelector(`.${this.options.baseClass}-input`);
    this.output = this.container.querySelector(`.${this.options.baseClass}-output`);
    this.typeButtonsContainer = this.container.querySelector(`.${this.options.baseClass}-type-buttons`);
    this.universalButtonsContainer = this.container.querySelector(`.${this.options.baseClass}-universal-buttons`);
    
    // Line numbers elements
    if (this.options.showLineNumbers) {
      this.sourcePanel = this.container.querySelector(`.${this.options.baseClass}-source-panel`);
      this.lineGutter = this.container.querySelector(`.${this.options.baseClass}-line-gutter`);
    }
  }

  /**
   * Updates the type-specific buttons based on the current content type
   * 
   * @private
   */
  updateTypeButtons() {
    // Clear current buttons
    this.typeButtonsContainer.innerHTML = '';
    
    // Get buttons for current content type
    const renderer = this.renderers[this.inputContentType];
    if (renderer && renderer.buttons && renderer.buttons.length > 0) {
      renderer.buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.label;
        if (button.title) {
          btn.title = button.title;
        }
        btn.addEventListener('click', () => {
          if (renderer.operations && renderer.operations[button.action]) {
            const newContent = renderer.operations[button.action](this.getContent());
            this.setContent(newContent, this.inputContentType);
          }
        });
        this.typeButtonsContainer.appendChild(btn);
      });
    }
  }

  /**
   * Sets up event listeners for user interactions.
   * Handles view changes, copy functionality, and input changes.
   * 
   * @private
   */
  initializeEventHandlers() {
    // View buttons
    this.controls.querySelectorAll('button[data-view]').forEach(button => {
      button.addEventListener('click', () => this.setView(button.dataset.view));
    });

    // Copy buttons
    this.controls.querySelector('.copy-src-button').addEventListener('click', () => this.copySource());
    this.controls.querySelector('.copy-html-button').addEventListener('click', () => this.copyHTML());
    
    // Undo/redo buttons
    this.controls.querySelector('.revision-undo').addEventListener('click', () => this.revisionUndo());
    this.controls.querySelector('.revision-redo').addEventListener('click', () => this.revisionRedo());

    // Input source change event
    this.input.addEventListener('input', () => { 
      this.setContent(); 
    });
    
    // Text selection event in source panel
    this.input.addEventListener('mouseup', () => {
      const selection = document.getSelection();
      if (selection && selection.toString().trim() !== '') {
        const selectionData = {
          panel: 'source',
          text: selection.toString(),
          range: {
            start: this.input.selectionStart,
            end: this.input.selectionEnd
          }
        };
        this.lastSelectionData = selectionData;
        this.events.emit('text:selected', selectionData);
      }
    });
    
    // Listen for changes in rendered content to support bidirectional editing
    // Use a debounce pattern to prevent processing every keystroke
    let editDebounceTimer = null;
    
    // Create a map to store special content blocks
    this.specialContentBlocks = new Map();
    
    this.output.addEventListener('input', () => {
      if (this.currentView === 'html' || this.currentView === 'split') {
        const editableContent = this.output.querySelector('[contenteditable="true"]');
        if (editableContent) {
          // Clear any existing timer
          if (editDebounceTimer) {
            clearTimeout(editDebounceTimer);
          }
          
          // Set a new timer to process the edit after a short delay (300ms)
          editDebounceTimer = setTimeout(() => {
            const renderedContent = editableContent.innerHTML;
            const renderer = this.renderers[this.inputContentType];
            
            if (renderer && renderer.outputToSource) {
              // Get the original source markdown
              const originalSource = this.input.value;
              
              // Process the HTML back to markdown, passing original source for context
              let newSource = renderer.outputToSource(renderedContent, {
                originalSource: originalSource
              });
              
              // Update source without triggering render cycle
              this.input.value = newSource;
              
              // Only save revision after editing stops for a moment
              this.revisionManager.addRevision(newSource, this.inputContentType);
              
              // Emit content change event
              this.events.emit('content:change', newSource, this.inputContentType);
            }
            
            // Clear the timer reference
            editDebounceTimer = null;
          }, 300);
        }
      }
    });
    
    // Text selection event in rendered panel
    this.output.addEventListener('mouseup', () => {
      const selection = document.getSelection();
      if (selection && selection.toString().trim() !== '') {
        const range = selection.getRangeAt(0);
        const selectionData = {
          panel: 'rendered',
          text: selection.toString(),
          range: range,
          element: this.output.querySelector('[contenteditable="true"]')
        };
        this.lastSelectionData = selectionData;
        this.events.emit('text:selected', selectionData);
      }
    });
  }
  
  /**
   * Preserves special content blocks like Mermaid diagrams, SVG, GeoJSON and math from original source
   * @param {string} originalSource - The original markdown source
   * @param {string} newSource - The new source after HTML-to-Markdown conversion
   * @returns {string} - Source with special blocks preserved
   * @private
   */
  preserveSpecialBlocks(originalSource, newSource) {
    // If no original source, just return the new source
    if (!originalSource) return newSource;
    
    // Extract special blocks from original source
    const specialBlocks = [];
    
    // Extract Mermaid blocks: ```mermaid ... ```
    const mermaidRegex = /```mermaid\s*([\s\S]*?)```/g;
    let mermaidMatch;
    while ((mermaidMatch = mermaidRegex.exec(originalSource)) !== null) {
      specialBlocks.push({
        type: 'mermaid',
        content: mermaidMatch[0],
        startIndex: mermaidMatch.index,
        endIndex: mermaidMatch.index + mermaidMatch[0].length
      });
    }
    
    // Extract GeoJSON blocks: ```geojson ... ```
    const geojsonRegex = /```geojson\s*([\s\S]*?)```/g;
    let geojsonMatch;
    while ((geojsonMatch = geojsonRegex.exec(originalSource)) !== null) {
      specialBlocks.push({
        type: 'geojson',
        content: geojsonMatch[0],
        startIndex: geojsonMatch.index,
        endIndex: geojsonMatch.index + geojsonMatch[0].length
      });
    }
    
    // Extract Math blocks: ```math ... ```
    const mathRegex = /```math\s*([\s\S]*?)```/g;
    let mathMatch;
    while ((mathMatch = mathRegex.exec(originalSource)) !== null) {
      specialBlocks.push({
        type: 'math',
        content: mathMatch[0],
        startIndex: mathMatch.index,
        endIndex: mathMatch.index + mathMatch[0].length
      });
    }
    
    // Find corresponding locations in new source and preserve the special blocks
    // This is a heuristic approach - we look for markers that might indicate where
    // the special content was converted to something else
    
    let modifiedSource = newSource;
    
    // Look for elements in the newSource which likely represent our special blocks
    const mermaidDivRegex = /<div[^>]*class=['"]?mermaid['"]?[^>]*>([\s\S]*?)<\/div>/g;
    const geojsonDivRegex = /<div[^>]*class=['"]?geojson-map['"]?[^>]*>[\s\S]*?<\/div>/g;
    const mathDivRegex = /<div[^>]*class=['"]?math-display['"]?[^>]*>[\s\S]*?<\/div>/g;
    
    // Replace mermaid divs with original mermaid code blocks
    let mermaidDivMatch;
    let mermaidIndex = 0;
    while ((mermaidDivMatch = mermaidDivRegex.exec(modifiedSource)) !== null) {
      // Find the next available mermaid block
      const mermaidBlocks = specialBlocks.filter(block => block.type === 'mermaid');
      if (mermaidIndex < mermaidBlocks.length) {
        // Replace the div with the original mermaid code block
        modifiedSource = 
          modifiedSource.substring(0, mermaidDivMatch.index) + 
          mermaidBlocks[mermaidIndex].content + 
          modifiedSource.substring(mermaidDivMatch.index + mermaidDivMatch[0].length);
        
        mermaidIndex++;
      }
    }
    
    // Replace GeoJSON divs with original GeoJSON code blocks
    let geojsonDivMatch;
    let geojsonIndex = 0;
    while ((geojsonDivMatch = geojsonDivRegex.exec(modifiedSource)) !== null) {
      // Find the next available GeoJSON block
      const geojsonBlocks = specialBlocks.filter(block => block.type === 'geojson');
      if (geojsonIndex < geojsonBlocks.length) {
        // Replace the div with the original GeoJSON code block
        modifiedSource = 
          modifiedSource.substring(0, geojsonDivMatch.index) + 
          geojsonBlocks[geojsonIndex].content + 
          modifiedSource.substring(geojsonDivMatch.index + geojsonDivMatch[0].length);
        
        geojsonIndex++;
      }
    }
    
    // Replace Math divs with original Math code blocks
    let mathDivMatch;
    let mathIndex = 0;
    while ((mathDivMatch = mathDivRegex.exec(modifiedSource)) !== null) {
      // Find the next available math block
      const mathBlocks = specialBlocks.filter(block => block.type === 'math');
      if (mathIndex < mathBlocks.length) {
        // Replace the div with the original math code block
        modifiedSource = 
          modifiedSource.substring(0, mathDivMatch.index) + 
          mathBlocks[mathIndex].content + 
          modifiedSource.substring(mathDivMatch.index + mathDivMatch[0].length);
        
        mathIndex++;
      }
    }
    
    return modifiedSource;
  }
  
  /**
   * Sets up a resize observer to adjust the layout when the container size changes.
   * 
   * @private
   */
  initializeResizeObserver() {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.target === this.container) {
          this.adjustLayout();
        }
      }
    });
    resizeObserver.observe(this.container);
  }

  /**
   * Adjusts the layout of the editor components based on the current view and container size.
   * 
   * @private
   */
  adjustLayout() {
    const containerRect = this.container.getBoundingClientRect();
    const titleHeight = this.title.offsetHeight;
    const controlsHeight = this.controls.offsetHeight;

    const availableHeight = containerRect.height - titleHeight - controlsHeight;
    const availableWidth = containerRect.width;
    this.editor.style.height = `${availableHeight}px`;
    this.editor.style.width = `${availableWidth}px`;

    if (this.currentView === 'split') {
      this.input.style.width = '50%';
      this.output.style.width = '50%';
    } else if (this.currentView === 'src') {
      this.input.style.width = '100%';
    } else if (this.currentView === 'html') {
      this.output.style.width = '100%';
    }
    
    // Emit layout change event for plugins
    this.events.emit('layout:change', this.currentView, {
      containerWidth: availableWidth,
      containerHeight: availableHeight
    });
  }

  /**
   * Sets the content of the editor and renders it.
   * 
   * @param {string} [content=this.input.value] - The content to set
   * @param {string} [contentType=this.inputContentType] - The type of content ('md', 'html', 'reveal', 'csv', 'tsv')
   * @param {boolean} [saveRevision=true] - Whether to save this change to the revision history
   */
  setContent(content = this.input.value, contentType = this.inputContentType, saveRevision = true) {
    // Check if content type has changed
    const typeChanged = contentType !== this.inputContentType;
    if (typeChanged) {
      this.inputContentType = contentType;
      this.updateTypeButtons();
    }
    
    this.input.value = content;
    
    // Add to revision history if required
    if (saveRevision) {
      this.revisionManager.addRevision(content, contentType);
    }
    
    // Render the content
    this.renderOutput();
    
    // Update line numbers if enabled
    if (this.options.showLineNumbers && this.lineGutter) {
      this.updateLineNumbers();
    }
    
    // Emit content change event
    this.events.emit('content:change', content, contentType);
  }

  /**
   * Undoes the last change if possible.
   * Decrements the revision index and restores the content from that revision.
   */
  revisionUndo() {
    const prevState = this.revisionManager.undo();
    if (prevState) {
      this.input.value = prevState.content;
      this.inputContentType = prevState.contentType;
      
      // Update buttons if content type changed
      this.updateTypeButtons();
      
      // Render the content
      this.renderOutput();
      
      // Emit undo event
      this.events.emit('revision:undo', prevState.content, prevState.contentType);
    }
  }
  
  /**
   * Redoes a previously undone change if possible.
   * Increments the revision index and restores the content from that revision.
   */
  revisionRedo() {
    const nextState = this.revisionManager.redo();
    if (nextState) {
      this.input.value = nextState.content;
      this.inputContentType = nextState.contentType;
      
      // Update buttons if content type changed
      this.updateTypeButtons();
      
      // Render the content
      this.renderOutput();
      
      // Emit redo event
      this.events.emit('revision:redo', nextState.content, nextState.contentType);
    }
  }
  
  /**
   * Sets the revision to a specific index in the history.
   * 
   * @param {number} index - The revision index to set
   */
  revisionSet(index) {
    const state = this.revisionManager.setRevision(index);
    if (state) {
      this.input.value = state.content;
      this.inputContentType = state.contentType;
      
      // Update buttons if content type changed
      this.updateTypeButtons();
      
      // Render the content
      this.renderOutput();
      
      // Emit revision:set event
      this.events.emit('revision:set', index, state.content, state.contentType);
    }
  }
  
  /**
   * Returns the total number of revisions in the history.
   * 
   * @returns {number} The number of revisions
   */
  revisionNumRevsions() {
    return this.revisionManager.getRevisionCount();
  }
  
  /**
   * Returns the current index in the revision history.
   * 
   * @returns {number} The current revision index
   */
  revisionGetCurrentIndex() {
    return this.revisionManager.getCurrentIndex();
  }

  /**
   * Gets the current content from the input textarea.
   * 
   * @returns {string} The current content
   */
  getContent() {
    return this.input.value;
  }

  /**
   * Cleans markdown content by removing markdown code fence markers.
   * 
   * @param {string} md - The markdown content to clean
   * @returns {string} The cleaned markdown content
   */
  cleanMarkdown(md) {
    return md.replace(/^```markdown\s+/, '').replace(/```$/, '');
  }

  /**
   * Renders Markdown content to HTML and processes the result.
   * Converts images to data URLs and initializes Mermaid diagrams.
   * 
   * @param {string} [md] - The Markdown content to render, defaults to current input value
   * @returns {Promise<void>} A promise that resolves when rendering is complete
   */
  async renderMarkdown(md) {
    const markdown = md || this.input.value;

    // Check if we need to autoload libraries based on content
    if (this.autoloadConfig && this.autoloadConfig.enabled) {
      await this._checkAndAutoloadLibraries(markdown);
    }
    const html = this.md.render(markdown);
    let processedHtml = html;
    if (this.linefeedViewEnabled) {
      // Only process paragraphs, not code blocks or pre
      processedHtml = processedHtml.replace(/(<p>)([\s\S]*?)(<\/p>)/g, (match, open, content, close) => {
        // Split by <br> or by line
        const lines = content.split(/<br\s*\/?>(?![^<]*<\/code>)/g);
        const processedLines = lines.map(line => {
          // If line is empty or already ends with <br>, skip
          if (/\s*<\/?.*?>\s*/.test(line) || line.trim() === '') return line;
          // If line already ends with <br>, skip
          if (/<br\s*\/?>(\s*)$/.test(line)) return line;
          return line + '<br>';
        });
        return open + processedLines.join('') + close;
      });
    }
    this.output.innerHTML = "<div contenteditable='true'>" + processedHtml + "</div>";

    // Convert all images to data URLs immediately after rendering
    const contentDiv = this.output.querySelector('div[contenteditable="true"]');
    const images = contentDiv.querySelectorAll('img');

    // render images to data urls
    for (const img of images) {
      try {
        // Store original src if we need to preserve it
        const originalSrc = img.src;
        
        // Only convert to data URL if not preserving tags
        if (!this.options.preserveImageTags) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Create new image and wait for it to load
          const tempImg = new Image();
          tempImg.crossOrigin = 'anonymous';

          await new Promise((resolve, reject) => {
            tempImg.onload = () => {
              // Set canvas size to match image
              canvas.width = tempImg.naturalWidth;
              canvas.height = tempImg.naturalHeight;

              // Draw image to canvas
              ctx.drawImage(tempImg, 0, 0);

              // Convert to data URL
              const dataUrl = canvas.toDataURL('image/png', 1.0);

              // Update original image
              img.src = dataUrl;
              resolve();
            };
            tempImg.onerror = reject;
            tempImg.src = originalSrc;
          });
        }
      } catch (error) {
        console.error('Failed to convert image:', error);
      }
    }

    // Initialize mermaid diagrams after all images are processed
    if (typeof window !== 'undefined' && window.mermaid) {
      window.mermaid.init(undefined, this.output.querySelectorAll('.mermaid'));
    }

    // Initialize GeoJSON/TopoJSON maps after content is rendered
    this.initializeGeoRenderers();

    // Initialize STL 3D models after content is rendered
    this.initializeSTLRenderers();
    
    // Ensure MathJax is loaded and typeset all math blocks
    await this.ensureMathJaxAndTypeset();

    // Emit markdown:rendered event
    this.events.emit('markdown:rendered', markdown, html);
  }

  /**
   * Ensures MathJax is loaded and typesets all math blocks in the output.
   * @private
   */
  async ensureMathJaxAndTypeset() {
    const mathBlocks = this.output.querySelectorAll('div.math-display');
    if (!mathBlocks.length) return;

    // Try autoloading first if configured
    if (this.autoloadConfig && this.autoloadConfig.enabled) {
      const config = this.autoloadConfig.libraries.mathjax;
      if (config && config.strategy === 'ondemand') {
        const loaded = await this._autoloadLibrary('mathjax');
        if (loaded && typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
          return MathJax.typesetPromise(Array.from(mathBlocks));
        }
      }
    }

    function typesetAll() {
      if (typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
        return MathJax.typesetPromise(Array.from(mathBlocks));
      }
    }
    if (typeof MathJax === 'undefined') {
      if (window.mathJaxLoading) return;
      window.mathJaxLoading = true;
      return new Promise((resolve, reject) => {
        // Configure MathJax before loading script to ensure SVG output
        if (!window.MathJax) {
          window.MathJax = {
            loader: { load: ['input/tex', 'output/svg'] },
            tex: { 
              packages: { '[+]': ['ams'] },
              inlineMath: [['$', '$'], ['\\(', '\\)']],
              displayMath: [['$$', '$$'], ['\\[', '\\]']],
              processEscapes: true,
              processEnvironments: true
            },
            options: { 
              renderActions: { addMenu: [] },
              ignoreHtmlClass: 'tex2jax_ignore',
              processHtmlClass: 'tex2jax_process'
            },
            svg: { fontCache: 'none' },
            startup: { typeset: false }
          };
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
        script.async = true;
        script.onload = () => {
          window.mathJaxLoading = false;
          typesetAll()?.then(resolve).catch(reject);
        };
        script.onerror = () => {
          window.mathJaxLoading = false;
          reject(new Error('Failed to load MathJax'));
        };
        document.head.appendChild(script);
      });
    } else {
      return typesetAll();
    }
  }

  /**
   * Initializes GeoJSON and TopoJSON map renderers.
   * @private
   */
  async initializeGeoRenderers() {
    // Skip if output element not yet available (during initial setup)
    if (!this.output) return;

    // Check if we have geo content
    const geojsonContainers = this.output.querySelectorAll('.geojson-container');
    const topojsonContainers = this.output.querySelectorAll('.topojson-container');

    if (geojsonContainers.length === 0 && topojsonContainers.length === 0) return;

    // Autoload Leaflet if needed and configured
    if (this.autoloadConfig && this.autoloadConfig.enabled) {
      const config = this.autoloadConfig.libraries.leaflet;
      if (config && config.strategy === 'ondemand') {
        const loaded = await this._autoloadLibrary('leaflet');
        if (!loaded) return; // Can't render without Leaflet
      }
    }

    // Check if Leaflet is available
    if (typeof window === 'undefined' || !window.L) return;

    // Initialize GeoJSON containers
    geojsonContainers.forEach(container => {
      if (!container.dataset.initialized) {
        this.renderGeoJSON(container);
      }
    });

    // Initialize TopoJSON containers
    topojsonContainers.forEach(container => {
      if (!container.dataset.initialized) {
        this.renderTopoJSON(container);
      }
    });
  }

  /**
   * Initializes STL 3D model renderers.
   * @private
   */
  async initializeSTLRenderers() {
    // Skip if output element not yet available (during initial setup)
    if (!this.output) return;

    const stlContainers = this.output.querySelectorAll('.stl-container');
    if (stlContainers.length === 0) return;

    // Autoload Three.js if needed and configured
    if (this.autoloadConfig && this.autoloadConfig.enabled) {
      const config = this.autoloadConfig.libraries.three;
      if (config && config.strategy === 'ondemand') {
        const loaded = await this._autoloadLibrary('three');
        if (!loaded) return; // Can't render without Three.js
      }
    }

    // Check if Three.js is available
    if (typeof window === 'undefined' || !window.THREE) return;
    stlContainers.forEach(container => {
      if (!container.dataset.initialized) {
        this.renderSTL(container);
      }
    });
  }

  /**
   * Renders a GeoJSON map in the given container.
   * @param {HTMLElement} container - The container element
   * @private
   */
  renderGeoJSON(container) {
    try {
      const originalData = container.textContent;
      
      // Store original data for HtmlToMarkdown conversion FIRST
      container.setAttribute('data-original-source', originalData);
      
      if (typeof window.L === 'undefined') {
        // No console warning - placeholder message is sufficient
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">Leaflet library not loaded</p>';
        return;
      }

      const jsonData = JSON.parse(originalData);
      
      // Clear container and set up for map
      container.innerHTML = '';
      container.style.cssText = 'width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 4px;';
      
      // Create unique ID for this map
      const mapId = 'map-' + Math.random().toString(36).substring(2, 15);
      container.id = mapId;
      
      // Initialize Leaflet map
      const map = window.L.map(mapId).setView([0, 0], 2);
      
      // Store map reference for copy functionality
      window[mapId + '_map'] = map;
      
      // Add tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Add GeoJSON layer
      const geojsonLayer = window.L.geoJSON(jsonData).addTo(map);
      
      // Fit map to data bounds
      if (geojsonLayer.getBounds().isValid()) {
        map.fitBounds(geojsonLayer.getBounds(), { padding: [20, 20] });
      }
      
      container.dataset.initialized = 'true';
    } catch (error) {
      console.error('Error rendering GeoJSON:', error);
      container.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Error rendering GeoJSON map</p>';
      container.dataset.initialized = 'error';
    }
  }

  /**
   * Renders a TopoJSON map in the given container.
   * @param {HTMLElement} container - The container element
   * @private
   */
  renderTopoJSON(container) {
    try {
      const originalData = container.textContent;
      
      // Store original data for HtmlToMarkdown conversion FIRST
      container.setAttribute('data-original-source', originalData);
      
      if (typeof window.L === 'undefined') {
        // No console warning - placeholder message is sufficient
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">Leaflet library not loaded</p>';
        return;
      }

      if (typeof topojson === 'undefined') {
        // No console warning - placeholder message is sufficient
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">TopoJSON client library not loaded</p>';
        return;
      }

      const topoData = JSON.parse(originalData);
      
      // Convert TopoJSON to GeoJSON
      const geojsonData = topojson.feature(topoData, Object.keys(topoData.objects)[0]);
      
      // Clear container and set up for map
      container.innerHTML = '';
      container.style.cssText = 'width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 4px;';
      
      // Create unique ID for this map
      const mapId = 'map-' + Math.random().toString(36).substring(2, 15);
      container.id = mapId;
      
      // Initialize Leaflet map
      const map = window.L.map(mapId).setView([0, 0], 2);
      
      // Add tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Add GeoJSON layer
      const geojsonLayer = L.geoJSON(geojsonData).addTo(map);
      
      // Fit map to data bounds
      if (geojsonLayer.getBounds().isValid()) {
        map.fitBounds(geojsonLayer.getBounds(), { padding: [20, 20] });
      }
      
      container.dataset.initialized = 'true';
    } catch (error) {
      console.error('Error rendering TopoJSON:', error);
      container.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Error rendering TopoJSON map</p>';
      container.dataset.initialized = 'error';
    }
  }

  /**
   * Renders an STL 3D model in the given container.
   * @param {HTMLElement} container - The container element
   * @private
   */
  renderSTL(container) {
    try {
      const originalData = container.textContent;
      
      // Store original data for HtmlToMarkdown conversion FIRST
      container.setAttribute('data-original-source', originalData);
      
      if (typeof THREE === 'undefined') {
        // No console warning - placeholder message is sufficient
        container.innerHTML = '<p style="color: #666; text-align: center; padding: 20px;">Three.js library not loaded</p>';
        return;
      }

      const stlData = originalData;
      
      // Clear container and set up for 3D rendering
      container.innerHTML = '';
      container.style.cssText = 'width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 4px; position: relative;';
      
      // Create Three.js scene
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.setClearColor(0xf0f0f0);
      container.appendChild(renderer.domElement);
      
      // Store references for copy functionality
      container._threeScene = scene;
      container._threeCamera = camera;
      container._threeRenderer = renderer;
      
      // Parse STL data (basic ASCII STL parser)
      const geometry = this.parseSTL(stlData);
      const material = new THREE.MeshLambertMaterial({ color: 0x606060 });
      const mesh = new THREE.Mesh(geometry, material);
      
      scene.add(mesh);
      
      // Add lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);
      
      // Position camera
      const box = new THREE.Box3().setFromObject(mesh);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      camera.position.set(center.x + maxDim, center.y + maxDim, center.z + maxDim);
      camera.lookAt(center);
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
      
      container.dataset.initialized = 'true';
    } catch (error) {
      console.error('Error rendering STL:', error);
      container.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">Error rendering STL model</p>';
      container.dataset.initialized = 'error';
    }
  }

  /**
   * Basic ASCII STL parser.
   * @param {string} stlData - The STL file content
   * @returns {THREE.BufferGeometry} - The parsed geometry
   * @private
   */
  parseSTL(stlData) {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const normals = [];
    
    const lines = stlData.split('\n');
    let currentNormal = null;
    let vertexCount = 0;
    
    for (let line of lines) {
      line = line.trim();
      
      if (line.startsWith('facet normal')) {
        const parts = line.split(/\s+/);
        currentNormal = [parseFloat(parts[2]), parseFloat(parts[3]), parseFloat(parts[4])];
      } else if (line.startsWith('vertex')) {
        const parts = line.split(/\s+/);
        vertices.push(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3]));
        if (currentNormal) {
          normals.push(currentNormal[0], currentNormal[1], currentNormal[2]);
        }
        vertexCount++;
      }
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    
    return geometry;
  }

  /**
   * Converts HTML content to Markdown format using our HtmlToMarkdown converter.
   * 
   * @param {string} html - The HTML content to convert to Markdown
   * @param {Object} options - Additional options for conversion
   * @returns {string} The converted Markdown content
   */
  htmlToMarkdown(html, options = {}) {
    // Use our HtmlToMarkdown converter which uses Turndown internally
    // with SquibView-specific customizations
    if (!this._htmlToMarkdownConverter) {
      // Return simple conversion if converter isn't loaded yet
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      return tempDiv.textContent;
    }
    
    // Use the converter with the original source as context to preserve special blocks
    return this._htmlToMarkdownConverter.convert(html, {
      originalSource: options.originalSource || this.input.value
    });
  }

  /**
   * Converts a table in the DOM to CSV format
   * 
   * @param {string} html - The HTML content containing a table
   * @param {string} [delimiter=','] - The delimiter to use
   * @returns {string} The CSV content
   */
  tableToCSV(html, delimiter = ',') {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    const table = tempDiv.querySelector('table');
    if (!table) {
      return '';
    }
    
    const rows = Array.from(table.querySelectorAll('tr'));
    const csvRows = rows.map(row => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      return cells.map(cell => {
        // Escape quotes and wrap in quotes if needed
        const text = cell.textContent.trim();
        if (text.includes(delimiter) || text.includes('"') || text.includes('\n')) {
          return `"${text.replace(/"/g, '""')}"`;
        }
        return text;
      }).join(delimiter);
    });
    
    return csvRows.join('\n');
  }

  /**
   * Removes all horizontal rules (---) from the Markdown content.
   * Only works when the current content type is Markdown.
   */
  markdownRemoveAllHR() {
    if (this.inputContentType === 'md') {
      const markdown = this.getMarkdownSource();
      const newMarkdown = markdown.replace(/---/g, '');
      this.setContent(newMarkdown, this.inputContentType);
    }
  }
  
  /**
   * Adjusts the heading levels in Markdown text by a specified offset.
   * 
   * @param {string} markdown - The Markdown text to process
   * @param {number} offset - The amount to adjust heading levels by (positive to increase, negative to decrease)
   * @returns {string} - The Markdown text with adjusted heading levels
   */
  markdownAdjustHeadings(markdown, offset) {
    // Early exit if offset is 0 or invalid input
    if (offset === 0 || typeof markdown !== 'string') {
      return markdown;
    }

    // Split the input into lines
    const lines = markdown.split('\n');

    // Process each line
    const modifiedLines = lines.map(line => {
      // Regex to match heading lines: starts with 1-6 hash symbols followed by a space
      const headingMatch = line.match(/^(#{1,6})\s/);

      if (!headingMatch) {
        // Not a heading, return unchanged
        return line;
      }

      const currentHeadingLevel = headingMatch[1].length;
      // Calculate new heading level with bounds checking (min 1, max 6)
      const newHeadingLevel = Math.min(Math.max(currentHeadingLevel + offset, 1), 6);

      // Replace the heading prefix with the new level
      return '#'.repeat(newHeadingLevel) + line.substring(currentHeadingLevel);
    });

    // Join the lines back together
    return modifiedLines.join('\n');
  }
  
  /**
   * Adjusts heading levels in the current Markdown content.
   * 
   * @param {number} offset - The amount to adjust heading levels by (positive to increase, negative to decrease)
   */
  markdownEditorAdjustHeadings(offset) {
    const markdown = this.getMarkdownSource();
    const newMarkdown = this.markdownAdjustHeadings(markdown, offset);
    this.setContent(newMarkdown, this.inputContentType);
  }

  /**
   * Sets the current view mode of the editor.
   * 
   * @param {string} view - The view mode to set: 'src' (source only), 'html' (rendered only), or 'split' (both)
   */
  setView(view) {
    this.currentView = view;
    
    // Set data-view attribute on editor for CSS styling
    this.editor.setAttribute('data-view', view);

    this.controls.querySelectorAll('button[data-view]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });

    const copyMDButton = this.controls.querySelector('.copy-src-button');
    const copyHTMLButton = this.controls.querySelector('.copy-html-button');

    if (view === 'src') {
      if (this.sourcePanel) {
        this.sourcePanel.classList.remove('squibview-hidden');
        this.sourcePanel.style.width = '100%';
      } else {
        this.input.classList.remove('squibview-hidden');
        this.input.style.width = '100%';
      }
      this.output.classList.add('squibview-hidden');
      copyMDButton.classList.remove('squibview-hidden');
      copyHTMLButton.classList.add('squibview-hidden');
    } else if (view === 'html') {
      if (this.sourcePanel) {
        this.sourcePanel.classList.add('squibview-hidden');
      } else {
        this.input.classList.add('squibview-hidden');
      }
      this.output.classList.remove('squibview-hidden');
      this.output.style.width = '100%';
      copyMDButton.classList.add('squibview-hidden');
      copyHTMLButton.classList.remove('squibview-hidden');
    } else { // view == 'split'
      if (this.sourcePanel) {
        this.sourcePanel.classList.remove('squibview-hidden');
        this.sourcePanel.style.width = '50%';
      } else {
        this.input.classList.remove('squibview-hidden');
        this.input.style.width = '50%';
      }
      this.output.classList.remove('squibview-hidden');
      this.output.style.width = '50%';
      copyMDButton.classList.remove('squibview-hidden');
      copyHTMLButton.classList.remove('squibview-hidden');
    }

    this.adjustLayout();
    
    // Emit view:change event
    this.events.emit('view:change', view);
  }

  /**
   * Renders HTML content in an iframe within the output div.
   * 
   * @param {string} src - The HTML source content to render
   */
  renderHTML(src) {
    const htmlContent = src;
    const outputDiv = this.output;
    this.insertContentInIframe(outputDiv, htmlContent);
    
    // Emit html:rendered event
    this.events.emit('html:rendered', htmlContent);
  }

  /**
   * Creates an iframe that fills the entire parent element and injects provided HTML content.
   * @param {HTMLElement} parentElement - The parent element to contain the iframe.
   * @param {string} htmlContent - The HTML content to inject into the iframe.
   */
  insertContentInIframe(parentElement, htmlContent) {
    // Create an iframe element
    const iframe = document.createElement('iframe');

    // Style the iframe to fill the parent completely
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';

    // Append the iframe to the parent element
    parentElement.innerHTML = '';
    parentElement.appendChild(iframe);

    // Access the iframe's document and write the HTML content into it
    const iframeDoc = iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();
    this.output_iframe = iframe;
    this.output_ifraome_content = htmlContent;
  }

  /**
   * Renders the current content based on its type using the registered renderer.
   */
  renderOutput() {
    const renderer = this.renderers[this.inputContentType];
    if (renderer && renderer.render) {
      renderer.render(this.getContent());
      this.events.emit('content:rendered', this.inputContentType);
    } else {
      console.warn(`No renderer for content type: ${this.inputContentType}`);
      // Fall back to Markdown rendering
      this.renderMarkdown();
    }
  }

  /**
   * Copies the source content to the clipboard.
   * Attempts to use the modern Clipboard API with fallbacks for older browsers.
   * 
   * @returns {Promise<void>} A promise that resolves when copying is complete
   */
  async copySource() {
    const copyButton = this.controls.querySelector('.copy-src-button');
    copyButton.textContent = 'Copying...';

    try {
      const markdownText = this.getMarkdownSource();

      try {
        await navigator.clipboard.writeText(markdownText);
      } catch (modernErr) {
        const textarea = document.createElement('textarea');
        textarea.value = markdownText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.body.removeChild(textarea);
      }

      copyButton.textContent = 'Copied!';
    } catch (err) {
      console.error('Copy Markdown failed:', err);
      copyButton.textContent = 'Copy failed';
    }

    setTimeout(() => {
      copyButton.textContent = 'Copy Source';
    }, 2000);
  }

  /**
   * Gets the current markdown source from the input textarea.
   * 
   * @returns {string} The markdown source
   */
  getMarkdownSource() {
    return this.input.value;
  }

  /**
   * Gets the HTML source from the rendered output.
   * 
   * @returns {string} The HTML content
   */
  getHTMLSource() {
    const contentEditable = this.output.querySelector('div[contenteditable="true"]');
    if (contentEditable) {
      return contentEditable.innerHTML;
    }
    
    // If we have an iframe (HTML view)
    if (this.output_iframe) {
      return this.output_ifraome_content;
    }
    
    return '';
  }

  /**
   * Gets source diff as a programmatic object
   * 
   * @param {Object} options - Diff options
   * @param {number} options.fromIndex - Starting revision index (defaults to current - 1)
   * @param {number} options.toIndex - Ending revision index (defaults to current)
   * @returns {Object} Diff data object with metadata and line diffs
   */
  getSourceDiff(options = {}) {
    const { fromIndex = null, toIndex = null } = options;
    
    // Get metadata about the revisions being compared
    const currentIndex = this.revisionManager.getCurrentIndex();
    const actualFromIndex = fromIndex === null ? Math.max(-1, currentIndex - 1) : fromIndex;
    const actualToIndex = toIndex === null ? currentIndex : toIndex;
    
    // Get the line diff
    const lineDiff = this.revisionManager.computeLineDiff(actualFromIndex, actualToIndex);
    
    // Build the diff object
    const diffData = {
      fromIndex: actualFromIndex,
      toIndex: actualToIndex,
      lineDiff: lineDiff,
      stats: this.revisionManager.getDiffStats(actualFromIndex, actualToIndex)
    };
    
    // Add revision info if indices are valid
    try {
      diffData.fromRevision = this.revisionManager.getRevisionInfo(actualFromIndex);
      diffData.toRevision = this.revisionManager.getRevisionInfo(actualToIndex);
    } catch (e) {
      // Invalid indices, return partial data
      diffData.error = e.message;
    }
    
    // Emit diff computed event
    this.events.emit('diff:computed', {
      fromIndex: diffData.fromIndex,
      toIndex: diffData.toIndex,
      stats: diffData.stats,
      hasChanges: diffData.stats.totalChanges > 0
    });
    
    return diffData;
  }

  /**
   * Gets source diff as display-ready HTML
   * 
   * @param {Object} options - Diff and styling options
   * @param {number} options.fromIndex - Starting revision index (defaults to current - 1)
   * @param {number} options.toIndex - Ending revision index (defaults to current)
   * @param {boolean} options.showLineNumbers - Whether to show line numbers (default: true)
   * @param {Object} options.cssClasses - Custom CSS classes for styling
   * @returns {string} HTML string
   */
  getSourceDiffHTML(options = {}) {
    const {
      fromIndex = null,
      toIndex = null,
      showLineNumbers = true,
      cssClasses = {}
    } = options;
    
    // Get the diff data
    const diffData = this.getSourceDiff({ fromIndex, toIndex });
    
    // Default CSS classes
    const classes = {
      container: cssClasses.container || 'squibview-diff',
      line: cssClasses.line || 'diff-line',
      added: cssClasses.added || 'diff-added',
      removed: cssClasses.removed || 'diff-removed',
      unchanged: cssClasses.unchanged || 'diff-unchanged',
      lineNumber: cssClasses.lineNumber || 'diff-line-number',
      content: cssClasses.content || 'diff-content'
    };
    
    // Build HTML
    let html = `<div class="${classes.container}" contenteditable="false">`;
    
    // Add header with revision info and stats
    html += `<div class="diff-header">`;
    html += `<div>Comparing revision ${diffData.fromIndex} to ${diffData.toIndex}</div>`;
    
    // Add statistics
    if (diffData.stats && diffData.stats.totalChanges > 0) {
      html += `<div class="diff-stats">`;
      if (diffData.stats.additions > 0) {
        html += `<span class="stat additions">+${diffData.stats.additions} additions</span>`;
      }
      if (diffData.stats.deletions > 0) {
        html += `<span class="stat deletions">-${diffData.stats.deletions} deletions</span>`;
      }
      if (diffData.stats.modifications > 0) {
        html += `<span class="stat modifications">~${diffData.stats.modifications} modifications</span>`;
      }
      html += `<span class="stat">${diffData.stats.totalChanges} total changes</span>`;
      html += `</div>`;
    } else {
      html += `<div class="diff-stats"><span class="stat">No changes</span></div>`;
    }
    html += `</div>`;
    
    // Add diff content
    html += `<div class="diff-content">`;
    
    for (const line of diffData.lineDiff) {
      const lineClass = `${classes.line} ${classes[line.type]}`;
      html += `<div class="${lineClass}">`;
      
      if (showLineNumbers) {
        const displayNum = line.type === 'removed' ? (line.oldLineNum || '') : (line.newLineNum || '');
        html += `<span class="${classes.lineNumber}">${displayNum}</span>`;
      }
      
      // Escape HTML in content
      const escapedContent = this._escapeHtml(line.content);
      html += `<span class="${classes.content}">${escapedContent}</span>`;
      
      html += `</div>`;
    }
    
    html += `</div>`; // diff-content
    html += `</div>`; // container
    
    // Emit diff displayed event
    this.events.emit('diff:displayed', {
      fromIndex: diffData.fromIndex,
      toIndex: diffData.toIndex,
      stats: diffData.stats,
      htmlLength: html.length,
      showLineNumbers: showLineNumbers
    });
    
    return html;
  }

  /**
   * Gets source diff as inline HTML with additions and deletions marked within the text
   * 
   * @param {Object} options - Diff and styling options
   * @param {number} options.fromIndex - Starting revision index (defaults to current - 1)
   * @param {number} options.toIndex - Ending revision index (defaults to current)
   * @param {Object} options.cssClasses - Custom CSS classes for styling
   * @returns {string} HTML string with inline diff markup
   */
  getSourceDiffInline(options = {}) {
    const {
      fromIndex = null,
      toIndex = null,
      cssClasses = {}
    } = options;
    
    // Get the raw diff data
    const diffData = this.getSourceDiff({ fromIndex, toIndex });
    
    // Default CSS classes for inline diff
    const classes = {
      container: cssClasses.container || 'squibview-diff-inline',
      added: cssClasses.added || 'diff-inline-added',
      removed: cssClasses.removed || 'diff-inline-removed'
    };
    
    // Get the actual content from the revisions
    const currentIndex = this.revisionManager.getCurrentIndex();
    const actualFromIndex = fromIndex === null ? Math.max(-1, currentIndex - 1) : fromIndex;
    const actualToIndex = toIndex === null ? currentIndex : toIndex;
    
    let fromContent, toContent;
    try {
      fromContent = this.revisionManager.getContentAtRevision(actualFromIndex).content;
      toContent = this.revisionManager.getContentAtRevision(actualToIndex).content;
    } catch (e) {
      return `<div class="${classes.container}"><p>Error: ${e.message}</p></div>`;
    }
    
    // Get character-level diff
    const diff = this.revisionManager.diffEngine.diff_main(fromContent, toContent);
    this.revisionManager.diffEngine.diff_cleanupSemantic(diff);
    
    // Convert diff to inline HTML
    let html = `<div class="${classes.container}" contenteditable="false">`;
    
    // Add header
    html += `<div class="diff-inline-header">`;
    html += `<div>Comparing revision ${actualFromIndex} to ${actualToIndex}</div>`;
    if (diffData.stats && diffData.stats.totalChanges > 0) {
      html += `<div class="diff-inline-stats">`;
      html += `<span style="color: #007bff;">+${diffData.stats.additions}</span> `;
      html += `<span style="color: #dc3545;">-${diffData.stats.deletions}</span>`;
      if (diffData.stats.modifications > 0) {
        html += ` <span style="color: #ffc107;">~${diffData.stats.modifications}</span>`;
      }
      html += `</div>`;
    }
    html += `</div>`;
    
    // Add content with inline diffs
    html += `<div class="diff-inline-content">`;
    
    for (const [op, text] of diff) {
      const escapedText = this._escapeHtml(text);
      if (op === 1) { // Addition
        html += `<span class="${classes.added}">${escapedText}</span>`;
      } else if (op === -1) { // Deletion
        html += `<span class="${classes.removed}">${escapedText}</span>`;
      } else { // Unchanged
        html += escapedText;
      }
    }
    
    html += `</div></div>`;
    
    // Emit diff displayed event
    this.events.emit('diff:displayed', {
      fromIndex: actualFromIndex,
      toIndex: actualToIndex,
      stats: diffData.stats,
      htmlLength: html.length,
      type: 'inline'
    });
    
    return html;
  }

  /**
   * Escapes HTML special characters
   * @private
   */
  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  /**
   * Registers a callback function to be called when text is selected
   * 
   * @param {Function} callback - Function to call when text is selected
   * @returns {Function} Unsubscribe function to remove the callback
   */
  onTextSelected(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    this.events.on('text:selected', callback);
    
    // Return unsubscribe function
    return () => {
      this.events.off('text:selected', callback);
    };
  }
  
  /**
   * Replaces the currently selected text in either panel
   * 
   * @param {string} replacement - The text to replace the selection with
   * @param {Object} selectionData - The selection data from the text:selected event
   * @returns {boolean} Whether the replacement was successful
   */
  replaceSelectedText(replacement, selectionData) {
    if (!selectionData) {
      return false;
    }
    
    if (selectionData.panel === 'source') {
      // Replace in source panel (textarea)
      const { start, end } = selectionData.range;
      const currentContent = this.input.value;
      const newContent = currentContent.substring(0, start) + 
                         replacement + 
                         currentContent.substring(end);
      
      // Update content
      this.setContent(newContent, this.inputContentType);
      
      // Return cursor focus to textarea
      this.input.focus();
      this.input.setSelectionRange(start + replacement.length, start + replacement.length);
      
      return true;
    } else if (selectionData.panel === 'rendered') {
      // Replace in rendered panel (contenteditable div)
      const range = selectionData.range;
      range.deleteContents();
      
      // Create a text node with the replacement text
      const textNode = document.createTextNode(replacement);
      range.insertNode(textNode);
      
      // Set the cursor at the end of the replaced text
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      
      // Collapse the range to a cursor position
      range.collapse(true);
      
      // Select the range
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      
      // Update the source content to match the HTML changes
      const editableContent = this.output.querySelector('[contenteditable="true"]');
      if (editableContent) {
        const renderedContent = editableContent.innerHTML;
        const renderer = this.renderers[this.inputContentType];
        
        if (renderer && renderer.outputToSource) {
          const originalSource = this.input.value;
          let newSource = renderer.outputToSource(renderedContent, {
            originalSource: originalSource
          });
          
          // Update source content
          this.input.value = newSource;
          
          // Add to revision history
          this.revisionManager.addRevision(newSource, this.inputContentType);
          
          // Emit content change event
          this.events.emit('content:change', newSource, this.inputContentType);
        }
      }
      
      return true;
    }
    
    return false;
  }
  
  /**
   * Sets the contenteditable attribute for the selected text
   * 
   * @param {boolean} editable - Whether the selection should be editable
   * @param {Object} selectionData - The selection data from the text:selected event
   * @returns {boolean} Whether the operation was successful
   */
  setSelectionEditable(editable, selectionData) {
    if (!selectionData || selectionData.panel !== 'rendered') {
      return false;
    }
    
    const range = selectionData.range;
    
    if (range) {
      // Create a wrapper span to control editability
      const span = document.createElement('span');
      span.contentEditable = editable.toString(); // 'true' or 'false'
      
      // Add a class to visually indicate locked content
      if (!editable) {
        span.className = 'squibview-locked-content';
        span.title = 'This content is locked (not editable)';
        // Add a small lock icon using CSS ::before
        span.style.position = 'relative';
        span.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
        span.style.border = '1px dashed #999';
        span.style.borderRadius = '3px';
        span.style.padding = '0 2px';
      } else {
        span.className = 'squibview-editable-content';
      }
      
      // Clone the range contents into the span
      span.appendChild(range.cloneContents());
      
      // Clear the selected content and insert the wrapped content
      range.deleteContents();
      range.insertNode(span);
      
      // Update the source content to match the HTML changes
      const editableContent = this.output.querySelector('[contenteditable="true"]');
      if (editableContent) {
        const renderedContent = editableContent.innerHTML;
        const renderer = this.renderers[this.inputContentType];
        
        if (renderer && renderer.outputToSource) {
          const originalSource = this.input.value;
          let newSource = renderer.outputToSource(renderedContent, {
            originalSource: originalSource
          });
          
          // Update source content
          this.input.value = newSource;
          
          // Add to revision history
          this.revisionManager.addRevision(newSource, this.inputContentType);
          
          // Emit content change event
          this.events.emit('content:change', newSource, this.inputContentType);
        }
      }
      
      return true;
    }
    
    return false;
  }
  
  /**
   * Toggles the editability of the selected text
   * 
   * @param {Object} selectionData - The selection data from the text:selected event
   * @returns {boolean} Whether the operation was successful and the new state (true=editable, false=locked)
   */
  toggleSelectionLock(selectionData) {
    if (!selectionData || selectionData.panel !== 'rendered') {
      return null;
    }
    
    // Detect if selection is inside an already locked/unlocked span
    let targetNode = selectionData.range.commonAncestorContainer;
    let isLocked = false;
    
    // Navigate up to find if selection is within a contenteditable span
    while (targetNode && targetNode.nodeType === Node.ELEMENT_NODE) {
      if (targetNode.hasAttribute('contenteditable')) {
        // Found a contenteditable attribute, check its value
        isLocked = targetNode.getAttribute('contenteditable') === 'false';
        break;
      }
      targetNode = targetNode.parentNode;
    }
    
    // Toggle the state - if locked, unlock it; if unlocked or not in a contenteditable span, lock it
    const newEditableState = isLocked;
    const result = this.setSelectionEditable(newEditableState, selectionData);
    
    // Return both success status and the new state
    return result ? newEditableState : null;
  }
  
  /**
   * Gets the current text selection data from either panel
   * 
   * @returns {Object|null} The selection data object or null if no text is selected
   */
  getCurrentSelection() {
    // First, check if we have a cached selection
    if (this.lastSelectionData) {
      return this.lastSelectionData;
    }
    
    const selection = document.getSelection();
    
    // Check if we have an active selection
    if (!selection || selection.toString().trim() === '') {
      return null;
    }
    
    // Determine which panel contains the selection
    if (this.input === document.activeElement) {
      // Source panel selection
      const selectionData = {
        panel: 'source',
        text: selection.toString(),
        range: {
          start: this.input.selectionStart,
          end: this.input.selectionEnd
        }
      };
      this.lastSelectionData = selectionData;
      return selectionData;
    } else {
      // Try to find if selection is within the rendered panel
      let node = selection.anchorNode;
      let isInOutput = false;
      
      // Walk up the DOM tree to check if selection is within output panel
      while (node && node !== document.body) {
        if (node === this.output) {
          isInOutput = true;
          break;
        }
        node = node.parentNode;
      }
      
      if (isInOutput) {
        const selectionData = {
          panel: 'rendered',
          text: selection.toString(),
          range: selection.getRangeAt(0),
          element: this.output.querySelector('[contenteditable="true"]')
        };
        this.lastSelectionData = selectionData;
        return selectionData;
      }
    }
    
    return null;
  }
  
  /**
   * Clears the current text selection
   */
  clearSelection() {
    this.lastSelectionData = null;
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  }
  
  /**
   * Sets a handler function for text replacement on selection
   * 
   * @param {Function|null} handler - Function to call when text is selected, or null to remove handler
   * @throws {Error} If handler is not a function or null
   */
  set onReplaceSelectedText(handler) {
    if (handler !== null && typeof handler !== 'function') {
      throw new Error('onReplaceSelectedText handler must be a function or null');
    }
    
    // Remove previous handler if it exists
    if (this._onTextReplacementHandler) {
      this.events.off('text:selected', this._onTextReplacementHandler);
      this._onTextReplacementHandler = null;
    }
    
    // Set new handler if provided
    if (handler) {
      this._onTextReplacementHandler = (selectionData) => {
        const result = handler(selectionData);
        
        // If the handler returns a string, use it to replace the selected text
        if (typeof result === 'string') {
          this.replaceSelectedText(result, selectionData);
        }
      };
      
      // Register the handler
      this.events.on('text:selected', this._onTextReplacementHandler);
    }
  }
  
  /**
   * Gets the current text replacement handler
   * 
   * @returns {Function|null} The current handler function or null if none is set
   */
  get onReplaceSelectedText() {
    return this._onTextReplacementHandler ? 
      (selectionData) => {
        const result = this._onTextReplacementHandler(selectionData);
        return result;
      } : null;
  }

  /**
   * Copies the rendered content to the clipboard with formatting.
   * Processes code blocks, SVG elements, and images to ensure they copy correctly.
   */
  async copyHTML() {
    const copyButton = this.controls.querySelector('.copy-html-button');
    copyButton.textContent = 'Copying...';

    try {
      const contentDiv = this.output.querySelector('div[contenteditable="true"]');
      if (!contentDiv) {
        throw new Error('Content div not found');
      }

      const clone = contentDiv.cloneNode(true);

      // Process code blocks
      clone.querySelectorAll('pre code').forEach(block => {
        const formattedCode = block.innerHTML;

        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.border = 'none';

        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.style.backgroundColor = '#f7f7f7';
        td.style.padding = '12px';
        td.style.fontFamily = 'Consolas, Monaco, "Courier New", monospace';
        td.style.whiteSpace = 'pre';
        td.style.border = 'none';

        td.innerHTML = formattedCode.trim();

        tr.appendChild(td);
        table.appendChild(tr);
        block.parentNode.replaceWith(table);
      });

      // Convert all images to data URLs for copying
      const images = clone.querySelectorAll('img');
      for (const img of images) {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Create new image and wait for it to load
          const tempImg = new Image();
          tempImg.crossOrigin = 'anonymous';

          await new Promise((resolve, reject) => {
            tempImg.onload = () => {
              // Get intended display dimensions from HTML attributes or CSS
              const hasWidthAttr = img.getAttribute('width');
              const hasHeightAttr = img.getAttribute('height');
              
              let displayWidth, displayHeight;
              
              if (hasWidthAttr && hasHeightAttr) {
                // Both dimensions specified
                displayWidth = parseInt(hasWidthAttr);
                displayHeight = parseInt(hasHeightAttr);
              } else if (hasWidthAttr && !hasHeightAttr) {
                // Only width specified - maintain aspect ratio
                displayWidth = parseInt(hasWidthAttr);
                displayHeight = Math.round((displayWidth / tempImg.naturalWidth) * tempImg.naturalHeight);
              } else if (!hasWidthAttr && hasHeightAttr) {
                // Only height specified - maintain aspect ratio
                displayHeight = parseInt(hasHeightAttr);
                displayWidth = Math.round((displayHeight / tempImg.naturalHeight) * tempImg.naturalWidth);
              } else {
                // No dimensions specified - use natural size
                displayWidth = tempImg.naturalWidth;
                displayHeight = tempImg.naturalHeight;
              }
              
              // Set canvas size to intended display size (not natural size)
              canvas.width = displayWidth;
              canvas.height = displayHeight;

              // Draw image scaled to intended size
              ctx.drawImage(tempImg, 0, 0, displayWidth, displayHeight);

              // Convert to data URL
              const dataUrl = canvas.toDataURL('image/png', 1.0);

              // Update original image with proper sizing
              img.src = dataUrl;
              img.setAttribute('width', displayWidth.toString());
              img.setAttribute('height', displayHeight.toString());
              img.style.width = displayWidth + 'px';
              img.style.height = displayHeight + 'px';
              resolve();
            };
            tempImg.onerror = reject;
            tempImg.src = img.src;
          });
        } catch (error) {
          console.error('Failed to convert image for copying:', error);
          // Preserve the original image source if conversion fails (e.g., for external badges)
          // This ensures badges from services like shields.io still work when copied
          if (img.src) {
            // Keep the original src and any existing dimensions
            const width = img.getAttribute('width');
            const height = img.getAttribute('height');
            if (width) img.style.width = width + (width.match(/\d+$/) ? 'px' : '');
            if (height) img.style.height = height + (height.match(/\d+$/) ? 'px' : '');
          }
        }
      }

      // Convert SVG elements to PNG (excluding math SVGs which are handled separately)
      const svgElements = clone.querySelectorAll('svg');
      for (const svg of svgElements) {
        // Skip SVGs that are inside math elements - they'll be handled separately
        if (svg.closest('.math-display')) {
          continue;
        }
        try {
          const pngBlob = await this.svgToPng(svg);
          const dataUrl = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(pngBlob);
          });

          const img = document.createElement('img');
          img.src = dataUrl;
          
          // Use the exact same dimension calculation logic as svgToPng
          const isMermaidSvg = svg.closest('.mermaid') || svg.classList.contains('mermaid');
          const hasExplicitDimensions = svg.getAttribute('width') && svg.getAttribute('height');
          
          let imgWidth, imgHeight;
          
          if (isMermaidSvg || !hasExplicitDimensions) {
            // For Mermaid or other generated SVGs, prioritize computed dimensions
            imgWidth = svg.clientWidth || 
                       (svg.viewBox && svg.viewBox.baseVal.width) || 
                       parseFloat(svg.getAttribute('width')) || 400;
            imgHeight = svg.clientHeight || 
                        (svg.viewBox && svg.viewBox.baseVal.height) || 
                        parseFloat(svg.getAttribute('height')) || 300;
          } else {
            // For explicit SVGs (like fenced SVG blocks), prioritize explicit attributes
            imgWidth = parseFloat(svg.getAttribute('width')) || 
                       (svg.viewBox && svg.viewBox.baseVal.width) || 
                       svg.clientWidth || 400;
            imgHeight = parseFloat(svg.getAttribute('height')) || 
                        (svg.viewBox && svg.viewBox.baseVal.height) || 
                        svg.clientHeight || 300;
          }
          
          // Set both HTML attributes and CSS properties for maximum compatibility
          img.width = imgWidth;
          img.height = imgHeight;
          img.setAttribute('width', imgWidth.toString());
          img.setAttribute('height', imgHeight.toString());
          img.style.width = imgWidth + 'px';
          img.style.height = imgHeight + 'px';
          img.style.maxWidth = 'none';  // Prevent CSS from constraining the image
          img.style.maxHeight = 'none';
          img.setAttribute('v:shapes', 'image' + Math.random().toString(36).substr(2, 9));
          img.alt = "Converted diagram";
          
          
          svg.parentNode.replaceChild(img, svg);
        } catch (error) {
          console.error('Failed to convert SVG:', error);
        }
      }

      // Convert Math elements to PNG images using the copy-as-image approach from math-test.html
      const mathElements = Array.from(clone.querySelectorAll('.math-display'));
      if (mathElements.length > 0) {
        
        for (const mathEl of mathElements) {
          try {
            
            const svg = mathEl.querySelector('svg');
            if (!svg) {
              console.warn('No SVG found in math element, skipping');
              continue;
            }

            // Convert SVG to PNG data URL using the exact approach from math-test.html
            const serializer = new XMLSerializer();
            const svgStr = serializer.serializeToString(svg);
            const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);
            
            const img = new Image();
            const dataUrl = await new Promise((resolve, reject) => {
              img.onload = function () {
                const canvas = document.createElement('canvas');
                
                // Try different approaches to get SVG dimensions
                let width, height;
                try {
                  // First try baseVal.value (works for absolute units)
                  width = svg.width.baseVal.value;
                  height = svg.height.baseVal.value;
                } catch (e) {
                  // Fallback for relative units - use viewBox or rendered size
                  if (svg.viewBox && svg.viewBox.baseVal) {
                    width = svg.viewBox.baseVal.width;
                    height = svg.viewBox.baseVal.height;
                  } else {
                    // Use the natural size of the loaded image
                    width = img.naturalWidth || img.width || 200;
                    height = img.naturalHeight || img.height || 50;
                  }
                }
                
                
                // Scale down math images to reasonable size for documents
                // MathJax SVGs often have large coordinate systems, scale them down aggressively
                const targetMaxWidth = 100;   // Even smaller target max width for truly compact math
                const targetMaxHeight = 30;   // Even smaller target max height for inline-like appearance

                // Apply an even smaller base scale factor for very compact output
                let scaleFactor = 0.025; // Even smaller base scale for very compact math

                // Calculate scaled dimensions
                let scaledWidth = width * scaleFactor;
                let scaledHeight = height * scaleFactor;

                // If still too large after base scaling, scale down further
                if (scaledWidth > targetMaxWidth || scaledHeight > targetMaxHeight) {
                  const scaleX = targetMaxWidth / scaledWidth;
                  const scaleY = targetMaxHeight / scaledHeight;
                  const additionalScale = Math.min(scaleX, scaleY);
                  scaleFactor *= additionalScale;
                  scaledWidth *= additionalScale;
                  scaledHeight *= additionalScale;
                }

                width = scaledWidth;
                height = scaledHeight;

                // Use a fixed DPR of 2 for crisp rendering on all displays
                const dpr = 2;

                // Set canvas size with device pixel ratio for crisp rendering
                canvas.width = width * dpr;
                canvas.height = height * dpr;
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';

                const ctx = canvas.getContext('2d');
                ctx.scale(dpr, dpr);

                // White background
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0, 0, width, height);

                // Draw the SVG image with proper scaling
                ctx.drawImage(img, 0, 0, width, height);
                
                // Clean up URL
                URL.revokeObjectURL(url);
                
                // Return data URL
                resolve(canvas.toDataURL('image/png'));
              };
              
              img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to load SVG image'));
              };
              
              img.src = url;
            });

            // Replace math element with img tag containing the PNG data URL
            const imgElement = document.createElement('img');
            imgElement.src = dataUrl;
            imgElement.style.cssText = 'display:block;margin:0.5em 0;max-width:100%;height:auto;';
            imgElement.alt = 'Math equation';
            
            mathEl.parentNode.replaceChild(imgElement, mathEl);
          } catch (error) {
            console.error('Failed to convert math element to image:', error);
            // Keep the original element if conversion fails
          }
        }
      }

      // Handle GeoJSON containers - convert canvas to image
      const geojsonContainers = clone.querySelectorAll('.geojson-container');
      for (const container of geojsonContainers) {
        try {
          // Find the corresponding GeoJSON container in the original DOM by searching with proper escaping
          const originalSource = container.getAttribute('data-original-source');
          if (!originalSource) {
            console.warn('No original source found for GeoJSON container');
            throw new Error('No original source');
          }

          // Find original container more reliably
          let originalContainer = null;
          const allOriginalContainers = this.output.querySelectorAll('.geojson-container');
          for (const candidate of allOriginalContainers) {
            if (candidate.getAttribute('data-original-source') === originalSource) {
              originalContainer = candidate;
              break;
            }
          }
          
          if (originalContainer) {
            try {
              // Use div-to-image conversion to capture the entire container
              const dataUrl = await this.divToDataUrl(originalContainer);
              if (dataUrl) {
                const img = document.createElement('img');
                img.src = dataUrl;
                img.style.cssText = 'width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 4px; margin: 0.5em 0;';
                img.alt = 'GeoJSON Map';
                
                // Replace the container with the image
                container.parentNode.replaceChild(img, container);
                continue;
              }
            } catch (error) {
              console.warn('Failed to convert GeoJSON container to image:', error);
            }
          } else {
            console.warn('Could not find original GeoJSON container');
          }
          
          // Fallback to placeholder if canvas conversion fails
          const placeholder = document.createElement('div');
          placeholder.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
          placeholder.textContent = '[GeoJSON Map - Interactive content not available in copy]';
          container.parentNode.replaceChild(placeholder, container);
        } catch (error) {
          console.error('Error processing GeoJSON container for copy:', error);
          // Fallback to placeholder
          const placeholder = document.createElement('div');
          placeholder.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
          placeholder.textContent = '[GeoJSON Map - Interactive content not available in copy]';
          container.parentNode.replaceChild(placeholder, container);
        }
      }

      // Handle TopoJSON containers - convert to structured data tables
      clone.querySelectorAll('.topojson-container').forEach(container => {
        const originalSource = container.getAttribute('data-original-source');
        if (originalSource) {
          try {
            const topoData = JSON.parse(originalSource);
            
            // Create a simple table showing TopoJSON data
            const table = document.createElement('table');
            table.style.cssText = 'width: 100%; border-collapse: collapse; border: 1px solid #ddd; margin: 0.5em 0;';
            
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<td colspan="2" style="background-color: #f5f5f5; padding: 8px; border: 1px solid #ddd; font-weight: bold;">TopoJSON Data</td>';
            table.appendChild(headerRow);
            
            const typeRow = document.createElement('tr');
            typeRow.innerHTML = `<td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Type:</td><td style="padding: 8px; border: 1px solid #ddd;">${topoData.type || 'Unknown'}</td>`;
            table.appendChild(typeRow);
            
            if (topoData.objects) {
              const objectsRow = document.createElement('tr');
              const objectNames = Object.keys(topoData.objects).join(', ');
              objectsRow.innerHTML = `<td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Objects:</td><td style="padding: 8px; border: 1px solid #ddd;">${objectNames}</td>`;
              table.appendChild(objectsRow);
            }
            
            container.parentNode.replaceChild(table, container);
          } catch (error) {
            // If JSON parsing fails, create a simple text block
            const textBlock = document.createElement('div');
            textBlock.style.cssText = 'padding: 12px; background-color: #f5f5f5; border: 1px solid #ddd; font-family: monospace; white-space: pre-wrap; margin: 0.5em 0;';
            textBlock.textContent = `TopoJSON Data:\n${originalSource}`;
            container.parentNode.replaceChild(textBlock, container);
          }
        } else {
          // No original source, replace with placeholder
          const placeholder = document.createElement('div');
          placeholder.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
          placeholder.textContent = '[TopoJSON Map - Interactive content not available in copy]';
          container.parentNode.replaceChild(placeholder, container);
        }
      });

      // Handle STL containers - convert canvas to image
      const stlContainers = clone.querySelectorAll('.stl-container');
      for (const container of stlContainers) {
        try {
          // Find the corresponding STL container in the original DOM by searching with proper escaping
          const originalSource = container.getAttribute('data-original-source');
          if (!originalSource) {
            console.warn('No original source found for STL container');
            throw new Error('No original source');
          }

          // Find original container more reliably
          let originalContainer = null;
          const allOriginalContainers = this.output.querySelectorAll('.stl-container');
          for (const candidate of allOriginalContainers) {
            if (candidate.getAttribute('data-original-source') === originalSource) {
              originalContainer = candidate;
              break;
            }
          }
          
          if (originalContainer) {
            // Look for canvas element in the original container (Three.js WebGL canvas)
            const canvas = originalContainer.querySelector('canvas');
            if (canvas && canvas.width > 0 && canvas.height > 0) {
              try {
                // Ensure the Three.js scene is rendered before capturing
                // The renderer should be accessible through the canvas or container
                const renderer = canvas._threeRenderer || originalContainer._threeRenderer;
                const scene = originalContainer._threeScene;
                const camera = originalContainer._threeCamera;
                
                // If we have access to the Three.js objects, render the scene
                if (renderer && scene && camera) {
                  renderer.render(scene, camera);
                }
                
                // Create image from canvas with error handling for WebGL context
                const dataUrl = canvas.toDataURL('image/png', 1.0);
                const img = document.createElement('img');
                img.src = dataUrl;
                img.style.cssText = 'width: 100%; height: 300px; border: 1px solid #ddd; border-radius: 4px; margin: 0.5em 0;';
                img.alt = 'STL 3D Model';
                
                // Replace the container with the image
                container.parentNode.replaceChild(img, container);
                continue;
              } catch (error) {
                console.warn('Failed to convert STL canvas to image (likely WebGL context issue):', error);
              }
            } else {
              console.warn('No valid canvas found in STL container');
            }
          } else {
            console.warn('Could not find original STL container');
          }
          
          // Fallback to placeholder if canvas conversion fails
          const placeholder = document.createElement('div');
          placeholder.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
          placeholder.textContent = '[STL 3D Model - Interactive content not available in copy]';
          container.parentNode.replaceChild(placeholder, container);
        } catch (error) {
          console.error('Error processing STL container for copy:', error);
          // Fallback to placeholder
          const placeholder = document.createElement('div');
          placeholder.style.cssText = 'padding: 12px; background-color: #f0f0f0; border: 1px solid #ccc; text-align: center; margin: 0.5em 0;';
          placeholder.textContent = '[STL 3D Model - Interactive content not available in copy]';
          container.parentNode.replaceChild(placeholder, container);
        }
      }

      const htmlContent = `
          <html xmlns:v="urn:schemas-microsoft-com:vml"
                xmlns:o="urn:schemas-microsoft-com:office:office"
                xmlns:w="urn:schemas-microsoft-com:office:word">
            <head>
              <meta charset="utf-8">
              <style>
                table { border-collapse: collapse; width: 100%; margin-bottom: 1em; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f0f0f0; font-weight: bold; }

                /* Code block styling */
                .hljs { display: block; overflow-x: auto; padding: 1em; }
                .hljs-keyword { color: #0033B3; }
                .hljs-string { color: #067D17; }
                .hljs-comment { color: #8C8C8C; }
                .hljs-function { color: #00627A; }
                .hljs-number { color: #1750EB; }
                .hljs-operator { color: #687687; }
                .hljs-punctuation { color: #000000; }

                /* Word-specific image handling */
                img { display: block; max-width: none; }
              </style>
            </head>
            <body>
              ${clone.innerHTML}
            </body>
          </html>`;

      const platform = this.getPlatform();

      if (platform === 'macos') {
        // macOS approach (previously working version)
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': new Blob([htmlContent], { type: 'text/html' }),
              'text/plain': new Blob([clone.innerText], { type: 'text/plain' })
            })
          ]);
        } catch (modernErr) {
          // Safari fallback
          if (!this.copyToClipboard(htmlContent)) {
            throw new Error('Fallback copy failed');
          }
        }
      } else {
        // Windows/Linux approach
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'fixed';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '0';
        tempDiv.innerHTML = htmlContent;
        document.body.appendChild(tempDiv);

        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': new Blob([htmlContent], { type: 'text/html' }),
              'text/plain': new Blob([clone.innerText], { type: 'text/plain' })
            })
          ]);
        } catch (modernErr) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(tempDiv);
          selection.removeAllRanges();
          selection.addRange(range);

          const successful = document.execCommand('copy');
          if (!successful) {
            throw new Error('Fallback copy failed');
          }
        } finally {
          if (tempDiv && tempDiv.parentNode) {
            document.body.removeChild(tempDiv);
          }
        }
      }

      copyButton.textContent = 'Copied!';
    } catch (err) {
      console.error('Copy HTML failed:', err);
      copyButton.textContent = 'Copy failed';
    }

    setTimeout(() => {
      copyButton.textContent = 'Copy Rendered';
    }, 2000);
  }

  /**
   * Converts an SVG element to a PNG blob.
   * 
   * @param {SVGElement} svgElement - The SVG element to convert
   * @returns {Promise<Blob>} A promise that resolves with the PNG blob
   */
  svgToPng(svgElement) {
    return new Promise((resolve, reject) => {
      const svgString = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      const scale = 2;
      
      // Check if this is a Mermaid-generated SVG (they don't have explicit width/height attributes)
      const isMermaidSvg = svgElement.closest('.mermaid') || svgElement.classList.contains('mermaid');
      const hasExplicitDimensions = svgElement.getAttribute('width') && svgElement.getAttribute('height');
      
      let svgWidth, svgHeight;
      
      if (isMermaidSvg || !hasExplicitDimensions) {
        // For Mermaid or other generated SVGs, prioritize computed dimensions
        svgWidth = svgElement.clientWidth || 
                   (svgElement.viewBox && svgElement.viewBox.baseVal.width) || 
                   parseFloat(svgElement.getAttribute('width')) || 400;
        svgHeight = svgElement.clientHeight || 
                    (svgElement.viewBox && svgElement.viewBox.baseVal.height) || 
                    parseFloat(svgElement.getAttribute('height')) || 300;
      } else {
        // For explicit SVGs (like fenced SVG blocks), prioritize explicit attributes
        svgWidth = parseFloat(svgElement.getAttribute('width')) || 
                   (svgElement.viewBox && svgElement.viewBox.baseVal.width) || 
                   svgElement.clientWidth || 400;
        svgHeight = parseFloat(svgElement.getAttribute('height')) || 
                    (svgElement.viewBox && svgElement.viewBox.baseVal.height) || 
                    svgElement.clientHeight || 300;
      }


      // Ensure the SVG string has explicit dimensions by modifying it if necessary
      let modifiedSvgString = svgString;
      if (svgWidth && svgHeight) {
        // Create a temporary SVG element to modify the serialized string
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgString;
        const tempSvg = tempDiv.querySelector('svg');
        if (tempSvg) {
          tempSvg.setAttribute('width', svgWidth.toString());
          tempSvg.setAttribute('height', svgHeight.toString());
          modifiedSvgString = new XMLSerializer().serializeToString(tempSvg);
        }
      }


      canvas.width = svgWidth * scale;
      canvas.height = svgHeight * scale;
      ctx.scale(scale, scale);

      img.onload = () => {
        try {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, svgWidth, svgHeight);
          canvas.toBlob(blob => {
            resolve(blob);
          }, 'image/png', 1.0);
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = reject;
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(modifiedSvgString)}`;
      img.src = svgDataUrl;
    });
  }

  /**
   * Shows or hides the control buttons.
   * 
   * @param {boolean} show - Whether to show the controls
   */
  controlsShow(show) {
    this.controls.style.display = show ? '' : 'none';
    this.options.showControls = show;
    this.adjustLayout();
    
    // Emit controls visibility change event
    this.events.emit('controls:visibility', show);
  }

  /**
   * Shows or hides the title section.
   * 
   * @param {boolean} show - Whether to show the title
   */
  titleShow(show) {
    this.title.style.display = show ? '' : 'none';
    this.options.titleShow = show;
    this.adjustLayout();
    
    // Emit title visibility change event
    this.events.emit('title:visibility', show);
  }

  /**
   * Sets the content of the title section.
   * 
   * @param {string} content - The HTML content for the title
   */
  titleSetContent(content) {
    this.title.innerHTML = content;
    this.options.titleContent = content;
    
    // Emit title content change event
    this.events.emit('title:content', content);
  }

  /**
   * Gets the content of the title section.
   * 
   * @returns {string} The HTML content of the title
   */
  titleGetContent() {
    return this.title.innerHTML;
  }

  /**
   * Toggles between the different view modes (source, rendered, split).
   * Cycles through: source -> split -> rendered -> source.
   */
  toggleView() {
    if (this.currentView === 'src') {
      this.setView('split');
    } else if (this.currentView === 'split') {
      this.setView('html');
    } else {
      this.setView('src');
    }
  }

  /**
   * Copies text to clipboard using various fallback methods.
   * 
   * @param {string} string - The text to copy to the clipboard
   * @returns {boolean} Whether the copy operation was successful
   */
  copyToClipboard(string) {
    let textarea;
    let result;

    try {
      textarea = document.createElement('textarea');
      textarea.setAttribute('readonly', true);
      textarea.setAttribute('contenteditable', true);
      textarea.style.position = 'fixed';
      textarea.style.left = '0';
      textarea.style.top = '0';
      textarea.style.opacity = '0';
      textarea.value = string;

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const range = document.createRange();
      range.selectNodeContents(textarea);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      textarea.setSelectionRange(0, textarea.value.length);
      result = document.execCommand('copy');
    } catch (err) {
      console.error(err);
      result = null;
    } finally {
      if (textarea && textarea.parentNode) {
        document.body.removeChild(textarea);
      }
    }

    // manual copy fallback using prompt
    if (!result) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
      result = prompt(`Press ${copyHotkey}`, string);
      if (!result) {
        return false;
      }
    }
    return true;
  }

  /**
   * Converts a math element to a PNG blob using simple SVG-to-PNG conversion.
   * Based on the working approach from math-test.html
   * 
   * @param {HTMLElement} mathElement - The math element to convert
   * @returns {Promise<Blob>} A promise that resolves with the PNG blob
   */
  async mathToPng(mathElement) {
    return new Promise((resolve, reject) => {
      try {
        const svg = mathElement.querySelector('svg');
        if (!svg) {
          reject(new Error('No SVG found in math element'));
          return;
        }

        // Serialize SVG to string
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          canvas.width = svg.width.baseVal.value;
          canvas.height = svg.height.baseVal.value;
          const ctx = canvas.getContext('2d');
          
          // White background
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw the SVG image
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Clean up URL
          URL.revokeObjectURL(url);
          
          // Convert canvas to blob
          canvas.toBlob(resolve, 'image/png');
        };
        
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('Failed to load SVG image'));
        };
        
        img.src = url;
      } catch (error) {
        reject(error);
      }
    });
  }


  /**
   * Checks if MathJax 3 is available with the necessary APIs.
   * 
   * @returns {boolean} True if MathJax 3 is properly loaded
   * @private
   */
  isMathJax3Available() {
    return typeof MathJax !== 'undefined' &&
           typeof MathJax.typesetPromise === 'function' &&
           (typeof MathJax.tex2svgPromise === 'function' || 
            // Allow test environment with basic MathJax mock
            (typeof jest !== 'undefined' && MathJax.version));
  }



  /**
   * Converts CHTML MathJax output to PNG using html2canvas-like approach.
   * 
   * @param {HTMLElement} chtmlContainer - The CHTML MathJax container
   * @returns {Promise<Blob|null>} PNG blob if successful, null otherwise
   * @private
   */
  async mathCHTMLToPng(chtmlContainer) {
    try {
      // Get container bounds
      const rect = chtmlContainer.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        console.warn('CHTML container has zero dimensions');
        return null;
      }

      // Create canvas
      const padding = 8;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      const scale = 2; // High DPI
      const canvasWidth = rect.width + padding * 2;
      const canvasHeight = rect.height + padding * 2;
      
      canvas.width = canvasWidth * scale;
      canvas.height = canvasHeight * scale;
      canvas.style.width = canvasWidth + 'px';
      canvas.style.height = canvasHeight + 'px';
      ctx.scale(scale, scale);

      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Convert CHTML to SVG for rendering
      const foreignObject = `
        <svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
          <foreignObject x="${padding}" y="${padding}" width="${rect.width}" height="${rect.height}">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-size: 16px; font-family: 'Times New Roman', serif;">
              ${chtmlContainer.outerHTML}
            </div>
          </foreignObject>
        </svg>
      `;

      const svgBlob = new Blob([foreignObject], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          try {
            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
            URL.revokeObjectURL(url);
            canvas.toBlob(resolve, 'image/png');
          } catch (error) {
            URL.revokeObjectURL(url);
            reject(error);
          }
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error('Failed to load CHTML as image'));
        };
        img.src = url;
      });

    } catch (error) {
      console.error('CHTML to PNG conversion failed:', error);
      return null;
    }
  }

  /**
   * Detects the user's operating system platform.
   * 
   * @returns {string} The detected platform: 'macos', 'windows', 'linux', or 'unknown'
   */
  getPlatform() {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();

    if (platform.includes('mac') || userAgent.includes('mac')) {
      return 'macos';
    } else if (userAgent.includes('windows')) {
      return 'windows';
    } else if (userAgent.includes('linux')) {
      return 'linux';
    }
    return 'unknown';
  }
  
  /**
   * Example of how to use text selection features
   * This method demonstrates registering selection callbacks and manipulating selected text
   * 
   * @example
   * // Register a selection callback
   * const editor = new SquibView('#editor');
   * const unsubscribe = editor.onTextSelected(selectionData => {
   *   console.log(`Selected text: ${selectionData.text} in ${selectionData.panel} panel`);
   *   
   *   // Replace selection with bold text if in source panel
   *   if (selectionData.panel === 'source') {
   *     editor.replaceSelectedText(`**${selectionData.text}**`, selectionData);
   *   }
   *   
   *   // Make selection non-editable if in rendered panel
   *   if (selectionData.panel === 'rendered') {
   *     editor.setSelectionEditable(false, selectionData);
   *   }
   * });
   * 
   * // Later, to stop listening for selections:
   * unsubscribe();
   * 
   * // Get current selection manually (without callback)
   * const selection = editor.getCurrentSelection();
   * if (selection) {
   *   editor.replaceSelectedText('replacement text', selection);
   * }
   */
  demonstrateSelectionFeatures() {
    // This is a documentation method only and doesn't need implementation
    console.log('See method documentation for usage examples');
  }

  /**
   * Creates a complete HTML page from a HTML snippet/div content.
   * 
   * @param {string} inputDivHTML - The HTML content to include in the page
   * @param {boolean} [editable=false] - Whether the content should be editable
   * @returns {string} A complete HTML page as a string
   */
  makeHTMLPageFromDiv(inputDivHTML, editable = false) {
    let editableAttr = editable ? 'contenteditable="true"' : '';
    let s =
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Viewer with Graphics Support</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
  <xscripx src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></xscripx>
  <xscripx src="https://unpkg.com/mermaid/dist/mermaid.min.js"></xscripx>
  <style>
      body {
          font-family: Arial, sans-serif;
          box-sizing: border-box;
          padding: 20px;
      }
      .squibview-output {
          width: 50%;
          margin: auto;
      }
      pre {
          background-color: #f4f4f4;
          padding: 10px;
          border-radius: 5px;
          overflow-x: auto;
      }
      table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
      }
      table, th, td {
          border: 1px solid black;
      }
      th, td {
          padding: 8px;
          text-align: left;
      }
  </style>
</head>
<body ${editableAttr}>
  ${inputDivHTML}
</body>
</html>`;
    // Replace the xscript placeholders with real script tags
    s = s.replaceAll("xscripx", "script");
    return s;
  }

  /**
   * Creates a RevealJS presentation page from markdown content.
   * Splits the markdown on '---' delimiters to create slides.
   * 
   * @param {string} markdown - The markdown content to convert to slides
   * @param {string} [title="Slide Presentation"] - The title for the presentation
   * @returns {string} A complete HTML page with RevealJS for presenting slides
   */
  makeRevealJSFullPage(markdown, title = "Slide Presentation") {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.css">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js/dist/theme/black.css">
      <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
  </head>
  <body>
      <div class="reveal" contenteditable="true">
          <div class="slides">
              ${markdown.split('---').map(slide => `<section data-markdown><script type="text/template">${slide.trim()}</script></section>`).join('\n')}
          </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/reveal.js/dist/reveal.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/reveal.js/plugin/markdown/markdown.js"></script>
      <script>
          Reveal.initialize({
              plugins: [ RevealMarkdown ]
          });
          
          // Ensure Mermaid diagrams initialize correctly
          document.addEventListener('DOMContentLoaded', () => {
              mermaid.initialize({ startOnLoad: true , securityLevel: 'loose', theme: 'dark' });
              document.querySelectorAll('.mermaid').forEach(el => {
                  el.innerHTML = el.textContent;
                  mermaid.init(undefined, el);
              });
          });
      </script>
  </body>
  </html>`;
  }

  /**
   * Converts CSV/TSV content to a markdown table.
   * 
   * @param {string} input - The CSV/TSV string to convert
   * @param {string} [delimiter=','] - The delimiter used in the input (comma, tab, etc.)
   * @returns {string} A markdown formatted table
   */
  csvOrTsvToMarkdownTable(input, delimiter = ',') {
    // Parse CSV/TSV content
    const parsedData = Papa.parse(input, {
      delimiter,
      skipEmptyLines: true
    });

    const rows = parsedData.data;

    if (rows.length === 0) return 'No data found.';

    // Markdown table header
    const header = `| ${rows[0].join(' | ')} |`;
    const separator = `| ${rows[0].map(() => '---').join(' | ')} |`;
    const tableRows = rows.slice(1).map(row => `| ${row.join(' | ')} |`).join('\n');

    return `${header}\n${separator}\n${tableRows}`;
  }

  /**
   * Gets whether image tags are preserved in source view
   * @returns {boolean} Whether image tags are preserved
   */
  get preserveImageTags() {
    return this.options.preserveImageTags;
  }

  /**
   * Sets whether image tags should be preserved in source view
   * @param {boolean} value - Whether to preserve image tags
   */
  set preserveImageTags(value) {
    this.options.preserveImageTags = value;
    // Re-render content to apply the new setting
    this.renderMarkdown();
  }

  /**
   * Fixes linefeeds in markdown by adding two spaces at the end of lines that are not already hard breaks, not empty, and not part of a list, heading, or code block.
   * @param {string} markdown - The markdown text to process
   * @returns {string} - The markdown text with fixed linefeeds
   */
  fixLinefeedsInMarkdown(markdown) {
    if (typeof markdown !== 'string') return markdown;
    const lines = markdown.split('\n');
    let inCodeBlock = false;
    return lines.map(line => {
      // Toggle code block state
      if (/^```/.test(line)) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      if (inCodeBlock) return line;
      // Skip headings, lists, blockquotes, tables, and empty lines
      if (/^\s*([#\-*>]|\d+\.|\|)/.test(line) || line.trim() === '') return line;
      // If line already ends with two or more spaces, or is just whitespace, skip
      if (/\s{2,}$/.test(line)) return line;
      // Otherwise, add two spaces
      return line + '  ';
    }).join('\n');
  }

  /**
   * Toggles the linefeed view state. When enabled, rendered HTML will have <br> at the end of lines that would otherwise be collapsed.
   */
  toggleLinefeedView() {
    this.linefeedViewEnabled = !this.linefeedViewEnabled;
    this.renderOutput();
  }

  /**
   * Converts a DOM element to a data URL image.
   * @param {HTMLElement} element - The DOM element to convert
   * @returns {Promise<string>} A promise that resolves with the data URL
   */
  async divToDataUrl(element) {
    return new Promise((resolve, reject) => {
      try {
        // Get the element's dimensions
        const rect = element.getBoundingClientRect();
        const width = rect.width || 400;
        const height = rect.height || 300;

        // Special handling for Leaflet maps (GeoJSON containers)
        if (element.classList.contains('geojson-container') || element.id && element.id.startsWith('map-')) {
          // Try to access the Leaflet map instance
          const mapId = element.id;
          if (typeof window.L !== 'undefined' && mapId && window[mapId + '_map']) {
            const map = window[mapId + '_map'];
            
            // Use Leaflet's built-in screenshot functionality if available
            if (map.getContainer) {
              try {
                // Create a canvas from the map container using html2canvas-like approach
                const mapContainer = map.getContainer();
                const mapRect = mapContainer.getBoundingClientRect();
                
                // Create canvas and draw the map tiles
                const canvas = document.createElement('canvas');
                canvas.width = mapRect.width;
                canvas.height = mapRect.height;
                const ctx = canvas.getContext('2d');
                
                // White background
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Try to capture tile layers
                const tileLayers = mapContainer.querySelectorAll('.leaflet-tile');
                let tilesLoaded = 0;
                const totalTiles = tileLayers.length;
                
                if (totalTiles === 0) {
                  // No tiles, just return white canvas
                  const dataUrl = canvas.toDataURL('image/png', 1.0);
                  resolve(dataUrl);
                  return;
                }
                
                // Load and draw each tile
                for (const tile of tileLayers) {
                  const img = new Image();
                  img.crossOrigin = 'anonymous';
                  
                  img.onload = () => {
                    try {
                      const tileRect = tile.getBoundingClientRect();
                      const offsetX = tileRect.left - mapRect.left;
                      const offsetY = tileRect.top - mapRect.top;
                      
                      ctx.drawImage(img, offsetX, offsetY, tileRect.width, tileRect.height);
                    } catch (e) {
                      console.warn('Failed to draw tile:', e);
                    }
                    
                    tilesLoaded++;
                    if (tilesLoaded === totalTiles) {
                      // All tiles loaded, now draw SVG overlays
                      const svgElements = mapContainer.querySelectorAll('svg');
                      for (const svg of svgElements) {
                        if (svg.classList.contains('leaflet-attribution-flag')) continue;
                        
                        try {
                          const svgRect = svg.getBoundingClientRect();
                          const svgOffsetX = svgRect.left - mapRect.left;
                          const svgOffsetY = svgRect.top - mapRect.top;
                          
                          // Convert SVG to image and draw it
                          const svgData = new XMLSerializer().serializeToString(svg);
                          const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                          const svgUrl = URL.createObjectURL(svgBlob);
                          
                          const svgImg = new Image();
                          svgImg.onload = () => {
                            ctx.drawImage(svgImg, svgOffsetX, svgOffsetY);
                            URL.revokeObjectURL(svgUrl);
                          };
                          svgImg.src = svgUrl;
                        } catch (e) {
                          console.warn('Failed to draw SVG overlay:', e);
                        }
                      }
                      
                      const dataUrl = canvas.toDataURL('image/png', 1.0);
                      resolve(dataUrl);
                    }
                  };
                  
                  img.onerror = () => {
                    tilesLoaded++;
                    if (tilesLoaded === totalTiles) {
                      const dataUrl = canvas.toDataURL('image/png', 1.0);
                      resolve(dataUrl);
                    }
                  };
                  
                  img.src = tile.src;
                }
                
                return;
              } catch (error) {
                console.warn('Leaflet-specific approach failed:', error);
              }
            }
          }
        }

        // First try to find existing canvas or SVG elements
        const canvas = element.querySelector('canvas');
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          try {
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            resolve(dataUrl);
            return;
          } catch (error) {
            console.warn('Canvas toDataURL failed, trying SVG approach:', error);
          }
        }

        // Try to find SVG elements
        const svgs = element.querySelectorAll('svg');
        if (svgs.length > 0) {
          // Find the largest SVG (excluding small attribution icons)
          let bestSvg = null;
          let maxArea = 0;
          
          for (const svg of svgs) {
            if (svg.classList.contains('leaflet-attribution-flag')) continue;
            
            const svgWidth = svg.clientWidth || parseFloat(svg.getAttribute('width')) || 0;
            const svgHeight = svg.clientHeight || parseFloat(svg.getAttribute('height')) || 0;
            const area = svgWidth * svgHeight;
            
            if (area > maxArea && area > 100) {
              maxArea = area;
              bestSvg = svg;
            }
          }
          
          if (bestSvg) {
            try {
              this.svgToPng(bestSvg).then(pngBlob => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(pngBlob);
              }).catch(reject);
              return;
            } catch (error) {
              console.warn('SVG conversion failed, trying simple approach:', error);
            }
          }
        }

        // Simple fallback: create a placeholder image
        const fallbackCanvas = document.createElement('canvas');
        fallbackCanvas.width = width;
        fallbackCanvas.height = height;
        const ctx = fallbackCanvas.getContext('2d');
        
        // White background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        
        // Draw simple text indicating content type
        ctx.fillStyle = '#666';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GeoJSON Map', width / 2, height / 2);
        ctx.fillText('(Interactive content)', width / 2, height / 2 + 20);
        
        const dataUrl = fallbackCanvas.toDataURL('image/png', 1.0);
        resolve(dataUrl);
        
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Initialize line numbers functionality
   * @private
   */
  initializeLineNumbers() {
    // Create line mirror for measuring line heights
    this.lineMirror = document.createElement('div');
    this.lineMirror.className = `${this.options.baseClass}-line-mirror`;
    this.lineMirror.setAttribute('aria-hidden', 'true');
    this.container.appendChild(this.lineMirror);
    
    // Track last line count for optimization
    this.lastLineCount = 0;
    
    // Set up scroll synchronization
    this.setupLineNumberScrollSync();
    
    // Store bound handler for cleanup
    this._lineNumberInputHandler = () => {
      this.updateLineNumbersIfNeeded();
    };
    
    // Update line numbers on input
    this.input.addEventListener('input', this._lineNumberInputHandler);
    
    // Store bound resize handler for cleanup
    this._lineNumberResizeHandler = this.updateLineNumbersDebounced.bind(this);
    
    // Update on window resize
    window.addEventListener('resize', this._lineNumberResizeHandler);
    
    // Initial update
    this.updateLineNumbers();
  }

  /**
   * Cleanup line numbers functionality
   * @private
   */
  cleanupLineNumbers() {
    // Remove event listeners
    if (this._lineNumberInputHandler) {
      this.input.removeEventListener('input', this._lineNumberInputHandler);
      this._lineNumberInputHandler = null;
    }
    if (this._lineNumberResizeHandler) {
      window.removeEventListener('resize', this._lineNumberResizeHandler);
      this._lineNumberResizeHandler = null;
    }
    
    // Remove line mirror
    if (this.lineMirror && this.lineMirror.parentNode) {
      this.lineMirror.parentNode.removeChild(this.lineMirror);
    }
    
    // Clear references
    this.lineMirror = undefined;
    this.lineGutter = undefined;
    this.sourcePanel = undefined;
  }

  /**
   * Set up scroll synchronization between textarea and line gutter
   * @private
   */
  setupLineNumberScrollSync() {
    if (!this.lineGutter) return;
    
    this.input.addEventListener('scroll', () => {
      if (this.lineGutter) {
        this.lineGutter.scrollTop = this.input.scrollTop;
      }
    });
  }

  /**
   * Update line numbers if the line count has changed
   * @private
   */
  updateLineNumbersIfNeeded() {
    const newLineCount = (this.input.value.match(/\n/g) || []).length + 1;
    if (newLineCount !== this.lastLineCount) {
      this.lastLineCount = newLineCount;
      this.updateLineNumbersDebounced();
    }
  }

  /**
   * Debounced version of updateLineNumbers
   * @private
   */
  updateLineNumbersDebounced = this.debounce(() => {
    requestAnimationFrame(() => this.updateLineNumbers());
  }, 100);

  /**
   * Update the line numbers in the gutter
   * @private
   */
  updateLineNumbers() {
    if (!this.options.showLineNumbers || !this.lineGutter) return;
    
    const lines = this.input.value.split('\n');
    const totalLines = lines.length;
    const minDigits = Math.max(
      this.options.lineNumberMinDigits,
      String(totalLines + this.options.lineNumberStart - 1).length
    );
    
    // Clear gutter
    this.lineGutter.innerHTML = '';
    
    // Sync mirror styles with textarea
    this.syncMirrorStyles();
    
    // Create line number elements
    lines.forEach((line, index) => {
      const lineNum = this.options.lineNumberStart + index;
      const lineNumStr = String(lineNum).padStart(minDigits, '0');
      
      // Measure line height
      const lineHeight = this.measureLineHeight(line);
      
      // Create line number element
      const gutterLine = document.createElement('div');
      gutterLine.className = `${this.options.baseClass}-gutter-line`;
      gutterLine.textContent = lineNumStr;
      gutterLine.style.height = lineHeight + 'px';
      gutterLine.style.lineHeight = lineHeight + 'px';
      
      this.lineGutter.appendChild(gutterLine);
    });
  }

  /**
   * Measure the height of a single line of text
   * @private
   * @param {string} lineContent - The content of the line
   * @returns {number} The height in pixels
   */
  measureLineHeight(lineContent) {
    // Create temporary element in mirror
    const tempLine = document.createElement('div');
    tempLine.textContent = lineContent || '\u00A0'; // nbsp for empty lines
    tempLine.style.wordBreak = 'break-all';
    tempLine.style.whiteSpace = 'pre-wrap';
    tempLine.style.overflow = 'hidden';
    
    this.lineMirror.appendChild(tempLine);
    const rect = tempLine.getBoundingClientRect();
    const height = Math.ceil(rect.height); // Round up to avoid sub-pixel issues
    this.lineMirror.removeChild(tempLine);
    
    return height;
  }

  /**
   * Sync the mirror div styles with the textarea
   * @private
   */
  syncMirrorStyles() {
    const computed = window.getComputedStyle(this.input);
    const stylesToCopy = [
      'fontFamily', 'fontSize', 'lineHeight', 'letterSpacing',
      'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
      'borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth',
      'boxSizing', 'whiteSpace', 'wordWrap', 'wordBreak', 'overflowWrap'
    ];
    
    stylesToCopy.forEach(prop => {
      this.lineMirror.style[prop] = computed[prop];
    });
    
    // Match textarea content width exactly
    this.lineMirror.style.width = this.input.clientWidth + 'px';
  }

  /**
   * Toggle line numbers on/off
   * @param {boolean} show - Whether to show line numbers
   */
  setLineNumbers(show) {
    if (this.options.showLineNumbers === show) return;
    
    this.options.showLineNumbers = show;
    
    // Store current state
    const currentContent = this.getContent();
    const currentType = this.inputContentType;
    const currentView = this.currentView;
    
    // Clean up existing line numbers if any
    if (!show && this.lineMirror) {
      this.cleanupLineNumbers();
    }
    
    // Re-create structure
    this.createStructure();
    this.initializeEventHandlers();
    this.initializeResizeObserver();
    
    if (show) {
      this.initializeLineNumbers();
    }
    
    // Restore content and view
    this.setContent(currentContent, currentType, false);
    this.setView(currentView);
    
    // Update type buttons
    this.updateTypeButtons();
  }

  /**
   * Get the current line numbers state
   * @returns {boolean} Whether line numbers are shown
   */
  getLineNumbers() {
    return this.options.showLineNumbers;
  }

  /**
   * Set the starting line number
   * @param {number} start - The starting line number
   */
  setLineNumberStart(start) {
    this.options.lineNumberStart = start;
    if (this.options.showLineNumbers) {
      this.updateLineNumbers();
    }
  }

  /**
   * Utility function to debounce function calls
   * @private
   * @param {Function} func - The function to debounce
   * @param {number} wait - The debounce delay in milliseconds
   * @returns {Function} The debounced function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// The React component wrapper has been moved to a separate file
// to avoid dependency issues when React is not available

// Export the main class
export default SquibView;