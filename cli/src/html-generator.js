/**
 * html-generator.js
 * Generates complete HTML documents with embedded styles
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getDefaultCSS } from './renderer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generates a complete standalone HTML document
 * @param {string} content - Rendered HTML content
 * @param {Object} options - Generation options
 * @returns {string} - Complete HTML document
 */
export function generateStandaloneHTML(content, options = {}) {
  const {
    title = 'Document',
    css = null,
    customCSS = null,
    includeDefaultCSS = true,
    bundleOffline = false,
    favicon = null
  } = options;

  // Build CSS content
  let styles = '';
  
  if (includeDefaultCSS) {
    styles += getDefaultCSS();
  }
  
  if (css) {
    try {
      const customCSSContent = readFileSync(css, 'utf8');
      styles += '\n\n/* Custom CSS */\n' + customCSSContent;
    } catch (error) {
      console.warn(`Warning: Could not read CSS file ${css}: ${error.message}`);
    }
  }
  
  if (customCSS) {
    styles += '\n\n/* Additional CSS */\n' + customCSS;
  }

  // Generate the complete HTML document
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHTML(title)}</title>
  ${generateFaviconTags(favicon)}
  <style>
${styles}
  </style>
  ${bundleOffline ? generateOfflineScripts() : generateCDNScripts()}
</head>
<body>
${content}
${generateMathJaxInitScript()}
${generateMermaidInitScript()}
</body>
</html>`;

  return html;
}

/**
 * Generates favicon link tags
 * @param {string|null} favicon - Custom favicon path/URL or null for default
 * @returns {string} - Favicon link tags
 */
function generateFaviconTags(favicon) {
  // Default SquibView favicon (SVG data URL)
  const defaultFavicon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='%23f57c00' stroke='%23000' stroke-width='1'/><path d='M2 16h28M16 2a14 14 0 0114 14 14 14 0 01-14 14 14 14 0 01-14-14A14 14 0 0116 2zm0 0v28M9 16a7 7 0 0014 0 7 7 0 00-14 0z' fill='none' stroke='%23000' stroke-width='1'/></svg>`;
  
  const faviconUrl = favicon || defaultFavicon;
  
  if (favicon && !favicon.startsWith('http') && !favicon.startsWith('data:')) {
    // It's a local file, determine type from extension
    const ext = favicon.split('.').pop().toLowerCase();
    let type = 'image/x-icon'; // default
    
    if (ext === 'png') type = 'image/png';
    else if (ext === 'svg') type = 'image/svg+xml';
    else if (ext === 'ico') type = 'image/x-icon';
    
    return `  <link rel="icon" type="${type}" href="${escapeHTML(faviconUrl)}">`;
  } else {
    // URL or data URL, auto-detect type
    let type = 'image/x-icon';
    if (faviconUrl.includes('svg') || faviconUrl.includes('image/svg')) {
      type = 'image/svg+xml';
    } else if (faviconUrl.includes('png') || faviconUrl.includes('image/png')) {
      type = 'image/png';
    }
    
    return `  <link rel="icon" type="${type}" href="${escapeHTML(faviconUrl)}">`;
  }
}

/**
 * Generates CDN-based script tags
 * @returns {string} - CDN script tags
 */
function generateCDNScripts() {
  return `  <!-- Highlight.js for syntax highlighting -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <!-- Leaflet for GeoJSON/TopoJSON maps -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js"></script>
  <!-- Three.js for STL 3D models -->
  <script src="https://unpkg.com/three@0.171.0/build/three.min.js"></script>
  <!-- MathJax for math rendering -->
  <script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
        processEscapes: true,
        processEnvironments: true
      },
      options: {
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process'
      },
      svg: {
        fontCache: 'global'
      }
    };
  </script>
  <script type="text/javascript" id="MathJax-script" async
    src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
  </script>
  <!-- Mermaid for diagram rendering -->
  <script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>`;
}

/**
 * Generates offline bundled script tags
 * @returns {string} - Inline script tags
 */
function generateOfflineScripts() {
  try {
    // Read local library files from main node_modules (not CLI node_modules)
    const baseNodeModules = join(__dirname, '../../node_modules');
    const mathJaxPath = join(baseNodeModules, 'mathjax/es5/tex-svg.js');
    const mermaidPath = join(baseNodeModules, 'mermaid/dist/mermaid.min.js');
    const highlightPath = join(baseNodeModules, 'highlight.js/lib/index.js');
    const highlightCSSPath = join(baseNodeModules, 'highlight.js/styles/default.css');
    const leafletPath = join(baseNodeModules, 'leaflet/dist/leaflet.js');
    const leafletCSSPath = join(baseNodeModules, 'leaflet/dist/leaflet.css');
    const threePath = join(baseNodeModules, 'three/build/three.module.min.js');
    const topoJsonPath = join(baseNodeModules, 'topojson-client/dist/topojson-client.min.js');
    
    const mathJaxCode = readFileSync(mathJaxPath, 'utf8');
    const mermaidCode = readFileSync(mermaidPath, 'utf8');
    const highlightCode = readFileSync(highlightPath, 'utf8');
    const highlightCSS = readFileSync(highlightCSSPath, 'utf8');
    const leafletCode = readFileSync(leafletPath, 'utf8');
    const leafletCSS = readFileSync(leafletCSSPath, 'utf8');
    const threeCode = readFileSync(threePath, 'utf8');
    const topoJsonCode = readFileSync(topoJsonPath, 'utf8');
    
    return `  <!-- Bundled libraries for offline use -->
  <style>
    /* Highlight.js CSS bundled */
${highlightCSS}
    /* Leaflet CSS bundled */
${leafletCSS}
  </style>
  <script>
    // MathJax configuration
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
        processEscapes: true,
        processEnvironments: true
      },
      options: {
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process'
      },
      svg: {
        fontCache: 'global'
      }
    };
  </script>
  <script type="text/javascript">
    // Highlight.js bundled
${highlightCode}
  </script>
  <script type="text/javascript">
    // Leaflet bundled
${leafletCode}
  </script>
  <script type="text/javascript">
    // Three.js bundled
${threeCode}
  </script>
  <script type="text/javascript">
    // TopoJSON bundled
${topoJsonCode}
  </script>
  <script type="text/javascript">
    // MathJax bundled
${mathJaxCode}
  </script>
  <script type="text/javascript">
    // Mermaid bundled
${mermaidCode}
  </script>`;
  } catch (error) {
    console.warn('Warning: Could not bundle offline libraries, falling back to CDN:', error.message);
    return generateCDNScripts();
  }
}

/**
 * Generates MathJax initialization script
 * @returns {string} - MathJax initialization script
 */
function generateMathJaxInitScript() {
  return `  <script>
    // Initialize MathJax after page load
    document.addEventListener('DOMContentLoaded', function() {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise().catch(function(err) {
          console.warn('MathJax typesetting failed:', err);
        });
      }
    });
  </script>`;
}

/**
 * Generates Mermaid initialization script
 * @returns {string} - Mermaid initialization script
 */
function generateMermaidInitScript() {
  return `  <script>
    // Initialize Mermaid after page load
    document.addEventListener('DOMContentLoaded', function() {
      if (window.mermaid) {
        try {
          window.mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            fontFamily: 'inherit'
          });
          
          // Manually render all mermaid diagrams
          const mermaidElements = document.querySelectorAll('.mermaid');
          mermaidElements.forEach(function(element, index) {
            const id = 'mermaid-' + index;
            element.id = id;
            try {
              window.mermaid.render(id + '-svg', element.textContent, function(svgCode) {
                element.innerHTML = svgCode;
              });
            } catch (err) {
              console.warn('Mermaid rendering failed for element', index, ':', err);
              // Fallback: show the text content
              element.innerHTML = '<pre>' + element.textContent + '</pre>';
            }
          });
        } catch (err) {
          console.warn('Mermaid initialization failed:', err);
        }
      }
    });
  </script>`;
}

/**
 * Escapes HTML characters in text
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHTML(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/**
 * Extracts title from HTML content (looks for first h1)
 * @param {string} content - HTML content
 * @returns {string} - Extracted title
 */
export function extractTitleFromContent(content) {
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
  if (h1Match) {
    // Remove HTML tags from title
    return h1Match[1].replace(/<[^>]*>/g, '').trim();
  }
  return 'Document';
}