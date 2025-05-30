import TurndownService from 'turndown';

/**
 * Converts HTML content to Markdown format using the Turndown library with 
 * customizations specific to SquibView's needs.
 */
export default class HtmlToMarkdown {
  constructor(options = {}) {
    console.warn('[HtmlToMarkdown] CONSTRUCTOR CALLED');
    this.turndownService = new TurndownService({
      headingStyle: 'atx',       // Use # style headings
      codeBlockStyle: 'fenced',  // Use ``` style code blocks
      emDelimiter: '*',          // Use * for emphasis
      bulletListMarker: '-',     // Use - for bullet lists
      ...options
    });
    
    // Add a simple cache for converted content to improve performance
    this.cache = new Map();
    this.cacheSize = options.cacheSize || 10;
    
    // Store special blocks for preservation
    this._specialBlocks = new Map();
    
    this.configureTurndownRules();
  }
  
  /**
   * Configure custom Turndown rules
   */
  configureTurndownRules() {
    // Preserve HTML image tags by returning their outerHTML
    this.turndownService.addRule('keepImageTags', {
      filter: 'img',
      replacement: function (content, node) {
        return node.outerHTML;
      }
    });

    // Preserve standalone <svg> tags NOT inside a data-source-type div
    this.turndownService.addRule('keepStandaloneSvgTags', {
      filter: ['svg'],
      replacement: function (content, node) {
        // console.warn('[HtmlToMarkdown] standalone SVG rule processing:', node.outerHTML);
        return node.outerHTML;
      }
    });

    // Rule for our data-source-type wrapper divs - should be high priority
    this.turndownService.addRule('squibviewFencedBlock', {
      filter: (node) => {
        const hasAttr = node.nodeName === 'DIV' && node.hasAttribute('data-source-type');
        if (hasAttr) {
          const lang = node.getAttribute('data-source-type') || 'code';
          console.warn(`[HtmlToMarkdown] squibviewFencedBlock filter: Matched div with data-source-type="${lang}". Node outerHTML:`, node.outerHTML);
        }
        return hasAttr;
      },
      replacement: (content, node, options) => {
        const lang = node.getAttribute('data-source-type') || 'code';
        let innerContent = '';

        switch (lang) {
          case 'mermaid':
          case 'math':
            let contentFromHtml = node.innerHTML;
            // Convert <br> tags to newlines first
            contentFromHtml = contentFromHtml.replace(/<br\s*\/?>/gi, '\n');
            // For Mermaid and Math, the content is expected to be text-like after <br> replacement.
            // Avoid stripping other tags if they are part of the intended content (e.g. MathML in MathJax)
            // Instead, rely on a robust way to get text content, then trim.
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = contentFromHtml; // Let browser parse it
            innerContent = tempDiv.textContent || tempDiv.innerText || ''; // Get text content
            innerContent = innerContent.trim(); // Trim whitespace
            break;
          case 'svg':
            // The 'node' is the div with data-source-type="svg".
            // Its innerHTML is expected to be the raw SVG markup.
            innerContent = node.innerHTML;
            // It's good to log what's captured for debugging during development if necessary.
            // console.warn('[HtmlToMarkdown] squibviewFencedBlock SVG: Captured innerHTML:', innerContent.substring(0, 200));
            break;
          case 'csv':
          case 'tsv':
          case 'psv':
            const tableElement = node.querySelector('table');
            if (tableElement) {
              innerContent = this._htmlTableToDelimitedText(tableElement, lang);
            } else {
              innerContent = 'Error: Table not found for ' + lang;
              console.warn('Could not find table inside div[data-source-type="' + lang + '"]');
            }
            break;
          default: // Handles 'javascript', 'python', 'code', etc.
            const preElement = node.querySelector('pre');
            if (preElement) {
              const codeElement = preElement.querySelector('code');
              // textContent of <code> or <pre> contains the code.
              innerContent = (codeElement || preElement).textContent.trimEnd(); // trimEnd to preserve leading newlines if any, but remove trailing ones from block.
            } else {
              // Fallback if <pre> not found (e.g. if it was just a div with code)
              innerContent = node.textContent.trimEnd();
               console.warn('Could not find <pre> inside div[data-source-type="' + lang + '"]');
            }
            break;
        }

        const langTag = (lang === 'code') ? '' : lang;
        // Ensure there's a newline before the closing fence if content doesn't end with one.
        // And ensure content starts with a newline if it doesn't already, for consistency.
        if (innerContent && !innerContent.startsWith('\n') && lang !== 'svg') { // SVG content might be on one line
            innerContent = '\n' + innerContent;
        }
        if (innerContent && !innerContent.endsWith('\n')) {
          innerContent += '\n';
        }
        // For empty blocks, ensure a newline for valid fence structure
        if (!innerContent.trim() && !innerContent.includes('\n')) {
            innerContent = '\n';
        }

        return '\n```' + langTag + innerContent + '```\n';
      }
    });
    
    // Preserve Mermaid diagram blocks with special identifiers
    this.turndownService.addRule('mermaid', {
      filter: node => {
        return node.nodeName === 'DIV' && 
               node.classList.contains('mermaid');
      },
      replacement: (content, node) => {
        // Generate a unique ID for this mermaid block to help with matching later
        const blockId = 'mermaid_' + Math.random().toString(36).substring(2, 10);
        
        // Store the raw content for later use
        if (this._specialBlocks) {
          this._specialBlocks.set(blockId, {
            type: 'mermaid',
            content: node.textContent
          });
        }
        
        // Return with special marker that can be identified later
        return `\n<div data-special-block="${blockId}" class="mermaid">\n` +
               node.textContent + 
               `\n</div>\n`;
      }
    });
    
    /*
    // Preserve SVG elements with special identifiers
    this.turndownService.addRule('svg', {
      filter: node => {
        // Only apply this rule if the SVG is NOT inside one of our data-source-type divs
        // and has one of our specific identifiers (e.g., an id starting with "squib-svg-")
        // or if it does not have a data-source-type attribute itself.
        const isInsideSquibDiv = node.closest('div[data-source-type]');
        const hasSquibIdentifier = node.id && node.id.startsWith('squib-svg-'); // Example identifier
        const isSpecialSquibSvg = node.hasAttribute('data-source-type') && node.getAttribute('data-source-type') === 'svg';

        if (isInsideSquibDiv || isSpecialSquibSvg) {
          // console.warn('[HtmlToMarkdown] SVG rule: Skipping SVG inside data-source-type div or special SVG.');
          return false; // Don't process if it's already handled or should be handled by squibviewFencedBlock
        }
        // console.warn('[HtmlToMarkdown] SVG rule: Processing standalone SVG:', node.outerHTML.substring(0,100));
        return node.nodeName === 'SVG' && hasSquibIdentifier; // Or other conditions for standalone SVGs
      },
      replacement: function (content, node) {
        // console.warn('[HtmlToMarkdown] SVG rule: Replacing with outerHTML for node:', node.outerHTML.substring(0,100));
        return node.outerHTML; // Preserve the whole SVG tag
      }
    });
    */

    // Preserve GeoJSON map blocks
    this.turndownService.addRule('geojson', {
      filter: node => {
        return node.nodeName === 'DIV' && 
               node.classList.contains('geojson-map');
      },
      replacement: (content, node) => {
        // Generate a unique ID for this GeoJSON block
        const blockId = 'geojson_' + Math.random().toString(36).substring(2, 10);
        
        // Try to extract the GeoJSON data from the script element
        let geojsonContent = '';
        try {
          // The actual GeoJSON would be in a script tag or in a data attribute
          // Here we'll use a placeholder since the actual data is hard to extract
          geojsonContent = node.dataset.geojson || '{"type":"FeatureCollection","features":[]}';
        } catch(e) {
          console.error('Error extracting GeoJSON data:', e);
        }
        
        if (this._specialBlocks) {
          this._specialBlocks.set(blockId, {
            type: 'geojson',
            content: geojsonContent
          });
        }
        
        return `\n<div data-special-block="${blockId}" class="geojson-container">\n` +
               geojsonContent + 
               `\n</div>\n`;
      }
    });
    
    // Preserve Math blocks
    this.turndownService.addRule('math', {
      filter: node => {
        return node.nodeName === 'DIV' && 
               node.classList.contains('math-display');
      },
      replacement: (content, node) => {
        // Generate a unique ID for this math block
        const blockId = 'math_' + Math.random().toString(36).substring(2, 10);
        
        // Get the raw math content (might be wrapped in $$...$$ in the original)
        let mathContent = node.textContent;
        
        // Remove $$ delimiters if present
        mathContent = mathContent.replace(/^\$\$([\s\S]*)\$\$$/, '$1');
        
        if (this._specialBlocks) {
          this._specialBlocks.set(blockId, {
            type: 'math',
            content: mathContent
          });
        }
        
        return `\n<div data-special-block="${blockId}" class="math-container">\n` +
               mathContent + 
               `\n</div>\n`;
      }
    });
    
    // Special handling for code blocks
    this.turndownService.addRule('codeBlock', {
      filter: node => {
        return node.nodeName === 'PRE' && 
               node.firstChild && 
               node.firstChild.nodeName === 'CODE';
      },
      replacement: (content, node) => {
        const code = node.firstChild.textContent;
        let language = '';
        
        // Try to detect language from class
        if (node.firstChild.className) {
          const match = node.firstChild.className.match(/language-(\w+)/);
          if (match) {
            language = match[1];
          }
        }
        
        return '\n```' + language + '\n' + code.trim() + '\n```\n';
      }
    });
    
    // Improve table handling
    this.turndownService.addRule('tableCell', {
      filter: ['th', 'td'],
      replacement: (content, node) => {
        return ' ' + content.trim() + ' |';
      }
    });
    
    this.turndownService.addRule('tableRow', {
      filter: 'tr',
      replacement: (content, node) => {
        let prefix = '|';
        
        // Handle header rows
        if (node.parentNode.nodeName === 'THEAD') {
          const cells = node.querySelectorAll('th, td').length;
          const separatorRow = '\n|' + ' --- |'.repeat(cells);
          return prefix + content + separatorRow;
        }
        
        return prefix + content + '\n';
      }
    });
    
    this.turndownService.addRule('table', {
      filter: 'table',
      replacement: (content, node) => {
        // If this table is inside our data-source-type div, it's already handled.
        if (node.parentElement && node.parentElement.hasAttribute('data-source-type')) {
          const type = node.parentElement.getAttribute('data-source-type');
          if (type === 'csv' || type === 'tsv' || type === 'psv') {
            return content; // Turndown will process children, but our main rule handles the fence.
          }
        }
        // Default table processing otherwise
        // (Existing complex table rule logic from Turndown or custom might be here)
        // For simplicity, using a basic version of Turndown's own table handling as a placeholder
        // if not already handled by a more specific rule like the one above for data-source-type.
        let markdown = '';
        const headerRow = node.querySelector('thead tr');
        if (headerRow) {
          markdown += '|';
          headerRow.querySelectorAll('th').forEach(th => {
            markdown += ` ${this.turndownService.turndown(th.innerHTML).trim()} |`;
          });
          markdown += '\n|';
          headerRow.querySelectorAll('th').forEach(() => {
            markdown += ' --- |';
          });
          markdown += '\n';
        }

        const bodyRows = node.querySelectorAll('tbody tr');
        bodyRows.forEach(row => {
          markdown += '|';
          row.querySelectorAll('td').forEach(td => {
            markdown += ` ${this.turndownService.turndown(td.innerHTML).trim()} |`;
          });
          markdown += '\n';
        });
        return '\n' + markdown + '\n';
      }
    });

    // Ensure this class is aware of custom GFM task list items if not default in Turndown version
    this.turndownService.keep(['li']); // Keep <li> to allow custom rule for task list items
    this.turndownService.addRule('taskListItems', {
      filter: function (node) {
        return node.nodeName === 'LI' && node.firstChild && node.firstChild.nodeName === 'INPUT' && node.firstChild.type === 'checkbox';
      },
      replacement: function (content, node) {
        const checkbox = node.firstChild;
        const checked = checkbox.checked;
        // Need to remove the input from the content that turndown processes for the <li>
        // The first child (input) is already handled, process the rest of the <li> content.
        // Create a temporary div to hold the rest of the li children
        let restOfLiContent = '';
        let current = checkbox.nextSibling;
        while(current) {
            restOfLiContent += current.outerHTML || current.textContent;
            current = current.nextSibling;
        }
        // Turndown the rest of the LI content
        const markdownContent = this.turndownService.turndown(restOfLiContent).trim(); 
        return (checked ? '[x] ' : '[ ] ') + markdownContent;
      }
    });
  }
  
  /**
   * Get a simplified hash code of a string for caching
   * 
   * @private
   * @param {string} str - The string to hash
   * @returns {string} A hash representation of the string
   */
  _getStringHash(str) {
    // Simple and fast hash function for strings
    // This is not a cryptographic hash, just for caching purposes
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36); // Convert to base36 for shorter string
  }
  
  /**
   * Convert HTML to Markdown with caching for performance
   * 
   * @param {string} html - The HTML content to convert
   * @param {Object} options - Additional options
   * @param {string} options.originalSource - The original source if available
   * @returns {string} The converted Markdown content
   */
  convert(html, options = {}) {
    console.warn('[HtmlToMarkdown] CONVERT METHOD CALLED. HTML input (first 100 chars):', html.substring(0, 100));
    // Clear special blocks map for this conversion
    this._specialBlocks.clear();
    
    // Use a hash of the HTML as the cache key
    const cacheKey = this._getStringHash(html);
    
    // Check if we have a cached version
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    // Convert the HTML to Markdown
    let markdown = this.turndownService.turndown(html);
    
    // Post-process the markdown to restore special blocks
    markdown = this._postProcessMarkdown(markdown, options.originalSource);
    
    // Cache the result
    this.cache.set(cacheKey, markdown);
    
    // Keep the cache size under control
    if (this.cache.size > this.cacheSize) {
      // Remove the oldest entry
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    return markdown;
  }
  
  /**
   * Post-process markdown to restore special blocks and apply additional formatting
   * 
   * @private
   * @param {string} markdown - The converted markdown 
   * @param {string} originalSource - The original markdown source if available
   * @returns {string} - The processed markdown
   */
  _postProcessMarkdown(markdown, originalSource) {
    // First pass: Convert the special blocks markers back to proper markdown
    
    // Convert mermaid blocks
    const mermaidBlockRegex = /<div data-special-block="mermaid_[^"]*" class="mermaid">\s*([\s\S]*?)\s*<\/div>/g;
    markdown = markdown.replace(mermaidBlockRegex, (match, content) => {
      return `\n\`\`\`mermaid\n${content.trim()}\n\`\`\`\n`;
    });
    
    // Convert SVG blocks
    const svgBlockRegex = /<div data-special-block="svg_[^"]*" class="svg-container">\s*([\s\S]*?)\s*<\/div>/g;
    markdown = markdown.replace(svgBlockRegex, (match, content) => {
      // Try to find a closing SVG tag
      const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/);
      if (svgMatch) {
        return `\n\`\`\`svg\n${svgMatch[0]}\n\`\`\`\n`;
      }
      return match;
    });
    
    // Convert GeoJSON blocks
    const geojsonBlockRegex = /<div data-special-block="geojson_[^"]*" class="geojson-container">\s*([\s\S]*?)\s*<\/div>/g;
    markdown = markdown.replace(geojsonBlockRegex, (match, content) => {
      try {
        // Ensure content is valid JSON before creating the code block
        JSON.parse(content);
        return `\n\`\`\`geojson\n${content.trim()}\n\`\`\`\n`;
      } catch (e) {
        console.error('Invalid GeoJSON data:', e);
        return `\n\`\`\`geojson\n{"type":"FeatureCollection","features":[]}\n\`\`\`\n`;
      }
    });
    
    // Convert Math blocks
    const mathBlockRegex = /<div data-special-block="math_[^"]*" class="math-container">\s*([\s\S]*?)\s*<\/div>/g;
    markdown = markdown.replace(mathBlockRegex, (match, content) => {
      return `\n\`\`\`math\n${content.trim()}\n\`\`\`\n`;
    });
    
    // Second pass: Restore blocks from original source if possible
    if (originalSource) {
      // Extract code blocks from original source
      const codeBlockRegex = /```(\w+)\s*([\s\S]*?)```/g;
      let match;
      let blockIndex = 0;
      const originalBlocks = [];
      
      while ((match = codeBlockRegex.exec(originalSource)) !== null) {
        const type = match[1];
        const content = match[2];
        
        if (type === 'mermaid' || type === 'svg' || type === 'geojson' || type === 'math') {
          originalBlocks.push({
            type,
            content: match[0],
            index: blockIndex++
          });
        }
      }
      
      // Try to match original blocks with current blocks
      // This is a simplistic approach that assumes blocks are in the same order
      
      let mermaidIndex = 0;
      let svgIndex = 0;
      let geojsonIndex = 0;
      let mathIndex = 0;
      
      // Replace mermaid blocks
      markdown = markdown.replace(/```mermaid\s*([\s\S]*?)```/g, (match, content) => {
        const mermaidBlocks = originalBlocks.filter(b => b.type === 'mermaid');
        if (mermaidIndex < mermaidBlocks.length) {
          return mermaidBlocks[mermaidIndex++].content;
        }
        return match;
      });
      
      // Replace SVG blocks
      markdown = markdown.replace(/```svg\s*([\s\S]*?)```/g, (match, content) => {
        const svgBlocks = originalBlocks.filter(b => b.type === 'svg');
        if (svgIndex < svgBlocks.length) {
          return svgBlocks[svgIndex++].content;
        }
        return match;
      });
      
      // Replace GeoJSON blocks
      markdown = markdown.replace(/```geojson\s*([\s\S]*?)```/g, (match, content) => {
        const geojsonBlocks = originalBlocks.filter(b => b.type === 'geojson');
        if (geojsonIndex < geojsonBlocks.length) {
          return geojsonBlocks[geojsonIndex++].content;
        }
        return match;
      });
      
      // Replace Math blocks
      markdown = markdown.replace(/```math\s*([\s\S]*?)```/g, (match, content) => {
        const mathBlocks = originalBlocks.filter(b => b.type === 'math');
        if (mathIndex < mathBlocks.length) {
          return mathBlocks[mathIndex++].content;
        }
        return match;
      });
    }
    
    return markdown;
  }

  /**
   * Converts an HTML table element to a delimited string (CSV, TSV, etc.).
   * @param {HTMLTableElement} tableElement The HTML table element.
   * @param {string} type The type of delimited format ('csv', 'tsv', 'psv').
   * @returns {string} The delimited text representation of the table.
   * @private
   */
  _htmlTableToDelimitedText(tableElement, type) {
    let delimiter;
    switch (type) {
      case 'csv': delimiter = ','; break;
      case 'tsv': delimiter = '\t'; break;
      case 'psv': delimiter = '|'; break;
      default:    delimiter = ','; // Default to CSV
    }

    const data = [];
    const rows = tableElement.querySelectorAll('tr');

    rows.forEach(row => {
      const rowData = [];
      const cells = row.querySelectorAll('th, td');
      cells.forEach(cell => {
        // Basic text content extraction. For complex cell content, might need refinement.
        // Replace newlines within a cell with a space, trim content.
        let cellText = cell.textContent || '';
        cellText = cellText.replace(/\r?\n|\r/g, ' ').trim();
        // If delimiter is comma, and cellText contains comma, quote it.
        if (delimiter === ',' && cellText.includes(',')) {
          cellText = `"${cellText.replace(/"/g, '""')}"`;
        }
        // If delimiter is tab, and cellText contains tab, it might be an issue depending on consumer.
        // For PSV, if cellText contains pipe, it's an issue unless handled by quoting (not standard for PSV).
        rowData.push(cellText);
      });
      data.push(rowData.join(delimiter));
    });

    return data.join('\n');
  }
}