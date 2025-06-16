import TurndownService from 'turndown';

/**
 * Converts HTML content to Markdown format using the Turndown library with 
 * customizations specific to SquibView's needs.
 */
export default class HtmlToMarkdown {
  constructor(options = {}) {
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
    // Since we're using pre-processing for data-source-type containers,
    // we can simplify this and keep it as a fallback for any missed cases
    this.turndownService.addRule('squibviewFencedBlock', {
      filter: (node) => {
        return node.nodeName === 'DIV' && node.hasAttribute('data-source-type');
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
            const tempDiv = node.ownerDocument.createElement('div');
            tempDiv.innerHTML = contentFromHtml; // Let browser parse it
            innerContent = tempDiv.textContent || tempDiv.innerText || ''; // Get text content
            break;
          case 'svg':
            // The 'node' is the div with data-source-type="svg".
            // For proper round-trip fidelity, use the original source from the data attribute if available
            if (node.hasAttribute('data-original-source')) {
              // The attribute value is HTML-escaped, browser will decode it when getting the attribute
              innerContent = node.getAttribute('data-original-source');
            } else {
              // Fallback to innerHTML if no original source stored
              innerContent = node.innerHTML;
            }
            // console.warn('[HtmlToMarkdown] squibviewFencedBlock SVG: Captured content:', innerContent.substring(0, 200));
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
              innerContent = (codeElement || preElement).textContent; // trimEnd removed, will be handled by trim() later
            } else {
              // Fallback if <pre> not found (e.g. if it was just a div with code)
              innerContent = node.textContent; // trimEnd removed
               console.warn('Could not find <pre> inside div[data-source-type="' + lang + '"]');
            }
            break;
        }

        const langTag = (lang === 'code') ? '' : lang;
        let finalInnerContent = innerContent.trim(); // Trim whitespace consistently here

        if (finalInnerContent) { // If there's content after trimming
          finalInnerContent = '\n' + finalInnerContent + '\n';
        } else { // If content was empty or just whitespace
          finalInnerContent = '\n'; // Ensure a blank line for empty fenced blocks
        }

        return '\n```' + langTag + finalInnerContent + '```\n';
      }
    });

    // Preserve HTML image tags by returning their outerHTML
    this.turndownService.addRule('keepImageTags', {
      filter: 'img',
      replacement: function (content, node) {
        return node.outerHTML;
      }
    });

    // TEMPORARILY DISABLED: Preserve standalone <svg> tags NOT inside a data-source-type div
    /*
    this.turndownService.addRule('keepStandaloneSvgTags', {
      filter: function(node) {
        if (node.nodeName !== 'SVG') return false;
        
        // Don't process SVG elements that are inside a data-source-type div
        const parentDiv = node.closest('div[data-source-type]');
        if (parentDiv) {
          console.warn('[HtmlToMarkdown] Skipping SVG inside data-source-type div');
          return false;
        }
        
        console.warn('[HtmlToMarkdown] Processing standalone SVG');
        return true;
      },
      replacement: function (content, node) {
        // console.warn('[HtmlToMarkdown] standalone SVG rule processing:', node.outerHTML);
        return node.outerHTML;
      }
    });
    */
    
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
    // Clear special blocks map for this conversion
    this._specialBlocks.clear();
    this._placeholders = [];
    
    // Use a hash of the HTML as the cache key
    const cacheKey = this._getStringHash(html);
    
    // Check if we have a cached version
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    // Pre-process HTML to extract and preserve data-source-type containers
    let processedHtml = this._preProcessSpecialContainers(html);
    
    // Convert the HTML to Markdown
    let markdown = this.turndownService.turndown(processedHtml);
    
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
   * Pre-process HTML to extract data-source-type containers and replace them with placeholders
   * 
   * @private
   * @param {string} html - The HTML to process
   * @returns {string} - The processed HTML with placeholders
   */
  _preProcessSpecialContainers(html) {
    // Handle both browser and test environments safely
    if (typeof document === 'undefined' || !document.createElement) {
      // If no document is available, skip pre-processing and use the original HTML
      console.warn('Document not available, skipping pre-processing');
      this._placeholders = [];
      return html;
    }
    
    let tempDiv;
    try {
      tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      // Test if querySelector is available - if not, we'll use a fallback approach
      if (typeof tempDiv.querySelector !== 'function') {
        throw new Error('querySelector not available');
      }
    } catch (e) {
      // Fallback: if DOM methods aren't available, use simple regex-based processing
      console.warn('DOM methods not available, using regex fallback for pre-processing');
      return this._regexFallbackPreProcess(html);
    }
    
    // Find all divs with data-source-type attribute
    const specialDivs = tempDiv.querySelectorAll('div[data-source-type]');
    const placeholders = [];
    
    specialDivs.forEach((div, index) => {
      const sourceType = div.getAttribute('data-source-type');
      const placeholder = `__SPECIAL_CONTAINER_${index}__`;
      let content;
      if (sourceType === 'svg' && div.hasAttribute('data-original-source')) {
        content = div.getAttribute('data-original-source');
      } else if (['mermaid', 'math', 'geojson'].includes(sourceType) && div.hasAttribute('data-original-source')) {
        content = div.getAttribute('data-original-source');
      } else if (sourceType === 'csv' || sourceType === 'tsv' || sourceType === 'psv') {
        const tableElement = div.querySelector('table');
        if (tableElement) {
          content = this._htmlTableToDelimitedText(tableElement, sourceType);
        } else {
          content = 'Error: Table not found for ' + sourceType;
        }
      } else {
        const preElement = div.querySelector('pre');
        if (preElement) {
          const codeElement = preElement.querySelector('code');
          content = (codeElement || preElement).textContent.replace(/^[\r\n]+|[\r\n]+$/g, '');
        } else {
          content = div.textContent.replace(/^[\r\n]+|[\r\n]+$/g, '');
        }
      }
      placeholders.push({
        placeholder,
        type: sourceType,
        content: content
      });
      const placeholderText = document.createTextNode(placeholder);
      if (div.parentNode) {
        div.parentNode.replaceChild(placeholderText, div);
      }
    });
    
    // Store placeholders for post-processing
    this._placeholders = placeholders;
    
    return tempDiv.innerHTML;
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
    // First pass: Replace placeholders with proper fenced code blocks
    if (this._placeholders && this._placeholders.length > 0) {
      this._placeholders.forEach(({ placeholder, type, content }) => {
        const langTag = (type === 'code') ? '' : type;
        const blockContent = content.replace(/^[\r\n]+|[\r\n]+$/g, '');
        const fencedBlock = `\`\`\`${langTag}\n${blockContent}\n\`\`\``;
        
        // Handle both DOM-based placeholders (text nodes) and regex-based placeholders
        const textPlaceholder = placeholder; // This is __SPECIAL_CONTAINER_${idx}__
        const escapedPlaceholder = textPlaceholder.replace(/_/g, '\\_'); // Turndown escapes underscores
        
        // Replace the placeholder with the fenced block (try both forms)
        if (markdown.includes(textPlaceholder)) {
          markdown = markdown.replace(textPlaceholder, fencedBlock);
        } else if (markdown.includes(escapedPlaceholder)) {
          markdown = markdown.replace(escapedPlaceholder, fencedBlock);
        }
      });
    }
    
    // Second pass: Convert any remaining special blocks markers back to proper markdown
    
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
    
    // Check if we have proper DOM methods available
    if (!tableElement || typeof tableElement.querySelectorAll !== 'function') {
      console.warn('DOM methods not available for table extraction, using regex fallback');
      return this._extractTableDataFromHtml(tableElement ? tableElement.outerHTML || tableElement.innerHTML || String(tableElement) : '', type);
    }
    
    const rows = tableElement.querySelectorAll('tr');
    
    // Additional safety check for the rows result
    if (!rows || typeof rows.forEach !== 'function') {
      console.warn('querySelectorAll did not return proper NodeList, falling back to regex');
      return this._extractTableDataFromHtml(tableElement.outerHTML || tableElement.innerHTML || String(tableElement), type);
    }

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

  /**
   * Extract table data from HTML content using regex when DOM methods aren't available
   * 
   * @private
   * @param {string} htmlContent - The HTML content containing the table
   * @param {string} type - The type of delimited format ('csv', 'tsv', 'psv')
   * @returns {string} - The extracted delimited text
   */
  _extractTableDataFromHtml(htmlContent, type) {
    let delimiter;
    switch (type) {
      case 'csv': delimiter = ','; break;
      case 'tsv': delimiter = '\t'; break;
      case 'psv': delimiter = '|'; break;
      default:    delimiter = ','; // Default to CSV
    }

    try {
      // Extract all table rows using regex
      const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
      const rows = [];
      let match;

      while ((match = rowRegex.exec(htmlContent)) !== null) {
        const rowContent = match[1];
        
        // Extract all cells (th or td) from this row
        const cellRegex = /<(?:th|td)[^>]*>([\s\S]*?)<\/(?:th|td)>/gi;
        const cells = [];
        let cellMatch;

        while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
          let cellText = cellMatch[1];
          
          // Remove HTML tags and decode entities
          cellText = cellText
            .replace(/<[^>]*>/g, '') // Remove all HTML tags
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/\r?\n|\r/g, ' ') // Replace newlines with spaces
            .trim();

          // Handle CSV quoting if cell contains delimiter
          if (delimiter === ',' && cellText.includes(',')) {
            cellText = `"${cellText.replace(/"/g, '""')}"`;
          }

          cells.push(cellText);
        }

        if (cells.length > 0) {
          rows.push(cells.join(delimiter));
        }
      }

      return rows.join('\n');
    } catch (e) {
      console.error('Error extracting table data from HTML:', e);
      return 'Error: Could not extract table data';
    }
  }

  /**
   * Regex-based fallback for pre-processing when DOM methods aren't available
   * 
   * @private
   * @param {string} html - The HTML to process
   * @returns {string} - The processed HTML with placeholders
   */
  _regexFallbackPreProcess(html) {
    // Simple regex-based approach when DOM isn't available
    // This matches div elements with data-source-type attributes
    const divRegex = /<div[^>]*data-source-type="([^"]*)"[^>]*>([\s\S]*?)<\/div>/g;
    const placeholders = [];
    let index = 0;
    
    const processedHtml = html.replace(divRegex, (match, sourceType, content) => {
      const placeholder = `__SPECIAL_CONTAINER_${index}__`;
      
      // Extract content based on type
      let extractedContent;
      if (sourceType === 'svg') {
        // For SVG, look for data-original-source attribute first
        const originalSourceMatch = match.match(/data-original-source="([^"]*)"/);
        if (originalSourceMatch) {
          // Decode HTML entities in the attribute value
          extractedContent = originalSourceMatch[1]
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
        } else {
          // Fallback to inner SVG content
          const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/);
          extractedContent = svgMatch ? svgMatch[0] : content;
        }
      } else if (sourceType === 'csv' || sourceType === 'tsv' || sourceType === 'psv') {
        // For delimited data, we need to extract from table using regex
        extractedContent = this._extractTableDataFromHtml(content, sourceType);
      } else {
        // For code blocks, extract from pre/code elements
        const preMatch = content.match(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/);
        if (preMatch) {
          extractedContent = preMatch[1]
            .replace(/<span[^>]*>/g, '')
            .replace(/<\/span>/g, '')
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
        } else {
          // For other content types (mermaid, math, etc.), use raw content but decode HTML entities
          extractedContent = content
            .replace(/<[^>]*>/g, '') // Remove any HTML tags
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&'); // &amp; should be last to avoid double-decoding
        }
      }
      
      placeholders.push({
        placeholder,
        type: sourceType,
        content: extractedContent
      });
      
      index++;
      return `<p>${placeholder}</p>`;
    });
    
    // Store placeholders for post-processing
    this._placeholders = placeholders;
    
    return processedHtml;
  }
}