/**
 * SquibView Autoload Entry Point
 * This build variant automatically loads fence handlers on-demand (mermaid, hljs, mathjax, leaflet, three.js)
 * Core markdown-it functionality is bundled, specialized libraries load when needed
 *
 * Developers can override autoloading by:
 * 1. Loading libraries themselves before initializing SquibView
 * 2. Providing custom CDN URLs via options
 * 3. Disabling autoload for specific libraries
 */

import SquibView from './squibview.js';
import MarkdownIt from 'markdown-it';

// Default CDN URLs for autoloading - can be overridden
const DEFAULT_CDN_URLS = {
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

// Track loading states to prevent duplicates
const loadingStates = {};

/**
 * Load a script dynamically
 * @param {string} src - Script URL
 * @returns {Promise<void>}
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    // Check if script already exists
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
 * @param {string} href - CSS URL
 * @returns {Promise<void>}
 */
function loadCSS(href) {
  return new Promise((resolve, reject) => {
    // Check if CSS already exists
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
 * Autoload a library with duplicate prevention
 * @param {string} name - Library name
 * @param {Function} check - Function to check if library is loaded
 * @param {string} scriptUrl - Script URL
 * @param {string} [cssUrl] - Optional CSS URL
 * @returns {Promise<boolean>}
 */
async function autoloadLibrary(name, check, scriptUrl, cssUrl = null) {
  // Check if already loaded
  if (check()) {
    return true;
  }

  // Check if currently loading
  const stateKey = `_squibview_${name}_loading`;
  if (window[stateKey]) {
    return window[stateKey];
  }

  // Start loading
  const loadPromise = (async () => {
    try {
      const promises = [];

      if (scriptUrl) {
        promises.push(loadScript(scriptUrl));
      }

      if (cssUrl) {
        promises.push(loadCSS(cssUrl));
      }

      await Promise.all(promises);

      // Verify library loaded
      return check();
    } catch (err) {
      console.error(`SquibView: Failed to load ${name}:`, err);
      return false;
    } finally {
      // Clear loading state
      delete window[stateKey];
    }
  })();

  // Store promise to prevent duplicate loading
  window[stateKey] = loadPromise;
  return loadPromise;
}

// Store original methods to wrap them
const OriginalSquibView = SquibView;
const originalInitializeLibraries = SquibView.prototype.initializeLibraries;

// Override initializeLibraries to make it safe when libraries aren't loaded yet
SquibView.prototype.initializeLibraries = function() {
  // Initialize markdown-it (this is always bundled in autoload build)
  this.md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
      const hljs = window.hljs;
      if (lang && hljs && hljs.getLanguage && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (e) {
          console.warn('Highlight.js error:', e);
        }
      }
      return ''; // Use default
    }
  });

  // Configure markdown-it with custom fence renderer (from original)
  const defaultFenceRenderer = this.md.renderer.rules.fence || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  this.md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const info = token.info.trim();
    const content = token.content;

    // Handle special fence types
    if (info === 'mermaid') {
      const escapedContent = this.md.utils.escapeHtml(content);
      return `<div class="mermaid" data-source-type="mermaid">${escapedContent}</div>`;
    }

    if (info === 'math') {
      // Generate unique ID for math block
      const mathId = `math-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const singleLineContent = content.replace(/\n/g, ' ').trim();
      return `<div id="${mathId}" class="math-display" data-source-type="math">$$${singleLineContent}$$</div>`;
    }

    if (info === 'svg') {
      const escapeForAttribute = (str) => {
        return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '&#10;');
      };
      const escapedContent = escapeForAttribute(content);
      return `<div class="svg-container" data-original-source="${escapedContent}">${content}</div>`;
    }

    if (['geojson', 'topojson', 'stl', 'csv', 'tsv', 'psv', 'ssv'].includes(info)) {
      const escapedContent = this.md.utils.escapeHtml(content);
      return `<div class="${info}-container" data-original-source="${escapedContent}">${escapedContent}</div>`;
    }

    // Default fence rendering
    return defaultFenceRenderer(tokens, idx, options, env, self);
  };

  // Only initialize mermaid if it's available
  if (typeof window.mermaid !== 'undefined' && window.mermaid.initialize) {
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
};

// Create enhanced SquibView class with autoload support
class SquibViewAutoload extends OriginalSquibView {
  constructor(selector, options = {}) {
    // Extract autoload options before passing to parent
    const autoloadConfig = options.autoload || {};

    // Parse library configurations with support for multiple formats
    const parseLibraryConfig = (libConfig, defaultStrategy = 'ondemand') => {
      // If false or 'none', disable the library
      if (libConfig === false || libConfig === 'none') {
        return { strategy: 'none' };
      }

      // If true or 'auto', load immediately
      if (libConfig === true || libConfig === 'auto') {
        return { strategy: 'auto' };
      }

      // If 'ondemand', load when needed
      if (libConfig === 'ondemand' || libConfig === undefined) {
        return { strategy: 'ondemand' };
      }

      // If it's a function, it's a custom handler
      if (typeof libConfig === 'function') {
        return { strategy: 'custom', handler: libConfig };
      }

      // If it's an object, parse its properties
      if (typeof libConfig === 'object' && libConfig !== null) {
        return {
          strategy: libConfig.strategy || defaultStrategy,
          cdnUrl: libConfig.cdnUrl,
          handler: libConfig.handler,
          ...libConfig
        };
      }

      // Default to ondemand
      return { strategy: defaultStrategy };
    };

    // Setup autoload configuration first
    const autoloadSettings = {
      enabled: autoloadConfig.enabled !== false, // Default true
      cdnUrls: { ...DEFAULT_CDN_URLS, ...(autoloadConfig.cdnUrls || {}) },
      libraries: {
        mermaid: parseLibraryConfig(autoloadConfig.mermaid),
        hljs: parseLibraryConfig(autoloadConfig.hljs),
        mathjax: parseLibraryConfig(autoloadConfig.mathjax),
        leaflet: parseLibraryConfig(autoloadConfig.leaflet),
        three: parseLibraryConfig(autoloadConfig.three)
      }
    };

    // Initialize parent (now safe because we overrode initializeLibraries)
    super(selector, options);

    // Store config after parent init
    this.autoloadConfig = autoloadSettings;
    this.loadedLibraries = new Set();

    // Handle auto-loading strategies
    if (this.autoloadConfig.enabled) {
      // Load libraries with 'auto' strategy immediately
      setTimeout(() => this.loadAutoLibraries(), 0);
    }
  }

  // Load libraries that have 'auto' strategy
  async loadAutoLibraries() {
    const promises = [];

    for (const [libName, config] of Object.entries(this.autoloadConfig.libraries)) {
      if (config.strategy === 'auto' && !this.loadedLibraries.has(libName)) {
        const cdnUrl = config.cdnUrl || this.autoloadConfig.cdnUrls[libName];
        if (cdnUrl) {
          promises.push(this.loadLibrary(libName, cdnUrl));
        }
      }
    }

    if (promises.length > 0) {
      await Promise.all(promises);
    }
  }

  // Load a specific library
  async loadLibrary(libName, cdnConfig) {
    // Mark as loading/loaded to prevent duplicates
    if (this.loadedLibraries.has(libName)) {
      return true;
    }
    this.loadedLibraries.add(libName);

    // Map library names to check functions
    const checkFunctions = {
      mermaid: () => typeof window.mermaid !== 'undefined',
      hljs: () => typeof window.hljs !== 'undefined',
      mathjax: () => typeof window.MathJax !== 'undefined' && window.MathJax.typesetPromise,
      leaflet: () => typeof window.L !== 'undefined',
      three: () => typeof window.THREE !== 'undefined'
    };

    const scriptUrl = cdnConfig.script || cdnConfig;
    const cssUrl = cdnConfig.css;

    return await autoloadLibrary(
      libName,
      checkFunctions[libName],
      scriptUrl,
      cssUrl
    );
  }

  // Override renderMarkdown to protect library calls
  async renderMarkdown(md) {
    const markdown = md || this.input.value;
    const html = this.md.render(markdown);
    let processedHtml = html;

    if (this.linefeedViewEnabled) {
      // Process line feeds (from parent)
      processedHtml = processedHtml.replace(/(<p>)([\s\S]*?)(<\/p>)/g, (match, open, content, close) => {
        const lines = content.split(/<br\s*\/?>(?![^<]*<\/code>)/g);
        const processedLines = lines.map(line => {
          if (line === '' || line.match(/<br\s*\/?>$/)) {
            return line;
          }
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine === '<br>' || trimmedLine === '<br/>') {
            return line;
          }
          return line + '<br>';
        });
        return open + processedLines.join('') + close;
      });
    }

    // IMPORTANT: Wrap in contenteditable div like parent class does for copyHTML to work
    this.output.innerHTML = "<div contenteditable='true'>" + processedHtml + "</div>";

    // Process images to base64 if enabled
    if (this.imageToDataURLEnabled) {
      const images = this.output.querySelectorAll('img');
      for (const img of images) {
        try {
          if (!img.src.startsWith('data:')) {
            const dataURL = await this.convertImageToDataURL(img.src);
            img.src = dataURL;
          }
        } catch (error) {
          console.error('Failed to convert image:', error);
        }
      }
    }

    // Only initialize mermaid if it's available
    if (typeof window.mermaid !== 'undefined' && window.mermaid.init) {
      window.mermaid.init(undefined, this.output.querySelectorAll('.mermaid'));
    } else {
      // Trigger autoload if mermaid blocks exist
      const mermaidBlocks = this.output.querySelectorAll('.mermaid');
      if (mermaidBlocks.length > 0) {
        await this.autoloadFenceHandlers();
      }
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

  // Override render to make it async and handle autoloading
  async render() {
    // Call parent render
    const result = super.render();

    // Autoload if enabled
    if (this.autoloadConfig.enabled) {
      await this.autoloadFenceHandlers();
    }

    return result;
  }

  async autoloadFenceHandlers() {
    // Check what libraries are needed and autoload them
    const promises = [];

    // Helper function to handle library loading based on strategy
    const handleLibraryLoad = async (libName, elements, checkFn) => {
      if (elements.length === 0) return;

      const config = this.autoloadConfig.libraries[libName];

      // Skip if strategy is 'none'
      if (config.strategy === 'none') return;

      // If custom handler, call it
      if (config.strategy === 'custom' && config.handler) {
        return config.handler(elements, this);
      }

      // For ondemand strategy, load if not already loaded
      if (config.strategy === 'ondemand' && !checkFn()) {
        const cdnUrl = config.cdnUrl || this.autoloadConfig.cdnUrls[libName];
        return this.loadLibrary(libName, cdnUrl);
      }
    };

    // Check for Mermaid diagrams
    const mermaidElements = this.output.querySelectorAll('.mermaid');
    if (mermaidElements.length > 0) {
      const loaded = await handleLibraryLoad('mermaid', mermaidElements, () => typeof window.mermaid !== 'undefined');
      if (loaded && window.mermaid) {
        // Initialize mermaid
        window.mermaid.initialize({ startOnLoad: false });
        // Render all mermaid diagrams
        mermaidElements.forEach((element, index) => {
          try {
            const graphDefinition = element.textContent || element.innerText;
            const graphId = `mermaid-${Date.now()}-${index}`;
            window.mermaid.render(graphId, graphDefinition).then(result => {
              element.innerHTML = result.svg;
              element.removeAttribute('data-processed');
            }).catch(err => {
              console.error('Mermaid render error:', err);
              element.innerHTML = '<pre style="color: red;">Error rendering diagram</pre>';
            });
          } catch (err) {
            console.error('Mermaid processing error:', err);
          }
        });
      }
    }

    // Check for code blocks needing syntax highlighting
    const codeBlocks = this.output.querySelectorAll('pre code:not(.language-math)');
    if (codeBlocks.length > 0) {
      const loaded = await handleLibraryLoad('hljs', codeBlocks, () => typeof window.hljs !== 'undefined');
      if (loaded && window.hljs) {
        codeBlocks.forEach(block => {
          window.hljs.highlightElement(block);
        });
      }
    }

    // Check for math content - look for math-display divs created by markdown-it
    const mathElements = this.output.querySelectorAll('div.math-display');

    if (mathElements.length > 0) {
      const loaded = await handleLibraryLoad('mathjax', mathElements, () =>
        typeof window.MathJax !== 'undefined' && window.MathJax.typesetPromise
      );

      // If library was just loaded, we need to call the parent's math typesetting
      if (loaded || (window.MathJax && window.MathJax.typesetPromise)) {
        await this.ensureMathJaxAndTypeset();
      }
    }

    // Check for GeoJSON/TopoJSON maps
    const mapContainers = this.output.querySelectorAll('.geojson-container, .topojson-container');
    if (mapContainers.length > 0) {
      const loaded = await handleLibraryLoad('leaflet', mapContainers, () => typeof window.L !== 'undefined');
      if (loaded) {
        // Trigger re-render of maps
        mapContainers.forEach(container => {
          if (container.classList.contains('geojson-container')) {
            this.renderGeoJSON(container);
          } else if (container.classList.contains('topojson-container')) {
            this.renderTopoJSON(container);
          }
        });
      }
    }

    // Check for STL 3D models
    const stlContainers = this.output.querySelectorAll('.stl-container');
    if (stlContainers.length > 0) {
      const loaded = await handleLibraryLoad('three', stlContainers, () => typeof window.THREE !== 'undefined');
      if (loaded) {
        // Load STLLoader and OrbitControls
        await Promise.all([
          loadScript(this.autoloadConfig.cdnUrls.stlLoader.script),
          loadScript(this.autoloadConfig.cdnUrls.orbitControls.script)
        ]);

        // Render STL models
        stlContainers.forEach(container => {
          this.renderSTL(container);
        });
      }
    }
  }
}

// Export the enhanced SquibView with autoload support
export default SquibViewAutoload;