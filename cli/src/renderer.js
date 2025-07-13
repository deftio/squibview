/**
 * renderer.js
 * Headless SquibView rendering functionality
 */

import { createJSDOMEnvironment } from './jsdom-setup.js';

/**
 * Renders markdown content to HTML using SquibView in a headless environment
 * @param {string} content - Markdown content to render
 * @param {Object} options - Rendering options
 * @returns {Promise<string>} - Rendered HTML content
 */
export async function renderMarkdownToHTML(content, options = {}) {
  // Set up jsdom environment
  const { window, document } = createJSDOMEnvironment();
  
  try {
    // Dynamically import SquibView using .js extension for standalone ESM build
    const SquibViewModule = await import('../../dist/squibview.standalone.esm.min.js');
    const SquibView = SquibViewModule.default;
    
    // Get the container element
    const container = document.getElementById('squibview-container');
    if (!container) {
      throw new Error('Container element not found in DOM');
    }

    // Configure SquibView options for headless rendering
    const squibViewOptions = {
      inputContentType: 'md',
      showControls: false,
      initialView: 'output', // We only need the output
      titleShow: false,
      initialContent: content,
      // Disable features that don't work well headlessly
      preserveImageTags: true, // Keep original image URLs for static HTML
      ...options.squibViewOptions
    };

    // Create SquibView instance
    const squibView = new SquibView(container, squibViewOptions);

    // Wait for any async operations to complete
    await new Promise(resolve => {
      // Give SquibView time to process content
      setTimeout(resolve, 100);
    });

    // Extract the rendered HTML from the output panel
    const outputPanel = container.querySelector('.squibview-output');
    if (!outputPanel) {
      throw new Error('Output panel not found');
    }

    // Get the rendered content
    let renderedHTML = outputPanel.innerHTML;

    // Clean up the HTML - remove SquibView-specific classes and attributes
    renderedHTML = cleanupHTML(renderedHTML);

    return renderedHTML;

  } catch (error) {
    throw new Error(`Failed to render markdown: ${error.message}`);
  } finally {
    // Clean up globals
    delete global.window;
    delete global.document;
    delete global.navigator;
  }
}

/**
 * Cleans up HTML by removing SquibView-specific attributes and classes
 * @param {string} html - HTML to clean
 * @returns {string} - Cleaned HTML
 */
function cleanupHTML(html) {
  // Remove contenteditable attributes
  html = html.replace(/\s*contenteditable="[^"]*"/g, '');
  
  // Remove data attributes related to SquibView internal state
  html = html.replace(/\s*data-squibview-[^=]*="[^"]*"/g, '');
  
  // Remove empty style attributes
  html = html.replace(/\s*style=""\s*/g, '');
  
  // Clean up extra whitespace
  html = html.replace(/\s+>/g, '>');
  html = html.replace(/>\s+</g, '><');
  
  return html.trim();
}

/**
 * Gets the default CSS styles for standalone HTML output (legacy function)
 * @returns {string} - CSS styles
 * @deprecated Use generateCSS from style-generator.js instead
 */
export function getDefaultCSS() {
  return `
/* SquibView CLI Default Styles */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 3rem;
  background-color: #fff;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
  line-height: 1.25;
}

h1 { font-size: 2rem; border-bottom: 2px solid #eee; padding-bottom: 0.3em; }
h2 { font-size: 1.5rem; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
h3 { font-size: 1.25rem; }
h4 { font-size: 1rem; }
h5 { font-size: 0.875rem; }
h6 { font-size: 0.85rem; color: #666; }

p { margin-bottom: 1rem; }

a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

ul, ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

li {
  margin-bottom: 0.25rem;
}

blockquote {
  margin: 0 0 1rem 0;
  padding: 0.5rem 1rem;
  border-left: 4px solid #ddd;
  background-color: #f9f9f9;
  color: #666;
}

code {
  background-color: #f1f1f1;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.85em;
}

pre {
  background-color: #f8f8f8;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}

pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
}

th, td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: 600;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

img {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

hr {
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 2rem 0;
}

/* SVG styling */
svg {
  max-width: 100%;
  height: auto;
}

/* Math styling */
.MathJax {
  font-size: 1em !important;
}

/* Mermaid diagram styling */
.mermaid {
  text-align: center;
  margin: 1rem 0;
}

/* Code highlighting */
.hljs {
  background: #f8f8f8 !important;
  color: #333 !important;
}

/* Responsive design */
@media (max-width: 768px) {
  body {
    padding: 0.5rem 1.5rem;
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
`;
}