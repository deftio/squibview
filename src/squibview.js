/* SquibView a live md/html/etc Editor/renderer with copy support
 supports markdown, html, and split view
 supports copying of formatted html and markdown
 supports copying of images as data urls
 supports copying of svg as png
 supports copying of tables as formatted tables
 supports copying of code blocks as formatted tables
 by deftio (c) 2024
*/

// Import required libraries
import TinyEmitter from 'tiny-emitter';
import DiffMatchPatch from 'diff-match-patch';

/**
 * RevisionManager class handles content revisions with memory-efficient diff storage
 */
class RevisionManager {
  /**
   * Creates a new RevisionManager instance
   */
  constructor() {
    this.initialContent = '';
    this.contentType = '';
    this.diffs = [];
    this.currentIndex = -1;
    this.diffEngine = new DiffMatchPatch();
  }
  
  /**
   * Initializes the revision manager with initial content
   * 
   * @param {string} content - The initial content
   * @param {string} contentType - The content type
   */
  initialize(content, contentType) {
    this.initialContent = content;
    this.contentType = contentType;
    this.diffs = [];
    this.currentIndex = -1;
  }
  
  /**
   * Adds a new revision
   * 
   * @param {string} newContent - The new content to add as a revision
   * @param {string} contentType - The content type of the revision
   */
  addRevision(newContent, contentType) {
    // Calculate diff between current state and new state
    const currentContent = this.getCurrentContent();
    const diff = this.diffEngine.diff_main(currentContent, newContent);
    this.diffEngine.diff_cleanupSemantic(diff);
    const patchText = this.diffEngine.patch_toText(
      this.diffEngine.patch_make(currentContent, diff)
    );
    
    // Remove any forward history if we're branching
    if (this.currentIndex < this.diffs.length - 1) {
      this.diffs = this.diffs.slice(0, this.currentIndex + 1);
    }
    
    // Add new diff and update content type if it changed
    this.diffs.push({
      diff: patchText,
      contentType: contentType !== this.contentType ? contentType : undefined
    });
    
    // Update the content type if it changed
    if (contentType !== this.contentType) {
      this.contentType = contentType;
    }
    
    this.currentIndex = this.diffs.length - 1;
  }
  
  /**
   * Moves backward in the revision history
   * 
   * @returns {Object|null} The previous revision state or null if at the beginning
   */
  undo() {
    if (this.currentIndex >= 0) {
      this.currentIndex--;
      return {
        content: this.getCurrentContent(),
        contentType: this.getCurrentContentType()
      };
    }
    return null;
  }
  
  /**
   * Moves forward in the revision history
   * 
   * @returns {Object|null} The next revision state or null if at the end
   */
  redo() {
    if (this.currentIndex < this.diffs.length - 1) {
      this.currentIndex++;
      return {
        content: this.getCurrentContent(),
        contentType: this.getCurrentContentType()
      };
    }
    return null;
  }
  
  /**
   * Gets the content at the current revision point
   * 
   * @returns {string} The current content
   */
  getCurrentContent() {
    if (this.currentIndex < 0) return this.initialContent;
    
    // Apply all diffs up to currentIndex
    let content = this.initialContent;
    for (let i = 0; i <= this.currentIndex; i++) {
      const patches = this.diffEngine.patch_fromText(this.diffs[i].diff);
      const [patchedText] = this.diffEngine.patch_apply(patches, content);
      content = patchedText;
    }
    return content;
  }
  
  /**
   * Gets the content type at the current revision point
   * 
   * @returns {string} The current content type
   */
  getCurrentContentType() {
    if (this.currentIndex < 0) return this.contentType;
    
    // Find the last content type change up to the current index
    let currentType = this.contentType;
    for (let i = 0; i <= this.currentIndex; i++) {
      if (this.diffs[i].contentType !== undefined) {
        currentType = this.diffs[i].contentType;
      }
    }
    return currentType;
  }
  
  /**
   * Sets the revision to a specific index
   * 
   * @param {number} index - The revision index to set
   * @returns {Object|null} The revision state at the index or null if invalid
   */
  setRevision(index) {
    if (index >= -1 && index < this.diffs.length) {
      this.currentIndex = index;
      return {
        content: this.getCurrentContent(),
        contentType: this.getCurrentContentType()
      };
    }
    return null;
  }
  
  /**
   * Returns the total number of revisions
   * 
   * @returns {number} The number of revisions
   */
  getRevisionCount() {
    return this.diffs.length;
  }
  
  /**
   * Returns the current index in the revision history
   * 
   * @returns {number} The current revision index
   */
  getCurrentIndex() {
    return this.currentIndex;
  }
}

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
    baseClass: 'squibview'
  };

  static version = {
    version: "0.0.29",
    url: "https://github.com/deftio/squibview"
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
   * @throws {Error} Throws if the container element is not found
   */
  constructor(element, options = {}) {
    this.options = { ...SquibView.defaultOptions, ...options };
    
    this.container = typeof element === 'string' ? document.querySelector(element) : element;

    if (!this.container) {
      throw new Error('Container element not found');
    }

    // Initialize event emitter for plugin communication
    this.events = new TinyEmitter();
    
    // Initialize revision manager
    this.revisionManager = new RevisionManager();
    
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
    // Initialize Mermaid for diagram rendering
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: 'default',
      errorCallback: function (error) {
        console.warn("Mermaid error:", error);
        return "<div class='mermaid-error'></div>";
      }
    });
    mermaid.init(undefined, ".mermaid");
    
    // Initialize markdown-it with options and syntax highlighting
    this.md = window.markdownit({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(str, { language: lang }).value;
          } catch (__) { }
        }
        return '';
      }
    });

    // Configure custom fence rendering for markdown-it
    const defaultFence = this.md.renderer.rules.fence ||
      ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

    this.md.renderer.rules.fence = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const info = token.info.trim();
      if (info === 'mermaid') {
        return '<div class="mermaid">' + token.content + '</div>';
      }
      if (info === 'svg') {
        return token.content;
      }
      return defaultFence(tokens, idx, options, env, self);
    };
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
        removeHR: (src) => src.replace(/---/g, '')
      },
      buttons: [
        { label: 'H-', action: 'decreaseHeadings', title: 'Decrease heading levels' },
        { label: 'H+', action: 'increaseHeadings', title: 'Increase heading levels' },
        { label: 'Remove HR', action: 'removeHR', title: 'Remove horizontal rules' }
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
        <div class="${this.options.baseClass}-type-buttons"></div>
        <div class="${this.options.baseClass}-universal-buttons">
          <button class="revision-undo" title="Undo">&#x21A9;</button>
          <button class="revision-redo" title="Redo">&#x21AA;</button>
        </div>
      </div>
      <div class="${this.options.baseClass}-editor">
        <textarea class="${this.options.baseClass}-input"></textarea>
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
  }
  
  /**
   * Preserves special content blocks like Mermaid diagrams and SVG from original source
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
    
    // Extract SVG blocks: ```svg ... ```
    const svgRegex = /```svg\s*([\s\S]*?)```/g;
    let svgMatch;
    while ((svgMatch = svgRegex.exec(originalSource)) !== null) {
      specialBlocks.push({
        type: 'svg',
        content: svgMatch[0],
        startIndex: svgMatch.index,
        endIndex: svgMatch.index + svgMatch[0].length
      });
    }
    
    // Find corresponding locations in new source and preserve the special blocks
    // This is a heuristic approach - we look for markers that might indicate where
    // the special content was converted to something else
    
    let modifiedSource = newSource;
    
    // Look for div or svg elements in the newSource which likely represent our special blocks
    const divRegex = /<div[^>]*class=['"]?mermaid['"]?[^>]*>([\s\S]*?)<\/div>/g;
    const svgTagRegex = /<svg[^>]*>[\s\S]*?<\/svg>/g;
    
    // Replace mermaid divs with original mermaid code blocks
    let divMatch;
    let mermaidIndex = 0;
    while ((divMatch = divRegex.exec(modifiedSource)) !== null) {
      // Find the next available mermaid block
      const mermaidBlocks = specialBlocks.filter(block => block.type === 'mermaid');
      if (mermaidIndex < mermaidBlocks.length) {
        // Replace the div with the original mermaid code block
        modifiedSource = 
          modifiedSource.substring(0, divMatch.index) + 
          mermaidBlocks[mermaidIndex].content + 
          modifiedSource.substring(divMatch.index + divMatch[0].length);
        
        mermaidIndex++;
      }
    }
    
    // Replace SVG tags with original SVG code blocks
    let svgIndex = 0;
    let svgTagMatch;
    while ((svgTagMatch = svgTagRegex.exec(modifiedSource)) !== null) {
      // Find the next available SVG block
      const svgBlocks = specialBlocks.filter(block => block.type === 'svg');
      if (svgIndex < svgBlocks.length) {
        // Replace the SVG tag with the original SVG code block
        modifiedSource = 
          modifiedSource.substring(0, svgTagMatch.index) + 
          svgBlocks[svgIndex].content + 
          modifiedSource.substring(svgTagMatch.index + svgTagMatch[0].length);
        
        svgIndex++;
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
    const html = this.md.render(markdown);
    this.output.innerHTML = "<div contenteditable='true'>" + html + "</div>";

    // Convert all images to data URLs immediately after rendering
    const contentDiv = this.output.querySelector('div[contenteditable="true"]');
    const images = contentDiv.querySelectorAll('img');

    // render images to data urls
    for (const img of images) {
      try {
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
          tempImg.src = img.src;
        });
      } catch (error) {
        console.error('Failed to convert image:', error);
      }
    }
    // end of images to data urls

    // Initialize mermaid diagrams after all images are processed
    mermaid.init(undefined, this.output.querySelectorAll('.mermaid'));
    
    // Emit markdown:rendered event
    this.events.emit('markdown:rendered', markdown, html);
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

    this.controls.querySelectorAll('button[data-view]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });

    const copyMDButton = this.controls.querySelector('.copy-src-button');
    const copyHTMLButton = this.controls.querySelector('.copy-html-button');

    if (view === 'src') {
      this.input.classList.remove('squibview-hidden');
      this.output.classList.add('squibview-hidden');
      this.input.style.width = '100%';
      copyMDButton.classList.remove('squibview-hidden');
      copyHTMLButton.classList.add('squibview-hidden');
    } else if (view === 'html') {
      this.input.classList.add('squibview-hidden');
      this.output.classList.remove('squibview-hidden');
      this.output.style.width = '100%';
      copyMDButton.classList.add('squibview-hidden');
      copyHTMLButton.classList.remove('squibview-hidden');
    } else { // view == 'split'
      this.input.classList.remove('squibview-hidden');
      this.output.classList.remove('squibview-hidden');
      this.input.style.width = '50%';
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

      // Convert SVG elements to PNG
      const svgElements = clone.querySelectorAll('svg');
      for (const svg of svgElements) {
        try {
          const pngBlob = await this.svgToPng(svg);
          const dataUrl = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(pngBlob);
          });

          const img = document.createElement('img');
          img.src = dataUrl;
          img.width = svg.clientWidth || svg.viewBox.baseVal.width || 100;
          img.height = svg.clientHeight || svg.viewBox.baseVal.height || 100;
          img.setAttribute('v:shapes', 'image' + Math.random().toString(36).substr(2, 9));
          img.style.width = img.width + 'px';
          img.style.height = img.height + 'px';
          img.alt = "Converted diagram";
          svg.parentNode.replaceChild(img, svg);
        } catch (error) {
          console.error('Failed to convert SVG:', error);
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
      const svgWidth = svgElement.clientWidth || svgElement.viewBox.baseVal.width || 100;
      const svgHeight = svgElement.clientHeight || svgElement.viewBox.baseVal.height || 100;

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
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
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
}

// The React component wrapper has been moved to a separate file
// to avoid dependency issues when React is not available

// Export the main class and RevisionManager
export default SquibView;
export { RevisionManager };