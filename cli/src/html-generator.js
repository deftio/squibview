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
    bundleOffline = false
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
 * Generates CDN-based script tags
 * @returns {string} - CDN script tags
 */
function generateCDNScripts() {
  return `  <!-- MathJax for math rendering -->
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
    // Read local library files
    const mathJaxPath = join(__dirname, '../node_modules/mathjax/es5/tex-svg.js');
    const mermaidPath = join(__dirname, '../node_modules/mermaid/dist/mermaid.min.js');
    const highlightPath = join(__dirname, '../node_modules/highlight.js/lib/core.js');
    
    const mathJaxCode = readFileSync(mathJaxPath, 'utf8');
    const mermaidCode = readFileSync(mermaidPath, 'utf8');
    const highlightCode = readFileSync(highlightPath, 'utf8');
    
    return `  <!-- Bundled libraries for offline use -->
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
    // MathJax bundled
${mathJaxCode}
  </script>
  <script type="text/javascript">
    // Highlight.js bundled
${highlightCode}
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