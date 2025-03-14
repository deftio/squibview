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
    
    // Preserve SVG elements with special identifiers
    this.turndownService.addRule('svg', {
      filter: 'svg',
      replacement: (content, node) => {
        // Generate a unique ID for this SVG block
        const blockId = 'svg_' + Math.random().toString(36).substring(2, 10);
        
        // Store the raw SVG for later use
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(node);
        
        if (this._specialBlocks) {
          this._specialBlocks.set(blockId, {
            type: 'svg',
            content: svgString
          });
        }
        
        // Return with special marker
        return `\n<div data-special-block="${blockId}" class="svg-container">\n` +
               svgString + 
               `\n</div>\n`;
      }
    });
    
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
        // If the table doesn't have a header row, we need to add the separator
        if (!node.querySelector('thead') && node.querySelector('tr')) {
          const firstRow = node.querySelector('tr');
          const cells = firstRow.querySelectorAll('th, td').length;
          const separator = '\n|' + ' --- |'.repeat(cells) + '\n';
          
          // Insert separator after the first row
          const rows = content.split('\n');
          if (rows.length > 0) {
            return rows[0] + separator + rows.slice(1).join('\n') + '\n\n';
          }
        }
        
        return content + '\n\n';
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
}